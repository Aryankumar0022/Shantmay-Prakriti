"use client";
// app/login/page.tsx — Google Sign-in page
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle } from "@/lib/auth";
import styles from "./LoginPage.module.css";

// Inline SVG: minimalist tree logo
function TreeLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 56 L32 32" stroke="#4a9e78" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 32 L20 22" stroke="#4a9e78" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 38 L18 30" stroke="#4a9e78" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 32 L44 22" stroke="#4a9e78" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 38 L46 30" stroke="#4a9e78" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="32" cy="18" r="6" fill="#4a9e78" opacity="0.9"/>
      <circle cx="18" cy="18" r="4" fill="#4a9e78" opacity="0.7"/>
      <circle cx="46" cy="18" r="4" fill="#4a9e78" opacity="0.7"/>
      <circle cx="13" cy="28" r="3" fill="#4a9e78" opacity="0.5"/>
      <circle cx="51" cy="28" r="3" fill="#4a9e78" opacity="0.5"/>
    </svg>
  );
}

// Google's official "G" logo SVG
function GoogleIcon() {
  return (
    <svg className={styles.googleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) router.replace("/timer");
  }, [user, loading, router]);

  const handleSignIn = async () => {
    setError(null);
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      router.replace("/timer");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sign-in failed. Please try again.";
      // Ignore popup-closed-by-user
      if (!msg.includes("popup-closed")) setError(msg);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <TreeLogo />
        <h1 className={styles.title}>Chantmay</h1>
        <p className={styles.subtitle}>
          A calm space to focus, grow, and tend your forest — one session at a time.
        </p>

        <button
          className={styles.googleBtn}
          onClick={handleSignIn}
          disabled={isSigningIn || loading}
          id="google-signin-btn"
        >
          <GoogleIcon />
          {isSigningIn ? "Signing in…" : "Continue with Google"}
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.footer}>
          By continuing you agree to our terms. Your focus sessions are private.
        </p>
      </div>
    </main>
  );
}
