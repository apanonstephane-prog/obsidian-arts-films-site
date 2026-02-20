import type { Metadata } from "next";
import Link from "next/link";
import { packages } from "@/data/packages";
import { FadeIn } from "@/components/animations/FadeIn";
import { GoldLine } from "@/components/ui/GoldLine";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Offres",
  description:
    "Trois offres de production conçues pour différents niveaux d'ambition créative. Essentiel, Premium et Ultra — chacune pensée autour d'un type spécifique de client et de projet.",
};

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="section-label mb-6 block">Investissement</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-display text-6xl md:text-8xl text-obsidian-white mb-8 max-w-4xl">
              Choisissez votre
              <br />
              <span className="text-gradient-gold">niveau d&apos;ambition.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-obsidian-silver text-lg max-w-2xl leading-relaxed">
              Choisissez l&apos;offre adaptée à votre projet. Chaque formule est pensée
              pour générer de l&apos;impact, pas juste de belles images.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="pb-32 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-l border-obsidian-border">
            {packages.map((pkg) => (
              <FadeIn key={pkg.id}>
                <div
                  className={cn(
                    "relative border-r border-b border-obsidian-border p-10 flex flex-col h-full transition-colors duration-300",
                    pkg.featured
                      ? "bg-obsidian-charcoal"
                      : "bg-obsidian-dark hover:bg-obsidian-charcoal"
                  )}
                >
                  {pkg.featured && (
                    <div className="absolute top-0 left-10 right-10">
                      <div className="h-px bg-gradient-to-r from-transparent via-obsidian-gold to-transparent" />
                      <div className="text-center -mt-2.5">
                        <span className="bg-obsidian-charcoal px-4 text-obsidian-gold text-xs tracking-mega-wide uppercase">
                          Le plus choisi
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-8">
                    <span className="text-obsidian-muted font-display text-5xl font-light block mb-2">
                      {pkg.tier}
                    </span>
                    <h2 className="font-display text-4xl text-obsidian-white mb-2">
                      {pkg.name}
                    </h2>
                    <p className="text-obsidian-gold text-xs tracking-widest uppercase">
                      {pkg.tagline}
                    </p>
                  </div>

                  <GoldLine className={cn("w-12 mb-8", !pkg.featured && "opacity-40")} />

                  {/* Description */}
                  <p className="text-obsidian-silver text-sm leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Price & Timeline */}
                  <div className="flex items-end justify-between mb-8 pb-8 border-b border-obsidian-border">
                    <div>
                      <p className="text-obsidian-white font-display text-3xl">{pkg.price}</p>
                      <p className="text-obsidian-silver text-xs mt-1 tracking-wider">
                        Investissement de départ
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-obsidian-gold text-sm">{pkg.timeline}</p>
                      <p className="text-obsidian-silver text-xs mt-1 tracking-wider">
                        Délai
                      </p>
                    </div>
                  </div>

                  {/* Ideal Client */}
                  <div className="mb-8">
                    <h3 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-3">
                      Idéal pour
                    </h3>
                    <p className="text-obsidian-light text-sm leading-relaxed">
                      {pkg.idealClient}
                    </p>
                  </div>

                  {/* Included */}
                  <div className="mb-10 flex-1">
                    <h3 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-4">
                      Inclus
                    </h3>
                    <ul className="space-y-3">
                      {pkg.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-obsidian-gold mt-1 flex-shrink-0">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
                              <polygon points="8,1 15,8 8,15 1,8" />
                            </svg>
                          </span>
                          <span className="text-obsidian-light text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className={cn(
                      "w-full text-center py-4 text-xs tracking-widest uppercase transition-all duration-300",
                      pkg.featured
                        ? "btn-primary justify-center"
                        : "btn-outline justify-center"
                    )}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Video Pricing */}
      <section className="py-24 bg-obsidian-dark border-t border-obsidian-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16">
              <span className="section-label mb-6 block">Production Artiste</span>
              <h2 className="heading-display text-4xl md:text-5xl text-obsidian-white max-w-3xl">
                Tarifs Production Vidéo pour Artistes
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-l border-obsidian-border">
            {/* ESSENTIEL */}
            <FadeIn>
              <div className="border-r border-b border-obsidian-border p-10 bg-obsidian-dark hover:bg-obsidian-charcoal transition-colors duration-300 flex flex-col h-full">
                <h3 className="font-display text-3xl text-obsidian-white mb-2">Essentiel</h3>
                <GoldLine className="w-8 mb-8 opacity-40" />

                {/* Prices */}
                <div className="space-y-0 border-t border-obsidian-border mb-8">
                  {[["15s", "290\u00a0€"], ["30s", "490\u00a0€"], ["60s", "790\u00a0€"]].map(([dur, price]) => (
                    <div key={dur} className="flex items-center justify-between py-3 border-b border-obsidian-border">
                      <span className="text-obsidian-silver text-sm tracking-widest uppercase">{dur}</span>
                      <span className="font-display text-xl text-obsidian-white">{price}</span>
                    </div>
                  ))}
                </div>

                {/* Inclus */}
                <div className="flex-1">
                  <h4 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-4">Inclus</h4>
                  <ul className="space-y-2.5">
                    {[
                      "1 vidéo",
                      "8–12 plans visuels",
                      "Animation pro",
                      "1 format",
                      "1 révision",
                      "Livraison 5–7 jours",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-obsidian-gold mt-1 flex-shrink-0">
                          <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
                            <polygon points="8,1 15,8 8,15 1,8" />
                          </svg>
                        </span>
                        <span className="text-obsidian-light text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact" className="btn-outline justify-center text-center mt-10 py-4 text-xs tracking-widest uppercase">
                  Démarrer
                </Link>
              </div>
            </FadeIn>

            {/* PREMIUM */}
            <FadeIn delay={0.1}>
              <div className="relative border-r border-b border-obsidian-border p-10 bg-obsidian-charcoal flex flex-col h-full">
                <div className="absolute top-0 left-10 right-10">
                  <div className="h-px bg-gradient-to-r from-transparent via-obsidian-gold to-transparent" />
                  <div className="text-center -mt-2.5">
                    <span className="bg-obsidian-charcoal px-4 text-obsidian-gold text-xs tracking-mega-wide uppercase">
                      Le plus populaire
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-3xl text-obsidian-white mb-2 mt-4">Premium</h3>
                <GoldLine className="w-8 mb-8" />

                {/* Prices */}
                <div className="space-y-0 border-t border-obsidian-border mb-8">
                  {[["15s", "590\u00a0€"], ["30s", "890\u00a0€"], ["60s", "1\u202f390\u00a0€"]].map(([dur, price]) => (
                    <div key={dur} className="flex items-center justify-between py-3 border-b border-obsidian-border">
                      <span className="text-obsidian-silver text-sm tracking-widest uppercase">{dur}</span>
                      <span className="font-display text-xl text-obsidian-gold">{price}</span>
                    </div>
                  ))}
                </div>

                {/* Inclus */}
                <div className="flex-1">
                  <h4 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-4">Inclus</h4>
                  <ul className="space-y-2.5">
                    {[
                      "3 vidéos",
                      "15–20 plans premium",
                      "Animation avancée",
                      "Sound design pro",
                      "2 formats",
                      "2 révisions",
                      "Livraison 7–10 jours",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-obsidian-gold mt-1 flex-shrink-0">
                          <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
                            <polygon points="8,1 15,8 8,15 1,8" />
                          </svg>
                        </span>
                        <span className="text-obsidian-light text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact" className="btn-primary justify-center text-center mt-10 py-4 text-xs tracking-widest uppercase">
                  Explorer Premium
                </Link>
              </div>
            </FadeIn>

            {/* ULTRA */}
            <FadeIn delay={0.2}>
              <div className="border-r border-b border-obsidian-border p-10 bg-obsidian-dark hover:bg-obsidian-charcoal transition-colors duration-300 flex flex-col h-full">
                <h3 className="font-display text-3xl text-obsidian-white mb-2">Ultra</h3>
                <GoldLine className="w-8 mb-8 opacity-40" />

                {/* Prices */}
                <div className="space-y-0 border-t border-obsidian-border mb-8">
                  {[["15s", "1\u202f090\u00a0€"], ["30s", "1\u202f590\u00a0€"], ["60s", "2\u202f390\u00a0€"]].map(([dur, price]) => (
                    <div key={dur} className="flex items-center justify-between py-3 border-b border-obsidian-border">
                      <span className="text-obsidian-silver text-sm tracking-widest uppercase">{dur}</span>
                      <span className="font-display text-xl text-obsidian-white">{price}</span>
                    </div>
                  ))}
                </div>

                {/* Inclus */}
                <div className="flex-1">
                  <h4 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-4">Inclus</h4>
                  <ul className="space-y-2.5">
                    {[
                      "5 vidéos",
                      "Concept sur-mesure",
                      "25–30 plans premium",
                      "Animation cinéma",
                      "3 formats",
                      "3 révisions",
                      "Livraison 10–14 jours",
                      "Voix-off disponible",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-obsidian-gold mt-1 flex-shrink-0">
                          <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
                            <polygon points="8,1 15,8 8,15 1,8" />
                          </svg>
                        </span>
                        <span className="text-obsidian-light text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact" className="btn-outline justify-center text-center mt-10 py-4 text-xs tracking-widest uppercase">
                  Commander Ultra
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-20 bg-obsidian-dark border-t border-obsidian-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <h2 className="heading-display text-3xl md:text-4xl text-obsidian-white mb-6">
              Besoin d&apos;une solution personnalisée ?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-obsidian-silver text-base leading-relaxed mb-10 max-w-2xl mx-auto">
              Nos offres sont des points de départ, pas des limites. Les projets complexes,
              les campagnes multi-phases ou les relations de partenariat continu sont tous
              structurés selon vos besoins spécifiques. Dites-nous ce que vous construisez
              et nous concevrons le bon modèle d&apos;engagement.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/contact" className="btn-ghost">
              Discuter d&apos;une offre sur mesure
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
