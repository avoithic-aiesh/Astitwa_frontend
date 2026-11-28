"use client";

import { useState } from "react";
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

export function TeamTasksSection({ tasks: initialTasks }: TeamTasksSectionProps) {
  const [tasks, setTasks] = useState<TeamTaskItem[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState<"All" | "Pending" | "Review" | "Completed">("All");
  const [selectedTask, setSelectedTask] = useState<TeamTaskItem | null>(null);

  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const reviewCount = tasks.filter((t) => t.status === "Review").length;

  const handleFilterClick = (filter: "Pending" | "Review" | "Completed") => {
    setActiveFilter((prev) => (prev === filter ? "All" : filter));
  };

  const handleUpdateStatus = (id: string, newStatus: TeamTaskItem["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    if (selectedTask?.id === id) {
      setSelectedTask((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === "All") return true;
    return t.status === activeFilter;
  });

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

        {/* Interactive Task Segment Filter Pills */}
        <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
          <button
            type="button"
            onClick={() => handleFilterClick("Pending")}
            className={`rounded-xl border p-2.5 transition-all text-center focus:outline-none focus:ring-2 focus:ring-[#702832] ${
              activeFilter === "Pending"
                ? "border-blue-400 bg-blue-50/70 shadow-xs"
                : "border-[#E8E1D7] bg-[#F8F5EE] hover:border-blue-200"
            }`}
          >
            <p className="text-[11px] font-semibold text-[#78716C]">In Progress</p>
            <p className="font-serif text-lg font-bold text-blue-700">{pendingCount}</p>
          </button>

          <button
            type="button"
            onClick={() => handleFilterClick("Review")}
            className={`rounded-xl border p-2.5 transition-all text-center focus:outline-none focus:ring-2 focus:ring-[#702832] ${
              activeFilter === "Review"
                ? "border-amber-400 bg-amber-50/70 shadow-xs"
                : "border-[#E8E1D7] bg-[#F8F5EE] hover:border-amber-200"
            }`}
          >
            <p className="text-[11px] font-semibold text-[#78716C]">Under Review</p>
            <p className="font-serif text-lg font-bold text-amber-700">{reviewCount}</p>
          </button>

          <button
            type="button"
            onClick={() => handleFilterClick("Completed")}
            className={`rounded-xl border p-2.5 transition-all text-center focus:outline-none focus:ring-2 focus:ring-[#702832] ${
              activeFilter === "Completed"
                ? "border-emerald-400 bg-emerald-50/70 shadow-xs"
                : "border-[#E8E1D7] bg-[#F8F5EE] hover:border-emerald-200"
            }`}
          >
            <p className="text-[11px] font-semibold text-[#78716C]">Completed</p>
            <p className="font-serif text-lg font-bold text-emerald-700">{completedCount}</p>
          </button>
        </div>

        {/* Active filter reminder if filtered */}
        {activeFilter !== "All" && (
          <div className="mt-2.5 flex items-center justify-between text-xs text-[#78716C] px-1">
            <span>Showing: <strong className="text-[#702832]">{activeFilter}</strong> ({filteredTasks.length})</span>
            <button
              type="button"
              onClick={() => setActiveFilter("All")}
              className="text-[#702832] font-semibold hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Tasks List */}
        <div className="mt-3.5 space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E8E1D7] p-6 text-center text-xs text-[#78716C]">
              No tasks currently in this status.
            </div>
          ) : (
            filteredTasks.map((task) => {
              const assigneeInitials = task.assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2);

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#E8E1D7] p-3.5 transition-all duration-150 hover:border-[#B69252] hover:bg-[#F8F5EE]/40 cursor-pointer"
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
            })
          )}
        </div>
      </div>

      <div className="mt-4 border-t border-[#E8E1D7] pt-3 text-right">
        <Link
          href="/dashboard/task-management"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#702832] hover:text-[#B69252]"
        >
          Open Task Management Segment <ChevronRightIcon size={14} />
        </Link>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-[#E8E1D7] bg-white p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-md bg-[#F8F5EE] px-2 py-0.5 text-xs font-bold text-[#702832] border border-[#E8E1D7]">
                  {selectedTask.priority} Priority
                </span>
                <h3 className="mt-2 font-serif text-lg font-bold text-[#292524]">
                  {selectedTask.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-2 rounded-xl bg-[#F8F5EE] p-4 text-xs text-[#292524]">
              <div className="flex justify-between">
                <span className="text-[#78716C]">Assignee:</span>
                <span className="font-bold">{selectedTask.assignee.name} ({selectedTask.assignee.role})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Due Date:</span>
                <span className="font-bold text-[#702832]">{selectedTask.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Status:</span>
                <span className="font-bold text-emerald-700">{selectedTask.status}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-2">
              <Link
                href="/dashboard/task-management"
                className="rounded-xl border border-[#B69252] px-3.5 py-2 text-xs font-semibold text-[#702832] hover:bg-[#F8F5EE]"
              >
                Go to Task Segment →
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  className="rounded-xl border border-[#E8E1D7] px-4 py-2 text-xs font-semibold text-[#78716C] hover:bg-[#F8F5EE]"
                >
                  Close
                </button>
                {selectedTask.status !== "Completed" && (
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdateStatus(selectedTask.id, "Completed");
                      setSelectedTask(null);
                    }}
                    className="rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                  >
                    Mark Done
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
