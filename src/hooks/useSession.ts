// hooks/useSession.ts — Handles saving/abandoning a session to Firestore
import { useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveSession } from "@/lib/firestore";

interface UseSessionReturn {
  startSession: (durationSeconds: number) => void;
  completeSession: (durationSeconds: number, elapsed: number) => Promise<void>;
  abandonSession:  (durationSeconds: number, elapsed: number) => Promise<void>;
}

export function useSession(): UseSessionReturn {
  const { user } = useAuth();
  const startTimeRef = useRef<number>(0);

  const startSession = (durationSeconds: number) => {
    startTimeRef.current = Date.now();
  };

  const completeSession = async (durationSeconds: number, elapsed: number) => {
    if (!user) return;
    await saveSession({
      uid: user.uid,
      durationSeconds,
      elapsedSeconds: Math.round(elapsed),
      status: "completed",
      startedAt: startTimeRef.current,
      endedAt: Date.now(),
    });
  };

  const abandonSession = async (durationSeconds: number, elapsed: number) => {
    if (!user) return;
    await saveSession({
      uid: user.uid,
      durationSeconds,
      elapsedSeconds: Math.round(elapsed),
      status: "abandoned",
      startedAt: startTimeRef.current,
      endedAt: Date.now(),
    });
  };

  return { startSession, completeSession, abandonSession };
}
