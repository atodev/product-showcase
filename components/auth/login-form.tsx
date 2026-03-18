"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Zap, Eye, EyeOff, Loader2 } from "lucide-react"

type Step = "key" | "setup" | "password"

interface UserMeta {
  id: string
  name: string
  email: string
  role: "investor" | "owner"
  setupComplete: boolean
}

export function LoginForm() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("key")
  const [accessKey, setAccessKey] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [userMeta, setUserMeta] = useState<UserMeta | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleKeySubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: accessKey.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Invalid access key")
        return
      }
      setUserMeta(data)
      setStep(data.setupComplete ? "password" : "setup")
    } finally {
      setLoading(false)
    }
  }

  async function handleSetup(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: accessKey.trim(), password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Setup failed")
        return
      }
      router.push(data.role === "owner" ? "/owner" : "/investor")
    } finally {
      setLoading(false)
    }
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: accessKey.trim(), password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Login failed")
        return
      }
      router.push(data.role === "owner" ? "/owner" : "/investor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Atodev
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
          {/* Step: Enter access key */}
          {step === "key" && (
            <form onSubmit={handleKeySubmit} className="flex flex-col gap-5">
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Welcome back
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enter your access key to continue
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Access key
                </label>
                <input
                  type="text"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="XXXX-XXXX-XXXX"
                  required
                  className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !accessKey.trim()}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Continue
              </button>
            </form>
          )}

          {/* Step: First-time setup — create password */}
          {step === "setup" && userMeta && (
            <form onSubmit={handleSetup} className="flex flex-col gap-5">
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Hello, {userMeta.name.split(" ")[0]}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create a password to secure your account
                </p>
              </div>

              {/* Pre-filled identity */}
              <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
                <p className="text-xs text-muted-foreground">Signing in as</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {userMeta.name}
                </p>
                <p className="text-xs text-muted-foreground">{userMeta.email}</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Confirm password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  required
                  className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !password || !confirmPassword}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Create password &amp; sign in
              </button>

              <button
                type="button"
                onClick={() => { setStep("key"); setError(""); setPassword(""); setConfirmPassword(""); }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Use a different key
              </button>
            </form>
          )}

          {/* Step: Returning user — enter password */}
          {step === "password" && userMeta && (
            <form onSubmit={handlePasswordLogin} className="flex flex-col gap-5">
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Welcome back, {userMeta.name.split(" ")[0]}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enter your password to continue
                </p>
              </div>

              {/* Identity chip */}
              <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
                <p className="text-xs text-muted-foreground">Signing in as</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {userMeta.name}
                </p>
                <p className="text-xs text-muted-foreground">{userMeta.email}</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    required
                    autoFocus
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign in
              </button>

              <button
                type="button"
                onClick={() => { setStep("key"); setError(""); setPassword(""); }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Use a different key
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
