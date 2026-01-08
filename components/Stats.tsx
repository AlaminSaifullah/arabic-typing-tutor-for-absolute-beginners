import React from 'react';
import { TypingStats } from '../types';
import { Gauge, Target, Type } from 'lucide-react';

interface StatsProps {
  stats: TypingStats;
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="flex flex-row justify-center gap-4 sm:gap-8 mb-6" dir="rtl">
      <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
        <div className="p-2 bg-emerald-500/20 rounded-full text-emerald-400">
          <Gauge size={20} />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">سرعة (WPM)</p>
          <p className="text-xl font-bold text-slate-100">{Math.round(stats.wpm)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
        <div className="p-2 bg-blue-500/20 rounded-full text-blue-400">
          <Target size={20} />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">دقة (Accuracy)</p>
          <p className="text-xl font-bold text-slate-100">{Math.round(stats.accuracy)}%</p>
        </div>
      </div>
      
       <div className="hidden sm:flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
        <div className="p-2 bg-purple-500/20 rounded-full text-purple-400">
          <Type size={20} />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">حروف (Chars)</p>
          <p className="text-xl font-bold text-slate-100">{stats.correctChars}/{stats.totalChars}</p>
        </div>
      </div>
    </div>
  );
};