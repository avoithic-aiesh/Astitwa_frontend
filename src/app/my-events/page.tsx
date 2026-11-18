
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "@/Components/auth/AuthContext";
import { getMyRegistrations } from "@/lib/events";
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

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    let active = true;

    async function loadRegistrations() {
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

    void loadRegistrations();

    return () => {
      active = false;
    };
  }, [user, authLoading]);

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

  if (user.role !== "MEMBER") {
    return (
      <PageContainer>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            My Events
          </h1>

          <p className="mt-3 text-muted">
            This page is available to members only.
          </p>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Unable to load your events
          </h1>

          <p className="mt-3 text-muted">{error}</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          My Events
        </h1>

        <p className="mt-2 text-muted">
          View and manage the events you have registered for.
        </p>
      </div>

      {registrations.length === 0 ? (
        <EmptyState
          title="No registered events yet"
          message="You haven't registered for any events. Explore upcoming events and find something interesting to attend."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {registrations.map((registration) => (
            <article
              key={registration.id}
              className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-foreground">
                  {registration.event.title}
                </h2>

                <StatusBadge status={registration.event.status} />
              </div>

              <div className="flex flex-1 flex-col gap-3 text-sm text-muted">
                <p>
                  <span className="font-medium text-foreground">
                    Venue:
                  </span>{" "}
                  {registration.event.venue}
                </p>

                <p>
                  <span className="font-medium text-foreground">
                    Starts:
                  </span>{" "}
                  {formatDateTime(registration.event.startsAt)}
                </p>

                <p>
                  <span className="font-medium text-foreground">
                    Registered on:
                  </span>{" "}
                  {formatDateTime(registration.registeredAt)}
                </p>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <Link
                  href={`/events/${registration.event.id}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View event details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
