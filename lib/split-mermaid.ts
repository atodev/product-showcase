export type ContentPart = { type: "markdown" | "mermaid"; content: string }

export function splitMermaid(content: string): ContentPart[] {
  const parts: ContentPart[] = []
  const regex = /```mermaid\n([\s\S]*?)```/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "markdown", content: content.slice(lastIndex, match.index) })
    }
    parts.push({ type: "mermaid", content: match[1].trim() })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < content.length) {
    parts.push({ type: "markdown", content: content.slice(lastIndex) })
  }

  return parts
}
