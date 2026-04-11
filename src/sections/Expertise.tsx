/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link"; // Using Link instead of useRouter to protect GSAP
import ContactModal from "@/components/Contact"; // Adjust import path if needed

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// 1. DATA
// ==========================================
const servicesList = [
  {
    id: 1,
    title: "Digital & Social Media",
    subtitle: "Growth & Engagement",
    img: "/expert/digital.gif",
    route: "/digital",
  },
  {
    id: 2,
    title: "Brand Strategy",
    subtitle: "Identity & Vision",
    img: "/expert/brand.gif",
    route: "/brand",
  },
  {
    id: 3,
    title: "Event & Experiential Marketing",
    subtitle: "Activations & Live",
    img: "/expert/event.gif",
    route: "/event",
  },
  {
    id: 4,
    title: "Guerrilla Marketing",
    subtitle: "Impact & Reach",
    img: "/expert/outdoor.gif",
    route: "/outdoor",
  },
  {
    id: 5,
    title: "Influencer Marketing",
    subtitle: "Network & Trust",
    img: "/expert/influencer.gif",
    route: "/influencer",
  },
  {
    id: 6,
    title: "Business Branding",
    subtitle: "Authority & Presence",
    img: "/expert/business.gif",
    route: "/business",
  },
  {
    id: 7,
    title: "Podcast Marketing",
    subtitle: "Visibility",
    img: "/expert/podcast.gif",
    route: "/podcast",
  },
];

// ==========================================
// 2. TITLE COMPONENT
// ==========================================
const ExpertiseTitle = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // 1. "Discover" slides up
      tl.fromTo(
        ".title-discover",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );

      // 2. "Our Core" box expands horizontally between the words
      tl.fromTo(
        ".core-box",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.4",
      );

      // 3. "Expertise" slides up
      tl.fromTo(
        ".title-expertise",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.2",
      );

      // 4. Subtext and indicators fade in
      tl.fromTo(
        ".sub-element",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4",
      );

      // 5. Draw the little scroll line
      tl.fromTo(
        ".scroll-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-center items-start h-full w-full px-6 md:px-12 lg:px-20 py-12 lg:py-0"
    >
      <section id="services"></section>
      {/* Main Headline Block */}
      <div className="flex flex-col w-full leading-[0.85]">
        {/* TOP WORD: Discover */}
        <div className="overflow-hidden pb-1 md:pb-2">
          <h1 className="title-discover text-black font-display text-[12vw] md:text-7xl lg:text-7xl font-black uppercase">
            Discover
          </h1>
          <br />
          <h1 className="title-discover text-black font-display text-[12vw] md:text-7xl lg:text-7xl font-black uppercase">
            Our Core
          </h1>
        </div>

        {/* BOTTOM WORD: Expertise */}
        <div className="overflow-hidden pb-3">
          <h1 className="title-expertise text-transparent [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:3px_black] font-display text-[13vw] md:text-7xl lg:text-7xl font-black uppercase">
            Expertise
          </h1>
        </div>
      </div>

      {/* Subtext */}
      <p className="sub-element mt-4 md:mt-8 max-w-70 md:max-w-sm text-sm md:text-lg font-medium tracking-wide text-neutral-600 leading-relaxed">
        We engineer high-impact strategies, turning digital presence into
        undeniable brand authority.
      </p>

      {/* Scroll/Swipe Indicator */}
      <div className="sub-element mt-8 md:mt-12 flex items-center gap-4">
        <div className="scroll-line w-12 md:w-16 h-0.5 bg-black"></div>
        <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold text-black">
          <span className="lg:hidden">Swipe to explore</span>
          <span className="hidden lg:inline">Scroll to explore</span>
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 3. SLIDER COMPONENT
// ==========================================
const ExpertiseSlider = ({
  onContactClick,
}: {
  onContactClick: () => void;
}) => {
  return (
    <div className="h-full w-full flex items-center">
      <div className="expertise-slider-content flex gap-4 md:gap-8 pl-6 md:pl-10 pr-6 md:pr-[10vw] items-center h-full w-full lg:w-max overflow-x-auto lg:overflow-visible py-4 md:py-0 no-scrollbar">
        {servicesList.map((service) => (
          <Link
            key={service.id}
            href={service.route}
            className="relative flex-none group overflow-hidden border border-neutral-200 bg-neutral-100 cursor-pointer block
                       w-[85vw] md:w-[45vw] lg:w-[28vw] 
                       h-[60vh] md:h-[60vh] lg:h-[70vh] rounded-sm shadow-md"
          >
            {/* Image Container */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover  transition-all duration-700 ease-in-out scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-90" />
            </div>

            {/* Card Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end h-full">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-neutral-400 font-mono text-xs md:text-sm uppercase tracking-widest mb-2">
                  {service.subtitle}
                </p>
                <h3 className="text-2xl md:text-4xl font-display font-bold text-white uppercase leading-none">
                  {service.title}
                </h3>
              </div>

              <div className="w-full h-0.5 bg-white mt-4 md:mt-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </Link>
        ))}

        {/* Spacer to prevent Safari/Webkit flex scroll bugs from cutting off right padding */}
        <div className="w-[1px] md:w-[5vw] lg:w-0 shrink-0" />
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN EXPORTED SECTION
// ==========================================
const ExpertiseSection = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  // Modal State Added Here
  const [isContactOpen, setIsContactOpen] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // --- DESKTOP ANIMATION (Horizontal Scroll) ---
      mm.add("(min-width: 1024px)", () => {
        const sliderContent = document.querySelector(
          ".expertise-slider-content",
        ) as HTMLElement | null;
        const sliderWrapper = document.querySelector(
          ".expertise-slider-wrapper",
        ) as HTMLElement | null;

        if (!sliderContent || !sliderWrapper) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${sliderContent.scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(sliderContent, {
          x: () => -(sliderContent.scrollWidth - sliderWrapper.clientWidth),
          ease: "none",
        });

        tl.to(
          ".expertise-title-wrapper",
          {
            x: -50,
            opacity: 0.8,
            ease: "none",
          },
          0,
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={triggerRef} className="bg-[#F9F9F9]">
      <section
        ref={sectionRef}
        className="expertise-section overflow-hidden bg-[#F9F9F9] relative h-auto min-h-screen lg:h-screen w-full"
      >
        {/* --- FILM GRAIN / STATIC NOISE OVERLAY --- */}
        <div
          className="pointer-events-none absolute inset-0 z-50 opacity-[0.2] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="h-full w-full flex lg:flex-row flex-col items-center relative z-10">
          {/* LEFT: Title Area */}
          <div className="expertise-title-wrapper w-full lg:w-[40%] flex-none h-auto lg:h-full flex items-center justify-start z-20 bg-[#F9F9F9] border-r-2 border-transparent lg:border-black/5 relative lg:py-0">
            <ExpertiseTitle />
          </div>

          {/* RIGHT: Slider Area */}
          <div className="expertise-slider-wrapper w-full lg:w-auto h-auto lg:h-full flex-1 overflow-hidden relative z-10 pb-12 lg:pb-0 pt-4 lg:pt-0">
            {/* Pass the click handler to the slider */}
            <ExpertiseSlider onContactClick={() => setIsContactOpen(true)} />
          </div>
        </div>
      </section>

      {/* --- CONTACT MODAL INTEGRATION --- */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default ExpertiseSection;
