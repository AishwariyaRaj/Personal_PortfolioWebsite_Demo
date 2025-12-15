import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometry({ position, scrollProgress }) {
  const mainRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const cubesRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (mainRef.current) {
      mainRef.current.rotation.x = time * 0.1
      mainRef.current.rotation.y = time * 0.15
    }
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.2
      ring1Ref.current.rotation.z = time * 0.05
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.15
      ring2Ref.current.rotation.z = -time * 0.1
    }
    
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.12
      ring3Ref.current.rotation.y = time * 0.08
    }
    
    if (cubesRef.current) {
      cubesRef.current.rotation.y = time * 0.05
    }
  })

  // Floating cubes around the main geometry
  const floatingCubes = useMemo(() => {
    const cubes = []
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2
      const radius = 3.2 + (i % 3) * 0.6
      const yOffset = Math.sin(angle * 3) * 0.6
      cubes.push({
        position: [
          Math.cos(angle) * radius,
          yOffset,
          Math.sin(angle) * radius
        ],
        scale: 0.06 + (i % 4) * 0.025,
        rotation: [angle, angle * 0.5, 0]
      })
    }
    return cubes
  }, [])

  return (
    <group position={position}>
      {/* Floating cubes constellation */}
      <group ref={cubesRef}>
        {floatingCubes.map((cube, i) => (
          <Float
            key={i}
            speed={0.8 + i * 0.08}
            rotationIntensity={0.2}
            floatIntensity={0.4}
          >
            <RoundedBox 
              position={cube.position} 
              args={[cube.scale * 2, cube.scale * 2, cube.scale * 2]}
              radius={0.015}
              smoothness={4}
              rotation={cube.rotation}
            >
              <meshStandardMaterial
                color={i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#888888' : '#444444'}
                metalness={0.9}
                roughness={0.1}
              />
            </RoundedBox>
          </Float>
        ))}
      </group>

      {/* Ambient floating spheres - subtle depth */}
      {[...Array(30)].map((_, i) => {
        const theta = (i / 30) * Math.PI * 2
        const phi = Math.acos(2 * (i / 30) - 1)
        const r = 4.5 + Math.sin(i * 0.5) * 1.5
        return (
          <Float key={`sphere-${i}`} speed={1.5} floatIntensity={0.2}>
            <Sphere 
              args={[0.015 + (i % 3) * 0.008, 8, 8]} 
              position={[
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta) * 0.4,
                r * Math.cos(phi)
              ]}
            >
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.3 + (i % 5) * 0.1} 
              />
            </Sphere>
          </Float>
        )
      })}

      {/* Subtle grid floor for depth perception */}
      <group position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <planeGeometry args={[30, 30, 30, 30]} />
          <meshBasicMaterial 
            color="#ffffff" 
            wireframe 
            transparent 
            opacity={0.03}
          />
        </mesh>
      </group>
    </group>
  )
}

export default FloatingGeometry
