
import React, { useState, useMemo } from 'react';
import type { AnnualReportData, PlayerState } from '../types';
import { IncomeIcon, ProfitIcon, CapitalizationIcon, InfoIcon } from './Icons';
import HistoryChart from './HistoryChart';
import MultiCompanyHistoryChart from './MultiCompanyHistoryChart';

interface AnnualReportProps {
  report: AnnualReportData;
  playerHistory: PlayerState['history']; // Specific player history
  allPlayers: PlayerState[]; // For comparison
  allLatestReports: Record<number, AnnualReportData>; // All generated reports for this year
  onContinue: () => void;
  yearlyBuys: number;
  yearlyRetirements: number;
}

const getConsultantMessage = (profit: number, buys: number, retirements: number, capitalization: number): string => {
    if (profit > 20) {
        if (capitalization > 50) return "Ați construit un imperiu! Atât profitabilitatea, cât și valoarea activelor sunt excepționale. O performanță de top.";
        if (buys > 5) return "Ați investit masiv și a dat roade! O strategie de creștere agresivă, demnă de manualele de business.";
        if (retirements > 3) return "Restructurare dură, dar eficientă. Ați tăiat în carne vie și ați scos un profit impresionant. Felicitări, CEO-ule!";
        return "Profitabilitate excelentă! O eficiență operațională de invidiat. Sunteți un model de urmat.";
    }
    if (profit > 0) {
        if (buys > retirements && capitalization > 30) return "Creștere constantă și investiții prudente. Valoarea companiei crește vizibil. Bravo!";
        return "Ați terminat anul pe plus, ceea ce este mereu o veste bună. Un an solid, fără evenimente neplăcute.";
    }
    if (profit <= 0) {
        if (capitalization > 40) return "Investiții pe termen lung. Deși profitul pe anul acesta a avut de suferit, ați acumulat active valoroase care promit un viitor strălucit.";
        if (buys > 5) return "Atenție la cheltuieli! Ați investit mult, dar rezultatele întârzie să apară. Poate e timpul pentru o reevaluare a strategiei.";
        if (retirements > 5) return "Un an dificil, cu multe restructurări. Sperăm ca eforturile de optimizare să aducă rezultate în anul următor.";
        return "Un an provocator. Rezultatele nu sunt cele așteptate, dar fiecare criză este o oportunitate de a învăța.";
    }
    return "Analiza noastră este... neconcludentă. Anul a fost... interesant.";
}

const MetricDisplay: React.FC<{
  label: string;
  value: string;
  tooltipText: string;
  onClick?: () => void;
}> = ({ label, value, tooltipText, onClick }) => (
  <button 
    disabled={!onClick} 
    onClick={onClick} 
    className="text-center w-full p-2 rounded-lg transition-colors disabled:hover:bg-transparent hover:bg-slate-700/50"
    aria-label={`Vezi graficul pentru ${label}`}
  >
    <div className="flex items-center justify-center space-x-2 mb-1 group relative">
      <h3 className="text-lg font-semibold text-slate-400">{label}</h3>
      <div className="cursor-pointer">
        <InfoIcon />
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 w-72 p-3 bg-slate-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-slate-700">
        {tooltipText}
      </div>
    </div>
    <p className="text-3xl font-bold font-mono text-white">{value}</p>
  </button>
);


const AnnualReport: React.FC<AnnualReportProps> = ({ report, playerHistory, allPlayers, allLatestReports, onContinue, yearlyBuys, yearlyRetirements }) => {
  const message = getConsultantMessage(report.profit, yearlyBuys, yearlyRetirements, report.capitalization);
  const [activeChartKey, setActiveChartKey] = useState<string | null>(null);

  const chartConfig = {
    turnover: { title: 'Cifră de Afaceri ($)', color: '#22C55E' },
    capitalization: { title: 'Capitalizare ($)', color: '#38bdf8' },
    profit: { title: 'Profit Anual ($)', color: '#A855F7' },
    netProfitMargin: { title: 'Marja Profit Net (%)', color: '#f59e0b' },
    returnOnAssets: { title: 'ROA (%)', color: '#10b981' },
    assetTurnover: { title: 'Rotația Activelor (x)', color: '#6366f1' },
  };

  // If multiplayer, construct comparison data for MultiCompanyHistoryChart
  const multiplayerHistories = useMemo(() => {
    if (allPlayers.length <= 1) return [];
    
    return allPlayers.map(player => {
        const latestReport = allLatestReports[player.id];
        // The player.history.annual does not yet contain the report for the just-finished year.
        // So we construct a view of history that includes it.
        const fullReports = latestReport 
            ? [...player.history.annual, latestReport] 
            : player.history.annual;

        return {
            id: player.id,
            companyName: player.name, // Pass the player name to the chart
            reports: fullReports,
            reasonForEnd: '',
            finalYear: report.year,
            finalQuarter: 4
        };
    });
  }, [allPlayers, allLatestReports, report.year]);

  // Single player data for normal chart
  const singlePlayerAnnualHistory = useMemo(() => {
      return [...playerHistory.annual, report];
  }, [playerHistory.annual, report]);


  const handleCloseChart = () => setActiveChartKey(null);

  return (
    <>
      <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl animate-fade-in text-white flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-2 uppercase tracking-wider text-yellow-400">Raport Anual - Anul {report.year}</h1>
        <p className="text-slate-400 mb-8">Bilanțul fiscal a fost finalizat.</p>
        
        <div className="w-full flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-4 my-8 border-t border-slate-700 py-10">
          <button onClick={() => setActiveChartKey('turnover')} className="flex flex-col items-center space-y-4 p-4 rounded-lg transition-colors hover:bg-slate-700/50" aria-label="Vezi graficul pentru Cifră de Afaceri">
              <div className="flex items-center space-x-4">
                  <IncomeIcon />
                  <span className="text-2xl font-semibold text-slate-300">Cifră de Afaceri</span>
              </div>
            <span className="text-5xl font-bold font-mono text-green-400">{report.turnover.toLocaleString()} $</span>
          </button>
          
          <button onClick={() => setActiveChartKey('capitalization')} className="flex flex-col items-center space-y-4 p-4 rounded-lg transition-colors hover:bg-slate-700/50" aria-label="Vezi graficul pentru Capitalizare">
              <div className="flex items-center space-x-4">
                  <CapitalizationIcon />
                  <span className="text-2xl font-semibold text-slate-300">Capitalizare</span>
              </div>
            <span className="text-5xl font-bold font-mono text-sky-400">{report.capitalization.toLocaleString()} $</span>
          </button>
          
          <button onClick={() => setActiveChartKey('profit')} className="flex flex-col items-center space-y-4 p-4 rounded-lg transition-colors hover:bg-slate-700/50" aria-label="Vezi graficul pentru Profit Anual">
              <div className="flex items-center space-x-4">
                  <ProfitIcon />
                  <span className="text-2xl font-semibold text-slate-300">Profit Anual</span>
              </div>
            <span className={`text-5xl font-bold font-mono ${report.profit >= 0 ? 'text-purple-400' : 'text-red-500'}`}>{report.profit.toLocaleString()} $</span>
          </button>
        </div>

        <div className="w-full border-b border-slate-700 pb-10 mb-6">
          <h2 className="text-2xl font-bold text-center text-slate-300 mb-6 uppercase tracking-wider">Indicatori de Performanță</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MetricDisplay 
              label="Marja de Profit Net"
              value={`${report.netProfitMargin.toFixed(2)} %`}
              tooltipText="Cât profit net generezi pentru fiecare 100$ vânduți. Un procent mai mare indică o eficiență operațională mai bună (costuri mai mici în raport cu vânzările)."
              onClick={() => setActiveChartKey('netProfitMargin')}
            />
            <MetricDisplay 
              label="Rentabilitatea Activelor (ROA)"
              value={`${report.returnOnAssets.toFixed(2)} %`}
              tooltipText="Cât profit generează activele tale (cărți, cash). Un procent mai mare arată că ai investit în active 'deștepte' care produc mult profit în raport cu costul lor."
              onClick={() => setActiveChartKey('returnOnAssets')}
            />
            <MetricDisplay 
              label="Rotația Activelor"
              value={`${report.assetTurnover.toFixed(2)} x`}
              tooltipText="De câte ori 'rulezi' valoarea activelor tale prin vânzări într-un an. O valoare mare înseamnă că generezi multe vânzări cu o bază mică de active, indicând o utilizare foarte eficientă."
              onClick={() => setActiveChartKey('assetTurnover')}
            />
          </div>
        </div>


        <div className="w-full my-4 p-6 bg-slate-900/50 border-l-4 border-teal-400 rounded-r-lg">
            <blockquote className="text-lg italic text-slate-300">
                "{message}"
            </blockquote>
            <p className="text-right mt-2 text-sm text-slate-500">- Memo de la Consultanți</p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onContinue}
            className="px-10 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-200 text-2xl animate-pulse"
          >
            Start Anul Următor
          </button>
        </div>
      </div>
      
      {activeChartKey && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={handleCloseChart}>
            <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 shadow-2xl flex flex-col relative max-h-[95vh]" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 text-center">
                    Comparativ: {chartConfig[activeChartKey as keyof typeof chartConfig]?.title}
                </h2>
                
                <div className="flex-grow overflow-y-auto min-h-[300px]">
                     {allPlayers.length > 1 ? (
                         <MultiCompanyHistoryChart 
                            histories={multiplayerHistories}
                            activeSeriesKey={activeChartKey}
                            seriesConfig={chartConfig}
                         />
                     ) : (
                        <HistoryChart
                            data={singlePlayerAnnualHistory as any[]}
                            allSeriesConfig={chartConfig}
                            activeSeriesKeys={[activeChartKey]}
                            onToggleSeries={() => {}} // No toggle in single mode modal
                            onClose={handleCloseChart}
                            showTitleAndCloseX={false}
                        />
                     )}
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={handleCloseChart}
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                    >
                        Închide
                    </button>
                </div>
            </div>
          </div>
      )}
    </>
  );
};

export default AnnualReport;
