
import type { GameState, GameAction, Card, PlayerState, MarketSlotConfig } from '../../types';
import { shuffle, drawCards, initialState } from '../state-utils';
import { getDefaultMarketSetup, createCardFilter } from '../market-config';

export const gameInitReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'START_GAME': {
            const { playerSetups, playerCount, cardData, seed, gameConfig, eventSequence, scenario, objective } = action.payload;
            
            const { standard, consultant, event: eventCards, accountant } = cardData;

            let marketConfig: MarketSlotConfig[];
            let piles: Card[][] = [];
            let currentSeed = seed;

            if (scenario?.predefinedMarket) {
                const allCardsMap = new Map<string, Card>();
                [...standard, ...consultant, ...eventCards, ...accountant].forEach(card => allCardsMap.set(card.globalId, card));

                piles = scenario.predefinedMarket.map((pileOfIds, pileIndex) => 
                    pileOfIds.map((globalId, cardIndex) => {
                        const cardDef = allCardsMap.get(globalId);
                        if (!cardDef) throw new Error(`Card with globalId "${globalId}" not found for scenario market.`);
                        return { ...cardDef, uid: `market-${globalId}-${pileIndex}-${cardIndex}`};
                    })
                );
                marketConfig = getDefaultMarketSetup(); // Not used for generation, but needed for state shape
            } else {
                
                const allStandardCardsForMarket = [...standard, ...consultant];
                const scaledMarketPool = allStandardCardsForMarket.flatMap(cardDef => Array(playerCount > 1 ? playerCount : 1).fill(cardDef));

                // Use the market config from the payload
                marketConfig = gameConfig.marketConfig;

                const marketFilters = marketConfig.map(createCardFilter);
                const { shuffledArray: allMarketCards, nextSeed: seed1 } = shuffle(scaledMarketPool.map((def, i) => ({ ...def, uid: `market-${def.globalId}-${i}` })), seed);
                currentSeed = seed1;
                
                const finalPiles: Card[][] = marketConfig.map(() => []);

                for (const card of allMarketCards) {
                    const potentialSlotIndices: number[] = [];
                    marketFilters.forEach((filter, index) => {
                        if (filter(card)) {
                            potentialSlotIndices.push(index);
                        }
                    });

                    if (potentialSlotIndices.length === 0) {
                        continue; 
                    }

                    if (potentialSlotIndices.length === 1) {
                        finalPiles[potentialSlotIndices[0]].push(card);
                    } else {
                        const bestSlotIndex = potentialSlotIndices.reduce((bestIndex, currentIndex) => {
                            const currentPileSize = finalPiles[currentIndex].length;
                            const bestPileSize = finalPiles[bestIndex].length;
                
                            if (currentPileSize < bestPileSize) {
                                return currentIndex;
                            }
                            if (currentPileSize === bestPileSize) {
                                return Math.max(bestIndex, currentIndex);
                            }
                            return bestIndex;
                        });
                
                        finalPiles[bestSlotIndex].push(card);
                    }
                }
                piles = finalPiles;
            }

            const newPlayers: PlayerState[] = [];
            for (let i = 0; i < playerCount; i++) {
                const setup = playerSetups[i];
                const { shuffledArray, nextSeed } = shuffle(setup.finalDeck as Card[], currentSeed);
                currentSeed = nextSeed;
                const { newHand, nextDeck, nextSeed: seedAfterDraw } = drawCards(shuffledArray, [], 5, currentSeed);
                currentSeed = seedAfterDraw;
                const initialChoices: Record<string, 'production' | 'sales'> = {};
                newHand.forEach(card => { if (card.calculationType === 'choice') initialChoices[card.uid] = 'production'; });
                
                newPlayers.push({
                    id: i, name: setup.name, type: setup.type, aiStrategy: setup.aiStrategy, aiSkillLevel: setup.aiSkillLevel,
                    deck: nextDeck, hand: newHand, discard: [], retiredCards: [],
                    entrepreneur: { ...setup.selectedEntrepreneur, uid: `ent-${i}` },
                    accountant: setup.selectedAccountant ? { ...setup.selectedAccountant, uid: `acc-${i}` } : null,
                    cash: setup.finalCash,
                    initialCapitalization: setup.finalDeck.reduce((s:number, c:Card) => s + c.cost, 0) + setup.finalCash,
                    actionsRemainingThisTurn: 1, lastAction: null, bonusBuy: null, retireFromHandBonus: null,
                    cardChoices: initialChoices, copyCardState: { isSelectingTarget: false, sourceCardUid: null },
                    copiedCards: {}, activeConsultants: [], effectChainDepth: 0, anafMistakeCount: 0,
                    history: { quarterly: [], annual: [] }, // Initialize history
                });
            }

            let finalEventDeck: Card[] = [];
            let seedForEvents = currentSeed;

            if (eventSequence && eventSequence.length > 0) {
                finalEventDeck = [...eventSequence].reverse();
            } else {
                const { shuffledArray, nextSeed } = shuffle((eventCards as any[]).map((def, i) => ({...def, uid: `event-${def.globalId}-${i}`})), currentSeed);
                finalEventDeck = shuffledArray as Card[];
                seedForEvents = nextSeed;
            }
            
            let initialActiveEvent: Card | null = null;
            if (gameConfig.eventsStartYear === 1 && finalEventDeck.length > 0) {
                initialActiveEvent = finalEventDeck.pop()!;
            }
            
            return {
                ...initialState, seed: seedForEvents, marketPiles: piles, marketSetup: marketConfig,
                eventDeck: finalEventDeck,
                activeEvent: initialActiveEvent,
                config: gameConfig,
                players: newPlayers,
                scenario: scenario || null,
                objective,
            };
        }

        case 'RESET_GAME': 
            return initialState;

        case 'RESTART_PLAYER': {
            const { playerIndex, setup } = action.payload;
            const { finalDeck, finalCash, selectedEntrepreneur } = setup;
            
            let currentSeed = state.seed;
            
            const { shuffledArray, nextSeed } = shuffle(finalDeck, currentSeed);
            currentSeed = nextSeed;
            const { newHand, nextDeck, nextSeed: seedAfterDraw } = drawCards(shuffledArray, [], 5, currentSeed);
            currentSeed = seedAfterDraw;
            
            const initialChoices: Record<string, 'production' | 'sales'> = {};
            newHand.forEach(card => { if (card.calculationType === 'choice') initialChoices[card.uid] = 'production'; });
            
            const newPlayers = state.players.map((player, index) => {
                if (index === playerIndex) {
                    return {
                        ...player,
                        deck: nextDeck,
                        hand: newHand,
                        discard: [],
                        retiredCards: [],
                        entrepreneur: { ...selectedEntrepreneur, uid: `ent-${index}` },
                        cash: finalCash,
                        initialCapitalization: finalDeck.reduce((s: number, c: Card) => s + c.cost, 0) + finalCash,
                        actionsRemainingThisTurn: 1,
                        lastAction: null,
                        bonusBuy: null,
                        retireFromHandBonus: null,
                        cardChoices: initialChoices,
                        copyCardState: { isSelectingTarget: false, sourceCardUid: null },
                        copiedCards: {},
                        activeConsultants: [],
                        effectChainDepth: 0,
                        history: { quarterly: [], annual: [] }, // Reset history on restart
                    };
                }
                return player;
            });

            return {
                ...state,
                seed: currentSeed,
                players: newPlayers,
                activePlayerIndex: playerIndex,
                isGameOver: false,
                gameOverReason: null,
            };
        }

        default:
            return state;
    }
};
