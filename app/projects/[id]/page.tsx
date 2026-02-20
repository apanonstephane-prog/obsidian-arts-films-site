import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectById } from "@/data/projects";
import { FadeIn } from "@/components/animations/FadeIn";
import { GoldLine } from "@/components/ui/GoldLine";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectById(params.id);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: `${project.title} — ${project.client}`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectById(params.id);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-end pb-20 overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black via-obsidian-black/40 to-obsidian-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-obsidian-gold text-xs tracking-mega-wide uppercase">
                {project.category}
              </span>
              <span className="w-4 h-px bg-obsidian-gold" />
              <span className="text-obsidian-silver text-xs tracking-widest uppercase">
                {project.client}
              </span>
              <span className="w-4 h-px bg-obsidian-silver" />
              <span className="text-obsidian-silver text-xs">{project.year}</span>
            </div>
            <h1 className="heading-display text-7xl md:text-9xl text-obsidian-white">
              {project.title}
            </h1>
            <p className="text-obsidian-silver text-xl mt-4 max-w-lg">{project.tagline}</p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="bg-obsidian-dark py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Tags sidebar */}
            <div className="lg:col-span-3">
              <FadeIn direction="left">
                <h3 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-6">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 border border-obsidian-border text-obsidian-silver text-xs tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Main content */}
            <div className="lg:col-span-9 space-y-20">
              {[
                { label: "Contexte", content: project.context },
                { label: "Stratégie", content: project.strategy },
                { label: "Exécution", content: project.execution },
                { label: "Résultats", content: project.results },
              ].map((section, i) => (
                <FadeIn key={section.label} delay={i * 0.1}>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="section-label">{section.label}</span>
                      <GoldLine className="w-8" />
                    </div>
                    <p className="text-obsidian-light text-lg leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="border-t border-obsidian-border">
        <Link
          href={`/projects/${nextProject.id}`}
          className="group block relative overflow-hidden h-64"
        >
          <Image
            src={nextProject.coverImage}
            alt={nextProject.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-obsidian-black/70 group-hover:bg-obsidian-black/50 transition-colors duration-300" />
          <div className="relative z-10 flex items-center justify-between h-full max-w-7xl mx-auto px-6 lg:px-12">
            <div>
              <p className="text-obsidian-silver text-xs tracking-mega-wide uppercase mb-2">
                Projet suivant
              </p>
              <h3 className="font-display text-4xl text-obsidian-white group-hover:text-obsidian-gold transition-colors duration-300">
                {nextProject.title}
              </h3>
              <p className="text-obsidian-silver text-sm mt-1">{nextProject.client}</p>
            </div>
            <ArrowIcon className="w-8 h-8 text-obsidian-gold group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </Link>
      </section>

      {/* Back nav */}
      <div className="bg-obsidian-dark py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link
            href="/projects"
            className="flex items-center gap-3 text-obsidian-silver hover:text-obsidian-gold transition-colors duration-200 text-xs tracking-widest uppercase"
          >
            <ArrowIcon className="w-4 h-4" direction="left" />
            Tous les projets
          </Link>
        </div>
      </div>
    </>
  );
}
