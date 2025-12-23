"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import VideoHeader from "@/components/VideoHeader";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import CartIcon from "@/components/CartIcon";
import InstagramIcon from "@/components/InstagramIcon";
import ReservationButton from "@/components/ReservationButton";

// Dynamically import heavy components with lazy loading
const IntroLoader = dynamic(() => import("@/components/IntroLoader"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-white z-50" />,
});

const ScrollSection = dynamic(() => import("@/components/ScrollSection"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[600vh] bg-gradient-to-b from-pink-100 to-white" />
  ),
});

const MacaronSection = dynamic(() => import("@/components/MacaronSection"), {
  ssr: false,
  loading: () => <div className="relative w-full h-[150vh] bg-pink-200" />,
});

const CloudSection = dynamic(() => import("@/components/CloudSection"), {
  ssr: false,
  loading: () => <div className="relative w-full h-[120vh] bg-pink-300" />,
});

const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection"),
  {
    ssr: false,
    loading: () => <div className="relative w-full h-screen bg-neutral-900" />,
  }
);

export default function Home() {
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loaderCompleted, setLoaderCompleted] = useState(false);

  const handleLoaderComplete = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowLoader(false);
      setLoaderCompleted(true); // Mark as completed to prevent re-rendering
      // Ensure page is at the top after intro
      window.scrollTo(0, 0);
    }, 500); // Wait for fade-out to complete
  };

  return (
    <>
      {/* Intro Loader - Only shows once on initial load */}
      {!loaderCompleted && showLoader && (
        <div
          className={`transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          <IntroLoader onComplete={handleLoaderComplete} />
        </div>
      )}

      {/* 1. Fixed Background Video (Wallpaper) - Outside transform container to maintain fixed positioning */}
      <div
        className={`transition-opacity duration-1000 ${showLoader ? "opacity-0" : "opacity-100"
          }`}
      >
        <VideoHeader isNavHovered={isNavHovered} />
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-1000 ${showLoader
            ? "opacity-0 scale-95"
            : fadeOut // If fadeOut is true (loader done), we wait for animation
              ? "opacity-100" // Removed scale/transform classes to fix sticky
              : "opacity-100 scale-100 animate-wow-entrance"
          }`}
        onAnimationEnd={() => {
          // Remove the animation class to clear the transform
          const el = document.getElementById("main-content-wrapper");
          if (el) {
            el.classList.remove("animate-wow-entrance", "scale-100");
          }
        }}
        id="main-content-wrapper"
      >
        {/* 2. Main Content */}
        <main className="relative w-full z-10">
          {/* The Hero Section takes up the full first screen height */}
          <HeroSection
            onNavHover={() => setIsNavHovered(true)}
            onNavLeave={() => setIsNavHovered(false)}
          />

          {/* Immersive Scroll Section */}
          <ScrollSection />

          {/* Content below the fold (scroll down to see this) */}
          <div className="bg-white relative">
            <MacaronSection />
            <TestimonialsSection />
            <CloudSection />

            <Footer />
          </div>
        </main>

        {/* Cart and Instagram Icons */}

        <ReservationButton />
        <CartIcon />
        <InstagramIcon />
      </div>

      <style jsx>{`
        @keyframes wow-entrance {
          0% {
            transform: scale(0.95);
            filter: blur(10px);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
            filter: blur(0);
          }
        }

        .animate-wow-entrance {
          animation: wow-entrance 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </>
  );
}
