import Link from "next/link";

interface BrandWordmarkProps {
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  href?: string;
}

export function BrandWordmark({
  tone = "light",
  size = "md",
  showSubtitle = true,
  href = "/",
}: BrandWordmarkProps) {
  const titleColor = tone === "light" ? "text-[#F6F2EA]" : "text-[#11100E]";
  const subtitleColor =
    tone === "light" ? "text-[#C5A46D]" : "text-[#8A6D3B]";

  const titleSize =
    size === "lg"
      ? "text-3xl sm:text-4xl tracking-[0.28em]"
      : size === "sm"
        ? "text-xl tracking-[0.24em]"
        : "text-2xl sm:text-[26px] tracking-[0.26em]";

  const content = (
    <span className="inline-flex flex-col items-start select-none group shrink-0">
      <span
        className={`font-wordmark font-normal leading-none whitespace-nowrap ${titleSize} ${titleColor} transition-colors duration-300`}
      >
        SVJ
      </span>
      {showSubtitle && (
        <span
          className={`mt-1 text-[8.5px] sm:text-[9.5px] font-sans uppercase tracking-[0.24em] leading-none whitespace-nowrap ${subtitleColor}`}
        >
          Suraj Verma Jewellers
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label="SVJ – Suraj Verma Jewellers Home"
      className="inline-flex focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A46D] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
    >
      {content}
    </Link>
  );
}
