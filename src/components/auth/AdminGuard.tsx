
"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "./AuthContext";
import LoadingState from "@/components/common/LoadingState";
import type { UserRole } from "@/lib/types";

type Props = {
  children: ReactNode;
  roles?: UserRole[];
};

const DEFAULT_ALLOWED_ROLES: UserRole[] = ["ADMIN", "SUPER_ADMIN"];

export default function AdminGuard({
  children,
  roles = DEFAULT_ALLOWED_ROLES,
}: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const hasPermission = user ? roles.includes(user.role) : false;

  useEffect(() => {
    if (loading) return;

    if (!user || user.status !== "ACTIVE") {
      router.replace("/login");
      return;
    }

    if (!hasPermission) {
      router.replace("/");
    }
  }, [user, loading, hasPermission, router]);

  if (loading) {
    return <LoadingState />;
  }

  if (!user || user.status !== "ACTIVE" || !hasPermission) {
    return null;
  }

  return <>{children}</>;
}
