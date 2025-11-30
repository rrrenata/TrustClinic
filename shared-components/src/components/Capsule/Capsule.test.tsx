import { render } from '@testing-library/react'

// Мокаем @react-three/fiber
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn()
}))

import { Capsule } from './Capsule'

describe('Capsule', () => {
  it('renders without crashing', () => {
    const { container } = render(<Capsule />)
    expect(container).toBeInTheDocument()
  })

  it('has container class', () => {
    render(<Capsule />)
    const container = document.querySelector('.capsule-container')
    expect(container).toBeInTheDocument()
  })

  it('applies default size', () => {
    render(<Capsule />)
    const container = document.querySelector('.capsule-container') as HTMLElement
    expect(container.style.width).toBe('280px')
    expect(container.style.height).toBe('280px')
  })

  it('applies custom size', () => {
    render(<Capsule size={200} />)
    const container = document.querySelector('.capsule-container') as HTMLElement
    expect(container.style.width).toBe('200px')
    expect(container.style.height).toBe('200px')
  })

  it('applies custom style', () => {
    render(<Capsule style={{ backgroundColor: 'red' }} />)
    const container = document.querySelector('.capsule-container') as HTMLElement
    expect(container.style.backgroundColor).toBe('red')
  })

  it('renders canvas', () => {
    const { getByTestId } = render(<Capsule />)
    expect(getByTestId('canvas')).toBeInTheDocument()
  })
})
