/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";

const cardsData = [
  {
    id: "agency",
    subtitle: "The Agency //",
    title: "Go-To Friend.",
    content: (
      <div className="flex flex-col gap-4 md:gap-6 text-base md:text-xl text-neutral-300">
        <p>
          <strong className="text-white">Go-To Friend</strong> is a Raipur-based
          Marketing Strategist & Branding Agency driven by ideas, execution, and
          measurable growth.
        </p>
        <p className="italic text-neutral-400">
          A team of 15+ creative strategists who blend digital intelligence with
          on-ground innovation to help brands stand out in noisy markets.
        </p>
        <p>
          From startups to established businesses, we partner with brands that
          are ready to grow, experiment, and lead.
        </p>
      </div>
    ),
  },
  {
    id: "founder",
    subtitle: "The Founder //",
    title: "Prakhar Agrawal.",
    content: (
      <div className="flex flex-col gap-4 md:gap-6 text-base md:text-xl text-neutral-300">
        <p>
          After schooling at DPS Raipur, Prakhar moved to Dehradun and
          eventually to Mumbai as a Fire & Safety Engineer.
        </p>
        <p>
          But money never attracted him. He chose passion over a raise,
          returning to his roots in Raipur to open{" "}
          <strong className="text-white">"Happy Belly Cafe."</strong>
        </p>
        <p className="border-l-2 border-white/30 pl-4 md:pl-6 text-white font-bold italic mt-2">
          "Leadership isn't about the title; it's about integrity, empathy, and
          the courage to start over."
        </p>
      </div>
    ),
  },
  {
    id: "vision",
    subtitle: "The Vision //",
    title: "The Podcast.",
    content: (
      <div className="flex flex-col gap-4 md:gap-6 text-base md:text-xl text-neutral-300">
        <p>
          In 2023, Prakhar pivoted his experience from hospitality and business
          into founding Go-To Friend.
        </p>
        <p>
          Simultaneously, he launched the{" "}
          <strong className="text-white">Raipur Podcast</strong>—a platform
          dedicated to bridging the gap between raw life journeys and polished
          brand stories.
        </p>
        <p>
          Because at the end of the day, every great brand is built on a great
          human story.
        </p>
      </div>
    ),
  },
];

export default function AboutCardsSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-black text-white font-sans px-4 py-24 md:py-32"
    >
      {/* --- FILM GRAIN OVERLAY --- */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* The container needs some gap and padding-bottom 
        so the final card has enough room to scroll into view.
      */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-16 md:gap-32 pb-[20vh]">
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className="sticky w-full min-h-[60vh] bg-neutral-900 border border-white/10 rounded-2xl md:rounded-3xl p-8 md:p-14 shadow-[0_-20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-center"
            style={{
              // The Magic: Each card stops slightly lower than the one before it.
              // 15vh pushes the whole stack down from the top edge of the screen.
              // index * 30px creates the visible "ladder" steps.
              top: `calc(15vh + ${index * 30}px)`,
            }}
          >
            <div className="mb-6 md:mb-8">
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 md:mb-4 block">
                {card.subtitle}
              </span>
              <h2 className="text-4xl md:text-7xl font-black uppercase leading-none tracking-tighter text-white">
                {card.title}
              </h2>
            </div>

            <div className="max-w-2xl">{card.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
