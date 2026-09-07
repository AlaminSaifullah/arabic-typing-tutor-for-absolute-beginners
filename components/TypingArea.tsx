import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingAreaProps {
  targetText: string;
  userInput: string;
  isError: boolean;
  onInput: (char: string, code: string, shiftKey: boolean) => void;
  onBlur: () => void;
  onFocus: () => void;
  isZenMode: boolean;
}

export const TypingArea: React.FC<TypingAreaProps> = ({ 
  targetText, 
  userInput, 
  isError, 
  onInput,
  onBlur,
  onFocus,
  isZenMode
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = userInput.length;

  // Keep focus on the hidden input
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    const handleClick = () => focusInput();
    
    focusInput();

    const container = containerRef.current;
    container?.addEventListener('click', handleClick);

    return () => container?.removeEventListener('click', handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onInput(e.key, e.code, e.shiftKey);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full mx-auto cursor-text group transition-all duration-500 ${isZenMode ? 'max-w-6xl' : 'max-w-4xl mb-8'}`}
    >
      <input
        ref={inputRef}
        type="text"
        className="absolute inset-0 opacity-0 z-0 cursor-default"
        autoComplete="off"
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        value="" 
        onChange={() => {}}
      />

      {/* Visual Display Container */}
      <div 
        className={`
          rounded-2xl shadow-inner border-2 
          flex flex-wrap content-start leading-relaxed font-medium
          transition-all duration-300
          ${isError ? 'border-red-500/50 bg-red-900/10' : 'border-slate-700 group-focus-within:border-emerald-500/50'}
          ${isZenMode ? 'bg-slate-900 border-none shadow-none text-5xl sm:text-6xl justify-center py-20' : 'bg-slate-800 p-8 sm:p-12 min-h-[160px] text-3xl sm:text-4xl'}
        `}
        dir="rtl"
      >
        {targetText.split('').map((char, index) => {
          const userChar = userInput[index];
          let colorClass = 'text-slate-600'; // Default: Future text
          const isCurrent = index === currentIndex;
          let isCharError = false;

          // Determine color based on user input
          if (index < userInput.length) {
            if (userChar === char) {
               colorClass = 'text-emerald-500/80'; // Past: Correct
            } else {
               colorClass = 'text-red-400 bg-red-500/10'; // Past: Incorrect
               isCharError = true;
            }
          } else if (isCurrent) {
            colorClass = isError ? 'text-red-400' : 'text-slate-100'; // Current
          }
          
          // Special styling for space to make it visible when active
          const isSpace = char === ' ';
          const activeSpaceClass = (isCurrent && isSpace) ? 'bg-slate-100/10 rounded-md' : '';

          return (
            <div key={index} className={`relative inline-flex flex-col items-center justify-center h-16 min-w-[20px] ${activeSpaceClass}`}>
              {/* Character */}
              <span 
                id={`char-${index}`}
                className={`${colorClass} transition-colors duration-75 px-1 whitespace-pre rounded-md`}
              >
                {char}
              </span>

              {/* Cursor */}
              {isCurrent && (
                <motion.div
                  layoutId="cursor"
                  className={`absolute -bottom-2 h-1.5 w-full rounded-full ${isError ? 'bg-red-500' : 'bg-emerald-400'}`}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                  animate={{ opacity: [1, 0.7, 1] }} 
                />
              )}
            </div>
          );
        })}
      </div>
      
      {!isZenMode && (
        <div className="absolute top-2 left-2 text-xs text-slate-500 opacity-0 group-focus-within:opacity-0 transition-opacity duration-200 pointer-events-none">
          Click to focus
        </div>
      )}
    </div>
  );
};