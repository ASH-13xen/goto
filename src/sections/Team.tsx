"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Team Data
const teamMembers = [
  {
    id: "prakhar",
    name: "PRAKHAR",
    role: "Founder & CEO",
    gradient: "from-neutral-100 via-blue-50 to-neutral-200",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "aisha",
    name: "AISHA",
    role: "Lead Strategist",
    gradient: "from-neutral-100 via-purple-50 to-neutral-200",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rohan",
    name: "ROHAN",
    role: "Creative Director",
    gradient: "from-neutral-100 via-orange-50 to-neutral-200",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "sneha",
    name: "SNEHA",
    role: "Head of Copy",
    gradient: "from-neutral-100 via-emerald-50 to-neutral-200",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
];

export default function TeamSection() {
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageScrollTargetRef = useRef<HTMLDivElement>(null);

  // GSAP Animation for the Image Reveal
  useGSAP(() => {
    if (activeMember && imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          scale: 1.05,
        },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    }
  }, [activeMember]);

  // Handle clicking on a name
  const handleMemberClick = (id: string) => {
    setActiveMember(id);

    // Smoothly scroll the image section into view
    if (imageScrollTargetRef.current) {
      imageScrollTargetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center", // Centers the image nicely on the screen
      });
    }
  };

  return (
    <section
      id="team"
      className="relative w-full min-h-screen bg-neutral-50 flex items-center overflow-hidden py-16 lg:py-0"
    >
      {/* --- DYNAMIC BACKGROUND GRADIENTS --- */}
      {teamMembers.map((member) => (
        <div
          key={`bg-${member.id}`}
          className={`absolute inset-0 bg-gradient-to-br ${member.gradient} transition-opacity duration-700 ease-in-out z-0 ${
            activeMember === member.id ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* --- CONTENT LAYOUT --- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-12 h-full gap-10 lg:gap-8">
        {/* LEFT SIDE: Typography Roster */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="mb-6 lg:mb-10">
            <span className="text-xs lg:text-sm font-bold uppercase tracking-[0.3em] text-neutral-400 block">
              The Minds Behind It //
            </span>
          </div>

          <ul
            className="flex flex-col gap-4 md:gap-6"
            onMouseLeave={() => setActiveMember(null)}
          >
            {teamMembers.map((member) => {
              const isActive = activeMember === member.id;
              const isDimmed = activeMember !== null && !isActive;

              return (
                <li
                  key={member.id}
                  className="group relative cursor-pointer w-max"
                  onMouseEnter={() => setActiveMember(member.id)}
                  onClick={() => handleMemberClick(member.id)} // Added explicit click trigger
                >
                  <h3
                    className={`text-[9vw] lg:text-[4.5vw] font-black uppercase leading-[0.85] tracking-tighter transition-all duration-500 ${
                      isActive
                        ? "text-neutral-900"
                        : "text-transparent [-webkit-text-stroke:1px_#a3a3a3] hover:[-webkit-text-stroke:1px_#171717]"
                    } ${isDimmed ? "opacity-30" : "opacity-100"}`}
                  >
                    {member.name}
                  </h3>

                  {/* Mobile Role: Slides down underneath the name */}
                  <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
                      isActive
                        ? "max-h-10 opacity-100 mt-2"
                        : "max-h-0 opacity-0 mt-0"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-600 block">
                      — {member.role}
                    </span>
                  </div>

                  {/* Desktop Role: Slides out to the right */}
                  <div
                    className={`hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 translate-x-full overflow-hidden transition-all duration-500 ${
                      isActive
                        ? "opacity-100 translate-x-6"
                        : "opacity-0 translate-x-2 pointer-events-none"
                    }`}
                  >
                    <span className="text-sm font-bold uppercase tracking-widest text-neutral-900 whitespace-nowrap">
                      — {member.role}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT SIDE: Image Container */}
        <div
          ref={imageScrollTargetRef} // Target for scrollIntoView
          className="w-full lg:w-1/2 h-[45vh] lg:h-[55vh] relative flex items-center justify-center lg:justify-end pointer-events-none mt-4 lg:mt-0"
        >
          {activeMember ? (
            <div
              className="relative w-full h-full max-w-[320px] lg:max-w-sm overflow-hidden shadow-2xl rounded-xl"
              ref={imageContainerRef}
            >
              <img
                src={teamMembers.find((m) => m.id === activeMember)?.image}
                alt="Team Member"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          ) : (
            <div className="text-neutral-400 font-mono text-sm uppercase tracking-widest animate-pulse hidden lg:block">
              [ Select a name ]
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
