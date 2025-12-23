'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CurtainAnimation({ children }: { children: React.ReactNode }) {
  const [showClouds, setShowClouds] = useState(true);

  useEffect(() => {
    // Clouds start dispersing after showing for a bit
    const timer = setTimeout(() => {
      setShowClouds(false);
    }, 1500); // Increased to 1.5s so clouds are visible longer

    return () => clearTimeout(timer);
  }, []);

  // Generate clouds with varied positions and sizes
  const clouds = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i % 5) * 20 + Math.random() * 15, // Spread across width
    y: Math.floor(i / 5) * 25 + Math.random() * 15, // Spread across height
    scale: 0.6 + Math.random() * 0.8,
    delay: Math.random() * 0.4,
    duration: 1.2 + Math.random() * 0.6,
    direction: Math.random() > 0.5 ? 1 : -1, // Some drift left, some right
  }));

  return (
    <>
      <AnimatePresence>
        {showClouds && (
          <motion.div
            className="clouds-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {/* Gradient sky background */}
            <motion.div
              className="sky-bg"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />

            {/* Multiple clouds that disperse */}
            {clouds.map((cloud) => (
              <motion.div
                key={cloud.id}
                className="cloud"
                style={{
                  left: `${cloud.x}%`,
                  top: `${cloud.y}%`,
                }}
                initial={{
                  opacity: 0,
                  scale: cloud.scale * 0.5,
                  x: 0,
                  filter: 'blur(0px)',
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [cloud.scale * 0.5, cloud.scale, cloud.scale * 1.2, cloud.scale * 1.5],
                  x: [0, 0, cloud.direction * 50, cloud.direction * 150],
                  filter: ['blur(0px)', 'blur(0px)', 'blur(5px)', 'blur(20px)'],
                }}
                transition={{
                  duration: cloud.duration + 1,
                  delay: cloud.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                ☁️
              </motion.div>
            ))}

            {/* Center "Fluff me up" text that appears briefly */}
            <motion.div
              className="center-text"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 1.1],
                y: [20, 0, 0, -30],
              }}
              transition={{
                duration: 2,
                delay: 0.3,
                times: [0, 0.3, 0.7, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1 className="cloud-title gradient-text">Fluff me up</h1>
              <motion.p
                className="cloud-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, delay: 0.6 }}
              >
                ☁️ Where dreams taste sweet ☁️
              </motion.p>
            </motion.div>

            {/* Soft sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="sparkle"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${40 + (i % 2) * 20}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + i * 0.15,
                  ease: "easeInOut",
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content revealed after clouds disperse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 2.5, // Synced with cloud dispersal
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>

      <style jsx>{`
        .clouds-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          pointer-events: none;
          overflow: hidden;
        }

        .sky-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            #F7ADCF 0%,
            #F395C2 30%,
            #EFC576 70%,
            #F7ADCF 100%
          );
        }

        .cloud {
          position: absolute;
          font-size: clamp(3rem, 8vw, 6rem);
          will-change: transform, opacity, filter;
          transform-origin: center;
        }

        .center-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 10;
        }

        .cloud-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          font-family: var(--font-heading);
          margin: 0;
          text-shadow: 
            0 4px 20px rgba(255, 255, 255, 0.8),
            0 8px 40px rgba(243, 149, 194, 0.4);
          white-space: nowrap;
          line-height: 1;
        }

        .gradient-text {
          background: linear-gradient(
            135deg,
            #FFFFFF 0%,
            #FFF5F8 30%,
            #FFFFFF 60%,
            #FFF9E6 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradientFlow 3s ease-in-out;
        }

        @keyframes gradientFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .cloud-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          color: #FFFFFF;
          margin-top: 20px;
          font-weight: 500;
          font-family: var(--font-body);
          text-shadow: 0 2px 10px rgba(243, 149, 194, 0.6);
        }

        .sparkle {
          position: absolute;
          font-size: clamp(1.5rem, 3vw, 2rem);
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
        }

        @media (max-width: 768px) {
          .cloud {
            font-size: 3rem;
          }

          .cloud-title {
            font-size: 2.5rem;
          }

          .cloud-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
