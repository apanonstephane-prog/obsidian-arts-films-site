"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GoldLine } from "@/components/ui/GoldLine";

const steps = [
  {
    number: "01",
    title: "Alignement stratégique",
    description:
      "Avant toute décision créative, nous prenons le temps de comprendre vos objectifs, votre audience et ce que signifie vraiment le succès. Cette conversation façonne tout ce qui suit.",
  },
  {
    number: "02",
    title: "Développement du concept",
    description:
      "Nous développons un concept créatif spécifique à vous — pas adapté d\'un modèle. Chaque concept est testé face à votre brief avant qu\'un seul plan ne soit planifié.",
  },
  {
    number: "03",
    title: "Production précise",
    description:
      "Une production menée avec une attention obsessionnelle aux détails. Chaque élément — lieu, lumière, performance — est choisi parce qu\'il sert l\'idée, pas parce qu\'il est pratique.",
  },
  {
    number: "04",
    title: "Livraison affinée",
    description:
      "Post-production et livraison finale construites autour de vos délais et de vos besoins en plateforme. Le travail ne quitte pas nos mains avant d\'être prêt à performer.",
  },
];

export function Process() {
  return (
    <section className="py-32 bg-obsidian-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Notre méthode"
            title="Le processus sépare le bon de l'exceptionnel."
            subtitle="Une approche en quatre phases conçue pour éliminer l'ambiguïté et produire un travail créatif qui performe."
            align="center"
          />
        </FadeIn>

        <div className="relative">
          {/* Horizontal line connecting steps - desktop */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-obsidian-border" />

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="relative pt-0 lg:pt-0 group">
                  {/* Number with connecting dot */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full border border-obsidian-gold bg-obsidian-charcoal flex-shrink-0 transition-colors duration-300 group-hover:bg-obsidian-gold" />
                    </div>
                    <span className="text-obsidian-gold font-display text-lg">{step.number}</span>
                  </div>
                  <GoldLine className="w-8 mb-6 opacity-40" />
                  <h3 className="font-display text-2xl text-obsidian-white mb-4 group-hover:text-obsidian-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-obsidian-silver text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
