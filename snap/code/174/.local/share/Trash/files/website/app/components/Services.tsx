'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Mountain, Camera, Calendar } from 'lucide-react'

const services = [
  { icon: Users, title: 'Weddings', description: 'Capture your special day with elegance and style.' },
  { icon: Mountain, title: 'Landscapes', description: 'Breathtaking views of nature\'s finest moments.' },
  { icon: Camera, title: 'Portraits', description: 'Professional headshots and personal portraits.' },
  { icon: Calendar, title: 'Events', description: 'Document your important occasions with flair.' },
]

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-20 px-4 md:px-0"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <service.icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}