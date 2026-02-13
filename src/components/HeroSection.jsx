import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './HeroSection.css'

const HeroSection = () => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [images, setImages] = useState([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1.05, 1.1])

  useEffect(() => {
    const frameCount = 230
    const loadedImages = []

    const loadImages = async () => {
      const imagePromises = []
      
      for (let i = 0; i < frameCount; i++) {
        const img = new Image()
        const frameNum = String(i).padStart(3, '0')
        // Try both with and without encoded spaces
        img.src = `/hero section/frame_${frameNum}_delay-0.033s.png`
        imagePromises.push(
          new Promise((resolve) => {
            img.onload = () => resolve(img)
            img.onerror = () => {
              // Try alternate path
              img.src = `/hero%20section/frame_${frameNum}_delay-0.033s.png`
              img.onload = () => resolve(img)
              img.onerror = () => resolve(null)
            }
          })
        )
        loadedImages.push(img)
      }

      await Promise.all(imagePromises)
      setImages(loadedImages)
      setImagesLoaded(true)
    }

    loadImages()
  }, [])

  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const render = () => {
      const scrollFraction = scrollYProgress.get()
      // Map scroll to frame index - ensure we cover all 230 frames
      const frameIndex = Math.min(
        Math.floor(scrollFraction * (images.length - 1)),
        images.length - 1
      )

      setCurrentFrame(frameIndex)

      const img = images[frameIndex]
      if (!img || !img.complete) return

      context.clearRect(0, 0, canvas.width, canvas.height)

      // Cover entire canvas
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      )

      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2

      context.drawImage(img, x, y, img.width * scale, img.height * scale)
    }

    const unsubscribe = scrollYProgress.on('change', render)
    render()

    return () => {
      unsubscribe()
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [imagesLoaded, images, scrollYProgress])

  return (
    <section className="hero-section" id="hero" ref={containerRef}>
      <canvas ref={canvasRef} className="hero-canvas" />
      <motion.div 
        className="hero-content"
        style={{ opacity, scale }}
      >
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
        >
          <span className="title-line">GRAND THEFT AUTO</span>
          <span className="title-line-large">VI</span>
        </motion.h1>
        <motion.div 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
        >
          WELCOME TO VICE CITY
        </motion.div>
      </motion.div>
      {imagesLoaded && (
        <motion.div 
          className="frame-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 3 }}
        >
          {currentFrame + 1} / {images.length}
        </motion.div>
      )}
      <div className="hero-gradient" />
    </section>
  )
}

export default HeroSection
