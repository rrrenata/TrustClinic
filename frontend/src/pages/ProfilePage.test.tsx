import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProfilePage from './ProfilePage'

const mockUseAuth = jest.fn()

jest.mock('../context/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}))

describe('ProfilePage', () => {
  beforeEach(() => {
    mockUseAuth.mockReset()
  })

  it('renders profile when authenticated and user exists', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false,
      logout: jest.fn(),
      user: { name: 'Test User', email: 'test@test.com' }
    })

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/личный кабинет/i)).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@test.com')).toBeInTheDocument()
  })

  it('redirects to /login when not authenticated (covers redirect branch)', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      loading: false,
      logout: jest.fn(),
      user: null
    })

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<div>LOGIN_PAGE</div>} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('LOGIN_PAGE')).toBeInTheDocument()
    })
  })
})
