import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import useScrollSpy from '../hooks/useScrollSpy'
import profileImg from '../assets/images/profile.jpeg'

const NAV_LINKS = [
  { id: 'about', label: 'À propos' },
  { id: 'skills', label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'experience', label: 'Expérience' },
  { id: 'formation', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useScrollSpy()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0e1a]/85 backdrop-blur-[20px] border-b border-[#60a5fa]/[0.08]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={profileImg}
              alt="Maurice MONEMOU"
              className="w-15 h-15 rounded-full object-cover"
              style={{
                border: '2px solid rgba(96,165,250,0.3)',
                boxShadow: '0 0 10px rgba(96,165,250,0.15)',
                objectPosition: 'center 35%',
              }}
            />
            <span className="text-[#f8fafc] font-bold text-xl tracking-tight">
              Maurice<span className="text-[#60a5fa]">.</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{
                  color: activeSection === link.id ? '#60a5fa' : '#94a3b8',
                }}
                onMouseEnter={(e) => { if (activeSection !== link.id) e.target.style.color = '#f8fafc' }}
                onMouseLeave={(e) => { if (activeSection !== link.id) e.target.style.color = '#94a3b8' }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#60a5fa', boxShadow: '0 0 6px rgba(96,165,250,0.5)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('contact')}
              className="ml-3 px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white shadow-[0_2px_12px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition-shadow"
            >
              Me contacter
            </motion.button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#f8fafc]"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Menu mobile — EN DEHORS de la nav */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden"
              style={{
                position: 'fixed',
                top: 64,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 40,
              }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:hidden"
              style={{
                position: 'fixed',
                top: 64,
                right: 0,
                bottom: 0,
                width: 256,
                background: '#0a0e1a',
                borderLeft: '1px solid rgba(96,165,250,0.1)',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                zIndex: 45,
                overflowY: 'auto',
              }}
            >
              <div className="flex flex-col gap-1 p-6 pt-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(link.id)}
                    className="text-left text-base font-medium px-4 py-3 rounded-lg transition-colors"
                    style={{
                      color: activeSection === link.id ? '#60a5fa' : '#94a3b8',
                      background: activeSection === link.id ? 'rgba(96,165,250,0.08)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => scrollTo('contact')}
                  className="mt-4 px-4 py-3 rounded-lg font-semibold text-sm text-center bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white"
                >
                  Me contacter
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}