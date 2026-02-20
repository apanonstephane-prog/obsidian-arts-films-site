"use client";

import Link from "next/link";
import { getFeaturedProjects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function ProjectsPreview() {
  const featured = getFeaturedProjects();

  return (
    <section className="py-32 bg-obsidian-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
          <FadeIn>
            <SectionHeader
              label="Selected Work"
              title="Projects that moved people."
              className="mb-0"
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/projects" className="btn-ghost flex-shrink-0">
              All Projects
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
