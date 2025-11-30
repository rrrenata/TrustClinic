import { Link } from 'react-router-dom'
import { Button } from 'shared-components'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pixel-font">
      <div className="text-center">
        <h1 className="text-6xl pixel-accent mb-4">404</h1>
        <p className="text-sm pixel-accent-blue mb-4">🚫 Страница не найдена (NotFoundPage)</p>

        <div className="pixel-card p-4 mb-6 text-left max-w-md">
          <h2 className="text-sm pixel-accent-blue mb-2">Описание:</h2>
          <p className="text-xs pixel-accent-blue">
            Страница ошибки 404, отображается при переходе на несуществующий маршрут.
            Содержит кнопку возврата на главную страницу.
          </p>
        </div>

        <Link to="/">
          <Button className="pixel-btn">На главную</Button>
        </Link>
      </div>
    </div>
  )
}
