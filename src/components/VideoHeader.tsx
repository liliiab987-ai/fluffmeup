"use client";

import { useRef, useEffect } from "react";

interface VideoHeaderProps {
  isNavHovered: boolean;
}

export default function VideoHeader({ isNavHovered }: VideoHeaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hasPlayed = false;

    // Attempt initial play
    const attemptPlay = () => {
      if (hasPlayed) return;
      video.play().then(() => {
        hasPlayed = true;
      }).catch((e) => {
        console.log("Autoplay prevented:", e);
      });
    };

    // Intersection Observer for lazy autoplay
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    // Multiple fallback triggers
    const handleInteraction = () => {
      attemptPlay();
    };

    // Try on any user interaction
    document.addEventListener("touchstart", handleInteraction, { once: true });
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("scroll", handleInteraction, { once: true });

    attemptPlay(); // Try immediately

    return () => {
      observer.disconnect();
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover scale-100 object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Overlay: Darkens slightly to make white text pop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Fancy Sparkle Border Effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isNavHovered ? "opacity-100" : "opacity-0"
          }`}
      >
        {/* Main Glowing Border */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 40px 10px #F7ADCF, inset 0 0 80px 20px rgba(247, 173, 207, 0.4)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />

        {/* Chasing Gradient Border */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -inset-[50%] w-[200%] h-[200%] animate-spin-slow opacity-60"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, #F7ADCF 90deg, transparent 180deg, #FFD700 270deg, transparent 360deg)",
              maskImage:
                "linear-gradient(black, black), linear-gradient(black, black)",
              maskClip: "content-box, border-box",
              maskComposite: "exclude",
              padding: "10px", // Border width
            }}
          />
        </div>

        {/* Sparkle Particles (Pseudo-elements simulation) */}
        <div className="absolute inset-0 border-[2px] border-white/20" />
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: inset 0 0 40px 10px #f7adcf,
              inset 0 0 80px 20px rgba(247, 173, 207, 0.4);
          }
          50% {
            box-shadow: inset 0 0 60px 15px #f7adcf,
              inset 0 0 100px 30px rgba(247, 173, 207, 0.6);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
