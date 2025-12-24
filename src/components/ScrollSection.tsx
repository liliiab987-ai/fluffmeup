"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import {
  Text,
  useTexture,
  RoundedBox,
  useVideoTexture,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

const CUP_IMAGES = [
  "/08-Photoroom.webp", // Front
  "/07-Photoroom.webp", // Front-Left
  "/0.6-Photoroom.webp", // Left
  "/05-Photoroom.webp", // Back-Left
  "/04-Photoroom.webp", // Back
  "/03-Photoroom.webp", // Back-Right
  "/0.2-Photoroom.webp", // Right
  "/01-Photoroom.webp", // Front-Right
];

function ImageSequenceCup({ scrollProgress }: { scrollProgress: number }) {
  const textures = useTexture(CUP_IMAGES);

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    });
  }, [textures]);

  const totalFrames = textures.length;
  const cycles = 4;
  const frameIndex =
    Math.floor(scrollProgress * totalFrames * cycles) % totalFrames;
  const currentTexture = textures[frameIndex];

  const img = currentTexture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  const scaleX = 3.5 * aspect;
  const scaleY = 3.5;

  return (
    <mesh position={[0, -0.5, 0]} scale={[scaleX, scaleY, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={currentTexture}
        transparent
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

const CARD_DATA = [
  {
    title: "CHOCOLATE\\nSTRAWBERRIES",
    icon: "☕",
    image: "/01-Photoroom.webp",
    video: "/video1.mp4",
  },
  {
    title: "SWEET \\nTREATS",
    icon: "🌡️",
    image: "/0.2-Photoroom.webp",
    video: "/video2.mp4",
  },
  {
    title: "FLAVOR\\nNOTES",
    icon: "🍒",
    image: "/03-Photoroom.webp",
    video: "/video3.mp4",
  },
  {
    title: "PASTRY\\nDESSERTS",
    icon: "💧",
    image: "/04-Photoroom.webp",
    video: "/video4.mp4",
  },
  {
    title: "Heart Delight",
    icon: "🌍",
    image: "/item5.webp",
    video: "/video5.mp4",
  },
  {
    title: "SPECIAL\\nGIFTS ",
    icon: "⭐",
    image: "/item2.webp",
    video: "/video7.mp4",
  },
];

function SpiralCard({
  index,
  total,
  scrollProgress,
  expandedIndex,
  setExpandedIndex,
  radius = 3.5,
  height = 8,
}: {
  index: number;
  total: number;
  scrollProgress: number;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
  radius?: number;
  height?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const isExpanded = expandedIndex === index;
  const isAnyExpanded = expandedIndex !== null;

  const angleStep = (Math.PI * 2) / total;
  const initialAngle = index * angleStep;
  const yOffset = 0;

  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useFrame((state, delta) => {
    if (ref.current) {
      const r = scrollProgress;
      const rotationSpeed = Math.PI * 2;
      const currentAngle = initialAngle + r * rotationSpeed;

      const spiralX = Math.cos(currentAngle) * radius;
      const spiralZ = Math.sin(currentAngle) * radius;
      const spiralY = yOffset + Math.sin(r * Math.PI * 4 + index) * 0.5;

      const targetPos = new THREE.Vector3(spiralX, spiralY, spiralZ);
      const targetScale = new THREE.Vector3(1, 1, 1);

      const baseScale = isMobile ? 0.7 : 1;
      targetScale.set(baseScale, baseScale, baseScale);

      if (isExpanded) {
        targetPos.set(0, 0, 4);
        const expandedScale = isMobile ? 0.65 : 1.5;
        targetScale.set(expandedScale, expandedScale, expandedScale);
      } else if (isAnyExpanded) {
        targetPos.set(spiralX * 1.5, spiralY, spiralZ * 1.5);
        const bgScale = isMobile ? 0.4 : 0.7;
        targetScale.set(bgScale, bgScale, bgScale);
      }

      const lerpSpeed = delta * 4;
      ref.current.position.lerp(targetPos, lerpSpeed);
      ref.current.scale.lerp(targetScale, lerpSpeed);

      if (isExpanded) {
        const targetRot = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, 0, 0)
        );
        ref.current.quaternion.slerp(targetRot, lerpSpeed);
      } else {
        const dummy = new THREE.Object3D();
        dummy.position.copy(ref.current.position);
        dummy.lookAt(0, dummy.position.y, 0);
        dummy.rotation.y += Math.PI;
        ref.current.quaternion.slerp(dummy.quaternion, lerpSpeed);
      }
    }
  });

  const data = CARD_DATA[index % CARD_DATA.length];

  const videoTexture = useVideoTexture(data.video, {
    unsuspend: "canplay",
    muted: !isExpanded,
    loop: true,
    start: true,
    playsInline: true,
  });

  const cardTexture = useTexture("/card-texture.png");

  useEffect(() => {
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    const video = videoTexture.image;
    if (video) {
      video.muted = !isExpanded;
      if (isExpanded) {
        video.volume = 0.5;
        video.play().catch((e) => console.error(e));
      }
    }

    if (cardTexture) {
      cardTexture.wrapS = cardTexture.wrapT = THREE.RepeatWrapping;
      cardTexture.repeat.set(1, 1);
    }
  }, [videoTexture, cardTexture, isExpanded]);

  const shape = new THREE.Shape();
  const cardWidth = 1.3;
  const cardHeight = 2.3;
  const cardRadius = 0.2;
  const x = -cardWidth / 2;
  const y = -cardHeight / 2;

  shape.moveTo(x, y + cardRadius);
  shape.lineTo(x, y + cardHeight - cardRadius);
  shape.quadraticCurveTo(x, y + cardHeight, x + cardRadius, y + cardHeight);
  shape.lineTo(x + cardWidth - cardRadius, y + cardHeight);
  shape.quadraticCurveTo(
    x + cardWidth,
    y + cardHeight,
    x + cardWidth,
    y + cardHeight - cardRadius
  );
  shape.lineTo(x + cardWidth, y + cardRadius);
  shape.quadraticCurveTo(x + cardWidth, y, x + cardWidth - cardRadius, y);
  shape.lineTo(x + cardRadius, y);
  shape.quadraticCurveTo(x, y, x, y + cardRadius);

  const extrudeSettings = {
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 3,
    steps: 1,
  };

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setExpandedIndex(isExpanded ? null : index);
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <mesh position={[0, 0, 0.05]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        {isMobile ? (
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
          />
        ) : (
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.98}
            opacity={1}
            metalness={0.1}
            roughness={0.07}
            clearcoat={1}
            clearcoatRoughness={0.02}
            ior={1.5}
            thickness={0.3}
            envMapIntensity={2}
            transparent={true}
          />
        )}
      </mesh>

      <mesh position={[0, 0.2, 0.06]}>
        <planeGeometry args={[cardWidth - 0.1, cardHeight * 0.75]} />
        <meshBasicMaterial
          map={videoTexture}
          toneMapped={false}
          color="white"
          side={THREE.FrontSide}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color="#F7ADCF" />
      </mesh>

      <group position={[0, -cardHeight / 2 + 0.25, 0.2]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.1}
          font="/fonts/Comfortaa-Bold.ttf"
          color="white"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          lineHeight={1.2}
          letterSpacing={0.05}
          renderOrder={10}
          outlineWidth={0.005}
          outlineColor="rgba(255, 255, 255, 0.4)"
        >
          {data.title.toUpperCase()}
        </Text>
      </group>
    </group>
  );
}

function Particles({ scrollProgress }: { scrollProgress: number }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const count = isMobile ? 50 : 500;
  const mesh = useRef<THREE.Points>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    if (context) {
      context.beginPath();
      context.arc(16, 16, 14, 0, 2 * Math.PI);
      context.fillStyle = "white";
      context.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const [attributes] = useState(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color("#F5B339"),
      new THREE.Color("#F7ADCF"),
      new THREE.Color("#F395C2"),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: cols };
  });

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y = scrollProgress * Math.PI * 2 * 0.5;
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[attributes.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          args={[attributes.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        map={texture}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        alphaTest={0.5}
      />
    </points>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  const cards = Array.from({ length: 6 }, (_, i) => i);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleBackgroundClick = () => {
    setExpandedIndex(null);
  };

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={2}
      />

      <mesh
        position={[0, 0, -5]}
        scale={[100, 100, 1]}
        onClick={handleBackgroundClick}
      >
        <planeGeometry />
        <meshBasicMaterial visible={false} />
      </mesh>

      <ImageSequenceCup scrollProgress={scrollProgress} />
      <Particles scrollProgress={scrollProgress} />

      {cards.map((i) => (
        <SpiralCard
          key={i}
          index={i}
          total={cards.length}
          scrollProgress={scrollProgress}
          expandedIndex={expandedIndex}
          setExpandedIndex={setExpandedIndex}
        />
      ))}
    </>
  );
}

export default function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const { top, height } =
              containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const totalDistance = height + viewportHeight;
            const distanceTraveled = viewportHeight - top;

            let progress = distanceTraveled / totalDistance;
            progress = Math.max(0, Math.min(1, progress));

            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] z-30">
      <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden">
        <div
          className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: "url(/imgbackground.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(1.05) translate(${(mousePosition.x - 0.5) * 20
              }px, ${(mousePosition.y - 0.5) * 20}px)`,
            opacity: 1,
          }}
        />

        <div className="relative z-10 w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            dpr={[1, 1]}
            style={{ touchAction: "pan-y" }}
            gl={{
              preserveDrawingBuffer: true,
              powerPreference: "high-performance",
              antialias: false,
            }}
          >
            <Suspense fallback={null}>
              <Scene scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-opacity-80 pointer-events-none animate-bounce font-bold tracking-widest">
            SCROLL TO EXPLORE
          </div>
        </div>
      </div>
    </div>
  );
}
