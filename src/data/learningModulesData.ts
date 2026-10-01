export interface VisualScene {
  type: 'spatial' | 'math' | 'concept' | 'count' | 'tracing' | 'comparison' | 'traffic';
  containerEmoji?: string;
  itemEmoji?: string;
  position?: 'on' | 'under' | 'in' | 'beside';
  startEmoji?: string;
  targetEmoji?: string;
  pathType?: 'straight' | 'zigzag' | 'wave' | 'loop';
  leftItem?: {
    emoji: string;
    labelAz: string;
    labelEn?: string;
    labelRu?: string;
    size?: 'huge' | 'large' | 'medium' | 'small' | 'tiny';
  };
  rightItem?: {
    emoji: string;
    labelAz: string;
    labelEn?: string;
    labelRu?: string;
    size?: 'huge' | 'large' | 'medium' | 'small' | 'tiny';
  };
  activeLight?: 'red' | 'yellow' | 'green';
  mathFormula?: {
    leftCount: number;
    leftEmoji: string;
    operator: '+' | '-';
    rightCount: number;
    rightEmoji: string;
    resultCount?: number;
    resultEmoji?: string;
  };
  customEmojis?: string[];
  captionAz?: string;
  captionEn?: string;
  captionRu?: string;
}

export interface LearningLesson {
  id: string;
  conceptTitleAz: string;
  conceptTitleEn?: string;
  conceptTitleRu?: string;
  explanationAz: string;
  explanationEn?: string;
  explanationRu?: string;
  bigEmojis: string[];
  visualScene?: VisualScene;
  audioTextAz?: string;
  audioTextEn?: string;
  audioTextRu?: string;
}

export interface LearningActivityItem {
  id: string;
  title: string;
  titleEn?: string;
  titleRu?: string;
  lesson?: LearningLesson;
  visualScene?: VisualScene;
  instruction: string;
  instructionEn?: string;
  instructionRu?: string;
  type: 'select' | 'match' | 'sequence' | 'sentence' | 'command' | 'audio-identify' | 'tracing' | 'flashcard';
  question?: string;
  questionEn?: string;
  questionRu?: string;
  targetAudioText?: string;
  targetAudioTextEn?: string;
  targetAudioTextRu?: string;
  options?: Array<{
    id: string;
    text: string;
    textEn?: string;
    textRu?: string;
    emoji?: string;
    isCorrect?: boolean;
    soundUrl?: string;
  }>;
  sequenceSteps?: Array<{
    id: string;
    text: string;
    textEn?: string;
    textRu?: string;
    order: number;
    emoji: string;
  }>;
  sentenceWords?: string[];
  sentenceWordsEn?: string[];
  sentenceWordsRu?: string[];
  correctSentence?: string;
  correctSentenceEn?: string;
  correctSentenceRu?: string;
  explanation?: string;
  explanationEn?: string;
  explanationRu?: string;
}

export interface LearningModuleCategory {
  id: string;
  slug: string;
  titleAz: string;
  titleEn: string;
  titleRu: string;
  descriptionAz: string;
  emoji: string;
  group: 'foundations' | 'commands' | 'speech' | 'social' | 'cognitive';
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
] as const;

export const LEARNING_MODULES: LearningModuleCategory[] = [
  {
    "id": "colors",
    "slug": "rengler",
    "titleAz": "Rənglər",
    "titleEn": "Colors",
    "titleRu": "Цвета",
    "descriptionAz": "Qırmızı, mavi, sarı, yaşıl və digər rəngləri tanıyaq və seçək.",
    "emoji": "🎨",
    "group": "foundations",
    "minAge": 2,
    "maxAge": 6,
    "color": "from-rose-500 to-red-400",
    "activities": [
      {
        "id": "color-red-1",
        "title": "Qırmızı Alma",
        "titleEn": "Red Apple",
        "titleRu": "Красное яблоко",
        "lesson": {
          "id": "color-lesson-red",
          "conceptTitleAz": "Qırmızı Rəngi Öyrənək!",
          "conceptTitleEn": "Let's Learn the Color Red!",
          "conceptTitleRu": "Учим Красный Цвет!",
          "explanationAz": "Qırmızı rəng çox parlaq və gözəldir! Alma, çiyələk və yanğınsöndürən maşını qırmızı rəngdə olur.",
          "explanationEn": "Red is a bright and beautiful color! Apples, strawberries, and fire trucks are red.",
          "explanationRu": "Красный цвет очень яркий и красивый! Яблоко, клубника и пожарная машина — красные.",
          "bigEmojis": [
            "🔴",
            "🍎",
            "🍓",
            "🚗"
          ],
          "audioTextAz": "Qırmızı rəng çox parlaq və gözəldir! Alma, çiyələk və maşın qırmızıdır.",
          "audioTextEn": "Red is bright and beautiful! Apples, strawberries, and cars are red.",
          "audioTextRu": "Красный цвет яркий и красивый! Яблоко, клубника и машина — красные."
        },
        "instruction": "Qırmızı olan almanı seç.",
        "instructionEn": "Select the red apple.",
        "instructionRu": "Выбери красное яблоко.",
        "type": "select",
        "question": "Hansı alma qırmızı rəngdədir?",
        "questionEn": "Which apple is red?",
        "questionRu": "Какое яблоко красного цвета?",
        "targetAudioText": "Qırmızı olan almanı seç.",
        "targetAudioTextEn": "Select the red apple.",
        "targetAudioTextRu": "Выбери красное яблоко.",
        "options": [
          {
            "id": "c1",
            "text": "Qırmızı Alma",
            "textEn": "Red Apple",
            "textRu": "Красное яблоко",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "c2",
            "text": "Yaşıl Alma",
            "textEn": "Green Apple",
            "textRu": "Зеленое яблоко",
            "emoji": "🍏",
            "isCorrect": false
          },
          {
            "id": "c3",
            "text": "Sarı Banan",
            "textEn": "Yellow Banana",
            "textRu": "Желтый банан",
            "emoji": "🍌",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Qırmızı alma məhz budur! 🍎",
        "explanationEn": "Well done! That is the red apple! 🍎",
        "explanationRu": "Молодец! Это красное яблоко! 🍎"
      },
      {
        "id": "color-red-2",
        "title": "Qırmızı Çiyələk",
        "titleEn": "Red Strawberry",
        "titleRu": "Красная клубника",
        "instruction": "Qırmızı rəngli çiyələyi tap.",
        "instructionEn": "Find the red strawberry.",
        "instructionRu": "Найди красную клубнику.",
        "type": "select",
        "question": "Hansı ləzzətli giləmeyvə qırmızıdır?",
        "questionEn": "Which delicious berry is red?",
        "questionRu": "Какая вкусная ягода красная?",
        "targetAudioText": "Qırmızı çiyələyi seç.",
        "targetAudioTextEn": "Select the red strawberry.",
        "targetAudioTextRu": "Выбери красную клубнику.",
        "options": [
          {
            "id": "c1_2",
            "text": "Qırmızı Çiyələk",
            "textEn": "Red Strawberry",
            "textRu": "Красная клубника",
            "emoji": "🍓",
            "isCorrect": true
          },
          {
            "id": "c1_3",
            "text": "Mavi Qaragilə",
            "textEn": "Blue Blueberry",
            "textRu": "Синяя черника",
            "emoji": "🫐",
            "isCorrect": false
          },
          {
            "id": "c1_4",
            "text": "Bənövşəyi Üzüm",
            "textEn": "Purple Grape",
            "textRu": "Фиолетовый виноград",
            "emoji": "🍇",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Çiyələk şirin və qırmızıdır! 🍓",
        "explanationEn": "Great! Strawberries are sweet and red! 🍓",
        "explanationRu": "Отлично! Клубника сладкая и красная! 🍓"
      },
      {
        "id": "color-red-3",
        "title": "Qırmızı Avtomobil",
        "titleEn": "Red Car",
        "titleRu": "Красная машина",
        "instruction": "Qırmızı rəngli maşını göstər.",
        "instructionEn": "Point to the red car.",
        "instructionRu": "Покажи красную машину.",
        "type": "select",
        "question": "Hansı avtomobil qırmızı rəngdədir?",
        "questionEn": "Which car is red?",
        "questionRu": "Какая машина красного цвета?",
        "targetAudioText": "Qırmızı maşını seç.",
        "targetAudioTextEn": "Select the red car.",
        "targetAudioTextRu": "Выбери красную машину.",
        "options": [
          {
            "id": "c1_5",
            "text": "Qırmızı Maşın",
            "textEn": "Red Car",
            "textRu": "Красная машина",
            "emoji": "🚗",
            "isCorrect": true
          },
          {
            "id": "c1_6",
            "text": "Mavi Maşın",
            "textEn": "Blue Car",
            "textRu": "Синяя машина",
            "emoji": "🚙",
            "isCorrect": false
          },
          {
            "id": "c1_7",
            "text": "Sarı Taksi",
            "textEn": "Yellow Taxi",
            "textRu": "Желтое такси",
            "emoji": "🚕",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Qırmızı maşın sürətlə gedir! 🚗",
        "explanationEn": "Super! The red car zooms ahead! 🚗",
        "explanationRu": "Супер! Красная машина едет быстро! 🚗"
      },
      {
        "id": "color-blue-1",
        "title": "Mavi Top",
        "titleEn": "Blue Ball",
        "titleRu": "Синий мяч",
        "lesson": {
          "id": "color-lesson-blue",
          "conceptTitleAz": "Mavi Rəngi Öyrənək!",
          "conceptTitleEn": "Let's Learn the Color Blue!",
          "conceptTitleRu": "Учим Синий Цвет!",
          "explanationAz": "Mavi rəng dəniz və səmanın rəngidir! Mavi top, dəniz dalğaları və dadlı qaragilə mavidir.",
          "explanationEn": "Blue is the color of the sea and the sky! Blue balls, ocean waves, and blueberries are blue.",
          "explanationRu": "Синий цвет — это цвет моря и неба! Синий мяч, морские волны и черника — синие.",
          "bigEmojis": [
            "🔵",
            "🌊",
            "🚙",
            "🫐"
          ],
          "audioTextAz": "Mavi rəng dəniz və səmanın rəngidir! Dəniz və mavi top mavidir.",
          "audioTextEn": "Blue is the color of sea and sky! Oceans and blue balls are blue.",
          "audioTextRu": "Синий цвет — это цвет моря и неба! Море и синий мяч — синие."
        },
        "instruction": "Mavi rəngli topu göstər.",
        "instructionEn": "Find the blue ball.",
        "instructionRu": "Найди синий мяч.",
        "type": "select",
        "question": "Mavi top hansıdır?",
        "questionEn": "Which one is the blue ball?",
        "questionRu": "Какой мяч синий?",
        "targetAudioText": "Mavi rəngli topu tap.",
        "targetAudioTextEn": "Find the blue ball.",
        "targetAudioTextRu": "Найди синий мяч.",
        "options": [
          {
            "id": "c2_1",
            "text": "Mavi Top",
            "textEn": "Blue Ball",
            "textRu": "Синий мяч",
            "emoji": "🔵",
            "isCorrect": true
          },
          {
            "id": "c2_2",
            "text": "Sarı Top",
            "textEn": "Yellow Ball",
            "textRu": "Желтый мяч",
            "emoji": "🟡",
            "isCorrect": false
          },
          {
            "id": "c2_3",
            "text": "Qara Top",
            "textEn": "Black Ball",
            "textRu": "Черный мяч",
            "emoji": "⚫",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Mavi topu tapdın! 🔵",
        "explanationEn": "Great! You found the blue ball! 🔵",
        "explanationRu": "Отлично! Ты нашел синий мяч! 🔵"
      },
      {
        "id": "color-blue-2",
        "title": "Mavi Quş",
        "titleEn": "Blue Bird",
        "titleRu": "Синяя птица",
        "instruction": "Göydə uçan mavi quşu seç.",
        "instructionEn": "Select the blue bird flying in the sky.",
        "instructionRu": "Выбери синюю птичку, летящую в небе.",
        "type": "select",
        "question": "Hansı quş mavi rəngdədir?",
        "questionEn": "Which bird is blue?",
        "questionRu": "Какая птица синего цвета?",
        "targetAudioText": "Mavi quşu tap.",
        "targetAudioTextEn": "Find the blue bird.",
        "targetAudioTextRu": "Найди синюю птицу.",
        "options": [
          {
            "id": "c2_4",
            "text": "Mavi Quş",
            "textEn": "Blue Bird",
            "textRu": "Синяя птица",
            "emoji": "🐦",
            "isCorrect": true
          },
          {
            "id": "c2_5",
            "text": "Sarı Cücə",
            "textEn": "Yellow Chick",
            "textRu": "Желтый цыпленок",
            "emoji": "🐥",
            "isCorrect": false
          },
          {
            "id": "c2_6",
            "text": "Çəhrayı Flaqinqo",
            "textEn": "Pink Flamingo",
            "textRu": "Розовый фламинго",
            "emoji": "🦩",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Mavi quş gözəl nəğmə oxuyur! 🐦",
        "explanationEn": "Well done! The blue bird sings a sweet song! 🐦",
        "explanationRu": "Молодец! Синяя птичка красиво поет! 🐦"
      },
      {
        "id": "color-blue-3",
        "title": "Mavi Dəniz Dalğası",
        "titleEn": "Blue Sea Wave",
        "titleRu": "Синяя морская волна",
        "instruction": "Mavi dəniz dalğasını seç.",
        "instructionEn": "Select the blue sea wave.",
        "instructionRu": "Выбери синюю морскую волну.",
        "type": "select",
        "question": "Dəniz dalğası hansı rəngdədir?",
        "questionEn": "What color is the sea wave?",
        "questionRu": "Какого цвета морская волна?",
        "targetAudioText": "Mavi dalğanı seç.",
        "targetAudioTextEn": "Select the blue wave.",
        "targetAudioTextRu": "Выбери синюю волну.",
        "options": [
          {
            "id": "c2_7",
            "text": "Mavi Dalğa",
            "textEn": "Blue Wave",
            "textRu": "Синяя волна",
            "emoji": "🌊",
            "isCorrect": true
          },
          {
            "id": "c2_8",
            "text": "Qəhvəyi Torpaq",
            "textEn": "Brown Earth",
            "textRu": "Коричневая земля",
            "emoji": "🟤",
            "isCorrect": false
          },
          {
            "id": "c2_9",
            "text": "Ağ Qar",
            "textEn": "White Snow",
            "textRu": "Белый снег",
            "emoji": "⚪",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Dəniz suyu mavidir! 🌊",
        "explanationEn": "Correct! Sea water is blue! 🌊",
        "explanationRu": "Правильно! Морская вода синяя! 🌊"
      },
      {
        "id": "color-green-1",
        "title": "Yaşıl Yarpaq",
        "titleEn": "Green Leaf",
        "titleRu": "Зеленый лист",
        "lesson": {
          "id": "color-lesson-green",
          "conceptTitleAz": "Yaşıl Rəngi Öyrənək!",
          "conceptTitleEn": "Let's Learn the Color Green!",
          "conceptTitleRu": "Учим Зеленый Цвет!",
          "explanationAz": "Yaşıl rəng təbiətin və ağacların rəngidir! Yaşıl alma, ağac yarpaqları və balaca qurbağa yaşıldır.",
          "explanationEn": "Green is the color of nature and trees! Green apples, tree leaves, and little frogs are green.",
          "explanationRu": "Зеленый цвет — это цвет природы и деревьев! Зеленые яблоки, листья деревьев и лягушки — зеленые.",
          "bigEmojis": [
            "🟢",
            "🍏",
            "🍃",
            "🐸"
          ],
          "audioTextAz": "Yaşıl rəng təbiətin rəngidir! Yarpaqlar və qurbağalar yaşıldır.",
          "audioTextEn": "Green is the color of nature! Leaves and frogs are green.",
          "audioTextRu": "Зеленый цвет — это цвет природы! Листья и лягушки — зеленые."
        },
        "instruction": "Təbiətdə yaşıl olan yarpağı tap.",
        "instructionEn": "Find the green leaf in nature.",
        "instructionRu": "Найди зеленый листок в природе.",
        "type": "select",
        "question": "Yaşıl yarpaq hansıdır?",
        "questionEn": "Which one is the green leaf?",
        "questionRu": "Какой листок зеленый?",
        "targetAudioText": "Yaşıl yarpağı seç.",
        "targetAudioTextEn": "Select the green leaf.",
        "targetAudioTextRu": "Выбери зеленый лист.",
        "options": [
          {
            "id": "c3_1",
            "text": "Yaşıl Yarpaq",
            "textEn": "Green Leaf",
            "textRu": "Зеленый лист",
            "emoji": "🍃",
            "isCorrect": true
          },
          {
            "id": "c3_2",
            "text": "Sarı Yarpaq",
            "textEn": "Yellow Leaf",
            "textRu": "Желтый лист",
            "emoji": "🍂",
            "isCorrect": false
          },
          {
            "id": "c3_3",
            "text": "Qırmızı Yarpaq",
            "textEn": "Red Leaf",
            "textRu": "Красный лист",
            "emoji": "🍁",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Yarpaq təbiətdə yaşıldır! 🍃",
        "explanationEn": "Correct! Leaves are green in nature! 🍃",
        "explanationRu": "Правильно! Листья в природе зеленые! 🍃"
      },
      {
        "id": "color-green-2",
        "title": "Yaşıl Qurbağa",
        "titleEn": "Green Frog",
        "titleRu": "Зеленая лягушка",
        "instruction": "Yaşıl rəngli qurbağanı seç.",
        "instructionEn": "Select the green frog.",
        "instructionRu": "Выбери зеленую лягушку.",
        "type": "select",
        "question": "Hansı sevimli heyvan yaşıldır?",
        "questionEn": "Which cute animal is green?",
        "questionRu": "Какое милое животное зеленого цвета?",
        "targetAudioText": "Yaşıl qurbağanı tap.",
        "targetAudioTextEn": "Find the green frog.",
        "targetAudioTextRu": "Найди зеленую лягушку.",
        "options": [
          {
            "id": "c3_4",
            "text": "Yaşıl Qurbağa",
            "textEn": "Green Frog",
            "textRu": "Зеленая лягушка",
            "emoji": "🐸",
            "isCorrect": true
          },
          {
            "id": "c3_5",
            "text": "Narıncı Tülkü",
            "textEn": "Orange Fox",
            "textRu": "Рыжая лиса",
            "emoji": "🦊",
            "isCorrect": false
          },
          {
            "id": "c3_6",
            "text": "Boz Dovşan",
            "textEn": "Gray Bunny",
            "textRu": "Серый кролик",
            "emoji": "🐰",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Qurbağa yaşıl rəngdədir və tullanır! 🐸",
        "explanationEn": "Great! The frog is green and leaps high! 🐸",
        "explanationRu": "Отлично! Лягушка зеленая и прыгает! 🐸"
      },
      {
        "id": "color-green-3",
        "title": "Yaşıl Alma",
        "titleEn": "Green Apple",
        "titleRu": "Зеленое яблоко",
        "instruction": "Şirəli yaşıl almanı seç.",
        "instructionEn": "Select the juicy green apple.",
        "instructionRu": "Выбери сочное зеленое яблоко.",
        "type": "select",
        "question": "Hansı meyvə yaşıl almadır?",
        "questionEn": "Which fruit is the green apple?",
        "questionRu": "Какой фрукт — зеленое яблоко?",
        "targetAudioText": "Yaşıl almanı tap.",
        "targetAudioTextEn": "Find the green apple.",
        "targetAudioTextRu": "Найди зеленое яблоко.",
        "options": [
          {
            "id": "c3_7",
            "text": "Yaşıl Alma",
            "textEn": "Green Apple",
            "textRu": "Зеленое яблоко",
            "emoji": "🍏",
            "isCorrect": true
          },
          {
            "id": "c3_8",
            "text": "Qırmızı Alma",
            "textEn": "Red Apple",
            "textRu": "Красное яблоко",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "c3_9",
            "text": "Bənövşəyi Gavalı",
            "textEn": "Purple Plum",
            "textRu": "Фиолетовая слива",
            "emoji": "🫐",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm! Yaşıl alma vitaminlərlə zəngindir! 🍏",
        "explanationEn": "Awesome! Green apples are packed with vitamins! 🍏",
        "explanationRu": "Замечательно! Зеленое яблоко богато витаминами! 🍏"
      },
      {
        "id": "color-yellow-1",
        "title": "Sarı Günəş",
        "titleEn": "Yellow Sun",
        "titleRu": "Желтое солнце",
        "lesson": {
          "id": "color-lesson-yellow",
          "conceptTitleAz": "Sarı Rəngi Öyrənək!",
          "conceptTitleEn": "Let's Learn the Color Yellow!",
          "conceptTitleRu": "Учим Желтый Цвет!",
          "explanationAz": "Sarı rəng günəşin və istiliyin rəngidir! İsti günəş, dadlı banan və sevimli balaca cücə sarıdır.",
          "explanationEn": "Yellow is the color of sunshine and warmth! Warm sun, sweet bananas, and cute little chicks are yellow.",
          "explanationRu": "Желтый цвет — это цвет солнца и тепла! Теплое солнце, сладкий банан и милый цыпленок — желтые.",
          "bigEmojis": [
            "🟡",
            "☀️",
            "🍌",
            "🐥"
          ],
          "audioTextAz": "Sarı rəng günəşin rəngidir! Günəş, banan və cücə sarıdır.",
          "audioTextEn": "Yellow is the color of the sun! The sun, banana, and chick are yellow.",
          "audioTextRu": "Желтый цвет — это цвет солнца! Солнце, банан и цыпленок — желтые."
        },
        "instruction": "İşıq saçan sarı günəşi seç.",
        "instructionEn": "Select the shining yellow sun.",
        "instructionRu": "Выбери сияющее желтое солнце.",
        "type": "select",
        "question": "Hansı parlaq günəş sarı rəngdədir?",
        "questionEn": "Which bright sun is yellow?",
        "questionRu": "Какое яркое солнце желтого цвета?",
        "targetAudioText": "Sarı günəşi seç.",
        "targetAudioTextEn": "Select the yellow sun.",
        "targetAudioTextRu": "Выбери желтое солнце.",
        "options": [
          {
            "id": "c4_1",
            "text": "Sarı Günəş",
            "textEn": "Yellow Sun",
            "textRu": "Желтое солнце",
            "emoji": "☀️",
            "isCorrect": true
          },
          {
            "id": "c4_2",
            "text": "Ağ Bulud",
            "textEn": "White Cloud",
            "textRu": "Белое облако",
            "emoji": "☁️",
            "isCorrect": false
          },
          {
            "id": "c4_3",
            "text": "Mavi Yağış",
            "textEn": "Blue Rain",
            "textRu": "Синий дождь",
            "emoji": "🌧️",
            "isCorrect": false
          }
        ],
        "explanation": "Bəli! Sarı günəş dünyamızı qızdırır! ☀️",
        "explanationEn": "Yes! The yellow sun warms our world! ☀️",
        "explanationRu": "Да! Желтое солнце согревает наш мир! ☀️"
      },
      {
        "id": "color-yellow-2",
        "title": "Sarı Banan",
        "titleEn": "Yellow Banana",
        "titleRu": "Желтый банан",
        "instruction": "Şirin sarı bananı seç.",
        "instructionEn": "Select the sweet yellow banana.",
        "instructionRu": "Выбери сладкий желтый банан.",
        "type": "select",
        "question": "Sarı rəngli ləzzətli banan hansıdır?",
        "questionEn": "Which one is the delicious yellow banana?",
        "questionRu": "Какой вкусный банан желтого цвета?",
        "targetAudioText": "Sarı bananı tap.",
        "targetAudioTextEn": "Find the yellow banana.",
        "targetAudioTextRu": "Найди желтый банан.",
        "options": [
          {
            "id": "c4_4",
            "text": "Sarı Banan",
            "textEn": "Yellow Banana",
            "textRu": "Желтый банан",
            "emoji": "🍌",
            "isCorrect": true
          },
          {
            "id": "c4_5",
            "text": "Qırmızı Alma",
            "textEn": "Red Apple",
            "textRu": "Красное яблоко",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "c4_6",
            "text": "Bənövşəyi Badımcan",
            "textEn": "Purple Eggplant",
            "textRu": "Фиолетовый баклажан",
            "emoji": "🍆",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Bananın qabığı sarı rəngdə olur! 🍌",
        "explanationEn": "Correct! Banana peel is yellow! 🍌",
        "explanationRu": "Правильно! Кожура банана желтая! 🍌"
      },
      {
        "id": "color-yellow-3",
        "title": "Sarı Cücə",
        "titleEn": "Yellow Chick",
        "titleRu": "Желтый цыпленок",
        "instruction": "Sevimli sarı cücəni seç.",
        "instructionEn": "Select the cute yellow chick.",
        "instructionRu": "Выбери милого желтого цыпленка.",
        "type": "select",
        "question": "Hansı balaca quş sarı rəngdədir?",
        "questionEn": "Which little chick is yellow?",
        "questionRu": "Какой маленький цыпленок желтый?",
        "targetAudioText": "Sarı cücəni seç.",
        "targetAudioTextEn": "Select the yellow chick.",
        "targetAudioTextRu": "Выбери желтого цыпленка.",
        "options": [
          {
            "id": "c4_7",
            "text": "Sarı Cücə",
            "textEn": "Yellow Chick",
            "textRu": "Желтый цыпленок",
            "emoji": "🐥",
            "isCorrect": true
          },
          {
            "id": "c4_8",
            "text": "Qara Qarğa",
            "textEn": "Black Crow",
            "textRu": "Черная ворона",
            "emoji": "🦅",
            "isCorrect": false
          },
          {
            "id": "c4_9",
            "text": "Mavi Tutuquşu",
            "textEn": "Blue Parrot",
            "textRu": "Синий попугай",
            "emoji": "🦜",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Sarı cücə çox şirindir! 🐥",
        "explanationEn": "Well done! The yellow chick is so sweet! 🐥",
        "explanationRu": "Молодец! Желтый цыпленок очень милый! 🐥"
      }
    ]
  },
  {
    "id": "shapes",
    "slug": "hendesi-fiqurlar",
    "titleAz": "Həndəsi fiqurlar",
    "titleEn": "Geometric Shapes",
    "titleRu": "Геометрические фигуры",
    "descriptionAz": "Dairə, kvadrat, üçbucaq, ulduz və digər formaları tanıyaq.",
    "emoji": "🔺",
    "group": "foundations",
    "minAge": 2,
    "maxAge": 6,
    "color": "from-amber-500 to-yellow-400",
    "activities": [
      {
        "id": "shape-circle-1",
        "title": "Yumru Dairə",
        "titleEn": "Round Circle",
        "titleRu": "Круглый круг",
        "lesson": {
          "id": "shape-lesson-circle",
          "conceptTitleAz": "Dairə və Kvadratı Öyrənək!",
          "conceptTitleEn": "Let's Learn the Circle and Square!",
          "conceptTitleRu": "Учим Круг и Квадрат!",
          "explanationAz": "Dairə top kimi yumrudur, onun heç bir küncü yoxdur (⭕⚽). Kvadratın isə bir-birinə bərabər dörd düz tərəfi və dörd küncü var (⬛📦)!",
          "explanationEn": "A circle is round like a ball with no sharp corners (⭕⚽). A square has four equal straight sides and four corners (⬛📦)!",
          "explanationRu": "Круг круглый как мячик, у него нет уголков (⭕⚽). А у квадрата четыре равные стороны и четыре угла (⬛📦)!",
          "bigEmojis": [
            "⭕",
            "⚽",
            "⬛",
            "📦"
          ],
          "audioTextAz": "Dairə yumrudur və küncü yoxdur. Kvadratın dörd bərabər tərəfi var.",
          "audioTextEn": "A circle is round with no corners. A square has four equal sides.",
          "audioTextRu": "Круг круглый без углов. У квадрата четыре равные стороны."
        },
        "instruction": "Yumru olan dairə fiqurunu seç.",
        "instructionEn": "Select the round circle shape.",
        "instructionRu": "Выбери круглую форму — круг.",
        "type": "select",
        "question": "Hansı fiqur dairədir (yumrudur)?",
        "questionEn": "Which shape is a circle (round)?",
        "questionRu": "Какая фигура круг?",
        "targetAudioText": "Dairəni seç.",
        "targetAudioTextEn": "Select the circle.",
        "targetAudioTextRu": "Выбери круг.",
        "options": [
          {
            "id": "sh1",
            "text": "Dairə",
            "textEn": "Circle",
            "textRu": "Круг",
            "emoji": "⭕",
            "isCorrect": true
          },
          {
            "id": "sh2",
            "text": "Kvadrat",
            "textEn": "Square",
            "textRu": "Квадрат",
            "emoji": "⬛",
            "isCorrect": false
          },
          {
            "id": "sh3",
            "text": "Üçbucaq",
            "textEn": "Triangle",
            "textRu": "Треугольник",
            "emoji": "🔺",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Dairə tam yumrudur və küncü yoxdur! ⭕",
        "explanationEn": "Well done! A circle is perfectly round with no corners! ⭕",
        "explanationRu": "Молодец! Круг круглый и без углов! ⭕"
      },
      {
        "id": "shape-circle-2",
        "title": "Dairəvi Oyuncaq",
        "titleEn": "Round Toy",
        "titleRu": "Круглая игрушка",
        "instruction": "Dairə formasında olan oyuncağı tap.",
        "instructionEn": "Find the toy in the shape of a circle.",
        "instructionRu": "Найди игрушку круглой формы.",
        "type": "select",
        "question": "Hansı sevimli oyuncaq dairə formasındadır?",
        "questionEn": "Which fun toy is shaped like a circle?",
        "questionRu": "Какая любимая игрушка имеет форму круга?",
        "targetAudioText": "Dairə formasındakı oyuncağı seç.",
        "targetAudioTextEn": "Select the round toy.",
        "targetAudioTextRu": "Выбери круглую игрушку.",
        "options": [
          {
            "id": "sh4",
            "text": "Futbol Topu",
            "textEn": "Soccer Ball",
            "textRu": "Футбольный мяч",
            "emoji": "⚽",
            "isCorrect": true
          },
          {
            "id": "sh5",
            "text": "Qutu",
            "textEn": "Box",
            "textRu": "Коробка",
            "emoji": "📦",
            "isCorrect": false
          },
          {
            "id": "sh6",
            "text": "Kitab",
            "textEn": "Book",
            "textRu": "Книга",
            "emoji": "📖",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Futbol topu tam dairə formasındadır! ⚽",
        "explanationEn": "Great! The soccer ball is perfectly round! ⚽",
        "explanationRu": "Отлично! Футбольный мяч имеет форму круга! ⚽"
      },
      {
        "id": "shape-square-3",
        "title": "Dörd Bucaq: Kvadrat",
        "titleEn": "Four Sides: Square",
        "titleRu": "Четыре стороны: Квадрат",
        "instruction": "Dörd bərabər tərəfi olan kvadratı seç.",
        "instructionEn": "Select the square with four equal sides.",
        "instructionRu": "Выбери квадрат с четырьмя равными сторонами.",
        "type": "select",
        "question": "Kvadrat fiquru hansıdır?",
        "questionEn": "Which shape is a square?",
        "questionRu": "Какая фигура квадрат?",
        "targetAudioText": "Kvadratı tap.",
        "targetAudioTextEn": "Find the square.",
        "targetAudioTextRu": "Найди квадрат.",
        "options": [
          {
            "id": "sh7",
            "text": "Kvadrat",
            "textEn": "Square",
            "textRu": "Квадрат",
            "emoji": "⬛",
            "isCorrect": true
          },
          {
            "id": "sh8",
            "text": "Dairə",
            "textEn": "Circle",
            "textRu": "Круг",
            "emoji": "⭕",
            "isCorrect": false
          },
          {
            "id": "sh9",
            "text": "Ulduz",
            "textEn": "Star",
            "textRu": "Звезда",
            "emoji": "⭐",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Kvadratın dörd düzbucaqlı bərabər tərəfi var! ⬛",
        "explanationEn": "Correct! A square has four equal straight sides! ⬛",
        "explanationRu": "Правильно! У квадрата четыре равные стороны! ⬛"
      },
      {
        "id": "shape-triangle-4",
        "title": "Üçbucaqlı Fiqur",
        "titleEn": "Triangle Shape",
        "titleRu": "Фигура Треугольник",
        "lesson": {
          "id": "shape-lesson-triangle",
          "conceptTitleAz": "Üçbucaq və Ulduzu Öyrənək!",
          "conceptTitleEn": "Let's Learn the Triangle and Star!",
          "conceptTitleRu": "Учим Треугольник и Звезду!",
          "explanationAz": "Üçbucağın düz 3 tərəfi və 3 iti küncü var (🔺🍕)! Ulduz isə göydə parlaq işıq saçan gözəl fiqurdur (⭐✨).",
          "explanationEn": "A triangle has 3 straight sides and 3 corners (🔺🍕)! A star sparkles in the night sky (⭐✨).",
          "explanationRu": "У треугольника 3 стороны и 3 острых уголка (🔺🍕)! А звезда сияет на ночном небе (⭐✨).",
          "bigEmojis": [
            "🔺",
            "📐",
            "⭐",
            "🍕"
          ],
          "audioTextAz": "Üçbucağın üç tərəfi var. Ulduz isə göydə parıldayır.",
          "audioTextEn": "A triangle has three sides. A star shines in the sky.",
          "audioTextRu": "У треугольника три стороны. А звезда сияет на небе."
        },
        "instruction": "Üç iti küncü olan üçbucağı seç.",
        "instructionEn": "Select the triangle with three corners.",
        "instructionRu": "Выбери треугольник с тремя углами.",
        "type": "select",
        "question": "Üçbucaq fiquru hansıdır?",
        "questionEn": "Which shape is a triangle?",
        "questionRu": "Какая фигура треугольник?",
        "targetAudioText": "Üçbucağı seç.",
        "targetAudioTextEn": "Select the triangle.",
        "targetAudioTextRu": "Выбери треугольник.",
        "options": [
          {
            "id": "sh10",
            "text": "Üçbucaq",
            "textEn": "Triangle",
            "textRu": "Треугольник",
            "emoji": "🔺",
            "isCorrect": true
          },
          {
            "id": "sh11",
            "text": "Dairə",
            "textEn": "Circle",
            "textRu": "Круг",
            "emoji": "⭕",
            "isCorrect": false
          },
          {
            "id": "sh12",
            "text": "Kvadrat",
            "textEn": "Square",
            "textRu": "Квадрат",
            "emoji": "⬛",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Üçbucaq 3 küncə malikdir! 🔺",
        "explanationEn": "Super! A triangle has 3 corners! 🔺",
        "explanationRu": "Супер! У треугольника 3 уголка! 🔺"
      },
      {
        "id": "shape-star-5",
        "title": "Parlaq Ulduz",
        "titleEn": "Bright Star",
        "titleRu": "Яркая звезда",
        "instruction": "Göydə parıldayan ulduz fiqurunu göstər.",
        "instructionEn": "Point to the shining star shape.",
        "instructionRu": "Покажи сияющую звездочку.",
        "type": "select",
        "question": "Parlaq ulduz fiquru hansıdır?",
        "questionEn": "Which shape is the bright star?",
        "questionRu": "Какая фигура яркая звезда?",
        "targetAudioText": "Ulduz fiqurunu seç.",
        "targetAudioTextEn": "Select the star shape.",
        "targetAudioTextRu": "Выбери фигуру звезды.",
        "options": [
          {
            "id": "sh13",
            "text": "Ulduz",
            "textEn": "Star",
            "textRu": "Звезда",
            "emoji": "⭐",
            "isCorrect": true
          },
          {
            "id": "sh14",
            "text": "Ürək",
            "textEn": "Heart",
            "textRu": "Сердце",
            "emoji": "❤️",
            "isCorrect": false
          },
          {
            "id": "sh15",
            "text": "Kvadrat",
            "textEn": "Square",
            "textRu": "Квадрат",
            "emoji": "⬛",
            "isCorrect": false
          }
        ],
        "explanation": "Çox gözəl! Bu parlaq bir ulduzdur! ⭐",
        "explanationEn": "Wonderful! That is a bright star! ⭐",
        "explanationRu": "Замечательно! Это яркая звезда! ⭐"
      },
      {
        "id": "shape-pizza-6",
        "title": "Üçbucaq Pizza Dilimi",
        "titleEn": "Triangle Pizza Slice",
        "titleRu": "Кусочек пиццы треугольник",
        "instruction": "Üçbucağa bənzəyən ləzzətli yeməyi tap.",
        "instructionEn": "Find the tasty food shaped like a triangle.",
        "instructionRu": "Найди вкусную еду в форме треугольника.",
        "type": "select",
        "question": "Hansı dadlı yemək üçbucaq formadadır?",
        "questionEn": "Which tasty food is shaped like a triangle?",
        "questionRu": "Какая вкусная еда имеет форму треугольника?",
        "targetAudioText": "Üçbucağa bənzəyən yeməyi seç.",
        "targetAudioTextEn": "Select the triangle-shaped food.",
        "targetAudioTextRu": "Выбери еду формы треугольника.",
        "options": [
          {
            "id": "sh16",
            "text": "Pizza Dilimi",
            "textEn": "Pizza Slice",
            "textRu": "Кусочек пиццы",
            "emoji": "🍕",
            "isCorrect": true
          },
          {
            "id": "sh17",
            "text": "Yumru Portağal",
            "textEn": "Round Orange",
            "textRu": "Круглый апельсин",
            "emoji": "🍊",
            "isCorrect": false
          },
          {
            "id": "sh18",
            "text": "Yumurtavari Qarpız",
            "textEn": "Oval Watermelon",
            "textRu": "Овальный арбуз",
            "emoji": "🍉",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Pizza dilimi məhz üçbucaq şəklində kəsilir! 🍕",
        "explanationEn": "Well done! A pizza slice is shaped like a triangle! 🍕",
        "explanationRu": "Молодец! Кусочек пиццы нарезан треугольником! 🍕"
      }
    ]
  },
  {
    "id": "objects",
    "slug": "sade-esyalar",
    "titleAz": "Sadə əşyalar",
    "titleEn": "Everyday Objects",
    "titleRu": "Простые предметы",
    "descriptionAz": "Masa, stul, qaşıq, fincan, qapı, pəncərə, kitab və digər ev əşyaları.",
    "emoji": "📦",
    "group": "foundations",
    "minAge": 2,
    "maxAge": 5,
    "color": "from-sky-500 to-blue-400",
    "activities": [
      {
        "id": "obj-spoon-1",
        "title": "Şorba Qaşığı",
        "titleEn": "Soup Spoon",
        "titleRu": "Суповая ложка",
        "lesson": {
          "id": "obj-lesson-kitchen",
          "conceptTitleAz": "Mətbəx Əşyalarını Öyrənək!",
          "conceptTitleEn": "Let's Learn Kitchen Items!",
          "conceptTitleRu": "Учим Кухонные Предметы!",
          "explanationAz": "Şorbanı qaşıqla içirik (🥄), makaronu çəngəllə yeyirik (🍴), südü isə fincanla içirik (☕)!",
          "explanationEn": "We eat soup with a spoon (🥄), pasta with a fork (🍴), and drink milk from a cup (☕)!",
          "explanationRu": "Мы едим суп ложкой (🥄), макароны вилкой (🍴), а молоко пьем из чашки (☕)!",
          "bigEmojis": [
            "🥄",
            "🍴",
            "☕",
            "🥣"
          ],
          "audioTextAz": "Şorbanı qaşıqla yeyirik, çayı fincanla içirik.",
          "audioTextEn": "We eat soup with a spoon, we drink tea from a cup.",
          "audioTextRu": "Суп мы едим ложкой, чай пьем из кружки."
        },
        "instruction": "Şorbanı yemək üçün nə istifadə edirik?",
        "instructionEn": "What do we use to eat soup?",
        "instructionRu": "Чем мы едим суп?",
        "type": "select",
        "question": "Şorbanı nə ilə yeyirik?",
        "questionEn": "What do we eat soup with?",
        "questionRu": "Чем мы едим суп?",
        "targetAudioText": "Şorba üçün qaşığı tap.",
        "targetAudioTextEn": "Find the spoon for soup.",
        "targetAudioTextRu": "Найди ложку для супа.",
        "options": [
          {
            "id": "o1",
            "text": "Qaşıq",
            "textEn": "Spoon",
            "textRu": "Ложка",
            "emoji": "🥄",
            "isCorrect": true
          },
          {
            "id": "o2",
            "text": "Stul",
            "textEn": "Chair",
            "textRu": "Стул",
            "emoji": "🪑",
            "isCorrect": false
          },
          {
            "id": "o3",
            "text": "Qapı",
            "textEn": "Door",
            "textRu": "Дверь",
            "emoji": "🚪",
            "isCorrect": false
          }
        ],
        "explanation": "Bəli, dadlı şorbanı qaşıqla yeyirik! 🥄",
        "explanationEn": "Yes, we eat delicious soup with a spoon! 🥄",
        "explanationRu": "Да, вкусный суп мы едим ложкой! 🥄"
      },
      {
        "id": "obj-cup-2",
        "title": "İsti Çay Fincanı",
        "titleEn": "Warm Tea Cup",
        "titleRu": "Чашка горячего чая",
        "instruction": "Su və ya süd içdiyimiz qabı tap.",
        "instructionEn": "Find the vessel we drink water or milk from.",
        "instructionRu": "Найди посуду, из которой пьем воду или молоко.",
        "type": "select",
        "question": "Çay və ya süd nə ilə içilir?",
        "questionEn": "What do we drink tea or milk with?",
        "questionRu": "Из чего пьют чай или молоко?",
        "targetAudioText": "Fincanı seç.",
        "targetAudioTextEn": "Select the cup.",
        "targetAudioTextRu": "Выбери чашку.",
        "options": [
          {
            "id": "o4",
            "text": "Fincan",
            "textEn": "Cup",
            "textRu": "Чашка",
            "emoji": "☕",
            "isCorrect": true
          },
          {
            "id": "o5",
            "text": "Kitab",
            "textEn": "Book",
            "textRu": "Книга",
            "emoji": "📖",
            "isCorrect": false
          },
          {
            "id": "o6",
            "text": "Yataq",
            "textEn": "Bed",
            "textRu": "Кровать",
            "emoji": "🛏️",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Fincanla ilıq çay və ya süd içmək olar! ☕",
        "explanationEn": "Great! We can drink warm tea or milk from a cup! ☕",
        "explanationRu": "Отлично! Из чашки можно пить теплый чай или молоко! ☕"
      },
      {
        "id": "obj-fork-3",
        "title": "Makaron Çəngəli",
        "titleEn": "Pasta Fork",
        "titleRu": "Вилка для макарон",
        "instruction": "Yeməkləri tutub yemək üçün çəngəli tap.",
        "instructionEn": "Find the fork to hold and eat food.",
        "instructionRu": "Найди вилку для еды.",
        "type": "select",
        "question": "Makaronu rahat yemək üçün hansı əşyanı seçirik?",
        "questionEn": "Which item do we use to comfortably eat pasta?",
        "questionRu": "Чем удобно кушать макароны?",
        "targetAudioText": "Çəngəli tap.",
        "targetAudioTextEn": "Find the fork.",
        "targetAudioTextRu": "Найди вилку.",
        "options": [
          {
            "id": "o7",
            "text": "Çəngəl",
            "textEn": "Fork",
            "textRu": "Вилка",
            "emoji": "🍴",
            "isCorrect": true
          },
          {
            "id": "o8",
            "text": "Qələm",
            "textEn": "Pencil",
            "textRu": "Карандаш",
            "emoji": "✏️",
            "isCorrect": false
          },
          {
            "id": "o9",
            "text": "Açar",
            "textEn": "Key",
            "textRu": "Ключ",
            "emoji": "🔑",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Çəngəl yeməkləri rahat götürməyə kömək edir! 🍴",
        "explanationEn": "Well done! A fork helps to pick up food! 🍴",
        "explanationRu": "Молодец! Вилка помогает удобно кушать еду! 🍴"
      },
      {
        "id": "obj-chair-4",
        "title": "Rahat Stul",
        "titleEn": "Comfortable Chair",
        "titleRu": "Удобный стул",
        "lesson": {
          "id": "obj-lesson-furniture",
          "conceptTitleAz": "Otaq və Mebel Əşyalarını Öyrənək!",
          "conceptTitleEn": "Let's Learn Room Furniture!",
          "conceptTitleRu": "Учим Мебель в Комнате!",
          "explanationAz": "Masanın arxasında oturmaq üçün stuldan istifadə edirik (🪑). Yorulanda rahat çarpayıda yatırıq (🛏️)!",
          "explanationEn": "We use a chair to sit at the table (🪑). When tired, we sleep in a cozy bed (🛏️)!",
          "explanationRu": "Мы сидим за столом на стуле (🪑). А когда устали, спим в удобной кровати (🛏️)!",
          "bigEmojis": [
            "🪑",
            "🛏️",
            "🚪",
            "🛋️"
          ],
          "audioTextAz": "Stulda otururuq, çarpayıda yatırıq.",
          "audioTextEn": "We sit on a chair, we sleep in a bed.",
          "audioTextRu": "На стуле мы сидим, на кровати спим."
        },
        "instruction": "Oturmaq üçün istifadə etdiyimiz stulu tap.",
        "instructionEn": "Find the chair we use to sit on.",
        "instructionRu": "Найди стул, на котором мы сидим.",
        "type": "select",
        "question": "Dərs oxuyarkən və ya yemək yeyərkən nəyin üstündə otururuq?",
        "questionEn": "What do we sit on when studying or eating?",
        "questionRu": "На чем мы сидим во время учебы или еды?",
        "targetAudioText": "Stulu seç.",
        "targetAudioTextEn": "Select the chair.",
        "targetAudioTextRu": "Выбери стул.",
        "options": [
          {
            "id": "o10",
            "text": "Stul",
            "textEn": "Chair",
            "textRu": "Стул",
            "emoji": "🪑",
            "isCorrect": true
          },
          {
            "id": "o11",
            "text": "Vanna",
            "textEn": "Bathtub",
            "textRu": "Ванна",
            "emoji": "🛁",
            "isCorrect": false
          },
          {
            "id": "o12",
            "text": "Soyuducu",
            "textEn": "Fridge",
            "textRu": "Холодильник",
            "emoji": "🧊",
            "isCorrect": false
          }
        ],
        "explanation": "Doğrudur! Biz stulun üstündə rahat əyləşirik! 🪑",
        "explanationEn": "Correct! We sit comfortably on a chair! 🪑",
        "explanationRu": "Правильно! Мы удобно сидим на стуле! 🪑"
      },
      {
        "id": "obj-bed-5",
        "title": "Yumşaq Çarpayı",
        "titleEn": "Soft Bed",
        "titleRu": "Мягкая кровать",
        "instruction": "Gecələr yatıb dincəldiyimiz çarpayını seç.",
        "instructionEn": "Select the bed we sleep and rest in at night.",
        "instructionRu": "Выбери кровать, в которой мы спим ночью.",
        "type": "select",
        "question": "Gecə yuxuya getmək üçün hara uzanırıq?",
        "questionEn": "Where do we lie down to sleep at night?",
        "questionRu": "Куда мы ложимся спать ночью?",
        "targetAudioText": "Çarpayını tap.",
        "targetAudioTextEn": "Find the bed.",
        "targetAudioTextRu": "Найди кровать.",
        "options": [
          {
            "id": "o13",
            "text": "Çarpayı",
            "textEn": "Bed",
            "textRu": "Кровать",
            "emoji": "🛏️",
            "isCorrect": true
          },
          {
            "id": "o14",
            "text": "Qapı",
            "textEn": "Door",
            "textRu": "Дверь",
            "emoji": "🚪",
            "isCorrect": false
          },
          {
            "id": "o15",
            "text": "Pəncərə",
            "textEn": "Window",
            "textRu": "Окно",
            "emoji": "🪟",
            "isCorrect": false
          }
        ],
        "explanation": "Şirin yuxular! Çarpayıda yatıb qüvvət toplayırıq! 🛏️",
        "explanationEn": "Sweet dreams! We sleep in bed to regain energy! 🛏️",
        "explanationRu": "Сладких снов! В кровати мы спим и набираемся сил! 🛏️"
      }
    ]
  },
  {
    "id": "body-parts",
    "slug": "beden-hisseleri",
    "titleAz": "Bədən hissələri",
    "titleEn": "Body Parts",
    "titleRu": "Части тела",
    "descriptionAz": "Baş, göz, qulaq, burun, ağız, əl, ayaq və barmaqlar.",
    "emoji": "🫀",
    "group": "foundations",
    "minAge": 2,
    "maxAge": 5,
    "color": "from-emerald-500 to-green-400",
    "activities": [
      {
        "id": "body-eye-1",
        "title": "Görən Gözlərimiz",
        "titleEn": "Our Seeing Eyes",
        "titleRu": "Наши зрячие глаза",
        "lesson": {
          "id": "body-lesson-face",
          "conceptTitleAz": "Üz Hissələrimizi Öyrənək!",
          "conceptTitleEn": "Let's Learn Facial Features!",
          "conceptTitleRu": "Учим Части Лица!",
          "explanationAz": "Gözlərimizlə dünyanı görürük (👁️), qulaqlarımızla eşidirik (👂), burnumuzla qoxulayırıq (👃), ağzımızla danışır və dad bilirik (👄)!",
          "explanationEn": "We see the world with our eyes (👁️), hear with our ears (👂), smell with our nose (👃), and speak/taste with our mouth (👄)!",
          "explanationRu": "Глазами мы видим мир (👁️), ушами слышим (👂), носом чувствуем запахи (👃), а ртом говорим и пробуем еду (👄)!",
          "bigEmojis": [
            "👁️",
            "👂",
            "👃",
            "👄"
          ],
          "audioTextAz": "Gözlə görürük, qulaqla eşidirik, burunla qoxulayırıq.",
          "audioTextEn": "We see with eyes, hear with ears, smell with nose.",
          "audioTextRu": "Глазами видим, ушами слышим, носом чувствуем запахи."
        },
        "instruction": "Dünyanı və rəngləri görmək üçün istifadə etdiyimiz gözü seç.",
        "instructionEn": "Select the eye we use to see the world and colors.",
        "instructionRu": "Выбери глаз, которым мы видим мир и цвета.",
        "type": "select",
        "question": "Biz ətrafımızdakı gözəllikləri nə ilə görürük?",
        "questionEn": "What do we see the beauty around us with?",
        "questionRu": "Чем мы видим красоту вокруг нас?",
        "targetAudioText": "Gözü tap.",
        "targetAudioTextEn": "Find the eye.",
        "targetAudioTextRu": "Найди глаз.",
        "options": [
          {
            "id": "b1",
            "text": "Göz",
            "textEn": "Eye",
            "textRu": "Глаз",
            "emoji": "👁️",
            "isCorrect": true
          },
          {
            "id": "b2",
            "text": "Qulaq",
            "textEn": "Ear",
            "textRu": "Ухо",
            "emoji": "👂",
            "isCorrect": false
          },
          {
            "id": "b3",
            "text": "Ayaq",
            "textEn": "Foot",
            "textRu": "Нога",
            "emoji": "🦶",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Gözlərimizlə hər şeyi aydın görürük! 👁️",
        "explanationEn": "Well done! With our eyes we see everything clearly! 👁️",
        "explanationRu": "Молодец! Глазами мы всё четко видим! 👁️"
      },
      {
        "id": "body-ear-2",
        "title": "Eşidən Qulaqlarımız",
        "titleEn": "Our Hearing Ears",
        "titleRu": "Наши чуткие уши",
        "instruction": "Musiqini və səsləri eşitmək üçün qulağı seç.",
        "instructionEn": "Select the ear to hear music and sounds.",
        "instructionRu": "Выбери ухо, чтобы слушать музыку и звуки.",
        "type": "select",
        "question": "Quşların nəğməsini və musiqini nə ilə eşidirik?",
        "questionEn": "What do we hear birds singing and music with?",
        "questionRu": "Чем мы слышим пение птиц и музыку?",
        "targetAudioText": "Qulağı seç.",
        "targetAudioTextEn": "Select the ear.",
        "targetAudioTextRu": "Выбери ухо.",
        "options": [
          {
            "id": "b4",
            "text": "Qulaq",
            "textEn": "Ear",
            "textRu": "Ухо",
            "emoji": "👂",
            "isCorrect": true
          },
          {
            "id": "b5",
            "text": "Burun",
            "textEn": "Nose",
            "textRu": "Нос",
            "emoji": "👃",
            "isCorrect": false
          },
          {
            "id": "b6",
            "text": "Əl",
            "textEn": "Hand",
            "textRu": "Рука",
            "emoji": "✋",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Qulaqlarımız sayəsində bütün gözəl səsləri eşidirik! 👂",
        "explanationEn": "Great! Thanks to our ears we hear all sweet sounds! 👂",
        "explanationRu": "Отлично! Благодаря ушам мы слышим прекрасные звуки! 👂"
      },
      {
        "id": "body-nose-3",
        "title": "Qoxu Bilen Burun",
        "titleEn": "Smelling Nose",
        "titleRu": "Нос, чувствующий запахи",
        "instruction": "Güllərin ətrini duyduğumuz burnu tap.",
        "instructionEn": "Find the nose we use to smell flowers.",
        "instructionRu": "Найди нос, которым мы чувствуем аромат цветов.",
        "type": "select",
        "question": "Çiçəklərin və yeməklərin ətrini nə ilə duyuruq?",
        "questionEn": "What do we smell flowers and food with?",
        "questionRu": "Чем мы чувствуем запах цветов и вкусной еды?",
        "targetAudioText": "Burnu tap.",
        "targetAudioTextEn": "Find the nose.",
        "targetAudioTextRu": "Найди нос.",
        "options": [
          {
            "id": "b7",
            "text": "Burun",
            "textEn": "Nose",
            "textRu": "Нос",
            "emoji": "👃",
            "isCorrect": true
          },
          {
            "id": "b8",
            "text": "Ağız",
            "textEn": "Mouth",
            "textRu": "Рот",
            "emoji": "👄",
            "isCorrect": false
          },
          {
            "id": "b9",
            "text": "Göz",
            "textEn": "Eye",
            "textRu": "Глаз",
            "emoji": "👁️",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Burnumuzla təmiz hava alırıq və ətirləri duyuruq! 👃",
        "explanationEn": "Correct! With our nose we breathe fresh air and smell fragrances! 👃",
        "explanationRu": "Правильно! Носом мы дышим и чувствуем ароматы! 👃"
      },
      {
        "id": "body-hand-4",
        "title": "Bacarqlı Əllər",
        "titleEn": "Clever Hands",
        "titleRu": "Умелые руки",
        "lesson": {
          "id": "body-lesson-limbs",
          "conceptTitleAz": "Əllər və Ayaqlarımızı Öyrənək!",
          "conceptTitleEn": "Let's Learn Hands and Feet!",
          "conceptTitleRu": "Учим Руки и Ноги!",
          "explanationAz": "Əllərimizlə oyuncaqları tutur, rəsm çəkir və salam veririk (✋🎨). Ayaqlarımızla isə yeriyir, qaçır və tullanırıq (🦶🏃)!",
          "explanationEn": "With our hands we hold toys, draw, and wave hello (✋🎨). With our feet we walk, run, and jump (🦶🏃)!",
          "explanationRu": "Руками мы держим игрушки, рисуем и машем «привет» (✋🎨). А ногами ходим, бегаем и прыгаем (🦶🏃)!",
          "bigEmojis": [
            "✋",
            "🦶",
            "🏃",
            "👋"
          ],
          "audioTextAz": "Əllərimizlə tuturuq, ayaqlarımızla qaçırıq.",
          "audioTextEn": "We hold with hands, we run with feet.",
          "audioTextRu": "Руками мы держим, ногами бегаем."
        },
        "instruction": "Oyuncaqları tutmaq üçün istifadə etdiyimiz əli seç.",
        "instructionEn": "Select the hand we use to hold toys.",
        "instructionRu": "Выбери руку, которой мы держим игрушки.",
        "type": "select",
        "question": "Oyuncaqları tutmaq və salam vermək üçün hansı üzvümüz kömək edir?",
        "questionEn": "Which body part helps us hold toys and wave hello?",
        "questionRu": "Какая часть тела помогает держать игрушки и махать «привет»?",
        "targetAudioText": "Əli göstər.",
        "targetAudioTextEn": "Point to the hand.",
        "targetAudioTextRu": "Покажи руку.",
        "options": [
          {
            "id": "b10",
            "text": "Əl",
            "textEn": "Hand",
            "textRu": "Рука",
            "emoji": "✋",
            "isCorrect": true
          },
          {
            "id": "b11",
            "text": "Ayaq",
            "textEn": "Foot",
            "textRu": "Нога",
            "emoji": "🦶",
            "isCorrect": false
          },
          {
            "id": "b12",
            "text": "Qulaq",
            "textEn": "Ear",
            "textRu": "Ухо",
            "emoji": "👂",
            "isCorrect": false
          }
        ],
        "explanation": "Bəli! Əllərimizlə rəsm çəkirik və oyuncaqlarla oynayırıq! ✋",
        "explanationEn": "Yes! With our hands we draw and play with toys! ✋",
        "explanationRu": "Да! Руками мы рисуем и играем в игрушки! ✋"
      },
      {
        "id": "body-foot-5",
        "title": "Cəld Ayaqlar",
        "titleEn": "Swift Feet",
        "titleRu": "Быстрые ноги",
        "instruction": "Qaçmaq və tullanmaq üçün kömək edən ayağı tap.",
        "instructionEn": "Find the foot that helps us run and jump.",
        "instructionRu": "Найди ногу, которая помогает бегать и прыгать.",
        "type": "select",
        "question": "Parkda qaçmaq, addımlamaq və tullanmaq üçün nə lazımdır?",
        "questionEn": "What do we need to run, walk, and jump in the park?",
        "questionRu": "Что нужно, чтобы бегать, шагать и прыгать в парке?",
        "targetAudioText": "Ayağı tap.",
        "targetAudioTextEn": "Find the foot.",
        "targetAudioTextRu": "Найди ногу.",
        "options": [
          {
            "id": "b13",
            "text": "Ayaq",
            "textEn": "Foot",
            "textRu": "Нога",
            "emoji": "🦶",
            "isCorrect": true
          },
          {
            "id": "b14",
            "text": "Burun",
            "textEn": "Nose",
            "textRu": "Нос",
            "emoji": "👃",
            "isCorrect": false
          },
          {
            "id": "b15",
            "text": "Göz",
            "textEn": "Eye",
            "textRu": "Глаз",
            "emoji": "👁️",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm! Ayaqlarımız bizi hər yerə cəld aparır! 🦶",
        "explanationEn": "Awesome! Our feet carry us swiftly everywhere! 🦶",
        "explanationRu": "Замечательно! Ноги быстро переносят нас повсюду! 🦶"
      }
    ]
  },
  {
    "id": "animals",
    "slug": "heyvanlar",
    "titleAz": "Heyvanlar və səsləri",
    "titleEn": "Animals & Sounds",
    "titleRu": "Животные и звуки",
    "descriptionAz": "İt, pişik, inək, qoyun, at, quşlar və digər heyvanlar.",
    "emoji": "🐾",
    "group": "foundations",
    "minAge": 2,
    "maxAge": 6,
    "color": "from-amber-600 to-orange-400",
    "activities": [
      {
        "id": "anim-cat-1",
        "title": "Miyovuldayan Pişik",
        "titleEn": "Meowing Cat",
        "titleRu": "Мяукающая кошка",
        "lesson": {
          "id": "anim-lesson-pets",
          "conceptTitleAz": "Ev Heyvanları və Səslərini Öyrənək!",
          "conceptTitleEn": "Let's Learn Pets and Their Sounds!",
          "conceptTitleRu": "Учим Домашних Животных и их Звуки!",
          "explanationAz": "Pişik 'Miyau-miyau' deyir (🐱), sadiq it 'Hav-hav' deyə hürür (🐶), inək isə 'Mööö' deyir və bizə süd verir (🐮)!",
          "explanationEn": "The cat says 'Meow-meow' (🐱), the loyal dog barks 'Woof-woof' (🐶), and the cow says 'Moo' giving us milk (🐮)!",
          "explanationRu": "Кошка говорит «Мяу-мяу» (🐱), верная собака лает «Гав-гав» (🐶), а корова мычит «Му-у-у» и дает молоко (🐮)!",
          "bigEmojis": [
            "🐱",
            "🐶",
            "🐮",
            "🐓"
          ],
          "audioTextAz": "Pişik miyoldayır, it hürür, inək mövləyir.",
          "audioTextEn": "The cat meows, the dog barks, the cow moos.",
          "audioTextRu": "Кошка мяукает, собака лает, корова мычит."
        },
        "instruction": "'Miyau' deyən sevimli pişiyi seç.",
        "instructionEn": "Select the cute cat that says 'Meow'.",
        "instructionRu": "Выбери милую кошку, которая говорит «Мяу».",
        "type": "select",
        "question": "Hansı heyvan 'Miyau-miyau' səsi çıxarır?",
        "questionEn": "Which animal makes a 'Meow-meow' sound?",
        "questionRu": "Какое животное издает звук «Мяу-мяу»?",
        "targetAudioText": "Pişiyi seç.",
        "targetAudioTextEn": "Select the cat.",
        "targetAudioTextRu": "Выбери кошку.",
        "options": [
          {
            "id": "an1",
            "text": "Pişik",
            "textEn": "Cat",
            "textRu": "Кошка",
            "emoji": "🐱",
            "isCorrect": true
          },
          {
            "id": "an2",
            "text": "İt",
            "textEn": "Dog",
            "textRu": "Собака",
            "emoji": "🐶",
            "isCorrect": false
          },
          {
            "id": "an3",
            "text": "İnək",
            "textEn": "Cow",
            "textRu": "Корова",
            "emoji": "🐮",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Pişik 'Miyau' edərək süd istəyir! 🐱",
        "explanationEn": "Well done! The cat meows asking for milk! 🐱",
        "explanationRu": "Молодец! Кошка мяукает и просит молочка! 🐱"
      },
      {
        "id": "anim-dog-2",
        "title": "Hürən İt",
        "titleEn": "Barking Dog",
        "titleRu": "Лающая собака",
        "instruction": "'Hav-hav' deyən sadiq dostumuzu tap.",
        "instructionEn": "Find our loyal friend who says 'Woof-woof'.",
        "instructionRu": "Найди верного друга, который говорит «Гав-гав».",
        "type": "select",
        "question": "Evimizi qoruyan və 'Hav-hav' deyə hürən heyvan hansıdır?",
        "questionEn": "Which animal protects our home and barks 'Woof-woof'?",
        "questionRu": "Какое животное охраняет дом и лает «Гав-гав»?",
        "targetAudioText": "İti tap.",
        "targetAudioTextEn": "Find the dog.",
        "targetAudioTextRu": "Найди собаку.",
        "options": [
          {
            "id": "an4",
            "text": "İt",
            "textEn": "Dog",
            "textRu": "Собака",
            "emoji": "🐶",
            "isCorrect": true
          },
          {
            "id": "an5",
            "text": "Pişik",
            "textEn": "Cat",
            "textRu": "Кошка",
            "emoji": "🐱",
            "isCorrect": false
          },
          {
            "id": "an6",
            "text": "Ördək",
            "textEn": "Duck",
            "textRu": "Утка",
            "emoji": "🦆",
            "isCorrect": false
          }
        ],
        "explanation": "Doğrudur! İt insanın ən sadiq dostudur! 🐶",
        "explanationEn": "Correct! The dog is man's best friend! 🐶",
        "explanationRu": "Правильно! Собака — самый верный друг человека! 🐶"
      },
      {
        "id": "anim-cow-3",
        "title": "Süd Verən İnək",
        "titleEn": "Milk Giving Cow",
        "titleRu": "Корова, дающая молоко",
        "instruction": "'Mööö' deyən və süd verən inəyi tap.",
        "instructionEn": "Find the cow that says 'Moo' and gives milk.",
        "instructionRu": "Найди корову, которая мычит «Му» и дает молоко.",
        "type": "select",
        "question": "Bizə dadlı və faydalı süd verən heyvan hansıdır?",
        "questionEn": "Which animal gives us sweet and healthy milk?",
        "questionRu": "Какое животное дает нам вкусное и полезное молоко?",
        "targetAudioText": "İnəyi seç.",
        "targetAudioTextEn": "Select the cow.",
        "targetAudioTextRu": "Выбери корову.",
        "options": [
          {
            "id": "an7",
            "text": "İnək",
            "textEn": "Cow",
            "textRu": "Корова",
            "emoji": "🐮",
            "isCorrect": true
          },
          {
            "id": "an8",
            "text": "At",
            "textEn": "Horse",
            "textRu": "Лошадь",
            "emoji": "🐴",
            "isCorrect": false
          },
          {
            "id": "an9",
            "text": "Qoyun",
            "textEn": "Sheep",
            "textRu": "Овечка",
            "emoji": "🐑",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! İnək ot yeyir və bizə ağ süd verir! 🐮🥛",
        "explanationEn": "Great! The cow eats grass and gives us white milk! 🐮🥛",
        "explanationRu": "Отлично! Корова ест травку и дает белое молочко! 🐮🥛"
      },
      {
        "id": "anim-rooster-4",
        "title": "Səhər Xoruzu",
        "titleEn": "Morning Rooster",
        "titleRu": "Утренний петушок",
        "instruction": "Səhər 'Quqquluquu' deyib bizi oyadan xoruzu tap.",
        "instructionEn": "Find the rooster that wakes us up with 'Cock-a-doodle-doo'.",
        "instructionRu": "Найди петушка, который будит нас «Ку-ка-ре-ку».",
        "type": "select",
        "question": "Səhərlər tezdən banlayaraq hamını yuxudan oyadan kimdir?",
        "questionEn": "Who crows early in the morning waking everyone up?",
        "questionRu": "Кто кукарекает рано утром и будит всех ото сна?",
        "targetAudioText": "Xoruzu tap.",
        "targetAudioTextEn": "Find the rooster.",
        "targetAudioTextRu": "Найди петуха.",
        "options": [
          {
            "id": "an10",
            "text": "Xoruz",
            "textEn": "Rooster",
            "textRu": "Петух",
            "emoji": "🐓",
            "isCorrect": true
          },
          {
            "id": "an11",
            "text": "Ördək",
            "textEn": "Duck",
            "textRu": "Утка",
            "emoji": "🦆",
            "isCorrect": false
          },
          {
            "id": "an12",
            "text": "Bayquş",
            "textEn": "Owl",
            "textRu": "Сова",
            "emoji": "🦉",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Xoruz uca səslə banlayır və səhəri salamlayır! 🐓",
        "explanationEn": "Super! The rooster crows loudly welcoming the morning! 🐓",
        "explanationRu": "Супер! Петушок громко кукарекает и встречает утро! 🐓"
      },
      {
        "id": "anim-bear-5",
        "title": "Meşə Ayısı",
        "titleEn": "Forest Bear",
        "titleRu": "Лесной медведь",
        "lesson": {
          "id": "anim-lesson-wild",
          "conceptTitleAz": "Meşə Heyvanlarını Öyrənək!",
          "conceptTitleEn": "Let's Learn Wild Animals!",
          "conceptTitleRu": "Учим Диких Лесных Животных!",
          "explanationAz": "Ayı nəhəngdir və şirin balı sevir (🐻🍯). Cəld dovşan yerkökü yeyir və uzun qulaqları var (🐰🥕)!",
          "explanationEn": "The bear is huge and loves sweet honey (🐻🍯). The swift bunny eats carrots and has long ears (🐰🥕)!",
          "explanationRu": "Медведь огромный и очень любит мед (🐻🍯). А быстрый зайчик грызет морковку и имеет длинные ушки (🐰🥕)!",
          "bigEmojis": [
            "🐻",
            "🦊",
            "🐰",
            "🦁"
          ],
          "audioTextAz": "Ayı bal sevir, dovşan yerkökü sevir.",
          "audioTextEn": "The bear loves honey, the bunny loves carrots.",
          "audioTextRu": "Медведь любит мед, зайчик любит морковку."
        },
        "instruction": "Şirin balı çox sevən qəhvəyi ayını seç.",
        "instructionEn": "Select the brown bear that loves sweet honey.",
        "instructionRu": "Выбери бурого медведя, который любит сладкий мед.",
        "type": "select",
        "question": "Balı çox sevən qəhvəyi nəhəng meşə heyvanı hansıdır?",
        "questionEn": "Which huge brown forest animal loves honey?",
        "questionRu": "Какое огромное бурое лесное животное любит мед?",
        "targetAudioText": "Ayını tap.",
        "targetAudioTextEn": "Find the bear.",
        "targetAudioTextRu": "Найди медведя.",
        "options": [
          {
            "id": "an13",
            "text": "Ayı",
            "textEn": "Bear",
            "textRu": "Медведь",
            "emoji": "🐻",
            "isCorrect": true
          },
          {
            "id": "an14",
            "text": "Dovşan",
            "textEn": "Bunny",
            "textRu": "Заяц",
            "emoji": "🐰",
            "isCorrect": false
          },
          {
            "id": "an15",
            "text": "Tülkü",
            "textEn": "Fox",
            "textRu": "Лиса",
            "emoji": "🦊",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Ayı meşədə gəzir və şirin bal yeyir! 🐻🍯",
        "explanationEn": "Well done! The bear roams the forest eating sweet honey! 🐻🍯",
        "explanationRu": "Молодец! Медведь гуляет по лесу и ест сладкий медок! 🐻🍯"
      },
      {
        "id": "anim-rabbit-6",
        "title": "Uzunqulaq Dovşan",
        "titleEn": "Long-Eared Bunny",
        "titleRu": "Длинноухий зайчик",
        "instruction": "Uzun qulaqları olan cəld dovşanı tap.",
        "instructionEn": "Find the swift bunny with long ears.",
        "instructionRu": "Найди шустрого зайчика с длинными ушками.",
        "type": "select",
        "question": "Yerkökü sevən və uzun qulaqları olan cəld heyvan hansıdır?",
        "questionEn": "Which swift animal loves carrots and has long ears?",
        "questionRu": "Какое быстрое животное любит морковку и имеет длинные ушки?",
        "targetAudioText": "Dovşanı seç.",
        "targetAudioTextEn": "Select the bunny.",
        "targetAudioTextRu": "Выбери зайчика.",
        "options": [
          {
            "id": "an16",
            "text": "Dovşan",
            "textEn": "Bunny",
            "textRu": "Заяц",
            "emoji": "🐰",
            "isCorrect": true
          },
          {
            "id": "an17",
            "text": "Tısbağa",
            "textEn": "Turtle",
            "textRu": "Черепаха",
            "emoji": "🐢",
            "isCorrect": false
          },
          {
            "id": "an18",
            "text": "Tülkü",
            "textEn": "Fox",
            "textRu": "Лиса",
            "emoji": "🦊",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Ağ dovşan qulaqlarını şəkləyib tullanır! 🐰🥕",
        "explanationEn": "Great! The bunny wiggles its ears and hops! 🐰🥕",
        "explanationRu": "Отлично! Белый зайчик шевелит ушками и прыгает! 🐰🥕"
      }
    ]
  },
  {
    "id": "fruits-vegetables",
    "slug": "meyve-terevez",
    "titleAz": "Meyvə və tərəvəzlər",
    "titleEn": "Fruits & Vegetables",
    "titleRu": "Фрукты и Овощи",
    "descriptionAz": "Alma, armud, banan, portağal, pomidor, xiyar, kök.",
    "emoji": "🍎",
    "group": "foundations",
    "minAge": 2,
    "maxAge": 6,
    "color": "from-red-500 to-amber-400",
    "activities": [
      {
        "id": "fruit-banana-1",
        "title": "Şirin Banan",
        "titleEn": "Sweet Banana",
        "titleRu": "Сладкий банан",
        "lesson": {
          "id": "fruit-lesson-fruits",
          "conceptTitleAz": "Şirin Meyvələri Öyrənək!",
          "conceptTitleEn": "Let's Learn Sweet Fruits!",
          "conceptTitleRu": "Учим Сладкие Фрукты!",
          "explanationAz": "Meyvələr ağaclarda və kollarda bitir, çox şirin və vitaminlidir! Banan sarıdır (🍌), alma qırmızıdır (🍎), çiyələk isə ətirlidir (🍓)!",
          "explanationEn": "Fruits grow on trees and bushes, they are sweet and full of vitamins! Bananas are yellow (🍌), apples are red (🍎), and strawberries are fragrant (🍓)!",
          "explanationRu": "Фрукты растут на деревьях и кустах, они сладкие и полезные! Банан желтый (🍌), яблоко красное (🍎), а клубника ароматная (🍓)!",
          "bigEmojis": [
            "🍎",
            "🍌",
            "🍓",
            "🍊"
          ],
          "audioTextAz": "Meyvələr şirin və faydalıdır. Banan sarı, alma qırmızıdır.",
          "audioTextEn": "Fruits are sweet and healthy. Banana is yellow, apple is red.",
          "audioTextRu": "Фрукты сладкие и полезные. Банан желтый, яблоко красное."
        },
        "instruction": "Meymunların çox sevdiyi sarı bananı seç.",
        "instructionEn": "Select the yellow banana that monkeys love so much.",
        "instructionRu": "Выбери желтый банан, который так любят обезьянки.",
        "type": "select",
        "question": "Sarı rəngli, qabığı soyulan ləzzətli meyvə hansıdır?",
        "questionEn": "Which delicious yellow fruit can be peeled?",
        "questionRu": "Какой вкусный желтый фрукт легко чистится?",
        "targetAudioText": "Bananı tap.",
        "targetAudioTextEn": "Find the banana.",
        "targetAudioTextRu": "Найди банан.",
        "options": [
          {
            "id": "fv1",
            "text": "Banan",
            "textEn": "Banana",
            "textRu": "Банан",
            "emoji": "🍌",
            "isCorrect": true
          },
          {
            "id": "fv2",
            "text": "Kartof",
            "textEn": "Potato",
            "textRu": "Картошка",
            "emoji": "🥔",
            "isCorrect": false
          },
          {
            "id": "fv3",
            "text": "Xiyar",
            "textEn": "Cucumber",
            "textRu": "Огурец",
            "emoji": "🥒",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Banan şirin və çox faydalı meyvədir! 🍌",
        "explanationEn": "Well done! Banana is sweet and full of vitamins! 🍌",
        "explanationRu": "Молодец! Банан сладкий и очень полезный фрукт! 🍌"
      },
      {
        "id": "fruit-apple-2",
        "title": "Qırmızı Alma",
        "titleEn": "Red Apple",
        "titleRu": "Красное яблоко",
        "instruction": "Ağacda bitən qırmızı almanı tap.",
        "instructionEn": "Find the red apple growing on the tree.",
        "instructionRu": "Найди красное яблоко, растущее на дереве.",
        "type": "select",
        "question": "Ağacda yetişən şirin qırmızı meyvə hansıdır?",
        "questionEn": "Which sweet red fruit grows on a tree?",
        "questionRu": "Какой сладкий красный фрукт растет на дереве?",
        "targetAudioText": "Almanı seç.",
        "targetAudioTextEn": "Select the apple.",
        "targetAudioTextRu": "Выбери яблоко.",
        "options": [
          {
            "id": "fv4",
            "text": "Alma",
            "textEn": "Apple",
            "textRu": "Яблоко",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "fv5",
            "text": "Soğan",
            "textEn": "Onion",
            "textRu": "Лук",
            "emoji": "🧅",
            "isCorrect": false
          },
          {
            "id": "fv6",
            "text": "Badımcan",
            "textEn": "Eggplant",
            "textRu": "Баклажан",
            "emoji": "🍆",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Alma hər gün yeyiləndə sağlamlıq gətirir! 🍎",
        "explanationEn": "Correct! An apple a day brings health! 🍎",
        "explanationRu": "Правильно! Яблоко в день приносит здоровье! 🍎"
      },
      {
        "id": "veg-carrot-3",
        "title": "Narıncı Yerkökü",
        "titleEn": "Orange Carrot",
        "titleRu": "Оранжевая морковка",
        "lesson": {
          "id": "fruit-lesson-veg",
          "conceptTitleAz": "Faydalı Tərəvəzləri Öyrənək!",
          "conceptTitleEn": "Let's Learn Healthy Vegetables!",
          "conceptTitleRu": "Учим Полезные Овощи!",
          "explanationAz": "Tərəvəzlər bostanda və torpaqda bitir. Yerkökü narıncıdır və gözlərimizə çox xeyirlidir (🥕). Qırmızı pomidor və yaşıl xiyar dadlı salat üçündür (🍅🥒)!",
          "explanationEn": "Vegetables grow in gardens and soil. Carrots are orange and great for our eyes (🥕). Red tomatoes and green cucumbers make yummy salads (🍅🥒)!",
          "explanationRu": "Овощи растут на грядках и в земле. Морковка оранжевая и очень полезна для глаз (🥕). Красный помидор и зеленый огурец идут в салат (🍅🥒)!",
          "bigEmojis": [
            "🥕",
            "🍅",
            "🥒",
            "🥦"
          ],
          "audioTextAz": "Yerkökü narıncıdır və gözlərə xeyirlidir. Pomidordan salat edirik.",
          "audioTextEn": "Carrots are orange and good for eyes. Tomatoes make great salad.",
          "audioTextRu": "Морковь оранжевая и полезна для глаз. Из помидора делаем салат."
        },
        "instruction": "Dovşanların sevdiyi narıncı yerkökünü tap.",
        "instructionEn": "Find the orange carrot that bunnies love.",
        "instructionRu": "Найди оранжевую морковку, которую любят зайчики.",
        "type": "select",
        "question": "Torpaqda bitən və gözlərimizə çox faydalı olan narıncı tərəvəz hansıdır?",
        "questionEn": "Which orange vegetable grows underground and is great for eyesight?",
        "questionRu": "Какой оранжевый овощ растет в земле и очень полезен для зрения?",
        "targetAudioText": "Yerkökünü seç.",
        "targetAudioTextEn": "Select the carrot.",
        "targetAudioTextRu": "Выбери морковку.",
        "options": [
          {
            "id": "fv7",
            "text": "Yerkökü",
            "textEn": "Carrot",
            "textRu": "Морковь",
            "emoji": "🥕",
            "isCorrect": true
          },
          {
            "id": "fv8",
            "text": "Limon",
            "textEn": "Lemon",
            "textRu": "Лимон",
            "emoji": "🍋",
            "isCorrect": false
          },
          {
            "id": "fv9",
            "text": "Üzüm",
            "textEn": "Grape",
            "textRu": "Виноград",
            "emoji": "🍇",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Yerkökü xırt-xırt səs edir və gözlərimizi qüvvətləndirir! 🥕",
        "explanationEn": "Great! Carrots are crunchy and strengthen our eyes! 🥕",
        "explanationRu": "Отлично! Морковка приятно хрустит и укрепляет зрение! 🥕"
      },
      {
        "id": "veg-tomato-4",
        "title": "Şirəli Qırmızı Pomidor",
        "titleEn": "Juicy Red Tomato",
        "titleRu": "Сочный красный помидор",
        "instruction": "Salat üçün qırmızı pomidoru seç.",
        "instructionEn": "Select the red tomato for salad.",
        "instructionRu": "Выбери красный помидор для салата.",
        "type": "select",
        "question": "Salat etdiyimiz qırmızı və dadlı tərəvəz hansıdır?",
        "questionEn": "Which red and tasty vegetable do we make salad with?",
        "questionRu": "Какой красный и вкусный овощ мы добавляем в салат?",
        "targetAudioText": "Pomidoru tap.",
        "targetAudioTextEn": "Find the tomato.",
        "targetAudioTextRu": "Найди помидор.",
        "options": [
          {
            "id": "fv10",
            "text": "Pomidor",
            "textEn": "Tomato",
            "textRu": "Помидор",
            "emoji": "🍅",
            "isCorrect": true
          },
          {
            "id": "fv11",
            "text": "Alma",
            "textEn": "Apple",
            "textRu": "Яблоко",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "fv12",
            "text": "Portağal",
            "textEn": "Orange",
            "textRu": "Апельсин",
            "emoji": "🍊",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Pomidor salatın ən dadlı tərəvəzidir! 🍅",
        "explanationEn": "Well done! Tomatoes make the best salads! 🍅",
        "explanationRu": "Молодец! Помидор — самый вкусный овощ в салате! 🍅"
      },
      {
        "id": "veg-cucumber-5",
        "title": "Yaşıl Təzə Xiyar",
        "titleEn": "Fresh Green Cucumber",
        "titleRu": "Свежий зеленый огурец",
        "instruction": "Təravətli yaşıl xiyarı göstər.",
        "instructionEn": "Point to the fresh green cucumber.",
        "instructionRu": "Покажи свежий зеленый огурец.",
        "type": "select",
        "question": "Yaşıl rəngli, xırtıldayan təzə tərəvəz hansıdır?",
        "questionEn": "Which fresh crunchy vegetable is green?",
        "questionRu": "Какой свежий хрустящий овощ зеленого цвета?",
        "targetAudioText": "Xiyarı tap.",
        "targetAudioTextEn": "Find the cucumber.",
        "targetAudioTextRu": "Найди огурец.",
        "options": [
          {
            "id": "fv13",
            "text": "Xiyar",
            "textEn": "Cucumber",
            "textRu": "Огурец",
            "emoji": "🥒",
            "isCorrect": true
          },
          {
            "id": "fv14",
            "text": "Banan",
            "textEn": "Banana",
            "textRu": "Банан",
            "emoji": "🍌",
            "isCorrect": false
          },
          {
            "id": "fv15",
            "text": "Çiyələk",
            "textEn": "Strawberry",
            "textRu": "Клубника",
            "emoji": "🍓",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Yaşıl xiyar çox təravətlidir! 🥒",
        "explanationEn": "Super! Green cucumbers are so refreshing! 🥒",
        "explanationRu": "Супер! Зеленый огурец очень освежает! 🥒"
      }
    ]
  },
  {
    "id": "transport",
    "slug": "neqliyyat",
    "titleAz": "Nəqliyyat vasitələri",
    "titleEn": "Vehicles & Transport",
    "titleRu": "Транспортные средства",
    "descriptionAz": "Maşın, avtobus, qatar, təyyarə, gəmi, velosiped.",
    "emoji": "🚗",
    "group": "foundations",
    "minAge": 2,
    "maxAge": 6,
    "color": "from-blue-600 to-indigo-400",
    "activities": [
      {
        "id": "trans-airplane-1",
        "title": "Göyün Qartalı: Təyyarə",
        "titleEn": "Sky Eagle: Airplane",
        "titleRu": "Орел неба: Самолет",
        "lesson": {
          "id": "trans-lesson-air-land",
          "conceptTitleAz": "Quru və Hava Nəqliyyatını Öyrənək!",
          "conceptTitleEn": "Let's Learn Air and Land Transport!",
          "conceptTitleRu": "Учим Воздушный и Наземный Транспорт!",
          "explanationAz": "Təyyarə göy üzündə quş kimi uçur (✈️). Maşın və avtobus yolda təkərləri ilə gedir (🚗🚌). Qatar isə relslər üstündə şütüyür (🚂)!",
          "explanationEn": "Airplanes fly high like birds in the sky (✈️). Cars and buses drive on roads with wheels (🚗🚌). Trains speed along railway tracks (🚂)!",
          "explanationRu": "Самолет летает высоко в небе как птица (✈️). Машины и автобусы едут по дорогам на колесах (🚗🚌). А поезд мчится по рельсам (🚂)!",
          "bigEmojis": [
            "✈️",
            "🚗",
            "🚌",
            "🚂"
          ],
          "audioTextAz": "Təyyarə göydə uçur, maşın yolda gedir, qatar relsdə gedir.",
          "audioTextEn": "Airplanes fly in the sky, cars drive on roads, trains run on tracks.",
          "audioTextRu": "Самолет летает в небе, машина едет по дороге, поезд — по рельсам."
        },
        "instruction": "Göydə buludların arasında uçan təyyarəni seç.",
        "instructionEn": "Select the airplane flying among the clouds.",
        "instructionRu": "Выбери самолет, летящий среди облаков.",
        "type": "select",
        "question": "Göy üzündə ən yüksəkdə uçan nəqliyyat vasitəsi hansıdır?",
        "questionEn": "Which transport vehicle flies highest in the sky?",
        "questionRu": "Какой транспорт летает выше всех в небе?",
        "targetAudioText": "Təyyarəni seç.",
        "targetAudioTextEn": "Select the airplane.",
        "targetAudioTextRu": "Выбери самолет.",
        "options": [
          {
            "id": "tr1",
            "text": "Təyyarə",
            "textEn": "Airplane",
            "textRu": "Самолет",
            "emoji": "✈️",
            "isCorrect": true
          },
          {
            "id": "tr2",
            "text": "Avtomobil",
            "textEn": "Car",
            "textRu": "Автомобиль",
            "emoji": "🚗",
            "isCorrect": false
          },
          {
            "id": "tr3",
            "text": "Gəmi",
            "textEn": "Ship",
            "textRu": "Корабль",
            "emoji": "🚢",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Təyyarə bizi uzaq ölkələrə tez çatdırır! ✈️",
        "explanationEn": "Well done! Airplanes take us to distant lands quickly! ✈️",
        "explanationRu": "Молодец! Самолет быстро доставляет нас в далекие страны! ✈️"
      },
      {
        "id": "trans-train-2",
        "title": "Çu-çu Deyən Qatar",
        "titleEn": "Choo-Choo Train",
        "titleRu": "Поезд Чу-чу",
        "instruction": "Relslər üzərində gedən qatarı tap.",
        "instructionEn": "Find the train running on railway tracks.",
        "instructionRu": "Найди поезд, который едет по рельсам.",
        "type": "select",
        "question": "Relslər üzərində gedən və 'Çu-çu' səsi çıxaran nəqliyyat hansıdır?",
        "questionEn": "Which transport runs on tracks and makes a 'Choo-choo' sound?",
        "questionRu": "Какой транспорт едет по рельсам и говорит «Чу-чу»?",
        "targetAudioText": "Qatarı tap.",
        "targetAudioTextEn": "Find the train.",
        "targetAudioTextRu": "Найди поезд.",
        "options": [
          {
            "id": "tr4",
            "text": "Qatar",
            "textEn": "Train",
            "textRu": "Поезд",
            "emoji": "🚂",
            "isCorrect": true
          },
          {
            "id": "tr5",
            "text": "Velosiped",
            "textEn": "Bicycle",
            "textRu": "Велосипед",
            "emoji": "🚲",
            "isCorrect": false
          },
          {
            "id": "tr6",
            "text": "Qayıq",
            "textEn": "Boat",
            "textRu": "Лодка",
            "emoji": "⛵",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Qatar vaqonları arxasınca çəkib aparır! 🚂",
        "explanationEn": "Correct! The train pulls many wagons behind it! 🚂",
        "explanationRu": "Правильно! Поезд тянет за собой много вагонов! 🚂"
      },
      {
        "id": "trans-bus-3",
        "title": "Böyük Şəhər Avtobusu",
        "titleEn": "City Bus",
        "titleRu": "Городской автобус",
        "instruction": "Çoxlu sərnişin daşıyan avtobusu seç.",
        "instructionEn": "Select the bus carrying many passengers.",
        "instructionRu": "Выбери автобус, везущий много пассажиров.",
        "type": "select",
        "question": "Şəhərdə məktəbə və bağçaya çoxlu insan aparan böyük nəqliyyat hansıdır?",
        "questionEn": "Which large vehicle takes many people to school and kindergarten?",
        "questionRu": "Какой большой транспорт везет много людей в школу и садик?",
        "targetAudioText": "Avtobusu seç.",
        "targetAudioTextEn": "Select the bus.",
        "targetAudioTextRu": "Выбери автобус.",
        "options": [
          {
            "id": "tr7",
            "text": "Avtobus",
            "textEn": "Bus",
            "textRu": "Автобус",
            "emoji": "🚌",
            "isCorrect": true
          },
          {
            "id": "tr8",
            "text": "Skuter",
            "textEn": "Scooter",
            "textRu": "Самокат",
            "emoji": "🛴",
            "isCorrect": false
          },
          {
            "id": "tr9",
            "text": "Taksi",
            "textEn": "Taxi",
            "textRu": "Такси",
            "emoji": "🚕",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Avtobusda çoxlu oturacaqlar var və o hamını aparır! 🚌",
        "explanationEn": "Great! The bus has lots of seats and carries everyone! 🚌",
        "explanationRu": "Отлично! В автобусе много мест, и он везет всех вместе! 🚌"
      },
      {
        "id": "trans-ship-4",
        "title": "Nəhəng Dəniz Gəmisi",
        "titleEn": "Giant Ocean Ship",
        "titleRu": "Огромный морской корабль",
        "lesson": {
          "id": "trans-lesson-sea",
          "conceptTitleAz": "Su Nəqliyyatı və Velosipedləri Öyrənək!",
          "conceptTitleEn": "Let's Learn Sea Transport and Bicycles!",
          "conceptTitleRu": "Учим Водный Транспорт и Велосипед!",
          "explanationAz": "Gəmi dənizlərdə və mavi dalğalarda üzür (🚢🌊). Velosiped isə iki təkərli, pedallı və çox sağlam nəqliyyatdır (🚲)!",
          "explanationEn": "Ships sail on seas and blue ocean waves (🚢🌊). Bicycles have two wheels and pedals, great for health (🚲)!",
          "explanationRu": "Корабль плывет по морям и синим волнам (🚢🌊). А велосипед — двухколесный транспорт с педалями (🚲)!",
          "bigEmojis": [
            "🚢",
            "⛵",
            "🚲",
            "🛴"
          ],
          "audioTextAz": "Gəmi dənizdə üzür, velosipedi pedalla sürürük.",
          "audioTextEn": "Ships sail on water, bicycles are powered by pedals.",
          "audioTextRu": "Корабль плывет по воде, велосипед крутим педалями."
        },
        "instruction": "Dənizdə üzən nəhəng gəmini tap.",
        "instructionEn": "Find the giant ship sailing in the sea.",
        "instructionRu": "Найди огромный корабль, плывущий по морю.",
        "type": "select",
        "question": "Dənizlərdə və okeanlarda üzən nəhəng nəqliyyat hansıdır?",
        "questionEn": "Which huge transport sails on seas and oceans?",
        "questionRu": "Какой огромный транспорт плывет по морям и океанам?",
        "targetAudioText": "Gəmini seç.",
        "targetAudioTextEn": "Select the ship.",
        "targetAudioTextRu": "Выбери корабль.",
        "options": [
          {
            "id": "tr10",
            "text": "Gəmi",
            "textEn": "Ship",
            "textRu": "Корабль",
            "emoji": "🚢",
            "isCorrect": true
          },
          {
            "id": "tr11",
            "text": "Təyyarə",
            "textEn": "Airplane",
            "textRu": "Самолет",
            "emoji": "✈️",
            "isCorrect": false
          },
          {
            "id": "tr12",
            "text": "Maşın",
            "textEn": "Car",
            "textRu": "Машина",
            "emoji": "🚗",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Gəmi böyük dalğaları yararaq suda üzür! 🚢🌊",
        "explanationEn": "Super! The ship glides smoothly over ocean waves! 🚢🌊",
        "explanationRu": "Супер! Корабль рассекает волны и плывет по воде! 🚢🌊"
      },
      {
        "id": "trans-bike-5",
        "title": "İki Təkərli Velosiped",
        "titleEn": "Two-Wheeled Bicycle",
        "titleRu": "Двухколесный велосипед",
        "instruction": "Pedallarını fırladaraq sürdüyümüz velosipedi tap.",
        "instructionEn": "Find the bicycle we pedal to ride.",
        "instructionRu": "Найди велосипед, педали которого мы крутим.",
        "type": "select",
        "question": "Parkda pedallarını fırladaraq gəzdiyimiz iki təkərli nəqliyyat hansıdır?",
        "questionEn": "Which two-wheeled vehicle do we pedal around the park?",
        "questionRu": "На каком двухколесном транспорте мы крутим педали в парке?",
        "targetAudioText": "Velosipedi seç.",
        "targetAudioTextEn": "Select the bicycle.",
        "targetAudioTextRu": "Выбери велосипед.",
        "options": [
          {
            "id": "tr13",
            "text": "Velosiped",
            "textEn": "Bicycle",
            "textRu": "Велосипед",
            "emoji": "🚲",
            "isCorrect": true
          },
          {
            "id": "tr14",
            "text": "Qayıq",
            "textEn": "Boat",
            "textRu": "Лодка",
            "emoji": "⛵",
            "isCorrect": false
          },
          {
            "id": "tr15",
            "text": "Avtomobil",
            "textEn": "Car",
            "textRu": "Машина",
            "emoji": "🚗",
            "isCorrect": false
          }
        ],
        "explanation": "Bəli! Velosiped sürmək həm əyləncəli, həm də çox faydalıdır! 🚲",
        "explanationEn": "Yes! Riding a bicycle is both fun and very healthy! 🚲",
        "explanationRu": "Да! Кататься на велосипеде весело и очень полезно! 🚲"
      }
    ]
  },
  {
    "id": "professions",
    "slug": "peseler",
    "titleAz": "Peşələr",
    "titleEn": "Professions & Helpers",
    "titleRu": "Профессии",
    "descriptionAz": "Həkim, müəllim, yanğınsöndürən, polis, aşpaz, sürücü.",
    "emoji": "🧑‍🚒",
    "group": "foundations",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-teal-600 to-cyan-500",
    "activities": [
      {
        "id": "prof-doctor-1",
        "title": "Şəfqətli Həkim",
        "titleEn": "Caring Doctor",
        "titleRu": "Заботливый доктор",
        "lesson": {
          "id": "prof-lesson-helpers",
          "conceptTitleAz": "Kömək Edən Peşələri Öyrənək!",
          "conceptTitleEn": "Let's Learn Helping Professions!",
          "conceptTitleRu": "Учим Профессии-Помощники!",
          "explanationAz": "Həkim xəstələri müalicə edir və sağlamlıq bəxş edir (👨‍⚕️). Yanğınsöndürən alovları söndürür və insanları xilas edir (👩‍🚒). Polis isə təhlükəsizliyimizi qoruyur (👮‍♂️)!",
          "explanationEn": "Doctors treat illnesses and restore our health (👨‍⚕️). Firefighters put out fires and save lives (👩‍🚒). Police officers ensure our safety (👮‍♂️)!",
          "explanationRu": "Доктор лечит больных и помогает выздороветь (👨‍⚕️). Пожарный тушит огонь и спасает людей (👩‍🚒). Полицейский бережет наш покой (👮‍♂️)!",
          "bigEmojis": [
            "👨‍⚕️",
            "👩‍🚒",
            "👮‍♂️",
            "🚑"
          ],
          "audioTextAz": "Həkim bizi sağaldır, yanğınsöndürən yanğını söndürür.",
          "audioTextEn": "Doctors heal us, firefighters put out fires.",
          "audioTextRu": "Доктор лечит нас, пожарный тушит огонь."
        },
        "instruction": "Xəstələndikdə bizi müalicə edən həkimi seç.",
        "instructionEn": "Select the doctor who heals us when we are sick.",
        "instructionRu": "Выбери врача, который лечит нас, когда мы болеем.",
        "type": "select",
        "question": "Qızdırmamız qalxanda bizi müalicə edib sağaldan kimdir?",
        "questionEn": "Who treats and heals us when we have a fever?",
        "questionRu": "Кто лечит нас и помогает выздороветь при температуре?",
        "targetAudioText": "Həkimi seç.",
        "targetAudioTextEn": "Select the doctor.",
        "targetAudioTextRu": "Выбери доктора.",
        "options": [
          {
            "id": "pr1",
            "text": "Həkim",
            "textEn": "Doctor",
            "textRu": "Врач",
            "emoji": "👨‍⚕️",
            "isCorrect": true
          },
          {
            "id": "pr2",
            "text": "Aşpaz",
            "textEn": "Chef",
            "textRu": "Повар",
            "emoji": "👨‍🍳",
            "isCorrect": false
          },
          {
            "id": "pr3",
            "text": "Rəssam",
            "textEn": "Artist",
            "textRu": "Художник",
            "emoji": "🎨",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Həkim bizə şəfa verir və vitaminlər yazır! 👨‍⚕️",
        "explanationEn": "Well done! Doctors heal us and prescribe vitamins! 👨‍⚕️",
        "explanationRu": "Молодец! Врач лечит нас и выписывает витамины! 👨‍⚕️"
      },
      {
        "id": "prof-fire-2",
        "title": "Cəsur Yanğınsöndürən",
        "titleEn": "Brave Firefighter",
        "titleRu": "Храбрый пожарный",
        "instruction": "Yanğını söndürən qəhrəmanı tap.",
        "instructionEn": "Find the hero who puts out fires.",
        "instructionRu": "Найди героя, который тушит пожары.",
        "type": "select",
        "question": "Qırmızı maşınla gəlib yanğını su ilə söndürən kimdir?",
        "questionEn": "Who arrives in a red truck and puts out fires with water?",
        "questionRu": "Кто приезжает на красной машине и тушит огонь водой?",
        "targetAudioText": "Yanğınsöndürəni tap.",
        "targetAudioTextEn": "Find the firefighter.",
        "targetAudioTextRu": "Найди пожарного.",
        "options": [
          {
            "id": "pr4",
            "text": "Yanğınsöndürən",
            "textEn": "Firefighter",
            "textRu": "Пожарный",
            "emoji": "👩‍🚒",
            "isCorrect": true
          },
          {
            "id": "pr5",
            "text": "Müəllim",
            "textEn": "Teacher",
            "textRu": "Учитель",
            "emoji": "👩‍🏫",
            "isCorrect": false
          },
          {
            "id": "pr6",
            "text": "Pilot",
            "textEn": "Pilot",
            "textRu": "Пилот",
            "emoji": "👨‍✈️",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Yanğınsöndürən böyük cəsarətlə insanları qoruyur! 👩‍🚒",
        "explanationEn": "Correct! Firefighters bravely protect people! 👩‍🚒",
        "explanationRu": "Правильно! Пожарные смело защищают людей! 👩‍🚒"
      },
      {
        "id": "prof-police-3",
        "title": "Qayda Qoruyan Polis",
        "titleEn": "Protective Police",
        "titleRu": "Блюститель порядка Полицейский",
        "instruction": "Təhlükəsizliyimizi təmin edən polisi seç.",
        "instructionEn": "Select the police officer who keeps us safe.",
        "instructionRu": "Выбери полицейского, который защищает порядок.",
        "type": "select",
        "question": "Yollarda və küçələrdə qayda-qanunu kim qoruyur?",
        "questionEn": "Who maintains law and order on streets and roads?",
        "questionRu": "Кто следит за порядком на улицах и дорогах?",
        "targetAudioText": "Polisi seç.",
        "targetAudioTextEn": "Select the police officer.",
        "targetAudioTextRu": "Выбери полицейского.",
        "options": [
          {
            "id": "pr7",
            "text": "Polis",
            "textEn": "Police Officer",
            "textRu": "Полицейский",
            "emoji": "👮‍♂️",
            "isCorrect": true
          },
          {
            "id": "pr8",
            "text": "Fermer",
            "textEn": "Farmer",
            "textRu": "Фермер",
            "emoji": "🧑‍🌾",
            "isCorrect": false
          },
          {
            "id": "pr9",
            "text": "Kosmonavt",
            "textEn": "Astronaut",
            "textRu": "Космонавт",
            "emoji": "👨‍🚀",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Polis gecə-gündüz bizim rahatlığımızı qoruyur! 👮‍♂️",
        "explanationEn": "Great! Police protect our peace day and night! 👮‍♂️",
        "explanationRu": "Отлично! Полиция бережет наш покой днем и ночью! 👮‍♂️"
      },
      {
        "id": "prof-teacher-4",
        "title": "Mehriban Müəllim",
        "titleEn": "Kind Teacher",
        "titleRu": "Добрая учительница",
        "lesson": {
          "id": "prof-lesson-creative",
          "conceptTitleAz": "Öyrədən və Bişirən Peşələri Öyrənək!",
          "conceptTitleEn": "Let's Learn Teaching and Cooking Professions!",
          "conceptTitleRu": "Учим Профессии Учителя и Повара!",
          "explanationAz": "Müəllim uşaqlara oxumağı, yazmağı və xeyirxah olmağı öyrədir (👩‍🏫). Aşpaz isə mətbəxdə dadlı yeməklər və şirniyyatlar hazırlayır (👨‍🍳)!",
          "explanationEn": "Teachers guide children to read, write, and be kind (👩‍🏫). Chefs prepare mouthwatering dishes and treats in the kitchen (👨‍🍳)!",
          "explanationRu": "Учитель учит детей читать, писать и дружить (👩‍🏫). А повар готовит вкусные блюда и сладости на кухне (👨‍🍳)!",
          "bigEmojis": [
            "👩‍🏫",
            "👨‍🍳",
            "👨‍✈️",
            "🎨"
          ],
          "audioTextAz": "Müəllim bizə dərs öyrədir, aşpaz dadlı yemək bişirir.",
          "audioTextEn": "Teachers teach us lessons, chefs cook tasty food.",
          "audioTextRu": "Учитель учит нас урокам, повар готовит вкусную еду."
        },
        "instruction": "Məktəbdə uşaqlara bilik öyrədən müəllimi tap.",
        "instructionEn": "Find the teacher who imparts knowledge in school.",
        "instructionRu": "Найди учительницу, которая учит детей в школе.",
        "type": "select",
        "question": "Məktəbdə kitab oxumağı və yazmağı bizə kim öyrədir?",
        "questionEn": "Who teaches us reading and writing at school?",
        "questionRu": "Кто учит нас читать и писать в школе?",
        "targetAudioText": "Müəllimi tap.",
        "targetAudioTextEn": "Find the teacher.",
        "targetAudioTextRu": "Найди учителя.",
        "options": [
          {
            "id": "pr10",
            "text": "Müəllim",
            "textEn": "Teacher",
            "textRu": "Учитель",
            "emoji": "👩‍🏫",
            "isCorrect": true
          },
          {
            "id": "pr11",
            "text": "Kosmonavt",
            "textEn": "Astronaut",
            "textRu": "Космонавт",
            "emoji": "👨‍🚀",
            "isCorrect": false
          },
          {
            "id": "pr12",
            "text": "Sürücü",
            "textEn": "Driver",
            "textRu": "Водитель",
            "emoji": "🚗",
            "isCorrect": false
          }
        ],
        "explanation": "Bəli! Müəllim hər kəsə bilik və tərbiyə aşılayır! 👩‍🏫",
        "explanationEn": "Yes! Teachers inspire knowledge and kindness! 👩‍🏫",
        "explanationRu": "Да! Учитель дарит знания и воспитывает доброту! 👩‍🏫"
      },
      {
        "id": "prof-chef-5",
        "title": "Usta Aşpaz",
        "titleEn": "Master Chef",
        "titleRu": "Мастер-повар",
        "instruction": "Dadlı yeməklər bişirən aşpazı seç.",
        "instructionEn": "Select the chef who cooks delicious meals.",
        "instructionRu": "Выбери повара, который готовит вкусные блюда.",
        "type": "select",
        "question": "Ağ papaq qoyub mətbəxdə dadlı şorba bişirən kimdir?",
        "questionEn": "Who wears a white hat and cooks tasty soup in the kitchen?",
        "questionRu": "Кто носит белый колпак и варит вкусный суп на кухне?",
        "targetAudioText": "Aşpazı seç.",
        "targetAudioTextEn": "Select the chef.",
        "targetAudioTextRu": "Выбери повара.",
        "options": [
          {
            "id": "pr13",
            "text": "Aşpaz",
            "textEn": "Chef",
            "textRu": "Повар",
            "emoji": "👨‍🍳",
            "isCorrect": true
          },
          {
            "id": "pr14",
            "text": "Dərzi",
            "textEn": "Tailor",
            "textRu": "Портной",
            "emoji": "🧵",
            "isCorrect": false
          },
          {
            "id": "pr15",
            "text": "Rəssam",
            "textEn": "Painter",
            "textRu": "Художник",
            "emoji": "🎨",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Aşpaz ən ləzzətli yeməkləri sevgi ilə bişirir! 👨‍🍳🍲",
        "explanationEn": "Super! Chefs cook the most delicious food with love! 👨‍🍳🍲",
        "explanationRu": "Супер! Повар с любовью готовит самые вкусные блюда! 👨‍🍳🍲"
      }
    ]
  },
  {
    "id": "family",
    "slug": "aile",
    "titleAz": "Ailə üzvləri",
    "titleEn": "Family Members",
    "titleRu": "Члены семьи",
    "descriptionAz": "Ana, ata, nənə, baba, qardaş, bacı, körpə.",
    "emoji": "👨‍👩‍👧‍👦",
    "group": "foundations",
    "minAge": 2,
    "maxAge": 5,
    "color": "from-pink-500 to-rose-400",
    "activities": [
      {
        "id": "fam-mom-1",
        "title": "Əziz Ana",
        "titleEn": "Dear Mother",
        "titleRu": "Дорогая мама",
        "lesson": {
          "id": "fam-lesson-parents",
          "conceptTitleAz": "Mehriban Valideynlərimizi Öyrənək!",
          "conceptTitleEn": "Let's Learn About Loving Parents!",
          "conceptTitleRu": "Учим Любимых Родителей!",
          "explanationAz": "Ana bizi sevgi ilə qucaqlayır və layla oxuyur (👩❤️). Ata isə ailəmizin güclü qoruyucusu və ən böyük dayağıdır (👨💪)!",
          "explanationEn": "Mother hugs us with tender love and sings sweet lullabies (👩❤️). Father is our family's strong protector and guide (👨💪)!",
          "explanationRu": "Мама обнимает с любовью и поет колыбельную (👩❤️). А папа — крепкая защита и опора семьи (👨💪)!",
          "bigEmojis": [
            "👩",
            "👨",
            "👧",
            "👦"
          ],
          "audioTextAz": "Ana bizi qucaqlayır, ata bizi qoruyur.",
          "audioTextEn": "Mother embraces us, father protects us.",
          "audioTextRu": "Мама обнимает нас, папа защищает."
        },
        "instruction": "Bizi sonsuz sevgi ilə qucaqlayan əziz anamızı seç.",
        "instructionEn": "Select our beloved mother who hugs us with endless love.",
        "instructionRu": "Выбери дорогую маму, которая обнимает нас с любовью.",
        "type": "select",
        "question": "Bizi sevgi ilə böyüdən və qucaqlayan ən əziz insan kimdir?",
        "questionEn": "Who is the dearest person that raises us with love and warmth?",
        "questionRu": "Кто самый дорогой человек, который растит нас с любовью?",
        "targetAudioText": "Ananı seç.",
        "targetAudioTextEn": "Select mother.",
        "targetAudioTextRu": "Выбери маму.",
        "options": [
          {
            "id": "fm1",
            "text": "Ana",
            "textEn": "Mother",
            "textRu": "Мама",
            "emoji": "👩",
            "isCorrect": true
          },
          {
            "id": "fm2",
            "text": "Qardaş",
            "textEn": "Brother",
            "textRu": "Брат",
            "emoji": "👦",
            "isCorrect": false
          },
          {
            "id": "fm3",
            "text": "Qonşu",
            "textEn": "Neighbor",
            "textRu": "Сосед",
            "emoji": "🧑",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Analar dünyanın ən fədakar və şəfqətli insanlarıdır! 👩❤️",
        "explanationEn": "Well done! Mothers are the most caring and devoted people! 👩❤️",
        "explanationRu": "Молодец! Мама — самый добрый и любящий человек! 👩❤️"
      },
      {
        "id": "fam-dad-2",
        "title": "Güclü Ata",
        "titleEn": "Strong Father",
        "titleRu": "Сильный папа",
        "instruction": "Ailəmizin dayağı olan atanı tap.",
        "instructionEn": "Find father, the pillar of our family.",
        "instructionRu": "Найди папу, опору нашей семьи.",
        "type": "select",
        "question": "Ailəmizi qoruyan və qayğımıza qalan güclü şəxs kimdir?",
        "questionEn": "Who is the strong protector who cares for our family?",
        "questionRu": "Кто защищает семью и заботится о нас?",
        "targetAudioText": "Atanı tap.",
        "targetAudioTextEn": "Find father.",
        "targetAudioTextRu": "Найди папу.",
        "options": [
          {
            "id": "fm4",
            "text": "Ata",
            "textEn": "Father",
            "textRu": "Папа",
            "emoji": "👨",
            "isCorrect": true
          },
          {
            "id": "fm5",
            "text": "Bacı",
            "textEn": "Sister",
            "textRu": "Сестра",
            "emoji": "👧",
            "isCorrect": false
          },
          {
            "id": "fm6",
            "text": "Körpə",
            "textEn": "Baby",
            "textRu": "Малыш",
            "emoji": "👶",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Ata bizim ən böyük qəhrəmanımızdır! 👨💪",
        "explanationEn": "Correct! Father is our greatest hero! 👨💪",
        "explanationRu": "Правильно! Папа — наш главный герой! 👨💪"
      },
      {
        "id": "fam-grandma-3",
        "title": "Şirin Nənə",
        "titleEn": "Sweet Grandmother",
        "titleRu": "Милая бабушка",
        "lesson": {
          "id": "fam-lesson-grandparents",
          "conceptTitleAz": "Nənə və Babamızı Öyrənək!",
          "conceptTitleEn": "Let's Learn Grandma and Grandpa!",
          "conceptTitleRu": "Учим Бабушку и Дедушку!",
          "explanationAz": "Ağsaçlı nənəmiz bizə maraqlı nağıllar danışır və ləzzətli piroqlar bişirir (👵). Ağsaqqal babamız isə bizi gəzintiyə aparır və nəsihət verir (👴)!",
          "explanationEn": "Grandma tells magical stories and bakes delicious treats (👵). Grandpa takes us for pleasant walks and shares wisdom (👴)!",
          "explanationRu": "Бабушка рассказывает чудесные сказки и печет пирожки (👵). А дедушка гуляет с нами и делится мудростью (👴)!",
          "bigEmojis": [
            "👵",
            "👴",
            "🏡",
            "❤️"
          ],
          "audioTextAz": "Nənə nağıl danışır, baba gəzintiyə aparır.",
          "audioTextEn": "Grandma tells tales, grandpa takes us on walks.",
          "audioTextRu": "Бабушка сказки читает, дедушка на прогулку водит."
        },
        "instruction": "Bizə şirin nağıllar söyləyən nənəni tap.",
        "instructionEn": "Find grandma who tells wonderful stories.",
        "instructionRu": "Найди бабушку, которая рассказывает сказки.",
        "type": "select",
        "question": "Bizə maraqlı nağıllar söyləyən sevimli ağsaçlı nənəmiz hansıdır?",
        "questionEn": "Which one is our beloved grandmother who narrates fairy tales?",
        "questionRu": "Какая из них любимая седовласая бабушка, читающая сказки?",
        "targetAudioText": "Nənəni seç.",
        "targetAudioTextEn": "Select grandmother.",
        "targetAudioTextRu": "Выбери бабушку.",
        "options": [
          {
            "id": "fm7",
            "text": "Nənə",
            "textEn": "Grandmother",
            "textRu": "Бабушка",
            "emoji": "👵",
            "isCorrect": true
          },
          {
            "id": "fm8",
            "text": "Körpə",
            "textEn": "Baby",
            "textRu": "Малыш",
            "emoji": "👶",
            "isCorrect": false
          },
          {
            "id": "fm9",
            "text": "Qardaş",
            "textEn": "Brother",
            "textRu": "Брат",
            "emoji": "👦",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Nənəmizin nağılları çox şirindir! 👵📖",
        "explanationEn": "Great! Grandmother's fairy tales are delightful! 👵📖",
        "explanationRu": "Отлично! Бабушкины сказки самые сладкие! 👵📖"
      },
      {
        "id": "fam-grandpa-4",
        "title": "Müdrik Baba",
        "titleEn": "Wise Grandfather",
        "titleRu": "Мудрый дедушка",
        "instruction": "Ağsaqqal mehriban babamızı tap.",
        "instructionEn": "Find our kind wise grandfather.",
        "instructionRu": "Найди нашего доброго мудрого дедушку.",
        "type": "select",
        "question": "Bizi gəzintiyə aparan və öyüd verən ağsaqqal babamız hansıdır?",
        "questionEn": "Which one is our wise grandfather who takes us on walks?",
        "questionRu": "Кто наш мудрый дедушка, который гуляет с нами в саду?",
        "targetAudioText": "Babanı tap.",
        "targetAudioTextEn": "Find grandfather.",
        "targetAudioTextRu": "Найди дедушку.",
        "options": [
          {
            "id": "fm10",
            "text": "Baba",
            "textEn": "Grandfather",
            "textRu": "Дедушка",
            "emoji": "👴",
            "isCorrect": true
          },
          {
            "id": "fm11",
            "text": "Bacı",
            "textEn": "Sister",
            "textRu": "Сестра",
            "emoji": "👧",
            "isCorrect": false
          },
          {
            "id": "fm12",
            "text": "Ana",
            "textEn": "Mother",
            "textRu": "Мама",
            "emoji": "👩",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Babamız həmişə bizə xeyirxahlıq öyrədir! 👴❤️",
        "explanationEn": "Super! Grandfather always inspires kindness! 👴❤️",
        "explanationRu": "Супер! Дедушка всегда учит доброте и заботе! 👴❤️"
      }
    ]
  },
  {
    "id": "simple-commands",
    "slug": "sade-komandalar",
    "titleAz": "Sadə komandalar",
    "titleEn": "Simple Commands",
    "titleRu": "Простые команды",
    "descriptionAz": "Əl çal, otur, ayağa qalx, gözlərini yum, qapını aç.",
    "emoji": "🙋",
    "group": "commands",
    "minAge": 2,
    "maxAge": 5,
    "color": "from-cyan-500 to-sky-400",
    "activities": [
      {
        "id": "cmd-clap-1",
        "title": "Şən Əl Çalmaq",
        "titleEn": "Happy Hand Clapping",
        "titleRu": "Веселые хлопки",
        "lesson": {
          "id": "cmd-lesson-body",
          "conceptTitleAz": "Bədən Hərəkət Komandalarını Öyrənək!",
          "conceptTitleEn": "Let's Learn Body Action Commands!",
          "conceptTitleRu": "Учим Команды Движений Тела!",
          "explanationAz": "Musiqi çalınanda əl çalırıq (👏). Yorulanda stula otururuq (🪑). İdman başlayanda isə cəld ayağa qalxırıq (🧍)!",
          "explanationEn": "When music plays, we clap our hands (👏). When tired, we sit on a chair (🪑). For exercise, we stand up quickly (🧍)!",
          "explanationRu": "Когда играет музыка, мы хлопаем в ладоши (👏). Когда устали, садимся на стул (🪑). А для зарядки быстро встаем (🧍)!",
          "bigEmojis": [
            "👏",
            "🧘",
            "🧍",
            "🙋"
          ],
          "audioTextAz": "Əl çalırıq, stula otururuq, ayağa qalxırıq.",
          "audioTextEn": "We clap hands, sit on a chair, stand up.",
          "audioTextRu": "Хлопаем в ладоши, садимся, встаем."
        },
        "instruction": "Şən musiqi çalınanda nə edirik?",
        "instructionEn": "What do we do when cheerful music plays?",
        "instructionRu": "Что мы делаем, когда играет веселая музыка?",
        "type": "select",
        "question": "Musiqi çalınanda ritmlə nə edirik?",
        "questionEn": "What do we do to the rhythm when music plays?",
        "questionRu": "Что мы делаем в такт под музыку?",
        "targetAudioText": "Əl çalmağı seç.",
        "targetAudioTextEn": "Select clapping.",
        "targetAudioTextRu": "Выбери хлопки в ладоши.",
        "options": [
          {
            "id": "cmd1",
            "text": "Əl çalırıq",
            "textEn": "Clap hands",
            "textRu": "Хлопаем в ладоши",
            "emoji": "👏",
            "isCorrect": true
          },
          {
            "id": "cmd2",
            "text": "Yatırıq",
            "textEn": "Sleep",
            "textRu": "Спим",
            "emoji": "😴",
            "isCorrect": false
          },
          {
            "id": "cmd3",
            "text": "Ağlayırıq",
            "textEn": "Cry",
            "textRu": "Плачем",
            "emoji": "😢",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Şən musiqi ilə əl çalırıq! 👏🎉",
        "explanationEn": "Well done! We clap happily to music! 👏🎉",
        "explanationRu": "Молодец! Под музыку мы весело хлопаем! 👏🎉"
      },
      {
        "id": "cmd-stand-2",
        "title": "Ayağa Qalx",
        "titleEn": "Stand Up",
        "titleRu": "Встань прямо",
        "instruction": "İdman başlayanda ayağa qalxmağı seç.",
        "instructionEn": "Select standing up when exercise starts.",
        "instructionRu": "Выбери «встать», когда начинается зарядка.",
        "type": "select",
        "question": "Müəllim 'Ayağa qalx!' deyəndə nə edirik?",
        "questionEn": "What do we do when teacher says 'Stand up!'?",
        "questionRu": "Что мы делаем, когда говорят «Встань прямо!»?",
        "targetAudioText": "Ayağa qalxmağı tap.",
        "targetAudioTextEn": "Find standing up.",
        "targetAudioTextRu": "Найди команду «Встать».",
        "options": [
          {
            "id": "cmd4",
            "text": "Ayağa qalxırıq",
            "textEn": "Stand up",
            "textRu": "Встаем",
            "emoji": "🧍",
            "isCorrect": true
          },
          {
            "id": "cmd5",
            "text": "Uzanırıq",
            "textEn": "Lie down",
            "textRu": "Ложимся",
            "emoji": "🛏️",
            "isCorrect": false
          },
          {
            "id": "cmd6",
            "text": "Qaçırıq",
            "textEn": "Run",
            "textRu": "Бежим",
            "emoji": "🏃",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! İdman üçün qamətimizi düz tutub ayağa qalxırıq! 🧍",
        "explanationEn": "Correct! We stand tall and straight for gymnastics! 🧍",
        "explanationRu": "Правильно! Для разминки мы встаем прямо! 🧍"
      },
      {
        "id": "cmd-sit-3",
        "title": "Stulda Otur",
        "titleEn": "Sit on Chair",
        "titleRu": "Садись на стул",
        "instruction": "Dərs oxumaq üçün stulda oturmağı tap.",
        "instructionEn": "Find sitting on the chair to study.",
        "instructionRu": "Найди действие «сесть на стул» для учебы.",
        "type": "select",
        "question": "Yorulduqda və ya dərs yazarkən nə edirik?",
        "questionEn": "What do we do when tired or writing homework?",
        "questionRu": "Что мы делаем, когда устали или пишем уроки?",
        "targetAudioText": "Oturmağı seç.",
        "targetAudioTextEn": "Select sitting.",
        "targetAudioTextRu": "Выбери команду «Сесть».",
        "options": [
          {
            "id": "cmd7",
            "text": "Stulda otururuq",
            "textEn": "Sit on chair",
            "textRu": "Садимся на стул",
            "emoji": "🪑",
            "isCorrect": true
          },
          {
            "id": "cmd8",
            "text": "Tullanırıq",
            "textEn": "Jump",
            "textRu": "Прыгаем",
            "emoji": "🦘",
            "isCorrect": false
          },
          {
            "id": "cmd9",
            "text": "Üzürük",
            "textEn": "Swim",
            "textRu": "Плаваем",
            "emoji": "🏊",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Masanın arxasında rahat otururuq! 🪑",
        "explanationEn": "Great! We sit comfortably at the table! 🪑",
        "explanationRu": "Отлично! Мы удобно садимся за стол! 🪑"
      },
      {
        "id": "cmd-wave-4",
        "title": "Əl Sallamaq",
        "titleEn": "Wave Hello",
        "titleRu": "Помаши рукой",
        "instruction": "Dostlara salam vermək üçün əl sallamağı seç.",
        "instructionEn": "Select waving hand to greet friends.",
        "instructionRu": "Выбери «помаши рукой», чтобы поздороваться.",
        "type": "select",
        "question": "Dostumuza salam verərkən və ya sağollaşarkən nə edirik?",
        "questionEn": "What do we do when greeting or saying goodbye to a friend?",
        "questionRu": "Что мы делаем, здороваясь или прощаясь с другом?",
        "targetAudioText": "Əl sallamağı tap.",
        "targetAudioTextEn": "Find waving hand.",
        "targetAudioTextRu": "Найди взмах рукой.",
        "options": [
          {
            "id": "cmd10",
            "text": "Əl sallayırıq",
            "textEn": "Wave hand",
            "textRu": "Машем рукой",
            "emoji": "👋",
            "isCorrect": true
          },
          {
            "id": "cmd11",
            "text": "Yatırıq",
            "textEn": "Sleep",
            "textRu": "Засыпаем",
            "emoji": "😴",
            "isCorrect": false
          },
          {
            "id": "cmd12",
            "text": "Gizlənirik",
            "textEn": "Hide",
            "textRu": "Прячемся",
            "emoji": "🙈",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm! Əl sallayaraq dostlarımıza mehribanlıq göstəririk! 👋❤️",
        "explanationEn": "Awesome! Waving our hand shows warmth to friends! 👋❤️",
        "explanationRu": "Замечательно! Взмахом руки мы приветствуем друзей! 👋❤️"
      }
    ]
  },
  {
    "id": "two-step-commands",
    "slug": "iki-merheleli-komandalar",
    "titleAz": "İki mərhələli komandalar",
    "titleEn": "Two-Step Commands",
    "titleRu": "Двухступенчатые команды",
    "descriptionAz": "Topu götür və qutuya qoy, əllərini yu və süfrəyə gəl.",
    "emoji": "🧩",
    "group": "commands",
    "minAge": 3,
    "maxAge": 6,
    "color": "from-teal-500 to-emerald-400",
    "activities": [
      {
        "id": "cmd2-toy-box-1",
        "title": "Oyuncağı Yığ",
        "titleEn": "Pack Away Toy",
        "titleRu": "Собери игрушку",
        "lesson": {
          "id": "cmd2-lesson-steps",
          "conceptTitleAz": "İki Ardıcıl Hərəkəti Öyrənək!",
          "conceptTitleEn": "Let's Learn Two Step Sequences!",
          "conceptTitleRu": "Учим Двухшаговые Команды!",
          "explanationAz": "Əvvəlcə birinci işi, sonra ikinci işi edirik! Məsələn: Əvvəl topu yerdən götür, sonra onu səliqə ilə qutuya qoy (⚽➔📦)!",
          "explanationEn": "First we do step one, then we do step two! For example: First pick up the ball, then put it into the box (⚽➔📦)!",
          "explanationRu": "Сначала выполняем первое действие, затем второе! Например: Сначала подними мяч, затем положи его в коробку (⚽➔📦)!",
          "bigEmojis": [
            "⚽",
            "📦",
            "🧼",
            "💧"
          ],
          "audioTextAz": "Əvvəl topu götürürük, sonra qutuya qoyuruq.",
          "audioTextEn": "First pick up the ball, then put it in the box.",
          "audioTextRu": "Сначала берем мяч, потом кладем в коробку."
        },
        "instruction": "Əvvəl topu götür, sonra nə etməlisən?",
        "instructionEn": "First pick up the ball, what should you do next?",
        "instructionRu": "Сначала возьми мяч, что нужно сделать потом?",
        "type": "select",
        "question": "Topu yerdən götürdükdən sonra səliqə üçün onu hara qoymalıyıq?",
        "questionEn": "After picking up the ball, where should we tidy it away?",
        "questionRu": "Куда нужно положить мяч после того, как подняли его?",
        "targetAudioText": "Qutuya qoymağı seç.",
        "targetAudioTextEn": "Select putting in box.",
        "targetAudioTextRu": "Выбери положить в коробку.",
        "options": [
          {
            "id": "c2_1",
            "text": "Qutuya qoyuruq",
            "textEn": "Put into box",
            "textRu": "Кладем в коробку",
            "emoji": "📦",
            "isCorrect": true
          },
          {
            "id": "c2_2",
            "text": "Pəncərədən atırıq",
            "textEn": "Throw out window",
            "textRu": "Бросаем в окно",
            "emoji": "🪟",
            "isCorrect": false
          },
          {
            "id": "c2_3",
            "text": "Yatırıq",
            "textEn": "Go to sleep",
            "textRu": "Засыпаем",
            "emoji": "😴",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Oyuncaqları qutuya yığmaq otağı təmiz saxlayır! ⚽📦",
        "explanationEn": "Well done! Storing toys in boxes keeps the room tidy! ⚽📦",
        "explanationRu": "Молодец! Складывание игрушек в коробку сохраняет чистоту! ⚽📦"
      },
      {
        "id": "cmd2-wash-hands-2",
        "title": "Əlləri Yumaq və Qurulamaq",
        "titleEn": "Wash and Dry Hands",
        "titleRu": "Помыть и вытереть руки",
        "instruction": "Əlləri sabunladıqdan sonra növbəti addımı tap.",
        "instructionEn": "Find the next step after soaping hands.",
        "instructionRu": "Найди следующий шаг после намыливания рук.",
        "type": "select",
        "question": "Əllərimizi sabunla köpükləndirdikdən sonra nə etməliyik?",
        "questionEn": "What do we do after soaping our hands?",
        "questionRu": "Что нужно сделать после того, как намылили руки?",
        "targetAudioText": "Su ilə yaxalamağı seç.",
        "targetAudioTextEn": "Select rinsing with water.",
        "targetAudioTextRu": "Выбери смыть водой.",
        "options": [
          {
            "id": "c2_4",
            "text": "Təmiz su ilə yaxalayırıq",
            "textEn": "Rinse with water",
            "textRu": "Смываем чистой водой",
            "emoji": "💧",
            "isCorrect": true
          },
          {
            "id": "c2_5",
            "text": "Şokolad yeyirik",
            "textEn": "Eat chocolate",
            "textRu": "Едим шоколад",
            "emoji": "🍫",
            "isCorrect": false
          },
          {
            "id": "c2_6",
            "text": "Torpağa toxunuruq",
            "textEn": "Touch soil",
            "textRu": "Трогаем землю",
            "emoji": "🌱",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Su ilə köpüyü yuyub əlləri təmiz edirik! 🧼💧",
        "explanationEn": "Correct! Rinsing away soap foam leaves hands clean! 🧼💧",
        "explanationRu": "Правильно! Смываем мыльную пену водой, и ручки чистые! 🧼💧"
      },
      {
        "id": "cmd2-shoes-walk-3",
        "title": "Ayaqqabını Geyin və Gəzintiyə Çıx",
        "titleEn": "Put on Shoes and Go Walk",
        "titleRu": "Надень обувь и иди гулять",
        "instruction": "Həyətə çıxmazdan əvvəl ayaqqabını nə etməliyik?",
        "instructionEn": "What should we do with shoes before going outside?",
        "instructionRu": "Что нужно сделать с обувью перед выходом на улицу?",
        "type": "select",
        "question": "Parka gəzməyə çıxmazdan əvvəl ayağımıza nə geyinirik?",
        "questionEn": "What do we put on our feet before strolling in the park?",
        "questionRu": "Что мы надеваем на ноги перед прогулкой в парке?",
        "targetAudioText": "Ayaqqabını seç.",
        "targetAudioTextEn": "Select shoes.",
        "targetAudioTextRu": "Выбери обувь.",
        "options": [
          {
            "id": "c2_7",
            "text": "Ayaqqabını geyinirik",
            "textEn": "Put on shoes",
            "textRu": "Надеваем обувь",
            "emoji": "👟",
            "isCorrect": true
          },
          {
            "id": "c2_8",
            "text": "Əlcək geyinirik",
            "textEn": "Put on gloves",
            "textRu": "Надеваем перчатки",
            "emoji": "🧤",
            "isCorrect": false
          },
          {
            "id": "c2_9",
            "text": "Papaq yeməyə başlayırıq",
            "textEn": "Eat a hat",
            "textRu": "Едим шапку",
            "emoji": "🎩",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Ayaqqabını geyinirik, sonra qapıdan çölə çıxırıq! 👟🌳",
        "explanationEn": "Super! We put on shoes, then step outside! 👟🌳",
        "explanationRu": "Супер! Надеваем обувь, а потом идем на улицу! 👟🌳"
      },
      {
        "id": "cmd2-book-close-4",
        "title": "Kitabı Oxu və Rəfə Qoy",
        "titleEn": "Read Book and Put on Shelf",
        "titleRu": "Почитай книгу и поставь на полку",
        "instruction": "Nağıl kitabını oxuduqdan sonra nə edirik?",
        "instructionEn": "What do we do after reading the story book?",
        "instructionRu": "Что делаем после чтения книги со сказками?",
        "type": "select",
        "question": "Kitabı oxuduqdan sonra onu səliqə ilə hara qoyuruq?",
        "questionEn": "After reading the book, where do we neatly place it?",
        "questionRu": "Куда аккуратно ставим книгу после чтения?",
        "targetAudioText": "Kitab rəfinə qoymağı seç.",
        "targetAudioTextEn": "Select placing on bookshelf.",
        "targetAudioTextRu": "Выбери поставить на книжную полку.",
        "options": [
          {
            "id": "c2_10",
            "text": "Kitab rəfinə qoyuruq",
            "textEn": "Put on bookshelf",
            "textRu": "Ставим на полку",
            "emoji": "📚",
            "isCorrect": true
          },
          {
            "id": "c2_11",
            "text": "Yerdə qoyub gedirik",
            "textEn": "Leave on floor",
            "textRu": "Бросаем на пол",
            "emoji": "🗑️",
            "isCorrect": false
          },
          {
            "id": "c2_12",
            "text": "Cırırıq",
            "textEn": "Tear it",
            "textRu": "Рвем книгу",
            "emoji": "❌",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Kitabları həmişə rəfdə səliqəli saxlayırıq! 📖📚",
        "explanationEn": "Well done! We always keep books tidy on shelves! 📖📚",
        "explanationRu": "Молодец! Книги всегда аккуратно хранятся на полках! 📖📚"
      }
    ]
  },
  {
    "id": "spatial-concepts",
    "slug": "mekan-anlayislari",
    "titleAz": "Məkan anlayışları",
    "titleEn": "Spatial Concepts",
    "titleRu": "Пространственные понятия",
    "descriptionAz": "Üstündə, altında, içində, yanında, qarşısında, arxasında.",
    "emoji": "🧭",
    "group": "commands",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-violet-500 to-indigo-400",
    "activities": [
      {
        "id": "space-on-1",
        "title": "Masanın üstündə",
        "titleEn": "On top of the table",
        "titleRu": "На столе",
        "lesson": {
          "id": "spatial-lesson-1",
          "conceptTitleAz": "Üstündə və Altında Anlayışları!",
          "conceptTitleEn": "Learn On Top and Underneath!",
          "conceptTitleRu": "Учим понятия «Сверху» и «Снизу»!",
          "explanationAz": "Əgər əşya masanın təpəsindədirsə, 'üstündə' deyirik (Kitab masanın üstündədir 📖🪑). Əgər aşağısında daldalanıbsa, 'altında' deyirik (Pişik masanın altındadır 🐱🪑).",
          "explanationEn": "If an item is at the surface, we say 'on top' (e.g. The book is on the table 📖🪑). If it is below, we say 'underneath' (e.g. The cat is under the table 🐱🪑).",
          "explanationRu": "Если предмет лежит на поверхности, мы говорим «сверху/на» (Книга на столе 📖🪑). Если внизу — «снизу/под» (Кошка под столом 🐱🪑).",
          "bigEmojis": [
            "📖",
            "🪑",
            "🐱",
            "⚽"
          ],
          "audioTextAz": "Masanın təpəsində olanda üstündə deyirik, aşağısında olanda isə altında deyirik.",
          "audioTextEn": "When it is above, we say on top. When it is below, we say underneath.",
          "audioTextRu": "Когда предмет сверху — говорим на столе, когда внизу — под столом."
        },
        "visualScene": {
          "type": "spatial",
          "position": "on",
          "containerEmoji": "🪑",
          "itemEmoji": "📖",
          "captionAz": "Şəkil: Kitab masanın üzərindədir",
          "captionEn": "Picture: Book is on top of the table",
          "captionRu": "Картинка: Книга лежит на столе"
        },
        "instruction": "Şəklə bax və kitabın yerini de.",
        "instructionEn": "Look at the picture and find where the book is.",
        "instructionRu": "Посмотри на картинку и скажи, где книга.",
        "type": "select",
        "question": "Kitab masanın harasındadır?",
        "questionEn": "Where is the book on the table?",
        "questionRu": "Где лежит книга на столе?",
        "targetAudioText": "Kitab masanın harasındadır?",
        "targetAudioTextEn": "Where is the book?",
        "targetAudioTextRu": "Где лежит книга?",
        "options": [
          {
            "id": "sp1",
            "text": "Üstündə",
            "textEn": "On top",
            "textRu": "На столе",
            "emoji": "👆",
            "isCorrect": true
          },
          {
            "id": "sp2",
            "text": "Altında",
            "textEn": "Underneath",
            "textRu": "Под столом",
            "emoji": "👇",
            "isCorrect": false
          },
          {
            "id": "sp3",
            "text": "İçində",
            "textEn": "Inside",
            "textRu": "Внутри",
            "emoji": "📥",
            "isCorrect": false
          }
        ],
        "explanation": "Bəli! Kitab masanın tam üstündə qoyulub! 📖🪑",
        "explanationEn": "Yes! The book is right on top of the table! 📖🪑",
        "explanationRu": "Да! Книга лежит прямо на столе! 📖🪑"
      },
      {
        "id": "space-under-2",
        "title": "Masanın altında",
        "titleEn": "Under the table",
        "titleRu": "Под столом",
        "visualScene": {
          "type": "spatial",
          "position": "under",
          "containerEmoji": "🪑",
          "itemEmoji": "🐱",
          "captionAz": "Şəkil: Pişik masanın aşağısındadır",
          "captionEn": "Picture: Cat is under the table",
          "captionRu": "Картинка: Кошка сидит под столом"
        },
        "instruction": "Şəklə bax: Pişik harada əyləşib?",
        "instructionEn": "Look at the picture: Where is the cat sitting?",
        "instructionRu": "Посмотри на картинку: Где сидит кошка?",
        "type": "select",
        "question": "Pişik masanın harasındadır?",
        "questionEn": "Where is the cat under the table?",
        "questionRu": "Где сидит кошка под столом?",
        "targetAudioText": "Pişik masanın harasındadır?",
        "targetAudioTextEn": "Where is the cat?",
        "targetAudioTextRu": "Где сидит кошка?",
        "options": [
          {
            "id": "sp4",
            "text": "Altında",
            "textEn": "Underneath",
            "textRu": "Под столом",
            "emoji": "👇",
            "isCorrect": true
          },
          {
            "id": "sp5",
            "text": "Üstündə",
            "textEn": "On top",
            "textRu": "На столе",
            "emoji": "👆",
            "isCorrect": false
          },
          {
            "id": "sp6",
            "text": "Yanında",
            "textEn": "Beside",
            "textRu": "Рядом",
            "emoji": "👉",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Pişik masanın altında daldalanıb! 🐱⬇️🪑",
        "explanationEn": "Correct! The cat is resting under the table! 🐱⬇️🪑",
        "explanationRu": "Правильно! Кошка спряталась под столом! 🐱⬇️🪑"
      },
      {
        "id": "space-in-3",
        "title": "Qutunun içində",
        "titleEn": "Inside the box",
        "titleRu": "Внутри коробки",
        "lesson": {
          "id": "spatial-lesson-2",
          "conceptTitleAz": "İçində və Yanında Anlayışları!",
          "conceptTitleEn": "Learn Inside and Beside!",
          "conceptTitleRu": "Учим понятия «Внутри» и «Рядом»!",
          "explanationAz": "Əşya qutunun qapalı iç hissəsindədirsə, 'içində' deyirik (məsələn: Alma qutunun içindədir 🍎📦). Kənarında durubsa, 'yanında' deyirik (məsələn: Ayıcıq qutunun yanındadır 🧸📦).",
          "explanationEn": "If an item is inside a container, we say 'inside' (The apple is in the box 🍎📦). If it stands at the side, we say 'beside' (The teddy bear is beside the box 🧸📦).",
          "explanationRu": "Если предмет находится внутри емкости, говорим «внутри» (Яблоко в коробке 🍎📦). Если сбоку — «рядом» (Мишка рядом с коробкой 🧸📦).",
          "bigEmojis": [
            "🍎",
            "📦",
            "🧸",
            "🎁"
          ],
          "audioTextAz": "Qutunun arxasında və ya kənarında olanda yanında, içində olanda isə içində deyirik.",
          "audioTextEn": "When it is within, we say inside. When it is next to it, we say beside.",
          "audioTextRu": "Когда внутри — говорим внутри, когда сбоку — рядом."
        },
        "visualScene": {
          "type": "spatial",
          "position": "in",
          "containerEmoji": "📦",
          "itemEmoji": "🍎",
          "captionAz": "Şəkil: Alma qutunun daxilindədir",
          "captionEn": "Picture: Apple is inside the box",
          "captionRu": "Картинка: Яблоко лежит внутри коробки"
        },
        "instruction": "Şəklə bax: Alma haradadır?",
        "instructionEn": "Look at the picture: Where is the apple?",
        "instructionRu": "Посмотри на картинку: Где яблоко?",
        "type": "select",
        "question": "Alma qutunun harasındadır?",
        "questionEn": "Where is the apple in the box?",
        "questionRu": "Где яблоко в коробке?",
        "targetAudioText": "Alma qutunun harasındadır?",
        "targetAudioTextEn": "Where is the apple?",
        "targetAudioTextRu": "Где яблоко?",
        "options": [
          {
            "id": "sp7",
            "text": "İçində",
            "textEn": "Inside",
            "textRu": "Внутри",
            "emoji": "📥",
            "isCorrect": true
          },
          {
            "id": "sp8",
            "text": "Üstündə",
            "textEn": "On top",
            "textRu": "Сверху",
            "emoji": "👆",
            "isCorrect": false
          },
          {
            "id": "sp9",
            "text": "Altında",
            "textEn": "Underneath",
            "textRu": "Снизу",
            "emoji": "👇",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Qırmızı alma qutunun içindədir! 🍎📦",
        "explanationEn": "Great! The red apple is inside the box! 🍎📦",
        "explanationRu": "Отлично! Красное яблоко лежит внутри коробки! 🍎📦"
      },
      {
        "id": "space-beside-4",
        "title": "Qutunun yanında",
        "titleEn": "Beside the box",
        "titleRu": "Рядом с коробкой",
        "visualScene": {
          "type": "spatial",
          "position": "beside",
          "containerEmoji": "📦",
          "itemEmoji": "🧸",
          "captionAz": "Şəkil: Ayıcıq qutunun kənarındadır",
          "captionEn": "Picture: Teddy bear is beside the box",
          "captionRu": "Картинка: Мишка сидит рядом с коробкой"
        },
        "instruction": "Şəklə bax: Ayıcıq harada dayanıb?",
        "instructionEn": "Look at the picture: Where is the teddy bear?",
        "instructionRu": "Посмотри на картинку: Где стоит мишка?",
        "type": "select",
        "question": "Ayıcıq qutunun harasındadır?",
        "questionEn": "Where is the teddy bear beside the box?",
        "questionRu": "Где мишка рядом с коробкой?",
        "targetAudioText": "Ayıcıq qutunun harasındadır?",
        "targetAudioTextEn": "Where is the teddy bear?",
        "targetAudioTextRu": "Где мишка?",
        "options": [
          {
            "id": "sp10",
            "text": "Yanında",
            "textEn": "Beside",
            "textRu": "Рядом",
            "emoji": "👉",
            "isCorrect": true
          },
          {
            "id": "sp11",
            "text": "Üstündə",
            "textEn": "On top",
            "textRu": "Сверху",
            "emoji": "👆",
            "isCorrect": false
          },
          {
            "id": "sp12",
            "text": "Altında",
            "textEn": "Underneath",
            "textRu": "Снизу",
            "emoji": "👇",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm! Ayıcıq qutunun yanında əyləşib! 🧸👉📦",
        "explanationEn": "Awesome! The teddy bear is sitting beside the box! 🧸👉📦",
        "explanationRu": "Замечательно! Мишка сидит рядом с коробкой! 🧸👉📦"
      }
    ]
  },
  {
    "id": "sizes-comparison",
    "slug": "olculer-muqayise",
    "titleAz": "Ölçülər və müqayisə",
    "titleEn": "Sizes & Comparison",
    "titleRu": "Размеры и Сравнение",
    "descriptionAz": "Böyük/kiçik, uzun/qısa, hündür/alçaq, ağır/yüngül.",
    "emoji": "📏",
    "group": "commands",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-amber-600 to-yellow-500",
    "activities": [
      {
        "id": "size-big-small-1",
        "title": "Böyük Fil və Kiçik Siçan",
        "titleEn": "Big Elephant and Small Mouse",
        "titleRu": "Большой слон и маленькая мышь",
        "lesson": {
          "id": "size-lesson-big-small",
          "conceptTitleAz": "Böyük və Kiçik Ölçüləri Öyrənək!",
          "conceptTitleEn": "Let's Learn Big and Small!",
          "conceptTitleRu": "Учим понятия «Большой» и «Маленький»!",
          "explanationAz": "Fil nəhəng və çox böyükdür (🐘). Balaca siçan isə xırda və kiçikdir (🐭). Nəhəng qarpız böyük, şirin çiyələk isə kiçikdir (🍉🍓)!",
          "explanationEn": "The elephant is huge and very big (🐘). The tiny mouse is small (🐭). A giant watermelon is big, while a strawberry is small (🍉🍓)!",
          "explanationRu": "Слон огромный и очень большой (🐘). А мышка крошечная и маленькая (🐭). Арбуз большой, а ягодка клубники маленькая (🍉🍓)!",
          "bigEmojis": [
            "🐘",
            "🐭",
            "🍉",
            "🍓"
          ],
          "audioTextAz": "Fil böyükdür, siçan kiçikdir.",
          "audioTextEn": "The elephant is big, the mouse is small.",
          "audioTextRu": "Слон большой, мышка маленькая."
        },
        "visualScene": {
          "type": "comparison",
          "leftItem": {
            "emoji": "🐘",
            "size": "huge",
            "labelAz": "Nəhəng Fil",
            "labelEn": "Big Elephant",
            "labelRu": "Большой слон"
          },
          "rightItem": {
            "emoji": "🐭",
            "size": "small",
            "labelAz": "Kiçik Siçan",
            "labelEn": "Small Mouse",
            "labelRu": "Маленькая мышь"
          },
          "captionAz": "Müqayisə: Böyük Fil və Balaca Siçan",
          "captionEn": "Comparison: Big Elephant and Small Mouse",
          "captionRu": "Сравнение: Большой слон и маленькая мышь"
        },
        "instruction": "Şəklə bax: Hansı heyvan daha böyükdür?",
        "instructionEn": "Look at the picture: Which animal is bigger?",
        "instructionRu": "Посмотри на картинку: Какое животное больше?",
        "type": "select",
        "question": "Hansı heyvan daha böyük və nəhəngdir?",
        "questionEn": "Which animal is bigger and huge?",
        "questionRu": "Какое животное больше и огромнее?",
        "targetAudioText": "Böyük heyvanı seç.",
        "targetAudioTextEn": "Select the big animal.",
        "targetAudioTextRu": "Выбери большое животное.",
        "options": [
          {
            "id": "sz1",
            "text": "Böyük Fil",
            "textEn": "Big Elephant",
            "textRu": "Большой слон",
            "emoji": "🐘",
            "isCorrect": true
          },
          {
            "id": "sz2",
            "text": "Kiçik Siçan",
            "textEn": "Small Mouse",
            "textRu": "Маленькая мышь",
            "emoji": "🐭",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Fil siçandan qat-qat böyükdür! 🐘",
        "explanationEn": "Well done! The elephant is much bigger than a mouse! 🐘",
        "explanationRu": "Молодец! Слон намного больше мышки! 🐘"
      },
      {
        "id": "size-fruit-small-2",
        "title": "Kiçik Meyvəni Tap",
        "titleEn": "Find Small Fruit",
        "titleRu": "Найди маленький фрукт",
        "visualScene": {
          "type": "comparison",
          "leftItem": {
            "emoji": "🍉",
            "size": "huge",
            "labelAz": "Böyük Qarpız",
            "labelEn": "Big Watermelon",
            "labelRu": "Большой арбуз"
          },
          "rightItem": {
            "emoji": "🍓",
            "size": "small",
            "labelAz": "Balaca Çiyələk",
            "labelEn": "Small Strawberry",
            "labelRu": "Маленькая клубника"
          },
          "captionAz": "Müqayisə: Nəhəng Qarpız və Balaca Çiyələk",
          "captionEn": "Comparison: Big Watermelon and Small Strawberry",
          "captionRu": "Сравнение: Большой арбуз и маленькая клубника"
        },
        "instruction": "Şəklə bax: Daha kiçik olan meyvəni tap.",
        "instructionEn": "Look at the picture: Find the smaller fruit.",
        "instructionRu": "Посмотри на картинку: Найди меньшую ягоду.",
        "type": "select",
        "question": "Qarpız və çiyələk arasında hansı daha kiçikdir?",
        "questionEn": "Between watermelon and strawberry, which is smaller?",
        "questionRu": "Что меньше: арбуз или клубничка?",
        "targetAudioText": "Kiçik olanı seç.",
        "targetAudioTextEn": "Select the smaller one.",
        "targetAudioTextRu": "Выбери меньшее.",
        "options": [
          {
            "id": "sz3",
            "text": "Kiçik Çiyələk",
            "textEn": "Small Strawberry",
            "textRu": "Маленькая клубника",
            "emoji": "🍓",
            "isCorrect": true
          },
          {
            "id": "sz4",
            "text": "Böyük Qarpız",
            "textEn": "Big Watermelon",
            "textRu": "Большой арбуз",
            "emoji": "🍉",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Çiyələk ovucumuza sığır, qarpız isə böyükdür! 🍓",
        "explanationEn": "Correct! A strawberry fits in our palm, while watermelon is huge! 🍓",
        "explanationRu": "Правильно! Клубника помещается в ладошке, а арбуз огромный! 🍓"
      },
      {
        "id": "size-tall-short-3",
        "title": "Hündür Zürafə və Alçaq İt",
        "titleEn": "Tall Giraffe and Short Dog",
        "titleRu": "Высокий жираф и низкая собачка",
        "lesson": {
          "id": "size-lesson-tall-short",
          "conceptTitleAz": "Hündür və Alçaq Anlayışlarını Öyrənək!",
          "conceptTitleEn": "Let's Learn Tall and Short!",
          "conceptTitleRu": "Учим понятия «Высокий» и «Низкий»!",
          "explanationAz": "Zürafənin uzun boynu var, o çox hündürdür və ağacların təpəsinə çatır (🦒). Balaca küçüklük isə alçaqdır (🐶). Şam ağacı hündürdür, göbələk isə alçaqdır (🌲🍄)!",
          "explanationEn": "The giraffe has a long neck, standing very tall reaching tree tops (🦒). The puppy is short (🐶). Pine trees are tall, mushrooms are short (🌲🍄)!",
          "explanationRu": "У жирафа длинная шея, он очень высокий и достает до верхушек деревьев (🦒). А щенок низенький (🐶). Елка высокая, а грибок низкий (🌲🍄)!",
          "bigEmojis": [
            "🦒",
            "🐶",
            "🌲",
            "🍄"
          ],
          "audioTextAz": "Zürafə hündürdür, it alçaqdır.",
          "audioTextEn": "The giraffe is tall, the dog is short.",
          "audioTextRu": "Жираф высокий, собачка низкая."
        },
        "visualScene": {
          "type": "comparison",
          "leftItem": {
            "emoji": "🦒",
            "size": "huge",
            "labelAz": "Hündür Zürafə",
            "labelEn": "Tall Giraffe",
            "labelRu": "Высокий жираф"
          },
          "rightItem": {
            "emoji": "🐶",
            "size": "small",
            "labelAz": "Alçaq İt",
            "labelEn": "Short Dog",
            "labelRu": "Низкая собачка"
          },
          "captionAz": "Müqayisə: Hündür Zürafə və Alçaq İt",
          "captionEn": "Comparison: Tall Giraffe and Short Dog",
          "captionRu": "Сравнение: Высокий жираф и низкая собака"
        },
        "instruction": "Şəklə bax: Hansı heyvan daha hündürdür?",
        "instructionEn": "Look at the picture: Which animal is taller?",
        "instructionRu": "Посмотри на картинку: Какое животное выше?",
        "type": "select",
        "question": "Hansı heyvan daha hündür boya malikdir?",
        "questionEn": "Which animal stands taller?",
        "questionRu": "Какое животное выше ростом?",
        "targetAudioText": "Hündür heyvanı seç.",
        "targetAudioTextEn": "Select the tall animal.",
        "targetAudioTextRu": "Выбери высокое животное.",
        "options": [
          {
            "id": "sz5",
            "text": "Hündür Zürafə",
            "textEn": "Tall Giraffe",
            "textRu": "Высокий жираф",
            "emoji": "🦒",
            "isCorrect": true
          },
          {
            "id": "sz6",
            "text": "Alçaq İt",
            "textEn": "Short Dog",
            "textRu": "Низкая собака",
            "emoji": "🐶",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Zürafə meşənin ən hündür heyvanıdır! 🦒",
        "explanationEn": "Great! The giraffe is the tallest animal in the woods! 🦒",
        "explanationRu": "Отлично! Жираф — самое высокое животное! 🦒"
      },
      {
        "id": "size-tree-short-4",
        "title": "Alçaq Göbələk",
        "titleEn": "Short Mushroom",
        "titleRu": "Низкий гриб",
        "visualScene": {
          "type": "comparison",
          "leftItem": {
            "emoji": "🌲",
            "size": "huge",
            "labelAz": "Hündür Şam ağacı",
            "labelEn": "Tall Pine Tree",
            "labelRu": "Высокая ель"
          },
          "rightItem": {
            "emoji": "🍄",
            "size": "small",
            "labelAz": "Alçaq Göbələk",
            "labelEn": "Short Mushroom",
            "labelRu": "Низкий грибочек"
          },
          "captionAz": "Müqayisə: Hündür Şam və Alçaq Göbələk",
          "captionEn": "Comparison: Tall Pine and Short Mushroom",
          "captionRu": "Сравнение: Высокая ель и низкий гриб"
        },
        "instruction": "Şəklə bax: Daha alçaq olanı seç.",
        "instructionEn": "Look at the picture: Select the shorter one.",
        "instructionRu": "Посмотри на картинку: Выбери то, что ниже.",
        "type": "select",
        "question": "Şam ağacı və göbələk arasında hansı daha alçaqdır?",
        "questionEn": "Between the pine tree and mushroom, which is shorter?",
        "questionRu": "Что ниже: елка или маленький грибок?",
        "targetAudioText": "Alçaq olanı seç.",
        "targetAudioTextEn": "Select the shorter one.",
        "targetAudioTextRu": "Выбери более низкое.",
        "options": [
          {
            "id": "sz7",
            "text": "Alçaq Göbələk",
            "textEn": "Short Mushroom",
            "textRu": "Низкий грибок",
            "emoji": "🍄",
            "isCorrect": true
          },
          {
            "id": "sz8",
            "text": "Hündür Ağac",
            "textEn": "Tall Tree",
            "textRu": "Высокое дерево",
            "emoji": "🌲",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Göbələk yerdə bitir və çox alçaqdır! 🍄",
        "explanationEn": "Super! The mushroom grows close to the ground and is short! 🍄",
        "explanationRu": "Супер! Грибок растет у самой земли и он низенький! 🍄"
      }
    ]
  },
  {
    "id": "opposites",
    "slug": "eks-anlayislar",
    "titleAz": "Əks anlayışlar",
    "titleEn": "Opposites",
    "titleRu": "Противоположности",
    "descriptionAz": "İsti/soyuq, gecə/gündüz, sürətli/yavaş, təmiz/çirkli.",
    "emoji": "⚖️",
    "group": "commands",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-emerald-600 to-teal-400",
    "activities": [
      {
        "id": "opp-hot-cold-1",
        "title": "İsti və Soyuq",
        "titleEn": "Hot and Cold",
        "titleRu": "Горячий и Холодный",
        "lesson": {
          "id": "opp-lesson-hot-cold",
          "conceptTitleAz": "İsti və Soyuq Əks Anlayışlarını Öyrənək!",
          "conceptTitleEn": "Let's Learn Hot and Cold!",
          "conceptTitleRu": "Учим противоположности «Горячий» и «Холодный»!",
          "explanationAz": "Alov və təzə çay istidir (🔥☕). Əksi isə soyuq buz və ləzzətli dondurmadır (🧊🍦)!",
          "explanationEn": "Fire and fresh tea are hot (🔥☕). The opposite is cold ice and ice cream (🧊🍦)!",
          "explanationRu": "Огонь и свежий чай горячие (🔥☕). А противоположность — холодный лед и мороженое (🧊🍦)!",
          "bigEmojis": [
            "🔥",
            "🧊",
            "☕",
            "🍦"
          ],
          "audioTextAz": "Alov istidir, buz soyuqdur.",
          "audioTextEn": "Fire is hot, ice is cold.",
          "audioTextRu": "Огонь горячий, лед холодный."
        },
        "visualScene": {
          "type": "comparison",
          "leftItem": {
            "emoji": "🔥",
            "labelAz": "İsti Alov",
            "labelEn": "Hot Fire",
            "labelRu": "Горячий огонь"
          },
          "rightItem": {
            "emoji": "🧊",
            "labelAz": "Soyuq Buz",
            "labelEn": "Cold Ice",
            "labelRu": "Холодный лед"
          },
          "captionAz": "Əks anlayış: İsti Alov və Soyuq Buz",
          "captionEn": "Opposites: Hot Fire and Cold Ice",
          "captionRu": "Противоположность: Горячий огонь и Холодный лед"
        },
        "instruction": "İsti çayın əksi olan soyuq buzu tap.",
        "instructionEn": "Find cold ice, the opposite of hot tea.",
        "instructionRu": "Найди холодный лед, противоположность горячему чаю.",
        "type": "select",
        "question": "'İsti' sözünün əksi hansıdır?",
        "questionEn": "What is the opposite of the word 'Hot'?",
        "questionRu": "Какая противоположность слову «Горячий»?",
        "targetAudioText": "Soyuq olanı tap.",
        "targetAudioTextEn": "Find the cold one.",
        "targetAudioTextRu": "Найди холодное.",
        "options": [
          {
            "id": "op1",
            "text": "Soyuq Buz",
            "textEn": "Cold Ice",
            "textRu": "Холодный лед",
            "emoji": "🧊",
            "isCorrect": true
          },
          {
            "id": "op2",
            "text": "İsti Alov",
            "textEn": "Hot Fire",
            "textRu": "Горячий огонь",
            "emoji": "🔥",
            "isCorrect": false
          },
          {
            "id": "op3",
            "text": "Qaynar Çay",
            "textEn": "Boiling Tea",
            "textRu": "Кипящий чай",
            "emoji": "☕",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! İsti sözünün əksi soyuq buzdur! 🧊",
        "explanationEn": "Correct! The opposite of hot is cold ice! 🧊",
        "explanationRu": "Правильно! Противоположность горячему — холодный лед! 🧊"
      },
      {
        "id": "opp-day-night-2",
        "title": "Gündüz və Gecə",
        "titleEn": "Day and Night",
        "titleRu": "День и Ночь",
        "lesson": {
          "id": "opp-lesson-day-night",
          "conceptTitleAz": "Gündüz və Gecə Əks Anlayışlarını Öyrənək!",
          "conceptTitleEn": "Let's Learn Day and Night!",
          "conceptTitleRu": "Учим противоположности «День» и «Ночь»!",
          "explanationAz": "Gündüz parlaq günəş saçır və hər yer işıqlı olur (☀️). Əksi isə gecədir: göydə ay və ulduzlar parıldayır, hər kəs yatır (🌙⭐)!",
          "explanationEn": "During the day the sun shines bright (☀️). The opposite is night: moon and stars sparkle while we sleep (🌙⭐)!",
          "explanationRu": "Днем ярко светит солнышко (☀️). А ночью на небе сияют луна и звезды, и все спят (🌙⭐)!",
          "bigEmojis": [
            "☀️",
            "🌙",
            "⭐",
            "🌈"
          ],
          "audioTextAz": "Gündüz günəş çıxır, gecə ay görünür.",
          "audioTextEn": "The sun rises by day, the moon appears by night.",
          "audioTextRu": "Днем светит солнце, ночью видна луна."
        },
        "visualScene": {
          "type": "comparison",
          "leftItem": {
            "emoji": "☀️",
            "labelAz": "İşıqlı Gündüz",
            "labelEn": "Bright Day",
            "labelRu": "Светлый день"
          },
          "rightItem": {
            "emoji": "🌙",
            "labelAz": "Qaranlıq Gecə",
            "labelEn": "Dark Night",
            "labelRu": "Темная ночь"
          },
          "captionAz": "Əks anlayış: İşıqlı Gündüz və Qaranlıq Gecə",
          "captionEn": "Opposites: Bright Day and Dark Night",
          "captionRu": "Противоположность: Светлый день и Темная ночь"
        },
        "instruction": "İşıqlı gündüzün əksi olan qaranlıq gecəni seç.",
        "instructionEn": "Select dark night, the opposite of bright day.",
        "instructionRu": "Выбери темную ночь, противоположность светлому дню.",
        "type": "select",
        "question": "'Gündüz' sözünün əksi hansıdır?",
        "questionEn": "What is the opposite of the word 'Day'?",
        "questionRu": "Какая противоположность слову «День»?",
        "targetAudioText": "Gecəni seç.",
        "targetAudioTextEn": "Select night.",
        "targetAudioTextRu": "Выбери ночь.",
        "options": [
          {
            "id": "op4",
            "text": "Qaranlıq Gecə",
            "textEn": "Dark Night",
            "textRu": "Темная ночь",
            "emoji": "🌙",
            "isCorrect": true
          },
          {
            "id": "op5",
            "text": "Parlaq Günəş",
            "textEn": "Bright Sun",
            "textRu": "Яркое солнце",
            "emoji": "☀️",
            "isCorrect": false
          },
          {
            "id": "op6",
            "text": "Göyqurşağı",
            "textEn": "Rainbow",
            "textRu": "Радуга",
            "emoji": "🌈",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Gündüzün əksi qaranlıq və sakit gecədir! 🌙⭐",
        "explanationEn": "Well done! The opposite of day is quiet night! 🌙⭐",
        "explanationRu": "Молодец! Противоположность дню — тихая ночь! 🌙⭐"
      },
      {
        "id": "opp-fast-slow-3",
        "title": "Sürətli və Yavaş",
        "titleEn": "Fast and Slow",
        "titleRu": "Быстрый и Медленный",
        "visualScene": {
          "type": "comparison",
          "leftItem": {
            "emoji": "🐆",
            "labelAz": "Sürətli Çita",
            "labelEn": "Fast Cheetah",
            "labelRu": "Быстрый гепард"
          },
          "rightItem": {
            "emoji": "🐢",
            "labelAz": "Yavaş Tısbağa",
            "labelEn": "Slow Turtle",
            "labelRu": "Медленная черепаха"
          },
          "captionAz": "Əks anlayış: Sürətli Çita və Yavaş Tısbağa",
          "captionEn": "Opposites: Fast Cheetah and Slow Turtle",
          "captionRu": "Противоположность: Быстрый гепард и Медленная черепаха"
        },
        "instruction": "Sürətli qaçan heyvanın əksi olan yavaş tısbağanı tap.",
        "instructionEn": "Find the slow turtle, the opposite of the fast runner.",
        "instructionRu": "Найди медленную черепаху, противоположность быстрому бегуну.",
        "type": "select",
        "question": "'Sürətli' sözünün əksi hansıdır?",
        "questionEn": "What is the opposite of the word 'Fast'?",
        "questionRu": "Какая противоположность слову «Быстрый»?",
        "targetAudioText": "Yavaş olanı seç.",
        "targetAudioTextEn": "Select the slow one.",
        "targetAudioTextRu": "Выбери медленное.",
        "options": [
          {
            "id": "op7",
            "text": "Yavaş Tısbağa",
            "textEn": "Slow Turtle",
            "textRu": "Медленная черепаха",
            "emoji": "🐢",
            "isCorrect": true
          },
          {
            "id": "op8",
            "text": "Sürətli Bəbir",
            "textEn": "Fast Leopard",
            "textRu": "Быстрый леопард",
            "emoji": "🐆",
            "isCorrect": false
          },
          {
            "id": "op9",
            "text": "Cəld Dovşan",
            "textEn": "Quick Bunny",
            "textRu": "Шустрый кролик",
            "emoji": "🐰",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Tısbağa aramla və çox yavaş addımlayır! 🐢",
        "explanationEn": "Great! The turtle walks very slowly and calmly! 🐢",
        "explanationRu": "Отлично! Черепашка шагает не спеша и очень медленно! 🐢"
      },
      {
        "id": "opp-clean-dirty-4",
        "title": "Təmiz və Çirkli",
        "titleEn": "Clean and Dirty",
        "titleRu": "Чистый и Грязный",
        "instruction": "Çirkli əllərin əksi nədir? Təmiz əlləri tap.",
        "instructionEn": "What is the opposite of dirty hands? Find clean hands.",
        "instructionRu": "Какая противоположность грязным рукам? Найди чистые руки.",
        "type": "select",
        "question": "Çirkli sözünün əksi hansıdır?",
        "questionEn": "What is the opposite of the word 'Dirty'?",
        "questionRu": "Какая противоположность слову «Грязный»?",
        "targetAudioText": "Təmiz olanı tap.",
        "targetAudioTextEn": "Find the clean one.",
        "targetAudioTextRu": "Найди чистое.",
        "options": [
          {
            "id": "op10",
            "text": "Təmiz Sabunlu Əl",
            "textEn": "Clean Soapy Hand",
            "textRu": "Чистые мыльные руки",
            "emoji": "🧼",
            "isCorrect": true
          },
          {
            "id": "op11",
            "text": "Palçıqlı Çəkmə",
            "textEn": "Muddy Boot",
            "textRu": "Грязный сапог",
            "emoji": "👢",
            "isCorrect": false
          },
          {
            "id": "op12",
            "text": "Tozlu Parça",
            "textEn": "Dusty Cloth",
            "textRu": "Пыльная тряпка",
            "emoji": "🧻",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Sabunla yuyulmuş əllər tərtəmizdir! 🧼✨",
        "explanationEn": "Super! Hands washed with soap are squeaky clean! 🧼✨",
        "explanationRu": "Супер! Вымытые с мылом ручки сияют чистотой! 🧼✨"
      }
    ]
  },
  {
    "id": "numbers",
    "slug": "saylar",
    "titleAz": "Saylar",
    "titleEn": "Numbers",
    "titleRu": "Числа",
    "descriptionAz": "1-dən 10-a qədər sayma, sayları tanıma və miqdarı anlama.",
    "emoji": "🔢",
    "group": "speech",
    "minAge": 2,
    "maxAge": 6,
    "color": "from-cyan-600 to-blue-500",
    "activities": [
      {
        "id": "num-count-3-apples-1",
        "title": "3 Almanı Say",
        "titleEn": "Count 3 Apples",
        "titleRu": "Посчитай 3 яблока",
        "lesson": {
          "id": "num-lesson-1-5",
          "conceptTitleAz": "1-dən 5-ə Qədər Saymağı Öyrənək!",
          "conceptTitleEn": "Let's Learn Counting from 1 to 5!",
          "conceptTitleRu": "Учим Счет от 1 до 5!",
          "explanationAz": "Barmaqlarımızı açaq və birgə sayaq: 1 (bir), 2 (iki), 3 (üç), 4 (dörd), 5 (beş)! Bir əlimizdə düz 5 barmaq var (✋)!",
          "explanationEn": "Let's count our fingers together: 1 (one), 2 (two), 3 (three), 4 (four), 5 (five)! There are 5 fingers on one hand (✋)!",
          "explanationRu": "Давайте считать пальчики: 1 (один), 2 (два), 3 (три), 4 (четыре), 5 (пять)! На одной руке ровно 5 пальцев (✋)!",
          "bigEmojis": [
            "1️⃣",
            "2️⃣",
            "3️⃣",
            "4️⃣",
            "5️⃣"
          ],
          "audioTextAz": "Bir, iki, üç, dörd, beş! Əlimizdə beş barmaq var.",
          "audioTextEn": "One, two, three, four, five! Five fingers on a hand.",
          "audioTextRu": "Один, два, три, четыре, пять! На руке пять пальцев."
        },
        "visualScene": {
          "type": "count",
          "customEmojis": [
            "🍎",
            "🍎",
            "🍎"
          ],
          "captionAz": "Şəkil: 3 ədəd qırmızı alma 🍎🍎🍎",
          "captionEn": "Picture: 3 red apples 🍎🍎🍎",
          "captionRu": "Картинка: 3 красных яблока 🍎🍎🍎"
        },
        "instruction": "Şəklə bax və almaları say: Neçə alma var?",
        "instructionEn": "Look at the picture and count: How many apples are there?",
        "instructionRu": "Посмотри на картинку и посчитай: Сколько яблок?",
        "type": "select",
        "question": "Ekranda neçə dənə dadlı alma görürsən?",
        "questionEn": "How many delicious apples do you see on the screen?",
        "questionRu": "Сколько вкусных яблок ты видишь на экране?",
        "targetAudioText": "Üç almanı seç.",
        "targetAudioTextEn": "Select three apples.",
        "targetAudioTextRu": "Выбери три яблока.",
        "options": [
          {
            "id": "nm1",
            "text": "3 Alma",
            "textEn": "3 Apples",
            "textRu": "3 Яблока",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "nm2",
            "text": "1 Alma",
            "textEn": "1 Apple",
            "textRu": "1 Яблоко",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "nm3",
            "text": "5 Alma",
            "textEn": "5 Apples",
            "textRu": "5 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Birlikdə saydıq: 1, 2, 3 alma! 🍎🍎🍎",
        "explanationEn": "Well done! We counted together: 1, 2, 3 apples! 🍎🍎🍎",
        "explanationRu": "Молодец! Посчитали вместе: 1, 2, 3 яблока! 🍎🍎🍎"
      },
      {
        "id": "num-fingers-5-2",
        "title": "5 Barmaq",
        "titleEn": "5 Fingers",
        "titleRu": "5 Пальцев",
        "instruction": "Bir əlimizdə neçə barmaq olduğunu seç.",
        "instructionEn": "Select how many fingers are on one hand.",
        "instructionRu": "Выбери, сколько пальцев на одной руке.",
        "type": "select",
        "question": "Bir əlimizi açdıqda neçə dənə barmağımız olur?",
        "questionEn": "When we open one hand, how many fingers are there?",
        "questionRu": "Сколько пальчиков на одной руке, если ее раскрыть?",
        "targetAudioText": "5 barmağı tap.",
        "targetAudioTextEn": "Find 5 fingers.",
        "targetAudioTextRu": "Найди 5 пальцев.",
        "options": [
          {
            "id": "nm4",
            "text": "5 Barmaq",
            "textEn": "5 Fingers",
            "textRu": "5 Пальцев",
            "emoji": "✋",
            "isCorrect": true
          },
          {
            "id": "nm5",
            "text": "2 Barmaq",
            "textEn": "2 Fingers",
            "textRu": "2 Пальца",
            "emoji": "✌️",
            "isCorrect": false
          },
          {
            "id": "nm6",
            "text": "10 Barmaq",
            "textEn": "10 Fingers",
            "textRu": "10 Пальцев",
            "emoji": "👐",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Bir əlimizdə düz 5 dənə barmaq var! ✋✨",
        "explanationEn": "Great! Exactly 5 fingers on one hand! ✋✨",
        "explanationRu": "Отлично! На одной руке ровно 5 пальцев! ✋✨"
      },
      {
        "id": "num-sun-1-3",
        "title": "Tək Günəş",
        "titleEn": "Single Sun",
        "titleRu": "Одно солнце",
        "instruction": "Səmada neçə parlaq günəş olduğunu seç.",
        "instructionEn": "Select how many shining suns are in the sky.",
        "instructionRu": "Выбери, сколько ярких солнышек светит на небе.",
        "type": "select",
        "question": "Göydə gündüzlər işıq saçan neçə dənə günəş var?",
        "questionEn": "How many suns shine bright in the sky during the day?",
        "questionRu": "Сколько солнышек сияет на небе днем?",
        "targetAudioText": "1 günəşi tap.",
        "targetAudioTextEn": "Find 1 sun.",
        "targetAudioTextRu": "Найди 1 солнце.",
        "options": [
          {
            "id": "nm7",
            "text": "1 Günəş",
            "textEn": "1 Sun",
            "textRu": "1 Солнце",
            "emoji": "☀️",
            "isCorrect": true
          },
          {
            "id": "nm8",
            "text": "4 Günəş",
            "textEn": "4 Suns",
            "textRu": "4 Солнца",
            "emoji": "☀️",
            "isCorrect": false
          },
          {
            "id": "nm9",
            "text": "8 Günəş",
            "textEn": "8 Suns",
            "textRu": "8 Солнц",
            "emoji": "☀️",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Dünyamızı bir dənə parlaq günəş isidir! ☀️",
        "explanationEn": "Correct! One bright sun warms our world! ☀️",
        "explanationRu": "Правильно! Одно яркое солнце греет наш мир! ☀️"
      },
      {
        "id": "num-after-5-4",
        "title": "5-dən Sonra 6 Gəlir",
        "titleEn": "6 Comes After 5",
        "titleRu": "После 5 идет 6",
        "lesson": {
          "id": "num-lesson-6-10",
          "conceptTitleAz": "6-dan 10-a Qədər Saymağı Öyrənək!",
          "conceptTitleEn": "Let's Learn Counting from 6 to 10!",
          "conceptTitleRu": "Учим Счет от 6 до 10!",
          "explanationAz": "5-dən sonra davam edirik: 6 (altı), 7 (yeddi), 8 (səkkiz), 9 (doqquz) və 10 (on)! İki əlimizi açanda cəmi 10 barmaq olur (👐)!",
          "explanationEn": "After 5 we continue: 6 (six), 7 (seven), 8 (eight), 9 (nine), and 10 (ten)! Opening both hands gives 10 fingers (👐)!",
          "explanationRu": "После пяти продолжаем: 6 (шесть), 7 (семь), 8 (восемь), 9 (девять) и 10 (десять)! На двух руках вместе 10 пальцев (👐)!",
          "bigEmojis": [
            "6️⃣",
            "7️⃣",
            "8️⃣",
            "9️⃣",
            "🔟"
          ],
          "audioTextAz": "Altı, yeddi, səkkiz, doqquz, on! İki əldə on barmaq var.",
          "audioTextEn": "Six, seven, eight, nine, ten! Ten fingers on two hands.",
          "audioTextRu": "Шесть, семь, восемь, девять, десять! На двух руках десять пальцев."
        },
        "instruction": "5-dən sonra hansı rəqəmin gəldiyini tap.",
        "instructionEn": "Find which number comes after 5.",
        "instructionRu": "Найди, какое число идет после 5.",
        "type": "select",
        "question": "Sayarkən 5 rəqəmindən dərhal sonra hansı rəqəm gəlir?",
        "questionEn": "Which number comes immediately after 5 when counting?",
        "questionRu": "Какое число идет сразу за числом 5 при счете?",
        "targetAudioText": "6 rəqəmini seç.",
        "targetAudioTextEn": "Select number 6.",
        "targetAudioTextRu": "Выбери число 6.",
        "options": [
          {
            "id": "nm10",
            "text": "6 Rəqəmi",
            "textEn": "Number 6",
            "textRu": "Число 6",
            "emoji": "6️⃣",
            "isCorrect": true
          },
          {
            "id": "nm11",
            "text": "4 Rəqəmi",
            "textEn": "Number 4",
            "textRu": "Число 4",
            "emoji": "4️⃣",
            "isCorrect": false
          },
          {
            "id": "nm12",
            "text": "2 Rəqəmi",
            "textEn": "Number 2",
            "textRu": "Число 2",
            "emoji": "2️⃣",
            "isCorrect": false
          }
        ],
        "explanation": "Bəli! 5-dən sonra məhz 6 rəqəmi gəlir! 6️⃣",
        "explanationEn": "Yes! Number 6 comes right after 5! 6️⃣",
        "explanationRu": "Да! Сразу за числом 5 идет число 6! 6️⃣"
      },
      {
        "id": "num-ten-10-5",
        "title": "Böyük 10 Rəqəmi",
        "titleEn": "Big Number 10",
        "titleRu": "Большое число 10",
        "instruction": "9-dan sonra gələn 10 rəqəmini seç.",
        "instructionEn": "Select number 10, which follows 9.",
        "instructionRu": "Выбери число 10, следующее за 9.",
        "type": "select",
        "question": "Sayarkən 9-dan sonra hansı böyük rəqəm gəlir?",
        "questionEn": "Which big number comes after 9 when counting?",
        "questionRu": "Какое круглое число идет после 9 при счете?",
        "targetAudioText": "10 rəqəmini tap.",
        "targetAudioTextEn": "Find number 10.",
        "targetAudioTextRu": "Найди число 10.",
        "options": [
          {
            "id": "nm13",
            "text": "10 Rəqəmi",
            "textEn": "Number 10",
            "textRu": "Число 10",
            "emoji": "🔟",
            "isCorrect": true
          },
          {
            "id": "nm14",
            "text": "7 Rəqəmi",
            "textEn": "Number 7",
            "textRu": "Число 7",
            "emoji": "7️⃣",
            "isCorrect": false
          },
          {
            "id": "nm15",
            "text": "3 Rəqəmi",
            "textEn": "Number 3",
            "textRu": "Число 3",
            "emoji": "3️⃣",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm! 10 tam bir onluqdur! 🔟🎉",
        "explanationEn": "Awesome! 10 is a full ten! 🔟🎉",
        "explanationRu": "Замечательно! 10 — это целый десяток! 🔟🎉"
      }
    ]
  },
  {
    "id": "letters",
    "slug": "herfler",
    "titleAz": "Hərflər və Əlifba",
    "titleEn": "Letters & Alphabet",
    "titleRu": "Буквы и Азбука",
    "descriptionAz": "Səslər, hərflər, sait və samitlər, əlifbanın ilk addımları.",
    "emoji": "🔤",
    "group": "speech",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-indigo-600 to-purple-400",
    "activities": [
      {
        "id": "let-a-apple-1",
        "title": "'A' Hərfi və Alma",
        "titleEn": "Letter 'A' and Apple",
        "titleRu": "Буква «А» и Яблоко",
        "lesson": {
          "id": "let-lesson-a-b",
          "conceptTitleAz": "'A' və 'B' Hərflərini Öyrənək!",
          "conceptTitleEn": "Let's Learn Letters 'A' and 'B'!",
          "conceptTitleRu": "Учим Буквы «А» и «Б»!",
          "explanationAz": "Əlifbanın ilk hərfi 'A' hərfidir: A - Alma (🍎), A - Ayı (🐻)! Sonra 'B' hərfi gəlir: B - Balıq (🐟), B - Banan (🍌)!",
          "explanationEn": "The first letter of the alphabet is 'A': A for Apple (🍎)! Next comes 'B': B for Fish/Ball/Banana (🍌)!",
          "explanationRu": "Первая буква алфавита — «А»: А — Арбуз, А — Айва (🍎)! За ней идет «Б»: Б — Банан, Б — Бабочка (🍌)!",
          "bigEmojis": [
            "🅰️",
            "🍎",
            "🅱️",
            "🐟"
          ],
          "audioTextAz": "A - alma, B - balıq. Hərfləri öyrənirik.",
          "audioTextEn": "A is for apple, B is for banana. We learn letters.",
          "audioTextRu": "А — яблоко, Б — банан. Учим буквы."
        },
        "instruction": "'Alma' sözünün ilk hərfini tap.",
        "instructionEn": "Find the first letter of the word 'Apple'.",
        "instructionRu": "Найди первую букву слова «Яблоко» / «Алма».",
        "type": "select",
        "question": "'Alma' sözü hansı gözəl hərflə başlayır?",
        "questionEn": "Which letter does the word 'Alma' (Apple) start with?",
        "questionRu": "С какой буквы начинается слово «Алма» (Яблоко)?",
        "targetAudioText": "'A' hərfini seç.",
        "targetAudioTextEn": "Select letter A.",
        "targetAudioTextRu": "Выбери букву А.",
        "options": [
          {
            "id": "lt1",
            "text": "'A' hərfi",
            "textEn": "Letter 'A'",
            "textRu": "Буква «А»",
            "emoji": "🅰️",
            "isCorrect": true
          },
          {
            "id": "lt2",
            "text": "'B' hərfi",
            "textEn": "Letter 'B'",
            "textRu": "Буква «Б»",
            "emoji": "🅱️",
            "isCorrect": false
          },
          {
            "id": "lt3",
            "text": "'O' hərfi",
            "textEn": "Letter 'O'",
            "textRu": "Буква «О»",
            "emoji": "🅾️",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! 'Alma' sözü məhz 'A' hərfi ilə başlayır! 🍎🅰️",
        "explanationEn": "Well done! The word 'Alma' begins with letter 'A'! 🍎🅰️",
        "explanationRu": "Молодец! Слово «Алма» начинается с буквы «А»! 🍎🅰️"
      },
      {
        "id": "let-b-fish-2",
        "title": "'B' Hərfi və Balıq",
        "titleEn": "Letter 'B' and Fish",
        "titleRu": "Буква «Б» и Рыбка",
        "instruction": "'Balıq' sözünün ilk hərfini seç.",
        "instructionEn": "Select the first letter of 'Balıq' (Fish).",
        "instructionRu": "Выбери первую букву слова «Балык» (Рыба).",
        "type": "select",
        "question": "'Balıq' və 'Banan' sözləri hansı hərflə başlayır?",
        "questionEn": "Which letter do 'Balıq' and 'Banan' start with?",
        "questionRu": "С какой буквы начинаются слова «Балык» и «Банан»?",
        "targetAudioText": "'B' hərfini tap.",
        "targetAudioTextEn": "Find letter B.",
        "targetAudioTextRu": "Найди букву Б.",
        "options": [
          {
            "id": "lt4",
            "text": "'B' hərfi",
            "textEn": "Letter 'B'",
            "textRu": "Буква «Б»",
            "emoji": "🅱️",
            "isCorrect": true
          },
          {
            "id": "lt5",
            "text": "'A' hərfi",
            "textEn": "Letter 'A'",
            "textRu": "Буква «А»",
            "emoji": "🅰️",
            "isCorrect": false
          },
          {
            "id": "lt6",
            "text": "'C' hərfi",
            "textEn": "Letter 'C'",
            "textRu": "Буква «В»",
            "emoji": "🅲",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! 'Balıq' sözü 'B' hərfi ilə başlayır! 🐟🅱️",
        "explanationEn": "Great! 'Balıq' begins with letter 'B'! 🐟🅱️",
        "explanationRu": "Отлично! Слово «Балык» начинается с буквы «Б»! 🐟🅱️"
      },
      {
        "id": "let-c-chick-3",
        "title": "'C' Hərfi və Cücə",
        "titleEn": "Letter 'C' and Chick",
        "titleRu": "Буква «Дж»/«Ц» и Цыпленок",
        "lesson": {
          "id": "let-lesson-c-d",
          "conceptTitleAz": "'C' və 'D' Hərflərini Öyrənək!",
          "conceptTitleEn": "Let's Learn Letters 'C' and 'D'!",
          "conceptTitleRu": "Учим Буквы «C» и «D»!",
          "explanationAz": "C - Cücə (🐥), C - Ceyran! D - Dovşan (🐰), D - Dəniz (🌊)! Hərfləri birləşdirib sözlər oxuyuruq!",
          "explanationEn": "C is for Chick (🐥)! D is for Bunny and Sea (🐰🌊)! We connect letters to read words!",
          "explanationRu": "С — Цыпленок (🐥)! Д — Зайчик и Море (🐰🌊)! Соединяем буквы и читаем слова!",
          "bigEmojis": [
            "🅲",
            "🐥",
            "🅳",
            "🐰"
          ],
          "audioTextAz": "C - cücə, D - dovşan. Hərfləri oxuyuruq.",
          "audioTextEn": "C is for chick, D is for bunny. We read letters.",
          "audioTextRu": "Ц — цыпленок, Д — зайчик. Читаем буквы."
        },
        "instruction": "'Cücə' sözünün ilk hərfini tap.",
        "instructionEn": "Find the first letter of 'Cücə' (Chick).",
        "instructionRu": "Найди первую букву слова «Джуджа» (Цыпленок).",
        "type": "select",
        "question": "'Cücə' sözü hansı sevimli hərflə başlayır?",
        "questionEn": "Which letter does the word 'Cücə' begin with?",
        "questionRu": "С какой буквы начинается слово «Цыпленок» / «Джуджа»?",
        "targetAudioText": "'C' hərfini seç.",
        "targetAudioTextEn": "Select letter C.",
        "targetAudioTextRu": "Выбери букву C.",
        "options": [
          {
            "id": "lt7",
            "text": "'C' hərfi",
            "textEn": "Letter 'C'",
            "textRu": "Буква «C»",
            "emoji": "🅲",
            "isCorrect": true
          },
          {
            "id": "lt8",
            "text": "'A' hərfi",
            "textEn": "Letter 'A'",
            "textRu": "Буква «А»",
            "emoji": "🅰️",
            "isCorrect": false
          },
          {
            "id": "lt9",
            "text": "'M' hərfi",
            "textEn": "Letter 'M'",
            "textRu": "Буква «М»",
            "emoji": "🅼",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! 'C' hərfi ilə sarı cücə oxuyur! 🐥🅲",
        "explanationEn": "Correct! Letter 'C' starts the chick word! 🐥🅲",
        "explanationRu": "Правильно! Буква «C» начинает слово цыпленка! 🐥🅲"
      },
      {
        "id": "let-d-rabbit-4",
        "title": "'D' Hərfi və Dovşan",
        "titleEn": "Letter 'D' and Bunny",
        "titleRu": "Буква «Д» и Зайчик",
        "instruction": "'Dovşan' sözünün ilk hərfini tap.",
        "instructionEn": "Find the first letter of 'Dovşan' (Bunny).",
        "instructionRu": "Найди первую букву слова «Довшан» (Заяц).",
        "type": "select",
        "question": "'Dovşan' və 'Dəniz' sözləri hansı hərflə başlayır?",
        "questionEn": "Which letter do 'Dovşan' and 'Dəniz' start with?",
        "questionRu": "С какой буквы начинаются слова «Довшан» и «Дениз»?",
        "targetAudioText": "'D' hərfini tap.",
        "targetAudioTextEn": "Find letter D.",
        "targetAudioTextRu": "Найди букву Д.",
        "options": [
          {
            "id": "lt10",
            "text": "'D' hərfi",
            "textEn": "Letter 'D'",
            "textRu": "Буква «Д»",
            "emoji": "🅳",
            "isCorrect": true
          },
          {
            "id": "lt11",
            "text": "'B' hərfi",
            "textEn": "Letter 'B'",
            "textRu": "Буква «Б»",
            "emoji": "🅱️",
            "isCorrect": false
          },
          {
            "id": "lt12",
            "text": "'K' hərfi",
            "textEn": "Letter 'K'",
            "textRu": "Буква «К»",
            "emoji": "🅺",
            "isCorrect": false
          }
        ],
        "explanation": "Super! 'Dovşan' sözü 'D' hərfi ilə başlayır! 🐰🅳",
        "explanationEn": "Super! 'Dovşan' starts with letter 'D'! 🐰🅳",
        "explanationRu": "Супер! Слово «Довшан» начинается с буквы «Д»! 🐰🅳"
      }
    ]
  },
  {
    "id": "sounds",
    "slug": "fonematik-sesler",
    "titleAz": "Fonematik eşitmə və səslər",
    "titleEn": "Phonemic Sounds",
    "titleRu": "Фонематические звуки",
    "descriptionAz": "Səsləri fərqləndirmə, təbiət səsləri, heca tələffüzü.",
    "emoji": "👂",
    "group": "speech",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-purple-600 to-pink-500",
    "activities": [
      {
        "id": "snd-wind-1",
        "title": "Küləyin Səsi: Şşş",
        "titleEn": "Wind Sound: Shhh",
        "titleRu": "Звук ветра: Ш-ш-ш",
        "lesson": {
          "id": "snd-lesson-nature",
          "conceptTitleAz": "Təbiət və Canlı Səslərini Öyrənək!",
          "conceptTitleEn": "Let's Learn Sounds of Nature!",
          "conceptTitleRu": "Учим Звуки Природы!",
          "explanationAz": "Külək ağacları yelləyərkən 'Şşş-şşş' səsi çıxarır (💨). Balaca arı güllərə qonanda 'Vzzz-vzzz' edir (🐝). Qatar isə 'Çu-çu' deyir (🚂)!",
          "explanationEn": "The wind rustles leaves with 'Shhh-shhh' (💨). The little bee buzzes 'Bzzz-bzzz' over flowers (🐝). The train goes 'Choo-choo' (🚂)!",
          "explanationRu": "Ветер шумит в деревьях «Ш-ш-ш» (💨). Маленькая пчелка жужжит «Ж-ж-ж/Вз-з-з» (🐝). А поезд гудит «Чу-чу» (🚂)!",
          "bigEmojis": [
            "💨",
            "🐝",
            "🚂",
            "🔔"
          ],
          "audioTextAz": "Külək şşş edir, arı vızıldayır, qatar çu-çu edir.",
          "audioTextEn": "Wind blows shhh, bee buzzes, train goes choo-choo.",
          "audioTextRu": "Ветер шумит ш-ш-ш, пчелка жужжит, поезд чу-чу."
        },
        "instruction": "Külək əsəndə çıxan səsi seç.",
        "instructionEn": "Select the sound the wind makes when blowing.",
        "instructionRu": "Выбери звук, который издает дующий ветер.",
        "type": "select",
        "question": "Güclü külək yarpaqları tərpədərkən hansı səsi çıxarır?",
        "questionEn": "Which sound does strong wind make rustling leaves?",
        "questionRu": "Какой звук издает сильный ветер, качая листву?",
        "targetAudioText": "'Şşş-şşş' səsini tap.",
        "targetAudioTextEn": "Find 'Shhh' sound.",
        "targetAudioTextRu": "Найди звук «Ш-ш-ш».",
        "options": [
          {
            "id": "sn1",
            "text": "💨 'Şşş-şşş'",
            "textEn": "💨 'Shhh-shhh'",
            "textRu": "💨 «Ш-ш-ш»",
            "emoji": "💨",
            "isCorrect": true
          },
          {
            "id": "sn2",
            "text": "🐝 'Vzz-vzz'",
            "textEn": "🐝 'Bzzz-bzzz'",
            "textRu": "🐝 «Ж-ж-ж»",
            "emoji": "🐝",
            "isCorrect": false
          },
          {
            "id": "sn3",
            "text": "🚂 'Çu-çu'",
            "textEn": "🚂 'Choo-choo'",
            "textRu": "🚂 «Чу-чу»",
            "emoji": "🚂",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Külək yarpaqları yellədərək 'Şşş' edir! 💨🍃",
        "explanationEn": "Well done! The wind rustles leaves with 'Shhh'! 💨🍃",
        "explanationRu": "Молодец! Ветер колышет листья со звуком «Ш-ш-ш»! 💨🍃"
      },
      {
        "id": "snd-bee-2",
        "title": "Arının Vızıltısı: Vzzz",
        "titleEn": "Bee Buzz: Bzzz",
        "titleRu": "Жужжание пчелки: Ж-ж-ж",
        "instruction": "Güllərin üstündə uçan arının səsini seç.",
        "instructionEn": "Select the sound of the bee flying over flowers.",
        "instructionRu": "Выбери звук пчелки, летающей над цветами.",
        "type": "select",
        "question": "Bal arısı güllərdən şirə toplayanda hansı səslə vızıldayır?",
        "questionEn": "Which buzzing sound does a bee make collecting nectar?",
        "questionRu": "С каким жужжанием пчелка собирает нектар с цветов?",
        "targetAudioText": "Arının səsini seç.",
        "targetAudioTextEn": "Select the bee sound.",
        "targetAudioTextRu": "Выбери звук пчелы.",
        "options": [
          {
            "id": "sn4",
            "text": "🐝 'Vzzz-vzzz'",
            "textEn": "🐝 'Bzzz-bzzz'",
            "textRu": "🐝 «Ж-ж-ж»",
            "emoji": "🐝",
            "isCorrect": true
          },
          {
            "id": "sn5",
            "text": "🐱 'Miyau'",
            "textEn": "🐱 'Meow'",
            "textRu": "🐱 «Мяу»",
            "emoji": "🐱",
            "isCorrect": false
          },
          {
            "id": "sn6",
            "text": "🐶 'Hav-hav'",
            "textEn": "🐶 'Woof-woof'",
            "textRu": "🐶 «Гав-гав»",
            "emoji": "🐶",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Zəhmətkeş arı 'Vzzz' edərək bal hazırlayır! 🐝🍯",
        "explanationEn": "Great! The busy bee buzzes 'Bzzz' making honey! 🐝🍯",
        "explanationRu": "Отлично! Трудолюбивая пчелка жужжит «Ж-ж-ж» и делает мед! 🐝🍯"
      },
      {
        "id": "snd-train-3",
        "title": "Qatarın Səsi: Çu-çu",
        "titleEn": "Train Sound: Choo-Choo",
        "titleRu": "Звук поезда: Чу-чу",
        "instruction": "Relslərdə şütüyən qatarın səsini tap.",
        "instructionEn": "Find the sound of the train speeding on rails.",
        "instructionRu": "Найди звук поезда, мчащегося по рельсам.",
        "type": "select",
        "question": "Dəmiryolunda gedən qatar fit verərkən hansı səsi çıxarır?",
        "questionEn": "Which sound does a whistling train make on railway tracks?",
        "questionRu": "Какой звук издает поезд, свистя на рельсах?",
        "targetAudioText": "'Çu-çu' səsini tap.",
        "targetAudioTextEn": "Find 'Choo-choo' sound.",
        "targetAudioTextRu": "Найди звук «Чу-чу».",
        "options": [
          {
            "id": "sn7",
            "text": "🚂 'Çu-çu, çu-çu'",
            "textEn": "🚂 'Choo-choo'",
            "textRu": "🚂 «Чу-чу, чу-чу»",
            "emoji": "🚂",
            "isCorrect": true
          },
          {
            "id": "sn8",
            "text": "🔔 'Cin-cin'",
            "textEn": "🔔 'Ding-dong'",
            "textRu": "🔔 «Динь-динь»",
            "emoji": "🔔",
            "isCorrect": false
          },
          {
            "id": "sn9",
            "text": "💧 'Tıp-tıp'",
            "textEn": "💧 'Drip-drop'",
            "textRu": "💧 «Кап-кап»",
            "emoji": "💧",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Qatar 'Çu-çu' edərək vaqonları aparır! 🚂✨",
        "explanationEn": "Super! The train goes 'Choo-choo' pulling wagons! 🚂✨",
        "explanationRu": "Супер! Поезд со звуком «Чу-чу» мчит вперед! 🚂✨"
      },
      {
        "id": "snd-water-4",
        "title": "Yağış Damlası: Tıp-tıp",
        "titleEn": "Raindrop: Drip-Drop",
        "titleRu": "Капли дождя: Кап-кап",
        "instruction": "Pəncərəyə düşən yağış damlasının səsini seç.",
        "instructionEn": "Select the sound of raindrops falling on the window.",
        "instructionRu": "Выбери звук капель дождя, падающих на окно.",
        "type": "select",
        "question": "Yağış damlaları yarpaqlara və pəncərəyə dəyəndə hansı səs çıxır?",
        "questionEn": "What sound do raindrops make falling on leaves and windows?",
        "questionRu": "Какой звук издают капли дождя, стуча по стеклу?",
        "targetAudioText": "'Tıp-tıp' səsini seç.",
        "targetAudioTextEn": "Select 'Drip-drop'.",
        "targetAudioTextRu": "Выбери «Кап-кап».",
        "options": [
          {
            "id": "sn10",
            "text": "💧 'Tıp-tıp, tıp-tıp'",
            "textEn": "💧 'Drip-drop'",
            "textRu": "💧 «Кап-кап, кап-кап»",
            "emoji": "💧",
            "isCorrect": true
          },
          {
            "id": "sn11",
            "text": "🚗 'Bi-bi'",
            "textEn": "🚗 'Beep-beep'",
            "textRu": "🚗 «Би-би»",
            "emoji": "🚗",
            "isCorrect": false
          },
          {
            "id": "sn12",
            "text": "🥁 'Bum-bum'",
            "textEn": "🥁 'Boom-boom'",
            "textRu": "🥁 «Бум-бум»",
            "emoji": "🥁",
            "isCorrect": false
          }
        ],
        "explanation": "Bəli! Yağış damcıları 'Tıp-tıp' edib təbiəti sulayır! 💧🌱",
        "explanationEn": "Yes! Raindrops go 'Drip-drop' watering nature! 💧🌱",
        "explanationRu": "Да! Дождевые капли стучат «Кап-кап», поливая природу! 💧🌱"
      }
    ]
  },
  {
    "id": "vocabulary",
    "slug": "luget-ehtiyati",
    "titleAz": "Lüğət ehtiyatı",
    "titleEn": "Vocabulary Building",
    "titleRu": "Словарный запас",
    "descriptionAz": "Yeni sözlər, əlamətlər, təbiət hadisələri və sinonimlər.",
    "emoji": "📚",
    "group": "speech",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-sky-600 to-indigo-500",
    "activities": [
      {
        "id": "voc-snow-1",
        "title": "Ağappaq Qar",
        "titleEn": "Pure White Snow",
        "titleRu": "Белоснежный снег",
        "lesson": {
          "id": "voc-lesson-weather",
          "conceptTitleAz": "Təbiət Hadisələrini Öyrənək!",
          "conceptTitleEn": "Let's Learn Weather Wonders!",
          "conceptTitleRu": "Учим Явления Природы!",
          "explanationAz": "Qışda göydən ağappaq soyuq qar dənəcikləri yağır (❄️). İsti yayda parlaq günəş şəfəq saçır (☀️). Yağışdan sonra isə göydə rəngbərəng göyqurşağı görünür (🌈)!",
          "explanationEn": "In winter white cold snowflakes fall from the sky (❄️). In summer bright sun shines warm (☀️). After rain a colorful rainbow appears (🌈)!",
          "explanationRu": "Зимой с неба падают белые пушистые снежинки (❄️). Летом греет яркое солнце (☀️). А после дождя на небе сияет радуга (🌈)!",
          "bigEmojis": [
            "☀️",
            "🌧️",
            "❄️",
            "🌈"
          ],
          "audioTextAz": "Qışda qar yağır, yayda günəş çıxır, yağışdan sonra göyqurşağı yaranır.",
          "audioTextEn": "Snow falls in winter, sun shines in summer, rainbow shines after rain.",
          "audioTextRu": "Зимой идет снег, летом светит солнце, после дождя — радуга."
        },
        "instruction": "Qışda göydən yağan ağ dənəcikləri seç.",
        "instructionEn": "Select the white flakes falling from the sky in winter.",
        "instructionRu": "Выбери белые хлопья, падающие с неба зимой.",
        "type": "select",
        "question": "Qış fəslində səmada ağappaq lopa-lopa yağan nədir?",
        "questionEn": "What falls softly from the sky as white flakes in winter?",
        "questionRu": "Что падает с неба белыми пушистыми хлопьями зимой?",
        "targetAudioText": "Qarı seç.",
        "targetAudioTextEn": "Select snow.",
        "targetAudioTextRu": "Выбери снег.",
        "options": [
          {
            "id": "vc1",
            "text": "Qar dənələri",
            "textEn": "Snowflakes",
            "textRu": "Снежинки",
            "emoji": "❄️",
            "isCorrect": true
          },
          {
            "id": "vc2",
            "text": "İsti Günəş",
            "textEn": "Warm Sun",
            "textRu": "Теплое солнце",
            "emoji": "☀️",
            "isCorrect": false
          },
          {
            "id": "vc3",
            "text": "Külək",
            "textEn": "Wind",
            "textRu": "Ветер",
            "emoji": "💨",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Qışda qar yağır və uşaqlar qardan adam düzəldirlər! ❄️☃️",
        "explanationEn": "Well done! Snow falls in winter and kids build snowmen! ❄️☃️",
        "explanationRu": "Молодец! Зимой идет снег, и дети лепят снеговиков! ❄️☃️"
      },
      {
        "id": "voc-rainbow-2",
        "title": "Rəngarəng Göyqurşağı",
        "titleEn": "Colorful Rainbow",
        "titleRu": "Цветная радуга",
        "instruction": "Yağışdan sonra səmada görünən göyqurşağını tap.",
        "instructionEn": "Find the rainbow appearing in the sky after rain.",
        "instructionRu": "Найди радугу, появляющуюся на небе после дождя.",
        "type": "select",
        "question": "Yağış kəsdikdən və günəş çıxdıqdan sonra səmada parlayan əlvan körpü nədir?",
        "questionEn": "What colorful bridge shines in the sky after rain when sun emerges?",
        "questionRu": "Какой цветной мостик сияет в небе после дождя при солнце?",
        "targetAudioText": "Göyqurşağını tap.",
        "targetAudioTextEn": "Find the rainbow.",
        "targetAudioTextRu": "Найди радугу.",
        "options": [
          {
            "id": "vc4",
            "text": "Göyqurşağı",
            "textEn": "Rainbow",
            "textRu": "Радуга",
            "emoji": "🌈",
            "isCorrect": true
          },
          {
            "id": "vc5",
            "text": "Qara Bulud",
            "textEn": "Dark Cloud",
            "textRu": "Темная туча",
            "emoji": "☁️",
            "isCorrect": false
          },
          {
            "id": "vc6",
            "text": "Şimşək",
            "textEn": "Lightning",
            "textRu": "Молния",
            "emoji": "⚡",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm! Göyqurşağında yeddi gözəl rəng var! 🌈✨",
        "explanationEn": "Awesome! The rainbow has seven glorious colors! 🌈✨",
        "explanationRu": "Замечательно! В радуге семь прекрасных цветов! 🌈✨"
      },
      {
        "id": "voc-sun-3",
        "title": "İşıq Saçan Günəş",
        "titleEn": "Shining Sun",
        "titleRu": "Сияющее солнце",
        "instruction": "Yer üzünü qızdıran parlaq günəşi seç.",
        "instructionEn": "Select the bright sun that warms the earth.",
        "instructionRu": "Выбери яркое солнце, согревающее землю.",
        "type": "select",
        "question": "Hər səhər doğan, bitkiləri və bizi isidən göy cismi hansıdır?",
        "questionEn": "Which celestial body rises each morning warming plants and us?",
        "questionRu": "Какое небесное светило встает каждое утро и греет нас?",
        "targetAudioText": "Günəşi seç.",
        "targetAudioTextEn": "Select the sun.",
        "targetAudioTextRu": "Выбери солнце.",
        "options": [
          {
            "id": "vc7",
            "text": "Parlaq Günəş",
            "textEn": "Bright Sun",
            "textRu": "Яркое солнце",
            "emoji": "☀️",
            "isCorrect": true
          },
          {
            "id": "vc8",
            "text": "Soyuq Buz",
            "textEn": "Cold Ice",
            "textRu": "Холодный лед",
            "emoji": "🧊",
            "isCorrect": false
          },
          {
            "id": "vc9",
            "text": "Qaranlıq Gecə",
            "textEn": "Dark Night",
            "textRu": "Темная ночь",
            "emoji": "🌑",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Günəş həyat mənbəyidir və hər kəsə enerji verir! ☀️🌻",
        "explanationEn": "Correct! The sun is the source of life and warmth! ☀️🌻",
        "explanationRu": "Правильно! Солнце — источник жизни и тепла! ☀️🌻"
      },
      {
        "id": "voc-autumn-leaf-4",
        "title": "Qızılı Payız Yarpağı",
        "titleEn": "Golden Autumn Leaf",
        "titleRu": "Золотой осенний лист",
        "instruction": "Payızda ağaclardan tökülən sarı-qızılı yarpağı tap.",
        "instructionEn": "Find the golden autumn leaf falling from trees.",
        "instructionRu": "Найди золотой осенний лист, падающий с деревьев.",
        "type": "select",
        "question": "Payız gələndə ağaclardan saralıb yerə tökülən nədir?",
        "questionEn": "What turns golden and falls to the ground in autumn?",
        "questionRu": "Что желтеет и падает на землю осенью?",
        "targetAudioText": "Payız yarpağını seç.",
        "targetAudioTextEn": "Select autumn leaf.",
        "targetAudioTextRu": "Выбери осенний лист.",
        "options": [
          {
            "id": "vc10",
            "text": "Payız Yarpağı",
            "textEn": "Autumn Leaf",
            "textRu": "Осенний лист",
            "emoji": "🍂",
            "isCorrect": true
          },
          {
            "id": "vc11",
            "text": "Yaşıl Ot",
            "textEn": "Green Grass",
            "textRu": "Зеленая трава",
            "emoji": "🌱",
            "isCorrect": false
          },
          {
            "id": "vc12",
            "text": "Çiçək Qönçəsi",
            "textEn": "Flower Bud",
            "textRu": "Бутон цветка",
            "emoji": "🌷",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Payızda yarpaqlar qızılı xalça kimi yerə səpələnir! 🍂🍁",
        "explanationEn": "Great! In autumn leaves scatter like a golden carpet! 🍂🍁",
        "explanationRu": "Отлично! Осенью листья устилают землю золотым ковром! 🍂🍁"
      }
    ]
  },
  {
    "id": "sentence-building",
    "slug": "cumle-qurma",
    "titleAz": "Cümlə qurma",
    "titleEn": "Sentence Building",
    "titleRu": "Построение предложений",
    "descriptionAz": "Sözləri birləşdirərək mənalı cümlələr tərtib edək.",
    "emoji": "✍️",
    "group": "speech",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-teal-600 to-green-500",
    "activities": [
      {
        "id": "sent-child-eats-apple-1",
        "title": "Uşaq Alma Yeyir",
        "titleEn": "Child Eats Apple",
        "titleRu": "Ребенок ест яблоко",
        "lesson": {
          "id": "sent-lesson-build",
          "conceptTitleAz": "Gözəl Cümlələr Quraq!",
          "conceptTitleEn": "Let's Build Wonderful Sentences!",
          "conceptTitleRu": "Учимся строить предложения!",
          "explanationAz": "Cümlə qurarkən əvvəlcə kimin etdiyini, sonra nə etdiyini deyirik: 'Uşaq alma yeyir' (🧒🍎), 'Pişik süd içir' (🐱🥛)!",
          "explanationEn": "When making a sentence, first we say who does it, then the action: 'Child eats apple' (🧒🍎), 'Cat drinks milk' (🐱🥛)!",
          "explanationRu": "В предложении сначала говорим кто, а затем что делает: «Ребенок ест яблоко» (🧒🍎), «Кошка пьет молоко» (🐱🥛)!",
          "bigEmojis": [
            "🧒",
            "🍎",
            "🐱",
            "🥛"
          ],
          "audioTextAz": "Uşaq alma yeyir. Pişik süd içir.",
          "audioTextEn": "Child eats apple. Cat drinks milk.",
          "audioTextRu": "Ребенок ест яблоко. Кошка пьет молоко."
        },
        "instruction": "Sözləri sırası ilə seçərək 'Uşaq alma yeyir' cümləsini qur.",
        "instructionEn": "Select the words in order to build 'Child eats apple'.",
        "instructionRu": "Выбери слова по порядку: «Ребенок ест яблоко».",
        "type": "sentence",
        "question": "Aşağıdakı sözlərdən 'Uşaq alma yeyir' cümləsini düzəlt:",
        "questionEn": "Build the sentence 'Child eats apple' from the words below:",
        "questionRu": "Составь предложение «Ребенок ест яблоко» из слов ниже:",
        "sentenceWords": [
          "alma",
          "Uşaq",
          "yeyir"
        ],
        "sentenceWordsEn": [
          "eats",
          "Child",
          "apple"
        ],
        "sentenceWordsRu": [
          "ест",
          "Ребенок",
          "яблоко"
        ],
        "correctSentence": "Uşaq alma yeyir",
        "correctSentenceEn": "Child eats apple",
        "correctSentenceRu": "Ребенок ест яблоко",
        "explanation": "Afərin! 'Uşaq alma yeyir' tam düzgün cümlədir! 🧒🍎",
        "explanationEn": "Well done! 'Child eats apple' is completely correct! 🧒🍎",
        "explanationRu": "Молодец! «Ребенок ест яблоко» — отличное предложение! 🧒🍎"
      },
      {
        "id": "sent-cat-drinks-milk-2",
        "title": "Pişik Süd İçir",
        "titleEn": "Cat Drinks Milk",
        "titleRu": "Кошка пьет молоко",
        "instruction": "'Pişik süd içir' cümləsini qur.",
        "instructionEn": "Build the sentence 'Cat drinks milk'.",
        "instructionRu": "Составь предложение «Кошка пьет молоко».",
        "type": "sentence",
        "question": "Sözləri düzgün ardıcıllıqla toplayaraq cümlə qur:",
        "questionEn": "Order words to make a clear sentence:",
        "questionRu": "Расставь слова в правильном порядке:",
        "sentenceWords": [
          "süd",
          "Pişik",
          "içir"
        ],
        "sentenceWordsEn": [
          "drinks",
          "Cat",
          "milk"
        ],
        "sentenceWordsRu": [
          "пьет",
          "Кошка",
          "молоко"
        ],
        "correctSentence": "Pişik süd içir",
        "correctSentenceEn": "Cat drinks milk",
        "correctSentenceRu": "Кошка пьет молоко",
        "explanation": "Əla! 'Pişik süd içir' cümləsini çox gözəl qurdun! 🐱🥛",
        "explanationEn": "Great! You built 'Cat drinks milk' wonderfully! 🐱🥛",
        "explanationRu": "Отлично! «Кошка пьет молоко» составлено верно! 🐱🥛"
      },
      {
        "id": "sent-sun-shines-3",
        "title": "Günəş İşıq Saçır",
        "titleEn": "Sun Shines Bright",
        "titleRu": "Солнце ярко светит",
        "instruction": "'Günəş işıq saçır' cümləsini düzəlt.",
        "instructionEn": "Build 'Sun shines bright'.",
        "instructionRu": "Составь предложение «Солнце ярко светит».",
        "type": "sentence",
        "question": "Gözəl səhər üçün cümləni qur:",
        "questionEn": "Build the sentence for a sunny morning:",
        "questionRu": "Составь предложение про солнечное утро:",
        "sentenceWords": [
          "işıq",
          "Günəş",
          "saçır"
        ],
        "sentenceWordsEn": [
          "shines",
          "Sun",
          "bright"
        ],
        "sentenceWordsRu": [
          "ярко",
          "Солнце",
          "светит"
        ],
        "correctSentence": "Günəş işıq saçır",
        "correctSentenceEn": "Sun shines bright",
        "correctSentenceRu": "Солнце ярко светит",
        "explanation": "Super! Parlaq günəş dünyamızı işıqlandırır! ☀️✨",
        "explanationEn": "Super! The bright sun illuminates our world! ☀️✨",
        "explanationRu": "Супер! Яркое солнце освещает весь мир! ☀️✨"
      }
    ]
  },
  {
    "id": "question-answer",
    "slug": "sual-cavab",
    "titleAz": "Sual-cavab",
    "titleEn": "Question & Answer",
    "titleRu": "Вопрос-ответ",
    "descriptionAz": "Kim? Nə? Harada? Niyə? suallarına düzgün cavab vermə.",
    "emoji": "💬",
    "group": "speech",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-blue-500 to-teal-400",
    "activities": [
      {
        "id": "qa-fish-swim-1",
        "title": "Balıq Harada Üzür?",
        "titleEn": "Where Does Fish Swim?",
        "titleRu": "Где плавает рыбка?",
        "lesson": {
          "id": "qa-lesson-where",
          "conceptTitleAz": "'Harada?' və 'Kim?' Suallarına Cavab Verək!",
          "conceptTitleEn": "Let's Answer 'Where?' and 'Who?' Questions!",
          "conceptTitleRu": "Учимся отвечать на вопросы «Где?» и «Кто?»!",
          "explanationAz": "Hər varlığın öz məkanı var! Balıqlar suda və dənizdə üzür (🐟🌊). Quşlar səmada qanad çalıb uçur (🐦🌤️)!",
          "explanationEn": "Every creature has its home! Fish swim in water and sea (🐟🌊). Birds fly in the open sky (🐦🌤️)!",
          "explanationRu": "У каждого создания свой дом! Рыбки плавают в воде и море (🐟🌊). А птицы летают в небе (🐦🌤️)!",
          "bigEmojis": [
            "❓",
            "🌊",
            "🌤️",
            "🌳"
          ],
          "audioTextAz": "Balıq suda üzür, quş göydə uçur.",
          "audioTextEn": "Fish swim in water, birds fly in sky.",
          "audioTextRu": "Рыба плавает в воде, птица летает в небе."
        },
        "instruction": "Balığın harada üzdüyünü tap.",
        "instructionEn": "Find where the fish swims.",
        "instructionRu": "Найди, где плавает рыбка.",
        "type": "select",
        "question": "Qızıl balıqlar harada yaşayır və üzür?",
        "questionEn": "Where do goldfish live and swim?",
        "questionRu": "Где живут и плавают золотые рыбки?",
        "targetAudioText": "Suda üzməyi seç.",
        "targetAudioTextEn": "Select swimming in water.",
        "targetAudioTextRu": "Выбери плавание в воде.",
        "options": [
          {
            "id": "qa1",
            "text": "Suda və dənizdə",
            "textEn": "In water and sea",
            "textRu": "В воде и море",
            "emoji": "🌊",
            "isCorrect": true
          },
          {
            "id": "qa2",
            "text": "Ağacın budağında",
            "textEn": "On a tree branch",
            "textRu": "На ветке дерева",
            "emoji": "🌳",
            "isCorrect": false
          },
          {
            "id": "qa3",
            "text": "Buludun üstündə",
            "textEn": "On a cloud",
            "textRu": "На облаке",
            "emoji": "☁️",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Balıqlar təmiz suda quyruqlarını yelləyərək üzürlər! 🐟🌊",
        "explanationEn": "Well done! Fish swim wagging their tails in clear water! 🐟🌊",
        "explanationRu": "Молодец! Рыбки плавают в чистой воде, шевеля хвостом! 🐟🌊"
      },
      {
        "id": "qa-birds-fly-2",
        "title": "Quşlar Harada Uçur?",
        "titleEn": "Where Do Birds Fly?",
        "titleRu": "Где летают птицы?",
        "instruction": "Quşların uçduğu yeri seç.",
        "instructionEn": "Select where birds fly.",
        "instructionRu": "Выбери место, где летают птицы.",
        "type": "select",
        "question": "Quşlar qanad çalıb harada sərbəst uçurlar?",
        "questionEn": "Where do birds flap their wings and fly freely?",
        "questionRu": "Где птицы свободно летают, взмахивая крыльями?",
        "targetAudioText": "Göy üzünü seç.",
        "targetAudioTextEn": "Select the sky.",
        "targetAudioTextRu": "Выбери небо.",
        "options": [
          {
            "id": "qa4",
            "text": "Mavi səmada",
            "textEn": "In the blue sky",
            "textRu": "В синем небе",
            "emoji": "🌤️",
            "isCorrect": true
          },
          {
            "id": "qa5",
            "text": "Qutunun içində",
            "textEn": "Inside a box",
            "textRu": "В коробке",
            "emoji": "📦",
            "isCorrect": false
          },
          {
            "id": "qa6",
            "text": "Torpağın altında",
            "textEn": "Underground",
            "textRu": "Под землей",
            "emoji": "🕳️",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Quşlar uca mavi səmada uçurlar! 🐦🌤️",
        "explanationEn": "Great! Birds soar across the high blue sky! 🐦🌤️",
        "explanationRu": "Отлично! Птицы парят высоко в синем небе! 🐦🌤️"
      },
      {
        "id": "qa-sleep-night-3",
        "title": "Nə Zaman Yatırıq?",
        "titleEn": "When Do We Sleep?",
        "titleRu": "Когда мы спим?",
        "instruction": "Yuxuya getdiyimiz vaxtı seç.",
        "instructionEn": "Select the time we go to sleep.",
        "instructionRu": "Выбери время, когда мы ложимся спать.",
        "type": "select",
        "question": "Göy üzündə ay və ulduzlar görünəndə nə vaxt olur və biz nə edirik?",
        "questionEn": "When the moon and stars appear in the sky, what do we do?",
        "questionRu": "Когда на небе появляются луна и звезды, что наступает?",
        "targetAudioText": "Gecə yuxusunu seç.",
        "targetAudioTextEn": "Select night sleep.",
        "targetAudioTextRu": "Выбери ночной сон.",
        "options": [
          {
            "id": "qa7",
            "text": "Gecə yatıb dincəlirik",
            "textEn": "Sleep at night",
            "textRu": "Ночью спим и отдыхаем",
            "emoji": "🌙",
            "isCorrect": true
          },
          {
            "id": "qa8",
            "text": "Günorta nahar edirik",
            "textEn": "Eat lunch",
            "textRu": "Обедаем",
            "emoji": "🍲",
            "isCorrect": false
          },
          {
            "id": "qa9",
            "text": "Səhər qaçırıq",
            "textEn": "Run in morning",
            "textRu": "Бегаем утром",
            "emoji": "🏃",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Gecə sakitlik düşəndə yatıb enerji toplayırıq! 🌙🛌",
        "explanationEn": "Correct! At peaceful night we sleep to restore our energy! 🌙🛌",
        "explanationRu": "Правильно! Ночью в тишине мы спим и набираемся сил! 🌙🛌"
      }
    ]
  },
  {
    "id": "event-sequencing",
    "slug": "hadiselerin-ardicilligi",
    "titleAz": "Hadisələrin ardıcıllığı",
    "titleEn": "Event Sequencing",
    "titleRu": "Последовательность событий",
    "descriptionAz": "Əvvəl, sonra, ən sonda nə baş verir? Məntiqi ardıcıllıq.",
    "emoji": "⏳",
    "group": "speech",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-amber-600 to-orange-500",
    "activities": [
      {
        "id": "seq-plant-flower-1",
        "title": "Gülün Böyüməsi",
        "titleEn": "Flower Blooming",
        "titleRu": "Рост цветка",
        "lesson": {
          "id": "seq-lesson-steps",
          "conceptTitleAz": "Hadisələrin Ardıcıllığını Öyrənək!",
          "conceptTitleEn": "Let's Learn Event Sequences!",
          "conceptTitleRu": "Учим Последовательность Событий!",
          "explanationAz": "Hər şey addım-addım baş verir! Məsələn: 1. Əvvəlcə toxumu torpağa əkirik (🌱). 2. Sonra onu su ilə sulayırıq (💧). 3. Ən sonda isə gözəl gül açır (🌸)!",
          "explanationEn": "Everything happens in orderly steps! For example: 1. First plant the seed (🌱). 2. Then water it (💧). 3. Finally a beautiful flower blooms (🌸)!",
          "explanationRu": "Все происходит по шагам! Например: 1. Сначала сажаем семечко в землю (🌱). 2. Затем поливаем водой (💧). 3. И вырастает прекрасный цветок (🌸)!",
          "bigEmojis": [
            "🌱",
            "💧",
            "🌿",
            "🌸"
          ],
          "audioTextAz": "Toxumu əkirik, sulayırıq, gül açır.",
          "audioTextEn": "Plant seed, water it, flower blooms.",
          "audioTextRu": "Сажаем семечко, поливаем, цветок распускается."
        },
        "instruction": "Düzgün ardıcıllığı təkrarlayaq və təsdiq edək.",
        "instructionEn": "Let's review the steps in order and complete.",
        "instructionRu": "Повторим правильный порядок шагов и завершим.",
        "type": "sequence",
        "question": "Toxumdan gülün böyümə ardıcıllığı necədir?",
        "questionEn": "What is the sequence of a flower blooming from seed?",
        "questionRu": "Какова последовательность роста цветка из семени?",
        "sequenceSteps": [
          {
            "id": "sq1",
            "text": "1. Toxumu torpağa əkirik",
            "textEn": "1. Plant seed in soil",
            "textRu": "1. Сажаем семечко в землю",
            "order": 1,
            "emoji": "🌱"
          },
          {
            "id": "sq2",
            "text": "2. Qayğı ilə su tökürük",
            "textEn": "2. Water carefully",
            "textRu": "2. Поливаем водой",
            "order": 2,
            "emoji": "💧"
          },
          {
            "id": "sq3",
            "text": "3. Rəngarəng gül açır",
            "textEn": "3. Flower blooms",
            "textRu": "3. Распускается цветок",
            "order": 3,
            "emoji": "🌸"
          }
        ],
        "explanation": "Afərin! Toxum su və günəşlə böyüyüb gözəl gül oldu! 🌸🌱",
        "explanationEn": "Well done! The seed grew into a lovely flower with water and sun! 🌸🌱",
        "explanationRu": "Молодец! Семечко с водой и солнцем выросло в прекрасный цветок! 🌸🌱"
      },
      {
        "id": "seq-wash-apple-2",
        "title": "Almanı Yu və Ye",
        "titleEn": "Wash and Eat Apple",
        "titleRu": "Помой и съешь яблоко",
        "instruction": "Alma yeməzdən əvvəl nə etməliyik?",
        "instructionEn": "What must we do before eating an apple?",
        "instructionRu": "Что нужно сделать перед тем, как съесть яблоко?",
        "type": "select",
        "question": "Ağacdan dərildikdən sonra almanı yeməzdən qabaq ilk növbədə nə etməliyik?",
        "questionEn": "Before eating an apple picked from the tree, what do we do first?",
        "questionRu": "Что нужно сделать с сорванным яблоком перед едой?",
        "targetAudioText": "Almanı təmiz yumağı seç.",
        "targetAudioTextEn": "Select washing the apple.",
        "targetAudioTextRu": "Выбери помыть яблоко.",
        "options": [
          {
            "id": "sq4",
            "text": "Əvvəl təmiz su ilə yuyuruq",
            "textEn": "Wash thoroughly with water",
            "textRu": "Сначала моем чистой водой",
            "emoji": "🧼",
            "isCorrect": true
          },
          {
            "id": "sq5",
            "text": "Yuyulmamış yeyirik",
            "textEn": "Eat without washing",
            "textRu": "Едим немытым",
            "emoji": "❌",
            "isCorrect": false
          },
          {
            "id": "sq6",
            "text": "Torpağa basdırırıq",
            "textEn": "Bury in soil",
            "textRu": "Закапываем в землю",
            "emoji": "🕳️",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Meyvələri mütləq yuyub sonra təmiz-təmiz yeməliyik! 🍎🧼",
        "explanationEn": "Correct! Always wash fruits clean before enjoying them! 🍎🧼",
        "explanationRu": "Правильно! Фрукты всегда нужно тщательно мыть перед едой! 🍎🧼"
      },
      {
        "id": "seq-morning-routine-3",
        "title": "Səhər Addımları",
        "titleEn": "Morning Steps",
        "titleRu": "Утренние шаги",
        "instruction": "Səhər addımlarının düzgün ardıcıllığını təsdiq et.",
        "instructionEn": "Confirm the correct order of morning steps.",
        "instructionRu": "Подтверди правильный порядок утренних шагов.",
        "type": "sequence",
        "question": "Səhər oyananda ardıcıllıq necə olmalıdır?",
        "questionEn": "What is the proper sequence upon waking up in the morning?",
        "questionRu": "Каков правильный порядок действий утром?",
        "sequenceSteps": [
          {
            "id": "sq7",
            "text": "1. Yuxudan gümrah oyanırıq",
            "textEn": "1. Wake up cheerfully",
            "textRu": "1. Просыпаемся бодрыми",
            "order": 1,
            "emoji": "⏰"
          },
          {
            "id": "sq8",
            "text": "2. Dişlərimizi və üzümüzü yuyuruq",
            "textEn": "2. Wash face and brush teeth",
            "textRu": "2. Умываемся и чистим зубы",
            "order": 2,
            "emoji": "🪥"
          },
          {
            "id": "sq9",
            "text": "3. Dadlı səhər yeməyi yeyirik",
            "textEn": "3. Eat a healthy breakfast",
            "textRu": "3. Вкусно завтракаем",
            "order": 3,
            "emoji": "🍳"
          }
        ],
        "explanation": "Super! Səhər təmizliyi və yeməyi günümüzü gümrah edir! ☀️🍳",
        "explanationEn": "Super! Fresh hygiene and breakfast power our whole day! ☀️🍳",
        "explanationRu": "Супер! Утренняя гигиена и завтрак заряжают бодростью на весь день! ☀️🍳"
      }
    ]
  },
  {
    "id": "story-building",
    "slug": "hekaye-qurma",
    "titleAz": "Hekayə qurma",
    "titleEn": "Story Building",
    "titleRu": "Сочинение историй",
    "descriptionAz": "Şəkillərə baxaraq nağıl və hekayə söyləmə, təxəyyül inkişafı.",
    "emoji": "📖",
    "group": "speech",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-rose-600 to-pink-400",
    "activities": [
      {
        "id": "st-bear-honey-1",
        "title": "Ayının Şirin Balı",
        "titleEn": "Bear's Sweet Honey",
        "titleRu": "Сладкий мед медведя",
        "lesson": {
          "id": "st-lesson-intro",
          "conceptTitleAz": "Birlikdə Nağıl Quraq!",
          "conceptTitleEn": "Let's Build Stories Together!",
          "conceptTitleRu": "Учимся Сочинять Сказки!",
          "explanationAz": "Hər bir nağılın qəhrəmanı və macərası olur! Meşədə gəzən balaca ayı şirin bal axtarırdı (🐻🍯). Balı tapanda şad olub dostları ilə bölüşdü (🎉)!",
          "explanationEn": "Every fairy tale has a hero and an adventure! The little bear walked in the forest looking for honey (🐻🍯). When he found it, he shared with friends (🎉)!",
          "explanationRu": "У каждой сказки есть герой и приключение! Мишка гулял по лесу и искал сладкий медок (🐻🍯). Найдя его, он угостил друзей (🎉)!",
          "bigEmojis": [
            "📖",
            "🐻",
            "🍯",
            "🎉"
          ],
          "audioTextAz": "Ayı meşədə bal tapdı və dostları ilə bölüşdü.",
          "audioTextEn": "The bear found honey and shared with friends.",
          "audioTextRu": "Медведь нашел мед и поделился с друзьями."
        },
        "instruction": "Hekayəni davam etdir: Ayı meşədə nə tapdı?",
        "instructionEn": "Continue the story: What did the bear find in the forest?",
        "instructionRu": "Продолжи историю: Что нашел медведь в лесу?",
        "type": "select",
        "question": "Balaca ayı meşədə ağacın koğuşunda nə tapdı?",
        "questionEn": "What did the little bear find in the hollow tree in the forest?",
        "questionRu": "Что нашел маленький мишка в дупле дерева?",
        "targetAudioText": "Şirin balı tap.",
        "targetAudioTextEn": "Find sweet honey.",
        "targetAudioTextRu": "Найди сладкий мед.",
        "options": [
          {
            "id": "st1",
            "text": "Ləzzətli şirin bal",
            "textEn": "Delicious sweet honey",
            "textRu": "Сладкий вкусный мед",
            "emoji": "🍯",
            "isCorrect": true
          },
          {
            "id": "st2",
            "text": "Ağır qaya daşı",
            "textEn": "Heavy rock stone",
            "textRu": "Тяжелый камень",
            "emoji": "🪨",
            "isCorrect": false
          },
          {
            "id": "st3",
            "text": "Köhnə ayaqqabı",
            "textEn": "Old shoe",
            "textRu": "Старый ботинок",
            "emoji": "👞",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Ayı ən sevdiyi şirin balı tapdı! 🐻🍯",
        "explanationEn": "Well done! The bear found his favorite sweet honey! 🐻🍯",
        "explanationRu": "Молодец! Медведь нашел свой любимый сладкий медок! 🐻🍯"
      },
      {
        "id": "st-bear-happy-2",
        "title": "Ayının Sevinci",
        "titleEn": "Bear's Joy",
        "titleRu": "Радость мишки",
        "instruction": "Balı yedikdən sonra ayı nə etdi?",
        "instructionEn": "What did the bear do after eating honey?",
        "instructionRu": "Что сделал медведь после того, как полакомился?",
        "type": "select",
        "question": "Balı yedikdən sonra ayı meşədə sevinclə nə etdi?",
        "questionEn": "What did the bear do joyfully in the forest after eating?",
        "questionRu": "Что радостно сделал мишка в лесу после меда?",
        "targetAudioText": "Şadlanıb rəqs etməyi seç.",
        "targetAudioTextEn": "Select joyful dancing.",
        "targetAudioTextRu": "Выбери веселый танец.",
        "options": [
          {
            "id": "st4",
            "text": "Şadlanıb dostları ilə rəqs etdi",
            "textEn": "Danced happily with friends",
            "textRu": "Весело плясал с друзьями",
            "emoji": "💃",
            "isCorrect": true
          },
          {
            "id": "st5",
            "text": "Ağlayıb kədərləndi",
            "textEn": "Cried sadly",
            "textRu": "Горько заплакал",
            "emoji": "😢",
            "isCorrect": false
          },
          {
            "id": "st6",
            "text": "Meşədən qaçdı",
            "textEn": "Ran away from woods",
            "textRu": "Убежал из леса",
            "emoji": "🏃",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Dostlarla şadlanmaq nağılın ən gözəl sonluğudur! 🐻🎉",
        "explanationEn": "Great! Celebrating with friends is the best story ending! 🐻🎉",
        "explanationRu": "Отлично! Праздновать с друзьями — лучший конец сказки! 🐻🎉"
      },
      {
        "id": "st-magic-box-3",
        "title": "Sehrli Sandıqça",
        "titleEn": "Magic Treasure Box",
        "titleRu": "Волшебный сундучок",
        "instruction": "Sehrli sandıqçadan nə çıxdı?",
        "instructionEn": "What came out of the magic box?",
        "instructionRu": "Что появилось из волшебного сундучка?",
        "type": "select",
        "question": "Uşaqlar sehrli sandığı açanda oradan nə çıxdı?",
        "questionEn": "What appeared when the children opened the magic box?",
        "questionRu": "Что появилось, когда дети открыли волшебный сундук?",
        "targetAudioText": "Parlaq ulduzları seç.",
        "targetAudioTextEn": "Select bright stars.",
        "targetAudioTextRu": "Выбери яркие звездочки.",
        "options": [
          {
            "id": "st7",
            "text": "Parlaq ulduzlar və şarlar",
            "textEn": "Bright stars and balloons",
            "textRu": "Яркие звезды и шарики",
            "emoji": "✨",
            "isCorrect": true
          },
          {
            "id": "st8",
            "text": "Qara palçıq",
            "textEn": "Black mud",
            "textRu": "Черная грязь",
            "emoji": "💩",
            "isCorrect": false
          },
          {
            "id": "st9",
            "text": "Köhnə süpürgə",
            "textEn": "Old broom",
            "textRu": "Старая метла",
            "emoji": "🧹",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Sehrli ulduzlar hər tərəfə sevinc saçdı! ✨🎈",
        "explanationEn": "Super! Magic stars filled the room with joy! ✨🎈",
        "explanationRu": "Супер! Волшебные звездочки озарили всё вокруг радостью! ✨🎈"
      }
    ]
  },
  {
    "id": "emotions",
    "slug": "emosiyalar",
    "titleAz": "Emosiyalar və hisslər",
    "titleEn": "Emotions & Feelings",
    "titleRu": "Эмоции и чувства",
    "descriptionAz": "Sevinc, kədər, qəzəb, qorxu, təəccüb və emosiyaları ifadə etmə.",
    "emoji": "😊",
    "group": "social",
    "minAge": 2,
    "maxAge": 7,
    "color": "from-amber-500 to-rose-400",
    "activities": [
      {
        "id": "emo-happy-1",
        "title": "Şad və Xoşbəxt Üz",
        "titleEn": "Happy and Joyful Face",
        "titleRu": "Радостное лицо",
        "lesson": {
          "id": "emo-lesson-core",
          "conceptTitleAz": "Emosiyalarımızı Öyrənək!",
          "conceptTitleEn": "Let's Learn About Emotions!",
          "conceptTitleRu": "Учим Наши Эмоции!",
          "explanationAz": "Hədiyyə alanda və ya dostlarımızla oynayanda sevinirik və gülümsəyirik (😊). Oyuncağımız qırılanda kədərlənirik (😢). Gözlənilməz möcüzə görəndə isə təəccüblənirik (😲)!",
          "explanationEn": "When getting gifts or playing with friends we feel happy and smile (😊). When a toy breaks we feel sad (😢). When seeing magic we feel surprised (😲)!",
          "explanationRu": "Когда нам дарят подарки или мы играем с друзьями, мы радуемся и улыбаемся (😊). Когда ломается игрушка, грустим (😢). А при чуде удивляемся (😲)!",
          "bigEmojis": [
            "😊",
            "😢",
            "😲",
            "🎉"
          ],
          "audioTextAz": "Gülürük və sevinirik, bəzən kədərlənirik, bəzən təəccüblənirik.",
          "audioTextEn": "We smile and rejoice, sometimes feel sad or surprised.",
          "audioTextRu": "Мы улыбаемся и радуемся, иногда грустим или удивляемся."
        },
        "instruction": "Sevincli və xoşbəxt olan simanı tap.",
        "instructionEn": "Find the happy and joyful face.",
        "instructionRu": "Найди радостное и счастливое личико.",
        "type": "select",
        "question": "Ad günümüzdə şad hədiyyə alanda hansı hissi keçiririk?",
        "questionEn": "How do we feel when receiving a wonderful birthday present?",
        "questionRu": "Какое чувство мы испытываем, получая подарок на день рождения?",
        "targetAudioText": "Sevinci seç.",
        "targetAudioTextEn": "Select joy.",
        "targetAudioTextRu": "Выбери радость.",
        "options": [
          {
            "id": "em1",
            "text": "Sevinc və Təbəssüm",
            "textEn": "Joy and Smile",
            "textRu": "Радость и улыбка",
            "emoji": "😊",
            "isCorrect": true
          },
          {
            "id": "em2",
            "text": "Kədər və Ağlamaq",
            "textEn": "Sadness and Tears",
            "textRu": "Грусть и слезы",
            "emoji": "😢",
            "isCorrect": false
          },
          {
            "id": "em3",
            "text": "Qəzəbli Siman",
            "textEn": "Angry Face",
            "textRu": "Злое лицо",
            "emoji": "😠",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Təbəssüm üzümüzə gözəllik və sevinc gətirir! 😊🎉",
        "explanationEn": "Well done! A smile brings joy and warmth to everyone! 😊🎉",
        "explanationRu": "Молодец! Улыбка приносит радость и тепло всем вокруг! 😊🎉"
      },
      {
        "id": "emo-sad-2",
        "title": "Kədərli Siman",
        "titleEn": "Sad Face",
        "titleRu": "Грустное лицо",
        "instruction": "Kədərlənmiş simanı tap.",
        "instructionEn": "Find the sad face.",
        "instructionRu": "Найди грустное личико.",
        "type": "select",
        "question": "Dizi əzilən və ya sevimli oyuncağı sınan uşaq hansı hissi keçirir?",
        "questionEn": "How does a child feel when they scrape a knee or break a toy?",
        "questionRu": "Что чувствует малыш, если ушиб коленку или сломал игрушку?",
        "targetAudioText": "Kədərli simanı tap.",
        "targetAudioTextEn": "Find the sad face.",
        "targetAudioTextRu": "Найди грустное лицо.",
        "options": [
          {
            "id": "em4",
            "text": "Kədərli Siman",
            "textEn": "Sad Face",
            "textRu": "Грустное лицо",
            "emoji": "😢",
            "isCorrect": true
          },
          {
            "id": "em5",
            "text": "Şən Gülüş",
            "textEn": "Joyful Laugh",
            "textRu": "Веселый смех",
            "emoji": "😄",
            "isCorrect": false
          },
          {
            "id": "em6",
            "text": "Yuxulu Siman",
            "textEn": "Sleepy Face",
            "textRu": "Сонное лицо",
            "emoji": "😴",
            "isCorrect": false
          }
        ],
        "explanation": "Doğrudur. Kədərlənəndə dostumuzu qucaqlayıb təsəlli veririk! 😢❤️",
        "explanationEn": "Correct. When someone is sad, we comfort them with a warm hug! 😢❤️",
        "explanationRu": "Правильно. Когда другу грустно, мы обнимаем и утешаем его! 😢❤️"
      },
      {
        "id": "emo-surprised-3",
        "title": "Təəccüblü Siman",
        "titleEn": "Surprised Face",
        "titleRu": "Удивленное лицо",
        "instruction": "Təəccüblənmiş simanı seç.",
        "instructionEn": "Select the surprised face.",
        "instructionRu": "Выбери удивленное личико.",
        "type": "select",
        "question": "Gözlənilmədən sehrli bir fişəng görəndə simamız necə olur?",
        "questionEn": "How does our face look when suddenly seeing magic fireworks?",
        "questionRu": "Какое у нас лицо, когда мы внезапно видим волшебный салют?",
        "targetAudioText": "Təəccübü seç.",
        "targetAudioTextEn": "Select surprise.",
        "targetAudioTextRu": "Выбери удивление.",
        "options": [
          {
            "id": "em7",
            "text": "Təəccüb",
            "textEn": "Surprise",
            "textRu": "Удивление",
            "emoji": "😲",
            "isCorrect": true
          },
          {
            "id": "em8",
            "text": "Yorğunluq",
            "textEn": "Tiredness",
            "textRu": "Усталость",
            "emoji": "🥱",
            "isCorrect": false
          },
          {
            "id": "em9",
            "text": "Qəzəb",
            "textEn": "Anger",
            "textRu": "Злость",
            "emoji": "😠",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! 'Ooo!' deyərək heyrətlə təəccüblənirik! 😲✨",
        "explanationEn": "Great! We go 'Wow!' with wide eyes when surprised! 😲✨",
        "explanationRu": "Отлично! Мы говорим «О-го!» с широко открытыми глазами! 😲✨"
      },
      {
        "id": "emo-calm-4",
        "title": "Sakit və Mehriban",
        "titleEn": "Calm and Gentle",
        "titleRu": "Спокойный и миролюбивый",
        "instruction": "Sakit və dinc simanı tap.",
        "instructionEn": "Find the calm and peaceful face.",
        "instructionRu": "Найди спокойное и умиротворенное личико.",
        "type": "select",
        "question": "Gözəl nağıla qulaq asarkən necə rahat və sakit oluruq?",
        "questionEn": "How calm and peaceful do we feel listening to a gentle story?",
        "questionRu": "Какое у нас чувство, когда мы спокойно слушаем добрую сказку?",
        "targetAudioText": "Sakit simanı seç.",
        "targetAudioTextEn": "Select calm face.",
        "targetAudioTextRu": "Выбери спокойное лицо.",
        "options": [
          {
            "id": "em10",
            "text": "Dinc və Sakit",
            "textEn": "Peaceful and Calm",
            "textRu": "Спокойное и доброе",
            "emoji": "😌",
            "isCorrect": true
          },
          {
            "id": "em11",
            "text": "Qışqıran",
            "textEn": "Screaming",
            "textRu": "Кричащее",
            "emoji": "😱",
            "isCorrect": false
          },
          {
            "id": "em12",
            "text": "Hirslənən",
            "textEn": "Furious",
            "textRu": "Разгневанное",
            "emoji": "😡",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Sakit olmaq qəlbimizə rahatlıq verir! 😌💖",
        "explanationEn": "Super! Feeling calm brings sweet harmony! 😌💖",
        "explanationRu": "Супер! Спокойствие приносит умиротворение и тепло! 😌💖"
      }
    ]
  },
  {
    "id": "social-skills",
    "slug": "sosial-bacariqlar",
    "titleAz": "Sosial ünsiyyət",
    "titleEn": "Social Skills",
    "titleRu": "Социальные навыки",
    "descriptionAz": "Salamlaşma, sağollaşma, təşəkkür etmə, kömək istəmə.",
    "emoji": "🤝",
    "group": "social",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-emerald-500 to-teal-400",
    "activities": [
      {
        "id": "soc-hello-1",
        "title": "Mehriban Salamlaşma",
        "titleEn": "Polite Greeting",
        "titleRu": "Вежливое приветствие",
        "lesson": {
          "id": "soc-lesson-polite",
          "conceptTitleAz": "Nəzakətli Sözləri Öyrənək!",
          "conceptTitleEn": "Let's Learn Polite Magic Words!",
          "conceptTitleRu": "Учим Волшебные Вежливые Слова!",
          "explanationAz": "Görüşəndə təbəssümlə 'Salam!' deyirik (👋). Kömək alanda və ya hədiyyə veriləndə 'Çox sağ ol!' deyirik (🙏). Nəzakətli sözlər hər kəsin qəlbini isidir!",
          "explanationEn": "When meeting friends we smile and say 'Hello!' (👋). When helped or given a treat we say 'Thank you!' (🙏). Polite words warm everyone's heart!",
          "explanationRu": "При встрече мы тепло говорим «Здравствуйте!» или «Привет!» (👋). За помощь говорим «Спасибо!» (🙏). Вежливые слова радуют людей!",
          "bigEmojis": [
            "👋",
            "🙏",
            "🤝",
            "💖"
          ],
          "audioTextAz": "Görüşəndə salam deyirik, kömək edəndə çox sağ ol deyirik.",
          "audioTextEn": "We greet with hello, we thank with gratitude.",
          "audioTextRu": "При встрече здороваемся, за помощь благодарим."
        },
        "instruction": "Səhər dostumuzla qarşılaşanda nə deyirik?",
        "instructionEn": "What do we say when meeting a friend in the morning?",
        "instructionRu": "Что мы говорим утром при встрече с другом?",
        "type": "select",
        "question": "Səhər bağçada və ya məktəbdə dostumuzu görəndə hansı mehriban sözü deyirik?",
        "questionEn": "Which friendly word do we say when meeting a friend in the morning?",
        "questionRu": "Какое доброе слово мы говорим утром другу?",
        "targetAudioText": "'Salam' sözünü seç.",
        "targetAudioTextEn": "Select 'Hello'.",
        "targetAudioTextRu": "Выбери «Привет!».",
        "options": [
          {
            "id": "sc1",
            "text": "👋 'Salam!'",
            "textEn": "👋 'Hello!'",
            "textRu": "👋 «Привет!»",
            "emoji": "👋",
            "isCorrect": true
          },
          {
            "id": "sc2",
            "text": "🚪 'Uzaqlaş'",
            "textEn": "🚪 'Go away'",
            "textRu": "🚪 «Уходи»",
            "emoji": "🚪",
            "isCorrect": false
          },
          {
            "id": "sc3",
            "text": "😴 'Gecən xeyrə'",
            "textEn": "😴 'Good night'",
            "textRu": "😴 «Спокойной ночи»",
            "emoji": "😴",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! 'Salam!' sözü dostluğu və mehribanlığı möhkəmləndirir! 👋❤️",
        "explanationEn": "Well done! 'Hello!' opens the door to friendship! 👋❤️",
        "explanationRu": "Молодец! «Привет!» открывает путь к дружбе! 👋❤️"
      },
      {
        "id": "soc-thanks-2",
        "title": "Təşəkkür Etmək",
        "titleEn": "Saying Thank You",
        "titleRu": "Сказать спасибо",
        "instruction": "Kimsə bizə kömək edəndə nə deyirik?",
        "instructionEn": "What do we say when someone helps us?",
        "instructionRu": "Что мы говорим, когда нам помогают?",
        "type": "select",
        "question": "Dostumuz bizə oyuncaq verəndə və ya kömək edəndə nə deyirik?",
        "questionEn": "What do we say when a friend shares a toy or helps us?",
        "questionRu": "Что мы говорим, когда друг делится игрушкой или помогает нам?",
        "targetAudioText": "'Çox sağ ol' seç.",
        "targetAudioTextEn": "Select 'Thank you'.",
        "targetAudioTextRu": "Выбери «Спасибо».",
        "options": [
          {
            "id": "sc4",
            "text": "🙏 'Çox sağ ol!'",
            "textEn": "🙏 'Thank you!'",
            "textRu": "🙏 «Спасибо большое!»",
            "emoji": "🙏",
            "isCorrect": true
          },
          {
            "id": "sc5",
            "text": "😠 'İstəmirəm'",
            "textEn": "😠 'I don't want'",
            "textRu": "😠 «Не хочу»",
            "emoji": "😠",
            "isCorrect": false
          },
          {
            "id": "sc6",
            "text": "🏃 'Qaçıram'",
            "textEn": "🏃 'Running'",
            "textRu": "🏃 «Убегаю»",
            "emoji": "🏃",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! 'Çox sağ ol!' demək ən gözəl nəzakət qaydasıdır! 🙏✨",
        "explanationEn": "Correct! Saying 'Thank you!' is wonderful etiquette! 🙏✨",
        "explanationRu": "Правильно! Говорить «Спасибо!» — прекрасное правило вежливости! 🙏✨"
      },
      {
        "id": "soc-please-3",
        "title": "Zəhmət Olmasa",
        "titleEn": "Please",
        "titleRu": "Пожалуйста",
        "instruction": "Bir şey xahiş edərkən deyilən sehrli sözü tap.",
        "instructionEn": "Find the magic word used when asking politely.",
        "instructionRu": "Найди волшебное слово вежливой просьбы.",
        "type": "select",
        "question": "Qələm və ya su istəyəndə hansı sehrli sözdən istifadə edirik?",
        "questionEn": "Which magic word do we say when politely asking for a pencil or water?",
        "questionRu": "Какое волшебное слово мы произносим при вежливой просьбе?",
        "targetAudioText": "'Zəhmət olmasa' seç.",
        "targetAudioTextEn": "Select 'Please'.",
        "targetAudioTextRu": "Выбери «Пожалуйста».",
        "options": [
          {
            "id": "sc7",
            "text": "💖 'Zəhmət olmasa'",
            "textEn": "💖 'Please'",
            "textRu": "💖 «Пожалуйста»",
            "emoji": "💖",
            "isCorrect": true
          },
          {
            "id": "sc8",
            "text": "😡 'Tez ver mənə!'",
            "textEn": "😡 'Give it fast!'",
            "textRu": "😡 «Быстро дай!»",
            "emoji": "😡",
            "isCorrect": false
          },
          {
            "id": "sc9",
            "text": "😭 'Ağlayıram'",
            "textEn": "😭 'Crying'",
            "textRu": "😭 «Плачу»",
            "emoji": "😭",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm! 'Zəhmət olmasa' hər qapını açan sehrli kəlmədir! 💖✨",
        "explanationEn": "Awesome! 'Please' is a magic key that opens every door! 💖✨",
        "explanationRu": "Замечательно! «Пожалуйста» — волшебный ключ к добрым сердцам! 💖✨"
      }
    ]
  },
  {
    "id": "turn-taking",
    "slug": "novbe-gozleme",
    "titleAz": "Növbə gözləmə",
    "titleEn": "Turn-Taking & Sharing",
    "titleRu": "Очередность и сотрудничество",
    "descriptionAz": "Oyunda növbəni gözləmə, bölüşmə və əməkdaşlıq.",
    "emoji": "⏳",
    "group": "social",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-amber-600 to-yellow-500",
    "activities": [
      {
        "id": "trn-slide-1",
        "title": "Sürüşkəndə Növbə",
        "titleEn": "Slide Turn",
        "titleRu": "Очередь на горке",
        "lesson": {
          "id": "trn-lesson-patience",
          "conceptTitleAz": "Növbə Gözləməyi Öyrənək!",
          "conceptTitleEn": "Let's Learn Taking Turns!",
          "conceptTitleRu": "Учимся Соблюдать Очередность!",
          "explanationAz": "Meydançada yelləncək və sürüşkəndə başqa uşaqlar olanda səbirlə növbəmizi gözləyirik (⏳🛝). Heç kimi itələmirik, növbə çatanda şadlanaraq sürüşürük!",
          "explanationEn": "At the playground when others are on swings or slides, we wait patiently for our turn (⏳🛝). We never push; we take turns happily!",
          "explanationRu": "На площадке, если на качелях или горке катаются дети, мы терпеливо ждем своей очереди (⏳🛝). Никого не толкаем и катаемся дружно!",
          "bigEmojis": [
            "⏳",
            "🛝",
            "👫",
            "🎯"
          ],
          "audioTextAz": "Növbəmizi səbirlə gözləyirik, dostlarımızı itələmirik.",
          "audioTextEn": "We wait our turn patiently and never push friends.",
          "audioTextRu": "Терпеливо ждем своей очереди и никого не толкаем."
        },
        "instruction": "Meydançada sürüşkəndə növbə gözləmə qaydasını seç.",
        "instructionEn": "Select the turn-taking rule on the playground slide.",
        "instructionRu": "Выбери правило очередности на детской горке.",
        "type": "select",
        "question": "Sürüşkəndə başqa bir uşaq olanda biz nə etməliyik?",
        "questionEn": "What should we do when another child is sliding?",
        "questionRu": "Что нужно делать, когда на горке катается другой малыш?",
        "targetAudioText": "Səbirlə növbə gözləməyi seç.",
        "targetAudioTextEn": "Select waiting patiently.",
        "targetAudioTextRu": "Выбери терпеливое ожидание очереди.",
        "options": [
          {
            "id": "tk1",
            "text": "⏳ Səbirlə növbəmizi gözləyirik",
            "textEn": "⏳ Wait patiently for turn",
            "textRu": "⏳ Терпеливо ждем очереди",
            "emoji": "⏳",
            "isCorrect": true
          },
          {
            "id": "tk2",
            "text": "😡 Uşağı itələyirik",
            "textEn": "😡 Push the child",
            "textRu": "😡 Толкаем ребенка",
            "emoji": "😡",
            "isCorrect": false
          },
          {
            "id": "tk3",
            "text": "😭 Qışqırırıq",
            "textEn": "😭 Scream loudly",
            "textRu": "😭 Кричим и плачем",
            "emoji": "😭",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Səbirlə növbə gözləmək təhlükəsiz və çox mədənidir! 🛝✨",
        "explanationEn": "Well done! Waiting your turn is safe and polite! 🛝✨",
        "explanationRu": "Молодец! Ждать очереди безопасно и вежливо! 🛝✨"
      },
      {
        "id": "trn-share-toy-2",
        "title": "Oyuncağı Bölüşmək",
        "titleEn": "Sharing the Toy",
        "titleRu": "Делиться игрушкой",
        "instruction": "Bir oyuncaq olanda necə oynamalıyıq?",
        "instructionEn": "How should we play when there is one toy?",
        "instructionRu": "Как играть дружно, если игрушка одна?",
        "type": "select",
        "question": "Bir sevimli oyuncaqla dostumuzla necə oynamalıyıq?",
        "questionEn": "How should we play with a friend when there is one toy?",
        "questionRu": "Как играть с другом, если машинка или кукла одна?",
        "targetAudioText": "Növbə ilə birgə oynamağı seç.",
        "targetAudioTextEn": "Select sharing turns.",
        "targetAudioTextRu": "Выбери совместную игру по очереди.",
        "options": [
          {
            "id": "tk4",
            "text": "👫 Növbə ilə birgə oynayırıq",
            "textEn": "👫 Take turns playing together",
            "textRu": "👫 Играем вместе по очереди",
            "emoji": "👫",
            "isCorrect": true
          },
          {
            "id": "tk5",
            "text": "❌ Tək mən oynamalıyam",
            "textEn": "❌ Only I should play",
            "textRu": "❌ Только я играю",
            "emoji": "❌",
            "isCorrect": false
          },
          {
            "id": "tk6",
            "text": "🗑️ Oyuncağı sındırırıq",
            "textEn": "🗑️ Break the toy",
            "textRu": "🗑️ Ломаем игрушку",
            "emoji": "🗑️",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Bölüşmək dostluğu daha da şirin edir! 👫❤️",
        "explanationEn": "Great! Sharing makes friendship even sweeter! 👫❤️",
        "explanationRu": "Отлично! Умение делиться делает дружбу крепче! 👫❤️"
      },
      {
        "id": "trn-board-game-3",
        "title": "Masaüstü Oyunda Növbə",
        "titleEn": "Board Game Turns",
        "titleRu": "Очередь в настольной игре",
        "instruction": "Oyunda zəri kimin atdığını tap.",
        "instructionEn": "Find who rolls the dice in a game.",
        "instructionRu": "Определи, кто бросает кубик в игре.",
        "type": "select",
        "question": "Masaüstü oyunda hər kəs zəri necə atmalıdır?",
        "questionEn": "How should everyone roll the dice in a board game?",
        "questionRu": "Как нужно бросать кубик в настольной игре?",
        "targetAudioText": "Öz növbəsində atmağı seç.",
        "targetAudioTextEn": "Select rolling on your turn.",
        "targetAudioTextRu": "Выбери бросать в свою очередь.",
        "options": [
          {
            "id": "tk7",
            "text": "🎯 Hər kəs öz növbəsində atır",
            "textEn": "🎯 Everyone rolls on their turn",
            "textRu": "🎯 Каждый бросает в свою очередь",
            "emoji": "🎯",
            "isCorrect": true
          },
          {
            "id": "tk8",
            "text": "🎲 Hamı eyni vaxtda atır",
            "textEn": "🎲 Everyone grabs at once",
            "textRu": "🎲 Все хватают сразу",
            "emoji": "🎲",
            "isCorrect": false
          },
          {
            "id": "tk9",
            "text": "❌ Zəri gizlədirik",
            "textEn": "❌ Hide the dice",
            "textRu": "❌ Прячем кубик",
            "emoji": "❌",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Qaydalara əməl edəndə oyun hamıya zövq verir! 🎯🎉",
        "explanationEn": "Super! Following rules makes games fun for everyone! 🎯🎉",
        "explanationRu": "Супер! Игра по правилам приносит радость всем! 🎯🎉"
      }
    ]
  },
  {
    "id": "daily-routines",
    "slug": "gundelik-rutinler",
    "titleAz": "Gündəlik rutinlər",
    "titleEn": "Daily Routines",
    "titleRu": "Ежедневные привычки",
    "descriptionAz": "Oyanmaq, dişləri fırçalamaq, səhər yeməyi, gəzinti, yuxu.",
    "emoji": "⏰",
    "group": "social",
    "minAge": 2,
    "maxAge": 6,
    "color": "from-sky-500 to-indigo-400",
    "activities": [
      {
        "id": "rt-morning-wash-1",
        "title": "Səhər Təmizliyi",
        "titleEn": "Morning Freshness",
        "titleRu": "Утренняя свежесть",
        "lesson": {
          "id": "rt-lesson-habits",
          "conceptTitleAz": "Gözəl Gündəlik Vərdişləri Öyrənək!",
          "conceptTitleEn": "Let's Learn Healthy Daily Habits!",
          "conceptTitleRu": "Учим Полезные Ежедневные Привычки!",
          "explanationAz": "Səhər zəngli saat çalanda oyanırıq (⏰). İlk növbədə əl-üzümüzü və dişlərimizi yuyuruq (🪥). Sonra dadlı səhər yeməyi yeyirik (🍳)!",
          "explanationEn": "In the morning the alarm clock rings and we wake up (⏰). First thing, we wash our face and brush teeth (🪥). Then we eat breakfast (🍳)!",
          "explanationRu": "Утром звонит будильник, и мы просыпаемся (⏰). Первым делом умываемся и чистим зубки (🪑). Затем вкусно завтракаем (🍳)!",
          "bigEmojis": [
            "⏰",
            "🛏️",
            "🪥",
            "🍳"
          ],
          "audioTextAz": "Oyanırıq, dişlərimizi yuyuruq, səhər yeməyi yeyirik.",
          "audioTextEn": "We wake up, brush our teeth, eat breakfast.",
          "audioTextRu": "Просыпаемся, чистим зубы, завтракаем."
        },
        "instruction": "Səhər yuxudan durduqda ilk növbədə nə etməliyik?",
        "instructionEn": "What should we do first upon waking up in the morning?",
        "instructionRu": "Что первым делом нужно сделать, проснувшись утром?",
        "type": "select",
        "question": "Səhər yataqdan qalxan kimi ilk növbədə nə edirik?",
        "questionEn": "As soon as we get out of bed in the morning, what do we do?",
        "questionRu": "Как только встаем с кровати утром, что мы делаем первым?",
        "targetAudioText": "Əl-üzü və dişləri yumağı seç.",
        "targetAudioTextEn": "Select washing face and teeth.",
        "targetAudioTextRu": "Выбери умывание и чистку зубов.",
        "options": [
          {
            "id": "rt1",
            "text": "🪥 Əl-üzümüzü və dişlərimizi yuyuruq",
            "textEn": "🪥 Wash face and brush teeth",
            "textRu": "🪥 Умываемся и чистим зубки",
            "emoji": "🪥",
            "isCorrect": true
          },
          {
            "id": "rt2",
            "text": "⚽ Futbol oynayırıq",
            "textEn": "⚽ Play football",
            "textRu": "⚽ Играем в мяч",
            "emoji": "⚽",
            "isCorrect": false
          },
          {
            "id": "rt3",
            "text": "📺 Cizgi filminə baxırıq",
            "textEn": "📺 Watch cartoons",
            "textRu": "📺 Смотрим мультики",
            "emoji": "📺",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Səhər dişləri fırçalamaq mikrobları yox edir! 🪥✨",
        "explanationEn": "Well done! Brushing teeth morning eliminates bacteria! 🪥✨",
        "explanationRu": "Молодец! Утренняя чистка зубов прогоняет микробов! 🪥✨"
      },
      {
        "id": "rt-night-sleep-2",
        "title": "Gecə Yuxusu",
        "titleEn": "Night Sleep",
        "titleRu": "Ночной сон",
        "instruction": "Axşam yatmazdan əvvəl nə etməliyik?",
        "instructionEn": "What should we do before going to bed at night?",
        "instructionRu": "Что нужно сделать перед сном вечером?",
        "type": "select",
        "question": "Gecə saatı çatanda yatıb qüvvət toplamaq üçün hara gedirik?",
        "questionEn": "When bedtime arrives, where do we go to sleep and restore energy?",
        "questionRu": "Когда наступает вечер, куда мы идем отдыхать и спать?",
        "targetAudioText": "Yatağa uzanmağı seç.",
        "targetAudioTextEn": "Select going to bed.",
        "targetAudioTextRu": "Выбери ложиться в кровать.",
        "options": [
          {
            "id": "rt4",
            "text": "🛏️ Pijamanı geyinib yatağa uzanırıq",
            "textEn": "🛏️ Put on pajamas and lie in bed",
            "textRu": "🛏️ Надеваем пижаму и ложимся спать",
            "emoji": "🛏️",
            "isCorrect": true
          },
          {
            "id": "rt5",
            "text": "🍫 Çoxlu şokolad yeyirik",
            "textEn": "🍫 Eat lots of chocolate",
            "textRu": "🍫 Едим много шоколада",
            "emoji": "🍫",
            "isCorrect": false
          },
          {
            "id": "rt6",
            "text": "🏃 Otaqda qaçırıq",
            "textEn": "🏃 Run around the room",
            "textRu": "🏃 Бегаем по комнате",
            "emoji": "🏃",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Pijamanı geyinib rahat yuxuya gedirik! 🛏️🌙",
        "explanationEn": "Correct! We slip into pajamas and fall asleep soundly! 🛏️🌙",
        "explanationRu": "Правильно! Надеваем пижамку и сладко засыпаем! 🛏️🌙"
      },
      {
        "id": "rt-tidy-toys-3",
        "title": "Oyuncaqları Səliqəyə Sal",
        "titleEn": "Tidy Up Toys",
        "titleRu": "Убери игрушки",
        "instruction": "Oyun bitdikdən sonra nə etməliyik?",
        "instructionEn": "What should we do when playtime ends?",
        "instructionRu": "Что нужно сделать после окончания игры?",
        "type": "select",
        "question": "Oyuncaqlarla oynayıb qurtardıqdan sonra nə etmək lazımdır?",
        "questionEn": "After playing with toys, what must we do?",
        "questionRu": "Что нужно сделать после того, как поиграли с игрушками?",
        "targetAudioText": "Oyuncaqları yığmağı seç.",
        "targetAudioTextEn": "Select putting toys away.",
        "targetAudioTextRu": "Выбери убрать игрушки.",
        "options": [
          {
            "id": "rt7",
            "text": "📦 Oyuncaqları qutuya səliqə ilə yığırıq",
            "textEn": "📦 Pack toys tidily into box",
            "textRu": "📦 Аккуратно убираем игрушки в коробку",
            "emoji": "📦",
            "isCorrect": true
          },
          {
            "id": "rt8",
            "text": "🗑️ Hər yerə dağıdırıq",
            "textEn": "🗑️ Scatter everywhere",
            "textRu": "🗑️ Раскидываем повсюду",
            "emoji": "🗑️",
            "isCorrect": false
          },
          {
            "id": "rt9",
            "text": "🚪 Qapının arxasında gizlədirik",
            "textEn": "🚪 Hide behind door",
            "textRu": "🚪 Прячем за дверь",
            "emoji": "🚪",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Otağımız həmişə təmiz və səliqəli olmalıdır! 📦✨",
        "explanationEn": "Great! Our room must always stay tidy and neat! 📦✨",
        "explanationRu": "Отлично! Наша комната всегда должна быть чистой и аккуратной! 📦✨"
      }
    ]
  },
  {
    "id": "self-care",
    "slug": "ozunexidmet",
    "titleAz": "Özünəxidmət və gigiyena",
    "titleEn": "Self-Care & Hygiene",
    "titleRu": "Самообслуживание и гигиена",
    "descriptionAz": "Əlləri yumaq, geyinmək, saçları daramaq, təmizlik.",
    "emoji": "🧼",
    "group": "social",
    "minAge": 2,
    "maxAge": 6,
    "color": "from-teal-500 to-cyan-400",
    "activities": [
      {
        "id": "slf-wash-hands-1",
        "title": "Sabunla Əlləri Yumaq",
        "titleEn": "Wash Hands with Soap",
        "titleRu": "Мыть руки с мылом",
        "lesson": {
          "id": "slf-lesson-clean",
          "conceptTitleAz": "Təmizlik və Şəxsi Qayğını Öyrənək!",
          "conceptTitleEn": "Let's Learn Cleanliness & Self-Care!",
          "conceptTitleRu": "Учим Чистоту и Заботу о Себе!",
          "explanationAz": "Yeməkdən əvvəl və gəzintidən qayıdanda əllərimizi mütləq sabun və su ilə yuyuruq (🧼💧). Saçlarımızı daranmaq üçün daraqdan istifadə edirik (🪮)!",
          "explanationEn": "Before eating and after playing outside, always wash hands with soap and water (🧼💧). Use a comb to keep hair neat (🪮)!",
          "explanationRu": "Перед едой и после прогулки обязательно моем ручки с мылом и водой (🧼💧). Причесываем волосики расческой (🪮)!",
          "bigEmojis": [
            "🧼",
            "🚿",
            "🪥",
            "🪮"
          ],
          "audioTextAz": "Əlləri sabunla yuyuruq, saçları darayırıq.",
          "audioTextEn": "We wash hands with soap, we comb our hair.",
          "audioTextRu": "Моем руки с мылом, расчесываем волосы."
        },
        "instruction": "Əllərimizi mikroblardan təmizləmək üçün nə lazımdır?",
        "instructionEn": "What do we need to clean our hands from germs?",
        "instructionRu": "Что нужно, чтобы отмыть ручки от микробов?",
        "type": "select",
        "question": "Çöldən evə gələndə və yeməkdən qabaq əllərimizi nə ilə yuyuruq?",
        "questionEn": "What do we wash our hands with when returning home and before meals?",
        "questionRu": "Чем мы моем руки перед едой и после прогулки?",
        "targetAudioText": "Sabun və suyu seç.",
        "targetAudioTextEn": "Select soap and water.",
        "targetAudioTextRu": "Выбери мыло и воду.",
        "options": [
          {
            "id": "sl1",
            "text": "🧼 Su və Sabunla",
            "textEn": "🧼 Soap and Water",
            "textRu": "🧼 Мыло и вода",
            "emoji": "🧼",
            "isCorrect": true
          },
          {
            "id": "sl2",
            "text": "🧃 Meyvə şirəsi ilə",
            "textEn": "🧃 Fruit juice",
            "textRu": "🧃 Фруктовый сок",
            "emoji": "🧃",
            "isCorrect": false
          },
          {
            "id": "sl3",
            "text": "🍞 Çörəklə",
            "textEn": "🍞 Bread",
            "textRu": "🍞 Хлеб",
            "emoji": "🍞",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Sabun köpüyü bütün mikrobları yox edir! 🧼✨",
        "explanationEn": "Well done! Soapy suds wash away all germs! 🧼✨",
        "explanationRu": "Молодец! Мыльная пена смывает всех микробов! 🧼✨"
      },
      {
        "id": "slf-comb-hair-2",
        "title": "Saçları Daramaq",
        "titleEn": "Combing Hair",
        "titleRu": "Расчесывать волосы",
        "instruction": "Saçlarımızı səliqəyə salmaq üçün nə istifadə edirik?",
        "instructionEn": "What do we use to tidy our hair?",
        "instructionRu": "Чем мы причесываем волосы?",
        "type": "select",
        "question": "Səhər güzgüyə baxanda saçlarımızı səliqəli etmək üçün nə götürürük?",
        "questionEn": "When looking in the mirror, what do we take to neaten our hair?",
        "questionRu": "Что мы берем, чтобы аккуратно причесаться перед зеркалом?",
        "targetAudioText": "Darağı seç.",
        "targetAudioTextEn": "Select the comb.",
        "targetAudioTextRu": "Выбери расческу.",
        "options": [
          {
            "id": "sl4",
            "text": "🪮 Səliqəli Daraq",
            "textEn": "🪮 Neat Comb",
            "textRu": "🪮 Расческа",
            "emoji": "🪮",
            "isCorrect": true
          },
          {
            "id": "sl5",
            "text": "🥄 Şorba qaşığı",
            "textEn": "🥄 Soup spoon",
            "textRu": "🥄 Суповая ложка",
            "emoji": "🥄",
            "isCorrect": false
          },
          {
            "id": "sl6",
            "text": "✏️ Rəngli karandaş",
            "textEn": "✏️ Colored pencil",
            "textRu": "✏️ Цветной карандаш",
            "emoji": "✏️",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Daraq saçlarımızı parıldadır və səliqəli edir! 🪮💇",
        "explanationEn": "Correct! A comb makes our hair neat and shiny! 🪮💇",
        "explanationRu": "Правильно! Расческа делает волосы красивыми и опрятными! 🪮💇"
      },
      {
        "id": "slf-brush-teeth-3",
        "title": "Parıldayan Dişlər",
        "titleEn": "Sparkling Teeth",
        "titleRu": "Сверкающие зубки",
        "instruction": "Dişlərimizi təmizləmək üçün nə lazımdır?",
        "instructionEn": "What do we need to clean our teeth?",
        "instructionRu": "Что нужно, чтобы почистить зубки?",
        "type": "select",
        "question": "Dişlərimizin sağlam və ağappaq olması üçün gündə iki dəfə nə ilə təmizləyirik?",
        "questionEn": "To keep teeth healthy and white, what do we brush them with twice a day?",
        "questionRu": "Чем мы чистим зубки два раза в день для здоровья и белизны?",
        "targetAudioText": "Diş fırçası və məcunu seç.",
        "targetAudioTextEn": "Select toothbrush and paste.",
        "targetAudioTextRu": "Выбери зубную щетку и пасту.",
        "options": [
          {
            "id": "sl7",
            "text": "🪥 Diş fırçası və dadlı məcun",
            "textEn": "🪥 Toothbrush and toothpaste",
            "textRu": "🪥 Зубная щетка и паста",
            "emoji": "🪥",
            "isCorrect": true
          },
          {
            "id": "sl8",
            "text": "🍴 Şorba çəngəli",
            "textEn": "🍴 Soup fork",
            "textRu": "🍴 Вилка",
            "emoji": "🍴",
            "isCorrect": false
          },
          {
            "id": "sl9",
            "text": "🔑 Dəmir açar",
            "textEn": "🔑 Metal key",
            "textRu": "🔑 Ключ",
            "emoji": "🔑",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Fırçalanmış dişlər parlaq və tam sağlamdır! 🪥🦷✨",
        "explanationEn": "Super! Brushed teeth shine white and stay healthy! 🪥🦷✨",
        "explanationRu": "Супер! Почищенные зубки сияют белизной и здоровьем! 🪥🦷✨"
      }
    ]
  },
  {
    "id": "safety",
    "slug": "tehlukesizlik",
    "titleAz": "Təhlükəsizlik qaydaları",
    "titleEn": "Safety Rules",
    "titleRu": "Правила безопасности",
    "descriptionAz": "İşıqfor, yol hərəkəti, isti əşyalar, yad adamlar, təhlükə.",
    "emoji": "🛡️",
    "group": "social",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-rose-600 to-red-500",
    "activities": [
      {
        "id": "saf-traffic-red-1",
        "title": "İşıqforda Qırmızı İşıq",
        "titleEn": "Red Traffic Light",
        "titleRu": "Красный свет светофора",
        "lesson": {
          "id": "saf-lesson-traffic",
          "conceptTitleAz": "Yol Hərəkəti və İşıqforu Öyrənək!",
          "conceptTitleEn": "Let's Learn Traffic Lights & Road Safety!",
          "conceptTitleRu": "Учим Светофор и Правила Дороги!",
          "explanationAz": "İşıqfor yolların ən vacib bələdçisidir! Qırmızı işıq yananda DAYANMALISAN (🛑)! Sarı işıq yananda HAZIRLAŞ (⚠️)! Yaşıl işıq yananda isə yolu ehtiyatla KEÇ (🚶)!",
          "explanationEn": "The traffic light is our street guide! Red light means STOP (🛑)! Yellow means GET READY (⚠️)! Green light means GO safely (🚶)!",
          "explanationRu": "Светофор — наш главный помощник на дороге! Красный свет — СТОЙ (🛑)! Желтый свет — ПРИГОТОВЬСЯ (⚠️)! Зеленый свет — ИДИ смело (🚶)!",
          "bigEmojis": [
            "🚦",
            "🛑",
            "⚠️",
            "🚶"
          ],
          "audioTextAz": "Qırmızıda dayan, sarıda hazırlaş, yaşılda keç.",
          "audioTextEn": "Stop on red, get ready on yellow, go on green.",
          "audioTextRu": "На красный стой, на желтый жди, на зеленый иди."
        },
        "visualScene": {
          "type": "traffic",
          "activeLight": "red",
          "captionAz": "İşıqfor: Qırmızı işıq yanır — DAYAN!",
          "captionEn": "Traffic Light: Red light shines — STOP!",
          "captionRu": "Светофор: Горит красный свет — СТОЙ!"
        },
        "instruction": "İşıqforda qırmızı işıq yananda nə etməliyik?",
        "instructionEn": "What must we do when traffic light turns red?",
        "instructionRu": "Что нужно делать, когда на светофоре горит красный свет?",
        "type": "select",
        "question": "Şəklə bax: İşıqforun qırmızı işığı yananda piyadalar nə etməlidir?",
        "questionEn": "Look at picture: What should pedestrians do when red light is on?",
        "questionRu": "Посмотри на картинку: Что делать пешеходам на красный свет?",
        "targetAudioText": "Dayanmağı seç.",
        "targetAudioTextEn": "Select stopping.",
        "targetAudioTextRu": "Выбери остановиться.",
        "options": [
          {
            "id": "sf1",
            "text": "🛑 Dayanmalı və gözləməliyik",
            "textEn": "🛑 Must stop and wait",
            "textRu": "🛑 Стоять и ждать",
            "emoji": "🛑",
            "isCorrect": true
          },
          {
            "id": "sf2",
            "text": "🏃 Yola qaçmalıyıq",
            "textEn": "🏃 Run into street",
            "textRu": "🏃 Бежать на дорогу",
            "emoji": "🏃",
            "isCorrect": false
          },
          {
            "id": "sf3",
            "text": "🚗 Maşınların arasına girməliyik",
            "textEn": "🚗 Step between cars",
            "textRu": "🚗 Идти между машин",
            "emoji": "🚗",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Qırmızı işıq 'Dayan, təhlükəlidir!' deməkdir! 🛑🚦",
        "explanationEn": "Well done! Red light strictly means 'Stop, danger!' 🛑🚦",
        "explanationRu": "Молодец! Красный свет означает «Стой, опасно!» 🛑🚦"
      },
      {
        "id": "saf-traffic-green-2",
        "title": "İşıqforda Yaşıl İşıq",
        "titleEn": "Green Traffic Light",
        "titleRu": "Зеленый свет светофора",
        "visualScene": {
          "type": "traffic",
          "activeLight": "green",
          "captionAz": "İşıqfor: Yaşıl işıq yanır — KEÇ!",
          "captionEn": "Traffic Light: Green light shines — GO!",
          "captionRu": "Светофор: Горит зеленый свет — ИДИ!"
        },
        "instruction": "İşıqforda yaşıl işıq yananda nə edirik?",
        "instructionEn": "What do we do when green light shines?",
        "instructionRu": "Что мы делаем на зеленый свет светофора?",
        "type": "select",
        "question": "İşıqforun yaşıl işığı yananda yolu necə keçirik?",
        "questionEn": "How do we cross the road when the green light is on?",
        "questionRu": "Как мы переходим дорогу на зеленый свет?",
        "targetAudioText": "Təhlükəsiz keçməyi seç.",
        "targetAudioTextEn": "Select safe crossing.",
        "targetAudioTextRu": "Выбери безопасный переход.",
        "options": [
          {
            "id": "sf4",
            "text": "🚶 Yolu təhlükəsiz və ehtiyatla keçirik",
            "textEn": "🚶 Cross safely and carefully",
            "textRu": "🚶 Переходим дорогу спокойно",
            "emoji": "🚶",
            "isCorrect": true
          },
          {
            "id": "sf5",
            "text": "🛑 Dayanıb ağlayırıq",
            "textEn": "🛑 Stop and cry",
            "textRu": "🛑 Стоим и плачем",
            "emoji": "😢",
            "isCorrect": false
          },
          {
            "id": "sf6",
            "text": "🙈 Gözlərimizi yumuruq",
            "textEn": "🙈 Close our eyes",
            "textRu": "🙈 Закрываем глаза",
            "emoji": "🙈",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Yaşıl işıqda yolu zebra zolağı ilə rahat keçirik! 🚶🚦",
        "explanationEn": "Correct! On green light we cross the pedestrian zebra crossing! 🚶🚦",
        "explanationRu": "Правильно! На зеленый свет спокойно идем по пешеходному переходу! 🚶🚦"
      },
      {
        "id": "saf-hot-iron-3",
        "title": "İsti Ütü və Elektrik",
        "titleEn": "Hot Iron and Electricity",
        "titleRu": "Горячий утюг и розетка",
        "lesson": {
          "id": "saf-lesson-home",
          "conceptTitleAz": "Evdə Təhlükəsizlik Qaydalarını Öyrənək!",
          "conceptTitleEn": "Let's Learn Home Safety Rules!",
          "conceptTitleRu": "Учим Правила Безопасности Дома!",
          "explanationAz": "İsti ütüyə və qaz plitəsinə toxunmaq olmaz (🔥⚠️). Elektrik rozetkalarına əl vurmaq və ya içinə nəsə soxmaq çox təhlükəlidir (🔌❌)!",
          "explanationEn": "Never touch hot irons or gas stoves (🔥⚠️). Never touch electric sockets or put objects inside (🔌❌)!",
          "explanationRu": "Нельзя трогать горячий утюг и газовую плиту (🔥⚠️). Никогда не прикасайтесь к розеткам (🔌❌)!",
          "bigEmojis": [
            "⚠️",
            "🔌",
            "🔥",
            "🛡️"
          ],
          "audioTextAz": "İsti ütüyə və rozetkaya toxunmuruq. Ehtiyatlı oluruq.",
          "audioTextEn": "We never touch hot irons or sockets. We stay safe.",
          "audioTextRu": "К утюгу и розеткам не прикасаемся. Бережем себя."
        },
        "instruction": "İsti ütüyə toxunmaq olarmı?",
        "instructionEn": "Can we touch a hot iron?",
        "instructionRu": "Можно ли трогать горячий утюг?",
        "type": "select",
        "question": "Qaynar ütüyə və ya yanan qaza əl vurmaq olarmı?",
        "questionEn": "Can we touch a boiling hot iron or lit gas stove?",
        "questionRu": "Можно ли дотрагиваться до горячего утюга или плиты?",
        "targetAudioText": "Toxunmamağı seç.",
        "targetAudioTextEn": "Select never touching.",
        "targetAudioTextRu": "Выбери «Нельзя трогать».",
        "options": [
          {
            "id": "sf7",
            "text": "❌ Xeyr, əlimiz yana bilər!",
            "textEn": "❌ No, it burns hands!",
            "textRu": "❌ Нет, можно сильно обжечься!",
            "emoji": "❌",
            "isCorrect": true
          },
          {
            "id": "sf8",
            "text": "✅ Bəli, toxunmaq olar",
            "textEn": "✅ Yes, you can touch",
            "textRu": "✅ Да, можно трогать",
            "emoji": "✅",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! İsti əşyalara yalnız böyüklər nəzarət etməlidir! 🔥⚠️",
        "explanationEn": "Great! Only adults handle hot appliances! 🔥⚠️",
        "explanationRu": "Отлично! Горячими приборами пользуются только взрослые! 🔥⚠️"
      },
      {
        "id": "saf-sharp-objects-4",
        "title": "İti və Kəsici Əşyalar",
        "titleEn": "Sharp Cutlery and Tools",
        "titleRu": "Острые предметы",
        "instruction": "İti bıçaqla oynamaq olarmı?",
        "instructionEn": "Is it safe to play with sharp knives?",
        "instructionRu": "Можно ли играть с острым ножом?",
        "type": "select",
        "question": "İti bıçaq və ya qayçı ilə oyun oynamaq düzgündürmü?",
        "questionEn": "Is it safe to play games with sharp knives or scissors?",
        "questionRu": "Правильно ли играть с острым ножом или ножницами?",
        "targetAudioText": "Oynamamağı seç.",
        "targetAudioTextEn": "Select not playing.",
        "targetAudioTextRu": "Выбери не играть.",
        "options": [
          {
            "id": "sf9",
            "text": "❌ Xeyr, çox təhlükəlidir!",
            "textEn": "❌ No, very dangerous!",
            "textRu": "❌ Нет, это очень опасно!",
            "emoji": "❌",
            "isCorrect": true
          },
          {
            "id": "sf10",
            "text": "✅ Bəli, olar",
            "textEn": "✅ Yes, it's fine",
            "textRu": "✅ Да, можно",
            "emoji": "✅",
            "isCorrect": false
          }
        ],
        "explanation": "Super! İti alətlər oyuncaq deyil və ehtiyat tələb edir! ✂️🛡️",
        "explanationEn": "Super! Sharp tools are not toys and require caution! ✂️🛡️",
        "explanationRu": "Супер! Острые инструменты не игрушка и требуют осторожности! ✂️🛡️"
      }
    ]
  },
  {
    "id": "attention-memory",
    "slug": "diqqet-yaddas",
    "titleAz": "Diqqət və yaddaş",
    "titleEn": "Attention & Memory",
    "titleRu": "Внимание и Память",
    "descriptionAz": "Fərqləri tapma, cütləri seçmə, yaddaş oyunları.",
    "emoji": "🧠",
    "group": "cognitive",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-purple-600 to-indigo-500",
    "activities": [
      {
        "id": "att-odd-banana-1",
        "title": "Fərqli Olanı Tap",
        "titleEn": "Find the Odd One Out",
        "titleRu": "Найди лишнее",
        "lesson": {
          "id": "att-lesson-focus",
          "conceptTitleAz": "Diqqətimizi İti Edək!",
          "conceptTitleEn": "Let's Sharpen Our Focus!",
          "conceptTitleRu": "Учимся Быть Внимательными!",
          "explanationAz": "Əşyalara diqqətlə baxaq: Üç qırmızı alma arasında bir sarı banan varsa, banan fərqlidir (🍎🍎🍎🍌)! Fərqli olanı tez tapmaq diqqət tələb edir!",
          "explanationEn": "Look closely at objects: Among three red apples, a yellow banana is the odd one out (🍎🍎🍎🍌)! Finding it tests sharp attention!",
          "explanationRu": "Внимательно посмотрим на предметы: Среди трех красных яблок желтый банан — лишний (🍎🍎🍎🍌)! Найти его помогает внимание!",
          "bigEmojis": [
            "🔍",
            "🧠",
            "⭐",
            "🎯"
          ],
          "audioTextAz": "Diqqətlə baxırıq, fərqli olanı tapırıq.",
          "audioTextEn": "Look carefully, find the odd one.",
          "audioTextRu": "Внимательно смотрим, находим лишнее."
        },
        "instruction": "Üç alma və bir banan arasında fərqli olanı tap.",
        "instructionEn": "Among three apples and one banana, find the odd one.",
        "instructionRu": "Среди трех яблок и одного банана найди лишнее.",
        "type": "select",
        "question": "Meyvələr sırasına bax: Hansı meyvə digərlərindən fərqlidir? 🍎 🍎 🍎 🍌",
        "questionEn": "Look at the row: Which fruit is different from the others? 🍎 🍎 🍎 🍌",
        "questionRu": "Посмотри на ряд: Какой фрукт отличается от остальных? 🍎 🍎 🍎 🍌",
        "targetAudioText": "Bananı seç.",
        "targetAudioTextEn": "Select the banana.",
        "targetAudioTextRu": "Выбери банан.",
        "options": [
          {
            "id": "at1",
            "text": "🍌 Sarı Banan",
            "textEn": "🍌 Yellow Banana",
            "textRu": "🍌 Желтый банан",
            "emoji": "🍌",
            "isCorrect": true
          },
          {
            "id": "at2",
            "text": "🍎 Qırmızı Alma",
            "textEn": "🍎 Red Apple",
            "textRu": "🍎 Красное яблоко",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Üç alma arasında sarı banan fərqlidir! 🍌🔍",
        "explanationEn": "Well done! The yellow banana is the odd one among apples! 🍌🔍",
        "explanationRu": "Молодец! Желтый банан выделяется среди яблок! 🍌🔍"
      },
      {
        "id": "att-winter-clothes-2",
        "title": "Qış Geyimini Tap",
        "titleEn": "Find Winter Clothes",
        "titleRu": "Найди зимнюю одежду",
        "instruction": "Soyuq qışda əllərimizi isidən əlcəyi seç.",
        "instructionEn": "Select gloves that keep hands warm in cold winter.",
        "instructionRu": "Выбери теплые перчатки, согревающие руки зимой.",
        "type": "select",
        "question": "Qarda və şaxtada əllərimiz üşüməsin deyə nə geyinirik?",
        "questionEn": "What do we wear so hands don't freeze in snow and frost?",
        "questionRu": "Что мы надеваем на руки в мороз и снег?",
        "targetAudioText": "Əlcəyi tap.",
        "targetAudioTextEn": "Find the gloves.",
        "targetAudioTextRu": "Найди перчатки.",
        "options": [
          {
            "id": "at3",
            "text": "🧤 İsti Qış Əlcəyi",
            "textEn": "🧤 Warm Winter Gloves",
            "textRu": "🧤 Теплые зимние перчатки",
            "emoji": "🧤",
            "isCorrect": true
          },
          {
            "id": "at4",
            "text": "🩳 Qısa Yay Şortiki",
            "textEn": "🩳 Short Summer Shorts",
            "textRu": "🩳 Летние шорты",
            "emoji": "🩳",
            "isCorrect": false
          },
          {
            "id": "at5",
            "text": "🩴 Çimərlik Başmağı",
            "textEn": "🩴 Beach Slippers",
            "textRu": "🩴 Пляжные шлепанцы",
            "emoji": "🩴",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! İsti əlcəklər qışda əllərimizi şaxtadan qoruyur! 🧤❄️",
        "explanationEn": "Correct! Warm gloves protect hands from frost! 🧤❄️",
        "explanationRu": "Правильно! Теплые перчатки защищают ручки от мороза! 🧤❄️"
      },
      {
        "id": "att-shadow-match-3",
        "title": "Ulduzun Cütünü Tap",
        "titleEn": "Find Star's Match",
        "titleRu": "Найди пару звездочке",
        "instruction": "Eyni ulduz fiqurunu seç.",
        "instructionEn": "Select the matching star shape.",
        "instructionRu": "Выбери такую же звездочку.",
        "type": "select",
        "question": "Parlaq qızılı ulduzun eynisi hansıdır? ⭐",
        "questionEn": "Which one is identical to the shining golden star? ⭐",
        "questionRu": "Какая фигура точь-в-точь как золотая звездочка? ⭐",
        "targetAudioText": "Ulduzu seç.",
        "targetAudioTextEn": "Select the star.",
        "targetAudioTextRu": "Выбери звезду.",
        "options": [
          {
            "id": "at6",
            "text": "⭐ Qızılı Ulduz",
            "textEn": "⭐ Golden Star",
            "textRu": "⭐ Золотая звезда",
            "emoji": "⭐",
            "isCorrect": true
          },
          {
            "id": "at7",
            "text": "❤️ Qırmızı Ürək",
            "textEn": "❤️ Red Heart",
            "textRu": "❤️ Красное сердце",
            "emoji": "❤️",
            "isCorrect": false
          },
          {
            "id": "at8",
            "text": "🔷 Mavi Romb",
            "textEn": "🔷 Blue Diamond",
            "textRu": "🔷 Синий ромб",
            "emoji": "🔷",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Dəqiq baxdın və eyni ulduzu tapdın! ⭐✨",
        "explanationEn": "Super! Your sharp eyes found the matching star! ⭐✨",
        "explanationRu": "Супер! Твой зоркий взгляд нашел точно такую же звезду! ⭐✨"
      }
    ]
  },
  {
    "id": "auditory-attention",
    "slug": "esitme-diqqeti",
    "titleAz": "Eşitmə diqqəti",
    "titleEn": "Auditory Attention",
    "titleRu": "Слуховое внимание",
    "descriptionAz": "Səsləri dinləmə, təkrarlama və alətləri tanıma.",
    "emoji": "🎵",
    "group": "cognitive",
    "minAge": 3,
    "maxAge": 7,
    "color": "from-blue-600 to-cyan-500",
    "activities": [
      {
        "id": "aud-bell-1",
        "title": "Zəngin Səsi: Cin-cin",
        "titleEn": "Bell Sound: Ding-Dong",
        "titleRu": "Звон колокольчика: Динь-динь",
        "lesson": {
          "id": "aud-lesson-instruments",
          "conceptTitleAz": "Musiqi Alətləri və Səsləri Öyrənək!",
          "conceptTitleEn": "Let's Learn Musical Sounds!",
          "conceptTitleRu": "Учим Музыкальные Звуки!",
          "explanationAz": "Hər bir musiqi alətinin özünəməxsus səsi var! Zəng çalınanda incə 'Cin-cin' səsi eşidilir (🔔). Baraban vurulanda gur 'Bum-bum-bum' edir (🥁). Şən şeypur isə 'Tu-tuu' səslənir (🎺)!",
          "explanationEn": "Each instrument makes a special sound! The bell chimes a gentle 'Ding-dong' (🔔). The drum beats a loud 'Boom-boom' (🥁). The trumpet sounds 'Tu-tuu' (🎺)!",
          "explanationRu": "У каждого инструмента свой звук! Колокольчик нежно звенит «Динь-динь» (🔔). Барабан громко стучит «Бум-бум-бум» (🥁). А труба поет «Ту-ту-у» (🎺)!",
          "bigEmojis": [
            "👂",
            "🔔",
            "🥁",
            "🎺"
          ],
          "audioTextAz": "Zəng cin-cin edir, baraban bum-bum edir.",
          "audioTextEn": "Bell chimes ding-dong, drum beats boom-boom.",
          "audioTextRu": "Колокольчик звенит динь-динь, барабан стучит бум-бум."
        },
        "instruction": "İncə 'Cin-cin' səsi çıxaran zəngi tap.",
        "instructionEn": "Find the bell that makes a gentle 'Ding-dong' chime.",
        "instructionRu": "Найди колокольчик, который звенит «Динь-динь».",
        "type": "select",
        "question": "'Cin-cin, cin-cin' edərək zəng vuran musiqi aləti hansıdır?",
        "questionEn": "Which musical instrument chimes 'Ding-dong, ding-dong'?",
        "questionRu": "Какой инструмент звенит «Динь-динь, динь-динь»?",
        "targetAudioText": "Zəngi seç.",
        "targetAudioTextEn": "Select the bell.",
        "targetAudioTextRu": "Выбери колокольчик.",
        "options": [
          {
            "id": "au1",
            "text": "🔔 Zəng",
            "textEn": "🔔 Bell",
            "textRu": "🔔 Колокольчик",
            "emoji": "🔔",
            "isCorrect": true
          },
          {
            "id": "au2",
            "text": "🥁 Baraban",
            "textEn": "🥁 Drum",
            "textRu": "🥁 Барабан",
            "emoji": "🥁",
            "isCorrect": false
          },
          {
            "id": "au3",
            "text": "🚗 Maşın",
            "textEn": "🚗 Car",
            "textRu": "🚗 Машина",
            "emoji": "🚗",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Zəng incə və xoş səslə 'Cin-cin' çalır! 🔔✨",
        "explanationEn": "Well done! The bell rings with a sweet chime! 🔔✨",
        "explanationRu": "Молодец! Колокольчик нежно звенит «Динь-динь»! 🔔✨"
      },
      {
        "id": "aud-drum-2",
        "title": "Gur Baraban",
        "titleEn": "Loud Drum",
        "titleRu": "Громкий барабан",
        "instruction": "'Bum-bum-bum' deyə döyülən barabanı tap.",
        "instructionEn": "Find the drum that beats 'Boom-boom-boom'.",
        "instructionRu": "Найди барабан, который бьет «Бум-бум-бум».",
        "type": "select",
        "question": "Çubuqlarla vurulduqda gur 'Bum-bum' səsi verən nədir?",
        "questionEn": "What makes a loud 'Boom-boom' beat when struck with sticks?",
        "questionRu": "Какой инструмент громко бьет «Бум-бум», когда стучат палочками?",
        "targetAudioText": "Barabanı seç.",
        "targetAudioTextEn": "Select the drum.",
        "targetAudioTextRu": "Выбери барабан.",
        "options": [
          {
            "id": "au4",
            "text": "🥁 Gur Baraban",
            "textEn": "🥁 Loud Drum",
            "textRu": "🥁 Громкий барабан",
            "emoji": "🥁",
            "isCorrect": true
          },
          {
            "id": "au5",
            "text": "🔔 Balaca Zəng",
            "textEn": "🔔 Little Bell",
            "textRu": "🔔 Колокольчик",
            "emoji": "🔔",
            "isCorrect": false
          },
          {
            "id": "au6",
            "text": "💧 Su Damlası",
            "textEn": "💧 Waterdrop",
            "textRu": "💧 Капля воды",
            "emoji": "💧",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Baraban ritmlə 'Bum-bum-bum' səs salır! 🥁🎶",
        "explanationEn": "Correct! The drum beats with powerful rhythm! 🥁🎶",
        "explanationRu": "Правильно! Барабан задает ритм «Бум-бум-бум»! 🥁🎶"
      },
      {
        "id": "aud-trumpet-3",
        "title": "Şən Şeypur",
        "titleEn": "Merry Trumpet",
        "titleRu": "Веселая труба",
        "instruction": "'Tu-tuu' səslənən şeypuru seç.",
        "instructionEn": "Select the trumpet that goes 'Tu-tuu'.",
        "instructionRu": "Выбери трубу, которая играет «Ту-ту-у».",
        "type": "select",
        "question": "Nəfəslə çalınan və şən 'Tu-tuuu' səsi çıxaran alət hansıdır?",
        "questionEn": "Which wind instrument plays a cheerful 'Tu-tuu' melody?",
        "questionRu": "Какой духовой инструмент играет мелодию «Ту-ту-у»?",
        "targetAudioText": "Şeypuru tap.",
        "targetAudioTextEn": "Find the trumpet.",
        "targetAudioTextRu": "Найди трубу.",
        "options": [
          {
            "id": "au7",
            "text": "🎺 Şən Şeypur",
            "textEn": "🎺 Merry Trumpet",
            "textRu": "🎺 Веселая труба",
            "emoji": "🎺",
            "isCorrect": true
          },
          {
            "id": "au8",
            "text": "🎻 Skripka",
            "textEn": "🎻 Violin",
            "textRu": "🎻 Скрипка",
            "emoji": "🎻",
            "isCorrect": false
          },
          {
            "id": "au9",
            "text": "🎹 Piano",
            "textEn": "🎹 Piano",
            "textRu": "🎹 Пианино",
            "emoji": "🎹",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Şeypur bayramlarda uca səslə ifa edir! 🎺🎉",
        "explanationEn": "Super! The trumpet blares joyfully at celebrations! 🎺🎉",
        "explanationRu": "Супер! Труба празднично звучит на парадах! 🎺🎉"
      }
    ]
  },
  {
    "id": "fine-motor",
    "slug": "ince-motorika",
    "titleAz": "İncə motorika",
    "titleEn": "Fine Motor Skills",
    "titleRu": "Мелкая Моторика",
    "descriptionAz": "Xətləri çəkmək, nöqtələri birləşdirmək və toxunma koordinasiyası.",
    "emoji": "✍️",
    "group": "cognitive",
    "minAge": 2,
    "maxAge": 7,
    "color": "from-amber-600 to-rose-400",
    "activities": [
      {
        "id": "mot-trace-star-moon-1",
        "title": "Ulduzdan Aya Doğru Xətt",
        "titleEn": "Path from Star to Moon",
        "titleRu": "Путь от Звезды к Луне",
        "lesson": {
          "id": "mot-lesson-straight",
          "conceptTitleAz": "Düz Xətləri İzləməyi Öyrənək!",
          "conceptTitleEn": "Let's Learn Straight Line Tracing!",
          "conceptTitleRu": "Учимся Следовать по Прямым Линиям!",
          "explanationAz": "Ekranda cızılmış düz xəttə diqqətlə bax! Parlaq ulduz (⭐) nöqtəli xətt boyunca birbaşa Aya (🌙) doğru irəliləyir! Barmağınla xətti izlə!",
          "explanationEn": "Look carefully at the straight line on screen! The bright star (⭐) moves along the dotted line straight towards the Moon (🌙)! Trace with your finger!",
          "explanationRu": "Внимательно посмотри на прямую линию на экране! Яркая звездочка (⭐) движется по дорожке прямо к Луне (🌙)! Проведи пальчиком!",
          "bigEmojis": [
            "⭐",
            "🌙",
            "✏️",
            "🎯"
          ],
          "audioTextAz": "Ulduz düz xətlə Aya doğru gedir. Barmağınla izlə.",
          "audioTextEn": "The star moves straight to the Moon. Trace it.",
          "audioTextRu": "Звезда идет по прямой линии к Луне. Веди пальчиком."
        },
        "visualScene": {
          "type": "tracing",
          "startEmoji": "⭐",
          "targetEmoji": "🌙",
          "pathType": "straight",
          "captionAz": "Şəkil: Ulduz düz xətlə Aya doğru gedir 🌟·····➔🌙",
          "captionEn": "Picture: Star moves straight to the Moon 🌟·····➔🌙",
          "captionRu": "Картинка: Звезда идет по прямой к Луне 🌟·····➔🌙"
        },
        "instruction": "Şəklə diqqətlə bax: Parlaq ulduz xətt boyunca hansı hədəfə doğru gedir?",
        "instructionEn": "Look closely at the picture: Which target does the bright star head towards along the line?",
        "instructionRu": "Посмотри на картинку: К какой цели движется звездочка вдоль линии?",
        "type": "select",
        "question": "Yuxarıdakı şəklə bax: Ulduz düz xətt boyunca hansı göy cisminə doğru gedir?",
        "questionEn": "Looking at the picture above: Which celestial object does the star head towards?",
        "questionRu": "Глядя на картинку выше: К какому светилу движется звездочка по дорожке?",
        "targetAudioText": "Ayı seç.",
        "targetAudioTextEn": "Select the Moon.",
        "targetAudioTextRu": "Выбери Луну.",
        "options": [
          {
            "id": "mt1",
            "text": "🌙 Ay",
            "textEn": "🌙 Moon",
            "textRu": "🌙 Луна",
            "emoji": "🌙",
            "isCorrect": true
          },
          {
            "id": "mt2",
            "text": "☀️ Günəş",
            "textEn": "☀️ Sun",
            "textRu": "☀️ Солнце",
            "emoji": "☀️",
            "isCorrect": false
          },
          {
            "id": "mt3",
            "text": "☁️ Bulud",
            "textEn": "☁️ Cloud",
            "textRu": "☁️ Облако",
            "emoji": "☁️",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Ulduz düz xətlə hərəkət edərək nurlu Aya çatır! ⭐➔🌙",
        "explanationEn": "Well done! The star traces the straight line straight to the Moon! ⭐➔🌙",
        "explanationRu": "Молодец! Звездочка по прямой дорожке пришла прямо к Луне! ⭐➔🌙"
      },
      {
        "id": "mot-trace-rocket-planet-2",
        "title": "Ziqzaq Xətlə Planetə",
        "titleEn": "Zigzag Path to Planet",
        "titleRu": "Зигзаг к планете",
        "lesson": {
          "id": "mot-lesson-zigzag",
          "conceptTitleAz": "Ziqzaq və Əyri Xətləri Öyrənək!",
          "conceptTitleEn": "Let's Learn Zigzag Tracing!",
          "conceptTitleRu": "Учимся Зигзагообразным Линиям!",
          "explanationAz": "Ziqzaq xətt şimşək kimi yuxarı və aşağı dönür! Kosmik raket (🚀) ziqzaq xətt boyunca uçaraq Halqalı Planetə (🪐) doğru gedir!",
          "explanationEn": "A zigzag line zips up and down like lightning! The space rocket (🚀) flies along the zigzag path directly to the Ringed Planet (🪐)!",
          "explanationRu": "Линия зигзаг поворачивает вверх и вниз! Космическая ракета (🚀) летит по зигзагу прямо к Планете с кольцами (🪐)!",
          "bigEmojis": [
            "🚀",
            "🪐",
            "⚡",
            "🛸"
          ],
          "audioTextAz": "Raket ziqzaq xətlə planetə uçur. Barmağınla izlə.",
          "audioTextEn": "Rocket flies zigzag to the planet. Trace it.",
          "audioTextRu": "Ракета летит по зигзагу к планете. Веди пальчиком."
        },
        "visualScene": {
          "type": "tracing",
          "startEmoji": "🚀",
          "targetEmoji": "🪐",
          "pathType": "zigzag",
          "captionAz": "Şəkil: Kosmik raket ziqzaq xətlə Planetə uçur 🚀~/\\~➔🪐",
          "captionEn": "Picture: Rocket flies zigzag to the Planet 🚀~/\\~➔🪐",
          "captionRu": "Картинка: Ракета летит зигзагом к Планете 🚀~/\\~➔🪐"
        },
        "instruction": "Şəklə bax: Kosmik raket ziqzaq xətt boyunca hansı hədəfə uçur?",
        "instructionEn": "Look at picture: Which target does the space rocket fly towards along the zigzag?",
        "instructionRu": "Посмотри на картинку: К какой планете летит ракета по зигзагу?",
        "type": "select",
        "question": "Yuxarıdakı xəttə bax: Raket hansı sehirli planetə doğru uçur?",
        "questionEn": "Look at the track above: Which magical planet is the rocket flying towards?",
        "questionRu": "Взгляни на траекторию: К какой планете устремлена ракета?",
        "targetAudioText": "Planeti tap.",
        "targetAudioTextEn": "Find the planet.",
        "targetAudioTextRu": "Найди планету.",
        "options": [
          {
            "id": "mt4",
            "text": "🪐 Halqalı Planet",
            "textEn": "🪐 Ringed Planet",
            "textRu": "🪐 Планета с кольцами",
            "emoji": "🪐",
            "isCorrect": true
          },
          {
            "id": "mt5",
            "text": "🌊 Dəniz dalğası",
            "textEn": "🌊 Ocean wave",
            "textRu": "🌊 Морская волна",
            "emoji": "🌊",
            "isCorrect": false
          },
          {
            "id": "mt6",
            "text": "🌳 Yaşıl ağac",
            "textEn": "🌳 Green tree",
            "textRu": "🌳 Зеленое дерево",
            "emoji": "🌳",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Raket ziqzaq xətlərlə uzaq planetə uğurla çatdı! 🚀🪐",
        "explanationEn": "Correct! The rocket successfully navigated the zigzag path to the planet! 🚀🪐",
        "explanationRu": "Правильно! Ракета по зигзагу успешно добралась до далекой планеты! 🚀🪐"
      },
      {
        "id": "mot-trace-bee-flower-3",
        "title": "Dalğalı Xətlə Çiçəyə",
        "titleEn": "Wavy Path to Flower",
        "titleRu": "Волнистая дорожка к цветку",
        "lesson": {
          "id": "mot-lesson-wave",
          "conceptTitleAz": "Dalğalı və Qıvrım Xətləri Öyrənək!",
          "conceptTitleEn": "Let's Learn Wavy Curved Lines!",
          "conceptTitleRu": "Учимся Волнистым Линиям!",
          "explanationAz": "Balaca arı havada dalğalar kimi qıvrılaraq uçur (🐝). Dalğalı xətt boyunca uçaraq ətirli gözəl Gülə (🌸) qonur! Barmağınla arının yolunu çək!",
          "explanationEn": "The little bee swoops and curves through the air (🐝). Tracing the wavy path it lands on a sweet Flower (🌸)! Trace the bee's flight!",
          "explanationRu": "Маленькая пчелка летит плавной волной (🐝). Следуя по волнистой дорожке, она садится на душистый Цветок (🌸)! Проведи дорожку пчелки!",
          "bigEmojis": [
            "🐝",
            "🌸",
            "🌷",
            "🍯"
          ],
          "audioTextAz": "Arı dalğalı xətlə gülə uçur. Barmağınla izlə.",
          "audioTextEn": "The bee flies in a wave to the flower. Trace it.",
          "audioTextRu": "Пчелка летит волной к цветку. Веди пальчиком."
        },
        "visualScene": {
          "type": "tracing",
          "startEmoji": "🐝",
          "targetEmoji": "🌸",
          "pathType": "wave",
          "captionAz": "Şəkil: Bal arısı dalğalı xətlə Gülə doğru uçur 🐝∿∿➔🌸",
          "captionEn": "Picture: Bee flies in a wave to the Flower 🐝∿∿➔🌸",
          "captionRu": "Картинка: Пчелка летит волной к Цветку 🐝∿∿➔🌸"
        },
        "instruction": "Şəklə bax: Bal arısı dalğalı xətt boyunca nəyə tərəf uçur?",
        "instructionEn": "Look at picture: Where does the honeybee fly along the wavy line?",
        "instructionRu": "Посмотри на картинку: К чему летит пчелка по волнистой линии?",
        "type": "select",
        "question": "Arının getdiyi yolun sonunda hansı gözəl çiçək gözləyir?",
        "questionEn": "Which beautiful flower is waiting at the end of the bee's path?",
        "questionRu": "Какой красивый цветок ждет пчелку в конце пути?",
        "targetAudioText": "Çiçəyi seç.",
        "targetAudioTextEn": "Select the flower.",
        "targetAudioTextRu": "Выбери цветок.",
        "options": [
          {
            "id": "mt7",
            "text": "🌸 Gözəl Gül",
            "textEn": "🌸 Lovely Flower",
            "textRu": "🌸 Красивый цветок",
            "emoji": "🌸",
            "isCorrect": true
          },
          {
            "id": "mt8",
            "text": "🍄 Göbələk",
            "textEn": "🍄 Mushroom",
            "textRu": "🍄 Грибок",
            "emoji": "🍄",
            "isCorrect": false
          },
          {
            "id": "mt9",
            "text": "🪨 Daş",
            "textEn": "🪨 Stone",
            "textRu": "🪨 Камень",
            "emoji": "🪨",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! Arı dalğalı xətlə gülün üstünə qondu və nektar topladı! 🐝🌸🍯",
        "explanationEn": "Great! The bee followed the wave to the flower and collected nectar! 🐝🌸🍯",
        "explanationRu": "Отлично! Пчелка по волне прилетела прямо к цветку за нектаром! 🐝🌸🍯"
      }
    ]
  },
  {
    "id": "movements",
    "slug": "hereketler",
    "titleAz": "Ümumi motorika və hərəkətlər",
    "titleEn": "Gross Motor & Movement",
    "titleRu": "Общая моторика и движения",
    "descriptionAz": "Tullanma, qaçış, tarazlıq, əyilmə və idman hərəkətləri.",
    "emoji": "🏃",
    "group": "cognitive",
    "minAge": 2,
    "maxAge": 7,
    "color": "from-emerald-500 to-green-400",
    "activities": [
      {
        "id": "mov-jump-frog-1",
        "title": "Qurbağa Kimi Tullan",
        "titleEn": "Jump Like a Frog",
        "titleRu": "Прыгай как лягушка",
        "lesson": {
          "id": "mov-lesson-active",
          "conceptTitleAz": "Şən İdman Hərəkətlərini Öyrənək!",
          "conceptTitleEn": "Let's Learn Fun Physical Movements!",
          "conceptTitleRu": "Учим Веселые Движения и Разминку!",
          "explanationAz": "Bədənimiz sağlam olsun deyə idman edirik! Qurbağa və dovşan kimi hündürə tullanırıq (🦘🐸). Qartal kimi qollarımızı açıb qanad çalırıq (🦅)!",
          "explanationEn": "We exercise to stay strong and healthy! We leap high like frogs and bunnies (🦘🐸). We spread arms and flap like eagles (🦅)!",
          "explanationRu": "Мы делаем зарядку, чтобы быть сильными и здоровыми! Прыгаем высоко как лягушата и зайчики (🦘🐸). Машем руками как крыльями (🦅)!",
          "bigEmojis": [
            "🤸",
            "🏃",
            "🤾",
            "🧘"
          ],
          "audioTextAz": "Tullanırıq, qaçırıq, qanad çalırıq, idman edirik.",
          "audioTextEn": "We jump, run, flap arms, stay active.",
          "audioTextRu": "Прыгаем, бегаем, машем руками, делаем зарядку."
        },
        "instruction": "Qurbağa və dovşan kimi hündürə nə edirik?",
        "instructionEn": "What do we do high like frogs and bunnies?",
        "instructionRu": "Что мы делаем высоко как лягушата и зайчата?",
        "type": "select",
        "question": "Qurbağa kimi cəld hündürə tullanmaq üçün hansı hərəkəti seçirik?",
        "questionEn": "Which movement do we select to jump high like a frog?",
        "questionRu": "Какое движение выбираем, чтобы прыгать высоко как лягушка?",
        "targetAudioText": "Tullanmağı seç.",
        "targetAudioTextEn": "Select jumping.",
        "targetAudioTextRu": "Выбери прыжки.",
        "options": [
          {
            "id": "mv1",
            "text": "🦘 Şadlanıb tullanırıq",
            "textEn": "🦘 Jump joyfully",
            "textRu": "🦘 Весело прыгаем",
            "emoji": "🦘",
            "isCorrect": true
          },
          {
            "id": "mv2",
            "text": "😴 Yataqda yatırıq",
            "textEn": "😴 Sleep in bed",
            "textRu": "😴 Спим в постели",
            "emoji": "😴",
            "isCorrect": false
          },
          {
            "id": "mv3",
            "text": "🪑 Stulda donub qalırıq",
            "textEn": "🪑 Freeze on chair",
            "textRu": "🪑 Замираем на стуле",
            "emoji": "🪑",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Tullanmaq ayaq əzələlərimizi çox güclü edir! 🦘✨",
        "explanationEn": "Well done! Jumping strengthens leg muscles and energy! 🦘✨",
        "explanationRu": "Молодец! Прыжки делают ножки сильными и крепкими! 🦘✨"
      },
      {
        "id": "mov-flap-arms-2",
        "title": "Quş Kimi Qanad Çal",
        "titleEn": "Flap Wings Like a Bird",
        "titleRu": "Маши крыльями как птица",
        "instruction": "Quş kimi qollarımızı yana açıb nə edirik?",
        "instructionEn": "What do we do spreading arms like a bird?",
        "instructionRu": "Что мы делаем, раскинув руки как птица крылья?",
        "type": "select",
        "question": "Göy üzündə quş kimi süzmək üçün qollarımızla nə edirik?",
        "questionEn": "How do we flap our arms to glide like a bird in the sky?",
        "questionRu": "Как мы машем руками, чтобы парить как птица в небе?",
        "targetAudioText": "Qanad çalmağı seç.",
        "targetAudioTextEn": "Select flapping wings.",
        "targetAudioTextRu": "Выбери взмахи руками.",
        "options": [
          {
            "id": "mv4",
            "text": "🦅 Qanad çalırıq",
            "textEn": "🦅 Flap wings",
            "textRu": "🦅 Машем крыльями",
            "emoji": "🦅",
            "isCorrect": true
          },
          {
            "id": "mv5",
            "text": "🤿 Suyun altına giririk",
            "textEn": "🤿 Dive underwater",
            "textRu": "🤿 Ныряем под воду",
            "emoji": "🤿",
            "isCorrect": false
          },
          {
            "id": "mv6",
            "text": "🙈 Gözləri örtürük",
            "textEn": "🙈 Cover eyes",
            "textRu": "🙈 Закрываем глаза",
            "emoji": "🙈",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Qollarımızı yellədikcə nəfəsimiz açılır və gümrah oluruq! 🦅💨",
        "explanationEn": "Correct! Flapping arms expands our chest and brings energy! 🦅💨",
        "explanationRu": "Правильно! Взмахи руками разминают плечи и дарят бодрость! 🦅💨"
      },
      {
        "id": "mov-stretch-sky-3",
        "title": "Göylərə Uzan",
        "titleEn": "Stretch to the Sky",
        "titleRu": "Тянись к солнышку",
        "instruction": "Barmaq uclarında günəşə doğru dartın.",
        "instructionEn": "Stretch on tiptoes up towards the sun.",
        "instructionRu": "Тянись на цыпочках вверх к солнышку.",
        "type": "select",
        "question": "Boyumuzun uca olması üçün qollarımızı hara doğru qaldırıb dartınırıq?",
        "questionEn": "Where do we stretch our arms high to grow tall?",
        "questionRu": "Куда мы тянемся ручками вверх, чтобы подрасти?",
        "targetAudioText": "Göylərə dartınmağı seç.",
        "targetAudioTextEn": "Select stretching to sky.",
        "targetAudioTextRu": "Выбери тянуться к небу.",
        "options": [
          {
            "id": "mv7",
            "text": "☀️ Günəşə və göyə doğru dartınırıq",
            "textEn": "☀️ Stretch up to the sun and sky",
            "textRu": "☀️ Тянемся вверх к солнышку",
            "emoji": "☀️",
            "isCorrect": true
          },
          {
            "id": "mv8",
            "text": "🕳️ Quyunun içinə əyilirik",
            "textEn": "🕳️ Bend into well",
            "textRu": "🕳️ Наклоняемся в яму",
            "emoji": "🕳️",
            "isCorrect": false
          },
          {
            "id": "mv9",
            "text": "🛏️ Yatağa girib bükülürük",
            "textEn": "🛏️ Curl in bed",
            "textRu": "🛏️ Сворачиваемся в постели",
            "emoji": "🛏️",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Göylərə dartındıqca boyumuz hündür və qamətimiz düz olur! ☀️🧍✨",
        "explanationEn": "Super! Stretching tall helps us grow upright and healthy! ☀️🧍✨",
        "explanationRu": "Супер! Потягивания вверх делают осанку ровной и помогают расти! ☀️🧍✨"
      }
    ]
  },
  {
    "id": "math",
    "slug": "riyaziyyat",
    "titleAz": "Riyaziyyat",
    "titleEn": "Mathematics",
    "titleRu": "Математика",
    "descriptionAz": "Rəqəmlər, toplama, çıxma və əyləncəli sayma dərsləri.",
    "emoji": "🔢",
    "group": "cognitive",
    "minAge": 3,
    "maxAge": 8,
    "color": "from-amber-500 to-red-400",
    "activities": [
      {
        "id": "math-1",
        "title": "1 + 1 = ?",
        "titleEn": "1 + 1 = ?",
        "titleRu": "1 + 1 = ?",
        "lesson": {
          "id": "math-lesson-1",
          "conceptTitleAz": "1-dən 10-a qədər Sayırıq!",
          "conceptTitleEn": "Counting from 1 to 10!",
          "conceptTitleRu": "Считаем от 1 до 10!",
          "explanationAz": "Gəl almaları birgə sayaq! Bir qırmızı almanın yanına bir alma da qoysaq, cəmi 2 alma edir: 1 + 1 = 2 (🍎 + 🍎 = 🍎🍎)!",
          "explanationEn": "Let's count apples together! If we add 1 red apple to 1 red apple, we get 2 apples: 1 + 1 = 2 (🍎 + 🍎 = 🍎🍎)!",
          "explanationRu": "Давай считать яблочки вместе! Если к одному красному яблоку положить еще одно, получится 2 яблока: 1 + 1 = 2 (🍎 + 🍎 = 🍎🍎)!",
          "bigEmojis": [
            "1️⃣",
            "2️⃣",
            "🍎",
            "➕"
          ],
          "audioTextAz": "Bir alma üstəgəl bir alma elədi iki alma.",
          "audioTextEn": "One apple plus one apple equals two apples.",
          "audioTextRu": "Одно яблоко плюс одно яблоко равно два яблока."
        },
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 1,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 1,
            "rightEmoji": "🍎",
            "resultCount": 2,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 1 alma + 1 alma = ?",
          "captionEn": "Math formula: 1 apple + 1 apple = ?",
          "captionRu": "Формула: 1 яблоко + 1 яблоко = ?"
        },
        "instruction": "Formulaya bax: 1 alma üstəgəl 1 alma neçə edər?",
        "instructionEn": "Look at the formula: What is 1 apple plus 1 apple?",
        "instructionRu": "Посмотри на формулу: Сколько будет 1 яблоко плюс 1 яблоко?",
        "type": "select",
        "question": "1 alma + 1 alma cəmi neçə alma edir?",
        "questionEn": "What is 1 apple + 1 apple?",
        "questionRu": "Сколько будет 1 яблоко + 1 яблоко?",
        "targetAudioText": "1 üstəgəl 1 neçə edir?",
        "targetAudioTextEn": "What is 1 plus 1?",
        "targetAudioTextRu": "Сколько будет 1 плюс 1?",
        "options": [
          {
            "id": "m1",
            "text": "2 Alma",
            "textEn": "2 Apples",
            "textRu": "2 Яблока",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m2",
            "text": "1 Alma",
            "textEn": "1 Apple",
            "textRu": "1 Яблоко",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m3",
            "text": "3 Alma",
            "textEn": "3 Apples",
            "textRu": "3 Яблока",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! 1 + 1 = 2 alma edir! 🍎🍎",
        "explanationEn": "Well done! 1 + 1 = 2 apples! 🍎🍎",
        "explanationRu": "Молодец! 1 + 1 = 2 яблока! 🍎🍎"
      },
      {
        "id": "math-2",
        "title": "2 + 1 = ?",
        "titleEn": "2 + 1 = ?",
        "titleRu": "2 + 1 = ?",
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 2,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 1,
            "rightEmoji": "🍎",
            "resultCount": 3,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 2 alma + 1 alma = ?",
          "captionEn": "Math formula: 2 apples + 1 apple = ?",
          "captionRu": "Формула: 2 яблока + 1 яблоко = ?"
        },
        "instruction": "2 almanın üstünə 1 alma da gəlsək neçə olar?",
        "instructionEn": "What is 2 apples plus 1 apple?",
        "instructionRu": "Сколько будет 2 яблока плюс 1 яблоко?",
        "type": "select",
        "question": "2 alma + 1 alma cəmi neçə alma edər?",
        "questionEn": "What is 2 apples + 1 apple?",
        "questionRu": "Сколько будет 2 яблока + 1 яблоко?",
        "targetAudioText": "2 üstəgəl 1 neçə edir?",
        "targetAudioTextEn": "What is 2 plus 1?",
        "targetAudioTextRu": "Сколько будет 2 плюс 1?",
        "options": [
          {
            "id": "m4",
            "text": "3 Alma",
            "textEn": "3 Apples",
            "textRu": "3 Яблока",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m5",
            "text": "4 Alma",
            "textEn": "4 Apples",
            "textRu": "4 Яблока",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m6",
            "text": "2 Alma",
            "textEn": "2 Apples",
            "textRu": "2 Яблока",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! 2 + 1 = 3 alma! 🍎🍎🍎",
        "explanationEn": "Great! 2 + 1 = 3 apples! 🍎🍎🍎",
        "explanationRu": "Отлично! 2 + 1 = 3 яблока! 🍎🍎🍎"
      },
      {
        "id": "math-3",
        "title": "5 + 2 = ?",
        "titleEn": "5 + 2 = ?",
        "titleRu": "5 + 2 = ?",
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 5,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 2,
            "rightEmoji": "🍎",
            "resultCount": 7,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 5 alma + 2 alma = ?",
          "captionEn": "Math formula: 5 apples + 2 apples = ?",
          "captionRu": "Формула: 5 яблок + 2 яблока = ?"
        },
        "instruction": "5 alma ilə 2 almanı toplasaq neçə edər?",
        "instructionEn": "If we add 5 apples and 2 apples, what do we get?",
        "instructionRu": "Если сложить 5 яблок и 2 яблока, сколько получится?",
        "type": "select",
        "question": "5 + 2 cəmi neçəyə bərabərdir?",
        "questionEn": "What does 5 + 2 equal?",
        "questionRu": "Чему равна сумма 5 + 2?",
        "targetAudioText": "5 üstəgəl 2 neçə edir?",
        "targetAudioTextEn": "What is 5 plus 2?",
        "targetAudioTextRu": "Сколько будет 5 плюс 2?",
        "options": [
          {
            "id": "m7",
            "text": "7 Alma",
            "textEn": "7 Apples",
            "textRu": "7 Яблок",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m8",
            "text": "6 Alma",
            "textEn": "6 Apples",
            "textRu": "6 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m9",
            "text": "8 Alma",
            "textEn": "8 Apples",
            "textRu": "8 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! 5 alma + 2 alma = 7 alma! 🍎✨",
        "explanationEn": "Correct! 5 apples + 2 apples = 7 apples! 🍎✨",
        "explanationRu": "Правильно! 5 яблок + 2 яблока = 7 яблок! 🍎✨"
      },
      {
        "id": "math-4",
        "title": "10 + 1 = 11",
        "titleEn": "10 + 1 = 11",
        "titleRu": "10 + 1 = 11",
        "lesson": {
          "id": "math-lesson-2",
          "conceptTitleAz": "10-un Üzərinə Say Əlavə Etmək (10 + 1 = 11)!",
          "conceptTitleEn": "Adding to 10 (10 + 1 = 11)!",
          "conceptTitleRu": "Прибавляем к 10 (10 + 1 = 11)!",
          "explanationAz": "Bir tam onluğumuz (10 alma) var! Onun üzərinə 1 alma da əlavə etsək, 11 edir: 10 + 1 = 11! 10 + 2 = 12, 10 + 5 = 15!",
          "explanationEn": "We have 1 full ten (10 apples)! If we add 1 more apple, it makes 11: 10 + 1 = 11! 10 + 2 = 12, 10 + 5 = 15!",
          "explanationRu": "У нас есть десяток (10 яблок)! Если добавить 1 яблоко, получится 11: 10 + 1 = 11! 10 + 2 = 12, 10 + 5 = 15!",
          "bigEmojis": [
            "🔟",
            "1️⃣",
            "11",
            "🍎"
          ],
          "audioTextAz": "On alma üstəgəl bir alma elədi on bir alma.",
          "audioTextEn": "Ten apples plus one apple equals eleven apples.",
          "audioTextRu": "Десять яблок плюс одно яблоко равно одиннадцать яблок."
        },
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 10,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 1,
            "rightEmoji": "🍎",
            "resultCount": 11,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 10 alma + 1 alma = ?",
          "captionEn": "Math formula: 10 apples + 1 apple = ?",
          "captionRu": "Формула: 10 яблок + 1 яблоко = ?"
        },
        "instruction": "10 almanın üstünə 1 alma gəlsək neçə edər?",
        "instructionEn": "What is 10 apples plus 1 apple?",
        "instructionRu": "Сколько будет 10 яблок плюс 1 яблоко?",
        "type": "select",
        "question": "10 + 1 cəmi neçə edir?",
        "questionEn": "What is 10 + 1?",
        "questionRu": "Сколько будет 10 + 1?",
        "targetAudioText": "10 üstəgəl 1 neçə edir?",
        "targetAudioTextEn": "What is 10 plus 1?",
        "targetAudioTextRu": "Сколько будет 10 плюс 1?",
        "options": [
          {
            "id": "m10",
            "text": "11 Alma",
            "textEn": "11 Apples",
            "textRu": "11 Яблок",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m11",
            "text": "10 Alma",
            "textEn": "10 Apples",
            "textRu": "10 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m12",
            "text": "12 Alma",
            "textEn": "12 Apples",
            "textRu": "12 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! 10 + 1 = 11 alma! 🔟🍎",
        "explanationEn": "Well done! 10 + 1 = 11 apples! 🔟🍎",
        "explanationRu": "Молодец! 10 + 1 = 11 яблок! 🔟🍎"
      },
      {
        "id": "math-5",
        "title": "10 + 2 = 12",
        "titleEn": "10 + 2 = 12",
        "titleRu": "10 + 2 = 12",
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 10,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 2,
            "rightEmoji": "🍎",
            "resultCount": 12,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 10 alma + 2 alma = ?",
          "captionEn": "Math formula: 10 apples + 2 apples = ?",
          "captionRu": "Формула: 10 яблок + 2 яблока = ?"
        },
        "instruction": "10 almanın üstünə 2 alma əlavə etdikdə nəticə neçə olar?",
        "instructionEn": "What is 10 apples plus 2 apples?",
        "instructionRu": "Сколько будет 10 яблок плюс 2 яблока?",
        "type": "select",
        "question": "10 + 2 cəmi neçəyə bərabərdir?",
        "questionEn": "What does 10 + 2 equal?",
        "questionRu": "Чему равна сумма 10 + 2?",
        "targetAudioText": "10 üstəgəl 2 neçə edir?",
        "targetAudioTextEn": "What is 10 plus 2?",
        "targetAudioTextRu": "Сколько будет 10 плюс 2?",
        "options": [
          {
            "id": "m13",
            "text": "12 Alma",
            "textEn": "12 Apples",
            "textRu": "12 Яблок",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m14",
            "text": "13 Alma",
            "textEn": "13 Apples",
            "textRu": "13 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m15",
            "text": "11 Alma",
            "textEn": "11 Apples",
            "textRu": "11 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm! 10 + 2 = 12 alma edir! ✨",
        "explanationEn": "Awesome! 10 + 2 = 12 apples! ✨",
        "explanationRu": "Замечательно! 10 + 2 = 12 яблок! ✨"
      },
      {
        "id": "math-6",
        "title": "10 + 5 = 15",
        "titleEn": "10 + 5 = 15",
        "titleRu": "10 + 5 = 15",
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 10,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 5,
            "rightEmoji": "🍎",
            "resultCount": 15,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 10 alma + 5 alma = ?",
          "captionEn": "Math formula: 10 apples + 5 apples = ?",
          "captionRu": "Формула: 10 яблок + 5 яблок = ?"
        },
        "instruction": "10 almanın üstünə 5 alma gəlsək neçə edər?",
        "instructionEn": "What is 10 apples plus 5 apples?",
        "instructionRu": "Сколько будет 10 яблок плюс 5 яблок?",
        "type": "select",
        "question": "10 + 5 cəmi neçədir?",
        "questionEn": "What is 10 + 5?",
        "questionRu": "Сколько будет 10 + 5?",
        "targetAudioText": "10 üstəgəl 5 neçə edir?",
        "targetAudioTextEn": "What is 10 plus 5?",
        "targetAudioTextRu": "Сколько будет 10 плюс 5?",
        "options": [
          {
            "id": "m16",
            "text": "15 Alma",
            "textEn": "15 Apples",
            "textRu": "15 Яблок",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m17",
            "text": "14 Alma",
            "textEn": "14 Apples",
            "textRu": "14 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m18",
            "text": "20 Alma",
            "textEn": "20 Apples",
            "textRu": "20 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Super! 10 + 5 = 15 alma! 🌟",
        "explanationEn": "Super! 10 + 5 = 15 apples! 🌟",
        "explanationRu": "Супер! 10 + 5 = 15 яблок! 🌟"
      },
      {
        "id": "math-7",
        "title": "10 + 10 = 20",
        "titleEn": "10 + 10 = 20",
        "titleRu": "10 + 10 = 20",
        "lesson": {
          "id": "math-lesson-3",
          "conceptTitleAz": "Onluqlarla Toplama: 10 + 10 = 20 və 50-dən 100-ə qədər!",
          "conceptTitleEn": "Adding Tens: 10 + 10 = 20 and up to 100!",
          "conceptTitleRu": "Сложение десятками: 10 + 10 = 20 и до 100!",
          "explanationAz": "10 alma üstəgəl 10 alma bərabərdir 20 alma! (10 + 10 = 20). 20 + 10 = 30, və 50 alma üstəgəl 50 alma bərabərdir 100 alma (50 + 50 = 100)!",
          "explanationEn": "10 apples plus 10 apples equals 20 apples! (10 + 10 = 20). 20 + 10 = 30, and 50 apples plus 50 apples equals 100 apples (50 + 50 = 100)!",
          "explanationRu": "10 яблок плюс 10 яблок равно 20 яблок! (10 + 10 = 20). 20 + 10 = 30, а 50 яблок плюс 50 яблок равно 100 яблок (50 + 50 = 100)!",
          "bigEmojis": [
            "🔟",
            "➕",
            "🔟",
            "20",
            "💯"
          ],
          "audioTextAz": "On alma üstəgəl on alma elədi iyirmi alma.",
          "audioTextEn": "Ten apples plus ten apples equals twenty apples.",
          "audioTextRu": "Десять яблок плюс десять яблок равно двадцать яблок."
        },
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 10,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 10,
            "rightEmoji": "🍎",
            "resultCount": 20,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 10 alma + 10 alma = ?",
          "captionEn": "Math formula: 10 apples + 10 apples = ?",
          "captionRu": "Формула: 10 яблок + 10 яблок = ?"
        },
        "instruction": "10 alma üstəgəl 10 alma cəmi neçə edər?",
        "instructionEn": "What is 10 apples plus 10 apples?",
        "instructionRu": "Сколько будет 10 яблок плюс 10 яблок?",
        "type": "select",
        "question": "10 + 10 cəmi neçəyə bərabərdir?",
        "questionEn": "What is 10 + 10?",
        "questionRu": "Сколько будет 10 + 10?",
        "targetAudioText": "10 üstəgəl 10 neçə edir?",
        "targetAudioTextEn": "What is 10 plus 10?",
        "targetAudioTextRu": "Сколько будет 10 плюс 10?",
        "options": [
          {
            "id": "m19",
            "text": "20 Alma",
            "textEn": "20 Apples",
            "textRu": "20 Яблок",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m20",
            "text": "15 Alma",
            "textEn": "15 Apples",
            "textRu": "15 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m21",
            "text": "30 Alma",
            "textEn": "30 Apples",
            "textRu": "30 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! İki dənə 10 tam 20 alma edir! 🍎🎉",
        "explanationEn": "Well done! Two tens make exactly 20 apples! 🍎🎉",
        "explanationRu": "Молодец! Два десятка — это ровно 20 яблок! 🍎🎉"
      },
      {
        "id": "math-8",
        "title": "20 + 10 = 30",
        "titleEn": "20 + 10 = 30",
        "titleRu": "20 + 10 = 30",
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 20,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 10,
            "rightEmoji": "🍎",
            "resultCount": 30,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 20 alma + 10 alma = ?",
          "captionEn": "Math formula: 20 apples + 10 apples = ?",
          "captionRu": "Формула: 20 яблок + 10 яблок = ?"
        },
        "instruction": "20 almanın üstünə 10 alma gəlsək neçə edər?",
        "instructionEn": "What is 20 apples plus 10 apples?",
        "instructionRu": "Сколько будет 20 яблок плюс 10 яблок?",
        "type": "select",
        "question": "20 + 10 cəmi neçə edir?",
        "questionEn": "What is 20 + 10?",
        "questionRu": "Сколько будет 20 + 10?",
        "targetAudioText": "20 üstəgəl 10 neçə edir?",
        "targetAudioTextEn": "What is 20 plus 10?",
        "targetAudioTextRu": "Сколько будет 20 плюс 10?",
        "options": [
          {
            "id": "m22",
            "text": "30 Alma",
            "textEn": "30 Apples",
            "textRu": "30 Яблок",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m23",
            "text": "25 Alma",
            "textEn": "25 Apples",
            "textRu": "25 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m24",
            "text": "40 Alma",
            "textEn": "40 Apples",
            "textRu": "40 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Əla! 20 + 10 = 30 alma! 🍎✨",
        "explanationEn": "Great! 20 + 10 = 30 apples! 🍎✨",
        "explanationRu": "Отлично! 20 + 10 = 30 яблок! 🍎✨"
      },
      {
        "id": "math-9",
        "title": "50 + 50 = 100",
        "titleEn": "50 + 50 = 100",
        "titleRu": "50 + 50 = 100",
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 50,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 50,
            "rightEmoji": "🍎",
            "resultCount": 100,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 50 alma + 50 alma = ?",
          "captionEn": "Math formula: 50 apples + 50 apples = ?",
          "captionRu": "Формула: 50 яблок + 50 яблок = ?"
        },
        "instruction": "50 alma üstəgəl 50 alma cəmi neçə edər?",
        "instructionEn": "What is 50 apples plus 50 apples?",
        "instructionRu": "Сколько будет 50 яблок плюс 50 яблок?",
        "type": "select",
        "question": "50 + 50 cəmi neçəyə bərabərdir?",
        "questionEn": "What does 50 + 50 equal?",
        "questionRu": "Чему равна сумма 50 + 50?",
        "targetAudioText": "50 üstəgəl 50 neçə edir?",
        "targetAudioTextEn": "What is 50 plus 50?",
        "targetAudioTextRu": "Сколько будет 50 плюс 50?",
        "options": [
          {
            "id": "m25",
            "text": "100 Alma",
            "textEn": "100 Apples",
            "textRu": "100 Яблок",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m26",
            "text": "80 Alma",
            "textEn": "80 Apples",
            "textRu": "80 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m27",
            "text": "90 Alma",
            "textEn": "90 Apples",
            "textRu": "90 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm riyaziyyat! 50 + 50 = 100 tam yüzlük edir! 💯🍎",
        "explanationEn": "Awesome math! 50 + 50 = 100 full hundred! 💯🍎",
        "explanationRu": "Потрясающая математика! 50 + 50 = 100 ровно сотня! 💯🍎"
      },
      {
        "id": "math-10",
        "title": "20 + 5 = 25",
        "titleEn": "20 + 5 = 25",
        "titleRu": "20 + 5 = 25",
        "lesson": {
          "id": "math-lesson-4",
          "conceptTitleAz": "25 Alma Necə Yaranır? 20 alma + 5 alma = 25 alma!",
          "conceptTitleEn": "How to make 25? 20 apples + 5 apples = 25 apples!",
          "conceptTitleRu": "Как получается 25? 20 яблок + 5 яблок = 25 яблок!",
          "explanationAz": "Böyük ədədləri toplamaq çox asandır: 20 almanın üzərinə 5 alma gəldikdə düz 25 alma edir (20 + 5 = 25)! 30 alma + 4 alma = 34 alma!",
          "explanationEn": "Adding compound numbers is easy: 20 apples plus 5 apples makes exactly 25 apples (20 + 5 = 25)! 30 apples + 4 apples = 34 apples!",
          "explanationRu": "Складывать составные числа просто: 20 яблок плюс 5 яблок получается ровно 25 яблок (20 + 5 = 25)! 30 яблок + 4 яблока = 34 яблока!",
          "bigEmojis": [
            "20",
            "➕",
            "5️⃣",
            "25",
            "🍎"
          ],
          "audioTextAz": "İyirmi alma üstəgəl beş alma elədi iyirmi beş alma.",
          "audioTextEn": "Twenty apples plus five apples equals twenty-five apples.",
          "audioTextRu": "Двадцать яблок плюс пять яблок равно двадцать пять яблок."
        },
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 20,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 5,
            "rightEmoji": "🍎",
            "resultCount": 25,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 20 alma + 5 alma = ?",
          "captionEn": "Math formula: 20 apples + 5 apples = ?",
          "captionRu": "Формула: 20 яблок + 5 яблок = ?"
        },
        "instruction": "20 almanın üstünə 5 alma əlavə etsək neçə olar?",
        "instructionEn": "What is 20 apples plus 5 apples?",
        "instructionRu": "Сколько будет 20 яблок плюс 5 яблок?",
        "type": "select",
        "question": "20 alma + 5 alma cəmi neçə edir?",
        "questionEn": "What is 20 apples + 5 apples?",
        "questionRu": "Сколько будет 20 яблок + 5 яблок?",
        "targetAudioText": "20 üstəgəl 5 neçə edir?",
        "targetAudioTextEn": "What is 20 plus 5?",
        "targetAudioTextRu": "Сколько будет 20 плюс 5?",
        "options": [
          {
            "id": "m28",
            "text": "25 Alma",
            "textEn": "25 Apples",
            "textRu": "25 Яблок",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m29",
            "text": "24 Alma",
            "textEn": "24 Apples",
            "textRu": "24 Яблока",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m30",
            "text": "30 Alma",
            "textEn": "30 Apples",
            "textRu": "30 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Bəli! 20 alma + 5 alma elədi 25 alma! 🍎2️⃣5️⃣",
        "explanationEn": "Yes! 20 apples + 5 apples = 25 apples! 🍎2️⃣5️⃣",
        "explanationRu": "Да! 20 яблок + 5 яблок получилось 25 яблок! 🍎2️⃣5️⃣"
      },
      {
        "id": "math-11",
        "title": "30 + 4 = 34",
        "titleEn": "30 + 4 = 34",
        "titleRu": "30 + 4 = 34",
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 30,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 4,
            "rightEmoji": "🍎",
            "resultCount": 34,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 30 alma + 4 alma = ?",
          "captionEn": "Math formula: 30 apples + 4 apples = ?",
          "captionRu": "Формула: 30 яблок + 4 яблока = ?"
        },
        "instruction": "30 almanın üstünə 4 alma gəlsək neçə edər?",
        "instructionEn": "What is 30 apples plus 4 apples?",
        "instructionRu": "Сколько будет 30 яблок плюс 4 яблока?",
        "type": "select",
        "question": "30 + 4 cəmi neçəyə bərabərdir?",
        "questionEn": "What does 30 + 4 equal?",
        "questionRu": "Чему равна сумма 30 + 4?",
        "targetAudioText": "30 üstəgəl 4 neçə edir?",
        "targetAudioTextEn": "What is 30 plus 4?",
        "targetAudioTextRu": "Сколько будет 30 плюс 4?",
        "options": [
          {
            "id": "m31",
            "text": "34 Alma",
            "textEn": "34 Apples",
            "textRu": "34 Яблока",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m32",
            "text": "32 Alma",
            "textEn": "32 Apples",
            "textRu": "32 Яблока",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m33",
            "text": "36 Alma",
            "textEn": "36 Apples",
            "textRu": "36 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! 30 + 4 = 34 alma! 3️⃣4️⃣🍎",
        "explanationEn": "Correct! 30 + 4 = 34 apples! 3️⃣4️⃣🍎",
        "explanationRu": "Правильно! 30 + 4 = 34 яблока! 3️⃣4️⃣🍎"
      },
      {
        "id": "math-12",
        "title": "40 + 5 = 45",
        "titleEn": "40 + 5 = 45",
        "titleRu": "40 + 5 = 45",
        "visualScene": {
          "type": "math",
          "mathFormula": {
            "leftCount": 40,
            "leftEmoji": "🍎",
            "operator": "+",
            "rightCount": 5,
            "rightEmoji": "🍎",
            "resultCount": 45,
            "resultEmoji": "🍎"
          },
          "captionAz": "Riyazi formul: 40 alma + 5 alma = ?",
          "captionEn": "Math formula: 40 apples + 5 apples = ?",
          "captionRu": "Формула: 40 яблок + 5 яблок = ?"
        },
        "instruction": "40 almanın üstünə 5 alma gəldikdə nəticə neçə edər?",
        "instructionEn": "What is 40 apples plus 5 apples?",
        "instructionRu": "Сколько будет 40 яблок плюс 5 яблок?",
        "type": "select",
        "question": "40 alma + 5 alma cəmi neçə edir?",
        "questionEn": "What is 40 apples + 5 apples?",
        "questionRu": "Сколько будет 40 яблок + 5 яблок?",
        "targetAudioText": "40 üstəgəl 5 neçə edir?",
        "targetAudioTextEn": "What is 40 plus 5?",
        "targetAudioTextRu": "Сколько будет 40 плюс 5?",
        "options": [
          {
            "id": "m34",
            "text": "45 Alma",
            "textEn": "45 Apples",
            "textRu": "45 Яблок",
            "emoji": "🍎",
            "isCorrect": true
          },
          {
            "id": "m35",
            "text": "50 Alma",
            "textEn": "50 Apples",
            "textRu": "50 Яблок",
            "emoji": "🍎",
            "isCorrect": false
          },
          {
            "id": "m36",
            "text": "42 Alma",
            "textEn": "42 Apples",
            "textRu": "42 Яблока",
            "emoji": "🍎",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm riyazi bacarıq! 40 + 5 = 45 alma! 4️⃣5️⃣🍎",
        "explanationEn": "Awesome math skill! 40 + 5 = 45 apples! 4️⃣5️⃣🍎",
        "explanationRu": "Великолепный результат! 40 + 5 = 45 яблок! 4️⃣5️⃣🍎"
      }
    ]
  },
  {
    "id": "logic",
    "slug": "mentiq-ferqlendirme",
    "titleAz": "Məntiq və fərqləndirmə",
    "titleEn": "Logic & Reasoning",
    "titleRu": "Логика и рассуждение",
    "descriptionAz": "Məntiqi əlaqələr, ardıcıllıq, uyğunsuz olanı tapmaq.",
    "emoji": "🧩",
    "group": "cognitive",
    "minAge": 3,
    "maxAge": 8,
    "color": "from-indigo-600 to-violet-500",
    "activities": [
      {
        "id": "log-habitat-1",
        "title": "Quş və Balığın Evi",
        "titleEn": "Bird and Fish Home",
        "titleRu": "Дом птицы и рыбы",
        "lesson": {
          "id": "log-lesson-assoc",
          "conceptTitleAz": "Məntiqi Əlaqələri Öyrənək!",
          "conceptTitleEn": "Let's Learn Logical Associations!",
          "conceptTitleRu": "Учим Логические Связи!",
          "explanationAz": "Məntiqlə düşünək: Quş yuvasında və göydə yaşayır (🐦). Bəs balıq harada yaşayır və üzür? Əlbəttə, suda və dənizdə (🐟🌊)! Yağış yağanda isə islanmamaq üçün çətir açırıq (☂️)!",
          "explanationEn": "Let's reason logically: A bird lives in nests and skies (🐦). Where does a fish swim and live? In water and sea (🐟🌊)! When it rains, we open an umbrella (☂️)!",
          "explanationRu": "Рассуждаем логически: Птица живет в гнезде и летает в небе (🐦). А где живет и плавает рыба? В воде и море (🐟🌊)! А в дождь открываем зонтик (☂️)!",
          "bigEmojis": [
            "🧩",
            "💡",
            "🐟",
            "☂️"
          ],
          "audioTextAz": "Quş göydə uçur, balıq suda üzür, yağışda çətir açırıq.",
          "audioTextEn": "Birds fly in sky, fish swim in water, in rain we use umbrella.",
          "audioTextRu": "Птицы летают в небе, рыбы плавают в воде, в дождь берем зонт."
        },
        "instruction": "Məntiqi əlaqəni tap: Balıq harada yaşayır?",
        "instructionEn": "Find the logical connection: Where does a fish live?",
        "instructionRu": "Найди логическую связь: Где живет рыбка?",
        "type": "select",
        "question": "Quş yuvada və səmada yaşayır, bəs qızıl balıq harada yaşayır?",
        "questionEn": "Birds live in nests and skies, where do fish live?",
        "questionRu": "Птица живет в гнезде и небе, а где живет рыбка?",
        "targetAudioText": "Suda yaşamağı seç.",
        "targetAudioTextEn": "Select living in water.",
        "targetAudioTextRu": "Выбери жить в воде.",
        "options": [
          {
            "id": "lg1",
            "text": "🌊 Suda və dənizdə",
            "textEn": "🌊 In water and sea",
            "textRu": "🌊 В воде и море",
            "emoji": "🌊",
            "isCorrect": true
          },
          {
            "id": "lg2",
            "text": "🌳 Ağac budağında",
            "textEn": "🌳 On tree branch",
            "textRu": "🌳 На ветке дерева",
            "emoji": "🌳",
            "isCorrect": false
          },
          {
            "id": "lg3",
            "text": "🚗 Avtomobilin içində",
            "textEn": "🚗 Inside a car",
            "textRu": "🚗 Внутри машины",
            "emoji": "🚗",
            "isCorrect": false
          }
        ],
        "explanation": "Afərin! Balıqlar yalnız təmiz suda nəfəs alıb üzürlər! 🐟🌊",
        "explanationEn": "Well done! Fish breathe and swim in clear water! 🐟🌊",
        "explanationRu": "Молодец! Рыбки дышат и плавают только в чистой воде! 🐟🌊"
      },
      {
        "id": "log-rain-umbrella-2",
        "title": "Yağışda Nə Açırıq?",
        "titleEn": "What Opens in Rain?",
        "titleRu": "Что открываем в дождь?",
        "instruction": "Yağış yağanda islanmamaq üçün nə götürürük?",
        "instructionEn": "What do we use to stay dry in rain?",
        "instructionRu": "Что мы берем в дождь, чтобы не промокнуть?",
        "type": "select",
        "question": "Göydən güclü yağış yağanda islanmamaq üçün başımızın üstündə nə açırıq?",
        "questionEn": "What do we open over our head in heavy rain to stay dry?",
        "questionRu": "Что мы открываем над головой в сильный дождь?",
        "targetAudioText": "Çətiri seç.",
        "targetAudioTextEn": "Select umbrella.",
        "targetAudioTextRu": "Выбери зонтик.",
        "options": [
          {
            "id": "lg4",
            "text": "☂️ Əlvan Çətir",
            "textEn": "☂️ Colorful Umbrella",
            "textRu": "☂️ Разноцветный зонтик",
            "emoji": "☂️",
            "isCorrect": true
          },
          {
            "id": "lg5",
            "text": "🎒 Məktəb Çantası",
            "textEn": "🎒 School Bag",
            "textRu": "🎒 Школьный портфель",
            "emoji": "🎒",
            "isCorrect": false
          },
          {
            "id": "lg6",
            "text": "⚽ Futbol Topu",
            "textEn": "⚽ Soccer Ball",
            "textRu": "⚽ Футбольный мяч",
            "emoji": "⚽",
            "isCorrect": false
          }
        ],
        "explanation": "Düzdür! Çətir yağış damcılarından bizi etibarlı qoruyur! ☂️🌧️",
        "explanationEn": "Correct! An umbrella reliably protects us from rain! ☂️🌧️",
        "explanationRu": "Правильно! Зонтик надежно укрывает нас от дождя! ☂️🌧️"
      },
      {
        "id": "log-pattern-apple-3",
        "title": "Ardıcıllığı Tamamla",
        "titleEn": "Complete the Pattern",
        "titleRu": "Заверши закономерность",
        "instruction": "Növbəti meyvəni tap: Qırmızı alma, Yaşıl alma, Qırmızı alma, ... ?",
        "instructionEn": "Find the next fruit: Red apple, Green apple, Red apple, ... ?",
        "instructionRu": "Определи следующий фрукт: Красное яблоко, Зеленое яблоко, Красное яблоко, ... ?",
        "type": "select",
        "question": "Məntiqi sıranı tamamla: 🍎 Qırmızı alma, 🍏 Yaşıl alma, 🍎 Qırmızı alma, növbəti hansıdır?",
        "questionEn": "Complete the pattern: 🍎 Red apple, 🍏 Green apple, 🍎 Red apple, what comes next?",
        "questionRu": "Продолжи ряд: 🍎 Красное яблоко, 🍏 Зеленое яблоко, 🍎 Красное яблоко, что дальше?",
        "targetAudioText": "Yaşıl almanı seç.",
        "targetAudioTextEn": "Select green apple.",
        "targetAudioTextRu": "Выбери зеленое яблоко.",
        "options": [
          {
            "id": "lg7",
            "text": "🍏 Yaşıl Alma",
            "textEn": "🍏 Green Apple",
            "textRu": "🍏 Зеленое яблоко",
            "emoji": "🍏",
            "isCorrect": true
          },
          {
            "id": "lg8",
            "text": "🍌 Sarı Banan",
            "textEn": "🍌 Yellow Banana",
            "textRu": "🍌 Желтый банан",
            "emoji": "🍌",
            "isCorrect": false
          },
          {
            "id": "lg9",
            "text": "🍇 Bənövşəyi Üzüm",
            "textEn": "🍇 Purple Grape",
            "textRu": "🍇 Фиолетовый виноград",
            "emoji": "🍇",
            "isCorrect": false
          }
        ],
        "explanation": "Möhtəşəm məntiq! Sıra belə gedir: Qırmızı, Yaşıl, Qırmızı, Yaşıl alma! 🍎🍏🍎🍏",
        "explanationEn": "Awesome logic! Pattern goes: Red, Green, Red, Green apple! 🍎🍏🍎🍏",
        "explanationRu": "Отличная логика! Ряд продолжается: Красное, Зеленое, Красное, Зеленое! 🍎🍏🍎🍏"
      },
      {
        "id": "log-winter-summer-4",
        "title": "Qış və Yay Fərqi",
        "titleEn": "Winter and Summer Logic",
        "titleRu": "Логика зимы и лета",
        "instruction": "Qışda qardan nə düzəldirik?",
        "instructionEn": "What do we build with snow in winter?",
        "instructionRu": "Что мы лепим из снега зимой?",
        "type": "select",
        "question": "Qışda həyətdə çoxlu qar yağanda uşaqlar şadlanaraq nə düzəldirlər?",
        "questionEn": "What do children happily build when lots of snow falls in winter?",
        "questionRu": "Что дети весело лепят зимой, когда выпало много снега?",
        "targetAudioText": "Qardan adamı tap.",
        "targetAudioTextEn": "Find the snowman.",
        "targetAudioTextRu": "Найди снеговика.",
        "options": [
          {
            "id": "lg10",
            "text": "☃️ Qardan Adam",
            "textEn": "☃️ Snowman",
            "textRu": "☃️ Снеговик",
            "emoji": "☃️",
            "isCorrect": true
          },
          {
            "id": "lg11",
            "text": "🏖️ Qum Qəsri",
            "textEn": "🏖️ Sandcastle",
            "textRu": "🏖️ Замок из песка",
            "emoji": "🏖️",
            "isCorrect": false
          },
          {
            "id": "lg12",
            "text": "⛵ Yelkənli Qayıq",
            "textEn": "⛵ Sailing Boat",
            "textRu": "⛵ Парусная лодка",
            "emoji": "⛵",
            "isCorrect": false
          }
        ],
        "explanation": "Super! Qardan adam düzəldib yerkökündən burun qoyuruq! ☃️🥕❄️",
        "explanationEn": "Super! We build a snowman and give him a carrot nose! ☃️🥕❄️",
        "explanationRu": "Супер! Мы лепим снеговика с носом-морковкой! ☃️🥕❄️"
      }
    ]
  }
];
