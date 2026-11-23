
import type { Event, Registration } from "./types";
import { apiRequest } from "./api";

// Get all events
export async function getEvents(): Promise<Event[]> {
  const body = await apiRequest<{ events: Event[] }>("/events");
  return body.events ?? [];
}

// Get one event by ID
export async function getEvent(id: string): Promise<Event> {
  const body = await apiRequest<{ event: Event }>(
    `/events/${encodeURIComponent(id)}`
  );

  return body.event;
}

// Register for an event
export async function registerForEvent(
  eventId: string
): Promise<void> {
  await apiRequest(
    `/events/${encodeURIComponent(eventId)}/register`,
    { method: "POST" }
  );
}

// Cancel registration
export async function cancelRegistration(
  eventId: string
): Promise<void> {
  await apiRequest(
    `/events/${encodeURIComponent(eventId)}/register`,
    { method: "DELETE" }
  );
}

// Get the logged-in user's registrations
export async function getMyRegistrations(): Promise<Registration[]> {
  const body = await apiRequest<{ registrations: Registration[] }>(
    "/registrations/me"
  );

  return body.registrations ?? [];
}
