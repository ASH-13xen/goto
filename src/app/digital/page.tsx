/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactModal from "@/components/Contact"; // Adjust import path if needed
import Navbar2 from "@/components/Navbar2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "video",
    title: "VIDEO SHOOTS",
    description:
      "High-fidelity commercial video production that captures the essence of your brand.",
    media: "/digital/video_shoot.mp4",
  },
  {
    id: "reels",
    title: "REEL SHOOTS",
    description:
      "Fast-paced, algorithm-friendly short-form content designed for maximum engagement.",
    media: "/digital/reel_shoot.mp4",
  },
  {
    id: "product",
    title: "PRODUCT SHOOTS",
    description:
      "Crisp, premium product photography that elevates your e-commerce and social presence.",
    media: "/digital/product_shoot.mp4",
  },
];

const socialPosts = [
  {
    src: "/digital/social_post1.mp4",
    link: "https://www.instagram.com/reels/DG8E14szosY/",
  },
  {
    src: "/digital/social_post2.mp4",
    link: "https://www.instagram.com/reels/DNhuJTTSkbm/",
  },
  {
    src: "/digital/social_post3.mp4",
    link: "https://www.instagram.com/reels/DTkpBQuCEIh/",
  },
  {
    src: "/digital/social_post4.mp4",
    link: "https://www.instagram.com/reels/DPyfF8dAeYs/",
  },
  {
    src: "/digital/social_post5.jpg",
    link: "https://www.instagram.com/p/DTP8fusjWKI/?img_index=1",
  },
  {
    src: "/digital/social_post6.mp4",
    link: "https://www.instagram.com/reels/DQCCUXckZR3/",
  },
];

export default function DigitalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useGSAP(
    () => {
      // 1. HERO ANIMATION (Removed bento grid animation)
      const tl = gsap.timeline();

      tl.to(".shutter-panel", {
        height: "0vh",
        duration: 1.2,
        ease: "power4.inOut",
        stagger: 0.1,
      }).fromTo(
        ".hero-text",
        { scale: 0.9, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.8",
      );

      // 2. DESKTOP STACKING CARDS & HIGHLIGHTS
      const desktopCards = gsap.utils.toArray<HTMLElement>(".desktop-card");
      const navItems = gsap.utils.toArray<HTMLElement>(".desktop-nav-item");

      if (navItems.length > 0) {
        gsap.set(navItems, { opacity: 0.3 });
        gsap.set(navItems[0], { opacity: 1, scale: 1.05, x: 20 });
      }

      const activateNavItem = (activeIndex: number) => {
        navItems.forEach((item, i) => {
          if (i === activeIndex) {
            gsap.to(item, {
              opacity: 1,
              scale: 1.05,
              x: 20,
              duration: 0.3,
              overwrite: true,
            });
          } else {
            gsap.to(item, {
              opacity: 0.3,
              scale: 1,
              x: 0,
              duration: 0.3,
              overwrite: true,
            });
          }
        });
      };

      desktopCards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 50%",
          onEnter: () => activateNavItem(i),
          onEnterBack: () => activateNavItem(i),
        });

        if (i < desktopCards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            scrollTrigger: {
              trigger: desktopCards[i + 1],
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          });
        }
      });

      // 3. SOCIAL GRID FLY-IN
      gsap.fromTo(
        ".social-post",
        { y: 100, opacity: 0, rotationZ: 5 },
        {
          y: 0,
          opacity: 1,
          rotationZ: 0,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: ".social-grid-section", start: "top 60%" },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    // overflow-clip prevents CSS sticky from breaking, unlike overflow-hidden
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen font-sans w-full overflow-clip slant-line-pattern"
    >
      <Navbar2 />
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black px-4">
        <div className="shutter-panel absolute top-0 left-0 w-full h-[50vh] bg-white z-30" />
        <div className="shutter-panel absolute bottom-0 left-0 w-full h-[50vh] bg-white z-30" />

        {/* --- INLINE CSS SLANTING LINES BACKGROUND --- */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-100"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(-45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px)
            `,
          }}
        />

        <div className="absolute inset-0 z-10 bg-linear-to-t from-white via-black/60 to-transparent pointer-events-none" />

        {/* FIX: Removed the box background/border and increased text size */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full">
          <p className="text-neutral-400 font-mono text-sm tracking-[0.3em] uppercase mb-6 hero-text text-center">
            Digital Excellence //
          </p>
          <h1 className="hero-text text-[15vw] md:text-[6vw] font-black uppercase text-center leading-[0.85] tracking-tighter drop-shadow-2xl">
            <span className="block text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
              We don't <br className="md:hidden" /> just post.
            </span>
            <span className="block text-white mt-4 md:mt-2">We Produce.</span>
          </h1>
        </div>
      </section>

      {/* --- 2. SERVICES SECTION --- */}

      {/* MOBILE LAYOUT: Sequential cards */}
      <section className="md:hidden flex flex-col gap-16 pt-12 pb-24 px-6 relative w-full z-20 bg-black">
        {services.map((service, index) => (
          <div key={service.id} className="flex flex-col gap-6">
            <div>
              <span className="text-sm font-mono text-neutral-500 mb-2 block tracking-widest">
                0{index + 1} //
              </span>
              <h3 className="text-4xl font-black uppercase tracking-tight">
                {service.title}
              </h3>
            </div>

            <div className="w-full aspect-4/5 bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              {service.media.endsWith(".mp4") ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={service.media}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={service.media}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <p className="text-neutral-400 text-lg leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </section>

      {/* DESKTOP/LAPTOP LAYOUT: Split Sticky Stack */}
      <section className="hidden md:flex relative w-full max-w-7xl mx-auto px-12 items-start bg-black z-20">
        {/* Left Side: Sticky Text */}
        <div className="w-1/2 sticky top-0 h-screen flex flex-col justify-center gap-16 pr-12 z-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="desktop-nav-item origin-left will-change-transform"
            >
              <span className="text-sm font-mono text-neutral-500 mb-2 block tracking-widest">
                0{index + 1} //
              </span>
              <h3 className="text-5xl lg:text-6xl font-black uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="text-neutral-400 mt-4 text-xl max-w-md leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right Side: Stacking Cards */}
        <div className="w-1/2 flex flex-col gap-[50vh] pt-[15vh] pb-[50vh] relative z-10">
          {services.map((service, i) => (
            <div
              key={`${service.id}-desktop-media`}
              style={{ zIndex: i }}
              className="desktop-card sticky top-[15vh] w-full aspect-4/5 bg-neutral-900 rounded-[40px] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border border-white/10 transform-gpu"
            >
              {service.media.endsWith(".mp4") ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={service.media}
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <img
                  src={service.media}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-90"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. SOCIAL MEDIA MANAGEMENT: AUTOPILOT GRID --- */}
      <section className="social-grid-section relative w-full py-32 bg-neutral-950 border-t border-white/5 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 md:mb-24 md:w-2/3">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
              Your feed,
              <br />
              on autopilot.
            </h2>
            <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
              Regular updates. Custom post design. Zero ghosting. We handle the
              algorithm, the aesthetics, and the community. You handle the
              leads.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {socialPosts.map((post, index) => (
              <a
                key={index}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-post aspect-square bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 relative group block"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {post.src.endsWith(".mp4") ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={post.src}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={post.src}
                    alt={`Social Post ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. GRAND FINALE CTA --- */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-black py-24 px-6 text-center overflow-hidden z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-white opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center max-w-5xl">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-sm md:text-base mb-8 font-bold">
            Strategy // Shooting // Editing // Posting
          </p>
          <h2 className="text-[7vw] md:text-[5vw] font-black uppercase leading-[1.1] tracking-tighter mb-12">
            You focus on the business.
            <br />
            <span className="text-transparent [-webkit-text-stroke:2px_white] md:[-webkit-text-stroke:3px_white]">
              We'll focus on the lens.
            </span>
          </h2>
          <button
            onClick={() => setIsContactOpen(true)}
            className="group relative px-10 py-5 bg-white text-black text-lg md:text-xl font-black uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <span className="relative z-10">Contact Us</span>
            <div className="absolute inset-0 bg-neutral-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          </button>
        </div>
      </section>

      {/* --- 5. CONTACT MODAL INTEGRATION --- */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
