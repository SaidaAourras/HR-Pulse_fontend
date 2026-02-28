# HR-Pulse Frontend — Plateforme d'Analyse d'Offres d'Emploi par IA

L'interface frontend de la plateforme HR-Pulse, développée avec **Next.js** et **Tailwind CSS**. Ce dépôt se concentre sur la visualisation des données, la recherche d'emplois et les composants d'interaction utilisateur du système d'analyse d'offres d'emploi propulsé par l'IA.

> [!NOTE]
> Ce dépôt contient uniquement le code Frontend. L'API Backend et les modèles ML sont hébergés séparément dans [HR-Pulse_backend](https://github.com/SaidaAourras/HR-Pulse_backend).

---

## Table des matières

- [Aperçu](#1-aperçu)
- [Fonctionnalités clés](#2-fonctionnalités-clés)
- [Stack technique](#3-stack-technique)
- [Structure du projet](#4-structure-du-projet)
- [Pour commencer](#5-pour-commencer)
- [Pages et fonctionnalités](#6-pages-et-fonctionnalités)
- [Connexion à l'API](#7-connexion-à-lapi)
- [Docker](#8-docker)
- [Déploiement](#9-déploiement)
- [Variables d'environnement](#10-variables-denvironnement)

---

## 1. Aperçu

HR-Pulse est une plateforme professionnelle conçue pour automatiser l'analyse des offres d'emploi Data Science. Le frontend offre un tableau de bord moderne pour visualiser les données extraites via **Azure AI Language (NER)** et interagir avec les modèles prédictifs et les outils de monitoring.

---

## 2. Fonctionnalités clés

- **Tableau de bord professionnel** — Visualisez les tendances et statistiques de recrutement via **Recharts**
- **Recherche d'emploi IA** — Recherchez et filtrez les offres traitées par Azure AI Language
- **Ingestion de données** — Interface pour l'importation par lot de descriptions de postes (CSV) pour analyse
- **Interface Predictor** — Estimez le salaire compétitif pour un profil donné grâce au modèle ML
- **Système d'observabilité** — Section intégrée pour le suivi des traces et de la santé du système (Jaeger)
- **Thème personnalisé** — Palette professionnelle Navy/Bleu moderne avec un design responsive

---

## 3. Stack technique

| Composant | Technologie |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 14+ (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Icônes | [Lucide React](https://lucide.dev/) |
| Gestion d'état | [TanStack Query](https://tanstack.com/query) (React Query) |
| Graphiques | [Recharts](https://recharts.org/) |
| Communication API | [Axios](https://axios-http.com/) |
| Conteneurisation | Docker multi-stage (Node 20 Alpine) |

---

## 4. Structure du projet

```
hr_pulse_frontend/
├── app/
│   ├── layout.tsx          ← layout global
│   ├── page.tsx            ← page d'accueil
│   ├── dashboard/
│   │   └── page.tsx        ← tableau de bord marché
│   ├── jobs/
│   │   ├── page.tsx        ← liste des offres
│   │   └── [id]/
│   │       └── page.tsx    ← détail d'une offre
│   ├── predict/
│   │   └── page.tsx        ← formulaire de prédiction salariale
│   └── auth/
│       ├── login/
│       │   └── page.tsx    ← connexion
│       └── register/
│           └── page.tsx    ← inscription
├── components/
│   ├── ui/                 ← composants réutilisables
│   ├── JobCard.tsx         ← carte offre d'emploi
│   ├── SkillsChart.tsx     ← graphique top compétences (Recharts)
│   └── PredictForm.tsx     ← formulaire de prédiction
├── lib/
│   └── api.ts              ← client Axios vers le backend
├── public/                 ← assets statiques
├── Dockerfile.frontend
├── next.config.mjs
├── package.json
└── tailwind.config.ts
```

---

## 5. Pour commencer

### Prérequis

- Node.js v20+
- npm ou yarn

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/SaidaAourras/HR-Pulse_fontend.git
cd HR-Pulse_fontend

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env.local
# Remplir NEXT_PUBLIC_API_URL (voir section 10)

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.

---

## 6. Pages et fonctionnalités

### `/` — Accueil
Page d'accueil avec présentation de la plateforme et liens vers les fonctionnalités principales.

### `/dashboard` — Tableau de bord
- Top 20 compétences du marché (graphique barres Recharts)
- Statistiques globales : nombre d'offres, salaire moyen, top secteurs
- Appelle : `GET /jobs/skills/top/?n=20`

### `/jobs` — Offres d'emploi
- Liste paginée des 672 offres analysées
- Barre de recherche par compétence (Python, SQL, Azure, etc.)
- Appelle : `GET /jobs/?page=1&limit=20` et `GET /jobs/search/?skill=Python`

### `/jobs/[id]` — Détail d'une offre
- Titre du poste, compétences extraites par NER
- Appelle : `GET /jobs/{id}`

### `/predict` — Estimation salariale
Formulaire avec les champs : titre du poste, description, secteur, taille entreprise, type d'ownership, état US.
Résultat : salaire prédit en K$, fourchette min/max, MAE du modèle.
Appelle : `POST /predict/`

### `/auth/login` & `/auth/register` — Authentification
Formulaires de connexion et d'inscription. Le token JWT est envoyé dans le header `Authorization: Bearer <token>` pour chaque requête protégée.

---

## 7. Connexion à l'API

Toutes les requêtes vers le backend passent par `lib/api.ts` :

```typescript
import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
})

// Injecter le token JWT automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const fetchJobs = (page = 1, limit = 20) =>
  api.get(`/jobs/?page=${page}&limit=${limit}`).then((r) => r.data)

export const searchJobs = (skill: string) =>
  api.get(`/jobs/search/?skill=${skill}`).then((r) => r.data)

export const fetchTopSkills = (n = 20) =>
  api.get(`/jobs/skills/top/?n=${n}`).then((r) => r.data)

export const predictSalary = (payload: PredictRequest) =>
  api.post("/predict/", payload).then((r) => r.data)
```

---

## 8. Docker

```bash
# Build l'image frontend seule
docker build -f Dockerfile.frontend -t hr-pulse-frontend .

# Lancer avec le backend complet (depuis HR-Pulse_backend/)
docker-compose up --build
```

> [!IMPORTANT]
> Le fichier `next.config.mjs` doit contenir `output: "standalone"` pour que le build Docker fonctionne.

```javascript
// next.config.mjs
const nextConfig = {
  output: "standalone",
}
export default nextConfig
```

---

## 9. Déploiement

L'application est optimisée pour un déploiement sur **Vercel** ou tout fournisseur cloud supportant Node.js/Next.js.

```bash
# Build de production
npm run build

# Lancer en production
npm start
```

---

## 10. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# URL du backend FastAPI
NEXT_PUBLIC_API_URL=http://localhost:8000

# En production Docker (le backend s'appelle "backend" dans docker-compose)
# NEXT_PUBLIC_API_URL=http://backend:8000
```

---

*Propulsé par Next.js & Tailwind CSS. Développé par l'équipe HR-Pulse.*