import { KeyMap, KeyboardRow, Lesson } from './types';

// Standard Arabic 101 Layout Mapping
// Maps physical key codes (QWERTY positions) to Arabic Characters
export const ARABIC_KEY_MAP: KeyMap = {
  Backquote: { char: 'ذ', shiftChar: 'ّ' }, // Tashdid
  Digit1: { char: '1', shiftChar: '!' },
  Digit2: { char: '2', shiftChar: '@' },
  Digit3: { char: '3', shiftChar: '#' },
  Digit4: { char: '4', shiftChar: '$' },
  Digit5: { char: '5', shiftChar: '%' },
  Digit6: { char: '6', shiftChar: '^' },
  Digit7: { char: '7', shiftChar: '&' },
  Digit8: { char: '8', shiftChar: '*' },
  Digit9: { char: '9', shiftChar: '(' },
  Digit0: { char: '0', shiftChar: ')' },
  Minus: { char: '-', shiftChar: '_' },
  Equal: { char: '=', shiftChar: '+' },
  
  KeyQ: { char: 'ض', shiftChar: 'َ' }, // Fatha
  KeyW: { char: 'ص', shiftChar: 'ً' }, // Fathatayn
  KeyE: { char: 'ث', shiftChar: 'ُ' }, // Damma
  KeyR: { char: 'ق', shiftChar: 'ٌ' }, // Dammatayn
  KeyT: { char: 'ف', shiftChar: 'لإ' },
  KeyY: { char: 'غ', shiftChar: 'إ' },
  KeyU: { char: 'ع', shiftChar: '‘' },
  KeyI: { char: 'ه', shiftChar: '÷' },
  KeyO: { char: 'خ', shiftChar: '×' },
  KeyP: { char: 'ح', shiftChar: '؛' },
  BracketLeft: { char: 'ج', shiftChar: '<' },
  BracketRight: { char: 'د', shiftChar: '>' },
  Backslash: { char: '\\', shiftChar: '|' },

  KeyA: { char: 'ش', shiftChar: 'ِ' }, // Kasra
  KeyS: { char: 'س', shiftChar: 'ٍ' }, // Kasratayn
  KeyD: { char: 'ي', shiftChar: '[' },
  KeyF: { char: 'ب', shiftChar: ']' },
  KeyG: { char: 'ل', shiftChar: 'لأ' },
  KeyH: { char: 'ا', shiftChar: 'أ' },
  KeyJ: { char: 'ت', shiftChar: 'ـ' },
  KeyK: { char: 'ن', shiftChar: '،' },
  KeyL: { char: 'م', shiftChar: '/' },
  Semicolon: { char: 'ك', shiftChar: ':' },
  Quote: { char: 'ط', shiftChar: '"' },

  KeyZ: { char: 'ئ', shiftChar: '~' },
  KeyX: { char: 'ء', shiftChar: 'ْ' }, // Sukun
  KeyC: { char: 'ؤ', shiftChar: '{' },
  KeyV: { char: 'ر', shiftChar: '}' },
  KeyB: { char: 'لا', shiftChar: 'لآ' }, 
  KeyN: { char: 'ى', shiftChar: 'آ' },
  KeyM: { char: 'ة', shiftChar: '’' },
  Comma: { char: 'و', shiftChar: ',' },
  Period: { char: 'ز', shiftChar: '.' },
  Slash: { char: 'ظ', shiftChar: '؟' },
  Space: { char: ' ', label: 'مسافة' },
};

export const ENGLISH_KEY_LABELS: {[key: string]: string} = {
  Backquote: '`', Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5',
  Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0', Minus: '-', Equal: '=',
  KeyQ: 'Q', KeyW: 'W', KeyE: 'E', KeyR: 'R', KeyT: 'T', KeyY: 'Y', KeyU: 'U', KeyI: 'I', KeyO: 'O', KeyP: 'P',
  BracketLeft: '[', BracketRight: ']', Backslash: '\\',
  KeyA: 'A', KeyS: 'S', KeyD: 'D', KeyF: 'F', KeyG: 'G', KeyH: 'H', KeyJ: 'J', KeyK: 'K', KeyL: 'L',
  Semicolon: ';', Quote: "'",
  KeyZ: 'Z', KeyX: 'X', KeyC: 'C', KeyV: 'V', KeyB: 'B', KeyN: 'N', KeyM: 'M',
  Comma: ',', Period: '.', Slash: '/',
  Space: 'Space',
  ShiftLeft: 'Shift', ShiftRight: 'Shift',
  Enter: 'Enter', Backspace: 'Backspace', Tab: 'Tab', CapsLock: 'Caps'
};

export const KEYBOARD_LAYOUT: KeyboardRow[] = [
  { keys: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'] },
  { keys: ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'] },
  { keys: ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'] },
  { keys: ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'] },
  { keys: ['Space'] },
];

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Lesson 1: The Home Row (Right)",
    description: "Focus on the right hand home row keys: ت (Ta), ن (Nun), م (Mim), ك (Kaf).",
    text: "تتت ننن ممم ككك ت ن م ك تمكن نكت كتم نمت مكن كنت منكم",
    keys: ['ت', 'ن', 'م', 'ك']
  },
  {
    id: 2,
    title: "Lesson 2: The Home Row (Left)",
    description: "Focus on the left hand home row keys: ش (Shin), س (Sin), ي (Ya), ب (Ba).",
    text: "ششش سسس ييي ببب ش س ي ب سبب يسب شبشب بيبسي سيب يشيب بشيش",
    keys: ['ش', 'س', 'ي', 'ب']
  },
  {
    id: 3,
    title: "Lesson 3: Center Home Row",
    description: "Connecting the hands with ا (Alif) and ل (Lam).",
    text: "ااا للل لا لا لالا لبن تين باب نال مال امل ابل بلبل سال",
    keys: ['ا', 'ل']
  },
  {
    id: 4,
    title: "Lesson 4: Full Home Row Sentences",
    description: "Combine all home row letters into words and short phrases.",
    text: "كتبت بنت كتابا شربت لبنا سالت عنك باسم كان ينام ليلا ملك نالت مالا",
    keys: ['ت', 'ن', 'م', 'ك', 'ش', 'س', 'ي', 'ب', 'ا', 'ل']
  },
  {
    id: 5,
    title: "Lesson 5: Upper Row (Right)",
    description: "Introduction to ه (Ha), خ (Kha), ح (Ha), ج (Jim), د (Dal).",
    text: "ههه خخخ ححح ججج ددد دجاج حج خديجة جديد هدهد حديد حجر خشب دهر جحد",
    keys: ['ه', 'خ', 'ح', 'ج', 'د']
  },
  {
    id: 6,
    title: "Lesson 6: Upper Row (Left)",
    description: "Introduction to ض (Dad), ص (Sad), ث (Tha), ق (Qaf), ف (Fa), غ (Ghain), ع ('Ain).",
    text: "ضضض صصص ثثث ققق ففف غغغ ععع قف صقيع ثقب غفور ضيف صبر ثلج قمر فجر عين غصن",
    keys: ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع']
  },
  {
    id: 7,
    title: "Lesson 7: Full Upper Row Practice",
    description: "Comprehensive practice for all keys in the top letter row.",
    text: "ض ص ث ق ف غ ع ه خ ح ج د ضفدع صقر ثعلب قطة فهد غزال عصفور هلال خبز حوت جبل ديك",
    keys: ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د']
  },
  {
    id: 8,
    title: "Lesson 8: Bottom Row (Right)",
    description: "Introduction to ة (Ta Marbuta), و (Waw), ز (Zay), ظ (Zha).",
    text: "ةةة ووو ززز ظظظ زهرة وزة وعظ مظلة حديقة وردة زرع ظل لفظ حفظة",
    keys: ['ة', 'و', 'ز', 'ظ']
  },
  {
    id: 9,
    title: "Lesson 9: Bottom Row (Left)",
    description: "Introduction to ئ (Ya Hamza), ء (Hamza), ؤ (Waw Hamza), ر (Ra), لا (Lam-Alif), ى (Alif Maqsura).",
    text: "ئئئ ءءء ؤؤؤ ررر لالا ىىى بئر جزء سؤال رأى رمى قرأ لؤلؤ شاطئ لا شيء",
    keys: ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى']
  },
  {
    id: 10,
    title: "Lesson 10: Full Bottom Row Practice",
    description: "Comprehensive practice for all keys in the bottom letter row.",
    text: "ئ ء ؤ ر لا ى ة و ز ظ رؤية زرقاء ورقة ظمأ رمل بناء لؤلؤة زرافة حديقة",
    keys: ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ']
  },
  {
    id: 11,
    title: "Lesson 11: Full Keyboard Fluency",
    description: "Building speed with complex sentences using the entire keyboard.",
    text: "ذهب الطالب الى المدرسة في الصباح الباكر وقرأ كتابا مفيدا عن التاريخ والعلوم الطبيعية والرياضيات",
    keys: []
  },
  {
    id: 12,
    title: "Lesson 12: Numbers & Symbols",
    description: "Mastering the top numerical row.",
    text: "١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ٠ سنة ١٩٩٠ و ٢٠٢٣ رقم الهاتف ٠٥٠١٢٣٤٥٦٧ السعر ١٠٠ ريال",
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  },
  {
    id: 13,
    title: "Lesson 13: Basic Vowels (Harakat)",
    description: "Introduction to Fatha ( َ ), Damma ( ُ ), and Kasra ( ِ ).",
    text: "بَ بُ بِ تً تٌ تٍ كَتَبَ كُتِبَ يَشْرَبُ بِنْتٌ سَمِعَ عَلِمَ",
    keys: ['َ', 'ُ', 'ِ', 'ً', 'ٌ', 'ٍ']
  },
  {
    id: 14,
    title: "Lesson 14: Sukun and Tashdid",
    description: "Mastering the Sukun ( ْ ) and Tashdid ( ّ ).",
    text: "مَدْرَسَةٌ مَكْتَبٌ بَيْتٌ رَبِّي جَدِّي قِطَّةٌ مُعَلِّمٌ سُكُونٌ تَشْدِيدٌ",
    keys: ['ْ', 'ّ']
  },
  {
    id: 15,
    title: "Lesson 15: Advanced Vowel Practice",
    description: "Sentences with full vocalization for maximum accuracy.",
    text: "الْوَلَدُ يَلْعَبُ فِي الْحَدِيقَةِ. ذَهَبَتِ الْبِنْتُ إِلَى الْمَدْرَسَةِ. هَذَا كِتَابٌ جَمِيلٌ جِدًّا.",
    keys: []
  }
];