
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function isUpcoming(startsAt: string): boolean {
  return new Date(startsAt).getTime() > Date.now();
}

export function isPast(endsAt: string): boolean {
  return new Date(endsAt).getTime() < Date.now();
}
