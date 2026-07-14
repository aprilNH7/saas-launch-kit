"use client"

import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  label: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
}

export function StatsCard({ label, value, change, trend, icon: Icon }: StatsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <div className="mt-1 flex items-center gap-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-emerald-500" />
          )}
          <span className={cn("text-sm font-medium", "text-emerald-500")}>{change}</span>
          <span className="text-sm text-muted-foreground">vs last period</span>
        </div>
      </div>
      {/* Decorative gradient */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
    </div>
  )
}
