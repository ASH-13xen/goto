/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactModal from "@/components/Contact"; // Adjust import path if needed
import Navbar2 from "@/components/Navbar2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- HELPER COMPONENT FOR REDACTION ---
const Fluff = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <React.Fragment key={i}>
          <span className="relative inline-block">
            {/* Expanded top/bottom slightly so the bar covers the word fully */}
            <span className="censor-bar absolute top-[5%] bottom-[5%] left-[-4%] right-[-4%] bg-black origin-left scale-x-0 z-10" />
            <span className="relative z-0">{word}</span>
          </span>{" "}
        </React.Fragment>
      ))}
    </>
  );
};

// --- DATA ---
const workflowSteps = [
  {
    id: "01",
    title: "IDEATION",
    desc: "Sparking the initial concept and defining the creative direction.",
  },
  {
    id: "02",
    title: "PLANNING",
    desc: "Structuring the logistics, crew, and narrative framework.",
  },
  {
    id: "03",
    title: "EXECUTION",
    desc: "Capturing the vision on set with absolute precision.",
  },
  {
    id: "04",
    title: "FEEDBACK",
    desc: "Refining the final cut until the frames are flawless.",
  },
];

const monolithProjects = [
  {
    brand: "VANGUARD",
    year: "2025",
    metric: "+400% ORGANIC REACH",
    desc: "A complete visual overhaul and high-velocity social deployment.",
    video:
      "https://videos.pexels.com/video-files/3206306/3206306-uhd_2560_1440_25fps.mp4",
  },
  {
    brand: "KINETICS",
    year: "2024",
    metric: "12M+ IMPRESSIONS",
    desc: "Aggressive product launch utilizing our rapid-fire reel infrastructure.",
    video:
      "https://videos.pexels.com/video-files/5008544/5008544-uhd_2160_4096_25fps.mp4",
  },
  {
    brand: "ONYX",
    year: "2025",
    metric: "0 MISSED DEADLINES",
    desc: "A pure execution play. 30 deliverables shipped in under 14 days.",
    video:
      "https://videos.pexels.com/video-files/2759477/2759477-hd_1920_1080_30fps.mp4",
  },
];

export default function BrandPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useGSAP(
    () => {
      // 1. DOSSIER REDACTION HERO ANIMATION (Triggers on scroll)
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".dossier-hero",
          start: "top -5%", // Triggers the exact moment the user scrolls down a bit
          once: true, // Only play the animation once
        },
      });

      // Hide the scroll indicator
      heroTl.to(".scroll-indicator", {
        opacity: 0,
        y: 20,
        duration: 0.3,
      });

      // Randomly stagger the black censor bars slamming over the corporate fluff
      heroTl.to(".censor-bar", {
        scaleX: 1,
        duration: 0.15,
        stagger: {
          each: 0.03,
          from: "random",
        },
        ease: "power2.inOut",
      });

      // Illuminate the core message left behind
      heroTl.to(
        ".reveal-text",
        {
          color: "#ffffff",
          textShadow: "0px 0px 20px rgba(255,255,255,0.5)",
          duration: 0.6,
          ease: "power2.out",
        },
        "+=0.1",
      );

      // 2. THE ANTI-AGENCY MANIFESTO
      const manifestoTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // Slanted Strikethrough
      manifestoTl.to(".strike-line", {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 1,
        stagger: 0.2,
        ease: "power3.inOut",
      });

      manifestoTl.to(
        ".bad-section",
        { opacity: 0, filter: "blur(10px)", duration: 1 },
        "+=0.5",
      );

      manifestoTl.fromTo(
        ".good-section",
        { opacity: 0, scale: 0.8, display: "none" },
        {
          opacity: 1,
          scale: 1,
          display: "flex",
          duration: 1,
          ease: "back.out(1.5)",
        },
      );

      manifestoTl.fromTo(
        ".good-word",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1 },
        "-=0.5",
      );

      // 3. THE MONOLITH STACK (Heavy Deck of Cards Effect)
      const slabs = gsap.utils.toArray<HTMLElement>(".monolith-slab");
      slabs.forEach((slab, i) => {
        if (i < slabs.length - 1) {
          gsap.to(slab, {
            scale: 0.9,
            opacity: 0.3,
            filter: "blur(10px)",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: slabs[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen font-sans w-full overflow-clip"
    >
      <Navbar2 />

      {/* --- 1. THE CLASSIFIED DOSSIER HERO --- */}
      <section className="dossier-hero relative w-full h-[100dvh] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden px-6 md:px-12 lg:px-24">
        {/* Eyebrow Label */}
        <div className="absolute top-24 md:top-32 left-6 md:left-12 lg:left-24 z-20">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-[10px] md:text-sm font-bold">
            Identity & Workflow Division //
          </p>
        </div>

        {/* The Text Block (Option 3 applied) */}
        <div className="relative z-10 w-full max-w-6xl mx-auto text-left mt-8 md:mt-20 ">
          <h1 className="font-mono text-[7vw] md:text-[3.5vw] lg:text-[3.5vw] leading-[1.7] md:leading-[1.3] text-neutral-600 uppercase font-bold tracking-tighter">
            <span className="reveal-text inline-block transition-colors duration-500">
              We
            </span>{" "}
            <Fluff text="prefer to talk in circles and" />{" "}
            <span className="reveal-text inline-block transition-colors duration-500">
              execute
            </span>{" "}
            <Fluff text="campaigns that look like everyone else's. We avoid raw, cultural" />{" "}
            <span className="reveal-text inline-block transition-colors duration-500">
              impact,
            </span>{" "}
            <Fluff text="focusing instead on endless," />{" "}
            <span className="reveal-text inline-block transition-colors duration-500">
              not
            </span>{" "}
            <Fluff text="very useful PowerPoint" />{" "}
            <span className="reveal-text inline-block transition-colors duration-500">
              presentations.
            </span>
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <p className="text-neutral-500 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold">
            Scroll to decrypt
          </p>
          <div className="w-[1px] h-8 bg-neutral-500/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* --- 2. THE ANTI-AGENCY MANIFESTO --- */}
      <section className="manifesto-section relative w-full h-[100dvh] bg-[#050505] flex items-center justify-center border-y border-neutral-900 overflow-hidden px-4 md:px-6">
        {/* THE BAD SECTION */}
        <div className="bad-section absolute z-10 flex flex-col items-center text-center w-full max-w-5xl">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-10 md:mb-16">
            Traditional agencies sell you:
          </p>
          <div className="flex flex-col gap-5 md:gap-8">
            {[
              "Recycled Concepts",
              "Endless Meetings",
              "Missed Deadlines",
              "Logistical Nightmares",
              "Hidden Markups",
            ].map((word, i) => (
              <div key={i} className="relative inline-block w-fit mx-auto">
                <h2 className="text-[6.5vw] md:text-[5vw] font-black uppercase tracking-tighter text-neutral-600 leading-none whitespace-nowrap">
                  {word}
                </h2>
                <div className="strike-line absolute top-1/2 left-0 w-full h-1 md:h-3 bg-white -translate-y-1/2 scale-x-0 -rotate-2 mix-blend-difference" />
              </div>
            ))}
          </div>
        </div>

        {/* THE GOOD SECTION */}
        <div className="good-section absolute z-20 flex-col items-center text-center w-full max-w-5xl hidden">
          <p className="text-white tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-10 border border-white px-4 py-2 rounded-full inline-block">
            We Deliver:
          </p>
          <div className="flex flex-col gap-4 md:gap-6">
            {[
              "Direct Execution",
              "Brand Dominance",
              "Absolute Precision",
              "Final Frames",
              "Impact",
            ].map((word, i) => (
              <h2
                key={i}
                className="good-word opacity-0 text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]"
              >
                {word}
              </h2>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. SIMPLIFIED TYPOGRAPHY WORKFLOW --- */}
      <section className="relative w-full py-32 md:py-48 bg-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="workflow-header mb-16 md:mb-24">
            <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4">
              Our Process //
            </p>
            <h2 className="text-[12vw] md:text-[6vw] font-black uppercase tracking-tighter leading-[0.9]">
              The Blueprint.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.id}
                className="workflow-card flex flex-col justify-between bg-neutral-950 border border-white/10 rounded-3xl p-8 md:p-10 hover:border-white/30 hover:bg-neutral-900 transition-colors h-70 md:h-87.5"
              >
                <span className="text-6xl md:text-7xl font-black text-white/5 leading-none">
                  {step.id}
                </span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. THE MONOLITH STACK (Proof of Work) --- */}
      <section className="relative w-full bg-black">
        {monolithProjects.map((project, i) => (
          <div
            key={i}
            className="monolith-slab sticky top-0 w-full h-[100dvh] overflow-hidden bg-black flex items-center justify-center border-t border-white/10"
            style={{ zIndex: i + 10 }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              src={project.video}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-between py-12 md:py-24">
              <div className="flex justify-between items-start w-full">
                <p className="text-white font-mono tracking-widest text-xs md:text-sm font-bold border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20">
                  FILE_{project.year}
                </p>
                <p className="text-white font-mono tracking-widest text-xs md:text-sm font-bold border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20">
                  [{i + 1}/{monolithProjects.length}]
                </p>
              </div>

              <div className="w-full">
                <h3 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-2 drop-shadow-2xl">
                  {project.brand}
                </h3>

                <div className="md:flex md:items-end md:justify-between w-full">
                  <h4 className="text-[6vw] md:text-[4vw] font-bold uppercase text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] tracking-tight leading-none mb-6 md:mb-0">
                    {project.metric}
                  </h4>
                  <p className="text-neutral-300 text-sm md:text-xl font-light max-w-sm md:text-right border-l md:border-l-0 md:border-r border-white/30 pl-4 md:pl-0 md:pr-4">
                    {project.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* --- 5. THE GRAND FINALE (Contact CTA) --- */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-black py-24 px-6 text-center overflow-hidden z-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[40vw] md:h-[40vw] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm mb-8 font-bold">
            Enough scrolling. Let's get to work.
          </p>
          <h2 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter mb-16">
            Ready to build
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
              something iconic?
            </span>
          </h2>

          <button
            onClick={() => setIsContactOpen(true)}
            className="group relative px-8 py-5 md:px-12 md:py-6 bg-white text-black text-sm md:text-xl font-black uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Start the Conversation</span>
            <div className="absolute inset-0 bg-neutral-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          </button>
        </div>
      </section>

      {/* --- 6. CONTACT MODAL INTEGRATION --- */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
