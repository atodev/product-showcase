export type Product = "interview-edge" | "ona-dashboard"

export interface ProductData {
  id: Product
  name: string
  tagline: string
  color: string           // Tailwind color key used for accents
  accentClass: string     // e.g. "text-blue-400"
  bgClass: string         // e.g. "bg-blue-400/10"
  gradientColor: string   // hex for chart gradient
  chartData: { month: string; value: number }[]
  metrics: {
    mrr: string
    arr: string
    customers: string
    nrr: string
    mrrChange: string
    arrChange: string
    customersChange: string
    nrrChange: string
  }
}

export const PRODUCTS: Record<Product, ProductData> = {
  "interview-edge": {
    id: "interview-edge",
    name: "Interview Edge",
    tagline: "AI-powered candidate intelligence",
    color: "blue",
    accentClass: "text-blue-400",
    bgClass: "bg-blue-400/10",
    gradientColor: "#3b82f6",
    chartData: [
      { month: "Jan", value: 1200 },
      { month: "Feb", value: 1800 },
      { month: "Mar", value: 2400 },
      { month: "Apr", value: 3100 },
      { month: "May", value: 3800 },
      { month: "Jun", value: 4600 },
      { month: "Jul", value: 5500 },
      { month: "Aug", value: 6800 },
      { month: "Sep", value: 8200 },
      { month: "Oct", value: 9600 },
      { month: "Nov", value: 11400 },
      { month: "Dec", value: 13900 },
    ],
    metrics: {
      mrr: "$18,700",
      arr: "$224.4K",
      customers: "156",
      nrr: "122%",
      mrrChange: "+21.4%",
      arrChange: "+21.4%",
      customersChange: "+14.7%",
      nrrChange: "+4.1%",
    },
  },
  "ona-dashboard": {
    id: "ona-dashboard",
    name: "ONA Dashboard",
    tagline: "Organisational network analytics",
    color: "violet",
    accentClass: "text-violet-400",
    bgClass: "bg-violet-400/10",
    gradientColor: "#a78bfa",
    chartData: [
      { month: "Jan", value: 600 },
      { month: "Feb", value: 900 },
      { month: "Mar", value: 1200 },
      { month: "Apr", value: 1600 },
      { month: "May", value: 2100 },
      { month: "Jun", value: 2700 },
      { month: "Jul", value: 3400 },
      { month: "Aug", value: 4200 },
      { month: "Sep", value: 5100 },
      { month: "Oct", value: 6300 },
      { month: "Nov", value: 7800 },
      { month: "Dec", value: 9600 },
    ],
    metrics: {
      mrr: "$9,700",
      arr: "$116.4K",
      customers: "58",
      nrr: "111%",
      mrrChange: "+13.2%",
      arrChange: "+13.2%",
      customersChange: "+6.4%",
      nrrChange: "+1.8%",
    },
  },
}

export const COMBINED = {
  mrr: "$28,400",
  arr: "$340.8K",
  customers: "214",
  nrr: "118%",
}
