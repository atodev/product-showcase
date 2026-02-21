"use client"

import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  Users,
  Search,
} from "lucide-react"
import { Kbd } from "@/components/ui/kbd"

const commands = [
  { icon: LayoutDashboard, label: "Go to Overview", group: "Navigation" },
  { icon: Package, label: "Go to Products", group: "Navigation" },
  { icon: BarChart3, label: "Go to Analytics", group: "Navigation" },
  { icon: Users, label: "Go to Customers", group: "Navigation" },
  { icon: Settings, label: "Go to Settings", group: "Navigation" },
]

export function CommandSearch() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-sm items-center gap-2 rounded-lg border border-border bg-secondary px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search anything...</span>
        <Kbd>
          <span className="text-xs">{"⌘"}</span>K
        </Kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {commands.map((cmd) => {
              const Icon = cmd.icon
              return (
                <CommandItem key={cmd.label} onSelect={() => setOpen(false)}>
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{cmd.label}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
