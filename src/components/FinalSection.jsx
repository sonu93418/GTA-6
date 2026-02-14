import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './FinalSection.css'

const FinalSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  })

  return (
    <section className="final-section" id="preorder" ref={ref}>
      {/* Corner Text Elements */}
      <motion.div 
        className="corner-text top-left"
        initial={{ opacity: 0, x: -30, y: -30 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: -30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="corner-label">GRAND THEFT AUTO</div>
        <div className="corner-number">VI</div>
      </motion.div>

      <motion.div 
        className="corner-text top-right"
        initial={{ opacity: 0, x: 30, y: -30 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 30, y: -30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="corner-subtitle">WELCOME TO</div>
        <div className="corner-location">VICE CITY</div>
      </motion.div>

      <div className="final-content">
        <motion.h2 
          className="final-title"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          THE HEIST<br />BEGINS
        </motion.h2>
      
        <motion.p 
          className="final-text"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Vice City has never seen a crew like this.
        </motion.p>

        <motion.div 
          className="final-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            className="cta-button"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(255, 0, 110, 0.8), 0 0 80px rgba(255, 0, 110, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            PRE-ORDER NOW
          </motion.button>
          
          <motion.div 
            className="release-date"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            COMING 2026
          </motion.div>
        </motion.div>
      </div>

      <div className="final-gradient" />
      
      <motion.div 
        className="final-grid"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 2 }}
      />
    </section>
  )
}

export default FinalSection
