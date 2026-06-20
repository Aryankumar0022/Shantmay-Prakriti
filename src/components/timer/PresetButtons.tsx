"use client";
// components/timer/PresetButtons.tsx — Preset duration selector
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
  return (
    <div className={styles.group} role="group" aria-label="Preset durations">
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
            <span className={styles.recommended}>✦ Best</span>
          )}
        </button>
      ))}
    </div>
  );
}
