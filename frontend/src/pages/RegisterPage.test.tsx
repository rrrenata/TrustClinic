import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import RegisterPage from './RegisterPage'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

const renderRegisterPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('RegisterPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders title', () => {
    renderRegisterPage()
    expect(screen.getByText('Регистрация')).toBeInTheDocument()
  })

  it('renders name input', () => {
    renderRegisterPage()
    expect(screen.getByPlaceholderText('Ваше имя')).toBeInTheDocument()
  })

  it('renders email input', () => {
    renderRegisterPage()
    expect(screen.getByPlaceholderText('email@example.com')).toBeInTheDocument()
  })

  it('renders password input', () => {
    renderRegisterPage()
    expect(screen.getByPlaceholderText('Минимум 6 символов')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderRegisterPage()
    expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument()
  })

  it('renders login link', () => {
    renderRegisterPage()
    expect(screen.getByText('Войти')).toBeInTheDocument()
  })

  it('name input changes value', () => {
    renderRegisterPage()
    const input = screen.getByPlaceholderText('Ваше имя')
    fireEvent.change(input, { target: { value: 'Test User' } })
    expect(input).toHaveValue('Test User')
  })

  it('email input changes value', () => {
    renderRegisterPage()
    const input = screen.getByPlaceholderText('email@example.com')
    fireEvent.change(input, { target: { value: 'test@test.com' } })
    expect(input).toHaveValue('test@test.com')
  })

  it('password input changes value', () => {
    renderRegisterPage()
    const input = screen.getByPlaceholderText('Минимум 6 символов')
    fireEvent.change(input, { target: { value: 'password123' } })
    expect(input).toHaveValue('password123')
  })

  it('successful register navigates to diagnosis', async () => {
    renderRegisterPage()
    
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('Минимум 6 символов'), { target: { value: 'password123' } })
    fireEvent.click(screen.getByText('Зарегистрироваться'))
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/diagnosis')
    })
  })

  it('shows loading state during register', async () => {
    renderRegisterPage()
    
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: 'Test' } })
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('Минимум 6 символов'), { target: { value: 'password123' } })
    fireEvent.click(screen.getByText('Зарегистрироваться'))
    
    expect(screen.getByText('Регистрация...')).toBeInTheDocument()
  })

  it('shows error on failed register', async () => {
    renderRegisterPage()
    
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: '' } })
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), { target: { value: '' } })
    fireEvent.change(screen.getByPlaceholderText('Минимум 6 символов'), { target: { value: '123' } })
    fireEvent.click(screen.getByText('Зарегистрироваться'))
    
    await waitFor(() => {
      expect(screen.getByText('Заполните все поля корректно')).toBeInTheDocument()
    })
  })

  it('login link points to login page', () => {
    renderRegisterPage()
    const link = screen.getByText('Войти')
    expect(link).toHaveAttribute('href', '/login')
  })
})
