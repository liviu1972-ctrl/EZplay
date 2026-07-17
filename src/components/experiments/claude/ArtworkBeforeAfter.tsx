"use client";

import React, { useState, useRef, useEffect } from 'react';

const artworks = [
  '/assets-experiment/artwork/s101-activ-corporal-cost-0.webp',
  '/assets-experiment/artwork/s111-activ-uman-cost-0.webp',
  '/assets-experiment/artwork/s149-activ-necorporal-cost-3.webp',
  '/assets-experiment/artwork/a101-antreprenor.webp',
  '/assets-experiment/artwork/e101-eveniment.webp',
  '/assets-experiment/artwork/s102-activ-corporal-cost-1.webp',
];

export default function ArtworkBeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const Collage = ({ isColor }: { isColor: boolean }) => (
    <div className="absolute inset-0 w-full h-full flex flex-wrap content-center justify-center p-8 gap-4 bg-[#373435]">
      {artworks.map((src, i) => (
        <div 
          key={i} 
          className="relative w-1/3 max-w-[200px] aspect-square rounded-xl overflow-hidden shadow-2xl"
          style={{
            transform: `rotate(${i % 2 === 0 ? 5 : -5}deg) scale(${i === 2 ? 1.1 : 1})`,
            zIndex: i === 2 ? 10 : 1,
            filter: isColor 
              ? 'drop-shadow(0 0 15px rgba(45, 147, 167, 0.4)) saturate(1.2)' 
              : 'grayscale(100%) opacity(0.7)',
            transition: 'filter 0.3s ease'
          }}
        >
          <img src={src} className="w-full h-full object-cover pointer-events-none" alt="" />
        </div>
      ))}
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[600px] relative overflow-hidden rounded-xl cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
    >
      {/* Base Layer (Color) */}
      <Collage isColor={true} />

      {/* Top Layer (Grayscale) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="absolute inset-0" style={{ width: '100vw', maxWidth: containerRef.current?.offsetWidth || 1000 }}>
          <Collage isColor={false} />
        </div>
      </div>

      {/* Divider */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-[#55BFE5] shadow-[0_0_15px_rgba(85,191,229,0.8)] z-20 flex items-center justify-center"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-12 h-12 rounded-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none">
          <img src="/assets-experiment/logo/ezplay-logo-primary-v01-w512-public.webp" className="w-8 h-8 object-contain" alt="EZplay Logo" />
        </div>
      </div>
    </div>
  );
}
