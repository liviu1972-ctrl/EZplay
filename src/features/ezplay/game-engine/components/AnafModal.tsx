import React from 'react';
import type { GameAction, GameConfig } from '../types';

interface AnafModalProps {
  onClose: () => void;
  dispatch: React.Dispatch<GameAction>;
  correctValues: Record<string, number>;
  userValues: Record<string, number>;
  mistakeCount: number;
  config: GameConfig;
  previousYearTurnover: number;
  capitalization: number;
}

const AnafModal: React.FC<AnafModalProps> = ({ onClose, dispatch, correctValues, userValues, mistakeCount, config, previousYearTurnover, capitalization }) => {
  const isFirstMistake = mistakeCount === 0;

  const calculateFine = () => {
    // If ANAF is disabled for some reason, no fine.
    if (!config.isAnafEnabled) return 0;

    switch (config.anafPenaltyMode) {
      case 'incremental':
        return isFirstMistake ? 0 : mistakeCount;
      case 'flat_rate':
        return 1;
      case 'warnings_only':
        return 0;
      case 'percentage':
        if (isFirstMistake) return 0;
        const turnoverPenalty = Math.floor(previousYearTurnover * 0.10);
        const capitalizationPenalty = Math.floor(capitalization * 0.05);
        return Math.max(turnoverPenalty, capitalizationPenalty);
      default:
        // Fallback to default behavior
        return isFirstMistake ? 0 : mistakeCount;
    }
  };

  const fine = calculateFine();

  const handleContinue = () => {
    dispatch({ type: 'APPLY_ANAF_PENALTY', payload: { fine } });
    onClose();
  };
  
  const getPenaltyMessage = () => {
    if (fine > 0) {
        return {
            title: `AMENDĂ: ${fine}$`,
            description: `Aceasta este a ${mistakeCount + 1}-a abatere. Se aplică o amendă corespunzătoare.`
        };
    }
    return {
        title: 'AVERTISMENT',
        description: 'De data aceasta este doar un avertisment. Asigură-te că raportezi corect data viitoare.'
    };
  };

  const penaltyMessage = getPenaltyMessage();
  const fields = ['production', 'marketing', 'income', 'expenses'];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-800/90 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-slate-700" onClick={e => e.stopPropagation()}>
        <div className="text-center">
            <h1 className="text-4xl font-bold text-yellow-400">Control ANAF</h1>
            <p className="text-slate-300 mt-2">Am detectat neconcordanțe în raportarea fiscală.</p>
        </div>

        <table className="w-full my-6 text-lg text-left">
            <thead>
                <tr className="border-b-2 border-slate-600">
                    <th className="p-2 text-slate-400">Indicator</th>
                    <th className="p-2 text-center text-red-400">Valoare Raportată</th>
                    <th className="p-2 text-center text-green-400">Valoare Corectă</th>
                </tr>
            </thead>
            <tbody>
                {fields.map(field => {
                    const userVal = userValues[field];
                    const correctVal = correctValues[field];
                    const isIncorrect = userVal !== correctVal;
                    return (
                        <tr key={field} className={`border-b border-slate-700 ${isIncorrect ? 'bg-red-900/30' : ''}`}>
                            <td className="p-2 font-semibold capitalize">{field}</td>
                            <td className={`p-2 text-center font-mono ${isIncorrect ? 'font-bold text-red-400' : ''}`}>{userVal}</td>
                            <td className={`p-2 text-center font-mono ${isIncorrect ? 'font-bold text-green-400' : ''}`}>{correctVal}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        
        <div className={`p-4 rounded-lg text-center ${fine > 0 ? 'bg-red-800/50 border-red-600' : 'bg-yellow-800/50 border-yellow-600'} border`}>
            <h2 className="text-2xl font-bold">{penaltyMessage.title}</h2>
            <p className="mt-1">{penaltyMessage.description}</p>
        </div>

        <div className="mt-8 text-center">
            <button
              onClick={handleContinue}
              className="px-10 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-xl"
            >
              Am înțeles
            </button>
        </div>
      </div>
    </div>
  );
};

export default AnafModal;