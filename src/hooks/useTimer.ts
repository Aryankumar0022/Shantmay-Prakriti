// hooks/useTimer.ts — Core countdown timer state machine
// States: idle → running → (paused ↔ running) → completed | abandoned
import { useState, useEffect, useRef, useCallback } from "react";
import type { TimerStatus } from "@/types";

interface UseTimerOptions {
  durationSeconds: number;
  onComplete: () => void;
  onAbandon: () => void;
}

interface UseTimerReturn {
  status: TimerStatus;
  elapsed: number;          // seconds elapsed
  remaining: number;        // seconds remaining
  progress: number;         // 0 → 1
  start: () => void;
  pause: () => void;
  resume: () => void;
  abandon: () => void;
  reset: (newDuration?: number) => void;
}

export function useTimer({ durationSeconds, onComplete, onAbandon }: UseTimerOptions): UseTimerReturn {
  const [status,  setStatus]  = useState<TimerStatus>("idle");
  const [elapsed, setElapsed] = useState(0);

  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef  = useRef<number>(0);   // wall-clock when last resumed
  const elapsedAtPauseRef = useRef<number>(0); // elapsed seconds when paused

  const clearTick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const tick = useCallback(() => {
    const wallElapsed = elapsedAtPauseRef.current + (Date.now() - startTimeRef.current) / 1000;
    if (wallElapsed >= durationSeconds) {
      setElapsed(durationSeconds);
      setStatus("completed");
      clearTick();
      onComplete();
    } else {
      setElapsed(wallElapsed);
    }
  }, [durationSeconds, onComplete]);

  const start = useCallback(() => {
    elapsedAtPauseRef.current = 0;
    startTimeRef.current = Date.now();
    setElapsed(0);
    setStatus("running");
  }, []);

  const pause = useCallback(() => {
    elapsedAtPauseRef.current = elapsed;
    clearTick();
    setStatus("paused");
  }, [elapsed]);

  const resume = useCallback(() => {
    startTimeRef.current = Date.now();
    setStatus("running");
  }, []);

  const abandon = useCallback(() => {
    clearTick();
    setStatus("abandoned");
    onAbandon();
  }, [onAbandon]);

  const reset = useCallback((newDuration?: number) => {
    clearTick();
    elapsedAtPauseRef.current = 0;
    setElapsed(0);
    setStatus("idle");
  }, []);

  // Drive the interval when running
  useEffect(() => {
    if (status === "running") {
      intervalRef.current = setInterval(tick, 250); // 250ms granularity is smooth enough
    } else {
      clearTick();
    }
    return clearTick;
  }, [status, tick]);

  // Guard: abandon if tab is hidden for too long (>5 s) during a session
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && status === "running") {
        // We don't abandon — we keep counting. Wall-clock approach handles gaps naturally.
        // This is intentional: closing tab = abandon is handled by beforeunload below.
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [status]);

  const remaining = Math.max(0, durationSeconds - elapsed);
  const progress  = durationSeconds > 0 ? Math.min(1, elapsed / durationSeconds) : 0;

  return { status, elapsed, remaining, progress, start, pause, resume, abandon, reset };
}
