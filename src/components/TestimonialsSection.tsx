"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Using existing images as placeholders for now
const TESTIMONIALS = [
  {
    id: 1,
    image: "/fluffmeuptestimonial.webp",
    alt: "Customer Review 1",
  },
  {
    id: 2,
    image: "/fluffmeuptestimonial2.webp",
    alt: "Customer Review 2",
  },
  {
    id: 3,
    image: "/fluffmeuptestimonial3.webp",

    alt: "Customer Review 3",
  },
  {
    id: 4,
    image: "/fluffmeuptestimonial4.webp",

    alt: "Customer Review 4",
  },
  {
    id: 5,
    image: "/fluffmeuptestimonial5.webp",

    alt: "Customer Review 4",
  },
  {
    id: 6,
    image: "/fluffmeuptestimonial6.webp",

    alt: "Customer Review 4",
  },
  {
    id: 7,
    image: "/fluffmeuptestimonial7.webp",

    alt: "Customer Review 4",
  },
  {
    id: 8,
    image: "/fluffmeuptestimonial8.webp",

    alt: "Customer Review 4",
  },
];

const SnowParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: {
      x: number;
      y: number;
      radius: number;
      speed: number;
      wind: number;
    }[] = [];

    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        wind: Math.random() * 0.5 - 0.25,
      });
    }

    let mouseX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1) to influence wind
      const normalizedX = (e.clientX / width) * 2 - 1;
      mouseX = normalizedX * 2; // Amplified effect
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();

      particles.forEach((p) => {
        // Update position
        p.y += p.speed;
        p.x += p.wind + mouseX; // Add mouse influence

        // Reset if out of bounds
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      });

      ctx.fill();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Unveil effect: Circle expands from 0% to 150% as we scroll into view
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.8], // Triggers as soon as section starts entering
    ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"]
  );

  return (
    <motion.section
      ref={containerRef}
      style={{ clipPath }}
      className="relative w-full min-h-screen md:h-[115vh] overflow-hidden flex flex-col items-center justify-start pt-24 md:pt-32" // Added flex-col and padding-top for layout
    >
      {/* Background Image with Parallax - NO DARK OVERLAY */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 h-[120%]">
        <img
          src="/fluffmeup3.webp"
          alt="Testimonials Background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Snow Animation */}
      <SnowParticles />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col">
        {/* Header - CloudSection Style */}
        <div className="flex justify-center mb-16 md:mb-24">
          {" "}
          {/* Increased margin bottom */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-bold tracking-tight px-12 py-6 rounded-2xl "
            style={{
              fontFamily: "Comfortaa, sans-serif",
              color: "white",
              fontSize: "clamp(2.5rem, 8vw, 4rem)", // Increased mobile font size
              textAlign: "center",
              marginTop: "-5%",
              // CloudSection signature style
              textShadow:
                "4px 4px 0px #F7ADCF, " +
                "8px 8px 20px rgba(247, 173, 207, 0.8), " +
                "0 0 40px rgba(255, 255, 255, 0.5)",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(247, 173, 207, 0.3) 100%)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px 0 rgba(247, 173, 207, 0.4)",
            }}
          >
            Love Notes
          </motion.h2>
        </div>

        {/* Mobile Scroll Instruction */}
        <div className="block md:hidden text-center mb-8 -mt-8 animate-pulse">
          <p
            className="text-white/80 text-sm font-bold tracking-widest"
            style={{ fontFamily: "Comfortaa, sans-serif" }}
          >
            ← Swipe to explore →
          </p>
        </div>

        {/* Image Cards Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-12 md:pb-0 snap-x snap-mandatory scrollbar-hide px-4 md:px-0 mt-22 md:mt-0">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 50, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? 2 : -2 }} // Gentle random rotation
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }} // Popping effect
              className="relative flex-shrink-0 w-[85vw] md:w-[90%] mx-auto snap-center aspect-[3/4] p-3 rounded-2xl bg-white shadow-xl cursor-pointer "
              style={{
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                transformOrigin: "center center",
                marginTop: "18%",
              }}
            >
              {/* "Tape" effect at top */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/80 rotate-1 shadow-sm opacity-60 backdrop-blur-sm z-20" />

              <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100 relative ">
                <img
                  src={t.image}
                  alt={t.alt}
                  className="w-full h-[100%]"
                  loading="lazy"
                />
                {/* Placeholder Overlay to imply it's a screenshot */}
                {/* <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4 backdrop-blur-sm border-t border-white/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-pink-200"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                    <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
                  </div>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
