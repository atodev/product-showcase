import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Atodev",
  description:
    "Micro-SaaS and AI development studio building focused software solutions for business. Local and cloud AI integrations.",
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
