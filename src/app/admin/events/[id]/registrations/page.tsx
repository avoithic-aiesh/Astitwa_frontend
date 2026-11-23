
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AdminGuard from "@/Components/auth/AdminGuard";
import PageContainer from "@/Components/common/PageContainer";
import LoadingState from "@/Components/common/LoadingState";
import ErrorState from "@/Components/common/ErrorState";

import { getEventRegistrations } from "@/lib/admin";
import { getEvent } from "@/lib/events";
import type { Event } from "@/lib/types";
import type { AdminRegistration } from "@/lib/admin";

function RegistrationsContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [eventData, registrationData] = await Promise.all([
          getEvent(params.id),
          getEventRegistrations(params.id),
        ]);

        setEvent(eventData);
        setRegistrations(registrationData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not load event registrations."
        );
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadData();
    }
  }, [params.id]);

  function formatDate(value: string) {
    return new Date(value).toLocaleString("en-NP", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <AdminGuard>
      <PageContainer>
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-4 text-sm font-medium text-muted transition hover:text-primary"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-foreground">
            Event Registrations
          </h1>

          <p className="mt-2 text-sm text-muted">
            View everyone registered for this event.
          </p>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : event ? (
          <>
            <div className="mb-6 rounded-xl border border-border bg-surface p-5">
              <h2 className="text-xl font-semibold text-foreground">
                {event.title}
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted">Total Registered</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {registrations.length}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted">Maximum Capacity</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {event.capacity}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted">Available Seats</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {Math.max(event.capacity - registrations.length, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-surface">
              <div className="border-b border-border p-5">
                <h2 className="font-semibold text-foreground">
                  Registered Attendees
                </h2>
              </div>

              {registrations.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="font-medium text-foreground">
                    No registrations yet
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Attendees will appear here when they register.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-background text-muted">
                      <tr>
                        <th className="px-5 py-4 font-semibold">#</th>
                        <th className="px-5 py-4 font-semibold">Name</th>
                        <th className="px-5 py-4 font-semibold">Email</th>
                        <th className="px-5 py-4 font-semibold">
                          Registration Date
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                      {registrations.map((registration, index) => (
                        <tr key={registration.id}>
                          <td className="px-5 py-4 text-muted">
                            {index + 1}
                          </td>
                          <td className="px-5 py-4 font-medium text-foreground">
                            {registration.user.fullName}
                          </td>
                          <td className="px-5 py-4 text-muted">
                            {registration.user.email}
                          </td>
                          <td className="px-5 py-4 text-muted">
                            {formatDate(registration.registeredAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : null}
      </PageContainer>
    </AdminGuard>
  );
}

export default function RegistrationsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <RegistrationsContent />
    </Suspense>
  );
}
