
import Link from "next/link";
import type { Event } from "@/lib/types";
import { formatDateTime } from "@/lib/format";
import StatusBadge from "./StatusBadge";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold text-foreground">
            {event.title}
          </h2>

          <StatusBadge status={event.status} />
        </div>

        <div className="flex flex-1 flex-col gap-2 text-sm text-muted">
          <p>
            <span className="font-medium text-foreground">Venue:</span>{" "}
            {event.venue}
          </p>

          <p>
            <span className="font-medium text-foreground">Starts:</span>{" "}
            {formatDateTime(event.startsAt)}
          </p>

          {event.category && (
            <p>
              <span className="font-medium text-foreground">Category:</span>{" "}
              {event.category}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <p className="text-xs text-muted">
            Capacity: {event.capacity} people
          </p>

          <span className="text-sm font-medium text-primary">
            View details →
          </span>
        </div>
      </article>
    </Link>
  );
}
