import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'
import emailjs from '@emailjs/browser'
import generateCV from '../utils/generateCV'
import { Send, Github, Linkedin, Mail, Download } from 'lucide-react'

const EMAILJS_SERVICE = 'service_e4lpbvv'
const EMAILJS_TEMPLATE = 'template_46l4a7b'
const EMAILJS_KEY = 'evFpMuwQvSsmrRnO3'

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
    border: '1px solid rgba(96,165,250,0.1)',
    background: 'rgba(10,14,26,0.5)',
    color: '#e2e8f0',
    fontSize: 14,
    fontFamily: "'Space Grotesk', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
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
          <p className="text-sm max-w-md mx-auto" style={{ color: '#475569' }}>
            Une question, une opportunité ou simplement envie d'échanger ? N'hésitez pas.
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
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="from_name"
                placeholder="Votre nom"
                required
                value={formData.from_name}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.4)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.1)'}
              />
              <input
                type="email"
                name="from_email"
                placeholder="Votre email"
                required
                value={formData.from_email}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.4)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.1)'}
              />
            </div>

            <select
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.4)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.1)'}
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
              onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.4)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.1)'}
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
                Me retrouver
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

            <p className="text-sm text-center" style={{ color: '#475569' }}>
              +212 774 423 910
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}