
import React, { useState, useEffect } from 'react';
import type { UserRole } from '../../platform/user/types';

interface MainMenuProps {
  onNewGame: () => void;
  onContinue: () => void;
  onShowHistory: () => void;
  onShowSettings: () => void;
  onShowGameSetup: () => void;
  onShowDocumentation: () => void;
  onLoadScenario: () => void;
  onShowProfile: () => void;
  onShowAdmin: () => void; // NEW
  onLogout: () => void;
  hasActiveGame: boolean;
  userRole?: UserRole; // NEW
}

// --- SVG Icons for the new menu ---
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
// ... (Keeping existing icons)
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);
const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);
const SlidersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
);
const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const DocumentationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);
const AdminIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);


const MainMenu: React.FC<MainMenuProps> = ({
  onNewGame,
  onContinue,
  onShowHistory,
  onShowSettings,
  onShowGameSetup,
  onShowDocumentation,
  onLoadScenario,
  onShowProfile,
  onShowAdmin,
  onLogout,
  hasActiveGame,
  userRole
}) => {
  // We prioritize 'hasActiveGame' passed from the engine (Cloud/Memory).
  // As a fallback for guests, we check localStorage.
  const [localSaveExists, setLocalSaveExists] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('savedGameState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (parsedState.players && parsedState.players.length > 0 && !parsedState.isGameOver) {
          setLocalSaveExists(true);
        }
      } catch (error) {
        console.error("Error parsing saved game state:", error);
        setLocalSaveExists(false);
      }
    }
  }, []);

  // Determine if the "Continue" button should be enabled
  const canContinue = hasActiveGame || localSaveExists;

  const baseButtonClasses = "group w-full flex items-center p-4 text-xl font-semibold text-slate-200 rounded-lg transition-all duration-200 border-l-4 border-transparent";
  const hoverClasses = "hover:bg-slate-700/50 hover:border-yellow-400";
  const iconClasses = "h-7 w-7 mr-4 text-slate-400 group-hover:text-yellow-300 transition-colors";

  const continueButtonClasses = "group w-full flex items-center p-4 text-xl font-semibold text-white rounded-lg transition-all duration-200 border-l-4 border-green-500 bg-green-600/30 hover:bg-green-600/50 hover:border-green-400";
  const continueIconClasses = "h-7 w-7 mr-4 text-green-300 group-hover:text-white transition-colors animate-pulse";

  return (
    <div className="w-full max-w-4xl bg-slate-900/70 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-slate-700 animate-fade-in">
      <h1 className="text-5xl font-black text-center mb-10 tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-400" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
        EZ Play Deckbuilder
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Primary Actions Column */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-4">Start Joc</h2>
          {canContinue && (
            <button onClick={onContinue} className={continueButtonClasses}>
              <div className={continueIconClasses}><PlayIcon /></div>
              Continuă
            </button>
          )}
          <button onClick={onNewGame} className={`${baseButtonClasses} ${hoverClasses}`}>
            <div className={iconClasses}><PlusIcon /></div>
            Joc Nou
          </button>
          <button onClick={onLoadScenario} className={`${baseButtonClasses} ${hoverClasses}`}>
            <div className={iconClasses}><UploadIcon /></div>
            Încarcă Scenariu
          </button>
        </div>
        
        {/* Secondary Actions Column */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-4">Management & Info</h2>
          <button onClick={onShowHistory} className={`${baseButtonClasses} ${hoverClasses}`}>
            <div className={iconClasses}><HistoryIcon /></div>
            Istoric Companii
          </button>
          <button onClick={onShowProfile} className={`${baseButtonClasses} ${hoverClasses}`}>
            <div className={iconClasses}><ProfileIcon /></div>
            Profil Utilizator
          </button>
          {userRole === 'admin' && (
              <button onClick={onShowAdmin} className={`${baseButtonClasses} hover:bg-red-900/30 hover:border-red-500`}>
                <div className={`${iconClasses} group-hover:text-red-400`}><AdminIcon /></div>
                Administrare
              </button>
          )}
          <button onClick={onShowGameSetup} className={`${baseButtonClasses} ${hoverClasses}`}>
            <div className={iconClasses}><SlidersIcon /></div>
            Configurare Joc
          </button>
          <button onClick={onShowSettings} className={`${baseButtonClasses} ${hoverClasses}`}>
            <div className={iconClasses}><SettingsIcon /></div>
            Setări
          </button>
          <button onClick={onShowDocumentation} className={`${baseButtonClasses} ${hoverClasses}`}>
            <div className={iconClasses}><DocumentationIcon /></div>
            Regulament
          </button>
          <button onClick={onLogout} className={`${baseButtonClasses} hover:bg-red-900/50 hover:border-red-500`}>
            <div className={`${iconClasses} group-hover:text-red-400`}><LogoutIcon /></div>
            Deconectare
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
