import React, { useState } from 'react';
import VoiceControl from '../voice/VoiceControl';
import ChallengeCard from '../learning/ChallengeCard';
import CommandHistory from '../common/CommandHistory';
import LearningHubModal from '../learning/LearningHubModal';
import { GraduationCap } from 'lucide-react';

export const RightPanel: React.FC = () => {
  const [isLearningHubOpen, setIsLearningHubOpen] = useState(false);

  return (
    <>
      <aside className="flex flex-col gap-3 h-full overflow-y-auto pr-0.5">
        {/* 0. Təlim Bölmələri Big Launcher Card */}
        <div
          onClick={() => setIsLearningHubOpen(true)}
          className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-3 sm:p-3.5 shadow-lg border border-amber-300 flex items-center justify-between text-slate-950 font-black cursor-pointer hover:scale-[1.02] transition-all flex-shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <div>
              <h4 className="text-xs sm:text-sm font-black leading-tight">Təlim Bölmələri</h4>
              <span className="text-[10px] font-extrabold text-slate-800">37 inkişaf sahəsi</span>
            </div>
          </div>
          <span className="text-[10px] font-black bg-white/40 px-2 py-0.5 rounded-full">
            Aç →
          </span>
        </div>

        {/* 1. Voice Control Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/60 flex-shrink-0">
          <VoiceControl />
        </div>

        {/* 2. Learning Mode Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/60 flex-shrink-0">
          <ChallengeCard />
        </div>

        {/* 3. Command History Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/60 flex-1 min-h-0">
          <CommandHistory />
        </div>
      </aside>

      <LearningHubModal
        isOpen={isLearningHubOpen}
        onClose={() => setIsLearningHubOpen(false)}
      />
    </>
  );
};

export default RightPanel;
