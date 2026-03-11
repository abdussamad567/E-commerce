import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'   // ✅ ADD THIS

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // ✅ CONNECT SUPABASE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate('/')   // go to homepage after login
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-white flex items-center justify-center px-4">

      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <div className="bg-white rounded-lg shadow-lg p-8">

          <h1 className="text-4xl font-bold text-primary text-center mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-600 text-center mb-8">
            Sign in to your LuxeStyle account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >

              <label className="block text-sm font-semibold text-primary mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
              />

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >

              <label className="block text-sm font-semibold text-primary mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-smooth"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-end"
            >
              <a href="#" className="text-accent hover:underline text-sm font-medium">
                Forgot password?
              </a>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-6"
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>

          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >

            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent font-semibold hover:underline">
                Sign Up
              </Link>
            </p>

          </motion.div>

        </div>

      </motion.div>

    </div>
  )
}

export default Login