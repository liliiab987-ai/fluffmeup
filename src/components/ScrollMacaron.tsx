'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Animated 3D Macaron Component
function AnimatedMacaron({ scrollProgress }: { scrollProgress: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            // Scale based on scroll
            const scale = 0.5 + scrollProgress * 2;
            groupRef.current.scale.set(scale, scale, scale);

            // Rotation based on scroll
            groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
            groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Top shell */}
            <mesh position={[0, 0.15, 0]} castShadow>
                <cylinderGeometry args={[1, 1.1, 0.3, 32]} />
                <meshStandardMaterial
                    color="#F395C2"
                    roughness={0.2}
                    metalness={0.3}
                />
            </mesh>

            {/* Bottom shell */}
            <mesh position={[0, -0.15, 0]} castShadow>
                <cylinderGeometry args={[1.1, 1, 0.3, 32]} />
                <meshStandardMaterial
                    color="#F395C2"
                    roughness={0.2}
                    metalness={0.3}
                />
            </mesh>

            {/* Filling */}
            <mesh position={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[0.95, 0.95, 0.4, 32]} />
                <meshStandardMaterial
                    color="#F7ADCF"
                    roughness={0.3}
                    metalness={0.2}
                />
            </mesh>

            {/* Gold accents */}
            <mesh position={[0.7, 0.2, 0]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial
                    color="#EFC576"
                    emissive="#EFC576"
                    emissiveIntensity={0.8}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            <mesh position={[-0.6, -0.1, 0.3]}>
                <sphereGeometry args={[0.05]} />
                <meshStandardMaterial
                    color="#EFC576"
                    emissive="#EFC576"
                    emissiveIntensity={0.8}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </group>
    );
}

// 3D Scene
function MacaronScene({ scrollProgress }: { scrollProgress: number }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
            <pointLight position={[-5, -5, -3]} intensity={0.8} color="#F7ADCF" />
            <spotLight position={[0, 10, 0]} intensity={0.5} color="#EFC576" />
            <AnimatedMacaron scrollProgress={scrollProgress} />
        </Canvas>
    );
}

export default function ScrollMacaron() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    const scrollProgressRef = useRef(0);
    const [scrollProgress, setScrollProgress] = React.useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Animate the section appearance
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1,
                    onUpdate: (self) => {
                        setScrollProgress(self.progress);
                    },
                },
            });

            // Animate text elements
            gsap.from('.scroll-macaron-title', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    end: 'top 30%',
                    scrub: 1,
                },
                opacity: 0,
                y: 50,
            });

            gsap.from('.scroll-macaron-description', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    end: 'top 20%',
                    scrub: 1,
                },
                opacity: 0,
                y: 30,
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="scroll-macaron-section">
            <div className="container scroll-macaron-container">
                <div className="scroll-macaron-content">
                    <h2 className="scroll-macaron-title gradient-text">
                        Handcrafted with Love
                    </h2>
                    <p className="scroll-macaron-description">
                        Each macaron is a delicate work of art, crafted with premium ingredients
                        and infinite care. Watch as our signature creation comes to life,
                        just like the magic we create in our kitchen every day.
                    </p>
                    <div className="scroll-macaron-features">
                        <div className="feature-item">
                            <span className="feature-icon">🇫🇷</span>
                            <span className="feature-text">French Technique</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🌟</span>
                            <span className="feature-text">Premium Ingredients</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">💖</span>
                            <span className="feature-text">Made Daily</span>
                        </div>
                    </div>
                </div>

                <div ref={canvasWrapperRef} className="scroll-macaron-3d">
                    <MacaronScene scrollProgress={scrollProgress} />
                </div>
            </div>

            <style jsx>{`
        .scroll-macaron-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(180deg, 
            var(--color-white) 0%, 
            rgba(247, 173, 207, 0.05) 50%,
            var(--color-white) 100%
          );
          position: relative;
          overflow: hidden;
        }

        .scroll-macaron-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .scroll-macaron-content {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .scroll-macaron-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
        }

        .scroll-macaron-description {
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          line-height: 1.8;
          color: var(--color-dark);
          opacity: 0.8;
        }

        .scroll-macaron-features {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 20px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 20px;
          background: rgba(243, 149, 194, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(243, 149, 194, 0.1);
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(243, 149, 194, 0.1);
          transform: translateX(10px);
        }

        .feature-icon {
          font-size: 2rem;
        }

        .feature-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-dark);
        }

        .scroll-macaron-3d {
          height: 600px;
          position: relative;
        }

        @media (max-width: 968px) {
          .scroll-macaron-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .scroll-macaron-3d {
            height: 400px;
          }
        }
      `}</style>
        </section>
    );
}

// Import React for useState
import React from 'react';
