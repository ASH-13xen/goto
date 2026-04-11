/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- YOUTUBE EPISODES DATA ---
const EPISODES = [
  {
    id: 54,
    title: "“Modeling Beyond Glamour | Kshitij’s Take on Society, Struggles & Success”",
    category: "Art",
    date: "Sep 18, 2025",
    duration: "51 min",
    image: "https://i.ytimg.com/vi/QBojj9JxZ90/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=QBojj9JxZ90",
  },
  {
    id: 55,
    title: "Is Filmmaking Really This Hard? | Sanyam Jain Spills the Truth",
    category: "Art",
    date: "Sep 16, 2025",
    duration: "33 min",
    image: "https://i.ytimg.com/vi/eQ9ETzUWYbQ/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=eQ9ETzUWYbQ",
  },
  {
    id: 56,
    title: "Find Your Vibe | Uplifting Local Workshops & Events in Raipur | No Convenience Fee",
    category: "Culture",
    date: "Sep 14, 2025",
    duration: "30 min",
    image: "https://i.ytimg.com/vi/GTIFvbPE7Cw/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=GTIFvbPE7Cw",
  },
  {
    id: 57,
    title: "Cancer Explained: Dr. Jayesh Sharma on Prevention, Vaccination, Junk Food & Hidden Risks",
    category: "Health & Fitness",
    date: "Sep 12, 2025",
    duration: "33 min",
    image: "https://i.ytimg.com/vi/Pip36yXOXYA/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=Pip36yXOXYA",
  },
  {
    id: 58,
    title: "Every Photo Has a Backstory. Let’s Talk About It With HARSH GUPTA",
    category: "Art",
    date: "Sep 10, 2025",
    duration: "35 min",
    image: "https://i.ytimg.com/vi/DiYMKURTAdo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=DiYMKURTAdo",
  },
  {
    id: 59,
    title: "Teacher's Day Special Podcast | How Covid Has Affected Learning Process Of Kids |",
    category: "Culture",
    date: "Sep 05, 2025",
    duration: "31 min",
    image: "https://i.ytimg.com/vi/jqyequjOja8/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=jqyequjOja8",
  },
  {
    id: 60,
    title: "Life at 140 kg vs 80 kg: Vishwajeet's Weight Loss & Spiritual Journey",
    category: "Health & Fitness",
    date: "Sep 01, 2025",
    duration: "1 hr 2 min",
    image: "https://i.ytimg.com/vi/jbA5Dbe7dJI/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=jbA5Dbe7dJI",
  },
  {
    id: 61,
    title: "Tourism in Chhattisgarh | Bhangarh: India’s Haunted Fortress | BHARGAV VYAS",
    category: "History",
    date: "Aug 30, 2025",
    duration: "28 min",
    image: "https://i.ytimg.com/vi/DETgSwK8hzo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=DETgSwK8hzo",
  },
  {
    id: 62,
    title: "Multi-Sector Construction with Interiors, Vaastu Guidance & CCTV Safety : Prithvi developers",
    category: "Business",
    date: "Aug 28, 2025",
    duration: "25 min",
    image: "https://i.ytimg.com/vi/TgSmcVTIxn4/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=TgSmcVTIxn4",
  },
  {
    id: 63,
    title: "Why Bastar Dussehra Is 75 Days Long | Gems of CG ft. Travel Influencer Akash sahu @akashkasafar",
    category: "History",
    date: "Aug 25, 2025",
    duration: "45 min",
    image: "https://i.ytimg.com/vi/-crmtxf2WQM/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=-crmtxf2WQM",
  },
  {
    id: 64,
    title: "Why the Hare Krishna movement started from the US despite Krishna being born in India #raipurpodcast",
    category: "Spirituality",
    date: "Aug 21, 2025",
    duration: "46 min",
    image: "https://i.ytimg.com/vi/dgHbMnMZMNo/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=dgHbMnMZMNo",
  },
  {
    id: 65,
    title: "Eye Care Secrets They Don't Tell You: DR. TANMAY GUPTA.",
    category: "Health & Fitness",
    date: "Aug 18, 2025",
    duration: "38 min",
    image: "https://i.ytimg.com/vi/M5_9_erYpJs/hqdefault.jpg",
    yt_url: "https://www.youtube.com/watch?v=M5_9_erYpJs",
  },
];

export default function PodcastPage() {
  const containerRef = useRef<HTMLDivElement>(null);

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
        duration: 40, // Increased slightly because cards are wider now
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

      {/* --- 3. YOUTUBE EPISODES --- */}
      <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4">
              Authority by Association //
            </p>
            <h2 className="text-[10vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none text-white mb-6 md:mb-0">
              Latest Episodes
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-5">
            <p className="text-neutral-400 font-light max-w-md text-sm md:text-base md:text-right">
              Deep dive conversations engineered to establish authority, share your
              vision, and humanize your business.
            </p>
            
            {/* --- HIGHLIGHTED YOUTUBE CTA --- */}
            <a 
              href="https://www.youtube.com/@raipurpodcast" /* Update with your exact channel handle */
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 bg-[#FF0000] hover:bg-red-600 text-white font-black uppercase tracking-widest text-xs md:text-sm rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Visit Our Channel
            </a>
          </div>
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
            {[...EPISODES, ...EPISODES].map((episode, idx) => (
              <a
                key={`${episode.id}-${idx}`}
                href={episode.yt_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[280px] md:w-[420px] aspect-video bg-neutral-900 rounded-xl overflow-hidden shrink-0 cursor-pointer block border border-neutral-800 hover:border-neutral-500 transition-colors duration-500"
              >
                <img
                  src={episode.image}
                  alt={episode.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* YouTube Red Play Button Hint */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#FF0000] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75 group-hover:scale-100 shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                </div>

                {/* Info Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-linear-to-t from-black via-black/90 to-transparent flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-sm md:text-lg font-bold tracking-tight text-white mb-2 line-clamp-2 leading-tight">
                    {episode.title}
                  </h4>
                  <div className="flex items-center gap-3 text-neutral-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    <span className="text-white">{episode.category}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
                    <span>{episode.duration}</span>
                  </div>
                </div>
              </a>
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

          <a
            href="https://wa.me/918817398431"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 md:px-10 md:py-5 bg-white text-black text-sm md:text-xl font-black uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-2xl inline-block text-center"
          >
            <span className="relative z-10">Secure Your Spot</span>
            <div className="absolute inset-0 bg-neutral-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          </a>
        </div>
      </section>
    </main>
  );
}