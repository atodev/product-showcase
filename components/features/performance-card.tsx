"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"
import { Zap } from "lucide-react"

const latencyData = [
  { time: "0s", latency: 180 },
  { time: "5s", latency: 145 },
  { time: "10s", latency: 162 },
  { time: "15s", latency: 120 },
  { time: "20s", latency: 98 },
  { time: "25s", latency: 135 },
  { time: "30s", latency: 88 },
  { time: "35s", latency: 105 },
  { time: "40s", latency: 72 },
  { time: "45s", latency: 95 },
  { time: "50s", latency: 68 },
  { time: "55s", latency: 82 },
]

function LatencyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{payload[0].value}ms</p>
      </div>
    )
  }
  return null
}

export function PerformanceCard() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.2)]">
      {/* Glow */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-chart-2/10 blur-[80px] transition-all duration-700 group-hover:bg-chart-2/20" />

      <div className="relative flex flex-col gap-5 p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-chart-2" />
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Performance
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Edge-native architecture delivering instantaneous response times globally.
            </p>
          </div>
          <div className="shrink-0 rounded-lg border border-chart-2/20 bg-chart-2/[0.06] px-4 py-2.5 text-center">
            <span className="block text-xl font-bold text-chart-2">150ms</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">avg latency</span>
          </div>
        </div>

        <div className="h-[160px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={latencyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="#737373"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<LatencyTooltip />} />
              <Area
                type="monotone"
                dataKey="latency"
                stroke="#22d3ee"
                strokeWidth={2}
                fill="url(#latencyGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
