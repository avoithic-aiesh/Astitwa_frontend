
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/Components/auth/AuthContext";
import { useEffect, useState, type MouseEvent } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/#about", label: "About" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  function isActive(href: string) {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function handleNavClick(
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    setMobileOpen(false);

    if (pathname !== "/") return;

    if (href === "/#about") {
      e.preventDefault();
      document.getElementById("about")?.scrollIntoView({
        behavior: "smooth",
      });
      window.history.replaceState(null, "", "/#about");
    } else if (href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
    }
  }

  async function handleLogout() {
    setMobileOpen(false);
    await logout();
    router.push("/");
  }

  const roleLinks = user
    ? [
        ...links,
        { href: "/my-events", label: "My Events" },
        ...(user.role === "ADMIN" || user.role === "SUPER_ADMIN"
          ? [{ href: "/admin", label: "Admin Dashboard" }]
          : []),
        { href: "/profile", label: "Profile" },
      ]
    : links;

  return (
    <header className="relative flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-4 md:gap-8 md:px-8">
      <Link
        href="/"
        onClick={() => setMobileOpen(false)}
        className="shrink-0 text-xl font-extrabold uppercase tracking-[0.2em] text-primary md:text-2xl md:tracking-[0.25em]"
      >
        EVENTRA<span className="text-secondary">.</span>
      </Link>

      <nav className="hidden gap-6 md:flex" aria-label="Main navigation">
        {roleLinks.map((link) => (
          <Link
            onClick={(e) => handleNavClick(e, link.href)}
            key={link.href}
            href={link.href}
            className={`text-sm transition-colors hover:text-primary ${
              isActive(link.href)
                ? "font-semibold text-primary"
                : "text-muted"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        {!mounted || loading ? null : user ? (
          <>
            <span className="hidden text-sm text-muted sm:inline">
              Hi, {user.fullName?.split(" ")[0] ?? "User"}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 md:px-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 md:px-4"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 md:px-4"
            >
              Sign Up
            </Link>
          </>
        )}

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="rounded-lg border border-border p-2 text-primary md:hidden"
        >
          {mobileOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="absolute left-0 right-0 top-full z-50 flex flex-col gap-1 border-b border-border bg-surface p-4 shadow-md md:hidden"
          aria-label="Mobile navigation"
        >
          {roleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`rounded-lg px-4 py-3 text-sm transition-colors hover:bg-background hover:text-primary ${
                isActive(link.href)
                  ? "font-semibold text-primary"
                  : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
