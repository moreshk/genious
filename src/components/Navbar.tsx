'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className={`text-4xl font-bold transition-colors duration-300 ${
                scrolled ? 'text-blue-600' : 'text-white'
              }`} 
              style={{ fontFamily: 'Product Sans, sans-serif' }}
            >
              Genious
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {[
                ['About', '#about'],
                ['Our Approach', '#approach'],
                ['Key Skills', '#skills'],
                ['Patterns', '#patterns']
              ].map(([title, url]) => (
                <Link 
                  key={url}
                  href={url} 
                  className={`px-3 py-2 transition-colors duration-300 ${
                    scrolled 
                      ? 'text-gray-800 hover:text-blue-600' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 