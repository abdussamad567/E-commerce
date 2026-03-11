import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'

import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

// Pages
import Home from './pages/Home'
import Men from './pages/Men'
import Women from './pages/Women'
import Kids from './pages/Kids'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Checkout from './pages/Checkout'

// Layouts
import RootLayout from './layouts/RootLayout'

function App() {

  useEffect(() => {
    // Check if user session exists after email confirmation
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        console.log("User logged in:", data.session.user.email)
      }
    })
  }, [])

  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App