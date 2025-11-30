import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import DiagnosisPage from './DiagnosisPage'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

const renderDiagnosisPage = (withAuth = true, path = '/diagnosis') => {
  if (withAuth) {
    localStorage.setItem('authToken', 'test-token')
    localStorage.setItem('authUser', JSON.stringify({ id: 1, email: 'test@test.com', name: 'Test' }))
  }
  
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <DiagnosisPage />
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('DiagnosisPage', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    mockNavigate.mockClear()
  })

  it('redirects to login when not authenticated', () => {
    renderDiagnosisPage(false)
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('renders diagnosis title', () => {
    renderDiagnosisPage()
    expect(screen.getByText('Диагностика')).toBeInTheDocument()
  })

  it('renders chat component when authenticated', () => {
    renderDiagnosisPage()
    expect(screen.getByText('Сколько вам лет?')).toBeInTheDocument()
  })

  it('renders result title on result path', () => {
    sessionStorage.setItem('lastResult', JSON.stringify({ id: 1, risk: 50, recommendation: 'Test', date: '2024-01-01', answers: [] }))
    renderDiagnosisPage(true, '/diagnosis/result')
    expect(screen.getByText('Результат')).toBeInTheDocument()
  })

  it('renders step indicator', () => {
    renderDiagnosisPage()
    expect(screen.getByText(/Вопрос 1 из 10/)).toBeInTheDocument()
  })

  it('renders option buttons', () => {
    renderDiagnosisPage()
    expect(screen.getByText('< 18')).toBeInTheDocument()
  })
})
