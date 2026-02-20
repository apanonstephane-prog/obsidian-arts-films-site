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
    category: "Music Video",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    tagline: "Where darkness becomes the frame.",
    context:
      "NOVA Records approached OBSIDIAN to create a music video for emerging artist KAI's debut single. The brief demanded something that would cut through a saturated market and position KAI as a serious creative force—not just another act.",
    strategy:
      "We built the concept around the idea of controlled chaos. The visual language would be oppressive at first, then gradually reveal light as a metaphor for artistic emergence. Every frame was composed as a still photograph before motion was considered.",
    execution:
      "Shot over two days in an abandoned industrial complex, we used a combination of anamorphic lenses and practical lighting—no CGI, no post-production shortcuts. The color grade was developed over three weeks in collaboration with the artist to ensure the final palette matched the emotional arc of the track.",
    results:
      "4.2M views in the first 72 hours. Featured in Pitchfork, Clash Magazine, and Complex. KAI's streaming numbers increased 380% in the month following release.",
    tags: ["Music Video", "Dark Cinematic", "Industrial", "Artist Branding"],
    featured: true,
  },
  {
    id: "meridian",
    title: "Meridian",
    client: "Maison Atelier",
    category: "Commercial Film",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    tagline: "Luxury without explanation.",
    context:
      "Maison Atelier, a high-end French fashion house, needed a campaign film for their AW24 collection. The challenge: communicate extreme luxury to a global audience without resorting to clichés.",
    strategy:
      "We stripped away everything predictable. No product shots. No voiceover. The film would exist as pure atmosphere—the brand communicated through texture, silence, and restraint. A 90-second film that feels like a memory.",
    execution:
      "Filmed across three locations in Paris and the Côte d'Azur, we worked with a 12-person crew to capture the interplay of natural light and shadow on the collection. The edit uses long takes and ambient sound design as its primary tools.",
    results:
      "Campaign reached 12M impressions across digital channels. Online conversion rates for the AW24 collection exceeded projections by 67%. The film was shortlisted for a Cannes Lions award.",
    tags: ["Commercial", "Fashion", "Luxury", "Cinematic"],
    featured: true,
  },
  {
    id: "current",
    title: "Current",
    client: "Volta Energy",
    category: "Brand Film",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80",
    tagline: "The future moves quietly.",
    context:
      "Volta Energy, a clean energy startup entering a crowded market, needed to establish credibility without looking corporate. Their audience was design-literate and skeptical of greenwashing.",
    strategy:
      "We positioned Volta not as a technology company, but as a philosophy. The film would speak to the inevitability of change rather than the features of a product. Visual language borrowed from architecture and photography rather than tech advertising.",
    execution:
      "A three-part film series, each piece focusing on a different dimension of Volta's mission. Shot across four countries over six weeks, using local directors of photography to ensure each location felt authentic rather than staged.",
    results:
      "Volta's Series B funding round closed oversubscribed at $47M, with multiple investors citing the brand film as a key factor in their investment decision. The campaign won two industry awards for brand storytelling.",
    tags: ["Brand Film", "Clean Energy", "Storytelling", "B2B"],
    featured: true,
  },
  {
    id: "sovereign",
    title: "Sovereign",
    client: "Marcello Rossi",
    category: "Artist Campaign",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80",
    tagline: "An artist defined on his own terms.",
    context:
      "Marcello Rossi was an established musician making a deliberate pivot from mainstream to independent. He needed a visual identity and content strategy that would communicate authenticity to a new audience without alienating existing fans.",
    strategy:
      "We built a complete visual world for Marcello—not just a music video, but a universe. Every piece of content, from album artwork to social media assets, was designed as part of a coherent aesthetic language that Marcello could own indefinitely.",
    execution:
      "A six-month engagement producing: two music videos, a 15-part social media series, album artwork, and a short documentary. We embedded with Marcello during the album recording process to capture authentic material.",
    results:
      "Album debuted at #3 on the independent charts. Social media following grew from 180K to 890K over six months. The documentary was acquired by a major streaming platform.",
    tags: ["Artist Campaign", "Documentary", "Social Content", "Identity"],
    featured: false,
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    client: "Apex Architecture",
    category: "Brand Identity",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    tagline: "Buildings as statements.",
    context:
      "Apex Architecture, a boutique firm with an exceptional portfolio, had an online presence that failed to reflect the quality of their work. They were losing pitches to firms with inferior portfolios but superior presentation.",
    strategy:
      "A complete visual repositioning. We treated the firm's portfolio not as documentation, but as art. The campaign would position Apex not as architects who build things, but as strategists who shape how people experience space.",
    execution:
      "We spent three weeks visiting completed Apex projects, capturing them with the same rigor we apply to fashion or music campaigns. The resulting library of over 2,000 images formed the foundation of a new website, pitch deck, and social strategy.",
    results:
      "Apex secured three new major contracts in the quarter following the rebrand launch, including a $14M mixed-use development. Their website traffic increased 440% and inquiry quality improved significantly.",
    tags: ["Architecture", "Photography", "Brand Strategy", "Web"],
    featured: false,
  },
  {
    id: "phantom",
    title: "Phantom",
    client: "CIPHER Collective",
    category: "Social Campaign",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80",
    tagline: "Invisible until it isn't.",
    context:
      "CIPHER, an underground music collective, wanted to emerge into mainstream visibility while maintaining their underground credibility. A paradox that required a careful strategy.",
    strategy:
      "We engineered a slow burn. Rather than a conventional launch campaign, we created a 90-day content architecture that revealed the collective gradually, building intrigue before identity. The audience was made to feel they had discovered something, not been marketed to.",
    execution:
      "Ninety pieces of content, each building on the last. No paid media for the first 60 days—purely organic. The content ranged from cryptic 6-second clips to 12-minute short films, all unified by a coherent visual language.",
    results:
      "CIPHER grew from 4K to 210K social followers in 90 days with zero paid media spend. The final reveal event sold out in 11 minutes. Three major labels made acquisition offers within 30 days of launch.",
    tags: ["Social Campaign", "Content Strategy", "Underground", "Organic Growth"],
    featured: false,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
