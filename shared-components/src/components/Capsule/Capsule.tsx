import React, { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'

function PixelPill({ scrollY }: { scrollY: number }) {
  const ref = useRef<Group>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = scrollY * 0.004
      ref.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[0.45, 0.45, 1.2, 32]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>

      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#ff4d4d" flatShading />
      </mesh>

      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" flatShading />
      </mesh>
    </group>
  )
}

interface CapsuleProps {
  size?: number
  style?: React.CSSProperties
  className?: string
}

export function Capsule({ size = 280, style, className }: CapsuleProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={['capsule-container', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
    >
      <Canvas data-testid="canvas">
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <PixelPill scrollY={scrollY} />
      </Canvas>
    </div>
  )
}
