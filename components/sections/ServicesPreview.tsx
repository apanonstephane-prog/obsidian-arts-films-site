"use client";

import Link from "next/link";
import { services } from "@/data/services";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

const icons: Record<string, React.ReactNode> = {
  film: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
      <polygon points="12 2 22 12 12 22 2 12 12 2" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

export function ServicesPreview() {
  return (
    <section className="py-32 bg-obsidian-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          <div className="lg:w-2/5">
            <FadeIn>
              <SectionHeader
                label="Ce que nous faisons"
                title="Fait pour l'impact, pas pour l'imitation."
                subtitle="Quatre disciplines. Une obsession : faire ressentir quelque chose d'inoubliable à votre audience."
              />
              <Link href="/services" className="btn-outline">
                All Services
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>

          <div className="lg:w-3/5">
            <StaggerChildren className="space-y-0">
              {services.map((service, i) => (
                <StaggerItem key={service.id}>
                  <Link
                    href="/services"
                    className="group flex items-start gap-6 py-8 border-b border-obsidian-border hover:border-obsidian-gold/30 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-obsidian-gold">
                      {icons[service.icon]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display text-xl text-obsidian-white group-hover:text-obsidian-gold transition-colors duration-200">
                          {service.title}
                        </h3>
                        <span className="text-obsidian-muted text-xs">0{i + 1}</span>
                      </div>
                      <p className="text-obsidian-silver text-sm leading-relaxed">
                        {service.subtitle}
                      </p>
                    </div>
                    <ArrowIcon className="w-4 h-4 text-obsidian-silver group-hover:text-obsidian-gold transition-colors duration-200 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
}
