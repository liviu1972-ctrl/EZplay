import React, { useState, useEffect } from 'react';
import type { AnafPenaltyMode } from '../types';

interface TaxesSetupProps {
  onBack: () => void;
}

const STORAGE_KEY_ANAF_ENABLED = 'taxesConfig_anafEnabled';
const STORAGE_KEY_ANAF_MODE = 'taxesConfig_anafPenaltyMode';
const STORAGE_KEY_ACCOUNTING_ENABLED = 'taxesConfig_accountingEnabled';

const penaltyOptions: { id: AnafPenaltyMode, title: string, description: string }[] = [
    { id: 'incremental', title: 'Incremental (Implicit)', description: 'Prima greșeală este un avertisment, apoi amenzile cresc (1, 2, 3...).' },
    { id: 'flat_rate', title: 'Taxă Fixă', description: 'Fiecare greșeală costă 1 ban, fără avertisment.' },
    { id: 'percentage', title: 'Procentual', description: 'Avertisment, apoi amenda e 10% din cifra de afaceri anterioară sau 5% din capitalizare.' },
    { id: 'warnings_only', title: 'ANAF cel Bun', description: 'Se dau doar avertismente, fără penalizări financiare.' }
];

const TaxesSetup: React.FC<TaxesSetupProps> = ({ onBack }) => {
  const [anafEnabled, setAnafEnabled] = useState(() => localStorage.getItem(STORAGE_KEY_ANAF_ENABLED) === 'true');
  const [penaltyMode, setPenaltyMode] = useState<AnafPenaltyMode>(() => (localStorage.getItem(STORAGE_KEY_ANAF_MODE) as AnafPenaltyMode) || 'incremental');
  const [accountingEnabled, setAccountingEnabled] = useState(() => localStorage.getItem(STORAGE_KEY_ACCOUNTING_ENABLED) === 'true');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ANAF_ENABLED, String(anafEnabled));
  }, [anafEnabled]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ANAF_MODE, penaltyMode);
  }, [penaltyMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACCOUNTING_ENABLED, String(accountingEnabled));
  }, [accountingEnabled]);

  return (
    <div className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase tracking-wider">Configurare Taxe și Impozite</h1>
      
      <div className="space-y-6 border-t border-b border-slate-700 py-6">
        <div className="flex items-center justify-between">
          <label htmlFor="accounting-toggle" className="text-lg text-slate-300 flex-grow pr-4">
            Activează Modul Contabilitate
            <p className="text-sm text-slate-500">Permite angajarea unui contabil care oferă imunitate ANAF și alte bonusuri.</p>
          </label>
          <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="accounting-toggle"
              id="accounting-toggle"
              checked={accountingEnabled}
              onChange={(e) => setAccountingEnabled(e.target.checked)}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500"
            />
            <label
              htmlFor="accounting-toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 cursor-pointer"
            ></label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-700">
          <label htmlFor="anaf-toggle" className="text-lg text-slate-300 flex-grow pr-4">
            Activează Modul ANAF
            <p className="text-sm text-slate-500">Calculele HUD devin manuale și greșelile pot fi penalizate.</p>
          </label>
          <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="anaf-toggle"
              id="anaf-toggle"
              checked={anafEnabled}
              onChange={(e) => setAnafEnabled(e.target.checked)}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500"
            />
            <label
              htmlFor="anaf-toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 cursor-pointer"
            ></label>
          </div>
        </div>

        {anafEnabled && (
            <div className="space-y-4 pt-4 border-t border-slate-700">
                 <h3 className="text-lg font-bold text-slate-300">Mod de Penalizare</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {penaltyOptions.map(option => (
                         <label key={option.id} className="flex-1 p-4 bg-slate-700/50 rounded-lg cursor-pointer has-[:checked]:bg-blue-900/50 has-[:checked]:ring-2 ring-blue-500 transition-all">
                            <div className="flex items-start">
                                <input type="radio" name="penalty-mode" value={option.id} checked={penaltyMode === option.id} onChange={(e) => setPenaltyMode(e.target.value as AnafPenaltyMode)} className="w-5 h-5 mt-1 text-blue-500 bg-slate-600 border-slate-500 focus:ring-blue-500" />
                                <div className="ml-3">
                                    <span className="font-bold text-white">{option.title}</span>
                                    <p className="text-sm text-slate-400">{option.description}</p>
                                </div>
                            </div>
                        </label>
                    ))}
                 </div>
            </div>
        )}

      </div>

      <div className="mt-8 text-center">
        <button onClick={onBack} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          Înapoi
        </button>
      </div>
      <style>{`.toggle-checkbox:checked + .toggle-label { background-color: #22c55e; }`}</style>
    </div>
  );
};

export default TaxesSetup;