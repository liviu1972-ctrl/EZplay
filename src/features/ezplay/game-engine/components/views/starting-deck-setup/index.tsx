import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Card } from '../../../types';
import { useIsMobile } from '../../hooks/useIsMobile';
import DesktopStartingDeckSetup from './Desktop';
import MobileStartingDeckSetup from './Mobile';

interface StartingDeckSetupProps {
  onSetupComplete: (setup: { finalDeck: Card[], finalCash: number, selectedEntrepreneur: Card, selectedAccountant?: Card }) => void;
  onBack: () => void;
  startingCash: number;
  deckSize: number;
  selectedEntrepreneurId: string;
  selectedAccountant?: Card;
  playerIndex: number;
  playerCount: number;
  legacyCards: Card[];
  isReEntry?: boolean;
  pool: Card[];
  allEntrepreneurs: Card[];
}

const StartingDeckSetup: React.FC<StartingDeckSetupProps> = (props) => {
    const isMobile = useIsMobile();
    const { startingCash, deckSize, selectedEntrepreneurId, isReEntry, legacyCards, pool, allEntrepreneurs, selectedAccountant } = props;

    const [availableCards, setAvailableCards] = useState<Card[]>([]);
    const [currentDeck, setCurrentDeck] = useState<Card[]>([]);
    const [currentCash, setCurrentCash] = useState(startingCash);

    const selectedEntrepreneur = useMemo(() => {
        return allEntrepreneurs.find(e => e.id === selectedEntrepreneurId)!;
    }, [selectedEntrepreneurId, allEntrepreneurs]);

    useEffect(() => {
        setCurrentCash(startingCash);
        setCurrentDeck([]);
    }, [startingCash, deckSize, selectedEntrepreneurId, props.playerIndex, isReEntry, pool]);
    
    useEffect(() => {
        const uniqueCardsMap = new Map<string, Card>();
        
        // Step 1: The `pool` prop is now the single source of truth for available cards.
        pool.forEach(card => uniqueCardsMap.set(card.globalId, { ...card }));

        // Step 2: If re-entering, add all legacy cards.
        if (isReEntry) {
          legacyCards.forEach(card => uniqueCardsMap.set(card.globalId, { ...card }));
        }

        // Step 3: Convert map values to an array and assign fresh UIDs for the UI.
        const finalPool = Array.from(uniqueCardsMap.values()).map((card, index) => ({ ...card, uid: `pool-${card.globalId}-${index}` }));
        setAvailableCards(finalPool);
    }, [legacyCards, isReEntry, pool]);

    const handleAddToDeck = (card: Card) => {
        if (currentDeck.length >= deckSize || currentCash < card.cost) return;
        setCurrentCash(prev => prev - card.cost);
        setCurrentDeck(prev => [...prev, { ...card, uid: `startdeck-${card.id}-${Date.now()}` }]);
        setAvailableCards(prev => prev.filter(c => c.uid !== card.uid));
    };

    const handleRemoveFromDeck = (card: Card) => {
        setCurrentCash(prev => prev + card.cost);
        setCurrentDeck(prev => prev.filter(c => c.uid !== card.uid));
        setAvailableCards(prev => [...prev, { ...card, uid: `pool-readd-${card.globalId}-${Date.now()}` }]);
    };

    const handleAutoFill = useCallback(() => {
        let cash = startingCash;
        const deck: Card[] = [];
        const uniqueCardsMap = new Map<string, Card>();
        
        pool.forEach(card => uniqueCardsMap.set(card.globalId, { ...card }));
        if (isReEntry) {
            legacyCards.forEach(card => uniqueCardsMap.set(card.globalId, { ...card }));
        }
        
        let currentPool = Array.from(uniqueCardsMap.values()).map((card, index) => ({ ...card, uid: `pool-autofill-${card.globalId}-${index}` }));
        currentPool.sort((a, b) => a.cost - b.cost);
        
        while (deck.length < deckSize && currentPool.length > 0) {
          const affordableCardIndex = currentPool.findIndex(card => cash >= card.cost);
          if (affordableCardIndex !== -1) {
            const cardToAdd = currentPool[affordableCardIndex];
            cash -= cardToAdd.cost;
            deck.push({ ...cardToAdd, uid: `startdeck-${cardToAdd.id}-${Date.now()}-${deck.length}` });
            currentPool.splice(affordableCardIndex, 1);
          } else { break; }
        }
        setCurrentDeck(deck);
        setCurrentCash(cash);
        setAvailableCards(currentPool);
    }, [startingCash, deckSize, pool, isReEntry, legacyCards]);

    const onConfirm = (selectedCards: Card[] = []) => {
      // For mobile, selectedCards contains the new cards. For desktop, it's empty.
      const finalDeck = [
        ...currentDeck,
        ...selectedCards.map(c => ({...c, uid: `startdeck-${c.id}-${Date.now()}-${Math.random()}`}))
      ];
      const newCardsCost = selectedCards.reduce((sum, card) => sum + card.cost, 0);
      const finalCash = currentCash - newCardsCost;
      
      props.onSetupComplete({ finalDeck, finalCash, selectedEntrepreneur, selectedAccountant });
    };

    const childProps = {
        ...props,
        availableCards,
        currentDeck,
        currentCash,
        selectedEntrepreneur,
        handleAddToDeck,
        handleRemoveFromDeck,
        handleAutoFill,
        onConfirm,
    };
    
    if (isMobile) {
        return <MobileStartingDeckSetup {...childProps} />;
    }

    return <DesktopStartingDeckSetup {...childProps} />;
};

export default StartingDeckSetup;
