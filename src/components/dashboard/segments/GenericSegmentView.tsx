"use client";

import Link from "next/link";
import {
  PlusIcon,
  SparklesIcon,
} from "@/components/dashboard/icons/AdminIcons";

interface GenericSegmentViewProps {
  segmentKey: string;
  title: string;
  path: string;
}

export function GenericSegmentView({ segmentKey, title, path }: GenericSegmentViewProps) {
  const getSegmentContent = () => {
    switch (segmentKey) {
      case "content-calendar":
        return {
          description: "Full editorial schedule and cross-platform publishing calendar.",
          cta: "Schedule Post",
          stats: [
            { label: "Scheduled This Month", val: "18 Posts" },
            { label: "Optimal Time Slots", val: "06:30 PM & 09:00 AM" },
            { label: "Top Platform", val: "Instagram (64%)" },
          ],
        };
      case "content-ideas":
        return {
          description: "Brainstorming board for festival storytelling, artisan profiles, and cultural heritage reels.",
          cta: "Add New Idea",
          stats: [
            { label: "Active Ideas", val: "14 Drafted" },
            { label: "In Review", val: "4 Topics" },
            { label: "Approved Topics", val: "8 Slated" },
          ],
        };
      case "content-organization":
        return {
          description: "Centralized media library for high-resolution festival photographs, mask archive vectors, and audio recordings.",
          cta: "Upload Media",
          stats: [
            { label: "Total Assets", val: "482 Files" },
            { label: "Storage Used", val: "12.4 GB / 50 GB" },
            { label: "Heritage Folders", val: "16 Albums" },
          ],
        };
      case "user-management":
        return {
          description: "Team member directory, role-based access control, and volunteer coordinators.",
          cta: "Invite Member",
          stats: [
            { label: "Active Members", val: "16 Staff" },
            { label: "Admins", val: "3 Users" },
            { label: "Event Coordinators", val: "13 Volunteers" },
          ],
        };
      case "notifications":
        return {
          description: "System notifications, audit events, registration milestones, and review alerts.",
          cta: "Mark All Read",
          stats: [
            { label: "Unread Alerts", val: "5 New" },
            { label: "Resolved Today", val: "12 Items" },
            { label: "Delivery Status", val: "100% Synced" },
          ],
        };
      case "settings":
        return {
          description: "Organization profile, Meta API integrations, branding options, and notification preferences.",
          cta: "Save Changes",
          stats: [
            { label: "Connected APIs", val: "Meta Graph API (Active)" },
            { label: "Timezone", val: "Asia/Kathmandu (UTC+5:45)" },
            { label: "Plan", val: "Eventra Enterprise" },
          ],
        };
      default:
        return {
          description: `Manage and coordinate ${title} for your organization.`,
          cta: "Action",
          stats: [
            { label: "Status", val: "Active" },
            { label: "Last Updated", val: "Today" },
            { label: "Permissions", val: "Admin Access" },
          ],
        };
    }
  };

  const content = getSegmentContent();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E8E1D7] bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl font-bold text-[#702832]">
              {title}
            </h1>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              Active Segment
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#78716C]">
            {content.description}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#702832] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#5C1E26] self-start sm:self-auto"
        >
          <PlusIcon size={16} />
          <span>{content.cta}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {content.stats.map((s, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#E8E1D7] bg-white p-5 shadow-xs"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
              {s.label}
            </span>
            <p className="font-serif text-xl font-bold text-[#292524] mt-2">
              {s.val}
            </p>
          </div>
        ))}
      </div>

      {/* Information Panel */}
      <div className="rounded-2xl border border-[#E8E1D7] bg-white p-8 shadow-xs text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5D7B9] text-[#702832] mb-3">
          <SparklesIcon size={24} />
        </div>
        <h3 className="font-serif text-lg font-bold text-[#702832]">
          {title} Segment Ready
        </h3>
        <p className="mt-1 text-xs text-[#78716C] max-w-md mx-auto">
          Route: <code className="rounded bg-[#F8F5EE] px-2 py-0.5 text-[#292524]">{path}</code>
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-[#702832] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5C1E26]"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
