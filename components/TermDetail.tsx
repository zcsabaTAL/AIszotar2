
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    let isMounted = true;

    const fetchAnalysis = async () => {
      setIsLoading(true);
      try {
        const result = await clarifyTerm(term);
        if (isMounted) setAnalysis(result);
      } catch (error) {
        console.error('Failed to fetch AI analysis:', error);
        if (isMounted) setAnalysis(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAnalysis();

    return () => { isMounted = false; };
  }, [term.id]); // Only fetch when term ID changes

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
            <h2 className="text-xl font-semibold text-slate-300 mb-2">Ajánlott Források (Statikus)</h2>
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
              <ThumbsDownIcon className="w-5 h-5" />
              <span>Nem ismertem ({term.unknown_score})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-slate-800/50 border border-sky-500/20 rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <SparklesIcon className="w-7 h-7 text-sky-400" />
          <h2 className="text-2xl font-bold text-sky-400">AI Elemzés és Kutatás</h2>
        </div>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-40 text-center">
            <LoadingSpinner className="w-10 h-10 text-sky-400" />
            <p className="mt-4 text-slate-400">Élő adatok keresése...</p>
            <p className="text-sm text-slate-500">A Gemini modell a weben kutat a legfrissebb infókért.</p>
          </div>
        ) : analysis ? (
          <div className="space-y-6 text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">Közérthető Definíció</h3>
              <p>{analysis.abstractDefinition}</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">Gyakorlati Példa Magyarországon</h3>
              <p>{analysis.hungarianExample}</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">Relevancia (EU/HU)</h3>
              <p>{analysis.relevance}</p>
            </div>
            
            {/* Dynamic Grounding Sources Section */}
            {analysis.groundingSources && analysis.groundingSources.length > 0 && (
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <h3 className="font-semibold text-slate-100 mb-2 text-sm uppercase tracking-wider">Aktuális online források</h3>
                <ul className="space-y-2">
                  {analysis.groundingSources.map((source, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-500 mt-1">›</span>
                      <a 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300 text-sm hover:underline break-all"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.relatedTerms && analysis.relatedTerms.length > 0 && (
                <div>
                    <h3 className="font-semibold text-slate-100 mb-2">Kapcsolódó Fogalmak</h3>
                    <div className="flex flex-wrap gap-2">
                        {analysis.relatedTerms.map((related, index) => (
                            <button 
                                key={index} 
                                onClick={() => onSelectRelatedTerm(related)}
                                className="bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-sky-300 text-sm px-3 py-1 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                                {related}
                            </button>
                        ))}
                    </div>
                </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400">Nem sikerült betölteni az AI elemzést.</p>
        )}
      </div>
    </div>
  );
};

export default TermDetail;
