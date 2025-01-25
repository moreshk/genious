import Hero from '@/components/Hero'
import About from '@/components/About'
import Approach from '@/components/Approach'
import Skills from '@/components/Skills'
import Patterns from '@/components/Patterns'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Approach />
      <Skills />
      <Patterns />
    </main>
  )
}
