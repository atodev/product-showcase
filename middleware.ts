import { NextRequest, NextResponse } from "next/server"

// Inlined — middleware runs on the Edge runtime and cannot import Node.js modules.
const SESSION_COOKIE = "session_id"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get("host") ?? ""

  // Main domain → serve landing page only
  const isMainDomain =
    hostname === "atodev.xyz" ||
    hostname === "www.atodev.xyz"

  if (isMainDomain) {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/landing", req.url))
    }
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Showcase subdomain (and localhost in dev) — existing auth logic
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value

  // Redirect logged-in users away from /login
  if (pathname === "/login" && sessionId) {
    return NextResponse.redirect(new URL("/investor", req.url))
  }

  // Protected routes require a session cookie (role validated server-side)
  const isProtected =
    pathname.startsWith("/investor") || pathname.startsWith("/owner")

  if (isProtected && !sessionId) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
}
