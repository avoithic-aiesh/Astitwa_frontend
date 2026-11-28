import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

export function DashboardIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5h-5a1 1 0 0 1-1-1v-5a1.5 1.5 0 0 0-1.5-1.5h-2A1.5 1.5 0 0 0 8.5 14v6.5a1 1 0 0 1-1 1h-5A1.5 1.5 0 0 1 1 20V10.5z" />
    </svg>
  );
}

export function EventManagementIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M12 14l1.2 2.4 2.8.4-2 2 .5 2.7L12 20.2 9.5 21.5l.5-2.7-2-2 2.8-.4L12 14z" />
    </svg>
  );
}

export function CalendarIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="8" cy="14" r="1" fill="currentColor" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
      <circle cx="8" cy="18" r="1" fill="currentColor" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      <circle cx="16" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

export function IdeasIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.2 4.6 3 5.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3c1.8-1.1 3-3.2 3-5.7a7 7 0 0 0-7-7z" />
    </svg>
  );
}

export function PostSchedulingIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

export function ContentApprovalIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

export function TaskManagementIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 12.5l3 3 5-6" />
    </svg>
  );
}

export function AnalyticsIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="18" y1="20" x2="18" y2="4" strokeWidth="2.5" />
      <line x1="12" y1="20" x2="12" y2="10" strokeWidth="2.5" />
      <line x1="6" y1="20" x2="6" y2="15" strokeWidth="2.5" />
    </svg>
  );
}

export function ContentOrganizationIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function UserManagementIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function NotificationsIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export function SettingsIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function MenuIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function CloseIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function SubmenuBulletIcon({ size = 6, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 6 6"
      fill="currentColor"
      className={className}
      {...props}
    >
      <circle cx="3" cy="3" r="2.5" />
    </svg>
  );
}

/**
 * Traditional Nepali Temple / Stupa Logo Icon
 * Elegant multi-tier pagoda architecture with golden finial (Gajur) and torana entrance.
 */
export function NepaliTempleLogo({ size = 48, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Top Pinnacle / Gajur */}
      <circle cx="32" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 9V14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 14h4" stroke="currentColor" strokeWidth="1.5" />

      {/* Tier 1 - Upper Pagoda Roof */}
      <path
        d="M32 14L23 21c2 0 16 0 18 0L32 14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M21 21c2.5-1 5-1.5 11-1.5s8.5.5 11 1.5" stroke="currentColor" strokeWidth="1.2" />

      {/* Upper chamber walls */}
      <rect x="27" y="21" width="10" height="7" stroke="currentColor" strokeWidth="1.3" />
      <line x1="32" y1="21" x2="32" y2="28" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />

      {/* Tier 2 - Main Pagoda Roof with curved eave ends (typical Newari pagoda) */}
      <path
        d="M32 26L14 36c4-1 11-1.5 18-1.5s14 .5 18 1.5L32 26Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Curved roof eaves decorative tips */}
      <path d="M14 36c-1.5-1.5-3-1-3.5 0M50 36c1.5-1.5 3-1 3.5 0" stroke="currentColor" strokeWidth="1.3" />

      {/* Struts / Tunala supports */}
      <line x1="22" y1="36" x2="25" y2="44" stroke="currentColor" strokeWidth="1.2" />
      <line x1="42" y1="36" x2="39" y2="44" stroke="currentColor" strokeWidth="1.2" />

      {/* Middle Sanctum / Columns */}
      <rect x="22" y="36" width="20" height="15" stroke="currentColor" strokeWidth="1.4" />

      {/* Ornate Torana / Sanctum Doorway */}
      <path
        d="M28 51V42a4 4 0 0 1 8 0v9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M30 42a2 2 0 0 1 4 0v9h-4V42Z" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <circle cx="32" cy="40" r="1" fill="currentColor" />

      {/* Side windows / Jhyal carvings */}
      <rect x="23.5" y="40" width="2.5" height="5" stroke="currentColor" strokeWidth="1" />
      <rect x="38" y="40" width="2.5" height="5" stroke="currentColor" strokeWidth="1" />

      {/* Tier 3 - Plinth / Steps */}
      <line x1="16" y1="51" x2="48" y2="51" stroke="currentColor" strokeWidth="1.5" />
      <line x1="13" y1="55" x2="51" y2="55" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="59" x2="54" y2="59" stroke="currentColor" strokeWidth="1.5" />

      {/* Guardian figures / Lions on steps */}
      <rect x="18" y="48.5" width="2.5" height="2.5" stroke="currentColor" strokeWidth="1" />
      <rect x="43.5" y="48.5" width="2.5" height="2.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
