"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function FloatingShapes() {
    const { scrollYProgress } = useScroll();
    const posX = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const posY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Primary Vibrant Green Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-15%] right-[-15%] w-[100vw] h-[100vw] rounded-full"
                style={{
                    x: posX,
                    y: posY,
                    background: "radial-gradient(circle, rgba(26, 77, 46, 0.9) 0%, transparent 70%)",
                    filter: "blur(160px)",
                }}
            />

            {/* Accent Glass Shape */}
            <motion.div
                initial={{ rotate: -15 }}
                animate={{ rotate: [ -15, 0, -15 ] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-[-10%] w-[60vw] h-[40vw] rounded-[100px] border border-white/5"
                style={{ 
                    background: "rgba(255, 255, 255, 0.01)",
                    backdropFilter: "blur(40px)",
                }}
            />
        </div>
    );
}

