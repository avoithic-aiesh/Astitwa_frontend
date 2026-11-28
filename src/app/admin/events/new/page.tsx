
"use client";

import { useRouter } from "next/navigation";

import AdminGuard from "@/components/auth/AdminGuard";
import EventForm from "@/components/events/EventForm";
import PageContainer from "@/components/common/PageContainer";

export default function NewEventPage() {
  const router = useRouter();

  function handleSuccess() {
    router.push("/admin?created=true");
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
            Create New Event
          </h1>

          <p className="mt-2 text-sm text-muted">
            Fill in the details below to publish a new event.
          </p>
        </div>

        <div className="max-w-3xl rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <EventForm onSuccess={handleSuccess} />
        </div>
      </PageContainer>
    </AdminGuard>
  );
}
