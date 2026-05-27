import React from 'react';

interface NumpadProps {
  onInput: (char: string) => void;
  onDelete: () => void;
  onConfirm: () => void;
  onClose: () => void;
  currentValue: string;
  label: string;
}

const Numpad: React.FC<NumpadProps> = ({ onInput, onDelete, onConfirm, onClose, currentValue, label }) => {
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const buttonClass = "flex items-center justify-center h-14 w-14 bg-slate-700/50 rounded-lg text-2xl font-bold active:bg-blue-600 transition-colors";

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="w-52 bg-slate-800/80 backdrop-blur-sm rounded-xl p-3 shadow-2xl border border-slate-700" onClick={e => e.stopPropagation()}>
        
        <div className="h-14 mb-3 bg-slate-900 rounded-lg flex items-center justify-between px-4">
          <p className="text-slate-400 uppercase tracking-wider text-sm">{label}</p>
          <div className="text-3xl font-mono">
            {currentValue || '0'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {buttons.map((btn, i) => (
            <button key={i} onClick={() => onInput(btn)} className={buttonClass}>
              {btn}
            </button> 
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-2">
            <button onClick={onDelete} className={`${buttonClass} bg-rose-800/80 active:bg-rose-700`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                </svg>
            </button>
            <button onClick={() => onInput('0')} className={buttonClass}>
              0
            </button>
            <button onClick={onConfirm} className={`${buttonClass} bg-green-700/80 active:bg-green-600`}>
                OK
            </button>
        </div>

      </div>
    </div>
  );
};

export default Numpad;