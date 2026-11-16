import LoginForm from "@/Components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-2xl border border-border bg-white p-10">
        <h1 className="text-3xl font-bold text-primary">Welcome back</h1>
        <p className="mb-8 mt-2 text-muted">Log in to manage your events.</p>
        <LoginForm />
      </div>
    </main>
  );
}