import React from 'react';
import type { PlayerState } from '../types';
import { CashIcon, CapitalizationIcon, AiPlayerIcon } from './Icons';

interface PlayerHUDProps {
  players: PlayerState[];
  activePlayerIndex: number;
  positionClass?: string;
  isTurnTransitioning: boolean;
  onAdvanceToNextPlayer: () => void;
}

const PlayerHUD: React.FC<PlayerHUDProps> = ({ players, activePlayerIndex, positionClass = 'top-[340px]', isTurnTransitioning, onAdvanceToNextPlayer }) => {
  if (players.length <= 1) {
    return null; // Don't render the HUD for single-player games
  }

  const calculateCapitalization = (player: PlayerState): number => {
    const allCards = [...player.deck, ...player.hand, ...player.discard, ...player.activeConsultants];
    if (player.entrepreneur) allCards.push(player.entrepreneur);
    const cardValue = allCards.reduce((sum, card) => sum + card.cost, 0);
    return cardValue + player.cash;
  };
  
  const nextPlayerIndex = (activePlayerIndex + 1) % players.length;

  return (
    <div className={`absolute ${positionClass} left-1/2 -translate-x-1/2 z-20 w-full flex justify-center pointer-events-none`}>
      <div className="flex justify-center items-center space-x-4 bg-slate-900/70 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-700 pointer-events-auto">
        {players.map((player, index) => {
          const isActive = !isTurnTransitioning && index === activePlayerIndex;
          const isWaitingToStart = isTurnTransitioning && index === nextPlayerIndex;
          const isDimmed = isTurnTransitioning && !isWaitingToStart;
          
          const capitalization = calculateCapitalization(player);
          const totalCards = player.deck.length + player.hand.length + player.discard.length + player.activeConsultants.length + (player.entrepreneur ? 1 : 0);

          if (isWaitingToStart) {
            if (player.type === 'human') {
              return (
                <button
                  key={player.id}
                  onClick={onAdvanceToNextPlayer}
                  className="px-6 py-2 rounded-lg transition-all duration-300 bg-green-600/50 ring-2 ring-green-400 animate-pulse w-72 text-center"
                >
                  <h3 className="font-bold text-xl text-yellow-300">E rândul tău, {player.name}!</h3>
                  <p className="text-white">Click pentru a începe</p>
                </button>
              )
            } else { // AI Player
              return (
                <div
                  key={player.id}
                  className="px-6 py-2 rounded-lg transition-all duration-300 bg-purple-600/50 ring-2 ring-purple-400 w-72 text-center"
                >
                  <h3 className="font-bold text-xl text-yellow-300">E rândul lui {player.name}...</h3>
                  <p className="text-white animate-pulse">Gândește...</p>
                </div>
              )
            }
          }

          return (
            <div
              key={player.id}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-blue-600/50 ring-2 ring-blue-400' : 'bg-slate-800'} ${isDimmed ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center justify-center space-x-2">
                <h3 className={`font-bold text-lg ${isActive ? 'text-yellow-300' : 'text-slate-300'}`}>{player.name}</h3>
                {player.type === 'ai' && <AiPlayerIcon />}
              </div>
              <div className="flex items-center justify-center space-x-4 mt-1">
                <div className="flex items-center space-x-1" title="Cash">
                  <CashIcon />
                  <span className="text-xl font-mono text-yellow-400">{player.cash}</span>
                </div>
                <div className="flex items-center space-x-1" title="Capitalizare">
                  <CapitalizationIcon />
                  <span className="text-xl font-mono text-sky-400">{capitalization}</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400" title="Număr total de cărți">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2 0v12h6V4H7z" /></svg>
                    <span className="text-lg font-mono">{totalCards}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerHUD;