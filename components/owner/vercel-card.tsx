"use client"

import { Triangle, CheckCircle2, AlertCircle } from "lucide-react"

const deployments = [
  { env: "Production", branch: "main", status: "success", time: "2m ago", duration: "48s" },
  { env: "Preview", branch: "feat/investor-view", status: "success", time: "14m ago", duration: "51s" },
  { env: "Preview", branch: "fix/sidebar-collapse", status: "error", time: "1h ago", duration: "39s" },
]

const stats = [
  { label: "Edge Fn invocations", value: "1.24M" },
  { label: "Bandwidth", value: "84.2 GB" },
  { label: "Avg build time", value: "47s" },
  { label: "P95 response", value: "68ms" },
]

export function VercelCard() {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/5">
          <Triangle className="h-4 w-4 fill-foreground text-foreground" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Vercel</h2>
          <p className="text-xs text-muted-foreground">Deployments &amp; performance</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Operational
        </span>
      </div>

      {/* Stats row */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-background/50 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-0.5 text-lg font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent deployments */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recent deployments
        </p>
        <div className="flex flex-col gap-2">
          {deployments.map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-border px-3 py-2"
            >
              {d.status === "success" ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-400" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">
                  {d.env} — <span className="font-mono text-primary">{d.branch}</span>
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-muted-foreground">{d.time}</p>
                <p className="text-xs text-muted-foreground/60">{d.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
