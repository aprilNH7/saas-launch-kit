import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { createCheckoutSession, createCustomerPortal, PLANS } from "@/lib/stripe"

// POST — create checkout session or portal session
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { teamId, plan, interval, action } = await req.json()

    const team = await db.team.findUnique({ where: { id: teamId } })
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 })

    // Verify user is owner/admin
    const membership = await db.teamMember.findUnique({
      where: { userId_teamId: { userId: session.user.id, teamId } },
    })
    if (!membership || !["OWNER", "ADMIN"].includes(membership.role)) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    // Manage existing subscription
    if (action === "portal" && team.stripeCustomerId) {
      const portalSession = await createCustomerPortal(team.stripeCustomerId)
      return NextResponse.json({ url: portalSession.url })
    }

    // Create new checkout
    const planConfig = PLANS[plan as keyof typeof PLANS]
    if (!planConfig) return NextResponse.json({ error: "Invalid plan" }, { status: 400 })

    const priceId = planConfig.stripePriceId[interval as "monthly" | "yearly"]
    if (!priceId) return NextResponse.json({ error: "Price not configured" }, { status: 400 })

    const checkoutSession = await createCheckoutSession(
      teamId,
      priceId,
      team.stripeCustomerId || undefined
    )

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Billing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
