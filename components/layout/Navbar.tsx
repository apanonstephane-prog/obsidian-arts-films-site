"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/",         label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projets" },
  { href: "/about",    label: "Studio" },
  { href: "/packages", label: "Offres" },
  { href: "/contact",  label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-obsidian-black/92 backdrop-blur-md border-b border-obsidian-border"
            : "bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3" aria-label="OBSIDIAN Arts et Films — Accueil">
              <Image
                src="/brand/icon-white.svg"
                alt="OBSIDIAN Arts et Films"
                width={32}
                height={27}
                className="transition-opacity duration-300 group-hover:opacity-75"
                priority
              />
              <span className="font-display text-base tracking-ultra-wide uppercase text-obsidian-white">
                OBSIDIAN
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Navigation principale">
              {navLinks.slice(1, -1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs tracking-widest uppercase transition-colors duration-200",
                    pathname === link.href
                      ? "text-obsidian-gold"
                      : "text-obsidian-silver hover:text-obsidian-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex">
              <Link href="/contact" className="btn-primary text-xs py-3 px-6">
                Démarrer un projet
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block w-6 h-px bg-obsidian-white origin-center"
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-4 h-px bg-obsidian-white"
                animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-px bg-obsidian-white origin-center"
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-obsidian-black flex flex-col justify-center px-8"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-8" aria-label="Menu mobile">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-display text-4xl font-light tracking-tight transition-colors duration-200",
                      pathname === link.href
                        ? "text-obsidian-gold"
                        : "text-obsidian-white hover:text-obsidian-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mt-16 pt-8 border-t border-obsidian-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-obsidian-silver text-xs tracking-widest uppercase">
                hello@obsidian-arts.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
