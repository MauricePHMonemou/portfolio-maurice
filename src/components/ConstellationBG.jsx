import { useEffect, useRef } from 'react'

export default function ConstellationBG() {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let w, h
    const isMobile = window.innerWidth < 768
    const STAR_COUNT = isMobile ? 60 : 120
    const CONNECT_DIST = isMobile ? 100 : 150
    const MOUSE_DIST = 200

    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    function createStars() {
      starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    resize()
    createStars()

    const handleResize = () => {
      resize()
      createStars()
    }
    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouse)

    let animId
    function draw() {
      // Fond sombre dessiné sur le canvas (comme la démo)
      ctx.fillStyle = '#0a0e1a'
      ctx.fillRect(0, 0, w, h)

      const stars = starsRef.current
      const mouse = mouseRef.current

      stars.forEach((s) => {
        s.x += s.vx
        s.y += s.vy
        s.pulse += 0.015
        if (s.x < 0) s.x = w
        if (s.x > w) s.x = 0
        if (s.y < 0) s.y = h
        if (s.y > h) s.y = 0
      })

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15
            ctx.beginPath()
            ctx.strokeStyle = `rgba(96,165,250,${alpha})`
            ctx.lineWidth = 0.5
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.stroke()
          }
        }

        const mdx = stars[i].x - mouse.x
        const mdy = stars[i].y - mouse.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < MOUSE_DIST) {
          const alpha = (1 - mDist / MOUSE_DIST) * 0.4
          ctx.beginPath()
          ctx.strokeStyle = `rgba(96,165,250,${alpha})`
          ctx.lineWidth = 0.8
          ctx.moveTo(stars[i].x, stars[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      stars.forEach((s) => {
        const glow = Math.sin(s.pulse) * 0.3 + 0.7

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * glow, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${0.6 * glow})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * 3 * glow, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96,165,250,${0.05 * glow})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}