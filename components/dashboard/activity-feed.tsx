"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    name: "Sarah Chen",
    initials: "SC",
    action: "purchased",
    item: "Pro License",
    time: "2m ago",
  },
  {
    name: "Marcus Rivera",
    initials: "MR",
    action: "upgraded to",
    item: "Enterprise",
    time: "15m ago",
  },
  {
    name: "Priya Patel",
    initials: "PP",
    action: "left a review on",
    item: "Dashboard Kit",
    time: "1h ago",
  },
  {
    name: "Alex Kim",
    initials: "AK",
    action: "subscribed to",
    item: "Monthly Plan",
    time: "3h ago",
  },
  {
    name: "Jordan Lee",
    initials: "JL",
    action: "downloaded",
    item: "SDK v2.4",
    time: "5h ago",
  },
]

export function ActivityFeed() {
  return (
    <div className="flex flex-col gap-4">
      {activities.map((activity, i) => (
        <div key={i} className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarFallback className="bg-secondary text-xs text-muted-foreground">
              {activity.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm text-foreground">
              <span className="font-medium">{activity.name}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-medium text-primary">{activity.item}</span>
            </p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">{activity.time}</span>
        </div>
      ))}
    </div>
  )
}
