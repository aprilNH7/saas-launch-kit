"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart3, Users, FolderKanban, Activity, ArrowUpRight,
  ArrowDownRight, TrendingUp, Clock, Zap
} from "lucide-react"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ProjectsTable } from "@/components/dashboard/projects-table"

const stats = [
  { label: "Total Revenue", value: "$48,352", change: "+12.5%", trend: "up" as const, icon: BarChart3 },
  { label: "Active Users", value: "2,420", change: "+8.2%", trend: "up" as const, icon: Users },
  { label: "Projects", value: "34", change: "+3", trend: "up" as const, icon: FolderKanban },
  { label: "Avg. Response", value: "1.2s", change: "-0.3s", trend: "down" as const, icon: Clock },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export default function OverviewPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === range
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueChart />
        </div>
        <div className="lg:col-span-3">
          <ActivityFeed />
        </div>
      </div>

      {/* Projects Table */}
      <ProjectsTable />
    </div>
  )
}
