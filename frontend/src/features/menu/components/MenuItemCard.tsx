import ImageIcon from '@mui/icons-material/Image'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import type { MenuItem } from '../types'

type MenuItemCardProps = {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card elevation={1}>
      {item.imageUrl ? (
        <CardMedia component="img" height="180" image={item.imageUrl} alt={item.name} />
      ) : (
        <Box
          sx={{
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            color: 'text.secondary',
          }}
        >
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <ImageIcon />
            <Typography variant="body2">Image placeholder</Typography>
          </Stack>
        </Box>
      )}
      <CardContent>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 1 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {item.name}
            </Typography>
            <Chip color="primary" label={`$${item.price.toFixed(2)}`} />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
