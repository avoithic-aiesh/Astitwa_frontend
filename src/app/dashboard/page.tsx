"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/admin/DashboardHeader";
import { OverviewMetrics } from "@/components/dashboard/admin/OverviewMetrics";
import { UpcomingEventsSection } from "@/components/dashboard/admin/UpcomingEventsSection";
import { SocialMediaOverview } from "@/components/dashboard/admin/SocialMediaOverview";
import { ContentCalendarPreview } from "@/components/dashboard/admin/ContentCalendarPreview";
import { AnalyticsCharts } from "@/components/dashboard/admin/AnalyticsCharts";
import { PendingActionsSection } from "@/components/dashboard/admin/PendingActionsSection";
import { TeamTasksSection } from "@/components/dashboard/admin/TeamTasksSection";
import { RecentActivityFeed } from "@/components/dashboard/admin/RecentActivityFeed";
import {
  getMetricsByDateRange,
  mockUpcomingEvents,
  mockSocialAccounts,
  mockSocialStats,
  mockCalendarPosts,
  getAnalyticsData,
  mockPendingActions,
  mockTeamTasks,
  mockRecentActivities,
} from "@/data/mockDashboardData";
import type { DateRange } from "@/types/dashboard-admin";

export default function DashboardPage() {
  const [selectedRange, setSelectedRange] = useState<DateRange>("30d");

  // Derive dynamic metrics and chart data based on active date range filter
  const metrics = getMetricsByDateRange(selectedRange);
  const analyticsData = getAnalyticsData(selectedRange);

  return (
    <div className="min-h-full pb-16">
      {/* 1. Welcome Header, Org Identity, Date Filter, and Quick Actions */}
      <DashboardHeader
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
      />

      {/* Main Workspace Body */}
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* 2. Four Summary Cards */}
        <section aria-label="Key Performance Indicators">
          <OverviewMetrics metrics={metrics} />
        </section>

        {/* 3. Upcoming Events & Social Media Overview */}
        <section
          aria-label="Events and Social Media Overview"
          className="grid grid-cols-1 gap-8 xl:grid-cols-2"
        >
          <UpcomingEventsSection events={mockUpcomingEvents} />
          <SocialMediaOverview
            accounts={mockSocialAccounts}
            stats={mockSocialStats}
          />
        </section>

        {/* 4. Content Calendar Preview */}
        <section aria-label="Content Calendar Preview">
          <ContentCalendarPreview posts={mockCalendarPosts} />
        </section>

        {/* 5. Analytics & Performance Charts */}
        <section aria-label="Performance Analytics">
          <AnalyticsCharts
            data={analyticsData}
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
          />
        </section>

        {/* 6. Pending Actions & Team Activity */}
        <section
          aria-label="Pending Actions and Team Assignments"
          className="grid grid-cols-1 gap-8 xl:grid-cols-2"
        >
          <PendingActionsSection actions={mockPendingActions} />
          <TeamTasksSection tasks={mockTeamTasks} />
        </section>

        {/* 7. Recent Activity Feed */}
        <section aria-label="Recent Activity Stream">
          <RecentActivityFeed activities={mockRecentActivities} />
        </section>
      </div>
    </div>
  );
}
