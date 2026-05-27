import React, { createContext } from 'react';
import type { GameState, GameAction } from '../types';

interface IGameContext {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

// Cream contextul cu valori implicite undefined pentru a asigura verificarea la utilizare
export const GameContext = createContext<IGameContext | undefined>(undefined);
