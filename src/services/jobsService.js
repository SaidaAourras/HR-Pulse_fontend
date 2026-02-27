/**
 * Mock Data
 */
export const MOCK_JOBS = [
    {
        id: 1, title: "Data Scientist Senior", company: "TechCorp SA", sector: "Tech",
        salary_estimate: "65K–85K €", salary_min: 65000, salary_max: 85000, salary_avg: 75000,
        top_skills: ["Python", "ML", "TensorFlow", "SQL"], location: "Paris",
        description: "Développez des modèles ML avancés pour analyser les données clients à grande échelle. Travaillez en collaboration avec les équipes produit et data engineering sur des projets IA stratégiques.",
        posted_date: "2026-02-20",
    },
    {
        id: 2, title: "ML Engineer", company: "AI Ventures", sector: "IA / Data",
        salary_estimate: "70K–90K €", salary_min: 70000, salary_max: 90000, salary_avg: 80000,
        top_skills: ["Python", "PyTorch", "Kubernetes", "MLflow"], location: "Lyon",
        description: "Déployez et monitorer des pipelines ML en production. Optimisez les performances des modèles et assurez la scalabilité des solutions IA.",
        posted_date: "2026-02-19",
    },
    {
        id: 3, title: "Data Analyst", company: "Retail Group", sector: "Commerce",
        salary_estimate: "40K–55K €", salary_min: 40000, salary_max: 55000, salary_avg: 47500,
        top_skills: ["SQL", "Power BI", "Excel", "Python"], location: "Marseille",
        description: "Analysez les données de vente et créez des dashboards stratégiques pour la direction. Identifiez les tendances marchés et proposez des recommandations.",
        posted_date: "2026-02-18",
    },
    {
        id: 4, title: "Cloud Architect", company: "CloudSys", sector: "Infrastructure",
        salary_estimate: "80K–110K €", salary_min: 80000, salary_max: 110000, salary_avg: 95000,
        top_skills: ["Azure", "AWS", "Terraform", "Docker"], location: "Paris",
        description: "Concevez et déployez des architectures cloud scalables et résilientes. Définissez les standards d'infrastructure et accompagnez les équipes DevOps.",
        posted_date: "2026-02-17",
    },
    {
        id: 5, title: "NLP Engineer", company: "LangTech", sector: "IA / Data",
        salary_estimate: "75K–95K €", salary_min: 75000, salary_max: 95000, salary_avg: 85000,
        top_skills: ["Python", "NLP", "Transformers", "Azure AI"], location: "Bordeaux",
        description: "Développez des solutions NLP pour l'extraction et la classification de texte automatique. Utilisez les services Azure AI Language et les modèles Transformer.",
        posted_date: "2026-02-16",
    },
    {
        id: 6, title: "DevOps Engineer", company: "InfraNet", sector: "Infrastructure",
        salary_estimate: "55K–75K €", salary_min: 55000, salary_max: 75000, salary_avg: 65000,
        top_skills: ["Docker", "Kubernetes", "CI/CD", "Linux"], location: "Nantes",
        description: "Automatisez les pipelines CI/CD et gérez l'infrastructure as code. Assurez la disponibilité et la performance des environnements de production.",
        posted_date: "2026-02-15",
    },
    {
        id: 7, title: "Full Stack Developer", company: "WebStart", sector: "Tech",
        salary_estimate: "45K–65K €", salary_min: 45000, salary_max: 65000, salary_avg: 55000,
        top_skills: ["React", "Node.js", "TypeScript", "PostgreSQL"], location: "Toulouse",
        description: "Développez des applications web modernes de bout en bout. Participez à l'architecture technique et contribuez à l'amélioration continue du produit.",
        posted_date: "2026-02-14",
    },
    {
        id: 8, title: "Product Manager IA", company: "InnovateCo", sector: "Management",
        salary_estimate: "70K–90K €", salary_min: 70000, salary_max: 90000, salary_avg: 80000,
        top_skills: ["Agile", "Data Analysis", "Product Vision", "SQL"], location: "Paris",
        description: "Pilotez la roadmap produit d'une suite d'outils IA B2B. Faites le lien entre les équipes techniques et business pour maximiser la valeur produit.",
        posted_date: "2026-02-13",
    },
];

export const MOCK_KPI = {
    total_jobs: 1247,
    avg_salary: 68500,
    top_skill: "Python",
    dominant_sector: "IA / Data",
};

/**
 * Service Functions (Reverted to Mock)
 */

export async function getJobs(page = 1, limit = 10) {
    // Return mock data after short delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_JOBS.slice(0, limit);
}

export async function getJobById(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const job = MOCK_JOBS.find((j) => j.id === Number(id));
    if (!job) throw new Error(`Job ${id} not found`);
    return job;
}

export async function searchBySkill(skill) {
    await new Promise(resolve => setTimeout(resolve, 600));
    if (!skill) return { jobs: MOCK_JOBS, total: MOCK_JOBS.length, skill: "" };
    
    const filtered = MOCK_JOBS.filter(j => 
        j.top_skills.some(s => s.toLowerCase().includes(skill.toLowerCase())) ||
        j.title.toLowerCase().includes(skill.toLowerCase())
    );
    return { jobs: filtered, total: filtered.length, skill };
}

export async function getKpi() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return MOCK_KPI;
}
