"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MacaronSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animation plays in the FIRST 85% of the section scroll
  // This makes the scroll feel like it's "driving" the animation directly
  // The remaining 15% is a "dwell" time to admire the result
  const animationProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  // Macaron rolls from far left to left-center
  const x = useTransform(animationProgress, [0, 1], ["-65%", "5%"]);
  // Macaron rotates as it moves (rolls)
  const rotate = useTransform(animationProgress, [0, 1], [-360, 360]);

  // Text moves from left to right with an ULTRA-SMOOTH BOUNCE at the end
  // Multiple steps create a silky, fluid motion like a gentle cushion
  const textX = useTransform(
    animationProgress,
    [0, 0.8, 0.86, 0.9, 0.94, 0.97, 0.99, 1], // Ultra-smooth sequence
    ["5%", "35%", "36.5%", "34.5%", "35.2%", "34.9%", "35%", "35%"] // Very gentle oscillation
  );

  // Scale for bounce effect - ultra-smooth and barely noticeable
  const textScale = useTransform(
    animationProgress,
    [0, 0.8, 0.85, 0.89, 0.92, 0.95, 0.97, 0.99, 1], // Many steps for buttery smoothness
    [1, 1, 1.03, 1.018, 1.012, 1.006, 1.002, 1, 1] // Extremely gentle scale variation
  );

  // Paragraph text fades in and slides up after main animation
  const paragraphOpacity = useTransform(animationProgress, [0.9, 1], [0, 1]);
  const paragraphY = useTransform(animationProgress, [0.9, 1], [20, 0]); // Slide up 20px

  // Wavy background slides up at the end
  // We use scrollYProgress directly to ensure it completes even if animationProgress is clamped
  const waveY = useTransform(scrollYProgress, [0.2, 1.34], ["100%", "0%"]);

  // Blink effect for the glow
  // It stays off (0 opacity) until the wave is up, then blinks on
  const glowOpacity = useTransform(
    scrollYProgress,
    [1.05, 0.98, 0.97, 0.98, 1],
    [0, 1, 0.1, 1, 1]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[150vh]" // Reduced height for better scroll feel
      style={{
        backgroundImage: "url('/fluffcafe.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Sticky container that pins content while animation plays */}
      <div className="sticky top-0 h-screen flex items-start pt-20 md:pt-32 overflow-hidden">
        <motion.div className="relative w-full h-full max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row md:items-start">
          {/* Rolling Macaron */}
          <motion.div
            style={{ x, rotate }}
            className="w-[40vw] h-[40vw] md:w-88 md:h-88 z-20 relative mt-4 md:mt-4"
          >
            <img
              src="/01-Photoroom.webp"
              alt="Rolling Macaron"
              className="w-full h-full object-contain drop-shadow-xl"
              loading="lazy"
            />
          </motion.div>

          {/* Desktop Title (Original behavior) */}
          <motion.div
            style={{ x: textX, scale: textScale }}
            className="hidden md:block absolute left-0 z-10 whitespace-nowrap pl-72 pt-8 text-left"
            transition={{
              scale: {
                type: "tween",
                duration: 0.3,
              },
            }}
          >
            <h2
              className="font-bold tracking-tight "
              style={{
                fontFamily: "Comfortaa, sans-serif",
                color: "white",
                fontSize: "clamp(1rem, 12vw, 10rem)",
                textShadow:
                  "4px 4px 0px rgb(255, 255, 255), " +
                  "8px 8px 20px #F7ADCF, " +
                  "0 0 10px rgb(255, 255, 255)",
                lineHeight: 1.7,
                WebkitTextStroke: "10px rgb(255, 255, 255)",
              }}
            >
              A Place for you
            </h2>
          </motion.div>

          {/* Mobile Title (Fade in below Macaron) */}
          <motion.div
            style={{ opacity: paragraphOpacity }}
            className="block md:hidden z-10 whitespace-nowrap text-center mt-8 relative"
          >
            <h2
              className="font-bold tracking-tight px-6 py-4 rounded-2xl"
              style={{
                fontFamily: "Comfortaa, sans-serif",
                color: "white",
                fontSize: "clamp(1.5rem, 6vw, 2.5rem)", // Adjusted for pill shape
                textAlign: "center",
                // Copied "Love Notes" / "CloudSection" signature style
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
                marginTop: "25%",
              }}
            >
              A Place for you
            </h2>
          </motion.div>

          {/* Descriptive Text - appears below macaron after animation */}
          {/* Moving Border Component */}
          {/* This component creates a rotating light effect on the border */}
          {/* It uses a mask to only show the gradient on the border area */}
          <motion.div
            className="absolute bottom-0 left-4 right-4 md:absolute md:left-auto md:right-[-35%] md:top-[60%] z-30 w-auto max-w-none md:max-w-[55%] p-6 md:p-8 rounded-t-3xl md:rounded-3xl shadow-2xl backdrop-blur-xl border border-white/50 overflow-hidden md:mt-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(247, 173, 207, 0.2) 100%)",
              boxShadow: "0 8px 32px 0 rgba(247, 173, 207, 0.15)",
              opacity: paragraphOpacity,
              y: paragraphY,
            }}
          >
            {/* Moving Light Border */}
            <div
              className="absolute inset-0 rounded-[inherit] pointer-events-none z-0"
              style={{
                padding: "2px",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
              }}
            >
              <motion.div
                className="absolute inset-[-100%]"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0 300deg, rgba(255,255,255,0.8) 360deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Subtitle */}
            <div className="relative mb-6 inline-block z-10">
              <h3
                style={{
                  fontFamily: "Comfortaa, sans-serif",
                  color: "white", // Your specific pink
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                  marginBottom: "0.2rem",
                  padding: "1.5rem",
                  // Neon Glow Logic:
                  textShadow: `
      0 0 7px #F395C2,
      0 0 10px #F395C2,
      0 0 21px #F395C2,
      0 0 42px #F395C2
    `,
                }}
              >
                The vibes are
                <br />
                officially cozy
              </h3>
              <div className="h-1 w-full bg-[#F7ADCF] rounded-full opacity-80" />
            </div>

            {/* Body text */}
            <p
              className="z-10 relative"
              style={{
                fontFamily: "Comfortaa, sans-serif",
                color: "#444",
                fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                lineHeight: 1.6,
                padding: "1.5rem",
              }}
            >
              Is there anything better than a good laugh over a warm drink? We
              created this space so you can{" "}
              <span className="relative inline-block">
                hit pause
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white opacity-60 rounded-full"></span>
              </span>{" "}
              on the busy day. Whether you’re meeting an old friend or taking a
              moment for yourself, there’s a seat here with{" "}
              <span className="relative inline-block">
                your name on it.
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white opacity-60 rounded-full"></span>
              </span>{" "}
              <br></br>
              <br></br>
              <span
                style={{
                  backgroundColor: "#F7ADCF",
                  color: "white",
                  padding: "0.2rem 0.6rem",
                  boxDecorationBreak: "clone",
                  WebkitBoxDecorationBreak: "clone",
                }}
              >
                Pop by anytime!
              </span>
            </p>
          </motion.div>

          {/* FluffMeUp Group Card - Glass Style */}
          <motion.div
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
              borderTop: "1px solid rgba(255, 255, 255, 0.8)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.8)",
              opacity: paragraphOpacity,
              y: paragraphY,
            }}
          >
            {/* Moving Light Border */}
            <div
              className="absolute inset-0 rounded-[inherit] pointer-events-none z-0"
              style={{
                padding: "2px",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
              }}
            >
              <motion.div
                className="absolute inset-[-100%]"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0 300deg, rgba(255,255,255,0.8) 360deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* <div className="relative w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden z-10">
              <img
                src="/fluffmeupgroup.webp"
                alt="Fluff Me Up Group"
                className="w-full h-full object-cover"
              />
            </div> */}
          </motion.div>
        </motion.div>

        {/* Wavy Background with Orange Glow */}
        <motion.div
          style={{ y: waveY }}
          className="absolute bottom-[-49vh] left-0 w-full z-0 pointer-events-none"
        >
          <svg
            viewBox="0 0 1440 280"
            className="w-full h-auto block"
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
          >
            <defs>
              {/* Closed path for the white fill and clipping */}
              <path
                id="melting-fill"
                d="M0,320 L0,120 C100,120 150,250 250,250 C350,250 400,100 500,100 C600,100 650,280 750,280 C850,280 900,80 1000,80 C1100,80 1150,220 1250,220 C1350,220 1400,150 1440,150 L1440,320 Z"
              />

              {/* Open path for the top edge stroke only */}
              <path
                id="melting-stroke"
                d="M-10,120 L0,120 C100,120 150,250 250,250 C350,250 400,100 500,100 C600,100 650,280 750,280 C850,280 900,80 1000,80 C1100,80 1150,220 1250,220 C1350,220 1400,150 1440,150 L1450,150"
              />

              <clipPath id="melting-clip">
                <use href="#melting-fill" />
              </clipPath>

              <filter
                id="glow-blur"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="15" />
              </filter>
            </defs>

            {/* Main Pink Shape (Changed from white to eliminate gap) */}
            <use href="#melting-fill" fill="#F7ADCF" />

            {/* Inner Glow (White Stroke for contrast against pink) */}
            <motion.use
              href="#melting-stroke"
              stroke="white"
              strokeWidth="20"
              fill="none"
              clipPath="url(#melting-clip)"
              filter="url(#glow-blur)"
              style={{ opacity: glowOpacity }}
            />
          </svg>
          {/* White fill removed for seamless smoke transition */}
        </motion.div>
      </div>

      {/* Load Font locally to ensure it works if not already loaded */}
      <style jsx global>{`
        @font-face {
          font-family: "Comfortaa";
          src: url("/fonts/Comfortaa-Bold.ttf") format("truetype");
          font-weight: bold;
          font-style: normal;
        }
      `}</style>
    </section>
  );
}
