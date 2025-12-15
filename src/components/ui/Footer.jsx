import React from 'react'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { 
      icon: FiGithub, 
      href: 'https://github.com/AishwariyaRaj', 
      label: 'GitHub' 
    },
    { 
      icon: FiLinkedin, 
      href: 'https://www.linkedin.com/in/aishwariya-dharmaraj/', 
      label: 'LinkedIn' 
    },
    { 
      icon: FiMail, 
      href: 'mailto:aishwariya229@gmail.com', 
      label: 'Email' 
    },
  ]

  return (
    <footer className="relative py-12 border-t border-blue-500/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold font-display text-base">A</span>
              </div>
              <span className="text-white font-display font-semibold text-lg">
                Aishwariya D
              </span>
            </div>
            <p className="text-white/80 text-sm flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full border border-blue-500/20">
              Made with <FiHeart className="text-red-400 animate-pulse" size={16} /> by <span className="text-blue-400 font-semibold">Aish</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => {
              const isGithub = label === 'GitHub'
              const isLinkedin = label === 'LinkedIn'
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isGithub 
                      ? 'bg-gradient-to-br from-gray-600 to-gray-800 text-white shadow-lg shadow-gray-900/30 hover:shadow-gray-500/30 border border-white/20 hover:border-white/40'
                      : isLinkedin
                        ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 border border-blue-400/30 hover:border-blue-400/60'
                        : 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 border border-red-400/30 hover:border-red-400/60'
                  }`}
                >
                  <Icon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="absolute -bottom-6 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium whitespace-nowrap">{label}</span>
                </a>
              )
            })}
          </div>

          {/* Copyright */}
          <p className="text-white/50 text-sm">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </footer>
  )
}

export default Footer
