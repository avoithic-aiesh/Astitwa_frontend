
import type { Event } from "./types";
import { apiRequest } from "./api";

export type CreateEventData = {
  title: string;
  description?: string;
  venue: string;
  startsAt: string;
  endsAt: string;
  capacity: number;
};

export type UpdateEventData = Partial<CreateEventData> & {
  status?: Event["status"];
};

export type AdminRegistration = {
  id: string;
  registeredAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
};

export async function getAdminEvents(): Promise<Event[]> {
  const body = await apiRequest<{ events: Event[] }>("/events");
  return body.events ?? [];
}

export async function createEvent(data: CreateEventData): Promise<Event> {
  const body = await apiRequest<{ event: Event }>("/events", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return body.event;
}

export async function updateEvent(
  id: string,
  changes: UpdateEventData
): Promise<Event> {
  const body = await apiRequest<{ event: Event }>(
    `/events/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify(changes),
    }
  );

  return body.event;
}

export async function cancelEvent(id: string): Promise<Event> {
  return updateEvent(id, { status: "CANCELLED" });
}

export async function getEventRegistrations(
  eventId: string
): Promise<AdminRegistration[]> {
  const body = await apiRequest<{ registrations: AdminRegistration[] }>(
    `/events/${encodeURIComponent(eventId)}/registrations`
  );

  return body.registrations ?? [];
}
