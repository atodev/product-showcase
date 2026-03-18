// Server-only — uses Node.js fs/path/crypto. Do NOT import from client components.
// For shared types and UI constants, import from @/lib/product-constants instead.
import fs from "fs"
import path from "path"
import crypto from "crypto"

export type { ProductColor, ProductStatus, DynamicProduct } from "@/lib/product-constants"
export { COLOR_META, STATUS_META } from "@/lib/product-constants"
import type { DynamicProduct } from "@/lib/product-constants"

const productsFile = path.join(process.cwd(), "data", "products.json")

export function readDynamicProducts(): DynamicProduct[] {
  try {
    return JSON.parse(fs.readFileSync(productsFile, "utf-8"))
  } catch {
    return []
  }
}

export function writeDynamicProducts(products: DynamicProduct[]): void {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2))
}

export function createDynamicProduct(
  data: Omit<DynamicProduct, "id" | "createdAt">
): DynamicProduct {
  const product: DynamicProduct = {
    id: `prod_${crypto.randomBytes(6).toString("hex")}`,
    ...data,
    createdAt: new Date().toISOString(),
  }
  const products = readDynamicProducts()
  products.push(product)
  writeDynamicProducts(products)
  return product
}
