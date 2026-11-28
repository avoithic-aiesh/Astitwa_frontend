import type { ReactNode } from "react";

export interface SubNavItem {
  id: string;
  title: string;
  href: string;
  icon?: (props: { className?: string; size?: number }) => ReactNode;
}

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: (props: { className?: string; size?: number }) => ReactNode;
  badge?: number | string;
  badgeColor?: string;
  isExpandable?: boolean;
  children?: SubNavItem[];
}
