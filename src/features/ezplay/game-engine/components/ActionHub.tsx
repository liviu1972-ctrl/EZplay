import React, { useState } from 'react';
import type { Card, GameState } from '../types';
import { getEffectiveCost, getRetireCost } from '../game-logic/selectors';
import CardUI from './CardUI';

interface ActionHubProps {
  selection: { card: Card; source: 'market' | 'hand'; pileIndex?: number };
  gameState: GameState;
  onConfirmBuy: () => void;
  onConfirmRetire: () => void;
  onConfirmRetireBonus: () => void;
  onCancel: () => void;
  onCardChoice: (cardUid: string, choice: 'production' | 'marketing') => void;
  onActivateCopy: (sourceCardUid: string) => void;
}

const ActionHub: React.FC<ActionHubProps> = ({
  selection,
  gameState,
  onConfirmBuy,
  onConfirmRetire,
  onConfirmRetireBonus,
  onCancel,
  onCardChoice,
  onActivateCopy,
}) => {
  const { card, source } = selection;
  const activePlayer = gameState.players[gameState.activePlayerIndex];
  
  const [animationState, setAnimationState] = useState<'idle' | 'buying' | 'retiring_bonus' | 'retiring_normal'>('idle');

  if (!activePlayer) return null;

  const { cash, actionsRemainingThisTurn, bonusBuy, retireFromHandBonus, cardChoices } = activePlayer;
  
  const effectiveCost = source === 'market' ? getEffectiveCost(card.cost, gameState, activePlayer) : 0;
  const retireCost = source === 'hand' ? getRetireCost(card, gameState) : 1;

  const isChoiceCard = card.calculationType === 'choice';
  const isCopyCard = card.effect?.id === 'ACTIVATE_TO_COPY_CARD_FROM_HAND';
  
  const currentChoice = isChoiceCard ? (cardChoices[card.uid] || 'production') : undefined;

  const canBuyWithBonus = source === 'market' && bonusBuy !== null && cash >= effectiveCost && card.cost <= bonusBuy.maxCost && card.assetType === bonusBuy.assetType;
  const canBuyNormally = source === 'market' && actionsRemainingThisTurn > 0 && cash >= effectiveCost && !canBuyWithBonus;
  
  const canRetire = source === 'hand' && actionsRemainingThisTurn > 0 && cash >= retireCost;
  const canBonusRetire = source === 'hand' && retireFromHandBonus && cash >= retireFromHandBonus.retireCost && (retireFromHandBonus.assetType === 'any' || card.assetType === retireFromHandBonus.assetType);
  
  const isAnimating = animationState !== 'idle';

  const handleAnimateAndBuy = () => setAnimationState('buying');
  const handleAnimateAndRetireBonus = () => setAnimationState('retiring_bonus');
  const handleAnimateAndRetireNormal = () => setAnimationState('retiring_normal');
  
  const handleAnimationEnd = () => {
    if (animationState === 'buying') {
      onConfirmBuy();
    } else if (animationState === 'retiring_bonus') {
      onConfirmRetireBonus();
    } else if (animationState === 'retiring_normal') {
      onConfirmRetire();
    }
  };
  
  const animationClassName = 
    animationState === 'buying' ? 'animate-fly-from-hub' :
    (animationState === 'retiring_bonus' || animationState === 'retiring_normal') ? 'animate-fly-to-trash' : '';


  return (
    <div className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center p-4 animate-fade-in" onClick={onCancel}>
      <div className="flex flex-row items-center space-x-6" onClick={e => e.stopPropagation()}>
        {/* Buttons on the left */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 w-64 flex flex-col items-center space-y-3">
            {/* Contextual Actions */}
            {source === 'market' && (canBuyNormally || canBuyWithBonus) && (
                <button 
                    onClick={handleAnimateAndBuy}
                    disabled={isAnimating}
                    className={`w-full py-3 text-white font-bold rounded shadow-lg text-lg transition-colors disabled:opacity-50 ${canBuyWithBonus ? 'bg-green-600 hover:bg-green-700 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {canBuyWithBonus ? `Cumpără BONUS (${effectiveCost}$)` : `Cumpără (${effectiveCost}$)`}
                </button>
            )}

            {canBonusRetire && (
                 <button onClick={handleAnimateAndRetireBonus} disabled={isAnimating} className="w-full py-3 bg-red-600 text-white font-bold rounded shadow-lg text-lg hover:bg-red-700 animate-pulse disabled:opacity-50">
                    Retrage BONUS (${retireFromHandBonus?.retireCost})
                </button>
            )}

            {source === 'hand' && canRetire && (
                 <button onClick={handleAnimateAndRetireNormal} disabled={isAnimating} className="w-full py-3 bg-amber-600 text-white font-bold rounded shadow-lg text-lg hover:bg-amber-700 disabled:opacity-50">
                    Retrage (${retireCost})
                </button>
            )}

            {isChoiceCard && source === 'hand' && (
                <div className="w-full flex justify-center bg-slate-700 p-1 rounded-full shadow-lg">
                    <button onClick={() => onCardChoice(card.uid, 'production')} disabled={isAnimating} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors w-1/2 disabled:opacity-50 ${currentChoice === 'production' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-600'}`}>
                        Prod: {card.production}
                    </button>
                    <button onClick={() => onCardChoice(card.uid, 'marketing')} disabled={isAnimating} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors w-1/2 disabled:opacity-50 ${currentChoice === 'marketing' ? 'bg-yellow-500 text-black shadow-md' : 'text-slate-300 hover:bg-slate-600'}`}>
                        Mkt: {card.marketing}
                    </button>
                </div>
            )}

            {isCopyCard && source === 'hand' && (
                <button onClick={() => onActivateCopy(card.uid)} disabled={isAnimating} className="w-full py-3 bg-teal-600 text-white font-bold rounded shadow-lg text-lg hover:bg-teal-700 disabled:opacity-50">
                    Activează Copierea
                </button>
            )}

            <button onClick={onCancel} disabled={isAnimating} className="w-full py-2 bg-slate-600 text-white font-semibold rounded text-base hover:bg-slate-500 disabled:opacity-50">
                Anulează
            </button>
        </div>
        
        {/* Card on the right */}
        <div className="scale-125">
            <div
                onAnimationEnd={handleAnimationEnd}
                className={animationClassName}
            >
              <CardUI 
                card={card} 
                isFaceUp={true} 
                size="medium" 
                effectiveCost={effectiveCost} 
                choice={currentChoice}
                source={source}
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ActionHub;