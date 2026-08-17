import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simulatore RAL netto 2026 | Prototipo Product Builder",
  description:
    "Simulazione annualizzata non ufficiale del netto da RAL per il 2026, pensata per spiegare contributi, imposte e detrazioni.",
  openGraph: {
    title: "Simulatore RAL netto 2026 | Prototipo Product Builder",
    description:
      "Calcola il netto annuale e mensile medio di una RAL 2026 con un breakdown chiaro di contributi, imposte e detrazioni.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
