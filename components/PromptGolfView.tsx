
import React, { useState } from 'react';
import { GolfChallenge, GolfResult } from '../types';
import { evaluatePromptGolf } from '../services/geminiService';
import { BackIcon, FlagIcon, LoadingSpinner, SendIcon, SparklesIcon } from './Icons';

interface PromptGolfViewProps {
  onBack: () => void;
}

const CHALLENGES: GolfChallenge[] = [
    // --- SOR 1 ---
    {
        id: 'beginner-1',
        level: 'Kezdő',
        title: 'Nobel-díjasok Listája',
        targetDescription: 'Lista 3 magyar származású Nobel-díjasról. KIZÁRÓLAG a vezetéknevük szerepeljen, vesszővel elválasztva. Semmi más szöveg.',
        par: 5
    },
    {
        id: 'advanced-1',
        level: 'Haladó',
        title: 'Tömör Definíció',
        targetDescription: 'A "Hallucináció" (AI kontextusban) fogalmának definíciója PONTOSAN 3 szóban. Értelmes magyar mondat/kifejezés legyen.',
        par: 4
    },
    {
        id: 'master-1',
        level: 'Mester',
        title: 'Adatelemző CSV',
        targetDescription: 'Egy 3 soros CSV kimenet gyümölcsökről (Név,Szín). Kötelező a fejléc: "Nev,Szin". Megszorítás: TILOS a "CSV", "vessző", "elválasztó", "lista" szavak használata a promptban.',
        forbiddenWords: ['CSV', 'vessző', 'elválasztó', 'lista'],
        par: 10
    },
    // --- SOR 2 ---
    {
        id: 'beginner-2',
        level: 'Kezdő',
        title: 'Egyetlen Emoji',
        targetDescription: 'EGYETLEN emoji, ami a "Végtelen boldogság" érzelmét fejezi ki. Semmi szöveg, csak a jel.',
        par: 3
    },
    {
        id: 'advanced-2',
        level: 'Haladó',
        title: 'Kvantum Ovi',
        targetDescription: 'Egy magyarázat a "szuperpozíció" fogalmáról, ami maximum 1 mondat és érthető egy 5 éves gyereknek.',
        par: 8
    },
    {
        id: 'master-2',
        level: 'Mester',
        title: 'Rekurzív JSON',
        targetDescription: 'Egy valid JSON kimenet, ami egy mapparendszert ír le: "root" -> "docs" -> "file.txt". Megszorítás: TILOS a technikai szavak használata: "JSON", "kulcs", "érték", "objektum", "tömb", "kapcsos".',
        forbiddenWords: ['JSON', 'kulcs', 'érték', 'objektum', 'tömb', 'kapcsos'],
        par: 15
    },
    // --- SOR 3 ---
    {
        id: 'beginner-3',
        level: 'Kezdő',
        title: 'Főváros Kereső',
        targetDescription: 'Ausztrália fővárosának neve. A válaszban KIZÁRÓLAG a város neve szerepeljen, írásjelek és magyarázat nélkül.',
        par: 4
    },
    {
        id: 'advanced-3',
        level: 'Haladó',
        title: 'Bináris Érzelem',
        targetDescription: 'A "Ma borzalmas napom volt, de a vacsora finom." mondat érzelmi töltete. A kimenet KIZÁRÓLAG "1" (ha pozitív) vagy "0" (ha negatív/vegyes) lehet.',
        par: 6
    },
    {
        id: 'master-3',
        level: 'Mester',
        title: 'Implicit Táblázat',
        targetDescription: 'Egy Markdown táblázat (fejléc + elválasztó sor + adat) 2 oszloppal: "Nap" és "Idő". Megszorítás: TILOS a "táblázat", "oszlop", "sor", "markdown", "formátum" szavak használata.',
        forbiddenWords: ['táblázat', 'oszlop', 'sor', 'markdown', 'formátum'],
        par: 10
    }
];

const PromptGolfView: React.FC<PromptGolfViewProps> = ({ onBack }) => {
    const [selectedChallenge, setSelectedChallenge] = useState<GolfChallenge | null>(null);
    const [userPrompt, setUserPrompt] = useState('');
    const [result, setResult] = useState<GolfResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [clientError, setClientError] = useState<string | null>(null);

    const wordCount = userPrompt.trim().split(/\s+/).filter(w => w.length > 0).length;
    const charCount = userPrompt.length;

    const handleReset = () => {
        setResult(null);
        setUserPrompt('');
        setClientError(null);
    };

    const handleChallengeSelect = (challenge: GolfChallenge) => {
        setSelectedChallenge(challenge);
        handleReset();
    };

    const handleSubmit = async () => {
        if (!selectedChallenge || !userPrompt.trim()) return;
        
        // Client side validation for Master level constraints
        if (selectedChallenge.forbiddenWords) {
            const violations = selectedChallenge.forbiddenWords.filter(word => 
                userPrompt.toLowerCase().includes(word.toLowerCase())
            );
            if (violations.length > 0) {
                setClientError(`Szabálytalan! Tiltott szavak: ${violations.join(', ')}`);
                return;
            }
        }
        setClientError(null);
        setIsLoading(true);

        try {
            const aiResult = await evaluatePromptGolf(selectedChallenge, userPrompt);
            setResult(aiResult);
        } catch (error) {
            console.error("Golf error", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!selectedChallenge) {
        return (
            <div className="p-4 sm:p-8 max-w-6xl mx-auto animate-fade-in">
                 <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-6">
                    <BackIcon className="w-5 h-5" /> Vissza a főoldalra
                 </button>
                 
                 <div className="text-center mb-10">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <FlagIcon className="w-10 h-10 text-sky-400" />
                        <h1 className="text-4xl font-bold text-white">Prompt Golf</h1>
                    </div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        A hatékonyság mestere. A cél nem csak a helyes válasz, hanem a lehető legrövidebb prompt megírása.
                        <br />
                        <span className="text-sky-400 font-bold">Kevesebb szó = Jobb pontszám.</span>
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CHALLENGES.map(challenge => (
                        <div 
                            key={challenge.id}
                            onClick={() => handleChallengeSelect(challenge)}
                            className={`
                                relative bg-slate-800 hover:bg-slate-750 border p-6 rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg group overflow-hidden flex flex-col
                                ${challenge.level === 'Mester' ? 'border-amber-500/30 hover:border-amber-500' : challenge.level === 'Haladó' ? 'border-sky-500/30 hover:border-sky-500' : 'border-slate-700 hover:border-green-500'}
                            `}
                        >
                             <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-xs font-bold uppercase
                                ${challenge.level === 'Mester' ? 'bg-amber-500/20 text-amber-400' : challenge.level === 'Haladó' ? 'bg-sky-500/20 text-sky-400' : 'bg-green-500/20 text-green-400'}
                             `}>
                                {challenge.level}
                             </div>

                            <h3 className="text-xl font-bold text-slate-200 group-hover:text-white mb-2 transition-colors mt-2">{challenge.title}</h3>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">{challenge.targetDescription}</p>
                            
                            {challenge.forbiddenWords && (
                                <div className="text-xs text-red-400 mt-2 bg-red-500/5 p-2 rounded border border-red-500/20">
                                    <strong>Tiltott:</strong> {challenge.forbiddenWords.join(', ')}
                                </div>
                            )}
                        </div>
                    ))}
                 </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto min-h-screen flex flex-col animate-fade-in">
            <button onClick={() => setSelectedChallenge(null)} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-4">
                <BackIcon className="w-5 h-5" /> Vissza a pályákhoz
            </button>

            <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col md:flex-row">
                {/* Left: Challenge Info */}
                <div className="p-6 md:w-1/3 bg-slate-900/50 border-r border-slate-700">
                    <div className="mb-6">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded 
                            ${selectedChallenge.level === 'Mester' ? 'bg-amber-500/20 text-amber-400' : selectedChallenge.level === 'Haladó' ? 'bg-sky-500/20 text-sky-400' : 'bg-green-500/20 text-green-400'}
                        `}>
                            {selectedChallenge.level} Pálya
                        </span>
                        <h2 className="text-2xl font-bold text-white mt-2">{selectedChallenge.title}</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase">Cél Kimenet</h3>
                            <p className="text-white font-medium mt-1 p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-inner">
                                {selectedChallenge.targetDescription}
                            </p>
                        </div>
                        
                        {selectedChallenge.forbiddenWords && (
                            <div>
                                <h3 className="text-sm font-bold text-red-500 uppercase">Tiltott Szavak</h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {selectedChallenge.forbiddenWords.map(w => (
                                        <span key={w} className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs line-through decoration-red-400">
                                            {w}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase">Par (Cél hossz)</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <FlagIcon className="w-5 h-5 text-green-500" />
                                <span className="text-white font-mono">~{selectedChallenge.par} szó</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Play Area */}
                <div className="p-6 md:w-2/3 flex flex-col">
                    {!result ? (
                        <>
                            <div className="flex-1 flex flex-col">
                                <label className="text-sm text-slate-400 mb-2">Írd ide a promptodat (minél rövidebb, annál jobb):</label>
                                <textarea 
                                    value={userPrompt}
                                    onChange={(e) => {
                                        setUserPrompt(e.target.value);
                                        setClientError(null);
                                    }}
                                    className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-4 text-white text-lg focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none font-mono"
                                    placeholder="Prompt..."
                                    autoFocus
                                />
                                
                                <div className="flex justify-between items-center mt-4">
                                    <div className={`text-sm font-mono transition-colors ${wordCount > (selectedChallenge.par || 10) ? 'text-amber-400' : 'text-slate-400'}`}>
                                        <span className="font-bold text-white">{wordCount}</span> szó | <span className="font-bold text-white">{charCount}</span> karakter
                                    </div>
                                    
                                    <button 
                                        onClick={handleSubmit}
                                        disabled={isLoading || !userPrompt.trim()}
                                        className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 px-8 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20"
                                    >
                                        {isLoading ? <LoadingSpinner className="w-5 h-5" /> : <SendIcon className="w-5 h-5" />}
                                        Ütés!
                                    </button>
                                </div>
                                {clientError && <p className="text-red-400 mt-2 font-semibold animate-pulse">{clientError}</p>}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-up">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${result.isSuccess ? 'bg-green-500/20 text-green-400 ring-4 ring-green-500/30' : 'bg-red-500/20 text-red-400 ring-4 ring-red-500/30'}`}>
                                {result.isSuccess ? (
                                    <FlagIcon className="w-10 h-10" />
                                ) : (
                                    <span className="text-4xl font-bold">X</span>
                                )}
                            </div>
                            
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {result.isSuccess ? 'Sikeres Ütés!' : 'Pályatévesztés...'}
                            </h2>
                            
                            <p className="text-slate-400 mb-6 max-w-md">
                                {result.reasoning}
                            </p>

                            <div className="bg-slate-900 rounded-lg p-4 w-full mb-6 text-left border border-slate-700">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">AI Kimenet:</h4>
                                <p className="text-slate-200 font-mono text-sm whitespace-pre-wrap">{result.aiOutput}</p>
                            </div>

                            {result.isSuccess && (
                                <div className="flex gap-8 mb-8">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">{wordCount}</div>
                                        <div className="text-xs text-slate-500 uppercase">Szó</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">{charCount}</div>
                                        <div className="text-xs text-slate-500 uppercase">Karakter</div>
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={handleReset}
                                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Újrapróbálom
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PromptGolfView;
