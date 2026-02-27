# HR-Pulse Frontend - Plateforme d'Analyse d'Offres d'Emploi par IA

L'interface frontend de la plateforme HR-Pulse, développée avec **Next.js** et **Tailwind CSS**. Ce dépôt se concentre sur la visualisation des données, la recherche d'emplois et les composants d'interaction utilisateur du système d'analyse d'offres d'emploi propulsé par l'IA.

> [!NOTE]
> Ce dépôt contient uniquement le code Frontend. L'API Backend et les modèles ML sont hébergés séparément.

## 1. Aperçu
HR-Pulse est une plateforme professionnelle conçue pour automatiser l'analyse des offres d'emploi. Le frontend offre un tableau de bord moderne pour visualiser les données extraites via Azure AI (NER) et interagir avec les modèles prédictifs et les outils de monitoring.

## 2. Fonctionnalités Clés
- **Tableau de Bord Professionnel** : Visualisez les tendances et statistiques de recrutement via **Recharts**.
- **Recherche d'Emploi IA** : Recherchez et filtrez les offres d'emploi traitées par Azure AI Language.
- **Ingestion de Données** : Interface pour l'importation par lot de descriptions de postes (CSV) pour analyse.
- **Interface Predictor** : Interagissez avec le modèle d'estimation salariale.
- **Système d'Observabilité** : Section intégrée pour le suivi des traces et de la santé du système.
- **Thème Personnalisé** : Palette professionnelle Navy/Bleu moderne avec un design responsive.

## 3. Stack Technique
- **Framework** : [Next.js](https://nextjs.org/) (App Router, Client Components)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Gestion d'État** : [TanStack Query](https://tanstack.com/query) (React Query)
- **Graphiques** : [Recharts](https://recharts.org/)
- **Communication API** : [Axios](https://axios-http.com/)

## 4. Pour Commencer

### Prérequis
- Node.js (v20+)
- npm ou yarn

### Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/SaidaAourras/HR-Pulse_fontend.git
   cd HR-Pulse_fontend
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Configuration de l'environnement :
   Créez un fichier `.env.local` à la racine du projet :
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```
   Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.

## 5. Déploiement
L'application est optimisée pour un déploiement sur **Vercel** ou tout fournisseur cloud supportant Node.js/Next.js.

---
*Propulsé par Next.js & Tailwind CSS. Développé par l'équipe HR-Pulse.*
