import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RegisterPage from './RegisterPage'
import { AuthProvider } from '../context/AuthContext'

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
  it('renders page title', () => {
    renderRegisterPage()
    expect(screen.getByText(/Страница регистрации/)).toBeInTheDocument()
  })

  it('renders description', () => {
    renderRegisterPage()
    expect(screen.getByText(/Форма регистрации нового пользователя/)).toBeInTheDocument()
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

  it('handles form input', () => {
    renderRegisterPage()
    const nameInput = screen.getByPlaceholderText('Ваше имя')
    const emailInput = screen.getByPlaceholderText('email@example.com')
    const passwordInput = screen.getByPlaceholderText('Минимум 6 символов')

    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })

    expect(nameInput).toHaveValue('Test User')
    expect(emailInput).toHaveValue('test@test.com')
    expect(passwordInput).toHaveValue('123456')
  })

  it('shows loading state on submit', async () => {
    renderRegisterPage()
    const nameInput = screen.getByPlaceholderText('Ваше имя')
    const emailInput = screen.getByPlaceholderText('email@example.com')
    const passwordInput = screen.getByPlaceholderText('Минимум 6 символов')
    const submitButton = screen.getByText('Зарегистрироваться')

    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText('Регистрация...')).toBeInTheDocument()
    })
  })
})
