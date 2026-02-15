import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CharacterModal.css'

const CharacterModal = ({ isOpen, onClose, characters, selectedCharacter }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="character-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="character-modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>✕</button>
            
            <div className="modal-header">
              <h2>SELECT YOUR CHARACTER</h2>
              <p>Choose your protagonist for the ultimate Vice City experience</p>
            </div>

            <div className="characters-grid">
              {characters.map((character) => (
                <motion.div
                  key={character.id}
                  className={`character-card ${selectedCharacter?.id === character.id ? 'selected' : ''}`}
                  style={{ '--card-color': character.color }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    console.log('Character selected:', character.name)
                    alert(`You selected: ${character.name.replace(/\\n/g, ' ')}!`)
                    onClose()
                  }}
                >
                  <div className="card-image-wrapper">
                    <img 
                      src={character.images[0]} 
                      alt={character.name}
                      className="card-image"
                    />
                    <div 
                      className="card-gradient"
                      style={{ 
                        background: `linear-gradient(to top, ${character.color}40 0%, transparent 70%)`
                      }}
                    />
                  </div>
                  
                  <div className="card-content">
                    <div className="card-label">{character.label}</div>
                    <h3 className="card-name">
                      {character.name.split('\\n').join(' ')}
                    </h3>
                    
                    <div className="card-stats">
                      {character.stats.map((stat, i) => (
                        <div key={i} className="card-stat">
                          <span className="card-stat-label">{stat.label}</span>
                          <div className="card-stat-bar">
                            <motion.div 
                              className="card-stat-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.value}%` }}
                              transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                              style={{ backgroundColor: character.color }}
                            />
                          </div>
                          <span className="card-stat-value">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      className="card-select-btn"
                      style={{ backgroundColor: character.color }}
                    >
                      SELECT
                    </button>
                  </div>

                  {selectedCharacter?.id === character.id && (
                    <motion.div 
                      className="selected-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CharacterModal
