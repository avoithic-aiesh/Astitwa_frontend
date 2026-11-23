
const API = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_KEY = "auth_token";

function getToken(): string | null {
  if (typeof window === "undefined") return null;

  return sessionStorage.getItem(TOKEN_KEY);
}

export async function apiRequest<T = Record<string, unknown>>(
  path: string,
  options: RequestInit = {},
  config: { silentUnauthorized?: boolean } = {}
): Promise<T> {
  if (!API) {
    throw new Error("Backend API URL is not configured.");
  }

  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const isAuthEntry =
    path === "/auth/login" || path === "/auth/signup";

  const token = isAuthEntry ? null : getToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;

  try {
    const baseURL = API.replace(/\/+$/, "");

    response = await fetch(`${baseURL}/api${path}`, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new Error("Could not reach the server. Please try again.");
  }

  const responseText = await response.text();

  let body: Record<string, unknown> = {};

  if (responseText) {
    try {
      body = JSON.parse(responseText);
    } catch {
      body = {};
    }
  }

  if (response.status === 401 && token) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(TOKEN_KEY);

      if (!config.silentUnauthorized) {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }
  }

  if (!response.ok) {
    const message =
      typeof body.message === "string"
        ? body.message
        : "Something went wrong.";

    throw new Error(message);
  }

  return body as T;
}
