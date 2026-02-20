export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const siteConfig = {
  name: "OBSIDIAN Arts & Films",
  tagline: "High-end creative production",
  description:
    "OBSIDIAN is a premium creative production studio specialized in music videos, commercial films, branding content, and high-performance visual storytelling.",
  url: "https://obsidian-arts.com",
  email: "hello@obsidian-arts.com",
  social: {
    instagram: "https://instagram.com/obsidianarts",
    vimeo: "https://vimeo.com/obsidianarts",
  },
};
