import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import LoginPage from './LoginPage'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders title', () => {
    renderLoginPage()
    expect(screen.getByText('Вход')).toBeInTheDocument()
  })

  it('renders email input', () => {
    renderLoginPage()
    expect(screen.getByPlaceholderText('email@example.com')).toBeInTheDocument()
  })

  it('renders password input', () => {
    renderLoginPage()
    expect(screen.getByPlaceholderText('Минимум 6 символов')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderLoginPage()
    expect(screen.getByText('Войти')).toBeInTheDocument()
  })

  it('renders register link', () => {
    renderLoginPage()
    expect(screen.getByText('Регистрация')).toBeInTheDocument()
  })

  it('email input changes value', () => {
    renderLoginPage()
    const input = screen.getByPlaceholderText('email@example.com')
    fireEvent.change(input, { target: { value: 'test@test.com' } })
    expect(input).toHaveValue('test@test.com')
  })

  it('password input changes value', () => {
    renderLoginPage()
    const input = screen.getByPlaceholderText('Минимум 6 символов')
    fireEvent.change(input, { target: { value: 'password123' } })
    expect(input).toHaveValue('password123')
  })

  it('successful login navigates to diagnosis', async () => {
    renderLoginPage()
    
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('Минимум 6 символов'), { target: { value: 'password123' } })
    fireEvent.click(screen.getByText('Войти'))
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/diagnosis')
    })
  })

  it('shows loading state during login', async () => {
    renderLoginPage()
    
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('Минимум 6 символов'), { target: { value: 'password123' } })
    fireEvent.click(screen.getByText('Войти'))
    
    expect(screen.getByText('Вход...')).toBeInTheDocument()
  })

  it('shows error on failed login', async () => {
    renderLoginPage()
    
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), { target: { value: '' } })
    fireEvent.change(screen.getByPlaceholderText('Минимум 6 символов'), { target: { value: '123' } })
    fireEvent.click(screen.getByText('Войти'))
    
    await waitFor(() => {
      expect(screen.getByText('Неверные данные для входа')).toBeInTheDocument()
    })
  })

  it('register link points to register page', () => {
    renderLoginPage()
    const link = screen.getByText('Регистрация')
    expect(link).toHaveAttribute('href', '/register')
  })
})
