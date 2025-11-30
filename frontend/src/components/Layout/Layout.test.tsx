import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import Layout from './Layout'

const renderLayout = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Layout', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders header', () => {
    renderLayout()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders logo link', () => {
    renderLayout()
    expect(screen.getByText('TrustClinic')).toBeInTheDocument()
  })

  it('renders home link', () => {
    renderLayout()
    expect(screen.getByText('Главная')).toBeInTheDocument()
  })

  it('renders about link', () => {
    renderLayout()
    expect(screen.getByText('О клинике')).toBeInTheDocument()
  })

  it('shows login link when not authenticated', () => {
    renderLayout()
    expect(screen.getByText('Вход')).toBeInTheDocument()
  })

  it('shows register link when not authenticated', () => {
    renderLayout()
    expect(screen.getByText('Регистрация')).toBeInTheDocument()
  })

  it('shows diagnosis link when authenticated', () => {
    localStorage.setItem('authToken', 'test-token')
    localStorage.setItem('authUser', JSON.stringify({ id: 1, email: 'test@test.com', name: 'Test' }))
    
    renderLayout()
    expect(screen.getByText('Диагностика')).toBeInTheDocument()
  })

  it('shows profile link when authenticated', () => {
    localStorage.setItem('authToken', 'test-token')
    localStorage.setItem('authUser', JSON.stringify({ id: 1, email: 'test@test.com', name: 'Test' }))
    
    renderLayout()
    expect(screen.getByText('Профиль')).toBeInTheDocument()
  })

  it('shows logout button when authenticated', () => {
    localStorage.setItem('authToken', 'test-token')
    localStorage.setItem('authUser', JSON.stringify({ id: 1, email: 'test@test.com', name: 'Test' }))
    
    renderLayout()
    expect(screen.getByText('Выйти')).toBeInTheDocument()
  })

  it('hides login link when authenticated', () => {
    localStorage.setItem('authToken', 'test-token')
    localStorage.setItem('authUser', JSON.stringify({ id: 1, email: 'test@test.com', name: 'Test' }))
    
    renderLayout()
    expect(screen.queryByText('Вход')).not.toBeInTheDocument()
  })

  it('logout button clears auth', () => {
    localStorage.setItem('authToken', 'test-token')
    localStorage.setItem('authUser', JSON.stringify({ id: 1, email: 'test@test.com', name: 'Test' }))
    
    renderLayout()
    fireEvent.click(screen.getByText('Выйти'))
    
    expect(localStorage.getItem('authToken')).toBeNull()
  })

  it('renders main element', () => {
    renderLayout()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders navigation', () => {
    renderLayout()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
