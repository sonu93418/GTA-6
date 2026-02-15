import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './WelcomeScreen.css'

const WelcomeScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const handleDismiss = () => {
      setShow(false)
      setTimeout(() => {
        onComplete()
      }, 1000)
    }

    // Auto-dismiss after 4 seconds
    const timer = setTimeout(handleDismiss, 4000)

    // Allow user to dismiss early with click or key press
    const handleClick = () => {
      clearTimeout(timer)
      handleDismiss()
    }

    const handleKeyPress = () => {
      clearTimeout(timer)
      handleDismiss()
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="welcome-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Dark Smoke Background */}
          <div className="welcome-bg" />
          <div className="welcome-smoke-layer-1" />
          <div className="welcome-smoke-layer-2" />
          <div className="welcome-smoke-layer-3" />
          <div className="welcome-vignette" />
          
          {/* Welcome Content */}
          <motion.div
            className="welcome-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="welcome-top-text"
              initial={{ opacity: 0, letterSpacing: '2px' }}
              animate={{ opacity: 1, letterSpacing: '8px' }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              WELCOME TO
            </motion.div>
            
            <motion.div
              className="welcome-main-text"
              initial={{ opacity: 0, scale: 0.8, letterSpacing: '10px' }}
              animate={{ opacity: 1, scale: 1, letterSpacing: '24px' }}
              transition={{ duration: 1.5, delay: 1.5 }}
            >
              VICE CITY
            </motion.div>
            
            <motion.div
              className="welcome-bottom-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              Your story begins here
            </motion.div>

            <motion.div
              className="welcome-press-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 3, repeat: Infinity }}
            >
              Press any key or click to continue
            </motion.div>
          </motion.div>

          {/* Animated Particles */}
          <div className="welcome-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeScreen
