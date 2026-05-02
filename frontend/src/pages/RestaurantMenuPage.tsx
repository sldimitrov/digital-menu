import { Navigate, useParams } from 'react-router-dom'
import { MenuView } from '../features/menu'

export function RestaurantMenuPage() {
  const { restaurantSlug } = useParams<{ restaurantSlug: string }>()

  if (!restaurantSlug) {
    return <Navigate to="/" replace />
  }

  return <MenuView restaurantSlug={restaurantSlug} />
}
