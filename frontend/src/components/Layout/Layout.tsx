import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Layout() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="min-h-screen">
      <header className="border-b-4 border-accent bg-white/80 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-lg pixel-title font-bold">
            TrustClinic
          </Link>
          <div className="flex gap-4 text-xs">
            <Link to="/" className="pixel-accent-blue hover:pixel-accent transition-colors">
              Главная
            </Link>
            <Link to="/about" className="pixel-accent-blue hover:pixel-accent transition-colors">
              О клинике
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/diagnosis" className="pixel-accent-blue hover:pixel-accent transition-colors">
                  Диагностика
                </Link>
                <Link to="/profile" className="pixel-accent-blue hover:pixel-accent transition-colors">
                  Профиль
                </Link>
                <button
                  onClick={logout}
                  className="pixel-accent-blue hover:pixel-accent transition-colors"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="pixel-accent-blue hover:pixel-accent transition-colors">
                  Вход
                </Link>
                <Link to="/register" className="pixel-accent-blue hover:pixel-accent transition-colors">
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
