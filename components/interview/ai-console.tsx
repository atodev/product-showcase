"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const transcriptLines = [
  { speaker: "AI", text: "Can you walk me through your approach to system design at scale?" },
  { speaker: "Candidate", text: "Sure. I usually start by identifying the core read/write patterns and data models..." },
  { speaker: "AI", text: "How would you handle a sudden 10x spike in traffic?" },
  { speaker: "Candidate", text: "I'd implement auto-scaling groups behind a load balancer with circuit breakers..." },
  { speaker: "AI", text: "Tell me about a time you resolved a critical production incident." },
  { speaker: "Candidate", text: "We had a cascading failure in our payment service. I led the RCA and implemented retry logic with exponential backoff..." },
  { speaker: "AI", text: "How do you prioritize technical debt versus feature development?" },
  { speaker: "Candidate", text: "I use a scoring matrix that weighs impact on velocity, risk of failure, and customer-facing impact..." },
]

export function AIConsole() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [visibleLines, setVisibleLines] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= transcriptLines.length) return 3
        return prev + 1
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleLines])

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.2)]">
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-emerald-500/5 blur-[80px] transition-all duration-700 group-hover:bg-emerald-500/15" />

      <div className="relative flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
            <Mic className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-sans text-base font-semibold text-foreground">AI Interviewer Console</h3>
            <p className="text-xs text-muted-foreground">Real-time voice analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="h-2.5 w-2.5 animate-pulse fill-emerald-400 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">Live</span>
        </div>
      </div>

      {/* Waveform */}
      <div className="flex items-center justify-center gap-[3px] px-5 py-6">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-emerald-400/80"
            style={{
              height: `${12 + Math.sin(i * 0.6 + Date.now() * 0.001) * 18 + Math.random() * 8}px`,
              animation: `waveform ${0.4 + Math.random() * 0.6}s ease-in-out infinite alternate`,
              animationDelay: `${i * 30}ms`,
              opacity: 0.4 + Math.sin(i * 0.3) * 0.4,
            }}
          />
        ))}
      </div>

      {/* Transcription feed */}
      <div className="relative flex-1 border-t border-border">
        <div className="absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-card to-transparent" />
        <div ref={scrollRef} className="flex h-48 flex-col gap-3 overflow-y-auto p-5 pt-8 scrollbar-hide">
          {transcriptLines.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3 text-sm leading-relaxed",
                i === visibleLines - 1 && "animate-in fade-in slide-in-from-bottom-2 duration-500"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  line.speaker === "AI"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {line.speaker}
              </span>
              <p className="text-muted-foreground">{line.text}</p>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-card to-transparent" />
      </div>

      <style jsx>{`
        @keyframes waveform {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
