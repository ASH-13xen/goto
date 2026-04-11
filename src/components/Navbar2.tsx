/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { ArrowUpRight } from "lucide-react";
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="flex items-center gap-3 text-xl md:text-2xl font-black tracking-tighter uppercase">
            {/* 👇 NEXT.JS IMAGE TAG 👇 */}
            <Image 
              src="/logos/GO-TO.png" 
              alt="Go-To Friend Logo" 
              width={40} // Adjust width to make it smaller/larger
              height={25} // Adjust height based on your oval's aspect ratio
              className="object-contain"
              priority // Loads the logo instantly
            />
            <a href="/#services">Go-To Friend</a>
          </div>


          <div className="flex items-center gap-3 md:gap-4">
            
          </div>
        </div>
      </nav>

    </>
  );
}
