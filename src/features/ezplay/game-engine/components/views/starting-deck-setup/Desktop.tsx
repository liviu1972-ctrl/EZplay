import React, { useState, useMemo } from 'react';
import type { Card } from '../../../types';
import CardUI from '../../CardUI';
import StatDisplay from '../../StatDisplay';
import { STAT_ICONS } from '../../../constants';

interface DesktopStartingDeckSetupProps {
  onBack: () => void;
  deckSize: number;
  playerIndex: number;
  playerCount: number;
  isReEntry?: boolean;
  pool: Card[];
  availableCards: Card[];
  currentDeck: Card[];
  currentCash: number;
  selectedEntrepreneur: Card;
  selectedAccountant?: Card;
  handleAddToDeck: (card: Card) => void;
  handleRemoveFromDeck: (card: Card) => void;
  handleAutoFill: () => void;
  onConfirm: () => void;
  allEntrepreneurs: Card[];
}

const DesktopStartingDeckSetup: React.FC<DesktopStartingDeckSetupProps> = ({ 
  onBack, deckSize, playerIndex, playerCount, isReEntry, pool,
  availableCards, currentDeck, currentCash, selectedEntrepreneur, selectedAccountant,
  handleAddToDeck, handleRemoveFromDeck, handleAutoFill, onConfirm, allEntrepreneurs
}) => {
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);
  const [isDeckDragOver, setIsDeckDragOver] = useState(false);
  const [isPoolDragOver, setIsPoolDragOver] = useState(false);

  const deckTotals = useMemo(() => currentDeck.reduce((totals, card) => {
        totals.production += card.production;
        totals.sales += card.sales;
        totals.expenses += card.expenses;
        return totals;
      }, { production: 0, sales: 0, expenses: 0 }), [currentDeck]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card, source: 'pool' | 'deck') => {
    e.dataTransfer.setData('application/json', JSON.stringify({ card, source }));
    setDraggedCard(card);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, target: 'pool' | 'deck') => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    const { card, source } = data;
    
    if (source === 'pool' && target === 'deck') handleAddToDeck(card);
    else if (source === 'deck' && target === 'pool') handleRemoveFromDeck(card);
    
    setIsDeckDragOver(false);
    setIsPoolDragOver(false);
    setDraggedCard(null);
  };

  const isDeckComplete = currentDeck.length === deckSize;
  const titleText = isReEntry ? (pool ? `Reconstruire Scenariu - Jucător ${playerIndex + 1}` : `Reconstruire Companie - Jucător ${playerIndex + 1}`) : `Creare Deck Inițial - Jucător ${playerIndex + 1} / ${playerCount}`;
  const subtitleText = isReEntry ? (pool ? "Reconstruiește pachetul folosind regulile scenariului." : "Reconstruiește-ți pachetul folosind capitalul inițial și cărțile deținute.") : "Construiește-ți pachetul de start cumpărând cărți cu capitalul inițial.";

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 animate-fade-in flex flex-col h-[95vh] bg-slate-900">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-yellow-300">{titleText}</h1>
        <p className="text-slate-400">{subtitleText}</p>
      </div>
      
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`flex flex-col bg-slate-800/50 rounded-lg p-4 transition-all duration-300 ${isPoolDragOver ? 'ring-2 ring-yellow-400' : ''}`} onDragOver={(e) => { e.preventDefault(); if (draggedCard?.uid.startsWith('startdeck-')) setIsPoolDragOver(true); }} onDragLeave={() => setIsPoolDragOver(false)} onDrop={(e) => handleDrop(e, 'pool')}>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Cărți Disponibile</h2>
            <div className="overflow-y-auto flex-grow pr-2">
                <div className="flex flex-wrap justify-center gap-4">
                    {availableCards.sort((a,b) => a.cost - b.cost).map(card => {
                        const canAfford = currentCash >= card.cost && currentDeck.length < deckSize;
                        return (
                            <div key={card.uid} draggable={canAfford} onDragStart={(e) => canAfford && handleDragStart(e, card, 'pool')} className={`transition-opacity ${canAfford ? 'cursor-grab active:cursor-grabbing' : 'opacity-50 cursor-not-allowed'}`}>
                                <CardUI card={card} isFaceUp={true} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        <div className="flex flex-col">
            <div className="mb-4 flex justify-center items-start gap-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold text-slate-300 mb-2 uppercase tracking-wider">Antreprenor Ales</h2>
                    <CardUI card={selectedEntrepreneur} isFaceUp={true} />
                </div>
                {selectedAccountant && (
                  <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold text-slate-300 mb-2 uppercase tracking-wider">Contabil Ales</h2>
                    <CardUI card={selectedAccountant} isFaceUp={true} />
                  </div>
                )}
            </div>
            <div className="bg-slate-800/50 rounded-lg p-2 mb-4 flex justify-between items-center shadow-inner">
                <div className="flex items-center space-x-1">
                    <StatDisplay label="Cash" value={currentCash} imageUrl={STAT_ICONS.cash} textColor="text-black" />
                    <StatDisplay label="Productie" value={deckTotals.production} imageUrl={STAT_ICONS.production} />
                    <StatDisplay label="Vanzari" value={deckTotals.sales} imageUrl={STAT_ICONS.sales} textColor="text-black" />
                    <StatDisplay label="Cheltuieli" value={deckTotals.expenses} imageUrl={STAT_ICONS.expenses} />
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={handleAutoFill} className="p-3 rounded-full bg-yellow-600/80 text-white hover:bg-yellow-700 transition-colors duration-200 shadow-lg" title="Populare Automată"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.898 20.575 16.5 21.75l-.398-1.175a3.375 3.375 0 0 0-2.456-2.456L12.75 18l1.175-.398a3.375 3.375 0 0 0 2.456-2.456L16.5 14.25l.398 1.175a3.375 3.375 0 0 0 2.456 2.456L20.25 18l-1.175.398a3.375 3.375 0 0 0-2.456 2.456Z" /></svg></button>
                    <div><span className="text-2xl font-bold">Deck: </span><span className={`text-4xl font-bold ${isDeckComplete ? 'text-green-400' : 'text-white'}`}>{currentDeck.length}</span><span className="text-2xl font-bold text-slate-400"> / {deckSize}</span></div>
                </div>
            </div>
            <div className={`flex-grow bg-slate-900/60 rounded-lg p-4 border-2 border-dashed border-gray-600 overflow-y-auto transition-all duration-300 ${isDeckDragOver ? 'border-green-500 ring-2 ring-green-500' : ''}`} onDragOver={(e) => { e.preventDefault(); if (draggedCard?.uid.startsWith('pool-')) setIsDeckDragOver(true); }} onDragLeave={() => setIsDeckDragOver(false)} onDrop={(e) => handleDrop(e, 'deck')}>
                <div className="flex flex-wrap justify-center gap-4">
                    {currentDeck.map(card => (<div key={card.uid} draggable onDragStart={(e) => handleDragStart(e, card, 'deck')} className="cursor-grab active:cursor-grabbing"><CardUI card={card} isFaceUp={true} /></div>))}
                    {Array.from({ length: deckSize - currentDeck.length }).map((_, i) => (<div key={`placeholder-${i}`} className="w-48 aspect-[2.5/3.5] bg-slate-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-700"><span className="text-slate-500">Slot Gol</span></div>))}
                </div>
            </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        {!isReEntry && (<button onClick={onBack} className="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 transition-colors">Înapoi la Meniu</button>)}
        <div className="flex-grow flex justify-end"><button onClick={() => onConfirm()} disabled={!isDeckComplete} className="px-10 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors text-2xl disabled:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50">{isReEntry ? 'Reintră în Joc' : 'Confirmă'}</button></div>
      </div>
    </div>
  );
};

export default DesktopStartingDeckSetup;
