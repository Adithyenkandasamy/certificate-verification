'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

export default function ParallaxSection() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="h-96 overflow-hidden relative">
      <div ref={parallaxRef} className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Parallax background"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  )
}