import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LEARNING_MODULES, LearningModuleCategory, LearningActivityItem } from '../src/data/learningModulesData';
import { ACTIVITY_TRANSLATIONS, LocalizedActivityData } from '../src/data/learningTranslations';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to sanitize "svetofor" -> "işıqfor" in Azerbaijani strings
function sanitizeAz(str: string): string {
  if (!str) return str;
  return str
    .replace(/svetofor/gi, (m) => m[0] === m[0].toUpperCase() ? 'İşıqfor' : 'işıqfor')
    .replace(/svetafor/gi, (m) => m[0] === m[0].toUpperCase() ? 'İşıqfor' : 'işıqfor');
}

// Map of new activities to append for each module to reach >= 10 activities
const MODULE_EXTENSIONS: Record<string, LearningActivityItem[]> = {
  // ── 2. SHAPES (currently 6 -> add 4 = 10) ──────────────────────────
  'shapes': [
    {
      id: 'shp-square-lesson-1',
      title: 'Kvadrat Fiquru',
      titleEn: 'Square Shape',
      titleRu: 'Фигура Квадрат',
      lesson: {
        id: 'shp-lesson-square',
        conceptTitleAz: 'Kvadrat Fiqurunu Öyrənək!',
        conceptTitleEn: "Let's Learn the Square!",
        conceptTitleRu: 'Учим фигуру Квадрат!',
        explanationAz: 'Kvadratın 4 bərabər tərəfi və 4 küncü var! Pəncərə və ya hədiyyə qutusu kvadrata bənzəyir!',
        explanationEn: 'A square has 4 equal sides and 4 corners! A window or gift box looks like a square!',
        explanationRu: 'У квадрата 4 равные стороны и 4 угла! Окно или коробка похожи на квадрат!',
        bigEmojis: ['🔲', '📦', '🖼️', '⬛'],
        audioTextAz: 'Kvadratın dörd bərabər tərəfi var. Qutu və pəncərə kvadrata bənzəyir.',
        audioTextEn: 'A square has four equal sides. A box and window look like a square.',
        audioTextRu: 'У квадрата четыре равные стороны. Коробка и окно похожи на квадрат.',
      },
      instruction: 'Kvadrat formasında olan əşyanı tap.',
      instructionEn: 'Find the square shaped item.',
      instructionRu: 'Найди предмет квадратной формы.',
      type: 'select',
      question: 'Hansı əşya kvadrat formasındadır?',
      questionEn: 'Which item has a square shape?',
      questionRu: 'Какой предмет имеет форму квадрата?',
      options: [
        { id: 'opt-shp-box', text: 'Hədiyyə Qutusu', textEn: 'Gift Box', textRu: 'Подарочная коробка', emoji: '📦', isCorrect: true },
        { id: 'opt-shp-ball', text: 'Top', textEn: 'Ball', textRu: 'Мяч', emoji: '⚽', isCorrect: false },
        { id: 'opt-shp-egg', text: 'Yumurta', textEn: 'Egg', textRu: 'Яйцо', emoji: '🥚', isCorrect: false },
      ],
    },
    {
      id: 'shp-square-window-2',
      title: 'Kvadrat Pəncərə',
      titleEn: 'Square Window',
      titleRu: 'Квадратное окно',
      instruction: 'Otaqdakı pəncərənin formasını seç.',
      instructionEn: 'Select the shape of the room window.',
      instructionRu: 'Выбери форму комнатного окна.',
      type: 'select',
      question: 'Dörd bərabər tərəfi olan pəncərə hansı fiqurdur?',
      questionEn: 'What shape is a window with four equal sides?',
      questionRu: 'Какая фигура у окна с четырьмя равными сторонами?',
      options: [
        { id: 'opt-shp-sq-corr', text: 'Kvadrat', textEn: 'Square', textRu: 'Квадрат', emoji: '🔲', isCorrect: true },
        { id: 'opt-shp-sq-circ', text: 'Dairə', textEn: 'Circle', textRu: 'Круг', emoji: '⭕', isCorrect: false },
        { id: 'opt-shp-sq-tri', text: 'Üçbucaq', textEn: 'Triangle', textRu: 'Треугольник', emoji: '🔺', isCorrect: false },
      ],
    },
    {
      id: 'shp-star-lesson-3',
      title: 'Ulduz Fiquru',
      titleEn: 'Star Shape',
      titleRu: 'Фигура Звезда',
      lesson: {
        id: 'shp-lesson-star',
        conceptTitleAz: 'Parlaq Ulduz Fiqurunu Öyrənək!',
        conceptTitleEn: "Let's Learn the Star Shape!",
        conceptTitleRu: 'Учим фигуру Звезда!',
        explanationAz: 'Ulduzun parıldayan küncləri var! Gecə səmadakı ulduzlar və dəniz ulduzu bu formadadır!',
        explanationEn: 'A star has shining points! Stars in the night sky and starfish look like this!',
        explanationRu: 'У звезды сияющие лучи! Звезды в ночном небе и морская звезда имеют эту форму!',
        bigEmojis: ['⭐', '🌟', '✨', '🌠'],
        audioTextAz: 'Ulduz göydə parıldayır. Onun beş küncü var.',
        audioTextEn: 'The star shines in the sky. It has five points.',
        audioTextRu: 'Звезда сияет в небе. У нее пять лучей.',
      },
      instruction: 'Parıldayan ulduz fiqurunu seç.',
      instructionEn: 'Select the shining star shape.',
      instructionRu: 'Выбери сияющую фигуру звезды.',
      type: 'select',
      question: 'Hansı parlaq fiqur ulduzdur?',
      questionEn: 'Which shining shape is a star?',
      questionRu: 'Какая сияющая фигура — звезда?',
      options: [
        { id: 'opt-shp-star-corr', text: 'Sarı Ulduz', textEn: 'Yellow Star', textRu: 'Желтая звезда', emoji: '⭐', isCorrect: true },
        { id: 'opt-shp-star-circ', text: 'Dairə', textEn: 'Circle', textRu: 'Круг', emoji: '⭕', isCorrect: false },
        { id: 'opt-shp-star-sq', text: 'Kvadrat', textEn: 'Square', textRu: 'Квадрат', emoji: '⬛', isCorrect: false },
      ],
    },
    {
      id: 'shp-star-sea-4',
      title: 'Dəniz Ulduzu',
      titleEn: 'Starfish',
      titleRu: 'Морская звезда',
      instruction: 'Dəniz canlısının formasını tap.',
      instructionEn: 'Find the shape of the sea creature.',
      instructionRu: 'Найди форму морского обитателя.',
      type: 'select',
      question: 'Dəniz ulduzu hansı həndəsi formaya bənzəyir?',
      questionEn: 'What shape does a starfish resemble?',
      questionRu: 'На какую форму похожа морская звезда?',
      options: [
        { id: 'opt-shp-seastar-corr', text: 'Ulduz', textEn: 'Star', textRu: 'Звезда', emoji: '⭐', isCorrect: true },
        { id: 'opt-shp-seastar-tri', text: 'Üçbucaq', textEn: 'Triangle', textRu: 'Треугольник', emoji: '🔺', isCorrect: false },
        { id: 'opt-shp-seastar-box', text: 'Kvadrat', textEn: 'Square', textRu: 'Квадрат', emoji: '🔲', isCorrect: false },
      ],
    },
  ],

  // ── 3. OBJECTS (currently 5 -> add 5 = 10) ──────────────────────────
  'objects': [
    {
      id: 'obj-school-lesson-1',
      title: 'Məktəb Ləvazimatları',
      titleEn: 'School Supplies',
      titleRu: 'Школьные принадлежности',
      lesson: {
        id: 'obj-lesson-school',
        conceptTitleAz: 'Məktəb Əşyalarını Tanıyaq!',
        conceptTitleEn: "Let's Learn School Supplies!",
        conceptTitleRu: 'Учим школьные вещи!',
        explanationAz: 'Dərs oxumaq üçün kitab, qələm və çanta bizə kömək edir! Onları həmişə səliqəli saxlayırıq!',
        explanationEn: 'Books, pencils, and backpacks help us study! We always keep them neat!',
        explanationRu: 'Книги, карандаши и рюкзак помогают нам учиться! Мы содержим их в порядке!',
        bigEmojis: ['🎒', '✏️', '📚', '📐'],
        audioTextAz: 'Kitab oxuyuruq, qələmlə yazırıq, çantaya yığırıq.',
        audioTextEn: 'We read books, write with pencils, pack in backpack.',
        audioTextRu: 'Читаем книги, пишем карандашом, складываем в рюкзак.',
      },
      instruction: 'Yazı yazmaq üçün lazım olan əşyanı tap.',
      instructionEn: 'Find the item used for writing.',
      instructionRu: 'Найди предмет для письма.',
      type: 'select',
      question: 'Dəftərə rəsm çəkmək və yazmaq üçün nə işlədirik?',
      questionEn: 'What do we use to draw and write in a notebook?',
      questionRu: 'Что мы используем, чтобы рисовать и писать в тетради?',
      options: [
        { id: 'opt-obj-pencil', text: 'Rəngli Qələm', textEn: 'Color Pencil', textRu: 'Цветной карандаш', emoji: '✏️', isCorrect: true },
        { id: 'opt-obj-spoon', text: 'Qaşıq', textEn: 'Spoon', textRu: 'Ложка', emoji: '🥄', isCorrect: false },
        { id: 'opt-obj-pillow', text: 'Yastıq', textEn: 'Pillow', textRu: 'Подушка', emoji: '🛋️', isCorrect: false },
      ],
    },
    {
      id: 'obj-school-backpack-2',
      title: 'Məktəb Çantası',
      titleEn: 'Backpack',
      titleRu: 'Рюкзак',
      instruction: 'Kitabları daşımaq üçün əşyanı seç.',
      instructionEn: 'Select the item for carrying books.',
      instructionRu: 'Выбери предмет для ношения книг.',
      type: 'select',
      question: 'Dəftər və kitablarımızı hara yığırıq?',
      questionEn: 'Where do we pack our notebooks and books?',
      questionRu: 'Куда мы складываем тетради и книги?',
      options: [
        { id: 'opt-obj-bag-corr', text: 'Məktəb Çantası', textEn: 'School Backpack', textRu: 'Школьный рюкзак', emoji: '🎒', isCorrect: true },
        { id: 'opt-obj-bag-plate', text: 'Boşqab', textEn: 'Plate', textRu: 'Тарелка', emoji: '🍽️', isCorrect: false },
        { id: 'opt-obj-bag-chair', text: 'Stul', textEn: 'Chair', textRu: 'Стул', emoji: '🪑', isCorrect: false },
      ],
    },
    {
      id: 'obj-school-book-3',
      title: 'Maraqlı Kitab',
      titleEn: 'Interesting Book',
      titleRu: 'Интересная книга',
      instruction: 'Nağıl oxunan əşyanı seç.',
      instructionEn: 'Select the item used to read stories.',
      instructionRu: 'Выбери предмет, из которого читают сказки.',
      type: 'select',
      question: 'Hansı əşyadan gözəl nağıllar oxuyuruq?',
      questionEn: 'From which item do we read wonderful stories?',
      questionRu: 'Из какого предмета мы читаем чудесные сказки?',
      options: [
        { id: 'opt-obj-book-corr', text: 'Kitab', textEn: 'Book', textRu: 'Книга', emoji: '📚', isCorrect: true },
        { id: 'opt-obj-book-fork', text: 'Çəngəl', textEn: 'Fork', textRu: 'Вилка', emoji: '🍴', isCorrect: false },
        { id: 'opt-obj-book-clock', text: 'Saat', textEn: 'Clock', textRu: 'Часы', emoji: '⏰', isCorrect: false },
      ],
    },
    {
      id: 'obj-toys-lesson-4',
      title: 'Sevimli Oyuncaqlar',
      titleEn: 'Favorite Toys',
      titleRu: 'Любимые игрушки',
      lesson: {
        id: 'obj-lesson-toys',
        conceptTitleAz: 'Oyuncaqlarımızı Tanıyaq!',
        conceptTitleEn: "Let's Learn About Toys!",
        conceptTitleRu: 'Учим игрушки!',
        explanationAz: 'Oyuncaqlar uşaqların ən yaxşı dostudur! Top tullanır, ayı qucaqlanır, maşın sürülür!',
        explanationEn: 'Toys are a child best friends! The ball bounces, teddy hugs, car drives!',
        explanationRu: 'Игрушки — лучшие друзья детей! Мяч прыгает, мишку обнимаем, машинка едет!',
        bigEmojis: ['🧸', '⚽', '🚗', '🧩'],
        audioTextAz: 'Oyuncaqlarla oynayırıq və onları səliqəli saxlayırıq.',
        audioTextEn: 'We play with toys and keep them tidy.',
        audioTextRu: 'Мы играем с игрушками и убираем их на место.',
      },
      instruction: 'Yumşaq oyuncağı seç.',
      instructionEn: 'Select the soft plush toy.',
      instructionRu: 'Выбери мягкую плюшевую игрушку.',
      type: 'select',
      question: 'Yatağa aparıb qucaqladığımız yumşaq oyuncaq hansıdır?',
      questionEn: 'Which soft toy do we take to bed to hug?',
      questionRu: 'Какую мягкую игрушку мы берем в кровать, чтобы обнять?',
      options: [
        { id: 'opt-obj-teddy', text: 'Yumşaq Ayı', textEn: 'Teddy Bear', textRu: 'Плюшевый мишка', emoji: '🧸', isCorrect: true },
        { id: 'opt-obj-notebook', text: 'Dəftər', textEn: 'Notebook', textRu: 'Тетрадь', emoji: '📓', isCorrect: false },
        { id: 'opt-obj-cup', text: 'Fincan', textEn: 'Cup', textRu: 'Чашка', emoji: '☕', isCorrect: false },
      ],
    },
    {
      id: 'obj-toys-ball-5',
      title: 'Tullanan Top',
      titleEn: 'Bouncing Ball',
      titleRu: 'Прыгучий мяч',
      instruction: 'Tullanan oyuncağı tap.',
      instructionEn: 'Find the bouncing toy.',
      instructionRu: 'Найди прыгучую игрушку.',
      type: 'select',
      question: 'Hansı oyuncağı yerə vuranda yuxarı tullanır?',
      questionEn: 'Which toy bounces up when hit on the ground?',
      questionRu: 'Какая игрушка подскакивает, когда ударяется о землю?',
      options: [
        { id: 'opt-obj-ball-corr', text: 'Rəngli Top', textEn: 'Colorful Ball', textRu: 'Цветной мяч', emoji: '⚽', isCorrect: true },
        { id: 'opt-obj-ball-chair', text: 'Stul', textEn: 'Chair', textRu: 'Стул', emoji: '🪑', isCorrect: false },
        { id: 'opt-obj-ball-door', text: 'Qapı', textEn: 'Door', textRu: 'Дверь', emoji: '🚪', isCorrect: false },
      ],
    },
  ],
};

console.log('Extensions keys:', Object.keys(MODULE_EXTENSIONS));
