import { getAllPosts } from "@/lib/posts"
import { LandingClient } from "./landing-client"

export default function LandingPage() {
  const posts = getAllPosts().slice(0, 3)
  return <LandingClient posts={posts} />
}
