import React from 'react';
import type { Card } from '../../../types';
import CardUI from '../../CardUI';

interface DesktopEntrepreneurSelectionProps {
  entrepreneurs: Card[];
  selectedId: string;
  onConfirm: (selectedId: string) => void;
  onBack: () => void;
  playerContextText?: string;
  onSetSelectedId: (id: string) => void;
}

const DesktopEntrepreneurSelection: React.FC<DesktopEntrepreneurSelectionProps> = ({ entrepreneurs, selectedId, onConfirm, onBack, playerContextText, onSetSelectedId }) => {
  const selectedEnt = entrepreneurs.find(e => e.id === selectedId);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 animate-fade-in flex flex-col h-[95vh] bg-slate-900">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-yellow-300">
          {playerContextText ? `${playerContextText}, alege antreprenorul` : 'Alege Antreprenorul'}
        </h1>
        <p className="text-slate-400 mt-2">Profilul antreprenorului tău va oferi bonusuri de producție, vânzări și va avea cheltuieli fixe în fiecare tură.</p>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        <div className="flex flex-wrap justify-center gap-6">
          {entrepreneurs.map(ent => {
            const isSelected = ent.id === selectedId;
            return (
              <div
                key={ent.id}
                onClick={() => onSetSelectedId(ent.id)}
                className={`cursor-pointer rounded-lg transition-all duration-200 ${isSelected ? 'ring-4 ring-yellow-400 scale-105' : 'ring-2 ring-transparent hover:ring-yellow-400/50'}`}
              >
                <CardUI card={ent} isFaceUp={true} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        {selectedEnt && (
          <div className="mb-4 text-center bg-slate-800/50 p-3 rounded-lg max-w-md">
            <h2 className="text-xl font-bold">{selectedEnt.name}</h2>
            <p className="text-slate-300">
              Producție: <span className="font-bold text-blue-400">{selectedEnt.production}</span>, 
              Vânzări: <span className="font-bold text-yellow-400">{selectedEnt.sales}</span>, 
              Cheltuieli: <span className="font-bold text-orange-400">{selectedEnt.expenses}</span>
            </p>
          </div>
        )}
        <div className="flex items-center space-x-4">
            <button onClick={onBack} className="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 transition-colors">Înapoi la Meniu</button>
            <button onClick={() => onConfirm(selectedId)} disabled={!selectedId} className="px-10 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors text-2xl disabled:bg-slate-700 disabled:cursor-not-allowed">Confirmă și Continuă</button>
        </div>
      </div>
    </div>
  );
};

export default DesktopEntrepreneurSelection;
