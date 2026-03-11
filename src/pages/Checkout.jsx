import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate order placement
    setOrderPlaced(true)
    setTimeout(() => {
      clearCart()
      navigate('/')
    }, 3000)
  }

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">No Items in Cart</h1>
          <Link to="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-smooth">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <motion.div
        className="min-h-screen bg-white flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center max-w-md">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
            animate={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-primary mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </motion.div>
    )
  }

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.08
  const total = subtotal + tax

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-smooth mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.form
            className="lg:col-span-2"
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-primary mb-6">
              Shipping Information
            </motion.h2>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <motion.input
                  variants={itemVariants}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <motion.input
                  variants={itemVariants}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <motion.input
                variants={itemVariants}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />

              <motion.input
                variants={itemVariants}
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />

              <motion.input
                variants={itemVariants}
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />

              <div className="grid grid-cols-3 gap-4">
                <motion.input
                  variants={itemVariants}
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <motion.input
                  variants={itemVariants}
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <motion.input
                  variants={itemVariants}
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-primary mb-6">
              Payment Information
            </motion.h2>

            <div className="space-y-4">
              <motion.input
                variants={itemVariants}
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <motion.input
                  variants={itemVariants}
                  type="text"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <motion.input
                  variants={itemVariants}
                  type="text"
                  name="cardCVC"
                  placeholder="CVC"
                  value={formData.cardCVC}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <motion.button
              variants={itemVariants}
              type="submit"
              className="w-full mt-8 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-smooth"
            >
              Place Order
            </motion.button>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            className="h-fit p-6 bg-secondary rounded-lg"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-accent">${total.toFixed(2)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
