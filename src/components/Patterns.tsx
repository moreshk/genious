'use client'
import { FaChartLine, FaCode, FaDna } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

const Patterns = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const patterns = [
    { Icon: FaChartLine, title: "Market Patterns", description: "Understanding market trends and cycles" },
    { Icon: FaCode, title: "Logical Patterns", description: "Recognizing sequences and algorithms" },
    { Icon: FaDna, title: "Natural Patterns", description: "Discovering patterns in nature and science" }
  ]

  return (
    <section id="patterns" className="py-20 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">
          Patterns Are Everywhere
        </h2>
        <div 
          ref={ref}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {patterns.map(({ Icon, title, description }, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 ${
                inView 
                  ? 'scale-100 opacity-100' 
                  : 'scale-90 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col items-center">
                <Icon className="text-6xl mb-6" />
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-200 text-lg">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Patterns 