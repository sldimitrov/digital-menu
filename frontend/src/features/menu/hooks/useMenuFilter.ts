import { useMemo, useState } from 'react'
import type { MenuCategory, MenuItem } from '../types'

type UseMenuFilterParams = {
  categories: MenuCategory[]
  items: MenuItem[]
}

export function useMenuFilter({ categories, items }: UseMenuFilterParams) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return items
    }
    return items.filter((item) => item.categorySlug === activeCategory)
  }, [activeCategory, items])

  const categoryCount = categories.length

  return {
    activeCategory,
    setActiveCategory,
    filteredItems,
    categoryCount,
  }
}
