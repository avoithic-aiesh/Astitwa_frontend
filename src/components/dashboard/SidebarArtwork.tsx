import React from "react";

/**
 * Traditional Nepali Pagoda Temple & Newari Wood-Carving Border Artwork
 * Displayed at the bottom of the Eventra sidebar as seen in the design mockup.
 */
export function SidebarArtwork() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mt-auto w-full select-none overflow-hidden pt-4 text-[#DFBA73]"
    >
      {/* Pagoda Temple Line Art */}
      <div className="relative mx-auto flex w-full justify-center px-4 opacity-45">
        <svg
          viewBox="0 0 240 220"
          className="h-auto w-full max-w-[210px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Pinnacle / Gajur & Kalash */}
          <circle cx="120" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M120 13V22" stroke="currentColor" strokeWidth="1.5" />
          <path d="M116 22H124" stroke="currentColor" strokeWidth="1.5" />
          <path d="M118 16H122" stroke="currentColor" strokeWidth="1.2" />

          {/* Top Roof Tier (Smallest) */}
          <path
            d="M120 22L98 38C104 36.5 113 36 120 36C127 36 136 36.5 142 38L120 22Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M96 38.5C92 37 90 39 89 40M144 38.5C148 37 150 39 151 40" stroke="currentColor" strokeWidth="1.2" />

          {/* Upper Chamber */}
          <rect x="108" y="38" width="24" height="12" stroke="currentColor" strokeWidth="1.2" />
          <line x1="120" y1="38" x2="120" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
          <line x1="114" y1="38" x2="114" y2="50" stroke="currentColor" strokeWidth="0.8" />
          <line x1="126" y1="38" x2="126" y2="50" stroke="currentColor" strokeWidth="0.8" />

          {/* Middle Roof Tier */}
          <path
            d="M120 48L82 72C92 70 108 69 120 69C132 69 148 70 158 72L120 48Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M80 73C74 71 71 74 69 76M160 73C166 71 169 74 171 76" stroke="currentColor" strokeWidth="1.4" />
          {/* Struts / Tunala angled supports */}
          <line x1="94" y1="72" x2="102" y2="88" stroke="currentColor" strokeWidth="1.2" />
          <line x1="146" y1="72" x2="138" y2="88" stroke="currentColor" strokeWidth="1.2" />
          <line x1="104" y1="72" x2="108" y2="88" stroke="currentColor" strokeWidth="1.2" />
          <line x1="136" y1="72" x2="132" y2="88" stroke="currentColor" strokeWidth="1.2" />

          {/* Middle Sanctum & Wooden Windows */}
          <rect x="100" y="72" width="40" height="16" stroke="currentColor" strokeWidth="1.3" />
          <rect x="104" y="76" width="7" height="9" stroke="currentColor" strokeWidth="1" />
          <rect x="129" y="76" width="7" height="9" stroke="currentColor" strokeWidth="1" />
          <rect x="115" y="75" width="10" height="11" stroke="currentColor" strokeWidth="1.2" />

          {/* Lower Main Roof Tier (Largest) */}
          <path
            d="M120 86L60 118C75 115 100 113.5 120 113.5C140 113.5 165 115 180 118L120 86Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M57 119C50 117 46 120 43 124M183 119C190 117 194 120 197 124" stroke="currentColor" strokeWidth="1.5" />

          {/* Lower Struts / Tunala */}
          <line x1="78" y1="117" x2="88" y2="142" stroke="currentColor" strokeWidth="1.3" />
          <line x1="162" y1="117" x2="152" y2="142" stroke="currentColor" strokeWidth="1.3" />
          <line x1="96" y1="116" x2="102" y2="142" stroke="currentColor" strokeWidth="1.3" />
          <line x1="144" y1="116" x2="138" y2="142" stroke="currentColor" strokeWidth="1.3" />

          {/* Ground Floor Sanctuary / Columns & Carved Pillars */}
          <rect x="84" y="117" width="72" height="30" stroke="currentColor" strokeWidth="1.5" />
          {/* Main Ornate Entrance (Dhoka) */}
          <path d="M110 147V128C110 124 130 124 130 128V147" stroke="currentColor" strokeWidth="1.4" />
          <path d="M114 147V132C114 129 126 129 126 132V147" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
          {/* Side Lattice Windows (Aki-jhyal) */}
          <rect x="90" y="127" width="12" height="14" stroke="currentColor" strokeWidth="1.1" />
          <line x1="96" y1="127" x2="96" y2="141" stroke="currentColor" strokeWidth="0.8" />
          <line x1="90" y1="134" x2="102" y2="134" stroke="currentColor" strokeWidth="0.8" />
          <rect x="138" y="127" width="12" height="14" stroke="currentColor" strokeWidth="1.1" />
          <line x1="144" y1="127" x2="144" y2="141" stroke="currentColor" strokeWidth="0.8" />
          <line x1="138" y1="134" x2="150" y2="134" stroke="currentColor" strokeWidth="0.8" />

          {/* Plinth / Multi-level Steps */}
          {/* Tier 1 plinth */}
          <rect x="74" y="147" width="92" height="9" stroke="currentColor" strokeWidth="1.4" />
          {/* Tier 2 plinth */}
          <rect x="62" y="156" width="116" height="9" stroke="currentColor" strokeWidth="1.4" />
          {/* Tier 3 plinth */}
          <rect x="48" y="165" width="144" height="9" stroke="currentColor" strokeWidth="1.4" />
          {/* Tier 4 plinth */}
          <rect x="34" y="174" width="172" height="10" stroke="currentColor" strokeWidth="1.4" />

          {/* Central Staircase */}
          <path d="M106 147H134V184H106Z" stroke="currentColor" strokeWidth="1.2" />
          <line x1="106" y1="156" x2="134" y2="156" stroke="currentColor" strokeWidth="1" />
          <line x1="106" y1="165" x2="134" y2="165" stroke="currentColor" strokeWidth="1" />
          <line x1="106" y1="174" x2="134" y2="174" stroke="currentColor" strokeWidth="1" />

          {/* Guardian Figures (Simha / Lions on Steps) */}
          <rect x="78" y="143" width="6" height="5" stroke="currentColor" strokeWidth="1" />
          <rect x="156" y="143" width="6" height="5" stroke="currentColor" strokeWidth="1" />
          <rect x="66" y="152" width="7" height="5" stroke="currentColor" strokeWidth="1" />
          <rect x="167" y="152" width="7" height="5" stroke="currentColor" strokeWidth="1" />
          <rect x="52" y="161" width="8" height="5" stroke="currentColor" strokeWidth="1" />
          <rect x="180" y="161" width="8" height="5" stroke="currentColor" strokeWidth="1" />
          <rect x="38" y="170" width="9" height="5" stroke="currentColor" strokeWidth="1" />
          <rect x="193" y="170" width="9" height="5" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Traditional Newari Carved Wooden Frieze Border at Bottom */}
      <div className="mt-3 w-full border-t border-[#DFBA73]/30 pt-1.5 opacity-60">
        <svg
          viewBox="0 0 250 20"
          className="h-5 w-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Repeating floral & geometric arch pattern */}
          <path
            d="
              M 0 10 Q 12.5 0 25 10 Q 37.5 20 50 10 Q 62.5 0 75 10 Q 87.5 20 100 10
              Q 112.5 0 125 10 Q 137.5 20 150 10 Q 162.5 0 175 10 Q 187.5 20 200 10
              Q 212.5 0 225 10 Q 237.5 20 250 10
            "
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="
              M 0 14 Q 12.5 4 25 14 Q 37.5 24 50 14 Q 62.5 4 75 14 Q 87.5 24 100 14
              Q 112.5 4 125 14 Q 137.5 24 150 14 Q 162.5 4 175 14 Q 187.5 24 200 14
              Q 212.5 4 225 14 Q 237.5 24 250 14
            "
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.7"
          />
          {/* Micro dots */}
          <circle cx="25" cy="5" r="1.5" fill="currentColor" />
          <circle cx="75" cy="5" r="1.5" fill="currentColor" />
          <circle cx="125" cy="5" r="1.5" fill="currentColor" />
          <circle cx="175" cy="5" r="1.5" fill="currentColor" />
          <circle cx="225" cy="5" r="1.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
