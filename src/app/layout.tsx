import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Merriweather } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ring Matters Now",
    template: "%s | Ring Matters Now",
  },
  description:
    "Your source for the latest stories, trends, and insights that matter.",
  metadataBase: new URL("https://ringmattersnow.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ring Matters Now",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Script
          src="https://jsc.adskeeper.com/site/1056058.js"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}
