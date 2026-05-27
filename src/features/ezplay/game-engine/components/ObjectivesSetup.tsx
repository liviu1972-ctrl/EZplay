import React, { useState, useEffect } from 'react';
import type { GameObjectiveType } from '../types';

interface ObjectivesSetupProps {
  onBack: () => void;
}

const ObjectivesSetup: React.FC<ObjectivesSetupProps> = ({ onBack }) => {
  const [objectiveType, setObjectiveType] = useState<GameObjectiveType>(() => (localStorage.getItem('gameObjectiveType') as GameObjectiveType) || 'timeLimit');
  const [objectiveYears, setObjectiveYears] = useState(() => parseInt(localStorage.getItem('gameObjectiveValue_timeLimit') || '10', 10));
  const [objectiveCash, setObjectiveCash] = useState(() => parseInt(localStorage.getItem('gameObjectiveValue_cashGoal') || '20', 10));
  const [objectiveCap, setObjectiveCap] = useState(() => parseInt(localStorage.getItem('gameObjectiveValue_capitalizationGoal') || '100', 10));

  useEffect(() => { localStorage.setItem('gameObjectiveType', objectiveType); }, [objectiveType]);
  useEffect(() => { localStorage.setItem('gameObjectiveValue_timeLimit', String(objectiveYears)); }, [objectiveYears]);
  useEffect(() => { localStorage.setItem('gameObjectiveValue_cashGoal', String(objectiveCash)); }, [objectiveCash]);
  useEffect(() => { localStorage.setItem('gameObjectiveValue_capitalizationGoal', String(objectiveCap)); }, [objectiveCap]);

  const objectives: { type: GameObjectiveType; title: string; description: string }[] = [
      { type: 'timeLimit', title: 'Limită de Timp', description: 'Jocul se termină după un nr. de ani. Câștigă jucătorul cu cea mai mare capitalizare.' },
      { type: 'cashGoal', title: 'Obiectiv de Cash', description: 'Primul jucător care atinge suma specificată de cash câștigă instant.' },
      { type: 'capitalizationGoal', title: 'Obiectiv Capitalizare', description: 'Primul jucător care atinge valoarea specificată a capitalizării câștigă.' }
  ];

  return (
    <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white">
        <h1 className="text-3xl font-bold text-center mb-6 uppercase tracking-wider">Configurare Obiective</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-b border-slate-700 py-6">
              {objectives.map((obj) => {
                  const isSelected = objectiveType === obj.type;
                  return (
                      <div
                          key={obj.type}
                          onClick={() => setObjectiveType(obj.type)}
                          className={`p-4 bg-slate-700/50 rounded-lg cursor-pointer transition-all duration-200 border-2 ${isSelected ? 'border-yellow-400' : 'border-slate-700 hover:border-slate-600'}`}
                      >
                          <h3 className={`font-bold text-lg ${isSelected ? 'text-yellow-300' : 'text-white'}`}>{obj.title}</h3>
                          <p className="text-sm text-slate-400 mt-1 mb-3 h-16">{obj.description}</p>
                          
                          {obj.type === 'timeLimit' && (
                              <div>
                                  <label htmlFor="years-input" className="text-sm font-bold text-slate-300">Număr de Ani</label>
                                  <input type="number" id="years-input" value={objectiveYears} onChange={(e) => setObjectiveYears(Math.max(1, parseInt(e.target.value, 10) || 1))} onClick={e => e.stopPropagation()} onFocus={() => setObjectiveType('timeLimit')} className="mt-1 w-full px-2 py-1 bg-slate-800 border border-slate-600 rounded-md" />
                              </div>
                          )}
                          {obj.type === 'cashGoal' && (
                              <div>
                                  <label htmlFor="cash-input" className="text-sm font-bold text-slate-300">Sumă Cash ($)</label>
                                  <input type="number" id="cash-input" value={objectiveCash} onChange={(e) => setObjectiveCash(Math.max(1, parseInt(e.target.value, 10) || 1))} onClick={e => e.stopPropagation()} onFocus={() => setObjectiveType('cashGoal')} className="mt-1 w-full px-2 py-1 bg-slate-800 border border-slate-600 rounded-md" />
                              </div>
                          )}
                          {obj.type === 'capitalizationGoal' && (
                              <div>
                                  <label htmlFor="cap-input" className="text-sm font-bold text-slate-300">Capitalizare ($)</label>
                                  <input type="number" id="cap-input" value={objectiveCap} onChange={(e) => setObjectiveCap(Math.max(1, parseInt(e.target.value, 10) || 1))} onClick={e => e.stopPropagation()} onFocus={() => setObjectiveType('capitalizationGoal')} className="mt-1 w-full px-2 py-1 bg-slate-800 border border-slate-600 rounded-md" />
                              </div>
                          )}
                      </div>
                  );
              })}
        </div>

        <div className="mt-8 text-center">
            <button
            onClick={onBack}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 text-lg"
            >
            Înapoi
            </button>
        </div>
    </div>
  );
};

export default ObjectivesSetup;
