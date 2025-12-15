import React, { useEffect, useState } from 'react'

function Loader() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="loading-screen">
      <div className="flex flex-col items-center">
        {/* Animated Logo */}
        <div className="relative w-32 h-32 mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-accent-cyan/20 rounded-full animate-pulse" />
          
          {/* Spinning ring */}
          <div 
            className="absolute inset-2 border-4 border-transparent border-t-white border-r-gray-400 rounded-full animate-spin"
            style={{ animationDuration: '1.5s' }}
          />
          
          {/* Inner glow */}
          <div className="absolute inset-4 bg-gradient-to-br from-white/10 to-gray-500/10 rounded-full animate-pulse" />
          
          {/* Center letter */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold gradient-text font-display">A</span>
          </div>
        </div>
        
        {/* Loading text */}
        <h2 className="text-xl font-display text-white mb-4">
          Loading Experience
        </h2>
        
        {/* Progress bar */}
        <div className="w-64 h-1 bg-dark-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-white to-gray-400 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        {/* Progress percentage */}
        <p className="text-slate-400 text-sm mt-2 font-mono">
          {Math.min(Math.round(progress), 100)}%
        </p>
        
        {/* Loading dots */}
        <div className="flex gap-1 mt-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loader
