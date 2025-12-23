"use client";

import { useEffect, useState } from "react";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300), // Show background elements
      setTimeout(() => setStage(2), 600), // Show logo
      setTimeout(() => setStage(3), 1200), // Scale and shine
      setTimeout(() => setStage(4), 2000), // Fade all
      setTimeout(() => onComplete(), 2400), // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Bakery items data with colors and types
  const bakeryItems = [
    { type: "macaron", color1: "#F7ADCF", color2: "#E880AC", delay: 0 },
    { type: "cupcake", delay: 0.5 },
    { type: "coffee", delay: 1 },
    { type: "donut", delay: 1.5 },
    { type: "macaron", color1: "#FCD34D", color2: "#F59E0B", delay: 2 },
    { type: "ribbon", delay: 2.5 },
    { type: "candy", delay: 3 },
    { type: "cupcake", delay: 3.5 },
    { type: "macaron", color1: "#DDD6FE", color2: "#C4B5FD", delay: 4 },
    { type: "donut", delay: 4.5 },
    { type: "coffee", delay: 5 },
    { type: "ribbon", delay: 5.5 },
    { type: "macaron", color1: "#FCA5A5", color2: "#F87171", delay: 6 },
    { type: "candy", delay: 7 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-50 via-rose-100 to-pink-100 flex items-center justify-center overflow-hidden">
      {/* Animated Background Circles */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          stage >= 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Orbiting Bakery Items */}
      {stage >= 1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[550px] h-[550px]">
            {bakeryItems.map((item, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-full animate-orbit-slow"
                style={{
                  animationDelay: `${item.delay * 0.3}s`,
                  animationDuration: `${10 + i}s`,
                }}
              >
                <div
                  className="absolute -top-6 left-1/2 -translate-x-1/2"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                  }}
                >
                  {item.type === "macaron" && (
                    <div className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100 transition-opacity hover:scale-110 transform transition-transform">
                      {/* Macaron Top Shell */}
                      <div
                        className="w-10 h-3 rounded-full shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`,
                          boxShadow: `0 2px 8px ${item.color2}40`,
                        }}
                      >
                        {/* Top Shell Texture */}
                        <div className="w-full h-1 bg-white/20 rounded-t-full" />
                      </div>
                      {/* Cream Filling */}
                      <div className="w-9 h-2 rounded-full bg-white/90 shadow-inner" />
                      {/* Macaron Bottom Shell */}
                      <div
                        className="w-10 h-3 rounded-full shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${item.color2}, ${item.color1})`,
                        }}
                      />
                    </div>
                  )}

                  {item.type === "coffee" && (
                    <div className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110 transform transition-transform">
                      {/* Coffee Cup */}
                      <div className="relative w-10 h-12 bg-gradient-to-b from-amber-100 to-amber-50 rounded-b-lg shadow-lg">
                        {/* Cup Rim */}
                        <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-b from-amber-200 to-amber-100 rounded-t-lg" />
                        {/* Coffee Liquid */}
                        <div className="absolute top-2 left-1 right-1 h-6 bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-md overflow-hidden">
                          {/* Steam */}
                          <div className="absolute top-0 left-1/4 w-1 h-3 bg-white/30 rounded-full animate-steam" />
                          <div
                            className="absolute top-0 right-1/4 w-1 h-3 bg-white/30 rounded-full animate-steam"
                            style={{ animationDelay: "0.5s" }}
                          />
                        </div>
                        {/* Handle */}
                        <div className="absolute top-3 -right-2 w-3 h-5 border-2 border-amber-200 rounded-r-full" />
                      </div>
                    </div>
                  )}

                  {item.type === "candy" && (
                    <div className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110 transform transition-transform">
                      {/* Wrapped Candy */}
                      <div className="relative">
                        {/* Candy Body */}
                        <div className="w-8 h-6 bg-gradient-to-br from-pink-400 via-rose-300 to-pink-500 rounded-full shadow-lg relative overflow-hidden">
                          {/* Shine */}
                          <div className="absolute top-1 left-1 w-3 h-2 bg-white/40 rounded-full" />
                          {/* Stripes */}
                          <div className="absolute inset-y-0 left-1/4 w-1 bg-white/20" />
                        </div>
                        {/* Wrapper Left */}
                        <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-4 bg-gradient-to-l from-rose-300/80 to-transparent rotate-[-20deg]" />
                        {/* Wrapper Right */}
                        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-4 bg-gradient-to-r from-rose-300/80 to-transparent rotate-[20deg]" />
                      </div>
                    </div>
                  )}

                  {item.type === "cupcake" && (
                    <div className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110 transform transition-transform">
                      {/* Cupcake */}
                      <div className="relative flex flex-col items-center">
                        {/* Frosting */}
                        <div className="w-8 h-6 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-full shadow-md relative overflow-hidden">
                          {/* Swirl */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-200 rounded-full" />
                          {/* Sprinkles */}
                          <div className="absolute top-2 left-1 w-0.5 h-1 bg-yellow-300 rounded rotate-45" />
                          <div className="absolute top-3 right-1.5 w-0.5 h-1 bg-blue-300 rounded -rotate-45" />
                          <div className="absolute top-2.5 left-3 w-0.5 h-1 bg-pink-500 rounded" />
                        </div>
                        {/* Wrapper */}
                        <div className="w-7 h-4 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-md shadow-sm">
                          {/* Wrapper Lines */}
                          <div className="absolute inset-x-0 bottom-2 h-px bg-amber-300/50" />
                          <div className="absolute inset-x-0 bottom-1 h-px bg-amber-300/50" />
                        </div>
                      </div>
                    </div>
                  )}

                  {item.type === "donut" && (
                    <div className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110 transform transition-transform">
                      {/* Donut */}
                      <div className="relative">
                        {/* Donut Body */}
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full shadow-md relative">
                          {/* Hole */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-50 rounded-full shadow-inner" />
                          {/* Frosting */}
                          <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-pink-400 to-pink-500 rounded-t-full opacity-90 overflow-hidden">
                            {/* Drips */}
                            <div className="absolute bottom-0 left-2 w-1.5 h-2 bg-pink-400 rounded-b-full" />
                            <div className="absolute bottom-0 right-2 w-1.5 h-2 bg-pink-400 rounded-b-full" />
                          </div>
                          {/* Sprinkles on frosting */}
                          <div className="absolute top-1 left-2 w-0.5 h-1 bg-yellow-300 rounded rotate-45" />
                          <div className="absolute top-2 right-2 w-0.5 h-1 bg-blue-300 rounded -rotate-30" />
                          <div className="absolute top-0.5 left-4 w-0.5 h-1 bg-green-300 rounded rotate-12" />
                        </div>
                      </div>
                    </div>
                  )}

                  {item.type === "ribbon" && (
                    <div className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110 transform transition-transform">
                      {/* Ribbon Bow */}
                      <div className="relative">
                        {/* Left Loop */}
                        <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full shadow-sm transform -rotate-45" />
                        {/* Right Loop */}
                        <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl from-pink-300 to-pink-400 rounded-full shadow-sm transform rotate-45" />
                        {/* Center Knot */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full shadow-md z-10" />
                        {/* Tails */}
                        <div className="absolute top-4 left-1 w-1 h-3 bg-gradient-to-b from-pink-400 to-pink-300 transform rotate-12" />
                        <div className="absolute top-4 right-1 w-1 h-3 bg-gradient-to-b from-pink-400 to-pink-300 transform -rotate-12" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Sparkles */}
      {stage >= 2 && (
        <>
          {[...Array(25)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-twinkle"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 1}s`,
              }}
            >
              {/* Star Shape */}
              <div className="relative w-2 h-2">
                <div
                  className="absolute inset-0 bg-yellow-300 rotate-0"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                />
              </div>
            </div>
          ))}
        </>
      )}

      {/* Animated Lines */}
      <div
        className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent transition-opacity duration-700 ${
          stage >= 2 ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent transition-opacity duration-700 ${
          stage >= 3 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Content */}
      <div
        className={`relative z-10 transition-all duration-700 ${
          stage === 4 ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      >
        {/* Logo */}
        <div
          className={`relative overflow-hidden transition-all duration-1000 ${
            stage >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src="/logof.webp"
            alt="Fluff Me Up"
            className={`w-64 md:w-96 h-auto object-contain transition-all duration-1000 ${
              stage >= 3 ? "scale-100 blur-0" : "scale-110 blur-sm"
            }`}
            style={{
              filter:
                stage >= 3
                  ? "drop-shadow(0 4px 20px rgba(236, 72, 153, 0.4))"
                  : "none",
            }}
          />

          {/* Shine Effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-500 ${
              stage === 3 ? "animate-shine" : ""
            }`}
            style={{ transform: "skewX(-20deg)" }}
          />

          {/* Glow Ring Around Logo */}
          {stage >= 3 && (
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-[-20px] border-2 border-pink-200/30 rounded-full animate-pulse-ring" />
              <div
                className="absolute inset-[-40px] border border-rose-200/20 rounded-full animate-pulse-ring"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          )}
        </div>

        {/* Subtitle */}
        <div
          className={`text-center mt-6 transition-all duration-1000 delay-300 ${
            stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* <p className="text-xs md:text-sm font-light tracking-[0.4em] text-pink-400 uppercase">
            Artisan Macarons & More
          </p> */}
        </div>
      </div>

      {/* Corner Accents with Animation */}
      <div
        className={`absolute top-8 left-8 w-16 h-16 transition-all duration-700 ${
          stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-300 to-transparent" />
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-pink-300 to-transparent" />
      </div>
      <div
        className={`absolute bottom-8 right-8 w-16 h-16 transition-all duration-700 ${
          stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-pink-300 to-transparent" />
        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-pink-300 to-transparent" />
      </div>

      {/* Additional Cute Dynamic Elements */}
      {stage >= 1 && (
        <>
          {/* Confetti Pieces */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-3 rounded-sm opacity-70"
                style={{
                  background: [
                    "#F7ADCF",
                    "#FCD34D",
                    "#DDD6FE",
                    "#FCA5A5",
                    "#A7F3D0",
                  ][Math.floor(Math.random() * 5)],
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}

          {/* Bouncing Hearts */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-2xl animate-bounce-heart"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random()}s`,
              }}
            >
              <span
                style={{
                  color: ["#F7ADCF", "#FCA5A5", "#DDD6FE"][i % 3],
                  opacity: 0.5,
                }}
              >
                ♥
              </span>
            </div>
          ))}

          {/* Sugar Crystals/Sprinkles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`sugar-${i}`}
              className="absolute w-0.5 h-2 rounded-full animate-shimmer"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: ["#FFD700", "#FF69B4", "#87CEEB", "#98FB98"][
                  Math.floor(Math.random() * 4)
                ],
                animationDelay: `${Math.random() * 3}s`,
                transform: `rotate(${Math.random() * 180}deg)`,
              }}
            />
          ))}
        </>
      )}

      <style jsx>{`
        @keyframes shine {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes orbit-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-ring {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }

        @keyframes steam {
          0% {
            opacity: 0.3;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }

        .animate-orbit-slow {
          animation: orbit-slow linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        .animate-steam {
          animation: steam 2s ease-in-out infinite;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes bounce-heart {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.1);
          }
        }

        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-confetti-fall {
          animation: confetti-fall linear infinite;
        }

        .animate-bounce-heart {
          animation: bounce-heart ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
