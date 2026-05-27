import React, { useEffect, useRef } from 'react';
import type { ActionLogEntry, GameState } from '../types';
import { formatActionToLogMessage } from '../game-logic/log-formatter';

interface ActionLogProps {
  log: ActionLogEntry[];
  state: GameState;
}

const ActionLog: React.FC<ActionLogProps> = ({ log, state }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const messageTypeClasses = {
    player: 'text-slate-300',
    system: 'text-yellow-400 italic',
    bonus: 'text-green-400 font-semibold',
    error: 'text-red-500 font-bold uppercase',
  };

  return (
    <div className="fixed bottom-4 left-4 z-30 w-80 h-64 bg-slate-900/80 backdrop-blur-sm rounded-lg shadow-2xl border border-slate-700 flex flex-col pointer-events-auto">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider p-2 border-b border-slate-700 text-center">Jurnal Acțiuni</h3>
      <div className="flex-grow overflow-y-auto p-2 text-sm font-mono">
        {log.map((logEntry, index) => {
          const formatted = formatActionToLogMessage(logEntry, state);
          if (!formatted) return null;
          return (
            <p key={index} className={`mb-1 ${messageTypeClasses[formatted.type]}`}>
              {formatted.message}
            </p>
          );
        })}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default ActionLog;