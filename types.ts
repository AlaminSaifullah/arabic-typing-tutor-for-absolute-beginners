export interface Lesson {
  id: number;
  title: string;
  description: string;
  text: string; // The target text to type
  keys: string[]; // Keys introduced in this lesson
}

export interface KeyMap {
  [code: string]: {
    char: string;
    shiftChar?: string;
    label?: string; // For special keys like Space, Shift
  };
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  totalChars: number;
  startTime: number | null;
}

export interface KeyboardRow {
  keys: string[]; // Array of event.code
  style?: string; // specific styling for the row
}