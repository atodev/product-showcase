"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Zap, LogOut, Loader2 } from "lucide-react"
import { useState } from "react"

type Role = "investor" | "owner"

interface Tab {
  label: string
  href: string
  roles: Role[]
}

const TABS: Tab[] = [
  { label: "Products", href: "/", roles: ["investor", "owner"] },
  { label: "Investor", href: "/investor", roles: ["investor", "owner"] },
  { label: "Owner", href: "/owner", roles: ["owner"] },
]

interface PersonaTabsProps {
  role: Role
  userName: string
}

export function PersonaTabs({ role, userName }: PersonaTabsProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const visibleTabs = TABS.filter((t) => t.roles.includes(role))

  async function handleLogout() {
    setLoggingOut(true)
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-sidebar px-6 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-bold tracking-tight text-foreground">
          Atodev
        </span>
      </div>

      {/* Tabs */}
      <nav className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
        {visibleTabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>

      {/* User + logout */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {userName}
        </span>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground disabled:opacity-50"
        >
          {loggingOut ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <LogOut className="h-3.5 w-3.5" />
          )}
          Sign out
        </button>
      </div>
    </header>
  )
}
