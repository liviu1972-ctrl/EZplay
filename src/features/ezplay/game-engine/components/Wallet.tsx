
import React from 'react';

interface WalletProps {
  ezc: number;
  ezg: number;
}

const Wallet: React.FC<WalletProps> = ({ ezc, ezg }) => {
  return (
    <div className="flex items-center space-x-3 bg-black/40 px-3 py-1.5 rounded-full border border-slate-700 shadow-inner">
      {/* EZCoins Display */}
      <div className="flex items-center space-x-1.5" title="EZCoins (Moneda de bază)">
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 flex items-center justify-center border border-yellow-200 shadow-sm">
          <span className="text-[10px] font-black text-yellow-900">C</span>
        </div>
        <span className="text-sm font-bold text-yellow-100 font-mono">{ezc}</span>
      </div>

      <div className="w-px h-4 bg-slate-700"></div>

      {/* EZGold Display */}
      <div className="flex items-center space-x-1.5" title="EZGold (Resursă premium)">
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-600 to-amber-200 flex items-center justify-center border border-amber-100 shadow-sm animate-pulse">
           <svg viewBox="0 0 24 24" className="w-3 h-3 text-amber-900" fill="currentColor">
             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
           </svg>
        </div>
        <span className="text-sm font-bold text-amber-100 font-mono">{ezg}</span>
      </div>
    </div>
  );
};

export default Wallet;
