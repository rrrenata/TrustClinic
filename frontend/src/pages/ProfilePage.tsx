import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, DiagnosisResult } from '../context/AuthContext'
import { Button, Loader } from 'shared-components'

function getRiskColor(risk: number): string {
  if (risk <= 25) return 'pixel-accent-blue'
  if (risk <= 60) return 'pixel-accent'
  return 'pixel-accent'
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, loading, logout, getResults } = useAuth()

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

  const results: DiagnosisResult[] = getResults()

  const handleViewResult = (result: DiagnosisResult) => {
    sessionStorage.setItem('lastResult', JSON.stringify(result))
    navigate('/diagnosis/result')
  }

  return (
    <div className="py-12 pixel-font">
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <h1 className="text-2xl pixel-accent mb-6">Личный кабинет</h1>
        <div className="pixel-card p-6">
          <h2 className="text-lg font-bold mb-2 pixel-accent-blue">{user.name}</h2>
          <p className="text-xs pixel-accent-blue opacity-70 mb-6">{user.email}</p>
          <Button variant="secondary" onClick={logout} className="pixel-btn">
            Выйти
          </Button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-xl pixel-accent-blue mb-6">История диагностик</h2>
        {results.length === 0 ? (
          <div className="pixel-card p-6 text-center">
            <p className="text-xs pixel-accent-blue mb-4">У вас пока нет сохраненных результатов</p>
            <Button onClick={() => navigate('/diagnosis')} className="pixel-btn">
              Пройти диагностику
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {results.map((res) => (
              <div key={res.id} className="pixel-card p-6">
                <p className="text-xs pixel-accent-blue opacity-70 mb-2">{formatDate(res.date)}</p>
                <p className="mb-2 pixel-accent-blue text-xs">
                  Риск:{' '}
                  <span className={`font-bold ${getRiskColor(res.risk)}`}>
                    {res.risk}%
                  </span>
                </p>
                <p className="text-xs pixel-accent-blue opacity-70 mb-4">{res.recommendation}</p>
                <Button onClick={() => handleViewResult(res)} className="pixel-btn">
                  Подробнее
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Button
            onClick={() => navigate('/diagnosis')}
            className="pixel-btn w-full"
          >
            Новая диагностика
          </Button>
        </div>
      </section>
    </div>
  )
}
