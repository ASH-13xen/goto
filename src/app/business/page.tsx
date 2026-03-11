/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ContactModal from "@/components/Contact"; // Adjust import path if needed
import Navbar2 from "@/components/Navbar2";

// Register ScrollTrigger outside the component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Words for the continuous background animation
const FLOATING_WORDS = [
  "GO-TO FRIEND",
  "IDENTITY",
  "ESSENCE",
  "PRESENCE",
  "DOMINANCE",
  "CULTURE",
  "IMPACT",
  "SCALE",
  "AUTHORITY",
  "WEAPONIZED",
  "DISRUPT",
  "VISION",
];

// Create a massive string that repeats the words to ensure a seamless loop
const MARQUEE_STRING =
  FLOATING_WORDS.join(" • ") + " • " + FLOATING_WORDS.join(" • ") + " • ";

// ==========================================
// PORTFOLIO LOGOS (2x2 Grid - 4 Items)
// ==========================================
const LOGO_SHOWCASE = [
  {
    name: "Brand 01",
    img: "/logos/14.png",
  },
  {
    name: "Brand 02",
    img: "/logos/logo5.png",
  },
  {
    name: "Brand 03",
    img: "/logos/logoverve.jpg",
  },
  {
    name: "Brand 04",
    img: "/logos/logo16.png",
  },
];

export default function BusinessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useGSAP(
    () => {
      // 1. Continuous Horizontal Background Marquees
      gsap.utils.toArray(".bg-marquee-row").forEach((row: any, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        gsap.set(row, { xPercent: direction === -1 ? 0 : -50 });
        gsap.to(row, {
          xPercent: direction === -1 ? -50 : 0,
          ease: "none",
          repeat: -1,
          duration: 35 + i * 5,
        });
      });

      // 2. Hero Text Bounce/Drop
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.4)",
        stagger: 0.2,
        delay: 0.2,
      });

      // 3. Scroll Reveal for Sections (Branding, Grid)
      // Note: Removed logo-item from this to keep it simple as requested
      const revealElements =
        gsap.utils.toArray<HTMLElement>(".reveal-on-scroll");
      revealElements.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="bg-black text-white min-h-screen font-sans overflow-x-hidden selection:bg-white selection:text-black"
    >
      <Navbar2 />
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-4 py-24">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
          src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/80 to-black z-0 pointer-events-none" />

        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-4 md:gap-8 overflow-hidden pointer-events-none opacity-[0.15] md:opacity-20 -rotate-2 scale-110">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="bg-marquee-row flex whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.5)] font-black uppercase text-[12vw] md:text-[6vw] tracking-tighter"
            >
              <span className="pr-4 md:pr-8">{MARQUEE_STRING}</span>
              <span className="pr-4 md:pr-8">{MARQUEE_STRING}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl">
          <p className="hero-text text-neutral-400 tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 font-bold bg-black/50 px-4 py-1 border border-white/10 rounded-full backdrop-blur-md">
            We forge digital identities
          </p>
          <h1 className="hero-text text-[15vw] md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter drop-shadow-2xl">
            Your Brand,
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:3px_white]">
              Weaponized.
            </span>
          </h1>
        </div>
      </section>

      {/* --- IMPORTANCE OF BRANDING SECTION --- */}
      <section className="reveal-on-scroll relative py-24 md:py-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
        <div className="w-full lg:w-1/2">
          <h2 className="text-[12vw] md:text-[6vw] font-black uppercase leading-[0.9] tracking-tighter mb-6">
            Why blend in <br className="hidden md:block" /> when you were{" "}
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
              born to stand out?
            </span>
          </h2>
          <div className="flex flex-col gap-6 text-neutral-400 text-base md:text-xl font-light">
            <p>
              A brand isn't just a logo or a color palette. It's the gut feeling
              people get when they hear your name. It's the silent ambassador of
              your business in a crowded digital room.
            </p>
            <p>
              At GO-TO FRIEND, we don't just decorate; we engineer perception.
              We build identities that command attention, build trust, and
              ultimately, drive revenue.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[50vh] md:h-[70vh] relative border border-white/10 rounded-3xl overflow-hidden bg-neutral-900">
          <img
            src="/logos/GO-TO.png"
            alt="Abstract Branding"
            className="w-full h-full object-cover opacity-100 hover:opacity-100 transition-opacity duration-700"
          />
        </div>
      </section>

      {/* --- SERVICES BENTO GRID --- */}
      <section className="reveal-on-scroll py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-12 md:mb-16">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4">
            Our Arsenal //
          </p>
          <h3 className="text-[12vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none">
            What We Do
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              id: "01",
              title: "Naming",
              desc: "We engineer names that stick. Memorable, punchy, and perfectly aligned with your market positioning.",
              img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
            },
            {
              id: "02",
              title: "Logos",
              desc: "From minimalist marks to complex crests. We forge symbols that become instantly recognizable icons.",
              img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
            },
            {
              id: "03",
              title: "Themes",
              desc: "Complete visual ecosystems. Typography, color palettes, and UI guidelines that ensure flawless presence.",
              img: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="group relative border border-neutral-800 bg-[#050505] p-8 md:p-10 overflow-hidden rounded-2xl md:rounded-[30px] min-h-[40vh] flex flex-col justify-end"
            >
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
              </div>

              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 relative z-10 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                {card.id}. {card.title}
              </h4>
              <p className="text-neutral-400 relative z-10 text-sm md:text-base leading-relaxed transform group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- LOGO SHOWCASE SECTION (2x2 Grid) --- */}
      <section className="py-24 md:py-32 px-6 bg-[#030303] border-y border-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
            <h3 className="text-[12vw] md:text-[5vw] font-black uppercase leading-[0.9] tracking-tighter">
              Marks of <br className="hidden md:block" />
              <span className="text-neutral-600"> Distinction</span>
            </h3>
            <p className="text-neutral-500 tracking-[0.2em] uppercase text-xs md:text-sm font-bold">
              Selected Works //
            </p>
          </div>

          {/* Simple 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {LOGO_SHOWCASE.map((logo, i) => (
              <div
                key={i}
                className="aspect-4/3 border border-neutral-800 rounded-xl overflow-hidden bg-[#0a0a0a] flex items-center justify-center group relative"
              >
                <img
                  src={logo.img}
                  alt={logo.name}
                  className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <p className="text-white font-black uppercase tracking-widest">
                    {logo.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT US CTA SECTION --- */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-black py-24 px-6 text-center overflow-hidden z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[40vw] md:h-[40vw] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm mb-6 md:mb-8 font-bold">
            Enough scrolling. Let's get to work.
          </p>
          <h2 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter mb-12 md:mb-16">
            Ready to build
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
              something iconic?
            </span>
          </h2>

          <button
            onClick={() => setIsContactOpen(true)}
            className="group relative px-8 py-4 md:px-12 md:py-6 bg-white text-black text-sm md:text-xl font-black uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Start the Conversation</span>
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
