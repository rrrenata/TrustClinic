import { act } from 'react'
import type { RefObject, ReactElement, ReactNode } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Capsule } from './Capsule'

type FrameCallback = () => void

interface Rotation {
  x: number
  y: number
}

interface Object3DLike {
  rotation: Rotation
  position: { x: number; y: number; z: number }
}

interface R3FMockState {
  frameCallbacks: FrameCallback[]
  refObjects: Array<RefObject<Object3DLike | null>>
  objects: Object3DLike[]
}

jest.mock('@react-three/fiber', () => {
  const ReactLib = jest.requireActual('react') as typeof import('react')

  const __r3f: R3FMockState = {
    frameCallbacks: [],
    refObjects: [],
    objects: []
  }

  const makeObject3D = (): Object3DLike => ({
    rotation: { x: 0, y: 0 },
    position: { x: 0, y: 0, z: 0 }
  })

  const isRefObject = (v: unknown): v is RefObject<Object3DLike | null> => {
    if (typeof v !== 'object' || v === null) return false
    return 'current' in v
  }

  const getChildren = (el: ReactElement): ReactNode => {
    const props = el.props as { children?: ReactNode }
    return props.children
  }

  const getMaybeRef = (el: ReactElement): unknown => {
    const props = el.props as { ref?: unknown }
    return props.ref
  }

  const walkAndAttachRefs = (node: ReactNode): void => {
    if (node === null || node === undefined || typeof node === 'boolean') return

    if (Array.isArray(node)) {
      node.forEach(walkAndAttachRefs)
      return
    }

    if (!ReactLib.isValidElement(node)) return

    const el = node

    if (el.type === ReactLib.Fragment) {
      walkAndAttachRefs(getChildren(el))
      return
    }

    const maybeRef = getMaybeRef(el)
    if (isRefObject(maybeRef)) {
      const obj = makeObject3D()
      maybeRef.current = obj
      __r3f.refObjects.push(maybeRef)
      __r3f.objects.push(obj)
    }

    walkAndAttachRefs(getChildren(el))
  }

  const mount = (node: ReactNode): void => {
    if (node === null || node === undefined || typeof node === 'boolean') return

    if (Array.isArray(node)) {
      node.forEach(mount)
      return
    }

    if (!ReactLib.isValidElement(node)) return

    const el = node

    if (el.type === ReactLib.Fragment) {
      mount(getChildren(el))
      return
    }

    if (typeof el.type === 'function') {
      const Component = el.type as unknown as (props: unknown) => ReactNode
      const out = Component(el.props)
      walkAndAttachRefs(out)
      mount(out)
      return
    }

    mount(getChildren(el))
  }

  const Canvas = (props: { children?: ReactNode } & Record<string, unknown>) => {
    const { children, ...rest } = props
    mount(children)
    return ReactLib.createElement('div', { 'data-testid': 'canvas', ...rest })
  }

  const useFrame = (cb: FrameCallback) => {
    __r3f.frameCallbacks.push(cb)
  }

  return { Canvas, useFrame, __r3f }
})

const getR3F = (): { __r3f: R3FMockState } => {
  return jest.requireMock('@react-three/fiber') as unknown as { __r3f: R3FMockState }
}

describe('Capsule', () => {
  beforeEach(() => {
    const { __r3f } = getR3F()
    __r3f.frameCallbacks.length = 0
    __r3f.refObjects.length = 0
    __r3f.objects.length = 0

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  it('applies custom className', () => {
    const { container } = render(<Capsule className="custom-class" />)
    const wrapper = container.querySelector('.capsule-container') as HTMLElement | null
    expect(wrapper).toBeTruthy()
    expect(wrapper?.className).toContain('capsule-container')
    expect(wrapper?.className).toContain('custom-class')
  })

  it('applies custom style', () => {
    const { container } = render(<Capsule style={{ backgroundColor: 'red' }} />)
    const wrapper = container.querySelector('.capsule-container') as HTMLElement | null
    expect(wrapper).toBeTruthy()
    expect(wrapper?.style.backgroundColor).toBe('red')
  })

  it('renders Canvas component', () => {
    const { getByTestId } = render(<Capsule />)
    expect(getByTestId('canvas')).toBeTruthy()
  })

  it('registers a frame callback and updates rotation based on scroll position', async () => {
    const { __r3f } = getR3F()
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1000)

    render(<Capsule />)

    expect(__r3f.frameCallbacks.length).toBeGreaterThan(0)
    expect(__r3f.objects.length).toBeGreaterThan(0)

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })

    await act(async () => {
      fireEvent.scroll(window)
    })

    const latestFrameCb = __r3f.frameCallbacks[__r3f.frameCallbacks.length - 1]
    const latestObj = __r3f.objects[__r3f.objects.length - 1]

    latestFrameCb()

    expect(latestObj.rotation.y).toBeCloseTo(0.4, 5)
    expect(latestObj.rotation.x).toBeCloseTo(Math.sin(1) * 0.1, 5)

    nowSpy.mockRestore()
  })

  it('does not crash when the frame callback runs after unmount (ref is null)', () => {
    const { __r3f } = getR3F()

    const { unmount } = render(<Capsule />)
    expect(__r3f.frameCallbacks.length).toBeGreaterThan(0)
    expect(__r3f.refObjects.length).toBeGreaterThan(0)

    const latestFrameCb = __r3f.frameCallbacks[__r3f.frameCallbacks.length - 1]
    const latestRefObj = __r3f.refObjects[__r3f.refObjects.length - 1]

    unmount()
    latestRefObj.current = null

    expect(() => latestFrameCb()).not.toThrow()
  })
})
