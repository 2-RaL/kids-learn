import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Volume2, Sparkles, BookOpen, ChevronRight, CheckCircle2, Shield } from 'lucide-react';
import { apiUrl } from '../../config/api';
import { useAuthStore } from '../../store/authStore';

interface ChessLesson {
  id: number;
  title: string;
  description: string;
  lesson_type: string;
  image_url: string | null;
  content: string | null;
  min_age: number;
  max_age: number;
  difficulty: string;
}

const CHESS_PIECES_DATA = [
  {
    name: 'Şah (King)',
    symbol: '♔',
    color: 'amber',
    moveRule: 'Hər tərəfə yalnız 1 xana hərəkət edə bilər.',
    tip: 'Şahmatın ən əsas fiqurudur. Onu heç vaxt təhlükədə qoymaq olmaz!',
    boardHighlight: [[3, 3], [3, 4], [3, 5], [4, 3], [4, 5], [5, 3], [5, 4], [5, 5]],
    piecePos: [4, 4],
  },
  {
    name: 'Vəzir (Queen)',
    symbol: '♕',
    color: 'purple',
    moveRule: 'Həm düz (üfüqi, şaquli), həm də diaqonal üzrə istənilən qədər xana gedə bilir.',
    tip: 'Lövhənin ən güclü və çevik fiqurudur!',
    boardHighlight: [
      [4, 0], [4, 1], [4, 2], [4, 3], [4, 5], [4, 6], [4, 7],
      [0, 4], [1, 4], [2, 4], [3, 4], [5, 4], [6, 4], [7, 4],
      [1, 1], [2, 2], [3, 3], [5, 5], [6, 6], [7, 7],
      [7, 1], [6, 2], [5, 3], [3, 5], [2, 6], [1, 7],
    ],
    piecePos: [4, 4],
  },
  {
    name: 'Top (Rook)',
    symbol: '♖',
    color: 'blue',
    moveRule: 'Yalnız düz xətt üzrə (irəli, geri, sağa, sola) istənilən qədər gedir.',
    tip: 'Qala kimi möhkəmdir və xətləri çox yaxşı qoruyur.',
    boardHighlight: [
      [4, 0], [4, 1], [4, 2], [4, 3], [4, 5], [4, 6], [4, 7],
      [0, 4], [1, 4], [2, 4], [3, 4], [5, 4], [6, 4], [7, 4],
    ],
    piecePos: [4, 4],
  },
  {
    name: 'Fil (Bishop)',
    symbol: '♗',
    color: 'emerald',
    moveRule: 'Yalnız diaqonal (çəpinə) xətlərlə istənilən qədər hərəkət edir.',
    tip: 'Biri ağ xanalarda, digəri qara xanalarda gəzən iki fil var.',
    boardHighlight: [
      [1, 1], [2, 2], [3, 3], [5, 5], [6, 6], [7, 7],
      [7, 1], [6, 2], [5, 3], [3, 5], [2, 6], [1, 7],
    ],
    piecePos: [4, 4],
  },
  {
    name: 'At (Knight)',
    symbol: '♘',
    color: 'orange',
    moveRule: '"L" hərfi formasında hərəkət edir (2 xana düz, 1 xana yana).',
    tip: 'Digər fiqurların üstündən tullana bilən tək fiqurdur!',
    boardHighlight: [
      [2, 3], [2, 5], [3, 2], [3, 6],
      [5, 2], [5, 6], [6, 3], [6, 5],
    ],
    piecePos: [4, 4],
  },
  {
    name: 'Piyada (Pawn)',
    symbol: '♙',
    color: 'cyan',
    moveRule: 'Yalnız 1 xana irəli addımlayır (başlanğıcda 2 xana da olar), rəqibi isə diaqonal vurur.',
    tip: 'Ən cəsur əsgərlərdir. Lövhənin sonuna çatanda başqa istənilən güclü fiqura çevrilirlər!',
    boardHighlight: [[3, 4], [2, 4]],
    piecePos: [4, 4],
  },
];

export const ParentChess: React.FC = () => {
  const { token } = useAuthStore();
  const [selectedPieceIdx, setSelectedPieceIdx] = useState<number>(0);
  const [lessons, setLessons] = useState<ChessLesson[]>([]);

  useEffect(() => {
    fetchLessons();
  }, [token]);

  const fetchLessons = async () => {
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/parent/chess-lessons'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.lessons?.length > 0) {
        setLessons(data.lessons);
      }
    } catch {}
  };

  const currentPiece = CHESS_PIECES_DATA[selectedPieceIdx];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      u.pitch = 1.1;
      const azVoice = window.speechSynthesis.getVoices().find(v => v.lang.startsWith('az') || v.lang.startsWith('tr'));
      if (azVoice) u.voice = azVoice;
      window.speechSynthesis.speak(u);
    }
  };

  // Helper to check if a cell [row, col] is highlighted
  const isCellHighlighted = (r: number, c: number) => {
    return currentPiece.boardHighlight.some(([hr, hc]) => hr === r && hc === c);
  };

  const isPieceCell = (r: number, c: number) => {
    return currentPiece.piecePos[0] === r && currentPiece.piecePos[1] === c;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <span className="text-2xl">♟️</span>
            Uşaqlar üçün Şahmat
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Fiqurların adları, hərəkət qaydaları və interaktiv lövhədə hərəkət istiqamətləri
          </p>
        </div>

        <button
          onClick={() => speakText(`${currentPiece.name}. ${currentPiece.moveRule} ${currentPiece.tip}`)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-2xl text-xs font-bold transition-colors cursor-pointer border border-indigo-200"
        >
          <Volume2 className="w-4 h-4 text-indigo-500" />
          <span>Səsli İzah Dinlə</span>
        </button>
      </div>

      {/* Piece Selector Ribbon */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {CHESS_PIECES_DATA.map((piece, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedPieceIdx(idx);
              speakText(piece.name);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-sm transition-all whitespace-nowrap cursor-pointer shadow-sm border ${
              selectedPieceIdx === idx
                ? 'bg-slate-900 text-white border-slate-800 shadow-md ring-2 ring-indigo-400'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-2xl">{piece.symbol}</span>
            <span>{piece.name}</span>
          </button>
        ))}
      </div>

      {/* Main Chessboard & Explanations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Mini Board (Left Column) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col items-center justify-center">
          <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>🟢 Yaşıl xanalar: Mümkün hərəkətlər</span>
          </div>

          {/* 8x8 Chessboard Grid */}
          <div className="w-72 h-72 sm:w-80 sm:h-80 border-4 border-amber-900 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-8 grid-rows-8 bg-amber-100">
            {Array.from({ length: 8 }).map((_, r) =>
              Array.from({ length: 8 }).map((_, c) => {
                const isDark = (r + c) % 2 === 1;
                const isHighlight = isCellHighlighted(r, c);
                const isPiece = isPieceCell(r, c);

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`flex items-center justify-center relative transition-all ${
                      isDark ? 'bg-amber-800' : 'bg-amber-100'
                    }`}
                  >
                    {isHighlight && (
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-400 ring-2 ring-emerald-500 shadow-md animate-pulse" />
                    )}
                    {isPiece && (
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-3xl sm:text-4xl text-slate-900 filter drop-shadow-md select-none"
                      >
                        {currentPiece.symbol}
                      </motion.div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Piece Details Card (Right Column) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-4xl shadow-inner">
                {currentPiece.symbol}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800">
                  {currentPiece.name}
                </h3>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  Əsas fiqur qaydası
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Necə hərəkət edir?
                </h4>
                <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                  {currentPiece.moveRule}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Maraqlı İpucu</span>
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-amber-900 leading-relaxed">
                  {currentPiece.tip}
                </p>
              </div>
            </div>
          </div>

          {/* Practice prompt */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-5 text-white shadow-lg flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">Məşq Etməyə Hazırsınız?</h4>
              <p className="text-xs text-indigo-100 mt-0.5">Lövhədəki yaşıl nöqtələrə baxaraq hərəkətləri uşağınızla müzakirə edin.</p>
            </div>
            <span className="text-3xl">🎯</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentChess;
