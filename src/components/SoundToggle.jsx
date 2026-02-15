import { useState } from 'react'
import { motion } from 'framer-motion'
import './SoundToggle.css'

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(true)

  const toggleSound = () => {
    setIsMuted(!isMuted)
    // You can add actual audio functionality here
    // For now, this is just a UI toggle
  }

  return (
    <motion.button
      className={`sound-toggle ${isMuted ? 'muted' : ''}`}
      onClick={toggleSound}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="sound-icon">
        {isMuted ? (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </>
        )}
      </div>
      <span className="sound-label">{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
    </motion.button>
  )
}

export default SoundToggle
