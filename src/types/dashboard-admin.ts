export type DateRange = "7d" | "30d" | "90d";

export interface MetricCardData {
  id: string;
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  subInfo: string;
  secondaryInfo?: string;
  badge?: string;
  href: string;
  iconName: "events" | "registrations" | "posts" | "team";
}

export type EventStatus = "Upcoming" | "Ongoing" | "Completed";

export interface UpcomingEventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  status: EventStatus;
  registeredCount: number;
  capacity: number;
  imageUrl?: string;
  featured?: boolean;
}

export interface ConnectedSocialAccount {
  platform: "facebook" | "instagram";
  accountName: string;
  handle: string;
  followers: string;
  connected: boolean;
  lastSynced: string;
}

export interface SocialPublishingStats {
  published: number;
  scheduled: number;
  drafts: number;
  pendingApproval: number;
  failed: number;
}

export type ContentStatus =
  | "Draft"
  | "Pending Approval"
  | "Scheduled"
  | "Published"
  | "Failed";

export interface CalendarPostItem {
  id: string;
  title: string;
  date: string;
  time: string;
  platform: "facebook" | "instagram" | "both";
  status: ContentStatus;
  campaign?: string;
}

export interface ChartDataPoint {
  label: string;
  date: string;
  registrations: number;
  attendance: number;
  reach: number;
  engagement: number;
}

export interface PendingActionItem {
  id: string;
  title: string;
  description: string;
  type: "approval" | "overdue" | "reminder" | "failed";
  severity: "high" | "medium" | "low";
  dueText: string;
  actionText: string;
  actionHref: string;
}

export interface TeamTaskItem {
  id: string;
  title: string;
  assignee: {
    name: string;
    avatar?: string;
    role: string;
  };
  dueDate: string;
  status: "Completed" | "Pending" | "Review";
  priority: "High" | "Medium" | "Low";
}

export interface RecentActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: "registration" | "approval" | "social" | "event" | "task";
  statusColor?: "emerald" | "amber" | "rose" | "blue" | "stone";
}
