import React, { useState, useEffect } from 'react';
import { getDefaultMarketSetup } from '../game-logic/market-config';
import type { MarketSlotConfig, AssetTypeFilter, CostOperator } from '../game-logic/market-config';
import type { BonusBuyRule, GameConfig, HudCalculationMode } from '../types';

interface BaseGameSetupProps {
  onBack: () => void;
  gameConfig: GameConfig;
}

const STORAGE_KEY_MARKET = 'marketSlotsConfig_v2';
const STORAGE_KEY_DECK_COST = 'startingDeckMaxCost';
const STORAGE_KEY_BONUS_RULE = 'baseGameConfig_bonusBuyRule';
const STORAGE_KEY_START_CASH = 'startingCash';
const STORAGE_KEY_DECK_SIZE = 'startingDeckSize';
const STORAGE_KEY_HUD_MODE = 'baseGameConfig_hudMode';


const MarketSlotEditor: React.FC<{
  slotConfig: MarketSlotConfig;
  onChange: (newConfig: MarketSlotConfig) => void;
  slotIndex: number;
}> = ({ slotConfig, onChange, slotIndex }) => {
  
  const handleFilterChange = (key: keyof MarketSlotConfig['filters'], value: any) => {
    onChange({ ...slotConfig, filters: { ...slotConfig.filters, [key]: value } });
  };
  
  const isDisabled = slotConfig.filters.isEmpty;

  return (
    <div className={`p-4 rounded-lg bg-slate-700/50 border border-slate-600 transition-opacity ${isDisabled ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-slate-300">Slot Piață {slotIndex + 1}</h3>
        <div className="flex items-center space-x-2">
            <label htmlFor={`empty-toggle-${slotIndex}`} className="text-sm text-slate-400 cursor-pointer">Gol/Extra</label>
            <input
                type="checkbox"
                id={`empty-toggle-${slotIndex}`}
                checked={slotConfig.filters.isEmpty}
                onChange={(e) => handleFilterChange('isEmpty', e.target.checked)}
                className="w-5 h-5 rounded text-blue-500 bg-slate-600 border-slate-500 focus:ring-blue-500"
            />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="col-span-1 md:col-span-2">
          <label htmlFor={`title-${slotIndex}`} className="block text-sm font-medium text-slate-400 mb-1">Titlu Slot</label>
          <input
            type="text"
            id={`title-${slotIndex}`}
            value={slotConfig.title}
            onChange={(e) => onChange({ ...slotConfig, title: e.target.value })}
            disabled={isDisabled}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-700"
          />
        </div>
        {/* Asset Type */}
        <div>
          <label htmlFor={`assetType-${slotIndex}`} className="block text-sm font-medium text-slate-400 mb-1">Tip Activ</label>
          <select
            id={`assetType-${slotIndex}`}
            value={slotConfig.filters.assetType}
            onChange={(e) => handleFilterChange('assetType', e.target.value as AssetTypeFilter)}
            disabled={isDisabled}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-700"
          >
            <option value="any">Orice Tip</option>
            <option value="corporal">Corporal</option>
            <option value="uman">Uman</option>
            <option value="necorporal">Necorporal</option>
          </select>
        </div>
        {/* Cost */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor={`costOp-${slotIndex}`} className="block text-sm font-medium text-slate-400 mb-1">Cost</label>
            <select
              id={`costOp-${slotIndex}`}
              value={slotConfig.filters.costOperator}
              onChange={(e) => handleFilterChange('costOperator', e.target.value as CostOperator)}
              disabled={isDisabled}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-700"
            >
              <option value="any">Oricare</option>
              <option value="=">Egal cu</option>
              <option value=">">Mai mare ca</option>
              <option value="<">Mai mic ca</option>
              <option value=">=">≥</option>
              <option value="<=">≤</option>
            </select>
          </div>
          <div>
            <label htmlFor={`costVal-${slotIndex}`} className="block text-sm font-medium text-slate-400 mb-1">&nbsp;</label>
            <input
              type="number"
              id={`costVal-${slotIndex}`}
              value={slotConfig.filters.costValue}
              onChange={(e) => handleFilterChange('costValue', parseInt(e.target.value, 10) || 0)}
              disabled={isDisabled || slotConfig.filters.costOperator === 'any'}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


const BaseGameSetup: React.FC<BaseGameSetupProps> = ({ onBack, gameConfig }) => {
  const [shuffleMarket, setShuffleMarket] = useState(() => {
    return localStorage.getItem('baseGameConfig_shuffleMarket') === 'true';
  });

  const [marketConfig, setMarketConfig] = useState<MarketSlotConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MARKET);
      return saved ? JSON.parse(saved) : gameConfig.marketConfig;
    } catch (e) {
      return gameConfig.marketConfig;
    }
  });

  const [startingDeckMaxCost, setStartingDeckMaxCost] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_DECK_COST);
    return saved ? parseInt(saved, 10) : gameConfig.startingDeckMaxCost;
  });
  
  const [bonusBuyRule, setBonusBuyRule] = useState<BonusBuyRule>(() => {
      return (localStorage.getItem(STORAGE_KEY_BONUS_RULE) as BonusBuyRule) || gameConfig.bonusBuyRule;
  });
  
  const [startingCash, setStartingCash] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_START_CASH);
    return saved ? parseInt(saved, 10) : gameConfig.startingCash;
  });

  const [startingDeckSize, setStartingDeckSize] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_DECK_SIZE);
    return saved ? parseInt(saved, 10) : gameConfig.startingDeckSize;
  });

  const [hudCalculationMode, setHudCalculationMode] = useState<HudCalculationMode>(() => {
    return (localStorage.getItem(STORAGE_KEY_HUD_MODE) as HudCalculationMode) || gameConfig.hudCalculationMode || 'manual';
  });

  useEffect(() => {
    localStorage.setItem('baseGameConfig_shuffleMarket', String(shuffleMarket));
  }, [shuffleMarket]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MARKET, JSON.stringify(marketConfig));
  }, [marketConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DECK_COST, String(startingDeckMaxCost));
  }, [startingDeckMaxCost]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BONUS_RULE, bonusBuyRule);
  }, [bonusBuyRule]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_START_CASH, String(startingCash));
  }, [startingCash]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DECK_SIZE, String(startingDeckSize));
  }, [startingDeckSize]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HUD_MODE, hudCalculationMode);
  }, [hudCalculationMode]);


  const handleSlotChange = (index: number, newConfig: MarketSlotConfig) => {
    const newMarketConfig = [...marketConfig];
    newMarketConfig[index] = newConfig;
    setMarketConfig(newMarketConfig);
  };

  const handleReset = () => {
    setMarketConfig(getDefaultMarketSetup());
  };

  return (
    <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase tracking-wider">Configurare Joc de Bază</h1>
      
      {/* Starting Deck Setup */}
      <div className="space-y-6 border-t border-b border-slate-700 py-6">
        <h2 className="text-xl font-bold text-slate-300">Configurare Start Joc</h2>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
                <label htmlFor="starting-cash-input" className="text-lg text-slate-300">Capital Inițial</label>
                 <p className="text-sm text-slate-500 h-10">Suma de bani cu care începe fiecare jucător. (Implicit: {gameConfig.startingCash})</p>
                <input type="number" id="starting-cash-input" value={startingCash} onChange={(e) => setStartingCash(Math.max(0, parseInt(e.target.value, 10) || 0))} className="mt-1 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500" />
            </div>
            <div>
                <label htmlFor="starting-deck-size-input" className="text-lg text-slate-300">Dimensiune Deck Inițial</label>
                <p className="text-sm text-slate-500 h-10">Numărul de cărți pe care fiecare jucător le are în pachetul de start. (Implicit: {gameConfig.startingDeckSize})</p>
                <input type="number" id="starting-deck-size-input" value={startingDeckSize} onChange={(e) => setStartingDeckSize(Math.max(1, parseInt(e.target.value, 10) || 1))} className="mt-1 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500" />
            </div>
        </div>

        <div>
          <label htmlFor="start-deck-cost-input" className="text-lg text-slate-300">
            Cost Maxim Carduri Inițiale
            <p className="text-sm text-slate-500">Doar cărțile cu cost ≤ această valoare vor fi în pool-ul pentru deck-ul de start. (Implicit: {gameConfig.startingDeckMaxCost})</p>
          </label>
          <input
            type="number"
            id="start-deck-cost-input"
            value={startingDeckMaxCost}
            onChange={(e) => setStartingDeckMaxCost(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="mt-2 w-full max-w-xs px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* HUD Calculation Mode */}
      <div className="space-y-4 border-b border-slate-700 py-6">
        <h2 className="text-xl font-bold text-slate-300">Mod Calcul HUD</h2>
        <p className="text-sm text-slate-500">Alege cum sunt calculate statisticile de pe panoul de joc (HUD).</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex-1 p-4 bg-slate-700/50 rounded-lg cursor-pointer has-[:checked]:bg-blue-900/50 has-[:checked]:ring-2 ring-blue-500 transition-all">
                <div className="flex items-center">
                    <input type="radio" name="hud-mode" value="manual" checked={hudCalculationMode === 'manual'} onChange={(e) => setHudCalculationMode(e.target.value as HudCalculationMode)} className="w-5 h-5 text-blue-500 bg-slate-600 border-slate-500 focus:ring-blue-500" />
                    <div className="ml-3">
                        <span className="font-bold text-white">Manual</span>
                        <p className="text-sm text-slate-400">Exersezi calculul. Greșelile sunt semnalate, fără penalizări.</p>
                    </div>
                </div>
            </label>
            <label className="flex-1 p-4 bg-slate-700/50 rounded-lg cursor-pointer has-[:checked]:bg-blue-900/50 has-[:checked]:ring-2 ring-blue-500 transition-all">
                <div className="flex items-center">
                    <input type="radio" name="hud-mode" value="automatic" checked={hudCalculationMode === 'automatic'} onChange={(e) => setHudCalculationMode(e.target.value as HudCalculationMode)} className="w-5 h-5 text-blue-500 bg-slate-600 border-slate-500 focus:ring-blue-500" />
                    <div className="ml-3">
                        <span className="font-bold text-white">Automat</span>
                        <p className="text-sm text-slate-400">Jocul calculează tot pentru tine.</p>
                    </div>
                </div>
            </label>
        </div>
        <p className="text-sm text-indigo-300 bg-indigo-900/30 p-2 rounded-md border border-indigo-700">Notă: Modul 'ANAF' (cu amenzi) se poate activa din configurarea extensiei "Taxe și Impozite" și va suprascrie această setare.</p>
      </div>

      {/* Bonus Buy Rule Setup */}
      <div className="space-y-4 border-b border-slate-700 py-6">
        <h2 className="text-xl font-bold text-slate-300">Regulă Combo Cumpărare Bonus</h2>
        <p className="text-sm text-slate-500">Definește dacă o carte cumpărată ca bonus își poate declanșa propriul efect de "cumpărare bonus".</p>
        <div className="flex flex-col md:flex-row gap-4">
            <label className="flex-1 p-4 bg-slate-700/50 rounded-lg cursor-pointer has-[:checked]:bg-blue-900/50 has-[:checked]:ring-2 ring-blue-500 transition-all">
                <div className="flex items-center">
                    <input type="radio" name="bonus-rule" value="no_combo" checked={bonusBuyRule === 'no_combo'} onChange={(e) => setBonusBuyRule(e.target.value as BonusBuyRule)} className="w-5 h-5 text-blue-500 bg-slate-600 border-slate-500 focus:ring-blue-500" />
                    <div className="ml-3">
                        <span className="font-bold text-white">Clasic (Fără Combo)</span>
                        <p className="text-sm text-slate-400">Doar cumpărările normale declanșează efecte. Rapid și echilibrat.</p>
                    </div>
                </div>
            </label>
            <label className="flex-1 p-4 bg-slate-700/50 rounded-lg cursor-pointer has-[:checked]:bg-blue-900/50 has-[:checked]:ring-2 ring-blue-500 transition-all">
                <div className="flex items-center">
                    <input type="radio" name="bonus-rule" value="hybrid_combo" checked={bonusBuyRule === 'hybrid_combo'} onChange={(e) => setBonusBuyRule(e.target.value as BonusBuyRule)} className="w-5 h-5 text-blue-500 bg-slate-600 border-slate-500 focus:ring-blue-500" />
                    <div className="ml-3">
                        <span className="font-bold text-white">Hibrid (Tactic)</span>
                        <p className="text-sm text-slate-400">Prima carte bonus dintr-un lanț își declanșează efectul. Permite mini-combo-uri.</p>
                    </div>
                </div>
            </label>
            <label className="flex-1 p-4 bg-slate-700/50 rounded-lg cursor-pointer has-[:checked]:bg-blue-900/50 has-[:checked]:ring-2 ring-blue-500 transition-all">
                <div className="flex items-center">
                    <input type="radio" name="bonus-rule" value="infinite_combo" checked={bonusBuyRule === 'infinite_combo'} onChange={(e) => setBonusBuyRule(e.target.value as BonusBuyRule)} className="w-5 h-5 text-blue-500 bg-slate-600 border-slate-500 focus:ring-blue-500" />
                    <div className="ml-3">
                        <span className="font-bold text-white">Exploziv (Combo-uri Lungi)</span>
                        <p className="text-sm text-slate-400">Orice carte bonus poate declanșa un alt efect. Potențial pentru ture spectaculoase.</p>
                    </div>
                </div>
            </label>
        </div>
      </div>
      
      {/* Market Setup Section */}
      <div className="space-y-4 border-b border-slate-700 py-6">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-xl font-bold text-slate-300">Configurare Piață</h2>
                <p className="text-sm text-slate-500">Definește regulile pentru fiecare slot de pe piață.</p>
            </div>
            <button
                onClick={handleReset}
                className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 transition-colors"
            >
                Resetează la clasic
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketConfig.map((slot, index) => (
                <MarketSlotEditor
                    key={index}
                    slotIndex={index}
                    slotConfig={slot}
                    onChange={(newConfig) => handleSlotChange(index, newConfig)}
                />
            ))}
        </div>
      </div>

      {/* Other Settings Section */}
      <div className="space-y-6 border-b border-slate-700 py-6">
        <div className="flex items-center justify-between">
            <label htmlFor="shuffle-market-toggle" className="text-lg text-slate-300 flex-grow pr-4">
                Rotește o piață la final de tură
                <p className="text-sm text-slate-500">La finalul fiecărei ture, o grămadă aleatorie de pe piață (cu mai mult de o carte) va fi rotită: cartea de deasupra este mutată la fundul grămezii.</p>
            </label>
            <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                <input
                    type="checkbox"
                    name="shuffle-market-toggle"
                    id="shuffle-market-toggle"
                    checked={shuffleMarket}
                    onChange={() => setShuffleMarket(!shuffleMarket)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500"
                />
                <label
                    htmlFor="shuffle-market-toggle"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 cursor-pointer"
                ></label>
            </div>
            <style>{`
              .toggle-checkbox:checked + .toggle-label {
                background-color: #22c55e; /* green-500 */
              }
            `}</style>
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

export default BaseGameSetup;