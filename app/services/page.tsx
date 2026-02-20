import type { Metadata } from "next";
import { services } from "@/data/services";
import { FadeIn } from "@/components/animations/FadeIn";
import { GoldLine } from "@/components/ui/GoldLine";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Production cinématographique, identité de marque, contenu réseaux sociaux et production de campagne. Services créatifs de bout en bout pour les artistes et les marques.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="section-label mb-6 block">Nos services</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-display text-6xl md:text-8xl text-obsidian-white mb-8 max-w-4xl">
              Quatre disciplines.
              <br />
              <span className="text-gradient-gold">Un seul standard.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-obsidian-silver text-lg max-w-2xl leading-relaxed">
              Nous ne proposons pas tout. Nous avons choisi les disciplines où nous pouvons
              être véritablement exceptionnels, et nous avons construit chaque processus,
              chaque décision autour de cet objectif.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Detail */}
      <section className="bg-obsidian-dark">
        {services.map((service, i) => (
          <div
            key={service.id}
            id={service.id}
            className={`border-b border-obsidian-border ${
              i % 2 === 0 ? "bg-obsidian-dark" : "bg-obsidian-charcoal"
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                {/* Left */}
                <FadeIn direction="left">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-obsidian-gold font-display text-5xl font-light">0{i + 1}</span>
                    </div>
                    <h2 className="heading-display text-4xl md:text-5xl text-obsidian-white mb-4">
                      {service.title}
                    </h2>
                    <p className="text-obsidian-gold text-sm tracking-widest uppercase mb-8">
                      {service.subtitle}
                    </p>
                    <GoldLine className="w-16 mb-8" />
                    <p className="text-obsidian-silver text-base leading-relaxed mb-10">
                      {service.description}
                    </p>
                    <p className="text-obsidian-light text-sm leading-relaxed italic border-l-2 border-obsidian-gold pl-6">
                      {service.valueProposition}
                    </p>
                  </div>
                </FadeIn>

                {/* Right — Deliverables */}
                <FadeIn direction="right" delay={0.2}>
                  <div>
                    <h3 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-8">
                      Ce qui est inclus
                    </h3>
                    <ul className="space-y-4">
                      {service.deliverables.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-4 pb-4 border-b border-obsidian-border last:border-0"
                        >
                          <span className="text-obsidian-gold mt-1 flex-shrink-0">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                              <polygon points="8,1 15,8 8,15 1,8" />
                            </svg>
                          </span>
                          <span className="text-obsidian-light text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10">
                      <Link href="/contact" className="btn-outline">
                        Discuter de ce service
                        <ArrowIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-32 bg-obsidian-black text-center">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="section-label mb-8 inline-block">Prêt à travailler</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="heading-display text-5xl md:text-6xl text-obsidian-white mb-8">
              Vous ne savez pas quel service vous convient ?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-obsidian-silver text-lg mb-10 max-w-xl mx-auto">
              Dites-nous ce que vous cherchez à accomplir. Nous recommanderons la bonne
              approche et construirons un périmètre sur mesure adapté à vos objectifs.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link href="/contact" className="btn-primary">
              Démarrer la conversation
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
