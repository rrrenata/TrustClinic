import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes'

const renderRoutes = (initialRoute: string) => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRoutes />
      </MemoryRouter>
    </AuthProvider>
  )
}

describe('Routes', () => {
  it('renders home page at /', () => {
    renderRoutes('/')
    expect(screen.getByRole('heading', { name: 'TrustClinic' })).toBeInTheDocument()
  })

  it('renders about page at /about', () => {
    renderRoutes('/about')

    expect(screen.getByRole('heading', { name: 'О клинике' })).toBeInTheDocument()
  })

  it('renders 404 for unknown routes', () => {
    renderRoutes('/unknown-route-xyz')
    expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument()
  })
})
