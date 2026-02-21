"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const candidates = [
  {
    name: "Sarah Chen",
    initials: "SC",
    role: "Senior Engineer",
    fitScore: 98,
    strength: "System Design",
    status: "interviewing" as const,
  },
  {
    name: "Marcus Rivera",
    initials: "MR",
    role: "Staff Engineer",
    fitScore: 94,
    strength: "Leadership",
    status: "queued" as const,
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    role: "Backend Engineer",
    fitScore: 88,
    strength: "Distributed Systems",
    status: "queued" as const,
  },
  {
    name: "James Okoye",
    initials: "JO",
    role: "Full-Stack Dev",
    fitScore: 82,
    strength: "Problem Solving",
    status: "queued" as const,
  },
  {
    name: "Lena Muller",
    initials: "LM",
    role: "DevOps Engineer",
    fitScore: 79,
    strength: "Infrastructure",
    status: "completed" as const,
  },
]

function getScoreColor(score: number) {
  if (score >= 90) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
  if (score >= 80) return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
  return "text-muted-foreground border-border bg-secondary/40"
}

function getStatusBadge(status: "interviewing" | "queued" | "completed") {
  switch (status) {
    case "interviewing":
      return (
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live
        </span>
      )
    case "queued":
      return (
        <span className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          Queued
        </span>
      )
    case "completed":
      return (
        <span className="rounded-full border border-muted bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          Done
        </span>
      )
  }
}

export function CandidateQueue() {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.2)]">
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-emerald-500/5 blur-[60px] transition-all duration-700 group-hover:bg-emerald-500/15" />

      <div className="relative border-b border-border p-5">
        <h3 className="font-sans text-base font-semibold text-foreground">Candidate Queue</h3>
        <p className="text-xs text-muted-foreground">{candidates.length} candidates in pipeline</p>
      </div>

      <div className="relative flex-1 overflow-y-auto">
        {candidates.map((candidate, i) => (
          <div
            key={candidate.name}
            className={cn(
              "flex items-center gap-3 border-b border-border px-5 py-3.5 transition-colors hover:bg-secondary/30",
              i === candidates.length - 1 && "border-b-0"
            )}
          >
            <Avatar className="h-9 w-9 shrink-0 border border-border">
              <AvatarFallback className="bg-secondary text-xs text-muted-foreground">
                {candidate.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium text-foreground">{candidate.name}</span>
                {getStatusBadge(candidate.status)}
              </div>
              <span className="text-xs text-muted-foreground">{candidate.role}</span>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className={cn("rounded-md border px-2 py-0.5 text-xs font-bold", getScoreColor(candidate.fitScore))}>
                {candidate.fitScore}%
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400/80">
                {candidate.strength}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
