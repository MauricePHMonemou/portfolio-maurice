import { motion } from 'framer-motion'
import generateCV from '../utils/generateCV'

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center"
    >
      {/* Badge Disponible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
        style={{
          background: 'rgba(52,211,153,0.08)',
          border: '1px solid rgba(52,211,153,0.15)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: '#34d399',
            boxShadow: '0 0 8px rgba(52,211,153,0.5)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <span style={{ color: '#34d399', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em' }}>
          Disponible
        </span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3"
        style={{ color: '#f8fafc' }}
      >
        Maurice MONEMOU<span style={{ color: '#60a5fa' }}>.</span>
      </motion.h1>

      {/* Sous-titre */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-lg md:text-xl mb-2"
        style={{ color: '#94a3b8' }}
      >
        Responsable IT · Développeur Web Full Stack
      </motion.p>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-sm max-w-md leading-relaxed mb-8"
        style={{ color: '#475569' }}
      >
        Triple compétence IT · Web · Télécom — Basé à Casablanca
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        
        <a href="#projects"
          className="px-7 py-3 rounded-[10px] font-semibold text-sm text-white transition-shadow"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
          }}
          onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 28px rgba(59,130,246,0.45)'}
          onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 20px rgba(59,130,246,0.3)'}
        >
          Voir mes projets
        </a>
        
        <button
          onClick={generateCV}
          className="px-7 py-3 rounded-[10px] font-semibold text-sm transition-colors"
          style={{
            border: '1px solid rgba(96,165,250,0.25)',
            background: 'rgba(96,165,250,0.06)',
            color: '#60a5fa',
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(96,165,250,0.12)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(96,165,250,0.06)'}
        >
          Télécharger mon CV
        </button>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </section>
  )
}