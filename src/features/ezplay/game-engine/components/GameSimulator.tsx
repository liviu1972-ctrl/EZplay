
import React, { useState, useMemo, useEffect } from 'react';
import type { AiStrategy, AiSkillLevel, GameConfig, BonusBuyRule, GameObjective, GameObjectiveType, ActionLogEntry, HudCalculationMode, Card, AnafPenaltyMode } from '../types';
import { runSingleSimulation } from '../game-logic/simulation-runner';
import { getDefaultMarketSetup } from '../game-logic/market-config';
import { useAuth } from '../../platform/auth/AuthContext';
import { getUserProfile } from '../../platform/user/userService';
import type { UserRole } from '../../platform/user/types';

interface GameSimulatorProps {
  onBack: () => void;
  allAvailableEntrepreneurs: Card[];
  allAvailableStandardCards: Card[];
}

type AiPlayerConfig = {
    id: number;
    strategy: AiStrategy;
    skillLevel: AiSkillLevel;
};

// --- NEW: Result Types ---
interface SingleGameResult {
    winnerPlayerIndex: number | null;
    winnerName?: string;
    gameOverReason: string;
    durationTurns: number;
    finalYear: number;
    finalQuarter: number;
    actionLog: ActionLogEntry[];
}

interface SimulationBatchResult {
    totalGames: number;
    playerStats: {
        name: string;
        wins: number;
    }[];
    gameResults: SingleGameResult[];
}


const strategies: { id: AiStrategy; name: string }[] = [
    { id: 'balanced', name: 'Echilibrat' },
    { id: 'aggressive', name: 'Agresiv' },
    { id: 'profit-focused', name: 'Focalizat pe Profit' },
    { id: 'early-rusher', name: 'Start Rapid' },
    { id: 'deck-thinner', name: 'Optimizator Pachet' },
];

const skillLevels: { id: AiSkillLevel; name: string }[] = [
    { id: 'novice', name: 'Novice' },
    { id: 'competent', name: 'Competent' },
    { id: 'expert', name: 'Expert' },
    { id: 'master', name: 'Maestru' },
];

const DurationChart: React.FC<{ data: { year: number; count: number }[] }> = ({ data }) => {
    if (!data || data.length === 0) return null;

    const SVG_WIDTH = 600;
    const SVG_HEIGHT = 250;
    const PADDING = { top: 20, right: 20, bottom: 40, left: 40 };

    const maxCount = Math.max(...data.map(d => d.count));
    const maxYear = Math.max(...data.map(d => d.year));
    
    const yearRange = Array.from({ length: maxYear }, (_, i) => i + 1);
    const dataMap = new Map<number, number>(data.map(item => [item.year, item.count]));

    const chartWidth = SVG_WIDTH - PADDING.left - PADDING.right;
    const chartHeight = SVG_HEIGHT - PADDING.top - PADDING.bottom;

    const barWidth = chartWidth / yearRange.length;
    const yScale = chartHeight / maxCount;

    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold text-center mb-2 text-slate-300">Distribuția Duratei Jocurilor Terminate prin Faliment</h3>
            <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-auto bg-slate-900/50 rounded-lg">
                <text x={PADDING.left - 10} y={PADDING.top} dy="0.3em" fill="#94a3b8" textAnchor="end" fontSize="12">{maxCount}</text>
                <line x1={PADDING.left} y1={PADDING.top} x2={SVG_WIDTH - PADDING.right} y2={PADDING.top} stroke="rgba(255,255,255,0.1)" />
                <text x={PADDING.left - 10} y={SVG_HEIGHT - PADDING.bottom} dy="0.3em" fill="#94a3b8" textAnchor="end" fontSize="12">0</text>
                <line x1={PADDING.left} y1={SVG_HEIGHT - PADDING.bottom} x2={SVG_WIDTH - PADDING.right} y2={SVG_HEIGHT - PADDING.bottom} stroke="#94a3b8" />
                <line x1={PADDING.left} y1={PADDING.top} x2={PADDING.left} y2={SVG_HEIGHT - PADDING.bottom} stroke="#94a3b8" />
                <text x={15} y={SVG_HEIGHT/2} transform={`rotate(-90 15,${SVG_HEIGHT/2})`} fill="#94a3b8" textAnchor="middle" fontSize="12">Nr. Partide</text>

                {yearRange.map((year, index) => {
                    const count = dataMap.get(year) || 0;
                    const maxYearInDataset = data.length > 0 ? data[data.length - 1].year : 0;
                    if (count === 0 && data.length > 0 && year > maxYearInDataset) return null;
                    const barHeight = count * yScale;
                    const x = PADDING.left + index * barWidth;
                    const y = SVG_HEIGHT - PADDING.bottom - barHeight;
                    
                    return (
                        <g key={year}>
                            <rect x={x + barWidth * 0.1} y={y} width={barWidth * 0.8} height={barHeight} fill="#ef4444" className="transition-all"><title>Anul {year}: {count} partide</title></rect>
                            <text x={x + barWidth / 2} y={SVG_HEIGHT - PADDING.bottom + 15} textAnchor="middle" fontSize="10" fill="#94a3b8">{year}</text>
                        </g>
                    );
                })}
                 <text x={SVG_WIDTH/2} y={SVG_HEIGHT - 5} fill="#94a3b8" textAnchor="middle" fontSize="12">Anul falimentului</text>
            </svg>
        </div>
    );
};


const GameSimulator: React.FC<GameSimulatorProps> = ({ onBack, allAvailableEntrepreneurs, allAvailableStandardCards }) => {
    const { authState } = useAuth();
    const [userRole, setUserRole] = useState<UserRole>('standard'); // Default
    const [maxGames, setMaxGames] = useState(50); // Default limit

    const [numberOfGames, setNumberOfGames] = useState(50);
    const [playerConfigs, setPlayerConfigs] = useState<AiPlayerConfig[]>([
        { id: 1, strategy: 'balanced', skillLevel: 'expert' },
        { id: 2, strategy: 'aggressive', skillLevel: 'expert' },
    ]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('Așteptare...');
    const [results, setResults] = useState<SimulationBatchResult | null>(null);
    
    useEffect(() => {
        const fetchRole = async () => {
            if (authState.user) {
                const profile = await getUserProfile(authState.user.uid);
                if (profile) {
                    setUserRole(profile.role);
                    if (profile.role === 'premium' || profile.role === 'admin') {
                        setMaxGames(10000);
                        setNumberOfGames(1000);
                    } else if (profile.role === 'standard') {
                        setMaxGames(50);
                        setNumberOfGames(50);
                    }
                }
            } else {
                // Guest mode
                setMaxGames(10);
                setNumberOfGames(10);
            }
        };
        fetchRole();
    }, [authState.user]);

    const durationData = useMemo(() => {
        if (!results) return null;
    
        const bankruptcyGames = results.gameResults.filter(result => 
            result.gameOverReason.startsWith('BANKRUPTCY')
        );
    
        if (bankruptcyGames.length === 0) return null;
    
        const frequencyMap = new Map<number, number>();
        bankruptcyGames.forEach(result => {
            const year = result.finalYear;
            frequencyMap.set(year, (frequencyMap.get(year) || 0) + 1);
        });
    
        return Array.from(frequencyMap.entries())
            .map(([year, count]) => ({ year, count }))
            .sort((a, b) => a.year - b.year);
    }, [results]);


    const handlePlayerConfigChange = (index: number, field: keyof AiPlayerConfig, value: string) => {
        setPlayerConfigs(currentConfigs => {
            const newConfigs = [...currentConfigs];
            newConfigs[index] = { ...newConfigs[index], [field]: value };
            return newConfigs;
        });
    };

    const addPlayer = () => {
        if (playerConfigs.length < 4) {
            setPlayerConfigs(prev => [...prev, { id: Date.now(), strategy: 'balanced', skillLevel: 'expert' }]);
        }
    };

    const removePlayer = (index: number) => {
        if (playerConfigs.length > 1) {
            setPlayerConfigs(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleStartSimulation = async () => {
        if (numberOfGames > maxGames) {
            alert(`Limita pentru rolul tău este de ${maxGames} partide. Devino 'Magnat' pentru acces nelimitat.`);
            return;
        }

        setIsSimulating(true);
        setResults(null);
        setProgress(0);
        setStatusText('Se pregătește simularea...');

        const simulationPlayerConfigs = playerConfigs.map((p, index) => ({
            name: `AI ${index + 1} (${p.strategy})`,
            strategy: p.strategy,
            aiSkillLevel: p.skillLevel,
        }));

        const savedExpansions = localStorage.getItem('activeExpansions');
        let activeExpansionIds = savedExpansions ? JSON.parse(savedExpansions) : ['base-game'];
        if (!activeExpansionIds.includes('base-game')) activeExpansionIds.push('base-game');

        const gameConfig: GameConfig = {
            eventsStartYear: parseInt(localStorage.getItem('eventsConfig_startYear') || '2', 10),
            maxActiveConsultants: parseInt(localStorage.getItem('consultantsConfig_maxActive') || '99', 10),
            shuffleMarketOnTurnEnd: localStorage.getItem('baseGameConfig_shuffleMarket') === 'true',
            bonusBuyRule: (localStorage.getItem('baseGameConfig_bonusBuyRule') as BonusBuyRule) || 'no_combo',
            hudCalculationMode: 'empty',
            marketConfig: JSON.parse(localStorage.getItem('marketSlotsConfig_v2') || 'null') || getDefaultMarketSetup(),
            startingCash: parseInt(localStorage.getItem('startingCash') || '10', 10),
            startingDeckSize: parseInt(localStorage.getItem('startingDeckSize') || '10', 10),
            startingDeckMaxCost: parseInt(localStorage.getItem('startingDeckMaxCost') || '0', 10),
            isAnafEnabled: localStorage.getItem('taxesConfig_anafEnabled') === 'true',
            anafPenaltyMode: (localStorage.getItem('taxesConfig_anafPenaltyMode') as AnafPenaltyMode) || 'incremental',
            isAccountingEnabled: localStorage.getItem('taxesConfig_accountingEnabled') === 'true',
        };

        const getObjectiveFromStorage = (): GameObjective => {
            const isEnabled = localStorage.getItem('gameObjective_enabled') === 'true';
            if (!isEnabled) return { type: 'infinite', value: 0 };
            const type = (localStorage.getItem('gameObjectiveType') as GameObjectiveType) || 'timeLimit';
            let value = 0;
            switch (type) {
                case 'timeLimit': value = parseInt(localStorage.getItem('gameObjectiveValue_timeLimit') || '10', 10); break;
                case 'cashGoal': value = parseInt(localStorage.getItem('gameObjectiveValue_cashGoal') || '20', 10); break;
                case 'capitalizationGoal': value = parseInt(localStorage.getItem('gameObjectiveValue_capitalizationGoal') || '100', 10); break;
                default: return { type: 'infinite', value: 0 };
            }
            return { type, value };
        };
        const objective = getObjectiveFromStorage();
        
        const allGameResults: SingleGameResult[] = [];

        for (let i = 0; i < numberOfGames; i++) {
            setStatusText(`Se simulează partida ${i + 1} / ${numberOfGames}...`);
            await new Promise(resolve => setTimeout(resolve, 0));

            const result = runSingleSimulation(simulationPlayerConfigs, activeExpansionIds, gameConfig, objective, allAvailableEntrepreneurs, allAvailableStandardCards);
            const { finalState, durationTurns } = result;
            const winner = finalState.winnerPlayerIndex !== null ? finalState.players[finalState.winnerPlayerIndex] : null;

            allGameResults.push({
                winnerPlayerIndex: finalState.winnerPlayerIndex,
                winnerName: winner?.name,
                gameOverReason: finalState.gameOverReason || 'Necunoscut',
                durationTurns,
                finalYear: finalState.currentYear,
                finalQuarter: finalState.currentQuarter,
                actionLog: finalState.actionLog,
            });
            
            setProgress(((i + 1) / numberOfGames) * 100);
        }

        const aggregatedResults: SimulationBatchResult = {
            totalGames: numberOfGames,
            playerStats: simulationPlayerConfigs.map((p, index) => ({
                name: p.name,
                wins: allGameResults.filter(r => r.winnerPlayerIndex === index).length,
            })),
            gameResults: allGameResults,
        };
        
        console.log("Rezultate agregate:", aggregatedResults);
        setResults(aggregatedResults);
        setStatusText(`Simulare finalizată pentru ${numberOfGames} partide.`);
        setIsSimulating(false);
    };

    const handleExportResults = () => {
        if (!results) return;

        const jsonString = JSON.stringify(results, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ezplay_simulation_results_${new Date().toISOString()}.json`;
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    return (
        <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wider">Simulator de Jocuri</h1>
                {authState.state === 'guest' && <p className="text-sm text-yellow-400 mt-2">Mod Oaspete: Limitat la 10 simulări. Autentifică-te pentru mai multe.</p>}
                {userRole === 'standard' && <p className="text-sm text-blue-400 mt-2">Cont Standard: Limitat la 50 simulări. Upgrade la Magnat pentru nelimitat.</p>}
                {(userRole === 'premium' || userRole === 'admin') && <p className="text-sm text-green-400 mt-2 font-bold">Cont Magnat: Simulări Nelimitate.</p>}
            </div>

            <div className={`space-y-6 border-t border-b border-slate-700 py-6 ${isSimulating ? 'opacity-50' : ''}`}>
                <div>
                    <label htmlFor="number-of-games" className="text-lg text-slate-300">
                        Număr de Partide de Simulat (Max: {maxGames})
                    </label>
                    <input
                        type="number" id="number-of-games"
                        value={numberOfGames}
                        onChange={(e) => setNumberOfGames(Math.min(maxGames, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                        className="mt-1 w-full max-w-xs px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm"
                        disabled={isSimulating}
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-300">Configurare Jucători AI</h2>
                    {playerConfigs.map((config, index) => (
                        <div key={config.id} className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center p-3 bg-slate-700/50 rounded-md">
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Strategie AI {index + 1}</label>
                                <select value={config.strategy} onChange={(e) => handlePlayerConfigChange(index, 'strategy', e.target.value)} className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md" disabled={isSimulating}>
                                    {strategies.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Nivel Abilitate</label>
                                <select value={config.skillLevel} onChange={(e) => handlePlayerConfigChange(index, 'skillLevel', e.target.value)} className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md" disabled={isSimulating}>
                                    {skillLevels.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                            <button
                                onClick={() => removePlayer(index)}
                                disabled={playerConfigs.length <= 1 || isSimulating}
                                className="mt-6 p-2 rounded-full text-slate-400 hover:bg-red-800/50 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Șterge Jucător"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    ))}
                    {playerConfigs.length < 4 && (
                        <button onClick={addPlayer} className="px-4 py-2 text-sm bg-slate-600 hover:bg-slate-500 rounded-md transition-colors font-semibold" disabled={isSimulating}>
                            + Adaugă Jucător
                        </button>
                    )}
                </div>
            </div>
            
            <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-semibold">{statusText}</span>
                    <span className="text-slate-300 font-bold">{Math.floor(progress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4">
                    <div className="bg-blue-600 h-4 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>

                {results && (
                    <div className="animate-fade-in pt-4">
                         <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-yellow-300">Rezultate Agregate</h2>
                            <button
                                onClick={handleExportResults}
                                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                            >
                                Exportă Rezultate (JSON)
                            </button>
                        </div>
                        <table className="w-full text-left bg-slate-900/50 rounded-lg overflow-hidden">
                            <thead className="bg-slate-700/50">
                                <tr>
                                    <th className="p-3 uppercase text-sm font-bold text-slate-300">Jucător</th>
                                    <th className="p-3 uppercase text-sm font-bold text-slate-300 text-center">Victorii</th>
                                    <th className="p-3 uppercase text-sm font-bold text-slate-300 text-center">Rată Victorie</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.playerStats.map((stat, index) => (
                                    <tr key={index} className="border-b border-slate-700 last:border-b-0">
                                        <td className="p-3 font-semibold">{stat.name}</td>
                                        <td className="p-3 font-mono text-center">{stat.wins}</td>
                                        <td className="p-3 font-mono text-center text-lg font-bold text-green-400">
                                            {((stat.wins / results.totalGames) * 100).toFixed(2)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {durationData ? (
                            <DurationChart data={durationData} />
                        ) : (
                            <p className="text-center text-slate-400 mt-6">Nicio partidă nu s-a încheiat prin faliment.</p>
                        )}

                    </div>
                )}
            </div>
            
            <div className="mt-8 flex justify-between items-center">
                <button onClick={onBack} className="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 transition-colors" disabled={isSimulating}>
                    Înapoi la Meniu
                </button>
                <button
                    onClick={handleStartSimulation}
                    disabled={isSimulating || numberOfGames > maxGames}
                    className="px-10 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors text-2xl disabled:bg-slate-700 disabled:cursor-not-allowed"
                >
                    {isSimulating ? 'Se simulează...' : `Start Simulare (${numberOfGames} partide)`}
                </button>
            </div>
        </div>
    );
};

export default GameSimulator;
