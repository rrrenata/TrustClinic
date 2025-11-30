import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Input } from 'shared-components'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(name, email, password)
      navigate('/diagnosis')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pixel-font">
      <div className="pixel-card w-full max-w-md p-8">
        <h1 className="text-xl text-center pixel-accent mb-8">Регистрация</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Имя"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Минимум 6 символов"
            required
          />
          {error && (
            <p className="pixel-accent text-xs text-center">{error}</p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="pixel-btn w-full"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </form>
        <p className="text-xs text-center mt-6 pixel-accent-blue opacity-70">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="pixel-accent hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
