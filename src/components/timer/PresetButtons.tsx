"use client";
// components/timer/PresetButtons.tsx — Duration selector pills
import { useI18n } from "@/hooks/useI18n";
import styles from "./PresetButtons.module.css";

const PRESETS = [
  { minutes: 10,  label: "10 min" },
  { minutes: 25,  label: "25 min", recommended: true },
  { minutes: 30,  label: "30 min" },
  { minutes: 45,  label: "45 min" },
  { minutes: 60,  label: "60 min" },
];

interface Props {
  selectedMinutes: number;
  onSelect: (minutes: number) => void;
  disabled?: boolean;
}

export default function PresetButtons({ selectedMinutes, onSelect, disabled }: Props) {
  const { t } = useI18n();
  return (
    <div className={styles.group} role="group" aria-label={t("preset_group_aria")}>
      {PRESETS.map(({ minutes, label, recommended }) => (
        <button
          key={minutes}
          id={`preset-${minutes}min`}
          className={`${styles.btn} ${selectedMinutes === minutes ? styles.btnActive : ""}`}
          onClick={() => onSelect(minutes)}
          disabled={disabled}
          aria-pressed={selectedMinutes === minutes}
        >
          {label}
          {recommended && (
            <span className={styles.recommended}>{t("preset_best")}</span>
          )}
        </button>
      ))}
    </div>
  );
}
