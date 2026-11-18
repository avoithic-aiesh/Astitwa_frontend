
type Props = {
  message?: string;
};

export default function LoadingState({
  message = "Loading...",
}: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-3 py-12 text-sm text-muted"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
      <span>{message}</span>
    </div>
  );
}
