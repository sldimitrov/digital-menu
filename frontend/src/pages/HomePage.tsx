import { Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Добре дошли в дигиталните менюта
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Изберете ресторант като използвате Slug оператора в url-a, например
          {' '}
          <strong>/restaurant-one</strong>.
        </Typography>
        <Button component={Link} to="/burzo-hranene" variant="contained" size="large">
          Отвори примерно меню
        </Button>
      </Stack>
    </Container>
  )
}
