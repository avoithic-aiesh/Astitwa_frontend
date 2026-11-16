export type User = { id: number; name: string; email: string; role: string };

const API = process.env.NEXT_PUBLIC_API_URL;

async function request(path: string, options: RequestInit = {}) {
  let res: Response;
  try {
    res = await fetch(`${API}/api/auth${path}`, {
      ...options,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    throw new Error("Could not reach the server. Please try again.");
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message ?? "Something went wrong.");
  return body;
}

export async function signup(name: string, email: string, password: string): Promise<User> {
  const { user } = await request("/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return user;
}

export async function login(email: string, password: string): Promise<User> {
  const { user } = await request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return user;
}

export async function logout() {
  await request("/logout", { method: "POST" });
}

export async function getSession(): Promise<User | null> {
  try {
    const { user } = await request("/me");
    return user;
  } catch {
    return null;
  }
}