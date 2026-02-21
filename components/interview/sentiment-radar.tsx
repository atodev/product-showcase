"use client"

import { Brain } from "lucide-react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"

const traits = [
  { trait: "Communication", score: 92 },
  { trait: "Problem Solving", score: 88 },
  { trait: "Technical Depth", score: 95 },
  { trait: "Leadership", score: 78 },
  { trait: "Adaptability", score: 85 },
  { trait: "Collaboration", score: 90 },
]

export function SentimentRadar() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.2)]">
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-emerald-500/5 blur-[80px] transition-all duration-700 group-hover:bg-emerald-500/15" />

      <div className="relative flex items-center gap-3 border-b border-border p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
          <Brain className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-sans text-base font-semibold text-foreground">
            {"Sentiment & Soft Skills"}
          </h3>
          <p className="text-xs text-muted-foreground">
            AI-analyzed candidate profile
          </p>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center p-4">
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={traits}>
            <PolarGrid stroke="#1f1f1f" />
            <PolarAngleAxis
              dataKey="trait"
              tick={{ fontSize: 10, fill: "#737373" }}
              stroke="#1f1f1f"
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 9, fill: "#525252" }}
              axisLine={false}
              stroke="#1f1f1f"
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={2}
              fill="#10b981"
              fillOpacity={0.15}
              dot={{
                r: 3,
                fill: "#10b981",
                stroke: "#10b981",
                strokeWidth: 1,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend row */}
      <div className="flex flex-wrap gap-2 border-t border-border p-4">
        {traits.map((t) => (
          <div key={t.trait} className="flex items-center gap-1.5 rounded-md bg-secondary/40 px-2 py-1">
            <span className="text-[10px] text-muted-foreground">{t.trait}</span>
            <span className="text-[10px] font-bold text-emerald-400">{t.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
