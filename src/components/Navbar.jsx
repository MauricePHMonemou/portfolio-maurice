import { useState, useEffect } from 'react'
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
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
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeSection === link.id
                  ? 'text-[#60a5fa]'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="ml-3 px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white shadow-[0_2px_12px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition-shadow"
          >
            Me contacter
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-[#f8fafc]"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#0a0e1a]/95 backdrop-blur-[20px] z-40 flex flex-col items-center justify-center gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-lg font-medium px-6 py-3 transition-colors ${
                activeSection === link.id ? 'text-[#60a5fa]' : 'text-[#94a3b8]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="mt-4 px-8 py-3 rounded-lg font-semibold bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white"
          >
            Me contacter
          </button>
        </div>
      )}
    </nav>
  )
}