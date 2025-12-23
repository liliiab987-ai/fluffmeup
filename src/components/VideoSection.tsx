"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="video-section">
      <motion.div className="video-container" style={{ scale, opacity }}>
        <div className="video-wrapper">
          {/* Placeholder for video - user can replace with actual video */}
          <div className="video-placeholder">
            <div className="play-button">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="white" fillOpacity="0.9" />
                <path d="M32 25L55 40L32 55V25Z" fill="#F395C2" />
              </svg>
            </div>
            <div className="video-overlay-text">
              <h3>Experience the Magic</h3>
              <p>Watch how we create our signature macarons</p>
            </div>
          </div>
        </div>

        <motion.div
          className="video-caption"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="gradient-text">Behind the Scenes</h3>
          <p>
            Discover the artistry and passion that goes into every creation.
            From selecting the finest ingredients to the final delicate touch,
            each macaron tells a story of dedication and love.
          </p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .video-section {
          padding: var(--section-padding) 0;
          background: radial-gradient(
            ellipse at center,
            rgba(247, 173, 207, 0.1) 0%,
            var(--color-white) 70%
          );
          overflow: hidden;
        }

        .video-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          border-radius: 30px;
          overflow: hidden;
          box-shadow: var(--shadow-hard);
          margin-bottom: 40px;
        }

        .video-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            var(--color-pink-primary) 0%,
            var(--color-pink-light) 50%,
            var(--color-gold) 100%
          );
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .video-placeholder:hover {
          transform: scale(1.02);
        }

        .play-button {
          margin-bottom: 30px;
          transition: transform 0.3s ease;
        }

        .video-placeholder:hover .play-button {
          transform: scale(1.1);
        }

        .video-overlay-text {
          text-align: center;
          color: var(--color-white);
        }

        .video-overlay-text h3 {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 10px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .video-overlay-text p {
          font-size: clamp(1rem, 2vw, 1.3rem);
          opacity: 0.95;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        }

        .video-caption {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .video-caption h3 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          margin-bottom: 20px;
        }

        .video-caption p {
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          line-height: 1.8;
          color: var(--color-dark);
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .video-wrapper {
            border-radius: 20px;
          }
        }
      `}</style>
    </section>
  );
}
