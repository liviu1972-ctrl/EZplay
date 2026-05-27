import React from 'react';

// Define the shape of a single data point
interface DataPoint {
  year: number;
  quarter?: number; // Quarter is now optional
  [key: string]: number | undefined; // Allow any other numeric keys
}

interface SeriesConfig {
    [key: string]: {
        title: string;
        color: string;
    }
}

interface HistoryChartProps {
  data: DataPoint[];
  allSeriesConfig: SeriesConfig;
  activeSeriesKeys: string[];
  onToggleSeries: (key: string) => void;
  onClose: () => void;
  showTitleAndCloseX?: boolean;
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data, allSeriesConfig, activeSeriesKeys, onToggleSeries, onClose, showTitleAndCloseX = true }) => {
    const PADDING = 60;
    const SVG_WIDTH = 800;
    const SVG_HEIGHT = 400;

    // Check if the data is quarterly or annual based on the first data point
    const isQuarterly = data.length > 0 && data[0].quarter !== undefined;
    const displayData = data.length > 0 ? data : (isQuarterly ? [{ year: 1, quarter: 0 }] : [{ year: 1 }]);

    const allValues = activeSeriesKeys.flatMap(key => displayData.map(d => d[key] ?? 0));

    if (allValues.length === 0) { // Handle case where there might be no active series initially
        allValues.push(0);
    }
    
    const maxValue = Math.max(...allValues, 0);
    const minValue = Math.min(...allValues, 0);

    const range = maxValue - minValue;
    const y_scale = range === 0 ? (SVG_HEIGHT - PADDING * 2) : (SVG_HEIGHT - PADDING * 2) / range;
    const x_scale = displayData.length > 1 ? (SVG_WIDTH - PADDING * 2) / (displayData.length - 1) : 0;

    const getCoords = (value: number, index: number) => {
        const x = PADDING + index * x_scale;
        const y = SVG_HEIGHT - PADDING - (value - minValue) * y_scale;
        return { x, y };
    };

    const zeroY = getCoords(0, 0).y;

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
            const { y } = getCoords(value, 0);
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
    
    const renderSeries = (dataKey: string, color: string) => {
        const linePath = displayData.map((d, i) => {
            const { x, y } = getCoords(d[dataKey] ?? 0, i);
            return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
        }).join(' ');
        
        const areaPath = `${linePath} L ${PADDING + (displayData.length - 1) * x_scale},${SVG_HEIGHT - PADDING} L ${PADDING},${SVG_HEIGHT - PADDING} Z`;

        return (
            <g key={`series-${dataKey}`}>
                <defs>
                    <linearGradient id={`areaGradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.0} />
                    </linearGradient>
                </defs>
                
                {/* Positive Area Fill */}
                {maxValue > 0 && displayData.length > 1 && (
                    <path d={areaPath} fill={`url(#areaGradient-${dataKey})`} clipPath="url(#positive-area-clip)" />
                )}
                {/* Negative Area Fill */}
                {minValue < 0 && displayData.length > 1 && (
                    <path d={areaPath} fill="rgba(239, 68, 68, 0.4)" clipPath="url(#negative-area-clip)" />
                )}
                
                {/* Line */}
                {displayData.length > 1 && <path d={linePath} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}

                {/* Data Points */}
                {displayData.map((d, i) => {
                    const { x, y } = getCoords(d[dataKey] ?? 0, i);
                    return (
                        <circle key={`dot-${dataKey}-${i}`} cx={x} cy={y} r="4" fill={color} stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
                    );
                })}
            </g>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 shadow-2xl flex flex-col relative max-h-[95vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                {showTitleAndCloseX && <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-600/50 rounded-full transition-colors z-10"
                    aria-label="Închide graficul"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>}

                {showTitleAndCloseX && <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 text-center">Evoluție Indicatori</h2>}
                
                {/* Interactive Legend */}
                <div className="flex justify-center flex-wrap gap-2 mb-4">
                    {/* FIX: Changed from Object.entries to Object.keys to ensure proper type inference for 'config'. */}
                    {Object.keys(allSeriesConfig).map((key) => {
                        const config = allSeriesConfig[key];
                        const isActive = activeSeriesKeys.includes(key);
                        return (
                            <button
                                key={key}
                                onClick={() => onToggleSeries(key)}
                                className={`px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 border-2 ${
                                    isActive 
                                    ? 'text-white shadow-lg' 
                                    : 'bg-slate-700/50 text-slate-300 border-transparent hover:bg-slate-600/50 hover:border-slate-500'
                                }`}
                                style={isActive ? { backgroundColor: config.color, borderColor: 'white' } : {}}
                            >
                                {config.title}
                            </button>
                        )
                    })}
                </div>

                <div className="flex-grow">
                    <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-full">
                        <defs>
                            {/* Clip path for the area above the zero line */}
                            {maxValue > 0 && (
                                <clipPath id="positive-area-clip">
                                    <rect x={PADDING} y={PADDING} width={SVG_WIDTH - PADDING * 2} height={Math.max(0, zeroY - PADDING)} />
                                </clipPath>
                            )}
                            {/* Clip path for the area below the zero line */}
                            {minValue < 0 && (
                                <clipPath id="negative-area-clip">
                                    <rect x={PADDING} y={zeroY} width={SVG_WIDTH - PADDING * 2} height={Math.max(0, SVG_HEIGHT - PADDING - zeroY)} />
                                </clipPath>
                            )}
                        </defs>

                        {/* Y Axis */}
                        {yAxisLabels()}
                        
                        {/* X Axis Labels */}
                        {displayData.map((d, i) => {
                             const { x } = getCoords(0, i); // Y value doesn't matter for x-axis labels
                             const label = isQuarterly
                                ? (d.quarter === 0 ? 'Start' : `A${d.year}Q${d.quarter}`)
                                : `Anul ${d.year}`;
                             return (
                                <text key={`x-label-${i}`} x={x} y={SVG_HEIGHT - PADDING + 20} fill="#94a3b8" textAnchor="middle" fontSize="12">
                                    {label}
                                </text>
                             );
                        })}

                        {/* Zero Line */}
                        {minValue < 0 && maxValue > 0 && (
                            <line
                                x1={PADDING}
                                y1={zeroY}
                                x2={SVG_WIDTH - PADDING}
                                y2={zeroY}
                                stroke="#f87171"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                            />
                        )}

                        {/* Render all active series */}
                        {activeSeriesKeys.map(key => renderSeries(key, allSeriesConfig[key].color))}
                    </svg>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                        aria-label="Închide graficul"
                    >
                        Închide
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoryChart;