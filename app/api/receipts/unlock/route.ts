import { NextRequest, NextResponse } from "next/server"
import { COOKIE_MAX_AGE_S, COOKIE_NAME, codeMatches, makeToken, recordFailure, throttled } from "@/lib/receipts-gate"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
  const back = (q: string) => NextResponse.redirect(new URL(`/blog/receipts${q}`, req.url), 303)

  if (throttled(ip)) return back("?e=wait")

  const form = await req.formData()
  const code = String(form.get("code") ?? "").trim()

  if (!codeMatches(code)) {
    recordFailure(ip)
    await new Promise((r) => setTimeout(r, 600))
    return back("?e=1")
  }

  const res = back("")
  res.cookies.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_S,
  })
  return res
}
