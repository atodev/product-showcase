"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Monitor, Cpu, BarChart3 } from "lucide-react"

export function ProductTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="bg-secondary">
        <TabsTrigger value="overview" className="gap-1.5 text-xs">
          <Monitor className="h-3.5 w-3.5" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="specs" className="gap-1.5 text-xs">
          <Cpu className="h-3.5 w-3.5" />
          Specs
        </TabsTrigger>
        <TabsTrigger value="analytics" className="gap-1.5 text-xs">
          <BarChart3 className="h-3.5 w-3.5" />
          Analytics
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Total Users</span>
            <span className="text-sm font-semibold text-foreground">48,294</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Active Sessions</span>
            <span className="text-sm font-semibold text-foreground">12,847</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Conversion Rate</span>
            <span className="text-sm font-semibold text-primary">4.2%</span>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="specs" className="mt-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Latency (p99)</span>
            <span className="text-sm font-semibold text-foreground">42ms</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Uptime</span>
            <span className="text-sm font-semibold text-emerald-400">99.98%</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Edge Regions</span>
            <span className="text-sm font-semibold text-foreground">24</span>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Page Views (24h)</span>
            <span className="text-sm font-semibold text-foreground">1.2M</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Bounce Rate</span>
            <span className="text-sm font-semibold text-foreground">32.1%</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Avg. Session</span>
            <span className="text-sm font-semibold text-foreground">4m 12s</span>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
