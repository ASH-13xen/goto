"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- CONFIGURATION VARIABLES ---
const RADIUS_X = 500;
const RADIUS_Y = 120;
const CARD_WIDTH = 280;
const CARD_HEIGHT = 500;
// -------------------------------

// --- DATA GENERATOR (Creates 30 Events dynamically) ---
const GOOGLE_VIDEO_ID = "1OPKCYI5UFEPgZmR_l-3J4fuE2AjsZnoB"; // From your prompt

const eventsData = Array.from({ length: 30 }).map((_, index) => ({
  id: `event-${index + 1}`,
  title: `Event Volume ${index + 1}`,
  date: `Oct ${index + 1} • 10:00 PM`,
  location: "Downtown Warehouse",
  desc: "Experience the ultimate underground cyberpunk rave. Lasers, heavy bass, and a sensory overload you won't forget.",
  image_popup: index % 3 !== 0, // Makes 2 out of 3 events have a gallery pop-up
  reel_drive_link: `https://drive.google.com/uc?export=download&id=${GOOGLE_VIDEO_ID}`,
  video1_drive_link: `https://drive.google.com/uc?export=download&id=${GOOGLE_VIDEO_ID}`,
  large_video_link: `https://drive.google.com/uc?export=download&id=${GOOGLE_VIDEO_ID}`,
  gallery: [
    // Replace these dummy IDs with your actual Google Drive image IDs
    "https://drive.google.com/uc?export=view&id=YOUR_IMG_ID_1",
    "https://drive.google.com/uc?export=view&id=YOUR_IMG_ID_2",
    "https://drive.google.com/uc?export=view&id=YOUR_IMG_ID_3",
    "https://drive.google.com/uc?export=view&id=YOUR_IMG_ID_4",
    "https://drive.google.com/uc?export=view&id=YOUR_IMG_ID_5",
    "https://drive.google.com/uc?export=view&id=YOUR_IMG_ID_6",
  ],
}));

export default function EventOrbit() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Refs to control play/pause
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const peekCardRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const orbit = useRef({ angle: 0 });
  const totalItems = eventsData.length;

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeEvent = eventsData[activeIndex];

  // Auto-scroll the left navigation to keep the active event centered
  useEffect(() => {
    if (navButtonsRef.current[activeIndex]) {
      navButtonsRef.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // Performance Saver: Play ONLY the active card's video, pause the rest
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === activeIndex && !isExpanded) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex, isExpanded]);

  const getSlotProps = (index: number, currentOrbitAngle: number) => {
    const itemAngle = currentOrbitAngle + index * (360 / totalItems);
    const rad = itemAngle * (Math.PI / 180);
    const zDepth = Math.cos(rad);

    const x = Math.sin(rad) * RADIUS_X;
    const y = zDepth * RADIUS_Y;
    const scale = 0.5 + (zDepth + 1) * 0.25;
    const opacity = 0.2 + (zDepth + 1) * 0.4;
    const blur = Math.max(0, (1 - zDepth) * 6);
    const zIndex = Math.round(zDepth * 100);

    return {
      x,
      y,
      scale,
      opacity,
      zIndex,
      filter: `blur(${blur}px)`,
      autoAlpha: 1,
    };
  };

  useGSAP(() => {
    // --- GALLERY MODE ---
    if (isGalleryOpen) {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.4 });
      gsap.to(peekCardRef.current, { y: 200, duration: 0.4 });
      gsap.to(backgroundVideoRef.current, {
        filter: "blur(20px)",
        opacity: 0.3,
        duration: 0.6,
      });
      gsap.to(galleryRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.2)",
      });
      return;
    } else if (isExpanded && !isGalleryOpen) {
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.6 });
      gsap.to(galleryRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.4 });
      gsap.to(backgroundVideoRef.current, {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.6,
      });

      // Conditionally bring peek card up if image_popup is true
      if (activeEvent.image_popup) {
        gsap.to(peekCardRef.current, {
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out",
        });
      }
    }

    // --- EXPANDED (VIDEO) MODE ---
    if (isExpanded) {
      itemRefs.current.forEach((el) =>
        gsap.to(el, { opacity: 0, scale: 0.5, zIndex: 0, duration: 0.4 }),
      );
      gsap.to(navRef.current, { x: -100, autoAlpha: 0, duration: 0.4 });

      // Play expanded video
      backgroundVideoRef.current?.play().catch(() => {});
      gsap.to(backgroundVideoRef.current, {
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.inOut",
      });
      gsap.fromTo(
        textElementsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
        },
      );
    } else {
      // --- IDLE ORBIT MODE ---
      backgroundVideoRef.current?.pause();
      gsap.to(backgroundVideoRef.current, { autoAlpha: 0, duration: 0.4 });
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.4 });
      gsap.to(peekCardRef.current, { y: 200, duration: 0.3 });
      gsap.to(navRef.current, {
        x: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
      });

      const targetAngle = -activeIndex * (360 / totalItems);
      const currentAngle = orbit.current.angle;

      let diff = (targetAngle - currentAngle) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      const finalAngle = currentAngle + diff;

      gsap.to(orbit.current, {
        angle: finalAngle,
        duration: 0.8,
        ease: "power3.out",
        onUpdate: () => {
          eventsData.forEach((_, i) => {
            const props = getSlotProps(i, orbit.current.angle);
            gsap.set(itemRefs.current[i], { ...props });
          });
        },
      });
    }
  }, [activeIndex, isExpanded, isGalleryOpen]);

  const handleCardClick = (index: number) => {
    if (isExpanded) return;
    if (activeIndex === index) {
      setIsExpanded(true);
    } else {
      setActiveIndex(index);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isExpanded || isGalleryOpen) return;
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isExpanded || isGalleryOpen) return;
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (
      isExpanded ||
      isGalleryOpen ||
      touchStartX.current === null ||
      touchEndX.current === null
    )
      return;
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 50) setActiveIndex((prev) => (prev + 1) % totalItems);
    else if (swipeDistance < -50)
      setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden flex flex-col justify-center items-center relative font-body select-none"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;700;900&display=swap');
        .font-heading { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .peek-card:hover { transform: translateY(-20px) !important; }

        /* Hide Scrollbar for Navigation */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. SCROLLABLE LEFT NAVIGATION MENU */}
      <div
        ref={navRef}
        className="absolute left-6 md:left-10 top-0 bottom-0 py-[40vh] z-[100] flex flex-col gap-6 overflow-y-auto no-scrollbar"
        style={{ width: "250px", pointerEvents: isExpanded ? "none" : "auto" }}
      >
        <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase mb-2 sticky top-0 bg-black/80 backdrop-blur-md py-2 hidden md:block">
          Select Event (30)
        </p>
        {eventsData.map((event, index) => (
          <button
            key={event.id}
            ref={(el) => (navButtonsRef.current[index] = el)}
            onClick={() => {
              setActiveIndex(index);
              setIsExpanded(false);
              setIsGalleryOpen(false);
            }}
            className={`text-left text-sm md:text-xl font-heading font-bold transition-all duration-300 py-1 ${
              activeIndex === index
                ? "text-white translate-x-2 md:translate-x-4 scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                : "text-neutral-600 hover:text-neutral-300"
            }`}
          >
            {event.title}
          </button>
        ))}
      </div>

      {/* 2. BACKGROUND VIDEO (EXPANDED STATE) */}
      <video
        ref={backgroundVideoRef}
        src={activeEvent.large_video_link}
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 invisible w-full h-full object-cover opacity-70 bg-neutral-900 pointer-events-none"
      />

      {/* 3. FULL-SCREEN OVERLAY DETAILS */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[60] bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12 lg:p-24 invisible pointer-events-none"
      >
        <div className="max-w-4xl pointer-events-auto">
          <button
            onClick={() => setIsExpanded(false)}
            className="mb-8 flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors w-max"
          >
            ← Back to Orbit
          </button>

          <div ref={(el) => (textElementsRef.current[0] = el)}>
            <p className="text-xs md:text-base font-bold text-blue-500 tracking-[0.2em] uppercase mb-4 font-heading drop-shadow-lg">
              {activeEvent.date} • {activeEvent.location}
            </p>
          </div>
          <div ref={(el) => (textElementsRef.current[1] = el)}>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9] font-heading drop-shadow-2xl">
              {activeEvent.title}
            </h1>
          </div>
          <div ref={(el) => (textElementsRef.current[2] = el)}>
            <p className="text-lg md:text-2xl text-neutral-200 mb-10 leading-relaxed font-body font-light max-w-2xl drop-shadow-md">
              {activeEvent.desc}
            </p>
          </div>
          <div ref={(el) => (textElementsRef.current[3] = el)}>
            <button className="px-8 md:px-10 py-4 md:py-5 bg-white text-black font-bold rounded-full text-base md:text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-300">
              Book Tickets
            </button>
          </div>
        </div>
      </div>

      {/* 4. THE PEEK GALLERY CARD (Conditionally Rendered by image_popup) */}
      <div
        ref={peekCardRef}
        onClick={() => setIsGalleryOpen(true)}
        className="peek-card absolute bottom-0 right-4 md:right-16 w-48 md:w-72 h-32 md:h-40 z-[70] bg-neutral-800 rounded-t-2xl cursor-pointer shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-x border-white/10 overflow-hidden group transition-transform duration-300"
        style={{ transform: "translateY(200px)" }}
      >
        <img
          src={activeEvent.gallery[0]}
          alt="Gallery Preview"
          className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-white mb-1 md:mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-white font-bold tracking-widest uppercase text-xs md:text-sm font-heading">
            View Gallery
          </span>
        </div>
      </div>

      {/* 5. FULL 6-IMAGE BENTO GALLERY OVERLAY */}
      <div
        ref={galleryRef}
        className="absolute inset-0 z-[100] invisible flex flex-col items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
      >
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight">
            {activeEvent.title} Gallery
          </h2>
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-colors text-sm"
          >
            Close Gallery ✕
          </button>
        </div>

        {/* Sleek 6-Image Asymmetric Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 md:gap-4 w-full max-w-7xl h-[60vh] md:h-[75vh]">
          {/* Main Large Image */}
          <div className="col-span-2 row-span-2 overflow-hidden rounded-lg md:rounded-xl bg-neutral-900 border border-white/10">
            <img
              src={activeEvent.gallery[0]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Top Right Small */}
          <div className="col-span-1 row-span-1 overflow-hidden rounded-lg md:rounded-xl bg-neutral-900 border border-white/10">
            <img
              src={activeEvent.gallery[1]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Top Far Right Small */}
          <div className="col-span-1 row-span-1 overflow-hidden rounded-lg md:rounded-xl bg-neutral-900 border border-white/10">
            <img
              src={activeEvent.gallery[2]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Middle Right Wide */}
          <div className="col-span-2 row-span-1 overflow-hidden rounded-lg md:rounded-xl bg-neutral-900 border border-white/10">
            <img
              src={activeEvent.gallery[3]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Bottom Left Small */}
          <div className="col-span-1 row-span-1 overflow-hidden rounded-lg md:rounded-xl bg-neutral-900 border border-white/10">
            <img
              src={activeEvent.gallery[4]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Bottom Middle Small */}
          <div className="col-span-1 row-span-1 overflow-hidden rounded-lg md:rounded-xl bg-neutral-900 border border-white/10">
            <img
              src={activeEvent.gallery[5]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Bottom Right Wide */}
          <div className="col-span-2 row-span-1 overflow-hidden rounded-lg md:rounded-xl bg-neutral-900 border border-white/10">
            <img
              src={activeEvent.gallery[0]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* 6. 3D HALO ORBIT CONTAINER */}
      <div
        className="relative flex justify-center items-center w-full h-full z-10 pointer-events-auto pl-20 md:pl-40"
        style={{ perspective: "1000px" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {eventsData.map((event, index) => (
          <div
            key={event.id}
            ref={(el) => (itemRefs.current[index] = el)}
            onClick={() => handleCardClick(index)}
            className="absolute bg-neutral-900 rounded-2xl overflow-hidden cursor-pointer will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group"
            style={{
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              opacity: 0,
            }}
          >
            {/* Reel Video: Uses ref to only play when active */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={event.video1_drive_link}
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-neutral-800"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center">
              <h3 className="text-xl font-bold font-heading text-white text-center mb-2">
                {event.title}
              </h3>
              {activeIndex === index && (
                <span className="text-xs font-bold text-black bg-white px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                  Click to Expand
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
