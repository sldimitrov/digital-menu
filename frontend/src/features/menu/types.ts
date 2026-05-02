export type MenuCategory = {
  id: string
  name: string
  slug: string
}

export type MenuItem = {
  id: string
  categorySlug: string
  name: string
  description: string
  price: number
  imageUrl?: string
}
