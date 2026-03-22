import { describe, it, expect } from "vitest"
import { splitMermaid } from "./split-mermaid"

const MERMAID_BLOCK = `flowchart TD
    A([Start]) --> B[Read program.md]
    B --> C[Make one change]`

const POST_WITH_MERMAID = `## The Experiment Flow

\`\`\`mermaid
${MERMAID_BLOCK}
\`\`\`

## Next Section

Some more text.`

describe("splitMermaid", () => {
  it("returns single markdown part when no mermaid block present", () => {
    const parts = splitMermaid("## Hello\n\nSome text.")
    expect(parts).toHaveLength(1)
    expect(parts[0].type).toBe("markdown")
    expect(parts[0].content).toBe("## Hello\n\nSome text.")
  })

  it("splits content around a mermaid block", () => {
    const parts = splitMermaid(POST_WITH_MERMAID)
    expect(parts).toHaveLength(3)
    expect(parts[0].type).toBe("markdown")
    expect(parts[1].type).toBe("mermaid")
    expect(parts[2].type).toBe("markdown")
  })

  it("extracts the mermaid chart content without the fence", () => {
    const parts = splitMermaid(POST_WITH_MERMAID)
    const mermaidPart = parts.find(p => p.type === "mermaid")!
    expect(mermaidPart.content).toBe(MERMAID_BLOCK.trim())
    expect(mermaidPart.content).not.toContain("```")
    expect(mermaidPart.content).not.toContain("mermaid")
    expect(mermaidPart.content).toContain("flowchart TD")
  })

  it("handles mermaid block at start of content", () => {
    const content = `\`\`\`mermaid\n${MERMAID_BLOCK}\n\`\`\`\n\nsome text`
    const parts = splitMermaid(content)
    expect(parts[0].type).toBe("mermaid")
    expect(parts[1].type).toBe("markdown")
  })

  it("handles mermaid block at end of content", () => {
    const content = `some text\n\n\`\`\`mermaid\n${MERMAID_BLOCK}\n\`\`\``
    const parts = splitMermaid(content)
    expect(parts[0].type).toBe("markdown")
    expect(parts[1].type).toBe("mermaid")
  })

  it("handles multiple mermaid blocks", () => {
    const content = `\`\`\`mermaid\n${MERMAID_BLOCK}\n\`\`\`\n\ntext\n\n\`\`\`mermaid\n${MERMAID_BLOCK}\n\`\`\``
    const parts = splitMermaid(content)
    expect(parts.filter(p => p.type === "mermaid")).toHaveLength(2)
  })

  it("matches the exact mermaid fence in the auto-research post", () => {
    // Replicate the actual fence format from the post
    const actual = "```mermaid\nflowchart TD\n    A([Start]) --> B[Read program.md]\n```"
    const parts = splitMermaid(actual)
    expect(parts).toHaveLength(1)
    expect(parts[0].type).toBe("mermaid")
    expect(parts[0].content).toContain("flowchart TD")
  })
})
