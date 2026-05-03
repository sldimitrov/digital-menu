import { Grid, Typography } from '@mui/material'
import type { MenuItem } from '../types'
import { MenuItemCard } from './MenuItemCard'

type MenuItemGridProps = {
  items: MenuItem[]
}

export function MenuItemGrid({ items }: MenuItemGridProps) {
  if (items.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No menu items found for this category.
      </Typography>
    )
  }

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <MenuItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  )
}
