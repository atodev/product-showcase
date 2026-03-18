import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getSession, SESSION_COOKIE } from "@/lib/auth"
import { VercelCard } from "@/components/owner/vercel-card"
import { SupabaseCard } from "@/components/owner/supabase-card"
import { StripeCard } from "@/components/owner/stripe-card"
import { InvitationModal } from "@/components/owner/invitation-modal"
import { NewProductModal } from "@/components/owner/new-product-modal"
import { ProductsList } from "@/components/owner/products-list"
import { MetricCard } from "@/components/dashboard/metric-card"

export const metadata = {
  title: "Owner Dashboard · Atodev",
}

export default async function OwnerPage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value
  const session = sessionId ? getSession(sessionId) : null

  if (!session || session.role !== "owner") {
    redirect("/investor")
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Owner Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Application health, products, and user management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <NewProductModal />
          <InvitationModal />
        </div>
      </div>

      {/* Top-level health metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Uptime (30d)"    value="99.97%" change="+0.02%" changeType="positive" iconName="TrendingUp" />
        <MetricCard title="Error Rate"      value="0.02%"  change="-0.01%" changeType="positive" iconName="BarChart3" />
        <MetricCard title="Avg Response"    value="38ms"   change="-4ms"   changeType="positive" iconName="TrendingUp" />
        <MetricCard title="Active Sessions" value="1,284"  change="+8.2%"  changeType="positive" iconName="Users" />
      </div>

      {/* Products list */}
      <ProductsList />

      {/* Infrastructure */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Infrastructure
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <VercelCard />
          <SupabaseCard />
          <StripeCard />
        </div>
      </div>
    </div>
  )
}
