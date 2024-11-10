'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
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
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Photographer in action"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="mb-4">
            At Lens & Light Studio, we believe in capturing the essence of life's most precious moments. Our
            passion for photography drives us to create stunning visuals that tell your unique story.
          </p>
          <p>
            With years of experience and a keen eye for detail, we specialize in weddings, landscapes,
            portraits, and events. Let us help you preserve your memories in the most beautiful way possible.
          </p>
        </div>
      </div>
    </motion.section>
  )
}