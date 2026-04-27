import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  FiCode, FiDatabase, FiGitBranch, FiBox,
  FiUsers, FiZap, FiMessageCircle, FiHeart, FiCpu
} from 'react-icons/fi'
import { 
  SiPython, SiDocker, SiPostgresql, SiReact, 
  SiSpring, SiSolidity, SiNodedotjs, SiExpress,
  SiMongodb, SiPostman, SiHtml5, SiCss3, SiJavascript
} from 'react-icons/si'
import { DiJava } from 'react-icons/di'

gsap.registerPlugin(ScrollTrigger)

const technicalSkills = [
  { 
    name: 'Java', 
    icon: DiJava, 
    color: '#3b82f6',
    level: 85 
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    color: '#60a5fa',
    level: 85
  },
  {
    name: 'HTML',
    icon: SiHtml5,
    color: '#3b82f6',
    level: 90
  },
  {
    name: 'CSS',
    icon: SiCss3,
    color: '#60a5fa',
    level: 85
  },
  { 
    name: 'React.js', 
    icon: SiReact, 
    color: '#3b82f6',
    level: 75 
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    color: '#60a5fa',
    level: 80
  },
  {
    name: 'Express.js',
    icon: SiExpress,
    color: '#3b82f6',
    level: 78
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    color: '#60a5fa',
    level: 80
  },
  {
    name: 'Postman',
    icon: SiPostman,
    color: '#3b82f6',
    level: 82
  },
  { 
    name: 'Spring Boot', 
    icon: SiSpring, 
    color: '#60a5fa',
    level: 70 
  },
  
  { 
    name: 'Docker', 
    icon: SiDocker, 
    color: '#3b82f6',
    level: 65 
  },
  { 
    name: 'PostGreSQL', 
    icon: SiPostgresql, 
    color: '#60a5fa',
    level: 70 
  },
  { 
    name: 'Git & GitHub', 
    icon: FiGitBranch, 
    color: '#3b82f6',
    level: 80 
  }
]

const softSkills = [
  { name: 'Problem Solving', icon: FiZap, color: '#3b82f6' },
  { name: 'Creativity', icon: FiHeart, color: '#60a5fa' },
  { name: 'Communication', icon: FiMessageCircle, color: '#3b82f6' },
  { name: 'Teamwork', icon: FiUsers, color: '#60a5fa' },
]

function SkillBar({ skill, index }) {
  const barRef = useRef()
  
  useEffect(() => {
    gsap.from(barRef.current, {
      scrollTrigger: {
        trigger: barRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      width: 0,
      duration: 1,
      delay: index * 0.1,
      ease: 'power3.out'
    })
  }, [index])

  return (
    <div className="skill-item group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-blue-500/15 border border-blue-500/30"
          >
            <skill.icon size={20} className="text-blue-400" />
          </div>
          <span className="text-white font-medium group-hover:text-blue-300 transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="text-blue-400 text-sm font-mono">
          {skill.level}%
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-300"
          style={{ 
            width: `${skill.level}%`,
            background: `linear-gradient(90deg, #3b82f6, #60a5fa)`
          }}
        />
      </div>
    </div>
  )
}

function SoftSkillCard({ skill, index }) {
  return (
    <div 
      className="soft-skill-card glass rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300 border-2 border-blue-500/40 hover:border-blue-500/70 bg-black/60 backdrop-blur-md"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div 
        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-blue-500/20 border-2 border-blue-400/50"
      >
        <skill.icon size={28} className="text-blue-400" />
      </div>
      <h4 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors">
        {skill.name}
      </h4>
    </div>
  )
}

function Skills() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible by default
      gsap.set('.skill-item', { opacity: 1, x: 0 })
      gsap.set('.soft-skill-card', { opacity: 1, y: 0 })
      
      gsap.fromTo('.skill-item', 
        { x: -20, opacity: 0.3 },
        {
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out'
        }
      )

      gsap.fromTo('.soft-skill-card', 
        { y: 20, opacity: 0.3 },
        {
          scrollTrigger: {
            trigger: '.soft-skills-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.5)'
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-mono mb-4 block tracking-wider">
            03 — My Arsenal
          </span>
          <h2 className="section-title gradient-text">
            Skills & Expertise
          </h2>
          <p className="section-subtitle">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center border border-blue-500/30">
                <FiCode className="text-blue-400" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Technical Skills
              </h3>
            </div>
            
            <div className="skills-grid space-y-6">
              {technicalSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Soft Skills & Additional */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center border border-blue-500/30">
                <FiUsers className="text-blue-400" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Soft Skills
              </h3>
            </div>
            
            <div className="soft-skills-grid grid grid-cols-2 gap-4 mb-8">
              {softSkills.map((skill, index) => (
                <SoftSkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>

            {/* Currently Learning */}
            <div className="glass rounded-xl p-6 mt-6 border border-blue-500/20">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Currently Exploring
              </h4>
              <div className="flex flex-wrap gap-2">
                {['MernStack Development', 'Backend Development', 'Frontend Development', 'DevOps'].map(tech => (
                  <span 
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm bg-blue-500/10 text-blue-300 border border-blue-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="glass rounded-xl p-6 mt-4 border border-blue-500/20">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiBox className="text-blue-400" />
                Tools & Platforms
              </h4>
              <div className="flex flex-wrap gap-2">
                {['VS Code', 'IntelliJ IDEA', 'Postman', 'Figma', 'Vercel', 'React','Canva','node','Jypyter Notebook','unity'].map(tool => (
                  <span 
                    key={tool}
                    className="px-3 py-1.5 rounded-lg text-sm bg-blue-500/10 text-blue-300 border border-blue-500/30"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}

export default Skills
