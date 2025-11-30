import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'shared-components'
import { DiagnosisResult } from '../../context/AuthContext'

export default function ResultView() {
  const navigate = useNavigate()
  const [result, setResult] = useState<DiagnosisResult | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('lastResult')
    if (stored) {
      setResult(JSON.parse(stored))
    }
  }, [])

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-sm pixel-accent-blue mb-6">Результат не найден</p>
        <Button onClick={() => navigate('/diagnosis')} className="pixel-btn">
          Пройти диагностику
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="pixel-card text-center p-8">
        <h2 className="text-xl mb-4 pixel-accent">📊 Компонент ResultView</h2>

        <div className="pixel-card p-4 mb-6 text-left">
          <h3 className="text-sm pixel-accent-blue mb-2">Описание:</h3>
          <ul className="text-xs pixel-accent-blue space-y-1">
            <li>• Отображение процента риска (цвет зависит от уровня)</li>
            <li>• Текстовая рекомендация на основе ответов</li>
            <li>• Кнопка &quot;Пройти снова&quot;</li>
            <li>• Кнопка &quot;В профиль&quot;</li>
          </ul>
        </div>

        <div className="mb-6">
          <span className="text-xs pixel-accent-blue">Уровень риска:</span>
          <div className="text-4xl font-bold mt-2 pixel-accent">
            {result.risk}%
          </div>
        </div>

        <p className="text-xs pixel-accent-blue mb-8 leading-relaxed">
          {result.recommendation}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={() => navigate('/diagnosis')} className="pixel-btn">
            Пройти снова
          </Button>
          <Button variant="secondary" onClick={() => navigate('/profile')} className="pixel-btn">
            В профиль
          </Button>
        </div>
      </div>
    </div>
  )
}
