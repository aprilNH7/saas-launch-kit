import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create demo admin user
  const adminPassword = await hash("admin123456", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@demo.com" },
    update: {},
    create: {
      email: "admin@demo.com",
      name: "Demo Admin",
      password: adminPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  })

  // Create demo team
  const team = await prisma.team.upsert({
    where: { slug: "acme-corp" },
    update: {},
    create: {
      name: "Acme Corporation",
      slug: "acme-corp",
      plan: "PRO",
      members: {
        create: {
          userId: admin.id,
          role: "OWNER",
        },
      },
    },
  })

  // Create sample projects
  const projects = [
    { name: "Website Redesign", description: "Complete overhaul of the company website", status: "ACTIVE" as const },
    { name: "Mobile App v2", description: "Next generation mobile application", status: "ACTIVE" as const },
    { name: "API Integration", description: "Third-party API integrations", status: "COMPLETED" as const },
    { name: "Data Pipeline", description: "Real-time data processing pipeline", status: "PAUSED" as const },
  ]

  for (const project of projects) {
    await prisma.project.create({
      data: { ...project, teamId: team.id },
    })
  }

  // Create sample activity logs
  const activities = [
    { action: "team.created", metadata: { teamName: "Acme Corporation" } },
    { action: "member.invited", metadata: { email: "jane@acme.com", role: "ADMIN" } },
    { action: "project.created", metadata: { projectName: "Website Redesign" } },
    { action: "plan.upgraded", metadata: { from: "FREE", to: "PRO" } },
    { action: "api_key.created", metadata: { keyName: "Production API Key" } },
  ]

  for (const activity of activities) {
    await prisma.activityLog.create({
      data: { ...activity, userId: admin.id, teamId: team.id },
    })
  }

  // Create sample notifications
  const notifications = [
    { title: "Welcome!", message: "Your account has been created successfully.", type: "SUCCESS" as const },
    { title: "Plan Upgraded", message: "You are now on the Pro plan.", type: "INFO" as const },
    { title: "New Team Member", message: "Jane Doe has joined your team.", type: "INFO" as const },
  ]

  for (const notification of notifications) {
    await prisma.notification.create({
      data: { ...notification, userId: admin.id },
    })
  }

  console.log("✅ Database seeded successfully!")
  console.log(`   Admin: admin@demo.com / admin123456`)
  console.log(`   Team:  Acme Corporation (acme-corp)`)
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
