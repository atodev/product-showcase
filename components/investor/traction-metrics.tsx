import { MetricCard } from "@/components/dashboard/metric-card"
import type { ProductData } from "@/lib/product-data"

interface TractionMetricsProps {
  product: ProductData
}

export function TractionMetrics({ product }: TractionMetricsProps) {
  const { metrics } = product
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Monthly Recurring Revenue"
        value={metrics.mrr}
        change={metrics.mrrChange}
        changeType="positive"
        iconName="DollarSign"
      />
      <MetricCard
        title="Annual Run Rate"
        value={metrics.arr}
        change={metrics.arrChange}
        changeType="positive"
        iconName="TrendingUp"
      />
      <MetricCard
        title="Paying Customers"
        value={metrics.customers}
        change={metrics.customersChange}
        changeType="positive"
        iconName="Users"
      />
      <MetricCard
        title="Net Revenue Retention"
        value={metrics.nrr}
        change={metrics.nrrChange}
        changeType="positive"
        iconName="BarChart3"
      />
    </div>
  )
}
