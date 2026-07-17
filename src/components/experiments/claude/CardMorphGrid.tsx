"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cards = [
  "/assets-experiment/images/corporal/s101.webp",
  "/assets-experiment/images/uman/s111.webp",
  "/assets-experiment/images/necorp/s149.webp",
  "/assets-experiment/images/evenimente/e101.webp",
  "/assets-experiment/images/antreprenori/a101.webp",
  "/assets-experiment/images/corporal/s102.webp",
  "/assets-experiment/images/uman/s112.webp",
  "/assets-experiment/images/necorp/s150.webp",
  "/assets-experiment/images/evenimente/e102.webp",
  "/assets-experiment/images/antreprenori/a102.webp",
  "/assets-experiment/images/corporal/s103.webp",
  "/assets-experiment/images/uman/s113.webp"
];
const backImage = "/assets-experiment/images/spate carti/standard.webp";

export default function CardMorphGrid() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="w-full min-h-[800px] p-10 bg-[#373435] flex flex-col items-center justify-center relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto z-10">
        {cards.map((src, index) => (
          <motion.div
            key={index}
            layoutId={`card-container-${index}`}
            onClick={() => setSelectedId(index)}
            className="cursor-pointer relative w-32 h-48 md:w-40 md:h-60 perspective-[1000px]"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div 
              className="w-full h-full preserve-3d"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 0 }}
            >
              <img 
                src={backImage} 
                alt="Card back" 
                className="w-full h-full object-cover rounded-xl shadow-lg border border-[#2D93A7]/50" 
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <motion.div
                layoutId={`card-container-${selectedId}`}
                className="relative w-[60%] max-w-md aspect-[2.5/3.5] pointer-events-auto cursor-pointer perspective-[1000px]"
                onClick={() => setSelectedId(null)}
              >
                <motion.div
                  className="w-full h-full relative preserve-3d"
                  initial={{ rotateY: -180 }}
                  animate={{ rotateY: 0 }}
                  exit={{ rotateY: -180 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <img 
                    src={cards[selectedId]} 
                    alt="Card front" 
                    className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl" 
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                  <img 
                    src={backImage} 
                    alt="Card back" 
                    className="absolute inset-0 w-full h-full object-contain rounded-xl" 
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
