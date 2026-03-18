import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getSession, findUserById, SESSION_COOKIE } from "@/lib/auth"
import { PersonaTabs } from "@/components/auth/persona-tabs"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value

  if (!sessionId) {
    redirect("/login")
  }

  const session = getSession(sessionId)
  if (!session) {
    redirect("/login")
  }

  const user = findUserById(session.userId)
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <PersonaTabs role={user.role} userName={user.name} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
