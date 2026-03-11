import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { ChevronDown } from 'lucide-react'

const CategoryPage = ({ category, categoryName, products }) => {
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [minRating, setMinRating] = useState(0)

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1]
      const hasMinRating = product.rating >= minRating
      return inPriceRange && hasMinRating
    })

    // Sort
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating)
      case 'newest':
        return filtered.reverse()
      default:
        return filtered
    }
  }, [products, sortBy, priceRange, minRating])

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-secondary py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-balance">
            {categoryName} Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Discover our exclusive range of {categoryName.toLowerCase()} fashion
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-secondary rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-primary mb-6">Filters</h3>

              {/* Sort */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-semibold text-primary mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </motion.div>

              {/* Price Range */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-semibold text-primary mb-4">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </motion.div>

              {/* Rating Filter */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-semibold text-primary mb-4">
                  Minimum Rating
                </label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                        minRating === rating
                          ? 'bg-accent text-primary'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {rating === 0 ? 'All' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Reset Filters */}
              <motion.button
                variants={itemVariants}
                onClick={() => {
                  setSortBy('featured')
                  setPriceRange([0, 500])
                  setMinRating(0)
                }}
                className="w-full px-4 py-2 border border-gray-300 text-primary font-medium rounded-lg hover:bg-secondary transition-smooth"
              >
                Reset Filters
              </motion.button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Results Count */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 mb-6 font-medium"
            >
              Showing {filteredAndSortedProducts.length} products
            </motion.p>

            {/* Products */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {filteredAndSortedProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredAndSortedProducts.length === 0 && (
              <motion.div
                variants={itemVariants}
                className="text-center py-12"
              >
                <p className="text-gray-600 text-lg">
                  No products match your filters. Try adjusting your selection.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
