import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import useScrollSpy from '../hooks/useScrollSpy'

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

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
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
          className="text-[#f8fafc] font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          Maurice<span className="text-[#60a5fa]">.</span>
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

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 bg-[#0a0e1a]/95 backdrop-blur-[20px] z-40 flex flex-col items-center justify-center gap-2"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.id)}
                className="text-lg font-medium px-6 py-3 transition-colors"
                style={{ color: activeSection === link.id ? '#60a5fa' : '#94a3b8' }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => scrollTo('contact')}
              className="mt-4 px-8 py-3 rounded-lg font-semibold bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white"
            >
              Me contacter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}