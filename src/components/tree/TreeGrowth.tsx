"use client";
// components/tree/TreeGrowth.tsx — Shows the correct SVG frame based on session progress
import Image from "next/image";
import type { TimerStatus } from "@/types";
import styles from "./TreeGrowth.module.css";

interface Props {
  progress:  number;      // 0 → 1
  status:    TimerStatus;
}

// Map progress to one of 5 frames (0–4)
function getFrame(progress: number, status: TimerStatus): number {
  if (status === "idle")      return 0;
  if (status === "completed") return 4;
  if (status === "abandoned") return 0;
  // running or paused: proportional frames 0→3 during session
  return Math.min(3, Math.floor(progress * 4));
}

const FRAME_LABELS = ["Waiting to grow…", "Just sprouting…", "Growing steadily…", "Almost there…", "Fully grown! 🌿"];

export default function TreeGrowth({ progress, status }: Props) {
  const frame = getFrame(progress, status);
  const isCompleted = status === "completed";
  const isAbandoned = status === "abandoned";

  return (
    <div className={styles.container}>
      <div
        className={`${styles.treeWrap} ${isCompleted ? styles.treeCompleted : ""} ${isAbandoned ? styles.treeAbandoned : ""}`}
        aria-label={`Tree frame ${frame} of 4`}
        role="img"
      >
        <Image
          src={`/trees/tree-${frame}.svg`}
          alt={FRAME_LABELS[frame]}
          fill
          className={styles.treeImg}
          priority
        />
      </div>
      <span className={styles.label}>{FRAME_LABELS[frame]}</span>
    </div>
  );
}
