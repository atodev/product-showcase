import type { Metadata } from "next"
import Link from "next/link"
import { Zap, ArrowLeft, ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Products — Atodev",
  description: "AI-powered software and micro-SaaS products built by Atodev.",
  icons: { icon: "/favicon.svg" },
}

const products = [
  {
    dot: "bg-cyan-400",
    label: "Strait of Hormuz",
    href: "https://strait-of-hormuz.atodev.xyz",
    description:
      "See what's actually happening in the Strait of Hormuz. Live vessel tracking and geopolitical intelligence in one view.",
  },
  {
    dot: "bg-violet-400",
    label: "ONA Dashboard",
    href: "https://onadashboard.atodev.xyz",
    description:
      "Organisational network analytics for business leaders. Surface collaboration patterns and team dynamics using AI-driven insights.",
  },
  {
    dot: "bg-blue-400",
    label: "Interview Edge",
    href: "https://interviewedge.atodev.xyz",
    description:
      "AI-powered interview preparation platform. Personalised coaching and real-time feedback to help candidates perform at their best.",
  },
  {
    dot: "bg-emerald-400",
    label: "Bad Weather",
    href: "https://badweather.atodev.xyz",
    description:
      "Intelligent weather risk management for operations teams. AI models that translate forecasts into actionable business decisions.",
  },
]

export default function AllProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">

      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-8 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Atodev</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Products</h1>
            <p className="text-sm text-muted-foreground">
              AI-powered software and micro-SaaS products built for business.
            </p>
          </div>

          <div className="flex flex-col gap-px overflow-hidden rounded-xl border border-border">
            {products.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 bg-card px-6 py-5 transition-colors hover:bg-secondary"
              >
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${p.dot}`} />
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      Live
                    </span>
                  </div>
                  <h2 className="mb-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {p.label}
                  </h2>
                  <p className="text-xs leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-border px-8 py-5">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Atodev</p>
      </footer>

    </div>
  )
}
