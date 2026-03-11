/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 35 Placeholder Images
const LOGOS = Array.from({ length: 35 }).map(
  (_, i) => `/logos/logo${i + 1}.png`,
);

// Mathematically staggered for 35 items to maintain the perfect honeycomb shape
// Pattern: 4, 5, 6, 5, 6, 5, 4
const HONEYCOMB_ROWS = [
  LOGOS.slice(0, 4),
  LOGOS.slice(4, 9),
  LOGOS.slice(9, 15),
  LOGOS.slice(15, 20),
  LOGOS.slice(20, 26),
  LOGOS.slice(26, 31),
  LOGOS.slice(31, 35),
];

export default function TrustedBySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      });

      // 1. Text fades and slides up slightly
      tl.fromTo(
        ".trusted-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      );

      // 2. The Smooth Drop
      tl.fromTo(
        ".honeycomb-logo",
        {
          y: -800,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: { amount: 0.8, from: "random" },
          ease: "power4.out",
        },
        "-=0.4",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-neutral-800 via-black to-black text-white font-sans py-24 px-4 md:px-12 flex flex-col items-center overflow-hidden"
    >
      <section id="trusted-by"></section>
      {/* TEXT INTRO */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start lg:items-center text-left lg:text-center z-10">
        <h2 className="trusted-text text-[10vw] md:text-[6vw] font-black tracking-tighter uppercase leading-none">
          We don't just say
        </h2>
        <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6 mt-2 md:mt-0">
          <h2 className="trusted-text text-[10vw] md:text-[6vw] font-black tracking-tighter uppercase leading-none text-transparent [-webkit-text-stroke:2px_white] md:[-webkit-text-stroke:4px_white]">
            We do.
          </h2>
          <div className="trusted-text bg-white text-black px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-widest mb-2 md:mb-3 inline-block">
            Trusted By 35+ Brands
          </div>
        </div>
      </div>

      {/* THE HONEYCOMB ARCHITECTURE */}
      <div className="w-full max-w-5xl mx-auto mt-16 pl-15 pr-15 md:mt-24 flex flex-col items-center">
        {HONEYCOMB_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex justify-center gap-2 md:gap-4 ${
              rowIndex !== 0 ? "-mt-4 md:-mt-8" : ""
            }`}
          >
            {row.map((logoUrl, colIndex) => (
              <div
                key={colIndex}
                className="honeycomb-logo relative w-14 h-14 md:w-28 md:h-28 rounded-full border-2 border-black bg-white overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center p-2 md:p-4"
              >
                <img
                  src={logoUrl}
                  alt={`Brand Logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
