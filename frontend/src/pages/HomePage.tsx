import { Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Welcome to Digital Menu
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a restaurant by using its slug in the URL, for example
          {' '}
          <strong>/restaurant-one</strong>.
        </Typography>
        <Button component={Link} to="/burzo-hranene" variant="contained" size="large">
          Open sample menu
        </Button>
      </Stack>
    </Container>
  )
}
