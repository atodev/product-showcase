"use client"

import { useEffect, useState } from "react"
import { Package, RefreshCw, ArrowUpRight } from "lucide-react"
import { COLOR_META, STATUS_META, type DynamicProduct } from "@/lib/product-constants"

// Built-in products are always shown; dynamic ones are loaded from the API
const BUILTIN = [
  { id: "interview-edge",   name: "Interview Edge",   tagline: "AI-powered candidate intelligence",                     color: "blue" as const,   status: "active" as const, url: undefined },
  { id: "ona-dashboard",    name: "ONA Dashboard",    tagline: "Organisational network analytics",                      color: "violet" as const, status: "active" as const, url: undefined },
  { id: "strait-of-hormuz", name: "Strait of Hormuz", tagline: "See what's actually happening in the Strait of Hormuz", color: "cyan" as const,   status: "active" as const, url: "https://strait-of-hormuz.atodev.xyz" },
]

export function ProductsList() {
  const [dynamic, setDynamic] = useState<DynamicProduct[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch("/api/products")
      if (res.ok) {
        const data = await res.json()
        setDynamic(data.products)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // Expose a reload function so the modal can trigger a refresh after creation
  // We attach it to the window so NewProductModal can call it without prop drilling
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__reloadProducts = load
    return () => { delete (window as unknown as Record<string, unknown>).__reloadProducts }
  }, [])

  const all = [...BUILTIN, ...dynamic]

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Products</h2>
          <p className="text-xs text-muted-foreground">{all.length} product{all.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={load}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Refresh"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {all.map((p) => {
          const colorMeta = COLOR_META[p.color]
          const statusMeta = STATUS_META[p.status]
          const url = (p as { url?: string }).url
          const Wrapper = url ? "a" : "div"
          const wrapperProps = url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {}
          return (
            <Wrapper
              key={p.id}
              {...wrapperProps}
              className="flex items-center gap-4 rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary/20 hover:bg-accent/30"
            >
              {/* Icon */}
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorMeta.bg}`}>
                <Package className={`h-4 w-4 ${colorMeta.accent}`} />
              </div>

              {/* Name + tagline */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${colorMeta.dot}`} />
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.tagline}</p>
              </div>

              {/* Status badge + external link icon */}
              <span className={`shrink-0 rounded-md px-2.5 py-0.5 text-xs font-medium ${statusMeta.classes}`}>
                {statusMeta.label}
              </span>
              {url && <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
            </Wrapper>
          )
        })}
      </div>
    </div>
  )
}
