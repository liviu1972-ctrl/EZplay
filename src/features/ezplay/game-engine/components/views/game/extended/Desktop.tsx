
import React from 'react';
import type { Card } from '../../../../types';
import { createBuyCardAction, createRetireCardAction, createRetireCardBonusAction } from '../../../../game-logic/actions';
import { getEffectiveCost, getRetireCost, getRetireCostModifier } from '../../../../game-logic/selectors';
import CardUI from '../../../CardUI';
import Pile from '../../../Pile';
import RetireZone from '../../../TrashZone';
import AnnualReport from '../../../AnnualReport';
import HistoryChart from '../../../HistoryChart';
import StatDisplay from '../../../StatDisplay';
import NumberReelInput from '../../../NumberReelInput';
import NumpadInput from '../../../NumpadInput';
import Numpad from '../../../Numpad';
import PlayerHUD from '../../../PlayerHUD';
import ActionLog from '../../../ActionLog';
import { STAT_ICONS } from '../../../../constants';
import type { GameViewChildProps } from '../types';
import { useGameViewLogic } from '../../../../hooks/useGameViewLogic';

const DesktopGameViewExtended: React.FC<GameViewChildProps> = (props) => {
  const { 
      gameState, dispatch, activePlayer, processedHand, turnTotals, manualTotals, manualHudValues,
      quarterlyHistoryForChart, quarterlyChartConfig,
      isManualMode, isSweeping, flippedIndices, endTurnButtonDisabled, endTurnError, isManualInputIncomplete,
      inputMethod, numpadState, activeChartKeys, isManagementModalOpen,
      handleManualValueChange, handleEndTurn, setNumpadState, setActiveChartKeys, setIsManagementModalOpen, setInputMethod
  } = useGameViewLogic(props, 'desktop');

  const { isViewingAnnualReport, latestAnnualReports, isTurnTransitioning, onStartNextYear, onReEnterGame, onAdvanceToNextPlayer, onViewCompanyHistory, onSetRevealedMarketPile, userProfile } = props;
  const { marketPiles, marketSetup, currentYear, currentQuarter, yearlyBuys, yearlyRetirements, eventDeck, activeEvent, discardedEvents, isGameOver, gameOverReason, config, players, activePlayerIndex, winnerPlayerIndex } = gameState;

  if (!activePlayer) return null;

  const { deck, discard, retiredCards, entrepreneur, cash, actionsRemainingThisTurn, lastAction, bonusBuy, retireFromHandBonus, cardChoices, copyCardState, activeConsultants, accountant } = activePlayer;
  const hasPerformedActionThisTurn = actionsRemainingThisTurn <= 0;
  const isPlayerAi = activePlayer.type === 'ai';
  const showDiscardSetting = localStorage.getItem('showDiscard') !== 'false';
  const showDeckSetting = localStorage.getItem('showDeck') === 'true';
  const showMarketSetting = localStorage.getItem('showMarket') === 'true';
  const isActionLogVisible = localStorage.getItem('showActionLog') === 'true';
  const isInteractionDisabled = isTurnTransitioning || isPlayerAi;

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
    const winner = winnerPlayerIndex !== null ? players[winnerPlayerIndex] : null;
    return (
      <div className="text-center flex flex-col items-center justify-center">
        <h2 className="text-5xl font-black text-red-500 mb-4 tracking-wider" style={{textShadow: '3px 3px #000'}}>{winner ? 'JOC TERMINAT' : 'FALIMENT'}</h2>
        {winner && (<><p className="text-3xl text-yellow-300 mb-2">Câștigător: {winner.name}!</p><p className="text-xl text-slate-300 mb-6">{gameOverReason}</p></>)}
        {gameOverReason?.startsWith('BANKRUPTCY') && <p className="text-xl text-slate-300 mb-6">{`Jucătorul ${activePlayerIndex + 1} a încheiat tura cu un capital negativ.`}</p>}
        <div className="flex items-center space-x-6 mt-8">
          <button onClick={onViewCompanyHistory} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors">Arhivă și Statistici</button>
          {gameOverReason?.startsWith('BANKRUPTCY') && (<button onClick={() => onReEnterGame(activePlayerIndex)} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors animate-pulse">Reintră în Joc</button>)}
        </div>
      </div>
    );
  }
  
  const areEventsActive = eventDeck.length > 0 || activeEvent || discardedEvents.length > 0;
  const consultantLimitReached = activeConsultants.length >= config.maxActiveConsultants;
  
  const managementCards = [accountant, ...activeConsultants].filter(Boolean) as Card[];

  const displayName = activePlayer.type === 'human' && userProfile
    ? (userProfile.displayName || userProfile.nickname || activePlayer.name)
    : activePlayer.name;

  return (
    <div className="w-full max-w-screen-2xl flex flex-col items-center space-y-2 animate-fade-in relative pt-4">
        <PlayerHUD players={players} activePlayerIndex={activePlayerIndex} positionClass="top-[570px]" isTurnTransitioning={isTurnTransitioning} onAdvanceToNextPlayer={onAdvanceToNextPlayer} />
        <div className="w-full flex flex-col items-center space-y-2 mb-2">
            <h2 className="text-xl font-bold text-slate-400 uppercase tracking-wider">Management & Consultanți</h2>
            <div className="w-full flex justify-center items-start space-x-4 p-2 bg-slate-800/30 rounded-lg">
                {Array.from({ length: 5 }).map((_, i) => {
                    const card = managementCards[i];
                    return (
                        <div key={`adviser-slot-${i}`} className="w-64 aspect-[3.5/2.5] bg-slate-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-700">
                            {card ? (
                                <CardUI card={card} isFaceUp={true} />
                            ) : (
                                <span className="text-slate-500 font-semibold">Slot Gol</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="w-full flex justify-center items-start space-x-8">
            <div className="flex justify-center items-start space-x-4 p-2 bg-slate-800/50 rounded-lg shadow-inner relative">
                {bonusBuy && ( <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-bold animate-pulse z-10"> BONUS: Cumpără un activ de tip '{bonusBuy.assetType}' de cost ≤ {bonusBuy.maxCost} </div> )}
                {retireFromHandBonus && ( <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold animate-pulse z-10"> BONUS: Renunță la un activ '{retireFromHandBonus.assetType}' din mână (cost: {retireFromHandBonus.retireCost}$) </div> )}
                {marketPiles.map((pile, pileIndex) => {
                    const topCard = pile[0];
                    const pileConfig = marketSetup[pileIndex];
                    let canDrag = false, isBonusOnly = false;
                    let effectiveCost = topCard ? getEffectiveCost(topCard.cost, gameState, activePlayer) : 0;
                    if (topCard) {
                        const isAffordable = cash >= effectiveCost;
                        const canBuyNormally = !hasPerformedActionThisTurn && isAffordable;
                        const canBuyWithBonus = !!(bonusBuy && isAffordable && topCard.cost <= bonusBuy.maxCost && topCard.assetType === bonusBuy.assetType);
                        canDrag = !isInteractionDisabled && (canBuyNormally || canBuyWithBonus) && !(topCard.type === 'consultant' && consultantLimitReached);
                        isBonusOnly = canBuyWithBonus && !canBuyNormally;
                    }
                    return (
                      <div key={pileIndex} className="flex flex-col items-center">
                        <div className={`group relative w-48 h-[268.8px] bg-slate-900/40 rounded-lg flex items-center justify-center ${showMarketSetting && pile.length > 0 ? 'cursor-pointer select-none' : ''}`} onContextMenu={(e) => { if (showMarketSetting && pile.length > 0) { e.preventDefault(); onSetRevealedMarketPile({ title: pileConfig?.title ?? 'Piață', cards: pile }); } }}>
                            <div className="absolute top-1 right-1 bg-slate-900/70 text-white text-xs font-bold px-2 py-1 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity">{pile.length}</div>
                            {topCard ? (<div draggable={canDrag} onDragStart={(e) => { if (!canDrag) { e.preventDefault(); return; } e.dataTransfer.setData('application/json', JSON.stringify({ source: 'market', card: topCard, pileIndex })); e.currentTarget.classList.add('opacity-50', 'scale-95'); }} onDragEnd={(e) => { e.currentTarget.classList.remove('opacity-50', 'scale-95'); }} className={`relative transition-all duration-200 ${canDrag ? 'cursor-grab hover:scale-105 active:cursor-grabbing' : 'cursor-not-allowed'} ${!canDrag ? 'opacity-50' : ''}`}>
                                <CardUI card={topCard} isFaceUp={true} effectiveCost={effectiveCost} source="market" />
                                {isBonusOnly && ( <div className="absolute inset-0 bg-green-500/20 rounded-lg ring-2 ring-green-400 flex items-center justify-center pointer-events-none"><span className="text-white font-bold text-lg bg-black/50 px-2 py-1 rounded">BONUS</span></div> )}
                                {topCard.type === 'consultant' && consultantLimitReached && ( <div className="absolute inset-0 bg-red-500/20 rounded-lg ring-2 ring-red-400 flex items-center justify-center pointer-events-none"><span className="text-white font-bold text-lg bg-black/50 px-2 py-1 rounded text-center leading-tight">LIMITĂ ATINSĂ</span></div> )}
                            </div>) : (pileConfig?.filters.isEmpty ? (<span className="text-gray-500 text-center text-sm px-4">Rezervat</span>) : (<span className="text-gray-500">GOL</span>))}
                        </div>
                      </div>
                    );
                })}
            </div>
            <div className="flex flex-col items-center">
              <div className="w-48 h-[268.8px] bg-slate-900/40 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 p-2">
                  {areEventsActive ? (activeEvent ? <CardUI card={activeEvent} isFaceUp={true} /> : <CardUI card={{ type: 'event' } as Card} isFaceUp={false} />) : <span className="text-gray-500 text-center">Extensia Evenimente este dezactivată.</span>}
              </div>
            </div>
        </div>
        <div className="w-full flex justify-between items-start space-x-8">
            <div className="flex flex-col items-center space-y-4 pt-4"> <Pile cards={deck} title="Deck" isInteractive={showDeckSetting} /> </div>
            <div className="flex flex-col items-center space-y-2 flex-grow">
                <div className="w-full min-h-[183px] flex items-center justify-start space-x-4">
                    {entrepreneur && ( 
                        <div className={`transition-all duration-1000 ease-in-out relative group ${isSweeping ? 'translate-x-[950px] rotate-12' : 'translate-x-0 rotate-0'}`}>
                            <CardUI card={entrepreneur} isFaceUp={true} isBankrupt={isGameOver && gameOverReason?.startsWith('BANKRUPTCY')} />
                            {/* NAME TAG OVERLAY */}
                            <div className="absolute top-3 right-2 bg-white/90 text-black text-xs px-1.5 py-0.5 rounded border border-yellow-600 z-20 shadow-lg font-bold tracking-wider pointer-events-none whitespace-nowrap">
                                {displayName}
                            </div>
                        </div> 
                    )}
                    {activeConsultants.map((c, i) => ( <div key={c.uid} style={{ transitionDelay: `${(i + 1) * 100}ms`}} className={`relative transition-all duration-1000 ease-in-out ${isSweeping ? 'translate-x-[950px] rotate-12' : 'translate-x-0 rotate-0'}`}><CardUI card={c} isFaceUp={true} /><div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm shadow-lg ring-2 ring-white" title={`Contract: ${c.turnsLeft} ture`}>{c.turnsLeft}</div></div> ))}
                </div>
                <div className="w-full flex items-center justify-between space-x-2 bg-slate-800 p-2 rounded-lg shadow-inner">
                    <div className="flex items-center justify-center space-x-1 flex-wrap gap-y-1">
                        <div className="flex flex-col items-center justify-start space-y-1 w-20 h-20"><span className="text-sm text-slate-400 uppercase tracking-wider h-5 text-center">Timp</span><div className="flex items-center justify-center w-full h-12"><span className="text-2xl font-bold block text-center leading-tight">{`An${currentYear}`}<br/>{`Q${currentQuarter}`}</span></div></div>
                        <StatDisplay label="Cash" value={cash} imageUrl={STAT_ICONS.cash} textColor="text-black" onClick={() => setActiveChartKeys(['cash'])} />
                        {isManualMode ? (
                            <>
                                {inputMethod === 'reel' ? (
                                    <>
                                        <NumberReelInput label="Productie" value={manualHudValues.production || ''} onChange={(v) => handleManualValueChange('production', v)} imageUrl={STAT_ICONS.production} />
                                        <NumberReelInput label="Vanzari" value={manualHudValues.sales || ''} onChange={(v) => handleManualValueChange('sales', v)} imageUrl={STAT_ICONS.sales} textColor="text-black" />
                                        <NumberReelInput label="Venituri" value={manualHudValues.income || ''} onChange={(v) => handleManualValueChange('income', v)} imageUrl={STAT_ICONS.income} />
                                        <NumberReelInput label="Cheltuieli" value={manualHudValues.expenses || ''} onChange={(v) => handleManualValueChange('expenses', v)} imageUrl={STAT_ICONS.expenses} />
                                    </>
                                ) : (
                                    <>
                                        <NumpadInput label="Productie" value={manualHudValues.production || ''} onClick={() => setNumpadState({ isOpen: true, field: 'production', label: 'Producție' })} imageUrl={STAT_ICONS.production} />
                                        <NumpadInput label="Vanzari" value={manualHudValues.sales || ''} onClick={() => setNumpadState({ isOpen: true, field: 'sales', label: 'Vânzări' })} imageUrl={STAT_ICONS.sales} textColor="text-black" />
                                        <NumpadInput label="Venituri" value={manualHudValues.income || ''} onClick={() => setNumpadState({ isOpen: true, field: 'income', label: 'Venituri' })} imageUrl={STAT_ICONS.income} />
                                        <NumpadInput label="Cheltuieli" value={manualHudValues.expenses || ''} onClick={() => setNumpadState({ isOpen: true, field: 'expenses', label: 'Cheltuieli' })} imageUrl={STAT_ICONS.expenses} />
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <StatDisplay label="Productie" value={turnTotals.production} imageUrl={STAT_ICONS.production} onClick={() => setActiveChartKeys(['production'])} />
                                <StatDisplay label="Vanzari" value={turnTotals.sales} imageUrl={STAT_ICONS.sales} textColor="text-black" onClick={() => setActiveChartKeys(['sales'])} />
                                <StatDisplay label="Venituri" value={turnTotals.income} imageUrl={STAT_ICONS.income} onClick={() => setActiveChartKeys(['income'])} />
                                <StatDisplay label="Cheltuieli" value={turnTotals.expenses} imageUrl={STAT_ICONS.expenses} onClick={() => setActiveChartKeys(['expenses'])} />
                            </>
                        )}
                        <StatDisplay label="Capitalizare" value={manualTotals.capitalization} imageUrl={STAT_ICONS.capitalization} onClick={() => setActiveChartKeys(['capitalization'])} />
                        <StatDisplay label="Profit" value={manualTotals.profit} imageUrl={STAT_ICONS.profit} textColor={manualTotals.profit < 0 ? 'text-red-400' : 'text-white'} onClick={() => setActiveChartKeys(['profit'])} />
                    </div>
                    <div className="flex items-center space-x-1 p-1 rounded-lg bg-slate-900/50 flex-shrink-0">
                        <button onClick={() => dispatch({ type: 'UNDO_LAST_ACTION' })} disabled={!lastAction || endTurnButtonDisabled || isInteractionDisabled} className="px-4 py-2 bg-yellow-500 text-white text-sm font-bold rounded-md shadow-md hover:bg-yellow-600 transition-colors duration-200 disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed">Undo</button>
                        <button onClick={handleEndTurn} className={`px-5 py-2.5 text-white font-bold rounded-lg shadow-lg transition-colors duration-200 text-base disabled:bg-slate-600 disabled:cursor-not-allowed ${endTurnError ? 'bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={endTurnButtonDisabled || isInteractionDisabled || isManualInputIncomplete}>{endTurnError ? 'Date Incorecte!' : 'End Turn'}</button>
                    </div>
                </div>
                <div className="flex justify-center items-start space-x-4 h-[350px] w-full pt-2">
                    {processedHand.map((card, index) => {
                        const retireCost = getRetireCost(card, gameState);
                        const canRetire = !isInteractionDisabled && !hasPerformedActionThisTurn && cash >= retireCost;
                        const currentChoice = cardChoices[card.uid] || 'production';
                        const canBonusRetire = !isInteractionDisabled && retireFromHandBonus && cash >= retireFromHandBonus.retireCost && (retireFromHandBonus.assetType === 'any' || card.assetType === retireFromHandBonus.assetType);
                        const isOriginalCopier = card.effect?.id === 'ACTIVATE_TO_COPY_CARD_FROM_HAND', isCopiedVersion = !!card.originalCard, isTargetSelectionMode = copyCardState.isSelectingTarget, isThisTheCopySource = copyCardState.sourceCardUid === card.uid, isPotentialTarget = isTargetSelectionMode && !isThisTheCopySource && card.type === 'standard' && card.effect?.id !== 'ACTIVATE_TO_COPY_CARD_FROM_HAND', isFlipped = flippedIndices.includes(index);
                        return (
                            <div key={card.uid} style={{ zIndex: index, animationDelay: `${index * 150}ms` }} className={`relative animate-draw-card flex flex-col items-center transition-all duration-1000 ease-in-out ${isSweeping ? 'opacity-0 translate-x-[600px] rotate-12 scale-75' : ''}`}>
                                <div style={{ perspective: '1000px' }} draggable={canRetire} onDragStart={(e) => { if (!canRetire) { e.preventDefault(); return; } e.dataTransfer.setData('application/json', JSON.stringify({ source: 'hand', card: card })); e.currentTarget.classList.add('opacity-50', 'scale-95'); }} onDragEnd={(e) => { e.currentTarget.classList.remove('opacity-50', 'scale-95'); }} onClick={() => !isInteractionDisabled && isPotentialTarget && dispatch({ type: 'SELECT_COPY_TARGET', payload: { targetCard: card } })} className={`relative ${canRetire ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed'} ${isPotentialTarget ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-slate-900 rounded-lg cursor-pointer' : ''} ${isThisTheCopySource ? 'opacity-50' : ''}`}>
                                    <div className="transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                                        <CardUI card={card} isFaceUp={!isFlipped} choice={currentChoice} isFlipping={true} source="hand" />
                                    </div>
                                    {canBonusRetire && ( <button onClick={() => handleRetireCardBonus(card)} className="absolute top-2 right-2 z-20 p-2 bg-red-600/80 rounded-full hover:bg-red-500 transition-all scale-90 hover:scale-100" aria-label={`Retrage ${card.name} pentru ${retireFromHandBonus.retireCost} cash`}> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button> )}
                                </div>
                                <div className="mt-3 flex flex-col items-center space-y-2 w-44">
                                    {isOriginalCopier && !isCopiedVersion && !endTurnButtonDisabled && !isInteractionDisabled && ( isThisTheCopySource ? ( <button onClick={() => dispatch({ type: 'CANCEL_COPY' })} className="w-full px-3 py-1 text-sm font-bold rounded-full transition-colors bg-rose-600 text-white shadow-md hover:bg-rose-500 animate-pulse">Anulează</button> ) : ( <button onClick={() => dispatch({ type: 'ACTIVATE_COPY', payload: { sourceCardUid: card.uid } })} disabled={copyCardState.isSelectingTarget} className="w-full px-3 py-1 text-sm font-bold rounded-full transition-colors bg-teal-600 text-white shadow-md hover:bg-teal-500 disabled:opacity-50">Copiază</button> ) )}
                                    {isCopiedVersion && !endTurnButtonDisabled && !isInteractionDisabled && ( <button onClick={() => dispatch({ type: 'RESET_COPY', payload: { sourceCardUid: card.uid } })} className="w-full px-3 py-1 text-sm font-bold rounded-full transition-colors bg-rose-600 text-white shadow-md hover:bg-rose-500">Anulează</button> )}
                                    {card.calculationType === 'choice' && !endTurnButtonDisabled && !isInteractionDisabled && ( <div className="w-full flex justify-center bg-slate-800/90 p-1 rounded-full shadow-lg"> <button onClick={() => dispatch({ type: 'SET_CARD_CHOICE', payload: { cardUid: card.uid, choice: 'production' } })} className={`px-3 py-1 text-sm font-bold rounded-full transition-colors w-1/2 ${currentChoice === 'production' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>Prod: {card.production}</button><button onClick={() => dispatch({ type: 'SET_CARD_CHOICE', payload: { cardUid: card.uid, choice: 'sales' } })} className={`px-3 py-1 text-sm font-bold rounded-full transition-colors w-1/2 ${currentChoice === 'sales' ? 'bg-yellow-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>Vânz: {card.sales}</button></div> )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col space-y-4 pt-4">
              <Pile cards={discard} title="Echipă" onCardDrop={(data) => { if (data.source === 'market') handleBuyCard(data.card, data.pileIndex) }} isInteractive={showDiscardSetting} />
              <RetireZone count={retiredCards.length} onCardDrop={(data) => { if (data.source === 'hand') handleRetireCard(data.card as Card) }} disabled={hasPerformedActionThisTurn || isInteractionDisabled} retireModifier={getRetireCostModifier(gameState)} />
            </div>
        </div>
        {isActionLogVisible && <ActionLog log={gameState.actionLog} state={gameState} />}
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
      {isManagementModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsManagementModalOpen(false)}>
            <div className="w-full max-w-4xl bg-slate-800/90 backdrop-blur-sm rounded-lg p-6 shadow-2xl flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-6">Echipa de Management</h2>
                <div className="flex justify-center items-start gap-6">
                    {activePlayer.accountant && <CardUI card={activePlayer.accountant} isFaceUp={true} />}
                    {activePlayer.activeConsultants.map(c => <CardUI key={c.uid} card={c} isFaceUp={true} />)}
                    {!activePlayer.accountant && activePlayer.activeConsultants.length === 0 && (
                        <p className="text-slate-400">Niciun contabil sau consultant activ.</p>
                    )}
                </div>
                <button onClick={() => setIsManagementModalOpen(false)} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
                    Închide
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default DesktopGameViewExtended;
