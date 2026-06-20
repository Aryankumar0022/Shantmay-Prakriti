// app/page.tsx — Root route: redirect to /timer (authenticated) or /login
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(user ? "/timer" : "/login");
  }, [user, loading, router]);

  return null; // Nothing rendered — immediate redirect
}
