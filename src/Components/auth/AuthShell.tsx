import type { ReactNode } from "react";

type Props = { title: string; subtitle: string; children: ReactNode };

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}