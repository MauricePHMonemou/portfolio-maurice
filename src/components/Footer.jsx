import { Github, Linkedin, Mail, Heart, Phone } from 'lucide-react'
import profileImg from '../assets/images/profile.jpeg'

const WhatsAppIcon = ({ size = 18, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

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
    color: '#60a5fa',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/maurice-ph-mon%C3%A8mou-585b55289/',
    label: 'LinkedIn',
    color: '#60a5fa',
  },
  {
    icon: Github,
    href: 'https://github.com/MauricePHMonemou',
    label: 'GitHub',
    color: '#60a5fa',
  },
  {
    icon: Phone,
    href: 'tel:+212774423910',
    label: 'Téléphone',
    color: '#60a5fa',
    external: false,
  },
  {
    icon: WhatsAppIcon,
    href: 'https://wa.me/212774423910',
    label: 'WhatsApp',
    color: '#25d366',
    external: true,
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
            <div className="flex gap-3 flex-wrap">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target={social.external !== false ? '_blank' : undefined}
                  rel={social.external !== false ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="p-2.5 rounded-lg transition-all duration-200"
                  style={{
                    background: `${social.color}12`,
                    border: `1px solid ${social.color}20`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${social.color}26`
                    e.currentTarget.style.borderColor = `${social.color}50`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${social.color}12`
                    e.currentTarget.style.borderColor = `${social.color}20`
                  }}
                >
                  <social.icon size={18} style={{ color: social.color }} />
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