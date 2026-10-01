export interface LearningActivityItem {
  id: string;
  title: string;
  instruction: string;
  type: 'select' | 'match' | 'sequence' | 'sentence' | 'command' | 'audio-identify' | 'tracing' | 'flashcard';
  question?: string;
  targetAudioText?: string;
  options?: Array<{
    id: string;
    text: string;
    emoji?: string;
    isCorrect?: boolean;
    soundUrl?: string;
  }>;
  sequenceSteps?: Array<{
    id: string;
    text: string;
    order: number;
    emoji: string;
  }>;
  sentenceWords?: string[];
  correctSentence?: string;
  explanation?: string;
}

export interface LearningModuleCategory {
  id: string;
  slug: string;
  titleAz: string;
  titleEn: string;
  titleRu: string;
  descriptionAz: string;
  emoji: string;
  group: 'foundations' | 'commands' | 'speech' | 'social' | 'cognitive' | 'existing';
  minAge: number;
  maxAge: number;
  color: string;
  badge?: string;
  activities: LearningActivityItem[];
}

export const LEARNING_GROUPS = [
  { id: 'all', labelAz: 'Hamısı', labelEn: 'All', labelRu: 'Все', emoji: '🌟' },
  { id: 'foundations', labelAz: 'Əsas Anlayışlar', labelEn: 'Foundations', labelRu: 'Основы', emoji: '🎨' },
  { id: 'commands', labelAz: 'Komandalar & Məkan', labelEn: 'Commands & Space', labelRu: 'Команды и Пространство', emoji: '🧭' },
  { id: 'speech', labelAz: 'Nitq və Dil', labelEn: 'Speech & Language', labelRu: 'Речь и Язык', emoji: '🗣️' },
  { id: 'social', labelAz: 'Emosiyalar & Sosial', labelEn: 'Emotions & Social', labelRu: 'Эмоции и Социум', emoji: '🤝' },
  { id: 'cognitive', labelAz: 'Koqnitiv & Motorika', labelEn: 'Cognitive & Motor', labelRu: 'Когнитивные и Моторика', emoji: '🧠' },
  { id: 'existing', labelAz: 'Əlavə Fənlər', labelEn: 'Core Subjects', labelRu: 'Основные Предметы', emoji: '📚' },
] as const;

export const LEARNING_MODULES: LearningModuleCategory[] = [
  // ── 1. Rənglər (Colors) ─────────────────────────────────────────────
  {
    id: 'colors',
    slug: 'rengler',
    titleAz: 'Rənglər',
    titleEn: 'Colors',
    titleRu: 'Цвета',
    descriptionAz: 'Qırmızı, mavi, sarı, yaşıl və digər rəngləri tanıyaq və seçək.',
    emoji: '🎨',
    group: 'foundations',
    minAge: 2,
    maxAge: 6,
    color: 'from-rose-500 to-red-400',
    activities: [
      {
        id: 'color-red-1',
        title: 'Qırmızı rəngi seç',
        instruction: 'Qırmızı olan almanı seç.',
        type: 'select',
        question: 'Hansı alma qırmızı rəngdədir?',
        targetAudioText: 'Qırmızı olan almanı seç.',
        options: [
          { id: 'c1', text: 'Qırmızı Alma', emoji: '🍎', isCorrect: true },
          { id: 'c2', text: 'Yaşıl Alma', emoji: '🍏', isCorrect: false },
          { id: 'c3', text: 'Sarı Banan', emoji: '🍌', isCorrect: false },
        ],
        explanation: 'Afərin! Qırmızı alma məhz budur!',
      },
      {
        id: 'color-blue-2',
        title: 'Mavi topu tap',
        instruction: 'Mavi rəngli topu göstər.',
        type: 'select',
        question: 'Mavi top hansıdır?',
        targetAudioText: 'Mavi rəngli topu tap.',
        options: [
          { id: 'c4', text: 'Sarı Top', emoji: '🟡', isCorrect: false },
          { id: 'c5', text: 'Mavi Top', emoji: '🔵', isCorrect: true },
          { id: 'c6', text: 'Qara Top', emoji: '⚫', isCorrect: false },
        ],
        explanation: 'Əla! Mavi topu tapdın!',
      },
      {
        id: 'color-green-3',
        title: 'Yaşıl rəng',
        instruction: 'Təbiətdə yaşıl olan yarpağı tap.',
        type: 'select',
        question: 'Yaşıl yarpaq hansıdır?',
        targetAudioText: 'Yaşıl yarpağı seç.',
        options: [
          { id: 'c7', text: 'Yaşıl Yarpaq', emoji: '🍃', isCorrect: true },
          { id: 'c8', text: 'Bənövşəyi Gül', emoji: '🟣', isCorrect: false },
          { id: 'c9', text: 'Narıncı Kök', emoji: '🥕', isCorrect: false },
        ],
        explanation: 'Düzdür, yarpaq yaşıldır!',
      },
    ],
  },

  // ── 2. Formalar (Shapes) ────────────────────────────────────────────
  {
    id: 'shapes',
    slug: 'formalar',
    titleAz: 'Formalar',
    titleEn: 'Shapes',
    titleRu: 'Формы',
    descriptionAz: 'Dairə, kvadrat, üçbucaq, düzbucaqlı, oval və ulduz fiqurları.',
    emoji: '🔷',
    group: 'foundations',
    minAge: 2,
    maxAge: 6,
    color: 'from-amber-500 to-yellow-400',
    activities: [
      {
        id: 'shape-circle-1',
        title: 'Dairəni tap',
        instruction: 'Dairə formasında olan fiquru seç.',
        type: 'select',
        question: 'Dairə hansıdır?',
        targetAudioText: 'Dairə formasını seç.',
        options: [
          { id: 's1', text: 'Dairə', emoji: '⭕', isCorrect: true },
          { id: 's2', text: 'Kvadrat', emoji: '⬛', isCorrect: false },
          { id: 's3', text: 'Üçbucaq', emoji: '🔺', isCorrect: false },
        ],
        explanation: 'Super! Dairənin küncü olmur.',
      },
      {
        id: 'shape-star-2',
        title: 'Göydəki ulduz',
        instruction: 'Ulduz formasını tap.',
        type: 'select',
        question: 'Ulduz fiquru hansıdır?',
        targetAudioText: 'Ulduz formasını göstər.',
        options: [
          { id: 's4', text: 'Ürək', emoji: '❤️', isCorrect: false },
          { id: 's5', text: 'Ulduz', emoji: '⭐', isCorrect: true },
          { id: 's6', text: 'Düzbucaqlı', emoji: '▭', isCorrect: false },
        ],
        explanation: 'Çox gözəl! Bu parlaq bir ulduzdur!',
      },
    ],
  },

  // ── 3. Sadə əşyalar (Everyday Objects) ───────────────────────────────
  {
    id: 'objects',
    slug: 'sade-esyalar',
    titleAz: 'Sadə əşyalar',
    titleEn: 'Everyday Objects',
    titleRu: 'Простые предметы',
    descriptionAz: 'Masa, stul, qaşıq, fincan, qapı, pəncərə, kitab və digər ev əşyaları.',
    emoji: '📦',
    group: 'foundations',
    minAge: 2,
    maxAge: 5,
    color: 'from-sky-500 to-blue-400',
    activities: [
      {
        id: 'obj-spoon-1',
        title: 'Yemək yediyimiz əşya',
        instruction: 'Yemək yemək üçün istifadə etdiyimiz qaşığı seç.',
        type: 'select',
        question: 'Şorbanı nə ilə yeyirik?',
        targetAudioText: 'Yemək üçün qaşığı tap.',
        options: [
          { id: 'o1', text: 'Qaşıq', emoji: '🥄', isCorrect: true },
          { id: 'o2', text: 'Stul', emoji: '🪑', isCorrect: false },
          { id: 'o3', text: 'Qapı', emoji: '🚪', isCorrect: false },
        ],
        explanation: 'Bəli, biz şorbanı qaşıqla yeyirik!',
      },
      {
        id: 'obj-cup-2',
        title: 'Su içdiyimiz qab',
        instruction: 'Fincanı və ya stəkanı tap.',
        type: 'select',
        question: 'Çay və ya su nə ilə içilir?',
        targetAudioText: 'Fincanı seç.',
        options: [
          { id: 'o4', text: 'Kitab', emoji: '📖', isCorrect: false },
          { id: 'o5', text: 'Fincan', emoji: '☕', isCorrect: true },
          { id: 'o6', text: 'Yataq', emoji: '🛏️', isCorrect: false },
        ],
        explanation: 'Əla! Fincanla ilıq çay içmək olar.',
      },
    ],
  },

  // ── 4. Bədən hissələri (Body Parts) ─────────────────────────────────
  {
    id: 'body-parts',
    slug: 'beden-hisseleri',
    titleAz: 'Bədən hissələri',
    titleEn: 'Body Parts',
    titleRu: 'Части тела',
    descriptionAz: 'Baş, göz, qulaq, burun, ağız, əl, ayaq və barmaqlar.',
    emoji: '🫀',
    group: 'foundations',
    minAge: 2,
    maxAge: 5,
    color: 'from-emerald-500 to-green-400',
    activities: [
      {
        id: 'body-eye-1',
        title: 'Görmək üçün orqan',
        instruction: 'Dünyanı görmək üçün istifadə etdiyimiz gözü seç.',
        type: 'select',
        question: 'Biz nə ilə görürük?',
        targetAudioText: 'Gözü tap.',
        options: [
          { id: 'b1', text: 'Göz', emoji: '👁️', isCorrect: true },
          { id: 'b2', text: 'Qulaq', emoji: '👂', isCorrect: false },
          { id: 'b3', text: 'Burun', emoji: '👃', isCorrect: false },
        ],
        explanation: 'Gözlərimizlə ətrafımızdakı gözəllikləri görürük!',
      },
      {
        id: 'body-hand-2',
        title: 'Əl salla',
        instruction: 'Əşyaları tutmaq üçün istifadə etdiyimiz əli seç.',
        type: 'select',
        question: 'Oyuncaqları nə ilə tuturuq?',
        targetAudioText: 'Əlini göstər.',
        options: [
          { id: 'b4', text: 'Ayaq', emoji: '🦶', isCorrect: false },
          { id: 'b5', text: 'Əl', emoji: '✋', isCorrect: true },
          { id: 'b6', text: 'Ağız', emoji: '👄', isCorrect: false },
        ],
        explanation: 'Bəli, əllərimizlə salam verir və oyuncaq tuturuq!',
      },
    ],
  },

  // ── 5. Heyvanlar (Animals) ──────────────────────────────────────────
  {
    id: 'animals',
    slug: 'heyvanlar',
    titleAz: 'Heyvanlar',
    titleEn: 'Animals',
    titleRu: 'Животные',
    descriptionAz: 'Ev və vəhşi heyvanlar, onların səsləri və yaşadıqları yerlər.',
    emoji: '🐶',
    group: 'foundations',
    minAge: 2,
    maxAge: 7,
    color: 'from-amber-600 to-orange-400',
    activities: [
      {
        id: 'anim-cat-1',
        title: 'Miyoldayan dostumuz',
        instruction: '"Miyau" deyən heyvanı seç.',
        type: 'select',
        question: 'Hansı heyvan "miyau" edir?',
        targetAudioText: 'Miyau deyən pişiyi seç.',
        options: [
          { id: 'a1', text: 'Pişik', emoji: '🐱', isCorrect: true },
          { id: 'a2', text: 'İt', emoji: '🐶', isCorrect: false },
          { id: 'a3', text: 'İnək', emoji: '🐮', isCorrect: false },
        ],
        explanation: 'Düzdür! Pişik sevimli miyau səsi çıxarır.',
      },
      {
        id: 'anim-cow-2',
        title: 'Bizə süd verən heyvan',
        instruction: '"Möö" deyən və süd verən inəyi tap.',
        type: 'select',
        question: 'İnək hansıdır?',
        targetAudioText: 'İnəyi seç.',
        options: [
          { id: 'a4', text: 'Qoyun', emoji: '🐑', isCorrect: false },
          { id: 'a5', text: 'İnək', emoji: '🐮', isCorrect: true },
          { id: 'a6', text: 'At', emoji: '🐴', isCorrect: false },
        ],
        explanation: 'Əla! İnək bizə ləzzətli və faydalı süd verir.',
      },
    ],
  },

  // ── 6. Meyvə və tərəvəzlər (Fruits & Veggies) ───────────────────────
  {
    id: 'fruits-vegetables',
    slug: 'meyve-terevezler',
    titleAz: 'Meyvə və tərəvəzlər',
    titleEn: 'Fruits & Vegetables',
    titleRu: 'Фрукты и Овощи',
    descriptionAz: 'Alma, banan, çiyələk, kök, xiyar, pomidor və faydalı vitaminlər.',
    emoji: '🍎',
    group: 'foundations',
    minAge: 2,
    maxAge: 6,
    color: 'from-lime-500 to-emerald-400',
    activities: [
      {
        id: 'fv-banana-1',
        title: 'Sarı və şirin meyvə',
        instruction: 'Meymunların çox sevdiyi sarı bananı seç.',
        type: 'select',
        question: 'Banan hansıdır?',
        targetAudioText: 'Sarı bananı seç.',
        options: [
          { id: 'fv1', text: 'Banan', emoji: '🍌', isCorrect: true },
          { id: 'fv2', text: 'Pomidor', emoji: '🍅', isCorrect: false },
          { id: 'fv3', text: 'Kartof', emoji: '🥔', isCorrect: false },
        ],
        explanation: 'Dadlı və sarı banan vitaminlə zəngindir!',
      },
    ],
  },

  // ── 7. Nəqliyyat (Vehicles / Transport) ──────────────────────────────
  {
    id: 'transport',
    slug: 'neqliyyat',
    titleAz: 'Nəqliyyat',
    titleEn: 'Transport',
    titleRu: 'Транспорт',
    descriptionAz: 'Maşın, avtobus, qatar, təyyarə, gəmi və velosiped.',
    emoji: '🚗',
    group: 'foundations',
    minAge: 3,
    maxAge: 7,
    color: 'from-blue-600 to-cyan-400',
    activities: [
      {
        id: 'tr-plane-1',
        title: 'Göydə uçan nəqliyyat',
        instruction: 'Buludların üstündə uçan təyyarəni seç.',
        type: 'select',
        question: 'Hansı nəqliyyat göydə uçur?',
        targetAudioText: 'Göydə uçan təyyarəni tap.',
        options: [
          { id: 't1', text: 'Təyyarə', emoji: '✈️', isCorrect: true },
          { id: 't2', text: 'Gəmi', emoji: '🚢', isCorrect: false },
          { id: 't3', text: 'Avtobus', emoji: '🚌', isCorrect: false },
        ],
        explanation: 'Afərin! Təyyarə qanadları ilə göydə uçur.',
      },
    ],
  },

  // ── 8. Peşələr (Professions) ────────────────────────────────────────
  {
    id: 'professions',
    slug: 'peseler',
    titleAz: 'Peşələr',
    titleEn: 'Professions',
    titleRu: 'Профессии',
    descriptionAz: 'Həkim, müəllim, yanğınsöndürən, polis və aşpaz peşələri.',
    emoji: '👨‍🍳',
    group: 'foundations',
    minAge: 3,
    maxAge: 7,
    color: 'from-indigo-500 to-purple-400',
    activities: [
      {
        id: 'prof-doctor-1',
        title: 'Bizi sağaldan peşə',
        instruction: 'Xəstələnəndə bizi müalicə edən həkimi seç.',
        type: 'select',
        question: 'Xəstələri kim müalicə edir?',
        targetAudioText: 'Həkimi seç.',
        options: [
          { id: 'p1', text: 'Həkim', emoji: '🩺', isCorrect: true },
          { id: 'p2', text: 'Aşpaz', emoji: '🍳', isCorrect: false },
          { id: 'p3', text: 'Sürücü', emoji: '🚗', isCorrect: false },
        ],
        explanation: 'Bəli, həkim bizi müayinə edir və sağalmağımıza kömək edir!',
      },
    ],
  },

  // ── 9. Ailə (Family) ────────────────────────────────────────────────
  {
    id: 'family',
    slug: 'aile',
    titleAz: 'Ailə',
    titleEn: 'Family',
    titleRu: 'Семья',
    descriptionAz: 'Ana, ata, bacı, qardaş, nənə və baba anlayışları.',
    emoji: '👨‍👩‍👧‍👦',
    group: 'foundations',
    minAge: 2,
    maxAge: 6,
    color: 'from-pink-500 to-rose-400',
    activities: [
      {
        id: 'fam-mom-1',
        title: 'Sevimli ailəmiz',
        instruction: 'Ailənin sevgi dolu anasını seç.',
        type: 'select',
        question: 'Hansı şəkildə Ana təsvir olunub?',
        targetAudioText: 'Ananı seç.',
        options: [
          { id: 'fm1', text: 'Ana', emoji: '👩', isCorrect: true },
          { id: 'fm2', text: 'Ata', emoji: '👨', isCorrect: false },
          { id: 'fm3', text: 'Bacı', emoji: '👧', isCorrect: false },
        ],
        explanation: 'Ailəmizin ən şəfqətli üzvü anamızı çox sevirik!',
      },
    ],
  },

  // ── 10. Sadə komandalar (Simple Commands) ───────────────────────────
  {
    id: 'simple-commands',
    slug: 'sade-komandalar',
    titleAz: 'Sadə komandalar',
    titleEn: 'Simple Commands',
    titleRu: 'Простые команды',
    descriptionAz: 'Otur, qalx, dayan, gəl, get, tullan, əlini qaldır.',
    emoji: '🎯',
    group: 'commands',
    minAge: 2,
    maxAge: 5,
    color: 'from-teal-500 to-cyan-400',
    activities: [
      {
        id: 'cmd-sit-1',
        title: 'Otur və dincəl',
        instruction: 'Stula oturmağı bildirən hərəkəti seç.',
        type: 'select',
        question: 'Hansı hərəkət "Otur" komandasıdır?',
        targetAudioText: 'Otur komandasını göstər.',
        options: [
          { id: 'sc1', text: 'Otur', emoji: '🪑', isCorrect: true },
          { id: 'sc2', text: 'Tullan', emoji: '🦘', isCorrect: false },
          { id: 'sc3', text: 'Qaç', emoji: '🏃', isCorrect: false },
        ],
        explanation: 'Otur komandasında stulda rahat əyləşirik.',
      },
    ],
  },

  // ── 11. İki mərhələli komandalar (Two-stage Commands) ────────────────
  {
    id: 'two-step-commands',
    slug: 'iki-merheleli-komandalar',
    titleAz: 'İki mərhələli komandalar',
    titleEn: 'Two-Step Commands',
    titleRu: 'Двухэтапные команды',
    descriptionAz: '“Topu götür və masaya qoy”, “Ayağa qalx və əlini qaldır”.',
    emoji: '🔄',
    group: 'commands',
    minAge: 3,
    maxAge: 7,
    color: 'from-cyan-600 to-blue-400',
    activities: [
      {
        id: 'cmd-2step-1',
        title: 'Topu qutuya qoy',
        instruction: '1-ci addım: Topu götür. 2-ci addım: Qutuya qoy.',
        type: 'sequence',
        question: 'Düzgün ardıcıllığı qur: Əvvəlcə nə edirik, sonra nə?',
        targetAudioText: 'Topu götür və qutuya qoy.',
        sequenceSteps: [
          { id: 'step1', text: '1. Topu əlinə götür', order: 1, emoji: '🏀' },
          { id: 'step2', text: '2. Qutunun içinə qoy', order: 2, emoji: '📦' },
        ],
        explanation: 'Super! Hər iki mərhələni ardıcıl tamamladın!',
      },
    ],
  },

  // ── 12. Məkan anlayışları (Spatial Concepts) ────────────────────────
  {
    id: 'spatial-concepts',
    slug: 'mekan-anlayislari',
    titleAz: 'Məkan anlayışları',
    titleEn: 'Spatial Concepts',
    titleRu: 'Пространственные понятия',
    descriptionAz: 'Üstündə, altında, içində, yanında, qarşısında, arxasında.',
    emoji: '🧭',
    group: 'commands',
    minAge: 3,
    maxAge: 7,
    color: 'from-violet-500 to-indigo-400',
    activities: [
      {
        id: 'space-on-1',
        title: 'Masanın üstündə',
        instruction: 'Masanın ÜSTÜNDƏ olan kitabı tap.',
        type: 'select',
        question: 'Kitab masanın harasındadır?',
        targetAudioText: 'Masanın üstündə olan kitabı seç.',
        options: [
          { id: 'sp1', text: 'Üstündə', emoji: '📚🔝', isCorrect: true },
          { id: 'sp2', text: 'Altında', emoji: '📚⬇️', isCorrect: false },
          { id: 'sp3', text: 'İçində', emoji: '📚📦', isCorrect: false },
        ],
        explanation: 'Əla! Kitab masanın tam üstündə yerləşir.',
      },
    ],
  },

  // ── 13. Ölçülər və müqayisə (Sizes & Comparison) ────────────────────
  {
    id: 'sizes-comparison',
    slug: 'olculer-muqayise',
    titleAz: 'Ölçülər və müqayisə',
    titleEn: 'Sizes & Comparison',
    titleRu: 'Размеры и Сравнение',
    descriptionAz: 'Böyük/kiçik, uzun/qısa, hündür/alçaq, ağır/yüngül.',
    emoji: '📏',
    group: 'commands',
    minAge: 3,
    maxAge: 7,
    color: 'from-amber-600 to-yellow-500',
    activities: [
      {
        id: 'size-big-1',
        title: 'Böyük olanı tap',
        instruction: 'Böyük fili seç.',
        type: 'select',
        question: 'Hansı heyvan daha böyükdür?',
        targetAudioText: 'Böyük heyvanı seç.',
        options: [
          { id: 'sz1', text: 'Böyük Fil', emoji: '🐘', isCorrect: true },
          { id: 'sz2', text: 'Kiçik Siçan', emoji: '🐭', isCorrect: false },
        ],
        explanation: 'Afərin! Fil siçandan qat-qat böyükdür.',
      },
    ],
  },

  // ── 14. Əks anlayışlar (Opposites) ──────────────────────────────────
  {
    id: 'opposites',
    slug: 'eks-anlayislar',
    titleAz: 'Əks anlayışlar',
    titleEn: 'Opposites',
    titleRu: 'Противоположности',
    descriptionAz: 'İsti/soyuq, gecə/gündüz, sürətli/yavaş, təmiz/çirkli.',
    emoji: '⚖️',
    group: 'commands',
    minAge: 3,
    maxAge: 7,
    color: 'from-emerald-600 to-teal-400',
    activities: [
      {
        id: 'opp-hot-cold-1',
        title: 'İsti və Soyuq',
        instruction: 'İsti çayın əksi nədir? Soyuq dondurmanı tap.',
        type: 'select',
        question: 'İsti sözünün əksi hansıdır?',
        targetAudioText: 'İsti sözünün əksini seç.',
        options: [
          { id: 'op1', text: 'Soyuq Buz', emoji: '🧊', isCorrect: true },
          { id: 'op2', text: 'Alov', emoji: '🔥', isCorrect: false },
        ],
        explanation: 'Düzdür! İsti çayın əksi soyuq buzdur.',
      },
    ],
  },

  // ── 15. Saylar (Numbers) ────────────────────────────────────────────
  {
    id: 'numbers',
    slug: 'saylar',
    titleAz: 'Saylar',
    titleEn: 'Numbers',
    titleRu: 'Числа',
    descriptionAz: '1-dən 10-a qədər sayma, sayları tanıma və miqdarı anlama.',
    emoji: '🔢',
    group: 'speech',
    minAge: 2,
    maxAge: 7,
    color: 'from-blue-500 to-indigo-400',
    activities: [
      {
        id: 'num-count-3',
        title: '3 alma say',
        instruction: 'Şəkildə 3 ədəd alma olan qrupu seç.',
        type: 'select',
        question: 'Harada 3 dənə alma var?',
        targetAudioText: 'Üç alma olan şəkli seç.',
        options: [
          { id: 'n1', text: '1 Alma', emoji: '🍎', isCorrect: false },
          { id: 'n2', text: '3 Alma', emoji: '🍎🍎🍎', isCorrect: true },
          { id: 'n3', text: '5 Alma', emoji: '🍎🍎🍎🍎🍎', isCorrect: false },
        ],
        explanation: 'Möhtəşəm! Bir, iki, üç — cəmi üç alma!',
      },
    ],
  },

  // ── 16. Hərflər (Letters) ───────────────────────────────────────────
  {
    id: 'letters',
    slug: 'herfler',
    titleAz: 'Hərflər',
    titleEn: 'Letters',
    titleRu: 'Буквы',
    descriptionAz: 'Azərbaycan əlifbasının sevimli hərfləri və söz başlanğıcları.',
    emoji: '🔤',
    group: 'speech',
    minAge: 4,
    maxAge: 7,
    color: 'from-purple-500 to-pink-400',
    activities: [
      {
        id: 'let-a-1',
        title: 'A hərfi',
        instruction: '"Alma" sözü hansı hərflə başlayır?',
        type: 'select',
        question: 'Alma sözünün ilk hərfi hansıdır?',
        targetAudioText: 'A hərfini seç.',
        options: [
          { id: 'l1', text: 'A hərfi', emoji: '🅰️', isCorrect: true },
          { id: 'l2', text: 'B hərfi', emoji: '🅱️', isCorrect: false },
          { id: 'l3', text: 'C hərfi', emoji: '©️', isCorrect: false },
        ],
        explanation: 'Bəli! A — Alma, Ana, Arı!',
      },
    ],
  },

  // ── 17. Səslər (Phonics / Articulation) ──────────────────────────────
  {
    id: 'sounds',
    slug: 'sesler',
    titleAz: 'Səslər',
    titleEn: 'Sounds & Phonics',
    titleRu: 'Звуки и Артикуляция',
    descriptionAz: 'R, S, Z, L səslərinin təmiz və aydın tələffüz məşqləri.',
    emoji: '🗣️',
    group: 'speech',
    minAge: 3,
    maxAge: 8,
    color: 'from-emerald-500 to-teal-400',
    activities: [
      {
        id: 'snd-r-1',
        title: '"R" səsini təkrar et',
        instruction: '"Rrr - Rrr - Raket" deyərək təkrar et.',
        type: 'command',
        question: 'Dilinin ucunu yuxarı qaldır və "Rrrr" de!',
        targetAudioText: 'Dilinin ucunu yuxarı qaldır və təkrar et: Rrrrr!',
        options: [
          { id: 'sr1', text: 'Dedim! 🚀', emoji: '🚀', isCorrect: true },
          { id: 'sr2', text: 'Yenidən dinlə', emoji: '🔊', isCorrect: false },
        ],
        explanation: 'Afərin! Dilin çox güclüdür!',
      },
    ],
  },

  // ── 18. Söz ehtiyatı (Vocabulary Packs) ─────────────────────────────
  {
    id: 'vocabulary',
    slug: 'soz-ehtiyati',
    titleAz: 'Söz ehtiyatı',
    titleEn: 'Vocabulary',
    titleRu: 'Словарный запас',
    descriptionAz: 'Heyvanlar, geyimlər, təbiət və ev əşyaları üzrə zəngin söz xəzinəsi.',
    emoji: '📚',
    group: 'speech',
    minAge: 2,
    maxAge: 7,
    color: 'from-rose-500 to-pink-500',
    activities: [
      {
        id: 'voc-clothes-1',
        title: 'Qışda nə geyinirik?',
        instruction: 'Soyuq havada başımıza geyindiyimiz papağı seç.',
        type: 'select',
        question: 'Başa nə qoyulur?',
        targetAudioText: 'Papağı seç.',
        options: [
          { id: 'vc1', text: 'Papaq', emoji: '🧢', isCorrect: true },
          { id: 'vc2', text: 'Köynək', emoji: '👕', isCorrect: false },
          { id: 'vc3', text: 'Ayaqqabı', emoji: '👟', isCorrect: false },
        ],
        explanation: 'Düzdür, papağı başımıza qoyuruq.',
      },
    ],
  },

  // ── 19. Cümlə qurmaq (Sentence Building) ────────────────────────────
  {
    id: 'sentence-building',
    slug: 'cumle-qurmaq',
    titleAz: 'Cümlə qurmaq',
    titleEn: 'Sentence Building',
    titleRu: 'Построение предложений',
    descriptionAz: 'Sözləri birləşdirərək mənalı və gözəl cümlələr yaradırıq.',
    emoji: '🧩',
    group: 'speech',
    minAge: 3,
    maxAge: 8,
    color: 'from-sky-600 to-blue-500',
    activities: [
      {
        id: 'sent-ball-1',
        title: 'Cümləni düz: "Uşaq top oynayır"',
        instruction: 'Sözləri düzgün ardıcıllıqla seçərək cümlə qur.',
        type: 'sentence',
        question: 'Bu cümləni düzəlt: "Uşaq top oynayır"',
        targetAudioText: 'Uşaq top oynayır.',
        sentenceWords: ['oynayır', 'Uşaq', 'top'],
        correctSentence: 'Uşaq top oynayır',
        explanation: 'Əla cümlə alındı: Uşaq top oynayır!',
      },
    ],
  },

  // ── 20. Sual-cavab (Questions & Answers) ────────────────────────────
  {
    id: 'question-answer',
    slug: 'sual-cavab',
    titleAz: 'Sual-cavab',
    titleEn: 'Q & A',
    titleRu: 'Вопрос-Ответ',
    descriptionAz: 'Kim? Nə? Harada? Nə edir? Hansı? suallarına cavab verməyi öyrənirik.',
    emoji: '❓',
    group: 'speech',
    minAge: 3,
    maxAge: 7,
    color: 'from-amber-500 to-orange-500',
    activities: [
      {
        id: 'qa-who-1',
        title: '"Kim?" sualı',
        instruction: 'Məktəbdə uşaqlara dərs öyrədən şəxs KİMDİR?',
        type: 'select',
        question: 'Məktəbdə bizə dərs keçən kimdir?',
        targetAudioText: 'Müəllimi seç.',
        options: [
          { id: 'qa1', text: 'Müəllim', emoji: '👩‍🏫', isCorrect: true },
          { id: 'qa2', text: 'Təyyarə', emoji: '✈️', isCorrect: false },
        ],
        explanation: 'Müəllim bizə bilik və tərbiyə öyrədir.',
      },
    ],
  },

  // ── 21. Hadisə ardıcıllığı (Event Sequencing) ───────────────────────
  {
    id: 'event-sequencing',
    slug: 'hadise-ardicilligi',
    titleAz: 'Hadisə ardıcıllığı',
    titleEn: 'Event Sequencing',
    titleRu: 'Последовательность событий',
    descriptionAz: 'Hadisələri əvvəldən axıra kimi düzgün ardıcıllıqla düzək.',
    emoji: '🔢',
    group: 'speech',
    minAge: 4,
    maxAge: 8,
    color: 'from-teal-600 to-emerald-500',
    activities: [
      {
        id: 'seq-wash-hands-1',
        title: 'Əllərin yuyulması ardıcıllığı',
        instruction: 'Əlləri yumağın düzgün ardıcıllığını qur.',
        type: 'sequence',
        question: 'Əvvəlcə nə edirik, sonda nə?',
        targetAudioText: 'Əllərimizi necə yuyuruq?',
        sequenceSteps: [
          { id: 'w1', text: '1. Kranı açırıq və əli isladırıq', order: 1, emoji: '🚰' },
          { id: 'w2', text: '2. Sabunla köpükləndiririk', order: 2, emoji: '🧼' },
          { id: 'w3', text: '3. Su ilə durulayırıq', order: 3, emoji: '💦' },
          { id: 'w4', text: '4. Dəsmalla qurulayırıq', order: 4, emoji: '🧖' },
        ],
        explanation: 'Mükəmməl! İndi əllərin tərtəmizdir!',
      },
    ],
  },

  // ── 22. Hekayə qurmaq (Story Building) ──────────────────────────────
  {
    id: 'story-building',
    slug: 'hekaye-qurmaq',
    titleAz: 'Hekayə qurmaq',
    titleEn: 'Story Building',
    titleRu: 'Составление рассказов',
    descriptionAz: 'Şəkillərə baxaraq maraqlı nağıl və hekayələr uydururuq.',
    emoji: '📖',
    group: 'speech',
    minAge: 4,
    maxAge: 8,
    color: 'from-indigo-600 to-violet-500',
    activities: [
      {
        id: 'st-pic-1',
        title: 'Parkda gəzinti hekayəsi',
        instruction: 'Şəkillərə bax və qısa hekayəni tamamla.',
        type: 'select',
        question: 'Dovşan meşədə nə tapdı?',
        targetAudioText: 'Dovşan şirəli kök tapdı.',
        options: [
          { id: 'sb1', text: 'Şirəli narıncı kök', emoji: '🥕', isCorrect: true },
          { id: 'sb2', text: 'Köhnə ayaqqabı', emoji: '👞', isCorrect: false },
        ],
        explanation: 'Dovşan kökü yeyib çox şad oldu!',
      },
    ],
  },

  // ── 23. Emosiyalar (Emotions) ───────────────────────────────────────
  {
    id: 'emotions',
    slug: 'emosiyalar',
    titleAz: 'Emosiyalar',
    titleEn: 'Emotions',
    titleRu: 'Эмоции',
    descriptionAz: 'Xoşbəxt, kədərli, təəccüblənmiş, əsəbi və sakit hissləri anlayaq.',
    emoji: '😊',
    group: 'social',
    minAge: 2,
    maxAge: 7,
    color: 'from-amber-400 to-orange-400',
    activities: [
      {
        id: 'emo-happy-1',
        title: 'Xoşbəxt üzü tap',
        instruction: 'Gülümsəyən və xoşbəxt olan dostumuzu seç.',
        type: 'select',
        question: 'Hansı üz xoşbəxtdir?',
        targetAudioText: 'Xoşbəxt olan simanı seç.',
        options: [
          { id: 'em1', text: 'Xoşbəxt', emoji: '😊', isCorrect: true },
          { id: 'em2', text: 'Kədərli', emoji: '😢', isCorrect: false },
          { id: 'em3', text: 'Əsəbi', emoji: '😠', isCorrect: false },
        ],
        explanation: 'Həmişə belə gülümsə və sevin!',
      },
      {
        id: 'emo-surprised-2',
        title: 'Təəccüblənmiş üz',
        instruction: 'Gözlənilməz hədiyyə görəndə necə təəccüblənirik?',
        type: 'select',
        question: 'Təəccüb emosiyası hansıdır?',
        targetAudioText: 'Təəccüblənmiş simanı tap.',
        options: [
          { id: 'em4', text: 'Yuxulu', emoji: '😴', isCorrect: false },
          { id: 'em5', text: 'Təəccüblənmiş', emoji: '😲', isCorrect: true },
        ],
        explanation: 'Vau! Necə də böyük sürprizdir!',
      },
    ],
  },

  // ── 24. Sosial davranış (Social Behavior) ───────────────────────────
  {
    id: 'social-skills',
    slug: 'sosial-davranis',
    titleAz: 'Sosial davranış',
    titleEn: 'Social Skills',
    titleRu: 'Социальное поведение',
    descriptionAz: 'Salamlaşmaq, təşəkkür etmək, xahiş etmək və üzr istəmək mədəniyyəti.',
    emoji: '🤝',
    group: 'social',
    minAge: 3,
    maxAge: 8,
    color: 'from-emerald-500 to-teal-500',
    activities: [
      {
        id: 'soc-thanks-1',
        title: 'Hədiyyə alanda nə deyirik?',
        instruction: 'Kimsə sənə oyuncaq verəndə nə deməlisən?',
        type: 'select',
        question: 'Kömək və hədiyyəyə görə nə deyirik?',
        targetAudioText: 'Çox sağ olun deyirik.',
        options: [
          { id: 'sc1', text: 'Çox sağ olun / Təşəkkür edirəm', emoji: '🙏', isCorrect: true },
          { id: 'sc2', text: 'Heç nə demirəm', emoji: '🤐', isCorrect: false },
        ],
        explanation: 'Təşəkkür etmək insanları çox sevindirir!',
      },
    ],
  },

  // ── 25. Növbə gözləmək (Turn Taking) ────────────────────────────────
  {
    id: 'turn-taking',
    slug: 'novbe-gozlemek',
    titleAz: 'Növbə gözləmək',
    titleEn: 'Turn Taking',
    titleRu: 'Очередь и Терпение',
    descriptionAz: 'Yelləncəkdə və oyunlarda növbəyə riayət etmək və dostunu gözləmək.',
    emoji: '⏳',
    group: 'social',
    minAge: 3,
    maxAge: 7,
    color: 'from-blue-500 to-indigo-500',
    activities: [
      {
        id: 'turn-swing-1',
        title: 'Yelləncək növbəsi',
        instruction: 'Dostun yellənir. Sən nə etməlisən?',
        type: 'select',
        question: 'Dostun yelləncəkdə olanda nə edirik?',
        targetAudioText: 'Səbirlə öz növbəmizi gözləyirik.',
        options: [
          { id: 'tt1', text: 'Səbirlə növbəmi gözləyirəm', emoji: '🧍', isCorrect: true },
          { id: 'tt2', text: 'Dostumu itələyirəm', emoji: '🙅', isCorrect: false },
        ],
        explanation: 'Afərin! Sən çox nəzakətli və səbirli uşaqsan!',
      },
    ],
  },

  // ── 26. Gündəlik rutinlər (Daily Routines) ──────────────────────────
  {
    id: 'daily-routines',
    slug: 'gundelik-rutinler',
    titleAz: 'Gündəlik rutinlər',
    titleEn: 'Daily Routines',
    titleRu: 'Ежедневные рутины',
    descriptionAz: 'Səhər oyanmaq, diş fırçalamaq, səhər yeməyi, gəzinti və yuxu rejimi.',
    emoji: '📅',
    group: 'social',
    minAge: 2,
    maxAge: 7,
    color: 'from-amber-500 to-yellow-500',
    activities: [
      {
        id: 'rtn-teeth-1',
        title: 'Gündəlik təmizlik',
        instruction: 'Səhər yuxudan oyananda dişlərimizi nə ilə fırçalayırıq?',
        type: 'select',
        question: 'Diş fırçası hansıdır?',
        targetAudioText: 'Diş fırçasını seç.',
        options: [
          { id: 'rt1', text: 'Diş fırçası', emoji: '🪥', isCorrect: true },
          { id: 'rt2', text: 'Qələm', emoji: '✏️', isCorrect: false },
        ],
        explanation: 'Dişlərimizi hər səhər və axşam fırçalayırıq!',
      },
    ],
  },

  // ── 27. Özünə qulluq (Self-Care) ────────────────────────────────────
  {
    id: 'self-care',
    slug: 'ozune-qulluq',
    titleAz: 'Özünə qulluq (Mən bacarıram)',
    titleEn: 'Self-Care',
    titleRu: 'Забота о себе',
    descriptionAz: 'Özün geyinmək, ayaqqabı geyinmək, oyuncaqları yığışdırmaq.',
    emoji: '🧼',
    group: 'social',
    minAge: 2,
    maxAge: 7,
    color: 'from-cyan-500 to-blue-400',
    activities: [
      {
        id: 'sc-toys-1',
        title: 'Oyuncaqları toplamaq',
        instruction: 'Oyundan sonra oyuncaqları hara qoyuruq?',
        type: 'select',
        question: 'Oyuncaqları hara yığırıq?',
        targetAudioText: 'Oyuncaq qutusunu seç.',
        options: [
          { id: 'to1', text: 'Oyuncaq qutusuna', emoji: '📦🧸', isCorrect: true },
          { id: 'to2', text: 'Yerdə saxlayırıq', emoji: '❌', isCorrect: false },
        ],
        explanation: 'Otağını səliqəli saxladığın üçün təşəkkür edirik!',
      },
    ],
  },

  // ── 28. Təhlükəsizlik (Safety) ──────────────────────────────────────
  {
    id: 'safety',
    slug: 'tehlukesizlik',
    titleAz: 'Təhlükəsizlik',
    titleEn: 'Safety',
    titleRu: 'Безопасность',
    descriptionAz: 'Yolu keçmə qaydaları, isti əşyalar və təhlükəsiz davranışlar.',
    emoji: '🛡️',
    group: 'social',
    minAge: 3,
    maxAge: 8,
    color: 'from-rose-500 to-red-500',
    activities: [
      {
        id: 'safe-traffic-1',
        title: 'Yolu təhlükəsiz keçmək',
        instruction: 'Piyada keçidində svetoforun hansı işığında yolu keçirik?',
        type: 'select',
        question: 'Svetofor hansı rəng olanda yolu keçə bilərik?',
        targetAudioText: 'Yaşıl işığı seç.',
        options: [
          { id: 'sf1', text: 'Yaşıl işıq', emoji: '🟢', isCorrect: true },
          { id: 'sf2', text: 'Qırmızı işıq', emoji: '🔴', isCorrect: false },
        ],
        explanation: 'Qırmızıda dayanırıq, yaşıl olanda böyüklə əl-ələ keçirik!',
      },
    ],
  },

  // ── 29. Diqqət və yaddaş (Attention & Memory) ────────────────────────
  {
    id: 'attention-memory',
    slug: 'diqqet-yaddas',
    titleAz: 'Diqqət və yaddaş',
    titleEn: 'Attention & Memory',
    titleRu: 'Внимание и Память',
    descriptionAz: 'Kart yaddaşı, fərqləri tapma və diqqət məşqləri.',
    emoji: '🧠',
    group: 'cognitive',
    minAge: 3,
    maxAge: 8,
    color: 'from-purple-600 to-indigo-500',
    activities: [
      {
        id: 'mem-match-1',
        title: 'Eyni şəkli tap',
        instruction: 'Sevimli dovşanın eynisi olan cütünü tap.',
        type: 'select',
        question: 'Dovşanla eyni olan fiquru seç:',
        targetAudioText: 'Eyni olan dovşanı seç.',
        options: [
          { id: 'mm1', text: 'Dovşan', emoji: '🐰', isCorrect: true },
          { id: 'mm2', text: 'Tülkü', emoji: '🦊', isCorrect: false },
        ],
        explanation: 'Bravo! Yaddaşın çox itidir!',
      },
    ],
  },

  // ── 30. Eşitmə diqqəti (Auditory Attention) ─────────────────────────
  {
    id: 'auditory-attention',
    slug: 'esitme-diqqeti',
    titleAz: 'Eşitmə diqqəti',
    titleEn: 'Auditory Attention',
    titleRu: 'Слуховое Внимание',
    descriptionAz: 'Səsləri dinləyib fərqləndirmək və eşidilən komandanı icra etmək.',
    emoji: '👂',
    group: 'cognitive',
    minAge: 3,
    maxAge: 8,
    color: 'from-teal-500 to-cyan-500',
    activities: [
      {
        id: 'aud-bell-1',
        title: 'Zəng səsi',
        instruction: '"Cing-cing" səs çıxaran zəngi seç.',
        type: 'select',
        question: 'Cingiltili səs çıxaran nədir?',
        targetAudioText: 'Zəngi tap.',
        options: [
          { id: 'au1', text: 'Zəng', emoji: '🔔', isCorrect: true },
          { id: 'au2', text: 'Top', emoji: '⚽', isCorrect: false },
        ],
        explanation: 'Qulaqların çox yaxşı eşidir!',
      },
    ],
  },

  // ── 31. İncə motorika (Fine Motor) ──────────────────────────────────
  {
    id: 'fine-motor',
    slug: 'ince-motorika',
    titleAz: 'İncə motorika',
    titleEn: 'Fine Motor Skills',
    titleRu: 'Мелкая Моторика',
    descriptionAz: 'Xətləri çəkmək, nöqtələri birləşdirmək və toxunma koordinasiyası.',
    emoji: '✏️',
    group: 'cognitive',
    minAge: 2,
    maxAge: 7,
    color: 'from-amber-600 to-rose-400',
    activities: [
      {
        id: 'mot-trace-1',
        title: 'Düz xətt üzrə toxun',
        instruction: 'Barmağınla ulduzdan aya doğru xətti izlə.',
        type: 'select',
        question: 'Ulduz hansı hədəfə gedir?',
        targetAudioText: 'Aya toxun.',
        options: [
          { id: 'mt1', text: 'Ay', emoji: '🌙', isCorrect: true },
          { id: 'mt2', text: 'Günəş', emoji: '☀️', isCorrect: false },
        ],
        explanation: 'Barmaqların çox çevik və bacarıqlıdır!',
      },
    ],
  },

  // ── 32. Hərəkətlər (Movements) ──────────────────────────────────────
  {
    id: 'movements',
    slug: 'hereketler',
    titleAz: 'Hərəkətlər',
    titleEn: 'Movements',
    titleRu: 'Движения',
    descriptionAz: 'Tullan, qaç, qollarını aç, başını tərpət və bədənini gücləndir.',
    emoji: '🏃',
    group: 'cognitive',
    minAge: 2,
    maxAge: 10,
    color: 'from-emerald-500 to-green-500',
    activities: [
      {
        id: 'mov-jump-1',
        title: '5 dəfə tullan!',
        instruction: 'Ayağa qalx və dovşan kimi 5 dəfə yuxarı tullan!',
        type: 'command',
        question: 'Gəl birlikdə tullanaq!',
        targetAudioText: 'Ayağa qalx və beş dəfə tullan!',
        options: [
          { id: 'mv1', text: 'Tullandım! 🐰', emoji: '🦘', isCorrect: true },
        ],
        explanation: 'Möhtəşəm enerji! Əzələlərin gücləndi!',
      },
    ],
  },

  // ── 33. Riyaziyyat (Math - Core) ────────────────────────────────────
  {
    id: 'math',
    slug: 'riyaziyyat',
    titleAz: 'Riyaziyyat',
    titleEn: 'Mathematics',
    titleRu: 'Математика',
    descriptionAz: 'Rəqəmlər, toplama, çıxma və əyləncəli sayma dərsləri.',
    emoji: '➕',
    group: 'existing',
    minAge: 3,
    maxAge: 10,
    color: 'from-pink-500 to-rose-400',
    activities: [
      {
        id: 'math-add-1',
        title: 'Sadə toplama',
        instruction: '1 alma + 1 alma neçə edir?',
        type: 'select',
        question: '1 + 1 = ?',
        targetAudioText: 'Bir üstəgəl bir neçə edir?',
        options: [
          { id: 'ma1', text: '2', emoji: '2️⃣', isCorrect: true },
          { id: 'ma2', text: '3', emoji: '3️⃣', isCorrect: false },
        ],
        explanation: 'Bəli, bir üstəgəl bir iki edir!',
      },
    ],
  },

  // ── 34. Məntiq (Logic - Core) ───────────────────────────────────────
  {
    id: 'logic',
    slug: 'mentiq',
    titleAz: 'Məntiq',
    titleEn: 'Logic',
    titleRu: 'Логика',
    descriptionAz: 'Fərqləri tapmaq, qanunauyğunluqlar və uşaq tapmacaları.',
    emoji: '💡',
    group: 'existing',
    minAge: 3,
    maxAge: 10,
    color: 'from-purple-500 to-indigo-500',
    activities: [
      {
        id: 'log-diff-1',
        title: 'Fərqli olanı seç',
        instruction: 'Meyvələrin arasındakı fərqli nəqliyyatı tap.',
        type: 'select',
        question: 'Hansı əşya digərlərindən fərqlidir?',
        targetAudioText: 'Fərqli olanı tap.',
        options: [
          { id: 'lg1', text: 'Maşın', emoji: '🚗', isCorrect: true },
          { id: 'lg2', text: 'Alma', emoji: '🍎', isCorrect: false },
          { id: 'lg3', text: 'Armud', emoji: '🍐', isCorrect: false },
        ],
        explanation: 'Düzdür! Maşın meyvə deyil, nəqliyyatdır.',
      },
    ],
  },

  // ── 35. Şahmat (Chess - Core) ───────────────────────────────────────
  {
    id: 'chess',
    slug: 'sahmat',
    titleAz: 'Şahmat',
    titleEn: 'Chess',
    titleRu: 'Шахматы',
    descriptionAz: 'Şahmat taxtası, fiqurlar (şah, vəzir, top, at, fil, piyada).',
    emoji: '♟️',
    group: 'existing',
    minAge: 4,
    maxAge: 12,
    color: 'from-slate-700 to-slate-900',
    activities: [
      {
        id: 'ch-king-1',
        title: 'Şahmatın ən vacib fiquru',
        instruction: 'Başında tac olan Şah fiqurunu seç.',
        type: 'select',
        question: 'Şah fiquru hansıdır?',
        targetAudioText: 'Şah fiqurunu seç.',
        options: [
          { id: 'ch1', text: 'Şah', emoji: '♚', isCorrect: true },
          { id: 'ch2', text: 'Piyada', emoji: '♟', isCorrect: false },
        ],
        explanation: 'Şah ən əsas fiqurdur və onu qorumaq lazımdır!',
      },
    ],
  },

  // ── 36. Hekayələr (Stories - Core) ──────────────────────────────────
  {
    id: 'stories',
    slug: 'hekayeler',
    titleAz: 'Hekayələr və Nağıllar',
    titleEn: 'Stories & Tales',
    titleRu: 'Сказки и Истории',
    descriptionAz: 'Gündüz və gecə üçün maraqlı tərbiyəvi və səsli nağıllar.',
    emoji: '📜',
    group: 'existing',
    minAge: 3,
    maxAge: 12,
    color: 'from-amber-500 to-orange-500',
    activities: [
      {
        id: 'sto-intro-1',
        title: 'Nağıllar dünyasına səyahət',
        instruction: 'Sevimli nağılı dinləmək üçün daxil ol.',
        type: 'select',
        question: 'Nağıl dinləməyə hazırsan?',
        targetAudioText: 'Nağıl dinləməyə hazırsan?',
        options: [
          { id: 'st1', text: 'Bəli, hazıram! 📖', emoji: '📖', isCorrect: true },
        ],
        explanation: 'Xoş dinləmələr!',
      },
    ],
  },

  // ── 37. Öyrədici videolar (Videos - Core) ───────────────────────────
  {
    id: 'videos',
    slug: 'videolar',
    titleAz: 'Öyrədici videolar',
    titleEn: 'Educational Videos',
    titleRu: 'Обучающие видео',
    descriptionAz: 'Nitq inkişafı, gimnastika və musiqili maarifləndirici videolar.',
    emoji: '🎬',
    group: 'existing',
    minAge: 2,
    maxAge: 12,
    color: 'from-sky-500 to-cyan-400',
    activities: [
      {
        id: 'vid-intro-1',
        title: 'Video dərslər',
        instruction: 'Öyrədici videonu izlə və hərəkətləri təkrar et.',
        type: 'select',
        question: 'Video dərsə başlamaq istəyirsən?',
        targetAudioText: 'Videonu başla.',
        options: [
          { id: 'vd1', text: 'İzlə 🎬', emoji: '🎬', isCorrect: true },
        ],
        explanation: 'Baxaq və birlikdə öyrənək!',
      },
    ],
  },
];
