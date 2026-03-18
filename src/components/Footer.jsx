import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import profileImg from '../assets/images/profile.jpeg'

const links = [
  { id: 'about', label: 'À propos' },
  { id: 'skills', label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
]

const socials = [
  {
    icon: Mail,
    href: 'mailto:Mauriceph1997monemou@gmail.com',
    label: 'Email',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/maurice-ph-mon%C3%A8mou-585b55289/',
    label: 'LinkedIn',
  },
  {
    icon: Github,
    href: 'https://github.com/MauricePHMonemou',
    label: 'GitHub',
  },
]

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 px-6 pt-16 pb-8">
      <div
        className="max-w-5xl mx-auto rounded-[16px] p-8 md:p-10"
        style={{
          background: 'rgba(26,31,53,0.4)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(96,165,250,0.06)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
          {/* Logo + photo + description */}
          <div className="max-w-xs">
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-3 mb-3"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <img
                src={profileImg}
                alt="Maurice MONEMOU"
                className="w-30 h-30 rounded-full object-cover"
                style={{
                  border: '2px solid rgba(96,165,250,0.3)',
                  boxShadow: '0 0 10px rgba(96,165,250,0.15)',
                  objectPosition: 'center 80%',
                }}
              />
              <span className="text-xl font-bold" style={{ color: '#f8fafc' }}>
                Maurice<span style={{ color: '#60a5fa' }}>.</span>
              </span>
            </button>
            <p className="text-sm leading-relaxed" style={{ color: '#7a8ba8' }}>
              Responsable IT &amp; D&#233;veloppeur Web Full Stack
            </p>
            <p
              className="text-[12px] font-bold mt-2 tracking-wide text-center"
              style={{ color: '#60a5fa' }}
            >
              Travail&nbsp;•&nbsp;Constance&nbsp;•&nbsp;Am&#233;lioration
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <p
              className="text-xs font-semibold tracking-[2px] uppercase mb-3"
              style={{ color: '#94a3b8' }}
            >
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-left transition-colors"
                  style={{ color: '#7a8ba8', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = '#7a8ba8'}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <p
              className="text-xs font-semibold tracking-[2px] uppercase mb-3"
              style={{ color: '#94a3b8' }}
            >
              Me suivre
            </p>
            <div className="flex gap-3">
              {socials.map((social, i) => (
                
                <a key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-lg transition-all duration-200"
                  style={{
                    background: 'rgba(96,165,250,0.06)',
                    border: '1px solid rgba(96,165,250,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(96,165,250,0.15)'
                    e.currentTarget.style.borderColor = 'rgba(96,165,250,0.25)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(96,165,250,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(96,165,250,0.08)'
                  }}
                >
                  <social.icon size={18} style={{ color: '#60a5fa' }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="w-full h-px mb-6"
          style={{ background: 'rgba(96,165,250,0.06)' }}
        />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-xs" style={{ color: '#7a8ba8' }}>
            © {new Date().getFullYear()} Maurice MONEMOU — Tous droits réservés
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: '#7a8ba8' }}>
            Fait avec <Heart size={12} style={{ color: '#60a5fa', fill: '#60a5fa' }} /> et React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}