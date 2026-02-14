import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './CharacterSection.css'

const CharacterSection = ({ character, index }) => {
  const sectionRef = useRef(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  // Scroll-based frame transitions
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.1 && latest < 0.9) {
        const frameProgress = (latest - 0.1) / 0.8
        const totalFrames = character.images.length
        const frameIndex = Math.floor(frameProgress * totalFrames)
        setCurrentFrame(Math.min(frameIndex, totalFrames - 1))
      } else if (latest <= 0.1) {
        setCurrentFrame(0)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, character.images.length])

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.85, 1, 1.02, 1, 0.95])

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
        <motion.div 
          className="character-image-wrapper"
          style={{ y, scale }}
        >
          {character.images.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`${character.name} - Frame ${i + 1}`}
              className={`character-img char-img-${i + 1}`}
              style={{
                opacity: currentFrame === i ? 1 : 0,
                zIndex: currentFrame === i ? 10 : i
              }}
              initial={{ opacity: 0 }}
              animate={inView && currentFrame === i ? { 
                opacity: 1
              } : { 
                opacity: 0
              }}
              transition={{ 
                duration: 0.7,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            />
          ))}
          
          <motion.div 
            className="image-accent"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.12 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ background: `radial-gradient(circle at center, ${character.color}30 0%, transparent 65%)` }}
          />

          {/* Frame indicator */}
          <div className="frame-indicator">
            {character.images.map((_, i) => (
              <motion.div
                key={i}
                className={`frame-dot ${currentFrame === i ? 'active' : ''}`}
                animate={{
                  scale: currentFrame === i ? 1.3 : 1,
                  opacity: currentFrame === i ? 1 : 0.4
                }}
                style={{ 
                  backgroundColor: currentFrame === i ? character.color : '#ffffff40'
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="character-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ opacity }}
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
        </motion.div>
      </div>
    </section>
  )
}

export default CharacterSection
