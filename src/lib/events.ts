
import type { Event, Registration } from "./types";

const API = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_KEY = "auth_token";

async function request(
  path: string,
  options: RequestInit = {}
) {
  if (!API) {
    throw new Error("Backend API URL is not configured.");
  }

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem(TOKEN_KEY)
      : null;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API}${path}`, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new Error("Could not reach the server. Please try again.");
  }

  const body = await response.json().catch(() => ({}));

  if (response.status === 401 && typeof window !== "undefined") {
    sessionStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event("auth:unauthorized"));
  }

  if (!response.ok) {
    throw new Error(body.message ?? "Something went wrong.");
  }

  return body;
}

// Get all events
export async function getEvents(): Promise<Event[]> {
  const body = await request("/api/events");
  return body.events ?? [];
}

// Get one event by ID
export async function getEvent(id: string): Promise<Event> {
  const body = await request(
    `/api/events/${encodeURIComponent(id)}`
  );

  return body.event;
}

// Register for an event
export async function registerForEvent(
  eventId: string
): Promise<void> {
  await request(
    `/api/events/${encodeURIComponent(eventId)}/register`,
    { method: "POST" }
  );
}

// Cancel registration
export async function cancelRegistration(
  eventId: string
): Promise<void> {
  await request(
    `/api/events/${encodeURIComponent(eventId)}/register`,
    { method: "DELETE" }
  );
}

// Get the logged-in user's registrations
export async function getMyRegistrations(): Promise<Registration[]> {
  const body = await request("/api/registrations/me");
  return body.registrations ?? [];
}
