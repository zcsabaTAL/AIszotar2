
import React, { useState, useMemo, useEffect } from 'react';
import { dictionaryData } from './data/dictionary';
import { Term, Category } from './types';
import { CATEGORIES } from './constants';
import TermDetail from './components/TermDetail';
import { SearchIcon, SparklesIcon, ChatIcon, BeakerIcon, FlagIcon } from './components/Icons';
import ChatBot from './components/ChatBot';
import ComparisonView from './components/ComparisonView';
import QuizView from './components/QuizView';
import ScenarioGymView from './components/ScenarioGymView';
import PromptGolfView from './components/PromptGolfView';
import { hasIllustration } from './components/IllustrationRegistry';

const App: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>(dictionaryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [showInteractiveOnly, setShowInteractiveOnly] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [comparisonTerms, setComparisonTerms] = useState<Term[]>([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isScenarioGymActive, setIsScenarioGymActive] = useState(false);
  const [isPromptGolfActive, setIsPromptGolfActive] = useState(false);

  useEffect(() => {
    // Increment search frequency for top terms on load to simulate popularity
    const topTerms = ['chatbot', 'llm', 'gen-ai'];
    setTerms(currentTerms =>
      currentTerms.map(t =>
        topTerms.includes(t.id) ? { ...t, search_frequency: t.search_frequency + Math.floor(Math.random() * 5) } : t
      )
    );
  }, []);

  const handleVote = (termId: string, voteType: 'use' | 'unknown') => {
    setTerms(prevTerms =>
      prevTerms.map(term => {
        if (term.id === termId) {
          if (voteType === 'use') {
            return { ...term, use_score: term.use_score + 1 };
          }
          return { ...term, unknown_score: term.unknown_score + 1 };
        }
        return term;
      })
    );
  };
  
  const handleSelectForComparison = (term: Term) => {
    setComparisonTerms(prev => {
        if(prev.find(t => t.id === term.id)) {
            return prev.filter(t => t.id !== term.id);
        }
        if(prev.length < 2) {
            return [...prev, term];
        }
        return prev;
    });
  };

  const displayedTerms = useMemo(() => {
    const filtered = terms
      .filter(term => {
        if (showInteractiveOnly && !hasIllustration(term.id)) {
            return false;
        }
        if (activeCategory === 'All') return true;
        return term.category === activeCategory;
      })
      .filter(term => {
        const query = searchTerm.toLowerCase();
        return (
          term.term_hu.toLowerCase().includes(query) ||
          term.term_en.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query)
        );
      });

    return filtered.sort((a, b) => {
        if (b.search_frequency !== a.search_frequency) {
            return b.search_frequency - a.search_frequency;
        }
        return a.term_hu.localeCompare(b.term_hu);
    });
  }, [terms, searchTerm, activeCategory, showInteractiveOnly]);


  const handleSelectTerm = (term: Term) => {
      setSelectedTerm(term);
      // increment search frequency
      setTerms(prevTerms =>
        prevTerms.map(t =>
          t.id === term.id ? { ...t, search_frequency: t.search_frequency + 1 } : t
        )
      );
      window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedTerm(null);
    setComparisonTerms([]);
  };

  const handleSelectRelatedTermByName = (termName: string) => {
    // Normalize both the search term and the dictionary term for better matching
    const normalizedTermName = termName.toLowerCase().split(/[/()]/)[0].trim();
    const foundTerm = terms.find(t => 
        t.term_hu.toLowerCase().split(/[/()]/)[0].trim() === normalizedTermName
    );

    if (foundTerm) {
        handleSelectTerm(foundTerm);
    } else {
        console.warn(`Could not find related term by name: "${termName}"`);
        // Fallback: search for the term on the main page
        setSearchTerm(termName);
        handleBack();
    }
  };


  const MainContent = () => (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="text-center mb-10">
        <div className="flex justify-center items-center gap-3">
            <SparklesIcon className="w-10 h-10 text-sky-400" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Interaktív AI Szótár</h1>
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
          Fedezd fel a mesterséges intelligencia világát a Gemini API segítségével.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Keress a fogalmak között (pl. 'Nagy nyelvi modell')"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-slate-500" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setShowInteractiveOnly(!showInteractiveOnly)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-2 ${
                showInteractiveOnly 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30'
            }`}
          >
            <SparklesIcon className="w-4 h-4" />
            Interaktív
          </button>

          <button onClick={() => setActiveCategory('All')} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory === 'All' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>Összes</button>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory === cat ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
              {cat}
            </button>
          ))}
        </div>
        
        {/* Comparison CTA */}
        {comparisonTerms.length > 0 && (
             <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between sticky top-4 z-20 shadow-lg border border-slate-700">
                 <div>
                    <h3 className="font-semibold text-white">Összehasonlítás</h3>
                    <p className="text-sm text-slate-400">
                        {comparisonTerms.length === 1 ? 'Válassz még egy fogalmat az összehasonlításhoz.' : 'Kiválasztva összehasonlításra:'}
                    </p>
                     <div className="flex gap-2 mt-2">
                        {comparisonTerms.map(t => <span key={t.id} className="text-xs bg-sky-500/20 text-sky-300 px-2 py-1 rounded-md">{t.term_hu}</span>)}
                    </div>
                 </div>
                 <button 
                    disabled={comparisonTerms.length !== 2}
                    onClick={() => setSelectedTerm(null) /* This will trigger comparison view */}
                    className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors">
                     Összehasonlítás
                 </button>
             </div>
        )}
        
        {/* Terms List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTerms.map(term => {
            const isInteractive = hasIllustration(term.id);
            return (
            <div 
              key={term.id} 
              onClick={() => handleSelectTerm(term)}
              className={`group p-5 rounded-xl shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer border relative overflow-hidden ${
                isInteractive 
                    ? 'bg-slate-800 border-purple-500/50 shadow-purple-500/20 hover:shadow-purple-500/40 hover:border-purple-400' 
                    : 'bg-slate-800 border-slate-700 hover:shadow-sky-500/10 hover:border-sky-500/50'
              }`}
            >
                {/* Subtle gradient background for interactive cards */}
                {isInteractive && <div className="absolute top-0 right-0 p-16 bg-purple-500/5 rounded-bl-full blur-2xl pointer-events-none"></div>}

                <div>
                    <div className="flex justify-between items-start gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                            <h2 className={`text-xl font-bold truncate pr-1 transition-colors ${isInteractive ? 'text-slate-100 group-hover:text-purple-300' : 'text-slate-100 group-hover:text-sky-400'}`}>
                                {term.term_hu}
                            </h2>
                            {isInteractive && <SparklesIcon className="w-5 h-5 text-purple-400 shrink-0 animate-pulse" />}
                        </div>
                        <div onClick={(e) => { e.stopPropagation(); handleSelectForComparison(term); }} className="p-1 -m-1">
                            <input 
                                type="checkbox" 
                                checked={!!comparisonTerms.find(t => t.id === term.id)}
                                readOnly
                                className="appearance-none h-5 w-5 shrink-0 rounded border border-slate-600 bg-slate-700 checked:bg-sky-500 checked:border-sky-500 cursor-pointer transition-colors relative"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '100%'
                                }}
                                title="Kijelölés összehasonlításra"
                            />
                        </div>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{term.term_en}</p>
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 relative z-10">{term.definition}</p>
                </div>
              <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400 relative z-10">
                <span className="font-medium text-sky-400 bg-sky-400/10 px-2 py-1 rounded-full truncate max-w-[70%] sm:max-w-[200px]" title={term.category}>
                    {term.category}
                </span>
                 <div className="flex items-center gap-1 shrink-0" title="Keresési gyakoriság">
                    <SearchIcon className="w-3 h-3"/>
                    <span>{term.search_frequency}</span>
                 </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 relative">
        {!selectedTerm && comparisonTerms.length !== 2 && !isQuizActive && !isScenarioGymActive && !isPromptGolfActive && (
            <div className="absolute top-6 right-6 z-10 flex flex-col sm:flex-row gap-4 items-end sm:items-center">
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsPromptGolfActive(true)}
                        className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-lg shadow-lg hover:shadow-green-500/10 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 group"
                        title="Prompt Golf - A hatékonyság mestere"
                    >
                        <FlagIcon className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                        <span className="hidden md:inline">Prompt Golf</span>
                    </button>
                    <button
                        onClick={() => setIsScenarioGymActive(true)}
                        className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-lg shadow-lg hover:shadow-sky-500/10 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 group"
                        title="Szituációs Labor - Gyakorolj!"
                    >
                        <BeakerIcon className="w-5 h-5 text-sky-400 group-hover:text-sky-300" />
                        <span className="hidden md:inline">Szituációs Labor</span>
                    </button>
                </div>
                <button
                    onClick={() => setIsQuizActive(true)}
                    className="bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-300 hover:to-indigo-400 text-white font-bold px-5 py-2.5 rounded-lg shadow-lg hover:shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                    title="Tedd próbára a tudásod!"
                >
                    <SparklesIcon className="w-5 h-5 text-white" />
                    <span className="hidden md:inline">AI Kvíz</span>
                </button>
            </div>
        )}
      <main>
        {isQuizActive ? (
            <QuizView terms={terms} onBack={() => setIsQuizActive(false)} />
        ) : isScenarioGymActive ? (
            <ScenarioGymView onBack={() => setIsScenarioGymActive(false)} />
        ) : isPromptGolfActive ? (
            <PromptGolfView onBack={() => setIsPromptGolfActive(false)} />
        ) : selectedTerm ? (
          <TermDetail term={selectedTerm} onBack={handleBack} onVote={handleVote} onSelectRelatedTerm={handleSelectRelatedTermByName} />
        ) : comparisonTerms.length === 2 ? (
            <ComparisonView terms={[comparisonTerms[0], comparisonTerms[1]]} onBack={handleBack} />
        ) : (
          <MainContent />
        )}
      </main>

      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} dictionary={terms} />}
      
      {!isQuizActive && !isScenarioGymActive && !isPromptGolfActive && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-sky-600 hover:bg-sky-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
          title="AI Asszisztens"
        >
          <ChatIcon className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default App;
