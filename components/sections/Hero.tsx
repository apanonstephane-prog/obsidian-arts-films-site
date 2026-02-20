"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-obsidian-black">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C7CBD1 1px, transparent 1px),
            linear-gradient(to bottom, #C7CBD1 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-obsidian-gold/[0.025] rounded-full blur-[200px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="max-w-5xl">

          {/* Label */}
          <motion.div
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="section-label">Studio de Production Créative</span>
            <span className="divider-gold" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="heading-display text-6xl md:text-8xl lg:text-[9rem] text-obsidian-white leading-none mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            La vision.
            <br />
            <span className="text-gradient-gold">Sans</span>
            <br />
            compromis.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-obsidian-silver text-lg md:text-xl leading-relaxed max-w-2xl mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Nous créons des films et du contenu visuel pour les artistes et les marques
            qui refusent l&apos;ordinaire. Chaque plan est une déclaration.
            Chaque seconde, délibérée.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link href="/projects" className="btn-primary group">
              Voir nos projets
              <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Démarrer un projet
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-obsidian-silver text-xs tracking-mega-wide uppercase">Défiler</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-obsidian-gold to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        className="absolute bottom-0 right-0 hidden lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        <div className="grid grid-cols-3 border-t border-l border-obsidian-border">
          {[
            { value: "150+", label: "Projets" },
            { value: "40+",  label: "Clients" },
            { value: "6",    label: "Pays" },
          ].map((stat) => (
            <div key={stat.label} className="px-8 py-5 border-r border-obsidian-border">
              <p className="font-display text-2xl text-obsidian-gold">{stat.value}</p>
              <p className="text-obsidian-silver text-xs tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
