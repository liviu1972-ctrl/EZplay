import React from 'react';

// --- Local UI Component for Stats Bar ---
const StatDisplay: React.FC<{
  label: string;
  value: number | string;
  imageUrl: string;
  textColor?: string;
  onClick?: () => void;
}> = ({ label, value, imageUrl, textColor = 'text-white', onClick }) => {
  return (
    <button 
        onClick={onClick} 
        className="flex flex-col items-center justify-start space-y-1 w-20 h-20 p-1 rounded-lg transition-colors hover:bg-slate-700/50 disabled:hover:bg-transparent"
        disabled={!onClick}
        aria-label={`Vezi graficul pentru ${label}`}
    >
      <span className="text-sm text-slate-400 uppercase tracking-wider h-5 text-center">{label}</span>
      <div 
        className="relative flex items-center justify-center w-12 h-12 bg-cover bg-center rounded-md shadow-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <span className={`relative font-bold text-xl ${textColor}`} style={{ textShadow: '1px 1px 2px black' }}>{value}</span>
      </div>
    </button>
  );
};

export default StatDisplay;
