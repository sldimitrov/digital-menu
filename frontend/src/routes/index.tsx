import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { RestaurantMenuPage } from '../pages/RestaurantMenuPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:restaurantSlug',
    element: <RestaurantMenuPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
