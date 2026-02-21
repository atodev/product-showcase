"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  Users,
  Bell,
  ChevronLeft,
  ChevronRight,
  Zap,
  Network,
  Mic,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const productSwitchItems = [
  { icon: Network, label: "Network Hub", href: "/products" },
  { icon: Mic, label: "Interview Edge", href: "/interview-edge" },
]

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: BarChart3, label: "Analytics", href: "#" },
  { icon: Users, label: "Customers", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function SidebarNav() {
  const [collapsed, setCollapsed] = useState(true)
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex h-screen flex-col items-center border-r border-border bg-sidebar py-6 transition-all duration-300",
          collapsed ? "w-16" : "w-52"
        )}
      >
        <div className="mb-8 flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="ml-3 text-lg font-bold tracking-tight text-foreground">
              Atodev
            </span>
          )}
        </div>

        {/* Product Switcher */}
        <div className="mb-4 flex w-full flex-col gap-1 border-b border-border px-2 pb-4">
          {!collapsed && (
            <span className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Products
            </span>
          )}
          {productSwitchItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return collapsed ? (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-popover text-popover-foreground">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex h-10 w-full items-center gap-3 rounded-lg px-3 transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>

        <nav className="flex flex-1 flex-col items-center gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return collapsed ? (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-popover text-popover-foreground">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex h-10 w-full items-center gap-3 rounded-lg px-3 transition-colors",
                  isActive
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>
    </TooltipProvider>
  )
}
