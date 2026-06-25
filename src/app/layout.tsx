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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://farhanmallik.netlify.app"),
  title: {
    default: "Farhan Mallik | Neural Architect | AI & Automation Developer",
    template: "%s | Farhan Mallik"
  },
  description:
    "AI & Automation Developer Portfolio of Farhan Mallik. Specializing in intelligent systems, automation frameworks, full-stack Next.js web applications, and advanced digital solutions.",
  keywords: [
    "Farhan Mallik",
    "Neural Architect",
    "AI Developer",
    "Automation Engineer",
    "Next.js Developer",
    "React Developer",
    "Full Stack Developer",
    "Software Engineer Portfolio",
    "Supabase",
    "Machine Learning"
  ],
  authors: [{ name: "Farhan Mallik", url: "https://farhanmallik.netlify.app" }],
  creator: "Farhan Mallik",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://farhanmallik.netlify.app",
    title: "Farhan Mallik | Neural Architect",
    description:
      "AI & Automation Developer Portfolio. Architecting the future with intelligent systems, full-stack Next.js applications, and automation frameworks.",
    siteName: "Farhan Mallik Portfolio",
    images: [{
      url: "/og-image.jpg", // Assuming there is or will be an og-image
      width: 1200,
      height: 630,
      alt: "Farhan Mallik - AI & Automation Developer"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhan Mallik | Neural Architect",
    description: "AI & Automation Developer Portfolio. Engineering intelligent systems and automation frameworks.",
    creator: "@farhanmallik05", // From sameAs
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { RoleProvider } from "@/context/RoleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { RoleBadge } from "@/components/RoleBadge";
import { ThemeHUD } from "@/components/ThemeHUD";
import { AIChatWidget } from "@/components/AIChatWidget";
import { ContactEscapeHatch } from "@/components/ui/ContactEscapeHatch";
import { SystemGlitch } from "@/components/ui/SystemGlitch";



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
              "description": "AI & Automation Developer Portfolio of Farhan Mallik — Engineering intelligent systems, automation frameworks & advanced digital solutions."
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
    </html>
  );
}
