
import React, { useState, useEffect } from 'react';

export const LLMPredictionIllustration = () => {
  const [input, setInput] = useState('Az AI jövője');
  const [predictions, setPredictions] = useState<{word: string, prob: number}[]>([]);

  // Mock prediction logic
  useEffect(() => {
    const lastWord = input.trim().split(' ').pop()?.toLowerCase() || '';
    
    let nextWords: {word: string, prob: number}[] = [];
    
    if (['az', 'a', 'egy'].includes(lastWord)) {
        nextWords = [{word: 'modell', prob: 0.4}, {word: 'rendszer', prob: 0.25}, {word: 'jövő', prob: 0.15}];
    } else if (['ai', 'mi', 'modell'].includes(lastWord)) {
        nextWords = [{word: 'képes', prob: 0.5}, {word: 'fejlődik', prob: 0.3}, {word: 'tanul', prob: 0.1}];
    } else if (lastWord.length > 3) {
        nextWords = [{word: 'és', prob: 0.35}, {word: 'vagy', prob: 0.2}, {word: '.', prob: 0.15}];
    } else {
        nextWords = [{word: 'van', prob: 0.3}, {word: 'lesz', prob: 0.25}, {word: 'fontos', prob: 0.1}];
    }
    
    setPredictions(nextWords);
  }, [input]);

  const handleSelectPrediction = (word: string) => {
    setInput(prev => prev + (prev.endsWith(' ') ? '' : ' ') + word + ' ');
  };

  return (
    <div className="w-full">
      <p className="text-sm text-slate-400 mb-3">
        Az LLM-ek nem "gondolkodnak", hanem a korábbi szöveg alapján megjósolják a statisztikailag legvalószínűbb következő szót (tokent).
      </p>
      
      <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 mb-4">
        <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent text-white focus:outline-none font-mono text-lg"
            placeholder="Kezdj el gépelni..."
        />
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Következő token valószínűsége:</h4>
        {predictions.map((pred, idx) => (
            <div 
                key={idx} 
                onClick={() => handleSelectPrediction(pred.word)}
                className="group cursor-pointer"
            >
                <div className="flex justify-between text-sm mb-1 text-slate-300 group-hover:text-sky-300">
                    <span className="font-mono font-bold">"{pred.word}"</span>
                    <span>{(pred.prob * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div 
                        className="bg-sky-500 h-2.5 rounded-full transition-all duration-500 group-hover:bg-sky-400" 
                        style={{ width: `${pred.prob * 100}%` }}
                    ></div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
