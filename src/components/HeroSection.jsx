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
    const startFrame = 90 // Skip first 90 frames
    const frameCount = 230
    const loadedImages = []

    const loadImages = async () => {
      const imagePromises = []
      
      for (let i = startFrame; i < frameCount; i++) {
        const img = new Image()
        const frameNum = String(i).padStart(3, '0')
        // Alternate between delay patterns (033 and 034)
        const delay = (i % 3 === 1 || i % 3 === 2) ? '0.033s' : '0.034s'
        
        // Try the path with URL encoding for spaces
        img.src = `/hero%20section/frame_${frameNum}_delay-${delay}.png`
        
        imagePromises.push(
          new Promise((resolve) => {
            img.onload = () => resolve(img)
            img.onerror = () => {
              // Try without encoding
              img.src = `/hero section/frame_${frameNum}_delay-${delay}.png`
              img.onload = () => resolve(img)
              img.onerror = () => {
                // Try with the alternate delay pattern
                const altDelay = delay === '0.033s' ? '0.034s' : '0.033s'
                img.src = `/hero%20section/frame_${frameNum}_delay-${altDelay}.png`
                img.onload = () => resolve(img)
                img.onerror = () => resolve(null)
              }
            }
          })
        )
        loadedImages.push(img)
      }

      await Promise.all(imagePromises)
      setImages(loadedImages.filter(img => img !== null))
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
      // Map scroll to frame index smoothly across all frames
      const frameIndex = Math.min(
        Math.floor(scrollFraction * images.length),
        images.length - 1
      )

      setCurrentFrame(frameIndex)

      const img = images[frameIndex]
      if (!img || !img.complete) return

      context.clearRect(0, 0, canvas.width, canvas.height)

      // Scale to cover entire canvas while maintaining aspect ratio
      const canvasAspect = canvas.width / canvas.height
      const imgAspect = img.width / img.height
      
      let drawWidth, drawHeight, offsetX, offsetY
      
      if (canvasAspect > imgAspect) {
        // Canvas is wider - fit to width
        drawWidth = canvas.width
        drawHeight = canvas.width / imgAspect
        offsetX = 0
        offsetY = (canvas.height - drawHeight) / 2
      } else {
        // Canvas is taller - fit to height
        drawHeight = canvas.height
        drawWidth = canvas.height * imgAspect
        offsetX = (canvas.width - drawWidth) / 2
        offsetY = 0
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
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
      <div className="hero-sticky-wrapper">
        <canvas ref={canvasRef} className="hero-canvas" />
      </div>

      <div className="hero-gradient" />
    </section>
  )
}

export default HeroSection
