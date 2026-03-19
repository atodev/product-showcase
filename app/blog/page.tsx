import type { Metadata } from "next"
import Link from "next/link"
import { Zap, ArrowLeft, ArrowRight } from "lucide-react"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Blog — Atodev",
  description: "Thoughts on AI, micro-SaaS, and building software for business.",
  icons: { icon: "/favicon.svg" },
}

export default function BlogPage() {
  const posts = getAllPosts()

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
          href="/"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>
      </header>

      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Blog</h1>
            <p className="text-sm text-muted-foreground">
              Thoughts on AI, micro-SaaS, and building software for business.
            </p>
          </div>

          <div className="flex flex-col gap-px border border-border rounded-xl overflow-hidden">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-6 bg-card px-6 py-5 transition-colors hover:bg-secondary"
              >
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mb-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2 pt-0.5">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-border px-8 py-5">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Atodev</p>
      </footer>

    </div>
  )
}
