'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // let time = 0
    const particles: Array<{x: number, y: number, speed: number, angle: number}> = []
    
    if (!isMobile) {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 0.5 + Math.random() * 0.5,
          angle: Math.random() * Math.PI * 2
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (!isMobile) {
        ctx.fillStyle = 'rgba(30, 58, 138, 0.1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle, i) => {
          particle.x += Math.cos(particle.angle) * particle.speed
          particle.y += Math.sin(particle.angle) * particle.speed

          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
          ctx.lineWidth = 1
          particles.forEach((otherParticle, j) => {
            if (i === j) return
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 150) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
            }
          })
        })

        requestAnimationFrame(animate)
      }
    }

    if (!isMobile) {
      animate()
    }

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [isMobile])

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('future-preparation')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(37, 99, 235))' }}
      />

      <div className="text-center text-white p-8 z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in drop-shadow-lg">
          Preparing for Tomorrow
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto animate-fade-in-delay drop-shadow-lg font-medium">
          Equipping children with timeless skills for an AI-driven future
        </p>
      </div>
      
      <button 
        onClick={scrollToNextSection}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer focus:outline-none"
        aria-label="Scroll to next section"
      >
        <FaAngleDown className="text-white text-3xl drop-shadow-lg" />
      </button>
    </div>
  )
}

export default Hero 