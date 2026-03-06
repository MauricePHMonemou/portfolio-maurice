import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'
import skills from '../data/skills'
import { Code, Server, Database, Container, Cpu, Heart } from 'lucide-react'

const categories = [
  { key: 'frontend', label: 'Frontend', icon: Code },
  { key: 'backend', label: 'Backend (Laravel)', icon: Server },
  { key: 'database', label: 'Base de données', icon: Database },
  { key: 'devops', label: 'DevOps / Infra', icon: Container },
  { key: 'telecom', label: 'Télécom / Embarqué', icon: Cpu },
  { key: 'soft', label: 'Soft Skills', icon: Heart },
]

function SkillBar({ name, level, delay, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-3"
    >
      <span className="text-sm min-w-[140px]" style={{ color: '#e2e8f0' }}>{name}</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(96,165,250,0.1)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${(level / 5) * 100}%` } : {}}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
            boxShadow: '0 0 8px rgba(59,130,246,0.3)',
          }}
        />
      </div>
      <span
        className="text-xs font-mono min-w-[28px] text-right"
        style={{ color: '#475569' }}
      >
        {level}/5
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, isInView] = useInView({ threshold: 0.05 })

  return (
    <section id="skills" className="py-24 px-6" ref={ref}>
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
            Compétences
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f8fafc' }}>
            Stack technique<span style={{ color: '#60a5fa' }}>.</span>
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: '#475569' }}>
            Un profil polyvalent alliant développement web, gestion IT et informatique industrielle.
          </p>
        </motion.div>

        {/* Grille de catégories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + catIndex * 0.1 }}
              className="rounded-[12px] p-5"
              style={{
                background: 'rgba(26,31,53,0.5)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(96,165,250,0.08)',
              }}
            >
              {/* Titre catégorie */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="p-2 rounded-lg"
                  style={{ background: 'rgba(96,165,250,0.08)' }}
                >
                  <cat.icon size={18} style={{ color: '#60a5fa' }} />
                </div>
                <h3 className="text-sm font-semibold" style={{ color: '#f8fafc' }}>
                  {cat.label}
                </h3>
              </div>

              {/* Barres de compétences */}
              <div className="space-y-3">
                {skills[cat.key]?.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.2 + catIndex * 0.1 + i * 0.05}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}