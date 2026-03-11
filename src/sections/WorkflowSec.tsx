"use client";

import React from "react";

const steps = [
  { id: "01", title: "IDEATION", desc: "Sparking the initial concept" },
  { id: "02", title: "PLANNING", desc: "Charting the course forward" },
  { id: "03", title: "EXECUTION", desc: "Bringing the vision to life" },
  { id: "04", title: "FEEDBACK", desc: "Refining for perfection" },
];

export default function WorkflowSection() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col justify-center py-20">
      {/* --- FILM GRAIN OVERLAY --- */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.15] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- CONTENT LAYOUT --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-12 gap-16 lg:gap-8">
        {/* LEFT SIDE: Intro */}
        <div className="w-full lg:w-1/2 flex flex-col items-start gap-8">
          <div className="border-2 border-white bg-white text-black px-6 py-3 text-lg md:text-xl font-bold uppercase tracking-widest">
            What We Do
          </div>
          <p className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            We work across the entire market spectrum—
            <span className="font-black block text-white mt-2">
              Offline, Online & Experiential.
            </span>
          </p>
          <div className="w-24 h-1.5 bg-white mt-4"></div>
        </div>

        {/* RIGHT SIDE: The Steps Workflow */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-10 lg:pl-12">
          {/* Section Heading */}
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-neutral-400">
              Our Workflow
            </h2>
            <div className="w-12 h-1 bg-neutral-700 mt-4"></div>
          </div>

          {/* Workflow Steps */}
          <div className="flex flex-col gap-8">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-6">
                {/* The Number Badge */}
                <span className="flex items-center justify-center font-mono text-lg font-bold bg-white text-black h-12 w-12 shrink-0">
                  {step.id}
                </span>

                {/* Text Container */}
                <div className="flex flex-col">
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-md">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base font-mono uppercase tracking-widest text-neutral-400 mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
