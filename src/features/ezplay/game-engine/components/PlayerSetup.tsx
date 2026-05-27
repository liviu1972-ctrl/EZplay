import React, { useState, useEffect } from 'react';
import type { AiStrategy, AiSkillLevel } from '../types';

type PlayerConfig = {
    type: 'human' | 'ai';
    name: string;
    strategy: AiStrategy;
    aiSkillLevel?: AiSkillLevel;
};

const strategies: { id: AiStrategy; name: string; description: string }[] = [
    { id: 'balanced', name: 'Echilibrat', description: 'O strategie generală care echilibrează achizițiile de cost, producția și vânzările.' },
    { id: 'aggressive', name: 'Creștere Agresivă', description: 'Se concentrează pe achiziționarea celor mai scumpe cărți pentru a crește rapid capitalizarea.' },
    { id: 'profit-focused', name: 'Focalizat pe Profit', description: 'Prioritizează eficiența, căutând cărți cu cheltuieli mici și venituri mari.' },
    { id: 'early-rusher', name: 'Start Rapid', description: 'Cumpără agresiv cărți ieftine la începutul jocului pentru a construi rapid un motor economic.' },
    { id: 'deck-thinner', name: 'Optimizator Pachet', description: 'Caută activ oportunități de a renunța la cărțile de start pentru un pachet mai eficient.' },
];

const skillLevels: { id: AiSkillLevel; name: string }[] = [
    { id: 'novice', name: 'Novice' },
    { id: 'competent', name: 'Competent' },
    { id: 'expert', name: 'Expert' },
    { id: 'master', name: 'Maestru' },
];


const PlayerSetup: React.FC = () => {
    const [playerConfigs, setPlayerConfigs] = useState<PlayerConfig[]>(() => {
        const saved = localStorage.getItem('playerConfiguration');
        return saved ? JSON.parse(saved) : [{ type: 'human', name: 'Jucător 1', strategy: 'balanced' }];
    });

    useEffect(() => { localStorage.setItem('playerConfiguration', JSON.stringify(playerConfigs)); }, [playerConfigs]);
    
    const handlePlayerCountChange = (count: number) => {
        setPlayerConfigs(currentConfigs => {
            const newConfigs = [...currentConfigs];
            if (count > newConfigs.length) {
                for (let i = newConfigs.length; i < count; i++) {
                    newConfigs.push({ type: 'ai', name: `Jucător ${i + 1}`, strategy: 'balanced', aiSkillLevel: 'novice' });
                }
            } else {
                newConfigs.length = count;
            }
            return newConfigs;
        });
    };

    const handlePlayerConfigChange = (index: number, field: keyof PlayerConfig, value: string) => {
        setPlayerConfigs(currentConfigs => {
            const newConfigs = [...currentConfigs];
            const oldConfig = { ...newConfigs[index] };
            const newConfig = { ...oldConfig, [field]: value };
            
            if (field === 'type' && value === 'ai' && !oldConfig.aiSkillLevel) {
                newConfig.aiSkillLevel = 'novice';
            }
            
            newConfigs[index] = newConfig;
            return newConfigs;
        });
    };
    
    return (
        <div className="flex flex-col space-y-4 border-t border-b border-slate-700 py-6">
          <h2 className="text-xl font-bold text-slate-300">Configurare Jucători</h2>
          <div>
              <label htmlFor="player-count-input" className="text-lg text-slate-300">Număr de jucători</label>
              <input
                  type="number" id="player-count-input"
                  value={playerConfigs.length}
                  onChange={(e) => handlePlayerCountChange(Math.max(1, Math.min(4, parseInt(e.target.value, 10) || 1)))}
                  className="mt-1 w-24 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
          </div>
          <div className="space-y-3">
              {playerConfigs.map((config, index) => (
                  <div key={index} className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr] gap-3 p-3 bg-slate-700/50 rounded-md">
                      <input
                          type="text" value={config.name}
                          onChange={(e) => handlePlayerConfigChange(index, 'name', e.target.value)}
                          className="col-span-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          aria-label={`Nume Jucător ${index + 1}`}
                      />
                      <select
                          value={config.type}
                          onChange={(e) => handlePlayerConfigChange(index, 'type', e.target.value)}
                          className="col-span-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                           aria-label={`Tip Jucător ${index + 1}`}
                      >
                          <option value="human">Uman</option>
                          <option value="ai">AI</option>
                      </select>
                      {config.type === 'ai' && (
                          <>
                              <select
                                  value={config.strategy}
                                  onChange={(e) => handlePlayerConfigChange(index, 'strategy', e.target.value)}
                                  className="col-span-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  aria-label={`Strategie AI pentru Jucător ${index + 1}`}
                              >
                                  {strategies.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                              </select>
                               <select
                                  value={config.aiSkillLevel}
                                  onChange={(e) => handlePlayerConfigChange(index, 'aiSkillLevel', e.target.value)}
                                  className="col-span-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  aria-label={`Nivel Inteligență AI pentru Jucător ${index + 1}`}
                              >
                                  {skillLevels.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                              </select>
                          </>
                      )}
                  </div>
              ))}
          </div>
        </div>
    );
};

export default PlayerSetup;