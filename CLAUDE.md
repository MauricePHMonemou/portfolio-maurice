# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Vue d'ensemble

Portfolio personnel de Maurice MONEMOU — une SPA (Single Page Application) React mono-page. Le contenu (texte, projets, expériences) est en **français** et doit le rester. Déployé en production sur **Vercel** via git : chaque `git push` sur `main` déclenche un build et un déploiement automatiques (pas de Dockerfile, pas de CI custom — Vercel détecte Vite tout seul).

URL de production : https://portfolio-maurice.vercel.app

## Commandes

```bash
npm install        # Installer les dépendances (après un clone ou un git pull)
npm run dev        # Serveur de dev Vite avec HMR — http://localhost:5173
npm run build      # Build de production dans /dist
npm run preview    # Prévisualise le build de production localement
npm run lint       # ESLint sur tout le projet
```

Il n'y a **pas de tests** dans ce projet (aucun framework de test installé).

## Stack

- **React 19** + **Vite 7** (plugin `@vitejs/plugin-react`, Babel/Fast Refresh)
- **Tailwind CSS v4** via `@tailwindcss/vite` — configuré par `@import "tailwindcss"` dans [src/index.css](src/index.css), **sans** fichier `tailwind.config.js`
- **Framer Motion** pour les animations
- **lucide-react** pour les icônes
- **EmailJS** (`@emailjs/browser`) pour le formulaire de contact
- **jsPDF** pour la génération du CV côté client

## Architecture

### Structure d'une page unique
[src/App.jsx](src/App.jsx) est l'assemblage de toute la page : un `<ConstellationBG />` en fond fixe, la `<Navbar />`, puis les sections empilées dans `<main>` (Hero → About → Skills → Projects → Experience → Formation → Contact), et le `<Footer />`. Ajouter une section = créer le composant, l'importer dans `App.jsx`, et l'ajouter à `SECTION_IDS`.

### Conventions de sections
Chaque section (`src/components/*.jsx`) est une `<section id="...">` autonome dont l'`id` sert d'ancre de navigation. Ces `id` sont référencés à **deux endroits** qui doivent rester synchronisés :
- `SECTION_IDS` dans [src/hooks/useScrollSpy.js](src/hooks/useScrollSpy.js) — l'ordre du tableau reflète l'ordre visuel de la page (le scroll spy itère à l'envers pour trouver la section active).
- Les liens de la [Navbar](src/components/Navbar.jsx).

### Hooks maison ([src/hooks/](src/hooks/))
- `useInView` — wrapper `IntersectionObserver` qui déclenche les animations Framer Motion à l'entrée dans le viewport (se désabonne après la première apparition, animation one-shot). Retourne `[ref, isInView]`.
- `useScrollSpy` — suit la section visible pour surligner le lien actif de la navbar.

### Données séparées de la présentation ([src/data/](src/data/))
Le contenu des sections (`projects.js`, `skills.js`, `experience.js`, `formation.js`) est dans des tableaux JS exportés, séparés des composants. **Pour mettre à jour le contenu du portfolio, éditer ces fichiers de données**, pas le JSX.

### Génération du CV ([src/utils/generateCV.js](src/utils/generateCV.js))
`generateCV()` construit le CV PDF entièrement côté client avec jsPDF (layout deux colonnes dessiné manuellement en millimètres, photo chargée en base64 via `fetch`). Déclenché par le bouton « Télécharger mon CV » dans Contact.

### Fond animé ([src/components/ConstellationBG.jsx](src/components/ConstellationBG.jsx))
Animation « constellation » en Canvas 2D, positionnée en fond fixe. Le reste du contenu est au-dessus via `position: relative; z-index: 1` sur `<main>`.

## Style

- Thème sombre « Deep Space » fixe (fond `#0a0e1a`, accent bleu `#60a5fa`), défini dans [src/index.css](src/index.css). Police `Space Grotesk`.
- Le style repose beaucoup sur des **styles inline** (`style={{...}}`) avec des couleurs codées en dur (rgba glassmorphism, gradients), en complément des classes Tailwind. C'est le pattern établi — le suivre pour rester cohérent plutôt que d'extraire un système de thème.
- Règle ESLint notable : `no-unused-vars` ignore les identifiants en `^[A-Z_]` (composants et constantes).

## Formulaire de contact (EmailJS)

Le formulaire de [src/components/Contact.jsx](src/components/Contact.jsx) envoie les emails via **EmailJS** (`@emailjs/browser`, `sendForm`). Il n'y a **pas de backend** : tout part du navigateur.

### Le montage complet
- Un **compte EmailJS** existe (connexion via le compte Google associé). Dans ce compte : un **Service** (`service_e4lpbvv`) qui **connecte le Gmail expéditeur** — la connexion Gmail utilise un **mot de passe d'application** Google (2FA) saisi **dans EmailJS**, jamais dans le code. Un **Template** (`template_46l4a7b`) définit le mail. Les noms de champs du `<form>` (`from_name`, `from_email`, `subject`, `message`) doivent correspondre aux variables du template EmailJS.
- Le code ne connaît qu'EmailJS via 3 identifiants lus depuis les **variables d'environnement Vite** :
  - `VITE_EMAILJS_SERVICE`, `VITE_EMAILJS_TEMPLATE`, `VITE_EMAILJS_KEY` (`import.meta.env.VITE_*`).
  - Valeurs locales dans `.env.local` (non commité, ignoré par `*.local`) ; `.env.example` est le modèle commité.
  - **Ces variables `VITE_*` sont inlinées dans le bundle au build** → ce sont des clés **publiques** EmailJS (usage front-end normal), pas des secrets. Les `.env` servent la propreté/rotation, pas la confidentialité.

### Déploiement (Vercel — nouvelle interface par environnement)
Les variables ne sont **pas** dans un onglet global : aller dans **Settings → Environnements**, cliquer sur un environnement (**Production**, **Aperçu**, **Développement**), puis **Ajouter une variable d'environnement** — l'ajout se fait **environnement par environnement** (le plus rapide : bouton **« Importer .env »** pour coller les 3 lignes d'un coup). Vercel affiche un warning « peut exposer des infos sensibles » sur les clés préfixées `VITE_` → **« Marquer comme sûr »** est correct ici (clés publiques). Redéployer pour que les variables prennent effet.

### Sécurité (côté dashboard EmailJS, pas dans le code)
Réglages dans **Compte → Sécurité** :
- **Paramètres de l'API** — les deux cases doivent rester **décochées** : « Autoriser l'API pour applications non-navigateur » (plus sûr) et « Utiliser la clé privée » (**doit être décochée** : le front-end n'envoie que la clé publique, l'activer casserait le formulaire — la clé privée est un usage serveur, à ne jamais mettre dans le bundle).
- **Allow-list de domaines** : serait la vraie protection anti-abus (limiter à `portfolio-maurice.vercel.app` + `localhost`), mais c'est une **fonctionnalité payante** — **indisponible sur le plan gratuit** utilisé ici. Pas activée.
- Garde-fou effectif sur le gratuit : le **quota de ~200 requêtes/mois** plafonne tout abus éventuel (au pire 200 mails puis blocage jusqu'à réinitialisation). Risque jugé acceptable pour un portfolio.
- **Honeypot anti-bot** implémenté dans le code : champ caché `_gotcha` (invisible, off-screen) dans le `<form>` ; si `handleSubmit` le trouve rempli, l'envoi est abandonné silencieusement. Ne pas ajouter `{{_gotcha}}` au template EmailJS (le champ part dans le payload de `sendForm` mais est ignoré tant que le template ne le référence pas). Bloque les bots simples sans clé ni dépendance.
- reCAPTCHA non installé (préféré le honeypot : gratuit, sans dépendance, sans changement d'UI).
- **Après tout changement de sécurité, tester l'envoi du formulaire** (le site en prod ou `npm run dev`) car ces réglages peuvent bloquer l'envoi silencieusement.

## Notes

- Aucune route ni routeur : navigation par ancres et scroll fluide (`scroll-behavior: smooth`).
