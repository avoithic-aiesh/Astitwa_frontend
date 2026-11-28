
"use client";

import { useState, type FormEvent } from "react";
import type { Event, EventStatus } from "@/lib/types";
import {
  createEvent,
  updateEvent,
  type CreateEventData,
} from "@/lib/admin";

type Props = {
  event?: Event;
  onSuccess: (event: Event) => void;
};

type FormValues = {
  title: string;
  description: string;
  venue: string;
  startsAt: string;
  endsAt: string;
  capacity: string;
  status: EventStatus;
};

function toLocalDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
}

export default function EventForm({ event, onSuccess }: Props) {
  const [values, setValues] = useState<FormValues>({
    title: event?.title ?? "",
    description: event?.description ?? "",
    venue: event?.venue ?? "",
    startsAt: event ? toLocalDateTime(event.startsAt) : "",
    endsAt: event ? toLocalDateTime(event.endsAt) : "",
    capacity: event ? String(event.capacity) : "",
    status: event?.status ?? "PUBLISHED",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(event);

  function handleChange(
    field: keyof FormValues,
    value: string
  ) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function validate(): string | null {
    if (!values.title.trim()) return "Event title is required.";
    if (!values.venue.trim()) return "Venue is required.";

    if (!values.startsAt || !values.endsAt) {
      return "Start and end date/time are required.";
    }

    const start = new Date(values.startsAt);
    const end = new Date(values.endsAt);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return "Please enter valid dates and times.";
    }

    if (end <= start) {
      return "End date/time must be after the start date/time.";
    }

    const capacity = Number(values.capacity);

    if (
      !values.capacity.trim() ||
      !Number.isInteger(capacity) ||
      capacity < 1
    ) {
      return "Capacity must be a positive whole number.";
    }

    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    const data: CreateEventData = {
      title: values.title.trim(),
      description: values.description.trim(),
      venue: values.venue.trim(),
      startsAt: new Date(values.startsAt).toISOString(),
      endsAt: new Date(values.endsAt).toISOString(),
      capacity: Number(values.capacity),
    };

    try {
      setSaving(true);

      let savedEvent: Event;

      if (event) {
        savedEvent = await updateEvent(event.id, {
          ...data,
          ...(values.status !== event.status
            ? { status: values.status }
            : {}),
        });
      } else {
        savedEvent = await createEvent(data);
      }

      onSuccess(savedEvent);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className={labelClass}>
          Event Title *
        </label>
        <input
          id="title"
          type="text"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={inputClass}
          placeholder="Enter event title"
          maxLength={200}
          required
          disabled={saving}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          value={values.description}
          onChange={(e) =>
            handleChange("description", e.target.value)
          }
          className={inputClass}
          placeholder="Describe your event"
          rows={4}
          disabled={saving}
        />
      </div>

      <div>
        <label htmlFor="venue" className={labelClass}>
          Venue *
        </label>
        <input
          id="venue"
          type="text"
          value={values.venue}
          onChange={(e) => handleChange("venue", e.target.value)}
          className={inputClass}
          placeholder="Enter event venue"
          maxLength={200}
          required
          disabled={saving}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="startsAt" className={labelClass}>
            Start Date & Time *
          </label>
          <input
            id="startsAt"
            type="datetime-local"
            value={values.startsAt}
            onChange={(e) =>
              handleChange("startsAt", e.target.value)
            }
            className={inputClass}
            required
            disabled={saving}
          />
        </div>

        <div>
          <label htmlFor="endsAt" className={labelClass}>
            End Date & Time *
          </label>
          <input
            id="endsAt"
            type="datetime-local"
            value={values.endsAt}
            onChange={(e) =>
              handleChange("endsAt", e.target.value)
            }
            className={inputClass}
            required
            disabled={saving}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="capacity" className={labelClass}>
            Maximum Capacity *
          </label>
          <input
            id="capacity"
            type="number"
            min="1"
            step="1"
            value={values.capacity}
            onChange={(e) =>
              handleChange("capacity", e.target.value)
            }
            className={inputClass}
            placeholder="e.g. 100"
            required
            disabled={saving}
          />
        </div>

        {isEditing && (
          <div>
            <label htmlFor="status" className={labelClass}>
              Event Status
            </label>
            <select
              id="status"
              value={values.status}
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
              className={inputClass}
              disabled={saving}
            >
              <option value="PUBLISHED">Published</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Event"}
        </button>
      </div>
    </form>
  );
}
