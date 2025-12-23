"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
        name: "Classic Macaron Set",
        description: "Assorted flavours in a beautiful box",
        image: "/01-Photoroom.webp",
        price: "$24.99",
    },
    {
        id: 2,
        name: "Strawberry Delight",
        description: "Fresh strawberry cream filling",
        image: "/01-Photoroom.webp",
        price: "$4.99",
    },
    {
        id: 3,
        name: "Chocolate Dream",
        description: "Rich dark chocolate ganache",
        image: "/01-Photoroom.webp",
        price: "$4.99",
    },
    {
        id: 4,
        name: "Vanilla Cloud",
        description: "Madagascar vanilla bean cream",
        image: "/01-Photoroom.webp",
        price: "$4.99",
    },
    {
        id: 5,
        name: "Pistachio Bliss",
        description: "Roasted pistachio buttercream",
        image: "/01-Photoroom.webp",
        price: "$5.49",
    },
];

export default function ProductSection() {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <section className="relative w-full min-h-screen py-24 px-8 bg-gradient-to-b from-pink-50 to-white overflow-hidden">
            {/* Section Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2
                    className="font-bold tracking-tight mb-4"
                    style={{
                        fontFamily: "Comfortaa, sans-serif",
                        color: "#F7ADCF",
                        fontSize: "clamp(2.5rem, 6vw, 4rem)",
                        textShadow: "2px 2px 0px rgba(255,255,255,0.8)",
                    }}
                >
                    Our Sweet Selection
                </h2>
                <p
                    className="text-gray-600 text-lg"
                    style={{ fontFamily: "Comfortaa, sans-serif" }}
                >
                    Handcrafted with love, just for you
                </p>
            </motion.div>

            {/* Product Cards - Horizontal Scroll */}
            <div className="relative max-w-7xl mx-auto">
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
                                className="relative w-80 h-96 rounded-3xl overflow-hidden cursor-pointer"
                                style={{
                                    background:
                                        "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(247, 173, 207, 0.2) 100%)",
                                    backdropFilter: "blur(20px)",
                                    WebkitBackdropFilter: "blur(20px)",
                                    border: "2px solid rgba(255, 255, 255, 0.5)",
                                    boxShadow: "0 8px 32px 0 rgba(247, 173, 207, 0.2)",
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 12px 40px 0 rgba(247, 173, 207, 0.4)",
                                }}
                                onClick={() =>
                                    setExpandedId(expandedId === product.id ? null : product.id)
                                }
                                animate={{
                                    scale: expandedId === product.id ? 1.1 : 1,
                                    zIndex: expandedId === product.id ? 50 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Product Image */}
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain drop-shadow-2xl"
                                    />
                                </div>

                                {/* Product Info Overlay */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/90 to-transparent"
                                    initial={{ opacity: 0.9 }}
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
                                        className="text-gray-700 text-sm mb-2"
                                        style={{ fontFamily: "Comfortaa, sans-serif" }}
                                    >
                                        {product.description}
                                    </p>
                                    {product.price && (
                                        <p
                                            className="font-bold text-lg"
                                            style={{
                                                fontFamily: "Comfortaa, sans-serif",
                                                color: "#F7ADCF",
                                            }}
                                        >
                                            {product.price}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Expand Hint */}
                                <motion.div
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"
                                    whileHover={{ scale: 1.2, rotate: 90 }}
                                >
                                    <span className="text-pink-400 text-2xl">+</span>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="text-center mt-8">
                <p
                    className="text-gray-400 text-sm"
                    style={{ fontFamily: "Comfortaa, sans-serif" }}
                >
                    ← Scroll to explore more →
                </p>
            </div>

            {/* Expanded Product Overlay */}
            {expandedId !== null && (
                <motion.div
                    className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setExpandedId(null)}
                >
                    <motion.div
                        className="max-w-2xl w-full bg-white rounded-3xl p-8 relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200"
                            onClick={() => setExpandedId(null)}
                        >
                            <span className="text-pink-600 text-2xl">×</span>
                        </button>
                        {products.find((p) => p.id === expandedId) && (
                            <div className="flex flex-col items-center">
                                <img
                                    src={products.find((p) => p.id === expandedId)!.image}
                                    alt={products.find((p) => p.id === expandedId)!.name}
                                    className="w-64 h-64 object-contain mb-6"
                                />
                                <h3
                                    className="font-bold text-3xl mb-4"
                                    style={{
                                        fontFamily: "Comfortaa, sans-serif",
                                        color: "#F7ADCF",
                                    }}
                                >
                                    {products.find((p) => p.id === expandedId)!.name}
                                </h3>
                                <p
                                    className="text-gray-700 text-center mb-6"
                                    style={{ fontFamily: "Comfortaa, sans-serif" }}
                                >
                                    {products.find((p) => p.id === expandedId)!.description}
                                </p>
                                {products.find((p) => p.id === expandedId)!.price && (
                                    <p
                                        className="font-bold text-2xl mb-6"
                                        style={{
                                            fontFamily: "Comfortaa, sans-serif",
                                            color: "#F7ADCF",
                                        }}
                                    >
                                        {products.find((p) => p.id === expandedId)!.price}
                                    </p>
                                )}
                                <button
                                    className="px-8 py-3 bg-gradient-to-r from-pink-300 to-pink-400 text-white rounded-full font-bold hover:from-pink-400 hover:to-pink-500 transition-all"
                                    style={{ fontFamily: "Comfortaa, sans-serif" }}
                                >
                                    Add to Order
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}

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
