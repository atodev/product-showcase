"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertTriangle, XCircle } from "lucide-react"

const statuses = [
  {
    label: "API Gateway",
    status: "Operational",
    icon: CheckCircle2,
    variant: "default" as const,
    dotColor: "bg-emerald-500",
  },
  {
    label: "CDN",
    status: "Operational",
    icon: CheckCircle2,
    variant: "default" as const,
    dotColor: "bg-emerald-500",
  },
  {
    label: "Database",
    status: "Maintenance",
    icon: Clock,
    variant: "secondary" as const,
    dotColor: "bg-amber-500",
  },
  {
    label: "Auth Service",
    status: "Degraded",
    icon: AlertTriangle,
    variant: "secondary" as const,
    dotColor: "bg-amber-500",
  },
  {
    label: "Webhooks",
    status: "Offline",
    icon: XCircle,
    variant: "destructive" as const,
    dotColor: "bg-red-500",
  },
]

export function StatusBadges() {
  return (
    <div className="flex flex-col gap-3">
      {statuses.map((s) => (
        <div key={s.label} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${s.dotColor}`} />
            <span className="text-sm text-foreground">{s.label}</span>
          </div>
          <Badge variant={s.variant} className="text-xs">
            {s.status}
          </Badge>
        </div>
      ))}
    </div>
  )
}
