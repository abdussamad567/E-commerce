import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Truck, RotateCcw, Shield, ChevronLeft } from 'lucide-react'
import { getProductById, getProductsByCategory, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(parseInt(id))
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-smooth"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity)
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

  const images = [product.image, product.image, product.image]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-smooth mb-8"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Product Details */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Images */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-col gap-4">
              <div className="h-96 md:h-full bg-secondary rounded-lg overflow-hidden">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-smooth ${
                      selectedImage === i ? 'border-accent' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h1 className="text-4xl font-bold text-primary mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Truck, label: 'Free Shipping' },
                { icon: RotateCcw, label: '30-Day Returns' },
                { icon: Shield, label: 'Secure' }
              ].map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                    <Icon size={24} className="text-accent mb-2" />
                    <p className="text-sm font-medium text-center">{feature.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary mb-2">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-secondary transition-smooth"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-secondary transition-smooth"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-smooth flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`px-6 py-3 rounded-lg border-2 font-semibold transition-smooth flex items-center justify-center ${
                  inWishlist
                    ? 'bg-accent border-accent text-primary'
                    : 'border-gray-300 text-gray-400 hover:border-accent'
                }`}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Added Message */}
            {showAddedMessage && (
              <motion.div
                className="mt-4 text-center text-sm text-green-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Added {quantity} item(s) to cart!
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            className="mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-primary mb-8"
            >
              Related Products
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {relatedProducts.map((relatedProduct) => (
                <motion.div key={relatedProduct.id} variants={itemVariants}>
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ProductDetails
