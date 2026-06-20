"use client";
// app/timer/page.tsx — Full focus timer page
import { useState, useEffect, useRef, useCallback } from "react";
import AppShell from "@/components/nav/AppShell";
import TimerDial from "@/components/timer/TimerDial";
import PresetButtons from "@/components/timer/PresetButtons";
import TreeGrowth from "@/components/tree/TreeGrowth";
import { useTimer } from "@/hooks/useTimer";
import { useSession } from "@/hooks/useSession";
import { useI18n } from "@/hooks/useI18n";
import styles from "./TimerPage.module.css";

const DEFAULT_MINUTES = 25;

export default function TimerPage() {
  const [selectedMinutes, setSelectedMinutes] = useState(DEFAULT_MINUTES);
  const [audioOn, setAudioOn] = useState(false);
  const audioRef   = useRef<HTMLAudioElement | null>(null);
  // Ref to hold elapsed seconds so callbacks don't stale-close over it
  const elapsedRef = useRef<number>(0);

  const durationSeconds = selectedMinutes * 60;
  const session = useSession();
  const { t } = useI18n();

  // Callbacks passed to useTimer — use elapsedRef to avoid circular dep
  const handleComplete = useCallback(async () => {
    await session.completeSession(durationSeconds, durationSeconds);
    audioRef.current?.pause();
  }, [session, durationSeconds]);

  const handleAbandon = useCallback(async () => {
    await session.abandonSession(durationSeconds, elapsedRef.current);
    audioRef.current?.pause();
  }, [session, durationSeconds]);

  const timer = useTimer({
    durationSeconds,
    onComplete: handleComplete,
    onAbandon:  handleAbandon,
  });

  // Keep elapsedRef in sync with timer state
  useEffect(() => {
    elapsedRef.current = timer.elapsed;
  }, [timer.elapsed]);

  // Ambient audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/rain.mp3");
      audioRef.current.loop   = true;
      audioRef.current.volume = 0.35;
    }
    if (audioOn && timer.status === "running") {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [audioOn, timer.status]);

  // Abandon on page unload mid-session
  useEffect(() => {
    const handleUnload = () => {
      if (timer.status === "running" || timer.status === "paused") {
        session.abandonSession(durationSeconds, elapsedRef.current);
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [timer.status, durationSeconds, session]);

  const handleStart = () => {
    session.startSession(durationSeconds);
    timer.start();
  };

  const handleReset = () => {
    timer.reset();
    setSelectedMinutes(DEFAULT_MINUTES);
  };

  const handlePresetSelect = (minutes: number) => {
    if (timer.status === "idle") {
      setSelectedMinutes(minutes);
      timer.reset(minutes * 60);
    }
  };

  const isActive = timer.status === "running" || timer.status === "paused";

  return (
    <AppShell>
      <section className={styles.page} aria-label="Focus timer">

        <div className={styles.hero}>
          <div className={styles.treeSection}>
            <TreeGrowth progress={timer.progress} status={timer.status} />
          </div>

          <TimerDial
            remaining={timer.remaining}
            duration={durationSeconds}
            progress={timer.progress}
            status={timer.status}
          />
        </div>

        {/* Preset buttons — only when idle */}
        {timer.status === "idle" && (
          <div className={styles.controls}>
            <PresetButtons
              selectedMinutes={selectedMinutes}
              onSelect={handlePresetSelect}
            />
          </div>
        )}

        {/* Action buttons */}
        <div className={styles.controls}>
          <div className={styles.btnRow}>
            {timer.status === "idle" && (
              <button className={styles.startBtn} onClick={handleStart} id="timer-start-btn">
                {t("timer_start")}
              </button>
            )}

            {timer.status === "running" && (
              <>
                <button className={styles.ghostBtn} onClick={timer.pause} id="timer-pause-btn">
                  {t("timer_pause")}
                </button>
                <button className={`${styles.ghostBtn} ${styles.dangerBtn}`} onClick={timer.abandon} id="timer-abandon-btn">
                  {t("timer_give_up")}
                </button>
              </>
            )}

            {timer.status === "paused" && (
              <>
                <button className={styles.startBtn} onClick={timer.resume} id="timer-resume-btn">
                  {t("timer_resume")}
                </button>
                <button className={`${styles.ghostBtn} ${styles.dangerBtn}`} onClick={timer.abandon} id="timer-abandon-btn">
                  {t("timer_give_up")}
                </button>
              </>
            )}

            {(timer.status === "completed" || timer.status === "abandoned") && (
              <button className={styles.startBtn} onClick={handleReset} id="timer-reset-btn">
                {t("timer_new_session")}
              </button>
            )}
          </div>

          {/* Completion message */}
          {timer.status === "completed" && (
            <div className={styles.completedMsg}>
              <h2>{t("timer_tree_grew")}</h2>
              <p>{t("timer_wonderful_session")}</p>
            </div>
          )}

          {/* Ambient audio toggle */}
          {isActive && (
            <button
              className={`${styles.audioToggle} ${audioOn ? styles.audioToggleActive : ""}`}
              onClick={() => setAudioOn((v) => !v)}
              id="audio-toggle-btn"
              aria-label={audioOn ? t("timer_rain_off") : t("timer_rain_on")}
            >
              {audioOn ? "🔊" : "🔇"} {audioOn ? t("timer_rain_on") : t("timer_rain_off")}
            </button>
          )}
        </div>

      </section>
    </AppShell>
  );
}
