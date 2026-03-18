import { NextRequest, NextResponse } from "next/server"
import { getSession, readUsers, writeUsers, SESSION_COOKIE } from "@/lib/auth"
import type { Role, User } from "@/lib/auth"
import crypto from "crypto"

// POST /api/invitations — owner only: pre-register an investor or owner
export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value
  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const session = getSession(sessionId)
  if (!session || session.role !== "owner") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await req.json()
  const { name, email, key, role } = body as {
    name?: string
    email?: string
    key?: string
    role?: Role
  }

  if (!name || !email || !key || !role) {
    return NextResponse.json(
      { error: "name, email, key, and role are required" },
      { status: 400 }
    )
  }

  if (!["investor", "owner"].includes(role)) {
    return NextResponse.json(
      { error: "role must be investor or owner" },
      { status: 400 }
    )
  }

  const users = readUsers()

  // Check for duplicate key or email
  if (users.some((u) => u.key === key)) {
    return NextResponse.json(
      { error: "A user with this access key already exists" },
      { status: 409 }
    )
  }
  if (users.some((u) => u.email === email)) {
    return NextResponse.json(
      { error: "A user with this email already exists" },
      { status: 409 }
    )
  }

  const newUser: User = {
    id: `usr_${crypto.randomBytes(8).toString("hex")}`,
    name,
    email,
    role,
    key,
    passwordHash: "",
    setupComplete: false,
  }

  users.push(newUser)
  writeUsers(users)

  return NextResponse.json({ success: true, id: newUser.id }, { status: 201 })
}

// GET /api/invitations — owner only: list all users (for the invitation panel)
export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value
  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const session = getSession(sessionId)
  if (!session || session.role !== "owner") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const users = readUsers().map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    setupComplete: u.setupComplete,
  }))

  return NextResponse.json({ users })
}
