
import React from 'react';
import type { CompanyHistory } from '../types';

interface DataPoint {
  year: number;
  [key: string]: number | undefined;
}

interface MultiCompanyHistoryChartProps {
  histories: CompanyHistory[];
  activeSeriesKey: string;
  seriesConfig: { [key: string]: { title: string; color: string } };
}

const COLORS = ['#38bdf8', '#34d399', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444'];

const MultiCompanyHistoryChart: React.FC<MultiCompanyHistoryChartProps> = ({ histories, activeSeriesKey, seriesConfig }) => {
    const PADDING = 60;
    const SVG_WIDTH = 800;
    const SVG_HEIGHT = 400;

    if (histories.length === 0) {
        return <div className="text-center text-slate-400 p-8">Nu există încă istoric salvat. Termină un joc pentru a-l vedea aici.</div>;
    }

    const allReports = histories.flatMap(h => h.reports);
    const maxYear = Math.max(...allReports.map(r => r.year), 1);
    const years = Array.from({ length: maxYear }, (_, i) => i + 1);

    const allValues = allReports.map(r => (r as any)[activeSeriesKey] ?? 0);
    if (allValues.length === 0) allValues.push(0);

    const maxValue = Math.max(...allValues, 0);
    const minValue = Math.min(...allValues, 0);

    const range = maxValue - minValue;
    const y_scale = range === 0 ? (SVG_HEIGHT - PADDING * 2) : (SVG_HEIGHT - PADDING * 2) / range;
    const x_scale = years.length > 1 ? (SVG_WIDTH - PADDING * 2) / (years.length - 1) : 0;
    
    const getCoords = (value: number, year: number) => {
        const index = year - 1;
        const x = PADDING + index * x_scale;
        const y = SVG_HEIGHT - PADDING - (value - minValue) * y_scale;
        return { x, y };
    };

    const zeroY = getCoords(0, 1).y;

    const yAxisLabels = () => {
        const labels = new Set<number>();
        const numLabels = 5;
        if (range === 0) {
            labels.add(minValue);
        } else {
             const step = range / (numLabels - 1);
             for (let i = 0; i < numLabels; i++) {
                labels.add(Math.round(minValue + i * step));
             }
        }
        return Array.from(labels).map((value, i) => {
            const { y } = getCoords(value, 1);
            return (
                <g key={`y-label-${i}`}>
                    <text x={PADDING - 10} y={y + 5} fill="#94a3b8" textAnchor="end" fontSize="12">
                        {value.toLocaleString()}
                    </text>
                    <line x1={PADDING} y1={y} x2={SVG_WIDTH - PADDING} y2={y} stroke="rgba(255,255,255,0.1)" />
                </g>
            );
        });
    };
    
    const renderSeries = (company: CompanyHistory, index: number) => {
        const color = COLORS[index % COLORS.length];
        if (company.reports.length === 0) return null;
        
        const linePath = company.reports.map((d, i) => {
            const { x, y } = getCoords((d as any)[activeSeriesKey] ?? 0, d.year);
            return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
        }).join(' ');

        return (
            <g key={`series-${company.id}`}>
                {company.reports.length > 1 && <path d={linePath} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
                {company.reports.map((d, i) => {
                    const { x, y } = getCoords((d as any)[activeSeriesKey] ?? 0, d.year);
                    return <circle key={`dot-${company.id}-${i}`} cx={x} cy={y} r="4" fill={color} stroke="rgba(255,255,255,0.8)" strokeWidth="2" />;
                })}
            </g>
        );
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex justify-center flex-wrap gap-4 mb-4">
                {histories.map((h, i) => (
                    <div key={h.id} className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                        <span className="text-sm font-semibold">
                            {h.companyName || `Compania ${i + 1}`} ({h.reasonForEnd === 'BANKRUPTCY' ? 'Faliment' : 'Final'} A{h.finalYear})
                        </span>
                    </div>
                ))}
            </div>
            <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-full bg-slate-900/50 rounded-lg">
                {/* Y Axis */}
                {yAxisLabels()}
                {/* X Axis Labels */}
                {years.map((year, i) => {
                     const { x } = getCoords(0, year);
                     return (
                        <text key={`x-label-${i}`} x={x} y={SVG_HEIGHT - PADDING + 20} fill="#94a3b8" textAnchor="middle" fontSize="12">
                            Anul {year}
                        </text>
                     );
                })}
                {/* Zero Line */}
                {minValue < 0 && maxValue > 0 && (
                    <line x1={PADDING} y1={zeroY} x2={SVG_WIDTH - PADDING} y2={zeroY} stroke="#f87171" strokeWidth="2" strokeDasharray="4 4" />
                )}
                {/* Render all company series */}
                {histories.map((h, i) => renderSeries(h, i))}
            </svg>
        </div>
    );
};

export default MultiCompanyHistoryChart;
