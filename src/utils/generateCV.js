import { jsPDF } from 'jspdf'
import profileImg from '../assets/images/profile.jpeg'

export default async function generateCV() {
  // Chargement de la photo en base64
  let profileBase64 = null
  try {
    const response = await fetch(profileImg)
    const blob = await response.blob()
    profileBase64 = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
  } catch (e) {
    profileBase64 = null
  }
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210
  const H = 297

  // Layout
  const sideW = 80
  const sideMargin = 8
  const contentW = sideW - sideMargin * 2   // 64mm
  const mainX = sideW + 5
  const mainW = W - mainX - 5

  // Couleurs
  const blue = [37, 99, 235]
  const dark = [26, 26, 26]
  const gray = [110, 110, 110]
  const lightGray = [210, 215, 220]
  const sidebarBg = [241, 245, 249]

  let yL = 10
  let yR = 10

  const LH10 = 4.8
  const LH11 = 5.2

  // ─────────────────────────────────────
  // FOND SIDEBAR
  // ─────────────────────────────────────
  function drawSidebar() {
    doc.setFillColor(...sidebarBg)
    doc.rect(0, 0, sideW, H, 'F')
    doc.setDrawColor(...lightGray)
    doc.setLineWidth(0.4)
    doc.line(sideW, 0, sideW, H)
  }
  drawSidebar()

  function checkPageBreak(needed = 25) {
    if (yR + needed > 285) {
      doc.addPage()
      drawSidebar()
      yR = 10
    }
  }

  // ─────────────────────────────────────
  // ICÔNES CONTACT (dessinées avec jsPDF)
  // ─────────────────────────────────────
  function drawIcon(type, x, y) {
    // x = bord gauche de la zone icône (4mm de large)
    // y = baseline du texte 10pt
    const cx = x + 2.2        // centre horizontal de l'icône
    const iy = y - 2.0        // centre vertical de l'icône (au-dessus de la baseline)
    const sz = 1.3            // unité de taille de base

    doc.setFillColor(...blue)
    doc.setDrawColor(...blue)
    doc.setLineWidth(0.3)

    if (type === 'location') {
      // Cercle (tête de l'épingle)
      doc.circle(cx, iy - sz * 0.4, sz, 'F')
      // Trou blanc au centre
      doc.setFillColor(255, 255, 255)
      doc.circle(cx, iy - sz * 0.4, sz * 0.38, 'F')
      doc.setFillColor(...blue)
      // Triangle pointant vers le bas (corps de l'épingle)
      // Sommets : gauche=(cx-sz*0.85, iy+sz*0.5), droite=(cx+sz*0.85, iy+sz*0.5), pointe=(cx, iy+sz*2.0)
      doc.lines(
        [[sz * 1.7, 0], [-sz * 0.85, sz * 1.5]],
        cx - sz * 0.85, iy + sz * 0.5,
        [1, 1], 'F', true
      )

    } else if (type === 'phone') {
      // Corps du téléphone (rectangle arrondi)
      doc.roundedRect(cx - sz * 0.75, iy - sz * 1.9, sz * 1.5, sz * 3.0, sz * 0.35, sz * 0.35, 'F')
      // Écran blanc
      doc.setFillColor(255, 255, 255)
      doc.rect(cx - sz * 0.48, iy - sz * 1.5, sz * 0.96, sz * 1.8, 'F')
      // Bouton home (point blanc en bas)
      doc.circle(cx, iy + sz * 0.85, sz * 0.2, 'F')
      doc.setFillColor(...blue)

    } else if (type === 'email') {
      // Enveloppe remplie
      doc.rect(cx - sz * 1.3, iy - sz * 1.1, sz * 2.6, sz * 1.9, 'F')
      // Lignes blanches du rabat (V inversé)
      doc.setDrawColor(255, 255, 255)
      doc.setLineWidth(0.55)
      doc.line(cx - sz * 1.3, iy - sz * 1.1, cx, iy - sz * 0.05)
      doc.line(cx, iy - sz * 0.05, cx + sz * 1.3, iy - sz * 1.1)
      doc.setDrawColor(...blue)
      doc.setLineWidth(0.3)

    } else if (type === 'linkedin') {
      // Carré bleu arrondi
      doc.roundedRect(cx - sz * 1.1, iy - sz * 1.5, sz * 2.2, sz * 2.4, sz * 0.3, sz * 0.3, 'F')
      // Texte "in" blanc
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text('in', cx - sz * 0.55, iy + sz * 0.75)
      // Réinitialiser la couleur du texte
      doc.setTextColor(...gray)

    } else if (type === 'github') {
      // Cercle principal (tête)
      doc.circle(cx, iy - sz * 0.6, sz * 1.25, 'F')
      // Zone blanche intérieure
      doc.setFillColor(255, 255, 255)
      doc.circle(cx, iy - sz * 0.8, sz * 0.65, 'F')
      // Oreilles bleues
      doc.setFillColor(...blue)
      doc.circle(cx - sz * 0.6, iy - sz * 1.55, sz * 0.3, 'F')
      doc.circle(cx + sz * 0.6, iy - sz * 1.55, sz * 0.3, 'F')
      // Tentacules blancs en bas
      doc.setDrawColor(255, 255, 255)
      doc.setLineWidth(0.42)
      doc.line(cx - sz * 0.5, iy + sz * 0.5, cx - sz * 0.5, iy + sz * 0.85)
      doc.line(cx, iy + sz * 0.6, cx, iy + sz * 0.95)
      doc.line(cx + sz * 0.5, iy + sz * 0.5, cx + sz * 0.5, iy + sz * 0.85)
      doc.setDrawColor(...blue)
      doc.setLineWidth(0.3)
    }

    // Remise à zéro des couleurs
    doc.setFillColor(...blue)
    doc.setTextColor(...dark)
    doc.setFont('helvetica', 'normal')
  }

  // ─────────────────────────────────────
  // HELPERS COLONNE GAUCHE
  // ─────────────────────────────────────

  function sideSection(title) {
    yL += 5
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...blue)
    doc.text(title.toUpperCase(), sideMargin, yL)
    yL += 2
    doc.setDrawColor(...blue)
    doc.setLineWidth(0.3)
    doc.line(sideMargin, yL, sideW - sideMargin, yL)
    yL += 4
  }

  function sideText(text, { bold = false, color = dark, bullet = false } = {}) {
    doc.setFontSize(10)
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
    doc.setTextColor(...color)
    const indent = bullet ? 5 : 0
    if (bullet) doc.text('-', sideMargin + 1, yL)
    const lines = doc.splitTextToSize(text, contentW - indent)
    doc.text(lines, sideMargin + indent, yL)
    yL += lines.length * LH10
  }

  function sideSubtitle(text) {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...dark)
    doc.text(text, sideMargin, yL)
    yL += LH10 + 0.5
  }

  // Contact avec icône dessinée
  function sideContact(value, iconType) {
    drawIcon(iconType, sideMargin, yL)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...gray)
    const iconIndent = 6   // 6mm pour laisser la place à l'icône (4mm) + gap
    const lines = doc.splitTextToSize(value, contentW - iconIndent)
    doc.text(lines, sideMargin + iconIndent, yL)
    yL += lines.length * LH10 + 1
  }

  function sideLang(lang, level) {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...dark)
    doc.text(lang + ' :', sideMargin, yL)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...gray)
    const lines = doc.splitTextToSize(level, contentW - 25)
    doc.text(lines, sideMargin + 25, yL)
    yL += Math.max(lines.length, 1) * LH10 + 0.5
  }

  // ─────────────────────────────────────
  // HELPERS COLONNE DROITE
  // ─────────────────────────────────────

  function mainSection(title) {
    yR += 4
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...blue)
    doc.text(title.toUpperCase(), mainX, yR)
    yR += 2
    doc.setDrawColor(...lightGray)
    doc.setLineWidth(0.3)
    doc.line(mainX, yR, W - 5, yR)
    yR += 5
  }

  function addExperience(poste, entreprise, periode, missions) {
    checkPageBreak(22)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...dark)
    const pLines = doc.splitTextToSize(poste, mainW - 32)
    doc.text(pLines, mainX, yR)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...gray)
    doc.text(periode, W - 5, yR, { align: 'right' })
    yR += pLines.length * LH11
    doc.setFontSize(10)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(...blue)
    const eLines = doc.splitTextToSize(entreprise, mainW - 20)
    doc.text(eLines, mainX, yR)
    yR += eLines.length * LH10 + 1.5
    doc.setFont('helvetica', 'normal')
    missions.forEach((m) => {
      doc.setFontSize(11)
      doc.setTextColor(...gray)
      doc.text('\u2022', mainX + 1.5, yR)
      const lines = doc.splitTextToSize(m, mainW - 7)
      doc.text(lines, mainX + 6, yR)
      yR += lines.length * LH11
    })
    yR += 3
  }

  function addFormation(diplome, detail, etablissement, periode) {
    checkPageBreak(18)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...dark)
    const dLines = doc.splitTextToSize(diplome, mainW - 32)
    doc.text(dLines, mainX, yR)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...gray)
    doc.text(periode, W - 5, yR, { align: 'right' })
    yR += dLines.length * LH11
    if (detail) {
      doc.setFontSize(10)
      doc.setTextColor(...blue)
      doc.text(detail, mainX, yR)
      yR += LH10
    }
    doc.setFontSize(10)
    doc.setTextColor(...gray)
    const eLines = doc.splitTextToSize(etablissement, mainW)
    doc.text(eLines, mainX, yR)
    yR += eLines.length * LH10 + 3
  }

  // ══════════════════════════════════════
  // COLONNE GAUCHE
  // ══════════════════════════════════════

  // Photo
  const photoW = 46
  const photoH = 52
  const photoX = sideMargin + (contentW - photoW) / 2   // centré horizontalement
  if (profileBase64) {
    doc.addImage(profileBase64, 'JPEG', photoX, yL, photoW, photoH)
    // Bordure fine autour de la photo
    doc.setDrawColor(...lightGray)
    doc.setLineWidth(0.4)
    doc.rect(photoX, yL, photoW, photoH, 'S')
  } else {
    // Fallback si la photo ne charge pas
    doc.setFillColor(220, 225, 230)
    doc.setDrawColor(...lightGray)
    doc.setLineWidth(0.3)
    doc.rect(photoX, yL, photoW, photoH, 'FD')
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...gray)
    doc.text('Photo', sideW / 2, yL + photoH / 2, { align: 'center' })
  }
  yL += photoH + 4

  // Nom
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...dark)
  const nameLines = doc.splitTextToSize('Maurice MONEMOU', contentW)
  doc.text(nameLines, sideMargin, yL)
  yL += nameLines.length * 6

  // Titre
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...blue)
  const tLines = doc.splitTextToSize('Développeur Web Full Stack | Technicien Télécom', contentW)
  doc.text(tLines, sideMargin, yL)
  yL += tLines.length * LH10 + 2

  // CONTACT (avec icônes)
  sideSection('Contact')
  sideContact('Casablanca, Sidi Maarouf — Maroc', 'location')
  sideContact('+212 774 423 910', 'phone')
  sideContact('Mauriceph1997monemou@gmail.com', 'email')
  sideContact('linkedin.com/in/maurice-ph-monemou', 'linkedin')
  sideContact('github.com/MauricePHMonemou', 'github')

  // COMPÉTENCES TECHNIQUES
  sideSection('Compétences Techniques')

  sideSubtitle('Développement Web :')
  const skillsWeb = [
    'HTML5, CSS3, JS (ES6+)',
    'PHP 8.2, Laravel 12, Blade',
    'React, Alpine.js 3, Tailwind CSS',
    'MySQL, SQL avancé, NoSQL',
    'Docker, Git/GitHub, Vite',
  ]
  skillsWeb.forEach((item) => { sideText(item, { bullet: true }) })

  yL += 2
  sideSubtitle('Télécom / Embarqué :')
  const skillsTelecom = [
    'Électronique (Puissance, Num., Ana.)',
    'Automatisme, GrafCet',
    'C++, Python, Arduino',
  ]
  skillsTelecom.forEach((item) => { sideText(item, { bullet: true }) })

  yL += 2
  sideSubtitle('Gestion de projet :')
  const skillsGestion = ['Agile (Scrum)', 'Traditionnelle (Cycle en V)']
  skillsGestion.forEach((item) => { sideText(item, { bullet: true }) })

  // COMPÉTENCES COMPORTEMENTALES
  sideSection('Comp. Comportementales')
  const softSkills = [
    "Travail d'équipe",
    'Gestion du stress',
    "Sens de l'écoute",
    'Créatif',
    'Curieux',
    'Social et Sociable',
  ]
  softSkills.forEach((item) => { sideText(item, { bullet: true }) })

  // LANGUES
  sideSection('Langues')
  sideLang('Guerzé', 'Langue maternelle')
  sideLang('Français', 'Courant (professionnel)')
  sideLang('Anglais', 'Débutant')

  // ══════════════════════════════════════
  // COLONNE DROITE
  // ══════════════════════════════════════

  yR = 12

  // En-tête
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...dark)
  doc.text('Maurice MONEMOU', mainX, yR)
  yR += 7

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...blue)
  const subLines = doc.splitTextToSize(
    'Développeur WEB Full Stack  |  Technicien Télécom : Informatique Industrielle',
    mainW
  )
  doc.text(subLines, mainX, yR)
  yR += subLines.length * LH11

  doc.setDrawColor(...blue)
  doc.setLineWidth(0.6)
  doc.line(mainX, yR, W - 5, yR)
  yR += 2

  // EXPÉRIENCES
  mainSection('Expériences Professionnelles et Stage')

  addExperience(
    'Responsable IT / Développeur Web (Freelance)',
    'Société EXCELSA — Casablanca, Maroc',
    '2025 — Actuel',
    [
      'Pilotage du projet EXCELSA-RH : plateforme RH sur mesure (Laravel 12, PHP 8.2, Tailwind CSS, Alpine.js, MySQL, Docker)',
      "Gestion du système d'information et développement full-stack en autonomie complète",
    ]
  )
  addExperience(
    'Conseiller Clientèle',
    'Ikanbi (compte Proximus) — Casablanca, Maroc',
    '10/2024 — 08/2025',
    [
      "Réception d'appels pour la société belge de télécommunications Proximus",
    ]
  )
  addExperience(
    'Stagiaire Développeur Web',
    'ENCG Oujda — Service informatique',
    '02/2024 — 03/2024',
    [
      "Conception et développement d'une application de réclamation de notes des étudiants",
    ]
  )
  addExperience(
    'Assistant en Maintenance Informatique',
    'EST-BONIFACE — Guinée',
    '05/2019 — 07/2022',
    [
      "Maintenance d'outils informatiques matériels et logiciels",
    ]
  )

  // FORMATION
  mainSection('Formation')

  addFormation(
    'Licence Fondamentale Développement Informatique',
    '1ère année — En cours',
    'Faculté des Sciences, Université Hassan 2 — Casablanca, Maroc',
    '09/2025 — En cours'
  )
  addFormation(
    'DTS Développement Digital',
    'Option Full Stack',
    'Complexe de Formation MNTIOE — Oujda, Maroc',
    '09/2022 — 06/2024'
  )
  addFormation(
    'BTS Télécom',
    'Option Informatique Industrielle',
    'Institut de formation (ENPT) — Guinée',
    '10/2019 — 07/2022'
  )
  addFormation(
    'Baccalauréat Sciences Mathématiques',
    'Mention Assez Bien',
    'Lycée de Yomou — Guinée',
    '10/2019 — 07/2020'
  )
  addFormation(
    'Attestation en Maintenance Informatique',
    null,
    'ApproTECH — Guinée',
    '09/2015 — 09/2018'
  )

  // CENTRES D'INTÉRÊT
  mainSection("Centres d'Intérêt")
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...gray)
  const intLines = doc.splitTextToSize(
    "Scout Routier depuis 2009 | Collecte de fonds pour enfants migrants a Oujda (2023) | Membre de l'Union des Defenseurs de la Nature en Guinee | Passion pour la Science et la lecture | Activites associatives",
    mainW
  )
  doc.text(intLines, mainX, yR)

  doc.save('CV_Maurice_MONEMOU.pdf')
}
