import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "@fontsource-variable/oswald";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Project Verde — We grow the future.",
    template: "%s · Project Verde",
  },
  description:
    "An autonomous, closed-loop vertical growing system. Four tiers, twenty growing sites, on-device AI and 95% less water than soil.",
  applicationName: "Project Verde",
  creator: "Anuj Phulera",
  keywords: [
    "Project Verde",
    "vertical farming",
    "hydroponics",
    "IoT",
    "ESP8266",
    "Firebase",
    "smart irrigation",
  ],
  authors: [{ name: "Anuj Phulera" }, { name: "Aarav Choudhary" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Project Verde — We grow the future.",
    description:
      "An autonomous, closed-loop vertical growing system. Four tiers, twenty growing sites, on-device AI and 95% less water than soil.",
    url: SITE,
    siteName: "Project Verde",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Verde — We grow the future.",
    description:
      "Four tiers, twenty growing sites, on-device AI and 95% less water than soil.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
