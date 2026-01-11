import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout'

describe('Layout', () => {
  it('renders navigation', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )

    expect(screen.getByText('Главная')).toBeInTheDocument()
    expect(screen.getByText('О клинике')).toBeInTheDocument()
    expect(screen.getByText('Диагностика')).toBeInTheDocument()
  })
})
