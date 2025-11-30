import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DiagnosisChat from '../components/DiagnosisChat/DiagnosisChat'
import ResultView from '../components/ResultView/ResultView'
import { Loader } from 'shared-components'

export default function DiagnosisPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, loading } = useAuth()

  const isResultPage = location.pathname === '/diagnosis/result'

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

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="py-12 pixel-font">
      <h1 className="text-xl text-center pixel-accent mb-4">
        {isResultPage ? '📊 Результат диагностики' : '🩺 Страница диагностики (DiagnosisPage)'}
      </h1>

      <div className="max-w-2xl mx-auto px-6 mb-8">
        <div className="pixel-card p-4 text-left">
          <h2 className="text-sm pixel-accent-blue mb-2">Описание:</h2>
          <p className="text-xs pixel-accent-blue">
            {isResultPage
              ? 'Отображение результатов диагностики: процент риска, рекомендации, кнопки навигации.'
              : 'Интерактивный чат с ботом для прохождения медицинской диагностики. 10 вопросов о симптомах с вариантами ответов.'}
          </p>
        </div>
      </div>

      {isResultPage ? <ResultView /> : <DiagnosisChat />}
    </div>
  )
}
