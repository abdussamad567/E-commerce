import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useWishlist } from '../context/WishlistContext'

const Wishlist = () => {
  const { wishlist, clearWishlist } = useWishlist()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Heart size={64} className="mx-auto text-gray-400" />
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-primary mb-4"
            >
              Your Wishlist is Empty
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 mb-8"
            >
              Save your favorite items and they'll appear here.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/women"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-smooth group"
              >
                <span>Explore Products</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-smooth" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <motion.h1
            className="text-4xl font-bold text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            My Wishlist
          </motion.h1>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => clearWishlist()}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-smooth"
          >
            Clear Wishlist
          </motion.button>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {wishlist.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Wishlist
