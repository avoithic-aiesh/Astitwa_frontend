
"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

type Props = {
  children: ReactNode;
};

export default function AdminGuard({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.status !== "ACTIVE") {
      router.replace("/login");
      return;
    }

    if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Checking permissions...</div>;
  }

  if (
    !user ||
    user.status !== "ACTIVE" ||
    (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")
  ) {
    return null;
  }

  return <>{children}</>;
}
