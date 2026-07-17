"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TheCinematicVideoCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div 
      className="relative w-80 h-[450px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer border-4 border-[#2D93A7]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Background */}
      <div className="absolute inset-0 bg-black">
        <video 
          ref={videoRef}
          src="/assets-experiment/video/tutorial.mp4" 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Static Cover */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img src="/assets-experiment/images/spate carti/event.webp" className="w-full h-full object-cover" alt="Cover" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay UI when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white"
          >
            <h3 className="font-bold text-xl mb-1 text-[#55BFE5]">Setup Initial</h3>
            <p className="text-sm opacity-90">Cum să pregătești masa de joc pentru EZplay Deckbuilder.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
