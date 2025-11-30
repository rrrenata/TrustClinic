import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import { AuthContext, User, DiagnosisResult } from '../../context/AuthContext'
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

const mockLogout = jest.fn()

const MockAuthProvider = ({
  children,
  isAuthenticated = false
}: MockAuthProviderProps) => {
  const mockValue = {
    user: isAuthenticated ? mockUser : null,
    isAuthenticated,
    loading: false,
    token: isAuthenticated ? 'mock-token' : null,
    login: async () => {},
    register: async () => {},
    logout: mockLogout,
    saveResult: () => {},
    getResults: (): DiagnosisResult[] => []
  }

  return (
    <AuthContext.Provider value={mockValue}>
      {children}
    </AuthContext.Provider>
  )
}

const renderLayout = (isAuthenticated = false) => {
  return render(
    <BrowserRouter>
      <MockAuthProvider isAuthenticated={isAuthenticated}>
        <Layout />
      </MockAuthProvider>
    </BrowserRouter>
  )
}

describe('Layout', () => {
  beforeEach(() => {
    mockLogout.mockClear()
  })

  it('renders logo', () => {
    renderLayout()
    expect(screen.getByText('TrustClinic')).toBeInTheDocument()
  })

  it('renders description', () => {
    renderLayout()
    expect(screen.getByText(/Layout: Общий каркас приложения/)).toBeInTheDocument()
  })

  it('renders main nav link', () => {
    renderLayout()
    expect(screen.getByText('Главная')).toBeInTheDocument()
  })

  it('renders about nav link', () => {
    renderLayout()
    expect(screen.getByText('О клинике')).toBeInTheDocument()
  })

  it('renders login link when not authenticated', () => {
    renderLayout(false)
    expect(screen.getByText('Вход')).toBeInTheDocument()
  })

  it('renders register link when not authenticated', () => {
    renderLayout(false)
    expect(screen.getByText('Регистрация')).toBeInTheDocument()
  })

  it('renders diagnosis link when authenticated', () => {
    renderLayout(true)
    expect(screen.getByText('Диагностика')).toBeInTheDocument()
  })

  it('renders profile link when authenticated', () => {
    renderLayout(true)
    expect(screen.getByText('Профиль')).toBeInTheDocument()
  })

  it('renders logout button when authenticated', () => {
    renderLayout(true)
    expect(screen.getByText('Выйти')).toBeInTheDocument()
  })

  it('calls logout on click', () => {
    renderLayout(true)
    const logoutButton = screen.getByText('Выйти')
    fireEvent.click(logoutButton)
    expect(mockLogout).toHaveBeenCalled()
  })
})
