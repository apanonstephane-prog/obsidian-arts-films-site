"use client";

import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function StickyQuoteCTA() {
  return (
    <>
      {/* Mobile: full-width bar pinned to bottom */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-3 bg-obsidian-black/95 backdrop-blur-md border-t border-obsidian-border sm:hidden">
        <Link
          href="/contact"
          className="btn-primary w-full justify-center py-3.5 text-xs tracking-widest uppercase"
        >
          Demander un devis rapide
          <ArrowIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* Desktop: floating pill bottom-right */}
      <div className="fixed bottom-8 right-8 z-40 hidden sm:block">
        <Link
          href="/contact"
          className="btn-primary shadow-2xl shadow-black/60 text-xs tracking-widest uppercase"
        >
          Demander un devis rapide
          <ArrowIcon className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
