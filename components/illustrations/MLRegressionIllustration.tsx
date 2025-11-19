
import React, { useState } from 'react';

export const MLRegressionIllustration = () => {
  const [epoch, setEpoch] = useState(0);

  // Fixed mock data points
  const points = [
    {x: 10, y: 20}, {x: 30, y: 45}, {x: 50, y: 40}, 
    {x: 70, y: 80}, {x: 90, y: 85}
  ];

  // Initial random line parameters
  const startSlope = 0.2;
  const startIntercept = 10;

  // Target "optimal" line parameters
  const targetSlope = 0.85;
  const targetIntercept = 10;

  // Interpolate line based on epoch (0-10)
  const progress = epoch / 10; // 0 to 1
  const currentSlope = startSlope + (targetSlope - startSlope) * progress;
  const currentIntercept = startIntercept + (targetIntercept - startIntercept) * progress;

  const getY = (x: number) => currentSlope * x + currentIntercept;

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-sm text-slate-400 mb-4 w-full">
        A gépi tanulás lényege a "fit": az algoritmus addig állítgatja a belső paramétereit (itt a vonal dőlésszögét), amíg a lehető legjobban illeszkedik az adatokra.
      </p>

      <div className="relative w-full h-48 bg-slate-900 border border-slate-700 rounded-lg mb-4 overflow-hidden">
         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
            
            {/* Data Points */}
            {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={100 - p.y} r="2" fill="#ef4444" className="animate-pulse" />
            ))}

            {/* Regression Line */}
            <line 
                x1="0" 
                y1={100 - getY(0)} 
                x2="100" 
                y2={100 - getY(100)} 
                stroke="#38bdf8" 
                strokeWidth="1.5" 
                className="transition-all duration-300 ease-out"
            />
         </svg>
      </div>

      <div className="w-full flex items-center gap-4">
        <span className="text-xs font-mono text-slate-400">Kezdeti</span>
        <input 
            type="range" 
            min="0" 
            max="10" 
            value={epoch} 
            onChange={(e) => setEpoch(parseInt(e.target.value))}
            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
        />
        <span className="text-xs font-mono text-sky-400 font-bold">Tanulás: {epoch * 10}%</span>
      </div>
      <div className="mt-2 text-xs text-slate-500">
        Húzd a csúszkát a tanítás szimulálásához!
      </div>
    </div>
  );
};
