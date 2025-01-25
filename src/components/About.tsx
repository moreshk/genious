import { FaBrain, FaRobot, FaChalkboardTeacher } from 'react-icons/fa'

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Preparing for the Future
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { Icon: FaBrain, title: "AI-Driven World", description: "We are at the cusp of transformational change in human civilization due to AI" },
            { Icon: FaRobot, title: "Radical Acceleration", description: "Our children will live in a vastly different world, requiring new adaptations" },
            { Icon: FaChalkboardTeacher, title: "Timeless Skills", description: "Focus on skills that remain valuable regardless of technological change" },
          ].map(({ Icon, title, description }, index) => (
            <div key={index} className="text-center">
              <Icon className="mx-auto text-6xl text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
              <p className="text-gray-700 text-lg">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About 