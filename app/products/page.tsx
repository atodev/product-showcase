import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { HeroHeader } from "@/components/features/hero-header"
import { HeroCard } from "@/components/features/hero-card"
import { PerformanceCard } from "@/components/features/performance-card"
import {
  SecurityCard,
  CloudSyncCard,
  NativeIntegrationsCard,
} from "@/components/features/capabilities-cards"
import { SocialProofCard } from "@/components/features/social-proof-card"
import { NetworkCard } from "@/components/features/network-card"

export default function ProductsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <SidebarNav />

      <main className="flex flex-1 flex-col overflow-y-auto">
        <DashboardHeader />

        <div className="flex-1 p-6">
          {/* Hero Header */}
          <HeroHeader />

          {/* Bento grid */}
          <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
            {/* Hero - spans 8 columns */}
            <div className="md:col-span-6 lg:col-span-8">
              <HeroCard />
            </div>

            {/* Social Proof - tall card on the right, spans 4 columns */}
            <div className="h-full md:col-span-6 lg:col-span-4 lg:row-span-2">
              <SocialProofCard />
            </div>

            {/* Performance - medium card under hero */}
            <div className="md:col-span-6 lg:col-span-8">
              <PerformanceCard />
            </div>

            {/* Three capability cards */}
            <div className="md:col-span-3 lg:col-span-4">
              <SecurityCard />
            </div>
            <div className="md:col-span-3 lg:col-span-4">
              <CloudSyncCard />
            </div>
            <div className="md:col-span-6 lg:col-span-4">
              <NativeIntegrationsCard />
            </div>

            {/* Network Visualization - full width */}
            <div className="md:col-span-6 lg:col-span-12">
              <NetworkCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
