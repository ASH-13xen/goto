"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-content", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black text-white py-16 md:py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* --- FILM GRAIN OVERLAY --- */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.1] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="footer-content relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 items-start">
          {/* COLUMN 1: BRAND */}
          <div className="lg:col-span-2">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6">
              Go-To Friend
            </h2>
            <p className="text-neutral-400 max-w-sm text-sm md:text-base font-medium leading-relaxed">
              Engineering momentum for brands that refuse to stand still.
              Strategy, creativity, and execution—all in one place.
            </p>
          </div>

          {/* COLUMN 2: NAVIGATION */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
              Navigation
            </span>
            <ul className="flex flex-col gap-2 font-bold uppercase text-sm tracking-tight">
              <li>
                <a
                  href="#"
                  className="hover:text-neutral-400 transition-colors"
                >
                  Expertise
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neutral-400 transition-colors"
                >
                  Workflow
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neutral-400 transition-colors"
                >
                  Trusted By
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neutral-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: SOCIALS */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
              Social
            </span>
            <ul className="flex flex-col gap-2 font-bold uppercase text-sm tracking-tight">
              <li>
                <a
                  href="#"
                  className="hover:text-neutral-400 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neutral-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neutral-400 transition-colors"
                >
                  Threads
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neutral-400 transition-colors"
                >
                  Behance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="mt-20 md:mt-32 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
            <span>© 2026 GO-TO FRIEND</span>
            <span className="hidden md:inline">/</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
