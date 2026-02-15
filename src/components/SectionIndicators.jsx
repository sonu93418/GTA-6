import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './SectionIndicators.css'

const SectionIndicators = () => {
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    { id: 'hero', label: 'HERO', index: 0 },
    { id: 'jason', label: 'JASON', index: 1 },
    { id: 'lucia', label: 'LUCIA', index: 2 },
    { id: 'raul', label: 'RAUL', index: 3 },
    { id: 'dimez', label: 'DIMEZ', index: 4 },
    { id: 'poster', label: 'POSTER', index: 5 }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="section-indicators">
      {sections.map((section) => (
        <motion.button
          key={section.id}
          className={`section-dot ${activeSection === section.index ? 'active' : ''}`}
          onClick={() => scrollToSection(section.id)}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="dot-label">{section.label}</span>
          <span className="dot-circle" />
        </motion.button>
      ))}
    </div>
  )
}

export default SectionIndicators
