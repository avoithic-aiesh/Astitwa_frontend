import Link from "next/link";

const orbit = [
  { label: "Events", pos: "left-[40%] top-0" },
  { label: "Scheduling", pos: "right-0 top-[24%]" },
  { label: "Members", pos: "right-0 bottom-[24%]" },
  { label: "Social Media", pos: "left-[32%] bottom-0" },
  { label: "Updates", pos: "left-0 bottom-[24%]" },
  { label: "Teams", pos: "left-0 top-[24%]" },
];

const posts = [
  { title: "Event announcement", status: "Scheduled" },
  { title: "Speaker highlight", status: "Draft" },
  { title: "Registration reminder", status: "Posted" },
];

const pillars = [
  {
    title: "Event management",
    text: "Plan, schedule and keep every detail of your events in one place.",
  },
  {
    title: "Social media",
    text: "Prepare and organize the posts that promote your events and your community.",
  },
  {
    title: "Team collaboration",
    text: "Keep members, organizers and volunteers working from the same page.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(182,146,82,0.2),transparent_65%)]"
        />

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 text-center md:pt-24">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Run every event with a{" "}
            <span className="text-primary">smarter platform</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Plan events, manage your social media, and collaborate with your whole
            organization, all from one place.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
          </div>

          {/* Feature cards */}
          <div className="mt-16 grid items-center gap-6 text-left md:grid-cols-3">
            <article className="overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-xl md:[transform:perspective(1200px)_rotateY(-14deg)_scale(0.94)]">
              <h2 className="text-lg font-semibold text-foreground">
                Seamless team collaboration
              </h2>
              <p className="mt-1 text-sm text-muted">
                Coordinate tasks and updates with your team.
              </p>
              <div className="mt-5 space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-background px-3 py-2 text-xs text-foreground">
                  The schedule has been updated.
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-xs text-white">
                  Got it. I will share the poster today.
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-background px-3 py-2 text-xs text-foreground">
                  The venue is confirmed.
                </div>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-2xl md:scale-105">
              <h2 className="text-lg font-semibold text-foreground">
                All-in-one event management
              </h2>
              <p className="mt-1 text-sm text-muted">
                Everything your organization needs in one simple platform.
              </p>
              <div className="relative mx-auto mt-6 h-64 max-w-xs">
                <div className="absolute inset-x-4 inset-y-6 rounded-[50%] border border-border" />
                <div className="absolute inset-x-4 inset-y-6 rotate-[60deg] rounded-[50%] border border-border" />
                <div className="absolute inset-x-4 inset-y-6 -rotate-[60deg] rounded-[50%] border border-border" />
                {orbit.map((o) => (
                  <span
                    key={o.label}
                    className={`absolute rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted shadow-sm ${o.pos}`}
                  >
                    {o.label}
                  </span>
                ))}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-lg font-extrabold uppercase tracking-[0.2em] text-primary">
                    Eventra<span className="text-secondary">.</span>
                  </p>
                </div>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-xl md:[transform:perspective(1200px)_rotateY(14deg)_scale(0.94)]">
              <h2 className="text-lg font-semibold text-foreground">
                Social media, organized
              </h2>
              <p className="mt-1 text-sm text-muted">
                Keep every post for your events in one place.
              </p>
              <div className="mt-5 space-y-3">
                {posts.map((p, i) => (
                  <div
                    key={p.title}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                  >
                    <div
                      className={`h-10 w-10 shrink-0 rounded-lg ${
                        i === 1 ? "bg-secondary" : "bg-primary"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-foreground">
                        {p.title}
                      </p>
                      <p className="text-xs text-muted">{p.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              About
            </p>
            <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">
              About Eventra
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Eventra is a centralized platform to manage events, social media, and
              organizational collaboration. Instead of juggling spreadsheets, chat
              groups and separate tools, your team works in one place.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Your events. Your community. Your identity.
            </p>
          </div>

          <ul className="space-y-5">
            {pillars.map((p, i) => (
              <li key={p.title} className="flex gap-4 rounded-xl border border-border bg-background p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}