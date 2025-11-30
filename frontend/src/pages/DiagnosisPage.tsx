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
      <h1 className="text-xl text-center pixel-accent mb-8">
        {isResultPage ? 'Результат' : 'Диагностика'}
      </h1>
      {isResultPage ? <ResultView /> : <DiagnosisChat />}
    </div>
  )
}
