import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Démarrez un projet avec OBSIDIAN Arts & Films. Partagez votre vision et nous vous répondrons sous 24 heures.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 bg-obsidian-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="section-label mb-6 block">Nous contacter</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-display text-6xl md:text-8xl text-obsidian-white mb-8 max-w-3xl">
              Parlez-nous de
              <br />
              <span className="text-gradient-gold">votre projet.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-4 py-1.5 border border-obsidian-gold/40 text-obsidian-gold text-xs tracking-widest uppercase">
                Réponse sous 24h
              </span>
            </div>
            <p className="text-obsidian-silver text-lg max-w-xl leading-relaxed">
              Décrivez votre projet — artiste, commerce ou événement. Nous revenons
              vers vous rapidement avec une première proposition concrète.
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
                      Délai de réponse
                    </h3>
                    <p className="text-obsidian-light text-sm">Sous 24 heures</p>
                    <p className="text-obsidian-muted text-xs mt-1">
                      Lundi – Vendredi
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-4">
                      Réseaux sociaux
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
                    </div>
                  </div>

                  <div className="pt-8 border-t border-obsidian-border">
                    <p className="text-obsidian-silver text-xs leading-relaxed">
                      Nous répondons personnellement à chaque demande. Pas de réponses
                      automatisées, pas d&apos;appels commerciaux — juste une conversation
                      directe sur votre projet.
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
