
import { useState, useEffect, useContext, useMemo } from 'react';
import { GameContext } from '../contexts/GameContext';
import { processHandAndCalculateTotals } from '../game-logic/selectors';
import type { GameViewChildProps } from '../components/views/game/types';
import type { Card } from '../types';

export type HudInputMethod = 'reel' | 'numpad';

export const useGameViewLogic = (props: GameViewChildProps, storageKeyPrefix: 'desktop' | 'mobile') => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGameViewLogic must be used within a GameContextProvider');
    const { gameState, dispatch } = context;

    const { 
        marketPiles, marketSetup, currentYear, currentQuarter, yearlyBuys, yearlyRetirements, 
        eventDeck, activeEvent, discardedEvents, isGameOver, gameOverReason, 
        config, players, activePlayerIndex, winnerPlayerIndex 
    } = gameState;

    const activePlayer = players[activePlayerIndex];
    const { processedHand, turnTotals } = useMemo(() => processHandAndCalculateTotals(activePlayer, activeEvent), [activePlayer, activeEvent]);

    // --- HUD Input State ---
    const [manualHudValues, setManualHudValues] = useState<Record<string, string>>({});
    const [endTurnError, setEndTurnError] = useState(false);
    const [numpadState, setNumpadState] = useState<{ isOpen: boolean; field: string | null; label: string }>({ isOpen: false, field: null, label: '' });
    const [inputMethod, setInputMethod] = useState<HudInputMethod>('reel'); // Default fallback

    // --- Animation State ---
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [isSweeping, setIsSweeping] = useState<boolean>(false);
    const [endTurnButtonDisabled, setEndTurnButtonDisabled] = useState(false);

    // --- Charts State ---
    const [activeChartKeys, setActiveChartKeys] = useState<string[]>([]);

    // --- Management Modal State ---
    const [isManagementModalOpen, setIsManagementModalOpen] = useState(false);

    const isManualMode = config.hudCalculationMode !== 'automatic';
    const storageKey = `${storageKeyPrefix}InputMethod`;

    // Initialize Input Method from LocalStorage
    useEffect(() => {
        const savedMethod = localStorage.getItem(storageKey) as HudInputMethod;
        if (savedMethod === 'reel' || savedMethod === 'numpad') {
            setInputMethod(savedMethod);
        } else {
            // Default based on device if not set
            setInputMethod(storageKeyPrefix === 'mobile' ? 'numpad' : 'reel');
        }

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === storageKey) {
                setInputMethod((e.newValue as HudInputMethod) || (storageKeyPrefix === 'mobile' ? 'numpad' : 'reel'));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [storageKey, storageKeyPrefix]);

    // Initialize Manual HUD Values (Logic for Accountant auto-fill)
    useEffect(() => {
        if (isManualMode) {
            if (activePlayer.accountant) {
                setManualHudValues({
                    production: String(turnTotals.production),
                    marketing: String(turnTotals.marketing),
                    income: String(turnTotals.income),
                    expenses: String(turnTotals.expenses),
                });
            } else {
                setManualHudValues({ production: '', marketing: '', income: '', expenses: '' });
            }
        }
        setEndTurnError(false);
    }, [isManualMode, activePlayer.id, activePlayer.accountant, currentYear, currentQuarter, turnTotals]);

    const handleManualValueChange = (field: string, value: string) => {
        setEndTurnError(false);
        setManualHudValues(prev => ({ ...prev, [field]: value }));
    };

    const manualTotals = useMemo(() => {
        if (!isManualMode) return turnTotals;
        const income = Number(manualHudValues.income) || 0;
        const expenses = Number(manualHudValues.expenses) || 0;
        const profit = income - expenses;
        
        const allCards = [
            ...activePlayer.deck, 
            ...activePlayer.hand, 
            ...activePlayer.discard, 
            ...activePlayer.activeConsultants, 
            activePlayer.entrepreneur,
            activePlayer.accountant
        ].filter(Boolean) as Card[];

        const cardValue = allCards.reduce((sum, card) => sum + card.cost, 0);
        const capitalization = cardValue + activePlayer.cash;
        
        return { ...turnTotals, income, expenses, profit, capitalization };
    }, [manualHudValues, turnTotals, isManualMode, activePlayer]);

    const quarterlyHistoryForChart = useMemo(() => {
        const currentTurnData = {
            year: gameState.currentYear,
            quarter: gameState.currentQuarter,
            ...turnTotals
        };
        return [...activePlayer.history.quarterly, currentTurnData];
    }, [activePlayer.history.quarterly, gameState.currentYear, gameState.currentQuarter, turnTotals]);

    const quarterlyChartConfig = {
        cash: { title: 'Cash ($)', color: '#facc15' },
        production: { title: 'Producție (unități)', color: '#3b82f6' },
        marketing: { title: 'Marketing (unități)', color: '#fde047' },
        income: { title: 'Venituri ($)', color: '#22c55e' },
        expenses: { title: 'Cheltuieli ($)', color: '#f97316' },
        capitalization: { title: 'Capitalizare ($)', color: '#38bdf8' },
        profit: { title: 'Profit Trimestrial ($)', color: '#a855f7' },
    };

    const handleEndTurn = () => {
        if (endTurnButtonDisabled || !activePlayer || props.isTurnTransitioning) return;

        // Validation for strict manual mode (if not ANAF mode which allows mistakes but penalizes)
        // However, the original code logic implies that if hudCalculationMode === 'manual', we BLOCK on error.
        // If it's 'anaf', the backend/hook logic usually handles the penalty modal, but here we validate basic equality for UI feedback.
        
        if (config.hudCalculationMode === 'manual') {
            const valuesMatch =
                Number(manualHudValues.production) === turnTotals.production &&
                Number(manualHudValues.marketing) === turnTotals.marketing &&
                Number(manualHudValues.income) === turnTotals.income &&
                Number(manualHudValues.expenses) === turnTotals.expenses;
            
            if (!valuesMatch) {
                setEndTurnError(true);
                setTimeout(() => setEndTurnError(false), 2000); 
                return;
            }
        }

        setEndTurnButtonDisabled(true);
        
        // Trigger flip animation
        activePlayer.hand.forEach((_, index) => setTimeout(() => setFlippedIndices(prev => [...prev, index]), index * 150));
        
        const totalStaggerTime = activePlayer.hand.length * 150;
        
        // Trigger sweep animation
        setTimeout(() => setIsSweeping(true), totalStaggerTime);
        
        // Finalize
        setTimeout(() => {
            const valuesToPass = isManualMode ? manualHudValues : undefined;
            props.onEndTurn(valuesToPass);
            
            // Reset local state for next turn
            setFlippedIndices([]);
            setIsSweeping(false);
            setEndTurnButtonDisabled(false);
        }, totalStaggerTime + 1000);
    };

    const isManualInputIncomplete = 
        isManualMode &&
        (!manualHudValues.production ||
        !manualHudValues.marketing ||
        !manualHudValues.income ||
        !manualHudValues.expenses);

    return {
        // Data
        gameState,
        dispatch,
        activePlayer,
        processedHand,
        turnTotals,
        manualTotals,
        manualHudValues,
        quarterlyHistoryForChart,
        quarterlyChartConfig,
        
        // State Flags
        isManualMode,
        isSweeping,
        flippedIndices,
        endTurnButtonDisabled,
        endTurnError,
        isManualInputIncomplete,
        inputMethod,
        numpadState,
        activeChartKeys,
        isManagementModalOpen,

        // Actions
        handleManualValueChange,
        handleEndTurn,
        setNumpadState,
        setActiveChartKeys,
        setIsManagementModalOpen,
        setInputMethod
    };
};
