// app/layout.tsx — Root layout: providers, fonts, metadata
import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Chantmay — Focus Timer",
  description: "A calm, minimalist focus timer to help you grow, one session at a time.",
  keywords: ["focus timer", "pomodoro", "productivity", "mindfulness"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
