export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  coverImage: string;
  heroImage: string;
  tagline: string;
  context: string;
  strategy: string;
  execution: string;
  results: string;
  tags: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "eclipse",
    title: "Eclipse",
    client: "NOVA Records",
    category: "Clip musical",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    heroImage:  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    tagline: "Là où l'obscurité devient le cadre.",
    context:
      "NOVA Records a sollicité OBSIDIAN pour créer un clip pour le single de lancement de l'artiste KAI. Le brief exigeait quelque chose capables de percer dans un marché saturé et de positionner KAI comme une force créative sérieuse — pas simplement un artiste de plus.",
    strategy:
      "Nous avons construit le concept autour de l'idée du chaos maîtrisé. Le langage visuel serait d'abord oppressant, puis révèlerait progressivement la lumière comme métaphore de l'émergence artistique. Chaque plan a été composé comme une photographie fixe avant que le mouvement ne soit considéré.",
    execution:
      "Tourné en deux jours dans un complexe industriel abandonné, nous avons utilisé une combinaison d'objectifs anamorphiques et d'éclairage naturel — aucun CGI, aucun raccourci en post-production. L'étalonnage a été développé sur trois semaines en collaboration avec l'artiste pour que la palette finale corresponde à l'arc émotionnel du titre.",
    results:
      "4,2 millions de vues dans les 72 premières heures. Couverture dans Pitchfork, Clash Magazine et Complex. Les streams de KAI ont progressé de 380 % dans le mois suivant la sortie.",
    tags: ["Clip musical", "Cinéma sombre", "Industriel", "Image d'artiste"],
    featured: true,
  },
  {
    id: "meridian",
    title: "Meridian",
    client: "Maison Atelier",
    category: "Film publicitaire",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    heroImage:  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    tagline: "Le luxe sans explication.",
    context:
      "Maison Atelier, maison de mode française haut de gamme, avait besoin d'un film de campagne pour sa collection AH24. Le défi : communiquer un luxe absolu à une audience mondiale sans tomber dans les clichés.",
    strategy:
      "Nous avons tout déconstruit. Aucun plan produit. Aucune voix-off. Le film existerait comme pure atmosphère — la marque communiquée par la texture, le silence et la retenue. Un film de 90 secondes qui ressemble à un souvenir.",
    execution:
      "Tourné sur trois sites à Paris et sur la Côte d'Azur, nous avons travaillé avec une équipe de 12 personnes pour capter l'interaction de la lumière naturelle et de l'ombre sur la collection. Le montage utilise des plans longs et un design sonore ambiant comme outils principaux.",
    results:
      "La campagne a atteint 12 millions d'impressions sur les canaux digitaux. Les taux de conversion en ligne pour la collection AH24 ont dépassé les projections de 67 %. Le film a été présélectionné pour un Lion de Cannes.",
    tags: ["Publicité", "Mode", "Luxe", "Cinématographique"],
    featured: true,
  },
  {
    id: "current",
    title: "Current",
    client: "Volta Energy",
    category: "Film de marque",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    heroImage:  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80",
    tagline: "Le futur avance en silence.",
    context:
      "Volta Energy, une startup d'énergie propre entrant sur un marché concurrentiel, devait établir sa crédibilité sans paraître corporate. Son audience était avertie en matière de design et sceptique envers le greenwashing.",
    strategy:
      "Nous avons positionné Volta non comme une entreprise technologique, mais comme une philosophie. Le film parlerait de l'inévitabilité du changement plutôt que des fonctionnalités d'un produit. Le langage visuel s'inspirait de l'architecture et de la photographie plutôt que de la publicité tech.",
    execution:
      "Une série de trois films, chacun centré sur une dimension différente de la mission de Volta. Tourné dans quatre pays sur six semaines, avec des directeurs de la photographie locaux pour garantir l'authenticité de chaque lieu.",
    results:
      "La levée de fonds Série B de Volta a été clôturée en sursouscription à 47 M$, plusieurs investisseurs citant le film de marque comme facteur décisif. La campagne a remporté deux prix professionnels pour la narration de marque.",
    tags: ["Film de marque", "Énergie propre", "Narration", "B2B"],
    featured: true,
  },
  {
    id: "sovereign",
    title: "Sovereign",
    client: "Marcello Rossi",
    category: "Campagne artiste",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    heroImage:  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80",
    tagline: "Un artiste défini selon ses propres termes.",
    context:
      "Marcello Rossi, musicien établi, effectuait une transition délibérée du mainstream vers l'indépendant. Il avait besoin d'une identité visuelle et d'une stratégie de contenu capable de communiquer l'authenticité à une nouvelle audience sans aliéner ses fans existants.",
    strategy:
      "Nous avons construit un univers visuel complet pour Marcello — pas seulement un clip, mais un monde entier. Chaque contenu, de la pochette aux publications réseaux sociaux, a été conçu comme partie d'un langage esthétique cohérent qu'il pourrait s'approprier durablement.",
    execution:
      "Un engagement de six mois produisant : deux clips, une série de 15 épisodes pour les réseaux sociaux, des visuels d'album et un court métrage documentaire. Nous avons suivi Marcello pendant l'enregistrement de l'album pour capter du matériel authentique.",
    results:
      "L'album a débuté à la 3e place des charts indépendants. L'audience sur les réseaux sociaux est passée de 180 K à 890 K en six mois. Le documentaire a été acquis par une grande plateforme de streaming.",
    tags: ["Campagne artiste", "Documentaire", "Contenu réseaux", "Identité"],
    featured: false,
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    client: "Apex Architecture",
    category: "Identité de marque",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    heroImage:  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    tagline: "Les bâtiments comme déclarations.",
    context:
      "Apex Architecture, cabinet de niche avec un portfolio exceptionnel, avait une présence en ligne qui ne reflétait pas la qualité de son travail. Ils perdaient des appels d'offres face à des cabinets au portfolio inférieur mais à la présentation supérieure.",
    strategy:
      "Un repositionnement visuel complet. Nous avons traité le portfolio du cabinet non comme une documentation, mais comme de l'art. La campagne positionnerait Apex non comme des architectes qui construisent, mais comme des stratèges qui façonnent la façon dont les gens vivent l'espace.",
    execution:
      "Trois semaines à visiter les projets réalisés par Apex, les capturant avec la même rigueur que nous appliquons aux campagnes mode ou musicales. La bibliothèque de plus de 2 000 images a servi de fondation à un nouveau site web, un pitch deck et une stratégie réseaux sociaux.",
    results:
      "Apex a décroché trois nouveaux contrats majeurs dans le trimestre suivant le lancement, dont un programme mixte à 14 M€. Le trafic du site a augmenté de 440 % et la qualité des demandes s'est nettement améliorée.",
    tags: ["Architecture", "Photographie", "Stratégie de marque", "Web"],
    featured: false,
  },
  {
    id: "phantom",
    title: "Phantom",
    client: "CIPHER Collective",
    category: "Campagne réseaux sociaux",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    heroImage:  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80",
    tagline: "Invisible jusqu'à ce que ça ne le soit plus.",
    context:
      "CIPHER, un collectif musical underground, souhaitait accéder à la visibilité mainstream tout en préservant sa crédibilité underground. Un paradoxe qui exigeait une stratégie minutieuse.",
    strategy:
      "Nous avons conçu une combustion lente. Plutôt qu'une campagne de lancement classique, nous avons créé une architecture de contenu sur 90 jours révélant le collectif progressivement, construisant l'intrigue avant l'identité. Le public devait avoir l'impression de découvrir quelque chose, non d'être ciblé par du marketing.",
    execution:
      "Quatre-vingt-dix contenus, chacun bâtissant sur le précédent. Aucun média payant les 60 premiers jours — purement organique. Le contenu allait de clips de 6 secondes à des courts métrages de 12 minutes, tous unifiés par un langage visuel cohérent.",
    results:
      "CIPHER est passé de 4 K à 210 K abonnés en 90 jours sans aucune dépense média. L'événement de révélation s'est sold-out en 11 minutes. Trois grands labels ont fait des offres d'acquisition dans les 30 jours suivant le lancement.",
    tags: ["Campagne sociale", "Stratégie de contenu", "Underground", "Croissance organique"],
    featured: false,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
