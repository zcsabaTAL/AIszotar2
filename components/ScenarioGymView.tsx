
import React, { useState } from 'react';
import { Scenario, ScenarioResult } from '../types';
import { evaluateScenario } from '../services/geminiService';
import { BackIcon, BeakerIcon, LoadingSpinner, SparklesIcon, SendIcon } from './Icons';

interface ScenarioGymViewProps {
  onBack: () => void;
}

const SCENARIOS: Scenario[] = [
    {
        id: 'customer-support',
        title: 'Dühös Ügyfél Kezelése',
        description: 'Egy feldúlt ügyfél levelet írt, mert 3 napot késett a csomagja, ami szülinapi ajándék volt.',
        task: 'Írj egy promptot, ami ráveszi az AI-t egy válaszlevél megírására. A válasz legyen empatikus, de jogilag óvatos (ne ismerj el kártérítési felelősséget), és ajánljon fel egy 10%-os kupont engesztelésül.',
        role: 'Senior Ügyfélszolgálati Munkatárs'
    },
    {
        id: 'project-management',
        title: 'Projekt Krízis Kommunikáció',
        description: 'A projekt határideje holnap van, de a kritikus funkciók fele hiányzik. A megrendelő még nem tud róla.',
        task: 'Írj egy promptot, ami generál egy emailt a megrendelőnek (Stakeholder). A cél a kármentés: menedzseld az elvárásokat, vázolj fel egy "B" tervet (MVP átadása), és maradj professzionális, de határozott.',
        role: 'Projekt Menedzser'
    },
    {
        id: 'marketing',
        title: 'Virális Kampány Ötletelés',
        description: 'Egy új, koffeinmentes energiaitalt dobunk piacra, ami kifejezetten gamereknek szól (jobb alvás miatt).',
        task: 'Írj egy promptot, ami 3 konkrét TikTok videó koncepciót generál. A stílus legyen humoros, "Z generációs" szlenggel fűszerezett, és ne tűnjön izzadságszagú reklámnak.',
        role: 'Kreatív Marketing Stratéga'
    },
    {
        id: 'development',
        title: 'Legacy Kód Refaktor',
        description: 'Találtál egy régi, komment nélküli Python függvényt a kódbázisban, ami rejtélyes hibát dob, de senki nem meri törölni.',
        task: 'Írj egy promptot, ami: 1. Megkéri az AI-t, hogy magyarázza el a kód működését. 2. Keressen benne potenciális hibát. 3. Írja át a kódot modern Clean Code elvek szerint (type hintinggel).',
        role: 'Senior Szoftverfejlesztő'
    }
];

const ScenarioGymView: React.FC<ScenarioGymViewProps> = ({ onBack }) => {
    const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
    const [userPrompt, setUserPrompt] = useState('');
    const [result, setResult] = useState<ScenarioResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!selectedScenario || !userPrompt.trim()) return;
        
        setIsLoading(true);
        try {
            const aiResult = await evaluateScenario(selectedScenario, userPrompt);
            setResult(aiResult);
        } catch (error) {
            console.error("Failed to evaluate scenario", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReset = () => {
        setResult(null);
        setUserPrompt('');
    };

    const handleScenarioSelect = (scenario: Scenario) => {
        setSelectedScenario(scenario);
        handleReset();
    };

    if (!selectedScenario) {
        return (
            <div className="p-4 sm:p-8 max-w-6xl mx-auto animate-fade-in">
                 <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-6">
                    <BackIcon className="w-5 h-5" /> Vissza a főoldalra
                 </button>
                 
                 <div className="text-center mb-10">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <BeakerIcon className="w-10 h-10 text-sky-400" />
                        <h1 className="text-4xl font-bold text-white">Szituációs Labor</h1>
                    </div>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Teszteld a "Prompt Engineering" képességeidet valós munkahelyi helyzetekben! 
                        Válassz egy szituációt, és próbáld meg úgy instruálni az AI-t, hogy a legjobb eredményt kapd.
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SCENARIOS.map(scenario => (
                        <div 
                            key={scenario.id}
                            onClick={() => handleScenarioSelect(scenario)}
                            className="bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-sky-500/50 p-6 rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg group"
                        >
                            <h3 className="text-xl font-bold text-slate-200 group-hover:text-sky-400 mb-2 transition-colors">{scenario.title}</h3>
                            <p className="text-slate-400 text-sm mb-4">{scenario.description}</p>
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-900/50 p-2 rounded">
                                <span className="text-sky-500">Szerep:</span> {scenario.role}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col animate-fade-in">
            <button onClick={() => setSelectedScenario(null)} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-4">
                <BackIcon className="w-5 h-5" /> Vissza a szcenáriókhoz
            </button>

            <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
                {/* Left Panel: Task Info */}
                <div className="lg:w-1/3 bg-slate-800 rounded-xl p-6 shadow-lg overflow-y-auto border border-slate-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-sky-500/20 rounded-lg">
                            <BeakerIcon className="w-6 h-6 text-sky-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">{selectedScenario.title}</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">A Helyzet</h3>
                            <p className="text-slate-300 leading-relaxed">{selectedScenario.description}</p>
                        </div>
                        
                        <div className="bg-slate-700/30 p-4 rounded-lg border-l-4 border-sky-500">
                            <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-2">A Te Feladatod</h3>
                            <p className="text-white font-medium leading-relaxed">{selectedScenario.task}</p>
                        </div>

                        <div>
                             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">AI Szerepe</h3>
                             <span className="inline-block bg-slate-900 text-sky-300 px-3 py-1 rounded-full text-sm font-mono border border-slate-700">
                                {selectedScenario.role}
                             </span>
                        </div>
                    </div>
                </div>

                {/* Center/Right Panel: Workspace */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Prompt Input Area */}
                    <div className={`bg-slate-800 rounded-xl p-6 shadow-lg flex flex-col border border-slate-700 transition-all duration-500 ${result ? 'h-1/3' : 'h-full'}`}>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <SparklesIcon className="w-5 h-5 text-purple-400" />
                            Írd ide a promptot:
                        </h3>
                        <textarea 
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            placeholder="Pl: Viselkedj úgy mint egy senior ügyfélszolgálatos, és írj egy válaszlevelet..."
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm resize-none mb-4"
                            disabled={!!result || isLoading}
                        />
                        {!result && (
                            <div className="flex justify-end">
                                <button 
                                    onClick={handleSubmit}
                                    disabled={!userPrompt.trim() || isLoading}
                                    className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
                                >
                                    {isLoading ? <LoadingSpinner className="w-5 h-5" /> : <SendIcon className="w-5 h-5" />}
                                    {isLoading ? 'Szimuláció fut...' : 'Szimuláció Indítása'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Results Area */}
                    {result && (
                         <div className="flex-1 bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 overflow-y-auto animate-fade-in-up">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold text-white">Eredmény</h3>
                                <div className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
                                    <span className="text-slate-400 text-sm uppercase mr-2">Értékelés:</span>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span key={star} className={`text-xl ${star <= result.score ? 'text-yellow-400' : 'text-slate-700'}`}>★</span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* AI Simulated Response */}
                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <h4 className="text-sm font-bold text-sky-400 uppercase mb-3 border-b border-slate-800 pb-2">
                                        Az AI válasza a promptodra:
                                    </h4>
                                    <p className="text-slate-300 text-sm whitespace-pre-wrap font-serif leading-relaxed">
                                        {result.aiResponse}
                                    </p>
                                </div>

                                {/* Mentor Critique */}
                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-10 bg-purple-500/10 rounded-bl-full blur-xl"></div>
                                    <h4 className="text-sm font-bold text-purple-400 uppercase mb-3 border-b border-slate-800 pb-2 relative z-10">
                                        Mentor Visszajelzése:
                                    </h4>
                                    <p className="text-slate-300 text-sm whitespace-pre-wrap italic relative z-10">
                                        "{result.critique}"
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <button 
                                    onClick={handleReset}
                                    className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                                >
                                    Újrapróbálom / Másik Prompt
                                </button>
                            </div>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScenarioGymView;
