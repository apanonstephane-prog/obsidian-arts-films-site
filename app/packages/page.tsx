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
              Trois offres construites autour de différentes échelles d&apos;ambition créative.
              Chacune est un engagement complet — conçu pour que vous sachiez exactement
              ce que vous obtenez et pourquoi cela coûte ce que cela coûte.
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
