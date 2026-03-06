import { useState, useEffect } from 'react'

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'formation', 'contact']

export default function useScrollSpy(offset = 100) {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i])
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(SECTION_IDS[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset])

  return activeSection
}