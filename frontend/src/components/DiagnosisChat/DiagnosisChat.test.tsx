import { render, screen, fireEvent, act } from '@testing-library/react'
import DiagnosisChat from './DiagnosisChat'

type NavigateFn = (to: string) => void
const mockNavigate = jest.fn<ReturnType<NavigateFn>, Parameters<NavigateFn>>()

type SaveResultFn = (result: import('../../context/AuthContext').DiagnosisResult) => void
const mockSaveResult = jest.fn<ReturnType<SaveResultFn>, Parameters<SaveResultFn>>()

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom') as Record<string, unknown>
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

jest.mock('../../context/AuthContext', () => {
  return {
    useAuth: () => ({ saveResult: mockSaveResult })
  }
})

function advance(ms: number) {
  return act(async () => {
    jest.advanceTimersByTime(ms)
  })
}

describe('DiagnosisChat', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-01-01T00:00:00.000Z'))
    mockNavigate.mockClear()
    mockSaveResult.mockClear()
    sessionStorage.clear()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders first question and options', () => {
    render(<DiagnosisChat />)

    expect(screen.getByText('Сколько вам лет?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '< 18' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '18–40' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '40–60' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '60+' })).toBeInTheDocument()
  })

  it('moves to next question after selecting answer', async () => {
    render(<DiagnosisChat />)

    fireEvent.click(screen.getByRole('button', { name: '< 18' }))
    expect(screen.getByText('< 18')).toBeInTheDocument()

    await advance(700)

    expect(screen.getByText('Когда начались симптомы?')).toBeInTheDocument()
  })

  it('finishes diagnosis, saves result, writes sessionStorage and navigates', async () => {
    render(<DiagnosisChat />)

    const answers: Array<{ label: string }> = [
      { label: '18–40' },
      { label: 'Сегодня' },
      { label: 'Нет' },
      { label: 'Нет' },
      { label: 'Сильно' },
      { label: 'Ничего' },
      { label: 'Голова' },
      { label: 'Постепенно' },
      { label: 'Инфекция' },
      { label: 'Нормально' }
    ]

    for (const a of answers) {
      fireEvent.click(screen.getByRole('button', { name: a.label }))
      await advance(700)
    }

    expect(mockNavigate).toHaveBeenCalledWith('/diagnosis/result')
    expect(mockSaveResult).toHaveBeenCalledTimes(1)

    const stored = sessionStorage.getItem('lastResult')
    expect(stored).not.toBeNull()

    const parsed = JSON.parse(stored ?? 'null') as {
      risk: number
      recommendation: string
      answers: string[]
      id: number
      date: string
    }

    expect(parsed.risk).toBe(85)
    expect(parsed.recommendation).toMatch(/немедленно/i)
    expect(parsed.answers[4]).toBe('Сильно')
    expect(typeof parsed.id).toBe('number')
    expect(typeof parsed.date).toBe('string')
  })
})
