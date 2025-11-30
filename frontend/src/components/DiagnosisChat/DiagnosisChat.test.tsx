import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import DiagnosisChat from './DiagnosisChat'

const renderChat = () => {
  localStorage.setItem('authToken', 'test-token')
  localStorage.setItem('authUser', JSON.stringify({ id: 1, email: 'test@test.com', name: 'Test' }))
  
  return render(
    <BrowserRouter>
      <AuthProvider>
        <DiagnosisChat />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('DiagnosisChat', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders step indicator', () => {
    renderChat()
    expect(screen.getByText(/Вопрос 1 из 10/)).toBeInTheDocument()
  })

  it('renders first question', () => {
    renderChat()
    expect(screen.getByText('Сколько вам лет?')).toBeInTheDocument()
  })

  it('renders option buttons', () => {
    renderChat()
    expect(screen.getByText('< 18')).toBeInTheDocument()
    expect(screen.getByText('18–40')).toBeInTheDocument()
  })

  it('clicking option adds user message', async () => {
    renderChat()
    
    fireEvent.click(screen.getByText('18–40'))
    
    await waitFor(() => {
      expect(screen.getByText('18–40')).toBeInTheDocument()
    })
  })

  it('clicking option shows typing indicator', () => {
    renderChat()
    
    fireEvent.click(screen.getByText('18–40'))
    
    const typingIndicator = document.querySelector('.sc-typing-indicator')
    expect(typingIndicator).toBeInTheDocument()
  })

  it('shows next question after answer', async () => {
    renderChat()
    
    fireEvent.click(screen.getByText('18–40'))
    
    jest.advanceTimersByTime(800)
    
    await waitFor(() => {
      expect(screen.getByText('Когда начались симптомы?')).toBeInTheDocument()
    })
  })

  it('updates step indicator after answer', async () => {
    renderChat()
    
    fireEvent.click(screen.getByText('18–40'))
    
    jest.advanceTimersByTime(800)
    
    await waitFor(() => {
      expect(screen.getByText(/Вопрос 2 из 10/)).toBeInTheDocument()
    })
  })

  it('renders chat container', () => {
    renderChat()
    const container = document.querySelector('.sc-chat-container')
    expect(container).toBeInTheDocument()
  })

  it('renders chat bubble for bot message', () => {
    renderChat()
    const botBubble = document.querySelector('.sc-chat-bubble--bot')
    expect(botBubble).toBeInTheDocument()
  })
})
