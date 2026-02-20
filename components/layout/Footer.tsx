import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/utils";

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

const footerLinks: Record<string, FooterLink[]> = {
  Studio: [
    { href: "/about",    label: "Studio" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projets" },
    { href: "/packages", label: "Offres" },
  ],
  Projets: [
    { href: "/projects", label: "Clips musicaux" },
    { href: "/projects", label: "Films publicitaires" },
    { href: "/projects", label: "Contenu de marque" },
    { href: "/projects", label: "Campagnes" },
  ],
  Contact: [
    { href: "/contact",                           label: "Démarrer un projet" },
    { href: siteConfig.social.instagram, label: "Instagram", external: true },
    { href: siteConfig.social.vimeo,     label: "Vimeo",     external: true },
    { href: `mailto:${siteConfig.email}`, label: "Écrire",   external: true },
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
            <Link href="/" className="group flex items-center gap-3 mb-6" aria-label="OBSIDIAN Arts et Films — Accueil">
              <Image
                src="/brand/logo-white.svg"
                alt="OBSIDIAN Arts et Films"
                width={140}
                height={50}
                className="transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>
            <p className="text-obsidian-silver text-sm leading-relaxed max-w-xs mb-8">
              Studio de production créative haut de gamme. Nous construisons des univers
              visuels pour les artistes, les marques et ceux qui exigent davantage.
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

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-obsidian-border gap-4">
          <p className="text-obsidian-silver text-xs tracking-wider">
            &copy; {year} OBSIDIAN Arts &amp; Films. Tous droits réservés.
          </p>
          <p className="text-obsidian-muted text-xs tracking-wider">
            Conçu avec précision.
          </p>
        </div>
      </div>
    </footer>
  );
}
