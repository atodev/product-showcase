// Shared types and UI metadata — no Node.js imports, safe to use in client components

export type ProductColor = "blue" | "violet" | "emerald" | "orange" | "cyan" | "rose"
export type ProductStatus = "active" | "beta" | "coming-soon"

export interface DynamicProduct {
  id: string
  name: string
  tagline: string
  color: ProductColor
  status: ProductStatus
  createdAt: string
}

export const COLOR_META: Record<ProductColor, { accent: string; bg: string; dot: string }> = {
  blue:    { accent: "text-blue-400",    bg: "bg-blue-400/10",    dot: "bg-blue-400" },
  violet:  { accent: "text-violet-400",  bg: "bg-violet-400/10",  dot: "bg-violet-400" },
  emerald: { accent: "text-emerald-400", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
  orange:  { accent: "text-orange-400",  bg: "bg-orange-400/10",  dot: "bg-orange-400" },
  cyan:    { accent: "text-cyan-400",    bg: "bg-cyan-400/10",    dot: "bg-cyan-400" },
  rose:    { accent: "text-rose-400",    bg: "bg-rose-400/10",    dot: "bg-rose-400" },
}

export const STATUS_META: Record<ProductStatus, { label: string; classes: string }> = {
  active:        { label: "Active",      classes: "bg-emerald-400/10 text-emerald-400" },
  beta:          { label: "Beta",        classes: "bg-yellow-400/10 text-yellow-400" },
  "coming-soon": { label: "Coming soon", classes: "bg-muted text-muted-foreground" },
}
