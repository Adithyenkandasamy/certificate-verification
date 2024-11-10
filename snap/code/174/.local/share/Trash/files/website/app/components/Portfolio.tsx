'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Lightbox from './Lightbox'
import { portfolioImages } from '@/lib/constants'

export default function Portfolio() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
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
      className="py-20 bg-gray-100"
    >
      <div className="container mx-auto px-4 md:px-0">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setLightboxImage(image.src)}
            >
              <Image
                src={image.src}
                alt={`Portfolio image ${index + 1}`}
                width={800}
                height={600}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {lightboxImage && <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}
    </motion.section>
  )
}