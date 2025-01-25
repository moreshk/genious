'use client'
import { FaSquareRootAlt, FaComments, FaMicrophone, FaTools } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const skills = [
    { Icon: FaSquareRootAlt, title: "Mathematics", description: "The foundation of all sciences and logical thinking" },
    { Icon: FaComments, title: "Critical Thinking", description: "Analytical and reasoning capabilities" },
    { Icon: FaMicrophone, title: "Public Speaking", description: "Effective communication and presentation skills" },
    { Icon: FaTools, title: "Hands-on Building", description: "Practical problem-solving and creation" }
  ]

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Key Skills for the Future
        </h2>
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skills.map(({ Icon, title, description }, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-500 transform ${
                inView 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col items-center">
                <Icon className="text-5xl text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-700 text-center">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills 