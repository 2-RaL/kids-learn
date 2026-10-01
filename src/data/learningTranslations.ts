// src/data/learningTranslations.ts
// Comprehensive trilingual translation map (AZ, EN, RU) for all learning activities and UI.

export interface LocalizedActivityData {
  question: { az: string; en: string; ru: string };
  instruction?: { az: string; en: string; ru: string };
  options?: Record<string, { en: string; ru: string }>;
  explanation?: { az: string; en: string; ru: string };
}

export const ACTIVITY_TRANSLATIONS: Record<string, LocalizedActivityData> = {
  // ── 1. Colors (Red, Blue, Green, Yellow) ─────────────────────────────
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
      az: 'Afərin! Qırmızı alma məhz budur! 🍎',
      en: 'Well done! That is the red apple! 🍎',
      ru: 'Молодец! Это красное яблоко! 🍎',
    },
  },
  'color-red-2': {
    question: {
      az: 'Hansı ləzzətli giləmeyvə qırmızıdır?',
      en: 'Which delicious berry is red?',
      ru: 'Какая вкусная ягода красная?',
    },
    instruction: {
      az: 'Qırmızı rəngli çiyələyi tap.',
      en: 'Find the red strawberry.',
      ru: 'Найди красную клубнику.',
    },
    options: {
      'Qırmızı Çiyələk': { en: 'Red Strawberry', ru: 'Красная клубника' },
      'Mavi Qaragilə': { en: 'Blue Blueberry', ru: 'Синяя черника' },
      'Bənövşəyi Üzüm': { en: 'Purple Grape', ru: 'Фиолетовый виноград' },
    },
    explanation: {
      az: 'Əla! Çiyələk şirin və qırmızıdır! 🍓',
      en: 'Great! Strawberries are sweet and red! 🍓',
      ru: 'Отлично! Клубника сладкая и красная! 🍓',
    },
  },
  'color-red-3': {
    question: {
      az: 'Hansı avtomobil qırmızı rəngdədir?',
      en: 'Which car is red?',
      ru: 'Какая машина красного цвета?',
    },
    instruction: {
      az: 'Qırmızı maşını göstər.',
      en: 'Point to the red car.',
      ru: 'Покажи красную машину.',
    },
    options: {
      'Qırmızı Maşın': { en: 'Red Car', ru: 'Красная машина' },
      'Mavi Maşın': { en: 'Blue Car', ru: 'Синяя машина' },
      'Sarı Taksi': { en: 'Yellow Taxi', ru: 'Желтое такси' },
    },
    explanation: {
      az: 'Super! Qırmızı maşın sürətlə gedir! 🚗',
      en: 'Super! The red car zooms ahead! 🚗',
      ru: 'Супер! Красная машина едет быстро! 🚗',
    },
  },

  'color-blue-1': {
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
      'Mavi Top': { en: 'Blue Ball', ru: 'Синий мяч' },
      'Sarı Top': { en: 'Yellow Ball', ru: 'Желтый мяч' },
      'Qara Top': { en: 'Black Ball', ru: 'Черный мяч' },
    },
    explanation: {
      az: 'Əla! Mavi topu tapdın! 🔵',
      en: 'Great! You found the blue ball! 🔵',
      ru: 'Отлично! Ты нашел синий мяч! 🔵',
    },
  },
  'color-blue-2': {
    question: {
      az: 'Hansı quş mavi rəngdədir?',
      en: 'Which bird is blue?',
      ru: 'Какая птица синего цвета?',
    },
    instruction: {
      az: 'Göydə uçan mavi quşu seç.',
      en: 'Select the blue bird flying in the sky.',
      ru: 'Выбери синюю птичку, летящую в небе.',
    },
    options: {
      'Mavi Quş': { en: 'Blue Bird', ru: 'Синяя птица' },
      'Sarı Cücə': { en: 'Yellow Chick', ru: 'Желтый цыпленок' },
      'Çəhrayı Flaqinqo': { en: 'Pink Flamingo', ru: 'Розовый фламинго' },
    },
    explanation: {
      az: 'Afərin! Mavi quş gözəl nəğmə oxuyur! 🐦',
      en: 'Well done! The blue bird sings a sweet song! 🐦',
      ru: 'Молодец! Синяя птичка красиво поет! 🐦',
    },
  },
  'color-blue-3': {
    question: {
      az: 'Dəniz dalğası hansı rəngdədir?',
      en: 'What color is the sea wave?',
      ru: 'Какого цвета морская волна?',
    },
    instruction: {
      az: 'Mavi dəniz dalğasını seç.',
      en: 'Select the blue sea wave.',
      ru: 'Выбери синюю морскую волну.',
    },
    options: {
      'Mavi Dalğa': { en: 'Blue Wave', ru: 'Синяя волна' },
      'Qəhvəyi Torpaq': { en: 'Brown Earth', ru: 'Коричневая земля' },
      'Ağ Qar': { en: 'White Snow', ru: 'Белый снег' },
    },
    explanation: {
      az: 'Düzdür! Dəniz suyu mavidir! 🌊',
      en: 'Correct! Sea water is blue! 🌊',
      ru: 'Правильно! Морская вода синяя! 🌊',
    },
  },

  'color-green-1': {
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
      'Yaşıl Yarpaq': { en: 'Green Leaf', ru: 'Зеленый лист' },
      'Sarı Yarpaq': { en: 'Yellow Leaf', ru: 'Желтый лист' },
      'Qırmızı Yarpaq': { en: 'Red Leaf', ru: 'Красный лист' },
    },
    explanation: {
      az: 'Düzdür! Yarpaq təbiətdə yaşıldır! 🍃',
      en: 'Correct! Leaves are green in nature! 🍃',
      ru: 'Правильно! Листья в природе зеленые! 🍃',
    },
  },
  'color-green-2': {
    question: {
      az: 'Hansı sevimli heyvan yaşıldır?',
      en: 'Which cute animal is green?',
      ru: 'Какое милое животное зеленого цвета?',
    },
    instruction: {
      az: 'Yaşıl rəngli qurbağanı seç.',
      en: 'Select the green frog.',
      ru: 'Выбери зеленую лягушку.',
    },
    options: {
      'Yaşıl Qurbağa': { en: 'Green Frog', ru: 'Зеленая лягушка' },
      'Narıncı Tülkü': { en: 'Orange Fox', ru: 'Рыжая лиса' },
      'Qonur Ayı': { en: 'Brown Bear', ru: 'Бурый медведь' },
    },
    explanation: {
      az: 'Vau! Yaşıl qurbağa gölməçədə tullanır! 🐸',
      en: 'Wow! The green frog hops in the pond! 🐸',
      ru: 'Вау! Зеленая лягушка прыгает в пруду! 🐸',
    },
  },
  'color-green-3': {
    question: {
      az: 'Hansı tərəvəz yaşıl rəngdədir?',
      en: 'Which vegetable is green?',
      ru: 'Какой овощ зеленого цвета?',
    },
    instruction: {
      az: 'Təzə yaşıl xiyarı tap.',
      en: 'Find the fresh green cucumber.',
      ru: 'Найди свежий зеленый огурец.',
    },
    options: {
      'Yaşıl Xiyar': { en: 'Green Cucumber', ru: 'Зеленый огурец' },
      'Narıncı Kök': { en: 'Orange Carrot', ru: 'Оранжевая морковь' },
      'Sarı Qarğıdalı': { en: 'Yellow Corn', ru: 'Желтая кукуруза' },
    },
    explanation: {
      az: 'Bəli! Xiyar çox faydalı və yaşıldır! 🥒',
      en: 'Yes! Cucumber is healthy and green! 🥒',
      ru: 'Да! Огурец полезный и зеленый! 🥒',
    },
  },

  'color-yellow-1': {
    question: {
      az: 'Sarı banan hansıdır?',
      en: 'Which one is the yellow banana?',
      ru: 'Где желтый банан?',
    },
    instruction: {
      az: 'Şirin sarı bananı seç.',
      en: 'Select the sweet yellow banana.',
      ru: 'Выбери сладкий желтый банан.',
    },
    options: {
      'Sarı Banan': { en: 'Yellow Banana', ru: 'Желтый банан' },
      'Qırmızı Alma': { en: 'Red Apple', ru: 'Красное яблоко' },
      'Bənövşəyi Üzüm': { en: 'Purple Grape', ru: 'Фиолетовый виноград' },
    },
    explanation: {
      az: 'Afərin! Sarı banan çox ləzzətlidir! 🍌',
      en: 'Well done! Yellow banana is so tasty! 🍌',
      ru: 'Молодец! Желтый банан очень вкусный! 🍌',
    },
  },
  'color-yellow-2': {
    question: {
      az: 'Göydə parlayan günəş hansı rəngdədir?',
      en: 'What color is the sun shining in the sky?',
      ru: 'Какого цвета солнце, сияющее в небе?',
    },
    instruction: {
      az: 'İstisi ilə bizi isidən sarı günəşi seç.',
      en: 'Select the warm yellow sun.',
      ru: 'Выбери теплое желтое солнышко.',
    },
    options: {
      'Sarı Günəş': { en: 'Yellow Sun', ru: 'Желтое солнце' },
      'Boz Bulud': { en: 'Grey Cloud', ru: 'Серое облако' },
      'Göy Səma': { en: 'Blue Sky', ru: 'Синее небо' },
    },
    explanation: {
      az: 'Düzdür! Sarı günəş hər tərəfə işıq saçır! ☀️',
      en: 'Correct! The yellow sun shines everywhere! ☀️',
      ru: 'Правильно! Желтое солнце освещает все вокруг! ☀️',
    },
  },
  'color-yellow-3': {
    question: {
      az: 'Balaca cücə hansı rəngdədir?',
      en: 'What color is the little chick?',
      ru: 'Какого цвета маленький цыпленок?',
    },
    instruction: {
      az: 'Sarı rəngli cücəni tap.',
      en: 'Find the little yellow chick.',
      ru: 'Найди маленького желтого цыпленка.',
    },
    options: {
      'Sarı Cücə': { en: 'Yellow Chick', ru: 'Желтый цыпленок' },
      'Qara Pinqvin': { en: 'Black Penguin', ru: 'Черный пингвин' },
      'Qəhvəyi Quş': { en: 'Brown Bird', ru: 'Коричневая птица' },
    },
    explanation: {
      az: 'Möhtəşəm! Sarı cücə ciy-ciy edir! 🐥',
      en: 'Awesome! The yellow chick peeps happily! 🐥',
      ru: 'Замечательно! Желтый цыпленок пищит! 🐥',
    },
  },

  // ── 2. Shapes (Dairə, Kvadrat, Üçbucaq, Ulduz) ──────────────────────
  'shape-circle-1': {
    question: {
      az: 'Dairə hansıdır?',
      en: 'Which one is a circle?',
      ru: 'Где круг?',
    },
    instruction: {
      az: 'Dairəvi fiquru seç.',
      en: 'Select the round circle shape.',
      ru: 'Выбери круглую форму.',
    },
    options: {
      'Dairə': { en: 'Circle', ru: 'Круг' },
      'Kvadrat': { en: 'Square', ru: 'Квадрат' },
      'Üçbucaq': { en: 'Triangle', ru: 'Треугольник' },
    },
    explanation: {
      az: 'Afərin! Dairənin küncləri yoxdur, yumrudur! ⭕',
      en: 'Well done! A circle has no corners, it is round! ⭕',
      ru: 'Молодец! У круга нет углов, он круглый! ⭕',
    },
  },
  'shape-circle-2': {
    question: {
      az: 'Hansı əşya dairə formasındadır?',
      en: 'Which object has a circular shape?',
      ru: 'Какой предмет круглой формы?',
    },
    instruction: {
      az: 'Yumru futbol topunu tap.',
      en: 'Find the round soccer ball.',
      ru: 'Найди круглый футбольный мяч.',
    },
    options: {
      'Futbol Topu': { en: 'Soccer Ball', ru: 'Футбольный мяч' },
      'Kvadrat Qutu': { en: 'Square Box', ru: 'Квадратная коробка' },
      'Qapı': { en: 'Door', ru: 'Дверь' },
    },
    explanation: {
      az: 'Əla! Top dairə formasında yumrudur! ⚽',
      en: 'Great! The ball is round like a circle! ⚽',
      ru: 'Отлично! Мяч круглый как круг! ⚽',
    },
  },
  'shape-star-1': {
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
      'Ürək': { en: 'Heart', ru: 'Сердечко' },
      'Dördbucaq': { en: 'Rectangle', ru: 'Прямоугольник' },
    },
    explanation: {
      az: 'Super! Ulduz göydə parıldayır! ⭐',
      en: 'Super! The star shines in the sky! ⭐',
      ru: 'Супер! Звездочка сияет в небе! ⭐',
    },
  },
  'shape-tri-1': {
    question: {
      az: 'Üçbucaq fiquru hansıdır?',
      en: 'Which one is the triangle?',
      ru: 'Где треугольник?',
    },
    instruction: {
      az: 'Üç iti küncü olan fiquru seç.',
      en: 'Select the shape with three corners.',
      ru: 'Выбери фигуру с тремя углами.',
    },
    options: {
      'Üçbucaq': { en: 'Triangle', ru: 'Треугольник' },
      'Kvadrat': { en: 'Square', ru: 'Квадрат' },
      'Dairə': { en: 'Circle', ru: 'Круг' },
    },
    explanation: {
      az: 'Düzdür! Üçbucağın düz 3 küncü var! 🔺',
      en: 'Correct! A triangle has 3 corners! 🔺',
      ru: 'Правильно! У треугольника 3 угла! 🔺',
    },
  },

  // ── 5. Animals (Pişik, İt, İnək, Qoyun) ─────────────────────────────
  'anim-cat-1': {
    question: {
      az: 'Hansı heyvan "miyau" edir?',
      en: 'Which animal says "meow"?',
      ru: 'Какое животное говорит «мяу»?',
    },
    instruction: {
      az: '"Miyau" deyən pişiyi seç.',
      en: 'Select the cat that says "meow".',
      ru: 'Выбери кошку, которая говорит «мяу».',
    },
    options: {
      'Pişik': { en: 'Cat', ru: 'Кошка' },
      'İt': { en: 'Dog', ru: 'Собака' },
      'İnək': { en: 'Cow', ru: 'Корова' },
    },
    explanation: {
      az: 'Düzdür! Pişik sevimli miyau səsi çıxarır! 🐱',
      en: 'Correct! The cat makes a cute meow sound! 🐱',
      ru: 'Правильно! Кошка издает милый звук мяу! 🐱',
    },
  },
  'anim-dog-2': {
    question: {
      az: 'Hansı heyvan "hav-hav" deyir və quyruğunu yelləyir?',
      en: 'Which animal says "woof-woof" and wags its tail?',
      ru: 'Какое животное говорит «гав-гав» и виляет хвостом?',
    },
    instruction: {
      az: 'Sadiq dostumuz olan iti tap.',
      en: 'Find our loyal friend the dog.',
      ru: 'Найди верного друга — собаку.',
    },
    options: {
      'İt': { en: 'Dog', ru: 'Собака' },
      'Pişik': { en: 'Cat', ru: 'Кошка' },
      'Dovşan': { en: 'Rabbit', ru: 'Заяц' },
    },
    explanation: {
      az: 'Afərin! İt evi qoruyur və dostdur! 🐶',
      en: 'Well done! Dogs guard homes and are best friends! 🐶',
      ru: 'Молодец! Собака охраняет дом и дружит с нами! 🐶',
    },
  },
  'anim-cat-play-3': {
    question: {
      az: 'Süd içməyi və yumaqla oynamağı kim sevir?',
      en: 'Who loves drinking milk and playing with yarn?',
      ru: 'Кто любит пить молоко и играть с клубочком?',
    },
    instruction: {
      az: 'Südü sevən sevimli pişiyi seç.',
      en: 'Select the cute cat who loves milk.',
      ru: 'Выбери кошечку, которая любит молоко.',
    },
    options: {
      'Pişik': { en: 'Cat', ru: 'Кошка' },
      'At': { en: 'Horse', ru: 'Лошадка' },
      'Qoyun': { en: 'Sheep', ru: 'Овечка' },
    },
    explanation: {
      az: 'Bəli! Pişiklər südü və oynamağı çox sevirlər! 🥛🐱',
      en: 'Yes! Cats love milk and playtime! 🥛🐱',
      ru: 'Да! Кошечки обожают молочко и игры! 🥛🐱',
    },
  },
  'anim-cow-4': {
    question: {
      az: 'Bizə dadlı süd verən və "möö" deyən heyvan hansıdır?',
      en: 'Which animal says "moo" and gives us delicious milk?',
      ru: 'Какое животное говорит «му» и дает вкусное молоко?',
    },
    instruction: {
      az: 'Faydalı süd verən inəyi tap.',
      en: 'Find the cow that gives healthy milk.',
      ru: 'Найди корову, которая дает полезное молоко.',
    },
    options: {
      'İnək': { en: 'Cow', ru: 'Корова' },
      'Canavar': { en: 'Wolf', ru: 'Волк' },
      'Tülkü': { en: 'Fox', ru: 'Лиса' },
    },
    explanation: {
      az: 'Əla! İnək bizə hər gün təmiz süd verir! 🐮',
      en: 'Great! The cow gives us fresh milk every day! 🐮',
      ru: 'Отлично! Корова дает нам свежее молоко каждый день! 🐮',
    },
  },
  'anim-sheep-5': {
    question: {
      az: '"Bəə" deyən və yumşaq yunu olan heyvan hansıdır?',
      en: 'Which animal says "baa" and has soft wool?',
      ru: 'Какое животное говорит «бе-е» и имеет мягкую шерсть?',
    },
    instruction: {
      az: 'Ağ yunu olan qoyunu seç.',
      en: 'Select the sheep with white wool.',
      ru: 'Выбери овечку с белой шерсткой.',
    },
    options: {
      'Qoyun': { en: 'Sheep', ru: 'Овечка' },
      'Pişik': { en: 'Cat', ru: 'Кошка' },
      'İt': { en: 'Dog', ru: 'Собака' },
    },
    explanation: {
      az: 'Düzdür! Qoyunun yumşaq yunundan isti paltarlar toxunur! 🐑',
      en: 'Correct! Soft wool from sheep makes warm clothes! 🐑',
      ru: 'Правильно! Из мягкой шерсти овечки вяжут теплые вещи! 🐑',
    },
  },

  // ── 12. Spatial Concepts (Üstündə, Altında, İçində, Yanında) ──────────
  'space-on-1': {
    question: {
      az: 'Kitab masanın harasındadır?',
      en: 'Where is the book on the table?',
      ru: 'Где лежит книга на столе?',
    },
    instruction: {
      az: 'Şəklə bax və kitabın yerini de.',
      en: 'Look at the picture and find the book position.',
      ru: 'Посмотри на картинку и определи, где книга.',
    },
    options: {
      'Üstündə': { en: 'On top', ru: 'На столе' },
      'Altında': { en: 'Underneath', ru: 'Под столом' },
      'İçində': { en: 'Inside', ru: 'Внутри' },
    },
    explanation: {
      az: 'Bəli! Kitab masanın tam üstündə qoyulub! 📖🪑',
      en: 'Yes! The book is right on top of the table! 📖🪑',
      ru: 'Да! Книга лежит прямо на столе! 📖🪑',
    },
  },
  'space-under-2': {
    question: {
      az: 'Pişik masanın harasındadır?',
      en: 'Where is the cat under the table?',
      ru: 'Где сидит кошка под столом?',
    },
    instruction: {
      az: 'Şəklə bax: Pişik harada əyləşib?',
      en: 'Look at the picture: Where is the cat sitting?',
      ru: 'Посмотри на картинку: Где сидит кошка?',
    },
    options: {
      'Altında': { en: 'Underneath', ru: 'Под столом' },
      'Üstündə': { en: 'On top', ru: 'На столе' },
      'Yanında': { en: 'Beside', ru: 'Рядом' },
    },
    explanation: {
      az: 'Düzdür! Pişik masanın altında daldalanıb! 🐱⬇️🪑',
      en: 'Correct! The cat is resting under the table! 🐱⬇️🪑',
      ru: 'Правильно! Кошка спряталась под столом! 🐱⬇️🪑',
    },
  },
  'space-in-3': {
    question: {
      az: 'Alma qutunun harasındadır?',
      en: 'Where is the apple in the box?',
      ru: 'Где яблоко в коробке?',
    },
    instruction: {
      az: 'Şəklə bax: Alma haradadır?',
      en: 'Look at the picture: Where is the apple?',
      ru: 'Посмотри на картинку: Где яблоко?',
    },
    options: {
      'İçində': { en: 'Inside', ru: 'Внутри' },
      'Üstündə': { en: 'On top', ru: 'Сверху' },
      'Altında': { en: 'Underneath', ru: 'Снизу' },
    },
    explanation: {
      az: 'Əla! Qırmızı alma qutunun içindədir! 🍎📦',
      en: 'Great! The red apple is inside the box! 🍎📦',
      ru: 'Отлично! Красное яблоко лежит внутри коробки! 🍎📦',
    },
  },
  'space-beside-4': {
    question: {
      az: 'Ayıcıq qutunun harasındadır?',
      en: 'Where is the teddy bear beside the box?',
      ru: 'Где мишка рядом с коробкой?',
    },
    instruction: {
      az: 'Şəklə bax: Ayıcıq qutunun harasında dayanıb?',
      en: 'Look at the picture: Where is the teddy bear?',
      ru: 'Посмотри на картинку: Где стоит мишка?',
    },
    options: {
      'Yanında': { en: 'Beside', ru: 'Рядом' },
      'Üstündə': { en: 'On top', ru: 'Сверху' },
      'Altında': { en: 'Underneath', ru: 'Снизу' },
    },
    explanation: {
      az: 'Möhtəşəm! Ayıcıq qutunun yanında əyləşib! 🧸👉📦',
      en: 'Awesome! The teddy bear is sitting beside the box! 🧸👉📦',
      ru: 'Замечательно! Мишка сидит рядом с коробкой! 🧸👉📦',
    },
  },

  // ── 33. Mathematics (1-10, 10+1=11, 10+10=20, 20+5=25, 50+50=100) ──
  'math-1': {
    question: {
      az: '1 alma + 1 alma neçə alma edir?',
      en: 'How much is 1 apple + 1 apple?',
      ru: 'Сколько будет 1 яблоко + 1 яблоко?',
    },
    instruction: {
      az: 'Almaları bir yerdə say: 1 və 1.',
      en: 'Count the apples together: 1 and 1.',
      ru: 'Посчитай яблоки вместе: 1 и 1.',
    },
    options: {
      '2 alma': { en: '2 apples', ru: '2 яблока' },
      '3 alma': { en: '3 apples', ru: '3 яблока' },
      '4 alma': { en: '4 apples', ru: '4 яблока' },
    },
    explanation: {
      az: 'Bəli! Bir üstəgəl bir iki alma edir! 🍎 + 🍎 = 2️⃣',
      en: 'Yes! One plus one equals two apples! 🍎 + 🍎 = 2️⃣',
      ru: 'Да! Одно плюс одно равно два яблока! 🍎 + 🍎 = 2️⃣',
    },
  },
  'math-2': {
    question: {
      az: '2 alma + 1 alma neçə alma edir?',
      en: 'How much is 2 apples + 1 apple?',
      ru: 'Сколько будет 2 яблока + 1 яблоко?',
    },
    instruction: {
      az: '2 almanın üstünə 1 alma əlavə et.',
      en: 'Add 1 apple to 2 apples.',
      ru: 'Прибавь 1 яблоко к 2 яблокам.',
    },
    options: {
      '3 alma': { en: '3 apples', ru: '3 яблока' },
      '2 alma': { en: '2 apples', ru: '2 яблока' },
      '4 alma': { en: '4 apples', ru: '4 яблока' },
    },
    explanation: {
      az: 'Afərin! 2 + 1 = 3 alma! 🍎🍎 + 🍎 = 3️⃣',
      en: 'Well done! 2 + 1 = 3 apples! 🍎🍎 + 🍎 = 3️⃣',
      ru: 'Молодец! 2 + 1 = 3 яблока! 🍎🍎 + 🍎 = 3️⃣',
    },
  },
  'math-3': {
    question: {
      az: '5 alma + 2 alma neçə alma edir?',
      en: 'How much is 5 apples + 2 apples?',
      ru: 'Сколько будет 5 яблок + 2 яблока?',
    },
    instruction: {
      az: '5 almanın üstünə 2 alma sayaq.',
      en: 'Count 2 more apples on top of 5.',
      ru: 'Посчитай еще 2 яблока к 5.',
    },
    options: {
      '7 alma': { en: '7 apples', ru: '7 яблок' },
      '6 alma': { en: '6 apples', ru: '6 яблок' },
      '8 alma': { en: '8 apples', ru: '8 яблок' },
    },
    explanation: {
      az: 'Əla! 5 + 2 = 7 alma edir! 🍎🍎🍎🍎🍎 + 🍎🍎 = 7️⃣',
      en: 'Great! 5 + 2 = 7 apples! 🍎🍎🍎🍎🍎 + 🍎🍎 = 7️⃣',
      ru: 'Отлично! 5 + 2 = 7 яблок! 🍎🍎🍎🍎🍎 + 🍎🍎 = 7️⃣',
    },
  },

  'math-4': {
    question: {
      az: '10 alma + 1 alma neçə alma edir?',
      en: 'How much is 10 apples + 1 apple?',
      ru: 'Сколько будет 10 яблок + 1 яблоко?',
    },
    instruction: {
      az: '10-un üstünə 1 gələk: on bir!',
      en: 'Add 1 to 10: eleven!',
      ru: 'Прибавим 1 к 10: одиннадцать!',
    },
    options: {
      '11 alma': { en: '11 apples', ru: '11 яблок' },
      '12 alma': { en: '12 apples', ru: '12 яблок' },
      '10 alma': { en: '10 apples', ru: '10 яблок' },
    },
    explanation: {
      az: 'Möhtəşəm! 10 + 1 = 11 alma! 🧺 + 🍎 = 1️⃣1️⃣',
      en: 'Awesome! 10 + 1 = 11 apples! 🧺 + 🍎 = 1️⃣1️⃣',
      ru: 'Замечательно! 10 + 1 = 11 яблок! 🧺 + 🍎 = 1️⃣1️⃣',
    },
  },
  'math-5': {
    question: {
      az: '10 alma + 2 alma neçə alma edir?',
      en: 'How much is 10 apples + 2 apples?',
      ru: 'Сколько будет 10 яблок + 2 яблока?',
    },
    instruction: {
      az: '10-un üstünə 2 gələk: on iki!',
      en: 'Add 2 to 10: twelve!',
      ru: 'Прибавим 2 к 10: двенадцать!',
    },
    options: {
      '12 alma': { en: '12 apples', ru: '12 яблок' },
      '13 alma': { en: '13 apples', ru: '13 яблок' },
      '11 alma': { en: '11 apples', ru: '11 яблок' },
    },
    explanation: {
      az: 'Düzdür! 10 + 2 = 12 alma! 🧺 + 🍎🍎 = 1️⃣2️⃣',
      en: 'Correct! 10 + 2 = 12 apples! 🧺 + 🍎🍎 = 1️⃣2️⃣',
      ru: 'Правильно! 10 + 2 = 12 яблок! 🧺 + 🍎🍎 = 1️⃣2️⃣',
    },
  },
  'math-6': {
    question: {
      az: '10 alma + 5 alma neçə alma edir?',
      en: 'How much is 10 apples + 5 apples?',
      ru: 'Сколько будет 10 яблок + 5 яблок?',
    },
    instruction: {
      az: '10-un üstünə 5 gələk: on beş!',
      en: 'Add 5 to 10: fifteen!',
      ru: 'Прибавим 5 к 10: пятнадцать!',
    },
    options: {
      '15 alma': { en: '15 apples', ru: '15 яблок' },
      '16 alma': { en: '16 apples', ru: '16 яблок' },
      '14 alma': { en: '14 apples', ru: '14 яблок' },
    },
    explanation: {
      az: 'Super! 10 + 5 = 15 alma! 🧺 + 🍎🍎🍎🍎🍎 = 1️⃣5️⃣',
      en: 'Super! 10 + 5 = 15 apples! 🧺 + 🍎🍎🍎🍎🍎 = 1️⃣5️⃣',
      ru: 'Супер! 10 + 5 = 15 яблок! 🧺 + 🍎🍎🍎🍎🍎 = 1️⃣5️⃣',
    },
  },

  'math-7': {
    question: {
      az: '10 alma + 10 alma neçə alma edir?',
      en: 'How much is 10 apples + 10 apples?',
      ru: 'Сколько будет 10 яблок + 10 яблок?',
    },
    instruction: {
      az: 'İki onluq: 10 + 10 = iyirmi!',
      en: 'Two tens: 10 + 10 = twenty!',
      ru: 'Два десятка: 10 + 10 = двадцать!',
    },
    options: {
      '20 alma': { en: '20 apples', ru: '20 яблок' },
      '30 alma': { en: '30 apples', ru: '30 яблок' },
      '15 alma': { en: '15 apples', ru: '15 яблок' },
    },
    explanation: {
      az: 'Afərin! 10 alma + 10 alma = 20 alma! 🧺 + 🧺 = 2️⃣0️⃣',
      en: 'Well done! 10 apples + 10 apples = 20 apples! 🧺 + 🧺 = 2️⃣0️⃣',
      ru: 'Молодец! 10 яблок + 10 яблок = 20 яблок! 🧺 + 🧺 = 2️⃣0️⃣',
    },
  },
  'math-8': {
    question: {
      az: '20 alma + 10 alma neçə alma edir?',
      en: 'How much is 20 apples + 10 apples?',
      ru: 'Сколько будет 20 яблок + 10 яблок?',
    },
    instruction: {
      az: '20-nin üstünə 10 gələndə: otuz!',
      en: 'Add 10 to 20: thirty!',
      ru: 'Прибавим 10 к 20: тридцать!',
    },
    options: {
      '30 alma': { en: '30 apples', ru: '30 яблок' },
      '40 alma': { en: '40 apples', ru: '40 яблок' },
      '25 alma': { en: '25 apples', ru: '25 яблок' },
    },
    explanation: {
      az: 'Əla! 20 + 10 = 30 alma! 🧺🧺 + 🧺 = 3️⃣0️⃣',
      en: 'Great! 20 + 10 = 30 apples! 🧺🧺 + 🧺 = 3️⃣0️⃣',
      ru: 'Отлично! 20 + 10 = 30 яблок! 🧺🧺 + 🧺 = 3️⃣0️⃣',
    },
  },
  'math-9': {
    question: {
      az: '50 alma + 50 alma neçə alma edir?',
      en: 'How much is 50 apples + 50 apples?',
      ru: 'Сколько будет 50 яблок + 50 яблок?',
    },
    instruction: {
      az: '50 və 50 birlikdə yüz (100) edir!',
      en: '50 and 50 together make one hundred (100)!',
      ru: '50 и 50 вместе составляют сто (100)!',
    },
    options: {
      '100 alma': { en: '100 apples', ru: '100 яблок' },
      '80 alma': { en: '80 apples', ru: '80 яблок' },
      '90 alma': { en: '90 apples', ru: '90 яблок' },
    },
    explanation: {
      az: 'Vau! Əlli üstəgəl əlli yüz edir: 50 + 50 = 100 alma! 💯',
      en: 'Wow! Fifty plus fifty makes a hundred: 50 + 50 = 100 apples! 💯',
      ru: 'Вау! Пятьдесят плюс пятьдесят будет сто: 50 + 50 = 100 яблок! 💯',
    },
  },

  'math-10': {
    question: {
      az: '20 alma + 5 alma neçə alma edir?',
      en: 'How much is 20 apples + 5 apples?',
      ru: 'Сколько будет 20 яблок + 5 яблок?',
    },
    instruction: {
      az: '25 alma demək üçün: 20 alma + 5 alma!',
      en: 'To make 25: 20 apples + 5 apples!',
      ru: 'Чтобы получить 25: 20 яблок + 5 яблок!',
    },
    options: {
      '25 alma': { en: '25 apples', ru: '25 яблок' },
      '20 alma': { en: '20 apples', ru: '20 яблок' },
      '30 alma': { en: '30 apples', ru: '30 яблок' },
    },
    explanation: {
      az: 'Düzdür! İyirmi alma üstəgəl 5 alma elədi 25 alma! 🧺🧺 + 🍎🍎🍎🍎🍎 = 2️⃣5️⃣',
      en: 'Correct! Twenty apples plus 5 apples makes 25 apples! 🧺🧺 + 🍎🍎🍎🍎🍎 = 2️⃣5️⃣',
      ru: 'Правильно! Двадцать яблок плюс 5 яблок будет 25 яблок! 🧺🧺 + 🍎🍎🍎🍎🍎 = 2️⃣5️⃣',
    },
  },
  'math-11': {
    question: {
      az: '30 alma + 4 alma neçə alma edir?',
      en: 'How much is 30 apples + 4 apples?',
      ru: 'Сколько будет 30 яблок + 4 яблока?',
    },
    instruction: {
      az: '30-un üstünə 4 alma gələk: otuz dörd!',
      en: 'Add 4 apples to 30: thirty-four!',
      ru: 'Прибавим 4 яблока к 30: тридцать четыре!',
    },
    options: {
      '34 alma': { en: '34 apples', ru: '34 яблока' },
      '30 alma': { en: '30 apples', ru: '30 яблок' },
      '40 alma': { en: '40 apples', ru: '40 яблок' },
    },
    explanation: {
      az: 'Afərin! 30 + 4 = 34 alma! 🧺🧺🧺 + 🍎🍎🍎🍎 = 3️⃣4️⃣',
      en: 'Well done! 30 + 4 = 34 apples! 🧺🧺🧺 + 🍎🍎🍎🍎 = 3️⃣4️⃣',
      ru: 'Молодец! 30 + 4 = 34 яблока! 🧺🧺🧺 + 🍎🍎🍎🍎 = 3️⃣4️⃣',
    },
  },
  'math-12': {
    question: {
      az: '40 alma + 5 alma neçə alma edir?',
      en: 'How much is 40 apples + 5 apples?',
      ru: 'Сколько будет 40 яблок + 5 яблок?',
    },
    instruction: {
      az: '40-ın üstünə 5 alma gələk: qırx beş!',
      en: 'Add 5 apples to 40: forty-five!',
      ru: 'Прибавим 5 яблок к 40: сорок пять!',
    },
    options: {
      '45 alma': { en: '45 apples', ru: '45 яблок' },
      '50 alma': { en: '50 apples', ru: '50 яблок' },
      '40 alma': { en: '40 apples', ru: '40 яблок' },
    },
    explanation: {
      az: 'Möhtəşəm riyazi nəticə! 40 + 5 = 45 alma! 4️⃣5️⃣',
      en: 'Awesome math skill! 40 + 5 = 45 apples! 4️⃣5️⃣',
      ru: 'Замечательный результат! 40 + 5 = 45 яблок! 4️⃣5️⃣',
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
    letsLearn: 'Gəl Öyrənək! 🎓',
    understoodStartPractice: 'Anladım! İndi Suallara Keçək 🚀',
    viewLesson: 'Dərsə bax 📖',
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
    letsLearn: "Let's Learn! 🎓",
    understoodStartPractice: "Got it! Let's practice 🚀",
    viewLesson: 'View lesson 📖',
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
    letsLearn: 'Давай учиться! 🎓',
    understoodStartPractice: 'Понятно! Переходим к вопросам 🚀',
    viewLesson: 'Посмотреть урок 📖',
  },
} as const;
