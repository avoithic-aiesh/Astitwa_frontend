
import { apiRequest } from "./api";

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

const TOKEN_KEY = "auth_token";

export async function signup(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const { user } = await apiRequest<{ user: User }>(
    "/auth/signup",
    {
      method: "POST",
      body: JSON.stringify({
        fullName: name,
        email,
        password,
      }),
    }
  );

  return user;
}

export async function login(
  email: string,
  password: string
): Promise<User> {
  const { token, user } = await apiRequest<{
    token: string;
    user: User;
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!token) {
    throw new Error(
      "Login response did not contain an authentication token."
    );
  }

  sessionStorage.setItem(TOKEN_KEY, token);

  return user;
}

export async function logout(): Promise<void> {
  sessionStorage.removeItem(TOKEN_KEY);
}

export async function getSession(): Promise<User | null> {
  if (typeof window === "undefined") return null;

  const token = sessionStorage.getItem(TOKEN_KEY);

  if (!token) return null;

  try {
    const { user } = await apiRequest<{ user: User }>(
      "/auth/me",
      {},
      { silentUnauthorized: true }
    );

    return user;
  } catch {
    sessionStorage.removeItem(TOKEN_KEY);
    return null;
  }
}
