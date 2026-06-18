import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { getControlPanelApi } from "@/lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default Static Metadata fallback (if Control Panel is offline during build-time)
const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL("https://www.gotofriend.in"),
  title: "Go-To Friend | Experiential Marketing & Strategy",
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
    apple: "/logos/gotologo.png",
  },
  openGraph: {
    title: "Go-To Friend | Experiential Marketing & Strategy",
    description: "Visibility, Creativity, and Strategy perfectly engineered for your brand.",
    url: "https://www.gotofriend.in",
    siteName: "Go-To Friend",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Go-To Friend | Experiential Marketing",
    description: "Visibility, Creativity, and Strategy perfectly engineered for your brand.",
  },
  alternates: {
    canonical: "/",
  },
};

// Export static fallback metadata so Next.js renders it by default
export const metadata = DEFAULT_METADATA;

// Fetch site-wide tracking settings from Control Panel
async function getTrackerConfig() {
  const CONTROL_PANEL_API = getControlPanelApi();
  try {
    const res = await fetch(`${CONTROL_PANEL_API}/tracker-config?siteId=gotolatest`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[SEO] Failed to fetch tracker configuration. Using local defaults.');
  }
  return null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tracker = await getTrackerConfig();

  return (
    <html lang="en">
      <head>
        {/* Inject Google Search Console verification meta tag */}
        {tracker?.searchConsoleTag && (
          <span dangerouslySetInnerHTML={{ __html: tracker.searchConsoleTag }} />
        )}

        {/* Inject custom raw head scripts (Hotjar, Tag Manager, styles, etc.) */}
        {tracker?.headerScripts && (
          <span dangerouslySetInnerHTML={{ __html: tracker.headerScripts }} />
        )}

        {/* Inject Google Analytics (GA4) scripts */}
        {tracker?.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${tracker.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${tracker.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}

        {/* Inject Meta (Facebook) Pixel script */}
        {tracker?.metaPixelId && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${tracker.metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* Inject custom raw footer scripts (like chat widgets, popups, etc.) */}
        {tracker?.footerScripts && (
          <span dangerouslySetInnerHTML={{ __html: tracker.footerScripts }} />
        )}
      </body>
    </html>
  );
}
