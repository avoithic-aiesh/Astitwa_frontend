"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/Components/auth/AuthContext";
import AdminGuard from "@/Components/auth/AdminGuard";
import PageContainer from "@/Components/common/PageContainer";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <AdminGuard>
      <PageContainer>
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Organizer Workspace
          </p>

          <h1 className="font-display mt-2 text-3xl font-bold text-primary">
            Admin Dashboard
          </h1>

          <p className="mt-4 text-foreground">
            Welcome, <span className="font-semibold">{user?.fullName}</span>!
          </p>

          <p className="mt-2 text-sm text-muted">
            Role: <span className="font-medium text-foreground">{user?.role}</span>
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Logout
          </button>
        </div>
      </PageContainer>
    </AdminGuard>
  );
}
