"use client";
// components/nav/NavBar.tsx — Top navigation bar
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { signOutUser } from "@/lib/auth";
import styles from "./NavBar.module.css";

const NAV_TABS = [
  {
    href: "/timer",
    label: "Focus",
    icon: (
      <svg className={styles.tabIcon} viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 4.5v2.7l1.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/timeline",
    label: "Timeline",
    icon: (
      <svg className={styles.tabIcon} viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10M2 4h6M2 10h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: (
      <svg className={styles.tabIcon} viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
] as const;

export default function NavBar() {
  const pathname = usePathname();
  const router   = useRouter();
  const { profile, user } = useAuth();

  const handleSignOut = async () => {
    await signOutUser();
    router.replace("/login");
  };

  // Get initials for avatar fallback
  const initials = profile?.displayName
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "?";

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.inner}>

        {/* Logo */}
        <Link href="/timer" className={styles.logoLink} aria-label="Chantmay home">
          <svg className={styles.logoIcon} viewBox="0 0 22 22" fill="none">
            <path d="M11 20V11" stroke="#4a9e78" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M11 13 L7 9" stroke="#4a9e78" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M11 16 L6 13" stroke="#4a9e78" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M11 13 L15 9" stroke="#4a9e78" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M11 16 L16 13" stroke="#4a9e78" strokeWidth="1.2" strokeLinecap="round"/>
            <circle cx="11" cy="6" r="3" fill="#4a9e78" opacity="0.85"/>
          </svg>
          Chantmay
        </Link>

        {/* Tabs */}
        <div className={styles.tabs} role="tablist">
          {NAV_TABS.map(({ href, label, icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                role="tab"
                aria-selected={isActive}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                id={`nav-tab-${label.toLowerCase()}`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Avatar / sign-out */}
        <button
          className={styles.avatarBtn}
          onClick={handleSignOut}
          title="Sign out"
          id="nav-signout-btn"
          aria-label="Sign out"
        >
          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt={profile?.displayName ?? "User"}
              width={34}
              height={34}
              className={styles.avatarImg}
            />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
        </button>

      </div>
    </nav>
  );
}
