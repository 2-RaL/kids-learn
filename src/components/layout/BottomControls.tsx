import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/gameStore';
import type { CharacterCommand } from '../../types';
import { playPopSound, playJumpSound } from '../../utils/soundEffects';

interface CommandItem {
  command: CharacterCommand;
  labelAz: string;
  labelKey: string;
  icon: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

type CategoryKey = 'movement' | 'fun' | 'daily' | 'learning' | 'social';

const CATEGORIES: { key: CategoryKey; labelAz: string; labelEn: string; labelRu: string; icon: string }[] = [
  { key: 'movement', labelAz: '🏃 Hərəkətlər', labelEn: '🏃 Movements', labelRu: '🏃 Движения', icon: '🏃' },
  { key: 'fun', labelAz: '🎉 Əyləncə & Emosiyalar', labelEn: '🎉 Fun & Emotions', labelRu: '🎉 Веселье', icon: '🎉' },
  { key: 'daily', labelAz: '🧼 Gündəlik Qulluq', labelEn: '🧼 Daily Routines', labelRu: '🧼 Режим и уход', icon: '🧼' },
  { key: 'learning', labelAz: '📚 Öyrənmə & Yaradıcılıq', labelEn: '📚 Learning & Arts', labelRu: '📚 Обучение', icon: '📚' },
  { key: 'social', labelAz: '🤝 Sosial & Fəaliyyətlər', labelEn: '🤝 Social & Actions', labelRu: '🤝 Социум и дела', icon: '🤝' },
];

const COMMANDS_BY_CATEGORY: Record<CategoryKey, CommandItem[][]> = {
  movement: [
    [
      { command: 'sit', labelAz: 'Otur', labelKey: 'sit', icon: '🪑', bgColor: '#DCFCE7', textColor: '#166534', borderColor: '#86EFAC' },
      { command: 'stand', labelAz: 'Dur (Qalx)', labelKey: 'stand', icon: '🧍', bgColor: '#DBEAFE', textColor: '#1E40AF', borderColor: '#93C5FD' },
      { command: 'run', labelAz: 'Qaç', labelKey: 'run', icon: '🏃', bgColor: '#FFEDD5', textColor: '#9A3412', borderColor: '#FDBA74' },
      { command: 'jump', labelAz: 'Tullan / Oppan', labelKey: 'jump', icon: '🦘', bgColor: '#FEF3C7', textColor: '#92400E', borderColor: '#FDE68A' },
      { command: 'stop', labelAz: 'Dayan', labelKey: 'stop', icon: '🛑', bgColor: '#FEE2E2', textColor: '#991B1B', borderColor: '#FCA5A5' },
      { command: 'walk', labelAz: 'Yol ilə get', labelKey: 'walk', icon: '🚶', bgColor: '#E0E7FF', textColor: '#3730A3', borderColor: '#A5B4FC' },
    ],
    [
      { command: 'walkForward', labelAz: 'Önə', labelKey: 'walkForward', icon: '⬆️', bgColor: '#DCFCE7', textColor: '#166534', borderColor: '#86EFAC' },
      { command: 'walkBackward', labelAz: 'Geriyə', labelKey: 'walkBackward', icon: '⬇️', bgColor: '#FFE4E6', textColor: '#9F1239', borderColor: '#FDA4AF' },
      { command: 'moveLeft', labelAz: 'Sola', labelKey: 'moveLeft', icon: '⬅️', bgColor: '#EDE9FE', textColor: '#5B21B6', borderColor: '#C4B5FD' },
      { command: 'moveRight', labelAz: 'Sağa', labelKey: 'moveRight', icon: '➡️', bgColor: '#FFEDD5', textColor: '#9A3412', borderColor: '#FDBA74' },
      { command: 'spin', labelAz: 'Dön', labelKey: 'spin', icon: '🔄', bgColor: '#EDE9FE', textColor: '#5B21B6', borderColor: '#C4B5FD' },
      { command: 'slide', labelAz: 'Sürüş', labelKey: 'slide', icon: '🛝', bgColor: '#CCFBF1', textColor: '#115E59', borderColor: '#5EEAD4' },
      { command: 'rideBike', labelAz: 'Sür (Velosiped)', labelKey: 'rideBike', icon: '🚲', bgColor: '#FEF3C7', textColor: '#92400E', borderColor: '#FDE68A' },
    ],
  ],
  fun: [
    [
      { command: 'laugh', labelAz: 'Gül', labelKey: 'laugh', icon: '😂', bgColor: '#FEF3C7', textColor: '#92400E', borderColor: '#FDE68A' },
      { command: 'cry', labelAz: 'Ağla', labelKey: 'cry', icon: '😢', bgColor: '#DBEAFE', textColor: '#1E40AF', borderColor: '#93C5FD' },
      { command: 'surprised', labelAz: 'Təəccüblən', labelKey: 'surprised', icon: '😲', bgColor: '#FEF9C3', textColor: '#854D0E', borderColor: '#FDE047' },
      { command: 'think', labelAz: 'Düşün / Fikirləş', labelKey: 'think', icon: '🤔', bgColor: '#EDE9FE', textColor: '#5B21B6', borderColor: '#C4B5FD' },
      { command: 'wave', labelAz: 'Əl salla', labelKey: 'wave', icon: '🖐️', bgColor: '#CFFAFE', textColor: '#155E75', borderColor: '#A5F3FC' },
      { command: 'clap', labelAz: 'Əl çal', labelKey: 'clap', icon: '👏', bgColor: '#FEF3C7', textColor: '#92400E', borderColor: '#FDE68A' },
    ],
    [
      { command: 'dance', labelAz: 'Oyna (Musiqi)', labelKey: 'dance', icon: '💃', bgColor: '#FCE7F3', textColor: '#9D174D', borderColor: '#F472B6' },
      { command: 'sing', labelAz: 'Oxu (Musiqi)', labelKey: 'sing', icon: '🎤', bgColor: '#EDE9FE', textColor: '#5B21B6', borderColor: '#C4B5FD' },
      { command: 'playInstrument', labelAz: 'Çal (Musiqi)', labelKey: 'playInstrument', icon: '🎸', bgColor: '#FEE2E2', textColor: '#991B1B', borderColor: '#FCA5A5' },
      { command: 'playToy', labelAz: 'Oyna (Oyuncaq)', labelKey: 'playToy', icon: '🧸', bgColor: '#E0F2FE', textColor: '#0369A1', borderColor: '#7DD3FC' },
      { command: 'nod', labelAz: 'Bəli (baş)', labelKey: 'nod', icon: '👍', bgColor: '#DCFCE7', textColor: '#166534', borderColor: '#86EFAC' },
      { command: 'shakeHead', labelAz: 'Xeyr (baş)', labelKey: 'shakeHead', icon: '🙅', bgColor: '#FFE4E6', textColor: '#9F1239', borderColor: '#FDA4AF' },
    ],
  ],
  daily: [
    [
      { command: 'wakeUp', labelAz: 'Dur (Oyan)', labelKey: 'wakeUp', icon: '⏰', bgColor: '#FEF9C3', textColor: '#854D0E', borderColor: '#FDE047' },
      { command: 'sleep', labelAz: 'Yat (Yuxu)', labelKey: 'sleep', icon: '😴', bgColor: '#EDE9FE', textColor: '#5B21B6', borderColor: '#C4B5FD' },
      { command: 'eat', labelAz: 'Yemək ye', labelKey: 'eat', icon: '🍎', bgColor: '#FFE4E6', textColor: '#9F1239', borderColor: '#FDA4AF' },
      { command: 'drink', labelAz: 'Su iç', labelKey: 'drink', icon: '🥤', bgColor: '#CFFAFE', textColor: '#155E75', borderColor: '#A5F3FC' },
    ],
    [
      { command: 'bathe', labelAz: 'Çim (Duş al)', labelKey: 'bathe', icon: '🚿', bgColor: '#E0F2FE', textColor: '#075985', borderColor: '#7DD3FC' },
      { command: 'wash', labelAz: 'Əlini yu', labelKey: 'wash', icon: '🧼', bgColor: '#DCFCE7', textColor: '#166534', borderColor: '#86EFAC' },
      { command: 'comb', labelAz: 'Dara (Saçını)', labelKey: 'comb', icon: '🪮', bgColor: '#FEF3C7', textColor: '#92400E', borderColor: '#FDE68A' },
      { command: 'dress', labelAz: 'Geyin', labelKey: 'dress', icon: '👕', bgColor: '#FCE7F3', textColor: '#9D174D', borderColor: '#F472B6' },
    ],
  ],
  learning: [
    [
      { command: 'read', labelAz: 'Oxu (Kitab)', labelKey: 'read', icon: '📖', bgColor: '#DCFCE7', textColor: '#166534', borderColor: '#86EFAC' },
      { command: 'write', labelAz: 'Yaz', labelKey: 'write', icon: '✏️', bgColor: '#FFEDD5', textColor: '#9A3412', borderColor: '#FDBA74' },
      { command: 'draw', labelAz: 'Çək (Rəsm)', labelKey: 'draw', icon: '🎨', bgColor: '#FCE7F3', textColor: '#9D174D', borderColor: '#F472B6' },
      { command: 'paint', labelAz: 'Rənglə', labelKey: 'paint', icon: '🖌️', bgColor: '#FEF3C7', textColor: '#92400E', borderColor: '#FDE68A' },
      { command: 'cut', labelAz: 'Kəs (Qayçı)', labelKey: 'cut', icon: '✂️', bgColor: '#FFE4E6', textColor: '#9F1239', borderColor: '#FDA4AF' },
    ],
    [
      { command: 'count', labelAz: 'Say', labelKey: 'count', icon: '🔢', bgColor: '#CFFAFE', textColor: '#155E75', borderColor: '#A5F3FC' },
      { command: 'talk', labelAz: 'Danış', labelKey: 'talk', icon: '💬', bgColor: '#EDE9FE', textColor: '#5B21B6', borderColor: '#C4B5FD' },
      { command: 'build', labelAz: 'Düzəlt', labelKey: 'build', icon: '🧱', bgColor: '#FEF3C7', textColor: '#92400E', borderColor: '#FDE68A' },
      { command: 'point', labelAz: 'Göstər', labelKey: 'point', icon: '👆', bgColor: '#FEF3C7', textColor: '#92400E', borderColor: '#FDE68A' },
      { command: 'stretch', labelAz: 'Gəril', labelKey: 'stretch', icon: '🙆', bgColor: '#DCFCE7', textColor: '#166534', borderColor: '#86EFAC' },
    ],
  ],
  social: [
    [
      { command: 'hug', labelAz: 'Qucaqla', labelKey: 'hug', icon: '🤗', bgColor: '#FCE7F3', textColor: '#9D174D', borderColor: '#F472B6' },
      { command: 'holdHands', labelAz: 'Əl-ələ tut', labelKey: 'holdHands', icon: '🤝', bgColor: '#FEF3C7', textColor: '#92400E', borderColor: '#FDE68A' },
      { command: 'help', labelAz: 'Kömək et', labelKey: 'help', icon: '❤️', bgColor: '#FEE2E2', textColor: '#991B1B', borderColor: '#FCA5A5' },
      { command: 'openDoor', labelAz: 'Aç (Qapı)', labelKey: 'openDoor', icon: '🚪', bgColor: '#DCFCE7', textColor: '#166534', borderColor: '#86EFAC' },
      { command: 'closeDoor', labelAz: 'Bağla (Qapı)', labelKey: 'closeDoor', icon: '🔒', bgColor: '#FFE4E6', textColor: '#9F1239', borderColor: '#FDA4AF' },
      { command: 'putAway', labelAz: 'Yerinə qoy', labelKey: 'putAway', icon: '📦', bgColor: '#E0E7FF', textColor: '#3730A3', borderColor: '#A5B4FC' },
      { command: 'collect', labelAz: 'Topla (Əşya)', labelKey: 'collect', icon: '🧺', bgColor: '#FEF9C3', textColor: '#854D0E', borderColor: '#FDE047' },
    ],
    [
      { command: 'clean', labelAz: 'Təmizlə', labelKey: 'clean', icon: '🧹', bgColor: '#CFFAFE', textColor: '#155E75', borderColor: '#A5F3FC' },
      { command: 'bring', labelAz: 'Gətir', labelKey: 'bring', icon: '🎁', bgColor: '#DCFCE7', textColor: '#166534', borderColor: '#86EFAC' },
      { command: 'takeAway', labelAz: 'Apar', labelKey: 'takeAway', icon: '🚶‍♂️', bgColor: '#FFEDD5', textColor: '#9A3412', borderColor: '#FDBA74' },
      { command: 'carry', labelAz: 'Daşı', labelKey: 'carry', icon: '🎒', bgColor: '#E0F2FE', textColor: '#0369A1', borderColor: '#7DD3FC' },
      { command: 'pull', labelAz: 'Dart', labelKey: 'pull', icon: '🪢', bgColor: '#EDE9FE', textColor: '#5B21B6', borderColor: '#C4B5FD' },
      { command: 'scatter', labelAz: 'Dağıt', labelKey: 'scatter', icon: '💥', bgColor: '#FEE2E2', textColor: '#991B1B', borderColor: '#FCA5A5' },
      { command: 'waterPlant', labelAz: 'Sula (Bitki)', labelKey: 'waterPlant', icon: '🪴', bgColor: '#DCFCE7', textColor: '#166534', borderColor: '#86EFAC' },
      { command: 'lightMatch', labelAz: 'Yandır (Kibrit)', labelKey: 'lightMatch', icon: '🕯️', bgColor: '#FEF3C7', textColor: '#92400E', borderColor: '#FDE68A' },
    ],
  ],
};

export const BottomControls: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { executeCommand, currentCommand } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('movement');

  const rows = COMMANDS_BY_CATEGORY[selectedCategory];

  const getCategoryLabel = (cat: typeof CATEGORIES[0]) => {
    if (i18n.language === 'en') return cat.labelEn;
    if (i18n.language === 'ru') return cat.labelRu;
    return cat.labelAz;
  };

  const renderButton = (item: CommandItem) => {
    const isActive = currentCommand === item.command;
    const label = i18n.language === 'az' ? item.labelAz : t(`commands.${item.labelKey}`);

    return (
      <motion.button
        key={item.command}
        onClick={() => {
          if (item.command === 'jump') {
            playJumpSound();
          } else {
            playPopSound();
          }
          executeCommand(item.command, 'button');
        }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96, y: 1 }}
        className={`flex-1 min-w-[56px] xs:min-w-[64px] sm:min-w-[78px] py-1 xs:py-1.5 sm:py-2 px-1 xs:px-1.5 sm:px-2 rounded-xl sm:rounded-2xl flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs transition-all border-2 cursor-pointer select-none active:scale-95 whitespace-nowrap ${
          isActive ? 'ring-2 sm:ring-3 ring-indigo-400/80 scale-102 shadow-md' : 'hover:shadow-sm'
        }`}
        style={{
          backgroundColor: item.bgColor,
          borderColor: isActive ? item.textColor : item.borderColor,
          color: item.textColor,
        }}
      >
        <span className="text-sm xs:text-base sm:text-xl leading-none flex-shrink-0">{item.icon}</span>
        <span className="font-extrabold text-[10px] xs:text-xs sm:text-sm tracking-tight truncate">{label}</span>
      </motion.button>
    );
  };

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-3xl p-1.5 sm:p-3 shadow-xl border border-white/60 flex flex-col gap-1.5 sm:gap-2">
      {/* Category selector tabs with horizontal scroll if needed */}
      <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-100/90 p-1 rounded-xl sm:rounded-2xl overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              playPopSound();
              setSelectedCategory(cat.key);
            }}
            className={`flex-shrink-0 flex-1 min-w-fit py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.key
                ? 'bg-white text-indigo-700 shadow-sm scale-102 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Dynamic Command Rows */}
      <div className="flex flex-col gap-1 xs:gap-1.5 sm:gap-2">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-1 xs:gap-1.5 sm:gap-2 w-full overflow-x-auto no-scrollbar pb-0.5">
            {row.map(renderButton)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomControls;
