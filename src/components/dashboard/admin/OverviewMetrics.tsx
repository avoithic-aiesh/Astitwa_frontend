"use client";

import Link from "next/link";
import {
  CalendarDaysIcon,
  UsersIcon,
  SendIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  TrendingUpIcon,
} from "@/components/dashboard/icons/AdminIcons";
import type { MetricCardData } from "@/types/dashboard-admin";

interface OverviewMetricsProps {
  metrics: MetricCardData[];
}

export function OverviewMetrics({ metrics }: OverviewMetricsProps) {
  const getIcon = (iconName: MetricCardData["iconName"]) => {
    switch (iconName) {
      case "events":
        return <CalendarDaysIcon size={22} className="text-[#702832]" />;
      case "registrations":
        return <TrendingUpIcon size={22} className="text-[#B69252]" />;
      case "posts":
        return <SendIcon size={20} className="text-[#702832]" />;
      case "team":
        return <UsersIcon size={22} className="text-[#B69252]" />;
    }
  };

  const getContainerBg = (iconName: MetricCardData["iconName"]) => {
    switch (iconName) {
      case "events":
        return "bg-[#702832]/10 border-[#702832]/20";
      case "registrations":
        return "bg-[#B69252]/15 border-[#B69252]/30";
      case "posts":
        return "bg-[#F5D7B9] border-[#B69252]/30";
      case "team":
        return "bg-[#F8F5EE] border-[#E8E1D7]";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E8E1D7] bg-[#FFFFFF] p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B69252] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B69252]"
        >
          {/* Subtle decorative background watermarks */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-[#B69252]/5 blur-xl transition-all group-hover:scale-125"
          />

          {/* Top row: Label & Icon */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                {item.title}
              </p>
              {item.badge && (
                <span className="mt-1 inline-block rounded-md bg-[#F8F5EE] px-2 py-0.5 text-[10px] font-medium text-[#702832] border border-[#E8E1D7]">
                  {item.badge}
                </span>
              )}
            </div>

            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105 ${getContainerBg(
                item.iconName
              )}`}
            >
              {getIcon(item.iconName)}
            </div>
          </div>

          {/* Middle: Big Stat & Growth trend */}
          <div className="mt-4 flex items-baseline justify-between gap-2">
            <span className="font-serif text-3xl font-extrabold tracking-tight text-[#292524] md:text-4xl">
              {item.value}
            </span>

            <div
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                item.isPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {item.isPositive ? (
                <ArrowUpRightIcon size={14} />
              ) : (
                <ArrowDownRightIcon size={14} />
              )}
              <span>{item.change}</span>
            </div>
          </div>

          {/* Bottom supporting info */}
          <div className="mt-4 border-t border-[#E8E1D7]/70 pt-3 text-xs text-[#78716C]">
            <p className="font-medium text-[#292524]">{item.subInfo}</p>
            {item.secondaryInfo && (
              <p className="mt-0.5 text-[11px] text-[#78716C] truncate">
                {item.secondaryInfo}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
