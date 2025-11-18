
import React, { useState, useEffect, useCallback } from 'react';
import { Term, AIAnalysis } from '../types';
import { clarifyTerm } from '../services/geminiService';
import { BackIcon, ThumbsUpIcon, ThumbsDownIcon, SparklesIcon, LoadingSpinner } from './Icons';

interface TermDetailProps {
  term: Term;
  onBack: () => void;
  onVote: (termId: string, voteType: 'use' | 'unknown') => void;
  onSelectRelatedTerm: (termName: string) => void;
}

const TermDetail: React.FC<TermDetailProps> = ({ term, onBack, onVote, onSelectRelatedTerm }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnalysis = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await clarifyTerm(term);
      setAnalysis(result);
    } catch (error) {
      console.error('Failed to fetch AI analysis:', error);
      setAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  }, [term]);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

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
        <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-700 pb-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{term.term_hu}</h1>
            <p className="text-slate-400 text-lg">{term.term_en}</p>
          </div>
          <div className="mt-4 sm:mt-0 text-sm font-medium text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full self-start">
            {term.category}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-300 mb-2">Definíció</h2>
            <p className="text-slate-300 leading-relaxed">{term.definition}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-300 mb-2">Példa</h2>
            <p className="text-slate-300 leading-relaxed italic">"{term.example}"</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-300 mb-2">Források</h2>
            <ul className="list-disc list-inside text-slate-400 space-y-1">
              {term.sources.map((source, index) => (
                <li key={index}>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(source)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-300 hover:underline transition-colors"
                  >
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4 pt-4">
            <button 
              onClick={() => onVote(term.id, 'use')}
              className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <ThumbsUpIcon className="w-5 h-5" />
              <span>Használom ({term.use_score})</span>
            </button>
            <button 
              onClick={() => onVote(term.id, 'unknown')}
              className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <ThumbsDownIcon className="w-