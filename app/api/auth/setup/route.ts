import { NextRequest, NextResponse } from "next/server"
import {
  findUserByKey,
  hashPassword,
  readUsers,
  writeUsers,
  createSession,
  SESSION_COOKIE,
} from "@/lib/auth"

// POST /api/auth/setup
// Body: { key: string, password: string }
// Sets the password for a first-time user and logs them in
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { key, password } = body as { key?: string; password?: string }

  if (!key || !password) {
    return NextResponse.json(
      { error: "Access key and password are required" },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    )
  }

  const user = findUserByKey(key)
  if (!user) {
    return NextResponse.json({ error: "Invalid access key" }, { status: 401 })
  }

  if (user.setupComplete) {
    return NextResponse.json(
      { error: "Account already set up. Please log in." },
      { status: 409 }
    )
  }

  // Save hashed password and mark setup complete
  const users = readUsers()
  const idx = users.findIndex((u) => u.id === user.id)
  users[idx].passwordHash = hashPassword(password)
  users[idx].setupComplete = true
  writeUsers(users)

  const sessionId = createSession(user.id, user.role)

  const res = NextResponse.json({ success: true, role: user.role })
  res.cookies.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
