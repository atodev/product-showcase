"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Zap, Cpu, Cloud, Server, ArrowUpRight, ArrowRight, Github } from "lucide-react"
import type { PostMeta } from "@/lib/posts"

const products = [
  {
    dot: "bg-blue-400",
    label: "Interview Edge",
    href: "https://interviewedge.atodev.xyz",
    description:
      "AI-powered interview preparation platform. Personalised coaching and real-time feedback to help candidates perform at their best.",
  },
  {
    dot: "bg-violet-400",
    label: "ONA Dashboard",
    href: "https://onadashboard.atodev.xyz",
    description:
      "Organisational network analytics for business leaders. Surface collaboration patterns and team dynamics using AI-driven insights.",
  },
  {
    dot: "bg-emerald-400",
    label: "Bad Weather",
    href: "https://badweather.atodev.xyz",
    description:
      "Intelligent weather risk management for operations teams. AI models that translate forecasts into actionable business decisions.",
  },
]

const capabilities = [
  {
    icon: Cpu,
    label: "Local AI",
    description:
      "Self-hosted models for privacy-first deployments. Full control, no data leaves your infrastructure.",
  },
  {
    icon: Cloud,
    label: "Cloud AI",
    description:
      "Seamless integrations with leading AI providers — scaled on demand, production-ready from day one.",
  },
  {
    icon: Server,
    label: "Micro-SaaS",
    description:
      "Focused, fast, and built to solve one problem exceptionally well. Lean products that ship and iterate quickly.",
  },
]

const stack = ["Next.js", "TypeScript", "Python", "Tailwind CSS", "Ollama", "OpenAI", "Vercel"]

export function LandingClient({ posts }: { posts: PostMeta[] }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const reveal = (delayMs: number) =>
    ({
      transition: `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
    } as React.CSSProperties)

  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans">

      {/* Dot grid background */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Header */}
      <header className="relative flex items-center justify-between border-b border-border px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Atodev</span>
        </div>
        <Link
          href="https://github.com/atodev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Work with me
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </header>

      <main className="relative flex flex-1 flex-col items-center px-6 py-20">

        {/* Hero */}
        <div className="mb-16 flex flex-col items-center text-center" style={reveal(0)}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Micro-SaaS &amp; AI Development</span>
          </div>

          <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            AI-powered software built for business
          </h1>

          <p className="mb-4 max-w-lg text-base text-muted-foreground">
            Building focused SaaS products and AI solutions that solve real business problems.
            Models can run locally on your infrastructure or scale in the cloud.
          </p>

          <p className="max-w-md text-sm text-muted-foreground/70">
            Independent developer specialising in AI integration and micro-SaaS.
            <br />
            I work with businesses to ship practical, production-ready software that moves fast and stays lean.
          </p>
        </div>

        {/* Capabilities */}
        <div className="mb-16 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {capabilities.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={c.label}
                className="rounded-xl border border-border bg-card p-5 transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]"
                style={reveal(150 + i * 80)}
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
        <div className="mb-16 w-full max-w-3xl" style={reveal(400)}>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Products</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {products.map((p, i) => (
              <Link
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]"
                style={reveal(480 + i * 80)}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${p.dot}`} />
                    <span className="text-sm font-semibold text-foreground">{p.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      Live
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Blog */}
        {posts.length > 0 && (
          <div className="mb-16 w-full max-w-3xl" style={reveal(650)}>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Blog</span>
              <span className="h-px flex-1 bg-border" />
              <Link
                href="/blog"
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                All posts
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between gap-6 bg-card px-6 py-4 transition-colors hover:bg-secondary"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{post.excerpt}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-col items-center gap-4" style={reveal(800)}>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stack</span>
          <div className="flex flex-wrap justify-center gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative border-t border-border px-8 py-5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Atodev</p>
          <Link
            href="https://github.com/atodev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            github.com/atodev
          </Link>
        </div>
      </footer>

    </div>
  )
}
