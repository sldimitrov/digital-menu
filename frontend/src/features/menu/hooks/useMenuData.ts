import { useEffect, useState } from 'react'
import { http } from '../../../services/http'
import type {
  FullMenuApiResponse,
  MenuCategory,
  MenuCategoryApi,
  MenuItem,
  MenuItemApi,
} from '../types'

type MenuState = {
  restaurantSlug: string
  restaurantName: string
  categories: MenuCategory[]
  items: MenuItem[]
}

function normalizeImageUrl(imageUrl: string | null): string | undefined {
  if (!imageUrl) {
    return undefined
  }

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api'
  const backendOrigin = new URL(apiBaseUrl).origin
  return `${backendOrigin}${imageUrl}`
}

function mapCategory(category: MenuCategoryApi): MenuCategory {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
  }
}

function mapItem(item: MenuItemApi, categorySlug: string): MenuItem {
  return {
    id: item.id,
    categorySlug,
    name: item.name,
    description: item.description,
    priceCents: item.price_cents,
    imageUrl: normalizeImageUrl(item.image_url),
  }
}

export function useMenuData(restaurantSlug: string) {
  const [data, setData] = useState<MenuState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchMenu = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await http.get<FullMenuApiResponse>(`/menu/${restaurantSlug}`)
        const payload = response.data

        const categories = payload.categories.map(mapCategory)
        const items = payload.categories.flatMap((category) =>
          category.items.map((item) => mapItem(item, category.slug)),
        )

        if (isMounted) {
          setData({
            restaurantSlug: payload.restaurant_slug,
            restaurantName: payload.restaurant_name,
            categories,
            items,
          })
        }
      } catch {
        if (isMounted) {
          setError('Failed to load menu. Please try again.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchMenu()

    return () => {
      isMounted = false
    }
  }, [restaurantSlug])

  return { data, isLoading, error }
}
