import { Alert, CircularProgress, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import { useMenuFilter } from '../hooks/useMenuFilter'
import { useMenuData } from '../hooks/useMenuData'
import { CategoryFilter } from './CategoryFilter'
import { MenuItemGrid } from './MenuItemGrid'

export function MenuView() {
  const restaurantSlug = import.meta.env.VITE_RESTAURANT_SLUG ?? 'burzo-hranene'
  const { data, isLoading, error } = useMenuData(restaurantSlug)

  const categories = data?.categories ?? []
  const items = data?.items ?? []
  const { activeCategory, setActiveCategory, filteredItems, categoryCount } = useMenuFilter({
    categories,
    items,
  })

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Restaurant Menu
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Live data from backend menu API.
          </Typography>
        </Stack>

        {isLoading && (
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <CircularProgress size={20} />
            <Typography variant="body2">Loading menu...</Typography>
          </Stack>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Paper variant="outlined" sx={{ p: 2 }}>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </Paper>

        <Divider />

        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Menu Items
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filteredItems.length} items • {categoryCount} categories
          </Typography>
        </Stack>

        <MenuItemGrid items={filteredItems} />
      </Stack>
    </Container>
  )
}
