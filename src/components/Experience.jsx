import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'
import { Briefcase } from 'lucide-react'
import experience from '../data/experience'

export default function Experience() {
  const [ref, isInView] = useInView({ threshold: 0.05 })

  return (
    <section id="experience" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[3px] uppercase mb-4" style={{ color: '#94a3b8' }}>
            Parcours
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f8fafc' }}>
            Expérience professionnelle<span style={{ color: '#60a5fa' }}>.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne verticale */}
          <div
            className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'rgba(96,165,250,0.12)' }}
          />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Point sur la timeline */}
              <div
                className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-[15px] h-[15px] rounded-full z-10"
                style={{
                  background: i === 0 ? '#60a5fa' : '#1a1f35',
                  border: `2px solid ${i === 0 ? '#60a5fa' : 'rgba(96,165,250,0.3)'}`,
                  boxShadow: i === 0 ? '0 0 12px rgba(96,165,250,0.4)' : 'none',
                }}
              />

              {/* Carte */}
              <div
                className={`ml-10 md:ml-0 md:w-[calc(50%-32px)] rounded-[12px] p-5 ${
                  i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                }`}
                style={{
                  background: 'rgba(26,31,53,0.5)',
                  backdropFilter: 'blur(16px)',
                  border: i === 0
                    ? '1px solid rgba(96,165,250,0.15)'
                    : '1px solid rgba(96,165,250,0.06)',
                }}
              >
                {/* Période */}
                <span
                  className="text-xs font-mono font-medium"
                  style={{ color: '#60a5fa' }}
                >
                  {exp.periode}
                </span>

                {/* Poste */}
                <h3 className="text-base font-bold mt-1.5 mb-0.5" style={{ color: '#f8fafc' }}>
                  {exp.poste}
                </h3>

                {/* Entreprise + Lieu */}
                <p className="text-sm mb-3" style={{ color: '#94a3b8' }}>
                  {exp.entreprise} — {exp.lieu}
                </p>

                {/* Missions */}
                <div className="space-y-1.5">
                  {exp.missions.map((mission, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: '#60a5fa' }}
                      />
                      <span className="text-sm" style={{ color: '#475569' }}>
                        {mission}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}