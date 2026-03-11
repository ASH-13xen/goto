"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactModal from "@/components/Contact";
import Navbar2 from "@/components/Navbar2"; // Updated to match your standard modal import

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Replaced eventPhotos with a flexible media array (exactly 3 items)
const flashbackMedia = [
  {
    type: "video",
    src: "/events/vid1.mp4",
  },
  {
    type: "video",
    src: "/events/vid2.mp4",
  },
  {
    type: "video",
    src: "/events/vid3.mp4",
  },
];

export default function InfluencerPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Mouse Spotlight Tracker for Hero
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  useGSAP(
    () => {
      // Hero text reveal
      gsap.fromTo(
        ".hero-text",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // 2. The Slot Machine Matchmaker
      ScrollTrigger.create({
        trigger: ".match-section",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
        animation: gsap
          .timeline()
          .to(".slot-column-1", { yPercent: -60, ease: "none" }, 0)
          .to(".slot-column-2", { yPercent: -60, ease: "none" }, 0),
      });

      // 3. Infinite Vertical Marquee (The Roster)
      const marqueeSpeed = 25;
      gsap.to(".marquee-up", {
        yPercent: -50,
        repeat: -1,
        duration: marqueeSpeed,
        ease: "none",
      });
      gsap.to(".marquee-down", {
        yPercent: 50,
        repeat: -1,
        duration: marqueeSpeed,
        ease: "none",
      });

      // Hover to pause logic
      const marquees = gsap.utils.toArray(".marquee-track");
      marquees.forEach((track: any) => {
        track.addEventListener("mouseenter", () => gsap.globalTimeline.pause());
        track.addEventListener("mouseleave", () => gsap.globalTimeline.play());
      });

      // 4. The Event Flash & Parallax
      const eventTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".event-section",
          start: "top 60%",
          end: "bottom top",
          scrub: 1,
        },
      });

      // The Camera Flash
      gsap.fromTo(
        ".flash-overlay",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".event-section", start: "top 70%" },
        },
      );

      // Parallax Photos
      gsap.utils.toArray(".parallax-photo").forEach((photo: any, i) => {
        const speed = i % 2 === 0 ? -100 : -200;
        eventTl.to(photo, { y: speed, rotationZ: i % 2 === 0 ? 10 : -10 }, 0);
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen font-sans w-full overflow-clip"
    >
      {/* --- 1. HERO SECTION (KINETIC TYPOGRAPHY) --- */}
      <section
        onMouseMove={handleMouseMove}
        className="relative w-full h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black"
      >
        <Navbar2 />
        {/* PURE CSS BACKGROUND: No files needed. Guaranteed to show up. */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-4 md:gap-8 opacity-[0.06] pointer-events-none select-none overflow-hidden">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            <span className="text-[20vw] md:text-[12vw] font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_white] pr-8">
              COMMAND THE CULTURE // COMMAND THE CULTURE // COMMAND THE CULTURE
              // COMMAND THE CULTURE //
            </span>
          </div>
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite_reverse] ml-[-50vw]">
            <span className="text-[20vw] md:text-[12vw] font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_white] pr-8">
              THE NETWORK IS WATCHING // THE NETWORK IS WATCHING // THE NETWORK
              IS WATCHING // THE NETWORK IS WATCHING //
            </span>
          </div>
          <div className="flex whitespace-nowrap animate-[marquee_22s_linear_infinite]">
            <span className="text-[20vw] md:text-[12vw] font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_white] pr-8">
              INFLUENCE IS CURRENCY // INFLUENCE IS CURRENCY // INFLUENCE IS
              CURRENCY // INFLUENCE IS CURRENCY //
            </span>
          </div>
        </div>

        {/* Dynamic Spotlight Background */}
        <div
          className="absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none mix-blend-screen"
          style={{
            background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 80%)`,
          }}
        />

        <div className="relative z-20 max-w-5xl pointer-events-none">
          <p className="hero-text text-neutral-500 tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 font-bold">
            The Network //
          </p>
          <h1 className="hero-text text-[14vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter">
            Don't just reach
            <br className="md:hidden" /> an audience.
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:3px_white]">
              Command One.
            </span>
          </h1>
          <p className="hero-text mt-8 text-base md:text-xl text-neutral-400 max-w-2xl mx-auto font-light">
            We hold the keys to the culture. Direct access to the voices your
            audience already trusts.
          </p>
        </div>

        {/* Required keyframes for the background scrolling */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>
      {/* --- 2. WHY INFLUENCER MARKETING --- */}
      <section className="relative w-full py-24 md:py-40 px-6 bg-[#050505] border-t border-neutral-900 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-8">
            The Reality Check //
          </p>
          <h2 className="text-[10vw] md:text-[5vw] font-black uppercase leading-[1.1] tracking-tighter mb-8 text-white">
            Ads are blocked. <br className="hidden md:block" />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
              People are trusted.
            </span>
          </h2>
          <p className="text-base md:text-2xl text-neutral-400 font-light leading-relaxed">
            Consumers don't buy products; they buy identities. When a trusted
            voice authenticates your brand, you bypass the friction of
            traditional advertising. We engineer these organic intersections at
            scale.
          </p>
        </div>
      </section>

      {/* --- 3. THE EVENT (FLASH PARALLAX) --- */}
      <section className="event-section relative w-full min-h-[150vh] bg-neutral-900 overflow-hidden flex flex-col items-center py-32 border-t border-white/5">
        {/* The Flash Bang */}
        <div className="flash-overlay absolute inset-0 bg-white z-50 pointer-events-none opacity-0" />

        <div className="relative z-20 text-center px-4 mix-blend-difference mb-20 md:mb-64">
          <h2 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter text-white">
            We don't just <br className="md:hidden" /> DM them.
            <br />
            We bring them <br className="md:hidden" /> together.
          </h2>
          <p className="mt-4 md:mt-6 text-sm md:text-xl text-neutral-300">
            Flashback to The Annual Creator Summit.
          </p>
        </div>

        {/* Parallax Polaroids (Fixed for Mobile & Supports Video/Image) */}
        <div className="relative w-full max-w-7xl h-[120vh] md:h-screen mx-auto mt-12 md:mt-[-150]">
          {flashbackMedia.map((media, i) => (
            <div
              key={i}
              className={`parallax-photo absolute w-[60vw] sm:w-[45vw] md:w-[25vw] aspect-[4/5] p-3 md:p-4 bg-neutral-100 shadow-2xl ${
                i === 0
                  ? "top-[5%] left-[5%] md:top-[10%] md:left-[10%]"
                  : i === 1
                    ? "top-[35%] right-[5%] md:top-[20%] md:right-[15%]"
                    : "top-[55%] left-[15%] md:top-[50%] md:left-[40%]"
              }`}
            >
              {media.type === "video" ? (
                <video
                  src={media.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[85%] object-cover "
                />
              ) : (
                <img
                  src={media.src}
                  alt={`Event ${i + 1}`}
                  className="w-full h-[85%] object-cover "
                />
              )}
              <div className="w-full h-[15%] flex items-center justify-center">
                <span className="text-black font-mono text-[10px] md:text-sm font-bold uppercase tracking-widest">
                  0{i + 1} // Captured
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. GRAND FINALE CTA --- */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-black py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[40vw] md:h-[40vw] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-5xl">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-base mb-8 font-bold">
            Your Brand. Their Voice.
          </p>
          <h2 className="text-[12vw] md:text-[6vw] font-black uppercase leading-[1.1] tracking-tighter mb-12">
            Ready to break
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:3px_white]">
              the internet?
            </span>
          </h2>

          <button
            onClick={() => setIsContactOpen(true)}
            className="group relative px-8 py-4 md:px-10 md:py-5 bg-white text-black text-sm md:text-xl font-black uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-2xl"
          >
            <span className="relative z-10">Access the Network</span>
            <div className="absolute inset-0 bg-neutral-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          </button>
        </div>
      </section>

      {/* --- CONTACT MODAL --- */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

// Sub-component for the Roster Marquee
function RosterCard({ inf }: { inf: any }) {
  return (
    // Active state scales better on touch devices
    <div className="group relative w-full aspect-[3/4] bg-neutral-900 overflow-hidden cursor-crosshair rounded-lg md:rounded-none">
      <img
        src={inf.img}
        alt={inf.name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 md:group-hover:scale-105 transition-all duration-700"
      />
      {/* Stats Overlay on Hover/Tap */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
        <h4 className="text-xl md:text-3xl font-black uppercase translate-y-2 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 leading-none">
          {inf.name}
        </h4>
        <div className="flex gap-2 md:gap-4 mt-2 md:mt-3 translate-y-2 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 delay-75">
          <span className="bg-white text-black px-2 py-1 text-[8px] md:text-xs font-bold uppercase tracking-widest rounded-full">
            {inf.reach}
          </span>
          <span className="border border-white/30 text-white px-2 py-1 text-[8px] md:text-xs font-bold uppercase tracking-widest rounded-full">
            {inf.niche}
          </span>
        </div>
      </div>
    </div>
  );
}
