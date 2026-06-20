// types/index.ts — Shared TypeScript interfaces across the app

export type Language = "en" | "hi" | "ja" | "es" | "ko" | "zh";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  country: string;       // ISO 3166-1 alpha-2, e.g. "IN"
  language: Language;
  totalSeconds: number;  // cumulative focus seconds
  leafCount: number;     // completed sessions
  createdAt: number;     // unix ms
}

export type TimerStatus = "idle" | "running" | "paused" | "completed" | "abandoned";

export interface Session {
  id: string;
  uid: string;
  durationSeconds: number;   // chosen duration
  elapsedSeconds: number;    // how much was actually completed
  status: "completed" | "abandoned";
  startedAt: number;         // unix ms
  endedAt: number;           // unix ms
}
