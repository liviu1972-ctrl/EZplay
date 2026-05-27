
import type { GameState, PlayerState, Card, AnnualReportData } from '../types';
import { processHandAndCalculateTotals, TurnTotals } from './selectors';

/**
 * Calculates the Annual Report data at the end of a fiscal year.
 * Aggregates quarterly data, calculates total capitalization, and computes key financial ratios (ROA, Profit Margin, etc.).
 */
export const generateAnnualReport = (
    currentYear: number,
    currentQuarter: number,
    playerHistory: PlayerState['history'], // UPDATED: Takes player specific history
    currentTurnTotals: TurnTotals, 
    player: PlayerState, // UPDATED: Takes single player
    activeEvent: Card | null
): AnnualReportData => {
    // 1. Aggregate Quarterly Data (Previous 3 quarters + Current closing quarter)
    const lastFourQuarters = [
        ...playerHistory.quarterly.slice(-3), 
        { year: currentYear, quarter: currentQuarter, ...currentTurnTotals }
    ];

    const annualTurnover = lastFourQuarters.reduce((sum, q) => sum + q.income, 0);
    const annualProfit = lastFourQuarters.reduce((sum, q) => sum + q.profit, 0);
    
    // 2. Calculate Capitalization
    // We must recalculate totals to get the fresh capitalization including hand, deck, discard, assets
    const { turnTotals } = processHandAndCalculateTotals(player, activeEvent);
    const totalEoyCapitalization = turnTotals.capitalization;

    const startOfYearCapitalization = playerHistory.annual.length === 0 
        ? player.initialCapitalization
        : playerHistory.annual[playerHistory.annual.length - 1].capitalization;
    
    const averageCapitalization = (startOfYearCapitalization + totalEoyCapitalization) / 2;

    // 3. Calculate Ratios
    const netProfitMargin = annualTurnover > 0 ? (annualProfit / annualTurnover) * 100 : 0;
    const returnOnAssets = averageCapitalization > 0 ? (annualProfit / averageCapitalization) * 100 : 0;
    const assetTurnover = averageCapitalization > 0 ? (annualTurnover / averageCapitalization) : 0;

    return { 
        year: currentYear, 
        turnover: annualTurnover, 
        profit: annualProfit, 
        capitalization: totalEoyCapitalization, 
        netProfitMargin, 
        returnOnAssets, 
        assetTurnover 
    };
};
