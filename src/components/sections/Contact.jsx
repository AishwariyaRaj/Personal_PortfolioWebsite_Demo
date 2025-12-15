import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiMapPin, FiArrowUpRight, FiAlertCircle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'

gsap.registerPlugin(ScrollTrigger)

// EmailJS Configuration - Replace with your credentials from https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_ij4n1mq' // Create a service in EmailJS dashboard
const EMAILJS_TEMPLATE_ID = 'template_8jnrsgf' // Create a template in EmailJS dashboard  
const EMAILJS_PUBLIC_KEY = 'BNnI-FJCO5vrMcgic' // Get from EmailJS dashboard > Account > API Keys

const contactLinks = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'aishwariya229@gmail.com',
    href: 'mailto:aishwariya229@gmail.com',
    color: '#3b82f6'
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'AishwariyaRaj',
    href: 'https://github.com/AishwariyaRaj',
    color: '#60a5fa'
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'aishwariya-dharmaraj',
    href: 'https://www.linkedin.com/in/aishwariya-dharmaraj/',
    color: '#3b82f6'
  },
]

function Contact() {
  const sectionRef = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      // Send email using EmailJS
      // Variables match EmailJS template: {{title}}, {{to_name}}, {{name}}, {{email}}, {{message}}, {{reply_to}}
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: `New message from ${formData.name}`,
          to_name: 'Aishwariya',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      
      console.log('Email sent successfully:', result)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error('Failed to send email:', err)
      setError('Failed to send message. Please try again or email directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-mono mb-4 block tracking-wider">
            04 — Get In Touch
          </span>
          <h2 className="section-title gradient-text">
            Let's Connect
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-card">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Reach Out
            </h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, 
              or opportunities to be part of your vision. Feel free to reach 
              out through any of the channels below.
            </p>

            {/* Contact Links */}
            <div className="space-y-4 mb-8">
              {contactLinks.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 glass rounded-xl group hover:scale-[1.02] transition-all duration-300 border border-blue-500/20 hover:border-blue-500/50"
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-blue-500/15"
                  >
                    <Icon size={22} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-sm">{label}</p>
                    <p className="text-white font-medium group-hover:text-blue-300 transition-colors">
                      {value}
                    </p>
                  </div>
                  <FiArrowUpRight 
                    className="text-white/50 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                    size={20} 
                  />
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-white/70">
              <FiMapPin className="text-blue-400" size={18} />
              <span>Kanchipuram, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-card">
            <div className="glass rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-xl font-semibold text-white mb-6">
                Send a Message
              </h3>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <FiSend className="text-blue-400" size={28} />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-white/60">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or opportunity..."
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400">
                      <FiAlertCircle size={18} />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="glass rounded-2xl p-12 max-w-3xl mx-auto relative overflow-hidden border border-blue-500/30">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/15 to-blue-500/10" />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-white/70 mb-8">
                Let's collaborate and turn your ideas into reality
              </p>
              <a
                href="mailto:aishwariya229@gmail.com"
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiMail size={18} />
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}

export default Contact
