import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "@fontsource-variable/oswald";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Verde — A little space. A lot of life.",
  description:
    "An autonomous, closed-loop vertical growing system. Four tiers, twenty plants, sensor-driven irrigation and cloud telemetry.",
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
    title: "Project Verde — A little space. A lot of life.",
    description:
      "An autonomous, closed-loop vertical growing system. Four tiers, twenty plants, sensor-driven irrigation.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#e9ebe8",
  colorScheme: "light",
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
