
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "@/components/auth/AuthContext";

import {
  getEvent,
  getMyRegistrations,
  registerForEvent,
  cancelRegistration,
} from "@/lib/events";

import { formatDateTime } from "@/lib/format";
import type { Event } from "@/lib/types";

import StatusBadge from "@/components/events/StatusBadge";
import LoadingState from "@/components/common/LoadingState";
import PageContainer from "@/components/common/PageContainer";

type Props = {
  id: string;
};

export default function EventDetailsClient({ id }: Props) {
  const { user, loading: authLoading } = useAuth();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationCheckFailed, setRegistrationCheckFailed] = useState(false);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadDetails = useCallback(async () => {
    setLoading(true);
    setError("");
    setRegistrationCheckFailed(false);

    try {
      const eventData = await getEvent(id);
      setEvent(eventData);

      if (user) {
        try {
          const registrations = await getMyRegistrations();

          setIsRegistered(
            registrations.some(
              (registration) => registration.event.id === eventData.id
            )
          );
        } catch {
          setRegistrationCheckFailed(true);
        }
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
  }, [id, user]);

  useEffect(() => {
    if (authLoading) return;

    let active = true;

    async function run() {
      await loadDetails();
    }

    if (active) {
      run();
    }

    return () => {
      active = false;
    };
  }, [authLoading, loadDetails]);

  async function handleRegistration() {
    if (!event || !user || registrationCheckFailed) return;

    setActionLoading(true);
    setActionError("");
    setSuccessMessage("");

    try {
      if (isRegistered) {
        await cancelRegistration(event.id);
        setIsRegistered(false);
        setSuccessMessage("Your registration has been cancelled successfully.");
      } else {
        await registerForEvent(event.id);
        setIsRegistered(true);
        setSuccessMessage("You have successfully registered for this event.");
      }
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

  const isCancelled = event.status === "CANCELLED";
  const isEnded = new Date(event.endsAt) < new Date(Date.now());

  // Backend can provide registeredCount in a future update.
  const registeredCount = event.registeredCount;

  const seatsLeft =
    typeof registeredCount === "number"
      ? Math.max(0, event.capacity - registeredCount)
      : null;

  const isFull =
    seatsLeft !== null && seatsLeft <= 0 && !isRegistered;

  return (
    <PageContainer>
      <Link
        href="/events"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to events
      </Link>

      <div className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              Event Details
            </p>

            <h1 className="font-display mt-2 text-3xl font-bold text-foreground sm:text-4xl">
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

          {seatsLeft !== null && (
            <div>
              <p className="text-sm text-muted">Seats remaining</p>
              <p className="mt-1 font-medium text-foreground">
                {seatsLeft}
              </p>
            </div>
          )}

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
          ) : isEnded ? (
            <p className="mt-3 text-sm font-medium text-muted">
              This event has ended. Registration is closed.
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
          ) : (
            <div className="mt-4">
              <p className="text-sm text-muted">
                {isRegistered
                  ? "You are registered for this event."
                  : "You have not registered for this event yet."}
              </p>

              {registrationCheckFailed && (
                <p className="mt-3 text-sm text-amber-700" role="status">
                  We could not check your registration status. Please refresh the page and try again.
                </p>
              )}

              {isFull && (
                <p className="mt-3 text-sm font-medium text-red-700">
                  This event is full. Registration is unavailable.
                </p>
              )}

              <button
                type="button"
                onClick={handleRegistration}
                disabled={
                  actionLoading ||
                  registrationCheckFailed ||
                  isFull
                }
                className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoading
                  ? "Please wait..."
                  : isRegistered
                    ? "Cancel Registration"
                    : "Register for Event"}
              </button>
            </div>
          )}

          {successMessage && (
            <p className="mt-4 text-sm font-medium text-green-700" role="status">
              {successMessage}
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
