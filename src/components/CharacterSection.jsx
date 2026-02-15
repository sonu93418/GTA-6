import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './CharacterSection.css'

const CharacterSection = ({ character, index, onSelectCharacter, onLearnMore }) => {
  const sectionRef = useRef(null)
  
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }


  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className={`character-section ${character.reverse ? 'reverse' : ''}`}
      data-character={character.id}
      style={{ 
        '--accent-color': character.color,
        '--bg-image': `url(${character.backgroundImage})`
      }}
    >
      <div className="character-bg" />
      
      <div className="character-bg-overlay" />

      <div ref={ref} className="character-container">
        {/* Character Info Card */}
        <motion.div 
          className="character-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="character-label" variants={itemVariants}>
            {character.label}
          </motion.div>
          
          <motion.h2 className="character-name" variants={itemVariants}>
            {character.name.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </motion.h2>

          <motion.p className="character-description" variants={itemVariants}>
            {character.description}
          </motion.p>

          <motion.div className="character-stats" variants={itemVariants}>
            {character.stats.map((stat, i) => (
              <div 
                key={i} 
                className="stat"
              >
                <div className="stat-label">{stat.label}</div>
                <div className="stat-bar">
                  <motion.div 
                    className="stat-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${stat.value}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  />
                </div>
                <div className="stat-value">{stat.value}</div>
              </div>
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

        {/* Character Photo Frames Grid */}
        <motion.div 
          className="character-photo-frames"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {character.images.map((img, i) => (
            <motion.div
              key={i}
              className={`photo-frame frame-${i + 1}`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <div className="frame-border">
                <img src={img} alt={`${character.name} - Photo ${i + 1}`} className="frame-photo" />
                <div className="frame-overlay" style={{ background: `linear-gradient(to top, ${character.color}20, transparent)` }} />
                <div className="frame-number" style={{ color: character.color }}>{String(i + 1).padStart(2, '0')}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CharacterSection
