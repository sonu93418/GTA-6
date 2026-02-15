import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './PosterSection.css'

const PosterSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const posters = [
    '/page-3 Raul Bautista/poster.webp',
    '/page-4 Real Dimez/poster.webp'
  ]

  const [currentPoster, setCurrentPoster] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % posters.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [posters.length])

  const handleWatchTrailer = () => {
    window.open('https://www.youtube.com/watch?v=QdBZY2fkU-0', '_blank')
  }

  const handleLearnMore = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', url: 'https://twitter.com/rockstargames' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com/rockstargames' },
    { name: 'YouTube', icon: '▶', url: 'https://youtube.com/rockstargames' },
    { name: 'Discord', icon: '💬', url: 'https://discord.gg/rockstar' }
  ]

  return (
    <section className="poster-section" id="poster" ref={ref}>
      {/* Background Poster */}
      <motion.div 
        key={currentPoster}
        className="poster-bg" 
        style={{ backgroundImage: `url(${posters[currentPoster]})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
      <div className="poster-overlay" />

      {/* Main Content */}
      <div className="poster-content">
        {/* Logo Section */}
        <motion.div
          className="poster-logo-section"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="poster-logo">
            <span className="logo-text">GRAND THEFT AUTO</span>
            <span className="logo-number">VI</span>
          </div>
          <div className="poster-tagline">VICE CITY AWAITS</div>
        </motion.div>

        {/* Interactive Buttons */}
        <motion.div
          className="poster-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button 
            className="poster-btn primary"
            onClick={handleWatchTrailer}
          >
            <span className="btn-icon">▶</span>
            <span className="btn-text">WATCH TRAILER</span>
          </button>
          
          <button 
            className="poster-btn secondary"
            onClick={handleLearnMore}
          >
            <span className="btn-text">EXPLORE CHARACTERS</span>
            <span className="btn-icon">↑</span>
          </button>
        </motion.div>

        {/* Release Info */}
        <motion.div
          className="poster-info"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="info-item">
            <span className="info-label">RELEASE</span>
            <span className="info-value">2026</span>
          </div>
          <div className="info-divider" />
          <div className="info-item">
            <span className="info-label">PLATFORM</span>
            <span className="info-value">PS5 • XBOX • PC</span>
          </div>
          <div className="info-divider" />
          <div className="info-item">
            <span className="info-label">GENRE</span>
            <span className="info-value">ACTION ADVENTURE</span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="poster-social"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="social-label">FOLLOW US</span>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Poster Indicators */}
        <motion.div
          className="poster-indicators"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {posters.map((_, index) => (
            <button
              key={index}
              className={`poster-indicator ${currentPoster === index ? 'active' : ''}`}
              onClick={() => setCurrentPoster(index)}
              aria-label={`View poster ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="poster-corner top-left">
        <div className="corner-line horizontal" />
        <div className="corner-line vertical" />
      </div>
      <div className="poster-corner top-right">
        <div className="corner-line horizontal" />
        <div className="corner-line vertical" />
      </div>
      <div className="poster-corner bottom-left">
        <div className="corner-line horizontal" />
        <div className="corner-line vertical" />
      </div>
      <div className="poster-corner bottom-right">
        <div className="corner-line horizontal" />
        <div className="corner-line vertical" />
      </div>
    </section>
  )
}

export default PosterSection
