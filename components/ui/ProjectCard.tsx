"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-obsidian-grey mb-5">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-obsidian-black/20 transition-opacity duration-300 group-hover:opacity-0" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-obsidian-black/60 to-transparent" />

          {/* Overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-obsidian-black/50">
            <span className="text-xs tracking-mega-wide uppercase text-obsidian-gold border border-obsidian-gold px-6 py-3">
              View Project
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-2xl font-light text-obsidian-white group-hover:text-obsidian-gold transition-colors duration-200 mb-1">
              {project.title}
            </h3>
            <p className="text-obsidian-silver text-xs tracking-widest uppercase">
              {project.client}
            </p>
          </div>
          <div className="text-right">
            <p className="text-obsidian-silver text-xs tracking-widest uppercase">
              {project.category}
            </p>
            <p className="text-obsidian-muted text-xs mt-1">{project.year}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
