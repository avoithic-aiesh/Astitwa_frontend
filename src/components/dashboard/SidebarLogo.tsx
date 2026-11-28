import Link from "next/link";
import { NepaliTempleLogo } from "./icons/SidebarIcons";

interface SidebarLogoProps {
  onNavigate?: () => void;
}

export function SidebarLogo({ onNavigate }: SidebarLogoProps) {
  return (
    <div className="flex flex-col items-center px-4 pt-6 pb-4 text-center select-none">
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50 rounded-lg p-1 transition-transform active:scale-95"
        aria-label="Eventra Dashboard Home"
      >
        {/* Golden Nepali Temple Emblem */}
        <div className="relative flex items-center justify-center text-[#E5C38C] transition-transform duration-300 group-hover:scale-105">
          {/* Subtle warm golden aura behind the temple */}
          <div
            aria-hidden
            className="absolute -inset-2 rounded-full bg-amber-500/10 blur-md pointer-events-none"
          />
          <NepaliTempleLogo
            size={48}
            className="relative drop-shadow-[0_2px_8px_rgba(229,195,140,0.25)]"
          />
        </div>

        {/* Brand Name */}
        <h1 className="mt-2.5 font-serif text-[26px] font-bold tracking-wide text-[#FFFBF5] drop-shadow-sm">
          Eventra
        </h1>

        {/* Tagline */}
        <p className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.18em] text-[#DFBA73] opacity-90">
          Connect <span className="opacity-60">·</span> Celebrate <span className="opacity-60">·</span> Preserve
        </p>
      </Link>
    </div>
  );
}
