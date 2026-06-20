"use client";
// components/nav/AppShell.tsx
// Wraps authenticated pages: guards auth, shows NavBar, redirects to login if needed.
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "./NavBar";
import styles from "./AppShell.module.css";

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  // Show nothing while auth resolves (avoids flash of protected content)
  if (loading || !user) return null;

  return (
    <div className={styles.shell}>
      <NavBar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
