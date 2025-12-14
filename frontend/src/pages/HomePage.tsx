import { Link } from 'react-router-dom'
import { Button } from 'shared-components'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pixel-font">
      <div className="pixel-card w-full max-w-2xl p-8 text-center">
        <h1 className="text-2xl pixel-accent mb-6">🏠 Главная страница (HomePage)</h1>

        <div className="pixel-card p-6 mb-6 text-left">
          <h2 className="text-lg pixel-accent-blue mb-4">Описание компонента:</h2>
          <ul className="text-xs pixel-accent-blue space-y-2">
            <li>• <b>Hero-секция:</b> Логотип TrustClinic, заголовок и кнопка &quot;Начать опрос&quot;</li>
            <li>• <b>Секция &quot;Почему TrustClinic?&quot;:</b> 3 карточки (Быстро, Точно, Мило)</li>
            <li>• <b>Секция &quot;Как это работает&quot;:</b> 2 шага с описанием процесса диагностики</li>
            <li>• <b>Секция &quot;Примеры результатов&quot;:</b> 3 примера с процентами риска</li>
            <li>• <b>Секция &quot;Отзывы пользователей&quot;:</b> 3 карточки отзывов</li>
          </ul>
        </div>

        <div className="pixel-card p-6 mb-6 text-left">
          <h2 className="text-lg pixel-accent-blue mb-4">Используемые компоненты:</h2>
          <p className="text-xs pixel-accent-blue">Button, Capsule (из shared-components)</p>
        </div>

        <Link to="/register">
          <Button className="pixel-btn">Начать опрос</Button>
        </Link>
      </div>
    </div>
  )
}
