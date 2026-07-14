import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"
import { sendTeamInviteEmail } from "@/lib/email"
import { randomBytes } from "crypto"

// GET — list team members
export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const teamId = searchParams.get("teamId")
    if (!teamId) return NextResponse.json({ error: "Team ID required" }, { status: 400 })

    const members = await db.teamMember.findMany({
      where: { teamId },
      include: { user: { select: { id: true, name: true, email: true, image: true } } },
      orderBy: { joinedAt: "asc" },
    })

    return NextResponse.json(members)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST — invite a new team member
const inviteSchema = z.object({
  teamId: z.string(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"]).default("MEMBER"),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const { teamId, email, role } = inviteSchema.parse(body)

    // Verify requester is team admin/owner
    const membership = await db.teamMember.findUnique({
      where: { userId_teamId: { userId: session.user.id, teamId } },
    })

    if (!membership || !["OWNER", "ADMIN"].includes(membership.role)) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    // Check if already a member
    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
      const existingMember = await db.teamMember.findUnique({
        where: { userId_teamId: { userId: existingUser.id, teamId } },
      })
      if (existingMember) {
        return NextResponse.json({ error: "User is already a team member" }, { status: 409 })
      }
    }

    // Create invite
    const token = randomBytes(32).toString("hex")
    const invite = await db.invite.create({
      data: {
        email,
        role,
        token,
        teamId,
        inviterId: session.user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    })

    // Send invite email
    const team = await db.team.findUnique({ where: { id: teamId } })
    await sendTeamInviteEmail({
      to: email,
      inviterName: session.user.name || "A team member",
      teamName: team?.name || "the team",
      inviteLink: `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`,
    })

    await db.activityLog.create({
      data: {
        action: "member.invited",
        metadata: { email, role },
        userId: session.user.id,
        teamId,
      },
    })

    return NextResponse.json({ message: "Invitation sent", inviteId: invite.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error("Team invite error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
