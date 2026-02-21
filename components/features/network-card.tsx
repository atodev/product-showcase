"use client"

const nodes = [
  { id: 1, cx: 80, cy: 55, key: true },
  { id: 2, cx: 200, cy: 40, key: false },
  { id: 3, cx: 320, cy: 65, key: true },
  { id: 4, cx: 140, cy: 130, key: false },
  { id: 5, cx: 260, cy: 140, key: false },
  { id: 6, cx: 400, cy: 110, key: false },
  { id: 7, cx: 50, cy: 170, key: false },
  { id: 8, cx: 180, cy: 210, key: true },
  { id: 9, cx: 340, cy: 200, key: false },
  { id: 10, cx: 460, cy: 55, key: false },
  { id: 11, cx: 430, cy: 190, key: false },
  { id: 12, cx: 100, cy: 240, key: false },
]

const links: [number, number][] = [
  [1, 2], [1, 4], [1, 7],
  [2, 3], [2, 4], [2, 5],
  [3, 5], [3, 6], [3, 10],
  [4, 5], [4, 7], [4, 8],
  [5, 6], [5, 8], [5, 9],
  [6, 10], [6, 11],
  [7, 8], [7, 12],
  [8, 9], [8, 12],
  [9, 11],
  [10, 11],
]

function getNode(id: number) {
  return nodes.find((n) => n.id === id)!
}

export function NetworkCard() {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.2)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)]" />

      <div className="relative flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Network Visualization
            </h3>
            <p className="text-xs text-muted-foreground">
              Organizational influence mapping
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs text-muted-foreground">3 Key Nodes</span>
          </div>
        </div>

        {/* SVG network graph */}
        <div className="relative w-full overflow-hidden rounded-lg border border-border bg-secondary/30">
          <svg
            viewBox="0 0 520 270"
            className="h-auto w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Glow filter for key nodes */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Pulse animation */}
              <radialGradient id="pulse-ring" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Links */}
            {links.map(([fromId, toId]) => {
              const from = getNode(fromId)
              const to = getNode(toId)
              const isHighlight = from.key || to.key
              return (
                <line
                  key={`${fromId}-${toId}`}
                  x1={from.cx}
                  y1={from.cy}
                  x2={to.cx}
                  y2={to.cy}
                  stroke={isHighlight ? "#3b82f6" : "#1f1f1f"}
                  strokeOpacity={isHighlight ? 0.35 : 0.6}
                  strokeWidth={isHighlight ? 1.2 : 0.8}
                />
              )
            })}

            {/* Nodes */}
            {nodes.map((node) =>
              node.key ? (
                <g key={node.id}>
                  {/* Animated pulse ring */}
                  <circle cx={node.cx} cy={node.cy} r="16" fill="url(#pulse-ring)">
                    <animate
                      attributeName="r"
                      values="10;20;10"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0;0.6"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Glow circle */}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="6"
                    fill="#3b82f6"
                    filter="url(#glow)"
                  />
                  {/* Bright core */}
                  <circle cx={node.cx} cy={node.cy} r="3.5" fill="#60a5fa" />
                </g>
              ) : (
                <g key={node.id}>
                  <circle cx={node.cx} cy={node.cy} r="4" fill="#1f1f1f" stroke="#2a2a2a" strokeWidth="1" />
                  <circle cx={node.cx} cy={node.cy} r="2" fill="#525252" />
                </g>
              )
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
            <span className="text-xs text-muted-foreground">Active Influencers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#525252]" />
            <span className="text-xs text-muted-foreground">Team Members</span>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            12 nodes / 23 connections
          </div>
        </div>
      </div>
    </div>
  )
}
