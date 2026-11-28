
type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: Props) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 py-12 text-center"
    >
      <p className="text-sm text-red-700">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
