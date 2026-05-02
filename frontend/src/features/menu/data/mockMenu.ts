import type { MenuCategory, MenuItem } from '../types'

export const mockCategories: MenuCategory[] = [
  { id: 'c1', name: 'Starters', slug: 'starters' },
  { id: 'c2', name: 'Main Course', slug: 'main-course' },
  { id: 'c3', name: 'Desserts', slug: 'desserts' },
  { id: 'c4', name: 'Drinks', slug: 'drinks' },
]

export const mockItems: MenuItem[] = [
  {
    id: 'i1',
    categorySlug: 'starters',
    name: 'Bruschetta',
    description: 'Toasted sourdough with tomato, basil, and olive oil.',
    price: 7.5,
  },
  {
    id: 'i2',
    categorySlug: 'main-course',
    name: 'Grilled Salmon',
    description: 'Served with lemon butter sauce and roasted vegetables.',
    price: 18.9,
    imageUrl:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'i3',
    categorySlug: 'main-course',
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with parmesan and wild mushrooms.',
    price: 15.0,
  },
  {
    id: 'i4',
    categorySlug: 'desserts',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center.',
    price: 6.75,
    imageUrl:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'i5',
    categorySlug: 'drinks',
    name: 'Lemon Mint Cooler',
    description: 'Fresh lemon juice with mint and sparkling water.',
    price: 4.5,
  },
]
