import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import DiagnosisChat from './DiagnosisChat'
import { AuthContext, User, DiagnosisResult } from '../../context/AuthContext'
import { ReactNode } from 'react'

interface MockAuthProviderProps {
  children: ReactNode
}

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@test.com'
}

const mockSaveResult = jest.fn()

const MockAuthProvider = ({ children }: MockAuthProviderProps) => {
  const mockValue = {
    user: mockUser,
    isAuthenticated: true,
    loading: false,
    token: 'mock-token',
    login: async () => {},
    register: async () => {},
    logout: () => {},
    saveResult: mockSaveResult,
    getResults: (): DiagnosisResult[] => []
  }

  return (
    <AuthContext.Provider value={mockValue}>
      {children}
    </AuthContext.Provider>
  )
}

const renderDiagnosisChat = () => {
  return render(
    <BrowserRouter>
      <MockAuthProvider>
        <DiagnosisChat />
      </MockAuthProvider>
    </BrowserRouter>
  )
}

describe('DiagnosisChat', () => {
  beforeEach(() => {
    mockSaveResult.mockClear()
    sessionStorage.clear()
  })

  it('renders component title', () => {
    renderDiagnosisChat()
    expect(screen.getByText(/Компонент DiagnosisChat/)).toBeInTheDocument()
  })

  it('renders description', () => {
    renderDiagnosisChat()
    expect(screen.getByText(/Интерактивный чат-интерфейс/)).toBeInTheDocument()
  })

  it('renders questions info', () => {
    renderDiagnosisChat()
    expect(screen.getByText(/10 вопросов о симптомах/)).toBeInTheDocument()
  })

  it('renders used components list', () => {
    renderDiagnosisChat()
    expect(screen.getAllByText(/ChatContainer/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/ChatBubble/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/TypingIndicator/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/OptionButtons/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/StepIndicator/).length).toBeGreaterThan(0)
  })

  it('renders example questions', () => {
    renderDiagnosisChat()
    expect(screen.getByText(/Сколько вам лет/)).toBeInTheDocument()
    expect(screen.getByText(/Когда начались симптомы/)).toBeInTheDocument()
  })

  it('renders simulate button', () => {
    renderDiagnosisChat()
    expect(screen.getByText(/Симулировать завершение теста/)).toBeInTheDocument()
  })

  it('saves result on simulate click', () => {
    renderDiagnosisChat()
    const button = screen.getByText(/Симулировать завершение теста/)
    fireEvent.click(button)

    expect(mockSaveResult).toHaveBeenCalled()
    expect(sessionStorage.getItem('lastResult')).not.toBeNull()
  })
})
