export type MenuCategory = {
  id: number
  name: string
  slug: string
}

export type MenuItem = {
  id: number
  categorySlug: string
  name: string
  description: string
  priceCents: number
  imageUrl?: string
}

export type MenuModifier = {
  id: number
  name: string
  slug: string
  price_delta_cents: number
}

export type MenuItemApi = {
  id: number
  name: string
  slug: string
  description: string
  price_cents: number
  image_url: string | null
  sort_order: number
  modifiers: MenuModifier[]
}

export type MenuCategoryApi = {
  id: number
  name: string
  slug: string
  sort_order: number
  items: MenuItemApi[]
}

export type FullMenuApiResponse = {
  restaurant_slug: string
  restaurant_name: string
  categories: MenuCategoryApi[]
}
