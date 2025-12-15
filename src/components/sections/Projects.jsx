import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'NexSpark',
    shortDescription: 'Enterprise-grade vehicle rental platform',
    fullDescription: 'An enterprise-grade vehicle rental platform built on a microservices architecture, featuring real-time availability, distributed locking (Redis) for secure bookings, and event-driven notifications.',
    techStack: ['Java 17', 'Spring Boot', 'React.js', 'PostgreSQL', 'Redis', 'Apache Kafka', 'Docker'],
    github: 'https://github.com/AishwariyaRaj/NexSpark',
    live: null,
    color: '#3b82f6',
    icon: '🚗',
    category: 'Full Stack'
  },
  {
    id: 2,
    title: 'DeepFake Detector',
    shortDescription: 'AI-powered deepfake image detection',
    fullDescription: 'A full-stack web application leveraging a CNN-based deep learning model to detect deepfake manipulation in uploaded images with high accuracy.',
    techStack: ['Python', 'React.js', 'Bootstrap', 'Deep Learning', 'CNN', 'Jupyter Notebook'],
    github: 'https://github.com/AishwariyaRaj/DeepFake_Detector',
    live: null,
    color: '#60a5fa',
    icon: '🔍',
    category: 'AI/ML'
  },
  {
    id: 3,
    title: 'Artisanal Dapp',
    shortDescription: 'Decentralized marketplace for artisans',
    fullDescription: 'A decentralized web application (Web3) enabling artisans to list and sell their authentic handcrafted goods directly to buyers on the blockchain.',
    techStack: ['Solidity', 'React.js', 'Web3.js', 'Ethers.js', 'Hardhat', 'IPFS'],
    github: 'https://github.com/AishwariyaRaj/Artisanal-Dapp',
    live: 'https://artisanal-dapp.vercel.app/',
    color: '#93c5fd',
    icon: '🎨',
    category: 'Blockchain'
  }
]

function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef()
  
  const handleMouseMove = (e) => {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    
    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  return (
    <div
      ref={cardRef}
      className="project-card glass rounded-2xl p-6 cursor-pointer group relative overflow-hidden border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 bg-black/60 backdrop-blur-md z-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)`
        }}
      />
      
      {/* Category badge */}
      <div 
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 bg-blue-500/15 text-blue-400 border border-blue-500/30"
      >
        {project.category}
      </div>
      
      {/* Icon */}
      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {project.icon}
      </div>
      
      {/* Title */}
      <h3 
        className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors"
        style={{ transform: 'translateZ(20px)' }}
      >
        {project.title}
      </h3>
      
      {/* Description */}
      <p className="text-white/70 text-sm mb-4 line-clamp-2">
        {project.shortDescription}
      </p>
      
      {/* Tech stack preview */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 3).map(tech => (
          <span 
            key={tech}
            className="px-2 py-1 text-xs rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="px-2 py-1 text-xs rounded-md bg-white/10 text-white/60">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>
      
      {/* Links */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-sm text-white/70 hover:text-blue-400 transition-colors"
        >
          <FiGithub size={16} />
          Code
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm text-white/70 hover:text-blue-400 transition-colors"
          >
            <FiExternalLink size={16} />
            Live Demo
          </a>
        )}
      </div>
      
      {/* Hover border effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: `1px solid rgba(59, 130, 246, 0.4)`
        }}
      />
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const modalRef = useRef()
  
  useEffect(() => {
    gsap.from(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: 'power3.out'
    })
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      ease: 'power3.in',
      onComplete: onClose
    })
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark-300/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className="relative glass rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-500/20 transition-colors"
        >
          <FiX size={20} />
        </button>
        
        {/* Icon & Category */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-6xl">{project.icon}</span>
          <div>
            <span 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
              style={{ 
                backgroundColor: `${project.color}20`,
                color: project.color 
              }}
            >
              {project.category}
            </span>
            <h2 className="text-3xl font-bold text-white font-display">
              {project.title}
            </h2>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-white/80 leading-relaxed mb-6">
          {project.fullDescription}
        </p>
        
        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <span 
                key={tech}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                style={{ 
                  backgroundColor: `${project.color}15`,
                  color: project.color 
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2"
          >
            <FiGithub size={18} />
            View Source
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-white flex items-center gap-2"
            >
              <FiExternalLink size={18} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const sectionRef = useRef()
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state to visible
      gsap.set('.project-card', { opacity: 1, y: 0 })
      
      gsap.fromTo('.project-card', 
        { y: 40, opacity: 0.3 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out'
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-mono mb-4 block tracking-wider">
            02 — Featured Work
          </span>
          <h2 className="section-title gradient-text">
            My Projects
          </h2>
          <p className="section-subtitle">
            A collection of projects that showcase my skills and passion
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/AishwariyaRaj"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <FiGithub size={18} />
            View More on GitHub
          </a>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}

export default Projects
