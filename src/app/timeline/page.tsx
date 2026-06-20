"use client";
// app/timeline/page.tsx — Full session history + stats page
import { useEffect, useState } from "react";
import AppShell from "@/components/nav/AppShell";
import SessionCard from "@/components/timeline/SessionCard";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/hooks/useI18n";
import { getUserSessions } from "@/lib/firestore";
import type { Session } from "@/types";
import styles from "./TimelinePage.module.css";

function formatTotalTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function TimelinePage() {
  const { user, profile } = useAuth();
  const { t } = useI18n();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserSessions(user.uid)
      .then(setSessions)
      .finally(() => setLoading(false));
  }, [user]);

  const completed = sessions.filter((s) => s.status === "completed").length;
  const abandoned = sessions.filter((s) => s.status === "abandoned").length;

  return (
    <AppShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("timeline_title")}</h1>
          <p className={styles.subtitle}>{t("timeline_subtitle")}</p>
        </div>

        {/* Stats row */}
        <div className={styles.stats} role="region" aria-label="Focus statistics">
          <div className={styles.statCard}>
            <span className={styles.statValue}>{formatTotalTime(profile?.totalSeconds ?? 0)}</span>
            <span className={styles.statLabel}>{t("stat_total_focus")}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{profile?.leafCount ?? 0} 🌿</span>
            <span className={styles.statLabel}>{t("stat_trees_grown")}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{sessions.length}</span>
            <span className={styles.statLabel}>{t("stat_sessions")}</span>
          </div>
        </div>

        {/* Session list */}
        {loading ? (
          <p className={styles.empty}>{t("timeline_loading")}</p>
        ) : sessions.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🌱</span>
            {t("timeline_empty")}
          </div>
        ) : (
          <div className={styles.list} role="list" aria-label="Session history">
            {sessions.map((s) => (
              <SessionCard key={s.id} session={s} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
