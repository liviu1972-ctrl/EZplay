
import { useReducer, useEffect, useRef, useCallback, useState } from 'react';
import type { GameState, View, AnnualReportData, CompanyHistory, GameAction, AnafModalData } from '../types';
import { gameReducer, initialState } from '../game-logic/reducer';
import { runEffects } from '../game-logic/effect-runner';
import { makeAiMove } from '../game-logic/ai-player';
import { processHandAndCalculateTotals } from '../game-logic/selectors';
import { generateAnnualReport } from '../game-logic/financials';
import { useAuth } from '../../platform/auth/AuthContext'; 
import { saveGameToCloud } from '../../platform/saves/saveService'; 
import { updateUserProfile, processTransaction } from '../../platform/user/userService'; 
import type { UserProfile } from '../../platform/user/types'; 

// Helper hook for tracking previous values
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const getInitialState = (): { initialGameState: GameState; initialView: View } => {
    try {
        const savedStateJSON = localStorage.getItem('savedGameState');
        if (savedStateJSON) {
            const savedState = JSON.parse(savedStateJSON);
            if (savedState.players && savedState.players.length > 0 && !savedState.isGameOver) {
                return { initialGameState: savedState, initialView: 'game' };
            }
        }
    } catch (error) {
        console.error("Failed to load saved game state:", error);
        localStorage.removeItem('savedGameState');
    }
    return { initialGameState: initialState, initialView: 'mainMenu' };
};

interface UseGameEngineProps {
    currentView: View;
    setCurrentView: (view: View) => void;
    isTurnTransitioning: boolean;
    setIsTurnTransitioning: (isTransitioning: boolean) => void;
    setLatestAnnualReports: (reports: Record<number, AnnualReportData> | null) => void; 
    setIsViewingAnnualReport: (isViewing: boolean) => void;
    setAnafModalData: (data: AnafModalData | null) => void;
    userProfile: UserProfile | null;
}

export const useGameEngine = ({
    currentView,
    setCurrentView,
    isTurnTransitioning,
    setIsTurnTransitioning,
    setLatestAnnualReports,
    setIsViewingAnnualReport,
    setAnafModalData,
    userProfile
}: UseGameEngineProps) => {
    
    const [{ initialGameState }] = useState(getInitialState); 
    const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
    
    const { players, activePlayerIndex, currentYear, currentQuarter, activeEvent, isGameOver, gameOverReason, winnerPlayerIndex } = gameState;
    const activePlayer = players[activePlayerIndex];
    const previousGameState = usePrevious(gameState);
    const previousIsGameOver = usePrevious(isGameOver);
    
    const { authState } = useAuth();
    const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const annualReportsRef = useRef<Record<number, AnnualReportData>>({});

    const proceedToEndTurn = useCallback(() => {
        if (!activePlayer) return;
    
        const currentTurnData = processHandAndCalculateTotals(activePlayer, activeEvent);
        const endOfTurnCash = activePlayer.cash + currentTurnData.turnTotals.profit;
        const isBankruptcyTriggered = endOfTurnCash < 0;
    
        if (isBankruptcyTriggered) {
            dispatch({ type: 'TRIGGER_BANKRUPTCY' });
            return;
        }
    
        dispatch({ type: 'END_TURN', payload: { turnProfit: currentTurnData.turnTotals.profit, turnTotals: currentTurnData.turnTotals } });
        
        const isLastPlayer = activePlayerIndex === players.length - 1;
        if (isLastPlayer) {
          const isEndOfYear = currentQuarter === 4;
          if (isEndOfYear) {
              const reports: Record<number, AnnualReportData> = {};
              players.forEach((p, index) => {
                  if (index === activePlayerIndex) {
                       reports[index] = generateAnnualReport(currentYear, currentQuarter, p.history, currentTurnData.turnTotals, p, activeEvent);
                  } else {
                       const lastQ = p.history.quarterly[p.history.quarterly.length - 1];
                       const historyWithoutLast = { ...p.history, quarterly: p.history.quarterly.slice(0, -1) };
                       reports[index] = generateAnnualReport(currentYear, currentQuarter, historyWithoutLast, lastQ, p, activeEvent);
                  }
              });

              annualReportsRef.current = reports;
              setLatestAnnualReports(reports); 
              setIsViewingAnnualReport(true);

          } else {
              if (players.length > 1) setIsTurnTransitioning(true);
              else dispatch({ type: 'START_NEXT_QUARTER' });
          }
        } else {
          setIsTurnTransitioning(true);
        }
      }, [activePlayer, players, activePlayerIndex, currentQuarter, activeEvent, currentYear, setLatestAnnualReports, setIsViewingAnnualReport, setIsTurnTransitioning]);
    

    const handleEndTurn = useCallback((manualValues?: Record<string, string>) => {
        if (!activePlayer) return;
    
        const { hudCalculationMode } = gameState.config;
    
        if (hudCalculationMode === 'anaf' && manualValues) {
            const { turnTotals: correctTotals } = processHandAndCalculateTotals(activePlayer, activeEvent);
            
            const parsedManualValues = {
                production: Number(manualValues.production) || 0,
                sales: Number(manualValues.sales) || 0,
                income: Number(manualValues.income) || 0,
                expenses: Number(manualValues.expenses) || 0,
            };
    
            const valuesMatch =
                parsedManualValues.production === correctTotals.production &&
                parsedManualValues.sales === correctTotals.sales &&
                parsedManualValues.income === correctTotals.income &&
                parsedManualValues.expenses === correctTotals.expenses;
    
            if (!valuesMatch) {
                setAnafModalData({
                    correctValues: {
                        production: correctTotals.production,
                        sales: correctTotals.sales,
                        income: correctTotals.income,
                        expenses: correctTotals.expenses,
                    },
                    userValues: parsedManualValues,
                    capitalization: correctTotals.capitalization,
                });
                return;
            }
        }
        
        proceedToEndTurn();
    }, [activePlayer, activeEvent, gameState.config, proceedToEndTurn, setAnafModalData]);

    const handleStartNextYear = useCallback(() => {
        setIsViewingAnnualReport(false);
        dispatch({ type: 'START_NEXT_YEAR', payload: { reports: annualReportsRef.current } });
        if (players.length > 1) setIsTurnTransitioning(true);
    }, [players.length, setIsViewingAnnualReport, setIsTurnTransitioning]);

    const handleAdvanceToNextPlayer = useCallback(() => {
        const isLastPlayer = activePlayerIndex === players.length - 1;
        if (isLastPlayer) {
            dispatch({ type: 'START_NEXT_QUARTER' });
        } else {
            dispatch({ type: 'ADVANCE_TO_NEXT_PLAYER' });
        }
        setIsTurnTransitioning(false);
    }, [activePlayerIndex, players.length, setIsTurnTransitioning]);

    const handleBackToMenu = useCallback(() => {
        setCurrentView('mainMenu');
    }, [setCurrentView]);

    // Effect Runner
    useEffect(() => {
        if (previousGameState) {
            const derivedActions = runEffects(previousGameState, gameState);
            if (derivedActions.length > 0) {
                queueMicrotask(() => { derivedActions.forEach(action => dispatch(action)); });
            }
        }
    }, [gameState, previousGameState]);

    // Autosave
    useEffect(() => {
        if (currentView === 'game' && !isGameOver && !isTurnTransitioning) {
            localStorage.setItem('savedGameState', JSON.stringify(gameState));

            if (authState.state === 'loggedIn' && authState.user) {
                if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
                saveTimeoutRef.current = setTimeout(() => {
                    saveGameToCloud(authState.user!.uid, gameState).catch(err => {
                        console.warn("Failed to autosave to cloud:", err);
                    });
                }, 3000); 
            }
        }
        return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); };
    }, [gameState, currentView, isGameOver, isTurnTransitioning, authState]);

    // UPDATED: Currency Rewards System
    useEffect(() => {
        if (isGameOver && !previousIsGameOver && authState.user) {
          localStorage.removeItem('savedGameState'); 
          const humanPlayer = players.find(p => p.type === 'human') || players[0];
          if (!humanPlayer) return;

          const grantRewards = async () => {
              const isWinner = winnerPlayerIndex === humanPlayer.id;
              
              if (gameOverReason?.startsWith('BANKRUPTCY') || !isWinner) return;

              const yearsSurvived = humanPlayer.history.annual.length;
              if (yearsSurvived > 0) {
                  const ezcReward = yearsSurvived * 1; 
                  await processTransaction(authState.user!.uid, 'ezc', ezcReward, `VICTORY_SURVIVAL_Y${yearsSurvived}`);
              }

              // RECOMPENSA DE VICTORIE: 1 EZGold (schimbat de la 20)
              if (gameState.objective?.type !== 'infinite') {
                  await processTransaction(authState.user!.uid, 'ezg', 1, 'GAME_VICTORY_BONUS');
              }
          };

          grantRewards().catch(err => console.error("Failed to grant rewards:", err));

          if (gameOverReason?.startsWith('BANKRUPTCY') && userProfile) {
              const activePlayerId = gameState.activePlayerIndex;
              if (humanPlayer.id === activePlayerId) {
                  const currentName = userProfile.companyName;
                  const regex = /-(\d+)$/;
                  const match = currentName.match(regex);
                  let newName = '';
                  if (match) {
                      const num = parseInt(match[1], 10) + 1;
                      newName = currentName.replace(regex, `-${num}`);
                  } else {
                      newName = `${currentName}-1`;
                  }
                  updateUserProfile(authState.user.uid, { companyName: newName }).catch(err => {
                      console.error("Failed to update company name after bankruptcy", err);
                  });
              }
          }

          // Save History
          if (humanPlayer.history.annual.length === 0 && (currentYear === 1 && currentQuarter === 1)) return;
          const newHistoryEntry: CompanyHistory = { 
              id: Date.now(), 
              companyName: humanPlayer.name,
              reports: humanPlayer.history.annual, 
              reasonForEnd: gameOverReason!, 
              finalYear: currentYear, 
              finalQuarter: currentQuarter 
          };
          try {
            const savedHistories: CompanyHistory[] = JSON.parse(localStorage.getItem('allCompaniesHistory') || '[]');
            localStorage.setItem('allCompaniesHistory', JSON.stringify([...savedHistories, newHistoryEntry]));
          } catch (error) { console.error("Failed to save company history:", error); }
        }
      }, [isGameOver, previousIsGameOver, players, gameOverReason, currentYear, currentQuarter, userProfile, authState.user, winnerPlayerIndex, gameState.objective]);

    // AI Turn Logic
    useEffect(() => {
        const isPlayerAi = activePlayer?.type === 'ai';
        const canAiAct = isPlayerAi && currentView === 'game' && !isGameOver && !activePlayer?.copyCardState.isSelectingTarget && !isTurnTransitioning;
        if (!canAiAct) return;
        const timer = setTimeout(() => {
          const aiDecision = makeAiMove(gameState, { strategy: activePlayer.aiStrategy!, skillLevel: activePlayer.aiSkillLevel || 'novice' });
          if (aiDecision) {
            if (aiDecision.type === 'END_TURN_SIGNAL') handleEndTurn();
            else dispatch(aiDecision as GameAction);
          }
        }, 1500);
        return () => clearTimeout(timer);
    }, [gameState, activePlayer, isGameOver, currentView, isTurnTransitioning, handleEndTurn]);

    // AI Transition Logic
    useEffect(() => {
        if (isTurnTransitioning && players.length > 0) {
            const nextPlayerIndex = (activePlayerIndex + 1) % players.length;
            const nextPlayer = players[nextPlayerIndex];
            if (nextPlayer && nextPlayer.type === 'ai') {
                const advanceTimer = setTimeout(() => {
                    handleAdvanceToNextPlayer();
                }, 2000);
                return () => clearTimeout(advanceTimer);
            }
        }
    }, [isTurnTransitioning, activePlayerIndex, players, handleAdvanceToNextPlayer]);

    return {
        gameState,
        dispatch,
        initialGameState,
        actions: {
            handleEndTurn,
            proceedToEndTurn,
            handleStartNextYear,
            handleAdvanceToNextPlayer,
            handleBackToMenu
        }
    };
};
