"use client";

import React, { useState, useCallback, useEffect } from 'react';
import type { AnnualReportData, GameLayout, View, AnafModalData, Card } from './types';
import { GameContext } from './contexts/GameContext';
import AnafModal from './components/AnafModal';
import { useGameSetup } from './hooks/useGameSetup'; 
import GameRouter from './components/GameRouter';
import { useGameEngine } from './hooks/useGameEngine';
import { useAuth } from '../platform/auth/AuthContext';
import MainMenu from './components/MainMenu'; 
import { HomeIcon } from './components/Icons'; 
import { getUserProfile } from '../platform/user/userService';
import type { UserProfile } from '../platform/user/types';
import { loadGameFromCloud } from '../platform/saves/saveService';
import Wallet from './components/Wallet';
import { useImmersiveGameMode } from './hooks/useImmersiveGameMode';

interface GameRunnerProps {
  dbCards?: Card[];
}

const GameRunner: React.FC<GameRunnerProps> = ({ dbCards = [] }) => {
  const { enterGameMode, exitGameMode } = useImmersiveGameMode();
  const [currentView, setCurrentView] = useState<View>('mainMenu');

  useEffect(() => {
    if (currentView === 'game') {
      enterGameMode();
    } else {
      exitGameMode();
    }
  }, [currentView, enterGameMode, exitGameMode]);
  
  const [isViewingAnnualReport, setIsViewingAnnualReport] = useState(false);
  const [latestAnnualReports, setLatestAnnualReports] = useState<Record<number, AnnualReportData> | null>(null);
  const [revealedMarketPile, setRevealedMarketPile] = useState<{ title: string; cards: Card[] } | null>(null);
  const [isTurnTransitioning, setIsTurnTransitioning] = useState<boolean>(false);
  const [anafModalData, setAnafModalData] = useState<AnafModalData | null>(null);
  const [isCloudLoading, setIsCloudLoading] = useState(false);
  const [showCloudLoadToast, setShowCloudLoadToast] = useState(false);
  
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
  
  const [gameLayout, setGameLayout] = useState<GameLayout>(() => {
      if (typeof window !== 'undefined') {
          return (localStorage.getItem('gameLayout') as GameLayout) || 'classic';
      }
      return 'classic';
  });
  const [backgroundClass, setBackgroundClass] = useState(() => {
      if (typeof window !== 'undefined') {
          return localStorage.getItem('backgroundStyle') || 'game-background-none';
      }
      return 'game-background-none';
  });

  const { authState, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const fetchProfile = useCallback(async () => {
    if (authState.state === 'loggedIn' && authState.user) {
      try {
        const profile = await getUserProfile(authState.user.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error("Failed to load user profile in GameRunner", error);
      }
    } else {
      setUserProfile(null);
    }
  }, [authState.state, authState.user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile, currentView]);

  const { gameState, dispatch, actions } = useGameEngine({
      currentView,
      setCurrentView,
      isTurnTransitioning,
      setIsTurnTransitioning,
      setLatestAnnualReports: (reports) => setLatestAnnualReports(reports),
      setIsViewingAnnualReport,
      setAnafModalData: (data) => setAnafModalData(data as AnafModalData),
      userProfile
  });
  
  useEffect(() => {
      const checkForCloudSave = async () => {
          if (authState.state === 'loggedIn' && authState.user && currentView === 'mainMenu') {
              setIsCloudLoading(true);
              try {
                  const savedData = await loadGameFromCloud(authState.user.uid);
                  if (savedData && savedData.gameState) {
                      if (!gameState.players.length || gameState.isGameOver) {
                          dispatch({ type: 'LOAD_GAME', payload: savedData.gameState });
                          setShowCloudLoadToast(true);
                          setTimeout(() => setShowCloudLoadToast(false), 4000);
                      }
                  }
              } catch (e) {
                  console.error("Failed to load cloud save:", e);
              } finally {
                  setIsCloudLoading(false);
              }
          }
      };
      checkForCloudSave();
  }, [authState.state, authState.user, currentView]);


  const gameSetup = useGameSetup({ dispatch, setCurrentView, dbCards });
  const { handleReEnterGame } = gameSetup;

  const activePlayer = gameState.players[gameState.activePlayerIndex];
  const history = activePlayer?.history || { quarterly: [], annual: [] };

  const handleViewCompanyHistory = useCallback(() => {
    setCurrentView('companyHistory');
  }, []);

  const handleQuitRequest = () => {
      if (currentView === 'game') {
          setIsQuitModalOpen(true);
      } else {
          actions.handleBackToMenu();
      }
  };

  const confirmQuit = () => {
      setIsQuitModalOpen(false);
      actions.handleBackToMenu();
  };

  useEffect(() => {
    const autoSaveEnabled = localStorage.getItem('autoSave') === 'true';
    if (autoSaveEnabled) {
      try {
        const savedStateJSON = localStorage.getItem('savedGameState');
        if (savedStateJSON) {
          const savedState = JSON.parse(savedStateJSON);
          if (savedState.players && savedState.players.length > 0 && !savedState.isGameOver) {
            setCurrentView('game');
          }
        }
      } catch (e) { console.error("Could not parse saved game state on mount."); }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'backgroundStyle') setBackgroundClass(e.newValue || 'game-background-none');
        if (e.key === 'gameLayout') setGameLayout((e.newValue as GameLayout) || 'classic');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleGlobalMouseDown = () => { if (revealedMarketPile) setRevealedMarketPile(null); };
    if (revealedMarketPile) window.addEventListener('mousedown', handleGlobalMouseDown);
    return () => window.removeEventListener('mousedown', handleGlobalMouseDown);
  }, [revealedMarketPile]);

  const CardUI = React.lazy(() => import('./components/CardUI'));

  const getRoleBadge = (role?: string) => {
      if (role === 'premium') return <span className="ml-2 px-1.5 py-0.5 rounded bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-[10px] font-bold uppercase tracking-wider shadow-sm border border-yellow-200">Magnat</span>;
      if (role === 'admin') return <span className="ml-2 px-1.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm border border-red-400">Admin</span>;
      return null;
  };

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      <div className={`${backgroundClass} text-white min-h-screen flex flex-col font-sans relative ${currentView === 'game' ? 'game-shell' : ''}`}>
        {/* User Status / Navigation Bar */}
        {currentView !== 'mainMenu' && (
          <div className="absolute top-2 right-2 z-50 flex items-center space-x-2 md:space-x-3 bg-slate-900/70 backdrop-blur-sm p-1.5 rounded-lg border border-slate-700 shadow-lg">
            
            {/* Wallet Integration */}
            {userProfile && <Wallet ezc={userProfile.ezc} ezg={userProfile.ezg} />}

            {/* User Info - Hidden on Mobile, Visible on Desktop */}
            <div className="hidden md:flex items-center space-x-2 mr-1 border-l border-slate-700 pl-3">
              {authState.state === 'loggedIn' ? (
                <>
                  {userProfile?.avatarUrl && (
                    <img 
                      src={userProfile.avatarUrl} 
                      alt="Avatar" 
                      className="w-6 h-6 rounded-full border border-slate-500 object-cover"
                    />
                  )}
                  <div className="flex flex-col items-start leading-tight">
                     <div className="flex items-center">
                        <span className="font-bold text-yellow-300">
                            {userProfile?.nickname || authState.email?.split('@')[0]}
                        </span>
                        {getRoleBadge(userProfile?.role)}
                     </div>
                  </div>
                </>
              ) : (
                <span className="font-semibold text-slate-300 px-2">Oaspete</span>
              )}
            </div>
            
            {/* Cloud Status Indicator */}
            {isCloudLoading && (
                <div className="flex items-center text-xs text-blue-400 animate-pulse mr-2">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    Sync...
                </div>
            )}
            
            {/* Home Button */}
            <button 
                onClick={handleQuitRequest} 
                className="p-2 text-yellow-400 hover:text-yellow-200 transition-colors md:p-1.5 md:text-slate-300 md:hover:text-white md:hover:bg-slate-600 md:rounded-md md:border-l md:border-slate-600 md:pl-2 md:ml-1"
                title="Înapoi la Meniu"
            >
                <HomeIcon />
            </button>
          </div>
        )}

        {/* Cloud Load Toast Notification */}
        {showCloudLoadToast && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in">
                <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-3 border border-green-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="font-bold">Jocul anterior salvat în Cloud a fost încărcat.</span>
                </div>
            </div>
        )}

        <main className="w-full flex-grow flex items-start justify-center">
            <React.Suspense fallback={<div>Loading...</div>}>
                <GameRouter 
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    gameState={gameState}
                    gameSetup={gameSetup}
                    gameLayout={gameLayout}
                    isViewingAnnualReport={isViewingAnnualReport}
                    latestAnnualReport={null}
                    latestAnnualReports={latestAnnualReports}
                    isTurnTransitioning={isTurnTransitioning}
                    onEndTurn={actions.handleEndTurn}
                    onStartNextYear={actions.handleStartNextYear}
                    onReEnterGame={(playerIndex: number) => handleReEnterGame(gameState.players, playerIndex)}
                    onAdvanceToNextPlayer={actions.handleAdvanceToNextPlayer}
                    onViewCompanyHistory={handleViewCompanyHistory}
                    /* FIX: Corrected variable name from onSetRevealedMarketPile to setRevealedMarketPile */
                    onSetRevealedMarketPile={setRevealedMarketPile}
                    onBackToMenu={handleQuitRequest}
                    onLogout={logout} 
                    userProfile={userProfile} 
                />
            </React.Suspense>
        </main>
        {revealedMarketPile && ( 
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onMouseDown={() => setRevealedMarketPile(null)}>
                <div className="w-full h-full max-w-7xl max-h-[90vh] bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 overflow-y-auto flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">{revealedMarketPile.title} ({revealedMarketPile.cards.length})</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <React.Suspense fallback={null}>
                            {revealedMarketPile.cards.map((card) => (<div key={card.uid}><CardUI card={card} isFaceUp={true} /></div>))}
                        </React.Suspense>
                        <p className="text-slate-400 mt-auto pt-4">Apasă oriunde pentru a închide</p>
                    </div>
                </div>
            </div> 
        )}
        {anafModalData && (
          <AnafModal
            correctValues={anafModalData.correctValues}
            userValues={anafModalData.userValues}
            mistakeCount={activePlayer?.anafMistakeCount ?? 0}
            dispatch={dispatch}
            onClose={() => {
              setAnafModalData(null);
              actions.proceedToEndTurn();
            }}
            config={gameState.config}
            previousYearTurnover={history.annual.length > 0 ? history.annual[history.annual.length - 1].turnover : 0}
            capitalization={anafModalData.capitalization}
          />
        )}
        
        {/* Quit Confirmation Modal */}
        {isQuitModalOpen && (
          <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsQuitModalOpen(false)}>
            <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-sm rounded-lg p-6 shadow-2xl border border-slate-600 flex flex-col items-center text-center" onClick={e => e.stopPropagation()}>
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Ieșire din Joc?</h3>
              <p className="text-slate-300 mb-8">
                Progresul curent {authState.state === 'loggedIn' ? 'se salvează automat în cloud.' : 'nesalvat se va pierde (dacă nu ai autosave local).'} Ești sigur că vrei să abandonezi partida și să te întorci la meniul principal?
              </p>
              <div className="flex justify-center space-x-6 w-full">
                <button
                  onClick={() => setIsQuitModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition-colors shadow-md"
                >
                  Nu, rămân
                </button>
                <button
                  onClick={confirmQuit}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-md animate-pulse"
                >
                  Da, ieșire
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </GameContext.Provider>
  );
};

export default GameRunner;
