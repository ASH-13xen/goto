"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar2 from "@/components/Navbar2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration for the 3D Orbit (Desktop)
const RADIUS_X = 350;
const RADIUS_Y = 80;

// [INSERT YOUR AFTERMATH_IMAGES ARRAY HERE]
// [INSERT YOUR EVENTS ARRAY HERE]
const EVENTS = [
  {
    id: "EVT-01",
    title: "PAW RUN 2026",
    video: "/events/pawrun2026/pawrun2026.mp4",
    video2: "/events/pawrun2026/pawrun2026.mp4",
    clientName: "Pet's Island",
    description:
      "A high-velocity hijack of Raipur’s reality, engineering an un-ignorable Paw Run activation that weaponized community dominance for Pets Island.",
    images: [
      "/events/pawrun2026/img/img1.jpg",
      "/events/pawrun2026/img/img2.jpg",
      "/events/pawrun2026/img/img3.jpg",
      "/events/pawrun2026/img/img4.jpg",
      "/events/pawrun2026/img/img5.jpg",
      "/events/pawrun2026/img/img6.jpg",
      "/events/pawrun2026/img/img7.jpg",
      "/events/pawrun2026/img/img8.jpg",
      "/events/pawrun2026/img/img9.jpg",
      "/events/pawrun2026/img/img10.jpg",
      "/events/pawrun2026/img/img11.jpg",
      "/events/pawrun2026/img/img12.jpg",
    ],
  },
  {
    id: "EVT-02",
    title: "PAW RUN 2023",
    video: "/events/pawrun2023/vid.mp4",
    video2: "/events/pawrun2023/vid.mp4",
    clientName: "PET'S ISLAND",
    description:
      "A high-velocity hijack of Raipur’s reality, engineering an un-ignorable Paw Run activation that weaponized community dominance for Pets Island.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-03",
    title: "PAW PAINTING",
    video: "/events/pawpainting/vid.mp4",
    video2: "/events/pawpainting/vid.mp4",
    clientName: "PET'S ISLAND",
    description:
      "Tactical deployment of visceral creativity, weaponizing a Paw Painting activation in Raipur to cement the Pets Island presence.",
    images: [
      "/events/pawpainting/img/img1.jpg",
      "/events/pawpainting/img/img2.jpg",
      "/events/pawpainting/img/img3.jpg",
      "/events/pawpainting/img/img4.jpg",
      "/events/pawpainting/img/img5.jpg",
      "/events/pawpainting/img/img6.jpg",
      "/events/pawpainting/img/img7.jpg",
      "/events/pawpainting/img/img8.jpg",
      "/events/pawpainting/img/img9.jpg",
      "/events/pawpainting/img/img10.jpg",
      "/events/pawpainting/img/img11.jpg",
      "/events/pawpainting/img/img12.jpg",
    ],
  },
  {
    id: "EVT-04",
    title: "POOL PARTY",
    video: "/events/pool.mp4",
    video2: "/events/pool.mp4",
    clientName: "PET'S ISLAND",
    description:
      "Engineering a high-velocity aquatic takeover in Raipur, weaponizing a Pet Pool Party activation to secure the Pets Island cultural peak.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-05",
    title: "RAMP WALK",
    video: "/events/ramp.mp4",
    video2: "/events/ramp.mp4",
    clientName: "PET'S ISLAND",
    description:
      "Engineering a high-contrast runway spectacle in Raipur, weaponizing a Pet Ramp Walk activation to solidify the Pets Island aesthetic dominance.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-06",
    title: "NO STALL MARKETING",
    video: "/events/no.mp4",
    video2: "/events/no.mp4",
    clientName: "ROYAL FLOSS",
    description:
      "Engineering a high-velocity street ambush in Raipur, weaponizing a no-stall marketing activation to cement the Royal Floss cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-07",
    title: "JANMASTMI",
    video: "/events/jan.mp4",
    video2: "/eventsjan.mp4",
    clientName: "ROYAL FLOSS",
    description:
      "Engineering a tactical festival hijack in Raipur, weaponizing a Janmastami guerrilla strike to secure the Royal Floss cultural peak.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-08",
    title: "ROSE DAY",
    video: "/events/get.mp4",
    video2: "/events/get.mp4",
    clientName: "ROYAL FLOSS",
    description:
      "Engineering a tactical romantic hijack in Raipur, weaponizing a high-velocity Rose Day activation to cement the Royal Floss cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-09",
    title: "REPUBLIC DAY",
    video: "/events/rep.mp4",
    video2: "/events/rep.mp4",
    clientName: "ROYAL FLOSS",
    description:
      "Engineering a tactical patriotic hijack in Raipur, weaponizing a high-velocity Republic Day guerrilla strike to cement the Royal Floss cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-10",
    title: "GRAND LAUNCH 1.0",
    video: "/events/gi.mp4",
    video2: "/events/gi.mp4",
    clientName: "AMANTARAN",
    description:
      "Engineering a tactical luxury hijack in Raipur, weaponizing a high-velocity salon inauguration to secure the Amantaran cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-11",
    title: "MARKETING 1.0",
    video: "/events/gt.mp4",
    video2: "/events/gt.mp4",
    clientName: "NEATNATURE",
    description:
      "Engineering a tactical sustainability hijack in Raipur, weaponizing a high-velocity solar workshop to secure the Neatnature cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-12",
    title: "MARKETING 2.0",
    video: "/events/nn.mp4",
    video2: "/events/nn.mp4",
    clientName: "NEATNATURE",
    description:
      "Engineering a tactical community hijack in Raipur, weaponizing a high-velocity workshop series to secure the Neatnature cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-13",
    title: "LAUNCH 2.0",
    video: "/events/lau.mp4",
    video2: "/events/lau.mp4",
    clientName: "NEATNATURE",
    description:
      "Engineering a tactical energy hijack in Raipur, weaponizing a high-velocity showroom inauguration to secure the Neatnature cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-14",
    title: "COMEDY EVENT",
    video: "/events/ce.mp4",
    video2: "/events/ce.mp4",
    clientName: "SARWASWA RESORT",
    description:
      "Engineering a tactical laughter hijack in Raipur, weaponizing a high-velocity comedy show activation to secure the Sarwaswa Resort cultural peak.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-15",
    title: "SATVA EVENT",
    video: "/events/sat.mp4",
    video2: "/events/sat.mp4",
    clientName: "CRAFTOLOGY WITH ANUPAMA",
    description:
      "Engineering a tactical gifting hijack in Raipur, weaponizing the Satva activation to secure the Craftology with Anupama cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-16",
    title: "OPENING",
    video: "/events/inf.mp4",
    video2: "/events/inf.mp4",
    clientName: "INFINITI",
    description:
      "Engineering a tactical aesthetic hijack in Raipur, weaponizing a high-velocity opening event to secure the Infiniti cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-17",
    title: "GARBA 1.0",
    video: "/events/gar.mp4",
    video2: "/events/gar.mp4",
    clientName: "FREQUENCY",
    description:
      "Engineering a tactical rhythmic hijack in Raipur, weaponizing a high-velocity Garba celebration to secure the Frequency cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  // {
  //   id: "EVT-18",
  //   title: "GARBA 1.1",
  //   video: "https://www.w3schools.com/html/mov_bbb.mp4",
  //   video2: "https://www.w3schools.com/html/mov_bbb.mp4",
  //   clientName: "Spotify Creators",
  //   description:
  //     "We transformed a massive raw space into the ultimate experiential activation. Attendees engaged with the brand environment, generating unprecedented social reach and community impact.",
  //   images: [
  //     "link1",
  //     "link2",
  //     "link3",
  //     "link4",
  //     "link5",
  //     "link6",
  //     "link7",
  //     "link8",
  //     "link9",
  //     "link10",
  //     "link11",
  //     "link12",
  //   ],
  // },
  {
    id: "EVT-18",
    title: "NEW YEAR PARTY",
    video: "/events/nyp.mp4",
    video2: "/events/nyp.mp4",
    clientName: "FREQUENCY",
    description:
      "Engineering a tactical midnight hijack in Raipur, weaponizing a high-velocity New Year activation to secure the Frequency cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
  {
    id: "EVT-19",
    title: "GAMES NIGHT",
    video: "/events/gnn.mp4",
    video2: "/events/gnn.mp4",
    clientName: "TAMRAKTU",
    description:
      "Engineering a tactical entertainment hijack in Raipur, weaponizing a high-velocity Game Night activation to secure the Tamraktu cultural footprint.",
    images: [
      "link1",
      "link2",
      "link3",
      "link4",
      "link5",
      "link6",
      "link7",
      "link8",
      "link9",
      "link10",
      "link11",
      "link12",
    ],
  },
];

// --- AFTERMATH IMAGES ARRAY ---
const AFTERMATH_IMAGES = [
  "/events/imgs/img1.jpg",
  "/events/imgs/img2.jpg", // 01
  "/events/imgs/img3.jpg",
  "/events/imgs/img4.jpg",
  "/events/imgs/img5.jpg",
  "/events/imgs/img6.jpg",
  "/events/imgs/img7.jpg",
  "/events/imgs/img8.jpg",
  "/events/imgs/img9.jpg",
  "/events/imgs/img10.jpg",
  "/events/imgs/img11.jpg",
  "/events/imgs/img12.jpg",
  "/events/imgs/img13.jpg",
  "/events/imgs/img14.jpg",
  "/events/imgs/img15.jpg",
  "/events/imgs/img16.jpg",
  "/events/imgs/img17.jpg",
  "/events/imgs/img18.jpg",
  "/events/imgs/img19.jpg",
  "/events/imgs/img20.jpg",
  "/events/imgs/img21.jpg",
  "/events/imgs/img22.jpg",
  "/events/imgs/img23.jpg",
  "/events/imgs/img24.jpg",
  "/events/imgs/img25.jpg",
];
export default function EventPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<(typeof EVENTS)[0] | null>(
    null,
  );
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const orbitRef = useRef({ angle: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const peekCardRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // 1. OPTIMIZATION: Manually play/pause videos based on active state
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        // Play active video (catch handles browser autoplay block policies silently)
        video.play().catch(() => {});
      } else {
        // Pause inactive videos to save GPU/CPU decoding
        video.pause();
      }
    });
  }, [activeIndex]);

  // Sync scroll list to active item
  useEffect(() => {
    if (navRefs.current[activeIndex]) {
      navRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  useGSAP(
    () => {
      // 3. OPTIMIZATION: Spotlight scales a radial gradient, NOT a CSS blur
      gsap.to(".spotlight", {
        scale: 20, // Reduced scale distance since the base div is slightly larger now
        opacity: 0,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".video-block", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".aftermath-section",
          start: "top 60%",
        },
      });
    },
    { scope: containerRef },
  );

  // 2. OPTIMIZATION: The 3D Orbit Logic utilizing gsap.quickSetter
  useGSAP(() => {
    if (selectedEvent) return;

    const totalItems = EVENTS.length;
    const targetAngle = -activeIndex * (360 / totalItems);
    const currentAngle = orbitRef.current.angle;

    let diff = (targetAngle - currentAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const finalAngle = currentAngle + diff;

    const isMobile = window.innerWidth < 768;

    // Pre-calculate GSAP quickSetters for massive performance gains
    const setters = cardRefs.current.map((el) => {
      if (!el) return null;
      return {
        x: gsap.quickSetter(el, "x", "px"),
        y: gsap.quickSetter(el, "y", "px"),
        scale: gsap.quickSetter(el, "scale"),
        opacity: gsap.quickSetter(el, "opacity"),
        zIndex: gsap.quickSetter(el, "zIndex"),
        filter: gsap.quickSetter(el, "filter"),
      };
    });

    gsap.to(orbitRef.current, {
      angle: finalAngle,
      duration: 0.8,
      ease: "power3.out",
      onUpdate: () => {
        EVENTS.forEach((_, i) => {
          const itemAngle = orbitRef.current.angle + i * (360 / totalItems);
          const rad = itemAngle * (Math.PI / 180);

          let normAngle = ((itemAngle % 360) + 360) % 360;
          if (normAngle > 180) normAngle -= 360;

          const distanceStep = normAngle / (360 / totalItems);

          const zDepth = Math.cos(rad);
          let x = Math.sin(rad) * RADIUS_X;
          let y = zDepth * RADIUS_Y;
          let scale = 0.5 + (zDepth + 1) * 0.25;
          let opacity = 0.1 + (zDepth + 1) * 0.45;
          let blur = Math.max(0, (1 - zDepth) * 4);
          let zIndex = Math.round(zDepth * 100);

          if (isMobile) {
            x = 0;
            y = distanceStep * 160;
            scale = 1 - Math.abs(distanceStep) * 0.15;

            const absStep = Math.abs(distanceStep);
            if (absStep < 0.5) {
              opacity = 1;
            } else if (absStep < 1.5) {
              opacity = 0.3;
            } else {
              opacity = 0;
            }

            blur = absStep * 2;
            zIndex = Math.round(100 - absStep * 10);
          }

          // Apply values using the pre-compiled quickSetters
          const setter = setters[i];
          if (setter) {
            setter.x(x);
            setter.y(y);
            setter.scale(scale);
            setter.opacity(opacity);
            setter.zIndex(zIndex);
            setter.filter(`blur(${blur}px)`);
          }
        });
      },
    });
  }, [activeIndex, selectedEvent]);

  // Modal Gallery Animations
  useGSAP(() => {
    if (isGalleryOpen && selectedEvent && selectedEvent.visible) {
      gsap.to(peekCardRef.current, { y: 200, duration: 0.4 });
      gsap.to(galleryRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.2)",
      });
    } else if (selectedEvent && !isGalleryOpen && selectedEvent.visible) {
      gsap.to(galleryRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.4 });
      gsap.fromTo(
        peekCardRef.current,
        { y: 200 },
        { y: 0, duration: 0.5, delay: 0.2, ease: "back.out" },
      );
    }
  }, [isGalleryOpen, selectedEvent]);

  return (
    <main
      ref={containerRef}
      className="bg-black text-white min-h-screen font-sans overflow-x-hidden selection:bg-white selection:text-black"
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .orbit-card { will-change: transform, opacity, filter; }
      `}</style>

      {/* SECTION 1: HERO */}
      <section className="hero-section relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        {/* Replaced expensive blur-[10px] with a cheaper radial gradient */}
        <Navbar2 />
        <div
          className="spotlight absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10vw] h-[10vw] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-100"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(-45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px)
            `,
          }}
        />
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <p className="hero-text text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-base mb-6 font-bold">
            Experiential Division
          </p>
          <h1 className="hero-text text-[15vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter">
            We don't throw
            <br className="md:hidden" />
            <span className="md:hidden"> </span>
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:4px_white]">
              Parties.
            </span>
          </h1>
          <h1 className="hero-text text-[15vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter mt-4">
            We build worlds.
          </h1>
        </div>
      </section>

      {/* SECTION 2: THE SPLIT-SCREEN ORBIT ARCHIVE */}
      <section className="relative w-full h-[100dvh] bg-[#030303] border-y border-neutral-900 flex flex-row overflow-hidden">
        {/* Left Side: Masked Scrollable Index */}
        <div className="w-[45%] md:w-[35%] h-full border-r border-neutral-900 flex flex-col pl-4 md:pl-16 pr-2 md:pr-4 relative z-20">
          <div className="pt-[15vh] md:pt-[20vh] pb-4 md:pb-8 bg-[#030303] z-10">
            <p className="text-neutral-600 tracking-[0.1em] md:tracking-[0.3em] uppercase text-[9px] md:text-xs font-bold">
              Campaign Archive
            </p>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pb-[40vh] mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)">
            <ul className="flex flex-col gap-6 md:gap-6 relative">
              {EVENTS.map((event, index) => (
                <li key={event.id}>
                  <button
                    ref={(el) => {
                      navRefs.current[index] = el;
                    }}
                    onClick={() => setActiveIndex(index)}
                    className={`text-left text-sm md:text-4xl font-black uppercase tracking-tighter transition-all duration-300 w-full ${
                      activeIndex === index
                        ? "text-white translate-x-2 md:translate-x-4 scale-105 md:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        : "text-[#333333] hover:text-neutral-500"
                    }`}
                  >
                    <span className="text-[8px] md:text-sm tracking-widest font-bold mr-2 md:mr-4 opacity-50 block md:inline mb-1 md:mb-0">
                      {event.id}
                    </span>
                    <span className="block leading-tight">{event.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: The 3D Orbit */}
        <div
          className={`w-[55%] md:w-[65%] h-full relative flex items-center justify-center transition-opacity duration-500 ${
            selectedEvent
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          }`}
        >
          {EVENTS.map((event, index) => (
            <div
              key={event.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => {
                if (activeIndex === index) {
                  setSelectedEvent(event);
                } else {
                  setActiveIndex(index);
                }
              }}
              className="orbit-card absolute w-[150px] h-[220px] md:w-[280px] md:h-[420px] bg-[#0a0a0a] border border-neutral-800 rounded-xl overflow-hidden cursor-pointer shadow-2xl group transition-colors hover:border-white/50"
              style={{ opacity: 0 }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={event.video}
                loop
                muted
                playsInline
                // Ensure poster image is defined in your EVENTS array for smoother loading
                poster={event.images?.[0] || ""}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>

              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col items-center text-center z-20">
                <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter leading-none text-white mb-3 md:mb-4">
                  {event.title}
                </h3>

                <div
                  className={`transition-all duration-300 ${
                    activeIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <span className="text-[8px] md:text-[10px] font-bold text-black bg-white px-3 md:px-6 py-1.5 md:py-2 rounded-full uppercase tracking-widest">
                    View Details
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FULLSCREEN EVENT OVERLAY MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col overflow-hidden animate-in fade-in duration-300">
          <video
            src={selectedEvent.video2}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/70 z-10"></div>

          <div className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-end z-[100] pointer-events-none">
            <button
              onClick={() => {
                setSelectedEvent(null);
                setIsGalleryOpen(false);
              }}
              className="pointer-events-auto text-white font-bold uppercase tracking-widest text-[10px] md:text-sm bg-neutral-900 px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-white hover:text-black transition-colors shadow-xl border border-white/10"
            >
              Close [X]
            </button>
          </div>

          <div className="flex-grow flex flex-col justify-center p-6 md:p-24 relative overflow-y-auto z-20">
            <div className="relative z-10 max-w-4xl mt-12 md:mt-20">
              <p className="text-white tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 font-bold border border-white inline-block px-3 md:px-4 py-1 rounded-full">
                {selectedEvent.clientName} // {selectedEvent.id}
              </p>
              <h2 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter mb-6 md:mb-8">
                {selectedEvent.title}
              </h2>
              <p className="text-lg md:text-2xl text-neutral-300 font-light max-w-2xl leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>
          </div>

          {selectedEvent.visible && (
            <>
              {/* The Peek Card (Bottom Right) */}
              <div
                ref={peekCardRef}
                onClick={() => setIsGalleryOpen(true)}
                className="absolute bottom-0 right-4 md:right-24 w-32 md:w-64 h-24 md:h-40 z-[60] bg-neutral-800 rounded-t-2xl cursor-pointer shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-x border-white/10 overflow-hidden group hover:-translate-y-4 transition-transform duration-300"
                style={{ transform: "translateY(200px)" }}
              >
                <img
                  src={selectedEvent.images[0]}
                  alt="Gallery Preview"
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                  <span className="text-white font-bold tracking-widest uppercase text-[10px] md:text-sm text-center">
                    View
                    <br className="md:hidden" />
                    Gallery
                  </span>
                </div>
              </div>

              {/* NORMAL GRID GALLERY OVERLAY */}
              <div
                ref={galleryRef}
                className="absolute inset-0 z-[70] invisible flex flex-col items-center justify-start p-4 md:p-8 bg-black/95 backdrop-blur-xl overflow-y-auto"
              >
                <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 mt-8 md:mt-0 shrink-0">
                  <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase">
                    {selectedEvent.title} Gallery
                  </h2>
                  <button
                    onClick={() => setIsGalleryOpen(false)}
                    className="px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs transition-colors"
                  >
                    Close Gallery ✕
                  </button>
                </div>

                {/* Normal Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 w-full max-w-7xl auto-rows-[200px] md:auto-rows-[300px] pb-12">
                  {selectedEvent.images.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden bg-neutral-900 rounded-lg w-full h-full"
                    >
                      <img
                        src={imgSrc}
                        alt={`${selectedEvent.title} image ${idx + 1}`}
                        className="w-full h-full p-2 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* SECTION 3: THE AFTERMATH */}
      <section className="aftermath-section relative min-h-screen py-32 bg-black flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
          <div className="inline-block bg-black px-6 md:px-8 py-3 md:py-4 border-2 border-white">
            <h2 className="text-[8vw] md:text-[5vw] font-black uppercase leading-none tracking-tighter text-white">
              Digital is fleeting.
              <br />
              <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
                This is forever.
              </span>
            </h2>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[100vw] px-2 grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 opacity-70">
          {AFTERMATH_IMAGES.map((imgSrc, i) => (
            <div
              key={i}
              className={`video-block bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden relative ${
                i % 7 === 0
                  ? "col-span-2 row-span-2 aspect-square"
                  : "col-span-1 row-span-1 aspect-square"
              }`}
            >
              <img
                src={imgSrc}
                loading="lazy"
                decoding="async"
                alt={`Archive ${i}`}
                className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-black py-24 px-6 text-center overflow-hidden border-t border-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-5xl">
          <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs md:text-base mb-8 font-bold">
            The crowd is waiting.
          </p>
          <h2 className="text-[12vw] md:text-[5vw] font-black uppercase leading-[1.1] tracking-tighter mb-12">
            Ready to sell out
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:3px_white]">
              the venue?
            </span>
          </h2>
          <button
            onClick={() => setIsContactOpen(true)}
            className="group relative px-8 md:px-10 py-4 md:py-5 bg-white text-black text-base md:text-xl font-black uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Design an Experience
            </span>
            <div className="absolute inset-0 bg-neutral-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          </button>
        </div>
      </section>
    </main>
  );
}
