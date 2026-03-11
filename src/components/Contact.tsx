"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const formElementsRef = useRef<(HTMLDivElement | HTMLFormElement | null)[]>(
    [],
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle the Enter/Exit animations
  // Handle the Enter/Exit animations
  useEffect(() => {
    // 1. Safety check: ensure main wrapper elements exist
    if (!overlayRef.current || !panelRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(overlayRef.current, {
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    tl.to(
      panelRef.current,
      { y: "0%", duration: 0.6, ease: "expo.out" },
      "-=0.1",
    );

    // 2. Filter out null values before passing to GSAP
    const validFormElements = formElementsRef.current.filter(Boolean);

    // 3. Only animate form elements if they currently exist on the screen
    if (validFormElements.length > 0) {
      tl.fromTo(
        validFormElements,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.4",
      );
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.play();
    } else {
      document.body.style.overflow = "unset";
      gsap.to(panelRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.4, delay: 0.2 });

      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        // 4. Optional but good practice: clear the refs array when resetting
        formElementsRef.current = [];
      }, 500);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // --- NEW WHATSAPP SUBMIT HANDLER ---
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Get the data from the form
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    // 2. Format the message with WhatsApp markdown (* makes text bold)
    const whatsappText = `*New Target Acquired (Initiate Protocol)*

*Identity:* ${name}
*Direct Line:* ${phone}
*Objective:* ${message || "No objective provided."}`;

    // 3. Your target WhatsApp number (include country code, NO plus sign)
    // Example for US: "12345678900", Example for India: "919876543210"
    const targetNumber = "918817398431";

    // 4. Create the URL
    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedText}`;

    // Simulate a brief "Transmitting" effect for UI polish, then execute
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");
    }, 800);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-end invisible bg-black/60 backdrop-blur-sm"
    >
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div
        ref={panelRef}
        className="relative w-full md:max-w-2xl mx-auto bg-[#050505] border-t md:border-x border-neutral-800 rounded-t-3xl md:rounded-t-[40px] h-[90vh] md:h-[85vh] flex flex-col transform translate-y-full shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
      >
        <div className="w-full flex justify-center pt-4 pb-2 absolute top-0 left-0 z-10 md:hidden">
          <div className="w-12 h-1.5 bg-neutral-700 rounded-full" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-neutral-500 hover:text-white font-bold uppercase tracking-widest text-xs px-4 py-2 border border-neutral-800 hover:border-white rounded-full transition-all"
        >
          Close
        </button>

        <div className="flex-grow overflow-y-auto px-6 md:px-16 pt-20 pb-12 custom-scrollbar">
          {!isSuccess ? (
            <>
              <div
                ref={(el) => {
                  formElementsRef.current[0] = el;
                }}
                className="mb-10"
              >
                <h2 className="text-[10vw] md:text-[4vw] font-black uppercase leading-[0.9] tracking-tighter text-white mb-4">
                  Initiate <br />
                  <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">
                    Protocol.
                  </span>
                </h2>
                <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed max-w-md">
                  Drop your digits. Our lead strategist will call you directly.
                  <span className="block mt-2 font-bold text-white tracking-widest uppercase text-xs">
                    // Rerouting to secure comms (WhatsApp).
                  </span>
                </p>
              </div>

              <form
                ref={(el) => {
                  formElementsRef.current[1] = el;
                }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col group">
                  <label className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-2 transition-colors group-focus-within:text-white">
                    01 // Identity (Name)
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-neutral-800 py-3 text-xl md:text-2xl font-bold text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col group">
                  <label className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-2 transition-colors group-focus-within:text-white">
                    02 // Direct Line (Contact Number)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-transparent border-b border-neutral-800 py-3 text-xl md:text-2xl font-bold text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col group">
                  <label className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-2 transition-colors group-focus-within:text-white">
                    03 // The Objective (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="What are we building?"
                    className="w-full bg-transparent border-b border-neutral-800 py-3 text-lg md:text-xl font-bold text-white placeholder-neutral-700 focus:outline-none focus:border-white transition-colors resize-none rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full mt-4 bg-white text-black font-black uppercase tracking-widest text-lg py-5 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting
                      ? "Establishing Connection..."
                      : "Send Coordinates via WhatsApp"}
                  </span>
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-neutral-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                {/* Replaced standard checkmark with a WhatsApp-style or generic success icon */}
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                Comms <br /> Rerouted.
              </h3>
              <p className="text-neutral-400 font-light text-lg max-w-sm">
                If WhatsApp didn't open automatically, please check your popup
                blocker.
              </p>
              <button
                onClick={onClose}
                className="mt-12 px-8 py-3 border border-white text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-full"
              >
                Return to Base
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #050505;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
