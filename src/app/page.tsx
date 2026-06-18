import { Metadata } from "next";
import { getSeoConfig } from "@/lib/seo";
import HeroSection from "@/sections/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/sections/About";
import ContactSection from "@/sections/ConatctUs";
import ExpertiseSection from "@/sections/Expertise";
import Footer from "@/sections/Footer";
import TeamSection from "@/sections/Team";
import TrustedBy from "@/sections/TrustedBy";
import ManifestoSection from "@/sections/Why";
import WorkflowSection from "@/sections/WorkflowSec";

// Generate Page-specific Metadata dynamically from the central SEO dashboard
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoConfig("/");
  
  if (!seo) {
    return {}; // Falls back to layout.tsx defaults if API is offline
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonicalUrl || "https://www.gotofriend.in",
    },
    robots: seo.robots,
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      url: "https://www.gotofriend.in",
      type: "website",
    },
    twitter: {
      card: (seo.twitterCard || "summary_large_image") as any,
      title: seo.twitterTitle || seo.title,
      description: seo.twitterDescription || seo.description,
      images: seo.twitterImage ? [seo.twitterImage] : [],
    },
  };
}

export default async function Home() {
  // Fetch SEO data (specifically to extract dynamic structured Schema JSON-LD)
  const seo = await getSeoConfig("/");

  return (
    <>
      {/* Inject Structured Data Schema if configured in the admin dashboard */}
      {seo?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.schemaMarkup }}
        />
      )}
      
      <Navbar />
      <HeroSection />
      <TrustedBy />
      <ExpertiseSection />
      <ManifestoSection />
      <AboutSection />
      <TeamSection />
      <WorkflowSection />
      <ContactSection />
      <Footer />
    </>
  );
}
