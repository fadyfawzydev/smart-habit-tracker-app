export type FrequencyType = 'daily' | 'weekly' | 'monthly';

export type Frequency = {
  type: FrequencyType;
  daysOfWeek?: string[];
  daysOfMonth?: number;
};

export type Habit = {
  id: string;
  title: string;
  description: string;
  frequency: Frequency;
  createdAt: string;
  completions: Record<string, boolean>;
  icon?: string;
  tags: string[];
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
};

export type UserData = {
  name: string;
  email: string;
  habits: Habit[];
};

export type DataStore = {
  users: Record<string, UserData>;
};

export type Auth0User = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
}; 