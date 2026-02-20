import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GoldLine } from "@/components/ui/GoldLine";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "OBSIDIAN a été fondé sur une conviction unique : que l'écart entre ambition créative et exécution professionnelle ne devrait pas exister. Notre vision, méthodologie et philosophie.",
};

const values = [
  {
    title: "Spécificité plutôt qu'échelle",
    description:
      "Nous travaillons avec moins de clients pour aller plus loin avec chacun. Notre travail est spécifique parce que votre projet le mérite — pas adapté d'un modèle précédent.",
  },
  {
    title: "La retenue comme puissance",
    description:
      "Les décisions créatives les plus puissantes sont souvent ce que vous supprimez. Nous appliquons cette discipline à chaque plan, chaque mot, chaque livrable.",
  },
  {
    title: "L'intelligence avant l'exécution",
    description:
      "Un beau travail qui rate le brief est un échec. Nous posons les questions difficiles avant de saisir une caméra, afin que chaque décision créative ait une raison stratégique.",
  },
  {
    title: "La durabilité plutôt que la viralité",
    description:
      "Nous créons un travail qui vieillit bien — qui vous représente fidèlement dans deux ans, pas seulement deux semaines. L'internet a assez de contenu éphémère.",
  },
];

const methodology = [
  {
    phase: "Interrogation",
    description:
      "Nous posons les questions que vos agences précédentes avaient peur de poser. À quoi ressemble vraiment le succès ? Pour qui est-ce vraiment ? Que voulez-vous faire ressentir ? Les réponses façonnent tout.",
  },
  {
    phase: "Architecture",
    description:
      "Avant le début de la production, nous construisons l'architecture créative. Concept, langage visuel, arc émotionnel, objectifs stratégiques. Chaque élément est intentionnel.",
  },
  {
    phase: "Exécution",
    description:
      "Une production menée avec la rigueur d'une école de cinéma et l'efficacité commerciale. Chaque membre de l'équipe, chaque équipement, chaque lieu existe pour servir l'idée.",
  },
  {
    phase: "Affinement",
    description:
      "La post-production où les idées s'achèvent, pas se corrigent. Nous terminons ce que nous avons commencé, en veillant à ce que le travail final atteigne ce que nous avions prévu.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="section-label mb-6 block">À propos d&apos;OBSIDIAN</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-display text-6xl md:text-8xl text-obsidian-white mb-8 max-w-4xl">
              Fondé sur la conviction
              <br />
              que{" "}
              <span className="text-gradient-gold">l&apos;excellence n&apos;est pas négociable.</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-obsidian-dark border-b border-obsidian-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <FadeIn>
              <SectionHeader
                label="Vision"
                title="Pourquoi OBSIDIAN existe."
              />
              <p className="text-obsidian-light text-base leading-relaxed mb-6">
                OBSIDIAN a été fondé parce que le marché offrait un choix entre médiocrité
                abordable et médiocrité coûteuse. Un travail créatif véritablement excellent —
                qui pense stratégiquement et s&apos;exécute magnifiquement — était réservé aux
                clients avec des budgets de major label ou Fortune 500.
              </p>
              <p className="text-obsidian-silver text-base leading-relaxed">
                Nous avons construit OBSIDIAN pour combler cet écart. Pas en abaissant le
                standard, mais en opérant avec plus d&apos;intelligence et de précision que des
                agences trois fois notre taille. Nous prenons moins de projets, investissons
                davantage dans chacun, et livrons un travail qui performe à un niveau qui
                justifie l&apos;investissement.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-0 border-t border-obsidian-border">
                {[
                  ["Fondé en", "2019"],
                  ["Projets réalisés", "150+"],
                  ["Pays actifs", "6"],
                  ["Disciplines", "4"],
                  ["Membres d'équipe", "12 permanents"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-5 border-b border-obsidian-border"
                  >
                    <span className="text-obsidian-silver text-sm">{label}</span>
                    <span className="text-obsidian-white font-display text-xl">{value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-obsidian-charcoal border-b border-obsidian-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <SectionHeader
              label="Philosophie"
              title="Quatre choses en lesquelles nous croyons."
              align="center"
            />
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-obsidian-border">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="p-10 border-b border-r border-obsidian-border h-full group hover:bg-obsidian-grey/50 transition-colors duration-300">
                  <GoldLine className="w-8 mb-6" />
                  <h3 className="font-display text-2xl text-obsidian-white mb-4 group-hover:text-obsidian-gold transition-colors duration-200">
                    {value.title}
                  </h3>
                  <p className="text-obsidian-silver text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-obsidian-dark border-b border-obsidian-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <SectionHeader
              label="Méthodologie"
              title="Notre approche de chaque projet."
              subtitle="Un processus construit au fil des années, en gardant ce qui fonctionne et en éliminant ce qui ne fonctionne pas."
            />
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {methodology.map((item, i) => (
              <FadeIn key={item.phase} delay={i * 0.1}>
                <div className="p-8 border border-obsidian-border hover:border-obsidian-gold/30 transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-obsidian-gold font-display text-4xl font-light">
                      0{i + 1}
                    </span>
                    <GoldLine className="w-6" />
                  </div>
                  <h3 className="font-display text-2xl text-obsidian-white mb-4">
                    {item.phase}
                  </h3>
                  <p className="text-obsidian-silver text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why OBSIDIAN */}
      <section className="py-24 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="section-label mb-8 inline-block">Pourquoi OBSIDIAN</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="heading-display text-4xl md:text-6xl text-obsidian-white mb-10">
                Nous ne sommes pas le bon studio pour tout le monde.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-obsidian-silver text-lg leading-relaxed mb-6">
                Nous sommes le bon studio pour les clients qui comprennent que le travail
                créatif est un investissement, pas une dépense. Qui savent ce qu&apos;ils
                construisent et sont sérieux dans leur démarche. Qui veulent un partenaire
                au sens plein du terme — pas un simple exécutant.
              </p>
              <p className="text-obsidian-silver text-lg leading-relaxed mb-12">
                Si c&apos;est vous, la conversation sera immédiate. Si vous cherchez encore ce
                que vous voulez, nous ne sommes probablement pas le bon choix pour le
                moment — et nous préférons vous le dire maintenant.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link href="/contact" className="btn-primary">
                Parlons-en
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
