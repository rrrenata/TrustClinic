import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Loader } from 'shared-components'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, loading, logout } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="py-12 pixel-font">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-2xl pixel-accent mb-6 text-center">👤 Личный кабинет (ProfilePage)</h1>

        <div className="pixel-card p-6 mb-6">
          <h2 className="text-lg pixel-accent-blue mb-4">Описание компонента:</h2>
          <ul className="text-xs pixel-accent-blue space-y-2">
            <li>• <b>Информация о пользователе:</b> Имя и email текущего пользователя</li>
            <li>• <b>История диагностик:</b> Список всех пройденных диагностик с датой, процентом риска и рекомендациями</li>
            <li>• <b>Действия:</b> Кнопка выхода, просмотр деталей результата, новая диагностика</li>
          </ul>
        </div>

        <div className="pixel-card p-6 mb-6">
          <h2 className="text-lg font-bold mb-2 pixel-accent-blue">{user.name}</h2>
          <p className="text-xs pixel-accent-blue opacity-70 mb-4">{user.email}</p>
          <Button variant="secondary" onClick={logout} className="pixel-btn">
            Выйти
          </Button>
        </div>

        <div className="pixel-card p-6 text-center">
          <p className="text-xs pixel-accent-blue mb-4">[Здесь будет отображаться история диагностик]</p>
          <Button onClick={() => navigate('/diagnosis')} className="pixel-btn">
            Пройти диагностику
          </Button>
        </div>
      </div>
    </div>
  )
}
