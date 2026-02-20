import { cn } from "@/lib/utils";

interface GoldLineProps {
  className?: string;
  vertical?: boolean;
}

export function GoldLine({ className, vertical = false }: GoldLineProps) {
  if (vertical) {
    return (
      <div
        className={cn("w-px bg-gradient-to-b from-transparent via-obsidian-gold to-transparent", className)}
      />
    );
  }
  return (
    <div
      className={cn("h-px bg-gradient-to-r from-transparent via-obsidian-gold to-transparent", className)}
    />
  );
}
