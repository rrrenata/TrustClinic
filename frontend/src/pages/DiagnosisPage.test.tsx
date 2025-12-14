import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import DiagnosisPage from './DiagnosisPage'

const mockUseAuth = jest.fn()

jest.mock('../context/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}))

describe('DiagnosisPage', () => {
  beforeEach(() => {
    mockUseAuth.mockReset()
  })

  it('renders normal diagnosis page when authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false
    })

    render(
      <MemoryRouter initialEntries={['/diagnosis']}>
        <Routes>
          <Route path="/diagnosis" element={<DiagnosisPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/страница диагностики/i)).toBeInTheDocument()
  })

  it('renders result branch on /diagnosis/result', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      loading: false
    })

    render(
      <MemoryRouter initialEntries={['/diagnosis/result']}>
        <Routes>
          <Route path="/diagnosis/result" element={<DiagnosisPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/отображение результатов/i)).toBeInTheDocument()
  })

  it('redirects to /login when not authenticated (covers redirect branch)', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      loading: false
    })

    render(
      <MemoryRouter initialEntries={['/diagnosis']}>
        <Routes>
          <Route path="/diagnosis" element={<DiagnosisPage />} />
          <Route path="/login" element={<div>LOGIN_PAGE</div>} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('LOGIN_PAGE')).toBeInTheDocument()
    })
  })
})
