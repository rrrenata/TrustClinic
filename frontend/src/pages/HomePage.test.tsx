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
  it('renders title', () => {
    renderHomePage()
    expect(screen.getByText('TrustClinic')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    renderHomePage()
    expect(screen.getByText('Пройди медицинский тест — быстро!')).toBeInTheDocument()
  })

  it('renders description', () => {
    renderHomePage()
    expect(screen.getByText(/Пройдите медицинский опрос/)).toBeInTheDocument()
  })

  it('renders start button', () => {
    renderHomePage()
    expect(screen.getByText('Начать опрос')).toBeInTheDocument()
  })

  it('renders why section title', () => {
    renderHomePage()
    expect(screen.getByText('Почему TrustClinic?')).toBeInTheDocument()
  })

  it('renders fast feature', () => {
    renderHomePage()
    expect(screen.getByText('Быстро')).toBeInTheDocument()
    expect(screen.getByText('5 минут на тест')).toBeInTheDocument()
  })

  it('renders accurate feature', () => {
    renderHomePage()
    expect(screen.getByText('Точно')).toBeInTheDocument()
    expect(screen.getByText('На основе медицины')).toBeInTheDocument()
  })

  it('renders cute feature', () => {
    renderHomePage()
    expect(screen.getByText('Мило')).toBeInTheDocument()
    expect(screen.getByText('Пиксельный дизайн')).toBeInTheDocument()
  })

  it('renders how it works section', () => {
    renderHomePage()
    expect(screen.getByText('Как это работает')).toBeInTheDocument()
  })

  it('renders fill survey step', () => {
    renderHomePage()
    expect(screen.getByText('Заполни опрос')).toBeInTheDocument()
  })

  it('renders get result step', () => {
    renderHomePage()
    expect(screen.getByText('Получи результат')).toBeInTheDocument()
  })

  it('renders examples section', () => {
    renderHomePage()
    expect(screen.getByText('Примеры результатов')).toBeInTheDocument()
  })

  it('renders patient examples', () => {
    renderHomePage()
    expect(screen.getByText('Пациент 1')).toBeInTheDocument()
    expect(screen.getByText('Пациент 2')).toBeInTheDocument()
    expect(screen.getByText('Пациент 3')).toBeInTheDocument()
  })

  it('renders reviews section', () => {
    renderHomePage()
    expect(screen.getByText('Отзывы пользователей')).toBeInTheDocument()
  })

  it('renders capsule component', () => {
    renderHomePage()
    const capsule = document.querySelector('.capsule-container')
    expect(capsule).toBeInTheDocument()
  })

  it('start button links to register', () => {
    renderHomePage()
    const link = screen.getByText('Начать опрос').closest('a')
    expect(link).toHaveAttribute('href', '/register')
  })
})
