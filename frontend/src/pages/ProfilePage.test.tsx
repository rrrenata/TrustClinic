import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import { AuthContext, User, DiagnosisResult } from '../context/AuthContext'
import { ReactNode } from 'react'

interface MockAuthProviderProps {
  children: ReactNode
  isAuthenticated?: boolean
  user?: User | null
}

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@test.com'
}

const MockAuthProvider = ({
  children,
  isAuthenticated = true,
  user = mockUser
}: MockAuthProviderProps) => {
  const mockValue = {
    user,
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

const renderProfilePage = (isAuthenticated = true) => {
  return render(
    <BrowserRouter>
      <MockAuthProvider isAuthenticated={isAuthenticated}>
        <ProfilePage />
      </MockAuthProvider>
    </BrowserRouter>
  )
}

describe('ProfilePage', () => {
  it('renders page title when authenticated', () => {
    renderProfilePage()
    expect(screen.getByText(/Личный кабинет/)).toBeInTheDocument()
  })

  it('renders description when authenticated', () => {
    renderProfilePage()
    expect(screen.getByText(/Описание компонента/)).toBeInTheDocument()
  })

  it('renders user info when authenticated', () => {
    renderProfilePage()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@test.com')).toBeInTheDocument()
  })

  it('renders logout button when authenticated', () => {
    renderProfilePage()
    expect(screen.getByText('Выйти')).toBeInTheDocument()
  })

  it('renders diagnosis history placeholder', () => {
    renderProfilePage()
    expect(screen.getByText(/история диагностик/)).toBeInTheDocument()
  })

  it('renders diagnosis button', () => {
    renderProfilePage()
    expect(screen.getByText('Пройти диагностику')).toBeInTheDocument()
  })

  it('renders nothing when not authenticated', () => {
    renderProfilePage(false)
    expect(screen.queryByText(/Личный кабинет/)).not.toBeInTheDocument()
  })
})
