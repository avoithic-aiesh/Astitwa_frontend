"use client";

import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  AlertTriangleIcon,
  ClockIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
} from "@/components/dashboard/icons/AdminIcons";
import type {
  ConnectedSocialAccount,
  SocialPublishingStats,
} from "@/types/dashboard-admin";

interface SocialMediaOverviewProps {
  accounts: ConnectedSocialAccount[];
  stats: SocialPublishingStats;
}

export function SocialMediaOverview({
  accounts,
  stats,
}: SocialMediaOverviewProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-[#E8E1D7] bg-[#FFFFFF] p-6 shadow-xs">
      {/* Header with Title & Manage Action */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E8E1D7] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold text-[#702832]">
              Social Media Channels
            </h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
              Live Synced
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[#78716C]">
            Connected accounts, cross-publishing pipeline, and engagement reach.
          </p>
        </div>

        <Link
          href="/dashboard/settings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#702832] transition-colors hover:text-[#B69252]"
        >
          Manage Accounts <ChevronRightIcon size={14} />
        </Link>
      </div>

      {/* Connected Channels Cards */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {accounts.map((acc) => {
          const isFb = acc.platform === "facebook";
          return (
            <div
              key={acc.platform}
              className="relative flex items-center justify-between rounded-xl border border-[#E8E1D7] bg-[#F8F5EE]/40 p-4 transition-all hover:border-[#B69252]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-xs ${
                    isFb
                      ? "bg-[#1877F2]"
                      : "bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#C13584]"
                  }`}
                >
                  {isFb ? <FacebookIcon size={20} /> : <InstagramIcon size={20} />}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-[#292524]">
                    {acc.accountName}
                  </p>
                  <p className="text-[11px] font-medium text-[#78716C]">
                    {acc.handle}
                  </p>
                  <p className="text-[11px] font-semibold text-[#B69252]">
                    {acc.followers}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Active
                </span>
                <p className="mt-1 text-[10px] text-[#78716C]">{acc.lastSynced}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Publishing Pipeline Breakdown */}
      <div className="mt-5 rounded-xl border border-[#E8E1D7] bg-[#FFFFFF] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
            Content Pipeline
          </span>
          <span className="text-[11px] text-[#78716C]">
            Total: {stats.published + stats.scheduled + stats.drafts + stats.pendingApproval + stats.failed} posts
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 text-center">
          {/* Published */}
          <Link
            href="/dashboard/post-scheduling"
            className="rounded-lg bg-[#F8F5EE] p-3 transition-colors hover:bg-[#F5D7B9]/40"
          >
            <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
              <CheckCircle2Icon size={14} />
              <span className="text-xs font-bold">Published</span>
            </div>
            <p className="font-serif text-xl font-bold text-[#292524]">
              {stats.published}
            </p>
          </Link>

          {/* Scheduled */}
          <Link
            href="/dashboard/post-scheduling"
            className="rounded-lg bg-[#F8F5EE] p-3 transition-colors hover:bg-[#F5D7B9]/40"
          >
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <ClockIcon size={14} />
              <span className="text-xs font-bold">Scheduled</span>
            </div>
            <p className="font-serif text-xl font-bold text-[#292524]">
              {stats.scheduled}
            </p>
          </Link>

          {/* Drafts */}
          <Link
            href="/dashboard/content-ideas"
            className="rounded-lg bg-[#F8F5EE] p-3 transition-colors hover:bg-[#F5D7B9]/40"
          >
            <div className="flex items-center justify-center gap-1 text-[#78716C] mb-1">
              <span className="text-xs font-bold">Drafts</span>
            </div>
            <p className="font-serif text-xl font-bold text-[#292524]">
              {stats.drafts}
            </p>
          </Link>

          {/* Pending Approval */}
          <Link
            href="/dashboard/content-approval"
            className="rounded-lg bg-amber-50/70 border border-amber-200/60 p-3 transition-colors hover:bg-amber-100/70"
          >
            <div className="flex items-center justify-center gap-1 text-amber-700 mb-1">
              <span className="text-xs font-bold">In Review</span>
            </div>
            <p className="font-serif text-xl font-bold text-amber-900">
              {stats.pendingApproval}
            </p>
          </Link>

          {/* Failed */}
          <Link
            href="/dashboard/post-scheduling"
            className="rounded-lg bg-rose-50/80 border border-rose-200/70 p-3 transition-colors hover:bg-rose-100/70"
          >
            <div className="flex items-center justify-center gap-1 text-rose-700 mb-1">
              <AlertTriangleIcon size={14} />
              <span className="text-xs font-bold">Failed</span>
            </div>
            <p className="font-serif text-xl font-bold text-rose-900">
              {stats.failed}
            </p>
          </Link>
        </div>
      </div>

      {/* Meta API Demo Notice */}
      <div className="mt-4 flex items-center justify-between rounded-lg bg-[#F8F5EE] px-3.5 py-2 text-[11px] text-[#78716C] border border-[#E8E1D7]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#B69252]" />
          <span>Meta Graph API Demonstration State (Connected Sandbox)</span>
        </div>
        <Link
          href="/dashboard/settings"
          className="font-semibold text-[#702832] hover:underline"
        >
          Configure Webhooks
        </Link>
      </div>
    </div>
  );
}
