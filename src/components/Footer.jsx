import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.footer
      className="bg-gray-100 text-black py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">LuxeStyle</h3>
            <p className="text-gray-800 text-sm">
              Premium fashion for everyone. Quality, style, and sustainability in every collection.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><a href="/" className="hover:text-accent transition-smooth">Home</a></li>
              <li><a href="/men" className="hover:text-accent transition-smooth">Men</a></li>
              <li><a href="/women" className="hover:text-accent transition-smooth">Women</a></li>
              <li><a href="/kids" className="hover:text-accent transition-smooth">Kids</a></li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><a href="#" className="hover:text-accent transition-smooth">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">FAQ</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Terms & Conditions</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-800">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@luxestyle.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>New York, USA</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-800 mb-4 md:mb-0">
              © 2024 LuxeStyle. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-800 hover:text-accent transition-smooth">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-800 hover:text-accent transition-smooth">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-800 hover:text-accent transition-smooth">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
