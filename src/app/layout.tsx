import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kamfe Smile Care Lab",
    template: "%s | Kamfe Smile Care Lab",
  },
  description:
    "Kamfe Smile Care Lab provides digital clear aligner workflows, restorative precision, and modern dental lab services.",
  metadataBase: new URL("https://www.kamfesmilecarelab.com"),
  openGraph: {
    title: "Kamfe Smile Care Lab",
    description:
      "Modern clear aligner and digital dental lab solutions built on precision, quality, and clinical collaboration.",
    siteName: "Kamfe Smile Care Lab",
    type: "website",
  },
  icons: {
    icon: "/images/branding/kamfe-smile-care-lab-mark.svg",
    shortcut: "/images/branding/kamfe-smile-care-lab-mark.svg",
    apple: "/images/branding/kamfe-smile-care-lab-mark.svg",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-white text-slate-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
