import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AboutPage from './AboutPage'

const renderAboutPage = () => {
  return render(
    <BrowserRouter>
      <AboutPage />
    </BrowserRouter>
  )
}

describe('AboutPage', () => {
  it('renders page title', () => {
    renderAboutPage()
    expect(screen.getByText(/О клинике \(AboutPage\)/)).toBeInTheDocument()
  })

  it('renders description section', () => {
    renderAboutPage()
    expect(screen.getByText(/Описание компонента/)).toBeInTheDocument()
  })

  it('renders hero section description', () => {
    renderAboutPage()
    expect(screen.getByText(/Hero-секция/)).toBeInTheDocument()
  })

  it('renders values section description', () => {
    renderAboutPage()
    expect(screen.getByText(/Секция ценностей/)).toBeInTheDocument()
  })

  it('renders numbers section description', () => {
    renderAboutPage()
    expect(screen.getByText(/Мы в цифрах/)).toBeInTheDocument()
  })

  it('renders CTA section description', () => {
    renderAboutPage()
    expect(screen.getByText(/CTA-секция/)).toBeInTheDocument()
  })

  it('renders used components info', () => {
    renderAboutPage()
    expect(screen.getByText(/Используемые компоненты/)).toBeInTheDocument()
  })

  it('renders diagnosis button', () => {
    renderAboutPage()
    expect(screen.getByText('Начать диагностику')).toBeInTheDocument()
  })

  it('diagnosis button links to diagnosis page', () => {
    renderAboutPage()
    const link = screen.getByText('Начать диагностику').closest('a')
    expect(link).toHaveAttribute('href', '/diagnosis')
  })
})
