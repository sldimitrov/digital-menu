import { Container, Divider, Paper, Stack, Typography } from '@mui/material'
import { mockCategories, mockItems } from '../data/mockMenu'
import { useMenuFilter } from '../hooks/useMenuFilter'
import { CategoryFilter } from './CategoryFilter'
import { MenuItemGrid } from './MenuItemGrid'

export function MenuView() {
  const { activeCategory, setActiveCategory, filteredItems, categoryCount } = useMenuFilter({
    categories: mockCategories,
    items: mockItems,
  })

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Restaurant Menu
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse by category and view items. This structure is ready for backend data and item
            images.
          </Typography>
        </Stack>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <CategoryFilter
            categories={mockCategories}
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
