"use client";

import { useState, Suspense } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MenuIcon, NepaliTempleLogo } from "@/components/dashboard/icons/SidebarIcons";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#F8F5EE] text-[#292524]">
      {/* Sidebar Component (Desktop persistent + Mobile slide-in drawer) */}
      <Suspense
        fallback={
          <aside
            aria-hidden="true"
            className="hidden md:flex h-screen w-[250px] shrink-0 bg-[#681F27]"
          />
        }
      >
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </Suspense>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Mobile Header Bar with Hamburger Menu (Visible only on mobile / small screens) */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E8E1D7] bg-[#681F27] px-4 text-white shadow-xs md:hidden">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open navigation sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#E5C38C] transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <MenuIcon size={24} />
          </button>

          <div className="flex items-center gap-2">
            <NepaliTempleLogo size={26} className="text-[#E5C38C]" />
            <span className="font-serif text-lg font-bold tracking-wide text-white">
              Eventra
            </span>
          </div>

          {/* Spacer to keep title centered */}
          <div className="w-10" />
        </header>

        {/* Dashboard Main Workspace */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
