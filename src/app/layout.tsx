import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jet HR Net Salary Calculator Prototype",
  description: "Unofficial prototype created for the Jet HR Product Builder technical task.",
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
