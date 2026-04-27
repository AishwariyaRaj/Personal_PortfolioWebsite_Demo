import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const GITHUB_USERNAME = 'AishwariyaRaj'
const FALLBACK_PROJECT_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'

const PROJECT_IMAGE_URLS = {
  learnsphere: 'https://images.unsplash.com/photo-1608600712992-03e5325d94c8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGUlMjBsZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D',
  grocerystore: 'https://images.unsplash.com/opengraph/1x1.png?mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1542838132-92c53300491e%3Fcrop%3Dfaces%252Cedges%26h%3D630%26w%3D1200%26blend%3D000000%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark-w%3D750%26mark-align%3Dmiddle%252Ccenter%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fw%253D750%2526h%253D84%2526txt%253Dgrocery%252Bstore%2526txt-pad%253D80%2526txt-align%253Dmiddle%25252Cleft%2526txt-color%253D%252523000000%2526txt-size%253D40%2526txt-width%253D660%2526txt-clip%253Dellipsis%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8M3x8Z3JvY2VyeSUyMHN0b3JlfGVufDB8fHx8MTc3NzEwOTA5NXww%26ixlib%3Drb-4.1.0&blend-w=1&auto=format&fit=crop&q=60',
  globetrotter: 'https://img.freepik.com/premium-photo/seychelles-island-tour-with-parallax-scrolling-effect-tropic-travel-website-layout-idea-designs_1020495-626951.jpg',
  nexspark: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/482370682/original/033a97b6e200e346122651d1bc7f19ca6ad5f239/create-car-rental-website-booking-system-car-booking-vehicle-rental-website.png',
  objectsegmentationlivertumor: 'https://cdn.prod.website-files.com/614c82ed388d53640613982e/64aeb4a43a30bf1bbefd523f_types%20of%20image%20segmentation.webp',
  objectdetectiondronesystem: 'https://storage.googleapis.com/lablab-static-eu/images/submissions/cly7fd2pt000p356ubcnfq4nd/cly047tyq0011356uz2r09y4s_imageLink_bl2njt0p05.jpg',
  edutravelexplorer: 'https://i.ibb.co/0VWS1wkJ/Screenshot-2217.png',
  electrostore: 'https://market-resized.envatousercontent.com/previews/files/403495460/preview.jpg?w=590&h=300&cf_fit=crop&crop=top&format=auto&q=85&s=2ff094f719cedc9bf334360743ddd704576f52396c24ae6a313a77fd8df9102e',
  instagraffiti: 'https://elfsight.com/wp-content/uploads/2024/12/blog-how-to-embed-instagram-photos-on-website-colors.jpg',
  deepfakedetector: 'https://cyberriskleaders.com/wp-content/uploads/2025/04/X-PHY-Inc.jpg',
  movierecommendationsystem: 'https://cdn-images-1.medium.com/max/1500/1*leuI7fVkeOrKAIGOOj_T9A.png',
  sentimentanalysisai: 'https://www.intellicus.com/wp-content/uploads/2022/05/AdobeStock_279424238-Custom.jpeg',
  artisanaldapp: 'https://it-dimension.com/wordpress/wp-content/uploads/2025/04/Cover-3-2.png',
  customerorder: 'https://images.template.net/wp-content/uploads/2017/04/17113746/Premium-Online-Food-Ordering-Delivery-Website-Template.jpg'
}

const SHOWCASE_PROJECTS = [
  'LearnSphere',
  'grocery_store',
  'GlobeTrotter',
  'NexSpark',
  'Object_segmentation_liverTumor',
  'Object_Detection_DroneSystem',
  'edu_TravelExplorer',
  'ElectroStore',
  'InstaGraffiti',
  'DeepFake_Detector',
  'movie-recommendation-system',
  'Sentiment-Analysis-AI',
  'Artisanal-Dapp',
  'CustomerOrder'
]

const PROJECT_DETAILS = {
  learnsphere: {
    displayTitle: 'LearnSphere',
    category: 'EdTech Platform'
  },
  grocerystore: {
    displayTitle: 'Grocery Store',
    category: 'E-commerce'
  },
  globetrotter: {
    displayTitle: 'GlobeTrotter',
    category: 'Travel App'
  },
  nexspark: {
    displayTitle: 'NexSpark',
    category: 'Vehicle Rental Platform'
  },
  objectsegmentationlivertumor: {
    displayTitle: 'Object Segmentation Liver Tumor',
    category: 'Medical AI'
  },
  objectdetectiondronesystem: {
    displayTitle: 'Object Detection Drone System',
    category: 'Computer Vision'
  },
  edutravelexplorer: {
    displayTitle: 'Edu TravelExplorer',
    category: 'Educational Travel'
  },
  electrostore: {
    displayTitle: 'ElectroStore - Electronics E-commerce Platform',
    category: 'E-commerce'
  },
  instagraffiti: {
    displayTitle: 'InstaGraffiti',
    category: 'Creative Social App'
  },
  deepfakedetector: {
    displayTitle: 'DeepFake Detector',
    category: 'AI/ML Security'
  },
  movierecommendationsystem: {
    displayTitle: 'Movie Recommendation System',
    category: 'Recommendation Engine'
  },
  sentimentanalysisai: {
    displayTitle: 'Sentiment Analysis AI',
    category: 'NLP'
  },
  artisanaldapp: {
    displayTitle: 'Artisanal Dapp',
    category: 'Blockchain'
  },
  customerorder: {
    displayTitle: 'CustomerOrder',
    category: 'Order Management'
  }
}

const normalizeProjectKey = (name = '') => name.toLowerCase().replace(/[^a-z0-9]/g, '')

const showcaseOrder = SHOWCASE_PROJECTS.map(normalizeProjectKey)
const showcaseSet = new Set(showcaseOrder)
const showcaseOrderMap = showcaseOrder.reduce((acc, item, index) => {
  acc[item] = index
  return acc
}, {})

const languageIcons = {
  JavaScript: '⚡',
  TypeScript: '🔷',
  Java: '☕',
  Python: '🐍',
  Solidity: '⛓️',
  HTML: '🌐',
  CSS: '🎨',
  default: '🚀'
}

const languageColors = {
  JavaScript: '#3b82f6',
  TypeScript: '#60a5fa',
  Java: '#93c5fd',
  Python: '#3b82f6',
  Solidity: '#60a5fa',
  HTML: '#93c5fd',
  CSS: '#60a5fa',
  default: '#3b82f6'
}

const formatRepoName = (repoName) => repoName
  .replace(/[-_]/g, ' ')
  .replace(/\b\w/g, (char) => char.toUpperCase())

const normalizeUrl = (url) => {
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://${url}`
}

const mapRepoToProject = (repo) => {
  const language = repo.language || 'default'
  const techStack = [...new Set([repo.language, ...(repo.topics || [])].filter(Boolean))]
  const repoKey = normalizeProjectKey(repo.name)
  const customDetails = PROJECT_DETAILS[repoKey] || {}

  return {
    id: repo.id,
    title: customDetails.displayTitle || formatRepoName(repo.name),
    shortDescription: repo.description || 'A GitHub project from my portfolio.',
    fullDescription: repo.description || 'This project is available on GitHub. Open the repository to explore the source code and implementation details.',
    techStack,
    github: repo.html_url,
    live: normalizeUrl(repo.homepage),
    color: languageColors[language] || languageColors.default,
    icon: languageIcons[language] || languageIcons.default,
    category: customDetails.category || repo.topics?.[0] || repo.language || 'Project',
    image: PROJECT_IMAGE_URLS[repoKey] || FALLBACK_PROJECT_IMAGE,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    repoKey
  }
}

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
      
      {/* Project image */}
      <div className="mb-4 rounded-xl overflow-hidden border border-blue-500/20 bg-black/50">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_PROJECT_IMAGE
          }}
        />
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
  const modalRef = useRef();

  useEffect(() => {
    gsap.from(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: 'power3.out',
    });
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6"
      onClick={handleClose}
      style={{ background: 'rgba(10, 20, 40, 0.95)' }}
    >
      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative flex flex-col items-center justify-center w-full h-full md:max-w-3xl md:max-h-[90vh] md:rounded-3xl bg-black/90 p-0 md:p-8 overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-500/20 transition-colors z-10"
        >
          <FiX size={20} />
        </button>

        {/* Project Image (fullscreen in modal) */}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain bg-black rounded-none md:rounded-xl shadow-lg"
            style={{ maxHeight: '80vh', background: '#222' }}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_PROJECT_IMAGE
            }}
          />
        )}

        {/* Title and Category (overlayed or below image) */}
        <div className="w-full flex flex-col items-center mt-4 mb-6">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
            style={{ backgroundColor: `${project.color}20`, color: project.color }}
          >
            {project.category}
          </span>
          <h2 className="text-3xl font-bold text-white font-display text-center">
            {project.title}
          </h2>
        </div>

        {/* Description */}
        <p className="text-white/80 leading-relaxed mb-6 text-center max-w-2xl">
          {project.fullDescription}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3 text-center">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: `${project.color}15`, color: project.color }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-6 border-t border-white/10 w-full justify-center">
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
  );
}

function Projects() {
  const sectionRef = useRef()
  const [selectedProject, setSelectedProject] = useState(null)
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const fetchAllRepos = async () => {
      try {
        setIsLoading(true)
        setFetchError('')

        let page = 1
        let hasMore = true
        const allRepos = []

        while (hasMore) {
          const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated&direction=desc`,
            {
              headers: {
                Accept: 'application/vnd.github+json'
              }
            }
          )

          if (!response.ok) {
            throw new Error('Unable to fetch repositories from GitHub right now.')
          }

          const repos = await response.json()
          allRepos.push(...repos)

          hasMore = repos.length === 100
          page += 1
        }

        const mappedProjects = allRepos
          .filter((repo) => !repo.archived)
          .filter((repo) => showcaseSet.has(normalizeProjectKey(repo.name)))
          .sort((a, b) => {
            const aOrder = showcaseOrderMap[normalizeProjectKey(a.name)] ?? Number.MAX_SAFE_INTEGER
            const bOrder = showcaseOrderMap[normalizeProjectKey(b.name)] ?? Number.MAX_SAFE_INTEGER
            return aOrder - bOrder
          })
          .map(mapRepoToProject)

        setProjects(mappedProjects)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setFetchError('Could not load GitHub repositories. Please refresh and try again.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllRepos()

    return undefined
  }, [])

  useEffect(() => {
    if (!projects.length) return undefined

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
  }, [projects])

  const marqueeProjects = projects.length > 1 ? [...projects, ...projects] : projects
  const marqueeDuration = `${Math.max(40, projects.length * 7)}s`

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
            Curated GitHub showcase with automatic scrolling
          </p>
        </div>

        {isLoading && (
          <div className="glass rounded-2xl border border-blue-500/20 p-8 text-center text-white/70">
            Loading repositories from GitHub...
          </div>
        )}

        {fetchError && !isLoading && (
          <div className="glass rounded-2xl border border-red-400/30 p-8 text-center text-red-200">
            {fetchError}
          </div>
        )}

        {!isLoading && !fetchError && projects.length > 0 && (
          <div className="projects-marquee relative overflow-hidden py-2">
            <div
              className="projects-marquee-track flex gap-6 w-max"
              style={{ animationDuration: marqueeDuration }}
            >
              {marqueeProjects.map((project, index) => (
                <div key={`${project.id}-${index}`} className="w-[86vw] md:w-[380px] shrink-0">
                  <ProjectCard
                    project={project}
                    index={index}
                    onClick={setSelectedProject}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && !fetchError && projects.length === 0 && (
          <div className="glass rounded-2xl border border-blue-500/20 p-8 text-center text-white/70">
            No repositories found for this profile yet.
          </div>
        )}

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
