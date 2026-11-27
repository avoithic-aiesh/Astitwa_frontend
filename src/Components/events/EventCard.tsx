import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/lib/types";
import { formatDateTime } from "@/lib/format";
import StatusBadge from "./StatusBadge";

const FALLBACK_PHOTOS = [
  "/images/event-community.jpg",
  "/images/event-workshop.jpg",
  "/images/event-concert.jpg",
];

function getFallbackPhoto(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_PHOTOS[hash % FALLBACK_PHOTOS.length];
}

type Props = {
  event: Event;
  photoIndex?: number;
};

export default function EventCard({ event, photoIndex }: Props) {
  const coverSrc =
    event.image ||
    (typeof photoIndex === "number"
      ? FALLBACK_PHOTOS[photoIndex % FALLBACK_PHOTOS.length]
      : getFallbackPhoto(event.id));

  const isLocalImage = coverSrc.startsWith("/");

  return (
    <Link
      href={`/events/${event.id}`}
      className="group block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-rose-border group-hover:shadow-lg">
        <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-primary via-secondary to-gold">
          <Image
            src={coverSrc}
            alt={event.title}
            fill
            unoptimized={!isLocalImage}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#230910]/70 via-[#230910]/15 to-transparent" />
          <div className="absolute right-3 top-3">
            <StatusBadge status={event.status} />
          </div>
          {event.category && (
            <span className="absolute bottom-3 left-4 rounded-full border border-gold-light/40 bg-[#18060C]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-light backdrop-blur-sm">
              {event.category}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
            {formatDateTime(event.startsAt)}
          </p>

          <h3 className="font-display mt-2 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
            {event.title}
          </h3>

          <p className="mt-2 text-sm text-muted">
            <span className="font-medium text-foreground">Venue:</span>{" "}
            {event.venue}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs">
            <span className="rounded-full bg-rose-soft px-3 py-1 font-medium text-primary">
              Capacity: {event.capacity}
            </span>

            <span className="text-sm font-semibold text-primary transition-transform group-hover:translate-x-0.5">
              View details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
