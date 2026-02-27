// Salary base map
const BASE = {
    "Data Scientist": 75000, "ML Engineer": 82000, "Data Analyst": 48000,
    "Cloud Architect": 95000, "NLP Engineer": 85000, "DevOps Engineer": 65000,
    "Full Stack Developer": 58000, "Product Manager": 80000,
};
const SECTOR_BONUS = {
    "Tech & IT": 5000, "Finance": 10000, "IA / Data": 8000, "Santé": 3000,
    "Industrie": 1000, "Commerce": -2000, "Éducation": -3000, "Consulting": 7000,
};
const SKILL_IMPACT = {
    "Python": ["Python", "Machine Learning"], "Machine Learning": ["Machine Learning"],
    "Deep Learning": ["Deep Learning", "TensorFlow"], "Azure": ["Azure", "Cloud"],
    "Kubernetes": ["Kubernetes", "Docker"], "NLP": ["NLP", "Transformers"],
    "SQL": ["SQL"], "Docker": ["Docker"],
};

function fmt(n) { return n.toLocaleString("fr-FR") + " €"; }

function buildResult(payload) {
    const titleKey = Object.keys(BASE).find((k) =>
        payload.job_title.toLowerCase().includes(k.toLowerCase())
    );
    const base = titleKey ? BASE[titleKey] : 62000;
    const sectorBonus = SECTOR_BONUS[payload.sector] ?? 0;
    const skillBonus = (payload.skills || []).length * 1800;
    const predicted = Math.round(base + sectorBonus + skillBonus);
    const marketAvg = Math.round(base * 1.05);
    const ratio = predicted / marketAvg;

    const score = Math.min(100, Math.round(ratio * 65 + (payload.skills || []).length * 3));
    const ctx =
        ratio >= 1.15 ? "Profil très recherché sur le marché actuel" :
            ratio >= 1.05 ? "Au-dessus de la moyenne du marché" :
                ratio >= 0.95 ? "Dans la moyenne du marché" :
                    "Profil en dessous de la moyenne — potentiel de progression";

    const impact = (payload.skills || [])
        .flatMap((s) => SKILL_IMPACT[s] ?? [])
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 5);

    return {
        salary_estimate: fmt(predicted),
        salary_range: `${fmt(Math.round(predicted * 0.88))} – ${fmt(Math.round(predicted * 1.12))}`,
        confidence: Math.min(96, 68 + (payload.skills || []).length * 3.5),
        competitiveness_score: score,
        market_context: ctx,
        skills_impact: impact,
    };
}

/**
 * Predict Salary function (Reverted to Mock)
 */
export async function predictSalary(payload) {
    console.log("Mock predicting salary for:", payload);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    return buildResult(payload);
}
