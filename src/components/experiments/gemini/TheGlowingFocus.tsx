"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const cards = [
  { id: 1, src: "/assets-experiment/images/antreprenori/a101.webp", color: "#8FC74A" },
  { id: 2, src: "/assets-experiment/images/antreprenori/a102.webp", color: "#F26F35" },
  { id: 3, src: "/assets-experiment/images/antreprenori/a103.webp", color: "#FEBD00" },
  { id: 4, src: "/assets-experiment/images/antreprenori/a104.webp", color: "#2D93A7" },
];

export default function TheGlowingFocus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", () => setMousePos({ x: -1000, y: -1000 }));
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex gap-6 p-12 overflow-visible bg-[#252422] rounded-3xl">
      {cards.map((card, i) => (
        <GlowCard key={card.id} card={card} mousePos={mousePos} />
      ))}
    </div>
  );
}

function GlowCard({ card, mousePos }: { card: any, mousePos: { x: number, y: number } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(1000);

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const parentRect = cardRef.current.parentElement?.getBoundingClientRect();
      if (!parentRect) return;
      
      const cardCenterX = rect.left - parentRect.left + rect.width / 2;
      const cardCenterY = rect.top - parentRect.top + rect.height / 2;
      
      const dist = Math.sqrt(
        Math.pow(mousePos.x - cardCenterX, 2) + Math.pow(mousePos.y - cardCenterY, 2)
      );
      setDistance(dist);
    }
  }, [mousePos]);

  // Closer to 0 means brighter glow
  const glowIntensity = Math.max(0, 1 - distance / 300);
  
  return (
    <div ref={cardRef} className="relative w-40 h-60">
      <motion.div 
        className="absolute inset-0 rounded-xl blur-xl"
        style={{ backgroundColor: card.color, opacity: glowIntensity * 0.8 }}
        animate={{ scale: 1 + glowIntensity * 0.2 }}
      />
      <div 
        className="absolute inset-0 rounded-xl overflow-hidden border-2 z-10 transition-transform duration-200"
        style={{ 
          borderColor: card.color, 
          boxShadow: `0 0 ${glowIntensity * 20}px ${card.color}`,
          transform: `scale(${1 + glowIntensity * 0.05}) translateY(${-glowIntensity * 10}px)`
        }}
      >
        <img src={card.src} className="w-full h-full object-cover" alt="Focus" />
        <div className="absolute inset-0 bg-black transition-opacity duration-200" style={{ opacity: 0.6 - glowIntensity * 0.6 }} />
      </div>
    </div>
  );
}
