"use client"

import { Database } from "lucide-react"

const stats = [
  { label: "DB size", value: "2.4 GB", sub: "of 8 GB" },
  { label: "Active connections", value: "18", sub: "of 100 max" },
  { label: "Storage used", value: "14.8 GB", sub: "of 100 GB" },
  { label: "Avg query latency", value: "4.2ms", sub: "P95: 11ms" },
]

const tables = [
  { name: "users", rows: "12,847", size: "48 MB" },
  { name: "sessions", rows: "3,214", size: "8 MB" },
  { name: "interviews", rows: "94,203", size: "612 MB" },
  { name: "network_edges", rows: "1.2M", size: "1.8 GB" },
]

export function SupabaseCard() {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10">
          <Database className="h-4 w-4 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Supabase</h2>
          <p className="text-xs text-muted-foreground">Database &amp; storage</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Healthy
        </span>
      </div>

      {/* Stats */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-background/50 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-0.5 text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground/60">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Top tables */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Top tables by size
        </p>
        <div className="flex flex-col gap-1.5">
          {tables.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
            >
              <span className="font-mono text-xs text-foreground">{t.name}</span>
              <div className="text-right">
                <span className="text-xs text-muted-foreground">{t.rows} rows</span>
                <span className="ml-3 text-xs font-medium text-foreground">{t.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
