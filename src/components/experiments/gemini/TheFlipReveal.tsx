"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const cards = [
  { id: 1, front: "/assets-experiment/images/necorp/s149.webp", back: "/assets-experiment/images/spate carti/standard.webp" },
  { id: 2, front: "/assets-experiment/images/necorp/s150.webp", back: "/assets-experiment/images/spate carti/standard.webp" },
  { id: 3, front: "/assets-experiment/images/necorp/s151.webp", back: "/assets-experiment/images/spate carti/standard.webp" },
];

export default function TheFlipReveal() {
  return (
    <div className="flex gap-8 perspective-1000">
      {cards.map((card) => (
        <FlipCard key={card.id} front={card.front} back={card.back} />
      ))}
    </div>
  );
}

function FlipCard({ front, back }: { front: string, back: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-48 h-72 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0, y: isFlipped ? -20 : 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back of card (visible initially) */}
        <div className="absolute inset-0 backface-hidden rounded-2xl shadow-lg overflow-hidden border border-[#D7D0C2]">
          <img src={back} alt="Card Back" className="w-full h-full object-cover" />
        </div>
        
        {/* Front of card (revealed on flip) */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden border-2 border-[#8FC74A]"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <img src={front} alt="Card Front" className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </div>
  );
}
