import { Link } from 'react-router-dom'
import { Button } from 'shared-components'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pixel-font">
      <div className="text-center">
        <h1 className="text-6xl pixel-accent mb-4">404</h1>
        <p className="text-sm pixel-accent-blue mb-8">Страница не найдена</p>
        <Link to="/">
          <Button className="pixel-btn">На главную</Button>
        </Link>
      </div>
    </div>
  )
}
