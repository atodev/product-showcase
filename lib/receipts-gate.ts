import crypto from "crypto"

// Gate for the private "receipts" post. Content lives in a private GitHub repo and is
// only served after the visitor enters the shared access code.
//
// Required env vars (server only):
//   RECEIPTS_CODE           the 8-letter access code
//   RECEIPTS_COOKIE_SECRET  long random string used to sign the access cookie
//   RECEIPTS_GITHUB_TOKEN   fine-grained token, read-only "Contents" on the private repo

export const COOKIE_NAME = "receipts_access"
export const COOKIE_MAX_AGE_S = 60 * 60 * 24 * 7
export const REPO = "atodev/receipts_that_follow_your_money"
export const CODE_RE = /^[A-Za-z]{8}$/

export function configured(): boolean {
  return Boolean(
    process.env.RECEIPTS_CODE && process.env.RECEIPTS_COOKIE_SECRET && process.env.RECEIPTS_GITHUB_TOKEN
  )
}

const sha = (s: string) => crypto.createHash("sha256").update(s).digest("hex")

function sign(expiry: number): string {
  // Bound to the current code, so changing RECEIPTS_CODE revokes every existing cookie.
  const msg = `${expiry}.${sha((process.env.RECEIPTS_CODE ?? "").toLowerCase())}`
  return crypto.createHmac("sha256", process.env.RECEIPTS_COOKIE_SECRET ?? "").update(msg).digest("hex")
}

export function makeToken(): string {
  const expiry = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE_S
  return `${expiry}.${sign(expiry)}`
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb)
}

export function validToken(token: string | undefined): boolean {
  if (!token || !configured()) return false
  const [expStr, mac] = token.split(".")
  const expiry = Number(expStr)
  if (!mac || !Number.isFinite(expiry) || expiry < Date.now() / 1000) return false
  return safeEqual(mac, sign(expiry))
}

export function codeMatches(input: string): boolean {
  if (!CODE_RE.test(input) || !configured()) return false
  return safeEqual(sha(input.toLowerCase()), sha((process.env.RECEIPTS_CODE ?? "").toLowerCase()))
}

// Best-effort throttle (per server instance). 8 failures per 15 minutes per IP.
const fails = new Map<string, number[]>()
export function throttled(ip: string): boolean {
  const cutoff = Date.now() - 15 * 60 * 1000
  const recent = (fails.get(ip) ?? []).filter((t) => t > cutoff)
  fails.set(ip, recent)
  return recent.length >= 8
}
export function recordFailure(ip: string) {
  fails.set(ip, [...(fails.get(ip) ?? []), Date.now()])
}

export function githubFile(path: string): Promise<Response> {
  return fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.RECEIPTS_GITHUB_TOKEN}`,
      Accept: "application/vnd.github.raw+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  })
}
