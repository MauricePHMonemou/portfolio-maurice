import { useState } from 'react'
import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'
import projects from '../data/projects'
import { ExternalLink, Github, Star } from 'lucide-react'

const filters = [
  { key: 'all', label: 'Tous' },
  { key: 'full-stack', label: 'Full-Stack' },
  { key: 'frontend', label: 'Frontend' },
]

const statusConfig = {
  production: { label: 'Production', color: '#34d399' },
  'en-cours': { label: 'En cours', color: '#f59e0b' },
  archive: { label: 'Archive', color: '#475569' },
}

export default function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.05 })
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-[3px] uppercase mb-4" style={{ color: '#94a3b8' }}>
            Réalisations
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f8fafc' }}>
            Mes projets<span style={{ color: '#60a5fa' }}>.</span>
          </h2>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeFilter === f.key ? 'rgba(96,165,250,0.15)' : 'transparent',
                color: activeFilter === f.key ? '#60a5fa' : '#475569',
                border: activeFilter === f.key ? '1px solid rgba(96,165,250,0.2)' : '1px solid transparent',
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grille de projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group rounded-[12px] p-6 transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(26,31,53,0.5)',
                backdropFilter: 'blur(16px)',
                border: project.featured
                  ? '1px solid rgba(96,165,250,0.2)'
                  : '1px solid rgba(96,165,250,0.06)',
              }}
            >
              {/* Header carte */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <Star size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  )}
                  <h3 className="text-base font-bold" style={{ color: '#f8fafc' }}>
                    {project.name}
                  </h3>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-md"
                  style={{
                    background: `${statusConfig[project.status].color}15`,
                    color: statusConfig[project.status].color,
                  }}
                >
                  {statusConfig[project.status].label}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#94a3b8' }}>
                {project.description}
              </p>

              {/* Tags tech */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-md font-mono"
                    style={{
                      background: 'rgba(96,165,250,0.06)',
                      color: '#60a5fa',
                      border: '1px solid rgba(96,165,250,0.08)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Liens */}
              <div className="flex gap-3">
                {project.github && (
                  
                  <a  href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: '#475569' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                  >
                    <Github size={14} /> Code source
                  </a>
                )}
                {project.demo && (
                  
                  <a  href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: '#475569' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                  >
                    <ExternalLink size={14} /> Démo live
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}