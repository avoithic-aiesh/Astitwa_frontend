"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDaysIcon,
  MapPinIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
} from "@/components/dashboard/icons/AdminIcons";
import { mockUpcomingEvents } from "@/data/mockDashboardData";
import type { UpcomingEventItem } from "@/types/dashboard-admin";

interface EventManagementSegmentProps {
  subpath?: string;
}

export function EventManagementSegment({ subpath = "" }: EventManagementSegmentProps) {
  const [events, setEvents] = useState<UpcomingEventItem[]>(mockUpcomingEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state for Create Event
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Heritage Festival");
  const [newDate, setNewDate] = useState("");
  const [newVenue, setNewVenue] = useState("");
  const [newCapacity, setNewCapacity] = useState("200");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEvt: UpcomingEventItem = {
      id: `evt-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      date: newDate || "Dec 30, 2026",
      time: "10:00 AM - 4:00 PM",
      venue: newVenue || "Kathmandu Valley Cultural Hall",
      status: "Upcoming",
      registeredCount: 0,
      capacity: parseInt(newCapacity) || 200,
      featured: false,
    };

    setEvents((prev) => [newEvt, ...prev]);
    showToast(`Event "${newTitle}" created successfully!`);
    setNewTitle("");
    setNewVenue("");
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTab = subpath.includes("create")
    ? "create"
    : subpath.includes("registrations")
    ? "registrations"
    : subpath.includes("results")
    ? "results"
    : "all";

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-[#702832] px-4 py-3 text-sm font-semibold text-white shadow-xl animate-in slide-in-from-bottom-3">
          <CheckCircle2Icon size={18} className="text-[#F5D7B9]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Segment Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E8E1D7] bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl font-bold text-[#702832]">
              Event Management
            </h1>
            <span className="rounded-full bg-[#B69252]/15 px-2.5 py-0.5 text-xs font-bold text-[#B69252]">
              {events.length} Festivals Slated
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#78716C]">
            Create and schedule cultural events, coordinate ticketing, monitor attendee registrations, and analyze turnouts.
          </p>
        </div>

        {/* Sub-navigation links */}
        <div className="flex flex-wrap rounded-xl border border-[#E8E1D7] bg-[#F8F5EE] p-1 text-xs font-semibold self-start sm:self-auto">
          <Link
            href="/dashboard/events"
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "all"
                ? "bg-[#702832] text-white shadow-xs"
                : "text-[#78716C] hover:text-[#292524]"
            }`}
          >
            All Events
          </Link>
          <Link
            href="/dashboard/events/create"
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "create"
                ? "bg-[#702832] text-white shadow-xs"
                : "text-[#78716C] hover:text-[#292524]"
            }`}
          >
            Create Event
          </Link>
          <Link
            href="/dashboard/events/registrations"
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "registrations"
                ? "bg-[#702832] text-white shadow-xs"
                : "text-[#78716C] hover:text-[#292524]"
            }`}
          >
            Registrations
          </Link>
          <Link
            href="/dashboard/events/results"
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "results"
                ? "bg-[#702832] text-white shadow-xs"
                : "text-[#78716C] hover:text-[#292524]"
            }`}
          >
            Event Results
          </Link>
        </div>
      </div>

      {/* VIEW 1: Create Event Form */}
      {activeTab === "create" && (
        <div className="rounded-2xl border border-[#E8E1D7] bg-white p-6 md:p-8 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#702832] mb-1">
            Create a New Cultural Event
          </h2>
          <p className="text-xs text-[#78716C] mb-6">
            Fill in the details to publish the event to community schedules and open participant registrations.
          </p>

          <form onSubmit={handleCreateSubmit} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
                Event Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Indra Jatra Cultural Gala & Mask Dance"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded-xl border border-[#E8E1D7] px-4 py-2.5 text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#B69252]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E1D7] px-4 py-2.5 text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#B69252]"
                >
                  <option value="Heritage Festival">Heritage Festival</option>
                  <option value="Guided Tour">Guided Tour / Heritage Walk</option>
                  <option value="Music & Art">Music & Art Workshop</option>
                  <option value="Community Meeting">Community Volunteer Drive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
                  Capacity (Attendees)
                </label>
                <input
                  type="number"
                  value={newCapacity}
                  onChange={(e) => setNewCapacity(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E1D7] px-4 py-2.5 text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#B69252]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
                  Event Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dec 25, 2026"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E1D7] px-4 py-2.5 text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#B69252]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
                  Venue / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Basantapur Durbar Square"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E1D7] px-4 py-2.5 text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#B69252]"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#702832] px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#5C1E26]"
              >
                Publish Event
              </button>
              <Link
                href="/dashboard/events"
                className="rounded-xl border border-[#E8E1D7] px-4 py-2.5 text-sm font-semibold text-[#78716C] hover:bg-[#F8F5EE]"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      )}

      {/* VIEW 2: Registrations Roster */}
      {activeTab === "registrations" && (
        <div className="rounded-2xl border border-[#E8E1D7] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-bold text-[#702832]">
              Participant Registrations Roster
            </h2>
            <button
              type="button"
              onClick={() => showToast("Exporting Attendee CSV...")}
              className="rounded-lg border border-[#E8E1D7] bg-[#F8F5EE] px-3 py-1.5 text-xs font-semibold text-[#702832] hover:bg-[#F5D7B9]"
            >
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#292524]">
              <thead className="bg-[#F8F5EE] text-[#78716C] uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="p-3">Attendee</th>
                  <th className="p-3">Registered Event</th>
                  <th className="p-3">Ticket Type</th>
                  <th className="p-3">Registration Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E1D7]">
                {[
                  { name: "Bikash Shrestha", event: "Indra Jatra Gala", type: "Standard Entry", date: "Nov 27, 2026", status: "Confirmed" },
                  { name: "Suman Joshi", event: "Heritage Architecture Walk", type: "VIP Guided", date: "Nov 26, 2026", status: "Confirmed" },
                  { name: "Pratima Shakya", event: "Dhime Drumming Workshop", type: "Early Bird", date: "Nov 25, 2026", status: "Confirmed" },
                  { name: "Ramesh Maharjan", event: "Indra Jatra Gala", type: "Standard Entry", date: "Nov 24, 2026", status: "Waitlist" },
                  { name: "Anjali Thapa", event: "Kumari Jatra Orientation", type: "Volunteer RSVP", date: "Nov 23, 2026", status: "Confirmed" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F5EE]/40">
                    <td className="p-3 font-bold text-[#702832]">{row.name}</td>
                    <td className="p-3">{row.event}</td>
                    <td className="p-3 text-[#78716C]">{row.type}</td>
                    <td className="p-3">{row.date}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        row.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: Event Results & Reports */}
      {activeTab === "results" && (
        <div className="rounded-2xl border border-[#E8E1D7] bg-white p-6 shadow-xs space-y-6">
          <h2 className="font-serif text-lg font-bold text-[#702832]">
            Post-Event Reports & Attendance Analytics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#E8E1D7] bg-[#F8F5EE] p-4 text-center">
              <p className="text-xs font-semibold text-[#78716C]">Average Turnout</p>
              <p className="font-serif text-3xl font-bold text-[#702832] mt-1">91.4%</p>
              <p className="text-[11px] text-emerald-700 font-bold mt-1">+3.2% vs target</p>
            </div>
            <div className="rounded-xl border border-[#E8E1D7] bg-[#F8F5EE] p-4 text-center">
              <p className="text-xs font-semibold text-[#78716C]">Attendee Satisfaction</p>
              <p className="font-serif text-3xl font-bold text-[#B69252] mt-1">4.9 / 5.0</p>
              <p className="text-[11px] text-[#78716C] mt-1">Based on 640 feedback surveys</p>
            </div>
            <div className="rounded-xl border border-[#E8E1D7] bg-[#F8F5EE] p-4 text-center">
              <p className="text-xs font-semibold text-[#78716C]">Total Cultural Attendees</p>
              <p className="font-serif text-3xl font-bold text-[#292524] mt-1">2,480</p>
              <p className="text-[11px] text-[#78716C] mt-1">Across 18 completed events</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: All Events List (Default) */}
      {activeTab === "all" && (
        <>
          {/* Search bar */}
          <div className="rounded-xl border border-[#E8E1D7] bg-white p-4 shadow-xs">
            <input
              type="text"
              placeholder="Search by event title, category, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E8E1D7] bg-[#F8F5EE] px-4 py-2.5 text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#B69252]"
            />
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredEvents.map((evt) => {
              const percent = Math.min(
                100,
                Math.round((evt.registeredCount / evt.capacity) * 100)
              );
              return (
                <div
                  key={evt.id}
                  className="rounded-2xl border border-[#E8E1D7] bg-white p-6 shadow-xs transition-all hover:border-[#B69252]"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="rounded-md bg-[#F8F5EE] px-2.5 py-0.5 text-xs font-bold text-[#702832] border border-[#E8E1D7]">
                      {evt.category}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#292524]">
                    {evt.title}
                  </h3>

                  <div className="mt-3 space-y-1.5 text-xs text-[#78716C]">
                    <p className="flex items-center gap-1.5">
                      <CalendarDaysIcon size={14} className="text-[#B69252]" />
                      {evt.date} · {evt.time}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPinIcon size={14} className="text-[#B69252]" />
                      {evt.venue}
                    </p>
                  </div>

                  {/* Capacity Meter */}
                  <div className="mt-4 border-t border-[#E8E1D7] pt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#78716C]">Registered</span>
                      <span className="font-bold text-[#702832]">
                        {evt.registeredCount} / {evt.capacity} ({percent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8E1D7]">
                      <div
                        className="h-full bg-[#702832] rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Link
                      href="/dashboard/events/registrations"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#702832] hover:text-[#B69252]"
                    >
                      View Attendee List <ChevronRightIcon size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
