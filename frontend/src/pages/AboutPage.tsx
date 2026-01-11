import { Link } from 'react-router-dom'
import { Button } from 'shared-components'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pixel-font">
      <div className="pixel-card w-full max-w-2xl p-8 text-center">
        <h1 className="text-2xl pixel-accent mb-6">ℹ️ О клинике (AboutPage)</h1>

        <div className="pixel-card p-6 mb-6 text-left">
          <h2 className="text-lg pixel-accent-blue mb-4">Описание компонента:</h2>
          <ul className="text-xs pixel-accent-blue space-y-2">
            <li>• <b>Hero-секция:</b> Заголовок &quot;О клинике&quot; с кратким описанием</li>
            <li>• <b>Секция ценностей:</b> 3 карточки (Передовые технологии, Персональный подход, Опытные специалисты)</li>
            <li>• <b>Секция &quot;Мы в цифрах&quot;:</b> Статистика (15000+ диагностик, 98% удовлетворённость, 50+ специалистов)</li>
            <li>• <b>CTA-секция:</b> Призыв к действию с кнопкой &quot;Начать диагностику&quot;</li>
          </ul>
        </div>

        <div className="pixel-card p-6 mb-6 text-left">
          <h2 className="text-lg pixel-accent-blue mb-4">Используемые компоненты:</h2>
          <p className="text-xs pixel-accent-blue">Button (из shared-components)</p>
        </div>

        <Link to="/diagnosis">
          <Button className="pixel-btn">Начать диагностику</Button>
        </Link>
      </div>
    </div>
  )
}
