"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    SparklesIcon, 
    ArrowPathIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import SalaryCompareChart from "@/components/charts/SalaryCompareChart";
import { predictSalary } from "@/services/predictService";

export default function PredictPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        job_title: "Data Scientist",
        sector: "IA / Data",
        skills: ["Python", "Machine Learning"],
        job_description: "",
        size: "Medium",
        type_of_ownership: "Private",
        state: "FR"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = await predictSalary(form);
            setResult(data);
        } catch (err) {
            setError("Impossible de générer la prédiction. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-6 lg:px-12 max-w-[1280px] mx-auto">
            <header className="mb-12">
                <h1 className="text-4xl font-display font-black text-white mb-4">Salary <span className="text-mint">Predictor</span></h1>
                <p className="text-white/40 max-w-xl">Estimez votre salaire potentiel grâce à notre modèle d&apos;IA entraîné sur des milliers d&apos;offres réelles.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Form Side */}
                <div className="lg:col-span-5">
                    <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-[2.5rem] space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 pl-1">Intitulé du poste</label>
                            <input
                                type="text"
                                value={form.job_title}
                                onChange={(e) => setForm({...form, job_title: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white outline-none focus:border-mint/30 transition-all"
                                placeholder="ex: Senior ML Engineer"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 pl-1">Secteur d&apos;activité</label>
                            <select
                                value={form.sector}
                                onChange={(e) => setForm({...form, sector: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white outline-none focus:border-mint/30 transition-all appearance-none"
                            >
                                <option className="bg-forest">IA / Data</option>
                                <option className="bg-forest">Fintech</option>
                                <option className="bg-forest">E-commerce</option>
                                <option className="bg-forest">Cybersecurité</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 pl-1">Compétences clés</label>
                            <input
                                type="text"
                                placeholder="Python, SQL, PyTorch... (séparés par virgule)"
                                onChange={(e) => setForm({...form, skills: e.target.value.split(",").map(s => s.trim())})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white outline-none focus:border-mint/30 transition-all"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full button-primary flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {loading ? (
                                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Générer l&apos;analyse
                                    <SparklesIcon className="w-5 h-5 group-hover:text-mint transition-colors" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Result Side */}
                <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="glass-dark p-10 rounded-[2.5rem] border-mint/20 border">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-mint">Estimation IA</h3>
                                        <div className="px-3 py-1 rounded-full bg-mint/10 text-mint text-[10px] font-black">Confiance {result.confidence}%</div>
                                    </div>
                                    
                                    <div className="mb-10">
                                        <p className="text-white/40 text-sm font-bold mb-1">Salaire Annuel Estimé</p>
                                        <h2 className="text-6xl font-display font-black text-white tracking-tight">{result.salary_estimate}</h2>
                                        <p className="text-white/20 text-xs mt-2 italic">Fourchette: {result.salary_range}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Compétitivité</p>
                                            <div className="text-xl font-bold text-white">{result.competitiveness_score}/100</div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Contexte</p>
                                            <div className="text-sm font-medium text-white/60 leading-tight">{result.market_context}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-dark p-8 rounded-[2.5rem]">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6">Comparaison Marché</h3>
                                    <div className="h-64 mt-4">
                                        <SalaryCompareChart />
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-[3rem]">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                    <SparklesIcon className="w-10 h-10 text-white/20" />
                                </div>
                                <h3 className="text-xl font-bold text-white/40 mb-2">Prêt à analyser ?</h3>
                                <p className="text-sm text-white/20 max-w-xs">Remplissez le formulaire pour obtenir une estimation précise basée sur votre profil.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
