"use client";

import Link from "next/link";
import {
  CheckCircle2Icon,
  ClockIcon,
  ChevronRightIcon,
} from "@/components/dashboard/icons/AdminIcons";
import type { TeamTaskItem } from "@/types/dashboard-admin";

interface TeamTasksSectionProps {
  tasks: TeamTaskItem[];
}

export function TeamTasksSection({ tasks }: TeamTasksSectionProps) {
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const reviewCount = tasks.filter((t) => t.status === "Review").length;

  const getPriorityBadge = (priority: TeamTaskItem["priority"]) => {
    switch (priority) {
      case "High":
        return (
          <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
            High Priority
          </span>
        );
      case "Medium":
        return (
          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
            Medium
          </span>
        );
      case "Low":
        return (
          <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
            Normal
          </span>
        );
    }
  };

  const getStatusBadge = (status: TeamTaskItem["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle2Icon size={12} />
            Done
          </span>
        );
      case "Review":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200">
            <ClockIcon size={12} />
            Review
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200">
            In Progress
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#E8E1D7] bg-[#FFFFFF] p-6 shadow-xs">
      <div>
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#E8E1D7] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-bold text-[#702832]">
                Team Tasks & Assignments
              </h2>
              <span className="rounded-full bg-[#B69252]/15 px-2.5 py-0.5 text-xs font-bold text-[#B69252]">
                {tasks.length} Tracked
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#78716C]">
              Workload distribution, milestone deliveries, and member ownership.
            </p>
          </div>

          <Link
            href="/dashboard/task-management"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#702832] transition-colors hover:text-[#B69252]"
          >
            All Tasks <ChevronRightIcon size={14} />
          </Link>
        </div>

        {/* Quick Task Stats Pills */}
        <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
          <div className="rounded-xl border border-[#E8E1D7] bg-[#F8F5EE] p-2.5">
            <p className="text-[11px] font-semibold text-[#78716C]">In Progress</p>
            <p className="font-serif text-lg font-bold text-blue-700">{pendingCount}</p>
          </div>
          <div className="rounded-xl border border-[#E8E1D7] bg-[#F8F5EE] p-2.5">
            <p className="text-[11px] font-semibold text-[#78716C]">Under Review</p>
            <p className="font-serif text-lg font-bold text-amber-700">{reviewCount}</p>
          </div>
          <div className="rounded-xl border border-[#E8E1D7] bg-[#F8F5EE] p-2.5">
            <p className="text-[11px] font-semibold text-[#78716C]">Completed</p>
            <p className="font-serif text-lg font-bold text-emerald-700">{completedCount}</p>
          </div>
        </div>

        {/* Tasks List */}
        <div className="mt-4 space-y-3">
          {tasks.map((task) => {
            const assigneeInitials = task.assignee.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);

            return (
              <div
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#E8E1D7] p-3.5 transition-all duration-150 hover:border-[#B69252] hover:bg-[#F8F5EE]/40"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#702832]/10 font-bold text-xs text-[#702832]">
                    {assigneeInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-xs text-[#292524] truncate">
                      {task.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-[#78716C]">
                      <span className="font-medium text-[#702832]">
                        {task.assignee.name}
                      </span>
                      <span>·</span>
                      <span>Due {task.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {getPriorityBadge(task.priority)}
                  {getStatusBadge(task.status)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 border-t border-[#E8E1D7] pt-3 text-right">
        <Link
          href="/dashboard/task-management"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#702832] hover:text-[#B69252]"
        >
          Assign New Task <ChevronRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
}
