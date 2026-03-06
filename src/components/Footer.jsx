import { Github, Linkedin, Mail, Heart } from 'lucide-react'

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
    href: '#',
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
          {/* Logo + description */}
          <div className="max-w-xs">
            <button
              onClick={() => scrollTo('hero')}
              className="text-xl font-bold mb-3 block"
              style={{ color: '#f8fafc', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Maurice<span style={{ color: '#60a5fa' }}>.</span>
            </button>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Responsable IT & Développeur Web Full Stack — Triple compétence IT · Web · Télécom.
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
                  style={{ color: '#475569', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = '#475569'}
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

        {/* Séparateur */}
        <div
          className="w-full h-px mb-6"
          style={{ background: 'rgba(96,165,250,0.06)' }}
        />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-xs" style={{ color: '#475569' }}>
            © {new Date().getFullYear()} Maurice MONEMOU — Tous droits réservés
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: '#475569' }}>
            Fait avec <Heart size={12} style={{ color: '#60a5fa', fill: '#60a5fa' }} /> et React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}