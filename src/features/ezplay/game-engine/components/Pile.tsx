import React, { useState, useEffect } from 'react';
import type { Card } from '../types';
import CardUI from './CardUI';

interface PileProps {
  cards: Card[];
  title: string;
  onCardDrop?: (data: any) => void;
  isInteractive?: boolean;
  interactiveRef?: React.Ref<HTMLDivElement>;
}

const Pile: React.FC<PileProps> = ({ cards, title, onCardDrop, isInteractive = false, interactiveRef }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const topCard = cards.length > 0 ? cards[cards.length - 1] : undefined;
  const isDiscard = title === 'Echipă';
  const canReveal = cards.length > 0 && isInteractive;

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsRevealing(false);
    };

    if (isRevealing) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isRevealing]);


  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (onCardDrop) e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (onCardDrop) {
      e.preventDefault();
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (onCardDrop) {
      e.preventDefault();
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (onCardDrop) {
      e.preventDefault();
      setIsDragOver(false);
      try {
        const jsonData = e.dataTransfer.getData('application/json');
        if (jsonData) {
          const data = JSON.parse(jsonData);
          onCardDrop(data);
        }
      } catch (error) {
        console.error("Failed to parse dropped card data", error);
      }
    }
  };

  // Reveal handler for mouse down on the pile
  const handleMouseDown = () => {
    if (canReveal) {
      setIsRevealing(true);
    }
  };
  
  const dropZoneStyles = onCardDrop ? 'transition-all duration-200' : '';
  const dragOverStyles = isDragOver ? 'border-green-500 ring-2 ring-offset-slate-900 ring-offset-2 ring-green-500 scale-105' : 'border-gray-600';
  const interactiveStyles = canReveal ? 'cursor-pointer select-none' : '';

  return (
    <>
      <div className="flex flex-col items-center space-y-2 w-48">
        <h2 className="text-xl font-bold text-white uppercase tracking-wider">{title} ({cards.length})</h2>
        <div 
          ref={interactiveRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onMouseDown={handleMouseDown}
          className={`w-48 h-[268.8px] bg-slate-800/50 rounded-lg flex items-center justify-center border-2 border-dashed relative ${dropZoneStyles} ${dragOverStyles} ${interactiveStyles}`}>
          {cards.length > 0 && (
              <div className="absolute w-full h-full">
                  {cards.slice(Math.max(cards.length - 5, 0)).map((_, index) => (
                      <div
                          key={index}
                          className="absolute w-full h-full rounded-lg bg-slate-700 shadow-lg"
                          style={{ top: `${index * -2}px`, left: `${index * 2}px` }}
                      />
                  ))}
                  <div className="absolute w-full h-full" style={{ top: `${Math.min(cards.length, 5) * -2}px`, left: `${Math.min(cards.length, 5) * 2}px` }}>
                      <CardUI card={topCard} isFaceUp={isDiscard} />
                  </div>
              </div>
          )}
          {cards.length === 0 && <span className="text-gray-500">Empty</span>}
        </div>
      </div>
      
      {isRevealing && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="w-full h-full max-w-7xl max-h-[90vh] bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 overflow-y-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">{title} Pile ({cards.length})</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[...cards].reverse().map((card) => (
                <div key={card.uid}>
                  <CardUI card={card} isFaceUp={true} />
                </div>
              ))}
            </div>
            <p className="text-slate-400 mt-auto pt-4 animate-pulse">Release mouse button to close</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Pile;