import crypto from "crypto"
import fs from "fs"
import path from "path"

// ---------- Types ----------

export type Role = "investor" | "owner"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  key: string
  passwordHash: string
  setupComplete: boolean
}

export interface Session {
  sessionId: string
  userId: string
  role: Role
}

// ---------- File paths ----------

const dataDir = path.join(process.cwd(), "data")
const usersFile = path.join(dataDir, "users.json")
const sessionsFile = path.join(dataDir, "sessions.json")

// ---------- File I/O ----------

export function readUsers(): User[] {
  try {
    return JSON.parse(fs.readFileSync(usersFile, "utf-8"))
  } catch {
    return []
  }
}

export function writeUsers(users: User[]): void {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

export function readSessions(): Session[] {
  try {
    return JSON.parse(fs.readFileSync(sessionsFile, "utf-8"))
  } catch {
    return []
  }
}

export function writeSessions(sessions: Session[]): void {
  fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2))
}

// ---------- Password hashing ----------

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex")
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":")
  const attempt = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex")
  return attempt === hash
}

// ---------- Session helpers ----------

export function createSession(userId: string, role: Role): string {
  const sessionId = crypto.randomBytes(32).toString("hex")
  const sessions = readSessions()
  sessions.push({ sessionId, userId, role })
  writeSessions(sessions)
  return sessionId
}

export function getSession(sessionId: string): Session | null {
  const sessions = readSessions()
  return sessions.find((s) => s.sessionId === sessionId) ?? null
}

export function deleteSession(sessionId: string): void {
  const sessions = readSessions().filter((s) => s.sessionId !== sessionId)
  writeSessions(sessions)
}

// ---------- User helpers ----------

export function findUserByKey(key: string): User | null {
  return readUsers().find((u) => u.key === key) ?? null
}

export function findUserById(id: string): User | null {
  return readUsers().find((u) => u.id === id) ?? null
}

// ---------- Cookie name ----------

export const SESSION_COOKIE = "session_id"
