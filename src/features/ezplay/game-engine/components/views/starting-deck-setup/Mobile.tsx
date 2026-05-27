import React, { useState, useMemo } from 'react';
import type { Card } from '../../../types';
import CardUI from '../../CardUI';
import { STAT_ICONS } from '../../../constants';

interface MobileStartingDeckSetupProps {
  onBack: () => void;
  deckSize: number;
  playerIndex: number;
  playerCount: number;
  isReEntry?: boolean;
  availableCards: Card[];
  currentDeck: Card[];
  currentCash: number;
  selectedEntrepreneur: Card;
  selectedAccountant?: Card;
  handleAutoFill: () => void;
  onConfirm: (selectedCards: Card[]) => void;
}

const MobileStat: React.FC<{ 
    label: string; 
    value: string | number; 
    imageUrl: string; 
    textColor?: string; 
}> = ({ label, value, imageUrl, textColor = 'text-white' }) => (
    <div className="flex flex-col items-center space-y-0.5 w-12">
        <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider h-4">{label}</span>
        <div 
            className="w-10 h-10 rounded-md flex items-center justify-center bg-cover bg-center shadow-lg"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <span className={`font-bold text-lg ${textColor}`} style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                {value}
            </span>
        </div>
    </div>
);


const MobileStartingDeckSetup: React.FC<MobileStartingDeckSetupProps> = ({
  onBack, deckSize, playerIndex, playerCount, isReEntry,
  availableCards, currentDeck, currentCash, selectedEntrepreneur,
  handleAutoFill, onConfirm
}) => {
  const [selectedCardUids, setSelectedCardUids] = useState<Set<string>>(new Set());

  const selectedCards = useMemo(() => 
    availableCards.filter(c => selectedCardUids.has(c.uid)), 
    [availableCards, selectedCardUids]
  );

  const selectionTotals = useMemo(() => {
    return selectedCards.reduce(
      (totals, card) => {
        totals.production += card.production;
        totals.marketing += card.marketing;
        totals.expenses += card.expenses;
        return totals;
      },
      { production: 0, marketing: 0, expenses: 0 }
    );
  }, [selectedCards]);
  
  const handleToggleSelection = (card: Card) => {
    const newSelected = new Set(selectedCardUids);
    if (newSelected.has(card.uid)) {
      newSelected.delete(card.uid);
    } else {
      const selectionCost = selectedCards.reduce((sum, c) => sum + c.cost, 0);
      const potentialDeckSize = currentDeck.length + newSelected.size + 1;
      const potentialCost = selectionCost + card.cost;
      
      if (potentialDeckSize <= deckSize && currentCash >= potentialCost) {
        newSelected.add(card.uid);
      }
    }
    setSelectedCardUids(newSelected);
  };

  const isDeckComplete = currentDeck.length + selectedCards.length === deckSize;

  return (
    <div className="w-full h-screen p-2 flex flex-col bg-slate-900 text-white">
      <div className="text-center mb-2 flex-shrink-0">
        <h1 className="text-xl font-bold text-yellow-300">Creare Deck - Jucător {playerIndex + 1}</h1>
      </div>

      {/* Available Cards Pool */}
      <div className="bg-slate-800/50 rounded-lg p-2 flex-grow overflow-y-auto">
          <div className="flex flex-wrap justify-center gap-2">
              {availableCards.sort((a,b) => a.cost - b.cost).map(card => {
                  const isSelected = selectedCardUids.has(card.uid);
                  const selectionCost = selectedCards.reduce((sum, c) => sum + (c.uid === card.uid ? 0 : c.cost), 0);
                  const canSelect = !isSelected && (currentDeck.length + selectedCards.length < deckSize) && (currentCash >= selectionCost + card.cost);
                  
                  return (
                      <div key={card.uid} onClick={() => (isSelected || canSelect) && handleToggleSelection(card)} className={`transition-opacity ${!(isSelected || canSelect) ? 'opacity-40' : ''}`}>
                          <CardUI card={card} isFaceUp={true} size="small" isSelected={isSelected} />
                      </div>
                  );
              })}
          </div>
      </div>
      
      <div className="flex-shrink-0 mt-2 p-2 bg-slate-800/90 backdrop-blur-sm rounded-lg border-t border-slate-700 flex items-center justify-between">
          {!isReEntry && (
              <button onClick={onBack} className="p-2 rounded-full bg-slate-600 hover:bg-slate-500 transition-colors" aria-label="Înapoi la meniu">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
              </button>
          )}

          <div className="flex items-center">
              <MobileStat 
                  label="Cash" 
                  value={currentCash - selectedCards.reduce((s,c) => s+c.cost, 0)} 
                  imageUrl={STAT_ICONS.cash}
                  textColor="text-black"
              />
              <MobileStat 
                  label="Prod." 
                  value={selectionTotals.production} 
                  imageUrl={STAT_ICONS.production}
                  textColor="text-white"
              />
              <MobileStat 
                  label="Mkt." 
                  value={selectionTotals.marketing} 
                  imageUrl={STAT_ICONS.marketing}
                  textColor="text-black"
              />
              <MobileStat 
                  label="Chelt." 
                  value={selectionTotals.expenses} 
                  imageUrl={STAT_ICONS.expenses}
                  textColor="text-white"
              />
          </div>

          <div className="flex items-center space-x-2">
              <div className="text-center">
                  <span className="text-xs text-slate-400 uppercase">Deck</span>
                  <div className={`text-lg font-bold ${isDeckComplete ? 'text-green-400' : 'text-white'}`}>
                      {currentDeck.length + selectedCards.length}/{deckSize}
                  </div>
              </div>
              <button onClick={handleAutoFill} className="p-2 rounded-full bg-yellow-600/80 text-white hover:bg-yellow-700" title="Populare Automată">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09zM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456zM16.898 20.575 16.5 21.75l-.398-1.175a3.375 3.375 0 0 0-2.456-2.456L12.75 18l1.175-.398a3.375 3.375 0 0 0 2.456-2.456L16.5 14.25l.398 1.175a3.375 3.375 0 0 0 2.456 2.456L20.25 18l-1.175.398a3.375 3.375 0 0 0-2.456 2.456z" />
                  </svg>
              </button>
              <button onClick={() => onConfirm(selectedCards)} disabled={!isDeckComplete} className={`p-3 rounded-lg text-white font-bold transition-colors ${isDeckComplete ? 'bg-green-600' : 'bg-slate-700 opacity-50'}`}>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
              </button>
          </div>
      </div>
    </div>
  );
};

export default MobileStartingDeckSetup;
