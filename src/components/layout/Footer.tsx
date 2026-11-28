"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PagodaLogo from "@/components/common/PagodaLogo";

const linkClass = "w-fit text-[#EADCD6] transition-colors hover:text-white";
const headingClass =
  "text-xs font-bold uppercase tracking-[0.18em] text-gold-light";
const socialClass =
  "flex h-11 w-11 items-center justify-center rounded-full border border-[#EADCD6]/60 text-sm font-bold text-[#EADCD6] transition-colors hover:border-white hover:text-white";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-[#4B1A28] bg-burgundy-deep text-[#F1E5DF]">
      <div className="mx-auto flex max-w-6xl flex-col gap-11 px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex w-fit items-center">
              <PagodaLogo variant="dark" size="md" showTagline />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#D8C1C4]">
              Discover cultural gatherings, register in seconds, and stay
              connected with your community.
            </p>
            <div className="flex gap-2.5">
              <a href="#" aria-label="Facebook" className={socialClass}>
                f
              </a>
              <a href="#" aria-label="Instagram" className={socialClass}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className={socialClass}>
                in
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <h4 className={headingClass}>Explore</h4>
            <Link href="/events" className={linkClass}>
              All Events
            </Link>
            <Link href="/#upcoming" className={linkClass}>
              Upcoming Events
            </Link>
            <Link href="/#story" className={linkClass}>
              How It Works
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <h4 className={headingClass}>Account</h4>
            <Link href="/login" className={linkClass}>
              Login
            </Link>
            <Link href="/signup" className={linkClass}>
              Get Started
            </Link>
            <Link href="/my-events" className={linkClass}>
              My Events
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <h4 className={headingClass}>Support</h4>
            <Link href="/contact" className={linkClass}>
              Contact Us
            </Link>
            <Link href="/help" className={linkClass}>
              Help Center
            </Link>
            <Link href="/faq" className={linkClass}>
              FAQs
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#5A2433] pt-6 text-xs text-[#CDB6BA]">
          <span>© 2026 Eventra. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
