import { jsPDF } from 'jspdf'

export default function generateCV() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210
  const margin = 15
  const contentW = W - margin * 2
  let y = 15

  // Couleurs
  const blue = [59, 130, 246]
  const dark = [26, 26, 26]
  const gray = [100, 100, 100]
  const lightGray = [200, 200, 200]

  // --- FONCTIONS UTILITAIRES ---
  function addTitle(text) {
    y += 4
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...blue)
    doc.text(text, margin, y)
    y += 1.5
    doc.setDrawColor(...lightGray)
    doc.setLineWidth(0.3)
    doc.line(margin, y, W - margin, y)
    y += 6
  }

  function addText(text, options = {}) {
    const { bold = false, color = dark, size = 10, indent = 0 } = options
    doc.setFontSize(size)
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, contentW - indent)
    if (y + lines.length * 4.5 > 280) {
      doc.addPage()
      y = 15
    }
    doc.text(lines, margin + indent, y)
    y += lines.length * 4.5
  }

  function addExperience(poste, entreprise, periode, missions) {
    if (y > 260) { doc.addPage(); y = 15 }
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...dark)
    doc.text(poste, margin, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...gray)
    doc.text(periode, W - margin, y, { align: 'right' })
    y += 4.5
    doc.setFontSize(10)
    doc.setTextColor(...blue)
    doc.text(entreprise, margin, y)
    y += 5
    missions.forEach((m) => {
      doc.setFontSize(9)
      doc.setTextColor(...gray)
      doc.text('•', margin + 2, y)
      const lines = doc.splitTextToSize(m, contentW - 8)
      doc.text(lines, margin + 7, y)
      y += lines.length * 4
    })
    y += 3
  }

  function addFormation(diplome, detail, etablissement, periode) {
    if (y > 265) { doc.addPage(); y = 15 }
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...dark)
    doc.text(diplome, margin, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...gray)
    doc.text(periode, W - margin, y, { align: 'right' })
    y += 4
    if (detail) {
      doc.setTextColor(...blue)
      doc.text(detail, margin, y)
      y += 4
    }
    doc.setTextColor(...gray)
    doc.text(etablissement, margin, y)
    y += 6
  }

  // === EN-TÊTE ===
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...dark)
  doc.text('Maurice MONEMOU', W / 2, y, { align: 'center' })
  y += 7

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...blue)
  doc.text('Développeur Web Full Stack · Technicien Télécom', W / 2, y, { align: 'center' })
  y += 6

  doc.setFontSize(9)
  doc.setTextColor(...gray)
  doc.text('Casablanca, Sidi Maarouf · +212 774 423 910 · Mauriceph1997monemou@gmail.com', W / 2, y, { align: 'center' })
  y += 4
  doc.text('linkedin.com/in/maurice-ph-monèmou-585b55289 · github.com/MauricePHMonemou', W / 2, y, { align: 'center' })
  y += 3

  // Ligne séparatrice
  doc.setDrawColor(...blue)
  doc.setLineWidth(0.8)
  doc.line(margin, y, W - margin, y)
  y += 4

  // === EXPÉRIENCES ===
  addTitle('EXPÉRIENCES PROFESSIONNELLES')

  addExperience(
    'Responsable IT',
    'Société EXCELSA — Casablanca',
    '2025 — Actuel',
    [
      'Pilotage du projet EXCELSA-RH (Laravel 12, PHP 8.2, Tailwind CSS, Alpine.js, MySQL, Docker)',
      'Conception et développement full-stack en autonomie complète',
      'Gestion du système d\'information de l\'entreprise',
    ]
  )

  addExperience(
    'Conseiller Clientèle',
    'Ikanbi (compte Proximus) — Casablanca',
    '10/2024 — 2025',
    [
      'Réception d\'appels pour la société belge de télécommunications Proximus',
      'Gestion clientèle et résolution de problèmes techniques',
    ]
  )

  addExperience(
    'Stagiaire Développeur Web',
    'ENCG Oujda — Service informatique',
    '02/2024 — 03/2024',
    [
      'Conception d\'une application de réclamation de notes des étudiants',
      'Développement complet de la conception au déploiement',
    ]
  )

  addExperience(
    'Assistant Maintenance Informatique',
    'EST-BONIFACE — Guinée',
    '05/2019 — 07/2022',
    [
      'Maintenance d\'outils informatiques matériels et logiciels',
    ]
  )

  // === FORMATION ===
  addTitle('FORMATION')

  addFormation(
    'DTS Développement Digital',
    'Option Full Stack',
    'Complexe de Formation NTO — Oujda, Maroc',
    '09/2022 — 06/2024'
  )
  addFormation(
    'BTS Télécom',
    'Option Informatique Industrielle',
    'Institut de formation — Guinée',
    '10/2019 — 07/2022'
  )
  addFormation(
    'Baccalauréat Sciences Mathématiques',
    'Mention Assez Bien',
    'Lycée de Yomou — Guinée',
    '10/2019 — 07/2020'
  )
  addFormation(
    'Attestation Maintenance Informatique',
    null,
    'ApproTECH — Guinée',
    '09/2015 — 09/2018'
  )

  // === COMPÉTENCES ===
  addTitle('COMPÉTENCES TECHNIQUES')

  addText('Développement Web : HTML5, CSS3, JavaScript (ES6+), PHP 8.2, Laravel 12, React, Alpine.js 3, Blade, Tailwind CSS 3, REST API', { bold: false, size: 9, color: dark })
  addText('Base de données : MySQL, SQL Avancé, NoSQL', { size: 9, color: dark })
  addText('DevOps / Infra : Docker, Git/GitHub, Vite, XAMPP, Laravel Sail', { size: 9, color: dark })
  addText('Télécom / Embarqué : Électronique (Puissance, Numérique, Analogique), Automatisme, GrafCet, C++, Python, Arduino', { size: 9, color: dark })
  addText('Gestion de projet : Agile (Scrum), Traditionnelle (Cycle en V)', { size: 9, color: dark })

  // === LANGUES ===
  addTitle('LANGUES')
  addText('Guerzé : Langue maternelle · Français : Courant (professionnel) · Anglais : Débutant (en progression)', { size: 9, color: dark })

  // === CENTRES D'INTÉRÊT ===
  addTitle("CENTRES D'INTÉRÊT")
  addText('Scout Routier depuis 2009 · Membre de l\'Union des Défendeurs de la Nature en Guinée · Collecte de fonds pour les enfants migrants (Oujda, 2023) · Passion pour la Science et la lecture · Activités associatives', { size: 9, color: dark })

  // === TÉLÉCHARGEMENT ===
  doc.save('CV_Maurice_MONEMOU.pdf')
}