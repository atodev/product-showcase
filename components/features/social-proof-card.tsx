"use client"

import { useEffect, useRef } from "react"
import { Star, Users } from "lucide-react"

const activityLogs = [
  { company: "Vercel", action: "deployed 42 services", time: "just now" },
  { company: "Linear", action: "integrated SDK v3", time: "2m ago" },
  { company: "Stripe", action: "processed 10k events", time: "5m ago" },
  { company: "Notion", action: "synced 1.2k pages", time: "8m ago" },
  { company: "Figma", action: "exported 84 assets", time: "12m ago" },
  { company: "GitHub", action: "merged 27 pull requests", time: "15m ago" },
  { company: "Slack", action: "routed 5k notifications", time: "20m ago" },
  { company: "Discord", action: "connected 3 bots", time: "25m ago" },
  { company: "Retool", action: "built 6 internal tools", time: "30m ago" },
  { company: "Supabase", action: "migrated 4 databases", time: "35m ago" },
]

export function SocialProofCard() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let scrollPos = 0

    const animate = () => {
      scrollPos += 0.4
      if (scrollPos >= el.scrollHeight / 2) {
        scrollPos = 0
      }
      el.scrollTop = scrollPos
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.2)]">
      <div className="pointer-events-none absolute -top-12 right-0 h-40 w-40 rounded-full bg-chart-5/5 blur-[80px] transition-all duration-700 group-hover:bg-chart-5/15" />

      <div className="relative flex flex-col gap-4 p-6 pb-0">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-chart-5" />
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Trusted by the Best.
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-3 py-1.5">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold text-foreground">5,000+</span>
          </div>
          <span className="text-xs text-muted-foreground">early-access developers globally</span>
        </div>
      </div>

      {/* Scrolling activity */}
      <div className="relative mt-4 flex-1 overflow-hidden">
        {/* Top fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-card to-transparent" />
        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-card to-transparent" />

        <div ref={scrollRef} className="h-full overflow-hidden px-6 py-2">
          {/* Duplicate list for seamless loop */}
          {[...activityLogs, ...activityLogs].map((log, i) => (
            <div
              key={`${log.company}-${i}`}
              className="flex items-center gap-3 border-b border-border/40 py-3 last:border-b-0"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/50">
                <span className="text-[10px] font-bold text-muted-foreground">
                  {log.company.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm text-foreground">
                  <span className="font-medium">{log.company}</span>{" "}
                  <span className="text-muted-foreground">{log.action}</span>
                </p>
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
