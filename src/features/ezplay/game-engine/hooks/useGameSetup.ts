import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type {
  Card,
  GameAction,
  AiStrategy,
  AiSkillLevel,
  Scenario,
  PlayerSetupPayload,
  GameConfig,
  BonusBuyRule,
  HudCalculationMode,
  GameObjective,
  GameObjectiveType,
  ExpansionModule,
  AnafPenaltyMode,
} from '../types';
import { buildResolvedConfig, availableExpansions, allModules } from '../game-logic/configService';
import { coreDefaultConfig } from '../game-logic/defaults';
import { autoBuildDeck } from '../game-logic/deck-builder';

// This is a subset of the View type from App.tsx, only what's needed for setup navigation
type SetupView = 'mainMenu' | 'entrepreneurSelection' | 'accountantSelection' | 'startingDeckSetup' | 'game';

type PlayerConfig = {
    type: 'human' | 'ai';
    name: string;
    strategy: AiStrategy;
    aiSkillLevel?: AiSkillLevel;
};

type ScenarioSetupState = {
  scenario: Scenario;
  setups: Array<Partial<PlayerSetupPayload> & { name: string; type: 'human' | 'ai'; aiStrategy?: AiStrategy; aiSkillLevel?: AiSkillLevel }>;
  currentSetupPlayerIndex: number;
} | null;

interface UseGameSetupProps {
  dispatch: React.Dispatch<GameAction>;
  setCurrentView: React.Dispatch<React.SetStateAction<any>>; // Using 'any' to avoid circular dependency with App's View type
  dbCards?: Card[];
}

export const useGameSetup = ({ dispatch, setCurrentView, dbCards = [] }: UseGameSetupProps) => {
    
  // --- Setup-related state, moved from App.tsx ---
  const [playerConfigs, setPlayerConfigs] = useState<PlayerConfig[]>([]);
  const [humanPlayerIndices, setHumanPlayerIndices] = useState<number[]>([]);
  const [currentHumanSetupIndex, setCurrentHumanSetupIndex] = useState<number>(0);
  const [playerSetups, setPlayerSetups] = useState<Partial<PlayerSetupPayload>[]>([]);
  const [scenarioSetupState, setScenarioSetupState] = useState<ScenarioSetupState>(null);
  const [reEntryState, setReEntryState] = useState<{ playerIndex: number; legacyCards: Card[] } | null>(null);

  // NEW: Lifted state for active expansions
  const [activeExpansionIds, setActiveExpansionIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('activeExpansions');
        return saved ? JSON.parse(saved) : ['base-game'];
    }
    return ['base-game'];
  });

  // NEW: Handler to change active expansions
  const handleActiveExpansionsChange = useCallback((newIds: string[]) => {
      setActiveExpansionIds(newIds);
      localStorage.setItem('activeExpansions', JSON.stringify(newIds));
  }, []);

  // --- Dynamically load all game data, now reactive to activeExpansionIds state ---
  // We use dbCards for the data, and configService for the settings
  const resolvedConfig = buildResolvedConfig(activeExpansionIds);
  
  const gameData = {
      standard: dbCards.filter(c => c.type === 'standard' && activeExpansionIds.includes(c.expansionId)),
      entrepreneur: dbCards.filter(c => c.type === 'entrepreneur' && activeExpansionIds.includes(c.expansionId)),
      event: dbCards.filter(c => c.type === 'event' && activeExpansionIds.includes(c.expansionId)),
      consultant: dbCards.filter(c => c.type === 'consultant' && activeExpansionIds.includes(c.expansionId)),
      accountant: dbCards.filter(c => c.type === 'accountant' && activeExpansionIds.includes(c.expansionId)),
      settings: resolvedConfig.settings,
  };

  // REMOVED useMemo to ensure config is fresh on every render.
  const gameConfig: GameConfig = (() => {
      // 1. Start with core engine defaults (deep copy to prevent mutation)
      const config: GameConfig = JSON.parse(JSON.stringify(coreDefaultConfig));

      // 2. Merge settings from active expansions
      const activeModules = allModules.filter(m => activeExpansionIds.includes(m.manifest.id));
      for (const module of activeModules) {
          if (module.defaultGameConfig) {
              Object.assign(config, module.defaultGameConfig);
          }
      }

      // 3. Read and merge user-saved settings from localStorage (overrides everything)
      if (typeof window !== 'undefined') {
          try {
              const savedMarket = localStorage.getItem('marketSlotsConfig_v2');
              if (savedMarket) config.marketConfig = JSON.parse(savedMarket);
              
              const savedBonusRule = localStorage.getItem('baseGameConfig_bonusBuyRule');
              if (savedBonusRule) config.bonusBuyRule = savedBonusRule as BonusBuyRule;

              const savedShuffle = localStorage.getItem('baseGameConfig_shuffleMarket');
              if (savedShuffle) config.shuffleMarketOnTurnEnd = savedShuffle === 'true';

              const savedMaxConsultants = localStorage.getItem('consultantsConfig_maxActive');
              if (savedMaxConsultants) config.maxActiveConsultants = parseInt(savedMaxConsultants, 10);
              
              const savedEventsYear = localStorage.getItem('eventsConfig_startYear');
              if (savedEventsYear) config.eventsStartYear = parseInt(savedEventsYear, 10);

              const savedHudMode = localStorage.getItem('baseGameConfig_hudMode');
              if (savedHudMode) config.hudCalculationMode = savedHudMode as HudCalculationMode;

              const savedStartCash = localStorage.getItem('startingCash');
              if (savedStartCash) config.startingCash = parseInt(savedStartCash, 10);

              const savedDeckSize = localStorage.getItem('startingDeckSize');
              if (savedDeckSize) config.startingDeckSize = parseInt(savedDeckSize, 10);
              
              const savedDeckMaxCost = localStorage.getItem('startingDeckMaxCost');
              if (savedDeckMaxCost) config.startingDeckMaxCost = parseInt(savedDeckMaxCost, 10);

              // NEW: Read Taxes settings
              const savedAnafEnabled = localStorage.getItem('taxesConfig_anafEnabled');
              if (savedAnafEnabled) config.isAnafEnabled = savedAnafEnabled === 'true';

              const savedAnafMode = localStorage.getItem('taxesConfig_anafPenaltyMode');
              if (savedAnafMode) config.anafPenaltyMode = savedAnafMode as AnafPenaltyMode;

              const savedAccountingEnabled = localStorage.getItem('taxesConfig_accountingEnabled');
              if (savedAccountingEnabled) config.isAccountingEnabled = savedAccountingEnabled === 'true';

          } catch (e) {
              console.error("Failed to parse user settings from localStorage. Using defaults.", e);
          }
      }
      
      // 4. Final Override for ANAF mode based on Taxes expansion setting
      if (activeExpansionIds.includes('taxes') && config.isAnafEnabled) {
          config.hudCalculationMode = 'anaf';
      }

      return config;
  })();


  // --- Helper and handler functions, moved from App.tsx ---

  const getObjectiveFromStorage = (): GameObjective => {
    const isEnabled = localStorage.getItem('gameObjective_enabled') === 'true';

    if (!isEnabled) {
        return { type: 'infinite', value: 0 };
    }

    const type = (localStorage.getItem('gameObjectiveType') as GameObjectiveType) || 'timeLimit';
    let value = 0;
    switch (type) {
        case 'timeLimit':
            value = parseInt(localStorage.getItem('gameObjectiveValue_timeLimit') || '10', 10);
            break;
        case 'cashGoal':
            value = parseInt(localStorage.getItem('gameObjectiveValue_cashGoal') || '20', 10);
            break;
        case 'capitalizationGoal':
            value = parseInt(localStorage.getItem('gameObjectiveValue_capitalizationGoal') || '100', 10);
            break;
        case 'infinite':
            return { type: 'infinite', value: 0 };
    }
    return { type, value };
  };

  const startGameWithConfigs = useCallback((configs: PlayerConfig[], humanSetups: { finalDeck: Card[], finalCash: number, selectedEntrepreneur: Card, selectedAccountant?: Card }[], objective: GameObjective) => {
    const { startingCash, startingDeckSize, startingDeckMaxCost } = gameConfig;

    const cardPoolForAIs = gameData.standard.filter(card => card.cost <= startingDeckMaxCost);
    const aiPlayerCount = configs.filter(c => c.type === 'ai').length;
    
    const setupsForReducer = configs.map((config, index) => {
        if (config.type === 'human') {
            const setup = humanSetups.shift()!;
            return {
                ...setup, name: config.name, type: config.type,
                aiStrategy: config.strategy,
                aiSkillLevel: config.aiSkillLevel,
            };
        } else {
            const selectedEnt = gameData.entrepreneur[index % gameData.entrepreneur.length];
            const { deck, remainingCash } = autoBuildDeck({
                pool: cardPoolForAIs.flatMap(cardDef => Array(Math.max(1, aiPlayerCount)).fill(0).map(() => ({...cardDef}))),
                budget: startingCash,
                deckSize: startingDeckSize,
            });
            
            return { 
                finalDeck: deck, finalCash: remainingCash, selectedEntrepreneur: selectedEnt, 
                name: config.name, type: config.type, 
                aiStrategy: config.strategy, aiSkillLevel: config.aiSkillLevel 
            };
        }
    });

    const savedEventSequence = localStorage.getItem('eventsConfig_sequence');
    const eventSequence = savedEventSequence ? JSON.parse(savedEventSequence) : undefined;

    dispatch({ 
        type: 'START_GAME', 
        payload: { 
            playerSetups: setupsForReducer, 
            playerCount: configs.length, 
            cardData: {
                standard: gameData.standard,
                consultant: gameData.consultant,
                event: gameData.event,
                accountant: gameData.accountant
            },
            seed: Date.now(), 
            gameConfig, 
            eventSequence, 
            objective 
        } 
    });
    setCurrentView('game');
  }, [dispatch, setCurrentView, gameData, gameConfig]);

  const handleNewGame = useCallback(() => {
    localStorage.removeItem('savedGameState');
    const configs: PlayerConfig[] = JSON.parse(localStorage.getItem('playerConfiguration') || '[{"type":"human","name":"Jucător 1","strategy":"balanced"}]');
    setPlayerConfigs(configs);
    const humanIndices = configs.map((p, i) => p.type === 'human' ? i : -1).filter(i => i !== -1);
    setHumanPlayerIndices(humanIndices);

    if (humanIndices.length > 0) {
        setPlayerSetups(Array(configs.length).fill({}));
        setCurrentHumanSetupIndex(0);
        setCurrentView('entrepreneurSelection');
    } else { // AI-only game
        const objective = getObjectiveFromStorage();
        startGameWithConfigs(configs, [], objective);
    }
  }, [startGameWithConfigs, setCurrentView]);

  const handleEntrepreneurSelected = useCallback((id: string) => {
    const entrepreneur = gameData.entrepreneur.find(e => e.id === id);
    if (!entrepreneur) return;

    const currentAbsolutePlayerIndex = humanPlayerIndices[currentHumanSetupIndex];
    setPlayerSetups(prev => {
        const newSetups = [...prev];
        newSetups[currentAbsolutePlayerIndex] = { selectedEntrepreneur: entrepreneur };
        return newSetups;
    });

    // FIX: Conditionally navigate to accountant selection if enabled.
    if (gameConfig.isAccountingEnabled && activeExpansionIds.includes('taxes')) {
        setCurrentView('accountantSelection');
    } else {
        setCurrentView('startingDeckSetup');
    }
  }, [humanPlayerIndices, currentHumanSetupIndex, setCurrentView, gameData.entrepreneur, gameConfig.isAccountingEnabled, activeExpansionIds]);

  // FIX: Added handler for accountant selection.
  const handleAccountantSelected = useCallback((id: string) => {
    const accountant = gameData.accountant.find(c => c.id === id);
    if (id && !accountant) return;

    const currentAbsolutePlayerIndex = humanPlayerIndices[currentHumanSetupIndex];
    setPlayerSetups(prev => {
        const newSetups = [...prev];
        newSetups[currentAbsolutePlayerIndex] = { ...newSetups[currentAbsolutePlayerIndex], selectedAccountant: accountant };
        return newSetups;
    });

    setCurrentView('startingDeckSetup');
  }, [humanPlayerIndices, currentHumanSetupIndex, setCurrentView, gameData.accountant]);

  const handleDeckSetupComplete = useCallback((setup: { finalDeck: Card[], finalCash: number, selectedEntrepreneur: Card, selectedAccountant?: Card }) => {
    const currentAbsolutePlayerIndex = humanPlayerIndices[currentHumanSetupIndex];
    const updatedSetups = [...playerSetups];
    updatedSetups[currentAbsolutePlayerIndex] = { ...updatedSetups[currentAbsolutePlayerIndex], ...setup };
    setPlayerSetups(updatedSetups);

    const nextHumanSetupIndex = currentHumanSetupIndex + 1;
    if (nextHumanSetupIndex < humanPlayerIndices.length) {
        setCurrentHumanSetupIndex(nextHumanSetupIndex);
        setCurrentView('entrepreneurSelection'); // LOOP BACK for the next player
    } else {
        const objective = getObjectiveFromStorage();
        const humanSetups = humanPlayerIndices.map(index => updatedSetups[index]) as { finalDeck: Card[], finalCash: number, selectedEntrepreneur: Card, selectedAccountant?: Card }[];
        startGameWithConfigs(playerConfigs, humanSetups, objective);
    }
  }, [playerSetups, playerConfigs, currentHumanSetupIndex, humanPlayerIndices, startGameWithConfigs, setCurrentView]);

  const startGameFromScenario = useCallback((scenario: Scenario, playerSetups: PlayerSetupPayload[]) => {
    const bannedSet = new Set(scenario.bannedCards || []);
    const filteredGameData = {
        standard: gameData.standard.filter(c => !bannedSet.has(c.globalId)),
        consultant: gameData.consultant.filter(c => !bannedSet.has(c.globalId)),
        event: gameData.event.filter(c => !bannedSet.has(c.globalId)),
        entrepreneur: gameData.entrepreneur.filter(c => !bannedSet.has(c.globalId)),
        accountant: gameData.accountant.filter(c => !bannedSet.has(c.globalId)),
    };
    
    const allCardsMap = new Map<string, Card>();
    [...filteredGameData.standard, ...filteredGameData.entrepreneur, ...filteredGameData.event, ...filteredGameData.consultant, ...filteredGameData.accountant].forEach(card => allCardsMap.set(card.globalId, card));

    const eventSequence = scenario.eventSequence?.map(globalId => {
        const eventCard = allCardsMap.get(globalId);
        if (!eventCard) throw new Error(`Event card with globalId "${globalId}" not found or is banned.`);
        return eventCard;
    });

    const objectiveForGame = scenario.objective || { type: 'infinite', value: 0 };

    dispatch({
        type: 'START_GAME',
        payload: {
            playerSetups: playerSetups,
            playerCount: scenario.players.length,
            cardData: {
                standard: filteredGameData.standard,
                consultant: filteredGameData.consultant,
                event: filteredGameData.event,
                accountant: filteredGameData.accountant,
            },
            seed: Date.now(),
            gameConfig: scenario.gameConfig,
            eventSequence,
            scenario,
            objective: objectiveForGame,
        }
    });

    setScenarioSetupState(null);
    setCurrentView('game');
  }, [dispatch, setCurrentView, gameData]);

const findNextSetupStep = useCallback((scenario: Scenario, setups: NonNullable<ScenarioSetupState>['setups']): { nextView: SetupView, nextPlayerIndex: number } | null => {
  for (let i = 0; i < scenario.players.length; i++) {
    const pConfig = scenario.players[i];
    const pSetup = setups[i];
    if (pConfig.type === 'human') {
      if (!pSetup.selectedEntrepreneur) return { nextView: 'entrepreneurSelection', nextPlayerIndex: i };
      if (scenario.gameConfig.isAccountingEnabled && !pSetup.selectedAccountant) return { nextView: 'accountantSelection', nextPlayerIndex: i };
      if (!pConfig.startingDeck && !pSetup.finalDeck) return { nextView: 'startingDeckSetup', nextPlayerIndex: i };
    }
  }
  return null;
}, []);

const finalizeAndStartScenario = useCallback((scenario: Scenario, setups: NonNullable<ScenarioSetupState>['setups']) => {
    const allCardsMap = new Map<string, Card>();
    [...gameData.standard, ...gameData.entrepreneur, ...gameData.event, ...gameData.accountant].forEach(card => allCardsMap.set(card.globalId, card));

    const finalPlayerSetups = scenario.players.map((pConfig, index) => {
        const currentSetup = setups[index];
        let finalDeck: Card[], finalCash: number;

        if (currentSetup.finalDeck) {
            finalDeck = currentSetup.finalDeck;
            finalCash = currentSetup.finalCash!;
        } else if (pConfig.startingDeck) {
            finalDeck = pConfig.startingDeck.map((globalId, i) => {
                const cardDef = allCardsMap.get(globalId);
                if (!cardDef) throw new Error(`Card with globalId "${globalId}" not found for player ${index}'s deck.`);
                return { ...cardDef, uid: `startdeck-${index}-${globalId}-${i}` };
            });
            finalCash = pConfig.startingCash;
        } else {
            throw new Error(`Could not determine final deck for player ${index}.`);
        }
        
        return { ...currentSetup, selectedEntrepreneur: currentSetup.selectedEntrepreneur!, finalDeck, finalCash } as PlayerSetupPayload;
    });

    startGameFromScenario(scenario, finalPlayerSetups);
  }, [startGameFromScenario, gameData]);

const handleScenarioEntrepreneurSelected = useCallback((selectedId: string) => {
    if (!scenarioSetupState) return;

    const { scenario, setups, currentSetupPlayerIndex } = scenarioSetupState;
    const selectedEnt = gameData.entrepreneur.find(e => e.id === selectedId)!;

    const newSetups = [...setups];
    newSetups[currentSetupPlayerIndex] = { ...newSetups[currentSetupPlayerIndex], selectedEntrepreneur: selectedEnt };

    const nextStep = findNextSetupStep(scenario, newSetups);
    
    if (nextStep) {
        setScenarioSetupState({ scenario, setups: newSetups, currentSetupPlayerIndex: nextStep.nextPlayerIndex });
        setCurrentView(nextStep.nextView);
    } else {
        finalizeAndStartScenario(scenario, newSetups);
    }
}, [scenarioSetupState, findNextSetupStep, finalizeAndStartScenario, setCurrentView, gameData.entrepreneur]);

const handleScenarioDeckSetupComplete = useCallback((setup: { finalDeck: Card[], finalCash: number, selectedEntrepreneur: Card }) => {
    if (!scenarioSetupState) return;

    const { scenario, setups, currentSetupPlayerIndex } = scenarioSetupState;
    const newSetups = [...setups];
    newSetups[currentSetupPlayerIndex] = { ...newSetups[currentSetupPlayerIndex], ...setup };
    
    const nextStep = findNextSetupStep(scenario, newSetups);

    if (nextStep) {
        setScenarioSetupState({ scenario, setups: newSetups, currentSetupPlayerIndex: nextStep.nextPlayerIndex });
        setCurrentView(nextStep.nextView);
    } else {
        finalizeAndStartScenario(scenario, newSetups);
    }
}, [scenarioSetupState, findNextSetupStep, finalizeAndStartScenario, setCurrentView]);


  const handleStartScenario = useCallback((scenario: Scenario) => {
    localStorage.removeItem('savedGameState');
    
    const setups = scenario.players.map(pConfig => ({
        name: pConfig.name,
        type: pConfig.type,
        aiStrategy: pConfig.aiStrategy,
        aiSkillLevel: pConfig.aiSkillLevel,
        selectedEntrepreneur: pConfig.forceEntrepreneurId ? gameData.entrepreneur.find(e => e.globalId === pConfig.forceEntrepreneurId) : undefined,
    }));

    const firstStep = findNextSetupStep(scenario, setups);

    if (firstStep) {
        setScenarioSetupState({ scenario, setups, currentSetupPlayerIndex: firstStep.nextPlayerIndex });
        setCurrentView(firstStep.nextView);
    } else {
        finalizeAndStartScenario(scenario, setups);
    }
  }, [findNextSetupStep, finalizeAndStartScenario, setCurrentView, gameData.entrepreneur]);

  const handleReEnterGame = useCallback((players: any, playerIndex: number) => {
    const playerToRestart = players[playerIndex];
    if (!playerToRestart) return;

    const allPlayerCards = [...playerToRestart.deck, ...playerToRestart.hand, ...playerToRestart.discard, ...playerToRestart.retiredCards, ...playerToRestart.activeConsultants];
    setReEntryState({ playerIndex, legacyCards: allPlayerCards });
    setCurrentView('startingDeckSetup');
  }, [setCurrentView]);

  const handleReEntrySetupComplete = useCallback((setup: { finalDeck: Card[], finalCash: number, selectedEntrepreneur: Card }) => {
    if (reEntryState === null) return;
    dispatch({ type: 'RESTART_PLAYER', payload: { playerIndex: reEntryState.playerIndex, setup } });
    setReEntryState(null);
    setCurrentView('game');
  }, [reEntryState, dispatch, setCurrentView]);
  
  // --- Return object with all necessary state and handlers ---
  return {
    playerConfigs,
    humanPlayerIndices,
    currentHumanSetupIndex,
    playerSetups,
    scenarioSetupState,
    reEntryState,

    // Expose loaded cards
    allEntrepreneurs: gameData.entrepreneur,
    allStandardCards: gameData.standard,
    allEvents: gameData.event,
    allConsultants: gameData.consultant,
    // FIX: Expose allAccountants to be used in App.tsx.
    allAccountants: gameData.accountant,
    availableExpansions, // Expose the list of available expansions

    gameConfig, // Expose the centralized game config object

    // Pass state and handler for active expansions
    activeExpansionIds,
    handleActiveExpansionsChange,

    handleNewGame,
    handleEntrepreneurSelected,
    // FIX: Expose handleAccountantSelected to be used in App.tsx.
    handleAccountantSelected,
    handleDeckSetupComplete,
    handleStartScenario,
    handleScenarioEntrepreneurSelected,
    handleScenarioDeckSetupComplete,
    handleReEnterGame,
    handleReEntrySetupComplete,
  };
};