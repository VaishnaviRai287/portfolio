import "../global.css";
import { Inter, Inter_Tight, JetBrains_Mono } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Vaishnavi Rai | Systems & ML Portfolio",
    template: "%s | Vaishnavi Rai",
  },
  description: "Building intelligent systems for machine learning, data infrastructure, and software engineering.",
  openGraph: {
    title: "Vaishnavi Rai | Systems & ML Portfolio",
    description:
      "Building intelligent systems for machine learning, data infrastructure, and software engineering.",
    url: "https://vaishnavirai.dev",
    siteName: "Vaishnavi Rai Portfolio",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, interTight.variable, jetbrainsMono.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-[#FAF8F3] text-[#111111] font-sans selection:bg-[#E7E2D8] selection:text-[#111111] ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
