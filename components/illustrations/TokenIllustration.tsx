
import React, { useState } from 'react';

const colors = [
  'bg-sky-500/20 text-sky-300 border-sky-500/50',
  'bg-indigo-500/20 text-indigo-300 border-indigo-500/50',
  'bg-purple-500/20 text-purple-300 border-purple-500/50',
  'bg-pink-500/20 text-pink-300 border-pink-500/50',
  'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
];

export const TokenIllustration = () => {
  const [text, setText] = useState('A mesterséges intelligencia csodálatos eszköz.');
  
  // Simple approximation of tokenization for demonstration
  // Matches words (including Hungarian chars), punctuation, or whitespace sequences
  const tokens = text.match(/[\w\u00C0-\u00FF]+|[.,!?;:()]|\s+/g) || [];

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-4">
        <p className="text-sm text-slate-400 mb-2">
            Írj be egy szöveget, hogy lásd, hogyan "látja" és darabolja fel az AI (tokenizálja) a mondatokat.
            Minden színes blokk egy külön egység (token) a modell számára.
        </p>
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all font-medium"
          placeholder="Írj ide valamit..."
        />
      </div>
      
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 min-h-[100px]">
        <div className="flex flex-wrap gap-1.5">
          {tokens.length > 0 ? tokens.map((token, index) => (
            <span 
              key={index}
              className={`px-2 py-1 rounded-md border text-sm font-mono transition-all hover:scale-110 cursor-default select-none ${colors[index % colors.length]}`}
              title={`Token ID: ${Math.floor(Math.random() * 50000)}`}
            >
              {token.match(/^\s+$/) ? '␣' : token}
            </span>
          )) : (
            <span className="text-slate-600 italic text-sm">Kezdj el gépelni a fenti mezőbe...</span>
          )}
        </div>
        <div className="mt-4 text-xs text-slate-500 flex flex-wrap gap-4 border-t border-slate-800 pt-3">
          <div className="flex items-center gap-1">
             <span className="font-bold text-slate-400">{text.length}</span> karakter
          </div>
          <div className="flex items-center gap-1">
             <span className="font-bold text-sky-400">{tokens.length}</span> token
          </div>
          <div className="flex items-center gap-1">
             <span className="font-bold text-slate-400">~{(text.length / Math.max(1, tokens.length)).toFixed(1)}</span> karakter/token
          </div>
        </div>
      </div>
    </div>
  );
};
