import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";

const proofs = [
  {
    label: "Production rapide",
    description: "Livraison en 5 à 14 jours selon la formule choisie. Pas de délais interminables.",
  },
  {
    label: "Style premium",
    description: "Un rendu cinématographique de haute qualité, accessible à tous les budgets.",
  },
  {
    label: "Pensé pour les réseaux",
    description: "Formats optimisés Instagram, TikTok, YouTube et Reels — prêts à publier.",
  },
  {
    label: "Adapté à votre activité",
    description: "Artistes, commerces, événements — on maîtrise chaque univers et chaque besoin.",
  },
];

export function ValueProof() {
  return (
    <section className="py-20 bg-obsidian-charcoal border-b border-obsidian-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="section-label text-center mb-14">Pourquoi OBSIDIAN</p>
        </FadeIn>
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-obsidian-border">
          {proofs.map((proof) => (
            <StaggerItem key={proof.label}>
              <div className="p-8 border-r border-b border-obsidian-border h-full group hover:bg-obsidian-dark/60 transition-colors duration-300">
                <div className="w-2 h-2 bg-obsidian-gold rotate-45 mb-6" />
                <h3 className="font-display text-lg text-obsidian-white mb-3 group-hover:text-obsidian-gold transition-colors duration-200">
                  {proof.label}
                </h3>
                <p className="text-obsidian-silver text-sm leading-relaxed">
                  {proof.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
