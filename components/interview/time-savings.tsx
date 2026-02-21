"use client"

import { TrendingDown, Clock } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts"

const data = [
  { month: "Jan", days: 42 },
  { month: "Feb", days: 38 },
  { month: "Mar", days: 35 },
  { month: "Apr", days: 29 },
  { month: "May", days: 22 },
  { month: "Jun", days: 18 },
  { month: "Jul", days: 14 },
  { month: "Aug", days: 11 },
]

export function TimeSavings() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.2)]">
      <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-emerald-500/5 blur-[60px] transition-all duration-700 group-hover:bg-emerald-500/15" />

      <div className="relative flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
            <Clock className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-sans text-base font-semibold text-foreground">Time-to-Hire</h3>
            <p className="text-xs text-muted-foreground">Reduction over 8 months</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1">
          <TrendingDown className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400">-73%</span>
        </div>
      </div>

      <div className="relative flex items-center gap-6 p-5">
        <div className="flex flex-col">
          <span className="text-3xl font-bold tracking-tight text-foreground">11</span>
          <span className="text-xs text-muted-foreground">days avg. now</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-muted-foreground line-through">42</span>
          <span className="text-xs text-muted-foreground">days before</span>
        </div>
      </div>

      <div className="h-36 w-full px-2 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 12, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#737373" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#737373" }} axisLine={false} tickLine={false} />
            <RechartsTooltip
              contentStyle={{
                backgroundColor: "#0a0a0a",
                border: "1px solid #1f1f1f",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#f5f5f5",
              }}
              formatter={(value: number) => [`${value} days`, "Time-to-Hire"]}
            />
            <Area
              type="monotone"
              dataKey="days"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#emeraldGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
