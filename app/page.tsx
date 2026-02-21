import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GrowthChart } from "@/components/dashboard/growth-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { StatusBadges } from "@/components/dashboard/status-badges"
import { ProductTabs } from "@/components/dashboard/product-tabs"
import { MetricCard } from "@/components/dashboard/metric-card"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <SidebarNav />

      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Top bar */}
        <DashboardHeader />

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Metric Cards Row */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Revenue"
              value="$84,254"
              change="+12.5%"
              changeType="positive"
              iconName="DollarSign"
            />
            <MetricCard
              title="Active Users"
              value="48,294"
              change="+8.2%"
              changeType="positive"
              iconName="Users"
            />
            <MetricCard
              title="Conversions"
              value="2,847"
              change="-3.1%"
              changeType="negative"
              iconName="ShoppingCart"
            />
            <MetricCard
              title="Growth Rate"
              value="24.8%"
              change="+4.3%"
              changeType="positive"
              iconName="TrendingUp"
            />
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Large featured card - Chart */}
            <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] lg:col-span-7">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    Product Growth
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Monthly user acquisition over the past year
                  </p>
                </div>
                <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  +57.4%
                </span>
              </div>
              <GrowthChart />
            </div>

            {/* Activity Feed */}
            <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] lg:col-span-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground">
                  Recent Activity
                </h2>
                <button className="text-xs text-primary hover:underline">
                  View all
                </button>
              </div>
              <ActivityFeed />
            </div>

            {/* Status Badges */}
            <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] lg:col-span-4">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-foreground">
                  System Status
                </h2>
                <p className="text-xs text-muted-foreground">
                  Service availability
                </p>
              </div>
              <StatusBadges />
            </div>

            {/* Product Tabs */}
            <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] lg:col-span-4">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-foreground">
                  Product View
                </h2>
                <p className="text-xs text-muted-foreground">
                  Switch between data perspectives
                </p>
              </div>
              <ProductTabs />
            </div>

            {/* Quick Stats Card */}
            <div className="group overflow-hidden rounded-xl border border-border bg-card p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] lg:col-span-4">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-foreground">
                  Performance
                </h2>
                <p className="text-xs text-muted-foreground">
                  Core metrics snapshot
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Requests / sec</span>
                  <span className="text-lg font-bold text-foreground">14.2k</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Error Rate</span>
                  <span className="text-lg font-bold text-emerald-400">0.02%</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Response</span>
                  <span className="text-lg font-bold text-foreground">38ms</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cache Hit</span>
                  <span className="text-lg font-bold text-primary">94.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
