import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import CharacterSection from './components/CharacterSection'
import FinalSection from './components/FinalSection'
import CharacterModal from './components/CharacterModal'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Loading simulation
    setTimeout(() => setLoading(false), 2500)

    return () => {
      lenis.destroy()
    }
  }, [])

  const characters = [
    {
      id: 'jason',
      label: 'CHARACTER 01',
      name: 'JASON\nDUVAL',
      description: 'A former street racer turned high-stakes criminal, Jason brings precision and adrenaline to every heist. His connections in the underground racing scene make him the perfect wheelman for the most dangerous jobs in Vice City.',
      images: [
        '/page -1 Jason Duval/Jason_Duval_01.webp',
        '/page -1 Jason Duval/Jason_Duval_04.webp',
        '/page -1 Jason Duval/Jason_Duval_05.921c79be.jpg'
      ],
      stats: [
        { label: 'DRIVING', value: 95 },
        { label: 'SHOOTING', value: 75 },
        { label: 'STEALTH', value: 60 }
      ],
      color: '#d4af37'
    },
    {
      id: 'lucia',
      label: 'CHARACTER 02',
      name: 'LUCIA\nCAMINOS',
      description: 'Born and raised in Vice City\'s toughest neighborhoods, Lucia is a master strategist with nerves of steel. Her expertise in planning and execution makes her the brains behind the operation.',
      images: [
        '/page-2 Lucia Caminos/Lucia_Caminos_01.webp',
        '/page-2 Lucia Caminos/Lucia_Caminos_04.76419a9d.jpg',
        '/page-2 Lucia Caminos/mobile.webp'
      ],
      stats: [
        { label: 'INTELLIGENCE', value: 92 },
        { label: 'SHOOTING', value: 88 },
        { label: 'STEALTH', value: 85 }
      ],
      color: '#00d9ff',
      reverse: true
    },
    {
      id: 'raul',
      label: 'CHARACTER 03',
      name: 'RAUL\nBAUTISTA',
      description: 'A tech-savvy hacker with a dark past, Raul can breach any security system in Vice City. His digital prowess and street smarts make him an invaluable asset in the crew\'s most complex operations.',
      images: [
        '/page-3 Raul Bautista/Raul_Bautista_01.b4438643.jpg',
        '/page-3 Raul Bautista/Raul_Bautista_03.webp',
        '/page-3 Raul Bautista/Hero_BG.webp'
      ],
      stats: [
        { label: 'HACKING', value: 98 },
        { label: 'INTELLIGENCE', value: 90 },
        { label: 'STEALTH', value: 70 }
      ],
      color: '#ff6b6b'
    },
    {
      id: 'dimez',
      label: 'CHARACTER 04',
      name: 'REAL\nDIMEZ',
      description: 'A legendary enforcer known for his ruthless efficiency, Real Dimez controls the underground weapons trade. When things go sideways, he\'s the one you want watching your back in Vice City\'s most dangerous situations.',
      images: [
        '/page-4 Real Dimez/Real_Dimez_01.webp',
        '/page-4 Real Dimez/Real_Dimez_03.webp',
        '/page-4 Real Dimez/Hero_BG.webp'
      ],
      stats: [
        { label: 'STRENGTH', value: 96 },
        { label: 'SHOOTING', value: 94 },
        { label: 'STAMINA', value: 89 }
      ],
      color: '#d4af37',
      reverse: true
    }
  ]

  const openModal = (character) => {
    setSelectedCharacter(character)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      {loading && <LoadingScreen />}
      <Navigation onCharactersClick={() => setModalOpen(true)} />
      <main>
        <HeroSection />
        {characters.map((character, index) => (
          <CharacterSection 
            key={character.id} 
            character={character} 
            index={index}
            onSelectCharacter={() => openModal(character)}
            onLearnMore={() => openModal(character)}
          />
        ))}
        <FinalSection />
      </main>
      <CharacterModal 
        isOpen={modalOpen}
        onClose={closeModal}
        characters={characters}
        selectedCharacter={selectedCharacter}
      />
    </>
  )
}

export default App
