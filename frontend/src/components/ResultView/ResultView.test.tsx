import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ResultView from './ResultView'

const mockResult = {
  id: 1,
  risk: 45,
  recommendation: 'Средний риск. Рекомендуется консультация врача.',
  date: '2024-01-15T10:00:00.000Z',
  answers: ['18–40', '1–3 дня назад', '37–38']
}

const renderResultView = (hasResult = true) => {
  if (hasResult) {
    sessionStorage.setItem('lastResult', JSON.stringify(mockResult))
  } else {
    sessionStorage.removeItem('lastResult')
  }

  return render(
    <BrowserRouter>
      <ResultView />
    </BrowserRouter>
  )
}

describe('ResultView', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('renders component title when result exists', () => {
    renderResultView()
    expect(screen.getByText(/Компонент ResultView/)).toBeInTheDocument()
  })

  it('renders description when result exists', () => {
    renderResultView()
    expect(screen.getByText(/Отображение процента риска/)).toBeInTheDocument()
  })

  it('renders risk percentage when result exists', () => {
    renderResultView()
    expect(screen.getByText('45%')).toBeInTheDocument()
  })

  it('renders recommendation when result exists', () => {
    renderResultView()
    expect(screen.getByText(/Средний риск/)).toBeInTheDocument()
  })

  it('renders action buttons when result exists', () => {
    renderResultView()
    expect(screen.getByText('Пройти снова')).toBeInTheDocument()
    expect(screen.getByText('В профиль')).toBeInTheDocument()
  })

  it('renders no result message when result not found', () => {
    renderResultView(false)
    expect(screen.getByText('Результат не найден')).toBeInTheDocument()
  })

  it('renders diagnosis button when result not found', () => {
    renderResultView(false)
    expect(screen.getByText('Пройти диагностику')).toBeInTheDocument()
  })
})
