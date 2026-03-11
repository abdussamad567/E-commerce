import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'Summer Collection',
      subtitle: 'Discover the latest trends',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=600&fit=crop',
      cta: 'Shop Now',
      link: '/women'
    },
    {
      id: 2,
      title: 'Premium Menswear',
      subtitle: 'Elegant and sophisticated',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=600&fit=crop',
      cta: 'Explore',
      link: '/men'
    },
    {
      id: 3,
      title: 'Kids Collection',
      subtitle: 'Comfort meets style',
      image: 'https://images.unsplash.com/photo-1503919545889-56648cce50fa?w=1200&h=600&fit=crop',
      cta: 'Browse',
      link: '/kids'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-96 md:h-screen overflow-hidden bg-secondary">
      <AnimatePresence>
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

              {/* Content */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.link}
                  className="px-8 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-opacity-90 transition-smooth"
                >
                  {slide.cta}
                </Link>
              </motion.div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-smooth"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-smooth"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-smooth ${
              index === currentSlide ? 'w-8 bg-accent' : 'w-3 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
