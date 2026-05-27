import React, { useState } from 'react';
import type { Card } from '../../../types';
import CardUI from '../../CardUI';

interface MobileEntrepreneurSelectionProps {
  entrepreneurs: Card[];
  onConfirm: (selectedId: string) => void;
  onBack: () => void;
  playerContextText?: string;
}

const MobileEntrepreneurSelection: React.FC<MobileEntrepreneurSelectionProps> = ({ entrepreneurs, onConfirm, onBack, playerContextText }) => {
  const [viewingCard, setViewingCard] = useState<Card | null>(null);

  const handleSelect = (card: Card) => {
    onConfirm(card.id);
  };

  return (
    <div className="w-full h-screen p-2 animate-fade-in flex flex-col bg-slate-900">
      
      {/* Optional context text, small and unobtrusive */}
      {playerContextText && (
          <p className="text-center text-slate-400 mb-2 text-sm flex-shrink-0">
              Este rândul lui <span className="font-bold text-yellow-300">{playerContextText}</span> să aleagă.
          </p>
      )}
      
      {/* Grid of cards */}
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-wrap justify-center gap-2">
          {entrepreneurs.map(ent => (
            <div key={ent.id} onClick={() => setViewingCard(ent)}>
              <CardUI card={ent} isFaceUp={true} size="small" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Single back button */}
      <div className="mt-2 flex-shrink-0">
        <button onClick={onBack} className="w-full py-3 bg-slate-700 text-white font-bold rounded-lg">
          Înapoi la Meniu
        </button>
      </div>

      {/* Modal for selection */}
      {viewingCard && (
        <div 
            className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setViewingCard(null)} // Click outside to close
        >
          <div 
            className="flex flex-col items-center space-y-6"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Large Card Preview */}
            <div className="scale-125">
              <CardUI card={viewingCard} isFaceUp={true} size="medium" />
            </div>
            
            {/* Action Buttons */}
            <div className="w-64 flex flex-col items-center space-y-3">
                <button 
                    onClick={() => handleSelect(viewingCard)}
                    className="w-full py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg text-lg hover:bg-green-700 transition-colors"
                >
                    Alege Antreprenor
                </button>
                <button
                    onClick={() => setViewingCard(null)}
                    className="w-full py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors"
                >
                    Anulează
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileEntrepreneurSelection;
