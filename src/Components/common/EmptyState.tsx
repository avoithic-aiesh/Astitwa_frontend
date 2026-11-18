
type Props = {
  title?: string;
  message?: string;
};

export default function EmptyState({
  title = "Nothing here yet",
  message = "There is no data to display right now.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
      <h3 className="text-lg font-semibold text-foreground">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-muted">
        {message}
      </p>
    </div>
  );
}
