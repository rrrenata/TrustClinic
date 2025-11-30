import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './LoginPage'
import { AuthProvider } from '../context/AuthContext'

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
  it('renders page title', () => {
    renderLoginPage()
    expect(screen.getByText(/Страница входа/)).toBeInTheDocument()
  })

  it('renders description', () => {
    renderLoginPage()
    expect(screen.getByText(/Форма авторизации пользователя/)).toBeInTheDocument()
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

  it('handles form input', () => {
    renderLoginPage()
    const emailInput = screen.getByPlaceholderText('email@example.com')
    const passwordInput = screen.getByPlaceholderText('Минимум 6 символов')

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })

    expect(emailInput).toHaveValue('test@test.com')
    expect(passwordInput).toHaveValue('123456')
  })

  it('shows loading state on submit', async () => {
    renderLoginPage()
    const emailInput = screen.getByPlaceholderText('email@example.com')
    const passwordInput = screen.getByPlaceholderText('Минимум 6 символов')
    const submitButton = screen.getByText('Войти')

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText('Вход...')).toBeInTheDocument()
    })
  })
})
