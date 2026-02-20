interface ArrowIconProps {
  className?: string;
  direction?: "right" | "down" | "up" | "left";
}

export function ArrowIcon({ className = "w-4 h-4", direction = "right" }: ArrowIconProps) {
  const rotationMap = {
    right: "rotate-0",
    down: "rotate-90",
    up: "-rotate-90",
    left: "rotate-180",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} ${rotationMap[direction]} transition-transform duration-300`}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
