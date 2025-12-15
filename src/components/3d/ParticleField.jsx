import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField({ count = 300 }) {
  const pointsRef = useRef()
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    // Monochromatic color palette - white to gray
    const colorOptions = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#e0e0e0'),
      new THREE.Color('#c0c0c0'),
      new THREE.Color('#a0a0a0')
    ]
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Spread particles in an elegant sphere distribution
      const radius = 12 + Math.random() * 25
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6 // Flatten slightly
      positions[i3 + 2] = radius * Math.cos(phi)
      
      // Gradient from white (center) to gray (edges)
      const distanceRatio = radius / 37
      const colorIndex = Math.min(Math.floor(distanceRatio * colorOptions.length), colorOptions.length - 1)
      const color = colorOptions[colorIndex]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
      
      // Varied sizes - smaller particles further out
      sizes[i] = (1 - distanceRatio * 0.5) * (Math.random() * 1.5 + 0.5)
    }
    
    return { positions, colors, sizes }
  }, [count])
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (pointsRef.current) {
      // Gentle, professional rotation
      pointsRef.current.rotation.y = time * 0.015
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.05
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default ParticleField
