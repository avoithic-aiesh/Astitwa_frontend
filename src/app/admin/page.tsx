
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/Components/auth/AuthContext";
import AdminGuard from "@/Components/auth/AdminGuard";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <AdminGuard>
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-4">
          Welcome, {user?.fullName}!
        </p>

        <p className="mt-2">
          Role: {user?.role}
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </main>
    </AdminGuard>
  );
}
