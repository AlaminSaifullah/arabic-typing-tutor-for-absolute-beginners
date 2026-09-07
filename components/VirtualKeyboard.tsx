import React from 'react';
import { motion } from 'framer-motion';
import { ARABIC_KEY_MAP, KEYBOARD_LAYOUT, ENGLISH_KEY_LABELS } from '../constants';

interface VirtualKeyboardProps {
  activeChar: string; // The character the user currently needs to type
  pressedKey: string | null; // The physical key code currently being pressed
  isError: boolean;
  isShiftPressed: boolean;
}

const Key: React.FC<{
  code: string;
  activeChar: string;
  pressedKey: string | null;
  isError: boolean;
  isShiftPressed: boolean;
}> = ({ code, activeChar, pressedKey, isError, isShiftPressed }) => {
  const mapping = ARABIC_KEY_MAP[code];
  const englishLabel = ENGLISH_KEY_LABELS[code] || code.replace('Key', '');
  
  // Is this key the one corresponding to the active character?
  const isTarget = Boolean(activeChar && (mapping?.char === activeChar || mapping?.shiftChar === activeChar));
  const isShiftTarget = Boolean(activeChar && mapping?.shiftChar === activeChar);
  
  // Is this key currently physically pressed?
  const isPressed = pressedKey === code;

  // Special case: Highlight Shift keys if the target character requires Shift
  const isShiftKey = code === 'ShiftLeft' || code === 'ShiftRight';
  const isTargetShift = Boolean(
    isShiftKey &&
    activeChar &&
    Object.values(ARABIC_KEY_MAP).some(m => m.shiftChar === activeChar)
  );

  // Key visual classes
  let bgClass = 'bg-slate-700 border-slate-600 text-slate-300 shadow-md';
  if (isTarget || isTargetShift) {
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
        <div className="relative flex flex-col items-center justify-center w-full h-full">
           {/* Shift Character (if exists) */}
           {mapping.shiftChar && (
             <span className={`absolute top-0.5 right-1 text-[9px] sm:text-[10px] font-bold ${isShiftTarget ? 'text-white' : (isShiftPressed ? 'text-slate-200' : 'text-slate-400 opacity-80')}`}>
               {mapping.shiftChar}
             </span>
           )}
           
           {/* Main Arabic Character */}
          <span className={`text-lg sm:text-xl font-bold leading-none ${mapping.shiftChar ? 'mt-1' : ''} ${isShiftPressed && mapping.shiftChar ? 'opacity-40' : 'opacity-100'}`}>
            {mapping.label || mapping.char}
          </span>
          {/* Helper English Letter */}
          {!mapping.label && (
             <span className="text-[9px] sm:text-[10px] text-slate-400 opacity-60 leading-none font-sans font-medium">
               {englishLabel}
             </span>
          )}
        </div>
      ) : (
        <span className="text-xs">{englishLabel}</span>
      )}
    </motion.div>
  );
};

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ activeChar, pressedKey, isError, isShiftPressed }) => {
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
                isShiftPressed={isShiftPressed}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};