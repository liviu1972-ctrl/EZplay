"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const profiles = [
  { id: 1, src: "/assets-experiment/images/uman/s111.webp", name: "Strategist", role: "Viziune" },
  { id: 2, src: "/assets-experiment/images/uman/s112.webp", name: "Operator", role: "Execuție" },
  { id: 3, src: "/assets-experiment/images/uman/s113.webp", name: "Analist", role: "Date" },
  { id: 4, src: "/assets-experiment/images/uman/s114.webp", name: "Lider", role: "Echipă" },
];

export default function TheExpandingAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-[400px] w-full max-w-4xl gap-4">
      {profiles.map((profile, idx) => {
        const isActive = active === idx;
        return (
          <motion.div
            key={profile.id}
            className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg border-2 border-[#FEBD00]"
            initial={false}
            animate={{ 
              flex: isActive ? 3 : 1,
              filter: isActive ? "grayscale(0%)" : "grayscale(50%)"
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onMouseEnter={() => setActive(idx)}
          >
            <img src={profile.src} alt={profile.name} className="absolute inset-0 w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <motion.div 
              className="absolute bottom-6 left-6 right-6 text-white overflow-hidden"
              animate={{ opacity: isActive ? 1 : 0 }}
            >
              <h3 className="text-2xl font-bold whitespace-nowrap">{profile.name}</h3>
              <p className="text-[#FEBD00] font-bold">{profile.role}</p>
              <p className="text-sm mt-2 line-clamp-2 text-gray-200">
                Resursa umană necesară pentru a asigura direcția corectă în momentele critice ale startup-ului.
              </p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
