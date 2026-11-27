type PagodaLogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { icon: 34, wordmark: "text-lg md:text-xl", tagline: "text-[10px]" },
  md: { icon: 42, wordmark: "text-xl md:text-2xl", tagline: "text-[11px]" },
  lg: { icon: 54, wordmark: "text-2xl md:text-3xl", tagline: "text-xs" },
};

export function PagodaIcon({
  variant = "light",
  size = 42,
  className = "",
}: {
  variant?: "light" | "dark";
  size?: number;
  className?: string;
}) {
  const isDark = variant === "dark";
  const bodyColor = isDark ? "#8E293E" : "#7B2135";
  const roofColor = isDark ? "#4D1220" : "#561523";
  const accentGold = isDark ? "#E6C987" : "#C19A3C";
  const strokeAccent = isDark ? "rgba(230, 201, 135, 0.4)" : "none";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Flanking 4-point sparkles */}
      <path
        d="M23 30L25.2 35.8L31 38L25.2 40.2L23 46L20.8 40.2L15 38L20.8 35.8Z"
        fill={accentGold}
      />
      <path
        d="M95 25L96.8 29.5L101.3 31.3L96.8 33.1L95 37.6L93.2 33.1L88.7 31.3L93.2 29.5Z"
        fill={accentGold}
      />

      {/* Finial ball and spire */}
      <circle cx="60" cy="11" r="3" fill={accentGold} />
      <path d="M60 15L57 29H63L60 15Z" fill={accentGold} />

      {/* Top tier body */}
      <path d="M44 43H76L78 56H42L44 43Z" fill={bodyColor} />
      <circle cx="60" cy="50" r="3.2" fill={accentGold} />

      {/* Top tier roof */}
      <path
        d="M60 27C52 35 41 40 31 42.5C43 45 77 45 89 42.5C79 40 68 35 60 27Z"
        fill={roofColor}
        stroke={strokeAccent}
        strokeWidth={isDark ? "0.8" : "0"}
      />

      {/* Middle tier body */}
      <path d="M38 63H82L84 78H36L38 63Z" fill={bodyColor} />
      <rect x="44" y="66.5" width="6" height="9.5" rx="0.8" fill={accentGold} />
      <rect x="57" y="66.5" width="6" height="9.5" rx="0.8" fill={accentGold} />
      <rect x="70" y="66.5" width="6" height="9.5" rx="0.8" fill={accentGold} />

      {/* Middle tier roof */}
      <path
        d="M60 50C48 57 33 61.5 22 63.5C38 66.5 82 66.5 98 63.5C87 61.5 72 57 60 50Z"
        fill={roofColor}
        stroke={strokeAccent}
        strokeWidth={isDark ? "0.8" : "0"}
      />

      {/* Bottom tier body */}
      <path d="M30 85H90L92 102H28L30 85Z" fill={bodyColor} />
      <rect x="37" y="90" width="6.5" height="6.5" rx="0.8" fill={accentGold} />
      <rect x="53" y="89" width="14" height="13" rx="0.8" fill={accentGold} />
      <rect x="76.5" y="90" width="6.5" height="6.5" rx="0.8" fill={accentGold} />

      {/* Bottom tier roof */}
      <path
        d="M60 71C45 78.5 25 83 12 85C33 88.5 87 88.5 108 85C95 83 75 78.5 60 71Z"
        fill={roofColor}
        stroke={strokeAccent}
        strokeWidth={isDark ? "0.8" : "0"}
      />

      {/* Gold base plinth */}
      <rect x="21" y="102" width="78" height="5.5" rx="1.5" fill={accentGold} />
    </svg>
  );
}

export default function PagodaLogo({
  variant = "light",
  size = "md",
  showText = true,
  showTagline = false,
  className = "",
}: PagodaLogoProps) {
  const isDark = variant === "dark";
  const cfg = sizeMap[size];

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <PagodaIcon variant={variant} size={cfg.icon} className="shrink-0" />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display font-extrabold tracking-[0.14em] ${cfg.wordmark} ${
              isDark ? "text-[#FAF6EE]" : "text-primary"
            }`}
          >
            EVENTRA
            <span className={isDark ? "text-gold-light" : "text-secondary"}>
              .
            </span>
          </span>
          {showTagline && (
            <span
              className={`mt-1 tracking-[0.08em] ${cfg.tagline} ${
                isDark ? "text-[#DFB6BC]" : "text-muted"
              }`}
            >
              Events. Culture. Community.
            </span>
          )}
        </span>
      )}
    </span>
  );
}
