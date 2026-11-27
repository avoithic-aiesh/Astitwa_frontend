"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return (
    typeof window !== "undefined" &&
    Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
  );
}

function getReducedMotionServerSnapshot() {
  return false;
}

type Slide = {
  tag: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  image: string;
  imageAlt: string;
  badgeText: string;
  metaPrimary: string;
  metaSecondary: string;
};

const SLIDES: Slide[] = [
  {
    tag: "DISCOVER",
    titlePrefix: "Find events that ",
    titleHighlight: "feel like you",
    description:
      "Concerts, workshops, cultural festivals, and local meetups — curated in one warm, effortless space.",
    image: "/images/event-community.jpg",
    imageAlt: "Evening lantern-lit community cultural gathering",
    badgeText: "Curated For You",
    metaPrimary: "Arts · Music · Heritage",
    metaSecondary: "Happening around you",
  },
  {
    tag: "REGISTERED",
    titlePrefix: "Reserve a seat in ",
    titleHighlight: "one tap",
    description:
      "Register instantly with zero friction and keep every upcoming pass organized inside your account.",
    image: "/images/event-workshop.jpg",
    imageAlt: "Creative pottery and design workshop in sunlit studio",
    badgeText: "Seat Confirmed",
    metaPrimary: "Instant RSVP & Tracking",
    metaSecondary: "Always in My Events",
  },
  {
    tag: "CHECKED IN",
    titlePrefix: "Show up and ",
    titleHighlight: "be part of it",
    description:
      "Arrive at the courtyard or auditorium, check in seamlessly, and celebrate culture with your community.",
    image: "/images/event-concert.jpg",
    imageAlt: "Warmly lit intimate live acoustic concert stage",
    badgeText: "Live Experience",
    metaPrimary: "Community & Connection",
    metaSecondary: "Memorable local moments",
  },
];

const SLIDE_INTERVAL_MS = 3000;

export default function StoryCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const goTo = useCallback((index: number) => {
    setCurrent(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion]);

  return (
    <section
      id="story"
      aria-roledescription="carousel"
      aria-label="How Eventra works"
      className="relative px-4 py-10 sm:px-6 lg:px-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goTo(current + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goTo(current - 1);
        }
      }}
    >
      <div className="relative mx-auto min-h-[540px] max-w-7xl overflow-hidden rounded-[32px] border border-[#5D2937] bg-[radial-gradient(ellipse_at_50%_100%,#7A2438_0%,#3D121E_45%,#18060C_100%)] text-[#FAF6EE] shadow-2xl sm:min-h-[580px]">
        {/* Subtle burnt-rust and rose-tint ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#B84A2E]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#E6C987]/10 blur-3xl"
        />

        <div className="relative h-full min-h-[540px] sm:min-h-[580px]">
          {SLIDES.map((slide, index) => {
            const isActive = index === current;
            const isPrev =
              index === (current - 1 + SLIDES.length) % SLIDES.length;

            let positionClass = "translate-x-14 opacity-0 pointer-events-none";
            if (isActive) {
              positionClass = "translate-x-0 opacity-100 pointer-events-auto";
            } else if (isPrev) {
              positionClass = "-translate-x-14 opacity-0 pointer-events-none";
            }

            return (
              <div
                key={slide.tag}
                aria-hidden={!isActive}
                className={`absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 pb-20 pt-12 transition-all duration-700 ease-out md:flex-row md:gap-14 md:px-14 ${positionClass}`}
              >
                <div className="max-w-lg text-center md:text-left">
                  <span className="inline-block rounded-full border border-[#E6C987]/35 bg-[#B84A2E]/25 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-light">
                    {slide.tag}
                  </span>

                  <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-[#FAF6EE] sm:text-5xl">
                    {slide.titlePrefix}
                    <span className="text-gold-light">
                      {slide.titleHighlight}
                    </span>
                  </h2>

                  <p className="mt-4 max-w-md text-base leading-relaxed text-[#DFC8CB]">
                    {slide.description}
                  </p>
                </div>

                {/* Editorial photography + UI preview card */}
                <div className="w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#6E3544] bg-[#260D15]/95 shadow-[0_0_60px_rgba(193,154,60,0.22)]">
                  <div className="relative h-40 w-full overflow-hidden bg-[#3B1522]">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#260D15] via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#18060C]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-light backdrop-blur-sm">
                      {slide.tag}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#FAF6EE]">
                        {slide.metaPrimary}
                      </span>
                      <span className="rounded-full bg-rose-tint/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#F2B8C0]">
                        {slide.badgeText}
                      </span>
                    </div>
                    <p className="text-xs text-[#CDB3B7]">
                      {slide.metaSecondary}
                    </p>
                    <div className="mt-1 flex gap-2">
                      <span className="h-2 w-3/4 rounded-full bg-[#532330]" />
                      <span className="h-2 w-1/4 rounded-full bg-[#B84A2E]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1">
          {SLIDES.map((slide, index) => {
            const isActive = index === current;
            return (
              <button
                key={slide.tag}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show slide ${index + 1}: ${slide.tag}`}
                aria-current={isActive ? "true" : undefined}
                className="relative flex h-11 w-11 cursor-pointer items-center justify-center border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-gold-light"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-7 bg-gold-light"
                      : "w-2.5 bg-[#965C6B] hover:bg-[#DFB6BC]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
