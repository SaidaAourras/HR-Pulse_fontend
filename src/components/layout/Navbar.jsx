"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { isAuthenticated, logout } from "@/services/authService";

const NAV = [
    { label: "Dashboard", href: "/" },
    { label: "Compétences", href: "/skills" },
    { label: "Recherche", href: "/search" },
    { label: "Predictor", href: "/predict" },
    { label: "Observabilité", href: "/observability" },
];

export default function Navbar() {
    const path = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(isAuthenticated());
    }, [path]);

    const handleLogout = () => {
        logout();
        setIsAuth(false);
        router.push("/login");
    };

    return (
        <motion.header
            initial={{ y: -72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 inset-x-0 z-50 h-20 flex items-center border-b border-white/5"
            style={{ background: "rgba(1, 4, 3, 0.75)", backdropFilter: "blur(24px)" }}
        >
            <div className="max-w-[1280px] mx-auto w-full px-6 lg:px-12 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="font-display font-black text-2xl text-white tracking-tight">
                        HR<span className="text-mint">-</span>Pulse
                    </span>
                </Link>

                {/* Desktop Nav - Centered */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV.map(({ label, href }) => {
                        const active = path === href;
                        return (
                            <Link key={href} href={href}>
                                <motion.span
                                    className={clsx(
                                        "text-sm font-medium transition-colors duration-200 cursor-pointer",
                                        active ? "text-white" : "text-white/60 hover:text-white"
                                    )}
                                >
                                    {label}
                                </motion.span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-6">
                    {isAuth ? (
                        <button 
                            onClick={handleLogout}
                            className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="text-sm font-semibold text-white/80 hover:text-white transition-colors">
                                    Sign in
                                </button>
                            </Link>
                            <Link href="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-forest-dark px-5 py-2.5 rounded-xl font-bold text-sm shadow-xl"
                                >
                                    Démarrer l&apos;analyse
                                </motion.button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile burger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Menu"
                >
                    {[0, 1, 2].map((i) => (
                        <span key={i} className="w-5 h-0.5 rounded-full block transition-all"
                            style={{
                                background: "#00ffbb",
                                transform: i === 0 && open ? "rotate(45deg) translateY(8px)" : i === 2 && open ? "rotate(-45deg) translateY(-8px)" : undefined,
                                opacity: i === 1 && open ? 0 : 1
                            }}
                        />
                    ))}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden border-t px-6 py-6 space-y-2 shadow-2xl"
                    style={{ background: "#010403", borderColor: "rgba(255,255,255,0.05)" }}
                >
                    {NAV.map(({ label, href }) => (
                        <Link key={href} href={href} onClick={() => setOpen(false)}>
                            <div className={clsx("px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                path === href ? "text-white" : "text-white/60 hover:text-white")}
                                style={path === href ? { background: "rgba(0,255,187,0.15)" } : {}}
                            >{label}</div>
                        </Link>
                    ))}
                </motion.div>
            )}
        </motion.header>
    );
}
