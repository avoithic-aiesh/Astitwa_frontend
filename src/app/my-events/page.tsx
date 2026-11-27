
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "@/Components/auth/AuthContext";
import {
  getMyRegistrations,
  cancelRegistration,
} from "@/lib/events";
import { formatDateTime } from "@/lib/format";

import type { Registration } from "@/lib/types";

import LoadingState from "@/Components/common/LoadingState";
import EmptyState from "@/Components/common/EmptyState";
import PageContainer from "@/Components/common/PageContainer";
import StatusBadge from "@/Components/events/StatusBadge";

export default function MyEventsPage() {
  const { user, loading: authLoading } = useAuth();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  async function loadRegistrations() {
    setError("");

    const data = await getMyRegistrations();
    setRegistrations(data);
  }

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      // schedule so we're not calling setState synchronously in the effect body
      const id = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(id);
    }

    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await getMyRegistrations();

        if (active) {
          setRegistrations(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your registered events."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [user, authLoading]);

  async function handleCancel(registration: Registration) {
    const confirmed = window.confirm(
      `Are you sure you want to cancel your registration for "${registration.event.title}"?`
    );

    if (!confirmed) return;

    setCancellingId(registration.event.id);
    setError("");

    try {
      await cancelRegistration(registration.event.id);
      await loadRegistrations();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to cancel your registration."
      );
    } finally {
      setCancellingId(null);
    }
  }

  if (authLoading || loading) {
    return (
      <PageContainer>
        <LoadingState message="Loading your events..." />
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            My Events
          </h1>

          <p className="mt-3 text-muted">
            Please log in to view your registered events.
          </p>

          <Link
            href="/login?next=%2Fmy-events"
            className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Log in
          </Link>
        </div>
      </PageContainer>
    );
  }

  const nowTs = new Date(Date.now());

  const upcomingEvents = registrations
    .filter(
      (registration) =>
        new Date(registration.event.endsAt) > nowTs
    )
    .sort(
      (a, b) =>
        new Date(a.event.startsAt).getTime() -
        new Date(b.event.startsAt).getTime()
    );

  const pastEvents = registrations
    .filter(
      (registration) =>
        new Date(registration.event.endsAt) <= nowTs
    )
    .sort(
      (a, b) =>
        new Date(b.event.startsAt).getTime() -
        new Date(a.event.startsAt).getTime()
    );

  function renderRegistration(registration: Registration, isUpcoming: boolean) {
    const event = registration.event;
    const isCancelling = cancellingId === event.id;

    return (
      <article
        key={registration.id}
        className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-sm"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-foreground">
            {event.title}
          </h3>

          <StatusBadge status={event.status} />
        </div>

        <div className="flex flex-1 flex-col gap-3 text-sm text-muted">
          <p>
            <span className="font-medium text-foreground">Venue:</span>{" "}
            {event.venue}
          </p>

          <p>
            <span className="font-medium text-foreground">Starts:</span>{" "}
            {formatDateTime(event.startsAt)}
          </p>

          <p>
            <span className="font-medium text-foreground">Ends:</span>{" "}
            {formatDateTime(event.endsAt)}
          </p>

          <p>
            <span className="font-medium text-foreground">
              Registered on:
            </span>{" "}
            {formatDateTime(registration.registeredAt)}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
          <Link
            href={`/events/${event.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View event details →
          </Link>

          {isUpcoming && (
            <button
              type="button"
              onClick={() => handleCancel(registration)}
              disabled={isCancelling}
              className="text-sm font-medium text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCancelling ? "Cancelling..." : "Cancel registration"}
            </button>
          )}
        </div>
      </article>
    );
  }

  return (
    <PageContainer>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          Your Schedule
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          My Events
        </h1>

        <p className="mt-2 text-muted">
          View and manage the events you have registered for.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-rose-border bg-rose-soft p-4 text-sm text-primary">
          {error}
        </div>
      )}

      <section className="mb-12">
        <div className="mb-5">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Upcoming Events
          </h2>
          <p className="mt-1 text-sm text-muted">
            Events that have not ended yet.
          </p>
        </div>

        {upcomingEvents.length === 0 ? (
          <EmptyState
            title="No upcoming events"
            message="You don't have any upcoming registered events. Browse events to find something interesting."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((registration) =>
              renderRegistration(registration, true)
            )}
          </div>
        )}
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-foreground">
            Past Events
          </h2>
          <p className="mt-1 text-sm text-muted">
            Events that have already ended.
          </p>
        </div>

        {pastEvents.length === 0 ? (
          <EmptyState
            title="No past events"
            message="Your completed events will appear here."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((registration) =>
              renderRegistration(registration, false)
            )}
          </div>
        )}
      </section>

      <div className="mt-8">
        <Link
          href="/events"
          className="text-sm font-medium text-primary hover:underline"
        >
          Browse all events →
        </Link>
      </div>
    </PageContainer>
  );
}
