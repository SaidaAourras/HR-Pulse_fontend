"use client";

import { motion } from "framer-motion";
import { 
    CpuChipIcon, 
    ServerIcon, 
    ShieldCheckIcon, 
    CloudIcon 
} from "@heroicons/react/24/outline";

const metrics = [
    { label: "CPU Usage", value: "12%", status: "Optimal", icon: CpuChipIcon },
    { label: "Memory", value: "1.4GB", status: "Stable", icon: ServerIcon },
    { label: "Uptime", value: "99.98%", status: "Live", icon: ShieldCheckIcon },
    { label: "Cloud Connectivity", value: "Connected", status: "Active", icon: CloudIcon },
];

export default function ObservabilityPage() {
    return (
        <div className="min-h-screen py-16 px-6 lg:px-12 max-w-[1280px] mx-auto">
            <header className="mb-16">
                <h1 className="text-4xl font-display font-black text-white mb-4">
                    Observabilité <span className="text-mint">Système</span>
                </h1>
                <p className="text-white/40 max-w-xl">Surveillez les performances de l&apos;IA et l&apos;état des services Azure en temps réel.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {metrics.map((m, i) => (
                    <motion.div 
                        key={m.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-dark p-8 rounded-3xl"
                    >
                        <m.icon className="w-8 h-8 text-mint mb-6" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">{m.label}</p>
                        <h3 className="text-3xl font-display font-black text-white mb-1">{m.value}</h3>
                        <p className="text-xs font-bold text-mint/60">{m.status}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 glass-dark p-10 rounded-[2.5rem] h-80 flex items-center justify-center border border-white/5">
                    <p className="text-white/20 font-black uppercase tracking-widest italic">Graphique de latence IA... (Mock)</p>
                </div>
                <div className="lg:col-span-4 glass-dark p-10 rounded-[2.5rem] flex flex-col justify-center border border-white/5 text-center">
                    <div className="w-16 h-16 rounded-full bg-mint/10 flex items-center justify-center mx-auto mb-6">
                        <div className="w-4 h-4 rounded-full bg-mint animate-ping" />
                    </div>
                    <h4 className="text-white font-bold mb-2">Services Azure AI</h4>
                    <p className="text-white/40 text-sm">Opérationnels à 100% dans la région France Central.</p>
                </div>
            </div>
        </div>
    );
}
