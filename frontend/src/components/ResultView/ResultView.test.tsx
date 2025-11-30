import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import ResultView from './ResultView'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

const renderResultView = (result?: object) => {
  if (result) {
    sessionStorage.setItem('lastResult', JSON.stringify(result))
  }
  
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ResultView />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('ResultView', () => {
  beforeEach(() => {
    sessionStorage.clear()
    mockNavigate.mockClear()
  })

  it('shows no result message when no result in session', () => {
    renderResultView()
    expect(screen.getByText('Результат не найден')).toBeInTheDocument()
  })

  it('shows diagnosis button when no result', () => {
    renderResultView()
    expect(screen.getByText('Пройти диагностику')).toBeInTheDocument()
  })

  it('navigates to diagnosis when button clicked (no result)', () => {
    renderResultView()
    fireEvent.click(screen.getByText('Пройти диагностику'))
    expect(mockNavigate).toHaveBeenCalledWith('/diagnosis')
  })

  it('displays result title', () => {
    renderResultView({ id: 1, risk: 50, recommendation: 'Test rec', date: '2024-01-01', answers: [] })
    expect(screen.getByText('Результат диагностики')).toBeInTheDocument()
  })

  it('displays risk percentage', () => {
    renderResultView({ id: 1, risk: 50, recommendation: 'Test rec', date: '2024-01-01', answers: [] })
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('displays recommendation', () => {
    renderResultView({ id: 1, risk: 50, recommendation: 'Test recommendation', date: '2024-01-01', answers: [] })
    expect(screen.getByText('Test recommendation')).toBeInTheDocument()
  })

  it('displays low risk in blue color class', () => {
    renderResultView({ id: 1, risk: 20, recommendation: 'Low risk', date: '2024-01-01', answers: [] })
    const riskElement = screen.getByText('20%')
    expect(riskElement).toHaveClass('pixel-accent-blue')
  })

  it('displays medium risk in accent color class', () => {
    renderResultView({ id: 1, risk: 50, recommendation: 'Medium risk', date: '2024-01-01', answers: [] })
    const riskElement = screen.getByText('50%')
    expect(riskElement).toHaveClass('pixel-accent')
  })

  it('displays high risk in accent color class', () => {
    renderResultView({ id: 1, risk: 80, recommendation: 'High risk', date: '2024-01-01', answers: [] })
    const riskElement = screen.getByText('80%')
    expect(riskElement).toHaveClass('pixel-accent')
  })

  it('shows retry button', () => {
    renderResultView({ id: 1, risk: 50, recommendation: 'Test', date: '2024-01-01', answers: [] })
    expect(screen.getByText('Пройти снова')).toBeInTheDocument()
  })

  it('shows profile button', () => {
    renderResultView({ id: 1, risk: 50, recommendation: 'Test', date: '2024-01-01', answers: [] })
    expect(screen.getByText('В профиль')).toBeInTheDocument()
  })

  it('navigates to diagnosis on retry click', () => {
    renderResultView({ id: 1, risk: 50, recommendation: 'Test', date: '2024-01-01', answers: [] })
    fireEvent.click(screen.getByText('Пройти снова'))
    expect(mockNavigate).toHaveBeenCalledWith('/diagnosis')
  })

  it('navigates to profile on profile click', () => {
    renderResultView({ id: 1, risk: 50, recommendation: 'Test', date: '2024-01-01', answers: [] })
    fireEvent.click(screen.getByText('В профиль'))
    expect(mockNavigate).toHaveBeenCalledWith('/profile')
  })
})
