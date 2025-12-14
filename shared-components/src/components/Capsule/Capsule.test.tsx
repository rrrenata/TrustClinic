import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { Capsule } from './Capsule'

const frameCallbacks: Array<() => void> = []
const useFrameMock = jest.fn((cb: () => void) => {
  frameCallbacks.push(cb)
})

jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas">{children}</div>
  ),
  useFrame: (cb: () => void) => useFrameMock(cb)
}))

describe('Capsule', () => {
  beforeEach(() => {
    frameCallbacks.length = 0
    useFrameMock.mockClear()
  })

  it('renders with default size', () => {
    const { container } = render(<Capsule />)

    const wrapper = container.querySelector('.capsule-container') as HTMLElement
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.style.width).toBe('280px')
    expect(wrapper.style.height).toBe('280px')
  })

  it('applies custom size', () => {
    const { container } = render(<Capsule size={400} />)

    const wrapper = container.querySelector('.capsule-container') as HTMLElement
    expect(wrapper.style.width).toBe('400px')
    expect(wrapper.style.height).toBe('400px')
  })

  it('applies custom style', () => {
    const { container } = render(<Capsule style={{ backgroundColor: 'red' }} />)

    const wrapper = container.querySelector('.capsule-container') as HTMLElement
    expect(wrapper.style.backgroundColor).toBe('red')
  })

  it('renders Canvas component', () => {
    const { getByTestId } = render(<Capsule />)
    expect(getByTestId('canvas')).toBeInTheDocument()
  })

  it('updates pill rotation in the frame callback based on scroll position', () => {
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1000)
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true
    })

    const { container } = render(<Capsule />)
    window.scrollY = 100
    fireEvent.scroll(window)

    expect(frameCallbacks.length).toBeGreaterThan(0)
    const latestFrameCb = frameCallbacks[frameCallbacks.length - 1]

    const groupEl = container.querySelector('group') as unknown as Element & {
      rotation: { x: number; y: number }
    }
    groupEl.rotation = { x: 0, y: 0 }

    latestFrameCb()

    expect(groupEl.rotation.y).toBeCloseTo(0.4, 5)
    expect(groupEl.rotation.x).toBeCloseTo(Math.sin(1) * 0.1, 5)

    nowSpy.mockRestore()
  })

  it('does not crash when the frame callback runs after unmount (ref is null)', () => {
    const { unmount } = render(<Capsule />)
    expect(frameCallbacks.length).toBeGreaterThan(0)

    const latestFrameCb = frameCallbacks[frameCallbacks.length - 1]

    unmount()

    expect(() => latestFrameCb()).not.toThrow()
  })
})
