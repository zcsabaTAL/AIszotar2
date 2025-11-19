
import React, { useState } from 'react';

export const DeepLearningIllustration = () => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  // Simple 8x8 pixel grid data for a "Smile"
  const inputPixels = [
    0,0,0,0,0,0,0,0,
    0,0,1,0,0,1,0,0,
    0,0,1,0,0,1,0,0,
    0,0,0,0,0,0,0,0,
    0,1,0,0,0,0,1,0,
    0,0,1,1,1,1,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
  ];

  const layers = [
    { id: 1, name: "1. Réteg", desc: "Élek és vonalak", color: "bg-indigo-500" },
    { id: 2, name: "2. Réteg", desc: "Formák (szem, száj)", color: "bg-purple-500" },
    { id: 3, name: "Kimenet", desc: "Osztályozás: 'Mosoly'", color: "bg-green-500" },
  ];

  return (
    <div className="w-full">
        <p className="text-sm text-slate-400 mb-4">
            A mélytanulás (Deep Learning) több rétegben dolgozza fel az adatot. Minden réteg egyre magasabb szintű jellemzőket ismer fel (élek -> formák -> objektumok).
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Input Image */}
            <div className="flex flex-col items-center">
                <span className="text-xs text-slate-500 mb-2">Bemenet (Kép)</span>
                <div className="grid grid-cols-8 gap-0.5 bg-slate-800 p-1 rounded border border-slate-700 w-24 h-24">
                    {inputPixels.map((p, i) => (
                        <div 
                            key={i} 
                            className={`w-full h-full ${p ? 'bg-white' : 'bg-slate-900'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Arrow */}
            <div className="text-slate-600 text-2xl hidden sm:block">→</div>

            {/* Layers Stack */}
            <div className="flex-1 w-full flex flex-col sm:flex-row gap-2 justify-center">
                {layers.map((layer) => (
                    <div 
                        key={layer.id}
                        onMouseEnter={() => setActiveLayer(layer.id)}
                        onMouseLeave={() => setActiveLayer(null)}
                        className={`
                            relative flex-1 h-20 sm:h-24 rounded-lg border border-slate-600 
                            flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                            ${activeLayer === layer.id ? `${layer.color} bg-opacity-20 border-white scale-105` : 'bg-slate-800 hover:bg-slate-700'}
                        `}
                    >
                        <div className={`w-3 h-3 rounded-full mb-2 ${layer.color} ${activeLayer === layer.id ? 'animate-ping' : ''}`}></div>
                        <span className="text-xs font-bold text-slate-200">{layer.name}</span>
                        
                        {/* Popup Description */}
                        <div className={`
                            absolute -top-12 left-1/2 transform -translate-x-1/2 
                            bg-slate-900 text-white text-xs px-2 py-1 rounded border border-slate-600 whitespace-nowrap z-20
                            transition-opacity duration-200 pointer-events-none
                            ${activeLayer === layer.id ? 'opacity-100' : 'opacity-0'}
                        `}>
                            {layer.desc}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-slate-500">
            Húzd az egeret a rétegek fölé, hogy lásd, mit "látnak"!
        </div>
    </div>
  );
};
