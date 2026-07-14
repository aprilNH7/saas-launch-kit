import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { db } from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email"
import { z } from "zod"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 })
    }

    // Create user
    const hashedPassword = await hash(password, 12)
    const user = await db.user.create({
      data: { name, email, password: hashedPassword, emailVerified: new Date() },
    })

    // Create default personal team
    await db.team.create({
      data: {
        name: `${name}'s Team`,
        slug: `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
        members: { create: { userId: user.id, role: "OWNER" } },
      },
    })

    // Send welcome email (non-blocking)
    sendWelcomeEmail({ to: email, name }).catch(console.error)

    return NextResponse.json(
      { message: "Account created successfully", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
