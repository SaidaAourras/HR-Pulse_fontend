"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SkillsBarChart from "@/components/charts/SkillsBarChart";
import { getTopSkills } from "@/services/skillsService";

export default function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTopSkills(10).then((s) => { 
            setSkills(s); 
            setLoading(false); 
        });
    }, []);

    const top = skills[0];

    return (
        <div className="min-h-screen py-16 px-6 lg:px-12 max-w-[1280px] mx-auto">
            <header className="mb-16 text-center lg:text-left">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl lg:text-6xl font-display font-black text-white mb-6">
                        Analyse des <span className="text-mint">Compétences</span>
                    </h1>
                    <p className="text-xl text-white/40 max-w-2xl leading-relaxed">
                        Visualisez les technologies les plus demandées sur le marché du travail actuel, extraites en temps réel par notre moteur d&apos;analyse.
                    </p>
                </motion.div>
            </header>

            {!loading && top && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: "Top Skill", value: top.skill, desc: "Domine le marché", color: "text-mint" },
                        { label: "Index Global", value: "89.4", desc: "Tendance haussière", color: "text-white" },
                        { label: "Total Analysé", value: "1,247", desc: "Offres ce mois-ci", color: "text-mint" },
                    ].map((idx, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-dark p-8 rounded-3xl"
                        >
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{idx.label}</p>
                            <p className={`text-4xl font-display font-black mb-1 ${idx.color}`}>{idx.value}</p>
                            <p className="text-xs text-white/40 font-bold">{idx.desc}</p>
                        </motion.div>
                    ))}
                </div>
            )}

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark p-10 md:p-14 rounded-[3rem]"
            >
                <div className="mb-12">
                    <h2 className="text-3xl font-display font-black text-white mb-2">Répartition du Marché</h2>
                    <p className="text-white/40 font-medium">Fréquence relative des compétences dans les offres d&apos;emploi.</p>
                </div>
                {loading ? (
                    <div className="h-[400px] w-full bg-white/5 rounded-2xl animate-pulse" />
                ) : (
                    <SkillsBarChart data={skills} />
                )}
            </motion.div>
        </div>
    );
}
