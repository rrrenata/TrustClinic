import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'

const TestComponent = () => {
  const { user, isAuthenticated, login, logout, register, saveResult, getResults } = useAuth()
  
  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</span>
      <span data-testid="user-name">{user?.name || 'no-user'}</span>
      <span data-testid="user-email">{user?.email || 'no-email'}</span>
      <button onClick={() => login('test@test.com', 'password123')}>Login</button>
      <button onClick={() => register('Test User', 'test@test.com', 'password123')}>Register</button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => saveResult({ id: 1, risk: 50, recommendation: 'Test', date: '2024-01-01', answers: [] })}>
        Save Result
      </button>
      <span data-testid="results-count">{getResults().length}</span>
    </div>
  )
}

const TestLoginError = () => {
  const { login } = useAuth()
  const [error, setError] = useState('')
  
  const handleLogin = async () => {
    try {
      await login('', '123')
    } catch (e) {
      setError((e as Error).message)
    }
  }
  
  return (
    <div>
      <button onClick={handleLogin}>Bad Login</button>
      <span data-testid="error">{error}</span>
    </div>
  )
}

const TestRegisterError = () => {
  const { register } = useAuth()
  const [error, setError] = useState('')
  
  const handleRegister = async () => {
    try {
      await register('', '', '123')
    } catch (e) {
      setError((e as Error).message)
    }
  }
  
  return (
    <div>
      <button onClick={handleRegister}>Bad Register</button>
      <span data-testid="error">{error}</span>
    </div>
  )
}

import { useState } from 'react'

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('provides initial unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated')
  })

  it('provides initial null user', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    expect(screen.getByTestId('user-name')).toHaveTextContent('no-user')
  })

  it('login sets user and authenticated state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    await act(async () => {
      fireEvent.click(screen.getByText('Login'))
    })
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated')
    })
  })

  it('login stores token in localStorage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    await act(async () => {
      fireEvent.click(screen.getByText('Login'))
    })
    
    expect(localStorage.getItem('authToken')).toBeTruthy()
  })

  it('login stores user in localStorage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    await act(async () => {
      fireEvent.click(screen.getByText('Login'))
    })
    
    expect(localStorage.getItem('authUser')).toBeTruthy()
  })

  it('register sets user and authenticated state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    await act(async () => {
      fireEvent.click(screen.getByText('Register'))
    })
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated')
    })
  })

  it('logout clears user and authenticated state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    await act(async () => {
      fireEvent.click(screen.getByText('Login'))
    })
    
    await act(async () => {
      fireEvent.click(screen.getByText('Logout'))
    })
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated')
  })

  it('logout removes token from localStorage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    await act(async () => {
      fireEvent.click(screen.getByText('Login'))
    })
    
    await act(async () => {
      fireEvent.click(screen.getByText('Logout'))
    })
    
    expect(localStorage.getItem('authToken')).toBeNull()
  })

  it('saveResult stores result in localStorage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    fireEvent.click(screen.getByText('Save Result'))
    
    const stored = localStorage.getItem('diagnosisResults')
    expect(stored).toBeTruthy()
    const results = JSON.parse(stored || '[]')
    expect(results.length).toBe(1)
  })

  it('getResults returns empty array initially', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('results-count')).toHaveTextContent('0')
  })

  it('restores auth state from localStorage', () => {
    localStorage.setItem('authToken', 'test-token')
    localStorage.setItem('authUser', JSON.stringify({ id: 1, email: 'test@test.com', name: 'Test' }))
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated')
  })

  it('throws error when useAuth used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuth must be used within AuthProvider')
    
    consoleError.mockRestore()
  })

  it('login with invalid credentials throws error', async () => {
    render(
      <AuthProvider>
        <TestLoginError />
      </AuthProvider>
    )
    
    await act(async () => {
      fireEvent.click(screen.getByText('Bad Login'))
    })
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Неверные данные для входа')
    })
  })

  it('register with invalid data throws error', async () => {
    render(
      <AuthProvider>
        <TestRegisterError />
      </AuthProvider>
    )
    
    await act(async () => {
      fireEvent.click(screen.getByText('Bad Register'))
    })
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Заполните все поля корректно')
    })
  })
})
