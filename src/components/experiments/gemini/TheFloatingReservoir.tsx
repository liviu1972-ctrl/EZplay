"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const intangibles = [
  { id: 1, src: "/assets-experiment/images/necorp/s151.webp", delay: 0 },
  { id: 2, src: "/assets-experiment/images/necorp/s154.webp", delay: 0.5 },
  { id: 3, src: "/assets-experiment/images/necorp/s158.webp", delay: 1 },
];

export default function TheFloatingReservoir() {
  return (
    <div className="flex justify-center gap-16 h-[400px] items-center">
      {intangibles.map((item) => (
        <FloatingCard key={item.id} src={item.src} delay={item.delay} />
      ))}
    </div>
  );
}

function FloatingCard({ src, delay }: { src: string, delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-48 h-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#55BFE5] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isHovered ? {
        y: 0,
        scale: 1.1,
        filter: "contrast(1.2) brightness(1.1)",
        boxShadow: "0 25px 50px -12px rgba(85, 191, 229, 0.5)"
      } : {
        y: [0, -20, 0],
        scale: 1,
        filter: "contrast(1) brightness(0.9)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      }}
      transition={isHovered ? {
        type: "spring", stiffness: 300, damping: 20
      } : {
        y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay },
        filter: { duration: 0.5 }
      }}
    >
      <img src={src} className="w-full h-full object-cover" alt="Floating Intangible" />
      {!isHovered && <div className="absolute inset-0 bg-white/10" />}
    </motion.div>
  );
}
