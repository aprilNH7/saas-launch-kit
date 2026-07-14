"use client"

import { UserPlus, FolderPlus, ArrowUpCircle, Key, Settings } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"

const activities = [
  { id: 1, action: "New member joined", detail: "jane@acme.com", icon: UserPlus, time: new Date(Date.now() - 1000 * 60 * 15) },
  { id: 2, action: "Project created", detail: "Website Redesign", icon: FolderPlus, time: new Date(Date.now() - 1000 * 60 * 45) },
  { id: 3, action: "Plan upgraded", detail: "Free → Pro", icon: ArrowUpCircle, time: new Date(Date.now() - 1000 * 60 * 120) },
  { id: 4, action: "API key generated", detail: "Production key", icon: Key, time: new Date(Date.now() - 1000 * 60 * 180) },
  { id: 5, action: "Settings updated", detail: "Team preferences", icon: Settings, time: new Date(Date.now() - 1000 * 60 * 300) },
]

export function ActivityFeed() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="rounded-lg bg-muted p-2 mt-0.5">
              <activity.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.action}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.detail}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatRelativeTime(activity.time)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
