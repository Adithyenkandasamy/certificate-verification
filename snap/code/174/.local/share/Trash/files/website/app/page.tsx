import Hero from '@/components/Hero'
import About from '@/components/About'
import Portfolio from '@/components/Portfolio'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import ParallaxSection from '@/components/ParallaxSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Contact />
      <ParallaxSection />
    </div>
  )
}