
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Card, GameConfig } from '../types';

interface EventsSetupProps {
  onBack: () => void;
  allAvailableEvents: Card[];
  gameConfig: GameConfig;
}

const simpleShuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const EventCardRow: React.FC<{
    card: Card;
    index: number;
    isDragOver: boolean;
    onDelete: () => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}> = ({ card, index, isDragOver, onDelete, ...dragProps }) => {
    return (
        <div
            draggable
            {...dragProps}
            className="relative"
        >
            {isDragOver && <div className="absolute top-0 left-0 right-0 h-1 bg-blue-400 rounded-full animate-pulse" />}
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto_2fr_auto] items-center gap-4 p-3 bg-slate-700/50 hover:bg-slate-700 rounded-md cursor-grab active:cursor-grabbing transition-colors duration-200">
                <div className="text-slate-400 font-mono text-lg">{index + 1}</div>
                <div className="font-bold text-white">{card.name} ({card.id})</div>
                <div className="text-center font-mono" title="Producție">{card.production}</div>
                <div className="text-center font-mono" title="Marketing">{card.marketing}</div>
                <div className="text-center font-mono" title="Cheltuieli">{card.expenses}</div>
                <div className="text-sm text-slate-300 italic truncate" title={card.effect?.description}>{card.effect?.description || 'N/A'}</div>
                <button
                    onClick={onDelete}
                    className="p-2 rounded-full text-slate-400 hover:bg-red-800/50 hover:text-red-400 transition-colors"
                    aria-label={`Șterge evenimentul ${card.name}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const EventsSetup: React.FC<EventsSetupProps> = ({ onBack, allAvailableEvents, gameConfig }) => {
  const [eventSequence, setEventSequence] = useState<Card[]>([]);
  const [startYear, setStartYear] = useState(() => {
    const saved = localStorage.getItem('eventsConfig_startYear');
    return saved ? parseInt(saved, 10) : gameConfig.eventsStartYear;
  });
  
  const draggedItemRef = useRef<Card | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const SEQ_STORAGE_KEY = 'eventsConfig_sequence';
  const YEAR_STORAGE_KEY = 'eventsConfig_startYear';

  const handleResetSequence = useCallback(() => {
    if (!allAvailableEvents || allAvailableEvents.length === 0) return;
    const newShuffledSequence = simpleShuffle<Card>(allAvailableEvents).map((card, index) => ({
      ...card,
      uid: `event-setup-${card.globalId}-${index}-${Date.now()}`
    }));
    setEventSequence(newShuffledSequence);
  }, [allAvailableEvents]);

  useEffect(() => {
    // Așteaptă până când `allAvailableEvents` este populat.
    if (!allAvailableEvents || allAvailableEvents.length === 0) {
      setEventSequence([]);
      return;
    }

    try {
      const savedSequenceJSON = localStorage.getItem(SEQ_STORAGE_KEY);
      if (savedSequenceJSON) {
        const savedSequence = JSON.parse(savedSequenceJSON) as Card[];
        
        // Logica de reconciliere:
        // 1. Filtrează cărțile salvate pentru a le păstra doar pe cele care încă există.
        const availableIds = new Set(allAvailableEvents.map(c => c.globalId));
        const validSavedSequence = savedSequence.filter((c: Card) => availableIds.has(c.globalId));

        // 2. Găsește cărțile noi (existente în allAvailableEvents, dar nu în secvența salvată).
        const savedIds = new Set(validSavedSequence.map((c: Card) => c.globalId));
        const newCards = allAvailableEvents
          .filter(c => !savedIds.has(c.globalId))
          .map((card: Card) => ({
            ...card,
            uid: `event-setup-${card.globalId}-${Date.now()}`
          }));

        // 3. Combină secvența salvată validă cu noile cărți.
        setEventSequence([...validSavedSequence, ...newCards]);
      } else {
        // Dacă nu există o secvență salvată, reseteaz-o.
        handleResetSequence();
      }
    } catch (e) {
      console.error("Eroare la încărcarea secvenței de evenimente. Se resetează.", e);
      handleResetSequence();
    }
  }, [allAvailableEvents, handleResetSequence]);

  useEffect(() => {
    // Salvează secvența în localStorage de fiecare dată când se modifică.
    localStorage.setItem(SEQ_STORAGE_KEY, JSON.stringify(eventSequence));
  }, [eventSequence]);

  useEffect(() => {
    localStorage.setItem(YEAR_STORAGE_KEY, String(startYear));
  }, [startYear]);

  const handleDeleteCard = (uid: string) => {
    setEventSequence(prev => prev.filter(card => card.uid !== uid));
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, item: Card) => {
    draggedItemRef.current = item;
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItemRef.current?.uid === eventSequence[index].uid) {
        setDragOverIndex(null);
        return;
    }
    setDragOverIndex(index);
  };
  
  const onDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    const draggedItem = draggedItemRef.current;
    if (!draggedItem) return;

    const draggedItemIndex = eventSequence.findIndex(item => item.uid === draggedItem.uid);
    const newSequence = [...eventSequence];
    const [movedItem] = newSequence.splice(draggedItemIndex, 1);
    newSequence.splice(dropIndex, 0, movedItem);

    setEventSequence(newSequence);
    draggedItemRef.current = null;
    setDragOverIndex(null);
  };
  
  return (
    <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white flex flex-col h-[90vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider">Editor Secvență Evenimente</h1>
        <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="start-year-input" className="block text-sm font-bold text-slate-300 text-center">An Start</label>
              <input
                type="number"
                id="start-year-input"
                value={startYear}
                onChange={(e) => setStartYear(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="mt-1 w-20 px-2 py-1 bg-slate-700 border border-slate-600 rounded-md"
              />
            </div>
            <button onClick={handleResetSequence} className="px-5 py-2 bg-yellow-600 text-white font-bold rounded-lg shadow-md hover:bg-yellow-700 transition-colors">
                Resetează Secvența
            </button>
            <button onClick={onBack} className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
              Înapoi
            </button>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto pr-4 border-t border-b border-slate-700 py-4">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_2fr_auto] items-center gap-4 px-3 pb-2 text-slate-400 text-sm font-bold uppercase">
            <div className="text-center">#</div>
            <div>Nume</div>
            <div className="text-center" title="Producție">P</div>
            <div className="text-center" title="Marketing">M</div>
            <div className="text-center" title="Cheltuieli">C</div>
            <div>Efect</div>
            <div className="text-center">Acțiuni</div>
        </div>
        <div 
          className="space-y-2"
          onDragLeave={() => setDragOverIndex(null)}
        >
            {eventSequence.map((card, index) => (
                <EventCardRow
                    key={card.uid}
                    card={card}
                    index={index}
                    isDragOver={dragOverIndex === index}
                    onDelete={() => handleDeleteCard(card.uid)}
                    onDragStart={(e) => onDragStart(e, card)}
                    onDragOver={(e) => onDragOver(e, index)}
                    onDragLeave={() => {}}
                    onDrop={(e) => onDrop(e, index)}
                />
            ))}
        </div>
      </div>
      <p className="text-sm text-slate-500 mt-4 text-center">Trageți evenimentele pentru a le reordona. Ordinea de sus în jos este ordinea în care vor apărea în joc.</p>
    </div>
  );
};

export default EventsSetup;
