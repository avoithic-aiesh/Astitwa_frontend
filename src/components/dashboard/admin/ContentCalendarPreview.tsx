"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDaysIcon,
  FacebookIcon,
  InstagramIcon,
  ChevronRightIcon,
  ClockIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
} from "@/components/dashboard/icons/AdminIcons";
import type { CalendarPostItem, ContentStatus } from "@/types/dashboard-admin";

interface ContentCalendarPreviewProps {
  posts: CalendarPostItem[];
}

export function ContentCalendarPreview({ posts }: ContentCalendarPreviewProps) {
  const [filterPlatform, setFilterPlatform] = useState<string>("all");

  const filteredPosts = posts.filter((p) => {
    if (filterPlatform === "all") return true;
    return p.platform === filterPlatform || p.platform === "both";
  });

  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case "Scheduled":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200">
            <ClockIcon size={12} />
            Scheduled
          </span>
        );
      case "Pending Approval":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
            In Review
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600">
            Draft
          </span>
        );
      case "Published":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle2Icon size={12} />
            Published
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700 border border-rose-200">
            <AlertTriangleIcon size={12} />
            Failed
          </span>
        );
    }
  };

  const getPlatformIcon = (platform: CalendarPostItem["platform"]) => {
    if (platform === "both") {
      return (
        <div className="flex items-center -space-x-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-white ring-2 ring-white">
            <FacebookIcon size={11} />
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#FD1D1D] to-[#C13584] text-white ring-2 ring-white">
            <InstagramIcon size={11} />
          </span>
        </div>
      );
    }
    if (platform === "facebook") {
      return (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-white">
          <FacebookIcon size={12} />
        </span>
      );
    }
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#FD1D1D] to-[#C13584] text-white">
        <InstagramIcon size={12} />
      </span>
    );
  };

  return (
    <div className="flex flex-col rounded-2xl border border-[#E8E1D7] bg-[#FFFFFF] p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E8E1D7] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold text-[#702832]">
              Content Calendar Preview
            </h2>
            <span className="rounded-full bg-[#B69252]/15 px-2.5 py-0.5 text-xs font-bold text-[#B69252]">
              Upcoming Week
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[#78716C]">
            Scheduled posts queue across Instagram & Facebook channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Platform Filter */}
          <div className="flex rounded-lg border border-[#E8E1D7] bg-[#F8F5EE] p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setFilterPlatform("all")}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                filterPlatform === "all"
                  ? "bg-[#702832] text-white shadow-xs"
                  : "text-[#78716C] hover:text-[#292524]"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterPlatform("instagram")}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                filterPlatform === "instagram"
                  ? "bg-[#702832] text-white shadow-xs"
                  : "text-[#78716C] hover:text-[#292524]"
              }`}
            >
              Instagram
            </button>
            <button
              type="button"
              onClick={() => setFilterPlatform("facebook")}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                filterPlatform === "facebook"
                  ? "bg-[#702832] text-white shadow-xs"
                  : "text-[#78716C] hover:text-[#292524]"
              }`}
            >
              Facebook
            </button>
          </div>

          <Link
            href="/dashboard/content-calendar"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#702832] transition-colors hover:text-[#B69252]"
          >
            View Calendar <ChevronRightIcon size={14} />
          </Link>
        </div>
      </div>

      {/* Grid of Scheduled Content */}
      <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col justify-between rounded-xl border border-[#E8E1D7] bg-[#FFFFFF] p-4 transition-all duration-200 hover:border-[#B69252] hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(post.platform)}
                  <span className="text-[11px] font-semibold text-[#78716C]">
                    {post.campaign || "General"}
                  </span>
                </div>
                {getStatusBadge(post.status)}
              </div>

              <Link
                href="/dashboard/post-scheduling"
                className="font-serif text-sm font-bold text-[#292524] line-clamp-2 hover:text-[#702832]"
              >
                {post.title}
              </Link>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#E8E1D7]/70 pt-2.5 text-xs text-[#78716C]">
              <span className="inline-flex items-center gap-1">
                <CalendarDaysIcon size={13} className="text-[#B69252]" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1 font-medium">
                <ClockIcon size={13} className="text-[#78716C]" />
                {post.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
