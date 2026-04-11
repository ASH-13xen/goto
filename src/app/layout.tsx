import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  // Replace this with your actual production domain
  metadataBase: new URL("https://www.gotofriend.in"),

  title: {
    default: "Go-To Friend | Experiential Marketing & Strategy",
    template: "%s | Go-To Friend", // Automatically appends the brand name to subpages
  },
  description:
    "Visibility, Creativity, and Strategy perfectly engineered for your brand. Your premium marketing and experiential hub in Raipur.",
  keywords: [
    "marketing agency Raipur",
    "experiential marketing",
    "brand strategy",
    "event management Raipur",
    "creative agency",
    "Go-To Friend",
  ],
  icons: {
    icon: "/logos/gotologo.png",
    apple: "/logos/gotologo.png", // Good for iOS home screen bookmarks
  },

  // Open Graph for LinkedIn, Facebook, iMessage
  openGraph: {
    title: "Go-To Friend | Experiential Marketing & Strategy",
    description:
      "Visibility, Creativity, and Strategy perfectly engineered for your brand.",
    url: "https://www.gotofriend.com",
    siteName: "Go-To Friend",
    images: [
      {
        url: "/og-image.jpg", // Create an 1200x630 image and put it in your public folder
        width: 1200,
        height: 630,
        alt: "Go-To Friend Brand Image",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // Twitter Cards for X sharing
  twitter: {
    card: "summary_large_image",
    title: "Go-To Friend | Experiential Marketing",
    description:
      "Visibility, Creativity, and Strategy perfectly engineered for your brand.",
    images: ["/og-image.jpg"], // Uses the same image as above
  },

  // Tells search engines the primary URL to prevent duplicate content issues
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
