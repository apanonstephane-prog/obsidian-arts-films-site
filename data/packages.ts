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
  notIncluded?: string[];
  cta: string;
  featured: boolean;
}

export const packages: Package[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    tier: "01",
    tagline: "The essential foundation.",
    description:
      "For brands and artists who need a strong, focused creative output. One project, executed with full commitment.",
    price: "From €5,000",
    timeline: "3–4 weeks",
    idealClient:
      "Independent artists, emerging brands, and early-stage companies who need a single high-quality deliverable to establish their visual presence.",
    included: [
      "Single project production (video or photo)",
      "Creative concept development",
      "Pre-production planning",
      "1 day of production",
      "Post-production and editing",
      "2 rounds of revisions",
      "Final delivery in 3 formats",
      "Usage rights for 2 years",
    ],
    cta: "Start the Conversation",
    featured: false,
  },
  {
    id: "premium",
    name: "Premium",
    tier: "02",
    tagline: "The complete campaign.",
    description:
      "A full creative engagement. Strategy, production, and content—built to move your audience and sustain momentum.",
    price: "From €15,000",
    timeline: "6–8 weeks",
    idealClient:
      "Established artists, growing brands, and businesses preparing for a significant market moment—a launch, a rebrand, or a campaign requiring sustained creative firepower.",
    included: [
      "Campaign strategy and creative direction",
      "Brand positioning review",
      "Full production (2–3 days)",
      "Primary hero film (2–3 min)",
      "3 short-form content pieces",
      "Photography package (50+ selects)",
      "Post-production and advanced color grading",
      "Social media asset adaptation",
      "3 rounds of revisions",
      "Full usage rights",
      "Project retrospective and performance review",
    ],
    cta: "Explore Premium",
    featured: true,
  },
  {
    id: "ultra",
    name: "Ultra",
    tier: "03",
    tagline: "Total creative command.",
    description:
      "An end-to-end creative partnership. We embed with your project from strategy through to market, owning the entire visual narrative.",
    price: "From €35,000",
    timeline: "12–16 weeks",
    idealClient:
      "Major labels, luxury brands, and businesses where creative excellence is a strategic necessity—where the stakes are high enough to demand a production partner, not just a vendor.",
    included: [
      "Full brand strategy and visual identity",
      "Extended pre-production (research, casting, location)",
      "Multi-day production schedule",
      "Feature-quality hero film",
      "Complete content series (10+ pieces)",
      "Full photography library",
      "Branded social media templates",
      "Campaign architecture and rollout plan",
      "PR materials and press kit",
      "Unlimited revisions",
      "Perpetual usage rights",
      "6-month post-launch content support",
      "Dedicated creative producer",
    ],
    cta: "Commission Ultra",
    featured: false,
  },
];
