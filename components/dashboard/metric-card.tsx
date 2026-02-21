"use client"

import {
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  iconName: string
}

export function MetricCard({ title, value, change, changeType, iconName }: MetricCardProps) {
  const Icon = iconMap[iconName] ?? DollarSign
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="mt-3">
        <span
          className={cn(
            "text-xs font-medium",
            changeType === "positive" && "text-emerald-400",
            changeType === "negative" && "text-red-400",
            changeType === "neutral" && "text-muted-foreground"
          )}
        >
          {change}
        </span>
        <span className="text-xs text-muted-foreground"> vs last month</span>
      </div>
    </div>
  )
}
