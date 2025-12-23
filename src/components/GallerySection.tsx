'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function GallerySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const images = [
        { id: 1, alt: 'Colorful macarons', emoji: '🎨', color: '#F395C2' },
        { id: 2, alt: 'Cafe interior', emoji: '☕', color: '#EFC576' },
        { id: 3, alt: 'Pastry display', emoji: '🍰', color: '#F7ADCF' },
        { id: 4, alt: 'Latte art', emoji: '💖', color: '#F395C2' },
        { id: 5, alt: 'Fresh baking', emoji: '🥐', color: '#EFC576' },
        { id: 6, alt: 'Sweet treats', emoji: '🍬', color: '#F7ADCF' },
    ];

    return (
        <section ref={sectionRef} className="gallery-section">
            <div className="container">
                <motion.div
                    className="gallery-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="gallery-title gradient-text-accent">
                        A Feast for the Eyes
                    </h2>
                    <p className="gallery-subtitle">
                        Step into our world of sweetness and beauty
                    </p>
                </motion.div>

                <div className="gallery-grid">
                    {images.map((image, index) => {
                        const isEven = index % 2 === 0;
                        const yTransform = isEven ? y1 : y2;

                        return (
                            <motion.div
                                key={image.id}
                                className="gallery-item"
                                style={{ y: yTransform }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                            >
                                <div
                                    className="gallery-image"
                                    style={{ backgroundColor: image.color }}
                                >
                                    <span className="gallery-emoji">{image.emoji}</span>
                                    <div className="gallery-overlay">
                                        <p className="gallery-alt">{image.alt}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
        .gallery-section {
          padding: var(--section-padding) 0;
          background: linear-gradient(180deg,
            var(--color-white) 0%,
            rgba(239, 197, 118, 0.05) 100%
          );
          overflow: hidden;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .gallery-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          margin-bottom: 20px;
        }

        .gallery-subtitle {
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: var(--color-dark);
          opacity: 0.7;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 4/5;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.3s ease;
        }

        .gallery-emoji {
          font-size: 6rem;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1));
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.7) 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 30px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-alt {
          color: var(--color-white);
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .gallery-emoji {
            font-size: 4rem;
          }
        }
      `}</style>
        </section>
    );
}
