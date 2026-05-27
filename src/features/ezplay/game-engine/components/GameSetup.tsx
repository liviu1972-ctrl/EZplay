import React, { useState, useEffect } from 'react';
import EventsSetup from './EventsSetup';
import ConsultantsSetup from './ConsultantsSetup';
import BaseGameSetup from './BaseGameSetup';
import ObjectivesSetup from './ObjectivesSetup'; // NEW IMPORT
import TaxesSetup from './TaxesSetup';
import type { Card, GameConfig } from '../types';

interface GameSetupProps {
  onClose: () => void;
  availableExpansions: { id: string; name: string; }[];
  allEvents: Card[];
  allConsultants: Card[];
  activeExpansionIds: string[];
  onActiveExpansionsChange: (newIds: string[]) => void;
  gameConfig: GameConfig;
}

const GameSetup: React.FC<GameSetupProps> = ({ onClose, availableExpansions, allEvents, allConsultants, activeExpansionIds, onActiveExpansionsChange, gameConfig }) => {
  const [view, setView] = useState<'main' | 'events' | 'consultants' | 'base-game' | 'objectives' | 'taxes'>('main');
  const [isObjectiveEnabled, setIsObjectiveEnabled] = useState<boolean>(() => {
    return localStorage.getItem('gameObjective_enabled') === 'true';
  });

  useEffect(() => { localStorage.setItem('gameObjective_enabled', String(isObjectiveEnabled)); }, [isObjectiveEnabled]);


  const handleToggleExpansion = (id: string, isChecked: boolean) => {
    onActiveExpansionsChange(
      isChecked
        ? [...activeExpansionIds, id]
        : activeExpansionIds.filter(expId => expId !== id)
    );
  };

  const hasConfigurableOptions = (id: string) => ['events', 'consultants', 'base-game', 'taxes'].includes(id);

  if (view === 'events') return <EventsSetup onBack={() => setView('main')} allAvailableEvents={allEvents} gameConfig={gameConfig} />;
  if (view === 'consultants') return <ConsultantsSetup onBack={() => setView('main')} allAvailableConsultants={allConsultants} gameConfig={gameConfig} />;
  if (view === 'base-game') return <BaseGameSetup onBack={() => setView('main')} gameConfig={gameConfig} />;
  if (view === 'objectives') return <ObjectivesSetup onBack={() => setView('main')} />;
  if (view === 'taxes') return <TaxesSetup onBack={() => setView('main')} />;

  return (
    <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase tracking-wider">Configurare Joc</h1>
      
      {/* Expansions Section */}
      <div className="flex flex-col space-y-4 border-t border-b border-slate-700 py-4">
        <h2 className="text-lg font-bold text-slate-300 mb-2">Extensii Active</h2>
        {availableExpansions.map(exp => (
          <div key={exp.id} className="flex items-center justify-between p-2 rounded-md hover:bg-slate-700/50">
            <label htmlFor={`toggle-${exp.id}`} className="text-lg text-slate-300 flex-grow cursor-pointer">
              {exp.name}
            </label>
            <div className="flex items-center space-x-4">
              {hasConfigurableOptions(exp.id) && (
                 <button 
                    onClick={() => setView(exp.id as 'events' | 'consultants' | 'base-game' | 'taxes')}
                    className="px-3 py-1 text-sm bg-slate-600 hover:bg-slate-500 rounded-md transition-colors font-semibold"
                 >
                   Configurează
                 </button>
              )}
              <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                <input
                    type="checkbox"
                    name={`toggle-${exp.id}`}
                    id={`toggle-${exp.id}`}
                    checked={activeExpansionIds.includes(exp.id)}
                    onChange={(e) => handleToggleExpansion(exp.id, e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <label
                    htmlFor={`toggle-${exp.id}`}
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 cursor-pointer"
                ></label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Game Rules Section */}
      <div className="flex flex-col space-y-4 border-b border-slate-700 py-6">
          <h2 className="text-lg font-bold text-slate-300 mb-2">Reguli de Joc</h2>
          <div className="flex items-center justify-between p-2 rounded-md hover:bg-slate-700/50">
            <label htmlFor="toggle-objectives" className="text-lg text-slate-300 flex-grow cursor-pointer">
              Obiective de Victorie
              <p className="text-sm text-slate-400">Activează condiții de final de joc. Dacă este dezactivat, se joacă 'Joc Infinit'.</p>
            </label>
            <div className="flex items-center space-x-4">
              <button 
                  onClick={() => setView('objectives')}
                  disabled={!isObjectiveEnabled}
                  className="px-3 py-1 text-sm bg-slate-600 hover:bg-slate-500 rounded-md transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Configurează
              </button>
              <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                <input
                    type="checkbox"
                    name="toggle-objectives"
                    id="toggle-objectives"
                    checked={isObjectiveEnabled}
                    onChange={(e) => setIsObjectiveEnabled(e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500"
                />
                <label
                    htmlFor="toggle-objectives"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 cursor-pointer"
                ></label>
              </div>
            </div>
          </div>
      </div>


      <div className="mt-8 text-center">
        <button
          onClick={onClose}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 text-lg"
        >
          Înapoi
        </button>
      </div>

      <style>{`
          .toggle-checkbox:checked + .toggle-label {
            background-color: #22c55e; /* green-500 */
          }
          .toggle-checkbox:disabled:checked + .toggle-label {
            background-color: #166534; /* green-800 */
          }
        `}</style>
    </div>
  );
};

export default GameSetup;
