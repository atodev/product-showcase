"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { month: "Jan", growth: 2400 },
  { month: "Feb", growth: 1398 },
  { month: "Mar", growth: 4800 },
  { month: "Apr", growth: 3908 },
  { month: "May", growth: 4800 },
  { month: "Jun", growth: 3800 },
  { month: "Jul", growth: 6300 },
  { month: "Aug", growth: 7200 },
  { month: "Sep", growth: 8100 },
  { month: "Oct", growth: 9400 },
  { month: "Nov", growth: 11200 },
  { month: "Dec", growth: 13900 },
]

function CustomTooltip({
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
        <p className="text-sm font-semibold text-foreground">
          {payload[0].value.toLocaleString()} users
        </p>
      </div>
    )
  }
  return null
}

export function GrowthChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="#737373"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#737373"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) =>
              value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString()
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="growth"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#growthGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
