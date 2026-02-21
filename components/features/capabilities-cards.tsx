"use client"

import { Shield, CloudCog, Blocks } from "lucide-react"

const integrationLogos = [
  { name: "Slack", color: "#E01E5A" },
  { name: "GitHub", color: "#f5f5f5" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Discord", color: "#5865F2" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Linear", color: "#5E6AD2" },
]

export function SecurityCard() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.2)]">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-chart-4/5 blur-[60px] transition-all duration-700 group-hover:bg-chart-4/15" />

      <div className="relative flex flex-col items-start gap-4 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/60">
          <Shield className="h-5 w-5 text-chart-4" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-foreground">End-to-End Security</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            AES-256 encryption at rest and in transit. Your data never leaves your secure environment.
          </p>
        </div>
        {/* Visual lock bar */}
        <div className="flex w-full items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
            <div className="h-full w-full rounded-full bg-chart-4/60" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-chart-4">Encrypted</span>
        </div>
      </div>
    </div>
  )
}

export function CloudSyncCard() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.2)]">
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-chart-2/5 blur-[60px] transition-all duration-700 group-hover:bg-chart-2/15" />

      <div className="relative flex flex-col items-start gap-4 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/60">
          <CloudCog className="h-5 w-5 text-chart-2" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-foreground">Auto-Cloud Sync</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Automatic multi-region replication keeps your data consistent across every cloud zone.
          </p>
        </div>
        {/* Sync visual */}
        <div className="flex w-full items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div className="h-3 w-3 rounded-full border border-chart-2/40 bg-chart-2/20" />
            <span className="text-[9px] text-muted-foreground">US-East</span>
          </div>
          <div className="h-px flex-1 bg-chart-2/30" />
          <div className="flex flex-col items-center gap-1">
            <div className="h-3 w-3 rounded-full border border-chart-2/40 bg-chart-2/20" />
            <span className="text-[9px] text-muted-foreground">EU-West</span>
          </div>
          <div className="h-px flex-1 bg-chart-2/30" />
          <div className="flex flex-col items-center gap-1">
            <div className="h-3 w-3 rounded-full border border-chart-2/40 bg-chart-2/20" />
            <span className="text-[9px] text-muted-foreground">AP-South</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NativeIntegrationsCard() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.2)]">
      <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-chart-3/5 blur-[60px] transition-all duration-700 group-hover:bg-chart-3/15" />

      <div className="relative flex flex-col items-start gap-4 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/60">
          <Blocks className="h-5 w-5 text-chart-3" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-foreground">Native Integrations</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Connects natively with 50+ tools you already use, no middleware required.
          </p>
        </div>
        {/* Logo cloud */}
        <div className="flex flex-wrap gap-2">
          {integrationLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 transition-colors group-hover:border-border/80"
            >
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: logo.color }} />
              <span className="text-[11px] font-medium text-muted-foreground">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
