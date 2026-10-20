import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { ToastProvider } from "@/components/ui/Toast";
import { SITE_URL } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // The custom domain is the canonical origin of the site.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Islam Abusleem — Senior Software Engineer, Frontend & Backend",
    template: "%s — Islam Abusleem",
  },
  description:
    "Senior Software Engineer with 8+ years of experience building scalable web applications, frontend platforms, backend services and APIs across fintech, government, healthcare, transportation and e-commerce.",
  applicationName: "Islam Abusleem",
  authors: [{ name: "Islam Abusleem", url: "https://github.com/islamAbuSleem" }],
  creator: "Islam Abusleem",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Islam Abusleem",
    title: "Islam Abusleem — Senior Software Engineer, Frontend & Backend",
    description:
      "Senior Software Engineer with 8+ years of experience building scalable web applications, frontend platforms, backend services and APIs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Islam Abusleem — Senior Software Engineer, Frontend & Backend",
    description:
      "Senior Software Engineer with 8+ years of experience building scalable web applications, frontend platforms, backend services and APIs.",
  },
  robots: { index: true, follow: true },
};

/**
 * Runs before React hydrates to apply the saved theme without a flash.
 * Dark is the default, so the server renders the dark class and this script
 * only has to intervene when the visitor has explicitly chosen light.
 */
const themeInitScript = `(function() {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || "dark";
    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geist.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
