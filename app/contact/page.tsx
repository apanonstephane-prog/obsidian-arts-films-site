import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with OBSIDIAN Arts & Films. Tell us about your vision and we'll respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="section-label mb-6 block">Get in Touch</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-display text-6xl md:text-8xl text-obsidian-white mb-8 max-w-3xl">
              Let's make
              <br />
              <span className="text-gradient-gold">something real.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-obsidian-silver text-lg max-w-xl leading-relaxed">
              Tell us what you're working on. We'll review your brief and respond
              within 24 hours with our initial thoughts.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-32 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-4">
              <FadeIn direction="left">
                <div className="space-y-10 sticky top-32">
                  <div>
                    <h3 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-4">
                      Direct
                    </h3>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-obsidian-gold hover:text-obsidian-gold-light transition-colors duration-200 text-sm tracking-wider"
                    >
                      {siteConfig.email}
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-4">
                      Response Time
                    </h3>
                    <p className="text-obsidian-light text-sm">Within 24 hours</p>
                    <p className="text-obsidian-muted text-xs mt-1">
                      Monday – Friday
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-4">
                      Social
                    </h3>
                    <div className="space-y-3">
                      <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-obsidian-light text-sm hover:text-obsidian-gold transition-colors duration-200"
                      >
                        Instagram
                      </a>
                      <a
                        href={siteConfig.social.vimeo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-obsidian-light text-sm hover:text-obsidian-gold transition-colors duration-200"
                      >
                        Vimeo
                      </a>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-obsidian-border">
                    <p className="text-obsidian-silver text-xs leading-relaxed">
                      We respond to every inquiry personally. No automated responses,
                      no sales calls—just a direct conversation about your project.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
