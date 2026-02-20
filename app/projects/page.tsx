import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Travaux sélectionnés par OBSIDIAN Arts & Films. Clips musicaux, films publicitaires, campagnes de marque et contenu réseaux sociaux pour des artistes et marques d'exception.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="section-label mb-6 block">Travaux sélectionnés</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-display text-6xl md:text-8xl text-obsidian-white mb-8 max-w-3xl">
              Un travail qui
              <br />
              <span className="text-gradient-gold">parle en premier.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-obsidian-silver text-lg max-w-xl leading-relaxed">
              Une sélection de projets en musique, commerce et culture.
              Chacun avec un brief différent. Le même exigence.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
