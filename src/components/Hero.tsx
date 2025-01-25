'use client'
import { FaAngleDown } from 'react-icons/fa'
import { useEffect, useRef } from 'react'

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    let time = 0
    const particles: Array<{x: number, y: number, speed: number, angle: number}> = []
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 0.5,
        angle: Math.random() * Math.PI * 2
      })
    }

    const animate = () => {
      // Semi-transparent background to create trail effect
      ctx.fillStyle = 'rgba(30, 58, 138, 0.1)' // Darker blue background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += Math.cos(particle.angle) * particle.speed
        particle.y += Math.sin(particle.angle) * particle.speed

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw connections
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

      // Draw grid pattern (fainter)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)' // Reduced opacity
      ctx.lineWidth = 1
      const gridSize = 50
      const offsetX = (time * 10) % gridSize
      const offsetY = (time * 10) % gridSize

      for (let x = -gridSize; x <= canvas.width + gridSize; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x + offsetX, 0)
        ctx.lineTo(x + offsetX, canvas.height)
        ctx.stroke()
      }

      for (let y = -gridSize; y <= canvas.height + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y + offsetY)
        ctx.lineTo(canvas.width, y + offsetY)
        ctx.stroke()
      }

      // Draw mathematical curves
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x += 5) {
        const y = Math.sin(x * 0.02 + time) * 50 + canvas.height / 2
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      time += 0.001
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgb(30, 58, 138), rgb(37, 99, 235))' }} // Darker gradient
      />

      <div className="text-center text-white p-8 z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in drop-shadow-lg">
          Preparing for Tomorrow
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto animate-fade-in-delay drop-shadow-lg font-medium">
          Equipping children with timeless skills for an AI-driven future
        </p>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <FaAngleDown className="text-white text-3xl drop-shadow-lg" />
      </div>
    </div>
  )
}

export default Hero 