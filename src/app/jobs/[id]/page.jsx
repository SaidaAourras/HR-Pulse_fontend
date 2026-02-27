"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SkillChip from "@/components/ui/SkillChip";
import SalaryCompareChart from "@/components/charts/SalaryCompareChart";
import { getJobById } from "@/services/jobsService";

export default function JobDetailPage({ params }) {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            const resolvedParams = await params;
            const data = await getJobById(resolvedParams.id);
            setJob(data);
            setLoading(false);
        };
        fetchJob();
    }, [params]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-white/5 border-t-mint rounded-full animate-spin mx-auto mb-6" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Analyse de l&apos;offre...</p>
            </div>
        </div>
    );

    if (!job) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-6xl mb-6 opacity-20">🔍</p>
                <p className="font-display text-2xl font-bold text-white mb-8">Offre introuvable</p>
                <Link href="/">
                    <button className="button-secondary px-8">Retour au dashboard</button>
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-12 px-6 lg:px-12 max-w-[1280px] mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-white/30">
                <Link href="/" className="hover:text-mint transition-colors">Dashboard</Link>
                <span className="opacity-20">/</span>
                <span className="text-white/60">{job.title}</span>
            </motion.div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} 
                        className="glass-dark rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-mint">{job.sector}</p>
                        <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">{job.title}</h1>
                        <p className="text-xl font-medium text-white/40 mb-12">{job.company} • {job.location}</p>
                        <div className="flex flex-col items-center gap-2 mb-14">
                            <p className="font-display text-6xl md:text-8xl font-black text-mint tracking-tighter">{job.salary_estimate}</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Estimation IA</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {job.top_skills.map((s, i) => <SkillChip key={s} skill={s} index={i} size="lg" />)}
                        </div>
                    </motion.div>
                </div>

                <div className="col-span-12 lg:col-span-8 space-y-8">
                    <div className="glass-dark p-10 md:p-14 rounded-[2.5rem]">
                        <h2 className="text-3xl font-display font-black text-white mb-8">Description du poste</h2>
                        <div className="prose prose-invert max-w-none text-white/60 leading-relaxed text-lg">
                            {job.description}
                        </div>
                    </div>
                    <div className="glass-dark p-10 md:p-14 rounded-[2.5rem]">
                        <h2 className="text-3xl font-display font-black text-white mb-10">Analyse Salariale</h2>
                        <SalaryCompareChart job={job} />
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div className="glass-dark p-10 rounded-[2.5rem] sticky top-28 border border-mint/10">
                        <h3 className="text-2xl font-display font-black text-white mb-8 italic text-center">IA Insights</h3>
                        <div className="space-y-6">
                            {[
                                { label: "Score Match", value: "98%", color: "text-mint" },
                                { label: "Compétitivité", value: "Haute", color: "text-white" },
                                { label: "Évolution", value: "+12.5%", color: "text-mint" },
                                { label: "Volume Marché", value: "Modéré", color: "text-white" },
                            ].map((row) => (
                                <div key={row.label} className="flex justify-between items-center py-4 border-b border-white/5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{row.label}</p>
                                    <p className={`text-base font-bold ${row.color}`}>{row.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 space-y-4">
                            <button className="w-full button-primary py-5">Postuler maintenant</button>
                            <button className="w-full button-secondary py-5">Sauvegarder l&apos;offre</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
