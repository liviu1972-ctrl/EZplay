"use client";

import React, { useEffect, useRef, useState } from 'react';

const artworks = [
  '/assets-experiment/artwork/s101-activ-corporal-cost-0.webp',
  '/assets-experiment/artwork/s111-activ-uman-cost-0.webp',
  '/assets-experiment/artwork/s149-activ-necorporal-cost-3.webp',
  '/assets-experiment/artwork/a101-antreprenor.webp',
  '/assets-experiment/artwork/e101-eveniment.webp',
  '/assets-experiment/artwork/s102-activ-corporal-cost-1.webp',
  '/assets-experiment/artwork/s112-activ-uman-cost-1.webp',
  '/assets-experiment/artwork/s150-activ-necorporal-cost-4.webp',
  '/assets-experiment/artwork/a102-antreprenor.webp',
  '/assets-experiment/artwork/e102-eveniment.webp',
  '/assets-experiment/artwork/s103-activ-corporal-cost-2.webp',
  '/assets-experiment/artwork/s113-activ-uman-cost-2.webp',
  '/assets-experiment/artwork/s104-activ-corporal-cost-3.webp',
  '/assets-experiment/artwork/s114-activ-uman-cost-3.webp',
  '/assets-experiment/artwork/a103-antreprenor.webp',
];

interface Particle {
  id: number;
  src: string;
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  speed: number;
  amplitude: number;
}

export default function ArtworkParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const initialParticles: Particle[] = artworks.map((src, i) => {
      const radius = 40 + Math.random() * 20;
      const x = Math.random() * (w - radius * 2) + radius;
      const y = Math.random() * (h - radius * 2) + radius;
      return {
        id: i,
        src,
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        radius,
        phase: Math.random() * Math.PI * 2,
        speed: 0.001 + Math.random() * 0.002,
        amplitude: 20 + Math.random() * 40
      };
    });

    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      timeRef.current += 16;
      setParticles(prev => prev.map(p => {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        
        // Target position based on origin + sine wave
        const targetX = p.originX + Math.sin(timeRef.current * p.speed + p.phase) * p.amplitude;
        const targetY = p.originY + Math.cos(timeRef.current * p.speed + p.phase) * p.amplitude;

        let dx = p.x - mx;
        let dy = p.y - my;
        let dist = Math.sqrt(dx * dx + dy * dy);

        let forceX = 0;
        let forceY = 0;

        // Repulsion
        const maxDist = 200;
        if (dist < maxDist && dist > 0) {
          const force = (maxDist - dist) / maxDist;
          forceX = (dx / dist) * force * 5;
          forceY = (dy / dist) * force * 5;
        }

        // Return to target
        const returnForce = 0.05;
        forceX += (targetX - p.x) * returnForce;
        forceY += (targetY - p.y) * returnForce;

        // Friction
        p.vx = (p.vx + forceX) * 0.85;
        p.vy = (p.vy + forceY) * 0.85;

        return {
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy
        };
      }));
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[600px] bg-[#373435] relative overflow-hidden rounded-xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, rgba(45,147,167,0.1) 0%, transparent 70%)'
      }} />
      
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-xl overflow-hidden shadow-lg transition-transform duration-75"
          style={{
            width: p.radius * 2,
            height: p.radius * 2,
            transform: `translate(${p.x - p.radius}px, ${p.y - p.radius}px)`,
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.1) inset'
          }}
        >
          <img src={p.src} alt="Artwork" className="w-full h-full object-cover pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
