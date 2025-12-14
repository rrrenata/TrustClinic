import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import LoginPage from './LoginPage'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

const renderLogin = () =>
  render(
    <AuthProvider>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </AuthProvider>
  )

describe('LoginPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders login page', () => {
    renderLogin()

    expect(screen.getByText('Вход')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('email@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Минимум 6 символов')).toBeInTheDocument()
  })

  it('shows error on failed login', async () => {
    renderLogin()

    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Минимум 6 символов'), {
      target: { value: '123' } // < 6 → ошибка логина
    })

    fireEvent.click(screen.getByRole('button', { name: 'Войти' }))

    expect(
      await screen.findByText('Неверные данные для входа')
    ).toBeInTheDocument()
  })
})
