
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let active = true;

    async function initializeAuth() {
      try {
        const currentUser = await auth.getSession();

        if (active) {
          setUser(currentUser);
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
      window.location.href = "/login";
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    initializeAuth();

    return () => {
      active = false;
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
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
