

export type UserRole = "MEMBER" | "ADMIN" | "SUPER_ADMIN";

export type UserStatus = "ACTIVE" | "SUSPENDED";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
};


const API = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_KEY = "auth_token";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

async function request(path: string, options: RequestInit = {}) {
  if (!API) {
    throw new Error("Backend API URL is not configured.");
  }

  const token = getToken();

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let res: Response;

  try {
    res = await fetch(`${API}/api/auth${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error("Could not reach the server. Please try again.");
  }

  const body = await res.json().catch(() => ({}));

  if (res.status === 401) {
    sessionStorage.removeItem(TOKEN_KEY);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
  }

  if (!res.ok) {
    throw new Error(body.message ?? "Something went wrong.");
  }

  return body;
}

export async function signup(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const { user } = await request("/signup", {
    method: "POST",
    body: JSON.stringify({
      fullName: name,
      email,
      password,
    }),
  });

  return user;
}

export async function login(
  email: string,
  password: string
): Promise<User> {
  const { token, user } = await request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!token) {
    throw new Error("Login response did not contain an authentication token.");
  }

  sessionStorage.setItem(TOKEN_KEY, token);

  return user;
}

export async function logout(): Promise<void> {
  sessionStorage.removeItem(TOKEN_KEY);
}

export async function getSession(): Promise<User | null> {
  if (!getToken()) return null;

  try {
    const { user } = await request("/me");
    return user;
  } catch {
    sessionStorage.removeItem(TOKEN_KEY);
    return null;
  }
}
