import type { MenuCategory, MenuItem } from '../types'

export const mockCategories: MenuCategory[] = [
  { id: 1, name: 'Starters', slug: 'starters' },
  { id: 2, name: 'Main Course', slug: 'main-course' },
  { id: 3, name: 'Desserts', slug: 'desserts' },
  { id: 4, name: 'Drinks', slug: 'drinks' },
]

export const mockItems: MenuItem[] = [
  {
    id: 1,
    categorySlug: 'starters',
    name: 'Bruschetta',
    description: 'Toasted sourdough with tomato, basil, and olive oil.',
    priceCents: 750,
  },
  {
    id: 2,
    categorySlug: 'main-course',
    name: 'Grilled Salmon',
    description: 'Served with lemon butter sauce and roasted vegetables.',
    priceCents: 1890,
    imageUrl:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    categorySlug: 'main-course',
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with parmesan and wild mushrooms.',
    priceCents: 1500,
  },
  {
    id: 4,
    categorySlug: 'desserts',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center.',
    priceCents: 675,
    imageUrl:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    categorySlug: 'drinks',
    name: 'Lemon Mint Cooler',
    description: 'Fresh lemon juice with mint and sparkling water.',
    priceCents: 450,
  },
]
