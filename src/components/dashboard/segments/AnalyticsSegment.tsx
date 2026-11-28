"use client";

import { useState } from "react";
import { CheckCircle2Icon } from "@/components/dashboard/icons/AdminIcons";
import { AnalyticsCharts } from "@/components/dashboard/admin/AnalyticsCharts";
import { getAnalyticsData } from "@/data/mockDashboardData";
import type { DateRange } from "@/types/dashboard-admin";

export function AnalyticsSegment() {
  const [selectedRange, setSelectedRange] = useState<DateRange>("30d");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const chartData = getAnalyticsData(selectedRange);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

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
              Analytics & Performance Intelligence
            </h1>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              Live Metrics
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#78716C]">
            Detailed audience reach, cultural content interactions, event registration velocity, and attendee turnouts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Exporting Analytics PDF Report...")}
          className="rounded-xl border border-[#B69252] bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#702832] shadow-xs hover:bg-[#B69252]/10 self-start sm:self-auto"
        >
          Export Report
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E8E1D7] bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
            Total Impressions
          </span>
          <p className="font-serif text-2xl font-bold text-[#292524] mt-2">
            182,400
          </p>
          <span className="text-[11px] font-bold text-emerald-700">+19.2% vs last cycle</span>
        </div>

        <div className="rounded-2xl border border-[#E8E1D7] bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
            Avg Engagement Rate
          </span>
          <p className="font-serif text-2xl font-bold text-[#702832] mt-2">
            6.84%
          </p>
          <span className="text-[11px] font-bold text-emerald-700">Top quartile for cultural SaaS</span>
        </div>

        <div className="rounded-2xl border border-[#E8E1D7] bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
            Event Signups
          </span>
          <p className="font-serif text-2xl font-bold text-[#B69252] mt-2">
            1,480
          </p>
          <span className="text-[11px] font-bold text-emerald-700">+18.4% month-over-month</span>
        </div>

        <div className="rounded-2xl border border-[#E8E1D7] bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
            Confirmed Turnout
          </span>
          <p className="font-serif text-2xl font-bold text-emerald-700 mt-2">
            91.2%
          </p>
          <span className="text-[11px] text-[#78716C]">Across Basantapur & Patan</span>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <AnalyticsCharts
        data={chartData}
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
      />
    </div>
  );
}
