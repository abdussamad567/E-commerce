import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (cart.length === 0) {
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
              <ShoppingBag size={64} className="mx-auto text-gray-400" />
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-primary mb-4"
            >
              Your Cart is Empty
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 mb-8"
            >
              Looks like you haven't added anything to your cart yet.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/men"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-smooth group"
              >
                <span>Start Shopping</span>
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
        <motion.h1
          className="text-4xl font-bold text-primary mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cart.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="flex gap-4 p-6 bg-secondary rounded-lg mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-lg font-semibold text-primary hover:text-accent transition-smooth"
                  >
                    {item.name}
                  </Link>
                  <p className="text-2xl font-bold text-accent my-2">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-300 rounded-lg transition-smooth"
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 text-center border border-gray-300 rounded-lg py-1"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-300 rounded-lg transition-smooth"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition-smooth p-2"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="h-fit p-6 bg-secondary rounded-lg"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-xl font-bold">
              <span>Total</span>
              <span className="text-accent">
                ${(getTotalPrice() * 1.08).toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="w-full block text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-smooth mb-3"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={() => clearCart()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-smooth"
            >
              Clear Cart
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Cart
