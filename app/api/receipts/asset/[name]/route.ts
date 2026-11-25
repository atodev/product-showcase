import { NextRequest, NextResponse } from "next/server"
import { COOKIE_NAME, githubFile, validToken } from "@/lib/receipts-gate"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ASSETS: Record<string, string> = { "hero.png": "image/png", "audio.m4a": "audio/mp4" }

// The audio is ~16 MB, and GitHub's contents API ignores Range, so keep it in memory per
// instance and serve byte ranges ourselves (needed for seeking, and by Safari).
const cache = new Map<string, Buffer>()

function stream(buf: Buffer): ReadableStream<Uint8Array> {
  const CHUNK = 256 * 1024
  let pos = 0
  return new ReadableStream({
    pull(controller) {
      if (pos >= buf.length) return controller.close()
      controller.enqueue(new Uint8Array(buf.subarray(pos, pos + CHUNK)))
      pos += CHUNK
    },
  })
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const type = ASSETS[name]
  if (!type) return new NextResponse("Not found", { status: 404 })
  if (!validToken(req.cookies.get(COOKIE_NAME)?.value)) return new NextResponse("Forbidden", { status: 403 })

  let buf = cache.get(name)
  if (!buf) {
    const upstream = await githubFile(name)
    if (!upstream.ok) return new NextResponse("Unavailable", { status: 502 })
    buf = Buffer.from(await upstream.arrayBuffer())
    cache.set(name, buf)
  }

  const headers: Record<string, string> = {
    "Content-Type": type,
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex",
  }

  const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.get("range") ?? "")
  if (m && (m[1] || m[2])) {
    let start = m[1] ? Number(m[1]) : buf.length - Number(m[2])
    let end = m[1] && m[2] ? Number(m[2]) : buf.length - 1
    start = Math.max(0, start)
    end = Math.min(end, buf.length - 1)
    if (start > end) {
      return new NextResponse(null, { status: 416, headers: { "Content-Range": `bytes */${buf.length}` } })
    }
    return new Response(stream(buf.subarray(start, end + 1)), {
      status: 206,
      headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${buf.length}`, "Content-Length": String(end - start + 1) },
    })
  }

  return new Response(stream(buf), { headers: { ...headers, "Content-Length": String(buf.length) } })
}
