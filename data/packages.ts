export interface Package {
  id: string;
  name: string;
  tier: string;
  tagline: string;
  description: string;
  price: string;
  timeline: string;
  idealClient: string;
  included: string[];
  cta: string;
  featured: boolean;
}

export const packages: Package[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    tier: "01",
    tagline: "La base essentielle.",
    description:
      "Pour les marques et les artistes qui ont besoin d'une production créative forte et ciblée. Un projet, exécuté avec un engagement total.",
    price: "À partir de 5 000 €",
    timeline: "3 à 4 semaines",
    idealClient:
      "Artistes indépendants, marques émergentes et entreprises en phase de démarrage qui ont besoin d'un livrable unique de haute qualité pour établir leur présence visuelle.",
    included: [
      "Production d'un projet unique (vidéo ou photo)",
      "Développement du concept créatif",
      "Planification de la pré-production",
      "1 journée de tournage",
      "Post-production et montage",
      "2 rounds de corrections",
      "Livraison finale en 3 formats",
      "Droits d'utilisation pour 2 ans",
    ],
    cta: "Démarrer la conversation",
    featured: false,
  },
  {
    id: "premium",
    name: "Premium",
    tier: "02",
    tagline: "La campagne complète.",
    description:
      "Un engagement créatif complet. Stratégie, production et contenu — conçus pour toucher votre audience et maintenir la dynamique.",
    price: "À partir de 15 000 €",
    timeline: "6 à 8 semaines",
    idealClient:
      "Artistes établis, marques en croissance et entreprises préparant un moment de marché significatif — un lancement, un repositionnement ou une campagne nécessitant une puissance créative soutenue.",
    included: [
      "Stratégie de campagne et direction artistique",
      "Révision du positionnement de marque",
      "Production complète (2 à 3 jours de tournage)",
      "Film principal (2 à 3 minutes)",
      "3 pièces de contenu court format",
      "Package photo (50+ sélections)",
      "Post-production et étalonnage avancé",
      "Adaptation des assets réseaux sociaux",
      "3 rounds de corrections",
      "Droits d'utilisation complets",
      "Bilan de campagne et analyse de performance",
    ],
    cta: "Explorer Premium",
    featured: true,
  },
  {
    id: "ultra",
    name: "Ultra",
    tier: "03",
    tagline: "La maîtrise créative totale.",
    description:
      "Un partenariat créatif de bout en bout. Nous nous immergerons dans votre projet de la stratégie au marché, en assumant l'intégralité de la narration visuelle.",
    price: "À partir de 35 000 €",
    timeline: "12 à 16 semaines",
    idealClient:
      "Grands labels, marques de luxe et entreprises pour lesquelles l'excellence créative est une nécessité stratégique — là où les enjeux sont suffisamment élevés pour exiger un partenaire de production, pas simplement un prestataire.",
    included: [
      "Stratégie de marque complète et identité visuelle",
      "Pré-production étendue (recherche, casting, repérages)",
      "Programme de tournage multi-jours",
      "Film principal qualité cinéma",
      "Série de contenu complète (10+ pièces)",
      "Bibliothèque photographique complète",
      "Templates réseaux sociaux brandés",
      "Architecture de campagne et plan de déploiement",
      "Matériaux RP et dossier de presse",
      "Corrections illimitées",
      "Droits d'utilisation perpétuels",
      "Support contenu 6 mois post-lancement",
      "Producteur créatif dédié",
    ],
    cta: "Commander Ultra",
    featured: false,
  },
];
