"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    BriefcaseIcon, 
    ChartBarIcon, 
    SparklesIcon, 
    GlobeAltIcon,
    MagnifyingGlassIcon,
    ArrowRightIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import KpiCard from "@/components/ui/KpiCard";
import JobsTable from "@/components/ui/JobsTable";
import { getJobs, getKpi } from "@/services/jobsService";

export default function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [kpi, setKpi] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobsData, kpiData] = await Promise.all([
                    getJobs(1, 5),
                    getKpi()
                ]);
                setJobs(jobsData);
                setKpi(kpiData);
            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 lg:px-12 max-w-[1280px] mx-auto">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-mint/10 text-mint text-xs font-bold uppercase tracking-widest mb-6">
                            Plateforme IA Nouvelle Génération
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-display font-black text-white leading-tight mb-8">
                            L&apos;IA au service de votre <span className="text-mint">stratégie RH</span>
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
                            Analysez les tendances du marché, extrayez les compétences clés et prédisez les salaires avec une précision inégalée grâce à nos modèles de Deep Learning.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/search">
                                <button className="button-primary flex items-center gap-2">
                                    Explorer les offres
                                    <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            </Link>
                            <Link href="/predict">
                                <button className="button-secondary">
                                    Simulateur de salaire
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats / KPI Section */}
            <section className="py-16 px-6 lg:px-12 max-w-[1280px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KpiCard 
                        title="Offres Analysées" 
                        value={loading ? "..." : (kpi?.total_jobs?.toLocaleString() || "1,247")} 
                        icon={<BriefcaseIcon className="w-6 h-6" />}
                        delay={0.1}
                    />
                    <KpiCard 
                        title="Salaire Moyen" 
                        value={loading ? "..." : `${(kpi?.avg_salary / 1000 || 68.5).toFixed(1)}k €`} 
                        icon={<ChartBarIcon className="w-6 h-6" />}
                        delay={0.2}
                    />
                    <KpiCard 
                        title="Top Compétence" 
                        value={loading ? "..." : (kpi?.top_skill || "Python")} 
                        icon={<SparklesIcon className="w-6 h-6" />}
                        delay={0.3}
                    />
                    <KpiCard 
                        title="Secteur Dominant" 
                        value={loading ? "..." : (kpi?.dominant_sector || "IA / Data")} 
                        icon={<GlobeAltIcon className="w-6 h-6" />}
                        delay={0.4}
                    />
                </div>
            </section>

            {/* Recent Jobs Section */}
            <section className="py-16 pb-32 px-6 lg:px-12 max-w-[1280px] mx-auto">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-display font-black text-white mb-2">Dernières Offres</h2>
                        <p className="text-white/40">Les opportunités les plus récentes analysées par notre moteur.</p>
                    </div>
                    <Link href="/search" className="text-mint font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        Voir tout <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="h-[400px] w-full rounded-2xl shimmer border border-white/5" />
                ) : (
                    <JobsTable jobs={jobs} />
                )}
            </section>
        </div>
    );
}
