"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function HomeCTA() {
  return (
    <section className="relative py-40 bg-obsidian-dark overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-obsidian-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <FadeIn>
          <p className="section-label mb-8 inline-block">Ready to Begin</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="heading-display text-5xl md:text-7xl lg:text-8xl text-obsidian-white mb-8 max-w-4xl mx-auto">
            Your vision deserves
            <span className="text-gradient-gold"> better execution.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-obsidian-silver text-lg max-w-xl mx-auto mb-14">
            Tell us what you're building. We'll tell you how we can make it unforgettable.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="btn-primary">
              Start a Project
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link href="/packages" className="btn-outline">
              View Packages
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
