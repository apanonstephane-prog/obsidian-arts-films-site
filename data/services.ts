export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  valueProposition: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "production-cinematographique",
    title: "Production Cinématographique",
    subtitle: "Narration cinématographique, conçue pour l'impact.",
    description:
      "Du concept à la livraison finale, nous gérons chaque dimension de la production. Clips musicaux, films de marque, contenu publicitaire — nous abordons chaque projet avec la rigueur du long métrage et l'efficacité d'un studio orienté performance.",
    deliverables: [
      "Développement du concept et direction artistique",
      "Planification de la pré-production et repérages",
      "Équipe de tournage complète et équipement",
      "Post-production : montage, étalonnage, design sonore",
      "Export multi-format pour toutes les plateformes",
      "Package de contenu coulisses",
      "Documentation des droits d'utilisation",
    ],
    valueProposition:
      "La plupart des maisons de production exécutent des briefs. Nous les interrogeons. Avant qu'un seul plan soit capturé, nous avons remis en question chaque hypothèse de la direction artistique pour garantir que le film final accomplit quelque chose qui compte.",
    icon: "film",
  },
  {
    id: "identite-strategie",
    title: "Identité de marque & Stratégie",
    subtitle: "Une identité construite pour durer.",
    description:
      "L'identité de marque n'est pas de la décoration — c'est l'architecture de la perception. Nous construisons des systèmes visuels et stratégiques qui communiquent avec précision, établissant un langage qui s'étend à chaque point de contact.",
    deliverables: [
      "Stratégie de marque et document de positionnement",
      "Système d'identité visuelle (logo, typographie, couleurs, grille)",
      "Charte graphique et documentation d'usage",
      "Direction artistique photographique",
      "Cadre de ton éditorial et messagerie",
      "Analyse du paysage concurrentiel",
      "Feuille de route d'implémentation",
    ],
    valueProposition:
      "Nous ne dessinons pas des logos. Nous construisons des identités. La différence, c'est qu'une identité sait qui elle est à 3h du matin dans une salle de conseil et sur un panneau à Tokyo. Chaque décision que nous prenons est testée à cette aune.",
    icon: "diamond",
  },
  {
    id: "contenu-reseaux-sociaux",
    title: "Contenu Réseaux Sociaux",
    subtitle: "Volume sans compromis.",
    description:
      "Les réseaux sociaux exigent un contenu constant et de haute qualité. Nous construisons des systèmes de contenu évolutifs qui maintiennent l'excellence visuelle et stratégique à cadence soutenue — sans jamais sacrifier la qualité à la quantité.",
    deliverables: [
      "Stratégie de contenu et calendrier éditorial",
      "Production mensuelle de contenu (photo et vidéo)",
      "Optimisation native par plateforme",
      "Rédaction des légendes et des textes",
      "Stratégie d'engagement communautaire",
      "Reporting analytique et bilan de performance",
      "Gestion de la bibliothèque de contenu",
    ],
    valueProposition:
      "Les marques qui gagnent sur les réseaux ne sont pas celles qui publient le plus — ce sont celles dont le contenu donne vraiment envie d'être vu. Nous créons du contenu qui mérite l'attention plutôt que de l'acheter.",
    icon: "layers",
  },
  {
    id: "production-campagne",
    title: "Production de Campagne",
    subtitle: "De la stratégie à la saturation.",
    description:
      "Production de campagne à spectre complet pour les lancements produits, les événements et les moments de marché. Nous architecturons des campagnes intégrées qui fonctionnent à travers les médias payants, détenus et gagnés — chaque point de contact renforçant le message central.",
    deliverables: [
      "Concept de campagne et stratégie créative",
      "Production d'assets multi-canaux",
      "Design de landing page de campagne",
      "Créations médias payants (statique et vidéo)",
      "Matériaux RP et dossier de presse",
      "Briefs de contenu pour influenceurs",
      "Cadre de performance de campagne",
    ],
    valueProposition:
      "Une campagne n'est aussi forte que son élément le plus faible. Nous éliminons les maillons faibles en contrôlant chaque dimension de la production, garantissant la cohérence stratégique du film principal jusqu'à la bannière.",
    icon: "target",
  },
];
