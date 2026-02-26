import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";
import { type Metadata, type Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "~/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://faluciano.com"),
  title: "Felix Luciano - Software Engineer",
  description:
    "Felix Luciano is a Software Engineer at Microsoft building full-stack web and mobile applications with TypeScript, React, React Native, Go, and Kotlin.",
  keywords: [
    "Felix Luciano",
    "Felix Luciano Salomon",
    "Software Engineer",
    "Microsoft",
    "Full Stack Developer",
    "Mobile Developer",
    "TypeScript Developer",
    "React Developer",
    "React Native",
    "Next.js Developer",
    "Go Developer",
    "Kotlin Developer",
    "Seattle",
    "Web Developer",
    "JavaScript",
    "Python",
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>",
  },
  openGraph: {
    siteName: "Felix Luciano",
    title: "Felix Luciano - Software Engineer",
    description:
      "Felix Luciano is a Software Engineer at Microsoft building full-stack web and mobile applications with TypeScript, React, React Native, Go, and Kotlin.",
    url: "https://faluciano.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felix Luciano - Software Engineer",
    description:
      "Software Engineer at Microsoft building full-stack web and mobile applications with TypeScript, React, React Native, Go, and Kotlin.",
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Felix Luciano",
              url: "https://faluciano.com",
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Microsoft",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "New Jersey Institute of Technology",
              },
              sameAs: [
                "https://github.com/faluciano",
                "https://www.linkedin.com/in/faluciano/",
                "https://twitter.com/picapollo821",
              ],
              knowsAbout: [
                "TypeScript",
                "React",
                "React Native",
                "Go",
                "Kotlin",
                "Next.js",
                "Python",
              ],
            }),
          }}
        />
        <a
          href="#main-content"
          className="fixed top-0 left-0 z-[100] -translate-y-full bg-[rgb(var(--color-accent))] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
