"use client";

import { useState } from "react";
import {
  TrendingUpIcon,
  CheckCircle2Icon,
  SendIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@/components/dashboard/icons/AdminIcons";
import type { RecentActivityItem } from "@/types/dashboard-admin";

interface RecentActivityFeedProps {
  activities: RecentActivityItem[];
}

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  const [filterType, setFilterType] = useState<string>("all");

  const filteredActivities = activities.filter((act) => {
    if (filterType === "all") return true;
    return act.type === filterType;
  });

  const getActivityIcon = (type: RecentActivityItem["type"]) => {
    switch (type) {
      case "registration":
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            <TrendingUpIcon size={16} />
          </div>
        );
      case "approval":
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            <ClockIcon size={16} />
          </div>
        );
      case "social":
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
            <SendIcon size={15} />
          </div>
        );
      case "task":
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2Icon size={16} />
          </div>
        );
      case "event":
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#702832]/10 text-[#702832] border border-[#702832]/20">
            <CalendarDaysIcon size={16} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-[#E8E1D7] bg-[#FFFFFF] p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E8E1D7] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold text-[#702832]">
              Live Organization Activity
            </h2>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <p className="mt-0.5 text-xs text-[#78716C]">
            Chronological audit log of registrations, social publishing, and administrative edits.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E8E1D7] bg-[#F8F5EE] p-0.5 text-xs font-semibold">
          {[
            { id: "all", label: "All Activity" },
            { id: "registration", label: "Registrations" },
            { id: "social", label: "Social" },
            { id: "approval", label: "Approvals" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                filterType === tab.id
                  ? "bg-[#702832] text-white shadow-xs"
                  : "text-[#78716C] hover:text-[#292524]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="mt-5 divide-y divide-[#E8E1D7]/70">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="flex items-start justify-between gap-4 py-3.5 transition-colors hover:bg-[#F8F5EE]/40 px-2 rounded-xl"
          >
            <div className="flex items-start gap-3 min-w-0">
              {getActivityIcon(act.type)}
              <div className="min-w-0">
                <p className="text-xs text-[#292524] leading-relaxed">
                  <span className="font-bold text-[#702832]">{act.user.name}</span>{" "}
                  <span className="text-[#78716C]">{act.action}</span>{" "}
                  <span className="font-semibold text-[#292524]">{act.target}</span>
                </p>
                <span className="mt-1 inline-block text-[11px] font-medium text-[#78716C]">
                  {act.timestamp}
                </span>
              </div>
            </div>

            <span className="rounded-full bg-[#F8F5EE] px-2.5 py-0.5 text-[10px] font-bold text-[#78716C] border border-[#E8E1D7] shrink-0">
              Logged
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
