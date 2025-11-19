
import React, { useState } from 'react';

export const ContextWindowIllustration = () => {
  const [tokens, setTokens] = useState<string[]>(['Szia', ',', 'hogy', 'vagy', '?']);
  const [inputValue, setInputValue] = useState('');
  
  const MAX_CONTEXT = 8;

  const handleAddToken = () => {
    if (!inputValue.trim()) return;
    const newTokens = inputValue.trim().split(' ');
    setTokens(prev => [...prev, ...newTokens]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddToken();
  };

  const visibleTokens = tokens.slice(Math.max(0, tokens.length - MAX_CONTEXT));
  const forgottenCount = Math.max(0, tokens.length - MAX_CONTEXT);

  return (
    <div className="w-full">
      <p className="text-sm text-slate-400 mb-4">
        A kontextus ablak korlátos. Ha megtelik, a modell "elfelejti" a beszélgetés elejét, ahogy új információ érkezik.
      </p>

      <div className="relative h-24 bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-xl flex items-center overflow-hidden px-4 mb-4">
        <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent w-12 z-10 pointer-events-none"></div>
        
        <div className="flex gap-2 items-center w-full justify-end transition-all duration-300">
           {forgottenCount > 0 && (
             <span className="text-xs text-slate-600 font-mono whitespace-nowrap pr-2 opacity-50">
               ... {forgottenCount} elveszett token
             </span>
           )}
           {visibleTokens.map((token, idx) => (
             <div key={idx} className="animate-fade-in-up bg-sky-900/40 border border-sky-500/30 text-sky-200 px-3 py-2 rounded-lg font-mono text-sm whitespace-nowrap shadow-sm">
               {token}
             </div>
           ))}
        </div>
        
        {/* Visual indicator of "The Window" */}
        <div className="absolute inset-0 border-4 border-sky-500/20 rounded-xl pointer-events-none"></div>
        <div className="absolute top-2 right-2 text-[10px] font-bold text-sky-500/50 uppercase tracking-widest">Aktív Memória</div>
      </div>

      <div className="flex gap-2">
        <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Írj be új szavakat..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none text-sm"
        />
        <button 
            onClick={handleAddToken}
            className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
            Hozzáad
        </button>
      </div>
      <div className="mt-2 text-xs text-slate-500 text-center">
        Maximális kapacitás: {MAX_CONTEXT} token
      </div>
    </div>
  );
};
