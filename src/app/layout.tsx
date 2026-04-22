import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const brico = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "TORQ | CULTURE IN MOTION",
  description: "The digital home for movement subcultures. Events, archives, and stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${brico.variable} antialiased selection:bg-torq-accent selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
