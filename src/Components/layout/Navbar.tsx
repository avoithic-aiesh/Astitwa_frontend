"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/Components/auth/AuthContext";
import { useState, type MouseEvent } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/#about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  function isActive(href: string) {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

function handleNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
  if (pathname !== "/") return; // on other pages, let the link navigate normally

  if (href === "/#about") {
    e.preventDefault();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "/#about");
  } else if (href === "/") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
  }
}

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="flex items-center justify-between gap-8 border-b border-border bg-surface px-8 py-4">
      <Link href="/" className="shrink-0 text-2xl font-extrabold uppercase tracking-[0.25em] text-primary">
        EVENTRA<span className="text-secondary">.</span>
      </Link>

      <nav className="flex gap-6" aria-label="Main navigation">
        {links.map((link) => (
          <Link
           onClick={(e) => handleNavClick(e, link.href)}
            key={link.href}
            href={link.href}
            className={`text-sm transition-colors hover:text-primary ${
              isActive(link.href) ? "font-semibold text-primary" : "text-muted"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          aria-label="Search"
          className="whitespace-nowrap rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
        </button>

        {loading ? null : user ? (
          <>
            <span className="text-sm text-muted">
              Hi, {user.name.split(" ")[0]}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}