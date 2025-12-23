"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface HeroSectionProps {
  onNavHover?: () => void;
  onNavLeave?: () => void;
}

export default function HeroSection({
  onNavHover,
  onNavLeave,
}: HeroSectionProps) {
  const [taglineIndex, setTaglineIndex] = useState(-1);
  const [startTagline, setStartTagline] = useState(false);
  const taglineParts = ["Fluff it.", "Feel it.", "Vibe it."];

  // Start tagline animation after intro completes (2.4s intro + 0.5s fade + 0.5s buffer = 3.4s)
  useEffect(() => {
    const introTimer = setTimeout(() => {
      setStartTagline(true);
    }, 3400);
    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (startTagline && taglineIndex < taglineParts.length - 1) {
      const timer = setTimeout(() => {
        setTaglineIndex((prev) => prev + 1);
      }, 700); // delay between each part
      return () => clearTimeout(timer);
    }
  }, [taglineIndex, startTagline]);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center p-8 md:p-12">
      {/* Centered Hero Image */}
      <div className="z-10 text-center flex flex-col items-center">
        {/* Logo with smooth artistic scale + fade-in */}
        <img
          src="/logof.webp"
          alt="Fluff Me Up"
          className="w-64 md:w-96 h-auto object-contain animate-fade-in-up drop-shadow-2xl"
        />

        {/* Tagline Animation */}
        <div className="h-12 mt-6 flex items-center justify-center gap-3 md:gap-6 overflow-hidden">
          {taglineParts.map((part, index) => (
            <span
              key={index}
              className={`
                text-xl md:text-3xl font-light tracking-[0.2em] text-white uppercase transition-all duration-700
                ${index <= taglineIndex
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-8 blur-sm"
                }
              `}
            >
              {part}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav
        onMouseEnter={onNavHover}
        onMouseLeave={onNavLeave}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center items-center gap-2 md:gap-8 font-body text-sm md:text-lg font-bold transition-all duration-300 animate-slide-up group hover:-translate-y-1"
        style={{
          padding: "12px 20px",
          borderRadius: "9999px",
          backgroundColor: "#F7ADCF",
          boxShadow: `
            0 4px 0 #D66996,                 /* Darker pink "feet" / 3D depth */
            0 8px 20px rgba(0,0,0,0.2),      /* Drop shadow */
            inset 0 2px 4px rgba(255,255,255,0.4) /* Top highlight for gloss */
          `,
        }}
      >
        {["Cozy vibes & sweet treats"].map((label) => (
          <Link
            key={label}
            href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
            className="relative px-8 py-2 md:px-12 lg:px-20 md:py-4 lg:py-6 rounded-full transition-all duration-300 group/item hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {/* Hover Background with Multiple Cookie Bites */}
            <span
              className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-full opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:rotate-1"
              style={{
                maskImage: `
                  radial-gradient(circle at 100% 0%, transparent 18px, black 19px),
                  radial-gradient(circle at 0% 100%, transparent 12px, black 13px)
                `,
                WebkitMaskImage: `
                  radial-gradient(circle at 100% 0%, transparent 18px, black 19px),
                  radial-gradient(circle at 0% 100%, transparent 12px, black 13px)
                `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
                boxShadow: `
                  inset 0 2px 4px rgba(0,0,0,0.1),
                  inset 0 -2px 4px rgba(0,0,0,0.05),
                  0 2px 8px rgba(0,0,0,0.15)
                `,
              }}
            />

            {/* Text Label */}
            <span className="relative z-10 text-white font-bold tracking-wide transition-all duration-300 group-hover/item:text-[#D66996] group-hover/item:scale-105 drop-shadow-sm group-hover/item:drop-shadow-none text-base md:text-lg lg:text-xl">
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
