import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './CharacterSection.css'

const CharacterSection = ({ character, index, onSelectCharacter, onLearnMore }) => {
  const sectionRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const handleSelectCharacter = (e) => {
    console.log('🎮 SELECT CHARACTER clicked!', character.id)
    e.preventDefault()
    e.stopPropagation()
    if (onSelectCharacter) {
      onSelectCharacter()
    }
  }

  const handleLearnMore = (e) => {
    console.log('📖 LEARN MORE clicked!', character.id)
    e.preventDefault()
    e.stopPropagation()
    if (onLearnMore) {
      onLearnMore()
    }
  }

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }


  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className={`character-section ${character.reverse ? 'reverse' : ''}`}
      data-character={character.id}
      style={{ '--accent-color': character.color }}
    >
      <motion.div 
        className="character-bg"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0]) }}
      />

      <div ref={ref} className="character-container">
        {/* Character Photo Frames */}
        <motion.div 
          className="character-photo-frames"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {character.images.map((img, i) => (
            <motion.div
              key={i}
              className="photo-frame"
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="frame-border" style={{ borderColor: character.color }}>
                <img src={img} alt={`${character.name} - Photo ${i + 1}`} className="frame-photo" />
                <div className="frame-overlay" style={{ background: `linear-gradient(to top, ${character.color}20, transparent)` }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="character-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="character-label" variants={itemVariants} style={{ opacity }}>
            {character.label}
          </motion.div>
          
          <motion.h2 className="character-name" variants={itemVariants} style={{ opacity }}>
            {character.name.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </motion.h2>

          <motion.p className="character-description" variants={itemVariants} style={{ opacity }}>
            {character.description}
          </motion.p>

          <motion.div className="character-stats" variants={itemVariants} style={{ opacity }}>
            {character.stats.map((stat, i) => (
              <motion.div 
                key={i} 
                className="stat"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="stat-label">{stat.label}</div>
                <div className="stat-bar">
                  <motion.div 
                    className="stat-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${stat.value}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                  />
                </div>
                <div className="stat-value">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="character-actions" 
            variants={itemVariants}
            style={{ pointerEvents: 'auto' }}
          >
            <button
              className="character-button primary"
              onClick={handleSelectCharacter}
              onMouseDown={(e) => console.log('Button mousedown:', character.id)}
              style={{ 
                '--button-color': character.color 
              }}
            >
              <span className="button-text">SELECT CHARACTER</span>
              <span className="button-icon">→</span>
            </button>
            
            <button
              className="character-button secondary"
              onClick={handleLearnMore}
              onMouseDown={(e) => console.log('Button mousedown:', character.id)}
              style={{ 
                '--button-color': character.color 
              }}
            >
              <span className="button-text">LEARN MORE</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CharacterSection
