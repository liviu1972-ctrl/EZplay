"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = {
  default: "/assets-experiment/images/spate carti/event.webp",
  echipa: "/assets-experiment/images/uman/s115.webp",
  capital: "/assets-experiment/images/elemente cifre/cash.webp",
  strategie: "/assets-experiment/images/necorp/s152.webp",
};

export default function TheStoryCombo() {
  const [activeKey, setActiveKey] = useState<keyof typeof images>("default");

  return (
    <div className="flex flex-col md:flex-row gap-12 items-center w-full max-w-4xl">
      <div className="flex-1 text-lg leading-relaxed">
        <p className="mb-6">
          Succesul în EZplay depinde de un echilibru perfect între elementele de business. Totul începe cu o{" "}
          <span 
            className="font-bold text-[#FEBD00] cursor-pointer border-b-2 border-transparent hover:border-[#FEBD00] transition-colors"
            onMouseEnter={() => setActiveKey("echipa")}
            onMouseLeave={() => setActiveKey("default")}
          >
            Echipă
          </span> 
          {" "}solidă care poate executa planul.
        </p>
        <p className="mb-6">
          Desigur, nicio idee nu devine realitate fără un{" "}
          <span 
            className="font-bold text-[#8FC74A] cursor-pointer border-b-2 border-transparent hover:border-[#8FC74A] transition-colors"
            onMouseEnter={() => setActiveKey("capital")}
            onMouseLeave={() => setActiveKey("default")}
          >
            Capital
          </span>
          {" "}inițial care să susțină operațiunile.
        </p>
        <p>
          Iar pentru a naviga prin incertitudine, ai nevoie de o{" "}
          <span 
            className="font-bold text-[#55BFE5] cursor-pointer border-b-2 border-transparent hover:border-[#55BFE5] transition-colors"
            onMouseEnter={() => setActiveKey("strategie")}
            onMouseLeave={() => setActiveKey("default")}
          >
            Strategie
          </span>
          {" "}bine pusă la punct.
        </p>
      </div>
      
      <div className="flex-1 relative w-full h-[400px] rounded-3xl overflow-hidden bg-white shadow-xl border-4 border-white">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeKey}
            src={images[activeKey]}
            alt={activeKey}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
