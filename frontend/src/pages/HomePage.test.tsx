import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './HomePage'

const renderHomePage = () => {
  return render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  )
}

describe('HomePage', () => {
  it('renders page title', () => {
    renderHomePage()
    expect(screen.getByText(/Главная страница/)).toBeInTheDocument()
  })

  it('renders description section', () => {
    renderHomePage()
    expect(screen.getByText(/Описание компонента/)).toBeInTheDocument()
  })

  it('renders hero section description', () => {
    renderHomePage()
    expect(screen.getByText(/Hero-секция/)).toBeInTheDocument()
  })

  it('renders why section description', () => {
    renderHomePage()
    expect(screen.getByText(/Почему TrustClinic/)).toBeInTheDocument()
  })

  it('renders how it works description', () => {
    renderHomePage()
    expect(screen.getByText(/Как это работает/)).toBeInTheDocument()
  })

  it('renders examples description', () => {
    renderHomePage()
    expect(screen.getByText(/Примеры результатов/)).toBeInTheDocument()
  })

  it('renders reviews description', () => {
    renderHomePage()
    expect(screen.getByText(/Отзывы пользователей/)).toBeInTheDocument()
  })

  it('renders used components info', () => {
    renderHomePage()
    expect(screen.getByText(/Используемые компоненты/)).toBeInTheDocument()
  })

  it('renders start button', () => {
    renderHomePage()
    expect(screen.getByText('Начать опрос')).toBeInTheDocument()
  })

  it('start button links to register', () => {
    renderHomePage()
    const link = screen.getByText('Начать опрос').closest('a')
    expect(link).toHaveAttribute('href', '/register')
  })
})
