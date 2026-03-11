"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  { id: "01", text: "Strategy-first thinking" },
  { id: "02", text: "Strong on-ground execution" },
  { id: "03", text: "Creative concepts & real impact" },
  { id: "04", text: "Local expertise & modern tools" },
  { id: "05", text: "Transparent process & outcomes" },
];

export default function ManifestoSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Text fade-in
      gsap.fromTo(
        ".manifesto-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      // 2. Make container visible immediately
      gsap.set(".cards-container", { opacity: 1, pointerEvents: "auto" });

      // 3. Animate cards as they enter the viewport
      gsap.fromTo(
        ".pillar-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cards-container",
            start: "top 90%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      // Added md:py-12 to slightly reduce the top/bottom padding on laptop so everything fits nicely
      className="relative w-full min-h-screen bg-black text-white overflow-hidden font-sans py-20 md:py-12 flex flex-col items-center justify-center"
    >
      {/* --- FILM GRAIN OVERLAY --- */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.15] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- MASSIVE TYPOGRAPHY --- */}
      {/* Changed md:mb-16 to md:mb-12 to bring the cards slightly closer to the text on laptop */}
      <div className="relative w-full max-w-[1600px] text-center z-20 px-4 pointer-events-none mb-12 md:mb-12">
        {/* Removed the invalid md:mt-100 class which was pushing the heading completely off-screen */}
        <span className="text-sm md:text-2xl font-bold uppercase tracking-[0.4em] text-neutral-400 mb-4 md:mb-6 block">
          Why Go-To Friend?
        </span>
        <h2 className="text-[7vw] md:text-[4vw] font-black uppercase leading-[0.9] tracking-tighter whitespace-nowrap md:whitespace-normal">
          <span className="block text-white">Because we don't</span>
          <span className="block text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:3px_white] my-1 md:my-2">
            chase trends.
          </span>
          <span className="block text-white">We create moments</span>
          <span className="block text-neutral-500 mt-1 md:mt-2">
            that are remembered
          </span>
        </h2>
      </div>

      {/* --- THE 5 PILLARS GRID --- */}
      {/* Removed the invalid md:pb-150 class and adjusted md:mb-20 to md:mb-8 */}
      <div className="cards-container relative w-full flex flex-col justify-start items-center opacity-0 pointer-events-none z-10 px-4 md:px-10 md:mb-0">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full max-w-6xl mt-4 md:mt-0">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="pillar-card relative bg-[#0a0a0a] border border-white/10 p-4 md:p-8 flex flex-col justify-between group hover:border-white/30 hover:bg-neutral-900 transition-all duration-500 shrink-0 w-full md:w-[calc(33.333%-3rem)] min-h-[90px] md:min-h-[10px] rounded-xl"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl" />

              <p className="text-base md:text-xl font-bold uppercase tracking-tight text-neutral-300 group-hover:text-white transition-colors duration-300 mt-2 md:mt-6 z-10 pr-2">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
