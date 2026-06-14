import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="page">
      <h1>Страницата не е открита</h1>
      <p>Страницата, която търсите изглежда не съществува.</p>
      <Link to="/">Обрано към началната страница</Link>
    </main>
  )
}
