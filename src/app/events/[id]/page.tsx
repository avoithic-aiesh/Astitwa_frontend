
import { Suspense } from "react";
import EventDetailsClient from "./EventDetailsClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function EventDetailsContent({ params }: Props) {
  const { id } = await params;

  return <EventDetailsClient id={id} />;
}

export default function EventDetailsPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background p-8">
          <p className="text-muted">Loading event details...</p>
        </main>
      }
    >
      <EventDetailsContent params={params} />
    </Suspense>
  );
}
