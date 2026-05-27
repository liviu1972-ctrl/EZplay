
import React from 'react';
import type { View, GameState, GameLayout, AnnualReportData, Card } from '../types';
import MainMenu from './MainMenu';
import ScenarioLoader from './ScenarioLoader';
import GameSimulator from './GameSimulator';
import EntrepreneurSelection from './views/entrepreneur-selection';
import AccountantSelection from './views/accountant-selection';
import StartingDeckSetup from './views/starting-deck-setup';
import GameViewClassic from './views/game/classic';
import GameViewExtended from './views/game/extended';
import Settings from './Settings';
import GameSetup from './GameSetup';
import CompanyHistoryView from './CompanyHistoryView';
import DocumentationView from './DocumentationView';
import UserProfileView from '../../platform/user/UserProfile';
import AdminPanel from './AdminPanel'; // NEW
import { useGameSetup } from '../hooks/useGameSetup';
import type { UserProfile } from '../../platform/user/types';

interface GameRouterProps {
    currentView: View;
    setCurrentView: (view: View) => void;
    gameState: GameState;
    gameSetup: ReturnType<typeof useGameSetup>;
    gameLayout: GameLayout;
    isViewingAnnualReport: boolean;
    latestAnnualReport: AnnualReportData | null;
    latestAnnualReports: Record<number, AnnualReportData> | null;
    isTurnTransitioning: boolean;
    onEndTurn: (manualValues?: Record<string, string>) => void;
    onStartNextYear: () => void;
    onReEnterGame: (playerIndex: number) => void;
    onAdvanceToNextPlayer: () => void;
    onViewCompanyHistory: () => void;
    onSetRevealedMarketPile: (pile: { title: string; cards: Card[] } | null) => void;
    onBackToMenu: () => void;
    onLogout: () => void;
    userProfile: UserProfile | null;
}

const GameRouter: React.FC<GameRouterProps> = ({
    currentView,
    setCurrentView,
    gameState,
    gameSetup,
    gameLayout,
    isViewingAnnualReport,
    latestAnnualReports,
    isTurnTransitioning,
    onEndTurn,
    onStartNextYear,
    onReEnterGame,
    onAdvanceToNextPlayer,
    onViewCompanyHistory,
    onSetRevealedMarketPile,
    onBackToMenu,
    onLogout,
    userProfile
}) => {
    const { players, activePlayerIndex, isGameOver } = gameState;
    const activePlayer = players[activePlayerIndex];

    const {
        playerConfigs,
        humanPlayerIndices,
        currentHumanSetupIndex,
        playerSetups,
        scenarioSetupState,
        reEntryState,
        allEntrepreneurs,
        allStandardCards,
        allEvents,
        allConsultants,
        allAccountants,
        availableExpansions,
        activeExpansionIds,
        gameConfig,
        handleActiveExpansionsChange,
        handleNewGame,
        handleEntrepreneurSelected,
        handleAccountantSelected,
        handleDeckSetupComplete,
        handleStartScenario,
        handleScenarioEntrepreneurSelected,
        handleScenarioDeckSetupComplete,
        handleReEntrySetupComplete,
    } = gameSetup;

    // Check if there is an active game in memory
    const hasActiveGame = players.length > 0 && !isGameOver;

    switch(currentView) {
      case 'mainMenu':
        return <MainMenu 
            onNewGame={handleNewGame} 
            onContinue={() => setCurrentView('game')} 
            onShowHistory={() => setCurrentView('companyHistory')} 
            onShowSettings={() => setCurrentView('settings')} 
            onShowGameSetup={() => setCurrentView('gameSetup')} 
            onShowDocumentation={() => setCurrentView('documentation')} 
            onLoadScenario={() => setCurrentView('scenarioLoader')} 
            onShowProfile={() => setCurrentView('userProfile')}
            onShowAdmin={() => setCurrentView('admin')} // NEW
            onLogout={onLogout}
            hasActiveGame={hasActiveGame}
            userRole={userProfile?.role} // PASS ROLE
        />;
      case 'scenarioLoader':
        return <ScenarioLoader onStart={handleStartScenario} onBack={onBackToMenu} availableExpansions={availableExpansions} allAvailableEntrepreneurs={allEntrepreneurs} />;
      case 'gameSimulator':
        return <GameSimulator onBack={onBackToMenu} allAvailableEntrepreneurs={allEntrepreneurs} allAvailableStandardCards={allStandardCards} />;
      case 'entrepreneurSelection':
        if (scenarioSetupState) {
          const { scenario, currentSetupPlayerIndex } = scenarioSetupState;
          const currentPlayerConfig = scenario.players[currentSetupPlayerIndex];
          const availableForScenario = currentPlayerConfig.allowedEntrepreneurIds ? allEntrepreneurs.filter(ent => currentPlayerConfig.allowedEntrepreneurIds!.includes(ent.globalId)) : allEntrepreneurs.filter(ent => scenario.activeExpansions.includes(ent.expansionId));
          return <EntrepreneurSelection entrepreneurs={availableForScenario} initialSelectedId={availableForScenario[0]?.id || ''} onConfirm={handleScenarioEntrepreneurSelected} onBack={onBackToMenu} playerContextText={currentPlayerConfig.name} />;
        }
        if (playerConfigs.length === 0 || humanPlayerIndices.length === 0) { return <MainMenu onNewGame={handleNewGame} onContinue={() => setCurrentView('game')} onShowHistory={() => setCurrentView('companyHistory')} onShowSettings={() => setCurrentView('settings')} onShowGameSetup={() => setCurrentView('gameSetup')} onShowDocumentation={() => setCurrentView('documentation')} onLoadScenario={() => setCurrentView('scenarioLoader')} onShowProfile={() => setCurrentView('userProfile')} onShowAdmin={() => setCurrentView('admin')} onLogout={onLogout} hasActiveGame={hasActiveGame} userRole={userProfile?.role} />; }
        const currentAbsoluteIndex = humanPlayerIndices[currentHumanSetupIndex];
        const playerContextText = `${playerConfigs[currentAbsoluteIndex].name} (${currentHumanSetupIndex + 1}/${humanPlayerIndices.length})`;
        return <EntrepreneurSelection key={currentHumanSetupIndex} entrepreneurs={allEntrepreneurs} initialSelectedId={allEntrepreneurs[0]?.id || ''} onConfirm={handleEntrepreneurSelected} onBack={() => setCurrentView('mainMenu')} playerContextText={playerContextText} />;
      case 'accountantSelection': {
        const currentAbsoluteIndex = humanPlayerIndices[currentHumanSetupIndex];
        const playerContextText = `${playerConfigs[currentAbsoluteIndex].name} (${currentHumanSetupIndex + 1}/${humanPlayerIndices.length})`;
        return <AccountantSelection accountants={allAccountants} onConfirm={handleAccountantSelected} onBack={() => setCurrentView('entrepreneurSelection')} playerContextText={playerContextText} />;
      }
      case 'startingDeckSetup': {
          if (scenarioSetupState) {
              const { scenario, currentSetupPlayerIndex, setups } = scenarioSetupState;
              const playerConfig = scenario.players[currentSetupPlayerIndex];
              const playerSetup = setups[currentSetupPlayerIndex];
              if (!playerSetup.selectedEntrepreneur) return <div>Eroare: Antreprenor ne-selectat.</div>;

              const allCardsMap = new Map<string, Card>();
              [...allStandardCards, ...allEntrepreneurs, ...allEvents].forEach(card => allCardsMap.set(card.globalId, card));
              const bannedCards = new Set(scenario.bannedCards || []);
              let deckBuilderProps: any = {};

              if (playerConfig.deckBuilderConfig) {
                  deckBuilderProps = {
                      startingCash: playerConfig.deckBuilderConfig.budget,
                      deckSize: playerConfig.deckBuilderConfig.deckSize,
                      pool: playerConfig.deckBuilderConfig.pool.map(gid => allCardsMap.get(gid)!).filter(Boolean).filter(card => !bannedCards.has(card.globalId)),
                  };
              } else {
                  deckBuilderProps = {
                      startingCash: playerConfig.startingCash,
                      deckSize: gameConfig.startingDeckSize,
                      pool: allStandardCards.filter(c => scenario.activeExpansions.includes(c.expansionId)).filter(card => !bannedCards.has(card.globalId)),
                  };
              }
              return <StartingDeckSetup onSetupComplete={handleScenarioDeckSetupComplete} onBack={onBackToMenu} {...deckBuilderProps} selectedEntrepreneurId={playerSetup.selectedEntrepreneur.id} playerIndex={currentSetupPlayerIndex} playerCount={scenario.players.length} legacyCards={[]} allEntrepreneurs={allEntrepreneurs} isReEntry={true} />;
          }
          if (reEntryState !== null) {
              const playerToRestart = players[reEntryState.playerIndex];
              if (!playerToRestart?.entrepreneur) return null;

              if (gameState.scenario?.players[reEntryState.playerIndex]?.deckBuilderConfig) {
                  const scenarioPlayerConfig = gameState.scenario.players[reEntryState.playerIndex];
                  const deckBuilderConfig = scenarioPlayerConfig.deckBuilderConfig!;
                  const allCardsMap = new Map<string, Card>();
                  [...allStandardCards, ...allEvents, ...allEntrepreneurs].forEach(card => allCardsMap.set(card.globalId, card));
                  const bannedCards = new Set(gameState.scenario.bannedCards || []);
                  const scenarioPool = deckBuilderConfig.pool.map(gid => allCardsMap.get(gid)!).filter(Boolean).filter(card => !bannedCards.has(card.globalId));
                  return <StartingDeckSetup onSetupComplete={handleReEntrySetupComplete} onBack={onBackToMenu} startingCash={deckBuilderConfig.budget} deckSize={deckBuilderConfig.deckSize} pool={scenarioPool} selectedEntrepreneurId={playerToRestart.entrepreneur.id} playerIndex={reEntryState.playerIndex} playerCount={players.length} legacyCards={reEntryState.legacyCards} allEntrepreneurs={allEntrepreneurs} isReEntry={true} />;
              } else {
                  const { startingCash, startingDeckSize, startingDeckMaxCost } = gameState.config;
                  const pool = allStandardCards.filter(card => card.cost <= startingDeckMaxCost);
                  return <StartingDeckSetup onSetupComplete={handleReEntrySetupComplete} onBack={onBackToMenu} startingCash={startingCash} deckSize={startingDeckSize} pool={pool} selectedEntrepreneurId={playerToRestart.entrepreneur.id} playerIndex={reEntryState.playerIndex} playerCount={players.length} legacyCards={reEntryState.legacyCards} allEntrepreneurs={allEntrepreneurs} isReEntry={true} />;
              }
          }
          const playerIndexForSetup = humanPlayerIndices[currentHumanSetupIndex];
          const playerSetupForDeck = playerSetups[playerIndexForSetup];
          const selectedEntForDeckSetup = playerSetupForDeck?.selectedEntrepreneur;
          const selectedAccForDeckSetup = playerSetupForDeck?.selectedAccountant;

          if (!selectedEntForDeckSetup) { return <div>Eroare: Antreprenorul nu a fost selectat. Întoarce-te la meniul principal.</div>; }
          
          const { startingCash, startingDeckSize, startingDeckMaxCost } = gameConfig;
          const accountantCost = selectedAccForDeckSetup?.cost ?? 0;
          const cashForDeckBuilding = startingCash - accountantCost;
          
          const pool = allStandardCards.filter(card => card.cost <= startingDeckMaxCost);

          return <StartingDeckSetup 
            key={currentHumanSetupIndex} 
            onSetupComplete={handleDeckSetupComplete} 
            onBack={onBackToMenu} 
            startingCash={cashForDeckBuilding} 
            deckSize={startingDeckSize} 
            pool={pool} 
            allEntrepreneurs={allEntrepreneurs} 
            selectedEntrepreneurId={selectedEntForDeckSetup.id} 
            selectedAccountant={selectedAccForDeckSetup}
            playerIndex={playerIndexForSetup} 
            playerCount={playerConfigs.length} 
            legacyCards={[]} 
          />;
      }
      case 'game': {
        if (!activePlayer) return null;
        const commonGameProps = { 
          isViewingAnnualReport, 
          latestAnnualReports,
          latestAnnualReport: null,
          isTurnTransitioning, 
          onEndTurn: onEndTurn,
          onStartNextYear: onStartNextYear, 
          onReEnterGame: onReEnterGame, 
          onAdvanceToNextPlayer: onAdvanceToNextPlayer, 
          onViewCompanyHistory: onViewCompanyHistory,
          onSetRevealedMarketPile: onSetRevealedMarketPile,
          userProfile
        };
        if (gameLayout === 'extended') return <GameViewExtended {...commonGameProps} />;
        return <GameViewClassic {...commonGameProps} />;
      }
      case 'settings': return <Settings onClose={() => setCurrentView('mainMenu')} onShowSimulator={() => setCurrentView('gameSimulator')} />;
      case 'gameSetup': return <GameSetup onClose={() => setCurrentView('mainMenu')} availableExpansions={availableExpansions} allEvents={allEvents} allConsultants={allConsultants} activeExpansionIds={activeExpansionIds} onActiveExpansionsChange={handleActiveExpansionsChange} gameConfig={gameConfig} />;
      case 'companyHistory': return <CompanyHistoryView onBackToMenu={onBackToMenu} />;
      case 'documentation': return <DocumentationView onBack={() => setCurrentView('mainMenu')} />;
      case 'userProfile': return <UserProfileView onBack={onBackToMenu} />;
      case 'admin': return <AdminPanel onBack={onBackToMenu} currentUserRole={userProfile?.role} />; // NEW
      default: return null;
    }
};

export default GameRouter;
