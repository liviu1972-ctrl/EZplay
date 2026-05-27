
import type { GameState, GameAction, PlayerState, Card, AnnualReportData } from '../../types';
import { updateActivePlayer, drawCards, shuffle } from '../state-utils';
import { nextRandom } from '../prng';

const checkObjectiveCompletion = (state: GameState): GameState => {
    if (!state.objective || state.objective.type === 'infinite' || state.isGameOver) {
        return state;
    }

    const { objective, players, currentYear } = state;

    switch (objective.type) {
        case 'timeLimit': {
            const isLastPlayer = state.activePlayerIndex === players.length - 1;
            const isLastQuarter = state.currentQuarter === 4;
            if (currentYear >= objective.value && isLastPlayer && isLastQuarter) {
                const capitalizations = players.map(p => {
                    const allCards = [...p.deck, ...p.hand, ...p.discard, ...p.activeConsultants, p.entrepreneur].filter(Boolean) as Card[];
                    const cardValue = allCards.reduce((sum, card) => sum + card.cost, 0);
                    return cardValue + p.cash;
                });
                const maxCapitalization = Math.max(...capitalizations);
                const winnerPlayerIndex = capitalizations.indexOf(maxCapitalization);
                
                return { 
                    ...state, 
                    isGameOver: true, 
                    gameOverReason: `LIMITĂ DE TIMP: Jocul s-a încheiat după ${objective.value} ani.`,
                    winnerPlayerIndex,
                };
            }
            break;
        }
        case 'cashGoal': {
            const winner = players.find(p => p.cash >= objective.value);
            if (winner) {
                return {
                    ...state,
                    isGameOver: true,
                    gameOverReason: `OBIECTIV ÎNDEPLINIT: ${winner.name} a atins ${objective.value}$ cash.`,
                    winnerPlayerIndex: winner.id,
                };
            }
            break;
        }
        case 'capitalizationGoal': {
            for (const player of players) {
                 const allCards = [...player.deck, ...player.hand, ...player.discard, ...player.activeConsultants, player.entrepreneur].filter(Boolean) as Card[];
                 const cardValue = allCards.reduce((sum, card) => sum + card.cost, 0);
                 const capitalization = cardValue + player.cash;

                 if (capitalization >= objective.value) {
                     return {
                        ...state,
                        isGameOver: true,
                        gameOverReason: `OBIECTIV ÎNDEPLINIT: ${player.name} a atins o capitalizare de ${objective.value}$.`,
                        winnerPlayerIndex: player.id,
                    };
                 }
            }
            break;
        }
    }

    return state;
};

export const turnReducer = (state: GameState, action: GameAction): GameState => {
    let nextState: GameState = state;

    switch (action.type) {
        case 'END_TURN': {
            const { turnProfit, turnTotals } = action.payload;
            const activePlayer = state.players[state.activePlayerIndex];
            
            // Save to PLAYER history
            const newHistory = [...activePlayer.history.quarterly, { year: state.currentYear, quarter: state.currentQuarter, ...turnTotals }];
            
            let stateAfterUpdate = updateActivePlayer(state, player => {
                const newCash = player.cash + turnProfit;
                const updatedConsultants = player.activeConsultants.map(c => ({ ...c, turnsLeft: c.turnsLeft - 1 }));
                const expiredConsultants = updatedConsultants.filter(c => c.turnsLeft <= 0);
                
                return {
                    ...player,
                    cash: newCash,
                    discard: [...player.discard, ...player.hand, ...expiredConsultants],
                    hand: [],
                    activeConsultants: updatedConsultants.filter(c => c.turnsLeft > 0),
                    bonusBuy: null, retireFromHandBonus: null, cardChoices: {},
                    copiedCards: {}, copyCardState: { isSelectingTarget: false, sourceCardUid: null },
                    lastAction: null, actionsRemainingThisTurn: 1,
                    history: { ...player.history, quarterly: newHistory } // Update player history
                };
            });
            
            // --- MARKET SHUFFLE/ROTATION LOGIC ---
            let currentSeed = stateAfterUpdate.seed;
            let marketPilesToUpdate = [...stateAfterUpdate.marketPiles];
    
            if (stateAfterUpdate.config.shuffleMarketOnTurnEnd) {
                const eligiblePilesIndices = marketPilesToUpdate
                    .map((pile, index) => pile.length > 1 ? index : -1)
                    .filter(index => index !== -1);
                
                if (eligiblePilesIndices.length > 0) {
                    const { value: randomIndexValue, nextSeed: seed1 } = nextRandom(currentSeed);
                    currentSeed = seed1;
                    const pileToRotateIndex = eligiblePilesIndices[Math.floor(randomIndexValue * eligiblePilesIndices.length)];
                    
                    const pileToRotate = [...marketPilesToUpdate[pileToRotateIndex]]; // Create a mutable copy
                    const topCard = pileToRotate.shift(); // Remove the top card
                    if (topCard) {
                        pileToRotate.push(topCard); // Add it to the bottom
                    }
    
                    marketPilesToUpdate[pileToRotateIndex] = pileToRotate;
                    
                    stateAfterUpdate = {
                        ...stateAfterUpdate,
                        marketPiles: marketPilesToUpdate,
                        seed: currentSeed
                    };
                }
            }
            // --- END MARKET LOGIC ---
    
            nextState = checkObjectiveCompletion(stateAfterUpdate);
            return nextState;
        }

        case 'TRIGGER_BANKRUPTCY': {
            return { ...state, isGameOver: true, gameOverReason: `BANKRUPTCY_PLAYER_${state.activePlayerIndex + 1}` };
        }

        case 'ADVANCE_TO_NEXT_PLAYER': {
            let currentSeed = state.seed;
            const nextPlayerIndex = (state.activePlayerIndex + 1) % state.players.length;
            
            const newPlayers = state.players.map((p, index) => {
                if (index === nextPlayerIndex) {
                    const discardWithOldHand = [...p.discard, ...p.hand];
                    const { newHand, nextDeck, nextDiscard, nextSeed: newPlayerSeed } = drawCards(p.deck, discardWithOldHand, 5, currentSeed);
                    currentSeed = newPlayerSeed;
                    
                    if (newHand.length === 0) {
                        nextState = { ...state, isGameOver: true, gameOverReason: 'NORMAL' };
                        return p;
                    }
                    const initialChoices: Record<string, 'production' | 'marketing'> = {};
                    newHand.forEach(card => { if (card.calculationType === 'choice') initialChoices[card.uid] = 'production'; });
                    return { ...p, hand: newHand, deck: nextDeck, discard: nextDiscard, cardChoices: initialChoices, effectChainDepth: 0 };
                }
                return p;
            });
    
            if (nextState && nextState.isGameOver) {
                return nextState;
            }
    
            return { ...state, seed: currentSeed, activePlayerIndex: nextPlayerIndex, players: newPlayers };
        }

        case 'START_NEXT_QUARTER': {
            let currentSeed = state.seed;
            const nextPlayerIndex = (state.activePlayerIndex + 1) % state.players.length;
    
            const newPlayers = state.players.map((p, index) => {
                if (index === nextPlayerIndex) {
                    const discardWithOldHand = [...p.discard, ...p.hand];
                    const { newHand, nextDeck, nextDiscard, nextSeed: newPlayerSeed } = drawCards(p.deck, discardWithOldHand, 5, currentSeed);
                    currentSeed = newPlayerSeed;
    
                    if (newHand.length === 0) {
                        nextState = { ...state, isGameOver: true, gameOverReason: 'NORMAL' };
                        return p;
                    }
                    const initialChoices: Record<string, 'production' | 'marketing'> = {};
                    newHand.forEach(card => { if (card.calculationType === 'choice') initialChoices[card.uid] = 'production'; });
                    return { ...p, hand: newHand, deck: nextDeck, discard: nextDiscard, cardChoices: initialChoices, effectChainDepth: 0 };
                }
                return p;
            });
    
            if (nextState && nextState.isGameOver) {
                return nextState;
            }
    
            return { ...state, seed: currentSeed, currentQuarter: state.currentQuarter + 1, activePlayerIndex: nextPlayerIndex, players: newPlayers };
        }

        case 'START_NEXT_YEAR': {
            const { reports } = action.payload;
            let currentSeed = state.seed;
            const nextYear = state.currentYear + 1;
            
            let newActiveEvent: Card | null = null;
            let nextEventDeck = [...state.eventDeck];
            let nextDiscardedEvents = [...state.discardedEvents];
            if (state.activeEvent) nextDiscardedEvents.push(state.activeEvent);
            
            const areEventsInGame = state.eventDeck.length > 0 || state.discardedEvents.length > 0 || state.activeEvent !== null;
    
            if (areEventsInGame && nextYear >= state.config.eventsStartYear) {
                if (nextEventDeck.length === 0 && nextDiscardedEvents.length > 0) {
                    const { shuffledArray, nextSeed } = shuffle(nextDiscardedEvents, currentSeed);
                    currentSeed = nextSeed; nextEventDeck = shuffledArray; nextDiscardedEvents = [];
                }
                if (nextEventDeck.length > 0) newActiveEvent = nextEventDeck.pop()!;
            }
    
            const nextPlayerIndex = (state.activePlayerIndex + 1) % state.players.length;
            
            const newPlayers = state.players.map((p, index) => {
                // Update history for ALL players
                const report = reports[index];
                const updatedHistory = report ? { ...p.history, annual: [...p.history.annual, report] } : p.history;

                if (index === nextPlayerIndex) {
                    const discardWithOldHand = [...p.discard, ...p.hand];
                    const { newHand, nextDeck, nextDiscard, nextSeed: newPlayerSeed } = drawCards(p.deck, discardWithOldHand, 5, currentSeed);
                    currentSeed = newPlayerSeed;
    
                    if (newHand.length === 0) {
                        nextState = { ...state, isGameOver: true, gameOverReason: 'NORMAL' };
                        return { ...p, history: updatedHistory };
                    }
                    const initialChoices: Record<string, 'production' | 'marketing'> = {};
                    newHand.forEach(card => { if (card.calculationType === 'choice') initialChoices[card.uid] = 'production'; });
                    return { ...p, hand: newHand, deck: nextDeck, discard: nextDiscard, cardChoices: initialChoices, effectChainDepth: 0, history: updatedHistory };
                }
                return { ...p, history: updatedHistory };
            });
            
            if (nextState && nextState.isGameOver) {
                return nextState;
            }
    
            return {
                ...state, seed: currentSeed,
                currentYear: nextYear, currentQuarter: 1, yearlyBuys: 0, yearlyRetirements: 0,
                activeEvent: newActiveEvent, eventDeck: nextEventDeck, discardedEvents: nextDiscardedEvents,
                activePlayerIndex: nextPlayerIndex, players: newPlayers,
            };
        }

        default:
            return state;
    }
};
