"use client"

import { Activity } from "lucide-react"

export function HeroCard() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.2)]">
      {/* Decorative grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f5f5f5" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* Gradient glow */}
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-primary/10 blur-[100px] transition-all duration-700 group-hover:bg-primary/20" />

      <div className="relative flex flex-col gap-6 p-8">
        {/* Interface mockup */}
        <div className="overflow-hidden rounded-lg border border-border/60 bg-secondary/50">
          <div className="flex items-center gap-2 border-b border-border/40 px-4 py-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-chart-5/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-chart-4/60" />
            <span className="ml-3 text-xs text-muted-foreground">ona-dashboard.app</span>
          </div>
          <div className="flex flex-col gap-3 p-5">
            <div className="flex items-center gap-3">
              <div className="h-2 w-24 rounded-full bg-border" />
              <div className="h-2 w-16 rounded-full bg-border/60" />
              <div className="ml-auto h-2 w-12 rounded-full bg-primary/30" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 flex-1 rounded-md bg-border/40" />
              <div className="h-8 flex-1 rounded-md bg-primary/10" />
              <div className="h-8 flex-1 rounded-md bg-border/40" />
            </div>
            <div className="flex gap-3">
              <div className="h-20 flex-[2] rounded-md bg-border/30" />
              <div className="h-20 flex-1 rounded-md bg-primary/[0.07]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            ONA Dashboard
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Real-time synchronization across all your connected devices and platforms.
          </p>
        </div>

        {/* Primary metric */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/[0.06] px-5 py-3">
            <Activity className="h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">Seamless Scalability</span>
              <span className="text-[11px] text-muted-foreground">Auto-scaling infrastructure</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-4 py-2.5">
            <span className="text-xl font-bold tracking-tight text-foreground">99.9%</span>
            <span className="text-xs text-muted-foreground">Uptime</span>
          </div>
        </div>
      </div>
    </div>
  )
}
