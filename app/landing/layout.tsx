import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Atodev — AI-powered software for business",
  description:
    "Micro-SaaS and AI development studio building focused software solutions for business. Local and cloud AI integrations.",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
