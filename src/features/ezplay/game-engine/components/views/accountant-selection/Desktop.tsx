import React, { useState } from 'react';
import type { Card } from '../../../types';
import CardUI from '../../CardUI';

interface AccountantSelectionProps {
  accountants: Card[];
  onConfirm: (selectedId: string) => void;
  onBack: () => void;
  playerContextText?: string;
}

const DesktopAccountantSelection: React.FC<AccountantSelectionProps> = ({ accountants, onConfirm, onBack, playerContextText }) => {
  const [selectedId, setSelectedId] = useState<string>(accountants[0]?.id || '');
  const selectedAcc = accountants.find(e => e.id === selectedId);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 animate-fade-in flex flex-col h-[95vh] bg-slate-900">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-yellow-300">
          {playerContextText ? `${playerContextText}, alege contabilul` : 'Alege Contabilul'}
        </h1>
        <p className="text-slate-400 mt-2">Contabilul este un partener permanent care oferă imunitate la controalele ANAF și poate oferi bonusuri suplimentare.</p>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        <div className="flex flex-wrap justify-center gap-6">
          {accountants.map(acc => {
            const isSelected = acc.id === selectedId;
            return (
              <div
                key={acc.id}
                onClick={() => setSelectedId(acc.id)}
                className={`cursor-pointer rounded-lg transition-all duration-200 ${isSelected ? 'ring-4 ring-yellow-400 scale-105' : 'ring-2 ring-transparent hover:ring-yellow-400/50'}`}
              >
                <CardUI card={acc} isFaceUp={true} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        {selectedAcc && (
          <div className="mb-4 text-center bg-slate-800/50 p-3 rounded-lg max-w-lg">
            <h2 className="text-xl font-bold">{selectedAcc.name}</h2>
            <p className="text-slate-300">
              Cost: <span className="font-bold text-yellow-400">{selectedAcc.cost}$</span>, 
              Cheltuieli/tură: <span className="font-bold text-orange-400">{selectedAcc.expenses}$</span>
            </p>
            {/* FIX: Use card.description as a fallback for the effect description */}
            {(selectedAcc.effect?.description || selectedAcc.description) && <p className="text-sm text-slate-400 mt-1">{selectedAcc.effect?.description || selectedAcc.description}</p>}
          </div>
        )}
        <div className="flex items-center space-x-4">
            <button onClick={onBack} className="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 transition-colors">Înapoi</button>
            <button onClick={() => onConfirm(selectedId)} disabled={!selectedId} className="px-10 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors text-2xl disabled:bg-slate-700 disabled:cursor-not-allowed">Angajează și Continuă</button>
        </div>
      </div>
    </div>
  );
};

export default DesktopAccountantSelection;