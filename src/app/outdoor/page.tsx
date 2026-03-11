"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar2 from "@/components/Navbar2";
import ContactModal from "@/components/Contact"; // Make sure this is imported

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// NEW: Data for "Why Guerrilla" Section
const THE_WHY = [
  {
    id: "01",
    title: "The Blindness",
    desc: "Consumers scroll past 99% of digital ads. You are pouring budget into invisible pixels and ignored feeds. We bypass the screen entirely.",
  },
  {
    id: "02",
    title: "The Shockwave",
    desc: "Physical disruption breeds digital virality. A singular, un-ignorable stunt on the street becomes the trending topic on every timeline.",
  },
  {
    id: "03",
    title: "The Hijack",
    desc: "Earned media outperforms paid media. We don't buy your audience's attention—we hijack reality to force the conversation.",
  },
];

// Added placeholder videos to all events
const EVENTS = [
  {
    id: "01",
    title: "The LIPSTICK",
    category: "",
    video: "/events/lipstick.mp4",
  },
  {
    id: "02",
    title: "LADDU",
    category: "",
    video: "/events/ladoo.mp4",
  },
  {
    id: "03",
    title: "BANGLE",
    category: "",
    video: "/events/bangle.mp4",
  },
  {
    id: "04",
    title: "NEWSPAPER 1.0",
    category: "",
    video: "/events/np1-j.mp4",
  },
  {
    id: "05",
    title: "NEWSPAPER 2.0",
    category: "",
    video: "/events/infiniti.mp4",
  },
  {
    id: "06",
    title: "8FT CAN",
    category: "",
    video: "/events/CAN.mp4",
  },
  {
    id: "07",
    title: "BNI BOOK",
    category: "",
    video: "/events/bni.mp4",
  },
];

export default function OutdoorPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Ref array for videos

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<(typeof EVENTS)[0] | null>(
    null,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // OPTIMIZATION: Only play the active video to save CPU/GPU overhead
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  useGSAP(
    () => {
      // 1. The "Slap" Hero Animation
      gsap.from(".hero-slap", {
        scale: 3,
        opacity: 0,
        y: -100,
        rotationX: 45,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.2,
        ease: "power2.out",
      });

      // 2. The Anti-Ad Manifesto Pinned Animation
      const manifestoTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".manifesto-container",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      manifestoTl
        .to(".strike-line", {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1,
          stagger: 0.2,
          ease: "power2.inOut",
        })
        .to(
          ".text-1",
          { opacity: 0, filter: "blur(10px)", duration: 0.5 },
          "+=0.2",
        )
        .to(
          ".text-2",
          { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" },
          "-=0.2",
        );

      // 3. The "Why Guerrilla" Grid Reveal
      gsap.from(".why-card", {
        scrollTrigger: {
          trigger: ".why-container",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
      });
    },
    { scope: containerRef },
  );

  // 4. Fullscreen Reveal Animation for Clicked Event Modal
  useGSAP(() => {
    if (selectedEvent) {
      gsap.fromTo(
        ".fullscreen-overlay",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.6, ease: "expo.out" },
      );
    }
  }, [selectedEvent]);

  return (
    <main
      ref={containerRef}
      className="bg-black text-white min-h-screen font-sans overflow-x-hidden selection:bg-white selection:text-black"
    >
      {/* SECTION 1: HERO (THE SLAP) */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-4 py-24">
        <Navbar2 />
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-100"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(-45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px)
            `,
          }}
        />
        <div className="flex flex-col items-center justify-center relative z-10 leading-[0.85]">
          <div className="overflow-hidden">
            <h1 className="hero-slap text-[16vw] md:text-[12vw] font-black uppercase tracking-tighter origin-bottom">
              WE OWN
            </h1>
          </div>
          <div className="overflow-hidden flex items-center gap-2 md:gap-4">
            <h1 className="hero-slap text-[16vw] md:text-[12vw] font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:4px_white] origin-bottom">
              THE
            </h1>
            <h1 className="hero-slap text-[16vw] md:text-[12vw] font-black uppercase tracking-tighter origin-bottom">
              STREETS
            </h1>
          </div>
        </div>

        <div className="hero-sub mt-8 md:mt-12 flex flex-col items-center text-center px-6 w-full relative z-10">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-[10px] md:text-sm font-bold mb-4">
            Guerrilla Marketing Division
          </p>
          <p className="max-w-xl text-sm md:text-xl font-light text-neutral-400">
            Digital is crowded. Reality is up for grabs. We engineer physical,
            un-ignorable stunts that force the world to look at your brand.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE ANTI-AD MANIFESTO */}
      <section className="manifesto-container relative h-dvh bg-[#050505] flex items-center justify-center px-4 md:px-6 border-t border-neutral-900 overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center max-w-6xl w-full">
          <div className="text-1 flex flex-col items-center gap-2 md:gap-4 w-full">
            <div className="relative inline-block w-fit">
              <h2 className="text-[6.5vw] md:text-[5vw] font-black uppercase leading-none tracking-tighter text-neutral-400 whitespace-nowrap">
                People ignore billboards.
              </h2>
              <div className="strike-line absolute top-1/2 left-0 w-full h-1 md:h-3 bg-white -translate-y-1/2 scale-x-0 -rotate-2 mix-blend-screen"></div>
            </div>
            <div className="relative inline-block w-fit">
              <h2 className="text-[6.5vw] md:text-[5vw] font-black uppercase leading-none tracking-tighter text-neutral-400 whitespace-nowrap">
                They look at their phones.
              </h2>
              <div className="strike-line absolute top-1/2 left-0 w-full h-1 md:h-3 bg-white -translate-y-1/2 scale-x-0 -rotate-2 mix-blend-screen"></div>
            </div>
          </div>

          <h2 className="text-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-[10vw] md:text-[6vw] font-black uppercase leading-[0.9] tracking-tighter text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:3px_white] opacity-0 scale-75 pointer-events-none">
            We put your brand <br /> in their reality.
          </h2>
        </div>
      </section>

      {/* SECTION 3: "WHY GUERRILLA" SECTION */}
      <section className="why-container relative py-24 md:py-40 px-6 bg-black border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4">
              The Reality Check //
            </p>
            <h3 className="text-[12vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none">
              Why Guerrilla?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {THE_WHY.map((item, index) => (
              <div
                key={index}
                className="why-card flex flex-col bg-[#0a0a0a] border border-neutral-800 p-8 md:p-12 hover:border-white transition-colors duration-500 rounded-2xl md:rounded-[40px]"
              >
                <span className="text-6xl md:text-7xl font-black text-white/5 mb-6 md:mb-12">
                  {item.id}
                </span>
                <div className="flex flex-col grow justify-end">
                  <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 text-white">
                    {item.title}
                  </h4>
                  <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: THE STREET LEDGER (Dynamic Master-Detail Panel) */}
      <section className="street-ledger-section relative w-full bg-[#030303] border-t border-neutral-900 flex flex-col md:flex-row h-dvh">
        {/* Left Side: Scrollable Index */}
        <div className="w-full md:w-[40%] h-[40vh] md:h-full flex flex-col pl-6 md:pl-16 pr-4 md:pr-8 border-b md:border-b-0 md:border-r border-neutral-900 relative z-20">
          <div className="pt-8 md:pt-[15vh] pb-6 bg-[#030303] z-10 sticky top-0">
            <p className="text-neutral-600 tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">
              Campaign Archive
            </p>
          </div>

          <ul className="flex flex-col gap-4 md:gap-6 pb-[10vh] overflow-y-auto no-scrollbar mask-image:linear-gradient(to_bottom,black_80%,transparent)">
            {EVENTS.map((event, index) => (
              <li
                key={`index-${event.id}`}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer text-xl md:text-4xl font-black uppercase tracking-tighter transition-all duration-300 ${
                  activeIndex === index
                    ? "text-white translate-x-4 md:translate-x-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "text-[#333333] hover:text-neutral-500"
                }`}
              >
                {event.id}.{" "}
                <span
                  className={`text-sm md:text-lg tracking-normal font-bold ml-2 transition-opacity duration-300 ${activeIndex === index ? "opacity-100" : "opacity-60 md:opacity-100"}`}
                >
                  {event.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Active Card Display (No scrolling needed) */}
        <div className="w-full md:w-[60%] h-[60vh] md:h-full relative flex items-center justify-center p-4 md:p-16 bg-[#0a0a0a]">
          {EVENTS.map((event, index) => (
            <div
              key={`card-${event.id}`}
              className={`absolute inset-4 md:inset-16 transition-all duration-700 ease-in-out ${
                activeIndex === index
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-95 pointer-events-none z-0"
              }`}
            >
              <div
                className="w-full h-full group relative bg-[#111] border border-neutral-800 rounded-2xl md:rounded-[40px] cursor-pointer overflow-hidden flex items-end p-6 md:p-12 hover:border-white transition-colors duration-500 shadow-2xl"
                onClick={() => setSelectedEvent(event)}
              >
                {/* Dynamic Video Background */}
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={event.video}
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:scale-105 transform z-0"
                />

                {/* Gradient Overlay to ensure text legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-0"></div>

                <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-4">
                  <div>
                    <p className="text-neutral-400 tracking-[0.2em] uppercase text-xs md:text-sm font-bold mb-2">
                      {event.category}
                    </p>
                    <h3 className="text-[10vw] md:text-6xl font-black uppercase tracking-tighter leading-[0.9] group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_white] md:group-hover:[-webkit-text-stroke:2px_white] transition-all duration-300">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: CONTACT */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-black py-24 px-6 text-center overflow-hidden border-t border-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[40vw] md:h-[40vw] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-5xl">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-base mb-8 font-bold">
            The streets are waiting.
          </p>
          <h2 className="text-[12vw] md:text-[5vw] font-black uppercase leading-[1.1] tracking-tighter mb-12">
            Ready to stop
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:3px_white]">
              traffic?
            </span>
          </h2>

          <button
            onClick={() => setIsContactOpen(true)}
            className="group relative px-8 py-4 md:px-10 md:py-5 bg-white text-black text-sm md:text-xl font-black uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Plan a Hijack
            </span>
            <div className="absolute inset-0 bg-neutral-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          </button>
        </div>
      </section>

      {/* CONTACT MODAL */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
