import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: siteConfig.url, changeFrequency: "monthly" as const, priority: 1 },
    { url: `${siteConfig.url}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${siteConfig.url}/projects`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteConfig.url}/packages`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const projectPages = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages];
}
