import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { Process } from "@/components/sections/Process";
import { HomeCTA } from "@/components/sections/HomeCTA";

export const metadata: Metadata = {
  title: "OBSIDIAN Arts & Films — Studio de production créative haut de gamme",
  description:
    "Studio de production cinématographique haut de gamme. Clips musicaux, films publicitaires, contenu de marque et campagnes réseaux sociaux pour les artistes et les marques qui exigent davantage.",
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
