import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AudienceSections } from "@/components/sections/AudienceSections";
import { ValueProof } from "@/components/sections/ValueProof";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { Process } from "@/components/sections/Process";
import { HomeCTA } from "@/components/sections/HomeCTA";

export const metadata: Metadata = {
  title: "OBSIDIAN Arts & Films — Production Vidéo pour Artistes, Commerces et Événements",
  description:
    "Clips, vidéos promo et teasers qui attirent du public, remplissent vos événements et font venir des clients. Studio de production créative premium à Paris.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AudienceSections />
      <ValueProof />
      <ServicesPreview />
      <ProjectsPreview />
      <Process />
      <HomeCTA />
    </>
  );
}
