"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { GoldLine } from "@/components/ui/GoldLine";

const Diamond = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5 flex-shrink-0 mt-1">
    <polygon points="8,1 15,8 8,15 1,8" />
  </svg>
);

const audiences = [
  {
    id: "artistes",
    label: "Pour les artistes",
    headline: "Votre musique mérite une image à la hauteur.",
    description:
      "Un clip raté, c'est une sortie gâchée. On crée du contenu visuel qui installe votre identité, booste vos streams et fait parler de vous — avant et après la sortie.",
    benefits: [
      "Boostez votre crédibilité et votre image d'artiste",
      "Préparez votre sortie avec un contenu qui percute",
      "Créez du buzz et attirez de nouveaux fans",
      "Formats optimisés Instagram, TikTok et YouTube",
    ],
    cta: "Préparer ma sortie",
    accentColor: "text-obsidian-gold",
    borderColor: "border-obsidian-gold/20",
    bg: "bg-obsidian-black",
    number: "01",
  },
  {
    id: "commerces",
    label: "Pour les commerces & fast-food",
    headline: "Des vidéos qui font venir des clients chez vous.",
    description:
      "Une vidéo bien faite vaut mieux que dix posts photo. On crée du contenu visuel appétissant et professionnel qui donne envie — et qui convertit des vues en clients réels.",
    benefits: [
      "Attirez de nouveaux clients avec du contenu accrocheur",
      "Valorisez vos produits avec une mise en scène premium",
      "Créez des vidéos qui donnent faim et donnent envie d'acheter",
      "Adapté restaurants, fast-food, boutiques et commerces locaux",
    ],
    cta: "Attirer plus de clients",
    accentColor: "text-obsidian-silver",
    borderColor: "border-obsidian-silver/20",
    bg: "bg-obsidian-dark",
    number: "02",
  },
  {
    id: "evenements",
    label: "Pour les organisateurs d'événements",
    headline: "Remplissez votre salle avant le soir J.",
    description:
      "Un teaser bien monté crée l'attente. On produit des teasers, after-movies et contenus promo qui vendent vos événements avant même qu'ils commencent.",
    benefits: [
      "Vendez plus de billets grâce à des teasers impactants",
      "Créez du hype sur les réseaux et faites parler de votre soirée",
      "Teasez vos événements avec un montage cinématographique",
      "After-movies qui fidélisent et construisent votre réputation",
    ],
    cta: "Remplir mon événement",
    accentColor: "text-obsidian-metal",
    borderColor: "border-obsidian-metal/20",
    bg: "bg-obsidian-black",
    number: "03",
  },
];

export function AudienceSections() {
  return (
    <>
      {audiences.map((audience) => (
        <section
          key={audience.id}
          id={audience.id}
          className={`py-24 md:py-32 ${audience.bg} border-b border-obsidian-border scroll-mt-24`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Text column */}
              <FadeIn direction="left">
                <span className="section-label mb-4 block">{audience.label}</span>
                <h2 className="heading-display text-4xl md:text-5xl text-obsidian-white mb-6 leading-tight">
                  {audience.headline}
                </h2>
                <GoldLine className="w-10 mb-8" />
                <p className="text-obsidian-silver text-base leading-relaxed mb-10">
                  {audience.description}
                </p>
                <ul className="space-y-4 mb-12">
                  {audience.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-4">
                      <span className={audience.accentColor}>
                        <Diamond />
                      </span>
                      <span className="text-obsidian-light text-sm leading-relaxed">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="btn-primary group">
                    {audience.cta}
                    <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <Link href="/packages" className="btn-ghost group">
                    Voir les tarifs
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                </div>
              </FadeIn>

              {/* Decorative column */}
              <FadeIn delay={0.2}>
                <div className={`relative border ${audience.borderColor} p-12 lg:p-16 flex flex-col min-h-72`}>
                  <div
                    className={`font-display leading-none ${audience.accentColor} opacity-[0.08] select-none`}
                    style={{ fontSize: "clamp(6rem, 14vw, 11rem)" }}
                  >
                    {audience.number}
                  </div>
                  <div className="mt-auto pt-10 border-t border-obsidian-border">
                    <Link
                      href="/packages"
                      className="flex items-center gap-3 text-obsidian-silver hover:text-obsidian-gold transition-colors duration-200 text-xs tracking-widest uppercase"
                    >
                      Voir nos offres et tarifs
                      <ArrowIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>
      ))}
    </>
  );
}
