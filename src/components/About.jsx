import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'
import { Briefcase, GraduationCap, Cpu, Code, Users, MapPin } from 'lucide-react'

const stats = [
  { icon: Briefcase, value: '3+', label: "Ans d'expérience" },
  { icon: Code, value: '5+', label: 'Projets livrés' },
  { icon: Cpu, value: '15+', label: 'Technologies' },
  { icon: Users, value: '3', label: 'Entreprises' },
]

export default function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-semibold tracking-[3px] uppercase mb-4"
            style={{ color: '#94a3b8' }}
          >
            À propos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f8fafc' }}>
            Qui suis-je<span style={{ color: '#60a5fa' }}> ?</span>
          </h2>
        </motion.div>

        {/* Contenu principal */}
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Bio — 3 colonnes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 space-y-5"
          >
            <p className="leading-relaxed" style={{ color: '#e2e8f0', fontSize: 15 }}>
              Responsable IT chez <span style={{ color: '#60a5fa', fontWeight: 600 }}>EXCELSA</span> et
              développeur web full-stack, je possède un parcours atypique qui allie la{' '}
              <span style={{ color: '#f8fafc', fontWeight: 600 }}>gestion de systèmes d'information</span>,
              le <span style={{ color: '#f8fafc', fontWeight: 600 }}>développement logiciel</span> et{' '}
              l'<span style={{ color: '#f8fafc', fontWeight: 600 }}>informatique industrielle</span>.
            </p>

            <p className="leading-relaxed" style={{ color: '#94a3b8', fontSize: 15 }}>
              Originaire de Guinée et basé à Casablanca, mon parcours débute dans la maintenance
              informatique chez ApproTECH, se poursuit par un BTS en Télécom (Informatique Industrielle)
              puis un DTS en Développement Digital (Full Stack) au Complexe de Formation d'Oujda.
            </p>

            <p className="leading-relaxed" style={{ color: '#94a3b8', fontSize: 15 }}>
              Aujourd'hui, je pilote le projet{' '}
              <span style={{ color: '#60a5fa', fontWeight: 600 }}>EXCELSA-RH</span> — une plateforme
              web sur mesure de gestion des ressources humaines que je conçois et développe intégralement
              avec Laravel 12, PHP 8.2, Tailwind CSS, Alpine.js, MySQL et Docker.
            </p>

            {/* Disponibilité */}
            <div
              className="flex items-center gap-3 pt-3"
            >
              <MapPin size={16} style={{ color: '#60a5fa' }} />
              <span style={{ color: '#94a3b8', fontSize: 14 }}>
                Casablanca, Sidi Maarouf — Maroc
              </span>
            </div>
          </motion.div>

          {/* Stats + Profil — 2 colonnes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 space-y-4"
          >
            {/* Carte triple compétence */}
            <div
              className="rounded-[12px] p-5"
              style={{
                background: 'rgba(26,31,53,0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(96,165,250,0.1)',
              }}
            >
              <p
                className="text-xs font-semibold tracking-[2px] uppercase mb-4"
                style={{ color: '#60a5fa' }}
              >
                Triple compétence
              </p>
              <div className="space-y-3">
                {[
                  { icon: Code, label: 'Développement Web', detail: 'Laravel · React · PHP · JS' },
                  { icon: Briefcase, label: 'Gestion IT', detail: 'SI · Infrastructure · Projets' },
                  { icon: Cpu, label: 'Télécom / Embarqué', detail: 'Arduino · C++ · Automatisme' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg mt-0.5"
                      style={{ background: 'rgba(96,165,250,0.08)' }}
                    >
                      <item.icon size={16} style={{ color: '#60a5fa' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#f8fafc' }}>{item.label}</p>
                      <p className="text-xs" style={{ color: '#475569' }}>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats chiffres */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="rounded-[12px] p-4 text-center"
                  style={{
                    background: 'rgba(26,31,53,0.4)',
                    border: '1px solid rgba(96,165,250,0.06)',
                  }}
                >
                  <stat.icon
                    size={18}
                    className="mx-auto mb-2"
                    style={{ color: '#60a5fa' }}
                  />
                  <p className="text-xl font-bold" style={{ color: '#f8fafc' }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: '#475569' }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Encart EXCELSA-RH */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 rounded-[16px] p-6 md:p-8"
          style={{
            background: 'rgba(26,31,53,0.5)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(96,165,250,0.08)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-bold" style={{ color: '#f8fafc' }}>
                  EXCELSA-RH
                </h3>
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-md"
                  style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}
                >
                  Production
                </span>
              </div>
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                Plateforme web sur mesure de gestion des ressources humaines
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Laravel 12', 'PHP 8.2', 'Tailwind CSS', 'Alpine.js 3', 'MySQL', 'Docker', 'Vite 7', 'Blade'].map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium px-3 py-1.5 rounded-lg"
                style={{
                  background: 'rgba(96,165,250,0.08)',
                  border: '1px solid rgba(96,165,250,0.12)',
                  color: '#60a5fa',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="mt-4 text-sm leading-relaxed" style={{ color: '#475569' }}>
            Gestion complète des employés, workflows RH (demandes, missions, évaluations),
            notifications email + in-app, sécurité avancée — conçu et développé en autonomie.
          </p>
        </motion.div>
      </div>
    </section>
  )
}