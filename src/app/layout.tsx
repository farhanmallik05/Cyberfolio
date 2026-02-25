import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import { BootSequence } from "@/components/BootSequence";
import { Navbar } from "@/components/Navbar";
import { PageLoadingBar } from "@/components/PageLoadingBar";
import { Footer } from "@/components/Footer";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Neural Architect | Farhan Mallik",
  description:
    "AI & Automation Developer Portfolio of Farhan Mallik — Engineering intelligent systems, automation frameworks & advanced digital solutions.",
  keywords: [
    "Farhan Mallik",
    "AI Developer",
    "Automation",
    "Next.js",
    "Portfolio",
    "Full Stack Developer",
  ],
  authors: [{ name: "Farhan Mallik" }],
  openGraph: {
    title: "Neural Architect | Farhan Mallik",
    description:
      "AI & Automation Developer Portfolio — Architecting the future, one protocol at a time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${orbitron.variable} ${inter.variable} antialiased bg-cyber-base text-foreground min-h-screen`}
      >
        <BootSequence>
          <PageLoadingBar />
          <Navbar />
          {children}
          <Footer />
        </BootSequence>
      </body>
    </html>
  );
}
