"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { month: "Jan", revenue: 4200, users: 180 },
  { month: "Feb", revenue: 5800, users: 220 },
  { month: "Mar", revenue: 4900, users: 250 },
  { month: "Apr", revenue: 7200, users: 310 },
  { month: "May", revenue: 6800, users: 380 },
  { month: "Jun", revenue: 8900, users: 420 },
  { month: "Jul", revenue: 9200, users: 490 },
  { month: "Aug", revenue: 11400, users: 550 },
  { month: "Sep", revenue: 10800, users: 620 },
  { month: "Oct", revenue: 13200, users: 710 },
  { month: "Nov", revenue: 14100, users: 780 },
  { month: "Dec", revenue: 15800, users: 850 },
]

export function RevenueChart() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Monthly recurring revenue</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">$15,800</p>
          <p className="text-sm text-emerald-500">+12.1% from last month</p>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
            />
            <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2}
              fill="url(#revenueGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
