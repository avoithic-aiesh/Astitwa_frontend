"use client";

import { useEffect, useCallback } from "react";
import { SIDEBAR_NAV_ITEMS } from "./navigationData";
import { SidebarItem } from "./SidebarItem";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarArtwork } from "./SidebarArtwork";
import { CloseIcon } from "./icons/SidebarIcons";

interface SidebarProps {
  /** Controlled open state for mobile / tablet drawer */
  mobileOpen?: boolean;
  /** Callback to close the mobile drawer */
  onClose?: () => void;
  className?: string;
}

export function Sidebar({
  mobileOpen = false,
  onClose,
  className = "",
}: SidebarProps) {
  // Close drawer on Escape key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen && onClose) {
        onClose();
      }
    },
    [mobileOpen, onClose]
  );

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when mobile drawer is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, handleKeyDown]);

  const handleNavigate = () => {
    if (onClose) {
      onClose();
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:#8C323C_transparent]">
      {/* Top Branding Section */}
      <div className="shrink-0">
        <SidebarLogo onNavigate={handleNavigate} />
        {/* Subtle decorative divider line */}
        <div className="mx-6 mb-3 border-b border-[#DFBA73]/20" />
      </div>

      {/* Main Navigation List */}
      <nav
        aria-label="Sidebar navigation"
        className="flex-1 space-y-0.5 py-1"
      >
        {SIDEBAR_NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            onNavigate={handleNavigate}
          />
        ))}
      </nav>

      {/* Bottom Traditional Nepali Pagoda Artwork */}
      <div className="shrink-0 mt-4">
        <SidebarArtwork />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (fixed width ~250px, full height) */}
      <aside
        aria-label="Desktop sidebar"
        className={`hidden md:flex h-screen w-[250px] shrink-0 flex-col sticky top-0 z-30 bg-[#681F27] border-r border-[#52171E] shadow-sm select-none ${className}`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          role="presentation"
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/65 backdrop-blur-xs transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Mobile / Tablet Slide-in Drawer */}
      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[260px] max-w-[85vw] flex-col bg-[#681F27] shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Close Button */}
        <div className="absolute right-3 top-4 z-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#FAF6F0] transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {sidebarContent}
      </aside>
    </>
  );
}

export default Sidebar;
