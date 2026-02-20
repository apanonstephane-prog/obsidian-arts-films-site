export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const siteConfig = {
  name: "OBSIDIAN Arts & Films",
  tagline: "Production créative haut de gamme",
  description:
    "OBSIDIAN est un studio de production créative haut de gamme spécialisé dans les clips musicaux, les films publicitaires, le contenu de marque et la narration visuelle haute performance.",
  url: "https://obsidian-arts.com",
  email: "hello@obsidian-arts.com",
  social: {
    instagram: "https://instagram.com/obsidianarts",
    vimeo: "https://vimeo.com/obsidianarts",
  },
};
