"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const cards = [
  { id: 1, src: "/assets-experiment/images/uman/s111.webp", tag: "uman", color: "#FEBD00" }, // Yellow
  { id: 2, src: "/assets-experiment/images/corporal/s121.webp", tag: "corporal", color: "#2D93A7" }, // Teal/Blue
  { id: 3, src: "/assets-experiment/images/evenimente/e101.webp", tag: "eveniment", color: "#8FC74A" }, // Green
];

export default function TheDeckFan() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-64 h-96 flex items-center justify-center cursor-pointer perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cards.map((card, index) => {
        // Calculate offset for fan effect
        const rotation = isHovered ? (index - 1) * 15 : (index - 1) * 2;
        const xOffset = isHovered ? (index - 1) * 60 : (index - 1) * 5;
        const yOffset = isHovered ? Math.abs(index - 1) * 20 : 0;
        
        return (
          <motion.div
            key={card.id}
            className="absolute w-48 h-72 rounded-2xl shadow-xl overflow-hidden border-2 bg-white"
            style={{ borderColor: card.color }}
            animate={{
              rotateZ: rotation,
              x: xOffset,
              y: yOffset,
              zIndex: index,
              scale: isHovered && index === 1 ? 1.05 : 1
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <img src={card.src} alt={`Card ${card.tag}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10 rounded-2xl pointer-events-none" />
          </motion.div>
        );
      })}
    </div>
  );
}
