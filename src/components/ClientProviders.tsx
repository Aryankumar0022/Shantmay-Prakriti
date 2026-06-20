"use client";
// components/ClientProviders.tsx
// This is a Client Component, so dynamic() with ssr:false is allowed here.
// It acts as the boundary between the Server Root Layout and all client-side context.
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const AuthProvider = dynamic(
  () => import("@/context/AuthContext").then((mod) => mod.AuthProvider),
  {
    ssr: false,
    // Show nothing while the auth provider loads — avoids flash of unauthenticated state
    loading: () => null,
  }
);

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
