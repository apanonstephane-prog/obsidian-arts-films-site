import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GoldLine } from "@/components/ui/GoldLine";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export const metadata: Metadata = {
  title: "About",
  description:
    "OBSIDIAN was built on a single conviction: that the gap between creative ambition and professional execution shouldn't exist. Learn about our vision, methodology, and philosophy.",
};

const values = [
  {
    title: "Specificity over scale",
    description:
      "We work with fewer clients to go deeper with each one. Our work is specific because your project deserves it—not adapted from a previous template.",
  },
  {
    title: "Restraint as power",
    description:
      "The most powerful creative decisions are often what you remove. We apply this discipline to every frame, every word, every deliverable.",
  },
  {
    title: "Intelligence before execution",
    description:
      "Beautiful work that misses the brief is a failure. We ask harder questions before we pick up a camera, so every creative decision has a strategic reason.",
  },
  {
    title: "Longevity over virality",
    description:
      "We create work that ages well—that represents you accurately in two years, not just two weeks. The internet has enough content that disappears.",
  },
];

const methodology = [
  {
    phase: "Interrogation",
    description:
      "We ask the questions your previous agencies were afraid to ask. What does success actually look like? Who is this really for? What do you want people to feel? The answers shape everything.",
  },
  {
    phase: "Architecture",
    description:
      "Before production starts, we build the creative architecture. Concept, visual language, emotional arc, strategic objectives. Each element is purposeful.",
  },
  {
    phase: "Execution",
    description:
      "Production with film-school discipline and commercial efficiency. Every crew member, every piece of equipment, every location exists to serve the idea.",
  },
  {
    phase: "Refinement",
    description:
      "Post-production where ideas are completed, not corrected. We finish what we started, ensuring the final work achieves what we set out to achieve.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="section-label mb-6 block">About OBSIDIAN</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-display text-6xl md:text-8xl text-obsidian-white mb-8 max-w-4xl">
              Built on the conviction
              <br />
              that{" "}
              <span className="text-gradient-gold">excellence is non-negotiable.</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-obsidian-dark border-b border-obsidian-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <FadeIn>
              <SectionHeader
                label="Vision"
                title="Why OBSIDIAN exists."
              />
              <p className="text-obsidian-light text-base leading-relaxed mb-6">
                OBSIDIAN was founded because the market offered a choice between affordable
                mediocrity and expensive mediocrity. Genuinely excellent creative work—work
                that thinks strategically and executes beautifully—was reserved for clients
                with major label or Fortune 500 budgets.
              </p>
              <p className="text-obsidian-silver text-base leading-relaxed">
                We built OBSIDIAN to close that gap. Not by lowering the standard, but by
                operating with greater intelligence and precision than agencies three times
                our size. We take on fewer projects, invest more in each one, and deliver
                work that performs at a level that justifies the investment.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-0 border-t border-obsidian-border">
                {[
                  ["Founded", "2019"],
                  ["Projects Completed", "150+"],
                  ["Countries Active", "6"],
                  ["Disciplines", "4"],
                  ["Team Members", "12 core"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-5 border-b border-obsidian-border"
                  >
                    <span className="text-obsidian-silver text-sm">{label}</span>
                    <span className="text-obsidian-white font-display text-xl">{value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-obsidian-charcoal border-b border-obsidian-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <SectionHeader
              label="Philosophy"
              title="Four things we believe."
              align="center"
            />
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-obsidian-border">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="p-10 border-b border-r border-obsidian-border h-full group hover:bg-obsidian-grey/50 transition-colors duration-300">
                  <GoldLine className="w-8 mb-6" />
                  <h3 className="font-display text-2xl text-obsidian-white mb-4 group-hover:text-obsidian-gold transition-colors duration-200">
                    {value.title}
                  </h3>
                  <p className="text-obsidian-silver text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-obsidian-dark border-b border-obsidian-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <SectionHeader
              label="Methodology"
              title="How we approach every project."
              subtitle="A process built over years of doing what works and eliminating what doesn't."
            />
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {methodology.map((item, i) => (
              <FadeIn key={item.phase} delay={i * 0.1}>
                <div className="p-8 border border-obsidian-border hover:border-obsidian-gold/30 transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-obsidian-gold font-display text-4xl font-light">
                      0{i + 1}
                    </span>
                    <GoldLine className="w-6" />
                  </div>
                  <h3 className="font-display text-2xl text-obsidian-white mb-4">
                    {item.phase}
                  </h3>
                  <p className="text-obsidian-silver text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why OBSIDIAN */}
      <section className="py-24 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="section-label mb-8 inline-block">Why OBSIDIAN</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="heading-display text-4xl md:text-6xl text-obsidian-white mb-10">
                We're not the right studio for everyone.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-obsidian-silver text-lg leading-relaxed mb-6">
                We're the right studio for clients who understand that creative work is an
                investment, not an expense. Who know what they're building and are serious
                about building it well. Who want a partner in the truest sense—not an order
                taker.
              </p>
              <p className="text-obsidian-silver text-lg leading-relaxed mb-12">
                If that's you, the conversation will be immediate. If you're still working
                out what you want, we're probably not the right fit yet—and we'd rather
                tell you that now.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link href="/contact" className="btn-primary">
                Let's Talk
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
