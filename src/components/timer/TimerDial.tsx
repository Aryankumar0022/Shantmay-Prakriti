"use client";
// components/timer/TimerDial.tsx — SVG circular timer ring
import type { TimerStatus } from "@/types";
import styles from "./TimerDial.module.css";

interface Props {
  remaining: number;   // seconds
  duration:  number;   // seconds
  progress:  number;   // 0→1
  status:    TimerStatus;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const SIZE       = 280;
const STROKE     = 10;
const RADIUS     = (SIZE - STROKE * 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const STATUS_LABELS: Record<TimerStatus, string> = {
  idle:      "Ready",
  running:   "Focusing",
  paused:    "Paused",
  completed: "Complete ✦",
  abandoned: "Abandoned",
};

export default function TimerDial({ remaining, duration, progress, status }: Props) {
  const offset = CIRCUMFERENCE * (1 - progress);

  const isRunning   = status === "running";
  const isCompleted = status === "completed";
  const isAbandoned = status === "abandoned";

  // Track color based on progress
  const trackColor = isCompleted
    ? "#4a9e78"
    : isAbandoned
    ? "#c0604a"
    : progress > 0.75
    ? "#5ab088"
    : "#4a9e78";

  return (
    <div
      className={`${styles.wrapper} ${isCompleted ? styles.completed : ""} ${isAbandoned ? styles.abandoned : ""}`}
      style={{ width: SIZE, height: SIZE }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        className={`${styles.svg} ${isRunning ? styles.svgRunning : ""}`}
        aria-label={`Timer: ${formatTime(remaining)} remaining`}
        role="img"
      >
        {/* Background track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-surface-2)"
          strokeWidth={STROKE}
        />
        {/* Progress arc */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={trackColor}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{
            transition: isRunning
              ? "stroke-dashoffset 0.25s linear, stroke 0.5s ease"
              : "stroke-dashoffset 0.3s ease, stroke 0.5s ease",
          }}
        />
      </svg>

      {/* Center: time + status */}
      <div className={styles.center}>
        <span className={styles.timeDisplay}>{formatTime(remaining)}</span>
        <span className={styles.statusLabel}>{STATUS_LABELS[status]}</span>
      </div>
    </div>
  );
}
