
export type UserRole = "MEMBER" | "ADMIN" | "SUPER_ADMIN";

export type UserStatus = "ACTIVE" | "SUSPENDED";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
};



export type EventStatus = "PUBLISHED" | "CANCELLED";

export type Event = {
  id: string;
  title: string;
  description: string;
  venue: string;
  startsAt: string;
  endsAt: string;
  capacity: number;
  status: EventStatus;
  createdBy?: string | null;
  createdAt?: string;
  category?: string;
  tags?: string[];
  image?: string;
};


export type RegistrationRecord = {
  id: string;
  eventId: string;
  userId: string;
  createdAt: string;
};

export type Registration = {
  id: string;
  registeredAt: string;
  event: Pick<
    Event,
    "id" | "title" | "venue" | "startsAt" | "endsAt" | "status"
  >;
};

