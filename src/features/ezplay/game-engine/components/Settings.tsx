
import React, { useState, useEffect } from 'react';
import type { GameLayout } from '../types';
import PlayerSetup from './PlayerSetup'; // Import the new component

interface SettingsProps {
  onClose: () => void;
  onShowSimulator: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose, onShowSimulator }) => {
  type HudInputMethod = 'reel' | 'numpad';

  const [cardStyle, setCardStyle] = useState(() => localStorage.getItem('cardStyle') || 'image');
  const [backgroundStyle, setBackgroundStyle] = useState(() => localStorage.getItem('backgroundStyle') || 'game-background-none');
  const [gameLayout, setGameLayout] = useState<GameLayout>(() => (localStorage.getItem('gameLayout') as GameLayout) || 'classic');
  
  // NEW: HUD Input Method States
  const [desktopInputMethod, setDesktopInputMethod] = useState<HudInputMethod>(() => (localStorage.getItem('desktopInputMethod') as HudInputMethod) || 'reel');
  const [mobileInputMethod, setMobileInputMethod] = useState<HudInputMethod>(() => (localStorage.getItem('mobileInputMethod') as HudInputMethod) || 'numpad');

  const [showActionLog, setShowActionLog] = useState(() => localStorage.getItem('showActionLog') === 'true');
  
  useEffect(() => { localStorage.setItem('cardStyle', cardStyle); window.dispatchEvent(new StorageEvent('storage', { key: 'cardStyle', newValue: cardStyle })); }, [cardStyle]);
  useEffect(() => { localStorage.setItem('backgroundStyle', backgroundStyle); window.dispatchEvent(new StorageEvent('storage', { key: 'backgroundStyle', newValue: backgroundStyle })); }, [backgroundStyle]);
  useEffect(() => { localStorage.setItem('gameLayout', gameLayout); window.dispatchEvent(new StorageEvent('storage', { key: 'gameLayout', newValue: gameLayout })); }, [gameLayout]);
  
  // NEW: Save HUD Input Methods
  useEffect(() => { localStorage.setItem('desktopInputMethod', desktopInputMethod); window.dispatchEvent(new StorageEvent('storage', { key: 'desktopInputMethod', newValue: desktopInputMethod })); }, [desktopInputMethod]);
  useEffect(() => { localStorage.setItem('mobileInputMethod', mobileInputMethod); window.dispatchEvent(new StorageEvent('storage', { key: 'mobileInputMethod', newValue: mobileInputMethod })); }, [mobileInputMethod]);

  useEffect(() => { localStorage.setItem('showActionLog', String(showActionLog)); window.dispatchEvent(new StorageEvent('storage', { key: 'showActionLog', newValue: String(showActionLog) })); }, [showActionLog]);

  return (
    <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase tracking-wider">Settings</h1>
      
      <PlayerSetup />

      <div className="flex flex-col space-y-6 border-b border-slate-700 py-6">
        <h2 className="text-xl font-bold text-slate-300">Setări Generale</h2>
        
        {/* NEW: HUD Input Method */}
        <div className="space-y-4">
            <h3 className="text-lg text-slate-300">Metodă Introducere Date HUD</h3>
            <p className="text-sm text-slate-500">Alege cum vrei să introduci datele în modul de calcul manual.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                    <label className="text-base text-slate-400">Input HUD Desktop</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <button type="button" onClick={() => setDesktopInputMethod('reel')} className={`relative inline-flex items-center justify-center px-4 py-2 rounded-l-md border border-slate-600 text-sm font-medium hover:bg-slate-700 focus:z-10 w-1/2 ${desktopInputMethod === 'reel' ? 'bg-blue-600' : 'bg-slate-800'}`}>Rotiță</button>
                        <button type="button" onClick={() => setDesktopInputMethod('numpad')} className={`-ml-px relative inline-flex items-center justify-center px-4 py-2 rounded-r-md border border-slate-600 text-sm font-medium hover:bg-slate-700 focus:z-10 w-1/2 ${desktopInputMethod === 'numpad' ? 'bg-blue-600' : 'bg-slate-800'}`}>Calculator</button>
                    </div>
                </div>
                 <div>
                    <label className="text-base text-slate-400">Input HUD Mobil</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <button type="button" onClick={() => setMobileInputMethod('reel')} className={`relative inline-flex items-center justify-center px-4 py-2 rounded-l-md border border-slate-600 text-sm font-medium hover:bg-slate-700 focus:z-10 w-1/2 ${mobileInputMethod === 'reel' ? 'bg-blue-600' : 'bg-slate-800'}`}>Rotiță</button>
                        <button type="button" onClick={() => setMobileInputMethod('numpad')} className={`-ml-px relative inline-flex items-center justify-center px-4 py-2 rounded-r-md border border-slate-600 text-sm font-medium hover:bg-slate-700 focus:z-10 w-1/2 ${mobileInputMethod === 'numpad' ? 'bg-blue-600' : 'bg-slate-800'}`}>Calculator</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
                <label className="text-lg text-slate-300">Aspect Cărți</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <button type="button" onClick={() => setCardStyle('image')} className={`relative inline-flex items-center justify-center px-4 py-2 rounded-l-md border border-slate-600 text-sm font-medium hover:bg-slate-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${cardStyle === 'image' ? 'bg-blue-600' : 'bg-slate-800'}`}>Imagini</button>
                    <button type="button" onClick={() => setCardStyle('generated')} className={`-ml-px relative inline-flex items-center justify-center px-4 py-2 rounded-r-md border border-slate-600 text-sm font-medium hover:bg-slate-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${cardStyle === 'generated' ? 'bg-blue-600' : 'bg-slate-800'}`}>Generat</button>
                </div>
            </div>
            <div>
                <label htmlFor="background-style-select" className="text-lg text-slate-300">Fundal Tablă de Joc</label>
                <select id="background-style-select" value={backgroundStyle} onChange={(e) => setBackgroundStyle(e.target.value)} className="mt-1 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="game-background-none">Fără Fundal (Implicit)</option>
                    <option value="game-background-1">Grilă Tech</option>
                    <option value="game-background-2">Circuit Întunecat</option>
                    <option value="game-background-3">Nebuloasă Subtilă</option>
                </select>
            </div>
            <div className="md:col-span-2">
                <label className="text-lg text-slate-300">Layout Tablă de Joc</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <button type="button" onClick={() => setGameLayout('classic')} className={`relative inline-flex items-center justify-center px-4 py-2 rounded-l-md border border-slate-600 text-sm font-medium hover:bg-slate-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors w-1/2 ${gameLayout === 'classic' ? 'bg-blue-600' : 'bg-slate-800'}`}>Clasic</button>
                    <button type="button" onClick={() => setGameLayout('extended')} className={`-ml-px relative inline-flex items-center justify-center px-4 py-2 rounded-r-md border border-slate-600 text-sm font-medium hover:bg-slate-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors w-1/2 ${gameLayout === 'extended' ? 'bg-blue-600' : 'bg-slate-800'}`}>Extins</button>
                </div>
            </div>
        </div>
        
        <div className="flex items-center justify-between">
            <label htmlFor="action-log-toggle" className="text-lg text-slate-300">Afișează Jurnal Acțiuni</label>
            <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="action-log-toggle" id="action-log-toggle" checked={showActionLog} onChange={() => setShowActionLog(!showActionLog)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500" />
              <label htmlFor="action-log-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 cursor-pointer"></label>
            </div>
        </div>
        <style>{`.toggle-checkbox:checked + .toggle-label { background-color: #22c55e; }`}</style>
      </div>

      <div className="space-y-4 border-b border-slate-700 py-6">
        <h2 className="text-xl font-bold text-slate-300">Unelte Avansate</h2>
        <div className="flex items-center justify-between p-2 rounded-md">
            <div>
              <label className="text-lg text-slate-300">Simulator de Jocuri</label>
              <p className="text-sm text-slate-500">Rulează mii de partide pentru a testa echilibrul jocului și strategiile AI.</p>
            </div>
            <button onClick={onShowSimulator} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex-shrink-0">Deschide Simulator</button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button onClick={onClose} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 text-lg">
          Back
        </button>
      </div>
    </div>
  );
};

export default Settings;
