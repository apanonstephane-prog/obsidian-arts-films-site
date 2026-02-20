"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GoldLine } from "@/components/ui/GoldLine";

const steps = [
  {
    number: "01",
    title: "Strategic Alignment",
    description:
      "Before any creative decisions are made, we spend time understanding your objectives, your audience, and what success actually looks like. This conversation shapes everything that follows.",
  },
  {
    number: "02",
    title: "Concept Development",
    description:
      "We develop a creative concept that is specific to you—not adapted from a template. Each concept is pressure-tested against your brief before a single frame is planned.",
  },
  {
    number: "03",
    title: "Precision Production",
    description:
      "Production executed with obsessive attention to detail. Every element—from location to lighting to performance—is selected because it serves the idea, not because it's convenient.",
  },
  {
    number: "04",
    title: "Refined Delivery",
    description:
      "Post-production and final delivery built around your timeline and platform requirements. The work doesn't leave our hands until it's ready to perform.",
  },
];

export function Process() {
  return (
    <section className="py-32 bg-obsidian-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="How We Work"
            title="Process is what separates good from great."
            subtitle="A four-phase approach designed to eliminate ambiguity and deliver creative work that performs."
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
