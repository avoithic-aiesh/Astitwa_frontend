"use client";

import Link from "next/link";
import {
  CalendarDaysIcon,
  MapPinIcon,
  PlusIcon,
  TicketIcon,
  ChevronRightIcon,
} from "@/components/dashboard/icons/AdminIcons";
import type { UpcomingEventItem } from "@/types/dashboard-admin";

interface UpcomingEventsSectionProps {
  events: UpcomingEventItem[];
}

export function UpcomingEventsSection({ events }: UpcomingEventsSectionProps) {
  const getStatusBadge = (status: UpcomingEventItem["status"]) => {
    switch (status) {
      case "Upcoming":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Upcoming
          </span>
        );
      case "Ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
            Ongoing
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600">
            Completed
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-[#E8E1D7] bg-[#FFFFFF] p-6 shadow-xs">
      {/* Header with Title & Action Links */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E8E1D7] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold text-[#702832]">
              Upcoming Events
            </h2>
            <span className="rounded-full bg-[#702832]/10 px-2.5 py-0.5 text-xs font-bold text-[#702832]">
              {events.length} Active
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[#78716C]">
            Track registrations, venue schedules, and attendee capacities.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/events"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#702832] transition-colors hover:text-[#B69252]"
          >
            View All Events <ChevronRightIcon size={14} />
          </Link>
          <Link
            href="/dashboard/events/create"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#702832] px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#5C1E26]"
          >
            <PlusIcon size={14} />
            <span>Create</span>
          </Link>
        </div>
      </div>

      {/* Events List */}
      <div className="mt-5 space-y-4">
        {events.map((evt) => {
          const percent = Math.min(
            100,
            Math.round((evt.registeredCount / evt.capacity) * 100)
          );
          const isNearCapacity = percent >= 85;

          return (
            <div
              key={evt.id}
              className="group relative rounded-xl border border-[#E8E1D7] bg-[#FFFFFF] p-4 transition-all duration-200 hover:border-[#B69252] hover:bg-[#F8F5EE]/30 hover:shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="rounded-md bg-[#F8F5EE] px-2 py-0.5 text-[11px] font-semibold text-[#702832] border border-[#E8E1D7]">
                      {evt.category}
                    </span>
                    {getStatusBadge(evt.status)}
                    {evt.featured && (
                      <span className="rounded-md bg-[#B69252]/15 px-2 py-0.5 text-[11px] font-bold text-[#B69252]">
                        ★ Flagship
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/dashboard/events`}
                    className="font-serif text-base font-bold text-[#292524] transition-colors group-hover:text-[#702832]"
                  >
                    {evt.title}
                  </Link>

                  <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#78716C]">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDaysIcon size={14} className="text-[#B69252]" />
                      {evt.date} · {evt.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <MapPinIcon size={14} className="text-[#B69252]" />
                      {evt.venue}
                    </span>
                  </div>
                </div>

                {/* Capacity Counter */}
                <div className="sm:text-right shrink-0">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#292524]">
                    <TicketIcon size={14} className="text-[#702832]" />
                    <span>
                      {evt.registeredCount} / {evt.capacity}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#78716C]">
                    {evt.capacity - evt.registeredCount} spots left
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-[#78716C] mb-1">
                  <span>Registration Capacity</span>
                  <span
                    className={`font-bold ${
                      isNearCapacity ? "text-[#702832]" : "text-[#B69252]"
                    }`}
                  >
                    {percent}% filled
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8E1D7]/70">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isNearCapacity
                        ? "bg-gradient-to-r from-[#B69252] to-[#702832]"
                        : "bg-[#B69252]"
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
