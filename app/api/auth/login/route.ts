import { NextRequest, NextResponse } from "next/server"
import {
  findUserByKey,
  verifyPassword,
  createSession,
  SESSION_COOKIE,
} from "@/lib/auth"

// POST /api/auth/login
// Body: { key: string } — returns user metadata (name, email, setupComplete)
// Body: { key: string, password: string } — full login for users who completed setup
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { key, password } = body as { key?: string; password?: string }

  if (!key) {
    return NextResponse.json({ error: "Access key is required" }, { status: 400 })
  }

  const user = findUserByKey(key)
  if (!user) {
    return NextResponse.json({ error: "Invalid access key" }, { status: 401 })
  }

  // Step 1: key-only lookup — return metadata so the client can show the correct step
  if (!password) {
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      setupComplete: user.setupComplete,
    })
  }

  // Step 2: key + password — authenticate returning user
  if (!user.setupComplete) {
    return NextResponse.json(
      { error: "Account setup not complete. Please set your password first." },
      { status: 403 }
    )
  }

  if (!verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const sessionId = createSession(user.id, user.role)

  const res = NextResponse.json({ success: true, role: user.role })
  res.cookies.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return res
}
