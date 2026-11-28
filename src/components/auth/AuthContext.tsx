
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import * as auth from "@/lib/auth";
import type { User } from "@/lib/auth";

type AuthState = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

function isProtectedPath(pathname: string): boolean {
  return (
    pathname.startsWith("/admin") ||
    pathname === "/my-events"
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function initializeAuth() {
      const hadToken = Boolean(
        sessionStorage.getItem("auth_token")
      );

      try {
        const currentUser = await auth.getSession();

        if (!active) return;

        setUser(currentUser);

        // A stale token on a protected page requires login.
        if (
          hadToken &&
          !currentUser &&
          isProtectedPath(window.location.pathname)
        ) {
          window.location.replace("/login");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    function handleUnauthorized() {
      setUser(null);
      setLoading(false);

      // Redirect only when the current page requires authentication.
      if (isProtectedPath(window.location.pathname)) {
        window.location.replace("/login");
      }
    }

    window.addEventListener(
      "auth:unauthorized",
      handleUnauthorized
    );

    void initializeAuth();

    return () => {
      active = false;
      window.removeEventListener(
        "auth:unauthorized",
        handleUnauthorized
      );
    };
  }, []);

  const value: AuthState = {
    user,
    loading,

    login: async (email, password) => {
      const loggedInUser = await auth.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    },

    signup: async (name, email, password) => {
      await auth.signup(name, email, password);
    },

    logout: async () => {
      await auth.logout();
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }

  return ctx;
}
