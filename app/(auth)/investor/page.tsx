import { PRODUCTS } from "@/lib/product-data"
import { MarketOpportunity } from "@/components/investor/market-opportunity"
import { TractionMetrics } from "@/components/investor/traction-metrics"
import { GrowthTimeline } from "@/components/investor/growth-timeline"
import { GrowthChart } from "@/components/dashboard/growth-chart"

export const metadata = {
  title: "Investor View · Atodev",
}

export default function InvestorPage() {
  const ie = PRODUCTS["interview-edge"]
  const ona = PRODUCTS["ona-dashboard"]

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Investor Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Market opportunity, traction, and company milestones
        </p>
      </div>

      {/* Market opportunity */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Market Opportunity
        </h2>
        <MarketOpportunity />
      </section>

      {/* ── Interview Edge ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-foreground">{ie.name}</h2>
          <span className="text-sm text-muted-foreground">— {ie.tagline}</span>
        </div>

        <TractionMetrics product={ie} />

        <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">MRR Growth</h3>
              <p className="text-xs text-muted-foreground">
                Monthly recurring revenue — past 12 months
              </p>
            </div>
            <span className="rounded-md bg-blue-400/10 px-2.5 py-1 text-xs font-medium text-blue-400">
              +21.4%
            </span>
          </div>
          <GrowthChart
            data={ie.chartData}
            color={ie.gradientColor}
            gradientId="ie-gradient"
            valueLabel="MRR"
            height={220}
          />
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* ── ONA Dashboard ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
          <h2 className="text-base font-semibold text-foreground">{ona.name}</h2>
          <span className="text-sm text-muted-foreground">— {ona.tagline}</span>
        </div>

        <TractionMetrics product={ona} />

        <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">MRR Growth</h3>
              <p className="text-xs text-muted-foreground">
                Monthly recurring revenue — past 12 months
              </p>
            </div>
            <span className="rounded-md bg-violet-400/10 px-2.5 py-1 text-xs font-medium text-violet-400">
              +13.2%
            </span>
          </div>
          <GrowthChart
            data={ona.chartData}
            color={ona.gradientColor}
            gradientId="ona-gradient"
            valueLabel="MRR"
            height={220}
          />
        </div>
      </section>

      {/* Milestones */}
      <section>
        <GrowthTimeline />
      </section>
    </div>
  )
}
