import { NextRequest, NextResponse } from "next/server"
import { getSession, SESSION_COOKIE } from "@/lib/auth"
import {
  readDynamicProducts,
  createDynamicProduct,
  type ProductColor,
  type ProductStatus,
} from "@/lib/dynamic-products"

// GET /api/products — returns all dynamic (user-created) products
export async function GET() {
  const products = readDynamicProducts()
  return NextResponse.json({ products })
}

// POST /api/products — owner only: create a new product
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
  const { name, tagline, color, status } = body as {
    name?: string
    tagline?: string
    color?: ProductColor
    status?: ProductStatus
  }

  if (!name || !tagline || !color || !status) {
    return NextResponse.json(
      { error: "name, tagline, color, and status are required" },
      { status: 400 }
    )
  }

  const validColors: ProductColor[] = ["blue", "violet", "emerald", "orange", "cyan", "rose"]
  const validStatuses: ProductStatus[] = ["active", "beta", "coming-soon"]

  if (!validColors.includes(color)) {
    return NextResponse.json({ error: "Invalid color" }, { status: 400 })
  }
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const product = createDynamicProduct({ name, tagline, color, status })
  return NextResponse.json({ product }, { status: 201 })
}
