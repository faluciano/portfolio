import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type Metadata, type Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Felix Luciano - Software Engineer",
  description: "Felix Luciano - Software Engineer Portfolio",
  keywords: [
    "Felix Luciano",
    "Felix Luciano Salomon",
    "Felix Luciano Portfolio",
    "Felix Luciano Resume",
    "Felix Luciano Projects",
    "Felix Luciano Skills",
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Python Developer",
    "React Developer",
    "Next.js Developer",
    "NJIT",
    "New Jersey Institute of Technology",
    "AWS",
  ],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>',
  },
  openGraph: {
    siteName: "Felix Luciano",
    title: "Felix Luciano - Software Engineer",
    description: "Felix Luciano - Software Engineer Portfolio",
    url: "https://faluciano.com",
  },
  alternates: {
    canonical: "https://faluciano.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html >
  );
}