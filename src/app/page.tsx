
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/Components/auth/AuthContext";

import EventCard from "@/Components/events/EventCard";
import LoadingState from "@/Components/common/LoadingState";
import ErrorState from "@/Components/common/ErrorState";
import EmptyState from "@/Components/common/EmptyState";

import PageContainer from "@/Components/common/PageContainer";

import { getEvents } from "@/lib/events";
import { isUpcoming } from "@/lib/format";
import type { Event } from "@/lib/types";

export default function Home() {
  const { user, loading: authLoading } = useAuth();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getEvents();

      const upcomingEvents = data
        .filter(
          (event) =>
            event.status === "PUBLISHED" &&
            isUpcoming(event.startsAt)
        )
        .sort(
          (a, b) =>
            new Date(a.startsAt).getTime() -
            new Date(b.startsAt).getTime()
        )
        .slice(0, 3);

      setEvents(upcomingEvents);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load upcoming events."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  return (
    <main className="flex-1">
      {/* Hero section */}
      <section className="border-b border-border bg-background">
        <PageContainer>
          <div className="py-16 text-center md:py-24">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Welcome to Eventra
            </p>

            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
              Discover events.
              <span className="text-primary"> Find your community.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Explore upcoming events, discover new experiences,
              and register for the activities that interest you.
              Your next experience starts here.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/events"
                className="rounded-lg bg-primary px-7 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              >
                Browse Events
              </Link>

              {!authLoading && !user && (
                <>
                  <Link
                    href="/login"
                    className="rounded-lg border border-border bg-surface px-7 py-3 font-semibold text-foreground transition-colors hover:bg-background"
                  >
                    Log In
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-lg border border-primary px-7 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {!authLoading && user?.role === "MEMBER" && (
                <Link
                  href="/my-events"
                  className="rounded-lg border border-border bg-surface px-7 py-3 font-semibold text-foreground transition-colors hover:bg-background"
                >
                  My Events
                </Link>
              )}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Upcoming events */}
      <section className="py-16 md:py-20">
        <PageContainer>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold text-foreground">
                Upcoming Events
              </h2>

              <p className="mt-2 text-muted">
                Find an event that interests you and be part of it.
              </p>
            </div>

            <Link
              href="/events"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View all events →
            </Link>
          </div>

          {loading ? (
            <LoadingState message="Loading upcoming events..." />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={loadEvents}
            />
          ) : events.length === 0 ? (
            <EmptyState
              title="No upcoming events"
              message="There are no upcoming published events right now. Please check back later."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-block rounded-lg bg-primary px-7 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explore All Events
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* About section */}
      <section
        id="about"
        className="border-t border-border bg-surface py-16 md:py-20"
      >
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              About Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-primary">
              About Eventra
            </h2>

            <p className="mt-5 leading-7 text-muted">
              Eventra is a platform that brings event discovery
              and registration together in one place. It helps
              students explore activities, stay informed about
              upcoming events, and take part in their community.
            </p>

            <p className="mt-4 font-medium text-foreground">
              Discover. Participate. Connect.
            </p>
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
