"use client";
// app/profile/page.tsx — Full user profile page
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppShell from "@/components/nav/AppShell";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/lib/firestore";
import { signOutUser } from "@/lib/auth";
import { useI18n } from "@/hooks/useI18n";
import type { Language } from "@/types";
import styles from "./ProfilePage.module.css";

// ── Data ────────────────────────────────────────────────

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "en", label: "🇬🇧  English" },
  { value: "hi", label: "🇮🇳  Hindi" },
  { value: "ja", label: "🇯🇵  Japanese" },
  { value: "es", label: "🇪🇸  Spanish" },
  { value: "ko", label: "🇰🇷  Korean" },
  { value: "zh", label: "🇨🇳  Mandarin" },
];

// Curated list of countries relevant to supported languages + common ones
const COUNTRIES: { code: string; label: string }[] = [
  { code: "IN", label: "🇮🇳  India" },
  { code: "US", label: "🇺🇸  United States" },
  { code: "GB", label: "🇬🇧  United Kingdom" },
  { code: "JP", label: "🇯🇵  Japan" },
  { code: "KR", label: "🇰🇷  South Korea" },
  { code: "CN", label: "🇨🇳  China" },
  { code: "ES", label: "🇪🇸  Spain" },
  { code: "MX", label: "🇲🇽  Mexico" },
  { code: "BR", label: "🇧🇷  Brazil" },
  { code: "CA", label: "🇨🇦  Canada" },
  { code: "AU", label: "🇦🇺  Australia" },
  { code: "DE", label: "🇩🇪  Germany" },
  { code: "FR", label: "🇫🇷  France" },
  { code: "SG", label: "🇸🇬  Singapore" },
  { code: "OTHER", label: "🌍  Other" },
];

function formatTotalTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

// ── Component ────────────────────────────────────────────

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const { t } = useI18n();
  const router = useRouter();

  const [country,  setCountry]  = useState(profile?.country  ?? "IN");
  const [language, setLanguage] = useState<Language>(profile?.language ?? "en");
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);

  const initials = profile?.displayName
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "?";

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);
    await updateProfile(user.uid, { country, language });
    await refreshProfile();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSignOut = async () => {
    await signOutUser();
    router.replace("/login");
  };

  return (
    <AppShell>
      <div className={styles.page}>

        {/* Avatar + name */}
        <div className={styles.header}>
          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt={profile?.displayName ?? "User"}
              width={72}
              height={72}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
          <div>
            <h1 className={styles.name}>{profile?.displayName ?? "Anonymous"}</h1>
            <p className={styles.email}>{profile?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats} role="region" aria-label="Your focus stats">
          <div className={styles.statCard}>
            <span className={styles.statValue}>{formatTotalTime(profile?.totalSeconds ?? 0)}</span>
            <span className={styles.statLabel}>{t("stat_total_focus")}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{profile?.leafCount ?? 0} 🌿</span>
            <span className={styles.statLabel}>{t("stat_trees_grown")}</span>
          </div>
        </div>

        {/* Preferences form */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>{t("profile_preferences")}</p>

          <div className={styles.field}>
            <label htmlFor="country-select" className={styles.label}>{t("profile_country")}</label>
            <select
              id="country-select"
              className={styles.select}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {COUNTRIES.map(({ code, label }) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="language-select" className={styles.label}>{t("profile_language")}</label>
            <select
              id="language-select"
              className={styles.select}
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
            >
              {LANGUAGES.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <button
            id="profile-save-btn"
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? t("profile_saving") : t("profile_save")}
          </button>

          {saved && <p className={styles.savedMsg}>{t("profile_saved")}</p>}
        </div>

        {/* Sign out */}
        <button
          id="profile-signout-btn"
          className={styles.signOutBtn}
          onClick={handleSignOut}
        >
          {t("profile_signout")}
        </button>

      </div>
    </AppShell>
  );
}
