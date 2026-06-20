"use client";
// components/timeline/SessionCard.tsx — Single session history item
import Image from "next/image";
import type { Session } from "@/types";
import { useI18n } from "@/hooks/useI18n";
import styles from "./SessionCard.module.css";

interface Props {
  session: Session;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m} min`;
}

function formatDate(unixMs: number): string {
  return new Date(unixMs).toLocaleDateString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function SessionCard({ session }: Props) {
  const { t } = useI18n();
  const isCompleted = session.status === "completed";

  return (
    <div className={styles.card} role="listitem">
      <Image
        src={isCompleted ? "/trees/tree-4.svg" : "/trees/tree-0.svg"}
        alt={isCompleted ? "Completed tree" : "Abandoned tree"}
        width={36}
        height={36}
        className={`${styles.treeIcon} ${!isCompleted ? styles.treeIconAbandoned : ""}`}
      />

      <div className={styles.info}>
        <span className={styles.duration}>
          {formatDuration(session.elapsedSeconds)}
          {!isCompleted && session.durationSeconds !== session.elapsedSeconds && (
            <> of {formatDuration(session.durationSeconds)}</>
          )}
        </span>
        <span className={styles.meta}>{formatDate(session.startedAt)}</span>
      </div>

      <span className={`${styles.badge} ${isCompleted ? styles.badgeCompleted : styles.badgeAbandoned}`}>
        {isCompleted ? t("timeline_done") : t("status_abandoned")}
      </span>
    </div>
  );
}
