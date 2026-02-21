"use client"

import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroHeader() {
  return (
    <section className="relative mb-10 flex flex-col items-center text-center">
      {/* Subtle radial glow behind the headline */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />

      <div className="relative flex max-w-2xl flex-col items-center gap-5">
        {/* Tagline */}
        <h1 className="text-balance font-sans text-4xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
          Insights into Action
        </h1>

        {/* Sub-headline */}
        <p className="max-w-lg text-pretty font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
          The ultimate command center for visualizing organizational dynamics and social reach.
        </p>

        {/* CTA Buttons */}
        <div className="mt-2 flex items-center gap-3">
          <Button
            size="lg"
            className="bg-foreground text-background font-sans font-medium hover:bg-foreground/90"
          >
            Connect Network
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border font-sans font-medium text-muted-foreground hover:border-foreground/30 hover:text-foreground"
          >
            <Play className="mr-1 h-4 w-4" />
            View Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
