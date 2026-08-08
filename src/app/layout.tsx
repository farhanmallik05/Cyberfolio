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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Neural Architect | Farhan Mallik",
  description:
    "AI & Automation Developer Portfolio of Farhan Mallik — Engineering intelligent systems, advanced automation frameworks, and high-performance digital solutions.",
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
      "AI & Automation Developer Portfolio of Farhan Mallik — Engineering intelligent systems, advanced automation frameworks, and high-performance digital solutions.",
    type: "website",
  },
};

import { RoleProvider } from "@/context/RoleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { RoleBadge } from "@/components/RoleBadge";
import { ThemeHUD } from "@/components/ThemeHUD";
import { AIChatWidget } from "@/components/AIChatWidget";
import { ContactEscapeHatch } from "@/components/ui/ContactEscapeHatch";
import { SystemGlitch } from "@/components/ui/SystemGlitch";
import { GoogleAnalytics } from "@next/third-parties/google";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Farhan Mallik",
              "jobTitle": "Full Stack Developer & AI Engineer",
              "url": "https://farhanmallik.netlify.app",
              "sameAs": [
                "https://github.com/farhanmallik05",
                "https://twitter.com/farhanmallik05",
                "https://linkedin.com/in/farhanmallik05"
              ],
              "description": "AI & Automation Developer Portfolio of Farhan Mallik — Engineering intelligent systems, advanced automation frameworks, and high-performance digital solutions."
            })
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
              <AIChatWidget />
              <ContactEscapeHatch />
              <SystemGlitch />

            </div>
          </RoleProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
    </html>
  );
}
