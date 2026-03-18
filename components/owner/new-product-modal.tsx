"use client"

import { useState } from "react"
import { Plus, X, Loader2, CheckCircle2 } from "lucide-react"
import type { ProductColor, ProductStatus } from "@/lib/product-constants"

const COLORS: { value: ProductColor; label: string; dot: string }[] = [
  { value: "blue",    label: "Blue",    dot: "bg-blue-400" },
  { value: "violet",  label: "Violet",  dot: "bg-violet-400" },
  { value: "emerald", label: "Emerald", dot: "bg-emerald-400" },
  { value: "orange",  label: "Orange",  dot: "bg-orange-400" },
  { value: "cyan",    label: "Cyan",    dot: "bg-cyan-400" },
  { value: "rose",    label: "Rose",    dot: "bg-rose-400" },
]

const STATUSES: { value: ProductStatus; label: string }[] = [
  { value: "active",        label: "Active" },
  { value: "beta",          label: "Beta" },
  { value: "coming-soon",   label: "Coming soon" },
]

export function NewProductModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [tagline, setTagline] = useState("")
  const [color, setColor] = useState<ProductColor>("blue")
  const [status, setStatus] = useState<ProductStatus>("active")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  function close() {
    setOpen(false)
    setError("")
    setSuccess(false)
    setName("")
    setTagline("")
    setColor("blue")
    setStatus("active")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, tagline, color, status }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Failed to create product")
        return
      }
      setSuccess(true)
      // Tell the ProductsList to refresh
      const reload = (window as unknown as Record<string, unknown>).__reloadProducts
      if (typeof reload === "function") reload()
      setTimeout(() => close(), 1500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Plus className="h-4 w-4" />
        New product
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-foreground">New product</h2>
              <button
                onClick={close}
                className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Product name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Talent Pulse"
                  className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Tagline */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Tagline</label>
                <input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  required
                  placeholder="One-line description of the product"
                  className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Color */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">Accent colour</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                        color === c.value
                          ? "border-primary/50 bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProductStatus)}
                  className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              {success && (
                <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Product created successfully
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !name || !tagline}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Create product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
