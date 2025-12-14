import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'

const renderNotFoundPage = () => {
  return render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  )
}

describe('NotFoundPage', () => {
  it('renders 404 text', () => {
    renderNotFoundPage()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders not found message', () => {
    renderNotFoundPage()
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument()
  })

  it('renders home button', () => {
    renderNotFoundPage()
    expect(screen.getByText('На главную')).toBeInTheDocument()
  })

  it('home button links to home page', () => {
    renderNotFoundPage()
    const link = screen.getByText('На главную').closest('a')
    expect(link).toHaveAttribute('href', '/')
  })
})
