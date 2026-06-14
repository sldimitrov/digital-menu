import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import type { MenuCategory } from '../types'

type CategoryFilterProps = {
  categories: MenuCategory[]
  activeCategory: string
  onChange: (value: string) => void
}

export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  const handleChange = (_event: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (value) {
      onChange(value)
    }
  }

  return (
    <Stack spacing={1.5}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Категории
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={activeCategory}
        exclusive
        onChange={handleChange}
        aria-label="menu category filter"
        sx={{ flexWrap: 'wrap', gap: 1 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        {categories.map((category) => (
          <ToggleButton key={category.id} value={category.slug}>
            {category.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  )
}
