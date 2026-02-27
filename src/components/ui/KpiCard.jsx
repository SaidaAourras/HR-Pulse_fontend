"use client";

import { motion } from "framer-motion";

export default function KpiCard({ title, value, icon, delay = 0, trend = null }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            className="glass-dark p-6 rounded-3xl relative overflow-hidden group"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-mint/60 mb-1">{title}</p>
                    <h3 className="text-3xl font-display font-black text-white">{value}</h3>
                    {trend && (
                        <p className="text-[10px] mt-2 font-bold flex items-center gap-1" style={{ color: trend.positive ? "#00ffbb" : "#ff4d4d" }}>
                            {trend.positive ? "↑" : "↓"} {trend.value}
                            <span className="text-white/30 uppercase tracking-tighter ml-1">vs mois dernier</span>
                        </p>
                    )}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-mint/10 group-hover:text-mint transition-all">
                    {icon}
                </div>
            </div>

            {/* Subtle Gradient Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-mint/5 blur-[40px] rounded-full group-hover:bg-mint/10 transition-all" />
        </motion.div>
    );
}
