// src/data/parentChessData.ts
// Comprehensive beginner chess curriculum across 9 structured levels
// Fully translated in Azerbaijani, English, and Russian with interactive exercises.

export interface ChessExercise {
  id: string;
  type: 'select-square' | 'move-piece' | 'place-piece' | 'detect-check' | 'capture' | 'checkmate' | 'quiz';
  prompt: {
    az: string;
    en: string;
    ru: string;
  };
  speechPrompt: {
    az: string;
    en: string;
    ru: string;
  };
  initialBoard: Record<string, string>; // square -> piece code (e.g. "e1": "wK", "e4": "wP", "e8": "bK")
  targetSquares?: string[]; // valid squares for target
  validMove?: { from: string; to: string }[];
  hint: {
    az: string;
    en: string;
    ru: string;
  };
  explanation: {
    az: string;
    en: string;
    ru: string;
  };
}

export interface ChessLesson {
  id: string;
  level: number;
  ageGroup: 'all' | '3-6' | '7-10' | '11+';
  icon: string;
  title: {
    az: string;
    en: string;
    ru: string;
  };
  subtitle: {
    az: string;
    en: string;
    ru: string;
  };
  summary: {
    az: string;
    en: string;
    ru: string;
  };
  theoryVoice: {
    az: string;
    en: string;
    ru: string;
  };
  theoryText: {
    az: string[];
    en: string[];
    ru: string[];
  };
  keyFacts: {
    az: string[];
    en: string[];
    ru: string[];
  };
  demonstrationBoard: {
    pieces: Record<string, string>;
    highlightSquares?: string[];
    highlightPaths?: { from: string; to: string }[];
  };
  exercise: ChessExercise;
}

export const CHESS_LEVELS = [
  { level: 1, name: { az: 'Səviyyə 1: Şahmat Lövhəsi', en: 'Level 1: The Chessboard', ru: 'Уровень 1: Шахматная Доска' }, icon: '🏁' },
  { level: 2, name: { az: 'Səviyyə 2: Fiqurlar və Başlanğıc', en: 'Level 2: Pieces & Setup', ru: 'Уровень 2: Фигуры и Расстановка' }, icon: '♟️' },
  { level: 3, name: { az: 'Səviyyə 3: Fiqurların Gedişləri', en: 'Level 3: Piece Movements', ru: 'Уровень 3: Ходы Фигур' }, icon: '🐴' },
  { level: 4, name: { az: 'Səviyyə 4: Fiqurları Vurmaq', en: 'Level 4: Capturing Pieces', ru: 'Уровень 4: Взятие Фигур' }, icon: '⚔️' },
  { level: 5, name: { az: 'Səviyyə 5: Şah (Hücum)', en: 'Level 5: Check', ru: 'Уровень 5: Шах (Атака)' }, icon: '⚠️' },
  { level: 6, name: { az: 'Səviyyə 6: Mat və Pat', en: 'Level 6: Checkmate & Stalemate', ru: 'Уровень 6: Мат и Пат' }, icon: '👑' },
  { level: 7, name: { az: 'Səviyyə 7: Xüsusi Gedişlər', en: 'Level 7: Special Moves', ru: 'Уровень 7: Особые Ходы' }, icon: '✨' },
  { level: 8, name: { az: 'Səviyyə 8: Əsas Strategiya', en: 'Level 8: Basic Strategy', ru: 'Уровень 8: Основы Стратегии' }, icon: '🎯' },
  { level: 9, name: { az: 'Səviyyə 9: Sadə Taktikalar', en: 'Level 9: Simple Tactics', ru: 'Уровень 9: Простая Тактика' }, icon: '🏆' },
];

export const PIECE_INFO: Record<string, {
  name: { az: string; en: string; ru: string };
  symbol: string;
  value: number | string;
  desc: { az: string; en: string; ru: string };
}> = {
  K: {
    name: { az: 'Şah', en: 'King', ru: 'Король' },
    symbol: '♚',
    value: '∞',
    desc: {
      az: 'Ən vacib fiqur! Hər tərəfə 1 xana gedir. Mat olarsa oyun bitir.',
      en: 'The most important piece! Moves 1 square in any direction. Game ends if checkmated.',
      ru: 'Самая важная фигура! Ходит на 1 клетку в любом направлении. Если получает мат — игра окончена.'
    }
  },
  Q: {
    name: { az: 'Vəzir', en: 'Queen', ru: 'Ферзь' },
    symbol: '♛',
    value: 9,
    desc: {
      az: 'Ən güclü fiqur! Düz, köndələn və diaqonal istənilən qədər gedir.',
      en: 'The most powerful piece! Moves straight and diagonally as far as unobstructed.',
      ru: 'Самая сильная фигура! Ходит по вертикалям, горизонталям и диагоналям.'
    }
  },
  R: {
    name: { az: 'Top', en: 'Rook', ru: 'Ладья' },
    symbol: '♜',
    value: 5,
    desc: {
      az: 'Düz xətlərlə irəli, geri və yanlara istənilən qədər gedir.',
      en: 'Moves horizontally and vertically as far as unobstructed.',
      ru: 'Ходит по прямой линии по горизонтали и вертикали.'
    }
  },
  B: {
    name: { az: 'Fil', en: 'Bishop', ru: 'Слон' },
    symbol: '♝',
    value: 3,
    desc: {
      az: 'Yalnız diaqonal gedir. Ağ xana fili ağda, qara xana fili qarada qalır.',
      en: 'Moves diagonally any number of squares. Stays on its starting color.',
      ru: 'Ходит только по диагоналям и никогда не меняет цвет своего поля.'
    }
  },
  N: {
    name: { az: 'At', en: 'Knight', ru: 'Конь' },
    symbol: '♞',
    value: 3,
    desc: {
      az: '«L» hərfi kimi gedir: 2 xana düz, 1 xana yana. Digər fiqurların üstündən tullana bilir!',
      en: 'Moves in an "L" shape: 2 squares then 1 perpendicular. Can jump over other pieces!',
      ru: 'Ходит буквой «Г»: 2 клетки прямо, 1 вбок. Единственная фигура, которая прыгает через другие!'
    }
  },
  P: {
    name: { az: 'Piyada', en: 'Pawn', ru: 'Пешка' },
    symbol: '♟',
    value: 1,
    desc: {
      az: 'Yalnız irəli 1 xana gedir (başlanğıcda 2 xana da olar). Diaqonal vurur.',
      en: 'Moves forward 1 square (or 2 on its first move). Captures diagonally.',
      ru: 'Ходит только вперёд на 1 поле (с начальной позиции на 2). Бьёт по диагонали.'
    }
  }
};

export const CHESS_LESSONS: ChessLesson[] = [
  // ==================== LEVEL 1: CHESSBOARD ====================
  {
    id: 'lesson-1-1',
    level: 1,
    ageGroup: 'all',
    icon: '🏁',
    title: {
      az: 'Şahmat Lövhəsi və 64 Xana',
      en: 'The Chessboard and 64 Squares',
      ru: 'Шахматная Доска и 64 Клетки'
    },
    subtitle: {
      az: '8 sətir, 8 sütun və işıqlı/qaranlıq xanalarla tanışlıq',
      en: 'Meet 8 ranks, 8 files, and light & dark squares',
      ru: 'Знакомство с 8 горизонталями, 8 вертикалями и полями'
    },
    summary: {
      az: 'Şahmat lövhəsi 64 kvadrat xanadan ibarətdir: 32 açıq və 32 tünd.',
      en: 'The chessboard consists of 64 squares: 32 light and 32 dark.',
      ru: 'Шахматная доска состоит из 64 клеток: 32 светлых и 32 тёмных.'
    },
    theoryVoice: {
      az: 'Şahmat lövhəsi sehrli bir meydandır! Burada cəmi 64 xana var: otuz iki ağ və otuz iki qara xana. Lövhənin səkkiz sətri və səkkiz sütunu var. Hər bir xananın öz xüsusi adı var, məsələn a bir və ya e dörd.',
      en: 'The chessboard is a magical battlefield! It has 64 squares: 32 light and 32 dark. It features eight ranks and eight files. Every square has its own coordinate name, like a1 or e4.',
      ru: 'Шахматная доска — это волшебное поле сражения! На ней шестьдесят четыре клетки: тридцать две белые и тридцать две чёрные. На ней восемь горизонталей и восемь вертикалей. Каждая клетка имеет своё имя, например а один или е четыре.'
    },
    theoryText: {
      az: [
        'Şahmat lövhəsi kvadrat şəklindədir və 8x8 olmaqla cəmi 64 xanadan ibarətdir.',
        'Lövhədə 32 ağ (işıqlı) və 32 qara (tünd) xana var.',
        'Üfüqi xətlər «sətir» adlanır və 1-dən 8-ə qədər rəqəmlərlə nömrələnir.',
        'Şaquli xətlər «sütun» adlanır və a, b, c, d, e, f, g, h hərfləri ilə işarələnir.',
        'Qızıl qayda: Lövhəni qoyarkən sağ alt küncdəki xana mütləq AĞ olmalıdır (h1 xanası ağdır)!'
      ],
      en: [
        'The chessboard is an 8x8 grid containing exactly 64 squares.',
        'There are 32 light squares and 32 dark squares in an alternating pattern.',
        'Horizontal rows are called ranks, numbered 1 through 8.',
        'Vertical columns are called files, labeled with letters a through h.',
        'Golden rule: When setting up the board, the bottom-right corner must be a LIGHT square (h1 is white)!'
      ],
      ru: [
        'Шахматная доска представляет собой сетку 8х8 и содержит 64 клетки.',
        'На доске 32 светлых и 32 тёмных поля, чередующихся между собой.',
        'Горизонтальные линии называются горизонталями и нумеруются от 1 до 8.',
        'Вертикальные линии называются вертикалями и обозначаются буквами от a до h.',
        'Золотое правило: правое нижнее поле у каждого игрока всегда должно быть БЕЛЫМ (поле h1 — белое)!'
      ]
    },
    keyFacts: {
      az: ['64 xana (32 ağ, 32 qara)', '8 sətir (1–8) və 8 sütun (a–h)', 'Sağ küncdə ağ xana qaydası'],
      en: ['64 squares (32 light, 32 dark)', '8 ranks (1–8) and 8 files (a–h)', 'White on right corner rule'],
      ru: ['64 клетки (32 белых, 32 чёрных)', '8 горизонталей (1–8) и 8 вертикалей (a–h)', 'Белое поле в правом углу']
    },
    demonstrationBoard: {
      pieces: {},
      highlightSquares: ['e4', 'd4', 'e5', 'd5', 'a1', 'h1', 'h8', 'a8']
    },
    exercise: {
      id: 'ex-1-1',
      type: 'select-square',
      prompt: {
        az: 'Lövhənin mərkəzində yerləşən «e4» xanasına toxunun.',
        en: 'Tap on the central square named "e4".',
        ru: 'Нажмите на центральную клетку «e4».'
      },
      speechPrompt: {
        az: 'Şahmat lövhəsində e dörd xanasını tap və üzərinə toxun.',
        en: 'Find the square e4 on the chessboard and tap it.',
        ru: 'Найди на доске клетку е четыре и нажми на неё.'
      },
      initialBoard: {},
      targetSquares: ['e4'],
      hint: {
        az: '«e» sütununa bax və 4-cü sətrlə kəsişən xananı seç.',
        en: 'Look at the "e" column and find where it meets row 4.',
        ru: 'Посмотри на вертикаль «е» и найди пересечение с 4-й горизонталью.'
      },
      explanation: {
        az: 'Əla! e4 xanası lövhənin ən vacib mərkəzi xanalarından biridir.',
        en: 'Great job! e4 is one of the most critical central squares.',
        ru: 'Отлично! Клетка e4 — одно из важнейших центральных полей.'
      }
    }
  },

  // ==================== LEVEL 2: PIECES & STARTING POSITION ====================
  {
    id: 'lesson-2-1',
    level: 2,
    ageGroup: 'all',
    icon: '♟️',
    title: {
      az: 'Bütün Fiqurlar və Başlanğıc Düzülüşü',
      en: 'All Chess Pieces & Starting Setup',
      ru: 'Все Фигуры и Начальная Расстановка'
    },
    subtitle: {
      az: 'Fiqurların ordusu necə düzülür? Hər kəs öz yerində!',
      en: 'How the chess army lines up: every piece in its place!',
      ru: 'Как строится шахматная армия: каждая фигура на своём месте!'
    },
    summary: {
      az: 'Hər tərəfin 16 fiquru var: 1 Şah, 1 Vəzir, 2 Top, 2 Fil, 2 At və 8 Piyada.',
      en: 'Each side starts with 16 pieces: 1 King, 1 Queen, 2 Rooks, 2 Bishops, 2 Knights, and 8 Pawns.',
      ru: 'У каждой стороны 16 фигур: 1 Король, 1 Ферзь, 2 Ладьи, 2 Слона, 2 Коня и 8 Пешек.'
    },
    theoryVoice: {
      az: 'Hər oyunçu döyüşə on altı cəsur fiqurla başlayır. Künclərdə top, onların yanında atlar, atların yanında fillər dayanır. Ağ vəzir ağ xanada, qara vəzir qara xanada durur! Onların önündə səkkiz qəhrəman piyada keşik çəkir.',
      en: 'Each player begins with 16 brave pieces. Rooks stand in the corners, Knights next to Rooks, Bishops next to Knights. Queen on her own color! In front, eight brave pawns stand guard.',
      ru: 'Каждый игрок начинает партию с шестнадцатью фигурами. В углах стоят ладьи, рядом кони, затем слоны. Ферзь любит свой цвет! А впереди стоят восемь отважных пешек.'
    },
    theoryText: {
      az: [
        'Künclərdə Toplar (qala kimi möhkəm) yerləşir: a1, h1 (ağ) və a8, h8 (qara).',
        'Topların yanında Atlar dayanır: b1, g1 və b8, g8.',
        'Atların yanında Fillər durur: c1, f1 və c8, f8.',
        '«Vəzir öz rəngini sevir!» qaydası: Ağ Vəzir d1 ağ xanasında, Qara Vəzir d8 qara xanasında dayanır.',
        'Şah Vəzirin yanında yer alır: e1 və e8.',
        'İkinci və yeddinci sətirlərdə isə bütöv cərgə ilə 8 Piyada düzülür.'
      ],
      en: [
        'Rooks stand in the corners like fortresses: a1, h1 and a8, h8.',
        'Knights are placed next to the Rooks: b1, g1 and b8, g8.',
        'Bishops sit beside the Knights: c1, f1 and c8, f8.',
        '"Queen on her color" rule: White Queen on d1 (white square), Black Queen on d8 (black square).',
        'The King stands next to the Queen on e1 and e8.',
        'The entire 2nd and 7th ranks are occupied by the 8 Pawns guarding the front.'
      ],
      ru: [
        'По углам стоят Ладьи: поля a1, h1 и a8, h8.',
        'Рядом с ладьями стоят Кони: поля b1, g1 и b8, g8.',
        'Рядом с конями стоят Слоны: поля c1, f1 и c8, f8.',
        'Правило: «Ферзь любит свой цвет!» Белый Ферзь стоит на белом поле d1, чёрный Ферзь — на чёрном поле d8.',
        'Король стоит рядом с Ферзём: на e1 и e8.',
        'Вся вторая и седьмая горизонтали заняты 8 пешками, защищающими войско.'
      ]
    },
    keyFacts: {
      az: ['16 ağ və 16 qara fiqur', 'Küncdə Toplar, mərkəzdə Vəzir və Şah', 'Vəzir öz rəngində durur (Ağ d1-də)'],
      en: ['16 white and 16 black pieces', 'Rooks in corners, King & Queen in center', 'Queen on her own color (d1 / d8)'],
      ru: ['16 белых и 16 чёрных фигур', 'Ладьи по углам, Король и Ферзь в центре', 'Ферзь на своём цвете (d1 / d8)']
    },
    demonstrationBoard: {
      pieces: {
        a1: 'wR', b1: 'wN', c1: 'wB', d1: 'wQ', e1: 'wK', f1: 'wB', g1: 'wN', h1: 'wR',
        a2: 'wP', b2: 'wP', c2: 'wP', d2: 'wP', e2: 'wP', f2: 'wP', g2: 'wP', h2: 'wP',
        a8: 'bR', b8: 'bN', c8: 'bB', d8: 'bQ', e8: 'bK', f8: 'bB', g8: 'bN', h8: 'bR',
        a7: 'bP', b7: 'bP', c7: 'bP', d7: 'bP', e7: 'bP', f7: 'bP', g7: 'bP', h7: 'bP',
      }
    },
    exercise: {
      id: 'ex-2-1',
      type: 'place-piece',
      prompt: {
        az: 'Ağ Vəziri (♕) öz düzgün başlanğıc xanasına (d1) yerləşdirin.',
        en: 'Place the White Queen (♕) onto her correct starting square (d1).',
        ru: 'Поставьте Белого Ферзя (♕) на его правильное начальное поле (d1).'
      },
      speechPrompt: {
        az: 'Ağ vəziri d bir xanasına toxunaraq yerləşdir.',
        en: 'Tap square d1 to place the White Queen on her starting spot.',
        ru: 'Нажми на клетку дэ один, чтобы поставить белого ферзя.'
      },
      initialBoard: {
        e1: 'wK', c1: 'wB', f1: 'wB', a1: 'wR', h1: 'wR'
      },
      targetSquares: ['d1'],
      hint: {
        az: 'Unutma: Ağ Vəzir ağ xananı sevir, yəni d1 xanasını!',
        en: 'Remember: White Queen goes on white square d1!',
        ru: 'Помни: Белый Ферзь любит белый цвет, то есть поле d1!'
      },
      explanation: {
        az: 'Mükəmməl! Ağ Vəzir hər zaman oyuna d1 xanasından başlayır.',
        en: 'Spot on! The White Queen always begins the game on d1.',
        ru: 'Превосходно! Белый Ферзь всегда начинает партию на поле d1.'
      }
    }
  },

  // ==================== LEVEL 3: PIECE MOVEMENTS (King, Queen, Rook, Bishop, Knight, Pawn) ====================
  {
    id: 'lesson-3-king',
    level: 3,
    ageGroup: 'all',
    icon: '👑',
    title: {
      az: 'Şahın Gedişi',
      en: 'How the King Moves',
      ru: 'Как Ходит Король'
    },
    subtitle: {
      az: 'Hər tərəfə cəmi 1 xana addımlayır',
      en: 'Takes 1 single step in any direction',
      ru: 'Делает один шаг в любую сторону'
    },
    summary: {
      az: 'Şah istənilən istiqamətə (şaquli, üfüqi və diaqonal) cəmi 1 xana gedə bilər.',
      en: 'The King moves one square in any direction: horizontally, vertically, or diagonally.',
      ru: 'Король ходит на одну клетку в любом направлении: прямо или по диагонали.'
    },
    theoryVoice: {
      az: 'Şah şahmatın ən ulu hökmdarıdır. O, tələsmir və hər tərəfə cəmi bir addım atır: irəli, geri, sağa, sola və ya diaqonalla. Amma diqqətli olun: Şah heç vaxt təhlükə olan, yəni rəqibin vura biləcəyi xanaya gedə bilməz!',
      en: 'The King is the ruler of the board. He moves calmly, taking just one step in any direction: forwards, backwards, sideways, or diagonally. Remember: the King can never step into danger or check!',
      ru: 'Король — самая главная фигура. Он ходит не спеша, ровно на одну клетку в любую сторону. Запомните: Король никогда не может вставать на атакованное поле!'
    },
    theoryText: {
      az: [
        'Şah hər istiqamətə yalnız 1 xana gedə bilər.',
        'Əgər şah lövhənin mərkəzindədirsə, onun 8 mümkün gediş xanası olur.',
        'Şah öz fiqurunun üstünə gedə bilməz.',
        'Çox vacib: Şah düşmən fiqurunun nəzarət etdiyi xanaya GEDƏ BİLMƏZ (özünü şaha sala bilməz)!'
      ],
      en: [
        'The King can move exactly one square in any direction.',
        'From the center of an open board, the King has 8 possible squares.',
        'The King cannot land on a square occupied by a friendly piece.',
        'Crucial rule: The King can never move into an attacked square (check)!'
      ],
      ru: [
        'Король может перемещаться ровно на одну клетку в любую сторону.',
        'В центре пустой доски у Короля есть 8 доступных полей.',
        'Король не может становиться на клетку, занятую своей фигурой.',
        'Главное правило: Король никогда не может идти под шах (на битое поле)!'
      ]
    },
    keyFacts: {
      az: ['Hər tərəfə 1 xana', 'Təhlükəli xanaya gedə bilməz', 'Oyunda mat olunsa uduzulur'],
      en: ['1 square in any direction', 'Cannot step into danger', 'Game lost if checkmated'],
      ru: ['1 клетка в любую сторону', 'Не может идти под бой', 'Мат означает проигрыш']
    },
    demonstrationBoard: {
      pieces: { e4: 'wK' },
      highlightSquares: ['d5', 'e5', 'f5', 'd4', 'f4', 'd3', 'e3', 'f3']
    },
    exercise: {
      id: 'ex-3-king',
      type: 'move-piece',
      prompt: {
        az: 'e4 xanasındakı Ağ Şahı (♔) yuxarıdakı e5 xanasına aparın.',
        en: 'Move the White King (♔) from e4 to e5.',
        ru: 'Сделайте ход Белым Королём (♔) с поля e4 на e5.'
      },
      speechPrompt: {
        az: 'Şahı e dörddən e beş xanasına hərəkət etdir.',
        en: 'Move the King from e4 to e5.',
        ru: 'Передвинь короля с поля е четыре на поле е пять.'
      },
      initialBoard: { e4: 'wK' },
      validMove: [{ from: 'e4', to: 'e5' }],
      targetSquares: ['e5'],
      hint: {
        az: 'Şahın 1 xana yuxarı getməsi üçün e5 xanasına toxunun.',
        en: 'Tap square e5 right above the King.',
        ru: 'Нажмите на клетку e5 прямо над Королём.'
      },
      explanation: {
        az: 'Əla addım! Şah bir xana irəlilədi.',
        en: 'Great move! The King stepped forward by one square.',
        ru: 'Отличный ход! Король сделал шаг вперёд.'
      }
    }
  },

  {
    id: 'lesson-3-knight',
    level: 3,
    ageGroup: 'all',
    icon: '🐴',
    title: {
      az: 'Atın Sehrli Gedişi və Tullanması',
      en: 'The Knight: L-Shape & Jumping',
      ru: 'Конь: Буква «Г» и Прыжки'
    },
    subtitle: {
      az: 'Fiqurların üstündən tullanan yeganə sehrli fiqur',
      en: 'The only piece that can jump over others',
      ru: 'Единственная фигура, которая может перепрыгивать через препятствия'
    },
    summary: {
      az: 'At «L» hərfi kimi hərəkət edir və digər fiqurların üstündən tullanır.',
      en: 'The Knight moves in an "L" shape and can jump over other pieces.',
      ru: 'Конь ходит буквой «Г» и умеет перепрыгивать через любые фигуры.'
    },
    theoryVoice: {
      az: 'At şahmatın ən hiyləgər və sevimli fiqurudur! O, «L» hərfi çəkir: iki xana bir tərəfə, sonra bir xana yana dönür. Ən maraqlısı odur ki, at divarları aşa bilir, yəni yolundakı bütün fiqurların üstündən tullanır!',
      en: 'The Knight is the most cunning piece! It gallops in an "L" shape: two squares straight, then one square to the side. Most magically, it can jump over any friendly or enemy piece in its path!',
      ru: 'Конь — самая хитрая и весёлая фигура! Он ходит буквой «Г»: две клетки прямо и одну в сторону. Самое удивительное: конь может перепрыгивать через любые свои и чужие фигуры!'
    },
    theoryText: {
      az: [
        'At həmişə «L» şəklində gediş edir (2 xana düz + 1 xana yana).',
        'At ağ xanadadırsa, hər gedişdə mütləq qara xanaya düşür və əksinə!',
        'At yeganə fiqurdur ki, qarşısındakı piyada və ya fiqurun üstündən atlaya bilər.',
        'Mərkəzdə olan bir At 8 fərqli xanaya atlaya bilir.'
      ],
      en: [
        'The Knight always moves in an "L" shape (2 squares in one direction, 1 square sideways).',
        'If the Knight is on a light square, it always lands on a dark square, and vice versa!',
        'The Knight is the ONLY piece on the board that can jump over other pieces.',
        'From a central square, a Knight controls up to 8 different squares.'
      ],
      ru: [
        'Конь всегда ходит буквой «Г» (две клетки в одну сторону, одна клетка под прямым углом).',
        'Если конь стоит на белом поле, он обязательно прыгает на чёрное, и наоборот!',
        'Конь — единственная фигура, способная перепрыгивать через любые стоящие на пути фигуры.',
        'Из центра доски конь держит под прицелом целых 8 полей.'
      ]
    },
    keyFacts: {
      az: ['«L» hərfi kimi hərəkət', 'Digər fiqurların üstündən tullanır', 'Hər gedişdə xananın rəngi dəyişir'],
      en: ['L-shaped movement', 'Jumps over other pieces', 'Always changes square color'],
      ru: ['Ходит буквой «Г»', 'Прыгает через другие фигуры', 'Всегда меняет цвет поля']
    },
    demonstrationBoard: {
      pieces: { d4: 'wN', c4: 'bP', d5: 'wP' },
      highlightSquares: ['c6', 'e6', 'f5', 'f3', 'e2', 'c2', 'b3', 'b5']
    },
    exercise: {
      id: 'ex-3-knight',
      type: 'move-piece',
      prompt: {
        az: 'd4 xanasındakı Ağ Atı (♘) «L» gedişi ilə f5 xanasına aparın.',
        en: 'Move the White Knight (♘) from d4 to f5 in an "L" shape.',
        ru: 'Сделайте ход Белым Конём (♘) с поля d4 на f5 буквой «Г».'
      },
      speechPrompt: {
        az: 'Atı d dörddən f beş xanasına atlat.',
        en: 'Jump the Knight from d4 to f5.',
        ru: 'Прыгни конём с поля дэ четыре на эф пять.'
      },
      initialBoard: { d4: 'wN', d5: 'bP', e4: 'wP' },
      validMove: [{ from: 'd4', to: 'f5' }],
      targetSquares: ['f5'],
      hint: {
        az: 'Diqqət edin: At önündəki fiqurların üstündən tullanaraq f5 xanasına çatır!',
        en: 'Notice how the Knight easily jumps over the pieces in front of it to reach f5!',
        ru: 'Обратите внимание: конь легко перепрыгнул стоящие рядом фигуры!'
      },
      explanation: {
        az: 'Afərin! At digər fiqurların üstündən tullanaraq f5 xanasına endi.',
        en: 'Bravo! The Knight jumped over the obstacles and landed safely on f5.',
        ru: 'Браво! Конь перепрыгнул препятствия и приземлился на f5.'
      }
    }
  },

  {
    id: 'lesson-3-rook',
    level: 3,
    ageGroup: 'all',
    icon: '♜',
    title: {
      az: 'Topun Düz Xətli Gücü',
      en: 'The Rook: Straight Paths',
      ru: 'Ладья: Сила Прямых Линий'
    },
    subtitle: {
      az: 'İrəli, geri və yanlara istənilən qədər gedir',
      en: 'Moves horizontally and vertically across the whole board',
      ru: 'Ходит по вертикалям и горизонталям на любое расстояние'
    },
    summary: {
      az: 'Top yalnız düz xətlərlə hərəkət edir, lakin fiqurların üstündən tullana bilməz.',
      en: 'The Rook moves in straight lines along files and ranks, but cannot jump over pieces.',
      ru: 'Ладья ходит по прямым линиям (горизонталям и вертикалям), но не может прыгать.'
    },
    theoryVoice: {
      az: 'Top qalalar kimi möhkəmdir və çox güclü fiqurdur! O, yalnız düz xətlərlə gedir: irəli, geri, sağa və sola istədiyi qədər xana keçə bilər. Lakin top başqa fiqurların üstündən tullana bilməz, yolu açıq olmalıdır.',
      en: 'The Rook is as strong as a castle tower! It glides straight along rows and columns as far as it likes: forward, backward, left, or right. However, its path must be clear because it cannot jump over pieces.',
      ru: 'Ладья крепка, как крепостная башня! Она скользит по доске по прямым линиям на любое число клеток: вперёд, назад, вправо или влево. Но её путь должен быть свободен — прыгать она не умеет.'
    },
    theoryText: {
      az: [
        'Top şaquli (sütunlar) və üfüqi (sətirlər) xətlərlə hərəkət edir.',
        'Maneəsiz açıq xətdə istədiyi qədər uzağa gedə bilər.',
        'Başqa fiqurun üstündən tullana bilməz.',
        'Yolunda düşmən fiquru varsa, onu vurub həmin xanada dayana bilər.'
      ],
      en: [
        'The Rook moves along files (vertically) and ranks (horizontally).',
        'It can travel as many empty squares as desired in a straight line.',
        'It cannot jump over friendly or enemy pieces.',
        'If an enemy piece blocks its path, the Rook can capture it and take its place.'
      ],
      ru: [
        'Ладья перемещается по вертикалям и горизонталям.',
        'По свободной линии она может лететь через всю доску.',
        'Перепрыгивать через фигуры ладья не может.',
        'Если на пути стоит вражеская фигура, ладья может забрать её и занять это поле.'
      ]
    },
    keyFacts: {
      az: ['Düz xətlərlə gedir', 'Dəyəri 5 xaldır', 'Tullana bilmir, yol açıq olmalıdır'],
      en: ['Moves in straight lines', 'Value is 5 points', 'Cannot jump over pieces'],
      ru: ['Ходит по прямой', 'Ценность — 5 очков', 'Не может прыгать']
    },
    demonstrationBoard: {
      pieces: { d4: 'wR' },
      highlightSquares: ['d1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8', 'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4']
    },
    exercise: {
      id: 'ex-3-rook',
      type: 'move-piece',
      prompt: {
        az: 'd4 xanasındakı Ağ Topu (♖) düz xətlə d8 xanasına aparın.',
        en: 'Move the White Rook (♖) from d4 straight up to d8.',
        ru: 'Проведите Белую Ладью (♖) с поля d4 по прямой до поля d8.'
      },
      speechPrompt: {
        az: 'Topu d dörddən d səkkizə sürüşdür.',
        en: 'Glide the Rook from d4 to d8.',
        ru: 'Перемести ладью с дэ четыре на дэ восемь.'
      },
      initialBoard: { d4: 'wR' },
      validMove: [{ from: 'd4', to: 'd8' }],
      targetSquares: ['d8'],
      hint: {
        az: 'Top yuxarı istiqamətdə d8 xanasına qədər sərbəst hərəkət edir.',
        en: 'The Rook can glide all the way to d8 unobstructed.',
        ru: 'Ладья свободно летит вперёд до самого конца доски на d8.'
      },
      explanation: {
        az: 'Əla! Top bütün lövhə boyu sürüşərək d8 xanasına çatdı.',
        en: 'Awesome! The Rook zoomed across the board directly to d8.',
        ru: 'Отлично! Ладья пролетела через всю доску на поле d8.'
      }
    }
  },

  {
    id: 'lesson-3-bishop',
    level: 3,
    ageGroup: 'all',
    icon: '♝',
    title: {
      az: 'Filin Diaqonal Yolu',
      en: 'The Bishop: Diagonal Slider',
      ru: 'Слон: Скользящий по Диагонали'
    },
    subtitle: {
      az: 'Yalnız öz rəngindəki diaqonallarla süzür',
      en: 'Glides diagonally, staying on one color forever',
      ru: 'Ходит строго по диагоналям одного цвета'
    },
    summary: {
      az: 'Fil diaqonal boyu istədiyi qədər gedir və rəngini heç vaxt dəyişmir.',
      en: 'The Bishop glides along diagonals and never leaves its color squares.',
      ru: 'Слон ходит по диагоналям на любое расстояние и никогда не меняет цвет поля.'
    },
    theoryVoice: {
      az: 'Fil sürətli və iti gözlü fiqurdur! O, yalnız çəp, yəni diaqonallarla irəliləyir. Ən maraqlı cəhət odur ki, ağ xanada başlayan fil həmişə ağ xanalarda qalır, qara xanadakı fil isə yalnız qara xanalarda gəzir!',
      en: 'The Bishop is a fast, sharp sniper! It moves diagonally as far as the path is open. Best of all: a light-squared Bishop stays on light squares forever, and a dark-squared Bishop stays on dark squares forever!',
      ru: 'Слон — это зоркий снайпер на доске! Он скользит строго по диагоналям. Самое интересное: белопольный слон навсегда остаётся на белых полях, а чернопольный — на чёрных!'
    },
    theoryText: {
      az: [
        'Fil yalnız diaqonallar üzrə irəli və geri hərəkət edir.',
        'Hər tərəfin 2 fili var: biri ağ xanaların fili, digəri qara xanaların fili.',
        'Ağ xanalı fil heç vaxt qara xanaya keçə bilməz!',
        'Top kimi, fil də fiqurların üstündən tullana bilməz.'
      ],
      en: [
        'The Bishop moves backwards and forwards along diagonal lines only.',
        'Each player has 2 Bishops: one on light squares and one on dark squares.',
        'A light-square Bishop can NEVER step onto a dark square!',
        'Just like the Rook, the Bishop cannot jump over any pieces.'
      ],
      ru: [
        'Слон ходит только по диагоналям вперёд и назад.',
        'У каждого игрока два слона: один белопольный, другой чернопольный.',
        'Белопольный слон НИКОГДА не сможет попасть на чёрную клетку!',
        'Как и ладья, слон не умеет прыгать через фигуры.'
      ]
    },
    keyFacts: {
      az: ['Diaqonalla gedir', 'Rəngini heç vaxt dəyişmir', 'Dəyəri 3 xaldır'],
      en: ['Moves diagonally', 'Never changes square color', 'Value is 3 points'],
      ru: ['Ходит по диагоналям', 'Никогда не меняет цвет', 'Ценность — 3 очка']
    },
    demonstrationBoard: {
      pieces: { c4: 'wB' },
      highlightSquares: ['a2', 'b3', 'd5', 'e6', 'f7', 'g8', 'a6', 'b5', 'd3', 'e2', 'f1']
    },
    exercise: {
      id: 'ex-3-bishop',
      type: 'move-piece',
      prompt: {
        az: 'c4 xanasındakı Ağ Fili (♗) diaqonalla f7 xanasına aparın.',
        en: 'Move the White Bishop (♗) from c4 diagonally to f7.',
        ru: 'Сделайте ход Белым Слоном (♗) с поля c4 по диагонали на f7.'
      },
      speechPrompt: {
        az: 'Fili diaqonal boyunca f yeddi xanasına apar.',
        en: 'Slide the Bishop diagonally to f7.',
        ru: 'Перемести слона по диагонали на поле эф семь.'
      },
      initialBoard: { c4: 'wB' },
      validMove: [{ from: 'c4', to: 'f7' }],
      targetSquares: ['f7'],
      hint: {
        az: 'Ağ xanalı diaqonalı izləyin: c4 -> d5 -> e6 -> f7.',
        en: 'Follow the light diagonal: c4 to d5 to e6 to f7.',
        ru: 'Следуйте по белой диагонали: c4 -> d5 -> e6 -> f7.'
      },
      explanation: {
        az: 'Çox gözəl! Fil ağ xanalar boyunca diaqonalla f7-yə çatdı.',
        en: 'Wonderful! The Bishop glided along the white diagonal right into f7.',
        ru: 'Прекрасно! Слон проскользил по белой диагонали прямо на f7.'
      }
    }
  },

  {
    id: 'lesson-3-queen',
    level: 3,
    ageGroup: 'all',
    icon: '♛',
    title: {
      az: 'Vəzir: Lövhənin Ən Güclü Hökmdarı',
      en: 'The Queen: The Most Powerful Piece',
      ru: 'Ферзь: Самая Могущественная Фигура'
    },
    subtitle: {
      az: 'Top və Filin gücünü özündə birləşdirir',
      en: 'Combines the power of Rook and Bishop together',
      ru: 'Объединяет силу Ладьи и Слона'
    },
    summary: {
      az: 'Vəzir həm düz (Top kimi), həm də diaqonal (Fil kimi) istənilən qədər gedir.',
      en: 'The Queen can move straight like a Rook and diagonally like a Bishop.',
      ru: 'Ферзь может ходить и по прямой (как ладья), и по диагонали (как слон).'
    },
    theoryVoice: {
      az: 'Vəzir şahmat lövhəsinin ən güclü döyüşçüsüdür! O, həm top kimi düz irəli, geri, sağa və sola, həm də fil kimi bütün diaqonallarla uça bilir. Yalnız bir şeyi bacarmır: at kimi fiqurların üstündən tullana bilməz.',
      en: 'The Queen is the mighty powerhouse of chess! She moves like a Rook in straight lines and like a Bishop along diagonals. The only thing she cannot do is jump over other pieces.',
      ru: 'Ферзь — самая грозная и могучая фигура! Он ходит и как ладья по прямым, и как слон по диагоналям на любое расстояние. Единственное ограничение: ферзь не умеет перепрыгивать фигуры.'
    },
    theoryText: {
      az: [
        'Vəzir Top ilə Filin hərəkətlərini birləşdirir.',
        'Maneəsiz lövhədə 8 istiqamətə istədiyi qədər xana gedə bilər.',
        'Dəyəri təxminən 9 xaldır (9 piyadaya bərabərdir!).',
        'Başlanğıcda onu çox tez oyuna çıxarmaq təhlükəlidir, çünki rəqib fiqurlar ona hücum edə bilər.'
      ],
      en: [
        'The Queen combines the super-powers of the Rook and Bishop.',
        'She can fly in 8 different directions across open squares.',
        'Her value is 9 points (equal to 9 pawns!).',
        'Avoid bringing her out too early, so enemy pieces cannot chase her.'
      ],
      ru: [
        'Ферзь сочетает способности ладьи и слона.',
        'Он может перемещаться во всех 8 направлениях на любое расстояние.',
        'Ценность ферзя равна 9 очкам (девяти пешкам!).',
        'Не стоит выводить ферзя слишком рано, чтобы он не попал под удары лёгких фигур.'
      ]
    },
    keyFacts: {
      az: ['Ən güclü fiqur (9 xal)', 'Düz və diaqonal gedir', 'Tullana bilmir'],
      en: ['Strongest piece (9 points)', 'Moves straight and diagonally', 'Cannot jump'],
      ru: ['Самая сильная (9 очков)', 'Ходит прямо и наискосок', 'Не прыгает']
    },
    demonstrationBoard: {
      pieces: { d4: 'wQ' },
      highlightSquares: ['d1', 'd8', 'a4', 'h4', 'a1', 'g7', 'a7', 'g1']
    },
    exercise: {
      id: 'ex-3-queen',
      type: 'move-piece',
      prompt: {
        az: 'd4 xanasındakı Ağ Vəziri (♕) diaqonalla g7 xanasına aparın.',
        en: 'Move the White Queen (♕) from d4 diagonally to g7.',
        ru: 'Сделайте ход Белым Ферзём (♕) с поля d4 по диагонали на g7.'
      },
      speechPrompt: {
        az: 'Vəziri d dörddən g yeddi xanasına apar.',
        en: 'Move the Queen from d4 to g7.',
        ru: 'Перемести ферзя с дэ четыре на гэ семь.'
      },
      initialBoard: { d4: 'wQ' },
      validMove: [{ from: 'd4', to: 'g7' }],
      targetSquares: ['g7'],
      hint: {
        az: 'Vəzir Fil kimi diaqonal üzrə g7 xanasına uça bilir.',
        en: 'The Queen can fly diagonally like a Bishop straight to g7.',
        ru: 'Ферзь летит по диагонали прямо на поле g7.'
      },
      explanation: {
        az: 'Əla! Vəzir möhtəşəm diaqonal zərbəsi ilə g7 xanasına yerləşdi.',
        en: 'Superb! The Queen swept across the board right onto g7.',
        ru: 'Супер! Ферзь стремительно занял позицию на g7.'
      }
    }
  },

  {
    id: 'lesson-3-pawn',
    level: 3,
    ageGroup: 'all',
    icon: '♟',
    title: {
      az: 'Piyada: Cəsur Əsgər',
      en: 'The Pawn: The Brave Soldier',
      ru: 'Пешка: Отважный Солдат'
    },
    subtitle: {
      az: 'Yalnız irəli addımlayır, amma diaqonalla vurur!',
      en: 'Marches forward only, but captures diagonally!',
      ru: 'Шагает только вперёд, но бьёт наискосок!'
    },
    summary: {
      az: 'Piyada irəli 1 xana gedir (başlanğıcda 2 xana da olar), rəqibi isə diaqonal 1 xana vurur.',
      en: 'Pawns move 1 square forward (or 2 on move 1) and capture diagonally 1 square forward.',
      ru: 'Пешка ходит на 1 клетку вперёд (с начальной на 2), а бьёт по диагонали на 1 клетку.'
    },
    theoryVoice: {
      az: 'Piyadalar ordunun cəsur əsgərləridir. Onlar heç vaxt geri çəkilmir, yalnız irəli gedir! Öz ilk xanasında olarkən istəsə iki xana, istəsə bir xana irəli addımlaya bilər. Lakin rəqib fiqurları düz vurmur, yalnız diaqonal vurur!',
      en: 'Pawns are brave foot soldiers. They never retreat backwards! From their starting square, they can leap 2 squares or step 1. But remember: they move straight, yet capture diagonally!',
      ru: 'Пешки — это храбрые солдаты. Они никогда не отступают назад, только вперёд! С начальной позиции пешка может сделать двойной прыжок на 2 поля или шагнуть на одно. Но бьёт она только по диагонали!'
    },
    theoryText: {
      az: [
        'Piyada heç vaxt GERİ gedə bilməz!',
        'Normalda irəli 1 xana addımlayır.',
        'Öz başlanğıc xanasında (2-ci və ya 7-ci sətir) olarkən 2 xana da irəliləyə bilər.',
        'Düz qarşısında fiqur varsa, hərəkət edə bilməz (yolu bağlanır).',
        'Rəqibi yalnız irəli-diaqonal 1 xana vurur.'
      ],
      en: [
        'Pawns can NEVER move backwards!',
        'Normally a pawn steps 1 square straight ahead.',
        'On its very first move, it has the option to leap 2 squares forward.',
        'If a piece stands directly in front of it, the pawn is blocked and cannot move.',
        'Pawns capture enemy pieces 1 square diagonally forward.'
      ],
      ru: [
        'Пешка НИКОГДА не может ходить или бить назад!',
        'Обычно пешка делает шаг на 1 клетку вперёд.',
        'Со своего начального поля она может прыгнуть сразу на 2 клетки.',
        'Если перед ней стоит любая фигура, пешка заблокирована и не может идти вперёд.',
        'Пешка бьёт чужие фигуры на 1 клетку вперёд по диагонали.'
      ]
    },
    keyFacts: {
      az: ['Geri gedə bilməz', 'İlk gedişdə 1 və ya 2 xana', 'Diaqonal vurur'],
      en: ['Never moves backwards', '1 or 2 squares on first move', 'Captures diagonally'],
      ru: ['Не ходит назад', 'На первом ходу 1 или 2 поля', 'Бьёт по диагонали']
    },
    demonstrationBoard: {
      pieces: { e2: 'wP', d3: 'bP', f3: 'bP' },
      highlightSquares: ['e3', 'e4', 'd3', 'f3']
    },
    exercise: {
      id: 'ex-3-pawn',
      type: 'move-piece',
      prompt: {
        az: 'e2 başlanğıc xanasındakı Ağ Piyadanı (♙) iki xana irəli apararaq e4-ə qoyun.',
        en: 'Leap the White Pawn (♙) two squares forward from e2 to e4.',
        ru: 'Сделайте первый ход Белой Пешкой (♙) на два поля вперёд: с e2 на e4.'
      },
      speechPrompt: {
        az: 'Piyadanı e ikidən iki xana irəli, e dördə apar.',
        en: 'Push the pawn two squares forward to e4.',
        ru: 'Продвинь пешку на два поля вперёд с е два на е четыре.'
      },
      initialBoard: { e2: 'wP' },
      validMove: [{ from: 'e2', to: 'e4' }],
      targetSquares: ['e4'],
      hint: {
        az: 'İlk gedişdə piyada 2 xana irəli sıçraya bilər: e2-dən e4-ə!',
        en: 'From its start, the pawn can jump 2 squares ahead to e4!',
        ru: 'С начальной позиции пешка может шагнуть сразу через клетку на e4!'
      },
      explanation: {
        az: 'Möhtəşəm! Piyada ilk gediş hüququndan istifadə edib mərkəzə atıldı.',
        en: 'Super! The pawn used its double-step privilege to seize the center.',
        ru: 'Отлично! Пешка воспользовалась правом хода на два поля и захватила центр.'
      }
    }
  },

  // ==================== LEVEL 4: CAPTURING PIECES ====================
  {
    id: 'lesson-4-1',
    level: 4,
    ageGroup: 'all',
    icon: '⚔️',
    title: {
      az: 'Fiqurları Vurmaq (Götürmək)',
      en: 'Capturing Pieces',
      ru: 'Взятие Фигур'
    },
    subtitle: {
      az: 'Rəqibin fiqurunu lövhədən çıxarıb onun yerinə keçmək',
      en: 'Removing an enemy piece and occupying its square',
      ru: 'Снятие чужой фигуры с доски и занятие её клетки'
    },
    summary: {
      az: 'Fiqur rəqib fiqurun durduğu xanaya gəldikdə, rəqibin fiquru lövhədən çıxarılır.',
      en: 'When a piece lands on an enemy occupied square, the enemy piece is captured and removed.',
      ru: 'Когда фигура встаёт на поле с фигурой противника, та снимается с доски.'
    },
    theoryVoice: {
      az: 'Şahmatda fiqur vurmaq çox asandır! Əgər sənin fiqurun rəqibin dayandığı xanaya gedə bilirsə, həmin fiquru götürüb lövhədən çıxarırsan və öz fiqurunu onun yerinə qoyursan. Şahmatda dama oyunundakı kimi vurmaq məcburi deyil!',
      en: 'Capturing in chess is simple! If your piece can move to a square with an enemy piece, you remove that enemy piece from the board and place yours on that square. In chess, capturing is never compulsory!',
      ru: 'Брать фигуры в шахматах очень просто! Если твоя фигура может пойти на поле, где стоит фигура противника, ты снимаешь вражескую фигуру с доски и ставишь свою на её место. В шахматах брать фигуры не обязательно!'
    },
    theoryText: {
      az: [
        'Vurmaq üçün fiqurunuzu rəqib fiqurun dayandığı xanaya aparırsınız.',
        'Həmin rəqib fiqur oyundan çıxarılır və sizin fiqur onun yerini tutur.',
        'Şahmatda heç vaxt öz fiqurunuzu vura bilməzsiniz!',
        'Şahı VURMAQ OLMAZ! Şah heç vaxt lövhədən götürülmür, ona yalnız mat elan edilir.'
      ],
      en: [
        'To capture, move your piece onto the square occupied by the enemy piece.',
        'The enemy piece is removed from play and your piece takes its square.',
        'You can never capture your own pieces!',
        'You can NEVER capture the King! The King is never removed, only checkmated.'
      ],
      ru: [
        'Чтобы взять фигуру, сделайте ход своей фигурой на поле, где стоит фигура соперника.',
        'Фигура соперника покидает доску, а ваша встаёт на её клетку.',
        'Никогда нельзя бить свои собственные фигуры!',
        'Короля НЕЛЬЗЯ срубить! Короля никогда не снимают с доски, ему объявляют мат.'
      ]
    },
    keyFacts: {
      az: ['Rəqibin xanasını tutmaq', 'Şahı vurmaq olmaz', 'Vurmaq məcburi deyil'],
      en: ['Take enemy square', 'King is never captured', 'Captures are optional'],
      ru: ['Занять клетку врага', 'Короля бить нельзя', 'Взятие не обязательно']
    },
    demonstrationBoard: {
      pieces: { d4: 'wB', g7: 'bP' },
      highlightSquares: ['g7']
    },
    exercise: {
      id: 'ex-4-1',
      type: 'capture',
      prompt: {
        az: 'c3 xanasındakı Ağ Fil (♗) ilə f6 xanasındakı müdafiəsiz Qara Atı (♞) vurun.',
        en: 'Capture the undefended Black Knight (♞) on f6 using your White Bishop (♗) on c3.',
        ru: 'Возьмите беззащитного Чёрного Коня (♞) на f6 своим Белым Слоном (♗) с поля c3.'
      },
      speechPrompt: {
        az: 'Fil ilə f altıdakı qara atı vur.',
        en: 'Capture the black knight on f6 with your bishop.',
        ru: 'Сруби слоном чёрного коня на эф шесть.'
      },
      initialBoard: { c3: 'wB', f6: 'bN' },
      validMove: [{ from: 'c3', to: 'f6' }],
      targetSquares: ['f6'],
      hint: {
        az: 'c3 fili f6 atı ilə eyni diaqonaldadır: c3-dən f6-ya vurun!',
        en: 'The bishop on c3 points right at f6 along the diagonal!',
        ru: 'Слон на c3 смотрит прямо на коня на f6 по диагонали!'
      },
      explanation: {
        az: 'Əla zərbə! Qara at lövhədən götürüldü və fil onun yerini tutdu.',
        en: 'Great capture! The Black knight is off the board and your bishop sits proudly on f6.',
        ru: 'Отличный удар! Чёрный конь снят с доски, а слон занял поле f6.'
      }
    }
  },

  // ==================== LEVEL 5: CHECK (ŞAH) ====================
  {
    id: 'lesson-5-1',
    level: 5,
    ageGroup: 'all',
    icon: '⚠️',
    title: {
      az: 'Şah Nədir? Təhlükədən Qorunma Yolları',
      en: 'What is Check? How to Escape',
      ru: 'Что Такое Шах? Способы Спасения'
    },
    subtitle: {
      az: 'Şaha hücum olanda nə etməli? 3 xilaskar qayda!',
      en: 'When your King is attacked: The 3 magical escapes!',
      ru: 'Когда Король атакован: 3 правила защиты!'
    },
    summary: {
      az: '«Şah» şaha birbaşa hücum deməkdir. Şah mütləq həmin gedişdə təhlükədən çıxarılmalıdır.',
      en: '"Check" means the King is directly attacked. You must escape the attack immediately.',
      ru: '«Шах» — нападение на короля. Игрок обязан немедленно защитить своего короля.'
    },
    theoryVoice: {
      az: 'Şah elan ediləndə həyəcan siqnalı çalır! Bu o deməkdir ki, rəqibin fiquru sənin şahına birbaşa hücum edir. Şahı təhlükədə qoymaq qadağandır! Ondan xilas olmağın düz üç yolu var: Şahı qaçırmaq, hücum edən fiquru vurmaq, yaxud araya sipər çəkmək.',
      en: 'When Check is called, danger strikes! It means an enemy piece is attacking your King right now. You are NOT allowed to ignore it! There are 3 ways to escape: Run away with the King, Block the attack, or Capture the attacking piece.',
      ru: 'Когда объявляется «Шах», звучит тревога! Это значит, что вражеская фигура напала на твоего короля. Игнорировать шах запрещено! Есть три способа спасения: Убежать королём, Закрыться другой фигурой или Срубить нападающую фигуру.'
    },
    theoryText: {
      az: [
        '«Şah» — rəqib fiqurun Şaha birbaşa hücum etməsidir.',
        'Şah veriləndə başqa gediş etmək olmaz, mütləq şahı qorumaq lazımdır!',
        'Şahdan qorunmağın 3 YOLU (Qayda):',
        '1) QAÇMAQ: Şahı təhlükəsiz xanaya çəkmək.',
        '2) VURMAQ: Hücum edən düşmən fiqurunu vurub məhv etmək.',
        '3) BAĞLAMAQ (SİPƏR): Şah ilə hücum edən fiqurun arasına öz fiqurunu qoymaq (at hücumu istisna olmaqla).'
      ],
      en: [
        '"Check" means an enemy piece directly threatens the King.',
        'You cannot make any other moves; you MUST resolve the check right away!',
        'The 3 WAYS to escape Check (CPR):',
        '1) Capture: Take the attacking piece.',
        '2) Protect/Block: Place a friendly piece between the King and the attacker.',
        '3) Run: Move the King to a safe square.'
      ],
      ru: [
        '«Шах» — это прямое нападение фигуры противника на Короля.',
        'Игрок не может делать другие ходы — он обязан защитить Короля!',
        '3 СПОСОБА защиты от шаха:',
        '1) Уйти (убежать): отступить королём на безопасное поле.',
        '2) Закрыться (щит): поставить свою фигуру между королём и нападающей фигурой.',
        '3) Срубить: уничтожить нападающую фигуру.'
      ]
    },
    keyFacts: {
      az: ['Şah təhlükədədir', '3 xilas yolu: Qaç, Vur, Bağla', 'Şahı təhlükədə qoymaq olmaz'],
      en: ['King is under threat', '3 escapes: Run, Block, Capture', 'Cannot stay in check'],
      ru: ['Король под боем', '3 защиты: убежать, закрыться, срубить', 'Нельзя оставаться под шахом']
    },
    demonstrationBoard: {
      pieces: { e1: 'wK', e8: 'bR' },
      highlightSquares: ['e1', 'e8']
    },
    exercise: {
      id: 'ex-5-1',
      type: 'move-piece',
      prompt: {
        az: 'e8-dəki Qara Top e1-dəki Ağ Şaha hücum edir (Şah!). Şahı d1 xanasına qaçıraraq xilas edin.',
        en: 'The Black Rook on e8 attacks White King on e1 (Check!). Escape with the King to d1.',
        ru: 'Чёрная Ладья на e8 объявила шах белому королю на e1. Уведите короля на безопасное поле d1.'
      },
      speechPrompt: {
        az: 'Şah təhlükədədir! Ağ şahı d bir xanasına qaçır.',
        en: 'The King is in check! Run with the King to d1.',
        ru: 'Шах королю! Уведи короля на дэ один.'
      },
      initialBoard: { e1: 'wK', e8: 'bR' },
      validMove: [{ from: 'e1', to: 'd1' }],
      targetSquares: ['d1'],
      hint: {
        az: 'd1 xanası tam təhlükəsizdir, çünki top yalnız e sütununu tutur.',
        en: 'd1 is safe because the Rook only attacks the e-file.',
        ru: 'Поле d1 безопасно, так как ладья атакует только линию е.'
      },
      explanation: {
        az: 'Əhsən! Şah e sütunundan d1 xanasına qaçaraq təhlükədən xilas oldu.',
        en: 'Well done! The King escaped the open fire by moving to d1.',
        ru: 'Отлично! Король ушёл из-под удара на безопасное поле d1.'
      }
    }
  },

  // ==================== LEVEL 6: CHECKMATE & STALEMATE ====================
  {
    id: 'lesson-6-1',
    level: 6,
    ageGroup: 'all',
    icon: '👑',
    title: {
      az: 'Mat və Pat: Oyunun Nəticələri',
      en: 'Checkmate and Stalemate',
      ru: 'Мат и Пат: Развязка Партии'
    },
    subtitle: {
      az: 'Mat qalibiyyət gətirir, Pat isə heç-heçədir!',
      en: 'Checkmate wins the game, while Stalemate is a draw!',
      ru: 'Мат приносит победу, а Пат означает ничью!'
    },
    summary: {
      az: 'Mat: Şah təhlükədədir və heç bir xilası yoxdur (Qələbə!). Pat: Şaha hücum yoxdur, amma heç bir qanuni gediş qalmır (Heç-heçə).',
      en: 'Checkmate: King is in check with NO legal moves left (Win!). Stalemate: King is NOT in check, but no moves exist (Draw!).',
      ru: 'Мат: Король под шахом и защиты нет (Победа!). Пат: Шаха нет, но ходить некуда (Ничья!).'
    },
    theoryVoice: {
      az: 'Şahmatın ən uca məqsədi rəqibin bütün fiqurlarını vurmaq deyil, Şaha Mat qoymaqdır! Mat o deməkdir ki, şaha hücum var və onun qaçmağa, vurmağa və ya araya sipər çəkməyə heç bir yeri yoxdur. Bu zaman oyun bitir və mat edən tərəf qalib gəlir! Pat isə fərqlidir: şaha hücum yoxdur, amma heç bir fiqur da tərpənə bilmir. Belə olanda oyun bərabərə, yəni heç-heçə bitir.',
      en: 'The golden goal of chess is NOT eating every piece, but delivering Checkmate! Checkmate means the King is in check and has no legal escape: cannot run, cannot block, cannot capture. Game over, you win! But beware of Stalemate: when the King is NOT in check, yet has no legal move anywhere. That is an immediate draw!',
      ru: 'Главная цель в шахматах — не съесть все фигуры, а поставить МАТ! Мат означает, что королю объявлен шах, и спасения нет: нельзя убежать, нельзя закрыться, нельзя срубить. Это победа! Но опасайтесь ПАТА: когда шаха нет, но ходить вообще некуда. Тогда объявляется ничья!'
    },
    theoryText: {
      az: [
        'MAT: Şaha hücum var və qorunmağın heç bir yolu qalmayıb. Mat verən tərəf dərhal QALİB gəlir!',
        'PAT: Şaha hücum YOXDUR, lakin oyunçunun edə biləcəyi heç bir qanuni gediş qalmayıb.',
        'Pat olduqda oyun avtomatik olaraq HEÇ-HEÇƏ (bərabərlik) sayılır.',
        'Uduzan tərəf pat vəziyyəti yaradaraq oyunu xilas etməyə çalışır, üstün olan tərəf isə patdan qaçıb mat etməlidir!'
      ],
      en: [
        'CHECKMATE: The King is in check and there is NO legal escape. The checking player WINS instantly!',
        'STALEMATE: The King is NOT in check, but the player has ZERO legal moves anywhere on the board.',
        'Stalemate results in an instant DRAW (equal points 0.5 - 0.5).',
        'If you are losing, look for a clever stalemate! If you are winning, be careful not to trap the enemy without giving check!'
      ],
      ru: [
        'МАТ: Король под шахом, и нет ни одного легального способа спастись. Объявивший мат ПОБЕЖДАЕТ!',
        'ПАТ: Шаха Королю НЕТ, но у игрока нет ни одного разрешённого хода ни одной фигурой.',
        'Пат означает ничью (по 0,5 очка каждому).',
        'Если вы выигрываете, будьте внимательны, чтобы случайно не поставить пат вместо мата!'
      ]
    },
    keyFacts: {
      az: ['Mat = Şah var + Çıxış yoxdur = Qələbə', 'Pat = Şah yoxdur + Gediş yoxdur = Heç-heçə', 'Əsas məqsəd Mat etməkdir'],
      en: ['Checkmate = In Check + No Escape = Win', 'Stalemate = Not in Check + No Moves = Draw', 'Primary goal is Checkmate'],
      ru: ['Мат = Есть шах + Нет ходов = Победа', 'Пат = Нет шаха + Нет ходов = Ничья', 'Главная цель игры — Мат']
    },
    demonstrationBoard: {
      pieces: { h8: 'bK', g7: 'wQ', f6: 'wK' },
      highlightSquares: ['h8', 'g7']
    },
    exercise: {
      id: 'ex-6-1',
      type: 'checkmate',
      prompt: {
        az: 'Ağ Vəziri (♕) b7 xanasına apararaq Qara Şahı bir gedişdə MAT edin!',
        en: 'Deliver Checkmate in one move by putting your White Queen (♕) on b7!',
        ru: 'Объявите МАТ в один ход: поставьте Белого Ферзя (♕) на поле b7!'
      },
      speechPrompt: {
        az: 'Vəziri b yeddi xanasına apararaq mat et!',
        en: 'Move the Queen to b7 to deliver checkmate!',
        ru: 'Поставь ферзя на бэ семь и объяви мат!'
      },
      initialBoard: { d5: 'wQ', c6: 'wK', a8: 'bK' },
      validMove: [{ from: 'd5', to: 'b7' }],
      targetSquares: ['b7'],
      hint: {
        az: 'b7 xanasındakı vəzir həm a8 şahına hücum edir, həm də Ağ Şah tərəfindən qorunur!',
        en: 'On b7, the Queen attacks a8 directly and is defended by the White King on c6!',
        ru: 'На поле b7 ферзь атакует короля на a8 и защищён собственным королем на c6!'
      },
      explanation: {
        az: 'ŞAH VƏ MAT! Qara şah hücumdadır və heç bir tərəfə qaça bilmir. Möhtəşəm qələbə!',
        en: 'CHECKMATE! The Black King is trapped with nowhere to run. A brilliant victory!',
        ru: 'ШАХ И МАТ! Чёрный король под ударом и не может пошевелиться. Блестящая победа!'
      }
    }
  },

  // ==================== LEVEL 7: SPECIAL MOVES (Castling, Promotion, En Passant) ====================
  {
    id: 'lesson-7-1',
    level: 7,
    ageGroup: '7-10',
    icon: '✨',
    title: {
      az: 'Xüsusi Gedişlər: Qalaqurma, Çevrilmə və Keçiddə Vurma',
      en: 'Special Moves: Castling, Promotion & En Passant',
      ru: 'Особые Ходы: Рокировка, Превращение и Взятие на Проходе'
    },
    subtitle: {
      az: 'Şahı gizlədən qala və piyadanın vəzirə çevrilmə möcüzəsi!',
      en: 'Shielding the King and pawns transforming into Queens!',
      ru: 'Укрытие для Короля и превращение пешки в Ферзя!'
    },
    summary: {
      az: 'Qalaqurma şahı qoruyur. Piyada sonuncu xanaya çatanda istədiyi fiqura çevrilir.',
      en: 'Castling protects the King. Pawns reaching the 8th rank promote into any major piece.',
      ru: 'Рокировка прячет короля. Пешка на последней горизонтали превращается в любую фигуру.'
    },
    theoryVoice: {
      az: 'Şahmatda üç möcüzəvi xüsusi gediş var. Birincisi Qalaqurmadır: şah iki xana topa doğru addımlayır, top isə şahın üstündən aşıb yanına keçir. İkincisi Piyadanın Çevrilməsidir: cəsur piyada lövhənin sonuna çatdıqda ən güclü fiqura, yəni Vəzirə çevrilir! Üçüncüsü isə Keçiddə Vurmadır.',
      en: 'Chess has three magical special moves! First is Castling: the King moves 2 squares towards a Rook, and the Rook hops over. Second is Pawn Promotion: when a brave pawn reaches the opposite end, it transforms into a Queen! Third is En Passant: capturing a pawn in passing.',
      ru: 'В шахматах есть три волшебных хода! Первый — Рокировка: король делает два шага к ладье, а ладья перепрыгивает через него. Второй — Превращение пешки: дойдя до края, пешка становится Ферзём! Третий — Взятие на проходе.'
    },
    theoryText: {
      az: [
        'QALAQURMA (Rokirovka): Şahı təhlükəsiz yerə gizlətmək və topu oyuna qoşmaq üçün edilir. Şah və Top hələ heç vaxt hərəkət etməmiş olmalıdır!',
        'Qalaqurma qadağandır əgər: Şah təhlükədədirsə (şah altındadırsa) və ya keçəcəyi xanalar hücum altındadırsa.',
        'PİYADANIN ÇEVRİLMƏSİ (Promoushn): Ağ piyada 8-ci, qara piyada isə 1-ci sətrə çatanda dərhal Vəzir, Top, Fil və ya Ata çevrilir!',
        'KEÇİDDƏ VURMA (An Passan): Rəqib piyada 2 xana irəli sıçrayaraq bizim piyadanın yanına gələrsə, biz onu dərhal növbəti gedişdə sanki 1 xana gəlmiş kimi diaqonalla vura bilərik.'
      ],
      en: [
        'CASTLING: Moves the King to safety and activates the Rook. Neither King nor Rook must have moved yet!',
        'Castling is forbidden if: The King is currently in check, moves through check, or lands in check.',
        'PAWN PROMOTION: When a pawn reaches the final rank (8th for White, 1st for Black), it immediately transforms into a Queen, Rook, Bishop, or Knight!',
        'EN PASSANT: If an enemy pawn leaps two squares past yours, you can capture it diagonally on that very next turn as if it only moved one square.'
      ],
      ru: [
        'РОКИРОВКА: Прячет короля в угол и выводит ладью. Король и ладья не должны были делать ходов!',
        'Рокировка невозможна, если королю объявлен шах или поле, через которое он проходит, битое.',
        'ПРЕВРАЩЕНИЕ ПЕШКИ: Достигнув последней горизонтали, пешка превращается в Ферзя, Ладью, Слона или Коня!',
        'ВЗЯТИЕ НА ПРОХОДЕ: Если вражеская пешка прыгнула через поле рядом с вашей, вы можете забрать её на следующем ходу.'
      ]
    },
    keyFacts: {
      az: ['Qalaqurma: Şah + Top eyni anda', 'Piyada son xanada Vəzir olur', 'Keçiddə vurma dərhal edilməlidir'],
      en: ['Castling: King + Rook move together', 'Pawn promotes to Queen on 8th rank', 'En Passant must be played immediately'],
      ru: ['Рокировка: Король + Ладья одновременно', 'Пешка превращается в Ферзя на 8-й линии', 'Взятие на проходе делается сразу']
    },
    demonstrationBoard: {
      pieces: { e1: 'wK', h1: 'wR', a1: 'wR' },
      highlightSquares: ['g1', 'f1', 'c1', 'd1']
    },
    exercise: {
      id: 'ex-7-1',
      type: 'move-piece',
      prompt: {
        az: 'e7 xanasındakı Ağ Piyadanı e8 xanasına apararaq Vəzirə çevirin!',
        en: 'Push the White Pawn from e7 to e8 to promote it into a Queen!',
        ru: 'Продвиньте белую пешку с e7 на e8 и превратите её в Ферзя!'
      },
      speechPrompt: {
        az: 'Piyadanı e səkkizə çatdıraraq vəzir et.',
        en: 'Push the pawn to e8 and turn it into a Queen.',
        ru: 'Веди пешку на е восемь и преврати её в ферзя.'
      },
      initialBoard: { e7: 'wP', e1: 'wK', a8: 'bK' },
      validMove: [{ from: 'e7', to: 'e8' }],
      targetSquares: ['e8'],
      hint: {
        az: 'Piyada 8-ci sətrə çatan kimi möhtəşəm Vəzirə çevriləcək!',
        en: 'As soon as the pawn touches the 8th rank, it becomes a powerful Queen!',
        ru: 'Как только пешка встанет на 8-ю горизонталь, она превратится в могучего Ферзя!'
      },
      explanation: {
        az: 'Təbriklər! Balaca piyada lövhənin sonuna çatdı və ən güclü Vəzirə çevrildi!',
        en: 'Hooray! The little pawn reached the other side and crowned into a glorious Queen!',
        ru: 'Ура! Маленькая пешка дошла до конца и превратилась в сильнейшего Ферзя!'
      }
    }
  },

  // ==================== LEVEL 8: BASIC STRATEGY & PIECE VALUES ====================
  {
    id: 'lesson-8-1',
    level: 8,
    ageGroup: '7-10',
    icon: '🎯',
    title: {
      az: 'Əsas Şahmat Prinsipləri və Fiqur Xalları',
      en: 'Basic Chess Principles & Piece Values',
      ru: 'Основы Стратегии и Ценность Фигур'
    },
    subtitle: {
      az: 'Mərkəzi tut, fiqurları inkişaf etdir və şahını qoru!',
      en: 'Control the center, develop pieces, and protect the King!',
      ru: 'Захватывай центр, развивай фигуры и береги короля!'
    },
    summary: {
      az: 'Fiqurların xalları: Piyada=1, At=3, Fil=3, Top=5, Vəzir=9. Şahın qiyməti ölçülməzdir.',
      en: 'Piece points: Pawn=1, Knight=3, Bishop=3, Rook=5, Queen=9. The King is priceless.',
      ru: 'Ценность фигур: Пешка=1, Конь=3, Слон=3, Ладья=5, Ферзь=9. Король бесценен.'
    },
    theoryVoice: {
      az: 'Ağıllı şahmatçı üç qızıl qaydanı bilir! Birincisi: Mərkəzi xanaları piyadalarla tutmaq. İkincisi: Yatan atları və filləri dərhal oyuna çıxarmaq. Üçüncüsü: Tez qala qurub şahı qorumaq. Həmçinin unutmayın ki, fil və at üç xal, top beş xal, vəzir isə düz doqquz xal dəyərindədir!',
      en: 'A smart chess master follows three golden rules! First: seize the central squares with pawns. Second: develop your Knights and Bishops into the game. Third: castle early to keep your King safe! Also remember the piece values: Knight and Bishop are 3 points, Rook is 5, and Queen is 9!',
      ru: 'Умный шахматист знает три золотых правила! Первое: захватывай центр пешками. Второе: быстро выводи коней и слонов в бой. Третье: делай рокировку, чтобы спрятать короля! И помни ценность фигур: конь и слон стоят по 3 очка, ладья — 5, а ферзь — 9 очков!'
    },
    theoryText: {
      az: [
        'FİQUR XALLARI: Piyada = 1, At = 3, Fil = 3, Top = 5, Vəzir = 9. Şah = Əvəzsizdir (sonsuzluq)!',
        '1) MƏRKƏZİ TUTUN: e4, d4, e5, d5 xanaları lövhənin təpəsidir. Onlara nəzarət edən oyuna hakim olur.',
        '2) FİQURLARI İNKİŞAF ETDİRİN: Əvvəlcə Atları və Filləri çıxarın. Eyni fiqurla dəfələrlə boş yerə oynamayın.',
        '3) VƏZİRİ ÇOX TEZ ÇIXARMAYIN: Rəqib kiçik fiqurlarla vəzirinizə hücum edib vaxt qazana bilər.',
        '4) ŞAHI QORUYUN: İlk 10 gedişdə qalaqurma etməyə çalışın.'
      ],
      en: [
        'PIECE VALUES: Pawn = 1, Knight = 3, Bishop = 3, Rook = 5, Queen = 9. King = Priceless!',
        '1) CONTROL THE CENTER: Squares e4, d4, e5, d5 are the high ground of the board.',
        '2) DEVELOP PIECES: Bring your Knights and Bishops out first. Do not move the same piece twice without reason.',
        '3) DO NOT RUSH THE QUEEN: Enemy pieces will attack her and gain free developing moves.',
        '4) KING SAFETY: Castle within the first 10 moves to build a safe fortress.'
      ],
      ru: [
        'ЦЕННОСТЬ ФИГУР: Пешка = 1, Конь = 3, Слон = 3, Ладья = 5, Ферзь = 9. Король = Бесценен!',
        '1) ЗАХВАТ ЦЕНТРА: Поля e4, d4, e5, d5 — главная высота шахматной доски.',
        '2) РАЗВИТИЕ ФИГУР: Сначала выводите лёгкие фигуры — коней и слонов.',
        '3) НЕ ВЫВОДИТЕ ФЕРЗЯ СЛИШКОМ РАНО: Враг начнёт нападать на него с темпом.',
        '4) БЕЗОПАСНОСТЬ КОРОЛЯ: Сделайте рокировку в первые 10 ходов.'
      ]
    },
    keyFacts: {
      az: ['Mərkəzi idarə et (e4, d4)', 'At və Filləri inkişaf etdir', 'Şahı qalaqurma ilə qoru'],
      en: ['Control the center (e4, d4)', 'Develop Knights & Bishops', 'Castle early for safety'],
      ru: ['Держи центр (e4, d4)', 'Развивай коней и слонов', 'Делай раннюю рокировку']
    },
    demonstrationBoard: {
      pieces: { e4: 'wP', d4: 'wP', f3: 'wN', c4: 'wB', g1: 'wK' },
      highlightSquares: ['e4', 'd4', 'e5', 'd5']
    },
    exercise: {
      id: 'ex-8-1',
      type: 'move-piece',
      prompt: {
        az: 'Ağ Atı g1 başlanğıc xanasından mərkəzə baxan f3 xanasına inkişaf etdirin.',
        en: 'Develop the White Knight from g1 to f3 to control the center.',
        ru: 'Выведите Белого Коня с начального поля g1 на активную позицию f3.'
      },
      speechPrompt: {
        az: 'Atı g birdən f üç xanasına çıxar.',
        en: 'Develop the Knight from g1 to f3.',
        ru: 'Выведи коня с жэ один на эф три.'
      },
      initialBoard: { g1: 'wN', e4: 'wP', e1: 'wK' },
      validMove: [{ from: 'g1', to: 'f3' }],
      targetSquares: ['f3'],
      hint: {
        az: 'f3 xanasına çıxan at mərkəzdəki e5 və d4 xanalarına nəzarət edir.',
        en: 'On f3, the Knight exerts pressure over critical center squares e5 and d4.',
        ru: 'С поля f3 конь берёт под прицел важнейшие центральные поля d4 и e5.'
      },
      explanation: {
        az: 'Düzgün inkişaf! At aktiv meydana çıxdı və mərkəzi nəzarətə götürdü.',
        en: 'Ideal development! The Knight takes an active post watching the center.',
        ru: 'Идеальное развитие! Конь вышел на боевую позицию и контролирует центр.'
      }
    }
  },

  // ==================== LEVEL 9: SIMPLE TACTICS (Fork, Pin, Skewer) ====================
  {
    id: 'lesson-9-1',
    level: 9,
    ageGroup: '7-10',
    icon: '🏆',
    title: {
      az: 'Sadə Taktikalar: Çəngəl, Bağlama və Şiş',
      en: 'Simple Tactics: The Fork, Pin & Skewer',
      ru: 'Простые Тактические Приёмы: Вилка, Связка и Линейный Удар'
    },
    subtitle: {
      az: 'Bir gedişlə iki fiqura birdən zərbə vurma sənəti!',
      en: 'The art of attacking two targets at once!',
      ru: 'Искусство атаковать две фигуры соперника одним ходом!'
    },
    summary: {
      az: 'Çəngəl: Bir fiqur eyni anda rəqibin iki fiquruna hücum edir (xüsusən At çəngəli).',
      en: 'Fork: One piece attacks two or more enemy targets at the same time (especially Knight forks).',
      ru: 'Вилка: фигура нападает одновременно на две цели противника (особенно конная вилка).'
    },
    theoryVoice: {
      az: 'Şahmat ustaları qələbəni gözəl taktikalarla qazanır! Ən məşhur taktika Çəngəldir: bir fiqur, xüsusən At, eyni anda həm rəqibin şahına, həm də vəzirinə hücum edir. Şah qaçmağa məcbur olanda isə vəziri rahatlıqla vurursan! Bağlama isə rəqibin fiqurunu tərpənməz hala salır.',
      en: 'Chess masters win with clever tactics! The most famous is the Fork: one piece, especially a tricky Knight, attacks two big targets simultaneously, like the King and Queen. When the King runs, you snap the Queen! A Pin freezes an enemy piece from moving.',
      ru: 'Шахматные мастера побеждают с помощью красивой тактики! Самый известный приём — это Вилка: одна фигура, чаще всего конь, нападает сразу на две важные фигуры, например на короля и ферзя. Король вынужден бежать, и ферзь гибнет!'
    },
    theoryText: {
      az: [
        'ÇƏNGƏL (İkili Zərbə): Bir fiqurun (məsələn, Atın) eyni anda iki və ya daha çox düşmən fiquruna hücum etməsidir.',
        'BAĞLAMA: Düşmən fiqurunun arxasında daha dəyərli bir fiqur (məsələn, Şah və ya Vəzir) dayandığı üçün həmin fiqur tərpənə bilmir.',
        'ŞİŞ (Xətti Zərbə): Əsas fiqur (məsələn, Şah) ön plandadır, o qaçdıqda arxadakı fiqur (məsələn, Top) vurulur.',
        'Hər gedişdə rəqibin müdafiəsiz fiqurlarını axtarın!'
      ],
      en: [
        'THE FORK (Double Attack): When a single piece attacks two or more pieces at once.',
        'THE PIN: An enemy piece cannot move because it would expose a more valuable piece (King or Queen) behind it.',
        'THE SKEWER: An attack on a valuable piece in front, forcing it to move and revealing a target behind it.',
        'Always look for undefended ("hanging") enemy pieces!'
      ],
      ru: [
        'ВИЛКА (Двойной удар): Нападение одной фигуры сразу на две или более фигуры соперника.',
        'СВЯЗКА: Фигура не может пойти, так как за ней стоит более ценная фигура (Король или Ферзь).',
        'ЛИНЕЙНЫЙ УДАР (Сквозной шах): Атака на короля или ферзя, за которым стоит беззащитная фигура.',
        'Всегда замечайте фигуры противника, оставшиеся без защиты!'
      ]
    },
    keyFacts: {
      az: ['At çəngəli çox güclüdür', 'Bağlama fiquru iflic edir', 'Müdafiəsiz fiqurları vurun'],
      en: ['Knight forks are deadly', 'Pins freeze enemy pieces', 'Look for undefended targets'],
      ru: ['Вилка конём смертельна', 'Связка обездвиживает', 'Ищи незащищённые фигуры']
    },
    demonstrationBoard: {
      pieces: { c7: 'wN', e8: 'bK', a8: 'bR' },
      highlightSquares: ['e8', 'a8', 'c7']
    },
    exercise: {
      id: 'ex-9-1',
      type: 'move-piece',
      prompt: {
        az: 'Ağ Atı d5 xanasından c7 xanasına apararaq Qara Şah və Qara Topa ŞAHİ ÇƏNGƏL atın!',
        en: 'Jump White Knight from d5 to c7 to deliver a royal FORK on the King and Rook!',
        ru: 'Поставьте Белого Коня с d5 на c7, чтобы объявить королевскую ВИЛКУ на Короля и Ладью!'
      },
      speechPrompt: {
        az: 'Atı c yeddi xanasına apararaq şah və topa çəngəl at.',
        en: 'Move the Knight to c7 for a royal fork.',
        ru: 'Прыгай конём на цэ семь и ставь вилку на короля и ладью.'
      },
      initialBoard: { d5: 'wN', e8: 'bK', a8: 'bR' },
      validMove: [{ from: 'd5', to: 'c7' }],
      targetSquares: ['c7'],
      hint: {
        az: 'c7 xanasından At eyni anda həm e8-dəki şaha hücum edir (Şah!), həm də a8-dəki topu hədəfə alır!',
        en: 'From c7, the Knight checks the King on e8 AND simultaneously targets the Rook on a8!',
        ru: 'С поля c7 конь даёт шах королю на e8 и одновременно нападает на ладью на a8!'
      },
      explanation: {
        az: 'MÖHTƏŞƏM ÇƏNGƏL! Şah qaçmağa məcburdur, növbəti gedişdə Topu qazanırsınız!',
        en: 'BRILLIANT FORK! The King must run, and next move you win the free Rook!',
        ru: 'БЛЕСТЯЩАЯ ВИЛКА! Король обязан отступить, и вы забираете ладью на a8!'
      }
    }
  }
];
