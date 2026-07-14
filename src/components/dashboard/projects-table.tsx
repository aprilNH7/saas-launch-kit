"use client"

import { MoreHorizontal, ExternalLink } from "lucide-react"

const projects = [
  { name: "Website Redesign", status: "Active", members: 5, progress: 72, updated: "2h ago" },
  { name: "Mobile App v2", status: "Active", members: 8, progress: 45, updated: "5h ago" },
  { name: "API Integration", status: "Completed", members: 3, progress: 100, updated: "1d ago" },
  { name: "Data Pipeline", status: "Paused", members: 4, progress: 30, updated: "3d ago" },
  { name: "Auth System", status: "Active", members: 2, progress: 88, updated: "6h ago" },
]

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-500",
  Completed: "bg-blue-500/10 text-blue-500",
  Paused: "bg-amber-500/10 text-amber-500",
}

export function ProjectsTable() {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between p-6 pb-4">
        <h3 className="text-lg font-semibold">Projects</h3>
        <button className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
          View all <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t text-left text-sm text-muted-foreground">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Members</th>
              <th className="px-6 py-3 font-medium">Progress</th>
              <th className="px-6 py-3 font-medium">Updated</th>
              <th className="px-6 py-3 font-medium w-10"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.name} className="border-t hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-medium">{project.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{project.members}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{project.updated}</td>
                <td className="px-6 py-4">
                  <button className="rounded-md p-1 hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
