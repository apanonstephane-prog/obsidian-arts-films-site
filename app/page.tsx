import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { Process } from "@/components/sections/Process";
import { HomeCTA } from "@/components/sections/HomeCTA";

export const metadata: Metadata = {
  title: "OBSIDIAN Arts & Films — Premium Creative Production Studio",
  description:
    "High-end cinematic video production and branding agency. Music videos, commercial films, branding content, and social media campaigns for artists and brands who demand more.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <ProjectsPreview />
      <Process />
      <HomeCTA />
    </>
  );
}
