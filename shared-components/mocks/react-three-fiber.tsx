import React, { useLayoutEffect } from 'react'

export type FrameCallback = () => void

export interface Rotation {
  x: number
  y: number
}

export interface Object3DLike {
  rotation: Rotation
  position: { x: number; y: number; z: number }
}

export interface R3FMockState {
  frameCallbacks: FrameCallback[]
  objects: Object3DLike[]
  refObjects: Array<React.RefObject<Object3DLike | null>>
}

export const __r3f: R3FMockState = {
  frameCallbacks: [],
  objects: [],
  refObjects: []
}

const makeObject3D = (): Object3DLike => ({
  rotation: { x: 0, y: 0 },
  position: { x: 0, y: 0, z: 0 }
})

const isRefObject = (v: unknown): v is React.RefObject<Object3DLike | null> => {
  if (typeof v !== 'object' || v === null) return false
  return 'current' in v
}

const getChildren = (el: React.ReactElement): React.ReactNode => {
  const props = el.props as { children?: React.ReactNode }
  return props.children
}

const getMaybeRef = (el: React.ReactElement): unknown => {
  const withRef = el as unknown as { ref?: unknown }
  return withRef.ref
}

const attachRefs = (node: React.ReactNode): void => {
  if (node === null || node === undefined || typeof node === 'boolean') return

  if (Array.isArray(node)) {
    node.forEach(attachRefs)
    return
  }

  if (!React.isValidElement(node)) return

  const el = node

  if (el.type === React.Fragment) {
    attachRefs(getChildren(el))
    return
  }

  const maybeRef = getMaybeRef(el)
  if (isRefObject(maybeRef)) {
    const obj = makeObject3D()
    maybeRef.current = obj
    __r3f.objects.push(obj)
    __r3f.refObjects.push(maybeRef)
  }

  attachRefs(getChildren(el))
}

export const Canvas = (props: {
  children?: React.ReactNode
  'data-testid'?: string
}) => {
  useLayoutEffect(() => {
    attachRefs(props.children)
  }, [props.children])

  // ВАЖНО: children не рендерим → никаких <group>/<mesh> в DOM → нет console.error
  return <div data-testid={props['data-testid'] ?? 'canvas'} />
}

export const useFrame = (cb: FrameCallback) => {
  __r3f.frameCallbacks.push(cb)
}
