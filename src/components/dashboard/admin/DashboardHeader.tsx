"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import {
  BellIcon,
  ChevronDownIcon,
  PlusIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  LogOutIcon,
  ExternalLinkIcon,
  SparklesIcon,
} from "@/components/dashboard/icons/AdminIcons";
import { mockOrganization, mockNotifications } from "@/data/mockDashboardData";
import type { DateRange } from "@/types/dashboard-admin";

interface DashboardHeaderProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

export function DashboardHeader({
  selectedRange,
  onRangeChange,
}: DashboardHeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const displayName =
    (user && "fullName" in user ? (user as { fullName?: string }).fullName : undefined) ||
    mockOrganization.currentAdmin.name;
  const userInitials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative border-b border-[#E8E1D7] bg-[#FFFFFF] px-6 py-6 lg:px-8">
      {/* Top utility row: Organization identity, Date, Notifications, Profile */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Org badge & Date */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B69252]/30 bg-[#F8F5EE] px-3 py-1 text-xs font-medium text-[#702832]">
            <span className="flex h-2 w-2 rounded-full bg-[#B69252] animate-pulse" />
            <span className="font-semibold">{mockOrganization.name}</span>
            <ShieldCheckIcon size={14} className="text-[#B69252]" />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#78716C]">
            <CalendarDaysIcon size={14} />
            <span>Friday, Nov 27, 2026</span>
          </div>
        </div>

        {/* Shortcuts: Notifications, Profile */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Notification Shortcut Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setIsNotifOpen((prev) => !prev);
                setIsProfileOpen(false);
              }}
              aria-label="View notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E1D7] bg-[#FFFFFF] text-[#292524] transition-all hover:border-[#B69252] hover:bg-[#F8F5EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B69252]"
            >
              <BellIcon size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D3544D] px-1 text-[10px] font-bold text-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-[#E8E1D7] bg-[#FFFFFF] p-4 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-[#E8E1D7] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-bold text-[#702832]">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-[#D3544D]/10 px-2 py-0.5 text-[11px] font-semibold text-[#D3544D]">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="text-xs font-medium text-[#B69252] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="mt-2 divide-y divide-[#E8E1D7]/60 max-h-72 overflow-y-auto">
                  {notifications.map((item) => (
                    <Link
                      key={item.id}
                      href={item.link}
                      onClick={() => setIsNotifOpen(false)}
                      className={`block py-2.5 px-2 rounded-lg transition-colors hover:bg-[#F8F5EE] ${
                        !item.read ? "bg-[#F8F5EE]/50 font-medium" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-[#292524]">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-[#78716C] whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-[#78716C] line-clamp-2">
                        {item.message}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="mt-3 border-t border-[#E8E1D7] pt-2 text-center">
                  <Link
                    href="/dashboard/notifications"
                    onClick={() => setIsNotifOpen(false)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#702832] hover:text-[#B69252]"
                  >
                    View all notifications <ExternalLinkIcon size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Avatar Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2.5 rounded-xl border border-[#E8E1D7] bg-[#FFFFFF] p-1.5 pr-3 text-left transition-all hover:border-[#B69252] hover:bg-[#F8F5EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B69252]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#702832] text-xs font-bold text-white shadow-xs">
                {userInitials}
              </div>
              <div className="hidden sm:block min-w-0">
                <p className="truncate text-xs font-semibold text-[#292524]">
                  {displayName}
                </p>
                <p className="truncate text-[10px] text-[#78716C]">
                  Org Admin
                </p>
              </div>
              <ChevronDownIcon size={14} className="text-[#78716C]" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#E8E1D7] bg-[#FFFFFF] p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="border-b border-[#E8E1D7] px-3 py-2">
                  <p className="text-xs font-bold text-[#292524]">{displayName}</p>
                  <p className="text-[11px] text-[#78716C] truncate">
                    {user?.email || mockOrganization.currentAdmin.email}
                  </p>
                  <span className="mt-1 inline-block rounded-md bg-[#B69252]/15 px-2 py-0.5 text-[10px] font-semibold text-[#702832]">
                    Organization Administrator
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#292524] hover:bg-[#F8F5EE] hover:text-[#702832]"
                  >
                    Organization Settings
                  </Link>
                  <Link
                    href="/dashboard/user-management"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#292524] hover:bg-[#F8F5EE] hover:text-[#702832]"
                  >
                    Team & Members
                  </Link>
                </div>

                <div className="border-t border-[#E8E1D7] pt-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#D3544D] hover:bg-[#D3544D]/10"
                  >
                    <LogOutIcon size={14} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main greeting, description, date filter & primary action buttons */}
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#702832]">
              Namaste, Welcome Back!
            </h1>
            <SparklesIcon size={22} className="text-[#B69252]" />
          </div>
          <p className="mt-1 text-sm md:text-base text-[#78716C]">
            Here&apos;s what&apos;s happening with your organization today.
          </p>
        </div>

        {/* Date Filter & Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date range filter pill */}
          <div className="inline-flex rounded-xl border border-[#E8E1D7] bg-[#F8F5EE] p-1 text-xs font-semibold">
            {(["7d", "30d", "90d"] as DateRange[]).map((range) => {
              const labelMap: Record<DateRange, string> = {
                "7d": "Last 7 Days",
                "30d": "Last 30 Days",
                "90d": "Last 3 Months",
              };
              const isSelected = selectedRange === range;
              return (
                <button
                  key={range}
                  type="button"
                  onClick={() => onRangeChange(range)}
                  className={`rounded-lg px-3 py-1.5 transition-all ${
                    isSelected
                      ? "bg-[#702832] text-white shadow-xs"
                      : "text-[#78716C] hover:text-[#292524]"
                  }`}
                >
                  {labelMap[range]}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard/events/create"
              className="inline-flex items-center gap-2 rounded-xl bg-[#702832] px-4 py-2.5 text-xs md:text-sm font-semibold text-white shadow-md shadow-[#702832]/20 transition-all hover:bg-[#5C1E26] hover:shadow-lg active:scale-98"
            >
              <PlusIcon size={16} />
              <span>Create Event</span>
            </Link>

            <Link
              href="/dashboard/post-scheduling"
              className="inline-flex items-center gap-2 rounded-xl border border-[#B69252] bg-[#FFFFFF] px-4 py-2.5 text-xs md:text-sm font-semibold text-[#702832] shadow-xs transition-all hover:bg-[#B69252]/10 active:scale-98"
            >
              <PlusIcon size={16} className="text-[#B69252]" />
              <span>Create Post</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
