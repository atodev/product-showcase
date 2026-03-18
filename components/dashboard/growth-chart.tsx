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

const DEFAULT_DATA = [
  { month: "Jan", value: 2400 },
  { month: "Feb", value: 1398 },
  { month: "Mar", value: 4800 },
  { month: "Apr", value: 3908 },
  { month: "May", value: 4800 },
  { month: "Jun", value: 3800 },
  { month: "Jul", value: 6300 },
  { month: "Aug", value: 7200 },
  { month: "Sep", value: 8100 },
  { month: "Oct", value: 9400 },
  { month: "Nov", value: 11200 },
  { month: "Dec", value: 13900 },
]

function CustomTooltip({
  active,
  payload,
  label,
  valueLabel,
}: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
  valueLabel?: string
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">
          {payload[0].value.toLocaleString()} {valueLabel ?? "users"}
        </p>
      </div>
    )
  }
  return null
}

interface GrowthChartProps {
  data?: { month: string; value: number }[]
  color?: string
  gradientId?: string
  valueLabel?: string
  height?: number
}

export function GrowthChart({
  data = DEFAULT_DATA,
  color = "#3b82f6",
  gradientId = "growthGradient",
  valueLabel,
  height = 280,
}: GrowthChartProps) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
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
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v.toString()
            }
          />
          <Tooltip content={<CustomTooltip valueLabel={valueLabel} />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
