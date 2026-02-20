import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian-black flex flex-col items-center justify-center px-6">
      <p className="text-obsidian-gold font-display text-8xl font-light mb-6">404</p>
      <div className="w-16 h-px bg-obsidian-gold mb-8" />
      <h1 className="heading-display text-4xl md:text-5xl text-obsidian-white mb-6 text-center">
        Cette page n&apos;existe pas.
      </h1>
      <p className="text-obsidian-silver text-base mb-12 text-center max-w-md">
        La page que vous recherchez a peut-être été déplacée ou n&apos;existe plus.
        Retournons à quelque chose de réel.
      </p>
      <Link href="/" className="btn-primary">
        Retour à l&apos;accueil
        <ArrowIcon className="w-4 h-4" />
      </Link>
    </div>
  );
}
