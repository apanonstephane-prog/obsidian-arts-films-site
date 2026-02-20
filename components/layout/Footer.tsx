import Link from "next/link";
import { siteConfig } from "@/lib/utils";

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

const footerLinks: Record<string, FooterLink[]> = {
  Studio: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/packages", label: "Packages" },
  ],
  Work: [
    { href: "/projects", label: "Music Videos" },
    { href: "/projects", label: "Commercial Films" },
    { href: "/projects", label: "Brand Content" },
    { href: "/projects", label: "Campaigns" },
  ],
  Connect: [
    { href: "/contact", label: "Start a Project" },
    { href: siteConfig.social.instagram, label: "Instagram", external: true },
    { href: siteConfig.social.vimeo, label: "Vimeo", external: true },
    { href: `mailto:${siteConfig.email}`, label: "Email Us", external: true },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-obsidian-dark border-t border-obsidian-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="w-5 h-5 bg-obsidian-gold transform rotate-45 transition-transform duration-300 group-hover:rotate-90" />
              <span className="font-display text-base tracking-ultra-wide uppercase text-obsidian-white">
                OBSIDIAN
              </span>
            </Link>
            <p className="text-obsidian-silver text-sm leading-relaxed max-w-xs mb-8">
              High-end creative production studio. We build visual worlds for
              artists, brands, and those who demand more.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-obsidian-gold text-sm tracking-widest uppercase hover:text-obsidian-gold-light transition-colors duration-200"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs tracking-mega-wide uppercase text-obsidian-silver mb-6">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-obsidian-light text-sm hover:text-obsidian-gold transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-obsidian-light text-sm hover:text-obsidian-gold transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-obsidian-border gap-4">
          <p className="text-obsidian-silver text-xs tracking-wider">
            &copy; {year} OBSIDIAN Arts & Films. All rights reserved.
          </p>
          <p className="text-obsidian-muted text-xs tracking-wider">
            Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
