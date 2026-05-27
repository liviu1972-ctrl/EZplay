import React, { useState, useEffect } from 'react';
import type { Card, GameConfig } from '../types';

interface ConsultantsSetupProps {
  onBack: () => void;
  allAvailableConsultants: Card[];
  gameConfig: GameConfig;
}

const ConsultantsSetup: React.FC<ConsultantsSetupProps> = ({ onBack, allAvailableConsultants, gameConfig }) => {
  // The default value is the total number of unique consultant cards available.
  const defaultMax = allAvailableConsultants.length;

  const [maxActive, setMaxActive] = useState(() => {
    const saved = localStorage.getItem('consultantsConfig_maxActive');
    // If nothing is saved, use the value from the merged config.
    return saved !== null ? parseInt(saved, 10) : gameConfig.maxActiveConsultants;
  });

  useEffect(() => {
    localStorage.setItem('consultantsConfig_maxActive', String(maxActive));
  }, [maxActive]);

  return (
    <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase tracking-wider">Configurare Consultanți</h1>
      
      <div className="space-y-6 border-t border-b border-slate-700 py-6">
        <div>
          <label htmlFor="max-consultants-input" className="text-lg text-slate-300">
            Număr maxim de consultanți activi
            <p className="text-sm text-slate-500">Limitează câți consultanți poți avea în joc simultan. (Implicit: {gameConfig.maxActiveConsultants})</p>
          </label>
          <input
            type="number"
            id="max-consultants-input"
            value={maxActive}
            onChange={(e) => setMaxActive(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="mt-2 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button onClick={onBack} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          Înapoi
        </button>
      </div>
    </div>
  );
};

export default ConsultantsSetup;