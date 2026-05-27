
import React, { useState, useContext, useMemo, useEffect } from 'react';
import type { Card } from '../../../../types';
import { createBuyCardAction, createRetireCardAction, createRetireCardBonusAction } from '../../../../game-logic/actions';
import { getEffectiveCost, getRetireCost } from '../../../../game-logic/selectors';
import CardUI from '../../../CardUI';
import AnnualReport from '../../../AnnualReport';
import ActionHub from '../../../ActionHub';
import ActionLog from '../../../ActionLog';
import HistoryChart from '../../../HistoryChart';
import NumpadInput from '../../../NumpadInput';
import NumberReelInput from '../../../NumberReelInput';
import Numpad from '../../../Numpad';
import { STANDARD_CARD_BACK_URL, EVENT_CARD_BACK_URL, STAT_ICONS } from '../../../../constants';
import { EnterFullscreenIcon, ExitFullscreenIcon } from '../../../Icons';
import type { GameViewChildProps } from '../types';
import { useGameViewLogic } from '../../../../hooks/useGameViewLogic';

const OrientationOverlay = () => (
    <div className="orientation-overlay fixed inset-0 bg-slate-900/95 z-[9999] flex-col items-center justify-center text-white text-center p-4">
        <div className="relative mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-yellow-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.12-5.12M20 20v-5h-5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 15a9 9 0 01-14.12 5.12" />
            </svg>
        </div>
        <h2 className="text-3xl font-bold">Te rugăm rotește dispozitivul</h2>
        <p className="text-slate-400 mt-2 max-w-sm">Acest joc este optimizat pentru modul landscape (orizontal).</p>

        <div className="mt-10 border-t border-slate-700 w-full max-w-sm pt-6 flex flex-col items-center">
            <p className="text-slate-300">Pentru o imersiune totală, apasă butonul de Full Screen:</p>
            <div className="mt-4 p-3 bg-slate-700/50 rounded-md inline-flex items-center space-x-2 border border-slate-600">
                <EnterFullscreenIcon />
            </div>
        </div>
    </div>
);

const MobileStatDisplay: React.FC<{ label: string; value: number; imageUrl: string; textColor: string; onClick?: () => void; }> = ({ label, value, imageUrl, textColor, onClick }) => (
    <button 
        className="flex flex-col items-center space-y-0.5 w-14 disabled:opacity-70"
        onClick={onClick}
        disabled={!onClick}
        aria-label={`Vezi graficul pentru ${label}`}
    >
        <span className="text-xs text-slate-400 uppercase font-semibold h-4">{label}</span>
        <div className="w-12 h-12 rounded-md flex items-center justify-center bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${imageUrl})` }}>
            <span className={`font-bold text-xl ${textColor}`} style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{value}</span>
        </div>
    </button>
);

const MobileGameViewExtended: React.FC<GameViewChildProps> = (props) => {
  const { 
      gameState, dispatch, activePlayer, processedHand, turnTotals, manualTotals, manualHudValues,
      quarterlyHistoryForChart, quarterlyChartConfig,
      isManualMode, isSweeping, flippedIndices, endTurnButtonDisabled, endTurnError, isManualInputIncomplete,
      inputMethod, numpadState, activeChartKeys, isManagementModalOpen,
      handleManualValueChange, handleEndTurn, setNumpadState, setActiveChartKeys, setIsManagementModalOpen, setInputMethod
  } = useGameViewLogic(props, 'mobile');

  const { isViewingAnnualReport, latestAnnualReports, isTurnTransitioning, onStartNextYear, onViewCompanyHistory, onReEnterGame, onAdvanceToNextPlayer, userProfile } = props;
  const { marketPiles, activeEvent, yearlyBuys, yearlyRetirements, isGameOver, gameOverReason, players, activePlayerIndex, config } = gameState;

  // Local state specific to mobile interaction/layout
  const [selection, setSelection] = useState<{ card: Card; source: 'market' | 'hand'; pileIndex?: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  React.useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (!activePlayer) return null;

  const { cash, actionsRemainingThisTurn, deck, discard, entrepreneur, bonusBuy, retireFromHandBonus, copyCardState, cardChoices } = activePlayer;
  const isActionLogVisible = localStorage.getItem('showActionLog') === 'true';
  const isInteractionDisabled = isTurnTransitioning || activePlayer.type === 'ai';

  const handleBuyCard = (card: Card, pileIndex: number) => {
      const action = createBuyCardAction(gameState, activePlayer, card, pileIndex);
      if (action) dispatch(action);
  };

  const handleRetireCard = (card: Card) => {
      const action = createRetireCardAction(gameState, activePlayer, card);
      if (action) dispatch(action);
  };

  const handleRetireCardBonus = (card: Card) => {
      const action = createRetireCardBonusAction(gameState, activePlayer, card);
      if (action) dispatch(action);
  };

  if (isViewingAnnualReport && latestAnnualReports) {
    const myReport = latestAnnualReports[activePlayerIndex];
    if (myReport) {
        return (
          <AnnualReport 
              report={myReport} 
              playerHistory={activePlayer.history} 
              allPlayers={players}
              allLatestReports={latestAnnualReports}
              onContinue={onStartNextYear} 
              yearlyBuys={yearlyBuys} 
              yearlyRetirements={yearlyRetirements} 
          />
        );
    }
  }

  if (isGameOver) {
    return (
      <div className="text-center flex flex-col items-center justify-center p-4 h-full">
        <h2 className="text-4xl font-black text-red-500 mb-2">{gameOverReason?.startsWith('BANKRUPTCY') ? 'FALIMENT' : 'Joc Terminat'}</h2>
        {gameOverReason?.startsWith('BANKRUPTCY') && <p className="text-lg text-slate-300 mb-4">{`Jucătorul ${activePlayerIndex + 1} a dat faliment.`}</p>}
        <div className="flex flex-col space-y-4 mt-4">
            <button onClick={onViewCompanyHistory} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg">Vezi Istoric</button>
            {gameOverReason?.startsWith('BANKRUPTCY') && (<button onClick={() => onReEnterGame(activePlayerIndex)} className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg animate-pulse">Reintră în Joc</button>)}
        </div>
      </div>
    );
  }

  const handleSelectCard = (card: Card, source: 'market' | 'hand', pileIndex?: number) => {
    if (copyCardState.isSelectingTarget && source === 'hand') {
        const isSourceCard = card.uid === copyCardState.sourceCardUid;
        if (isSourceCard) { dispatch({ type: 'CANCEL_COPY' }); }
        else if (card.type === 'standard' && card.effect?.id !== 'ACTIVATE_TO_COPY_CARD_FROM_HAND') { dispatch({ type: 'SELECT_COPY_TARGET', payload: { targetCard: card } }); }
        return;
    }
    setSelection({ card, source, pileIndex });
  };

  const handleConfirmAction = (action: () => void) => {
    action();
    setSelection(null);
  };
  
  const MobilePile: React.FC<{ title: string, count: number }> = ({ title, count }) => (
    <div className="flex flex-col items-center space-y-1 w-[5.5rem]">
      <div className="relative w-[5.5rem] h-[7.7rem]">
        {count > 0 ? ( <img src={STANDARD_CARD_BACK_URL} alt={title} className="w-full h-full object-cover rounded-md shadow-md" /> ) : ( <div className="w-full h-full bg-slate-800/50 rounded-md border-2 border-dashed border-slate-600"></div> )}
        <div className="absolute top-1 right-1 bg-slate-900/70 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{count}</div>
      </div>
      <span className="text-xs text-slate-400 uppercase font-semibold">{title} ({count})</span>
    </div>
  );
  
  const nextPlayerIndex = (activePlayerIndex + 1) % players.length;
  const nextPlayer = players[nextPlayerIndex];

  const mobileName = activePlayer.type === 'human' && userProfile
    ? (userProfile.nickname || activePlayer.name)
    : activePlayer.name;

  return (
    <div className="game-view-mobile w-full h-screen flex flex-col overflow-hidden bg-slate-900 font-sans text-white">
      <OrientationOverlay />
      {copyCardState.isSelectingTarget && ( <div className="absolute top-0 left-0 right-0 p-2 bg-yellow-600 text-black text-center font-bold z-30 animate-pulse"> Alege o carte din mână pentru a o copia.</div> )}
      {bonusBuy && !copyCardState.isSelectingTarget && ( <div className="absolute top-0 left-0 right-0 p-2 bg-green-600 text-white text-center font-bold z-30"> BONUS: Cumpără un '{bonusBuy.assetType}' de cost ≤ {bonusBuy.maxCost}</div> )}
      {retireFromHandBonus && !copyCardState.isSelectingTarget && !bonusBuy && ( <div className="absolute top-0 left-0 right-0 p-2 bg-amber-600 text-white text-center font-bold z-30"> BONUS: Renunță la un '{retireFromHandBonus.assetType}' (cost: {retireFromHandBonus.retireCost}$)</div> )}

      <div className="flex-1 flex items-center justify-center space-x-4 p-2 overflow-hidden">
        <div className="flex-1 flex items-center space-x-2 overflow-x-auto p-2 h-full">
          {marketPiles.map((pile, pileIndex) => {
            const topCard = pile[0];
            if (!topCard) return <div key={pileIndex} className="flex-shrink-0 w-24 aspect-[2.5/3.5] bg-slate-800/50 rounded-md border-2 border-dashed border-slate-700"></div>;
            const effectiveCost = getEffectiveCost(topCard.cost, gameState, activePlayer);
            const canAfford = cash >= effectiveCost;
            const canBuyNormally = actionsRemainingThisTurn > 0 && canAfford;
            const isBonusTarget = !!(bonusBuy && canAfford && topCard.cost <= bonusBuy.maxCost && topCard.assetType === bonusBuy.assetType);
            return (
              <div key={pileIndex} className="relative flex-shrink-0" onClick={() => (canBuyNormally || isBonusTarget) && handleSelectCard(topCard, 'market', pileIndex)}>
                <CardUI card={topCard} isFaceUp={true} size="small" effectiveCost={effectiveCost} hasBonusHighlight={isBonusTarget} expenseOverlayClass="bottom-10" source="market" />
                {!(canBuyNormally || isBonusTarget) && <div className="absolute inset-0 bg-black/60 rounded-lg"></div>}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-24 aspect-[2.5/3.5] bg-slate-800/50 rounded-md flex items-center justify-center">
            {activeEvent ? <CardUI card={activeEvent} isFaceUp={true} size="small" expenseOverlayClass="bottom-10" /> : <img src={EVENT_CARD_BACK_URL} alt="Event" className="w-full h-full object-cover rounded-md" />}
          </div>
          <p className="text-center text-xs text-slate-400 mt-1 uppercase font-semibold">Eveniment</p>
        </div>
      </div>

      <div className="flex-shrink-0 h-20 flex items-center justify-between p-1 bg-slate-800/80 backdrop-blur-sm border-y border-slate-700">
        <div onClick={() => setIsManagementModalOpen(true)} className={`cursor-pointer flex-shrink-0 transition-all duration-[1500ms] ease-in-out ${isSweeping ? 'translate-x-[85vw] rotate-6' : ''}`}>
          {entrepreneur && ( 
            <div className="relative">
                <CardUI card={entrepreneur} isFaceUp={true} size="hud" expenseOverlayClass="bottom-10" />
                {/* NAME TAG OVERLAY MOBILE: UPDATED STYLE */}
                <div className="absolute top-1 right-1 bg-white/90 text-black text-[8px] leading-none px-1 py-0 rounded border border-yellow-600 z-20 shadow-lg font-bold tracking-tighter pointer-events-none whitespace-nowrap">
                    {mobileName}
                </div>
            </div>
          )}
        </div>
        <div className="flex-grow flex items-center justify-around px-1">
            <MobileStatDisplay label="Cash" value={activePlayer.cash} imageUrl={STAT_ICONS.cash} textColor="text-black" onClick={() => !isManualMode && setActiveChartKeys(['cash'])} />
            {isManualMode ? (
              <>
                  {inputMethod === 'reel' ? (
                      <>
                          <NumberReelInput label="Prod." value={manualHudValues.production || ''} onChange={(v) => handleManualValueChange('production', v)} imageUrl={STAT_ICONS.production} size="mobile" />
                          <NumberReelInput label="Vânz." value={manualHudValues.sales || ''} onChange={(v) => handleManualValueChange('sales', v)} imageUrl={STAT_ICONS.sales} textColor="text-black" size="mobile" />
                          <NumberReelInput label="Venit" value={manualHudValues.income || ''} onChange={(v) => handleManualValueChange('income', v)} imageUrl={STAT_ICONS.income} size="mobile" />
                          <NumberReelInput label="Chelt." value={manualHudValues.expenses || ''} onChange={(v) => handleManualValueChange('expenses', v)} imageUrl={STAT_ICONS.expenses} size="mobile" />
                      </>
                  ) : (
                      <>
                          <NumpadInput label="Prod." value={manualHudValues.production || ''} onClick={() => setNumpadState({ isOpen: true, field: 'production', label: 'Producție' })} imageUrl={STAT_ICONS.production} size="mobile" />
                          <NumpadInput label="Vânz." value={manualHudValues.sales || ''} onClick={() => setNumpadState({ isOpen: true, field: 'sales', label: 'Vânzări' })} imageUrl={STAT_ICONS.sales} textColor="text-black" size="mobile" />
                          <NumpadInput label="Venit" value={manualHudValues.income || ''} onClick={() => setNumpadState({ isOpen: true, field: 'income', label: 'Venituri' })} imageUrl={STAT_ICONS.income} size="mobile" />
                          <NumpadInput label="Chelt." value={manualHudValues.expenses || ''} onClick={() => setNumpadState({ isOpen: true, field: 'expenses', label: 'Cheltuieli' })} imageUrl={STAT_ICONS.expenses} size="mobile" />
                      </>
                  )}
              </>
            ) : (
              <>
                  <MobileStatDisplay label="Prod." value={turnTotals.production} imageUrl={STAT_ICONS.production} textColor="text-white" onClick={() => setActiveChartKeys(['production'])} />
                  <MobileStatDisplay label="Vânz." value={turnTotals.sales} imageUrl={STAT_ICONS.sales} textColor="text-black" onClick={() => setActiveChartKeys(['sales'])} />
                  <MobileStatDisplay label="Venit" value={turnTotals.income} imageUrl={STAT_ICONS.income} textColor="text-white" onClick={() => setActiveChartKeys(['income'])} />
                  <MobileStatDisplay label="Chelt." value={turnTotals.expenses} imageUrl={STAT_ICONS.expenses} textColor="text-white" onClick={() => setActiveChartKeys(['expenses'])} />
              </>
            )}
            <MobileStatDisplay label="Capital" value={manualTotals.capitalization} imageUrl={STAT_ICONS.capitalization} textColor="text-white" onClick={() => !isManualMode && setActiveChartKeys(['capitalization'])} />
            <MobileStatDisplay label="Profit" value={manualTotals.profit} imageUrl={STAT_ICONS.profit} textColor={manualTotals.profit >= 0 ? 'text-white' : 'text-red-400'} onClick={() => !isManualMode && setActiveChartKeys(['profit'])} />
        </div>
        <div className="flex items-center space-x-2 pr-2">
          <button onClick={toggleFullscreen} className="p-3 bg-slate-600/50 text-white rounded-md hover:bg-slate-500/50" aria-label="Toggle Fullscreen">
            {isFullscreen ? <ExitFullscreenIcon /> : <EnterFullscreenIcon />}
          </button>
          <button onClick={() => dispatch({ type: 'UNDO_LAST_ACTION' })} disabled={!activePlayer.lastAction || endTurnButtonDisabled || isInteractionDisabled} className="px-3 py-2 bg-yellow-500 text-white font-bold rounded-md disabled:opacity-50">Undo</button>
          <button onClick={handleEndTurn} disabled={endTurnButtonDisabled || isManualInputIncomplete || isInteractionDisabled} className={`px-4 py-3 text-white font-bold rounded-lg transition-colors ${endTurnError ? 'bg-red-600' : 'bg-blue-600'} disabled:opacity-50`}>End Turn</button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between space-x-2 p-2 overflow-hidden">
        <MobilePile title="Deck" count={deck.length} />
        <div className={`flex-1 flex items-center space-x-2 p-2 h-full ${isSweeping ? 'overflow-hidden' : 'overflow-x-auto'}`}>
          {processedHand.map((card, index) => {
            const canRetireNormally = actionsRemainingThisTurn > 0 && cash >= getRetireCost(card, gameState);
            const canBonusRetire = !!(retireFromHandBonus && cash >= retireFromHandBonus.retireCost && (retireFromHandBonus.assetType === 'any' || card.assetType === retireFromHandBonus.assetType));
            const hasAnyAction = canRetireNormally || canBonusRetire || card.calculationType === 'choice' || card.effect?.id === 'ACTIVATE_TO_COPY_CARD_FROM_HAND' || copyCardState.isSelectingTarget;
            return (
              <div key={card.uid} className={`relative flex-shrink-0 transition-all duration-1000 ease-in-out ${isSweeping ? 'opacity-0 translate-x-[100vw] rotate-12 scale-75' : ''}`} style={{ transitionDelay: `${index * 150}ms`, perspective: '1000px' }} onClick={() => hasAnyAction && !isSweeping && !isInteractionDisabled && handleSelectCard(card, 'hand')}>
                <div className="transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: flippedIndices.includes(index) ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                    <CardUI card={card} isFaceUp={!flippedIndices.includes(index)} isFlipping={true} size="small" isCopySource={copyCardState.sourceCardUid === card.uid} isCopyTarget={copyCardState.isSelectingTarget && copyCardState.sourceCardUid !== card.uid && card.type === 'standard'} hasBonusHighlight={canBonusRetire} choice={cardChoices[card.uid] || 'production'} expenseOverlayClass="bottom-10" source="hand" />
                </div>
              </div>
            )
          })}
        </div>
        <MobilePile title="Echipă" count={discard.length} />
      </div>

      {isActionLogVisible && <ActionLog log={gameState.actionLog} state={gameState} />}
      {selection && (<ActionHub selection={selection} gameState={gameState} onConfirmBuy={() => handleConfirmAction(() => handleBuyCard(selection.card, selection.pileIndex!))} onConfirmRetire={() => handleConfirmAction(() => handleRetireCard(selection.card))} onConfirmRetireBonus={() => handleConfirmAction(() => handleRetireCardBonus(selection.card))} onCancel={() => setSelection(null)} onCardChoice={(cardUid, choice) => dispatch({ type: 'SET_CARD_CHOICE', payload: { cardUid, choice } })} onActivateCopy={(uid) => { dispatch({ type: 'ACTIVATE_COPY', payload: { sourceCardUid: uid } }); setSelection(null); }} />)}
      
      {numpadState.isOpen && numpadState.field && (
        <Numpad
          label={numpadState.label}
          currentValue={manualHudValues[numpadState.field]}
          onInput={(char) => handleManualValueChange(numpadState.field!, (manualHudValues[numpadState.field!] || '') + char)}
          onDelete={() => handleManualValueChange(numpadState.field!, (manualHudValues[numpadState.field!] || '').slice(0, -1))}
          onConfirm={() => setNumpadState({ isOpen: false, field: null, label: '' })}
          onClose={() => setNumpadState({ isOpen: false, field: null, label: '' })}
        />
      )}

      {isTurnTransitioning && players.length > 1 && (
        <div 
            className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center animate-fade-in" 
            onClick={nextPlayer.type === 'human' ? onAdvanceToNextPlayer : undefined}
        >
            {nextPlayer.type === 'human' ? (
                <>
                    <h2 className="text-4xl font-bold text-yellow-300">E rândul lui {nextPlayer.name}!</h2>
                    <p className="text-xl mt-4 text-slate-300 animate-pulse">Apasă oriunde pentru a continua</p>
                </>
            ) : (
                <>
                    <h2 className="text-4xl font-bold text-yellow-300">E rândul lui {nextPlayer.name}...</h2>
                    <p className="text-xl mt-4 text-purple-300 animate-pulse">Gândește...</p>
                </>
            )}
        </div>
      )}
      
      {activeChartKeys.length > 0 && (
          <HistoryChart
            data={quarterlyHistoryForChart}
            allSeriesConfig={quarterlyChartConfig}
            activeSeriesKeys={activeChartKeys}
            onToggleSeries={(key) => {
              setActiveChartKeys(prev => {
                const newKeys = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key];
                return newKeys;
              });
            }}
            onClose={() => setActiveChartKeys([])}
            showTitleAndCloseX={false}
          />
      )}
       {isManagementModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsManagementModalOpen(false)}>
            <div className="w-full max-w-4xl bg-slate-800/90 backdrop-blur-sm rounded-lg p-6 shadow-2xl flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">Echipa de Management</h2>
                <div className="flex justify-center items-start gap-4 overflow-x-auto w-full p-4">
                    {activePlayer.accountant && <CardUI card={activePlayer.accountant} isFaceUp={true} size="small"/>}
                    {activePlayer.activeConsultants.map(c => <CardUI key={c.uid} card={c} isFaceUp={true} size="small"/>)}
                    {!activePlayer.accountant && activePlayer.activeConsultants.length === 0 && (
                        <p className="text-slate-400">Niciun contabil sau consultant activ.</p>
                    )}
                </div>
                <button onClick={() => setIsManagementModalOpen(false)} className="mt-6 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg">
                    Închide
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default MobileGameViewExtended;
