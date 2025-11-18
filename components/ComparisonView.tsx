
import React, { useState, useEffect, useCallback } from 'react';
import { Term } from '../types';
import { compareTerms } from '../services/geminiService';
import { BackIcon, LoadingSpinner, SparklesIcon } from './Icons';

interface ComparisonViewProps {
  terms: [Term, Term];
  onBack: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ terms, onBack }) => {
  const [comparison, setComparison] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchComparison = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await compareTerms(terms[0], terms[1]);
      // Basic markdown formatting for newlines
      const formattedResult = result.replace(/\n/g, '<br />');
      setComparison(formattedResult);
    } catch (error) {
      console.error('Failed to fetch comparison:', error);
      setComparison('Hiba történt az összehasonlítás során.');
    } finally {
      setIsLoading(false);
    }
  }, [terms]);

  useEffect(() => {
    fetchComparison();
  }, [fetchComparison]);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-6"
      >
        <BackIcon className="w-5 h-5" />
        Vissza a listához
      </button>

      <div className="bg-slate-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
          <SparklesIcon className="w-8 h-8 text-sky-400" />
          <h1 className="text-3xl font-bold text-white">Összehasonlítás</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {terms.map(term => (
                 <div key={term.id} className="bg-slate-700/50 p-4 rounded-lg">
                    <h2 className="text-xl font-bold text-sky-300">{term.term_hu}</h2>
                    <p className="text-sm text-slate-400 mb-2">{term.term_en}</p>
                    <p className="text-slate-300 text-sm">{term.definition}</p>
                </div>
            ))}
        </div>

        <div>
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">AI Elemzés</h2>
            {isLoading ? (
                <div className="flex justify-center items-center h-64 bg-slate-700/30 rounded-lg">
                    <div className="text-center">
                        <LoadingSpinner className="w-12 h-12 text-sky-400 mx-auto" />
                        <p className="mt-4 text-slate-400">A Gemini Pro modell elemzi a fogalmakat...</p>
                        <p className="text-sm text-slate-500">(Ez eltarthat egy pillanatig)</p>
                    </div>
                </div>
            ) : (
                <div className="prose prose-invert prose-p:text-slate-300 prose-h3:text-sky-400 bg-slate-700/30 p-5 rounded-lg">
                    <div dangerouslySetInnerHTML={{ __html: comparison }} />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
