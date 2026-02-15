import { motion } from 'framer-motion'
import { useState } from 'react'
import './Navigation.css'

const Navigation = ({ onCharactersClick }) => {
  const [activeSection, setActiveSection] = useState('hero')

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  const handleCharactersClick = () => {
    if (onCharactersClick) {
      onCharactersClick()
    } else {
      scrollToSection('jason')
    }
  }

  return (
    <>
      {/* Top Logo */}
      <motion.div
        className="nav-logo-top"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        GTA VI
      </motion.div>

      {/* Right Side Navigation */}
      <motion.nav 
        className="nav-right"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8 }}
      >
        <div className="nav-items">
          <motion.button
            className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05, x: -10 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span className="nav-number">01</span>
            <span className="nav-label">HERO</span>
          </motion.button>

          <motion.button
            className={`nav-item ${activeSection === 'characters' ? 'active' : ''}`}
            onClick={handleCharactersClick}
            whileHover={{ scale: 1.05, x: -10 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span className="nav-number">02</span>
            <span className="nav-label">CHARACTERS</span>
          </motion.button>

          <motion.button
            className={`nav-item ${activeSection === 'poster' ? 'active' : ''}`}
            onClick={() => scrollToSection('poster')}
            whileHover={{ scale: 1.05, x: -10 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span className="nav-number">03</span>
            <span className="nav-label">POSTER</span>
          </motion.button>
        </div>

        <div className="nav-scroll-indicator">
          <motion.div 
            className="scroll-line"
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.nav>
    </>
  )
}

export default Navigation
