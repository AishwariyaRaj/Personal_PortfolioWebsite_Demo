import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import * as THREE from 'three'
import Scene from './components/3d/Scene'
import Loader from './components/ui/Loader'
import Navbar from './components/ui/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'
import Footer from './components/ui/Footer'
import CustomCursor from './components/ui/CustomCursor'
import { notifyVisitor, resetVisitorNotification, clearVisitorData } from './utils/visitorNotification'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Expose testing utilities to window for console debugging
    window.resetVisitorNotification = resetVisitorNotification
    window.clearVisitorData = clearVisitorData
    console.log('📧 Visitor notification utilities available in console:')
    console.log('  - resetVisitorNotification() - reset localStorage to test again')
    console.log('  - clearVisitorData() - clear all visitor data')
  }, [])

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Send visitor notification email on page load (after loading is complete)
    // This will send an email to you with visitor details
    // It only sends once per visitor (using localStorage)
    if (!isLoading) {
      notifyVisitor().then((sent) => {
        if (sent) {
          console.log('✅ Visitor notification sent successfully!')
        }
      }).catch((error) => {
        console.log('Visitor notification skipped or failed (this is normal):', error)
      })
    }
  }, [isLoading])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {/* Custom Cursor - Desktop Only */}
      <CustomCursor />
      
      {/* Noise Overlay for texture */}
      <div className="noise-overlay" />
      
      {/* 3D Canvas Background */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2
          }}
        >
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="content-overlay">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-white via-gray-400 to-white"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </>
  )
}

export default App
