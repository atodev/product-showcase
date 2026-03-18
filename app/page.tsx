import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GrowthChart } from "@/components/dashboard/growth-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { StatusBadges } from "@/components/dashboard/status-badges"
import { ProductTabs } from "@/components/dashboard/product-tabs"
import { MetricCard } from "@/components/dashboard/metric-card"
import { PRODUCTS } from "@/lib/product-data"

export default function Home() {
  const ie = PRODUCTS["interview-edge"]
  const ona = PRODUCTS["ona-dashboard"]

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <SidebarNav />

      <main className="flex flex-1 flex-col overflow-y-auto">
        <DashboardHeader />

        <div className="flex-1 space-y-6 p-6">

          {/* Interview Edge metrics */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Interview Edge
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="MRR" value={ie.metrics.mrr} change={ie.metrics.mrrChange} changeType="positive" iconName="DollarSign" />
              <MetricCard title="Annual Run Rate" value={ie.metrics.arr} change={ie.metrics.arrChange} changeType="positive" iconName="TrendingUp" />
              <MetricCard title="Customers" value={ie.metrics.customers} change={ie.metrics.customersChange} changeType="positive" iconName="Users" />
              <MetricCard title="Net Revenue Retention" value={ie.metrics.nrr} change={ie.metrics.nrrChange} changeType="positive" iconName="BarChart3" />
            </div>
          </div>

          {/* ONA Dashboard metrics */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                ONA Dashboard
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="MRR" value={ona.metrics.mrr} change={ona.metrics.mrrChange} changeType="positive" iconName="DollarSign" />
              <MetricCard title="Annual Run Rate" value={ona.metrics.arr} change={ona.metrics.arrChange} changeType="positive" iconName="TrendingUp" />
              <MetricCard title="Customers" value={ona.metrics.customers} change={ona.metrics.customersChange} changeType="positive" iconName="Users" />
              <MetricCard title="Net Revenue Retention" value={ona.metrics.nrr} change={ona.metrics.nrrChange} changeType="positive" iconName="BarChart3" />
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

            {/* IE Growth Chart */}
            <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] lg:col-span-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                    <h2 className="text-base font-semibold text-foreground">Interview Edge — Growth</h2>
                  </div>
                  <p className="text-xs text-muted-foreground">Monthly user acquisition over the past year</p>
                </div>
                <span className="rounded-md bg-blue-400/10 px-2.5 py-1 text-xs font-medium text-blue-400">+21.4%</span>
              </div>
              <GrowthChart data={ie.chartData} color={ie.gradientColor} gradientId="ie-home-gradient" height={220} />
            </div>

            {/* ONA Growth Chart */}
            <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] lg:col-span-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-400" />
                    <h2 className="text-base font-semibold text-foreground">ONA Dashboard — Growth</h2>
                  </div>
                  <p className="text-xs text-muted-foreground">Monthly user acquisition over the past year</p>
                </div>
                <span className="rounded-md bg-violet-400/10 px-2.5 py-1 text-xs font-medium text-violet-400">+13.2%</span>
              </div>
              <GrowthChart data={ona.chartData} color={ona.gradientColor} gradientId="ona-home-gradient" height={220} />
            </div>

            {/* Activity Feed */}
            <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] lg:col-span-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
                <button className="text-xs text-primary hover:underline">View all</button>
              </div>
              <ActivityFeed />
            </div>

            {/* System Status */}
            <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] lg:col-span-4">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-foreground">System Status</h2>
                <p className="text-xs text-muted-foreground">Service availability</p>
              </div>
              <StatusBadges />
            </div>

            {/* Product Tabs */}
            <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] lg:col-span-3">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-foreground">Product View</h2>
                <p className="text-xs text-muted-foreground">Switch between data perspectives</p>
              </div>
              <ProductTabs />
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
