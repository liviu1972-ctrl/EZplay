import React from 'react';
import type { Card } from '../types';
import { STANDARD_CARD_BACK_URL, STANDARD_CARD_FLIP_BACK_URL, EVENT_CARD_BACK_URL } from '../constants';

interface CardUIProps {
  card?: Card | (Card & { originalExpenses?: number; originalMarketing?: number });
  source?: 'market' | 'hand' | 'board' | string; // ADDED: Context for where the card is displayed
  isFaceUp?: boolean;
  choice?: 'production' | 'marketing';
  effectiveCost?: number;
  isBankrupt?: boolean;
  isFlipping?: boolean;
  size?: 'medium' | 'small' | 'hud';
  isCopyTarget?: boolean;
  isCopySource?: boolean;
  hasBonusHighlight?: boolean;
  isSelected?: boolean;
  expenseOverlayClass?: string;
}

const GeneratedCardFace: React.FC<{ card: Card | (Card & { originalExpenses?: number; originalMarketing?: number }); choice?: 'production' | 'marketing', effectiveCost?: number, isBankrupt?: boolean, hasDiscount: boolean }> = ({ card, choice, effectiveCost, isBankrupt, hasDiscount }) => {
    const cardStyles = card.assetType
      ? {
          corporal: 'border-teal-500 bg-teal-900/40',
          uman: 'border-orange-500 bg-orange-900/40',
          necorporal: 'border-green-500 bg-green-900/40',
        }[card.assetType]
      : 'border-purple-500 bg-purple-900/40'; // For events or others without assetType

    const isChoice = card.calculationType === 'choice';
    
    const showProduction = isChoice || card.production !== 0;
    const showMarketing = isChoice || card.marketing !== 0;

    const originalExpenses = ('originalExpenses' in card && card.originalExpenses !== undefined) ? card.originalExpenses : undefined;
    const isExpenseModified = originalExpenses !== undefined;
    const showExpenses = card.expenses !== 0 || isExpenseModified;
    
    const originalMarketing = ('originalMarketing' in card && card.originalMarketing !== undefined) ? card.originalMarketing : undefined;
    const isMarketingModified = originalMarketing !== undefined;

    const assetTypeLabel = card.assetType 
        ? {
            corporal: 'Active corporale (tangibile/materiale)',
            uman: 'Active umane (resurse umane)',
            necorporal: 'Active necorporale (intangibile)',
          }[card.assetType]
        : '';

    return (
        <div className={`w-full h-full bg-slate-800 rounded-lg p-2.5 flex flex-col text-white border-2 ${cardStyles} shadow-inner relative`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-1">
                <div className="flex-1 pr-2">
                    <h3 className="text-lg font-bold leading-tight">{card.name}</h3>
                    {assetTypeLabel && <p className="text-xs text-slate-400">{assetTypeLabel}</p>}
                </div>
                <div className="relative flex-shrink-0 flex items-center justify-center h-10 w-10">
                    <svg viewBox="0 0 100 100" className="absolute" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }}>
                        <circle cx="50" cy="50" r="48" fill={hasDiscount ? "#4ADE80" : "#FBBF24"} stroke={hasDiscount ? "#A7F3D0" : "#FDE68A"} strokeWidth="4" />
                    </svg>
                    <div className="relative text-black font-bold text-center leading-tight">
                        {hasDiscount ? (
                            <>
                                <span className="text-sm line-through opacity-70">{card.cost}</span>
                                <span className="block text-xl">{effectiveCost}</span>
                            </>
                        ) : (
                            <span className="text-xl">{card.cost}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats - flex-grow to push effect to bottom */}
            <div className="flex-grow flex items-center">
                <div className="w-full flex justify-between items-center px-1">
                    {/* Left Stats (Prod/Marketing) */}
                    <div className="flex items-center">
                         {showProduction && (
                            <div className={`relative z-0 flex items-center justify-center transition-opacity duration-300 ${isChoice && choice === 'marketing' ? 'opacity-40' : 'opacity-100'}`}>
                                <svg viewBox="0 0 54 51" className="w-12 h-12" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))' }}>
                                    <path d="M27 0L53.9526 19.5L43.6408 51.15H10.3592L0.047441 19.5L27 0Z" fill="#2563EB"/>
                                </svg>
                                <span className="absolute text-white font-bold text-xl" style={{ textShadow: '1px 1px 2px black' }}>{card.production}</span>
                            </div>
                        )}
                        
                        {isChoice && (
                            <div className="relative z-10 text-slate-200 font-semibold px-1 text-sm -mx-4">
                                SAU
                            </div>
                        )}

                        {showMarketing && (
                            <div className={`relative z-0 flex items-center justify-center transition-opacity duration-300 ${isChoice && choice === 'production' ? 'opacity-40' : 'opacity-100'}`}>
                                <svg viewBox="0 0 100 100" className="w-12 h-12" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))' }}>
                                    <circle cx="50" cy="50" r="48" fill={isMarketingModified ? "#4ADE80" : "#FACC15"} stroke={isMarketingModified ? "#A7F3D0" : "#FDE68A"} strokeWidth="4" />
                                </svg>
                                <div className="absolute text-black font-bold text-center leading-tight">
                                    {isMarketingModified ? (
                                        <>
                                            <span className="text-sm line-through opacity-70">{originalMarketing}</span>
                                            <span className="block text-xl">{card.marketing}</span>
                                        </>
                                    ) : (
                                        <span className="text-xl">{card.marketing}</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Right Stats (Expenses) */}
                    {showExpenses && (
                        <div className="relative flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-11 h-11" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))' }}>
                                <rect width="96" height="96" x="2" y="2" fill={isExpenseModified ? "#4ADE80" : "#FB923C"} rx="10" stroke={isExpenseModified ? "#A7F3D0" : "#FDBA74"} strokeWidth="4" />
                            </svg>
                            <div className="absolute text-white font-bold text-center leading-tight" style={{ textShadow: '1px 1px 2px black' }}>
                                {isExpenseModified ? (
                                    <>
                                        <span className="text-sm line-through opacity-70">{originalExpenses}</span>
                                        <span className="block text-xl">{card.expenses}</span>
                                    </>
                                ) : (
                                    <span className="text-xl">{card.expenses}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Effect Box */}
            <div className="h-24 min-h-[6rem] bg-white/95 rounded border-2 border-slate-400 p-2 text-black text-sm overflow-y-auto flex items-center justify-center text-center">
                {/* FIX: Render card.description as a fallback if effect.description is not available */}
                {card.effect?.description || card.description ? (
                    <p>{card.effect?.description || card.description}</p>
                ) : (
                    <p className="text-lg font-semibold">{card.name}</p>
                )}
            </div>
            
            {/* Bankruptcy Overlay */}
            {card.type === 'entrepreneur' && isBankrupt && (
                <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center z-10">
                    <span className="text-5xl font-black text-red-600 transform -rotate-12" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                        FALIMENT
                    </span>
                </div>
            )}
        </div>
    );
};


const CardUI: React.FC<CardUIProps> = ({ card, source = 'board', isFaceUp = false, choice, effectiveCost, isBankrupt, isFlipping = false, size = 'medium', isCopyTarget, isCopySource, hasBonusHighlight, isSelected, expenseOverlayClass }) => {
  const cardStyle = size === 'small' || size === 'hud' ? 'image' : (typeof window !== 'undefined' ? localStorage.getItem('cardStyle') || 'image' : 'image');

  const isLandscape = card?.type === 'entrepreneur' || card?.type === 'consultant' || card?.type === 'accountant';
  
  const sizeClasses =
    size === 'hud'
      ? (isLandscape ? 'w-32' : 'w-24')
      : size === 'small'
      ? (isLandscape ? 'w-36' : 'w-24')
      : (isLandscape ? 'w-64' : 'w-48'); // Default to 'medium'
    
  const hoverClasses = size === 'medium' ? (isLandscape ? 'hover:scale-[1.20]' : 'hover:scale-[1.15]') : '';

  const containerClasses = `
    ${isLandscape ? 'aspect-[3.5/2.5]' : 'aspect-[2.5/3.5]'} ${sizeClasses}
    rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 ${hoverClasses} hover:shadow-2xl bg-gray-700 relative
    ${isCopyTarget ? 'ring-4 ring-yellow-400 animate-pulse' : ''}
    ${isCopySource ? 'opacity-50' : ''}
    ${hasBonusHighlight ? 'ring-4 ring-green-500' : ''}
    ${isSelected ? 'ring-4 ring-blue-500' : ''}
  `;

  if (!isFaceUp) {
    const backUrl = card?.type === 'event' 
        ? EVENT_CARD_BACK_URL 
        : (isFlipping ? STANDARD_CARD_FLIP_BACK_URL : STANDARD_CARD_BACK_URL);
    return (
      <div className={containerClasses}>
        <img src={backUrl} alt="Card Back" className="w-full h-full object-cover rounded-lg" />
      </div>
    );
  }

  if (!card) {
    return (
      <div className={containerClasses}>
        <img src={STANDARD_CARD_BACK_URL} alt="Card Back" className="w-full h-full object-cover rounded-lg" />
      </div>
    );
  }
  
  // MODIFIED: Discount is only relevant in a 'market' context.
  const hasDiscount = source === 'market' && effectiveCost !== undefined && effectiveCost < card.cost;
  const hasModifiedExpense = 'originalExpenses' in card && card.originalExpenses !== undefined;

  if (cardStyle === 'generated') {
    return (
      <div className={`${containerClasses}`}>
        <GeneratedCardFace card={card} choice={choice} effectiveCost={effectiveCost} isBankrupt={isBankrupt} hasDiscount={hasDiscount} />
      </div>
    );
  }

  // Image-based rendering for face-up cards
  const costOverlaySize = size === 'small' || size === 'hud' ? 'h-7 w-7 top-0.5 left-0.5' : 'h-10 w-10 top-1.5 left-1.5';
  const costTextSize = size === 'small' || size === 'hud' ? 'text-sm' : 'text-xl';
  const costSubTextSize = size === 'small' || size === 'hud' ? 'text-[10px]' : 'text-sm';
  
  return (
    <div className={`${containerClasses} relative`}>
      <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover rounded-lg" />
      
      {/* Discount Overlay for Image Cards */}
      {hasDiscount && (
        <div className={`absolute flex-shrink-0 flex items-center justify-center z-10 ${costOverlaySize}`}>
            <svg viewBox="0 0 100 100" className="absolute" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }}>
                <circle cx="50" cy="50" r="48" fill="#FBBF24" stroke="#FDE68A" strokeWidth="4" />
            </svg>
            <div className="relative text-black font-bold text-center leading-tight">
                <span className={`${costSubTextSize} line-through opacity-70`}>{card.cost}</span>
                <span className={`block ${costTextSize}`}>{effectiveCost}</span>
            </div>
        </div>
      )}

      {/* Modified Expense Overlay for Image Cards */}
      {hasModifiedExpense && (
        <div className={`absolute ${expenseOverlayClass ?? 'bottom-20'} right-1.5 flex items-center justify-center z-10 ${size === 'small' || size === 'hud' ? 'w-7 h-7' : 'w-11 h-11'}`}>
            <svg viewBox="0 0 100 100" className="absolute w-full h-full" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
                <rect width="96" height="96" x="2" y="2" fill="#FB923C" rx="10" stroke="#FDBA74" strokeWidth="4" />
            </svg>
            <div className="relative text-white font-bold text-center leading-tight" style={{ textShadow: '1px 1px 2px black' }}>
                <span className={`${costSubTextSize} line-through opacity-70`}>{card.originalExpenses}</span>
                <span className={`block ${costTextSize}`}>{card.expenses}</span>
            </div>
        </div>
      )}

      {card.calculationType === 'choice' && choice && (
        <div className={`absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-white text-xs font-bold shadow-lg 
          ${choice === 'production' ? 'bg-blue-600' : 'bg-yellow-500'}
        `}>
          {choice === 'production' ? `P+${card.production}` : `V+${card.marketing}`}
        </div>
      )}
    </div>
  );
};

export default CardUI;