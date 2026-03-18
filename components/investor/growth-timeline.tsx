"use client"

import { CheckCircle2 } from "lucide-react"

const milestones = [
  {
    date: "Q1 2024",
    title: "Company founded",
    description: "Interview Edge concept validated with 12 beta users from top-tier tech firms.",
    done: true,
  },
  {
    date: "Q3 2024",
    title: "First paying customers",
    description: "Closed first 20 paying seats at $299/mo. Achieved product-market fit signal.",
    done: true,
  },
  {
    date: "Q4 2024",
    title: "ONA Dashboard launched",
    description: "Launched second product — Organisational Network Analytics — for enterprise HR.",
    done: true,
  },
  {
    date: "Q1 2025",
    title: "$340K ARR milestone",
    description: "Reached $340K ARR with zero paid marketing. 100% inbound & word-of-mouth.",
    done: true,
  },
  {
    date: "Q3 2025",
    title: "Series A raise",
    description: "Targeting $4M to accelerate sales team expansion and EU market entry.",
    done: false,
  },
  {
    date: "Q1 2026",
    title: "Enterprise tier & API",
    description: "SSO, audit logs, and developer API for deep ATS integrations.",
    done: false,
  },
]

export function GrowthTimeline() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-6 text-base font-semibold text-foreground">
        Product &amp; company milestones
      </h2>
      <ol className="relative border-l border-border">
        {milestones.map((m, i) => (
          <li key={i} className="mb-6 ml-6 last:mb-0">
            <span
              className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full border ${
                m.done
                  ? "border-primary/40 bg-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {m.done ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-border" />
              )}
            </span>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {m.date}
                </p>
                <h3
                  className={`text-sm font-semibold ${m.done ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {m.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  {m.description}
                </p>
              </div>
              {!m.done && (
                <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Planned
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
