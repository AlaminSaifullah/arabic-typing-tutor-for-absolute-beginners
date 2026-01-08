import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ARABIC_KEY_MAP, LESSONS } from './constants';
import { Lesson, TypingStats } from './types';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { TypingArea } from './components/TypingArea';
import { Stats } from './components/Stats';
import { RefreshCw, Keyboard, CheckCircle2, Maximize2, Ban, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [currentLesson, setCurrentLesson] = useState<Lesson>(LESSONS[0]);
  const [userInput, setUserInput] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [isZenMode, setIsZenMode] = useState(false);
  const [isStrictMode, setIsStrictMode] = useState(true);
  
  // Stats State
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errorCount, setErrorCount] = useState(0); // Tracks raw error events (Strict) or wrong chars (Forgiving)
  const [isFocused, setIsFocused] = useState(true);

  // --- Derived State ---
  const currentIndex = userInput.length;
  const isLessonComplete = currentIndex >= currentLesson.text.length;
  
  // Calculate correct characters based on actual matching input
  const correctCharCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentLesson.text[i]) {
        count++;
      }
    }
    return count;
  }, [userInput, currentLesson.text]);

  const stats: TypingStats = useMemo(() => {
    const totalAttempts = userInput.length + errorCount; // Approximation for accuracy
    // Accuracy = Correct Chars / (Correct + Errors Made)
    // Note: errorCount tracks 'flashed' errors in strict mode, or raw typing errors.
    const accuracy = totalAttempts > 0 ? (correctCharCount / (correctCharCount + errorCount)) * 100 : 100;
    
    let wpm = 0;
    if (startTime && userInput.length > 0) {
      const timeElapsedMinutes = (Date.now() - startTime) / 60000;
      wpm = (correctCharCount / 5) / timeElapsedMinutes;
    }

    return {
      wpm: wpm || 0,
      accuracy: Math.max(0, accuracy),
      correctChars: correctCharCount,
      totalChars: currentLesson.text.length,
      startTime
    };
  }, [correctCharCount, errorCount, startTime, currentLesson.text.length, userInput.length]);

  // --- Handlers ---

  const resetLesson = useCallback(() => {
    setUserInput("");
    setIsError(false);
    setStartTime(null);
    setErrorCount(0);
    setPressedKey(null);
  }, []);

  const changeLesson = (lessonId: number) => {
    const lesson = LESSONS.find(l => l.id === lessonId) || LESSONS[0];
    setCurrentLesson(lesson);
    resetLesson();
  };

  const toggleZenMode = () => setIsZenMode(prev => !prev);
  const toggleStrictMode = () => {
    setIsStrictMode(prev => !prev);
    // Focus reset or cleanup if needed
  };

  // Zen Mode Escape Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZenMode) {
        setIsZenMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZenMode]);

  const handleInput = useCallback((key: string, code: string) => {
    if (isLessonComplete) return;

    if (startTime === null) setStartTime(Date.now());
    
    // Handle Backspace
    if (key === 'Backspace') {
      setUserInput(prev => prev.slice(0, -1));
      setIsError(false);
      return;
    }

    // Ignore modifiers
    if (['Shift', 'Alt', 'Control', 'CapsLock', 'Tab', 'Escape', 'Enter'].includes(key)) return;

    // Determine the character to insert
    // 1. Try to map physical key to Arabic
    const mapped = ARABIC_KEY_MAP[code];
    // 2. Fallback to key itself (e.g. for numbers/symbols if not mapped or for English keyboard fallback)
    const inputChar = mapped ? mapped.char : key;
    
    const targetChar = currentLesson.text[currentIndex];
    const isCorrect = inputChar === targetChar;

    setPressedKey(code);

    if (isStrictMode) {
      // Strict Mode: Only allow correct input
      if (isCorrect) {
        setUserInput(prev => prev + inputChar);
        setIsError(false);
      } else {
        setIsError(true);
        setErrorCount(prev => prev + 1);
        setTimeout(() => setIsError(false), 200);
      }
    } else {
      // Forgiving Mode: Allow anything, track errors
      setUserInput(prev => prev + inputChar);
      if (!isCorrect) {
        setErrorCount(prev => prev + 1);
        setIsError(true);
        setTimeout(() => setIsError(false), 200);
      } else {
        setIsError(false);
      }
    }

  }, [currentIndex, currentLesson, isLessonComplete, startTime, isStrictMode]);

  useEffect(() => {
    const handleKeyUp = () => setPressedKey(null);
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  // --- Render ---

  return (
    <div className={`min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans transition-all duration-500 ${isZenMode ? 'justify-center' : ''}`}>
      
      {/* Header */}
      {!isZenMode && (
        <header className="bg-slate-800 border-b border-slate-700 p-4 transition-all">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4" dir="rtl">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Keyboard className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>المعلم</span>
                <span className="text-emerald-500 text-lg font-normal opacity-80" dir="ltr">Typing Tutor</span>
              </h1>
            </div>
            
            <div className="flex gap-3 items-center flex-wrap justify-center">
              {/* Strict Mode Toggle */}
              <button
                onClick={toggleStrictMode}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${isStrictMode ? 'bg-red-900/30 border-red-800 text-red-200' : 'bg-slate-700 border-slate-600 text-slate-300'}`}
                title={isStrictMode ? "Strict Mode: ON (Blocks errors)" : "Strict Mode: OFF (Allows errors)"}
              >
                {isStrictMode ? <Ban size={16} /> : <CheckCircle size={16} />}
                <span dir="ltr">{isStrictMode ? "Strict" : "Forgiving"}</span>
              </button>

              <button 
                 onClick={toggleZenMode}
                 className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-300 text-sm"
                 title="Enter Zen Mode"
               >
                 <Maximize2 size={16} />
                 <span className="hidden sm:inline" dir="ltr">Zen</span>
               </button>

               <select 
                 className="bg-slate-700 text-slate-200 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                 value={currentLesson.id}
                 onChange={(e) => changeLesson(Number(e.target.value))}
                 dir="rtl"
               >
                 {LESSONS.map(l => (
                   <option key={l.id} value={l.id}>{l.title}</option>
                 ))}
               </select>
               <button 
                 onClick={resetLesson}
                 className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-300"
                 title="Reset Lesson"
               >
                 <RefreshCw size={20} />
               </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-grow flex flex-col items-center ${isZenMode ? 'justify-center' : 'justify-start pt-8 pb-12'} px-4`}>
        
        {/* Zen Mode Exit Hint */}
        {isZenMode && (
           <div className="fixed top-6 right-6 text-slate-600 text-sm animate-pulse" dir="ltr">
             Press ESC to exit
           </div>
        )}

        {/* Lesson Info */}
        {!isZenMode && (
          <div className="text-center mb-8 max-w-2xl" dir="ltr">
            <h2 className="text-3xl font-bold mb-2 text-white">{currentLesson.title}</h2>
            <p className="text-slate-400" dir="auto">{currentLesson.description}</p>
          </div>
        )}

        {isLessonComplete ? (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 sm:p-12 text-center max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300">
             <div className="mx-auto bg-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} className="text-emerald-500" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2" dir="ltr">
                <span>أحسنت |</span>
                <span>Lesson Complete!</span>
             </h3>
             <p className="text-slate-400 mb-6" dir="ltr">Great job. Here is how you performed:</p>
             
             <div className="grid grid-cols-2 gap-4 mb-8" dir="rtl">
               <div className="bg-slate-700/50 p-4 rounded-xl">
                 <div className="text-sm text-slate-400">سرعة (WPM)</div>
                 <div className="text-2xl font-bold text-emerald-400">{Math.round(stats.wpm)}</div>
               </div>
               <div className="bg-slate-700/50 p-4 rounded-xl">
                 <div className="text-sm text-slate-400">دقة (Accuracy)</div>
                 <div className="text-2xl font-bold text-blue-400">{Math.round(stats.accuracy)}%</div>
               </div>
             </div>

             <div className="flex gap-4 justify-center" dir="ltr">
               <button 
                onClick={resetLesson}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors min-w-[120px]"
               >
                 إعادة (Retry)
               </button>
               <button 
                 onClick={() => {
                    const next = LESSONS.find(l => l.id === currentLesson.id + 1);
                    if (next) changeLesson(next.id);
                 }}
                 disabled={!LESSONS.find(l => l.id === currentLesson.id + 1)}
                 className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
               >
                 التالي (Next)
               </button>
             </div>
          </div>
        ) : (
          <>
            {!isZenMode && <Stats stats={stats} />}

            <div className={`w-full relative ${isZenMode ? 'max-w-6xl' : 'max-w-4xl'}`}>
              {!isFocused && !isZenMode && (
                 <div className="absolute -top-8 left-0 right-0 text-center text-amber-500 text-sm font-medium animate-pulse" dir="ltr">
                   ⚠️ Focus lost. Click the box to continue typing.
                 </div>
              )}
              
              <TypingArea 
                targetText={currentLesson.text}
                userInput={userInput}
                isError={isError}
                onInput={handleInput}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                isZenMode={isZenMode}
              />
            </div>

            {!isZenMode && (
              <VirtualKeyboard 
                activeChar={currentLesson.text[currentIndex]}
                pressedKey={pressedKey}
                isError={isError}
              />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      {!isZenMode && (
        <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-800" dir="ltr">
          <p>Supports Standard Arabic 101 Layout • English Keyboard Compatible</p>
        </footer>
      )}

    </div>
  );
};

export default App;