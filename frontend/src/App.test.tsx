import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    )
    expect(container).toBeInTheDocument()
  })
})
