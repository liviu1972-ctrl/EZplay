"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const carouselItems = [
  { id: 1, src: "/assets-experiment/images/corporal/s121.webp", tag: "Corporal" },
  { id: 2, src: "/assets-experiment/images/uman/s115.webp", tag: "Uman" },
  { id: 3, src: "/assets-experiment/images/evenimente/e101.webp", tag: "Eveniment" },
  { id: 4, src: "/assets-experiment/images/necorp/s151.webp", tag: "Necorporal" },
  { id: 5, src: "/assets-experiment/images/elemente cifre/cash.webp", tag: "Financiar" },
];

export default function TheCircularCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  const getPosition = (index: number) => {
    const diff = (index - currentIndex + carouselItems.length) % carouselItems.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -4) return "right";
    if (diff === carouselItems.length - 1 || diff === 4) return "left";
    return "hidden";
  };

  const variants = {
    center: { x: 0, scale: 1, zIndex: 10, opacity: 1, filter: "blur(0px)" },
    left: { x: "-60%", scale: 0.7, zIndex: 5, opacity: 0.6, filter: "blur(4px)" },
    right: { x: "60%", scale: 0.7, zIndex: 5, opacity: 0.6, filter: "blur(4px)" },
    hidden: { x: 0, scale: 0.5, zIndex: 0, opacity: 0, filter: "blur(10px)" }
  };

  return (
    <div className="relative w-full max-w-3xl h-[500px] flex items-center justify-center">
      
      <div className="absolute inset-0 flex items-center justify-center">
        {carouselItems.map((item, idx) => (
          <motion.div
            key={item.id}
            className="absolute w-64 h-96 rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
            variants={variants}
            initial={false}
            animate={getPosition(idx)}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={() => {
              if (getPosition(idx) === "right") next();
              if (getPosition(idx) === "left") prev();
            }}
          >
            <img src={item.src} className="w-full h-full object-cover" alt={item.tag} />
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-4 flex gap-4 z-20">
        <button onClick={prev} className="px-6 py-2 bg-white rounded-full shadow border font-bold hover:bg-gray-50">←</button>
        <button onClick={next} className="px-6 py-2 bg-white rounded-full shadow border font-bold hover:bg-gray-50">→</button>
      </div>
      
    </div>
  );
}
