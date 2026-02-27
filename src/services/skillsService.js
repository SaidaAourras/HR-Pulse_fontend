/**
 * Mock data representing top skills
 */
const MOCK_SKILLS = [
    { skill: "Python", count: 450 },
    { skill: "SQL", count: 380 },
    { skill: "Machine Learning", count: 320 },
    { skill: "Docker", count: 210 },
    { skill: "Azure", count: 180 },
    { skill: "React", count: 150 },
    { skill: "NLP", count: 120 },
    { skill: "Kubernetes", count: 90 },
];

/**
 * Service Functions for Skills (Reverted to Mock)
 */

export async function getTopSkills(n = 5) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return MOCK_SKILLS.slice(0, n);
}

export async function getAllSkills() {
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_SKILLS;
}
