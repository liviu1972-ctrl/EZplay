
import type { GameState, Card, PlayerState, ProcessedCard, ModifyHandCardExpensePayload, PurchaseDiscountEffectPayload, RetireFromHandEffectPayload } from '../types';

// --- UTILITY FUNCTIONS (SELECTORS) ---

export const getRetireCostModifier = (state: GameState): RetireFromHandEffectPayload | null => {
    const eventEffect = state.activeEvent?.effect;
    if (eventEffect?.trigger === 'on_event_active' && eventEffect.id.startsWith('RETIRE_')) {
        return eventEffect.payload as RetireFromHandEffectPayload;
    }
    return null;
};

export const getPurchaseDiscount = (sharedState: GameState, playerState: PlayerState): number => {
    // Process hand to account for copied cards first
    const processedHand = playerState.hand.map(card => {
        const copyInfo = playerState.copiedCards[card.uid];
        if (copyInfo) {
            const targetCard = playerState.hand.find(c => c.uid === copyInfo.targetUid);
            if (targetCard) return targetCard;
        }
        return card;
    });

    const discountFromHand = processedHand.reduce((acc, card) => {
        if (card.effect?.trigger === 'on_play' && card.effect.id.startsWith('PURCHASE_DISCOUNT')) {
            return acc + (card.effect.payload as PurchaseDiscountEffectPayload).discount;
        }
        return acc;
    }, 0);

    let discountFromEvent = 0;
    const eventEffect = sharedState.activeEvent?.effect;
    if (eventEffect?.trigger === 'on_event_active' && eventEffect.id.startsWith('PURCHASE_DISCOUNT')) {
        discountFromEvent = (eventEffect.payload as PurchaseDiscountEffectPayload).discount;
    }
    return discountFromHand + discountFromEvent;
};

export const getEffectiveCost = (cardCost: number, sharedState: GameState, playerState: PlayerState): number => {
    if (cardCost <= 0) return 0;
    const discount = getPurchaseDiscount(sharedState, playerState);
    return Math.max(1, cardCost - discount);
};

export const getRetireCost = (card: Card, sharedState: GameState): number => {
    const modifier = getRetireCostModifier(sharedState);
    if (modifier && (modifier.assetType === card.assetType || modifier.assetType === 'any')) {
        return modifier.retireCost;
    }
    return 1;
};


export interface TurnTotals {
    production: number;
    marketing: number;
    expenses: number;
    income: number;
    profit: number;
    capitalization: number;
}

/**
 * Processes the player's hand by applying all active effects (copy, expense modification, sales doubling)
 * and then calculates the turn's total stats based on the processed hand and other game state elements.
 * This centralizes all stat calculation logic into one pure function for consistency and testability.
 * 
 * @param activePlayer - The current player's state object.
 * @param activeEvent - The currently active event card, if any.
 * @returns An object containing the `processedHand` and the final `turnTotals`.
 */
export const processHandAndCalculateTotals = (
    activePlayer: PlayerState, 
    activeEvent: Card | null
): { processedHand: ProcessedCard[], turnTotals: TurnTotals } => {
    if (!activePlayer) {
        return { 
            processedHand: [], 
            turnTotals: { production: 0, marketing: 0, expenses: 1, income: 0, profit: -1, capitalization: 0 } 
        };
    }

    // --- Step 0: Construct the hand for calculation ---
    // If the last action was a retirement, we include the retired card in calculations for production/sales/profit
    // to reflect the state of the hand *before* the final action was taken.
    const handForCalculation: Card[] = [...activePlayer.hand];
    const retiredCardFromLastAction = activePlayer.lastAction?.type === 'retire' ? activePlayer.lastAction.card : null;
    if (retiredCardFromLastAction) {
        handForCalculation.push(retiredCardFromLastAction);
    }

    // --- Step 1: Process Hand Effects using the calculation-hand ---

    // 1a: Apply copy effects first
    const handAfterCopy: ProcessedCard[] = handForCalculation.map(card => {
      const copyInfo = activePlayer.copiedCards[card.uid];
      if (copyInfo) {
        const targetCard = handForCalculation.find(c => c.uid === copyInfo.targetUid);
        if (targetCard) {
          return { 
            ...targetCard, 
            uid: card.uid, 
            name: `Copie: ${targetCard.name}`, 
            effect: targetCard.effect ? { ...targetCard.effect, description: `(COPIE) ${targetCard.effect.description}` } : undefined, 
            originalCard: card 
          };
        }
      }
      return card;
    });

    // 1b: Apply ALL permanent 'on_play' effects from accountant and active consultants
    let handAfterPermanentEffects: ProcessedCard[] = [...handAfterCopy];
    const permanentCards: Card[] = [activePlayer.accountant, ...activePlayer.activeConsultants].filter((c): c is Card => c !== null);

    // Apply expense reducers from permanent cards
    for (const pCard of permanentCards) {
        const effect = pCard.effect;
        if (effect?.trigger === 'on_play' && (effect.id === 'REDUCE_CORPORAL_EXPENSE_2_TO_1' || effect.id === 'REDUCE_UMAN_EXPENSE_2_TO_1')) {
            const assetTypeTarget = effect.id === 'REDUCE_CORPORAL_EXPENSE_2_TO_1' ? 'corporal' : 'uman';
            handAfterPermanentEffects = handAfterPermanentEffects.map(card => {
                if (card.assetType === assetTypeTarget && card.expenses === 2) {
                    return { ...card, expenses: 1, originalExpenses: card.originalExpenses ?? card.expenses };
                }
                return card;
            });
        }
    }

    // Apply marketing multipliers from permanent cards
    for (const pCard of permanentCards) {
         const effect = pCard.effect;
         if (effect?.trigger === 'on_play' && effect.id === 'DOUBLE_UMAN_SALES_IN_HAND') {
            handAfterPermanentEffects = handAfterPermanentEffects.map(card => {
                if (card.assetType === 'uman' && card.marketing > 0) {
                    return { ...card, marketing: card.marketing * 2, originalMarketing: card.originalMarketing ?? card.marketing };
                }
                return card;
            });
         }
    }
        
    // 1c: Apply expense modifications from hand cards
    let handAfterHandEffects: ProcessedCard[] = [...handAfterPermanentEffects];
    const handExpenseModifiers = handAfterHandEffects.filter(c => c.effect?.trigger === 'on_play' && c.effect.id === 'MODIFY_EXPENSE_2_TO_1');

    if (handExpenseModifiers.length > 0) {
        handAfterHandEffects = handAfterHandEffects.map(card => {
            // Don't apply the effect to the card that generates it
            if (handExpenseModifiers.some(mod => mod.uid === card.uid)) return card;
            
            const modifierPayload = handExpenseModifiers[0].effect!.payload as ModifyHandCardExpensePayload;
            if (card.expenses === modifierPayload.targetExpense) {
                return { ...card, expenses: modifierPayload.newExpense, originalExpenses: card.originalExpenses ?? card.expenses };
            }
            return card;
        });
    }
    
    const processedHandForCalculation = handAfterHandEffects;

    // --- Step 2: Calculate Turn Totals (Profit, etc.) using the processed calculation-hand ---

    const { entrepreneur, activeConsultants, cardChoices, deck, discard, cash, accountant } = activePlayer;
    const totals = { production: 0, marketing: 0 };
    let rawExpenses = 0;

    processedHandForCalculation.forEach(card => {
        rawExpenses += (card.expenses || 0);
        if (card.calculationType === 'choice') {
            const choice = cardChoices[card.uid] || 'production';
            if (choice === 'production') {
                totals.production += (card.production || 0);
            } else {
                totals.marketing += (card.marketing || 0);
            }
        } else {
            totals.production += (card.production || 0);
            totals.marketing += (card.marketing || 0);
        }
    });
      
    if (entrepreneur) { 
        totals.production += (entrepreneur.production || 0); 
        totals.marketing += (entrepreneur.marketing || 0); 
        rawExpenses += (entrepreneur.expenses || 0); 
    }
    if (accountant) {
        totals.production += (accountant.production || 0);
        totals.marketing += (accountant.marketing || 0);
        rawExpenses += (accountant.expenses || 0);
    }
    // Recalculate expenses from active consultants here, because their own stats might be modified by other effects.
    activeConsultants.forEach(c => { 
        totals.production += (c.production || 0); 
        totals.marketing += (c.marketing || 0); 
        rawExpenses += (c.expenses || 0); 
    });
    if (activeEvent) { 
        totals.production += (activeEvent.production || 0); 
        totals.marketing += (activeEvent.marketing || 0); 
        rawExpenses += (activeEvent.expenses || 0); 
    }

    const expenses = Math.max(1, rawExpenses);
    const income = Math.min(totals.production, totals.marketing);
    const profit = income - expenses;

    // --- Step 3: Prepare the final hand for display and calculate capitalization ---

    // The hand for display should NOT include the retired card.
    const processedHandForDisplay = retiredCardFromLastAction
        ? processedHandForCalculation.filter(c => c.uid !== retiredCardFromLastAction.uid)
        : processedHandForCalculation;

    // Capitalization should reflect the player's CURRENT assets (post-retirement).
    const allCardsForCapitalization = [...deck, ...processedHandForDisplay, ...discard, ...activeConsultants];
    if (entrepreneur) allCardsForCapitalization.push(entrepreneur);
    if (activePlayer.accountant) allCardsForCapitalization.push(activePlayer.accountant);
    
    const cardValue = allCardsForCapitalization.reduce((sum, card) => {
        const cost = (card as ProcessedCard).originalCard ? (card as ProcessedCard).originalCard!.cost : card.cost;
        return sum + cost;
    }, 0);
    const capitalization = cardValue + cash;

    const turnTotals: TurnTotals = { 
        production: totals.production, 
        marketing: totals.marketing, 
        expenses, 
        income, 
        profit, 
        capitalization 
    };
    
    return { processedHand: processedHandForDisplay, turnTotals };
};
