import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { ToastProvider } from "@/components/ui/Toast";
import { SITE_URL } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // The custom domain is the canonical origin of the site.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Islam Abusleem — Senior Full-Stack Engineer",
    template: "%s — Islam Abusleem",
  },
  description:
    "Senior full-stack engineer building distributed systems, backend services and interfaces that hold up in production. Next.js, NestJS, PostgreSQL.",
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
    title: "Islam Abusleem — Senior Full-Stack Engineer",
    description:
      "Senior full-stack engineer building distributed systems, backend services and interfaces that hold up in production.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Islam Abusleem — Senior Full-Stack Engineer",
    description:
      "Senior full-stack engineer building distributed systems, backend services and interfaces that hold up in production.",
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
      className={`dark ${archivo.variable} ${geistMono.variable} h-full antialiased`}
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
