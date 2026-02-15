import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CharacterGallery.css'

const CharacterGallery = ({ isOpen, onClose, character }) => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setCurrentImage(0)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    const handleKeyboard = (e) => {
      if (!isOpen || !character) return
      if (e.key === 'ArrowRight') {
        setCurrentImage((prev) => (prev + 1) % character.images.length)
      } else if (e.key === 'ArrowLeft') {
        setCurrentImage((prev) => (prev - 1 + character.images.length) % character.images.length)
      }
    }
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [isOpen, character])

  if (!character) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="gallery-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Smoke Effect Background */}
          <div className="smoke-effect" />
          <div className="smoke-effect smoke-effect-2" />
          
          {/* Close Button */}
          <motion.button 
            className="gallery-close"
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            ✕
          </motion.button>

          <motion.div 
            className="gallery-container"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Character Header */}
            <motion.div 
              className="gallery-header"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="gallery-label" style={{ color: character.color }}>
                {character.label}
              </div>
              <h2 className="gallery-title">
                {character.name.replace(/\\n/g, ' ')}
              </h2>
              <p className="gallery-description">{character.description}</p>
            </motion.div>

            {/* Main Image Display */}
            <div className="gallery-main">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  className="gallery-frame"
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  <div className="frame-border" style={{ borderColor: character.color }}>
                    <img 
                      src={character.images[currentImage]}
                      alt={`${character.name} - ${currentImage + 1}`}
                      className="gallery-main-image"
                    />
                    <div 
                      className="frame-glow"
                      style={{ 
                        boxShadow: `0 0 40px ${character.color}20, inset 0 0 40px ${character.color}10`
                      }}
                    />
                  </div>
                  
                  {/* Image Counter */}
                  <div className="image-counter" style={{ color: character.color }}>
                    {currentImage + 1} / {character.images.length}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {character.images.length > 1 && (
                <>
                  <button
                    className="gallery-nav gallery-nav-left"
                    onClick={() => setCurrentImage((prev) => (prev - 1 + character.images.length) % character.images.length)}
                    style={{ borderColor: character.color }}
                  >
                    <span>‹</span>
                  </button>
                  <button
                    className="gallery-nav gallery-nav-right"
                    onClick={() => setCurrentImage((prev) => (prev + 1) % character.images.length)}
                    style={{ borderColor: character.color }}
                  >
                    <span>›</span>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            <motion.div 
              className="gallery-thumbnails"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {character.images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`thumbnail ${currentImage === index ? 'active' : ''}`}
                  onClick={() => setCurrentImage(index)}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    borderColor: currentImage === index ? character.color : 'transparent'
                  }}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                  <div 
                    className="thumbnail-overlay"
                    style={{ 
                      opacity: currentImage === index ? 1 : 0,
                      backgroundColor: `${character.color}30`
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Display */}
            <motion.div 
              className="gallery-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {character.stats.map((stat, i) => (
                <div key={i} className="gallery-stat">
                  <div className="stat-info">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-number" style={{ color: character.color }}>
                      {stat.value}
                    </span>
                  </div>
                  <div className="stat-bar-bg">
                    <motion.div 
                      className="stat-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      style={{ backgroundColor: character.color }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CharacterGallery
