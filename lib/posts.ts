import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDir = path.join(process.cwd(), "content/posts")

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags?: string[]
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "")
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8")
      const { data } = matter(raw)
      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags ?? [],
      } as PostMeta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post | null {
  const filepath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags ?? [],
    content,
  }
}
