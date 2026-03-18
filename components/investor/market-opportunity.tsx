"use client"

import { TrendingUp, Globe, Target } from "lucide-react"

const markets = [
  {
    label: "TAM",
    sublabel: "Total Addressable Market",
    value: "$42B",
    description: "Global HR tech & talent intelligence platforms",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    label: "SAM",
    sublabel: "Serviceable Addressable Market",
    value: "$8.4B",
    description: "Mid-market & enterprise hiring automation",
    icon: Target,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    label: "SOM",
    sublabel: "Serviceable Obtainable Market",
    value: "$420M",
    description: "Year 3 target — English-speaking tech firms",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
]

export function MarketOpportunity() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {markets.map((m) => {
        const Icon = m.icon
        return (
          <div
            key={m.label}
            className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]"
          >
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${m.bg}`}>
              <Icon className={`h-5 w-5 ${m.color}`} />
            </div>
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                {m.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {m.label}
              </span>
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              {m.sublabel}
            </p>
            <p className="mt-2 text-xs text-muted-foreground/70">
              {m.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}
