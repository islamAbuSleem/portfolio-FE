import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { ToastProvider } from "@/components/ui/Toast";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // The custom domain is the canonical origin of the site.
  metadataBase: new URL(SITE_URL),
  title: "Kinetic Syntax — Full-Stack Developer Portfolio",
  description:
    "Senior Full-Stack Engineer specializing in high-performance distributed systems and immersive frontend architectures.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Kinetic Syntax",
    title: "Kinetic Syntax — Full-Stack Developer Portfolio",
    description:
      "Senior Full-Stack Engineer specializing in high-performance distributed systems and immersive frontend architectures.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetic Syntax — Full-Stack Developer Portfolio",
    description:
      "Senior Full-Stack Engineer specializing in high-performance distributed systems and immersive frontend architectures.",
  },
};

// Runs before React hydrates to prevent flash-of-wrong-theme. Duplicates the
// logic in ThemeProvider, which is required because the provider's useState
// initializer runs only on the client.
const themeInitScript = `(function() {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text" suppressHydrationWarning>
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
