"use client";

import { motion } from "framer-motion";

const SIZES = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
  lg: "px-4 py-2 text-sm",
};

export default function SkillChip({ skill, index = 0, size = "md" }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
      className={`${SIZES[size]} rounded-full font-bold border transition-all cursor-default`}
      style={{
        background: "rgba(255, 255, 255, 0.07)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: "rgba(255, 255, 255, 0.9)",
      }}
    >
      {skill}
    </motion.span>
  );
}
