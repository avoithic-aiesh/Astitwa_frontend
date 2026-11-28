"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2Icon,
  ClockIcon,
  AlertCircleIcon,
  InstagramIcon,
  FacebookIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "@/components/dashboard/icons/AdminIcons";

interface ApprovalPost {
  id: string;
  title: string;
  caption: string;
  author: string;
  submittedAt: string;
  platform: "instagram" | "facebook" | "both";
  campaign: string;
  scheduledFor: string;
  status: "pending" | "approved" | "rejected";
}

const initialPosts: ApprovalPost[] = [
  {
    id: "appr-1",
    title: "Sneak Peek: Lakhey Mask Master Craftsman Feature",
    caption:
      "Inside the sacred Patan workshop of 78-year-old master artisan Purna Chitrakar, shaping papier-mâché and brass for the upcoming Indra Jatra masked dance festivities. Preservation through practice.",
    author: "Sneha Bajracharya (Creative Lead)",
    submittedAt: "18 mins ago",
    platform: "instagram",
    campaign: "Indra Jatra 2026",
    scheduledFor: "Today, Nov 27 · 06:30 PM",
    status: "pending",
  },
  {
    id: "appr-2",
    title: "Early Bird Tickets: Heritage Architecture Walk: Ward 16",
    caption:
      "Join senior conservation architect Dr. Tuladhar through the stone-paved gallis of Chettrapati, visiting hidden 17th-century Bahals and traditional wooden carved jhyals. Limited to 200 participants.",
    author: "Aman Shrestha (Social Specialist)",
    submittedAt: "1 hour ago",
    platform: "both",
    campaign: "Walk Ward 16",
    scheduledFor: "Tomorrow, Nov 28 · 09:00 AM",
    status: "pending",
  },
  {
    id: "appr-3",
    title: "Volunteer Callout: Winter Kumari Jatra Support Team",
    caption:
      "Are you passionate about cultural stewardship? Eventra is recruiting 50 youth volunteers for crowd coordination, guest hospitality, and audio guides. Apply now before registration closes.",
    author: "Prashant Joshi (Logistics)",
    submittedAt: "3 hours ago",
    platform: "facebook",
    campaign: "Volunteer Drive",
    scheduledFor: "Sat, Nov 29 · 11:00 AM",
    status: "pending",
  },
];

export function ContentApprovalSegment() {
  const [posts, setPosts] = useState<ApprovalPost[]>(initialPosts);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAction = (id: string, newStatus: "approved" | "rejected") => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    showToast(
      newStatus === "approved"
        ? "Post approved and dispatched to publishing queue!"
        : "Post rejected and returned to author with feedback."
    );
  };

  const filteredPosts = posts.filter((p) => p.status === activeTab);
  const pendingCount = posts.filter((p) => p.status === "pending").length;

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E8E1D7] bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl font-bold text-[#702832]">
              Content Approval Queue
            </h1>
            {pendingCount > 0 && (
              <span className="rounded-full bg-[#D3544D] px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
                {pendingCount} Pending
              </span>
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#78716C]">
            Review, verify cultural accuracy, and approve social media posts before scheduled automated publishing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl border border-[#E8E1D7] bg-[#F8F5EE] p-1 text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "pending"
                ? "bg-[#702832] text-white shadow-xs"
                : "text-[#78716C] hover:text-[#292524]"
            }`}
          >
            Pending ({posts.filter((p) => p.status === "pending").length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("approved")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "approved"
                ? "bg-[#702832] text-white shadow-xs"
                : "text-[#78716C] hover:text-[#292524]"
            }`}
          >
            Approved ({posts.filter((p) => p.status === "approved").length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("rejected")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "rejected"
                ? "bg-[#702832] text-white shadow-xs"
                : "text-[#78716C] hover:text-[#292524]"
            }`}
          >
            Rejected ({posts.filter((p) => p.status === "rejected").length})
          </button>
        </div>
      </div>

      {/* Posts Stream */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-[#E8E1D7] bg-white p-12 text-center shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2Icon size={24} />
          </div>
          <h3 className="mt-3 font-serif text-lg font-bold text-[#292524]">
            No posts in this queue
          </h3>
          <p className="mt-1 text-xs text-[#78716C]">
            All submitted content in this status has been processed.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#702832] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#5C1E26]"
          >
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-[#E8E1D7] bg-white p-6 shadow-xs transition-all hover:border-[#B69252]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                {/* Post details */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[#F8F5EE] px-2.5 py-0.5 text-xs font-bold text-[#702832] border border-[#E8E1D7]">
                      {post.campaign}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#B69252]/15 px-2 py-0.5 text-xs font-semibold text-[#B69252]">
                      {post.platform === "both" ? (
                        <>Instagram & Facebook</>
                      ) : post.platform === "instagram" ? (
                        <><InstagramIcon size={13} /> Instagram</>
                      ) : (
                        <><FacebookIcon size={13} /> Facebook</>
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#78716C]">
                      <ClockIcon size={13} /> Scheduled for {post.scheduledFor}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-[#292524]">
                    {post.title}
                  </h2>

                  {/* Caption preview card */}
                  <div className="rounded-xl border border-[#E8E1D7]/80 bg-[#F8F5EE]/60 p-4 text-xs sm:text-sm text-[#292524] leading-relaxed">
                    <p className="whitespace-pre-line">{post.caption}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-[#78716C] border-t border-[#E8E1D7]/60 pt-2">
                      <span className="font-semibold text-[#702832]">Submitted by:</span> {post.author}
                      <span>·</span>
                      <span>{post.submittedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {post.status === "pending" && (
                  <div className="flex lg:flex-col gap-2 shrink-0 self-end lg:self-start">
                    <button
                      type="button"
                      onClick={() => handleAction(post.id, "approved")}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-emerald-800 active:scale-98"
                    >
                      <CheckCircle2Icon size={16} />
                      <span>Approve & Schedule</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(post.id, "rejected")}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-300 bg-white px-4 py-2.5 text-xs font-semibold text-rose-700 shadow-xs transition-all hover:bg-rose-50 active:scale-98"
                    >
                      <AlertCircleIcon size={16} />
                      <span>Request Changes</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
