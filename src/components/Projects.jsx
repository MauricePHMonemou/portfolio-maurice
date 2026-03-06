import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useInView from '../hooks/useInView'
import projects from '../data/projects'
import { ExternalLink, Github, Star, X } from 'lucide-react'

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

function ProjectModal({ project, onClose }) {
  if (!project) return null
  const status = statusConfig[project.status]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg rounded-[16px] p-6 md:p-8 relative"
        style={{
          background: 'rgba(26,31,53,0.95)',
          border: '1px solid rgba(96,165,250,0.15)',
          backdropFilter: 'blur(20px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
          style={{ background: 'rgba(96,165,250,0.06)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(96,165,250,0.15)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(96,165,250,0.06)'}
        >
          <X size={18} style={{ color: '#94a3b8' }} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          {project.featured && <Star size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />}
          <h3 className="text-xl font-bold" style={{ color: '#f8fafc' }}>{project.name}</h3>
        </div>

        <span
          className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-md mb-4"
          style={{ background: `${status.color}15`, color: status.color }}
        >
          {status.label}
        </span>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
          {project.description}
        </p>

        {/* Description longue */}
        {project.longDescription && (
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569' }}>
            {project.longDescription}
          </p>
        )}

        {/* Stack technique */}
        <p className="text-xs font-semibold tracking-[2px] uppercase mb-3" style={{ color: '#60a5fa' }}>
          Stack technique
        </p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-md font-mono"
              style={{
                background: 'rgba(96,165,250,0.08)',
                color: '#60a5fa',
                border: '1px solid rgba(96,165,250,0.12)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Liens */}
        <div className="flex gap-3">
          {project.github && (
            
            <a href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ background: 'rgba(96,165,250,0.08)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.12)' }}
            >
              <Github size={15} /> Code source
            </a>
          )}
          {project.demo && (
            
            <a href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
            >
              <ExternalLink size={15} /> Démo live
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.05 })
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

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
              onClick={() => setSelectedProject(project)}
              className="group rounded-[12px] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(26,31,53,0.5)',
                backdropFilter: 'blur(16px)',
                border: project.featured
                  ? '1px solid rgba(96,165,250,0.2)'
                  : '1px solid rgba(96,165,250,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(96,165,250,0.25)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(59,130,246,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = project.featured ? 'rgba(96,165,250,0.2)' : 'rgba(96,165,250,0.06)'
                e.currentTarget.style.boxShadow = 'none'
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
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.slice(0, 4).map((t) => (
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
                {project.tech.length > 4 && (
                  <span className="text-xs px-2 py-1 rounded-md" style={{ color: '#475569' }}>
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              {/* Indicateur cliquable */}
              <p className="text-xs font-medium" style={{ color: '#475569' }}>
                Cliquer pour voir les détails →
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}