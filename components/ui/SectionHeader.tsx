import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <div
          className={cn(
            "flex items-center gap-4 mb-6",
            align === "center" && "justify-center"
          )}
        >
          <span className="section-label">{label}</span>
          {align === "left" && <span className="divider-gold" />}
        </div>
      )}
      <h2
        className={cn(
          "heading-display text-4xl md:text-5xl lg:text-6xl text-obsidian-white",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-6 text-obsidian-silver text-base md:text-lg leading-relaxed max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
