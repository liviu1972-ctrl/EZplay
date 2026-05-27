
import type { GameState, Card, GameConfig, AiStrategy, AiSkillLevel, GameObjective, AnnualReportData } from '../types';
import { gameReducer, initialState } from './reducer';
import { makeAiMove } from './ai-player';
import { runEffects } from './effect-runner';
import { processHandAndCalculateTotals } from './selectors';
import { autoBuildDeck } from './deck-builder';
import { generateAnnualReport } from './financials';

export interface SimulationPlayerConfig {
    name: string;
    strategy: AiStrategy;
    aiSkillLevel: AiSkillLevel;
}

export interface SimulationResult {
    finalState: GameState;
    durationTurns: number;
}

const MAX_SIMULATION_TURNS = 200; // Safety break for a single game (50 years)

/**
 * Runs a complete single game simulation from start to finish without any UI.
 * @param playerConfigs The configurations for the AI players.
 * @param activeExpansionIds The active expansion packs.
 * @param gameConfig The core game rules.
 * @param objective The win condition for the game.
 * @param allAvailableEntrepreneurs The pool of entrepreneur cards to use.
 * @param allAvailableStandardCards The pool of standard cards to use.
 * @returns An object containing the final game state and the total number of turns played.
 */
export const runSingleSimulation = (
    playerConfigs: SimulationPlayerConfig[],
    activeExpansionIds: string[],
    gameConfig: GameConfig,
    objective: GameObjective,
    allAvailableEntrepreneurs: Card[],
    allAvailableStandardCards: Card[]
): SimulationResult => {
    // 1. Setup the initial state for the game, respecting game settings
    const startingCash = parseInt(localStorage.getItem('startingCash') || '10', 10);
    const deckSize = parseInt(localStorage.getItem('startingDeckSize') || '10', 10);
    const maxCardCost = parseInt(localStorage.getItem('startingDeckMaxCost') || '0', 10);

    const cardPool = allAvailableStandardCards.filter(card => card.cost <= maxCardCost);
    
    // Scale the pool for multiplayer simulations to ensure enough cards are available
    const scaledCardPool = cardPool.flatMap(cardDef => Array(playerConfigs.length).fill(cardDef));

    const playerSetups = playerConfigs.map((config, index) => {
        const entrepreneur = allAvailableEntrepreneurs[index % allAvailableEntrepreneurs.length]; 
        
        const { deck, remainingCash } = autoBuildDeck({
            pool: scaledCardPool, // Use the scaled pool
            budget: startingCash,
            deckSize: deckSize
        });

        return {
            name: config.name,
            type: 'ai' as const,
            aiStrategy: config.strategy,
            aiSkillLevel: config.aiSkillLevel,
            selectedEntrepreneur: entrepreneur,
            finalDeck: deck,
            finalCash: remainingCash,
        };
    });

    const startGameAction = {
        type: 'START_GAME' as const,
        payload: {
            playerSetups: playerSetups,
            playerCount: playerConfigs.length,
            cardData: {
                standard: allAvailableStandardCards,
                consultant: [], // Sims currently don't use these
                event: [],      // Sims currently don't use these
                accountant: [], // Sims currently don't use these
            },
            seed: Date.now() + Math.random(),
            gameConfig,
            objective,
        }
    };
    
    let currentState = gameReducer(initialState, startGameAction);
    let turnCounter = 0;

    // 2. Main Game Loop
    while (!currentState.isGameOver && turnCounter < MAX_SIMULATION_TURNS) {
        turnCounter++;
        const activePlayer = currentState.players[currentState.activePlayerIndex];
        
        let playerTurnOver = false;
        while(!playerTurnOver && !currentState.isGameOver) {
            const decision = makeAiMove(currentState, { strategy: activePlayer.aiStrategy!, skillLevel: activePlayer.aiSkillLevel! });

            if (decision === null) {
                playerTurnOver = true;
                continue;
            }

            if (decision.type === 'END_TURN_SIGNAL') {
                playerTurnOver = true;
                
                const turnData = processHandAndCalculateTotals(activePlayer, currentState.activeEvent);
                const endOfTurnCash = activePlayer.cash + turnData.turnTotals.profit;
                
                if (endOfTurnCash < 0) {
                    currentState = gameReducer(currentState, { type: 'TRIGGER_BANKRUPTCY' });
                    continue; 
                }

                const endTurnAction = { type: 'END_TURN' as const, payload: { turnProfit: turnData.turnTotals.profit, turnTotals: turnData.turnTotals } };
                
                // We need to get the state *after* the turn ends to check for game over conditions
                let stateAfterEndTurn = gameReducer(currentState, endTurnAction);
                if (stateAfterEndTurn.isGameOver) {
                    currentState = stateAfterEndTurn;
                    continue;
                }

                const isLastPlayer = stateAfterEndTurn.activePlayerIndex === stateAfterEndTurn.players.length - 1;
                if (isLastPlayer) {
                    const isEndOfYear = stateAfterEndTurn.currentQuarter === 4;
                    if (isEndOfYear) {
                        // Generate reports for all players manually for the sim
                        const reports: Record<number, AnnualReportData> = {};
                        stateAfterEndTurn.players.forEach((p, idx) => {
                            if (idx === stateAfterEndTurn.activePlayerIndex) {
                                reports[idx] = generateAnnualReport(stateAfterEndTurn.currentYear, stateAfterEndTurn.currentQuarter, p.history, turnData.turnTotals, p, stateAfterEndTurn.activeEvent);
                            } else {
                                const lastQ = p.history.quarterly[p.history.quarterly.length - 1];
                                const historyWithoutLast = { ...p.history, quarterly: p.history.quarterly.slice(0, -1) };
                                reports[idx] = generateAnnualReport(stateAfterEndTurn.currentYear, stateAfterEndTurn.currentQuarter, historyWithoutLast, lastQ, p, stateAfterEndTurn.activeEvent);
                            }
                        });
                        
                         currentState = gameReducer(stateAfterEndTurn, { type: 'START_NEXT_YEAR', payload: { reports } });
                    } else {
                         currentState = gameReducer(stateAfterEndTurn, { type: 'START_NEXT_QUARTER' });
                    }
                } else {
                    currentState = gameReducer(stateAfterEndTurn, { type: 'ADVANCE_TO_NEXT_PLAYER' });
                }
                
            } else {
                let actionQueue = [decision];
                while(actionQueue.length > 0) {
                    const currentAction = actionQueue.shift()!;
                    const previousState = currentState;
                    currentState = gameReducer(previousState, currentAction);
                    const derivedActions = runEffects(previousState, currentState);
                    actionQueue.push(...derivedActions);
                }
            }
        }
    }
    
    if (turnCounter >= MAX_SIMULATION_TURNS && !currentState.isGameOver) {
        currentState = { ...currentState, isGameOver: true, gameOverReason: 'SIMULATION_TIMEOUT', winnerPlayerIndex: -1 };
    }

    return {
        finalState: currentState,
        durationTurns: turnCounter,
    };
};
