/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HeroSection from "@/sections/HeroSection";

export default function HeroLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  const imagesList = [
    "/img1.jpeg",
    "/img2.jpeg",
    "/img3.jpeg",
    "/img4.jpeg",
    "/img5.jpeg",
    "/img6.jpeg",
    "/img1.jpeg",
    "/img2.jpeg",
    "/img3.jpeg",
    "/img4.jpeg",
    "/img5.jpeg",
    "/img6.jpeg",
    "/img1.jpeg",
    "/img2.jpeg",
    "/img3.jpeg",
    "/img4.jpeg",
    "/img5.jpeg",
    "/img6.jpeg",
    "/img1.jpeg",
  ];

  useEffect(() => {
    // 1. Quick check: Did this already run in the current session?
    if (sessionStorage.getItem("heroLoaded") === "true") {
      setIsLoaderFinished(true);
      return; // Exit early, skipping all image loading and GSAP logic
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const loadedImages: HTMLImageElement[] = [];
    const frame = { index: 0 };
    let loadedCount = 0;

    imagesList.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        loadedImages[i] = img;
        loadedCount++;
        if (loadedCount === imagesList.length) startSequence();
      };
    });

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = loadedImages[Math.floor(frame.index)];

      if (img) {
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;

        const scale =
          window.innerWidth < 768 ? scaleX * 1.2 : Math.max(scaleX, scaleY);

        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;

        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const startSequence = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();

      const tl = gsap.timeline();

      tl.to(frame, {
        index: imagesList.length - 1,
        snap: "index",
        ease: "steps(" + (imagesList.length - 1) + ")",
        duration: 3,
        onUpdate: render,
      });

      tl.to(textOverlayRef.current, { opacity: 0, y: -20, duration: 0.3 });

      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 1.9,
        ease: "power4.inOut",
        onComplete: () => {
          // 2. Mark as loaded so it doesn't trigger again on returning home
          sessionStorage.setItem("heroLoaded", "true");
          setIsLoaderFinished(true);
        },
      });
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full bg-white">
      {!isLoaderFinished && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-100 bg-black flex items-center justify-center overflow-hidden pointer-events-none"
        >
          <canvas
            ref={canvasRef}
            className="absolute w-full h-full object-cover opacity-60"
          />
          <div
            ref={textOverlayRef}
            className="relative z-10 mix-blend-difference"
          ></div>
        </div>
      )}

      <HeroSection />
    </div>
  );
}
