import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, ShoppingCart, Heart, Search } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { supabase } from '../lib/supabase'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { getTotalItems } = useCart()
  const { wishlist } = useWishlist()
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    // get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    // listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Kids', path: '/kids' }
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">LuxeStyle</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-primary transition-smooth font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Button */}
            {user ? (
              <Link
                to="/account"
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-smooth"
              >
                My Account
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-smooth"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">

            {/* Search */}
            <div className="hidden sm:flex items-center bg-secondary rounded-full px-4 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent ml-2 outline-none text-sm w-32"
              />
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative group">
              <Heart size={24} className="text-gray-600 group-hover:text-primary transition-smooth" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <ShoppingCart size={24} className="text-gray-600 group-hover:text-primary transition-smooth" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden pb-4"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
          >
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block py-2 text-gray-600 hover:text-primary transition-smooth font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth */}
            {user ? (
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                className="block w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium text-center"
              >
                My Account
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium text-center"
              >
                Sign In
              </Link>
            )}

          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar