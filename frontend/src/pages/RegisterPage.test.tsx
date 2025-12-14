import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import RegisterPage from './RegisterPage'

const renderRegister = () =>
  render(
    <AuthProvider>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </AuthProvider>
  )

describe('RegisterPage', () => {
  it('renders register page', () => {
    renderRegister()

    expect(screen.getByText('Регистрация')).toBeInTheDocument()
  })

  it('shows error on failed register', async () => {
    renderRegister()

    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), {
      target: { value: 'Test User' }
    })
    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('Минимум 6 символов'), {
      target: { value: '123' } // < 6 → ошибка регистрации
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Зарегистрироваться' })
    )

    expect(
      await screen.findByText('Заполните все поля корректно')
    ).toBeInTheDocument()
  })
})
