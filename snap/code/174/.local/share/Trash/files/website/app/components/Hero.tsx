'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { images } from '@/lib/constants'

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="relative h-screen overflow-hidden"
    >
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Hero image ${index + 1}`}
          layout="fill"
          objectFit="cover"
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Lens & Light Studio</h1>
          <p className="text-xl md:text-2xl">Capturing Moments, Creating Memories</p>
        </div>
      </div>
    </motion.section>
  )
}