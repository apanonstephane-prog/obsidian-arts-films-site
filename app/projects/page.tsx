import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by OBSIDIAN Arts & Films. Music videos, commercial films, brand campaigns, and social content for world-class artists and brands.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="section-label mb-6 block">Selected Work</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-display text-6xl md:text-8xl text-obsidian-white mb-8 max-w-3xl">
              Work that
              <br />
              <span className="text-gradient-gold">speaks first.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-obsidian-silver text-lg max-w-xl leading-relaxed">
              A curated selection of projects across music, commerce, and culture.
              Each one a different brief. The same standard.
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
