import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMapPin, FiCode, FiCpu, FiLayers, FiDatabase } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { icon: FiCode, label: 'MernStack Development', color: '#3b82f6' },
  { icon: FiCpu, label: 'Artificial Intelligence', color: '#60a5fa' },
  { icon: FiLayers, label: 'UI/UX Design', color: '#3b82f6' },
  { icon: FiDatabase, label: 'Frontend Development', color: '#60a5fa' },
]

function About() {
  const sectionRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      })

      gsap.from('.highlight-item', {
        scrollTrigger: {
          trigger: '.highlights-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-mono mb-4 block tracking-wider">
            01 — About Me
          </span>
          <h2 className="section-title gradient-text">
            Who I Am
          </h2>
          <p className="section-subtitle">
            A passionate developer crafting digital experiences
          </p>
        </div>

        {/* Main Content Grid */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - About Text */}
          <div className="about-card">
            <div className="glass rounded-2xl p-8 border border-blue-500/20">
              {/* Profile Badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-2xl font-bold text-white font-display shadow-lg shadow-blue-500/30">
                  A
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Aishwariya D</h3>
                  <p className="text-blue-400 font-medium">Software Developer</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-white/80 leading-relaxed mb-6 text-base">
                I am a software development enthusiast with a strong passion for MernStack Development, artificial intelligence, 
                web development, UI/UX design and Devops. I enjoy building modern, 
                user-centric applications that combine clean design with intelligent functionality.
              </p>
              
              <p className="text-white/80 leading-relaxed mb-6 text-base">
                Driven by curiosity and continuous learning, I aim to create impactful digital 
                solutions by blending innovation, creativity, and code.
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 text-white/70">
                <FiMapPin className="text-blue-400" />
                <span>Kanchipuram, Tamil Nadu</span>
              </div>

              {/* Experience Badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-300 text-sm font-medium">
                  Fresher — Ready for Opportunities
                </span>
              </div>
            </div>
          </div>

          {/* Right - Highlights */}
          <div className="about-card">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Areas of Interest
            </h3>
            
            <div className="highlights-grid grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, label, color }, index) => (
                <div
                  key={label}
                  className="highlight-item glass rounded-xl p-6 hover:scale-105 transition-transform duration-300 group cursor-pointer border border-white/10 hover:border-blue-500/40"
                  style={{ '--highlight-color': color }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 bg-blue-500/10"
                  >
                    <Icon size={24} className="text-blue-400" />
                  </div>
                  <h4 className="text-white font-medium group-hover:text-blue-300 transition-colors">
                    {label}
                  </h4>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: '10+', label: 'Projects' },
                { value: '7+', label: 'Technologies' },
                { value: '∞', label: 'Curiosity' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center p-4 glass rounded-xl border border-blue-500/20">
                  <div className="text-3xl font-bold text-blue-400 font-display">
                    {value}
                  </div>
                  <div className="text-white/60 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}

export default About
