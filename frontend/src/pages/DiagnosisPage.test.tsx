import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DiagnosisPage from './DiagnosisPage'
import { AuthContext, User, DiagnosisResult } from '../context/AuthContext'
import { ReactNode } from 'react'

interface MockAuthProviderProps {
  children: ReactNode
  isAuthenticated?: boolean
}

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@test.com'
}

const MockAuthProvider = ({
  children,
  isAuthenticated = true
}: MockAuthProviderProps) => {
  const mockValue = {
    user: isAuthenticated ? mockUser : null,
    isAuthenticated,
    loading: false,
    token: isAuthenticated ? 'mock-token' : null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    saveResult: () => {},
    getResults: (): DiagnosisResult[] => []
  }

  return (
    <AuthContext.Provider value={mockValue}>
      {children}
    </AuthContext.Provider>
  )
}

const renderDiagnosisPage = (isAuthenticated = true, route = '/diagnosis') => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <MockAuthProvider isAuthenticated={isAuthenticated}>
        <DiagnosisPage />
      </MockAuthProvider>
    </MemoryRouter>
  )
}

describe('DiagnosisPage', () => {
  it('renders page title when authenticated', () => {
    renderDiagnosisPage()
    expect(screen.getByText(/Страница диагностики/)).toBeInTheDocument()
  })

  it('renders description when authenticated', () => {
    renderDiagnosisPage()
    expect(screen.getByText(/Интерактивный чат с ботом/)).toBeInTheDocument()
  })

  it('renders DiagnosisChat component', () => {
    renderDiagnosisPage()
    expect(screen.getByText(/Компонент DiagnosisChat/)).toBeInTheDocument()
  })

  it('renders nothing when not authenticated', () => {
    renderDiagnosisPage(false)
    expect(screen.queryByText(/Страница диагностики/)).not.toBeInTheDocument()
  })

  it('shows result page title on result route', () => {
    renderDiagnosisPage(true, '/diagnosis/result')
    expect(screen.getByText(/Результат диагностики/)).toBeInTheDocument()
  })
})
