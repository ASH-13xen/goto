/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // --- Modal State ---

  // --- Drag Hint State ---
  const [showHint, setShowHint] = useState(true);

  // --- Drag State & Mobile Detection for the Slider ---
  const [sliderSize, setSliderSize] = useState(80); // Default for SSR, updated in useEffect
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Auto-hide the drag hint after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Initial check on mount
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setSliderSize(mobile ? 120 : 80); // 120 for mobile, 80 for desktop

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setShowHint(false); // Hide hint immediately if they start dragging early
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    // Get exact component position so scrolling doesn't break the math on mobile
    const rect = containerRef.current.getBoundingClientRect();

    if (isMobile) {
      // Mobile: Vertical Drag (Top to Bottom)
      const maxHeight = window.innerHeight * 0.85; // Let them drag it 85% down
      let newHeight = e.clientY - rect.top; // Calculate relative to component, not screen
      if (newHeight < 120) newHeight = 120; // Mobile minimum
      if (newHeight > maxHeight) newHeight = maxHeight;
      setSliderSize(newHeight);
    } else {
      // Desktop: Horizontal Drag (Left to Right)
      const maxWidth = window.innerWidth * 0.75;
      let newWidth = e.clientX - rect.left;
      if (newWidth < 80) newWidth = 80; // Desktop minimum reverted to 80
      if (newWidth > maxWidth) newWidth = maxWidth;
      setSliderSize(newWidth);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-text-line",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
      );

      tl.fromTo(
        ".hero-divider",
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "left center", duration: 0.8 },
        "-=0.6",
      );

      tl.fromTo(
        [".hero-box", ".hero-desc"],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.4",
      );

      tl.fromTo(
        ".form-container",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=0.8",
      );

      tl.fromTo(
        ".form-element",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.6",
      );

      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 15,
        ease: "linear",
        delay: 0,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- WHATSAPP SUBMIT HANDLER ---
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const body = formData.get("body") as string;

    const whatsappText = `*New Meeting Request (Hero Form)*

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}
*Message:* ${body}`;

    const targetNumber = "918817398431";
    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedText}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full min-h-dvh bg-[#F9F9F9] text-black font-sans overflow-hidden flex flex-col pt-24"
      >
        {/* --- SUBTLE SLANT LINES BACKGROUND --- */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 15px),
              repeating-linear-gradient(-45deg, #000 0, #000 1px, transparent 1px, transparent 15px)
            `,
          }}
        />

        {/* --- DRAGGABLE SLIDER OVERLAY --- */}
        <div
          className={`absolute top-0 left-0 bg-black z-60 flex items-center overflow-hidden shadow-2xl ${
            isMobile
              ? "w-full border-b-2 border-white"
              : "h-full border-r-2 border-white"
          }`}
          style={{
            width: isMobile ? "100%" : `${sliderSize}px`,
            height: isMobile ? `${sliderSize}px` : "100%",
            fontFamily:
              '"Bahnschrift SemiLight", "Bahnschrift SemiCondensed", "Bahnschrift", sans-serif',
          }}
        >
          {/* Full Slider Background Video */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <video
              src="/location.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
            />
          </div>

          {/* FIXED WIDTH INNER CONTAINER */}
          <div
            className={`absolute left-0 top-0 flex flex-col justify-center text-white z-10 ${
              isMobile
                ? "w-full h-dvh px-6 pb-20"
                : "h-full w-225 pl-20 pr-24 py-32"
            }`}
          >
            {/* Metrics Row */}
            <div
              className={`flex flex-wrap ${isMobile ? "gap-2 mb-4" : "gap-4 mb-8"}`}
            >
              <div
                className={`bg-white text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] ${isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-xs md:text-sm"}`}
              >
                25+ Brands Partnered
              </div>
              <div
                className={`bg-white text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] ${isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-xs md:text-sm"}`}
              >
                30+ Events Hosted
              </div>
            </div>

            <p className="text-black [-webkit-text-stroke:1px_white] font-bold tracking-widest text-xs md:text-sm mb-2 uppercase drop-shadow-sm">
              Your Premium Hub in Raipur
            </p>

            <h2
              className={`uppercase font-black tracking-widest text-[#F9F9F9] drop-shadow-lg ${isMobile ? "text-4xl leading-tight mb-4" : "text-5xl md:text-7xl whitespace-nowrap mb-6"}`}
            >
              Let's Grow Together
            </h2>

            <div className="max-w-xl">
              <p
                className={`text-neutral-300 leading-relaxed ${isMobile ? "text-base mb-4" : "text-lg md:text-2xl mb-6"}`}
              >
                Hit your target audience with absolute precision. We combine
                strategy and creativity to ensure your brand always hits the
                bullseye.
              </p>
              <p
                className={`text-neutral-400 leading-relaxed border-l-2 border-white pl-4 ${isMobile ? "text-sm hidden sm:block" : "text-base md:text-lg"}`}
              >
                Our state-of-the-art facility is built for creators,
                visionaries, and brands ready to scale. Whether it's high-end
                podcast production, community events, or strategic brand
                building, this is where your journey accelerates. Step inside
                and let's build something lasting.
              </p>
            </div>

            {/* --- CONTACT US BUTTON --- */}
            <button
              onClick={() => window.open("https://wa.me/918817398431", "_blank")}
              className={`mt-6 md:mt-8 w-fit bg-white text-black font-black uppercase tracking-widest py-3 px-8 hover:bg-neutral-200 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:translate-y-1 active:shadow-none ${
                isMobile ? "text-sm" : "text-base"
              }`}
            >
              Contact Us
            </button>
          </div>

          {/* Drag Handle */}
          <div
            className={`absolute cursor-pointer flex items-center justify-center transition-colors group z-20 touch-none select-none ${
              isMobile
                ? "bottom-0 left-0 w-full h-20 cursor-ns-resize bg-linear-to-t from-black/80 to-transparent hover:bg-white/5"
                : "right-0 top-0 h-full w-20 cursor-ew-resize bg-linear-to-l from-black/80 to-transparent hover:bg-white/10"
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {isMobile ? (
              <div className="flex flex-col gap-1.5 items-center justify-center translate-y-2 relative">
                <span
                  className={`absolute -top-7 text-[10px] font-bold uppercase tracking-widest text-white transition-opacity duration-700 pointer-events-none ${
                    showHint ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Drag Down
                </span>
                <div className="w-12 h-1 bg-white/50 rounded-full group-hover:bg-white/80 transition-colors" />
                <div className="w-12 h-1 bg-white/50 rounded-full group-hover:bg-white/80 transition-colors" />
              </div>
            ) : (
              <div className="flex gap-1.5 items-center justify-center translate-x-2">
                <div className="w-1 h-12 bg-white/50 rounded-full group-hover:bg-white/80 transition-colors" />
                <div className="w-1 h-12 bg-white/50 rounded-full group-hover:bg-white/80 transition-colors" />
              </div>
            )}
          </div>
        </div>

        {/* --- FILM GRAIN OVERLAY --- */}
        <div
          className="pointer-events-none absolute inset-0 z-50 opacity-[0.2] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* --- MAIN CONTENT --- */}
        <div className="relative z-10 grow w-full max-w-7xl mx-auto flex flex-col xl:flex-row items-center xl:items-start justify-between px-5 lg:px-3 py-12 gap-16 xl:gap-8">
          {/* LEFT COLUMN: Text Content */}
          <div className="flex flex-col items-start text-left w-full xl:w-1/2 pl-3 pt-5 md:pl-0">
            <div className="overflow-hidden pb-2 w-full md:mt-20">
              <h1 className="hero-text-line font-black tracking-tighter uppercase text-[12vw] md:text-[8vw] xl:text-[5.5vw] leading-none whitespace-nowrap text-black">
                GO-TO FRIEND
              </h1>
            </div>

            <div className="hero-divider w-full max-w-[80%] h-0.75 bg-black my-6 md:my-8" />

            <div className="hero-box inline-block border-2 border-black px-4 py-2 text-sm md:text-lg font-bold uppercase tracking-widest bg-white">
              Where Growth Meets Strategy
            </div>

            <p className="hero-desc text-sm md:text-xl font-medium tracking-wide text-neutral-600 max-w-lg mt-6 leading-relaxed bg-[#F9F9F9]/80 backdrop-blur-md">
              Visibility, Creativity, and Strategy perfectly engineered for your
              brand. Your Go-To Friend <br />
              is right here.
            </p>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="form-container w-full max-w-md xl:w-112.5 shrink-0 bg-white border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-51 mt-4 xl:mt-0">
            <div className="overflow-hidden mb-6">
              <h2 className="form-element text-2xl font-black uppercase tracking-tight">
                Schedule A Meeting
              </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
              {/* --- NEW NAME FIELD --- */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="form-element text-xs font-bold uppercase tracking-widest text-neutral-500"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="form-element w-full border-b-2 border-black bg-transparent py-2 px-1 focus:outline-none focus:border-neutral-400 transition-colors font-medium rounded-none"
                  required
                />
              </div>

              {/* EMAIL FIELD */}
              <div className="flex flex-col gap-1 mt-1">
                <label
                  htmlFor="email"
                  className="form-element text-xs font-bold uppercase tracking-widest text-neutral-500"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="hello@brand.com"
                  className="form-element w-full border-b-2 border-black bg-transparent py-2 px-1 focus:outline-none focus:border-neutral-400 transition-colors font-medium rounded-none"
                  required
                />
              </div>

              {/* SUBJECT FIELD */}
              <div className="flex flex-col gap-1 mt-1">
                <label
                  htmlFor="subject"
                  className="form-element text-xs font-bold uppercase tracking-widest text-neutral-500"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Let's build something"
                  className="form-element w-full border-b-2 border-black bg-transparent py-2 px-1 focus:outline-none focus:border-neutral-400 transition-colors font-medium rounded-none"
                  required
                />
              </div>

              {/* MESSAGE FIELD - rows reduced to 3 to balance size */}
              <div className="flex flex-col gap-1 mt-1">
                <label
                  htmlFor="body"
                  className="form-element text-xs font-bold uppercase tracking-widest text-neutral-500"
                >
                  Message
                </label>
                <textarea
                  id="body"
                  name="body"
                  rows={3}
                  placeholder="Tell us about your goals..."
                  className="form-element w-full border-2 border-black bg-transparent p-3 focus:outline-none focus:border-neutral-400 transition-colors font-medium mt-1 resize-none rounded-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="form-element mt-3 w-full bg-black text-white font-black uppercase tracking-widest py-4 border-2 border-black hover:bg-white hover:text-black transition-all duration-300 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>

        {/* --- INFINITE MARQUEE --- */}
        <div
          ref={marqueeRef}
          className="relative z-20 w-full bg-black text-white py-2 md:py-3 overflow-hidden flex whitespace-nowrap border-t-2 border-white mt-auto"
        >
          <div className="marquee-inner flex items-center gap-6 text-base md:text-2xl font-black uppercase tracking-widest">
            <span>// VISIBILITY // CREATIVITY // GROWTH // STRATEGY</span>
            <span>// VISIBILITY // CREATIVITY // GROWTH // STRATEGY</span>
            <span>// VISIBILITY // CREATIVITY // GROWTH // STRATEGY</span>
            <span>// VISIBILITY // CREATIVITY // GROWTH // STRATEGY</span>
          </div>
        </div>
      </div>

    </>
  );
}
