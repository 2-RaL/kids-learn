export interface DailyPlanItem {
  id: string;
  durationMinutes: number;
  titleAz: string;
  category: string;
  emoji: string;
  targetModuleId: string;
  shortDescAz: string;
  isCompleted?: boolean;
}

export interface OfflineParentActivity {
  id: string;
  titleAz: string;
  instructionAz: string;
  benefitAz: string;
  ageGroup: string;
  category: 'home' | 'sensory' | 'movement' | 'speech' | 'social';
  emoji: string;
  suggestedDuration: string;
}

export interface ConversationPrompt {
  id: string;
  titleAz: string;
  scenarioDescAz: string;
  imageEmoji: string;
  minAge: number;
  maxAge: number;
  questions: Array<{
    id: string;
    textAz: string;
    type: 'identify' | 'action' | 'color' | 'location' | 'prediction' | 'reflection';
  }>;
  parentTipsAz: string;
}

// ── 15-Minute Daily Plan Generator Data ──────────────────────────────
export const DEFAULT_DAILY_PLAN: DailyPlanItem[] = [
  {
    id: 'dp-1',
    durationMinutes: 3,
    titleAz: 'Rəng Oyunu',
    category: 'Rənglər',
    emoji: '🎨',
    targetModuleId: 'colors',
    shortDescAz: 'Qırmızı, mavi və yaşıl rəngləri ayırd etməyi məşq edin.',
  },
  {
    id: 'dp-2',
    durationMinutes: 3,
    titleAz: 'Danışıq Məşqi',
    category: 'Nitq və Səslər',
    emoji: '🗣️',
    targetModuleId: 'sounds',
    shortDescAz: 'Aydın tələffüz və "R", "S" səsləri ilə təkrar məşqi.',
  },
  {
    id: 'dp-3',
    durationMinutes: 3,
    titleAz: 'Hərəkət Oyunu',
    category: 'Fiziki Aktivlik',
    emoji: '🏃',
    targetModuleId: 'movements',
    shortDescAz: 'Tullanmaq, qaçmaq və bədən koordinasiyası.',
  },
  {
    id: 'dp-4',
    durationMinutes: 3,
    titleAz: 'Məntiq Tapmacası',
    category: 'Məntiq',
    emoji: '💡',
    targetModuleId: 'logic',
    shortDescAz: 'Fərqləri tapmaq və obrazlı düşünmə qabiliyyəti.',
  },
  {
    id: 'dp-5',
    durationMinutes: 3,
    titleAz: 'Qısa Nağıl',
    category: 'Hekayələr',
    emoji: '📖',
    targetModuleId: 'stories',
    shortDescAz: 'Yuxu və ya günorta üçün maraqlı, öyrədici nağıl.',
  },
];

// ── Offline Parent-Child Activities ("Uşağımla Oynayıram") ───────────
export const OFFLINE_ACTIVITIES: OfflineParentActivity[] = [
  {
    id: 'off-1',
    titleAz: 'Evdə 3 qırmızı əşya tap',
    instructionAz: 'Övladınızla birlikdə otağı gəzin və 3 ədəd qırmızı əşyanı (məsələn, qələm, oyuncaq, fincan) tapıb masaya qoyun.',
    benefitAz: 'Rəng fərqləndirmə və məkan diqqətini artırır.',
    ageGroup: '2-4 yaş',
    category: 'home',
    emoji: '🔴',
    suggestedDuration: '5 dəqiqə',
  },
  {
    id: 'off-2',
    titleAz: 'Mətbəxdən bir qaşıq gətir',
    instructionAz: 'Uşağa aydın və mehriban şəkildə tapşırıq verin: "Mətbəxə get və oradakı qaşığı mənə gətir".',
    benefitAz: 'Eşitdiyini anlama və iki mərhələli komandaları icra bacarığı.',
    ageGroup: '3-5 yaş',
    category: 'home',
    emoji: '🥄',
    suggestedDuration: '3 dəqiqə',
  },
  {
    id: 'off-3',
    titleAz: 'Oyuncağı stulun üstünə qoy',
    instructionAz: 'Sevimli oyuncağını əvvəlcə stulun üstünə, sonra stulun altına, daha sonra isə stulun yanına qoymasını xahiş edin.',
    benefitAz: 'Məkan anlayışlarının (üstündə, altında, yanında) real mühitdə mənimsənilməsi.',
    ageGroup: '3-6 yaş',
    category: 'spatial' as any,
    emoji: '🪑',
    suggestedDuration: '5 dəqiqə',
  },
  {
    id: 'off-4',
    titleAz: 'Mavi əşyanı tap',
    instructionAz: 'Otaqda gizlənmiş mavi corab, mavi top və ya mavi dəftəri birlikdə axtarın.',
    benefitAz: 'Göz-əl koordinasiyası və rəng tanıma.',
    ageGroup: '2-5 yaş',
    category: 'home',
    emoji: '🔵',
    suggestedDuration: '4 dəqiqə',
  },
  {
    id: 'off-5',
    titleAz: 'Anana və ya atana sarıl',
    instructionAz: 'Uşağınıza möhkəm sarılın, ona necə dəyərli olduğunu deyin və ürək döyüntüsünü dinləyin.',
    benefitAz: 'Emosional güvən, sevgi və təhlükəsizlik hissi formalaşdırır.',
    ageGroup: 'Bütün yaşlar',
    category: 'social',
    emoji: '🫂',
    suggestedDuration: '2 dəqiqə',
  },
  {
    id: 'off-6',
    titleAz: 'Pəncərədən nə gördüyünü danış',
    instructionAz: 'Pəncərənin qarşısında dayanın. Uşaqdan çöldə gördüyü maşınları, ağacları, quşları və havanın necə olduğunu təsvir etməsini istəyin.',
    benefitAz: 'Söz ehtiyatını zənginləşdirir və tam cümlələrlə danışmağı təşviq edir.',
    ageGroup: '4-7 yaş',
    category: 'speech',
    emoji: '🪟',
    suggestedDuration: '6 dəqiqə',
  },
  {
    id: 'off-7',
    titleAz: 'Evimizdə dairə formasında nə var?',
    instructionAz: 'Boşqab, saat, qapaq və ya stəkanın altı kimi dairəvi əşyaları uşaqla barmaqla göstərin və çevrəsini çəkin.',
    benefitAz: 'Həndəsi fiqurların ətraf mühitlə əlaqələndirilməsi.',
    ageGroup: '3-6 yaş',
    category: 'home',
    emoji: '⭕',
    suggestedDuration: '5 dəqiqə',
  },
  {
    id: 'off-8',
    titleAz: '5 dəfə tullan!',
    instructionAz: 'Birlikdə sayaraq "1, 2, 3, 4, 5!" deyib yuxarı tullanın, sonra qollarınızı geniş açıb quş kimi süzün.',
    benefitAz: 'İri motorika, bədən ritmi və sayma bacarığı.',
    ageGroup: '2-6 yaş',
    category: 'movement',
    emoji: '🦘',
    suggestedDuration: '3 dəqiqə',
  },
];

// ── Conversation Prompts ("Danışaq" Şəkilli Dialoqlar) ───────────────
export const CONVERSATION_PROMPTS: ConversationPrompt[] = [
  {
    id: 'cp-dog-park',
    titleAz: 'Parkda sevimli it və top',
    scenarioDescAz: 'Yaşıl otluqda oynayan şən it və onun qırmızı parlaq topu.',
    imageEmoji: '🐕 ⚽ 🌳',
    minAge: 2,
    maxAge: 6,
    parentTipsAz: 'Uşağa cavab vermək üçün vaxt verin, cavabını təkrarlayıb cümləni bir az da genişləndirin.',
    questions: [
      { id: 'q1', textAz: 'Bu şəkildə hansı heyvan var?', type: 'identify' },
      { id: 'q2', textAz: 'İt nə edir?', type: 'action' },
      { id: 'q3', textAz: 'Top hansı rəngdədir?', type: 'color' },
      { id: 'q4', textAz: 'İt indi haradadır?', type: 'location' },
      { id: 'q5', textAz: 'Səncə sonra nə olacaq? İt topu kimə aparacaq?', type: 'prediction' },
    ],
  },
  {
    id: 'cp-family-dinner',
    titleAz: 'Ailə şam yeməyi',
    scenarioDescAz: 'Ailə üzvləri böyük masanın ətrafında oturub ləzzətli yemək yeyirlər.',
    imageEmoji: '👨‍👩‍👧‍👦 🍲 🥖 🥛',
    minAge: 3,
    maxAge: 7,
    parentTipsAz: 'Uşağın ailə üzvlərini adlandırmasına və masa arxası mədəniyyət haqqında fikrini bölüşməsinə imkan verin.',
    questions: [
      { id: 'q1', textAz: 'Masa arxasında kimlər əyləşib?', type: 'identify' },
      { id: 'q2', textAz: 'Masanın üstündə hansı yeməklər var?', type: 'action' },
      { id: 'q3', textAz: 'Sən ən çox hansı yeməyi xoşlayırsan?', type: 'reflection' },
      { id: 'q4', textAz: 'Yeməkdən sonra valideynlərə nə deyirik?', type: 'reflection' },
    ],
  },
  {
    id: 'cp-zoo-visit',
    titleAz: 'Zooparka səyahət',
    scenarioDescAz: 'Böyük fil, hündür zürafə və sevimli meymunların bağçası.',
    imageEmoji: '🐘 🦒 🐒 🌴',
    minAge: 4,
    maxAge: 8,
    parentTipsAz: 'Hündürlük, ölçü və heyvanların səslərini təqlid etməklə dialoqu canlı edin.',
    questions: [
      { id: 'q1', textAz: 'Hansı heyvanın boynu ən uzundur?', type: 'identify' },
      { id: 'q2', textAz: 'Filin xortumu nə boydadır?', type: 'color' },
      { id: 'q3', textAz: 'Meymun ağacda nə yeyir?', type: 'action' },
      { id: 'q4', textAz: 'Zooparkda ən çox hansı heyvanı görmək istərdin?', type: 'reflection' },
    ],
  },
];
