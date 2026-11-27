import type { EventStatus } from "@/lib/types";

type Props = {
  status: EventStatus;
};

const statusStyles: Record<EventStatus, string> = {
  PUBLISHED: "border border-emerald-200 bg-emerald-50/95 text-emerald-900",
  CANCELLED: "border border-rose-border bg-rose-tint text-primary",
};

const statusLabels: Record<EventStatus, string> = {
  PUBLISHED: "Published",
  CANCELLED: "Cancelled",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-xs ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
