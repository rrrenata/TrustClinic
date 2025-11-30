import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes'

const renderRoutes = (path: string) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('AppRoutes', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders home page at /', () => {
    renderRoutes('/')
    expect(screen.getByText('TrustClinic')).toBeInTheDocument()
  })

  it('renders login page at /login', () => {
    renderRoutes('/login')
    expect(screen.getByText('Вход')).toBeInTheDocument()
  })

  it('renders register page at /register', () => {
    renderRoutes('/register')
    expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument()
  })

  it('renders about page at /about', () => {
    renderRoutes('/about')
    expect(screen.getByText('О клинике')).toBeInTheDocument()
  })

  it('renders 404 for unknown routes', () => {
    renderRoutes('/unknown-page')
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders layout header on all pages', () => {
    renderRoutes('/')
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders navigation on all pages', () => {
    renderRoutes('/')
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
