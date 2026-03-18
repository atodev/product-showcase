import { NextRequest, NextResponse } from "next/server"
import { getSession, findUserById, SESSION_COOKIE } from "@/lib/auth"

// GET /api/auth/me — returns current user from session cookie
export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value
  if (!sessionId) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const session = getSession(sessionId)
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const user = findUserById(session.userId)
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
}
