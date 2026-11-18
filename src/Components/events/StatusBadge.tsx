
import type { EventStatus } from "@/lib/types";

type Props = {
  status: EventStatus;
};

const statusStyles: Record<EventStatus, string> = {
  PUBLISHED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusLabels: Record<EventStatus, string> = {
  PUBLISHED: "Published",
  CANCELLED: "Cancelled",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
