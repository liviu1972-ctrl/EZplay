

import React, { useState } from 'react';
import type { RetireFromHandEffectPayload } from '../types';
import { RetireIcon } from './Icons';

interface RetireZoneProps {
  count: number;
  disabled: boolean;
  onCardDrop: (data: any) => void;
  retireModifier: RetireFromHandEffectPayload | null;
}

const RetireZone: React.FC<RetireZoneProps> = ({ count, disabled, onCardDrop, retireModifier }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!disabled) {
      e.preventDefault();
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (!disabled) {
      e.preventDefault();
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!disabled) {
      e.preventDefault();
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!disabled) {
      e.preventDefault();
      setIsDragOver(false);
      try {
        const jsonData = e.dataTransfer.getData('application/json');
        if (jsonData) {
          const data = JSON.parse(jsonData);
          onCardDrop(data);
        }
      } catch (error) {
        console.error("Failed to parse dropped card data for retiring", error);
      }
    }
  };
  
  const baseClasses = 'w-48 h-[134.4px] bg-slate-800/50 rounded-lg flex flex-col items-center justify-center border-2 border-dashed relative transition-all duration-200';
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  const enabledClasses = 'border-amber-600/50';
  const dragOverClasses = isDragOver ? 'border-amber-500 ring-2 ring-offset-slate-900 ring-offset-2 ring-amber-500 scale-105 bg-amber-900/20' : '';

  return (
    <div className="flex flex-col items-center space-y-2 w-48">
      <h2 className="text-xl font-bold text-white uppercase tracking-wider">Retrase ({count})</h2>
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${dragOverClasses}`}
      >
        <RetireIcon />
        <span className="text-sm text-gray-400 mt-1">Retrage carte pt. 1 <span className="text-yellow-500 font-bold">$</span></span>
        {retireModifier && retireModifier.retireCost < 1 && (
          <span className="text-xs text-green-400 absolute bottom-2 text-center px-1">
            Event: Retragere gratis '{retireModifier.assetType}'
          </span>
        )}
      </div>
    </div>
  );
};

export default RetireZone;