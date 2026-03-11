import HeroLoader from "@/components/HeroLoader";
import Navbar from "@/components/Navbar";
import AboutSection from "@/sections/About";
import ContactSection from "@/sections/ConatctUs";
import ExpertiseSection from "@/sections/Expertise";
import Footer from "@/sections/Footer";
import TeamSection from "@/sections/Team";
import TrustedBy from "@/sections/TrustedBy";
import ManifestoSection from "@/sections/Why";
import WorkflowSection from "@/sections/WorkflowSec";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroLoader />
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
