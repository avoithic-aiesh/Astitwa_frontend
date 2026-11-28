
"use client";

import { useCallback, useEffect, useState } from "react";

import EventCard from "@/components/events/EventCard";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";
import PageContainer from "@/components/common/PageContainer";

import { getEvents } from "@/lib/events";
import type { Event } from "@/lib/types";

function getDateKey(date: string): string {
  const parsedDate = new Date(date);

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getEvents();

      const publishedEvents = data.filter(
        (event) => event.status === "PUBLISHED"
      );

      setEvents(publishedEvents);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load events."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function run() {
      await loadEvents();
    }

    if (active) {
      run();
    }

    return () => {
      active = false;
    };
  }, [loadEvents]);

  const filteredEvents = events.filter((event) => {
    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.venue.toLowerCase().includes(searchText);

    const matchesDate =
      !selectedDate ||
      getDateKey(event.startsAt) === selectedDate;

    return matchesSearch && matchesDate;
  });

  return (
    <PageContainer>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          Discover
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          Explore Events
        </h1>

        <p className="mt-2 text-muted">
          Discover upcoming events and find something interesting to attend.
        </p>
      </div>

      <div className="mb-8 grid gap-4 rounded-2xl border border-border bg-surface p-5 shadow-xs sm:grid-cols-2">
        <div>
          <label
            htmlFor="event-search"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Search events
          </label>

          <input
            id="event-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or venue..."
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label
            htmlFor="event-date"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Filter by date
          </label>

          <input
            id="event-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading events..." />
      ) : error ? (
        <ErrorState
          message={error}
          onRetry={loadEvents}
        />
      ) : events.length === 0 ? (
        <EmptyState
          title="No events available"
          message="There are currently no published events. Please check back later."
        />
      ) : filteredEvents.length === 0 ? (
        <EmptyState
          title="No matching events"
          message="Try changing your search or selecting a different date."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
