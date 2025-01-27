'use client'
import { FaLightbulb, FaFlask, FaProjectDiagram } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

const Approach = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const approaches = [
    { Icon: FaLightbulb, title: "Pattern Recognition", description: "We teach children to identify and understand patterns that repeat across different domains." },
    { Icon: FaFlask, title: "Application First", description: "We start with real-world applications before diving into theoretical concepts." },
    { Icon: FaProjectDiagram, title: "Critical Thinking", description: "Develop a deeper understanding of concepts by seeing them in action first and then connect the dots to apply them in a different context." }
  ]

  return (
    <section id="approach" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Our Approach
        </h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {approaches.map(({ Icon, title, description }, index) => (
            <div 
              key={index}
              className={`text-center transform transition-all duration-700 ${
                inView 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col items-center">
                <Icon className="text-6xl text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
                <p className="text-gray-700 text-lg">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Approach 