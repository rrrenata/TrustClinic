import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: number
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  saveResult: (data: DiagnosisResult) => void
  getResults: () => DiagnosisResult[]
}

export interface DiagnosisResult {
  id: number
  risk: number
  recommendation: string
  date: string
  answers: string[]
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('authUser')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Имитация API запроса
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: 1,
        email,
        name: email.split('@')[0]
      }
      const mockToken = 'mock-jwt-token-' + Date.now()

      localStorage.setItem('authToken', mockToken)
      localStorage.setItem('authUser', JSON.stringify(mockUser))
      setToken(mockToken)
      setUser(mockUser)
    } else {
      throw new Error('Неверные данные для входа')
    }
  }

  const register = async (name: string, email: string, password: string) => {
    if (name && email && password.length >= 6) {
      const mockUser: User = { id: Date.now(), email, name }
      const mockToken = 'mock-jwt-token-' + Date.now()

      localStorage.setItem('authToken', mockToken)
      localStorage.setItem('authUser', JSON.stringify(mockUser))
      setToken(mockToken)
      setUser(mockUser)
    } else {
      throw new Error('Заполните все поля корректно')
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    setToken(null)
    setUser(null)
  }

  const saveResult = (data: DiagnosisResult) => {
    const results = getResults()
    results.push(data)
    localStorage.setItem('diagnosisResults', JSON.stringify(results))
  }

  const getResults = (): DiagnosisResult[] => {
    const stored = localStorage.getItem('diagnosisResults')
    return stored ? JSON.parse(stored) : []
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!token,
    token,
    loading,
    login,
    register,
    logout,
    saveResult,
    getResults
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
