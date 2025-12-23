"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: string;
};

// Placeholder product data
const products: Product[] = [
  {
    id: 1,
    name: "Classic Macaron Cake",
    description: "Assorted flavours in a beautiful box",
    image: "/macarroncake.webp",
    // price: "$24.99",
  },
  {
    id: 2,
    name: "Merengue Roll",
    description: "Fresh strawberry cream filling",
    image: "/merenguecake.webp",
    // price: "$4.99",
  },
  {
    id: 3,
    name: "Custom Macaron Cake",
    description: "Unique flavours for special dates",
    image: "/macaroncake.webp",
    // price: "$4.99",
  },
  {
    id: 4,
    name: "GingerBread Man",
    description:
      "Handmade with love and filled with classic flavours that taste like the holidays",
    image: "/gingerman.webp",
    // price: "$4.99",
  },
  {
    id: 5,
    name: "Pistachio Bliss",
    description: "Roasted pistachio buttercream",
    image: "/treats.webp",
    // price: "$5.49",
  },
  {
    id: 6,
    name: "Madeleine Bliss",
    description:
      "Indulge in a delightful assortment of 14 exquisite Madeleines with our Madeleine Bliss gift box",
    image: "/merengue.webp",
    // price: "$5.49",
  },
  {
    id: 7,
    name: "Choux",
    description:
      "Delightful dessert option that adds sweetness to any occasion",
    image: "/choux.webp",
    // price: "$5.49",
  },
];

export default function CloudSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Scale: Clouds grow as we fly into them
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 3]);

  // Opacity: Clouds fade out early, before sign appears
  const cloudOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);

  // Background Image Opacity: Reveals as clouds clear
  const bgOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  // Solid Pink Background Opacity: Fades in quickly to hide the previous section and prevent gaps
  const solidBgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] -mt-[100vh] z-50 pointer-events-none overflow-hidden"
    >
      <div className="top-0 h-screen w-full overflow-hidden ">
        {/* Solid Pink Background to hide MacaronSection */}
        <motion.div
          style={{ opacity: solidBgOpacity }}
          className="absolute inset-0 z-0 bg-[#F7ADCF]"
        />

        {/* Final Background Image (Fluff3) */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/fluff3.jpeg"
            alt="Fluff Cloud Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Optimized SVG Smoke Filters - Reduced complexity for performance */}
        <svg className="hidden">
          <filter id="smoke-filter-1">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008"
              numOctaves="3"
              seed="2"
              result="turbulence"
            />
            <feDisplacementMap
              in2="turbulence"
              in="SourceGraphic"
              scale="100"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="12" />
          </filter>

          <filter id="smoke-filter-2">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006"
              numOctaves="3"
              seed="7"
              result="turbulence"
            />
            <feDisplacementMap
              in2="turbulence"
              in="SourceGraphic"
              scale="120"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </svg>

        {/* Optimized Smoke Layers - 3 puffs for better performance - DESKTOP ONLY */}
        {!isMobile && (
          <motion.div
            style={{
              scale,
              opacity: cloudOpacity,
              willChange: "transform, opacity",
            }}
            className="absolute inset-0 z-10"
          >
            {/* Puff 1: Large Pink Cloud (Bottom-Center) */}
            <motion.div
              className="absolute w-[140%] h-[140%] left-[-20%] top-[25%] bg-[#F7ADCF] pointer-events-none"
              style={{
                filter: "url(#smoke-filter-1)",
                opacity: 0.7,
                borderRadius: "50%",
                willChange: "transform",
              }}
              animate={{
                y: ["0%", "-10%"],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Puff 2: White Wisp (Offset) */}
            <motion.div
              className="absolute w-[130%] h-[130%] left-[-30%] top-[30%] bg-white pointer-events-none"
              style={{
                filter: "url(#smoke-filter-2)",
                opacity: 0.5,
                borderRadius: "50%",
                willChange: "transform",
              }}
              animate={{
                y: ["0%", "-15%"],
                x: ["0%", "3%"],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Puff 3: Pink-White Mix (Center) */}
            <motion.div
              className="absolute w-[120%] h-[120%] left-[-10%] top-[20%] bg-[#F9C4D8] pointer-events-none"
              style={{
                filter: "url(#smoke-filter-1)",
                opacity: 0.65,
                borderRadius: "50%",
                willChange: "transform",
              }}
              animate={{
                y: ["0%", "-12%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        )}

        {/* Hanging Sign Text - Header at top of section */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-4 md:inset-60 z-20 flex items-start justify-center pt-24 md:pt-48"
        >
          <motion.div
            className="relative md:mt-0"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Hanging Chain/String */}
            <div className="absolute top-[-50px] left-/2 transform -translate-x-1/2 w-1 h-16 bg-white/40 rounded-full" />

            {/* Sign Text */}
            <h2
              className="font-bold tracking-tight px-6 py-4 md:px-12 md:py-6 rounded-2xl id-11"
              style={{
                marginTop: isMobile ? "65%" : "0", // Mobile-only margin
                fontFamily: "Comfortaa, sans-serif",
                color: "white",
                fontSize: "clamp(1.5rem, 5vw, 4.5rem)",
                textShadow:
                  "4px 4px 0px #F7ADCF, " +
                  "8px 8px 20px rgba(247, 173, 207, 0.8), " +
                  "0 0 40px rgba(255, 255, 255, 0.5)",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(247, 173, 207, 0.3) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px 0 rgba(247, 173, 207, 0.4)",
              }}
            >
              Stop by for a sweet treat
            </h2>
          </motion.div>
        </motion.div>

        {/* Product Cards - Positioned below the sign */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute top-[35%] md:top-[42%] left-0 md:left-9 right-0 z-20 px-4 md:px-8 pointer-events-auto"
        >
          <div className="max-w-8xl mx-auto">
            <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth scrollbar-hide">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="flex-shrink-0 snap-center"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.div
                    className="relative w-[85vw] md:w-80 h-[24rem] md:h-[28rem] rounded-3xl overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(247, 173, 207, 0.2) 100%)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "2px solid rgba(255, 255, 255, 0.5)",
                      boxShadow: "0 8px 32px 0 rgba(247, 173, 207, 0.2)",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: [
                        "0 12px 40px 0 rgba(247, 173, 207, 0.4)",
                        "0 12px 40px 20px rgba(247, 173, 207, 0.6), 20px 12px 40px 0 rgba(247, 173, 207, 0.4)",
                        "0 12px 40px 0 rgba(247, 173, 207, 0.6), 0 12px 60px 20px rgba(247, 173, 207, 0.4)",
                        "0 12px 40px -20px rgba(247, 173, 207, 0.4), -20px 12px 40px 0 rgba(247, 173, 207, 0.6)",
                        "0 12px 40px 0 rgba(247, 173, 207, 0.4)",
                      ],
                    }}
                    transition={{
                      scale: { duration: 0.3 },
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  >
                    {/* Product Image - Uniform sizing */}
                    <div className="absolute inset-0 top-0 h-[60%]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Info Overlay - Centered and readable */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[40%] flex flex-col items-center justify-center text-center p-6 bg-white/95"
                      initial={{ opacity: 0.95 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <h3
                        className="font-bold mb-2"
                        style={{
                          fontFamily: "Comfortaa, sans-serif",
                          color: "#F7ADCF",
                          fontSize: "1.5rem",
                        }}
                      >
                        {product.name}
                      </h3>
                      <p
                        className="text-gray-700 text-sm mb-3"
                        style={{ fontFamily: "Comfortaa, sans-serif" }}
                      >
                        {product.description}
                      </p>
                      {product.price && (
                        <p
                          className="font-bold text-xl"
                          style={{
                            fontFamily: "Comfortaa, sans-serif",
                            color: "#F7ADCF",
                          }}
                        >
                          {product.price}
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-4">
              <p
                className="text-white/70 text-sm drop-shadow-lg font-semibold"
                style={{ fontFamily: "Comfortaa, sans-serif" }}
              >
                ← Scroll to explore more →
              </p>

              {/* Explore Store Button */}
              <motion.button
                className="mt-6 px-8 py-4 rounded-full font-bold text-white shadow-lg "
                style={{
                  fontFamily: "Comfortaa, sans-serif",
                  background:
                    "linear-gradient(135deg, #F7ADCF 0%, #F395C2 100%)",
                  fontSize: "1.1rem",
                  marginTop: "28px",
                  padding: "14px",
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 8px 30px rgba(247, 173, 207, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: { duration: 0.2 },
                }}
              >
                Explore more in our online store
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Overlay Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/0 to-white/0 " />
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
