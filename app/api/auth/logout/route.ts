import { NextRequest, NextResponse } from "next/server"
import { deleteSession, SESSION_COOKIE } from "@/lib/auth"

// POST /api/auth/logout
export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value
  if (sessionId) {
    deleteSession(sessionId)
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  })
  return res
}
