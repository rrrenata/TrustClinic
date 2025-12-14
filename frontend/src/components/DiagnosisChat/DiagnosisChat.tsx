import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, DiagnosisResult } from '../../context/AuthContext'
import {
  ChatContainer,
  ChatBubble,
  TypingIndicator,
  OptionButtons,
  StepIndicator
} from 'shared-components'

interface Message {
  from: 'user' | 'bot'
  text: string
}

interface Question {
  text: string
  options: readonly string[]
}

const questions: Question[] = [
  { text: 'Сколько вам лет?', options: ['< 18', '18–40', '40–60', '60+'] },
  { text: 'Когда начались симптомы?', options: ['Сегодня', '1–3 дня назад', '> 3 дней назад'] },
  { text: 'Есть температура?', options: ['Нет', '37–38', 'Выше 38'] },
  { text: 'Есть кашель?', options: ['Нет', 'Лёгкий', 'Сильный'] },
  { text: 'Есть затруднённое дыхание?', options: ['Нет', 'Немного', 'Сильно'] },
  { text: 'Что беспокоит ЖКТ?', options: ['Боль в желудке', 'Рвота', 'Диарея', 'Ничего'] },
  { text: 'Где сильнее всего боль?', options: ['Голова', 'Грудь', 'Живот', 'Спина'] },
  { text: 'Как возникла боль?', options: ['Постепенно', 'Постоянно', 'Внезапно'] },
  { text: 'На что больше похоже состояние?', options: ['Инфекция', 'Пищевое', 'Нервное', 'Не знаю'] },
  { text: 'Как оцениваете общее состояние?', options: ['Нормально', 'Слабость', 'Очень плохо'] }
]

function calculateRisk(answers: string[]): { risk: number; recommendation: string } {
  const hasSevereBreathing = answers[4] === 'Сильно'
  const hasHighFever = answers[2] === 'Выше 38'
  const hasChestPain = answers[6] === 'Грудь'

  if (hasSevereBreathing || hasChestPain) {
    return {
      risk: 85,
      recommendation: 'Критический риск. Немедленно обратитесь к врачу!'
    }
  }
  if (hasHighFever) {
    return {
      risk: 55,
      recommendation: 'Средний риск. Рекомендуется консультация врача.'
    }
  }
  return {
    risk: 15,
    recommendation: 'Низкий риск. Рекомендуется отдых и наблюдение.'
  }
}

export default function DiagnosisChat() {
  const navigate = useNavigate()
  const { saveResult } = useAuth()
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: questions[0].text }
  ])
  const [answers, setAnswers] = useState<string[]>([])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    const updatedMessages: Message[] = [
      ...messages,
      { from: 'user', text: answer }
    ]
    setMessages(updatedMessages)
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      const nextStep = step + 1
      setStep(nextStep)

      if (nextStep < questions.length) {
        setMessages([
          ...updatedMessages,
          { from: 'bot', text: questions[nextStep].text }
        ])
      } else {
        finalizeDiagnosis(newAnswers)
      }
    }, 700)
  }

  const finalizeDiagnosis = (finalAnswers: string[]) => {
    const { risk, recommendation } = calculateRisk(finalAnswers)

    const result: DiagnosisResult = {
      id: Date.now(),
      risk,
      recommendation,
      date: new Date().toISOString(),
      answers: finalAnswers
    }

    saveResult(result)
    sessionStorage.setItem('lastResult', JSON.stringify(result))
    navigate('/diagnosis/result')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <StepIndicator current={step} total={questions.length} />
      <ChatContainer>
        {messages.map((msg, i) => (
          <ChatBubble key={i} from={msg.from} text={msg.text} />
        ))}
        {typing && <TypingIndicator />}
      </ChatContainer>
      {step < questions.length && !typing && (
        <OptionButtons
          options={[...questions[step].options]}
          onSelect={handleAnswer}
        />
      )}
    </div>
  )
}
