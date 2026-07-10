import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'
import emailjs from '@emailjs/browser'
import generateCV from '../utils/generateCV'
import { Send, Github, Linkedin, Mail, Download, Phone } from 'lucide-react'

const WhatsAppIcon = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE
const EMAILJS_KEY = import.meta.env.VITE_EMAILJS_KEY

export default function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.05 })
  const formRef = useRef(null)
  const [formData, setFormData] = useState({ from_name: '', from_email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot anti-bot : ce champ est invisible pour les humains. S'il est
    // rempli, c'est un bot → on abandonne silencieusement sans envoyer de mail.
    if (formRef.current?._gotcha?.value) return

    setLoading(true)
    setStatus(null)

    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, EMAILJS_KEY)
      setStatus('success')
      setFormData({ from_name: '', from_email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    } finally {
      setLoading(false)
      setTimeout(() => setStatus(null), 5000)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid rgba(96,165,250,0.3)',
    background: 'rgba(10,14,26,0.5)',
    color: '#e2e8f0',
    fontSize: 14,
    fontFamily: "'Space Grotesk', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  return (
    <section id="contact" aria-label="Section contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[3px] uppercase mb-4" style={{ color: '#94a3b8' }}>
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f8fafc' }}>
            Travaillons ensemble<span style={{ color: '#60a5fa' }}>.</span>
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: '#7a8ba8' }}>
            Pour une question, une opportunité ou simplement envie d'échanger ? N'hésitez pas à me contacter.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Formulaire — 3 colonnes */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-4"
          >
            {/* Honeypot anti-bot — invisible pour les humains, souvent rempli par les bots */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="from_name"
                placeholder="Votre nom"
                required
                value={formData.from_name}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.55)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.3)'}
              />
              <input
                type="email"
                name="from_email"
                placeholder="Votre email"
                required
                value={formData.from_email}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.55)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.3)'}
              />
            </div>

            <label htmlFor="subject" className="sr-only">Sujet du message</label>
            <select
              id='subject'
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.55)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.3)'}
            >
              <option value="" style={{ background: '#0a0e1a' }}>Sujet du message</option>
              <option value="Opportunité d'emploi" style={{ background: '#0a0e1a' }}>Opportunité d'emploi</option>
              <option value="Mission freelance" style={{ background: '#0a0e1a' }}>Mission freelance</option>
              <option value="Collaboration" style={{ background: '#0a0e1a' }}>Collaboration</option>
              <option value="Autre" style={{ background: '#0a0e1a' }}>Autre</option>
            </select>

            <textarea
              name="message"
              placeholder="Votre message..."
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.55)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.3)'}
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-[10px] font-semibold text-sm text-white transition-all"
              style={{
                background: loading
                  ? 'rgba(59,130,246,0.5)'
                  : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => { if (!loading) e.target.style.boxShadow = '0 6px 28px rgba(59,130,246,0.45)' }}
              onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 20px rgba(59,130,246,0.3)'}
            >
              <Send size={16} />
              {loading ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-center" style={{ color: '#34d399' }}>
                Message envoyé avec succès ! Je vous répondrai rapidement.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-center" style={{ color: '#ef4444' }}>
                Erreur lors de l'envoi. Veuillez réessayer ou me contacter par email.
              </p>
            )}
          </motion.form>

          {/* Infos de contact — 2 colonnes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 space-y-5"
          >
            <div
              className="rounded-[12px] p-5 space-y-4"
              style={{
                background: 'rgba(26,31,53,0.5)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(96,165,250,0.08)',
              }}
            >
              <p className="text-xs font-semibold tracking-[2px] uppercase" style={{ color: '#60a5fa' }}>
                Retrouver Moi Sur:
              </p>

              {[
                {
                  icon: Mail,
                  label: 'Mauriceph1997monemou@gmail.com',
                  href: 'mailto:Mauriceph1997monemou@gmail.com',
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/maurice-ph-mon%C3%A8mou-585b55289/',
                },
                {
                  icon: Github,
                  label: 'GitHub',
                  href: 'https://github.com/MauricePHMonemou',
                },
              ].map((link, i) => (
                
                <a key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: 'rgba(96,165,250,0.08)' }}
                  >
                    <link.icon size={16} style={{ color: '#60a5fa' }} />
                  </div>
                  <span
                    className="text-sm transition-colors"
                    style={{ color: '#94a3b8' }}
                    onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            
            <button
              onClick={generateCV}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-[10px] font-semibold text-sm transition-colors"
              style={{
                border: '1px solid rgba(96,165,250,0.2)',
                background: 'rgba(96,165,250,0.06)',
                color: '#60a5fa',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(96,165,250,0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(96,165,250,0.06)'}
            >
              <Download size={16} /> Télécharger mon CV
            </button>

            <div className="space-y-3">
              <a
                href="tel:+212774423910"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg" style={{ background: 'rgba(96,165,250,0.08)' }}>
                  <Phone size={16} style={{ color: '#60a5fa' }} />
                </div>
                <span
                  className="text-sm transition-colors"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  +212 774 423 910
                </span>
              </a>

              <a
                href="https://wa.me/212774423910"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg" style={{ background: 'rgba(37,211,102,0.08)' }}>
                  <WhatsAppIcon size={16} style={{ color: '#25d366' }} />
                </div>
                <span
                  className="text-sm transition-colors"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => e.target.style.color = '#25d366'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  +212 774 423 910
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}