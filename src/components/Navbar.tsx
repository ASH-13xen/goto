/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ContactModal from "./Contact"; // NOTE: Adjust this import path depending on where your Contact.tsx is located

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Prevent background scrolling when the mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-90 font-sans">
        {/* TOP BAR (Always visible) */}
        <div className="relative w-full bg-white border-b border-black text-black z-20 flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
          {/* LOGO */}
          <div className="text-xl md:text-2xl font-black tracking-tighter uppercase">
            <a href="#">Go-To Friend</a>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
            <a href="#services" className="hover:underline underline-offset-4">
              Services
            </a>

            <a href="#about" className="hover:underline underline-offset-4">
              About
            </a>
            <a href="#team" className="hover:underline underline-offset-4">
              Team
            </a>
            <a
              href="#contact-us"
              className="hover:underline underline-offset-4"
            >
              Contact
            </a>
          </div>

          {/* RIGHT ACTION ITEMS */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* CTA BUTTON - Triggers Modal */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="group flex items-center gap-1.5 md:gap-2 bg-black text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* MOBILE HAMBURGER TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-1 text-black"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN (Slides down from underneath the navbar) */}
        <div
          className={`md:hidden absolute top-full left-0 w-full h-screen bg-white text-black z-10 transition-transform duration-500 ease-in-out border-b border-black ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-[150%]"
          }`}
        >
          <div className="flex flex-col items-center pt-24 gap-10 text-2xl font-black uppercase tracking-widest">
            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-neutral-500 transition-colors"
            >
              Services
            </a>
            <a
              href="#work"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-neutral-500 transition-colors"
            >
              Work
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-neutral-500 transition-colors"
            >
              About
            </a>
          </div>
        </div>
      </nav>

      {/* GLOBAL CONTACT MODAL */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
