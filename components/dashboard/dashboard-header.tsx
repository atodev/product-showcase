"use client"

import Link from "next/link"
import { Bell, LogIn } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CommandSearch } from "@/components/dashboard/command-search"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <CommandSearch />
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>
        <Avatar className="h-8 w-8 border border-border">
          <AvatarFallback className="bg-secondary text-xs text-muted-foreground">
            AD
          </AvatarFallback>
        </Avatar>
        <Link
          href="/login"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          <LogIn className="h-3.5 w-3.5" />
          Sign in
        </Link>
      </div>
    </header>
  )
}
