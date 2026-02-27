"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SkillChip from "./SkillChip";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const rowAnim = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "circOut" } },
};

export default function JobsTable({ jobs }) {
    if (!jobs) return null;
    
    return (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            {/* Balanced Header */}
            <div className="grid grid-cols-12 gap-0 px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-center"
                style={{ background: "rgba(18, 36, 31, 0.9)", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.40)" }}>
                <div className="col-span-5 text-left pl-6">Poste</div>
                <div className="col-span-2">Salaire</div>
                <div className="col-span-3">Compétences</div>
                <div className="col-span-2">Action</div>
            </div>

            <AnimatePresence>
                <motion.div variants={stagger} initial="hidden" animate="show">
                    {jobs.map((job) => (
                        <motion.div
                            key={job.id}
                            variants={rowAnim}
                            className="grid grid-cols-12 gap-0 px-8 py-6 items-center group cursor-default transition-colors duration-200 text-center"
                            style={{
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                background: "transparent",
                            }}
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        >
                            {/* Title & Company */}
                            <div className="col-span-5 text-left pl-6 flex flex-col">
                                <p className="font-bold text-white text-base group-hover:text-mint transition-colors line-clamp-1">{job.title}</p>
                                {job.company && <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{job.company} • {job.location}</p>}
                            </div>

                            {/* Salary */}
                            <div className="col-span-2">
                                <span className="text-sm font-black px-3 py-1.5 rounded-full" style={{ background: "rgba(209,232,226,0.1)", color: "#d1e8e2" }}>
                                    {job.salary_estimate}
                                </span>
                            </div>

                            {/* Skills */}
                            <div className="col-span-3 flex flex-wrap justify-center gap-2">
                                {(job.top_skills || []).slice(0, 2).map((s, i) => (
                                    <SkillChip key={s} skill={s} index={i} size="sm" />
                                ))}
                                {(job.top_skills || []).length > 2 && (
                                    <span className="text-[10px] font-bold px-2 py-1 rounded-md"
                                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.40)" }}>
                                        +{(job.top_skills || []).length - 2}
                                    </span>
                                )}
                            </div>

                            {/* CTA */}
                            <div className="col-span-2 flex justify-center">
                                <Link href={`/jobs/${job.id}`}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-xs font-bold px-5 py-2 rounded-xl text-forest-dark bg-white transition-all shadow-lg"
                                    >
                                        Consulter
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
