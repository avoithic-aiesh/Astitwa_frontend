"use client";

import Link from "next/link";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  ClockIcon,
  ChevronRightIcon,
  CheckCircle2Icon,
} from "@/components/dashboard/icons/AdminIcons";
import type { PendingActionItem } from "@/types/dashboard-admin";

interface PendingActionsSectionProps {
  actions: PendingActionItem[];
}

export function PendingActionsSection({ actions }: PendingActionsSectionProps) {
  const getActionIcon = (type: PendingActionItem["type"]) => {
    switch (type) {
      case "approval":
        return <CheckCircle2Icon size={18} className="text-amber-700" />;
      case "overdue":
        return <AlertCircleIcon size={18} className="text-rose-700" />;
      case "reminder":
        return <ClockIcon size={18} className="text-[#B69252]" />;
      case "failed":
        return <AlertTriangleIcon size={18} className="text-rose-700" />;
    }
  };

  const getContainerStyles = (severity: PendingActionItem["severity"]) => {
    switch (severity) {
      case "high":
        return "border-rose-200/90 bg-rose-50/40 hover:bg-rose-50/70";
      case "medium":
        return "border-amber-200/80 bg-amber-50/30 hover:bg-amber-50/60";
      case "low":
      default:
        return "border-[#E8E1D7] bg-[#F8F5EE]/50 hover:bg-[#F8F5EE]";
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-rose-200 bg-gradient-to-b from-[#FFFDFD] to-[#FFFFFF] p-6 shadow-xs">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E1D7] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
              <AlertCircleIcon size={18} />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#702832]">
                Pending Actions Required
              </h2>
              <p className="text-xs text-[#78716C]">
                {actions.length} urgent tasks and reviews requiring administrator resolution.
              </p>
            </div>
          </div>

          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
            High Priority
          </span>
        </div>

        {/* Action Items List */}
        <div className="mt-4 space-y-3">
          {actions.map((act) => (
            <div
              key={act.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4 transition-all duration-200 ${getContainerStyles(
                act.severity
              )}`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 shrink-0">{getActionIcon(act.type)}</div>
                <div className="min-w-0">
                  <p className="font-serif text-sm font-bold text-[#292524]">
                    {act.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#78716C] line-clamp-1">
                    {act.description}
                  </p>
                  <span className="mt-1 inline-block text-[11px] font-semibold text-rose-700">
                    {act.dueText}
                  </span>
                </div>
              </div>

              <Link
                href={act.actionHref}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#702832] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#5C1E26] active:scale-98"
              >
                <span>{act.actionText}</span>
                <ChevronRightIcon size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-[#E8E1D7] pt-3 text-right">
        <Link
          href="/dashboard/content-approval"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#702832] hover:text-[#B69252]"
        >
          View Full Approval Queue (3) <ChevronRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
}
