"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import CurtainAnimation from "./CurtainAnimation";

// 3D Macaron Component
function Macaron3D() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Top shell */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[1, 1.1, 0.3, 32]} />
          <meshStandardMaterial
            color="#F395C2"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Bottom shell */}
        <mesh position={[0, -0.15, 0]} castShadow>
          <cylinderGeometry args={[1.1, 1, 0.3, 32]} />
          <meshStandardMaterial
            color="#F395C2"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Filling */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.95, 0.95, 0.4, 32]} />
          <meshStandardMaterial
            color="#F7ADCF"
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>

        {/* Decorative sparkles */}
        <Sphere args={[0.05]} position={[0.6, 0.2, 0.3]}>
          <meshStandardMaterial
            color="#EFC576"
            emissive="#EFC576"
            emissiveIntensity={0.5}
          />
        </Sphere>
        <Sphere args={[0.03]} position={[-0.5, 0.1, 0.4]}>
          <meshStandardMaterial
            color="#EFC576"
            emissive="#EFC576"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </group>
    </Float>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ height: "100%", width: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#EFC576" />
      <Macaron3D />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}

export default function Hero() {
  return (
    <CurtainAnimation>
      <section className="hero-section">
        <div className="hero-background"></div>

        <div className="container hero-container">
          <div className="hero-content">
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="hero-title">
                <span className="gradient-text">Fluff me up</span>
              </h1>
              <p className="hero-subtitle">
                Where every bite feels like a sweet embrace
              </p>
            </motion.div>

            <motion.div
              className="hero-cta"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="btn btn-primary">Explore Menu</button>
              <button className="btn btn-outline">Visit Us</button>
            </motion.div>
          </div>

          <motion.div
            className="hero-3d"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Scene3D />
          </motion.div>
        </div>

        <style jsx>{`
          .hero-section {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            overflow: hidden;
          }

          .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--gradient-hero);
            z-index: -1;
          }

          .hero-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
            padding: 40px 20px;
            z-index: 1;
          }

          .hero-content {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          .hero-title {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 900;
            line-height: 1;
            margin: 0;
          }

          .hero-subtitle {
            font-size: clamp(1.2rem, 2vw, 1.5rem);
            color: var(--color-dark);
            opacity: 0.8;
            font-weight: 400;
            margin: 20px 0 0 0;
          }

          .hero-cta {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }

          .hero-3d {
            height: 600px;
            position: relative;
          }

          @media (max-width: 968px) {
            .hero-container {
              grid-template-columns: 1fr;
              gap: 40px;
            }

            .hero-3d {
              height: 400px;
            }

            .hero-title {
              text-align: center;
            }

            .hero-subtitle {
              text-align: center;
            }

            .hero-cta {
              justify-content: center;
            }
          }
        `}</style>
      </section>
    </CurtainAnimation>
  );
}
