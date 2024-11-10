'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
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
      className="py-20 bg-gray-100 px-4 md:px-0"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-4">
            <Input type="text" placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <Textarea placeholder="Your Message" rows={4} required />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="#" className="text-gray-600 hover:text-blue-500">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500">
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-500">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}