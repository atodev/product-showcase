import type { Metadata } from "next"
import Link from "next/link"
import { cookies } from "next/headers"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import { Zap, ArrowLeft, Lock } from "lucide-react"
import { COOKIE_NAME, githubFile, validToken } from "@/lib/receipts-gate"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Private preview — Atodev",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <header className="flex items-center justify-between border-b border-border px-8 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Atodev</span>
        </Link>
        <Link href="/blog" className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          Blog
        </Link>
      </header>
      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-2xl">{children}</div>
      </main>
      <footer className="border-t border-border px-8 py-5">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Atodev</p>
      </footer>
    </div>
  )
}

export default async function ReceiptsPage({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams
  const token = (await cookies()).get(COOKIE_NAME)?.value

  if (!validToken(token)) {
    return (
      <Shell>
        <div className="mx-auto max-w-sm rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-foreground">
            <Lock className="h-4 w-4 text-primary" />
            <h1 className="text-lg font-semibold">Private preview</h1>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">Enter the 8-letter access code you were given.</p>
          <form method="POST" action="/api/receipts/unlock" className="flex flex-col gap-3">
            <input
              name="code"
              required
              minLength={8}
              maxLength={8}
              pattern="[A-Za-z]{8}"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="8 letters"
              className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm tracking-widest text-foreground"
            />
            <button type="submit" className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
              Open
            </button>
          </form>
          {e === "1" && <p className="mt-3 text-xs text-red-400">That code was not right.</p>}
          {e === "wait" && <p className="mt-3 text-xs text-red-400">Too many attempts. Try again later.</p>}
        </div>
      </Shell>
    )
  }

  const upstream = await githubFile("post.md")
  if (!upstream.ok) {
    return (
      <Shell>
        <p className="text-sm text-muted-foreground">This post is temporarily unavailable.</p>
      </Shell>
    )
  }
  const { data, content } = matter(await upstream.text())

  return (
    <Shell>
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          {(data.tags as string[] | undefined)?.map((tag) => (
            <span key={tag} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">{data.title}</h1>
        <p className="text-xs text-muted-foreground">
          {new Date(data.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      <div
        className="prose prose-invert prose-sm max-w-none mb-16
        prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-code:rounded prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:text-foreground prose-code:text-xs
        prose-li:text-muted-foreground prose-strong:text-foreground"
      >
        <ReactMarkdown
          components={{
            // eslint-disable-next-line @next/next/no-img-element
            img: ({ src, alt }) => (
              <img
                src={typeof src === "string" ? src : ""}
                alt={alt ?? ""}
                style={{ display: "block", width: "100%", height: "auto", borderRadius: "12px", margin: "24px 0", border: "1px solid #1f1f1f" }}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {data.audio && (
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Audio Overview</p>
          {data.audioTitle && <p className="mb-3 text-sm font-medium text-foreground">{data.audioTitle}</p>}
          <audio controls preload="none" className="w-full" style={{ accentColor: "#3b82f6" }}>
            <source src={String(data.audio)} type="audio/mp4" />
          </audio>
        </div>
      )}
    </Shell>
  )
}
