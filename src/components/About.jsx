import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useInView from '../hooks/useInView'
import { Briefcase, GraduationCap, Cpu, Code, Users, MapPin, ChevronDown, ChevronUp } from 'lucide-react'

const stats = [
  { icon: Briefcase, value: '3+', label: "Ans d'expérience" },
  { icon: Code, value: '5+', label: 'Projets livrés' },
  { icon: Cpu, value: '15+', label: 'Technologies' },
  { icon: Users, value: '3', label: 'Entreprises' },
]

export default function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const [bioExpanded, setBioExpanded] = useState(false)

  return (
    <section id="about" aria-label="Section à propos" className="py-24 px-6" ref={ref}>
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
            À propos de Moi
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
            {/* Partie visible */}
            <p className="leading-relaxed" style={{ color: '#94a3b8', fontSize: 15 }}>
              Je suis Maurice MONEMOU, originaire de la République de Guinée, résidant actuellement à Casablanca.<br />
              Je suis un jeune venu de loin, doté d'une force pour braver les épreuves et d'une curiosité insatiable. 
              Je suis conscient de mes défauts et mes imperfections, mais je m'appuie sur mes erreurs pour mieux me perfectionner.
              Et ma devise le montre clairement:{' '}<span style={{ color: '#60a5fa', fontWeight: 800 }}>Travail • Constance • Amélioration</span>.<br />
              Mon objectif est de consolider mes connaissances et d'aiguiser mon esprit pour mieux répondre aux défis technologiques de notre ère 
              et d'apporter ma pierre à l'édifice pour rendre le monde meilleur. C'est avec cette volonté d'apprendre 
              et de me surpasser que j'ai découvert le domaine des NTIC, dont je ne peux plus me passer.
            </p>

            {/* Partie cachée */}
            <AnimatePresence>
              {bioExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden space-y-5"
                >
                  <p className="leading-relaxed" style={{ color: '#94a3b8', fontSize: 15 }}>
                    Tout commence dans mon pays, la Guinée. Entre mes 8 et 10 ans, je découvre pendant mes jeux que je peux bricoler 
                    de vieilles carcasses de radios, ou tout autre appareil contenant des fils et des composants électroniques. 
                    Bien sûr, à l'époque, je ne sais pas exactement ce que c'est un composant électronique !<br /> Avec mes copains, ce qui 
                    nous intéresse, ce sont les effets produits lorsqu'on assemble ces composants et ces fils, <br /> 
                    Et qu'on fabrique des voiturettes et plein d'autres jeux, bref, tout ce qui nous passe par la tête tant que ça nous amuse, 
                    et toutes ces choses me plaisent beaucoup et m'intrigues. <br />
                    Comme je vous l'ai dit plus haut je suis de nature curieuse, prêt à tout pour comprendre ce 
                    que mon cerveau n'arrive pas à interpréter. <br />
                    C'est à partir de ces jeux que je commence à poser des questions à mes grands frères, 
                    à mes professeurs surtout lors des cours de physique, de chimie ou de mathématiques. <br />
                    Je découvre alors qu'il existe des métiers consacrés à ce qui n'était pour moi qu'un jeu. 
                    Je suis captivé : je veux tout de suite connaître les études qui permettent d'exercer ces professions. <br />
                    Vous vous direz sûrement mais en quoi est-ce que tout cela sont lié au métier de développeur Web ou de l'IT ? <br />
                    C'est simple : j'ai une formation atypique, forgée par la pratique et la curiosité. 
                    Mon parcours et mon histoire sont celle d'un jeune enfant fasciné par la Technologie,
                    et qui en a fait sa passion. Aujourd'hui je suis professionnel de la Tech, et je garde toujours les mêmes motivations 
                    pour l'apprentissage et l'amélioration continue de mes compétences. <br />
                    Et peut-être qu'un jour, nous aurons l'occasion pour que puisse vous raconter la suite de mon histoire !
                  </p>
                  <p className="leading-relaxed" style={{ color: '#94a3b8', fontSize: 15 }}>
                    Alors voilà un peu qui je suis. C'est l'histoire d'un enfant devenu adulte 
                    aujourd'hui avec la même motivation d'apprendre, 
                    et cette histoire suit son cours car je suis toujours en quête d'amélioration continue.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bouton Lire la suite / Réduire */}
            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#93c5fd'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#60a5fa'}
            >
              {bioExpanded ? (
                <>Réduire <ChevronUp size={16} /></>
              ) : (
                <>Lire la suite <ChevronDown size={16} /></>
              )}
            </button>

            <p className="leading-relaxed" style={{ color: '#94a3b8', fontSize: 15 }}>
              J'ai débuté mon parcours dans la maintenance informatique chez ApproTECH, 
              avant de poursuivre avec un BTS en Télécoms (Informatique Industrielle){' '}
              à l'École Nationale des Postes et Télécommunications de Kipé à Conakry/Guinée,{' '}
              puis suivi par un DTS en Développement Digital (Full Stack) au Complexe de Formation dans les Métiers{' '}
              des Nouvelles Technologies de l'Information, de l'Offshoring et de l'Électronique à Oujda/Maroc.
            </p>

            <p className="leading-relaxed" style={{ color: '#e2e8f0', fontSize: 15 }}>
              J'interviens actuellement en tant que prestataire freelance chez{' '}<span style={{ color: '#60a5fa', fontWeight: 600 }}>EXCELSA</span>{' '}
              occupant la fonction de {' '}<span style={{ color: '#60a5fa', fontWeight: 600 }}>Responsable IT / Développeur web.</span> <br />
              Mon quotidien, c'est un peu l'art de jongler entre plusieurs mondes : le matin je peux 
              être en train de suivre un cours à la faculté des sciences de U.Hassan 2 de Casablanca{' '}
              ou en train de résoudre un incident réseau et l'après-midi me retrouver à implémenter de nouvelles fonctionnalités et vice versa. <br />
              Ce mélange entre être <span style={{ color: '#f8fafc', fontWeight: 600 }}>Responsable IT</span>, ou être{' '}
              <span style={{ color: '#f8fafc', fontWeight: 600 }}>Développeur web</span> ou encore faire de la{' '}
              <span style={{ color: '#f8fafc', fontWeight: 600 }}>Maintenance</span>,
              n'est pas le fruit du hasard, c'est le reflet d'un parcours qui m'a exposé tant 
              aux infrastructures systèmes qu'aux codes et à l'électronique et le Réseau.
            </p>

            <p className="leading-relaxed" style={{ color: '#94a3b8', fontSize: 15 }}>
              Aujourd'hui, le projet phare que je dirige est le projet{' '}
              <span style={{ color: '#60a5fa', fontWeight: 600 }}>EXCELSA-RH</span>. <br /> C'est une plateforme
              web sur mesure, conçu pour faciliter la gestion des ressources humaines de l'entreprise. <br /> Je conçois cette solution intégralement
              en interne avec Laravel 12, PHP 8.2, Tailwind CSS, Alpine.js, MySQL et Docker.
            </p>

            {/* Disponibilité */}
            <div className="flex items-center gap-3 pt-3">
              <span style={{ color: '#60a5fa', fontSize: 16 }}>Adresse</span>
              <MapPin size={16} style={{ color: '#60a5fa' }} />:
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
                Mes domaines de compétence
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
                      <p className="text-xs" style={{ color: '#7a8ba8' }}>{item.detail}</p>
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
                  <p className="text-xs" style={{ color: '#7a8ba8' }}>{stat.label}</p>
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
                Une Plateforme web sur mesure, conçu pour faciliter la gestion des ressources humaines
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

          <p className="mt-4 text-sm leading-relaxed" style={{ color: '#7a8ba8' }}>
            Gestion complète des employés, workflows RH — conçu et développé en autonomie.
          </p>
        </motion.div>
      </div>
    </section>
  )
}