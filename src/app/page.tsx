import Hero from '@/components/Hero'
import FuturePreparation from '@/components/FuturePreparation'
import Approach from '@/components/Approach'
import Skills from '@/components/Skills'
import Patterns from '@/components/Patterns'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FuturePreparation />
      <Approach />
      <Skills />
      <Patterns />
    </main>
  )
}
