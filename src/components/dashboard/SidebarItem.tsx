"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem, SubNavItem } from "@/types/navigation";
import { ChevronDownIcon } from "./icons/SidebarIcons";

interface SidebarItemProps {
  item: NavItem;
  onNavigate?: () => void;
}

export function SidebarItem({ item, onNavigate }: SidebarItemProps) {
  const pathname = usePathname();

  // Check if this item is currently active
  const isDirectActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === item.href || pathname.startsWith(item.href + "/");

  // Check if any child item is currently active
  const isChildActive = Boolean(
    item.children?.some(
      (child) => pathname === child.href || pathname.startsWith(child.href + "/")
    )
  );

  const isActive = isDirectActive || isChildActive;

  // Derive open state: defaults to open if a child is active, or user's explicit toggle
  const [userToggled, setUserToggled] = useState<boolean | null>(null);
  const isOpen = userToggled !== null ? userToggled : isChildActive;

  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Click handler for expandable parent
  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setUserToggled((prev) => (prev !== null ? !prev : !isChildActive));
    } else {
      onNavigate?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (hasChildren && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setUserToggled((prev) => (prev !== null ? !prev : !isChildActive));
    }
  };

  const IconComponent = item.icon;

  return (
    <div className="w-full px-3">
      {hasChildren ? (
        /* Expandable Accordion Item */
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-controls={`submenu-${item.id}`}
          className={`group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 ${
            isActive && !isOpen
              ? "bg-[#F5D7B9] text-[#681F27] font-semibold shadow-sm"
              : "text-[#FAF6F0] hover:bg-white/10 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`shrink-0 transition-colors duration-200 ${
                isActive && !isOpen
                  ? "text-[#681F27]"
                  : "text-[#DFBA73] group-hover:text-amber-200"
              }`}
            >
              <IconComponent size={20} />
            </span>
            <span className="truncate">{item.title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            {item.badge !== undefined && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D3544D] px-1.5 text-[11px] font-bold text-white shadow-sm">
                {item.badge}
              </span>
            )}
            <span
              className={`text-[#DFBA73] transition-transform duration-200 group-hover:text-amber-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <ChevronDownIcon size={16} />
            </span>
          </div>
        </button>
      ) : (
        /* Standard Navigation Link */
        <Link
          href={item.href}
          onClick={onNavigate}
          aria-current={isDirectActive ? "page" : undefined}
          className={`group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 ${
            isDirectActive
              ? "bg-[#F5D7B9] text-[#681F27] font-semibold shadow-sm"
              : "text-[#FAF6F0] hover:bg-white/10 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`shrink-0 transition-colors duration-200 ${
                isDirectActive
                  ? "text-[#681F27]"
                  : "text-[#DFBA73] group-hover:text-amber-200"
              }`}
            >
              <IconComponent size={20} />
            </span>
            <span className="truncate">{item.title}</span>
          </div>

          {item.badge !== undefined && (
            <span className="ml-2 flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-[#D3544D] px-1.5 text-[11px] font-bold text-white shadow-sm">
              {item.badge}
            </span>
          )}
        </Link>
      )}

      {/* Submenu for expandable items */}
      {hasChildren && (
        <div
          id={`submenu-${item.id}`}
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            isOpen ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative ml-4 pl-3.5 border-l border-[#DFBA73]/30 space-y-1 py-1">
            {item.children?.map((subItem: SubNavItem) => {
              const isSubActive = pathname === subItem.href;
              const SubIcon = subItem.icon;

              return (
                <Link
                  key={subItem.id}
                  href={subItem.href}
                  onClick={onNavigate}
                  aria-current={isSubActive ? "page" : undefined}
                  className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 ${
                    isSubActive
                      ? "bg-[#F5D7B9] text-[#681F27] font-semibold shadow-xs"
                      : "text-[#FAF6F0]/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {SubIcon && (
                    <span
                      className={`shrink-0 transition-colors duration-150 ${
                        isSubActive
                          ? "text-[#681F27]"
                          : "text-[#DFBA73] group-hover:text-amber-200"
                      }`}
                    >
                      <SubIcon size={6} />
                    </span>
                  )}
                  <span className="truncate">{subItem.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
