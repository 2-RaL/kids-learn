// src/data/learningTranslations.ts
// Comprehensive trilingual translation map (AZ, EN, RU) for all learning activities.

export interface LocalizedActivityData {
  question: { az: string; en: string; ru: string };
  instruction?: { az: string; en: string; ru: string };
  options?: Record<string, { en: string; ru: string }>;
  explanation?: { az: string; en: string; ru: string };
}

export const ACTIVITY_TRANSLATIONS: Record<string, LocalizedActivityData> = {
  // ── Colors ──────────────────────────────────────────────────────────
  'color-red-1': {
    question: {
      az: 'Hansı alma qırmızı rəngdədir?',
      en: 'Which apple is red?',
      ru: 'Какое яблоко красного цвета?',
    },
    instruction: {
      az: 'Qırmızı olan almanı seç.',
      en: 'Select the red apple.',
      ru: 'Выбери красное яблоко.',
    },
    options: {
      'Qırmızı Alma': { en: 'Red Apple', ru: 'Красное яблоко' },
      'Yaşıl Alma': { en: 'Green Apple', ru: 'Зеленое яблоко' },
      'Sarı Banan': { en: 'Yellow Banana', ru: 'Желтый банан' },
    },
    explanation: {
      az: 'Afərin! Qırmızı alma məhz budur!',
      en: 'Well done! That is the red apple!',
      ru: 'Молодец! Это красное яблоко!',
    },
  },
  'color-blue-2': {
    question: {
      az: 'Mavi top hansıdır?',
      en: 'Which one is the blue ball?',
      ru: 'Какой мяч синий?',
    },
    instruction: {
      az: 'Mavi rəngli topu göstər.',
      en: 'Find the blue ball.',
      ru: 'Найди синий мяч.',
    },
    options: {
      'Sarı Top': { en: 'Yellow Ball', ru: 'Желтый мяч' },
      'Mavi Top': { en: 'Blue Ball', ru: 'Синий мяч' },
      'Qara Top': { en: 'Black Ball', ru: 'Черный мяч' },
    },
    explanation: {
      az: 'Əla! Mavi topu tapdın!',
      en: 'Great! You found the blue ball!',
      ru: 'Отлично! Ты нашел синий мяч!',
    },
  },
  'color-green-3': {
    question: {
      az: 'Yaşıl yarpaq hansıdır?',
      en: 'Which one is the green leaf?',
      ru: 'Какой листок зеленый?',
    },
    instruction: {
      az: 'Təbiətdə yaşıl olan yarpağı tap.',
      en: 'Find the green leaf in nature.',
      ru: 'Найди зеленый листок в природе.',
    },
    options: {
      'Sarı Yarpaq': { en: 'Yellow Leaf', ru: 'Желтый лист' },
      'Yaşıl Yarpaq': { en: 'Green Leaf', ru: 'Зеленый лист' },
      'Qırmızı Yarpaq': { en: 'Red Leaf', ru: 'Красный лист' },
    },
    explanation: {
      az: 'Düzdür! Yarpaq təbiətdə yaşıldır.',
      en: 'Correct! The leaf is green in nature.',
      ru: 'Правильно! Листок в природе зеленый.',
    },
  },

  // ── Shapes ──────────────────────────────────────────────────────────
  'shape-circle-1': {
    question: {
      az: 'Dairə hansıdır?',
      en: 'Which one is a circle?',
      ru: 'Где круг?',
    },
    instruction: {
      az: 'Dairəvi top və ya günəşə bənzəyən fiquru seç.',
      en: 'Select the round shape that looks like a ball or the sun.',
      ru: 'Выбери круглую фигуру, похожую на мяч или солнышко.',
    },
    options: {
      'Dairə': { en: 'Circle', ru: 'Круг' },
      'Kvadrat': { en: 'Square', ru: 'Квадрат' },
      'Üçbucaq': { en: 'Triangle', ru: 'Треугольник' },
    },
    explanation: {
      az: 'Afərin! Dairənin küncləri yoxdur, yumrudur.',
      en: 'Well done! A circle has no corners, it is round.',
      ru: 'Молодец! У круга нет углов, он круглый.',
    },
  },
  'shape-star-2': {
    question: {
      az: 'Ulduz fiquru hansıdır?',
      en: 'Which one is the star?',
      ru: 'Где звездочка?',
    },
    instruction: {
      az: 'Parıldayan ulduzu tap.',
      en: 'Find the shining star.',
      ru: 'Найди сияющую звездочку.',
    },
    options: {
      'Ulduz': { en: 'Star', ru: 'Звездочка' },
      'Kvadrat': { en: 'Square', ru: 'Квадрат' },
      'Düzbucaqlı': { en: 'Rectangle', ru: 'Прямоугольник' },
    },
    explanation: {
      az: 'Əla! Ulduz göydə parıldayır!',
      en: 'Great! The star shines in the sky!',
      ru: 'Отлично! Звездочка сияет в небе!',
    },
  },

  // ── Objects ─────────────────────────────────────────────────────────
  'obj-spoon-1': {
    question: {
      az: 'Şorbanı nə ilə yeyirik?',
      en: 'What do we eat soup with?',
      ru: 'Чем мы едим суп?',
    },
    instruction: {
      az: 'Ləzzətli şorbanı içmək üçün qaşığı tap.',
      en: 'Find the spoon to eat delicious soup.',
      ru: 'Найди ложку, чтобы кушать суп.',
    },
    options: {
      'Qaşıq': { en: 'Spoon', ru: 'Ложка' },
      'Çəngəl': { en: 'Fork', ru: 'Вилка' },
      'Bıçaq': { en: 'Knife', ru: 'Нож' },
    },
    explanation: {
      az: 'Düzdür! Şorbanı qaşıqla yeyirik.',
      en: 'Correct! We eat soup with a spoon.',
      ru: 'Правильно! Суп едят ложкой.',
    },
  },
  'obj-cup-2': {
    question: {
      az: 'Çay və ya su nə ilə içilir?',
      en: 'What do we drink tea or water from?',
      ru: 'Из чего пьют чай или воду?',
    },
    instruction: {
      az: 'Fincanı seç.',
      en: 'Select the cup.',
      ru: 'Выбери чашку.',
    },
    options: {
      'Fincan': { en: 'Cup', ru: 'Чашка' },
      'Boşqab': { en: 'Plate', ru: 'Тарелка' },
      'Qazan': { en: 'Pot', ru: 'Кастрюля' },
    },
    explanation: {
      az: 'Bəli! Fincandan su və süd içirik.',
      en: 'Yes! We drink water and milk from a cup.',
      ru: 'Да! Мы пьем воду и молоко из чашки.',
    },
  },

  // ── Body ────────────────────────────────────────────────────────────
  'body-eyes-1': {
    question: {
      az: 'Biz nə ilə görürük?',
      en: 'What do we see with?',
      ru: 'Чем мы видим?',
    },
    instruction: {
      az: 'Dünyanı və rəngləri görmək üçün gözlərimizi göstər.',
      en: 'Show our eyes that help us see colors and the world.',
      ru: 'Покажи глазки, которыми мы смотрим на мир и цвета.',
    },
    options: {
      'Gözlər': { en: 'Eyes', ru: 'Глаза' },
      'Qulaqlar': { en: 'Ears', ru: 'Уши' },
      'Burun': { en: 'Nose', ru: 'Нос' },
    },
    explanation: {
      az: 'Gözlərimizlə hər şeyi görürük!',
      en: 'We see everything with our eyes!',
      ru: 'Глазками мы видим все вокруг!',
    },
  },
  'body-hands-2': {
    question: {
      az: 'Oyuncaqları nə ilə tuturuq?',
      en: 'What do we hold toys with?',
      ru: 'Чем мы держим игрушки?',
    },
    instruction: {
      az: 'Əllərimizi seç.',
      en: 'Select our hands.',
      ru: 'Выбери ручки.',
    },
    options: {
      'Əllər': { en: 'Hands', ru: 'Руки' },
      'Ayaqlar': { en: 'Feet', ru: 'Ноги' },
      'Dillər': { en: 'Tongue', ru: 'Язык' },
    },
    explanation: {
      az: 'Əllərimizlə çəkirik, oynayırıq və tuturuq.',
      en: 'With our hands we draw, play, and hold toys.',
      ru: 'Ручками мы рисуем, играем и держим игрушки.',
    },
  },

  // ── Animals ─────────────────────────────────────────────────────────
  'anim-cat-1': {
    question: {
      az: 'Hansı heyvan "miyau" edir?',
      en: 'Which animal says "meow"?',
      ru: 'Какое животное говорит «мяу»?',
    },
    instruction: {
      az: '"Miyau" deyən heyvanı seç.',
      en: 'Select the animal that says "meow".',
      ru: 'Выбери животное, которое говорит «мяу».',
    },
    options: {
      'Pişik': { en: 'Cat', ru: 'Кошка' },
      'İt': { en: 'Dog', ru: 'Собака' },
      'İnək': { en: 'Cow', ru: 'Корова' },
    },
    explanation: {
      az: 'Düzdür! Pişik sevimli miyau səsi çıxarır.',
      en: 'Correct! The cat makes a cute meow sound.',
      ru: 'Правильно! Кошка издает милый звук мяу.',
    },
  },
  'anim-cow-2': {
    question: {
      az: 'İnək hansıdır?',
      en: 'Which one is the cow?',
      ru: 'Где корова?',
    },
    instruction: {
      az: '"Möö" deyən və süd verən inəyi tap.',
      en: 'Find the cow that says "moo" and gives milk.',
      ru: 'Найди корову, которая говорит «му» и дает молоко.',
    },
    options: {
      'Qoyun': { en: 'Sheep', ru: 'Овечка' },
      'İnək': { en: 'Cow', ru: 'Корова' },
      'At': { en: 'Horse', ru: 'Лошадка' },
    },
    explanation: {
      az: 'Əla! İnək bizə ləzzətli və faydalı süd verir.',
      en: 'Great! The cow gives us tasty and healthy milk.',
      ru: 'Отлично! Корова дает нам вкусное и полезное молоко.',
    },
  },

  // ── Fruits & Veggies ────────────────────────────────────────────────
  'fruit-banana-1': {
    question: {
      az: 'Banan hansıdır?',
      en: 'Which one is the banana?',
      ru: 'Где банан?',
    },
    instruction: {
      az: 'Meymunların çox sevdiyi sarı bananı seç.',
      en: 'Select the yellow banana loved by monkeys.',
      ru: 'Выбери желтый банан, который любят обезьянки.',
    },
    options: {
      'Banan': { en: 'Banana', ru: 'Банан' },
      'Alma': { en: 'Apple', ru: 'Яблоко' },
      'Yerkökü': { en: 'Carrot', ru: 'Морковка' },
    },
    explanation: {
      az: 'Afərin! Banan çox ləzzətlidir.',
      en: 'Well done! Bananas are delicious.',
      ru: 'Молодец! Банан очень вкусный.',
    },
  },

  // ── Vehicles ────────────────────────────────────────────────────────
  'veh-plane-1': {
    question: {
      az: 'Hansı nəqliyyat göydə uçur?',
      en: 'Which transport flies in the sky?',
      ru: 'Какой транспорт летает в небе?',
    },
    instruction: {
      az: 'Buludların arasında uçan təyyarəni tap.',
      en: 'Find the airplane flying among the clouds.',
      ru: 'Найди самолет, летящий среди облаков.',
    },
    options: {
      'Təyyarə': { en: 'Airplane', ru: 'Самолет' },
      'Avtobus': { en: 'Bus', ru: 'Автобус' },
      'Qatar': { en: 'Train', ru: 'Поезд' },
    },
    explanation: {
      az: 'Bəli! Təyyarə göydə quş kimi uça bilir!',
      en: 'Yes! The airplane can fly in the sky like a bird!',
      ru: 'Да! Самолет летает в небе как птица!',
    },
  },

  // ── Professions ─────────────────────────────────────────────────────
  'prof-doc-1': {
    question: {
      az: 'Xəstələri kim müalicə edir?',
      en: 'Who treats patients when they are sick?',
      ru: 'Кто лечит больных?',
    },
    instruction: {
      az: 'Biz xəstələnəndə bizə kömək edən həkimi seç.',
      en: 'Select the doctor who helps us when we are sick.',
      ru: 'Выбери врача, который помогает нам выздороветь.',
    },
    options: {
      'Həkim': { en: 'Doctor', ru: 'Врач' },
      'Yanğınsöndürən': { en: 'Firefighter', ru: 'Пожарный' },
      'Aşpaz': { en: 'Chef', ru: 'Повар' },
    },
    explanation: {
      az: 'Həkimlər sağlamlığımızı qoruyurlar!',
      en: 'Doctors protect our health!',
      ru: 'Врачи заботятся о нашем здоровье!',
    },
  },

  // ── Family ──────────────────────────────────────────────────────────
  'fam-mom-1': {
    question: {
      az: 'Hansı şəkildə Ana təsvir olunub?',
      en: 'Which picture shows Mom?',
      ru: 'На какой картинке изображена Мама?',
    },
    instruction: {
      az: 'Bizi sevgi ilə qucaqlayan ananı tap.',
      en: 'Find our loving mother.',
      ru: 'Найди любящую маму.',
    },
    options: {
      'Ana': { en: 'Mom', ru: 'Мама' },
      'Ata': { en: 'Dad', ru: 'Папа' },
      'Qardaş': { en: 'Brother', ru: 'Брат' },
    },
    explanation: {
      az: 'Ana bizi çox sevir!',
      en: 'Mom loves us very much!',
      ru: 'Мама нас очень любит!',
    },
  },

  // ── Simple Commands ─────────────────────────────────────────────────
  'cmd-sit-1': {
    question: {
      az: 'Hansı hərəkət "Otur" komandasıdır?',
      en: 'Which action is the "Sit" command?',
      ru: 'Какое действие означает «Сядь»?',
    },
    instruction: {
      az: 'Kresloda sakit əyləşmiş balacanı seç.',
      en: 'Select the child sitting quietly in the chair.',
      ru: 'Выбери ребенка, спокойно сидящего в кресле.',
    },
    options: {
      'Oturmaq': { en: 'Sitting', ru: 'Сидеть' },
      'Qaçmaq': { en: 'Running', ru: 'Бежать' },
      'Tullanmaq': { en: 'Jumping', ru: 'Прыгать' },
    },
    explanation: {
      az: 'Afərin! Komandanı düzgün başa düşdün!',
      en: 'Well done! You understood the command correctly!',
      ru: 'Молодец! Ты правильно понял команду!',
    },
  },

  // ── Spatial Concepts ────────────────────────────────────────────────
  'spat-on-1': {
    question: {
      az: 'Kitab masanın harasındadır?',
      en: 'Where is the book on the table?',
      ru: 'Где лежит книга на столе?',
    },
    instruction: {
      az: 'Kitab masanın üstündədir, yoxsa altında?',
      en: 'Is the book on top of the table or underneath?',
      ru: 'Книга на столе или под столом?',
    },
    options: {
      'Üstündə': { en: 'On top', ru: 'На столе' },
      'Altında': { en: 'Underneath', ru: 'Под столом' },
      'İçində': { en: 'Inside', ru: 'Внутри' },
    },
    explanation: {
      az: 'Bəli, kitab masanın üstündə açıq qalıb.',
      en: 'Yes, the book is open on top of the table.',
      ru: 'Да, книга лежит на столе открытой.',
    },
  },

  // ── Size Concepts ───────────────────────────────────────────────────
  'size-big-1': {
    question: {
      az: 'Hansı heyvan daha böyükdür?',
      en: 'Which animal is bigger?',
      ru: 'Какое животное больше?',
    },
    instruction: {
      az: 'Böyük fil və balaca siçan arasında nəhəng olanı seç.',
      en: 'Choose the giant one between the big elephant and little mouse.',
      ru: 'Выбери гиганта между большим слоном и маленькой мышкой.',
    },
    options: {
      'Nəhəng Fil': { en: 'Giant Elephant', ru: 'Большой слон' },
      'Balaca Siçan': { en: 'Little Mouse', ru: 'Маленькая мышка' },
    },
    explanation: {
      az: 'Əla! Fil çox böyükdür, siçan isə balacadır.',
      en: 'Great! The elephant is huge, while the mouse is small.',
      ru: 'Отлично! Слон огромный, а мышка маленькая.',
    },
  },

  // ── Opposites ───────────────────────────────────────────────────────
  'opp-hot-1': {
    question: {
      az: 'İsti sözünün əksi hansıdır?',
      en: 'What is the opposite of hot?',
      ru: 'Какая противоположность слову «горячий»?',
    },
    instruction: {
      az: 'İsti çayın əksinə olan soyuq dondurmanı tap.',
      en: 'Find cold ice cream as the opposite of hot tea.',
      ru: 'Найди холодное мороженое как противоположность горячему чаю.',
    },
    options: {
      'Soyuq': { en: 'Cold', ru: 'Холодный' },
      'Qaynar': { en: 'Boiling', ru: 'Кипящий' },
      'Şirin': { en: 'Sweet', ru: 'Сладкий' },
    },
    explanation: {
      az: 'Düzdür! İstinin əksi soyuqdur.',
      en: 'Correct! The opposite of hot is cold.',
      ru: 'Правильно! Противоположность горячему — холодный.',
    },
  },

  // ── Quantities ──────────────────────────────────────────────────────
  'qty-three-1': {
    question: {
      az: 'Harada 3 dənə alma var?',
      en: 'Where are there 3 apples?',
      ru: 'Где 3 яблока?',
    },
    instruction: {
      az: 'Üç dənə qırmızı almanı say və seç.',
      en: 'Count and select the three red apples.',
      ru: 'Посчитай и выбери 3 красных яблока.',
    },
    options: {
      '3 Alma': { en: '3 Apples', ru: '3 яблока' },
      '1 Alma': { en: '1 Apple', ru: '1 яблоко' },
      '5 Alma': { en: '5 Apples', ru: '5 яблок' },
    },
    explanation: {
      az: 'Düzgün saydın: 1, 2, 3 alma!',
      en: 'You counted correctly: 1, 2, 3 apples!',
      ru: 'Ты посчитал правильно: 1, 2, 3 яблока!',
    },
  },

  // ── Alphabet ────────────────────────────────────────────────────────
  'alp-a-1': {
    question: {
      az: 'Alma sözünün ilk hərfi hansıdır?',
      en: 'What is the first letter of "Alma" (Apple)?',
      ru: 'С какой буквы начинается слово «Яблоко»?',
    },
    instruction: {
      az: 'A hərfini seç.',
      en: 'Select the letter A.',
      ru: 'Выбери букву А.',
    },
    options: {
      'A hərfi': { en: 'Letter A', ru: 'Буква А' },
      'B hərfi': { en: 'Letter B', ru: 'Буква Б' },
      'C hərfi': { en: 'Letter C', ru: 'Буква В' },
    },
    explanation: {
      az: 'Afərin! "A" hərfi əlifbanın ilk hərfidir!',
      en: 'Well done! "A" is the first letter of the alphabet!',
      ru: 'Молодец! «А» — первая буква алфавита!',
    },
  },

  // ── Articulation ────────────────────────────────────────────────────
  'art-r-1': {
    question: {
      az: 'Dilinin ucunu yuxarı qaldır və "Rrrr" de!',
      en: 'Lift the tip of your tongue and say "Rrrr"!',
      ru: 'Подними кончик языка и скажи «Рррр»!',
    },
    instruction: {
      az: 'Gəl mühərrik kimi "R-r-r" səsi çıxaraq.',
      en: 'Let us make the "R-r-r" sound like an engine.',
      ru: 'Давай порычим как мотор «Р-р-р».',
    },
    options: {
      'Rrrrr dedik! 🚗': { en: 'Said Rrrrr! 🚗', ru: 'Сказали Ррррр! 🚗' },
    },
    explanation: {
      az: 'Möhtəşəm artikulyasiya!',
      en: 'Wonderful articulation!',
      ru: 'Замечательная артикуляция!',
    },
  },

  // ── Clothing ────────────────────────────────────────────────────────
  'clo-hat-1': {
    question: {
      az: 'Başa nə qoyulur?',
      en: 'What do we put on our head?',
      ru: 'Что надевают на голову?',
    },
    instruction: {
      az: 'Soyuq olanda başımıza nə geyinirik?',
      en: 'What do we wear on our head when cold?',
      ru: 'Что мы надеваем на голову, когда холодно?',
    },
    options: {
      'Papaq': { en: 'Hat', ru: 'Шапка' },
      'Corab': { en: 'Socks', ru: 'Носки' },
      'Şalvar': { en: 'Pants', ru: 'Штаны' },
    },
    explanation: {
      az: 'Papaq başımızı istidən və soyuqdan qoruyur.',
      en: 'A hat protects our head from heat and cold.',
      ru: 'Шапка защищает голову от холода.',
    },
  },

  // ── Grammar ─────────────────────────────────────────────────────────
  'gram-teacher-1': {
    question: {
      az: 'Məktəbdə bizə dərs keçən kimdir?',
      en: 'Who teaches us at school?',
      ru: 'Кто учит нас в школе?',
    },
    instruction: {
      az: 'Müəllimi tap.',
      en: 'Find the teacher.',
      ru: 'Найди учителя.',
    },
    options: {
      'Müəllim': { en: 'Teacher', ru: 'Учитель' },
      'Sürücü': { en: 'Driver', ru: 'Водитель' },
      'Bərbər': { en: 'Barber', ru: 'Парикмахер' },
    },
    explanation: {
      az: 'Bəli! Müəllim bizə bilik və təlim öyrədir.',
      en: 'Yes! The teacher imparts knowledge to us.',
      ru: 'Да! Учитель дает нам знания.',
    },
  },

  // ── Emotions ────────────────────────────────────────────────────────
  'emo-happy-1': {
    question: {
      az: 'Hansı üz xoşbəxtdir?',
      en: 'Which face is happy?',
      ru: 'Какое лицо счастливое?',
    },
    instruction: {
      az: 'Gülən, sevincli üzü seç.',
      en: 'Select the smiling, cheerful face.',
      ru: 'Выбери веселое, улыбающееся лицо.',
    },
    options: {
      'Xoşbəxt': { en: 'Happy', ru: 'Счастливый' },
      'Kədərli': { en: 'Sad', ru: 'Грустный' },
      'Əsəbi': { en: 'Angry', ru: 'Злой' },
    },
    explanation: {
      az: 'Təbəssüm ən gözəl emosiyadır! 😊',
      en: 'A smile is the best emotion! 😊',
      ru: 'Улыбка — самая прекрасная эмоция! 😊',
    },
  },
  'emo-surp-2': {
    question: {
      az: 'Təəccüb emosiyası hansıdır?',
      en: 'Which emotion is surprised?',
      ru: 'Какая эмоция — удивление?',
    },
    instruction: {
      az: 'Ağzı və gözləri heyrətlə açılan simanı tap.',
      en: 'Find the face with open mouth and eyes in surprise.',
      ru: 'Найди лицо с удивленно открытым ртом и глазами.',
    },
    options: {
      'Təəccüb': { en: 'Surprised', ru: 'Удивленный' },
      'Yuxulu': { en: 'Sleepy', ru: 'Сонный' },
      'Qorxmuş': { en: 'Scared', ru: 'Испуганный' },
    },
    explanation: {
      az: 'Vau! Möhtəşəm hədiyyə görəndə təəccüblənirik!',
      en: 'Wow! We get surprised when seeing a wonderful gift!',
      ru: 'Вау! Мы удивляемся, когда видим чудесный подарок!',
    },
  },

  // ── Social Courtesy ─────────────────────────────────────────────────
  'soc-thank-1': {
    question: {
      az: 'Kömək və hədiyyəyə görə nə deyirik?',
      en: 'What do we say for help or a gift?',
      ru: 'Что мы говорим за помощь или подарок?',
    },
    instruction: {
      az: 'Nəzakətli sözü seç.',
      en: 'Select the polite words.',
      ru: 'Выбери вежливое слово.',
    },
    options: {
      'Təşəkkür edirəm': { en: 'Thank you', ru: 'Спасибо' },
      'Xudahafiz': { en: 'Goodbye', ru: 'До свидания' },
      'Heç nə': { en: 'Nothing', ru: 'Ничего' },
    },
    explanation: {
      az: 'Nəzakətli olmaq hamını sevindirir!',
      en: 'Being polite makes everyone happy!',
      ru: 'Быть вежливым радует каждого!',
    },
  },

  // ── Turn Taking ─────────────────────────────────────────────────────
  'soc-turn-1': {
    question: {
      az: 'Dostun yelləncəkdə olanda nə edirik?',
      en: 'What do we do when a friend is on the swing?',
      ru: 'Что мы делаем, когда друг на качелях?',
    },
    instruction: {
      az: 'Növbə gözləmə qaydasını tap.',
      en: 'Find the rule of waiting for your turn.',
      ru: 'Найди правило ожидания очереди.',
    },
    options: {
      'Növbəmizi gözləyirik': { en: 'Wait for our turn', ru: 'Ждем своей очереди' },
      'Onu itələyirik': { en: 'Push him', ru: 'Толкаем его' },
      'Ağlayırıq': { en: 'Cry', ru: 'Плачем' },
    },
    explanation: {
      az: 'Dostlarla növbələşərək oynamaq daha əyləncəlidir!',
      en: 'Taking turns with friends is much more fun!',
      ru: 'Кататься по очереди с друзьями гораздо веселее!',
    },
  },

  // ── Hygiene ─────────────────────────────────────────────────────────
  'hyg-brush-1': {
    question: {
      az: 'Diş fırçası hansıdır?',
      en: 'Which one is the toothbrush?',
      ru: 'Где зубная щетка?',
    },
    instruction: {
      az: 'Dişlərimizi təmizləmək üçün lazım olan əşyanı seç.',
      en: 'Select the item needed to clean our teeth.',
      ru: 'Выбери предмет для чистки зубов.',
    },
    options: {
      'Diş fırçası': { en: 'Toothbrush', ru: 'Зубная щетка' },
      'Tava': { en: 'Frying pan', ru: 'Сковорода' },
      'Qələm': { en: 'Pencil', ru: 'Карандаш' },
    },
    explanation: {
      az: 'Gündə iki dəfə dişlərimizi fırçalayırıq!',
      en: 'We brush our teeth twice every day!',
      ru: 'Мы чистим зубы дважды в день!',
    },
  },

  // ── Safety Rules ────────────────────────────────────────────────────
  'saf-light-1': {
    question: {
      az: 'Svetofor hansı rəng olanda yolu keçə bilərik?',
      en: 'At which traffic light color can we cross the street?',
      ru: 'На какой цвет светофора можно переходить дорогу?',
    },
    instruction: {
      az: 'Təhlükəsiz keçid rəngini seç.',
      en: 'Select the safe walking signal color.',
      ru: 'Выбери безопасный цвет для перехода.',
    },
    options: {
      'Yaşıl': { en: 'Green', ru: 'Зеленый' },
      'Qırmızı': { en: 'Red', ru: 'Красный' },
      'Sarı': { en: 'Yellow', ru: 'Желтый' },
    },
    explanation: {
      az: 'Qırmızıda dayanırıq, yaşılda keçirik!',
      en: 'We stop on red, we go on green!',
      ru: 'На красный стоим, на зеленый идем!',
    },
  },

  // ── Math ────────────────────────────────────────────────────────────
  'math-add-1': {
    question: {
      az: '1 + 1 = ?',
      en: 'How much is 1 + 1?',
      ru: 'Сколько будет 1 + 1?',
    },
    instruction: {
      az: '1 alma + 1 alma neçə edir?',
      en: 'How much is 1 apple + 1 apple?',
      ru: 'Сколько будет 1 яблоко + 1 яблоко?',
    },
    options: {
      '2': { en: '2', ru: '2' },
      '3': { en: '3', ru: '3' },
    },
    explanation: {
      az: 'Bəli, bir üstəgəl bir iki edir!',
      en: 'Yes, one plus one equals two!',
      ru: 'Да, один плюс один равно два!',
    },
  },

  // ── Logic ───────────────────────────────────────────────────────────
  'log-diff-1': {
    question: {
      az: 'Hansı əşya digərlərindən fərqlidir?',
      en: 'Which item is different from the others?',
      ru: 'Какой предмет отличается от остальных?',
    },
    instruction: {
      az: 'Meyvələrin arasındakı fərqli nəqliyyatı tap.',
      en: 'Find the vehicle among the fruits.',
      ru: 'Найди транспорт среди фруктов.',
    },
    options: {
      'Maşın': { en: 'Car', ru: 'Машина' },
      'Alma': { en: 'Apple', ru: 'Яблоко' },
      'Armud': { en: 'Pear', ru: 'Груша' },
    },
    explanation: {
      az: 'Düzdür! Maşın meyvə deyil, nəqliyyatdır.',
      en: 'Correct! The car is not a fruit, it is a vehicle.',
      ru: 'Правильно! Машина — это транспорт, а не фрукт.',
    },
  },
};

export const UI_TRANSLATIONS = {
  az: {
    task: 'Tapşırıq',
    listen: 'Sualı səsləndir',
    listening: 'Səsləndirilir...',
    next: 'Növbəti',
    finish: 'Bitir',
    congratsTitle: 'Təbriklər, Balaca Qəhrəman!',
    congratsDesc: 'bölməsindəki bütün tapşırıqları uğurla tamamladın və',
    pointsEarned: 'xal qazandın!',
    playAgain: 'Yenidən Oyna',
    backToHub: 'Təlim Bölmələrinə Qayıt',
    sentencePrompt: 'Aşağıdakı sözlərə toxunaraq cümlə qur...',
    checkSentence: 'Cümləni Yoxla ✓',
    sequencePrompt: 'Düzgün ardıcıllıqla addımları təkrarlayaq:',
    sequenceComplete: 'Anladım və Tamamladım! ✓',
    correctAnswer: 'Afərin! Düzgün cavab! 🌟',
    tryAgain: 'Bir daha cəhd et! 💡',
  },
  en: {
    task: 'Task',
    listen: 'Read question aloud',
    listening: 'Speaking...',
    next: 'Next',
    finish: 'Finish',
    congratsTitle: 'Congratulations, Little Hero!',
    congratsDesc: 'You successfully completed all tasks in this section and earned',
    pointsEarned: 'points!',
    playAgain: 'Play Again',
    backToHub: 'Back to Learning Hub',
    sentencePrompt: 'Tap the words below to build a sentence...',
    checkSentence: 'Check Sentence ✓',
    sequencePrompt: "Let's follow the steps in order:",
    sequenceComplete: 'Got it and Completed! ✓',
    correctAnswer: 'Well done! Correct answer! 🌟',
    tryAgain: 'Try again! You can do it! 💡',
  },
  ru: {
    task: 'Задание',
    listen: 'Озвучить вопрос',
    listening: 'Озвучивается...',
    next: 'Далее',
    finish: 'Завершить',
    congratsTitle: 'Поздравляем, Маленький Герой!',
    congratsDesc: 'Ты успешно выполнил все задания в этом разделе и заработал',
    pointsEarned: 'баллов!',
    playAgain: 'Играть снова',
    backToHub: 'Вернуться в центр обучения',
    sentencePrompt: 'Нажимай на слова ниже, чтобы составить предложение...',
    checkSentence: 'Проверить предложение ✓',
    sequencePrompt: 'Повторим шаги по порядку:',
    sequenceComplete: 'Понял и Выполнил! ✓',
    correctAnswer: 'Молодец! Правильный ответ! 🌟',
    tryAgain: 'Попробуй еще раз! У тебя получится! 💡',
  },
} as const;
