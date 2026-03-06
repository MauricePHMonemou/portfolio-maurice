import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'
import { GraduationCap } from 'lucide-react'
import formation from '../data/formation'

export default function Formation() {
  const [ref, isInView] = useInView({ threshold: 0.05 })

  return (
    <section id="formation" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[3px] uppercase mb-4" style={{ color: '#94a3b8' }}>
            Formation
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f8fafc' }}>
            Parcours académique<span style={{ color: '#60a5fa' }}>.</span>
          </h2>
        </motion.div>

        {/* Grille formations */}
        <div className="grid md:grid-cols-2 gap-5">
          {formation.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="rounded-[12px] p-5"
              style={{
                background: 'rgba(26,31,53,0.5)',
                backdropFilter: 'blur(16px)',
                border: i === 0
                  ? '1px solid rgba(96,165,250,0.15)'
                  : '1px solid rgba(96,165,250,0.06)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-2.5 rounded-lg mt-0.5 flex-shrink-0"
                  style={{ background: 'rgba(96,165,250,0.08)' }}
                >
                  <GraduationCap size={20} style={{ color: '#60a5fa' }} />
                </div>
                <div>
                  <span className="text-xs font-mono" style={{ color: '#60a5fa' }}>
                    {f.periode}
                  </span>
                  <h3 className="text-base font-bold mt-1" style={{ color: '#f8fafc' }}>
                    {f.diplome}
                  </h3>
                  {f.option && (
                    <p className="text-sm mt-0.5" style={{ color: '#94a3b8' }}>
                      {f.option}
                    </p>
                  )}
                  <p className="text-sm mt-2" style={{ color: '#475569' }}>
                    {f.etablissement} — {f.lieu}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}