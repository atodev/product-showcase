"use client"

import { useState, useEffect } from "react"
import { UserPlus, X, Loader2, CheckCircle2, Copy } from "lucide-react"

interface InvitedUser {
  id: string
  name: string
  email: string
  role: string
  setupComplete: boolean
}

export function InvitationModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [key, setKey] = useState("")
  const [role, setRole] = useState<"investor" | "owner">("investor")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [users, setUsers] = useState<InvitedUser[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  async function fetchUsers() {
    try {
      const res = await fetch("/api/invitations")
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
      }
    } catch {}
  }

  useEffect(() => {
    if (open) fetchUsers()
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, key, role }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Failed to create invitation")
        return
      }
      setSuccess(true)
      setName("")
      setEmail("")
      setKey("")
      setRole("investor")
      await fetchUsers()
      setTimeout(() => setSuccess(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  function copyKey(k: string) {
    navigator.clipboard.writeText(k)
    setCopied(k)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <UserPlus className="h-4 w-4" />
        Invite user
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-foreground">
                Invite a user
              </h2>
              <button
                onClick={() => { setOpen(false); setError(""); setSuccess(false); }}
                className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              {/* Invite form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Full name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Jane Smith"
                      className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="jane@fund.com"
                      className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Access key{" "}
                      <span className="text-muted-foreground/60">(from your Python app)</span>
                    </label>
                    <input
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      required
                      placeholder="XXXX-XXXX-XXXX"
                      className="font-mono rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as "investor" | "owner")}
                      className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="investor">Investor</option>
                      <option value="owner">Owner</option>
                    </select>
                  </div>
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}
                {success && (
                  <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> User registered successfully
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !name || !email || !key}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Register user
                </button>
              </form>

              {/* Existing users */}
              {users.length > 0 && (
                <div className="mt-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Registered users
                  </p>
                  <div className="max-h-48 overflow-y-auto rounded-lg border border-border">
                    {users.map((u) => (
                      <div
                        key={u.id}
                        className="flex items-center gap-3 border-b border-border px-3 py-2.5 last:border-b-0"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{u.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                        </div>
                        <span
                          className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
                            u.role === "owner"
                              ? "bg-primary/10 text-primary"
                              : "bg-violet-400/10 text-violet-400"
                          }`}
                        >
                          {u.role}
                        </span>
                        <span
                          className={`shrink-0 rounded-md px-2 py-0.5 text-xs ${
                            u.setupComplete
                              ? "bg-emerald-400/10 text-emerald-400"
                              : "bg-yellow-400/10 text-yellow-400"
                          }`}
                        >
                          {u.setupComplete ? "Active" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
