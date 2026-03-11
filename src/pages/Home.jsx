import { motion } from 'framer-motion'
// import HeroSlider from '../components/HeroSlider'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, RotateCcw, Shield } from 'lucide-react'
import FamilyHeroSection from "../components/FamilyHeroSection"
import HeroBanner from "../components/HeroBanner"

const Home = () => {

  const featuredProducts = products.slice(0, 8)
  const newProducts = products.slice(-6)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="w-full">

      {/* HERO BANNER (NEW FIRST SECTION) */}
      <HeroBanner />

      {/* EXISTING FAMILY HERO SECTION */}
      <FamilyHeroSection />

      {/* FEATURES SECTION */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { icon: Truck, title: 'Free Shipping', description: 'On orders over $100' },
              { icon: RotateCcw, title: '30-Day Returns', description: 'Hassle-free returns' },
              { icon: Shield, title: 'Secure Shopping', description: 'Safe transactions' }
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-center space-x-4 p-6 rounded-lg bg-secondary hover:bg-gray-100 transition-smooth"
                >
                  <div className="flex-shrink-0">
                    <Icon size={32} className="text-accent" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-primary">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
            >
              Featured Collection
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg mb-8"
            >
              Discover our handpicked selection of premium fashion pieces
            </motion.p>

          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >

            <Link
              to="/men"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-smooth group"
            >

              <span>View All Products</span>

              <ArrowRight
                size={20}
                className="group-hover:translate-x-2 transition-smooth"
              />

            </Link>

          </motion.div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
            >
              New Arrivals
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg"
            >
              Fresh styles just added to our collection
            </motion.p>

          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {newProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 md:py-24 bg-primary text-gray-800">
        <motion.div
          className="max-w-2xl mx-auto px-4 sm:px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            Subscribe to Our Newsletter
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-800 mb-8 text-lg"
          >
            Get exclusive offers and updates on our latest collections
          </motion.p>

          <motion.form
            variants={itemVariants}
            className="flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />

            <button
              type="submit"
              className="px-8 py-3 bg-accent text-gray-800 font-semibold rounded-lg hover:bg-opacity-90 transition-smooth"
            >
              Subscribe
            </button>

          </motion.form>

        </motion.div>
      </section>

    </div>
  )
}

export default Home
