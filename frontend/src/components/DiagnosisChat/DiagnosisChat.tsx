import { Button } from 'shared-components'
import { useNavigate } from 'react-router-dom'
import { useAuth, DiagnosisResult } from '../../context/AuthContext'

export default function DiagnosisChat() {
  const navigate = useNavigate()
  const { saveResult } = useAuth()

  const handleSimulateComplete = () => {
    const result: DiagnosisResult = {
      id: Date.now(),
      risk: 45,
      recommendation: 'Средний риск. Рекомендуется консультация врача.',
      date: new Date().toISOString(),
      answers: ['18–40', '1–3 дня назад', '37–38', 'Лёгкий', 'Нет', 'Ничего', 'Голова', 'Постепенно', 'Инфекция', 'Слабость']
    }

    saveResult(result)
    sessionStorage.setItem('lastResult', JSON.stringify(result))
    navigate('/diagnosis/result')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="pixel-card p-6 text-center">
        <h2 className="text-lg pixel-accent mb-4">💬 Компонент DiagnosisChat</h2>

        <div className="pixel-card p-4 mb-6 text-left">
          <h3 className="text-sm pixel-accent-blue mb-2">Описание:</h3>
          <ul className="text-xs pixel-accent-blue space-y-1">
            <li>• Интерактивный чат-интерфейс с ботом</li>
            <li>• 10 вопросов о симптомах пользователя</li>
            <li>• Пузырьки сообщений (ChatBubble) для бота и пользователя</li>
            <li>• Кнопки выбора ответов (OptionButtons)</li>
            <li>• Индикатор прогресса (StepIndicator)</li>
            <li>• Анимация печати бота (TypingIndicator)</li>
          </ul>
        </div>

        <div className="pixel-card p-4 mb-6 text-left">
          <h3 className="text-sm pixel-accent-blue mb-2">Используемые компоненты:</h3>
          <p className="text-xs pixel-accent-blue">
            ChatContainer, ChatBubble, TypingIndicator, OptionButtons, StepIndicator
          </p>
        </div>

        <div className="pixel-card p-4 mb-6 text-left">
          <h3 className="text-sm pixel-accent-blue mb-2">Примеры вопросов:</h3>
          <ol className="text-xs pixel-accent-blue space-y-1 list-decimal list-inside">
            <li>Сколько вам лет?</li>
            <li>Когда начались симптомы?</li>
            <li>Есть температура?</li>
            <li>...и ещё 7 вопросов</li>
          </ol>
        </div>

        <Button onClick={handleSimulateComplete} className="pixel-btn">
          Симулировать завершение теста
        </Button>
      </div>
    </div>
  )
}
