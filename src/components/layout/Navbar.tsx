"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import PagodaLogo from "@/components/common/PagodaLogo";
import { useState, useSyncExternalStore, Suspense } from "react";

const emptySubscribe = () => () => {};

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
];

function NavbarContent() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  // Hide on dashboard pages so dashboard has full sidebar layout
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const isLanding = pathname === "/";

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  async function handleLogout() {
    setMobileOpen(false);
    await logout();
    router.push("/");
  }

  // Homepage: no nav bar. Only the logo (left) and Login / Logout (right).
  if (isLanding) {
    return (
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <Link
          href="/"
          aria-label="Eventra home"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
        >
          <PagodaLogo variant="dark" size="md" />
        </Link>

        {!mounted || loading ? null : user ? (
          <button
            type="button"
            onClick={handleLogout}
            className="min-h-11 cursor-pointer whitespace-nowrap rounded-full border border-gold-light/80 bg-[#1A080E]/60 px-6 text-sm font-semibold text-[#FAF6EE] backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full border border-gold-light/85 bg-[#1A080E]/55 px-6 text-sm font-semibold text-[#FAF6EE] backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Login
          </Link>
        )}
      </header>
    );
  }

  // All other pages keep the regular navigation bar.
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
    <header className="relative z-30 flex items-center justify-between gap-3 border-b border-border bg-surface/95 px-4 py-3.5 backdrop-blur md:gap-8 md:px-8">
      <Link href="/" onClick={() => setMobileOpen(false)} className="shrink-0">
        <PagodaLogo variant="light" size="md" />
      </Link>

      <nav className="hidden gap-7 md:flex" aria-label="Main navigation">
        {roleLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive(link.href) ? "font-semibold text-primary" : "text-muted"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2.5 md:gap-3">
        {!mounted || loading ? null : user ? (
          <>
            <span className="hidden text-sm text-muted sm:inline">
              Hi, {user.fullName?.split(" ")[0] ?? "User"}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="whitespace-nowrap rounded-full border border-primary/25 bg-rose-soft px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-rose-tint"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
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
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
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
              onClick={() => setMobileOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm transition-colors hover:bg-rose-soft hover:text-primary ${
                isActive(link.href) ? "font-semibold text-primary" : "text-muted"
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

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}
