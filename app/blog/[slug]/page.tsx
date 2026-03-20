import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Zap, ArrowLeft } from "lucide-react"
import { getAllPosts, getPost } from "@/lib/posts"
import { GiscusComments } from "@/components/blog/giscus-comments"

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
            <ReactMarkdown
              components={{
                img: ({ src, alt }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={alt ?? ""}
                    className="rounded-xl border border-border w-full my-6"
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

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
