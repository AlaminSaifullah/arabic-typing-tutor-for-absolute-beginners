import React from 'react';
import { motion } from 'framer-motion';
import { ARABIC_KEY_MAP, KEYBOARD_LAYOUT, ENGLISH_KEY_LABELS } from '../constants';

interface VirtualKeyboardProps {
  activeChar: string; // The character the user currently needs to type
  pressedKey: string | null; // The physical key code currently being pressed
  isError: boolean;
}

const Key: React.FC<{
  code: string;
  activeChar: string;
  pressedKey: string | null;
  isError: boolean;
}> = ({ code, activeChar, pressedKey, isError }) => {
  const mapping = ARABIC_KEY_MAP[code];
  const englishLabel = ENGLISH_KEY_LABELS[code] || code.replace('Key', '');
  
  // Is this key the one corresponding to the active character?
  const isTarget = mapping?.char === activeChar;
  
  // Is this key currently physically pressed?
  const isPressed = pressedKey === code;

  // Key visual classes
  let bgClass = 'bg-slate-700 border-slate-600 text-slate-300 shadow-md';
  if (isTarget) {
    bgClass = isError ? 'bg-red-500 border-red-400 text-white animate-pulse' : 'bg-emerald-600 border-emerald-500 text-white animate-pulse ring-2 ring-emerald-400';
  } else if (isPressed) {
    bgClass = 'bg-slate-500 border-slate-400 text-white translate-y-0.5 shadow-none';
  }

  // Layout sizing
  let widthClass = 'w-10 sm:w-12';
  if (code === 'Space') widthClass = 'w-64';
  if (['ShiftLeft', 'ShiftRight', 'Enter', 'Backspace', 'CapsLock', 'Tab'].includes(code)) widthClass = 'w-20 sm:w-24 px-2 text-xs';

  return (
    <motion.div
      layout
      className={`
        h-10 sm:h-12 m-0.5 sm:m-1 rounded-lg border-b-4 active:border-b-0 active:translate-y-1 
        flex flex-col items-center justify-center select-none transition-colors duration-100
        ${bgClass} ${widthClass}
      `}
    >
      {mapping ? (
        <>
           {/* Main Arabic Character */}
          <span className="text-lg sm:text-xl font-bold leading-none mb-0.5">
            {mapping.label || mapping.char}
          </span>
          {/* Helper English Letter */}
          {!mapping.label && (
             <span className="text-[10px] sm:text-[11px] text-slate-400 opacity-60 leading-none font-sans font-medium">
               {englishLabel}
             </span>
          )}
        </>
      ) : (
        <span className="text-xs">{englishLabel}</span>
      )}
    </motion.div>
  );
};

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ activeChar, pressedKey, isError }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 mt-8" dir="ltr">
      <div className="flex flex-col items-center">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center w-full">
            {row.keys.map((keyCode) => (
              <Key 
                key={keyCode} 
                code={keyCode} 
                activeChar={activeChar}
                pressedKey={pressedKey}
                isError={isError}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};