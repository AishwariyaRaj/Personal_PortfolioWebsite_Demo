import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi'

function Hero() {
  const containerRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ delay: 0.5 })
      
      tl.from(titleRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from(ctaRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.3')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      {/* Content */}
      <div className="text-center max-w-4xl mx-auto">
        {/* Greeting */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/40 bg-blue-500/10 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm text-blue-300 font-medium">Available for opportunities</span>
        </div>

        {/* Main Title */}
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6 overflow-hidden">
          <span className="block text-white drop-shadow-lg">Hi, I'm</span>
          <span className="block gradient-text drop-shadow-lg">Aishwariya D</span>
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-8">
          <h2 className="text-xl md:text-2xl text-white mb-4 font-medium tracking-wide">
            <span className="text-blue-400 font-semibold">Software Developer</span>
            <span className="text-white/60"> | </span>
            <span className="text-white">Junior MernStack Developer</span>
            <span className="text-white/60"> | </span>
            <span className="text-blue-300">AI Enthusiast</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed text-lg">
            Building modern, user-centric applications that combine clean design 
            with intelligent functionality. Driven by curiosity and innovation.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary flex items-center gap-2"
          >
            View My Work
            <FiArrowDown className="animate-bounce" />
          </a>
          
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-outline"
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <a
            href="https://github.com/AishwariyaRaj"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white shadow-lg shadow-gray-900/50 hover:shadow-gray-500/30 hover:scale-110 transition-all duration-300 border border-white/20 hover:border-white/40"
            aria-label="GitHub"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FiGithub size={24} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -bottom-8 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aishwariya-dharmaraj/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 border border-blue-400/30 hover:border-blue-400/60"
            aria-label="LinkedIn"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FiLinkedin size={24} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -bottom-8 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={scrollToAbout}
      >
        <span className="text-xs text-white/60 group-hover:text-white transition-colors">
          Scroll to explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-white/40 group-hover:border-white transition-colors flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 group-hover:bg-white rounded-full animate-bounce transition-colors" />
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}

export default Hero
