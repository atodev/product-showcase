import { Zap, Code2, Cpu, Cloud, Server } from "lucide-react"

const products = [
  {
    dot: "bg-blue-400",
    label: "Interview Edge",
    description: "AI-powered interview preparation platform. Personalised coaching and real-time feedback to help candidates perform at their best.",
  },
  {
    dot: "bg-violet-400",
    label: "ONA Dashboard",
    description: "Organisational network analytics for business leaders. Surface collaboration patterns and team dynamics using AI-driven insights.",
  },
  {
    dot: "bg-emerald-400",
    label: "Bad Weather",
    description: "Intelligent weather risk management for operations teams. AI models that translate forecasts into actionable business decisions.",
  },
]

const capabilities = [
  {
    icon: Cpu,
    label: "Local AI",
    description: "Self-hosted models for privacy-first deployments. Full control, no data leaves your infrastructure.",
  },
  {
    icon: Cloud,
    label: "Cloud AI",
    description: "Seamless integrations with leading AI providers — scaled on demand, production-ready from day one.",
  },
  {
    icon: Server,
    label: "Micro-SaaS",
    description: "Focused, fast, and built to solve one problem exceptionally well. Lean products that ship and iterate quickly.",
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">

      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Atodev</span>
        </div>
        <span className="text-xs text-muted-foreground">atodev.xyz</span>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 py-20">

        {/* Hero */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Micro-SaaS &amp; AI Development</span>
          </div>

          <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            AI-powered software built for business
          </h1>

          <p className="max-w-lg text-base text-muted-foreground">
            Building focused SaaS products and AI solutions that solve real business problems —
            whether models run locally on your infrastructure or scale in the cloud.
          </p>
        </div>

        {/* Capability pills */}
        <div className="mb-16 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {capabilities.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.label}
                className="rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{c.label}</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{c.description}</p>
              </div>
            )
          })}
        </div>

        {/* Products */}
        <div className="w-full max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Products</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.label}
                className="group rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${p.dot}`} />
                  <span className="text-sm font-semibold text-foreground">{p.label}</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack note */}
        <div className="mt-12 flex items-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5" />
            <span>TypeScript · Next.js · Python</span>
          </div>
          <span className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5" />
            <span>Local &amp; cloud AI</span>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border px-8 py-5 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Atodev &mdash; atodev.xyz
        </p>
      </footer>

    </div>
  )
}
