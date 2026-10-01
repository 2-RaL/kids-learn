import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODULES_JSON = os.path.join(ROOT, 'scratch', 'current_modules.json')
TRANS_JSON = os.path.join(ROOT, 'scratch', 'current_translations.json')

with open(MODULES_JSON, 'r', encoding='utf-8') as f:
    modules = json.load(f)

with open(TRANS_JSON, 'r', encoding='utf-8') as f:
    translations = json.load(f)

def sanitize_az(text):
    if not isinstance(text, str):
        return text
    res = re.sub(r'svetofor', 'işıqfor', text, flags=re.IGNORECASE)
    res = re.sub(r'svetafor', 'işıqfor', res, flags=re.IGNORECASE)
    res = re.sub(r'Svetofor', 'İşıqfor', res)
    res = re.sub(r'Svetafor', 'İşıqfor', res)
    return res

def deep_sanitize(obj):
    if isinstance(obj, dict):
        new_d = {}
        for k, v in obj.items():
            if 'az' in k.lower() or k in ('title', 'instruction', 'question', 'text', 'explanation', 'conceptTitle', 'captionAz'):
                new_d[k] = sanitize_az(v) if isinstance(v, str) else deep_sanitize(v)
            else:
                new_d[k] = deep_sanitize(v)
        return new_d
    elif isinstance(obj, list):
        return [deep_sanitize(item) for item in obj]
    else:
        return obj

# Sanitize existing data first
modules = deep_sanitize(modules)
translations = deep_sanitize(translations)

# Comprehensive additions for each module
ADDITIONS = {
    # ── 2. shapes (+4 -> 10) ──
    'shapes': [
        {
            'id': 'shp-square-1',
            'title': 'Kvadrat Qutu',
            'titleEn': 'Square Box',
            'titleRu': 'Квадратная коробка',
            'lesson': {
                'id': 'shp-lesson-square',
                'conceptTitleAz': 'Kvadrat Fiqurunu Öyrənək!',
                'conceptTitleEn': "Let's Learn the Square!",
                'conceptTitleRu': 'Учим фигуру Квадрат!',
                'explanationAz': 'Kvadratın 4 bərabər tərəfi və 4 küncü var! Pəncərə və ya hədiyyə qutusu kvadrata bənzəyir!',
                'explanationEn': 'A square has 4 equal sides and 4 corners! A window or gift box looks like a square!',
                'explanationRu': 'У квадрата 4 равные стороны и 4 угла! Окно или коробка похожи на квадрат!',
                'bigEmojis': ['🔲', '📦', '🖼️', '⬛'],
                'audioTextAz': 'Kvadratın dörd bərabər tərəfi var. Qutu və pəncərə kvadrata bənzəyir.',
                'audioTextEn': 'A square has four equal sides. A box and window look like a square.',
                'audioTextRu': 'У квадрата четыре равные стороны. Коробка и окно похожи на квадрат.',
            },
            'instruction': 'Kvadrat formasında olan əşyanı tap.',
            'instructionEn': 'Find the square shaped item.',
            'instructionRu': 'Найди предмет квадратной формы.',
            'type': 'select',
            'question': 'Hansı əşya kvadrat formasındadır?',
            'questionEn': 'Which item has a square shape?',
            'questionRu': 'Какой предмет имеет форму квадрата?',
            'options': [
                {'id': 'opt-shp-box', 'text': 'Hədiyyə Qutusu', 'textEn': 'Gift Box', 'textRu': 'Подарочная коробка', 'emoji': '📦', 'isCorrect': True},
                {'id': 'opt-shp-ball', 'text': 'Top', 'textEn': 'Ball', 'textRu': 'Мяч', 'emoji': '⚽', 'isCorrect': False},
                {'id': 'opt-shp-egg', 'text': 'Yumurta', 'textEn': 'Egg', 'textRu': 'Яйцо', 'emoji': '🥚', 'isCorrect': False},
            ],
        },
        {
            'id': 'shp-square-window-2',
            'title': 'Kvadrat Pəncərə',
            'titleEn': 'Square Window',
            'titleRu': 'Квадратное окно',
            'instruction': 'Otaqdakı pəncərənin formasını seç.',
            'instructionEn': 'Select the shape of the room window.',
            'instructionRu': 'Выбери форму комнатного окна.',
            'type': 'select',
            'question': 'Dörd bərabər tərəfi olan pəncərə hansı fiqurdur?',
            'questionEn': 'What shape is a window with four equal sides?',
            'questionRu': 'Какая фигура у окна с четырьмя равными сторонами?',
            'options': [
                {'id': 'opt-shp-sq-corr', 'text': 'Kvadrat', 'textEn': 'Square', 'textRu': 'Квадрат', 'emoji': '🔲', 'isCorrect': True},
                {'id': 'opt-shp-sq-circ', 'text': 'Dairə', 'textEn': 'Circle', 'textRu': 'Круг', 'emoji': '⭕', 'isCorrect': False},
                {'id': 'opt-shp-sq-tri', 'text': 'Üçbucaq', 'textEn': 'Triangle', 'textRu': 'Треугольник', 'emoji': '🔺', 'isCorrect': False},
            ],
        },
        {
            'id': 'shp-star-1',
            'title': 'Parlaq Ulduz',
            'titleEn': 'Shining Star',
            'titleRu': 'Сияющая звезда',
            'lesson': {
                'id': 'shp-lesson-star',
                'conceptTitleAz': 'Parlaq Ulduz Fiqurunu Öyrənək!',
                'conceptTitleEn': "Let's Learn the Star Shape!",
                'conceptTitleRu': 'Учим фигуру Звезда!',
                'explanationAz': 'Ulduzun parıldayan küncləri var! Gecə səmadakı ulduzlar və dəniz ulduzu bu formadadır!',
                'explanationEn': 'A star has shining points! Stars in the night sky and starfish look like this!',
                'explanationRu': 'У звезды сияющие лучи! Звезды в ночном небе и морская звезда имеют эту форму!',
                'bigEmojis': ['⭐', '🌟', '✨', '🌠'],
                'audioTextAz': 'Ulduz göydə parıldayır. Onun beş küncü var.',
                'audioTextEn': 'The star shines in the sky. It has five points.',
                'audioTextRu': 'Звезда сияет в небе. У нее пять лучей.',
            },
            'instruction': 'Parıldayan ulduz fiqurunu seç.',
            'instructionEn': 'Select the shining star shape.',
            'instructionRu': 'Выбери сияющую фигуру звезды.',
            'type': 'select',
            'question': 'Hansı parlaq fiqur ulduzdur?',
            'questionEn': 'Which shining shape is a star?',
            'questionRu': 'Какая сияющая фигура — звезда?',
            'options': [
                {'id': 'opt-shp-star-corr', 'text': 'Sarı Ulduz', 'textEn': 'Yellow Star', 'textRu': 'Желтая звезда', 'emoji': '⭐', 'isCorrect': True},
                {'id': 'opt-shp-star-circ', 'text': 'Dairə', 'textEn': 'Circle', 'textRu': 'Круг', 'emoji': '⭕', 'isCorrect': False},
                {'id': 'opt-shp-star-sq', 'text': 'Kvadrat', 'textEn': 'Square', 'textRu': 'Квадрат', 'emoji': '⬛', 'isCorrect': False},
            ],
        },
        {
            'id': 'shp-star-sea-2',
            'title': 'Dəniz Ulduzu',
            'titleEn': 'Starfish',
            'titleRu': 'Морская звезда',
            'instruction': 'Dəniz canlısının formasını tap.',
            'instructionEn': 'Find the shape of the sea creature.',
            'instructionRu': 'Найди форму морского обитателя.',
            'type': 'select',
            'question': 'Dəniz ulduzu hansı həndəsi formaya bənzəyir?',
            'questionEn': 'What shape does a starfish resemble?',
            'questionRu': 'На какую форму похожа морская звезда?',
            'options': [
                {'id': 'opt-shp-seastar-corr', 'text': 'Ulduz', 'textEn': 'Star', 'textRu': 'Звезда', 'emoji': '⭐', 'isCorrect': True},
                {'id': 'opt-shp-seastar-tri', 'text': 'Üçbucaq', 'textEn': 'Triangle', 'textRu': 'Треугольник', 'emoji': '🔺', 'isCorrect': False},
                {'id': 'opt-shp-seastar-box', 'text': 'Kvadrat', 'textEn': 'Square', 'textRu': 'Квадрат', 'emoji': '🔲', 'isCorrect': False},
            ],
        },
    ],

    # ── 3. objects (+5 -> 10) ──
    'objects': [
        {
            'id': 'obj-school-1',
            'title': 'Rəngli Qələm',
            'titleEn': 'Color Pencil',
            'titleRu': 'Цветной карандаш',
            'lesson': {
                'id': 'obj-lesson-school',
                'conceptTitleAz': 'Məktəb Əşyalarını Tanıyaq!',
                'conceptTitleEn': "Let's Learn School Supplies!",
                'conceptTitleRu': 'Учим школьные вещи!',
                'explanationAz': 'Dərs oxumaq üçün kitab, qələm və çanta bizə kömək edir! Onları həmişə səliqəli saxlayırıq!',
                'explanationEn': 'Books, pencils, and backpacks help us study! We always keep them neat!',
                'explanationRu': 'Книги, карандаши и рюкзак помогают нам учиться! Мы содержим их в порядке!',
                'bigEmojis': ['🎒', '✏️', '📚', '📐'],
                'audioTextAz': 'Kitab oxuyuruq, qələmlə yazırıq, çantaya yığırıq.',
                'audioTextEn': 'We read books, write with pencils, pack in backpack.',
                'audioTextRu': 'Читаем книги, пишем карандашом, складываем в рюкзак.',
            },
            'instruction': 'Yazı yazmaq üçün lazım olan əşyanı tap.',
            'instructionEn': 'Find the item used for writing.',
            'instructionRu': 'Найди предмет для письма.',
            'type': 'select',
            'question': 'Dəftərə rəsm çəkmək və yazmaq üçün nə işlədirik?',
            'questionEn': 'What do we use to draw and write in a notebook?',
            'questionRu': 'Что мы используем, чтобы рисовать и писать в тетради?',
            'options': [
                {'id': 'opt-obj-pencil', 'text': 'Rəngli Qələm', 'textEn': 'Color Pencil', 'textRu': 'Цветной карандаш', 'emoji': '✏️', 'isCorrect': True},
                {'id': 'opt-obj-spoon', 'text': 'Qaşıq', 'textEn': 'Spoon', 'textRu': 'Ложка', 'emoji': '🥄', 'isCorrect': False},
                {'id': 'opt-obj-pillow', 'text': 'Yastıq', 'textEn': 'Pillow', 'textRu': 'Подушка', 'emoji': '🛋️', 'isCorrect': False},
            ],
        },
        {
            'id': 'obj-school-bag-2',
            'title': 'Məktəb Çantası',
            'titleEn': 'Backpack',
            'titleRu': 'Рюкзак',
            'instruction': 'Kitabları daşımaq üçün əşyanı seç.',
            'instructionEn': 'Select the item for carrying books.',
            'instructionRu': 'Выбери предмет для ношения книг.',
            'type': 'select',
            'question': 'Dəftər və kitablarımızı hara yığırıq?',
            'questionEn': 'Where do we pack our notebooks and books?',
            'questionRu': 'Куда мы складываем тетради и книги?',
            'options': [
                {'id': 'opt-obj-bag-corr', 'text': 'Məktəb Çantası', 'textEn': 'School Backpack', 'textRu': 'Школьный рюкзак', 'emoji': '🎒', 'isCorrect': True},
                {'id': 'opt-obj-bag-plate', 'text': 'Boşqab', 'textEn': 'Plate', 'textRu': 'Тарелка', 'emoji': '🍽️', 'isCorrect': False},
                {'id': 'opt-obj-bag-chair', 'text': 'Stul', 'textEn': 'Chair', 'textRu': 'Стул', 'emoji': '🪑', 'isCorrect': False},
            ],
        },
        {
            'id': 'obj-school-book-3',
            'title': 'Maraqlı Kitab',
            'titleEn': 'Interesting Book',
            'titleRu': 'Интересная книга',
            'instruction': 'Nağıl oxunan əşyanı seç.',
            'instructionEn': 'Select the item used to read stories.',
            'instructionRu': 'Выбери предмет, из которого читают сказки.',
            'type': 'select',
            'question': 'Hansı əşyadan gözəl nağıllar oxuyuruq?',
            'questionEn': 'From which item do we read wonderful stories?',
            'questionRu': 'Из какого предмета мы читаем чудесные сказки?',
            'options': [
                {'id': 'opt-obj-book-corr', 'text': 'Kitab', 'textEn': 'Book', 'textRu': 'Книга', 'emoji': '📚', 'isCorrect': True},
                {'id': 'opt-obj-book-fork', 'text': 'Çəngəl', 'textEn': 'Fork', 'textRu': 'Вилка', 'emoji': '🍴', 'isCorrect': False},
                {'id': 'opt-obj-book-clock', 'text': 'Saat', 'textEn': 'Clock', 'textRu': 'Часы', 'emoji': '⏰', 'isCorrect': False},
            ],
        },
        {
            'id': 'obj-toys-1',
            'title': 'Yumşaq Ayı',
            'titleEn': 'Teddy Bear',
            'titleRu': 'Плюшевый мишка',
            'lesson': {
                'id': 'obj-lesson-toys',
                'conceptTitleAz': 'Oyuncaqlarımızı Tanıyaq!',
                'conceptTitleEn': "Let's Learn About Toys!",
                'conceptTitleRu': 'Учим игрушки!',
                'explanationAz': 'Oyuncaqlar uşaqların ən yaxşı dostudur! Top tullanır, ayı qucaqlanır, maşın sürülür!',
                'explanationEn': 'Toys are a child best friends! The ball bounces, teddy hugs, car drives!',
                'explanationRu': 'Игрушки — лучшие друзья детей! Мяч прыгает, мишку обнимаем, машинка едет!',
                'bigEmojis': ['🧸', '⚽', '🚗', '🧩'],
                'audioTextAz': 'Oyuncaqlarla oynayırıq və onları səliqəli saxlayırıq.',
                'audioTextEn': 'We play with toys and keep them tidy.',
                'audioTextRu': 'Мы играем с игрушками и убираем их на место.',
            },
            'instruction': 'Yumşaq oyuncağı seç.',
            'instructionEn': 'Select the soft plush toy.',
            'instructionRu': 'Выбери мягкую плюшевую игрушку.',
            'type': 'select',
            'question': 'Yatağa aparıb qucaqladığımız yumşaq oyuncaq hansıdır?',
            'questionEn': 'Which soft toy do we take to bed to hug?',
            'questionRu': 'Какую мягкую игрушку мы берем в кровать, чтобы обнять?',
            'options': [
                {'id': 'opt-obj-teddy', 'text': 'Yumşaq Ayı', 'textEn': 'Teddy Bear', 'textRu': 'Плюшевый мишка', 'emoji': '🧸', 'isCorrect': True},
                {'id': 'opt-obj-notebook', 'text': 'Dəftər', 'textEn': 'Notebook', 'textRu': 'Тетрадь', 'emoji': '📓', 'isCorrect': False},
                {'id': 'opt-obj-cup', 'text': 'Fincan', 'textEn': 'Cup', 'textRu': 'Чашка', 'emoji': '☕', 'isCorrect': False},
            ],
        },
        {
            'id': 'obj-toys-ball-2',
            'title': 'Tullanan Top',
            'titleEn': 'Bouncing Ball',
            'titleRu': 'Прыгучий мяч',
            'instruction': 'Tullanan oyuncağı tap.',
            'instructionEn': 'Find the bouncing toy.',
            'instructionRu': 'Найди прыгучую игрушку.',
            'type': 'select',
            'question': 'Hansı oyuncağı yerə vuranda yuxarı tullanır?',
            'questionEn': 'Which toy bounces up when hit on the ground?',
            'questionRu': 'Какая игрушка подскакивает, когда ударяется о землю?',
            'options': [
                {'id': 'opt-obj-ball-corr', 'text': 'Rəngli Top', 'textEn': 'Colorful Ball', 'textRu': 'Цветной мяч', 'emoji': '⚽', 'isCorrect': True},
                {'id': 'opt-obj-ball-chair', 'text': 'Stul', 'textEn': 'Chair', 'textRu': 'Стул', 'emoji': '🪑', 'isCorrect': False},
                {'id': 'opt-obj-ball-door', 'text': 'Qapı', 'textEn': 'Door', 'textRu': 'Дверь', 'emoji': '🚪', 'isCorrect': False},
            ],
        },
    ],

    # ── 4. body-parts (+5 -> 10) ──
    'body-parts': [
        {
            'id': 'bod-legs-1',
            'title': 'Ayaqlar və Qaçış',
            'titleEn': 'Legs and Running',
            'titleRu': 'Ноги и бег',
            'lesson': {
                'id': 'bod-lesson-legs',
                'conceptTitleAz': 'Ayaqlarımızı və Hərəkəti Öyrənək!',
                'conceptTitleEn': "Let's Learn Legs and Movement!",
                'conceptTitleRu': 'Учим ноги и движения!',
                'explanationAz': 'Ayaqlarımız sayəsində qaçırıq, tullanırıq və yeriyirik! Hər ayağımızda 5 barmaq var!',
                'explanationEn': 'Thanks to our legs we run, jump, and walk! Each foot has 5 toes!',
                'explanationRu': 'Благодаря ногам мы бегаем, прыгаем и ходим! На каждой ноге 5 пальчиков!',
                'bigEmojis': ['🦵', '🦶', '👟', '🏃'],
                'audioTextAz': 'Ayaqlarımızla qaçırıq və tullanırıq.',
                'audioTextEn': 'With our legs we run and jump.',
                'audioTextRu': 'Ногами мы бегаем и прыгаем.',
            },
            'instruction': 'Qaçmaq üçün lazım olan bədən üzvünü seç.',
            'instructionEn': 'Select the body part needed for running.',
            'instructionRu': 'Выбери часть тела, необходимую для бега.',
            'type': 'select',
            'question': 'Qaçmaq və tullanmaq üçün bədənimizin hansı hissəsi lazımdır?',
            'questionEn': 'Which part of our body do we need to run and jump?',
            'questionRu': 'Какая часть тела нужна, чтобы бегать и прыгать?',
            'options': [
                {'id': 'opt-bod-legs-corr', 'text': 'Ayaqlar', 'textEn': 'Legs', 'textRu': 'Ноги', 'emoji': '🦵', 'isCorrect': True},
                {'id': 'opt-bod-ears', 'text': 'Qulaqlar', 'textEn': 'Ears', 'textRu': 'Уши', 'emoji': '👂', 'isCorrect': False},
                {'id': 'opt-bod-nose', 'text': 'Burun', 'textEn': 'Nose', 'textRu': 'Нос', 'emoji': '👃', 'isCorrect': False},
            ],
        },
        {
            'id': 'bod-feet-shoes-2',
            'title': 'Ayaqqabı Geyinmək',
            'titleEn': 'Wearing Shoes',
            'titleRu': 'Обувание',
            'instruction': 'Ayaqqabının geyinildiyi yeri tap.',
            'instructionEn': 'Find where shoes are worn.',
            'instructionRu': 'Найди, куда надевают обувь.',
            'type': 'select',
            'question': 'Ayaqqabını bədənimizin harasına geyinirik?',
            'questionEn': 'Where on our body do we put shoes on?',
            'questionRu': 'Куда на теле мы надеваем обувь?',
            'options': [
                {'id': 'opt-bod-shoes-corr', 'text': 'Ayağa', 'textEn': 'Feet', 'textRu': 'На ноги', 'emoji': '🦶', 'isCorrect': True},
                {'id': 'opt-bod-shoes-head', 'text': 'Başa', 'textEn': 'Head', 'textRu': 'На голову', 'emoji': '🧢', 'isCorrect': False},
                {'id': 'opt-bod-shoes-hands', 'text': 'Ələ', 'textEn': 'Hands', 'textRu': 'На руки', 'emoji': '🧤', 'isCorrect': False},
            ],
        },
        {
            'id': 'bod-toes-3',
            'title': 'Ayaq Barmaqları',
            'titleEn': 'Toes',
            'titleRu': 'Пальцы ног',
            'instruction': 'Ayaqdakı barmaqların sayını tap.',
            'instructionEn': 'Find the number of toes on one foot.',
            'instructionRu': 'Найди количество пальцев на одной ноге.',
            'type': 'select',
            'question': 'Bir ayağımızda neçə barmaq var?',
            'questionEn': 'How many toes are on one foot?',
            'questionRu': 'Сколько пальцев на одной ноге?',
            'options': [
                {'id': 'opt-bod-toes-corr', 'text': '5 Barmaq', 'textEn': '5 Toes', 'textRu': '5 пальцев', 'emoji': '🦶', 'isCorrect': True},
                {'id': 'opt-bod-toes-2', 'text': '2 Barmaq', 'textEn': '2 Toes', 'textRu': '2 пальца', 'emoji': '✌️', 'isCorrect': False},
                {'id': 'opt-bod-toes-10', 'text': '10 Barmaq', 'textEn': '10 Toes', 'textRu': '10 пальцев', 'emoji': '🔟', 'isCorrect': False},
            ],
        },
        {
            'id': 'bod-mouth-1',
            'title': 'Ağız və Təbəssüm',
            'titleEn': 'Mouth and Smile',
            'titleRu': 'Рот и улыбка',
            'lesson': {
                'id': 'bod-lesson-mouth',
                'conceptTitleAz': 'Ağız, Dişlər və Gülümsəmə!',
                'conceptTitleEn': "Mouth, Teeth and Smile!",
                'conceptTitleRu': 'Рот, зубы и улыбка!',
                'explanationAz': 'Ağzımızla danışırıq, dadlı yeməklər yeyirik və ağappaq dişlərimizlə gülümsəyirik!',
                'explanationEn': 'With our mouth we talk, eat delicious food, and smile with white teeth!',
                'explanationRu': 'Ртом мы говорим, кушаем вкусную еду и улыбаемся белоснежными зубками!',
                'bigEmojis': ['👄', '🦷', '👅', '😁'],
                'audioTextAz': 'Ağzımızla danışırıq və dişlərimizlə gülümsəyirik.',
                'audioTextEn': 'We speak with our mouth and smile with our teeth.',
                'audioTextRu': 'Ртом мы говорим, а зубами улыбаемся.',
            },
            'instruction': 'Gülümsədiyimiz üz üzvünü seç.',
            'instructionEn': 'Select the face part we smile with.',
            'instructionRu': 'Выбери часть лица, которой мы улыбаемся.',
            'type': 'select',
            'question': 'Şad olanda nəyimizlə şirin gülümsəyirik?',
            'questionEn': 'What do we sweetly smile with when happy?',
            'questionRu': 'Чем мы радостно улыбаемся, когда счастливы?',
            'options': [
                {'id': 'opt-bod-mouth-corr', 'text': 'Ağzımızla', 'textEn': 'Mouth', 'textRu': 'Ртом', 'emoji': '👄', 'isCorrect': True},
                {'id': 'opt-bod-mouth-ear', 'text': 'Qulağımızla', 'textEn': 'Ear', 'textRu': 'Ухом', 'emoji': '👂', 'isCorrect': False},
                {'id': 'opt-bod-mouth-arm', 'text': 'Qolumuzla', 'textEn': 'Arm', 'textRu': 'Рукой', 'emoji': '💪', 'isCorrect': False},
            ],
        },
        {
            'id': 'bod-teeth-2',
            'title': 'Ağappaq Dişlər',
            'titleEn': 'White Teeth',
            'titleRu': 'Белые зубы',
            'instruction': 'Yeməyi çeynəyən orqanı tap.',
            'instructionEn': 'Find what chews food.',
            'instructionRu': 'Найди, чем пережевывают пищу.',
            'type': 'select',
            'question': 'Yeməyi çeynəmək üçün bizə nə kömək edir?',
            'questionEn': 'What helps us chew our food?',
            'questionRu': 'Что помогает нам пережевывать пищу?',
            'options': [
                {'id': 'opt-bod-teeth-corr', 'text': 'Ağappaq Dişlərimiz', 'textEn': 'White Teeth', 'textRu': 'Белые зубки', 'emoji': '🦷', 'isCorrect': True},
                {'id': 'opt-bod-teeth-eye', 'text': 'Gözümüz', 'textEn': 'Eye', 'textRu': 'Глаз', 'emoji': '👁️', 'isCorrect': False},
                {'id': 'opt-bod-teeth-hair', 'text': 'Saçımız', 'textEn': 'Hair', 'textRu': 'Волосы', 'emoji': '💇', 'isCorrect': False},
            ],
        },
    ],
}

print(f"Defined {len(ADDITIONS)} extension sets.")
