"use client"

import { CreditCard, TrendingUp, AlertTriangle, RotateCcw } from "lucide-react"

const stats = [
  { label: "MRR", value: "$28,400", change: "+18.3%", positive: true },
  { label: "Active subscriptions", value: "214", change: "+11.4%", positive: true },
  { label: "Failed payments", value: "3", change: "-1", positive: true },
  { label: "Churn rate", value: "1.8%", change: "-0.4%", positive: true },
]

const recentEvents = [
  { type: "subscription", label: "New subscription", customer: "Apex Hiring Co.", amount: "+$299", time: "4m ago", color: "text-emerald-400" },
  { type: "payment", label: "Payment succeeded", customer: "StackTech Ltd.", amount: "+$149", time: "22m ago", color: "text-emerald-400" },
  { type: "failed", label: "Payment failed", customer: "Globex Corp.", amount: "$299", time: "2h ago", color: "text-red-400" },
  { type: "refund", label: "Refund issued", customer: "Initech Inc.", amount: "-$149", time: "1d ago", color: "text-yellow-400" },
]

const eventIcon: Record<string, React.ElementType> = {
  subscription: TrendingUp,
  payment: CreditCard,
  failed: AlertTriangle,
  refund: RotateCcw,
}

export function StripeCard() {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-400/10">
          <CreditCard className="h-4 w-4 text-violet-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Stripe</h2>
          <p className="text-xs text-muted-foreground">Revenue &amp; subscriptions</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live
        </span>
      </div>

      {/* KPI grid */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-background/50 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-0.5 text-lg font-bold text-foreground">{s.value}</p>
            <p className={`text-xs font-medium ${s.positive ? "text-emerald-400" : "text-red-400"}`}>
              {s.change}
            </p>
          </div>
        ))}
      </div>

      {/* Recent events */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recent events
        </p>
        <div className="flex flex-col gap-2">
          {recentEvents.map((e, i) => {
            const Icon = eventIcon[e.type] ?? CreditCard
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-border px-3 py-2"
              >
                <Icon className={`h-3.5 w-3.5 shrink-0 ${e.color}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-foreground">
                    {e.customer}
                  </p>
                  <p className="text-xs text-muted-foreground">{e.label}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className={`text-xs font-semibold ${e.color}`}>{e.amount}</p>
                  <p className="text-xs text-muted-foreground/60">{e.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
