"use client";

import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Team Data
const teamMembers = [
  { id: "prakhar", name: "PRAKHAR AGRAWAL", role: "CEO", image: "/team/prakhar.jpeg" },
  { id: "monika", name: "MONIKA AGRAWAL", role: "Social Media Manager", image: "/team/monika.jpeg" },
  { id: "ved", name: "VED RAJWADE", role: "Videographer + Editor", image: "/team/ved.jpeg" },
  { id: "uddeshy", name: "UDDESHY MISHRA", role: "Graphic Designer", image: "/team/uddeshy.jpeg" },
  { id: "shiv", name: "SHIV SHANKAR KUMAR", role: "Cinematographer + Video Editor", image: "/team/shiv.jpeg" },
  { id: "aditya", name: "ADITYA SINGH", role: "Digital Marketer", image: "/team/aditya.jpeg" },
  { id: "bhavini", name: "BHAVINI SINGH", role: "Content Manager", image: "/team/bhavini.jpeg" },
  { id: "muskan", name: "MUSKAN SACHDEV", role: "Social Media Manager", image: "/team/muskan.jpeg" },
  { id: "arvind", name: "ARVIND", role: "Videographer + Video Editor", image: "/team/arvind.jpeg" },
  { id: "juhika", name: "JUHIKA PARADKAR", role: "HR", image: "/team/juhika.jpeg" },
  { id: "tanya", name: "TANYA KRISHNANI", role: "Account Manager (RP)", image: "/team/tanya.jpeg" },
  { id: "rajni", name: "RAJNI GANDHA", role: "Video Editor", image: "/team/rajni.jpeg" },
  { id: "anamika", name: "ANAMIKA SONWANI", role: "Sales Executive", image: "/team/anamika.jpeg" },
  { id: "bhumi", name: "BHUMI PINJANI", role: "Account Manager (GOTO)", image: "/team/bhumi.jpeg" },
];

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Explicitly typed refs to satisfy TypeScript
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Preload Images to prevent lag on scroll
  useEffect(() => {
    teamMembers.forEach((member) => {
      const img = new window.Image();
      img.src = member.image;
    });
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // DESKTOP: Trigger when the name hits the exact middle of the screen
      listRefs.current.forEach((el, index) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "center 50%",
          end: "center 50%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      // MOBILE: Trigger lower down (80%), because the top 45% is covered by the sticky image
      listRefs.current.forEach((el, index) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "center 80%",
          end: "center 80%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    });

    // Force refresh in case the heading web-fonts load late and push content down
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => mm.revert();
  }, { scope: containerRef });

  // Animate the image swap whenever the activeIndex changes
  useGSAP(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { 
          opacity: 0, 
          scale: 0.95,
          filter: "blur(10px)" 
        },
        { 
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)",
          duration: 0.6, 
          ease: "power3.out" 
        }
      );
    }
  }, [activeIndex]);

  return (
    <section id="team" ref={containerRef} className="relative w-full bg-neutral-50 text-neutral-900 pt-16 md:pt-24">
      
      {/* --- NEW MAIN SECTION HEADING --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center md:text-left">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">
          Our Team
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative">
        
        {/* --- STICKY IMAGE CONTAINER --- */}
        {/* Fixed top-16 for mobile, and locked to 80vh & 10vh offset for desktop center alignment */}
        <div className="sticky top-16 md:top-[10vh] z-20 w-full md:w-1/2 h-[45vh] md:h-[80vh] order-1 md:order-2 flex items-center justify-center md:justify-end px-6 py-4 md:py-12 bg-neutral-50 md:bg-transparent">
          <div className="relative w-full max-w-sm md:max-w-md h-full md:aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl bg-neutral-200">
            <img
              ref={imageRef}
              src={teamMembers[activeIndex].image}
              alt={teamMembers[activeIndex].name}
              className="absolute inset-0 w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 mix-blend-multiply pointer-events-none" />
          </div>

          <div className="absolute bottom-0 left-0 w-full h-8 bg-linear-to-b from-transparent to-neutral-50 pointer-events-none md:hidden" />
        </div>

        {/* --- SCROLLING LIST CONTAINER --- */}
        <div className="w-full md:w-1/2 z-10 order-2 md:order-1 px-6 md:px-20 pt-32 pb-[20vh] md:pt-20 md:pb-[100vh]">
          
          <ul className="flex flex-col">
            {teamMembers.map((member, index) => {
              const isActive = index === activeIndex;

              return (
                <li
                  key={member.id}
                  ref={(el) => { listRefs.current[index] = el; }}
                  className="py-16 md:py-50 flex flex-col justify-center transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0.3 }}
                >
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.85] tracking-tighter">
                    {member.name}
                  </h3>
                  <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mt-3 md:mt-4 block">
                    — {member.role}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </section>
  );
}