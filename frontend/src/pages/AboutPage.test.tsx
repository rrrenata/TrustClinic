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
  it('renders title', () => {
    renderAboutPage()
    expect(screen.getByText('О клинике')).toBeInTheDocument()
  })

  it('renders description', () => {
    renderAboutPage()
    expect(screen.getByText(/Современная медицинская клиника/)).toBeInTheDocument()
  })

  it('renders technology feature', () => {
    renderAboutPage()
    expect(screen.getByText('Передовые технологии')).toBeInTheDocument()
  })

  it('renders personal approach feature', () => {
    renderAboutPage()
    expect(screen.getByText('Персональный подход')).toBeInTheDocument()
  })

  it('renders specialists feature', () => {
    renderAboutPage()
    expect(screen.getByText('Опытные специалисты')).toBeInTheDocument()
  })

  it('renders numbers section title', () => {
    renderAboutPage()
    expect(screen.getByText('Мы в цифрах')).toBeInTheDocument()
  })

  it('renders diagnostics count', () => {
    renderAboutPage()
    expect(screen.getByText('15 000+')).toBeInTheDocument()
    expect(screen.getByText('Диагностик в год')).toBeInTheDocument()
  })

  it('renders satisfaction rate', () => {
    renderAboutPage()
    expect(screen.getByText('98%')).toBeInTheDocument()
    expect(screen.getByText('Удовлетворённость пациентов')).toBeInTheDocument()
  })

  it('renders specialists count', () => {
    renderAboutPage()
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('Специалистов в штате')).toBeInTheDocument()
  })

  it('renders CTA section', () => {
    renderAboutPage()
    expect(screen.getByText('Готовы пройти диагностику?')).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    renderAboutPage()
    expect(screen.getByText('Начать диагностику')).toBeInTheDocument()
  })

  it('CTA button links to diagnosis', () => {
    renderAboutPage()
    const link = screen.getByText('Начать диагностику').closest('a')
    expect(link).toHaveAttribute('href', '/diagnosis')
  })
})
