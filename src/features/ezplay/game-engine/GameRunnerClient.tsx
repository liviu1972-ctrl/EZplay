"use client";

import dynamic from 'next/dynamic';
import type { Card } from './types';

const GameRunner = dynamic(() => import('./GameRunner'), {
  ssr: false,
  loading: () => <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center text-white">Încărcare EZplay...</div>
});

interface GameRunnerClientProps {
  dbCards?: Card[];
}

export default function GameRunnerClient({ dbCards }: GameRunnerClientProps) {
  return <GameRunner dbCards={dbCards} />;
}
