import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Stars, Environment, Sparkles, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import FloatingGeometry from './FloatingGeometry'
import ParticleField from './ParticleField'

function Scene({ scrollProgress = 0 }) {
  const groupRef = useRef()
  
  // Camera movement based on scroll
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation based on scroll
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.3
      groupRef.current.position.y = -scrollProgress * 1.5
    }
    
    // Smooth mouse follow for camera
    const { mouse } = state
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouse.x * 0.3,
      0.03
    )
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouse.y * 0.2,
      0.03
    )
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      {/* Professional Lighting Setup */}
      <ambientLight intensity={0.2} />
      
      {/* Key Light - Main illumination */}
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1.5} 
        color="#ffffff"
        castShadow
      />
      
      {/* Fill Light - Soften shadows */}
      <directionalLight 
        position={[-5, 3, -5]} 
        intensity={0.4} 
        color="#e0e0e0"
      />
      
      {/* Rim Light - Edge definition */}
      <pointLight position={[0, -5, -10]} intensity={0.3} color="#ffffff" />
      <pointLight position={[-8, 2, 4]} intensity={0.2} color="#ffffff" />
      
      {/* Environment for realistic reflections */}
      <Environment preset="city" />
      
      {/* Stars background - subtle */}
      <Stars 
        radius={80} 
        depth={60} 
        count={3000} 
        factor={3} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* Sparkles - minimal and elegant */}
      <Sparkles 
        count={60}
        scale={12}
        size={1.5}
        speed={0.2}
        opacity={0.4}
        color="#ffffff"
      />
      
      {/* Main scene group */}
      <group ref={groupRef}>
        {/* Floating geometric shapes */}
        <FloatingGeometry 
          position={[0, 0, 0]} 
          scrollProgress={scrollProgress}
        />
        
        {/* Particle field - subtle background */}
        <ParticleField count={300} />
        
        {/* Contact shadows for grounding */}
        <ContactShadows
          position={[0, -4, 0]}
          opacity={0.3}
          scale={20}
          blur={2}
          far={4}
          color="#000000"
        />
      </group>
    </>
  )
}

export default Scene
