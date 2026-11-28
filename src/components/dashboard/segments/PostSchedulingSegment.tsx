"use client";

import { useState } from "react";
import {
  CalendarDaysIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  InstagramIcon,
  FacebookIcon,
  PlusIcon,
  RefreshCwIcon,
} from "@/components/dashboard/icons/AdminIcons";
import { mockCalendarPosts } from "@/data/mockDashboardData";
import type { CalendarPostItem } from "@/types/dashboard-admin";

export function PostSchedulingSegment() {
  const [posts, setPosts] = useState<CalendarPostItem[]>(mockCalendarPosts);
  const [isRetrying, setIsRetrying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRetryFailedPost = (id: string) => {
    setIsRetrying(true);
    setTimeout(() => {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "Published" } : p))
      );
      setIsRetrying(false);
      showToast("Token re-authenticated & post published to Instagram!");
    }, 1200);
  };

  const failedPost = posts.find((p) => p.status === "Failed");

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
              Post Scheduling & Dispatch
            </h1>
            <span className="rounded-full bg-[#B69252]/15 px-2.5 py-0.5 text-xs font-bold text-[#B69252]">
              {posts.length} in Queue
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#78716C]">
            Manage multi-channel social media publishing pipelines, automated distribution timers, and failed post retries.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Post composer opened")}
          className="inline-flex items-center gap-2 rounded-xl bg-[#702832] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#5C1E26] active:scale-98 self-start sm:self-auto"
        >
          <PlusIcon size={16} />
          <span>Create Post</span>
        </button>
      </div>

      {/* Failed Post Alert Banner */}
      {failedPost && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-rose-300 bg-rose-50/70 p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangleIcon size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-bold text-rose-900">
                  Scheduled Post Failed to Publish
                </h3>
                <span className="rounded-full bg-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-800">
                  Token Timeout
                </span>
              </div>
              <p className="mt-1 text-xs text-rose-800">
                &ldquo;{failedPost.title}&rdquo; failed due to Meta access token refresh timeout 2 hours ago.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={isRetrying}
            onClick={() => handleRetryFailedPost(failedPost.id)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-800 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-rose-900 active:scale-98 disabled:opacity-50 shrink-0"
          >
            <RefreshCwIcon size={14} className={isRetrying ? "animate-spin" : ""} />
            <span>{isRetrying ? "Retrying Dispatch..." : "Retry Publish Now"}</span>
          </button>
        </div>
      )}

      {/* Scheduled Queue Cards */}
      <div className="rounded-2xl border border-[#E8E1D7] bg-white p-6 shadow-xs">
        <h2 className="font-serif text-lg font-bold text-[#702832] mb-4">
          Upcoming Scheduled Content Queue
        </h2>

        <div className="divide-y divide-[#E8E1D7]">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8F5EE] text-[#702832] border border-[#E8E1D7]">
                  {post.platform === "instagram" ? (
                    <InstagramIcon size={18} />
                  ) : post.platform === "facebook" ? (
                    <FacebookIcon size={18} />
                  ) : (
                    <span className="font-bold text-[10px]">META</span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#F8F5EE] px-2 py-0.5 text-[10px] font-bold text-[#702832]">
                      {post.campaign}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        post.status === "Published"
                          ? "bg-emerald-50 text-emerald-700"
                          : post.status === "Failed"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <p className="mt-1 font-serif text-sm font-bold text-[#292524] truncate">
                    {post.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#78716C] self-end sm:self-center shrink-0">
                <span className="inline-flex items-center gap-1 font-medium">
                  <CalendarDaysIcon size={14} className="text-[#B69252]" />
                  {post.date} · {post.time}
                </span>

                {post.status === "Failed" && (
                  <button
                    type="button"
                    onClick={() => handleRetryFailedPost(post.id)}
                    className="rounded-lg bg-rose-700 px-3 py-1 text-xs font-bold text-white hover:bg-rose-800"
                  >
                    Retry
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
