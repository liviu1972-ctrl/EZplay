import React, { useEffect, useState, useRef } from 'react';

interface NumberReelModalProps {
  initialValue: string;
  imageUrl: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
}

const NumberReelModal: React.FC<NumberReelModalProps> = ({ initialValue, imageUrl, onClose, onConfirm }) => {
  const parsedInitial = parseInt(initialValue, 10);
  const [currentValue, setCurrentValue] = useState(isNaN(parsedInitial) ? 9 : parsedInitial);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleValueChange = (amount: number) => {
    setCurrentValue(prev => Math.max(0, prev + amount));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    handleValueChange(e.deltaY < 0 ? 1 : -1);
  };
  
  const handleConfirm = () => {
    onConfirm(String(currentValue));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleValueChange(1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleValueChange(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleConfirm();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleConfirm(); // Confirm on click outside
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentValue, onConfirm, onClose]); // Added currentValue to dependencies to ensure handleConfirm has the latest value

  return (
    <div className="fixed inset-0 bg-black/10 z-[60] flex justify-center items-center animate-fade-in pl-[34rem] md:pl-0" onWheel={handleWheel}>
      <div 
        ref={modalRef}
        className="flex flex-col items-center space-y-3"
      >
        <button onClick={() => handleValueChange(1)} className="p-3 bg-slate-700/80 rounded-full hover:bg-slate-600/80 transition-colors" aria-label="Crește valoarea">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
        </button>

        <div 
            className="relative w-[4.5rem] h-[4.5rem] flex items-center justify-center rounded-2xl shadow-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
            <span 
                className="relative text-3xl font-mono text-white font-bold"
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
            >
                {currentValue}
            </span>
        </div>
        
        <button onClick={() => handleValueChange(-1)} className="p-3 bg-slate-700/80 rounded-full hover:bg-slate-600/80 transition-colors" aria-label="Scade valoarea">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default NumberReelModal;