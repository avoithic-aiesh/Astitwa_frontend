"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/Components/auth/AuthContext";
import { PagodaIcon } from "@/Components/common/PagodaLogo";
import StoryCarousel from "@/Components/landing/StoryCarousel";
import EventCard from "@/Components/events/EventCard";
import LoadingState from "@/Components/common/LoadingState";
import ErrorState from "@/Components/common/ErrorState";
import EmptyState from "@/Components/common/EmptyState";

import { getEvents } from "@/lib/events";
import { isUpcoming } from "@/lib/format";
import type { Event } from "@/lib/types";

export default function Home() {
  const { user, loading: authLoading } = useAuth();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUpcomingEvents = useCallback(async () => {
    const data = await getEvents();

    return data
      .filter(
        (event) =>
          event.status === "PUBLISHED" && isUpcoming(event.startsAt)
      )
      .sort(
        (a, b) =>
          new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
      )
      .slice(0, 3);
  }, []);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setEvents(await fetchUpcomingEvents());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load upcoming events."
      );
    } finally {
      setLoading(false);
    }
  }, [fetchUpcomingEvents]);

  useEffect(() => {
    let active = true;

    fetchUpcomingEvents()
      .then((upcomingEvents) => {
        if (active) setEvents(upcomingEvents);
      })
      .catch((err) => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load upcoming events."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [fetchUpcomingEvents]);

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#16050A] px-6 pb-20 pt-28 text-center text-[#FAF6EE]">
        <Image
          src="/images/hero-festival.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(184,74,46,0.42)_0%,rgba(107,29,47,0.78)_38%,rgba(22,5,10,0.95)_85%)]"
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-light/35 bg-[#2A0A13]/75 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-gold-light backdrop-blur-sm">
            <PagodaIcon variant="dark" size={20} />
            <span>Events · Culture · Community</span>
          </div>

          <h1 className="font-display m-0 bg-gradient-to-b from-[#FAF6EE] via-[#F5E2E4] to-[#E6C987] bg-clip-text text-6xl font-black uppercase leading-none tracking-[0.06em] text-transparent drop-shadow-[0_8px_32px_rgba(184,74,46,0.35)] sm:text-8xl lg:text-[7.5rem]">
            EVENTRA
          </h1>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            {authLoading ? null : !user ? (
              <Link
                href="/signup"
                className="inline-flex min-h-12 items-center rounded-full border border-gold bg-[#18060C]/90 px-8 text-sm font-bold text-white shadow-[0_0_26px_rgba(193,154,60,0.38)] transition-colors hover:bg-primary"
              >
                Get Started
              </Link>
            ) : isAdmin ? (
              <Link
                href="/admin"
                className="inline-flex min-h-12 items-center rounded-full bg-secondary px-8 text-sm font-bold text-white shadow-md transition-colors hover:bg-secondary-hover"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                href="/my-events"
                className="inline-flex min-h-12 items-center rounded-full bg-secondary px-8 text-sm font-bold text-white shadow-md transition-colors hover:bg-secondary-hover"
              >
                My Events
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events — highlighted frame, same style as the story carousel */}
      <section id="upcoming" className="relative px-4 py-10 sm:px-6 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#5D2937] bg-[radial-gradient(ellipse_at_50%_100%,#7A2438_0%,#3D121E_45%,#18060C_100%)] text-[#FAF6EE] shadow-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#B84A2E]/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#E6C987]/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-10 px-6 py-14 sm:px-10 lg:px-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
                Explore
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold text-[#FAF6EE] sm:text-5xl">
                Upcoming Events
              </h2>
              <p className="mt-2 text-[#DFC8CB]">
                Find an event that inspires you and be part of it.
              </p>
            </div>

            {loading ? (
              <div className="rounded-2xl bg-surface p-6 text-foreground">
                <LoadingState message="Loading upcoming events..." />
              </div>
            ) : error ? (
              <div className="rounded-2xl bg-surface p-6 text-foreground">
                <ErrorState message={error} onRetry={loadEvents} />
              </div>
            ) : events.length === 0 ? (
              <div className="rounded-2xl bg-surface p-6 text-foreground">
                <EmptyState
                  title="No upcoming events"
                  message="There are no upcoming published events right now. Please check back later."
                />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event, index) => (
                  <EventCard key={event.id} event={event} photoIndex={index} />
                ))}
              </div>
            )}

            <div className="flex justify-center pt-2">
              <Link
                href="/events"
                className="inline-flex min-h-12 items-center rounded-full border border-gold bg-[#18060C]/90 px-8 text-sm font-bold text-white shadow-[0_0_26px_rgba(193,154,60,0.35)] transition-colors hover:bg-primary"
              >
                Explore All Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StoryCarousel />

      {/* Choose Your Adventure */}
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col items-start gap-4 rounded-3xl border border-border bg-surface p-8 shadow-sm transition-shadow hover:shadow-md">
            <span className="rounded-full bg-rose-tint px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Community
            </span>
            <h3 className="font-display text-2xl font-bold text-foreground">
              For attendees
            </h3>
            <p className="leading-relaxed text-muted">
              Browse upcoming events, reserve your seat in seconds, and keep
              track of everything you have joined.
            </p>
            <Link
              href={user ? "/my-events" : "/signup"}
              className="mt-2 inline-flex min-h-11 items-center rounded-full bg-primary px-7 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
            >
              {user ? "My Events" : "Get Started"}
            </Link>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-3xl border border-rose-border bg-rose-soft p-8 shadow-sm transition-shadow hover:shadow-md">
            <span className="rounded-full bg-secondary/15 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-secondary">
              Hosts &amp; Teams
            </span>
            <h3 className="font-display text-2xl font-bold text-foreground">
              For organizers
            </h3>
            <p className="leading-relaxed text-muted">
              Publish events, manage participant registrations, and keep track
              of attendance with ease.
            </p>
            <Link
              href={isAdmin ? "/admin" : "/login"}
              className="mt-2 inline-flex min-h-11 items-center rounded-full bg-secondary px-7 text-sm font-bold text-white transition-colors hover:bg-secondary-hover"
            >
              {isAdmin ? "Open Dashboard" : "Login"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
