export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  gender: 'boy' | 'girl';
  preferredLanguage: 'az' | 'en' | 'ru';
  parentName: string;
  parentPhone: string;
  assignedTherapist: string;
  learningLevel: 'Başlanğıc' | 'Orta' | 'Yüksək';
  avatarEmoji: string;
  enrolledDate: string;
  completedActivitiesCount: number;
  activeGoalsCount: number;
}

export interface AssessmentArea {
  id: string;
  nameAz: string;
  descriptionAz: string;
  category: 'language' | 'speech' | 'cognitive' | 'social';
  rating: number; // 1 to 5 scale
  maxRating: number;
  notes: string;
  lastUpdated: string;
}

export interface TherapyGoal {
  id: string;
  childId: string;
  titleAz: string;
  descriptionAz: string;
  category: string;
  targetPercent: number;
  currentPercent: number;
  status: 'active' | 'completed' | 'paused';
  notes: string;
  createdAt: string;
  targetDate: string;
}

export interface HomeworkAssignment {
  id: string;
  childId: string;
  activityId: string;
  activityTitle: string;
  category: string;
  instructions: string;
  assignedDate: string;
  dueDate: string;
  targetSkill: string;
  parentNote?: string;
  status: 'assigned' | 'opened' | 'completed';
  score?: number;
  attemptsCount?: number;
  completedDate?: string;
}

export interface SessionNote {
  id: string;
  childId: string;
  date: string;
  activityPerformed: string;
  observations: string;
  progress: string;
  difficulties: string;
  nextSessionPlan: string;
  therapistName: string;
}

// ── Default Sample Children ──────────────────────────────────────────
export const DEFAULT_CHILDREN: ChildProfile[] = [
  {
    id: 'ch-1',
    name: 'Əli Məmmədov',
    age: 5,
    gender: 'boy',
    preferredLanguage: 'az',
    parentName: 'Leyla Məmmədova',
    parentPhone: '+994 50 123 45 67',
    assignedTherapist: 'Demo Loqoped',
    learningLevel: 'Orta',
    avatarEmoji: '👦',
    enrolledDate: '2026-02-15',
    completedActivitiesCount: 28,
    activeGoalsCount: 3,
  },
  {
    id: 'ch-2',
    name: 'Zəhra Əliyeva',
    age: 4,
    gender: 'girl',
    preferredLanguage: 'az',
    parentName: 'Aytən Əliyeva',
    parentPhone: '+994 55 987 65 43',
    assignedTherapist: 'Demo Loqoped',
    learningLevel: 'Başlanğıc',
    avatarEmoji: '👧',
    enrolledDate: '2026-03-01',
    completedActivitiesCount: 16,
    activeGoalsCount: 2,
  },
  {
    id: 'ch-3',
    name: 'Murad Qasımov',
    age: 6,
    gender: 'boy',
    preferredLanguage: 'az',
    parentName: 'Rəşad Qasımov',
    parentPhone: '+994 70 555 44 33',
    assignedTherapist: 'Demo Loqoped',
    learningLevel: 'Yüksək',
    avatarEmoji: '👦',
    enrolledDate: '2026-01-20',
    completedActivitiesCount: 42,
    activeGoalsCount: 4,
  },
];

// ── 10 Clinical Assessment Categories ────────────────────────────────
export const DEFAULT_ASSESSMENT_TEMPLATE: AssessmentArea[] = [
  {
    id: 'receptive',
    nameAz: 'Reseptiv Dil (Anlama)',
    descriptionAz: 'Şifahi müraciəti, sadə və mürəkkəb təlimatları eşidib qavrama bacarığı.',
    category: 'language',
    rating: 4,
    maxRating: 5,
    notes: 'İki mərhələli komandaları yaxşı anlayır və icra edir.',
    lastUpdated: '2026-09-28',
  },
  {
    id: 'expressive',
    nameAz: 'Ekspressiv Dil (Danışıq)',
    descriptionAz: 'Fikrini söz və cümlələrlə sərbəst ifadə etmə səviyyəsi.',
    category: 'language',
    rating: 3,
    maxRating: 5,
    notes: '3-4 sözdən ibarət cümlələr qurur, bağlayıcıları inkişaf etdirmək lazımdır.',
    lastUpdated: '2026-09-28',
  },
  {
    id: 'articulation',
    nameAz: 'Artikulyasiya / Tələffüz',
    descriptionAz: 'Səslərin aydın və düzgün çıxarılması (R, S, L, Ş).',
    category: 'speech',
    rating: 3,
    maxRating: 5,
    notes: '"R" səsi sözün ortasında vibrasiya ilə tələffüz olunur.',
    lastUpdated: '2026-09-25',
  },
  {
    id: 'vocabulary',
    nameAz: 'Söz Ehtiyatı',
    descriptionAz: 'Aktiv və passiv lüğət fondu (əşyalar, fellər, sifətlər).',
    category: 'language',
    rating: 4,
    maxRating: 5,
    notes: 'Əsas meyvə, nəqliyyat və heyvan adlarını tam bilir.',
    lastUpdated: '2026-09-26',
  },
  {
    id: 'sentence',
    nameAz: 'Cümlə Quruluşu',
    descriptionAz: 'Qrammatik düzgünlük, söz sırası və şəkilçilərin istifadəsi.',
    category: 'language',
    rating: 3,
    maxRating: 5,
    notes: 'Mübtəda və xəbər uyğunluğu yaxşıdır, hal şəkilçiləri üzərində iş gedir.',
    lastUpdated: '2026-09-24',
  },
  {
    id: 'qa-skill',
    nameAz: 'Sual-Cavab Bacarığı',
    descriptionAz: 'Kim? Nə? Harada? Nə vaxt? Niyə? suallarına adekvat cavab vermə.',
    category: 'language',
    rating: 4,
    maxRating: 5,
    notes: '"Niyə?" və səbəb-nəticə suallarında düşünmə vaxtı tələb olunur.',
    lastUpdated: '2026-09-20',
  },
  {
    id: 'sequencing',
    nameAz: 'Hadisə Ardıcıllığı',
    descriptionAz: 'Hadisələrin məntiqi ardıcıllığını şəkillər üzrə düzmə və izah etmə.',
    category: 'cognitive',
    rating: 4,
    maxRating: 5,
    notes: '3 kartlıq ardıcıllığı sərbəst qurur.',
    lastUpdated: '2026-09-22',
  },
  {
    id: 'social',
    nameAz: 'Sosial Ünsiyyət',
    descriptionAz: 'Göz təması, salamlaşma, növbə gözləmə və emosiya ifadəsi.',
    category: 'social',
    rating: 5,
    maxRating: 5,
    notes: 'Çox mehribandır, qaydalara və növbəyə həvəslə riayət edir.',
    lastUpdated: '2026-09-28',
  },
  {
    id: 'attention',
    nameAz: 'Diqqət və Yaddaş',
    descriptionAz: 'Vizual və eşitmə diqqətinin davamlılığı, tapşırıqda qalma müddəti.',
    category: 'cognitive',
    rating: 4,
    maxRating: 5,
    notes: '12-15 dəqiqə fasiləsiz olaraq tapşırığa fokuslana bilir.',
    lastUpdated: '2026-09-27',
  },
  {
    id: 'auditory',
    nameAz: 'Eşitmə Diqqəti',
    descriptionAz: 'Oxşar səsləri ayırd etmə, səs tonunu və ritmi təkrarlama.',
    category: 'speech',
    rating: 3,
    maxRating: 5,
    notes: 'Arxa fon səsi olanda təlimatı daha aydın təkrar etmək lazımdır.',
    lastUpdated: '2026-09-25',
  },
];

// ── Default Therapy Goals Sample ─────────────────────────────────────
export const DEFAULT_GOALS: TherapyGoal[] = [
  {
    id: 'g-1',
    childId: 'ch-1',
    titleAz: '"R" səsini söz və cümlələrdə düzgün tələffüz etmək',
    descriptionAz: 'Söz başında və ortasında vibrasiyanı sabitləşdirmək.',
    category: 'Artikulyasiya',
    targetPercent: 100,
    currentPercent: 70,
    status: 'active',
    notes: 'Söz səviyyəsində 70%, cümlə səviyyəsində 45% nailiyyət var.',
    createdAt: '2026-09-10',
    targetDate: '2026-10-30',
  },
  {
    id: 'g-2',
    childId: 'ch-1',
    titleAz: 'Məkan anlayışlarını nitqdə sərbəst istifadə etmək',
    descriptionAz: 'Üstündə, altında, içində, yanında, qarşısında felləri ilə cümlə qurmaq.',
    category: 'Nitq və Qavrama',
    targetPercent: 100,
    currentPercent: 85,
    status: 'active',
    notes: 'Şəkillər üzərində çox uğurludur, evdə təkrarlanır.',
    createdAt: '2026-09-15',
    targetDate: '2026-10-15',
  },
  {
    id: 'g-3',
    childId: 'ch-1',
    titleAz: 'İki mərhələli komandaları fasiləsiz icra etmək',
    descriptionAz: 'Verilən iki tapşırığı ardıcıl yadda saxlayıb yerinə yetirmək.',
    category: 'Koqnitiv',
    targetPercent: 100,
    currentPercent: 90,
    status: 'active',
    notes: 'Nəticə çox yaxşıdır.',
    createdAt: '2026-09-01',
    targetDate: '2026-10-10',
  },
];

// ── Default Assigned Homework Sample ─────────────────────────────────
export const DEFAULT_HOMEWORK: HomeworkAssignment[] = [
  {
    id: 'hw-1',
    childId: 'ch-1',
    activityId: 'colors',
    activityTitle: 'Rənglər və Fərqləndirmə Məşqi',
    category: 'Rənglər',
    instructions: 'Gündə 5 dəqiqə qırmızı, sarı və mavi rəngli əşyaları tapıb adlandırmaq.',
    assignedDate: '2026-09-28',
    dueDate: '2026-10-05',
    targetSkill: 'Rəng tanıma və lüğət fondu',
    parentNote: 'Zəhmət olmasa evdə oyuncaqlarla birgə tətbiq edin.',
    status: 'completed',
    score: 95,
    attemptsCount: 2,
    completedDate: '2026-09-30',
  },
  {
    id: 'hw-2',
    childId: 'ch-1',
    activityId: 'sounds',
    activityTitle: '"R" Səsi ilə Şən Tələffüz Məşqi',
    category: 'Səslər',
    instructions: 'Raket, Rəng, Radio sözlərini güzgü qarşısında təkrar edin.',
    assignedDate: '2026-09-30',
    dueDate: '2026-10-07',
    targetSkill: 'Artikulyasiya aparatı gimnastikası',
    parentNote: 'Gündə 3 dəfə 2 dəqiqə bəs edir.',
    status: 'opened',
    score: 0,
    attemptsCount: 1,
  },
];

// ── Default Session Notes Sample ─────────────────────────────────────
export const DEFAULT_SESSION_NOTES: SessionNote[] = [
  {
    id: 'sn-1',
    childId: 'ch-1',
    date: '2026-09-28',
    activityPerformed: 'Artikulyasiya gimnastikası və "R" səsi kartları',
    observations: 'Uşaq seansa çox pozitiv və həvəsli başladı. Dil ucu vibrasiyası xeyli yaxşılaşıb.',
    progress: 'Tək sözlərdə "R" səsini 8 dəfədən 6-da sərbəst çıxardı.',
    difficulties: 'Cümlə içində bəzən "L" səsi ilə əvəzləmə meyli var.',
    nextSessionPlan: 'Cümlə daxilində "R" səsini avtomatlaşdırmaq və nağıl üzərində iş.',
    therapistName: 'Demo Loqoped',
  },
  {
    id: 'sn-2',
    childId: 'ch-1',
    date: '2026-09-24',
    activityPerformed: 'Məkan anlayışları və iki mərhələli komandalar',
    observations: 'Fiziki oyuncaqlarla komandaları həvəslə yerinə yetirdi.',
    progress: 'Üstündə və altında fərqini 100% mənimsədi.',
    difficulties: '"Qarşısında" və "arxasında" təlimatlarında kiçik tərəddüd oldu.',
    nextSessionPlan: 'Güzgü qarşısında bədən oriyentasiyası.',
    therapistName: 'Demo Loqoped',
  },
];
