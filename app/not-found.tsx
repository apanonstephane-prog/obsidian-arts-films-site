import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian-black flex flex-col items-center justify-center px-6">
      <p className="text-obsidian-gold font-display text-8xl font-light mb-6">404</p>
      <div className="w-16 h-px bg-obsidian-gold mb-8" />
      <h1 className="heading-display text-4xl md:text-5xl text-obsidian-white mb-6 text-center">
        This page doesn't exist.
      </h1>
      <p className="text-obsidian-silver text-base mb-12 text-center max-w-md">
        The page you're looking for may have moved or doesn't exist.
        Let's get you back to something real.
      </p>
      <Link href="/" className="btn-primary">
        Return Home
        <ArrowIcon className="w-4 h-4" />
      </Link>
    </div>
  );
}
