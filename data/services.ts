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
    id: "film-production",
    title: "Film Production",
    subtitle: "Cinematic storytelling, engineered for impact.",
    description:
      "From concept to final cut, we handle every dimension of production. Music videos, brand films, commercial content—we approach every project with the rigor of feature filmmaking and the efficiency of a performance-driven studio.",
    deliverables: [
      "Concept development and creative direction",
      "Pre-production planning and location scouting",
      "Full production crew and equipment",
      "Post-production: editing, color grading, sound design",
      "Multiple format exports for all platforms",
      "Behind-the-scenes content package",
      "Usage rights and licensing documentation",
    ],
    valueProposition:
      "Most production companies execute briefs. We interrogate them. Before a single frame is captured, we've challenged every assumption in the creative direction to ensure the final film does something that matters.",
    icon: "film",
  },
  {
    id: "branding-strategy",
    title: "Branding & Strategy",
    subtitle: "Identity built to endure.",
    description:
      "Brand identity isn't decoration—it's the architecture of how your audience perceives you. We build visual and strategic systems that communicate with precision, establishing a language that scales across every touchpoint.",
    deliverables: [
      "Brand strategy and positioning document",
      "Visual identity system (logo, typography, color, grid)",
      "Brand guidelines and usage documentation",
      "Photography art direction",
      "Tone of voice and messaging framework",
      "Competitive landscape analysis",
      "Implementation roadmap",
    ],
    valueProposition:
      "We don't design logos. We build identities. The difference is that an identity knows who it is at 3am in a boardroom and on a billboard in Tokyo. Every decision we make is tested against this standard.",
    icon: "diamond",
  },
  {
    id: "social-media-content",
    title: "Social Media Content",
    subtitle: "Volume without compromise.",
    description:
      "Social media demands constant, high-quality content. We build scalable content systems that maintain visual and strategic excellence at pace—never sacrificing quality for quantity, never losing sight of the audience.",
    deliverables: [
      "Content strategy and editorial calendar",
      "Monthly content production (photo and video)",
      "Platform-native format optimization",
      "Caption and copy writing",
      "Community engagement strategy",
      "Analytics reporting and performance review",
      "Content library management",
    ],
    valueProposition:
      "The brands that win on social aren't the ones posting the most—they're the ones whose content people actually want to see. We create content that earns attention rather than buying it.",
    icon: "layers",
  },
  {
    id: "campaign-production",
    title: "Campaign Production",
    subtitle: "From strategy to saturation.",
    description:
      "Full-spectrum campaign production for product launches, events, and market moments. We architect integrated campaigns that work across paid, owned, and earned media—ensuring every touchpoint reinforces the core message.",
    deliverables: [
      "Campaign concept and creative strategy",
      "Multi-channel asset production",
      "Campaign landing page design",
      "Paid media creative (static and video)",
      "PR and press kit materials",
      "Influencer content briefs",
      "Campaign performance framework",
    ],
    valueProposition:
      "A campaign is only as strong as the weakest asset in it. We eliminate weak links by controlling every dimension of production, ensuring strategic coherence from the hero film to the banner ad.",
    icon: "target",
  },
];
