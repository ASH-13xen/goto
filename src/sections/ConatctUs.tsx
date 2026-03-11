"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  MessageCircle,
  Instagram,
  Linkedin,
  AtSign,
  ArrowUpRight,
  Mail, // Added Mail icon
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.fromTo(
        ".contact-title",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
      );

      tl.fromTo(
        ".contact-card",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
        "-=0.4",
      );

      tl.fromTo(
        ".map-container",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="contact-us"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F9F9F9] text-black font-sans py-24 px-4 md:px-12 flex flex-col items-center overflow-hidden"
    >
      {/* --- NOISE OVERLAY --- */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.2] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12">
        {/* SECTION HEADER */}
        <div className="flex flex-col items-start gap-4">
          <div className="contact-title bg-black text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            Ready to build?
          </div>
          <h2 className="contact-title text-[9vw] md:text-[7vw] lg:text-[6.5vw] font-black tracking-tighter uppercase leading-none text-black whitespace-nowrap">
            Get In Touch
          </h2>
        </div>

        {/* CONTACT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: Quick Contact Cards */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Direct Call Card */}
            <a
              href="tel:+919203411613"
              className="contact-card group flex items-center justify-between p-6 md:p-7 bg-white border-2 border-black hover:bg-black hover:text-white transition-all duration-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <Phone className="w-8 h-8 md:w-10 md:h-10 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-50">
                    Direct Call
                  </p>
                  <p className="text-xl md:text-3xl font-black">
                    +91-9203411613
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 group-hover:opacity-100 transition-all shrink-0" />
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/919203411613"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card group flex items-center justify-between p-6 md:p-7 bg-white border-2 border-black hover:bg-black hover:text-white transition-all duration-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <MessageCircle className="w-8 h-8 md:w-10 md:h-10 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-50">
                    WhatsApp
                  </p>
                  <p className="text-xl md:text-3xl font-black">Chat with us</p>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 group-hover:opacity-100 transition-all shrink-0" />
            </a>

            {/* NEW: Email Card */}
            <a
              href="mailto:gotofriend@gmail.com"
              className="contact-card group flex items-center justify-between p-6 md:p-7 bg-white border-2 border-black hover:bg-black hover:text-white transition-all duration-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <div className="flex items-center gap-4 md:gap-6 overflow-hidden">
                <Mail className="w-8 h-8 md:w-10 md:h-10 shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-50">
                    Email
                  </p>
                  {/* Truncated slightly for mobile so it doesn't break layout */}
                  <p className="text-xl md:text-3xl font-black truncate max-w-[200px] sm:max-w-none">
                    gotofriend@gmail.com
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2" />
            </a>

            {/* SOCIAL BAR */}
            <div className="contact-card grid grid-cols-3 gap-4">
              <a
                href="https://www.instagram.com/goto_friend/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-6 bg-white border-2 border-black hover:invert transition-all duration-300"
              >
                <Instagram className="w-6 h-6 mb-2" />
                <span className="text-[10px] font-bold uppercase">Insta</span>
              </a>
              <a
                href="https://www.linkedin.com/company/go-to-friend/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-6 bg-white border-2 border-black hover:invert transition-all duration-300"
              >
                <Linkedin className="w-6 h-6 mb-2" />
                <span className="text-[10px] font-bold uppercase">
                  LinkedIn
                </span>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center py-6 bg-white border-2 border-black hover:invert transition-all duration-300"
              >
                <AtSign className="w-6 h-6 mb-2" />
                <span className="text-[10px] font-bold uppercase">Threads</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Embedded Map */}
          <div className="map-container relative w-full h-[400px] lg:h-full border-2 border-black grayscale contrast-[1.2] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <iframe
              title="Our Location"
              src="https://maps.google.com/maps?q=3rd%20Floor,%20H.R.%20Vertex,%20Plot%20No%2076,%20Sec%20-%203,%20behind%20Apollo%20Pharmacy,%20Geetanjali%20Colony,%20Shankar%20Nagar,%20Raipur,%20Chhattisgarh%20492004&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-4 border-black/5"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
