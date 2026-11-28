"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2Icon,
  ClockIcon,
  AlertCircleIcon,
  PlusIcon,
  UsersIcon,
  ChevronRightIcon,
  FilterIcon,
} from "@/components/dashboard/icons/AdminIcons";
import { mockTeamTasks } from "@/data/mockDashboardData";
import type { TeamTaskItem } from "@/types/dashboard-admin";

export function TaskManagementSegment() {
  const [tasks, setTasks] = useState<TeamTaskItem[]>(mockTeamTasks);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<TeamTaskItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateStatus = (
    id: string,
    newStatus: TeamTaskItem["status"]
  ) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    if (selectedTask?.id === id) {
      setSelectedTask((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Task status updated to "${newStatus}"!`);
  };

  const filteredTasks = tasks.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    return true;
  });

  const inProgressCount = tasks.filter((t) => t.status === "Pending").length;
  const reviewCount = tasks.filter((t) => t.status === "Review").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

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
              Task Management & Workload
            </h1>
            <span className="rounded-full bg-[#B69252]/15 px-2.5 py-0.5 text-xs font-bold text-[#B69252]">
              {tasks.length} Total
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#78716C]">
            Track assignments, milestone delivery schedules, and member ownership for cultural events.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("New Task modal opened")}
          className="inline-flex items-center gap-2 rounded-xl bg-[#702832] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#5C1E26] active:scale-98 self-start sm:self-auto"
        >
          <PlusIcon size={16} />
          <span>Create Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#E8E1D7] bg-white p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] mr-1">
            Status:
          </span>
          {[
            { id: "all", label: `All (${tasks.length})` },
            { id: "Pending", label: `In Progress (${inProgressCount})` },
            { id: "Review", label: `Under Review (${reviewCount})` },
            { id: "Completed", label: `Completed (${completedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === tab.id
                  ? "bg-[#702832] text-white shadow-xs"
                  : "bg-[#F8F5EE] text-[#78716C] hover:text-[#292524]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <FilterIcon size={14} className="text-[#78716C]" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-lg border border-[#E8E1D7] bg-[#F8F5EE] px-2.5 py-1 text-xs font-medium text-[#292524] focus:outline-none focus:ring-1 focus:ring-[#B69252]"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium</option>
            <option value="Low">Normal</option>
          </select>
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredTasks.map((task) => {
          const initials = task.assignee.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2);

          return (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="group cursor-pointer rounded-2xl border border-[#E8E1D7] bg-white p-5 shadow-xs transition-all duration-200 hover:border-[#B69252] hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                    task.priority === "High"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : task.priority === "Medium"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-stone-100 text-stone-600 border-stone-200"
                  }`}
                >
                  {task.priority} Priority
                </span>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    task.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : task.status === "Review"
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {task.status === "Completed" && <CheckCircle2Icon size={12} />}
                  {task.status === "Review" && <ClockIcon size={12} />}
                  {task.status === "Pending" ? "In Progress" : task.status}
                </span>
              </div>

              <h3 className="mt-3 font-serif text-base font-bold text-[#292524] group-hover:text-[#702832] transition-colors">
                {task.title}
              </h3>

              <div className="mt-4 flex items-center justify-between border-t border-[#E8E1D7]/70 pt-3 text-xs text-[#78716C]">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#702832]/10 font-bold text-[11px] text-[#702832]">
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#292524]">{task.assignee.name}</p>
                    <p className="text-[10px]">{task.assignee.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px]">Due Date</span>
                  <p className="font-semibold text-[#702832]">{task.dueDate}</p>
                </div>
              </div>

              {/* Quick Status Buttons */}
              <div
                className="mt-3 flex items-center justify-end gap-2 border-t border-[#E8E1D7]/50 pt-2"
                onClick={(e) => e.stopPropagation()}
              >
                {task.status !== "Completed" && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(task.id, "Completed")}
                    className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                  >
                    Mark Done
                  </button>
                )}
                {task.status !== "Review" && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(task.id, "Review")}
                    className="rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800 hover:bg-amber-100 transition-colors"
                  >
                    Move to Review
                  </button>
                )}
              </div>
            </div>
          );
        })}
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
                <h2 className="mt-2 font-serif text-xl font-bold text-[#292524]">
                  {selectedTask.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 rounded-xl bg-[#F8F5EE] p-4 text-xs text-[#292524]">
              <div className="flex justify-between">
                <span className="text-[#78716C]">Assignee:</span>
                <span className="font-bold">{selectedTask.assignee.name} ({selectedTask.assignee.role})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Due Date:</span>
                <span className="font-bold text-[#702832]">{selectedTask.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Current Status:</span>
                <span className="font-bold text-emerald-700">{selectedTask.status}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
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
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
