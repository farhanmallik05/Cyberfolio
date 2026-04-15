import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import { BootSequence } from "@/components/BootSequence";
import { Navbar } from "@/components/Navbar";
import { PageLoadingBar } from "@/components/PageLoadingBar";
import { Footer } from "@/components/Footer";
import { BackgroundSystem } from "@/components/BackgroundSystem";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

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

import { RoleProvider } from "@/context/RoleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { RoleBadge } from "@/components/RoleBadge";
import { ThemeHUD } from "@/components/ThemeHUD";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('na-theme');
                  if (stored && stored !== 'cyber') {
                    document.documentElement.setAttribute('data-theme', stored);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          <RoleProvider>
            <div className={`${orbitron.variable} ${inter.variable} antialiased text-foreground min-h-screen relative flex flex-col`}>
              <Cursor />
              <ScrollProgress />
              <BackgroundSystem />
              <BootSequence>
                <PageLoadingBar />
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </BootSequence>
              <RoleBadge />
              <ThemeHUD />
            </div>
          </RoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
