
import React, { useState, useEffect } from 'react';
import { Term } from '../types';
import { BackIcon, SparklesIcon } from './Icons';

interface QuizViewProps {
  terms: Term[];
  onBack: () => void;
}

interface QuizQuestion {
  correctAnswer: Term;
  options: string[];
  definition: string;
}

// Fisher-Yates shuffle algorithm for unbiased randomization
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QuizView: React.FC<QuizViewProps> = ({ terms, onBack }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const totalQuestions = 10;
  const timePerQuestion = 60;

  useEffect(() => {
    if (terms.length < 4) return; 

    const generateQuestions = () => {
        const allTerms = [...terms];
        const shuffledTerms = shuffleArray(allTerms);
        const quizQuestions: QuizQuestion[] = [];

        for (let i = 0; i < Math.min(totalQuestions, shuffledTerms.length); i++) {
            const correctAnswer = shuffledTerms[i];
            const otherTerms = allTerms.filter(t => t.id !== correctAnswer.id);
            // Select 3 wrong answers randomly
            const wrongOptions = shuffleArray(otherTerms).slice(0, 3).map(t => t.term_hu);
            
            // Combine and shuffle options
            const options = shuffleArray([correctAnswer.term_hu, ...wrongOptions]);
            
            quizQuestions.push({
                correctAnswer,
                options,
                definition: correctAnswer.definition,
            });
        }
        setQuestions(quizQuestions);
    };

    generateQuestions();
  }, [terms]);

  useEffect(() => {
    if (isAnswered || currentQuestionIndex >= questions.length) return;

    const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
                clearInterval(timer);
                setIsAnswered(true); // Auto-submit when time is up
                return 0;
            }
            return prevTime - 1;
        });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnswered, currentQuestionIndex, questions.length]);
  
  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentQuestionIndex].correctAnswer.term_hu) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(timePerQuestion);
    setCurrentQuestionIndex(prev => prev + 1);
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(timePerQuestion);
    // Logic triggers re-generation via useEffect when component remounts or we could extract logic.
    // For simplicity in this view, we rely on state reset. 
    // To force re-shuffle properly without complex extraction:
    const allTerms = [...terms];
    const shuffledTerms = shuffleArray(allTerms);
    const quizQuestions: QuizQuestion[] = [];
    for (let i = 0; i < Math.min(totalQuestions, shuffledTerms.length); i++) {
        const correctAnswer = shuffledTerms[i];
        const otherTerms = allTerms.filter(t => t.id !== correctAnswer.id);
        const wrongOptions = shuffleArray(otherTerms).slice(0, 3).map(t => t.term_hu);
        const options = shuffleArray([correctAnswer.term_hu, ...wrongOptions]);
        quizQuestions.push({ correctAnswer, options, definition: correctAnswer.definition });
    }
    setQuestions(quizQuestions);
  }

  if (questions.length === 0) {
    return (
        <div className="p-8 max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">AI Tudáspróba</h1>
            <p className="text-slate-400">A kvíz betöltése... vagy nincs elég fogalom a szótárban.</p>
            <button
                onClick={onBack}
                className="mt-6 flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mx-auto"
            >
                <BackIcon className="w-5 h-5" />
                Vissza a listához
            </button>
        </div>
    );
  }
  
  const isQuizFinished = currentQuestionIndex >= questions.length;

  if (isQuizFinished) {
      return (
        <div className="p-8 max-w-4xl mx-auto text-center animate-fade-in">
             <div className="bg-slate-800 rounded-xl shadow-lg p-8">
                <h1 className="text-4xl font-bold text-sky-400 mb-4">A Kvíz Befejeződött!</h1>
                <p className="text-2xl text-slate-300 mb-8">
                    Végeredményed: <span className="font-bold text-white">{score}</span> / <span className="font-bold text-white">{questions.length}</span>
                </p>
                <div className="flex justify-center gap-4">
                     <button
                        onClick={onBack}
                        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                        <BackIcon className="w-5 h-5" />
                        Vissza a szótárhoz
                    </button>
                    <button 
                        onClick={handleRestart}
                        className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Újrapróbálkozás
                    </button>
                </div>
            </div>
        </div>
      )
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = (timeLeft / timePerQuestion) * 100;
  const progressBarColor = timeLeft > 20 ? 'bg-sky-500' : timeLeft > 10 ? 'bg-amber-500' : 'bg-red-500';

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
            <h1 className="text-3xl font-bold text-white flex items-center gap-3"><SparklesIcon className="w-7 h-7 text-sky-400"/> AI Tudáspróba</h1>
            <div className="text-lg font-bold text-slate-300 mt-2 sm:mt-0">
                <span>{currentQuestionIndex + 1} / {questions.length}</span>
                <span className="mx-2">|</span>
                <span>Pontszám: {score}</span>
            </div>
        </div>
        
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-slate-400">Hátralévő idő:</p>
                <p className="text-sm font-mono font-bold text-white bg-slate-700 px-2 py-0.5 rounded">{timeLeft}s</p>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div 
                    className={`h-2.5 rounded-full ${progressBarColor}`} 
                    style={{ width: `${progressPercentage}%`, transition: 'width 1s linear, background-color 0.5s' }}>
                </div>
            </div>
        </div>

        <div className="mb-8">
            <p className="text-slate-400 mb-2 text-lg">Melyik fogalomra illik a leírás?</p>
            <blockquote className="border-l-4 border-sky-500 pl-4 py-2 bg-slate-700/50 rounded-r-lg">
                <p className="text-slate-200 text-xl italic">"{currentQuestion.definition}"</p>
            </blockquote>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => {
                const isCorrect = option === currentQuestion.correctAnswer.term_hu;
                let buttonClass = 'bg-slate-700 hover:bg-slate-600';
                if (isAnswered) {
                    if(isCorrect) {
                        buttonClass = 'bg-green-500/80 text-white ring-2 ring-green-400';
                    } else if (selectedAnswer === option) {
                        buttonClass = 'bg-red-500/80 text-white ring-2 ring-red-400';
                    } else {
                        buttonClass = 'bg-slate-700 opacity-60';
                    }
                }

                return (
                     <button 
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={isAnswered}
                        className={`p-4 rounded-lg text-left text-lg font-semibold transition-all duration-300 ${buttonClass} disabled:cursor-not-allowed text-white`}
                     >
                        {option}
                     </button>
                );
            })}
        </div>

        {isAnswered && (
            <div className="mt-8 text-center animate-fade-in">
                <button 
                    onClick={handleNextQuestion}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                    {currentQuestionIndex === questions.length - 1 ? 'Kvíz befejezése' : 'Következő kérdés'}
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default QuizView;
