import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iterator | Lifestyle booking made effortless",
  description:
    "Iterator is a colorful lifestyle booking app for discovering stays, wellness, dining, events, and curated city experiences.",
  applicationName: "Iterator",
  keywords: ["Iterator", "lifestyle booking", "wellness booking", "event booking", "travel experiences"],
  openGraph: {
    title: "Iterator | Lifestyle booking made effortless",
    description:
      "Book the stays, tables, wellness sessions, events, and experiences that make a week feel designed.",
    type: "website",
    url: "https://iteratorworld.com",
    siteName: "Iterator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iterator | Lifestyle booking made effortless",
    description:
      "A colorful lifestyle booking app for curated escapes, rituals, tables, and events.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

