import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text3D, Center, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function SkillsOrbit({ skills, radius = 3, speed = 0.5, yOffset = 0 }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * speed
    }
  })
  
  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <Float
            key={skill.name}
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
          >
            <group position={[x, 0, z]}>
              {/* Skill sphere */}
              <Sphere args={[0.3, 32, 32]}>
                <meshStandardMaterial
                  color={skill.color}
                  emissive={skill.color}
                  emissiveIntensity={0.3}
                  metalness={0.8}
                  roughness={0.2}
                />
              </Sphere>
              
              {/* Glow effect */}
              <Sphere args={[0.35, 16, 16]}>
                <meshBasicMaterial
                  color={skill.color}
                  transparent
                  opacity={0.1}
                />
              </Sphere>
            </group>
          </Float>
        )
      })}
      
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial 
          color="#00f5ff" 
          transparent 
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default SkillsOrbit
