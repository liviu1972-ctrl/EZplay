import type { GameAction, GameState, Card, PlayerState, AiStrategy, AiSkillLevel } from '../types';
import { getEffectiveCost, getRetireCost, processHandAndCalculateTotals } from './selectors';
import { aiHints } from './ai-hints';

export type { AiStrategy } from '../types';

export interface AiSettings {
  strategy: AiStrategy;
  skillLevel: AiSkillLevel;
  speed: number;
  maxTurns: number;
}

export type AiDecision = GameAction | { type: 'END_TURN_SIGNAL' };

interface DeckAnalysis {
    totalProduction: number;
    totalSales: number;
    productionRatio: number;
    salesRatio: number;
}

// NEW: Enum for financial assessment
type FinancialStatus = 'Healthy' | 'Strained' | 'Critical';

/**
 * Assesses the player's financial situation based on cash reserves relative to expenses.
 * This helps the AI make smarter, more context-aware decisions.
 */
function assessFinancialStatus(player: PlayerState, currentTurnExpenses: number): FinancialStatus {
    const cashBuffer = player.cash - currentTurnExpenses;
    // A rough estimate of next turn's expenses. Assumes an average expense of 1 per card in hand + entrepreneur.
    const estimatedNextExpenses = 6; 
    
    if (cashBuffer < 0) return 'Critical'; // Already in debt if the turn ends now.
    if (cashBuffer < estimatedNextExpenses) return 'Strained'; // Can't safely afford next turn's likely expenses.
    return 'Healthy'; // Has enough cash for this turn and a buffer for the next.
}


function analyzeDeck(player: PlayerState): DeckAnalysis {
    const allCards = [...player.deck, ...player.hand, ...player.discard, ...player.activeConsultants];
    if (player.entrepreneur) allCards.push(player.entrepreneur);

    let totalProduction = 0;
    let totalSales = 0;

    for (const card of allCards) {
        if (card.calculationType === 'choice') {
            totalProduction += card.production / 2;
            totalSales += card.sales / 2;
        } else {
            totalProduction += card.production;
            totalSales += card.sales;
        }
    }
    
    const totalPower = totalProduction + totalSales;
    if (totalPower === 0) {
        return { totalProduction, totalSales, productionRatio: 0.5, salesRatio: 0.5 };
    }

    return {
        totalProduction,
        totalSales,
        productionRatio: totalProduction / totalPower,
        salesRatio: totalSales / totalPower,
    };
}

function getCardStrategicValue(
    card: Card, 
    strategy: AiStrategy, 
    player: PlayerState, 
    skillLevel: AiSkillLevel,
    financialStatus: FinancialStatus // NEW: Pass financial status
): number {
    // Level 1: Base Score (Novice)
    let baseScore = 0;
    switch (strategy) {
        case 'aggressive':
            baseScore = (card.cost * 2) + card.production + card.sales - (card.expenses * 1.5);
            break;
        case 'profit-focused':
            baseScore = (card.production + card.sales) - (card.expenses * 2) - (card.cost * 0.5);
            break;
        case 'early-rusher':
            baseScore = 5 - card.cost + card.production + card.sales - card.expenses;
            break;
        case 'deck-thinner':
            baseScore = card.production + card.sales - card.cost - card.expenses;
            if (card.effect?.id.includes('RETIRE_')) baseScore += 5;
            break;
        case 'balanced':
        default:
            // MODIFIED: Make the balanced strategy more wary of high costs and expenses to prevent early bankruptcy.
            baseScore = (card.production + card.sales) * 1.2 - (card.cost * 1.5) - card.expenses;
            break;
    }

    if (skillLevel === 'novice') {
        return baseScore;
    }

    // Level 2: Contextual Score (Competent)
    const deckAnalysis = analyzeDeck(player);
    let contextScore = 0;
    const imbalanceFactor = 2;
    if (deckAnalysis.productionRatio > 0.65) {
        contextScore += card.sales * imbalanceFactor;
        contextScore -= card.production * imbalanceFactor;
    } else if (deckAnalysis.salesRatio > 0.65) {
        contextScore += card.production * imbalanceFactor;
        contextScore -= card.sales * imbalanceFactor;
    }

    // NEW: Financial Modifier based on cash situation
    let financialModifier = 0;
    if (financialStatus === 'Strained') {
        // When cash is tight, heavily penalize expensive cards and ongoing expenses.
        financialModifier = -(card.cost * 1.5) - card.expenses;
    } else if (financialStatus === 'Critical') {
        // In critical situations, the AI becomes desperate for survival.
        // It heavily penalizes any cost/expense and seeks any form of income.
        financialModifier = -(card.cost * 3) - (card.expenses * 2) + (card.production + card.sales);
    }


    if (skillLevel === 'competent') {
        return baseScore + contextScore + financialModifier;
    }

    // Level 3 & 4: Strategic Hints (Expert & Master)
    const hint = aiHints[card.globalId];
    if (!hint) {
        return baseScore + contextScore + financialModifier;
    }

    let strategicScore = 0;
    const weights = {
        engine: skillLevel === 'master' ? 1.5 : 1.2,
        thinning: skillLevel === 'master' ? 2.0 : 1.5,
        synergy: skillLevel === 'master' ? 1.2 : 1.0,
    };

    strategicScore += hint.engineBuildingValue * weights.engine;
    strategicScore += hint.deckThinningValue * weights.thinning;

    // Calculate dynamic synergy
    let synergyBonus = 0;
    if (hint.synergyValue > 0) {
        const allPlayerCards = [...player.deck, ...player.hand, ...player.discard];
        switch(card.globalId) {
            case 'consultants:c001':
                const umanCardsCount = allPlayerCards.filter(c => c.assetType === 'uman').length;
                synergyBonus = (umanCardsCount / 2) * (hint.synergyValue / 10);
                break;
            case 'base-game:s158':
                 const bestCardValue = Math.max(0, ...allPlayerCards.map(c => c.production + c.sales));
                 synergyBonus = (bestCardValue / 3) * (hint.synergyValue / 10);
                 break;
            case 'base-game:s156':
            case 'base-game:s157':
                const expense2CardsCount = allPlayerCards.filter(c => c.expenses === 2).length;
                synergyBonus = (expense2CardsCount / 1.5) * (hint.synergyValue / 10);
                break;
            default:
                synergyBonus = hint.synergyValue / 4;
        }
    }
    strategicScore += synergyBonus * weights.synergy;

    return baseScore + contextScore + strategicScore + financialModifier;
}


export function makeAiMove(state: GameState, settings: { strategy: AiStrategy, skillLevel: AiSkillLevel }): AiDecision | null {
    const activePlayer = state.players[state.activePlayerIndex];
    if (!activePlayer) return null;

    const { cash, actionsRemainingThisTurn, hand, cardChoices, bonusBuy, retireFromHandBonus, copyCardState } = activePlayer;
    const { marketPiles } = state;
    const { strategy, skillLevel } = settings;
    
    // NEW: Assess financial status at the start of the decision process.
    const { turnTotals } = processHandAndCalculateTotals(activePlayer, state.activeEvent);
    const financialStatus = assessFinancialStatus(activePlayer, turnTotals.expenses);


    // Step 0: Handle multi-step actions (like selecting a copy target)
    if (copyCardState.isSelectingTarget && copyCardState.sourceCardUid) {
        const sourceCard = hand.find(c => c.uid === copyCardState.sourceCardUid);
        if (!sourceCard) {
            return { type: 'CANCEL_COPY' };
        }

        const potentialTargets = hand.filter(c => c.uid !== sourceCard.uid && c.type === 'standard' && c.effect?.id !== 'ACTIVATE_TO_COPY_CARD_FROM_HAND');
        if (potentialTargets.length === 0) {
            return { type: 'CANCEL_COPY' };
        }

        let bestTarget: Card | null = null;
        let maxGain = -Infinity;

        const { turnTotals: baseTotals } = processHandAndCalculateTotals(activePlayer, state.activeEvent);

        for (const target of potentialTargets) {
            const tempPlayerState: PlayerState = {
                ...activePlayer,
                copiedCards: { ...activePlayer.copiedCards, [sourceCard.uid]: { targetUid: target.uid } }
            };
            const { turnTotals: newTotals } = processHandAndCalculateTotals(tempPlayerState, state.activeEvent);
            const gain = newTotals.profit - baseTotals.profit;
            if (gain > maxGain) {
                maxGain = gain;
                bestTarget = target;
            }
        }

        if (bestTarget) {
            return { type: 'SELECT_COPY_TARGET', payload: { targetCard: bestTarget } };
        } else {
            return { type: 'CANCEL_COPY' };
        }
    }

    // Step 1: Handle mandatory card choices
    const choiceCardsInHand = hand.filter(c => c.calculationType === 'choice');
    if (choiceCardsInHand.length > 0) {
        for (const card of choiceCardsInHand) {
            if (!cardChoices[card.uid]) {
                 const deckAnalysis = analyzeDeck(activePlayer);
                 const desiredChoice = deckAnalysis.productionRatio > deckAnalysis.salesRatio ? 'sales' : 'production';
                 return { type: 'SET_CARD_CHOICE', payload: { cardUid: card.uid, choice: desiredChoice } };
            }
        }
    }

    // Step 2: Handle bonus actions first
    if (retireFromHandBonus) {
        const eligibleCards = hand.filter(c => (retireFromHandBonus.assetType === 'any' || c.assetType === retireFromHandBonus.assetType) && cash >= retireFromHandBonus.retireCost);
        if (eligibleCards.length > 0) {
            const cardToRetire = eligibleCards.sort((a, b) => getCardStrategicValue(a, strategy, activePlayer, skillLevel, financialStatus) - getCardStrategicValue(b, strategy, activePlayer, skillLevel, financialStatus))[0];
            return { type: 'RETIRE_CARD_BONUS', payload: { card: cardToRetire, costPaid: retireFromHandBonus.retireCost } };
        }
    }
    if (bonusBuy) {
        const possibleBonusBuys: { card: Card, pileIndex: number, score: number, cost: number }[] = [];
        marketPiles.forEach((pile, pileIndex) => {
            if (pile.length > 0) {
                const card = pile[0];
                const cost = getEffectiveCost(card.cost, state, activePlayer);
                if (cash >= cost && card.cost <= bonusBuy.maxCost && card.assetType === bonusBuy.assetType) {
                    possibleBonusBuys.push({ card, pileIndex, score: getCardStrategicValue(card, strategy, activePlayer, skillLevel, financialStatus), cost });
                }
            }
        });
        if (possibleBonusBuys.length > 0) {
            const bestBonusBuy = possibleBonusBuys.sort((a,b) => b.score - a.score)[0];
            return { type: 'BUY_CARD', payload: { card: bestBonusBuy.card, pileIndex: bestBonusBuy.pileIndex, costPaid: bestBonusBuy.cost, isBonus: true } };
        }
    }
    
    if (actionsRemainingThisTurn <= 0) return { type: 'END_TURN_SIGNAL' };
    
    // Step 3: Evaluate main action (Copy vs Buy vs Retire vs End Turn)
    
    // 3a: Evaluate potential special hand activations (like Copy)
    let bestCopyAction: { sourceCard: Card, targetCard: Card, gain: number } | null = null;
    const copyCardsInHand = hand.filter(card => card.effect?.id === 'ACTIVATE_TO_COPY_CARD_FROM_HAND');

    if (copyCardsInHand.length > 0) {
        const { turnTotals: baseTotals } = processHandAndCalculateTotals(activePlayer, state.activeEvent);
        
        for (const sourceCard of copyCardsInHand) {
            if (activePlayer.copiedCards[sourceCard.uid]) continue; // Already a copy
            const potentialTargets = hand.filter(c => c.uid !== sourceCard.uid && c.type === 'standard' && c.effect?.id !== 'ACTIVATE_TO_COPY_CARD_FROM_HAND');
            if (potentialTargets.length === 0) continue;

            for (const target of potentialTargets) {
                const tempPlayerState: PlayerState = {
                    ...activePlayer,
                    copiedCards: { ...activePlayer.copiedCards, [sourceCard.uid]: { targetUid: target.uid } }
                };
                const { turnTotals: newTotals } = processHandAndCalculateTotals(tempPlayerState, state.activeEvent);
                const gain = newTotals.profit - baseTotals.profit;

                if (bestCopyAction === null || gain > bestCopyAction.gain) {
                    bestCopyAction = { sourceCard, targetCard: target, gain };
                }
            }
        }
    }

    // 3b: Evaluate potential purchases
    let possibleBuys: { card: Card, pileIndex: number, score: number, cost: number }[] = [];
    marketPiles.forEach((pile, pileIndex) => {
        if (pile.length > 0) {
            const card = pile[0];
            const cost = getEffectiveCost(card.cost, state, activePlayer);
            if (cash >= cost) {
                const score = getCardStrategicValue(card, strategy, activePlayer, skillLevel, financialStatus);
                possibleBuys.push({ card, pileIndex, score, cost });
            }
        }
    });
    let bestBuy = possibleBuys.length > 0 ? possibleBuys.sort((a, b) => b.score - a.score)[0] : null;

    // 3c: Evaluate potential retirements
    let bestRetire: { card: Card, score: number, cost: number } | null = null;
    if (hand.length > 0) {
        const rankedHand = hand.map(card => {
            const valueScore = getCardStrategicValue(card, strategy, activePlayer, skillLevel, financialStatus);
            const removalGain = -valueScore + (aiHints[card.globalId]?.deckThinningValue || 0) * 2;
            return { card, score: removalGain };
        }).sort((a, b) => b.score - a.score);

        const cardToRetire = rankedHand[0];
        const retireCost = getRetireCost(cardToRetire.card, state);
        if (cash >= retireCost) {
            bestRetire = { card: cardToRetire.card, score: cardToRetire.score, cost: retireCost };
        }
    }
    
    // NEW: Don't spend money retiring cards if financial situation is bad.
    if (bestRetire && (financialStatus === 'Critical' || financialStatus === 'Strained') && bestRetire.cost > 0) {
        bestRetire = null;
    }


    // Step 4: Make the final decision based on skill level
    const isStartingCard = bestRetire ? (bestRetire.card.id.startsWith('s00') || bestRetire.card.cost === 0) : false;
    const COPY_PROFIT_THRESHOLD = 3;

    // New decision: Prioritize a high-gain copy action if it's better than buying
    if (bestCopyAction && bestCopyAction.gain > COPY_PROFIT_THRESHOLD) {
        if (!bestBuy || bestCopyAction.gain > bestBuy.score) {
            return { type: 'ACTIVATE_COPY', payload: { sourceCardUid: bestCopyAction.sourceCard.uid } };
        }
    }

    if (skillLevel === 'master') {
        if (bestRetire && isStartingCard && bestRetire.score > 8) {
             return { type: 'RETIRE_CARD', payload: { card: bestRetire.card, costPaid: bestRetire.cost } };
        }
        if (bestBuy && bestBuy.score > 3) {
            return { type: 'BUY_CARD', payload: { card: bestBuy.card, pileIndex: bestBuy.pileIndex, costPaid: bestBuy.cost, isBonus: false } };
        }
        if (bestRetire && bestRetire.score > 5) {
            return { type: 'RETIRE_CARD', payload: { card: bestRetire.card, costPaid: bestRetire.cost } };
        }
    } else if (skillLevel === 'expert') {
        if (bestBuy && bestBuy.score > 4) {
             return { type: 'BUY_CARD', payload: { card: bestBuy.card, pileIndex: bestBuy.pileIndex, costPaid: bestBuy.cost, isBonus: false } };
        }
        if (bestRetire && isStartingCard && bestRetire.score > 6) {
             return { type: 'RETIRE_CARD', payload: { card: bestRetire.card, costPaid: bestRetire.cost } };
        }
    } else { // Competent and Novice logic
        if (bestBuy && bestBuy.score > 2) {
            return { type: 'BUY_CARD', payload: { card: bestBuy.card, pileIndex: bestBuy.pileIndex, costPaid: bestBuy.cost, isBonus: false } };
        }
        if (bestRetire && bestRetire.score > 3) {
            return { type: 'RETIRE_CARD', payload: { card: bestRetire.card, costPaid: bestRetire.cost } };
        }
    }
    
    return { type: 'END_TURN_SIGNAL' };
}