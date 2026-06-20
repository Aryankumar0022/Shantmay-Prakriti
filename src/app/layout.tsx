// app/layout.tsx — Root layout (Server Component)
import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Chantmay — Focus Timer",
  description: "A calm, minimalist focus timer to help you grow, one session at a time.",
  keywords: ["focus timer", "pomodoro", "productivity", "mindfulness"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
