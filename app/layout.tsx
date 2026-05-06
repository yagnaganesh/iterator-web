import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
