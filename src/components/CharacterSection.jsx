import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './CharacterSection.css'

const CharacterSection = ({ character, index }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9])

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
              alt={character.name}
              className={`character-img char-img-${i + 1}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 1, 
                delay: i * 0.2,
                ease: [0.6, 0.05, 0.01, 0.9]
              }}
            />
          ))}
          <motion.div 
            className="image-glow"
            animate={inView ? {
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ background: `radial-gradient(circle, ${character.color}40 0%, transparent 70%)` }}
          />
        </motion.div>

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
