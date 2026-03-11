/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ContactModal from "@/components/Contact"; // Ensure this matches your path
import Navbar from "@/components/Navbar2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- MOCK DATA FOR THE HOT SEAT ---
const GUESTS = [
  {
    id: 1,
    name: "Vikram R.",
    title: "Tech Founder",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sneha K.",
    title: "Creative Director",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Kabir S.",
    title: "D2C Brand Builder",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Ayesha M.",
    title: "Lifestyle Creator",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Rahul D.",
    title: "Fintech Innovator",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop",
  },
];

export default function PodcastPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useGSAP(
    () => {
      // 1. "AMPLIFY" Ripple Effect (Hero)
      gsap.to(".ripple-text", {
        scale: 2.5,
        opacity: 0,
        duration: 3,
        stagger: 0.8,
        repeat: -1,
        ease: "power2.out",
      });

      gsap.from(".hero-fade", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });

      // 2. The Process Stack Animations
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step) => {
        gsap.from(step, {
          y: 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        });
      });

      // 3. The Hot Seat Marquee
      // Using an infinite linear translation loop
      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 30, // Adjust for speed
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="bg-black text-white min-h-screen font-sans overflow-x-hidden selection:bg-white selection:text-black"
    >
      {/* --- 1. HERO: THE ECHO CHAMBER --- */}
      <section className="relative h-dvh flex flex-col items-center justify-center overflow-hidden">
        <Navbar />
        {/* Kinetic Ripple Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
          <h1 className="relative z-10 text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none">
            AMPLIFY
          </h1>
          {[1, 2, 3].map((i) => (
            <h1
              key={i}
              className="ripple-text absolute text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.5)] z-0"
            >
              AMPLIFY
            </h1>
          ))}
        </div>

        {/* Hero Introduction */}
        <div className="relative z-20 mt-[40vh] text-center px-6 flex flex-col items-center">
          <p className="hero-fade max-w-2xl text-lg md:text-3xl font-light text-neutral-300 leading-relaxed drop-shadow-2xl">
            We don't just build your brand and leave you to find an audience. We
            plug you directly into a live, local broadcasting network.
          </p>
        </div>
      </section>

      {/* --- 2. THE BLUEPRINT (Redesigned Process Stack) --- */}
      <section className="relative w-full bg-[#050505] py-24 md:py-40 border-t border-neutral-900 px-4">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-32">
            <h2 className="text-[10vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none text-white">
              The Unfair <br className="md:hidden" />
              <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
                Advantage
              </span>
            </h2>
          </div>

          {/* Sticky Stack Container */}
          <div className="relative space-y-4 md:space-y-12 pb-[10vh]">
            {/* Step 01 */}
            <div className="process-step sticky top-[10vh] w-full bg-[#0a0a0a] border border-neutral-800 p-8 md:p-16 rounded-4xl shadow-[0_-20px_40px_rgba(0,0,0,0.8)] flex flex-col justify-center min-h-[40vh] md:min-h-[50vh]">
              <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4">
                01 // The Architecture
              </p>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
                Design The Identity
              </h3>
              <p className="text-lg md:text-2xl text-neutral-400 font-light max-w-2xl">
                We finalize your GO-TO FRIEND branding. Your positioning,
                narrative, and aesthetic are locked in. But a brand without
                distribution is invisible.
              </p>
            </div>

            {/* Step 02 */}
            <div className="process-step sticky top-[15vh] w-full bg-[#111111] border border-neutral-700 p-8 md:p-16 rounded-4xl shadow-[0_-20px_40px_rgba(0,0,0,0.9)] flex flex-col justify-center min-h-[40vh] md:min-h-[50vh]">
              <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4">
                02 // The Broadcast
              </p>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
                Enter The Studio
              </h3>
              <p className="text-lg md:text-2xl text-neutral-400 font-light max-w-2xl">
                You step into RaipurPodcast. A high-production, deep-dive
                conversation engineered to establish your authority, share your
                vision, and humanize your business.
              </p>
            </div>

            {/* Step 03 */}
            <div className="process-step sticky top-[20vh] w-full bg-[#1a1a1a] border border-neutral-600 p-8 md:p-16 rounded-4xl shadow-[0_-20px_50px_rgba(0,0,0,1)] flex flex-col justify-center min-h-[40vh] md:min-h-[50vh]">
              <p className="text-neutral-400 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4">
                03 // The Syndication
              </p>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
                Flood The Network
              </h3>
              <p className="text-lg md:text-2xl text-neutral-300 font-light max-w-2xl">
                We slice the interview into an arsenal of high-impact
                micro-content. YouTube Shorts, Reels, and audiograms overwhelm
                the local market, driving massive traffic directly to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. THE HOT SEAT ROSTER (Authority by Association) --- */}
      <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4">
              Authority by Association //
            </p>
            <h2 className="text-[10vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none text-white">
              The Hot Seat
            </h2>
          </div>
          <p className="text-neutral-400 font-light max-w-md text-sm md:text-base">
            You are sitting exactly where the city's top founders, creators, and
            leaders sat. Join the archive.
          </p>
        </div>

        {/* Infinite Marquee Wrapper */}
        <div
          className="relative w-full flex overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Double array for seamless loop */}
          <div className="marquee-track flex gap-4 md:gap-8 min-w-max px-4">
            {[...GUESTS, ...GUESTS].map((guest, idx) => (
              <div
                key={idx}
                className="group relative w-62.5 md:w-87.5 aspect-4/5 bg-neutral-900 rounded-xl overflow-hidden shrink-0 cursor-default"
              >
                <img
                  src={guest.img}
                  alt={guest.name}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                {/* YouTube Red Play Button Hint */}
                <div className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-8 border-l-white border-b-[5px] border-b-transparent ml-1" />
                </div>
                {/* Info Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black via-black/80 to-transparent flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-1">
                    {guest.name}
                  </h4>
                  <p className="text-neutral-400 text-xs md:text-sm font-bold uppercase tracking-widest">
                    {guest.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. CONTACT SECTION --- */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-[#030303] py-24 px-6 text-center overflow-hidden border-t border-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-5xl">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-base mb-8 font-bold">
            The mic is live.
          </p>
          <h2 className="text-[12vw] md:text-[6vw] font-black uppercase leading-[1.1] tracking-tighter mb-12">
            Ready to hit
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:3px_white]">
              record?
            </span>
          </h2>

          <button
            onClick={() => setIsContactOpen(true)}
            className="group relative px-8 py-4 md:px-10 md:py-5 bg-white text-black text-sm md:text-xl font-black uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-2xl"
          >
            <span className="relative z-10">Secure Your Spot</span>
            <div className="absolute inset-0 bg-neutral-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          </button>
        </div>
      </section>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
