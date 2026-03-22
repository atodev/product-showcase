"use client"

import { useEffect, useRef, useState } from "react"

interface Props {
  chart: string
}

export function MermaidDiagram({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const mermaidModule = await import("mermaid")
        const mermaid = mermaidModule.default
        mermaid.initialize({ startOnLoad: false, theme: "dark" })

        if (!ref.current || cancelled) return

        const id = `mermaid-${Math.random().toString(36).slice(2)}`
        const { svg } = await mermaid.render(id, chart)
        if (!ref.current || cancelled) return
        ref.current.innerHTML = svg
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      }
    }

    render()
    return () => { cancelled = true }
  }, [chart])

  if (error) {
    return (
      <pre className="my-6 rounded-xl border border-red-500 bg-card p-4 text-xs text-red-400 overflow-x-auto">
        Mermaid error: {error}{"\n\n"}Chart:{"\n"}{chart}
      </pre>
    )
  }

  return <div ref={ref} className="my-6 flex justify-center overflow-x-auto" />
}
