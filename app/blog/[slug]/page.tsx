import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Zap, ArrowLeft, BookOpen, ArrowUpRight } from "lucide-react"
import { getAllPosts, getPost } from "@/lib/posts"
import { GiscusComments } from "@/components/blog/giscus-comments"
import { MermaidDiagram } from "@/components/blog/mermaid-diagram"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Atodev`,
    description: post.excerpt,
    icons: { icon: "/favicon.svg" },
  }
}

function splitMermaid(content: string) {
  const parts: { type: "markdown" | "mermaid"; content: string }[] = []
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

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">

      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-8 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Atodev</span>
        </Link>
        <Link
          href="/blog"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Blog
        </Link>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-2xl">

          {/* Post header */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
              {post.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Post body */}
          <div className="prose prose-invert prose-sm max-w-none mb-16
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:rounded prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:text-foreground prose-code:text-xs
            prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-card
            prose-li:text-muted-foreground
            prose-strong:text-foreground
            prose-hr:border-border">
            {splitMermaid(post.content).map((part, i) =>
              part.type === "mermaid" ? (
                <MermaidDiagram key={i} chart={part.content} />
              ) : (
                <ReactMarkdown
                  key={i}
                  components={{
                    // eslint-disable-next-line @next/next/no-img-element
                    img: ({ src, alt, ...props }) => (
                      <img
                        src={src ?? ""}
                        alt={alt ?? ""}
                        {...props}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "auto",
                          borderRadius: "12px",
                          margin: "24px 0",
                          border: "1px solid #1f1f1f",
                        }}
                      />
                    ),
                  }}
                >
                  {part.content}
                </ReactMarkdown>
              )
            )}
          </div>

          {/* Slides embed */}
          {post.slides && (
            <div className="mb-6 relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: "68%" }}>
              <iframe
                src={post.slides}
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          )}

          {/* Audio player */}
          {post.audio && (
            <div className="mb-6 rounded-xl border border-border bg-card p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Audio Overview
              </p>
              {post.audioTitle && (
                <p className="mb-3 text-sm font-medium text-foreground">{post.audioTitle}</p>
              )}
              <audio controls className="w-full" style={{ accentColor: "#3b82f6" }}>
                <source src={post.audio} type="audio/mp4" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* NotebookLM card */}
          {post.notebooklm && (
            <a
              href={post.notebooklm}
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-8 flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-4 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Explore in NotebookLM</p>
                  <p className="text-xs text-muted-foreground">Ask questions, explore sources, and listen to the AI audio overview</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          )}

          {/* Divider */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">Comments</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* Giscus comments */}
          <GiscusComments />

        </div>
      </main>

      <footer className="border-t border-border px-8 py-5">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Atodev</p>
      </footer>

    </div>
  )
}
