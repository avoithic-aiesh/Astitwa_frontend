
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";
import EventForm from "@/components/events/EventForm";
import PageContainer from "@/components/common/PageContainer";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

import { getEvent } from "@/lib/events";
import type { Event } from "@/lib/types";

function EditEventContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvent() {
      try {
        setLoading(true);
        setError("");

        const data = await getEvent(params.id);
        setEvent(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not load this event."
        );
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadEvent();
    }
  }, [params.id]);

  function handleSuccess() {
    router.push("/admin?updated=true");
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
            Edit Event
          </h1>

          <p className="mt-2 text-sm text-muted">
            Update the event details below.
          </p>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : event ? (
          <div className="max-w-3xl rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <EventForm
              key={event.id}
              event={event}
              onSuccess={handleSuccess}
            />
          </div>
        ) : null}
      </PageContainer>
    </AdminGuard>
  );
}

export default function EditEventPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <EditEventContent />
    </Suspense>
  );
}
