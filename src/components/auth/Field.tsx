type Props = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
};

export default function Field({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`rounded-lg border bg-background px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
          error ? "border-red-600" : "border-border focus:border-primary"
        }`}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}