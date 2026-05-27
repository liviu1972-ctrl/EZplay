
import React, { useState, useEffect } from 'react';
import type { CompanyHistory } from '../types';
import MultiCompanyHistoryChart from './MultiCompanyHistoryChart';

interface CompanyHistoryViewProps {
  onBackToMenu: () => void;
}

const CompanyHistoryView: React.FC<CompanyHistoryViewProps> = ({ onBackToMenu }) => {
    const [allCompaniesHistory, setAllCompaniesHistory] = useState<CompanyHistory[]>([]);
    const [historyViewMetric, setHistoryViewMetric] = useState<string>('profit');

    useEffect(() => {
        try {
            const savedHistories = JSON.parse(localStorage.getItem('allCompaniesHistory') || '[]');
            setAllCompaniesHistory(savedHistories);
        } catch (error) {
            console.error("Failed to load company history:", error);
            setAllCompaniesHistory([]);
        }
    }, []);

    const handleClearHistory = () => {
        if (window.confirm("Sigur vrei să ștergi tot istoricul? Această acțiune este ireversibilă.")) {
            localStorage.removeItem('allCompaniesHistory');
            setAllCompaniesHistory([]);
        }
    };

    const metricOptions = {
        profit: { title: 'Profit Anual ($)', color: '#A855F7' },
        capitalization: { title: 'Capitalizare ($)', color: '#38bdf8' },
        turnover: { title: 'Cifră de Afaceri ($)', color: '#22C55E' },
        netProfitMargin: { title: 'Marja Profit Net (%)', color: '#f59e0b' },
        returnOnAssets: { title: 'ROA (%)', color: '#10b981' },
        assetTurnover: { title: 'Rotația Activelor (x)', color: '#6366f1' },
    };

    return (
        <div className="w-full max-w-5xl flex flex-col items-center space-y-4 animate-fade-in p-4">
            <div className="flex justify-between items-center w-full relative">
                <div className="w-12"></div> {/* Spacer for centering */}
                <h1 className="text-4xl font-bold text-center mb-2 uppercase tracking-wider text-yellow-400">Istoric Companii</h1>
                <button 
                    onClick={handleClearHistory}
                    disabled={allCompaniesHistory.length === 0}
                    className="text-xs text-red-400 hover:text-red-300 underline disabled:opacity-50 disabled:no-underline"
                >
                    Șterge Istoric
                </button>
            </div>
            
            <p className="text-slate-400 mb-6">Analizează performanța tuturor companiilor tale.</p>
            
            <div className="w-full bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
                <div className="flex justify-center items-center flex-wrap gap-2 mb-6">
                    <span className="text-slate-300 mr-2">Afișează indicator:</span>
                    {Object.entries(metricOptions).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setHistoryViewMetric(key)}
                            className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-200 border-2 ${
                                historyViewMetric === key 
                                ? 'bg-blue-600 text-white border-blue-400' 
                                : 'bg-slate-700/50 text-slate-300 border-transparent hover:bg-slate-600/50'
                            }`}
                        >
                            {config.title}
                        </button>
                    ))}
                </div>

                <MultiCompanyHistoryChart 
                    histories={allCompaniesHistory}
                    activeSeriesKey={historyViewMetric}
                    seriesConfig={metricOptions}
                />
            </div>
            
            <div className="mt-8 flex justify-center items-center">
                 <button 
                    onClick={onBackToMenu} 
                    className="px-10 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors text-2xl"
                >
                    Meniu Principal
                </button>
            </div>
        </div>
    );
};

export default CompanyHistoryView;
