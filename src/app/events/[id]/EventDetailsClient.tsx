
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "@/Components/auth/AuthContext";

import {
  getEvent,
  getMyRegistrations,
  registerForEvent,
  cancelRegistration,
} from "@/lib/events";

import { formatDateTime } from "@/lib/format";
import type { Event } from "@/lib/types";

import StatusBadge from "@/Components/events/StatusBadge";
import LoadingState from "@/Components/common/LoadingState";
import PageContainer from "@/Components/common/PageContainer";

type Props = {
  id: string;
};

export default function EventDetailsClient({ id }: Props) {
  const { user, loading: authLoading } = useAuth();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  const loadDetails = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const eventData = await getEvent(id);
      setEvent(eventData);

      if (user?.role === "MEMBER") {
        const registrations = await getMyRegistrations();

        setIsRegistered(
          registrations.some(
            (registration) => registration.event.id === eventData.id
          )
        );
      } else {
        setIsRegistered(false);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load event details."
      );
    } finally {
      setLoading(false);
    }
  }, [id, user?.role]);

  useEffect(() => {
    if (authLoading) return;

    void loadDetails();
  }, [authLoading, loadDetails]);

  async function handleRegistration() {
    if (!event) return;

    setActionLoading(true);
    setActionError("");

    try {
      if (isRegistered) {
        await cancelRegistration(event.id);
      } else {
        await registerForEvent(event.id);
      }

      await loadDetails();
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Unable to process your registration."
      );
    } finally {
      setActionLoading(false);
    }
  }

  if (loading || authLoading) {
    return (
      <PageContainer>
        <LoadingState message="Loading event details..." />
      </PageContainer>
    );
  }

  if (error || !event) {
    return (
      <PageContainer>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Unable to load event
          </h1>

          <p className="mt-3 text-muted">
            {error || "Event not found."}
          </p>

          <Link
            href="/events"
            className="mt-6 inline-block font-medium text-primary hover:underline"
          >
            ← Back to events
          </Link>
        </div>
      </PageContainer>
    );
  }

  const isMember = user?.role === "MEMBER";
  const isCancelled = event.status === "CANCELLED";

  return (
    <PageContainer>
      <Link
        href="/events"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to events
      </Link>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-secondary">
              EVENT DETAILS
            </p>

            <h1 className="mt-2 text-3xl font-bold text-foreground">
              {event.title}
            </h1>
          </div>

          <StatusBadge status={event.status} />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">
            About this event
          </h2>

          <p className="mt-3 leading-7 text-muted">
            {event.description}
          </p>
        </div>

        <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted">Venue</p>
            <p className="mt-1 font-medium text-foreground">
              {event.venue}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted">Capacity</p>
            <p className="mt-1 font-medium text-foreground">
              {event.capacity} participants
            </p>
          </div>

          <div>
            <p className="text-sm text-muted">Starts</p>
            <p className="mt-1 font-medium text-foreground">
              {formatDateTime(event.startsAt)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted">Ends</p>
            <p className="mt-1 font-medium text-foreground">
              {formatDateTime(event.endsAt)}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h2 className="text-lg font-semibold text-foreground">
            Event Registration
          </h2>

          {isCancelled ? (
            <p className="mt-3 text-sm font-medium text-red-700">
              Registration is unavailable because this event has been cancelled.
            </p>
          ) : !user ? (
            <div className="mt-4">
              <p className="text-sm text-muted">
                Please log in to register for this event.
              </p>

              <Link
                href={`/login?next=${encodeURIComponent(`/events/${id}`)}`}
                className="mt-4 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Log in to register
              </Link>
            </div>
          ) : isMember ? (
            <div className="mt-4">
              <p className="text-sm text-muted">
                {isRegistered
                  ? "You are registered for this event."
                  : "You haven't registered for this event yet."}
              </p>

              <button
                type="button"
                onClick={handleRegistration}
                disabled={actionLoading}
                className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoading
                  ? "Please wait..."
                  : isRegistered
                    ? "Cancel Registration"
                    : "Register for Event"}
              </button>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted">
              Event registration is available to members.
            </p>
          )}

          {actionError && (
            <p className="mt-4 text-sm font-medium text-red-700" role="alert">
              {actionError}
            </p>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
