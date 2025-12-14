import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import ProfilePage from './ProfilePage'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

const renderProfilePage = (withAuth = true, withResults = false) => {
  if (withAuth) {
    localStorage.setItem('authToken', 'test-token')
    localStorage.setItem('authUser', JSON.stringify({ id: 1, email: 'test@test.com', name: 'Test User' }))
  }
  
  if (withResults) {
    localStorage.setItem('diagnosisResults', JSON.stringify([
      { id: 1, risk: 50, recommendation: 'Test rec', date: '2024-01-01T00:00:00.000Z', answers: [] }
    ]))
  }
  
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ProfilePage />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('ProfilePage', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    mockNavigate.mockClear()
  })

  it('redirects to login when not authenticated', () => {
    renderProfilePage(false)
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('renders title when authenticated', () => {
    renderProfilePage()
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument()
  })

  it('displays user name', () => {
    renderProfilePage()
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('displays user email', () => {
    renderProfilePage()
    expect(screen.getByText('test@test.com')).toBeInTheDocument()
  })

  it('renders logout button', () => {
    renderProfilePage()
    expect(screen.getByText('Выйти')).toBeInTheDocument()
  })

  it('renders history section title', () => {
    renderProfilePage()
    expect(screen.getByText('История диагностик')).toBeInTheDocument()
  })

  it('shows empty message when no results', () => {
    renderProfilePage()
    expect(screen.getByText('У вас пока нет сохраненных результатов')).toBeInTheDocument()
  })

  it('shows diagnosis button when no results', () => {
    renderProfilePage()
    expect(screen.getByText('Пройти диагностику')).toBeInTheDocument()
  })

  it('displays results when available', () => {
    renderProfilePage(true, true)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('displays result recommendation', () => {
    renderProfilePage(true, true)
    expect(screen.getByText('Test rec')).toBeInTheDocument()
  })

  it('renders details button for results', () => {
    renderProfilePage(true, true)
    expect(screen.getByText('Подробнее')).toBeInTheDocument()
  })

  it('clicking details saves result to session and navigates', () => {
    renderProfilePage(true, true)
    fireEvent.click(screen.getByText('Подробнее'))
    expect(sessionStorage.getItem('lastResult')).toBeTruthy()
    expect(mockNavigate).toHaveBeenCalledWith('/diagnosis/result')
  })

  it('renders new diagnosis button', () => {
    renderProfilePage()
    expect(screen.getByText('Новая диагностика')).toBeInTheDocument()
  })

  it('new diagnosis button navigates to diagnosis', () => {
    renderProfilePage()
    fireEvent.click(screen.getByText('Новая диагностика'))
    expect(mockNavigate).toHaveBeenCalledWith('/diagnosis')
  })

  it('logout clears localStorage', () => {
    renderProfilePage()
    fireEvent.click(screen.getByText('Выйти'))
    expect(localStorage.getItem('authToken')).toBeNull()
  })
})
