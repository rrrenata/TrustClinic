import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { Group } from 'three'
import './Capsule.css'

function PixelPill() {
  const ref = useRef<Group>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = scrollY * 0.004
      ref.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  return (
    <group ref={ref}>
      {/* Белая нижняя часть */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.69, 8, 1]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <sphereGeometry args={[0.52, 8, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" flatShading />
      </mesh>

      {/* Розовая верхняя часть */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.9, 8, 1]} />
        <meshStandardMaterial color="#ff69b4" flatShading />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.52, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ff69b4" flatShading />
      </mesh>
    </group>
  )
}

interface CapsuleProps {
  size?: number
  style?: React.CSSProperties
}

export function Capsule({ size = 280, style }: CapsuleProps) {
  return (
    <div className="capsule-container" style={{ width: size, height: size, ...style }}>
      <Canvas
        dpr={[0.5, 0.5]}
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 6.0], fov: 36 }}
        style={{ imageRendering: 'pixelated' }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} />
        <directionalLight position={[-3, -4, -5]} intensity={0.3} />
        <PixelPill />
      </Canvas>
    </div>
  )
}
