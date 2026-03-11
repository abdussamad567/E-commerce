import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product, 1)
    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 2000)
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`}>
        <div className="relative h-44 md:h-56 bg-secondary overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-3">
        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-primary hover:text-accent transition-smooth text-base line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mt-2 space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-3 mb-4 flex items-center justify-between">
          <span className="text-lg md:text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition-smooth flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`px-3 py-2 rounded-lg border-2 transition-smooth ${
              inWishlist
                ? 'bg-accent border-accent text-primary'
                : 'border-gray-300 text-gray-400 hover:border-accent'
            }`}
          >
            <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Added Message */}
        {showAddedMessage && (
          <motion.div
            className="mt-2 text-center text-sm text-green-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Added to cart!
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default ProductCard
