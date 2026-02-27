"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import JobsTable from "@/components/ui/JobsTable";
import { searchBySkill, getJobs } from "@/services/jobsService";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        // Fetch all jobs on initial mount
        const fetchInitial = async () => {
            setLoading(true);
            try {
                const data = await getJobs(1, 10);
                setResults(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInitial();
    }, []);

    const doSearch = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setSearched(true);
        try {
            if (!query.trim()) {
                const data = await getJobs(1, 10);
                setResults(data);
            } else {
                const data = await searchBySkill(query);
                setResults(data.jobs);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-6 lg:px-12 max-w-[1280px] mx-auto">
            <header className="mb-12">
                <h1 className="text-4xl font-display font-black text-white mb-4">Recherche <span className="text-mint">IA</span></h1>
                <p className="text-white/40 max-w-xl">Trouvez des opportunités en fonction de vos compétences. Notre moteur identifie les meilleures correspondances.</p>
            </header>

            <div className="max-w-2xl mb-16">
                <form onSubmit={doSearch} className="flex gap-3">
                    <div className="flex-1 relative group">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-mint transition-colors" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ex: Python, Machine Learning, React..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-mint/50 focus:bg-white/[0.08] transition-all"
                        />
                    </div>
                    <button type="submit" className="button-primary px-8">Chercher</button>
                </form>
            </div>

            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-white">
                        {searched ? "Résultats de recherche" : "Offres suggérées"}
                    </h2>
                    <span className="text-xs font-bold text-white/30 tracking-widest uppercase">
                        {results.length} Postes trouvés
                    </span>
                </div>

                {loading ? (
                    <div className="h-[400px] w-full bg-white/5 rounded-3xl animate-pulse" />
                ) : (
                    <JobsTable jobs={results} />
                )}

                {!loading && searched && results.length === 0 && (
                    <div className="py-20 text-center glass-dark rounded-3xl border border-dashed border-white/10">
                        <p className="text-white/40 font-medium">Aucun résultat trouvé pour &quot;{query}&quot;. Essayez d&apos;autres compétences.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
