# scripts/ext_cognitive_assemble.py
# Extensions for Cognitive & Motor modules and Master Assembly Script

import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRATCH = os.path.join(ROOT, 'scratch')

from ext_foundations_commands import EXT_FOUNDATIONS_COMMANDS
from ext_speech_social import EXT_SPEECH_SOCIAL

EXT_COGNITIVE = {
    # ── 29. attention-memory (+7 -> 10) ──
    'attention-memory': [
        {
            'id': 'att-find-cat-1',
            'title': 'Ev Heyvanını Tap',
            'titleEn': 'Find Domestic Pet',
            'titleRu': 'Найди домашнего питомца',
            'lesson': {
                'id': 'att-lesson-focus',
                'conceptTitleAz': 'Diqqətli və Müşahidəçi Olaq!',
                'conceptTitleEn': 'Be Attentive and Observant!',
                'conceptTitleRu': 'Будем внимательными и наблюдательными!',
                'explanationAz': 'Şəkillərə diqqətlə baxırıq! Nə dəyişdi, nə çatışmır, hansı əşya fərqlidir? Diqqətli baxsaq, dərhal taparıq!',
                'explanationEn': 'Look closely at pictures! What changed, what is missing, what is different? Observe carefully to find it!',
                'explanationRu': 'Внимательно смотрим на картинки! Что изменилось, чего не хватает, что отличается?',
                'bigEmojis': ['🔍', '🧐', '💡', '🧠'],
                'audioTextAz': 'Diqqətlə baxırıq və fərqi tapırıq.',
                'audioTextEn': 'We look carefully and find the difference.',
                'audioTextRu': 'Внимательно смотрим и находим отличие.',
            },
            'instruction': 'Şəkildə ev heyvanını tap.',
            'instructionEn': 'Find the domestic pet.',
            'instructionRu': 'Найди домашнего питомца.',
            'type': 'select',
            'question': 'Bu heyvanların içində hansı ev heyvanıdır?',
            'questionEn': 'Which one of these animals is a domestic pet?',
            'questionRu': 'Какое из этих животных домашнее?',
            'options': [
                {'id': 'opt-att-pet-cat', 'text': 'Ev Pişiyi', 'textEn': 'Cat', 'textRu': 'Кошка', 'emoji': '🐱', 'isCorrect': True},
                {'id': 'opt-att-pet-tiger', 'text': 'Vəhşi Pələng', 'textEn': 'Tiger', 'textRu': 'Тигр', 'emoji': '🐅', 'isCorrect': False},
                {'id': 'opt-att-pet-croc', 'text': 'Timsah', 'textEn': 'Crocodile', 'textRu': 'Крокодил', 'emoji': '🐊', 'isCorrect': False},
            ],
        },
        {
            'id': 'att-fruit-basket-2',
            'title': 'Səbətdə Artıq Olan',
            'titleEn': 'Odd One in Basket',
            'titleRu': 'Лишнее в корзине',
            'instruction': 'Meyvələrin içində tərəvəzi tap.',
            'instructionEn': 'Find vegetable among fruits.',
            'instructionRu': 'Найди овощ среди фруктов.',
            'type': 'select',
            'question': 'Səbətdə alma, armud və banan var. Hansı tərəvəz bura səhv düşüb?',
            'questionEn': 'In the fruit basket with apples and bananas, which vegetable is mistakenly there?',
            'questionRu': 'В корзине яблоки и бананы. Какой овощ попал туда по ошибке?',
            'options': [
                {'id': 'opt-att-bsk-carrot', 'text': 'Kök', 'textEn': 'Carrot', 'textRu': 'Морковь', 'emoji': '🥕', 'isCorrect': True},
                {'id': 'opt-att-bsk-apple', 'text': 'Alma', 'textEn': 'Apple', 'textRu': 'Яблоко', 'emoji': '🍎', 'isCorrect': False},
                {'id': 'opt-att-bsk-banana', 'text': 'Banan', 'textEn': 'Banana', 'textRu': 'Банан', 'emoji': '🍌', 'isCorrect': False},
            ],
        },
        {
            'id': 'att-find-pair-3',
            'title': 'Çəkmənin Cütünü Tap',
            'titleEn': 'Find Matching Boot',
            'titleRu': 'Найди пару сапогу',
            'instruction': 'Eyni olan cütü seç.',
            'instructionEn': 'Select matching pair.',
            'instructionRu': 'Выбери подходящую пару.',
            'type': 'select',
            'question': 'Qırmızı çəkmənin tayını tap: 👢',
            'questionEn': 'Find the matching red boot: 👢',
            'questionRu': 'Найди пару красному сапогу: 👢',
            'options': [
                {'id': 'opt-att-bt-pair', 'text': 'Qırmızı Çəkmə', 'textEn': 'Red Boot', 'textRu': 'Красный сапог', 'emoji': '👢', 'isCorrect': True},
                {'id': 'opt-att-bt-glove', 'text': 'Mavi Əlcək', 'textEn': 'Blue Glove', 'textRu': 'Синяя перчатка', 'emoji': '🧤', 'isCorrect': False},
                {'id': 'opt-att-bt-hat', 'text': 'Yaşıl Papaq', 'textEn': 'Green Hat', 'textRu': 'Зеленая шляпа', 'emoji': '👒', 'isCorrect': False},
            ],
        },
        {
            'id': 'att-missing-wheel-4',
            'title': 'Maşının Təkəri',
            'titleEn': 'Car Wheel',
            'titleRu': 'Колесо машины',
            'instruction': 'Çatışmayan vacib hissəni tap.',
            'instructionEn': 'Find essential missing part.',
            'instructionRu': 'Найди недостающую часть.',
            'type': 'select',
            'question': 'Avtomobilin getməsi üçün mütləq nəyi olmalıdır?',
            'questionEn': 'What must a car have to drive?',
            'questionRu': 'Что обязательно должно быть у машины, чтобы ехать?',
            'options': [
                {'id': 'opt-att-whl-wheel', 'text': 'Təkərləri', 'textEn': 'Wheels', 'textRu': 'Колеса', 'emoji': '🛞', 'isCorrect': True},
                {'id': 'opt-att-whl-wings', 'text': 'Qanadları', 'textEn': 'Wings', 'textRu': 'Крылья', 'emoji': '🪽', 'isCorrect': False},
                {'id': 'opt-att-whl-sail', 'text': 'Yelkəni', 'textEn': 'Sail', 'textRu': 'Парус', 'emoji': '⛵', 'isCorrect': False},
            ],
        },
        {
            'id': 'att-size-order-5',
            'title': 'Ən Balacanı Tap',
            'titleEn': 'Find the Smallest',
            'titleRu': 'Найди самый маленький',
            'instruction': 'Ən kiçik əşyanı seç.',
            'instructionEn': 'Select the smallest item.',
            'instructionRu': 'Выбери самый маленький предмет.',
            'type': 'select',
            'question': 'Bu əşyaların içində ən kiçiyi hansıdır?',
            'questionEn': 'Which item among these is the smallest?',
            'questionRu': 'Какой предмет из этих самый маленький?',
            'options': [
                {'id': 'opt-att-pea-corr', 'text': 'Balaca yaşıl noxud', 'textEn': 'Tiny green pea', 'textRu': 'Маленькая горошина', 'emoji': '🟢', 'isCorrect': True},
                {'id': 'opt-att-pea-melon', 'text': 'Böyük qarpız', 'textEn': 'Big watermelon', 'textRu': 'Большой арбуз', 'emoji': '🍉', 'isCorrect': False},
                {'id': 'opt-att-pea-apple', 'text': 'Orta alma', 'textEn': 'Medium apple', 'textRu': 'Среднее яблоко', 'emoji': '🍎', 'isCorrect': False},
            ],
        },
        {
            'id': 'att-color-difference-6',
            'title': 'Fərqli Rəngi Tap',
            'titleEn': 'Find Different Color',
            'titleRu': 'Найди другой цвет',
            'instruction': 'Fərqli topu tap.',
            'instructionEn': 'Find odd ball.',
            'instructionRu': 'Найди мяч другого цвета.',
            'type': 'select',
            'question': 'Sarı topların içində fərqli olan hansıdır? 🟡🟡🔵🟡',
            'questionEn': 'Which ball is different among yellow ones? 🟡🟡🔵🟡',
            'questionRu': 'Какой мяч отличается среди желтых? 🟡🟡🔵🟡',
            'options': [
                {'id': 'opt-att-blu-corr', 'text': 'Göy Top', 'textEn': 'Blue Ball', 'textRu': 'Синий мяч', 'emoji': '🔵', 'isCorrect': True},
                {'id': 'opt-att-blu-yel', 'text': 'Sarı Top', 'textEn': 'Yellow Ball', 'textRu': 'Желтый мяч', 'emoji': '🟡', 'isCorrect': False},
                {'id': 'opt-att-blu-star', 'text': 'Ulduz', 'textEn': 'Star', 'textRu': 'Звезда', 'emoji': '⭐', 'isCorrect': False},
            ],
        },
        {
            'id': 'att-shadow-rabbit-7',
            'title': 'Uzun Qulaqlı Kölgə',
            'titleEn': 'Long-eared Shadow',
            'titleRu': 'Тень с длинными ушами',
            'instruction': 'Kölgənin sahibini tap.',
            'instructionEn': 'Find shadow owner.',
            'instructionRu': 'Найди хозяина тени.',
            'type': 'select',
            'question': 'Uzun qulaqlı şən kölgə hansı heyvana məxsusdur?',
            'questionEn': 'Whose shadow has long ears?',
            'questionRu': 'Чья это тень с длинными ушками?',
            'options': [
                {'id': 'opt-att-rbt-corr', 'text': 'Dovşan', 'textEn': 'Rabbit', 'textRu': 'Кролик', 'emoji': '🐰', 'isCorrect': True},
                {'id': 'opt-att-rbt-turt', 'text': 'Tısbağa', 'textEn': 'Turtle', 'textRu': 'Черепаха', 'emoji': '🐢', 'isCorrect': False},
                {'id': 'opt-att-rbt-fish', 'text': 'Balıq', 'textEn': 'Fish', 'textRu': 'Рыбка', 'emoji': '🐟', 'isCorrect': False},
            ],
        },
    ],

    # ── 30. auditory-attention (+7 -> 10) ──
    'auditory-attention': [
        {
            'id': 'aud-thunder-1',
            'title': 'Şimşək Gurultusu',
            'titleEn': 'Thunder Rumble',
            'titleRu': 'Гром',
            'lesson': {
                'id': 'aud-lesson-rhythm',
                'conceptTitleAz': 'Səsləri Dinləyək və Ritmi Hiss Edək!',
                'conceptTitleEn': "Let's Listen to Sounds and Feel Rhythm!",
                'conceptTitleRu': 'Слушаем звуки и чувствуем ритм!',
                'explanationAz': 'Bəzi səslər bərk, bəzi səslər astadır! Şimşək bərk guruldayır, pıçıltı isə asta eşidilir!',
                'explanationEn': 'Some sounds are loud, some are soft! Thunder is loud, whisper is soft!',
                'explanationRu': 'Некоторые звуки громкие, некоторые тихие! Гром гремит громко, шепот слышен тихо!',
                'bigEmojis': ['🎵', '🥁', '🔔', '🎶'],
                'audioTextAz': 'Bərk və asta səsləri dinləyib fərqləndiririk.',
                'audioTextEn': 'We listen and distinguish loud and quiet sounds.',
                'audioTextRu': 'Слушаем и различаем громкие и тихие звуки.',
            },
            'instruction': 'Gur səsi tap.',
            'instructionEn': 'Find loud sound.',
            'instructionRu': 'Найди громкий звук.',
            'type': 'select',
            'question': 'Göydə şimşək çaxanda hansı gur səs eşidilir?',
            'questionEn': 'What loud sound is heard when lightning strikes?',
            'questionRu': 'Какой громкий звук слышен при грозе?',
            'options': [
                {'id': 'opt-aud-thn-corr', 'text': 'Bərk gurultu: Qum-qum!', 'textEn': 'Loud rumble: Boom!', 'textRu': 'Громкий грохот: Бабах!', 'emoji': '⚡', 'isCorrect': True},
                {'id': 'opt-aud-thn-whisp', 'text': 'Asta pıçıltı', 'textEn': 'Soft whisper', 'textRu': 'Тихий шепот', 'emoji': '🤫', 'isCorrect': False},
                {'id': 'opt-aud-thn-chirp', 'text': 'Cik-cik', 'textEn': 'Chirp chirp', 'textRu': 'Чик-чирик', 'emoji': '🐥', 'isCorrect': False},
            ],
        },
        {
            'id': 'aud-whisper-2',
            'title': 'Asta Pıçıltı',
            'titleEn': 'Quiet Whisper',
            'titleRu': 'Тихий шепот',
            'instruction': 'Asta səsi seç.',
            'instructionEn': 'Select quiet sound.',
            'instructionRu': 'Выбери тихий звук.',
            'type': 'select',
            'question': 'Biri gizli söz deyəndə necə danışır?',
            'questionEn': 'How does someone speak when sharing a secret?',
            'questionRu': 'Как говорят, когда делятся секретом?',
            'options': [
                {'id': 'opt-aud-whs-corr', 'text': 'Asta pıçıltı ilə', 'textEn': 'Quiet whisper', 'textRu': 'Тихим шепотом', 'emoji': '🤫', 'isCorrect': True},
                {'id': 'opt-aud-whs-horn', 'text': 'Şeypur kimi bərk', 'textEn': 'Loud like horn', 'textRu': 'Громко как труба', 'emoji': '🎺', 'isCorrect': False},
                {'id': 'opt-aud-whs-drum', 'text': 'Baraban kimi', 'textEn': 'Like drum', 'textRu': 'Как барабан', 'emoji': '🥁', 'isCorrect': False},
            ],
        },
        {
            'id': 'aud-door-knock-3',
            'title': 'Qapı Döyülməsi',
            'titleEn': 'Door Knock',
            'titleRu': 'Стук в дверь',
            'instruction': 'Qapının səsini tap.',
            'instructionEn': 'Find door sound.',
            'instructionRu': 'Найди звук двери.',
            'type': 'select',
            'question': 'Qapı döyüləndə hansı səs çıxır?',
            'questionEn': 'What sound comes when someone knocks on the door?',
            'questionRu': 'Какой звук, когда стучат в дверь?',
            'options': [
                {'id': 'opt-aud-knk-corr', 'text': 'Taq-taq-taq!', 'textEn': 'Knock knock!', 'textRu': 'Тук-тук-тук!', 'emoji': '🚪', 'isCorrect': True},
                {'id': 'opt-aud-knk-whr', 'text': 'Vııı-vııı', 'textEn': 'Vroom vroom', 'textRu': 'Вжж-вжж', 'emoji': '🚗', 'isCorrect': False},
                {'id': 'opt-aud-knk-drip', 'text': 'Şır-şır', 'textEn': 'Drip drop', 'textRu': 'Кап-кап', 'emoji': '💧', 'isCorrect': False},
            ],
        },
        {
            'id': 'aud-guitar-strum-4',
            'title': 'Gözəl Gitara',
            'titleEn': 'Guitar Strings',
            'titleRu': 'Гитара',
            'instruction': 'Simli musiqi alətini tap.',
            'instructionEn': 'Find string instrument.',
            'instructionRu': 'Найди струнный инструмент.',
            'type': 'select',
            'question': 'Barmaqla simlərinə toxunduqda gözəl musiqi çalan alət hansıdır?',
            'questionEn': 'Which instrument plays music when fingers strum strings?',
            'questionRu': 'Какой инструмент играет красивую музыку, когда перебирают струны?',
            'options': [
                {'id': 'opt-aud-gtr-corr', 'text': 'Gitara', 'textEn': 'Guitar', 'textRu': 'Гитара', 'emoji': '🎸', 'isCorrect': True},
                {'id': 'opt-aud-gtr-drum', 'text': 'Baraban', 'textEn': 'Drum', 'textRu': 'Барабан', 'emoji': '🥁', 'isCorrect': False},
                {'id': 'opt-aud-gtr-horn', 'text': 'Şeypur', 'textEn': 'Horn', 'textRu': 'Труба', 'emoji': '🪈', 'isCorrect': False},
            ],
        },
        {
            'id': 'aud-car-horn-5',
            'title': 'Avtomobil Siqnalı',
            'titleEn': 'Car Horn',
            'titleRu': 'Автомобильный сигнал',
            'instruction': 'Maşın siqnalını tap.',
            'instructionEn': 'Find car horn.',
            'instructionRu': 'Найди автомобильный сигнал.',
            'type': 'select',
            'question': 'Yolda xəbərdarlıq edən avtomobil siqnalı necə səslənir?',
            'questionEn': 'How does a car horn sound on the road?',
            'questionRu': 'Как звучит автомобильный клаксон на дороге?',
            'options': [
                {'id': 'opt-aud-hrn-corr', 'text': 'Bip-biiip!', 'textEn': 'Beep beep!', 'textRu': 'Бип-бииип!', 'emoji': '🚗', 'isCorrect': True},
                {'id': 'opt-aud-hrn-coo', 'text': 'Qu-qu', 'textEn': 'Coo-coo', 'textRu': 'Ку-ку', 'emoji': '🐦', 'isCorrect': False},
                {'id': 'opt-aud-hrn-drip', 'text': 'Tıp-tıp', 'textEn': 'Tip-tip', 'textRu': 'Кап-кап', 'emoji': '💧', 'isCorrect': False},
            ],
        },
        {
            'id': 'aud-water-splash-6',
            'title': 'Su Şappıltısı',
            'titleEn': 'Water Splash',
            'titleRu': 'Всплеск воды',
            'instruction': 'Suyun səsini tap.',
            'instructionEn': 'Find splash sound.',
            'instructionRu': 'Найди звук всплеска.',
            'type': 'select',
            'question': 'Suya daş atanda hansı səs eşidilir?',
            'questionEn': 'What sound is heard when throwing stone in water?',
            'questionRu': 'Какой звук, когда бросаешь камень в воду?',
            'options': [
                {'id': 'opt-aud-spl-corr', 'text': 'Şappıltı: Şapp!', 'textEn': 'Splash: Plop!', 'textRu': 'Всплеск: Бульк!', 'emoji': '💦', 'isCorrect': True},
                {'id': 'opt-aud-spl-chirp', 'text': 'Cik-cik', 'textEn': 'Chirp', 'textRu': 'Чик-чирик', 'emoji': '🐤', 'isCorrect': False},
                {'id': 'opt-aud-spl-buzz', 'text': 'Vzzz-vzzz', 'textEn': 'Buzz', 'textRu': 'Жжжж', 'emoji': '🐝', 'isCorrect': False},
            ],
        },
        {
            'id': 'aud-applause-clap-7',
            'title': 'Gur Alqışlar',
            'titleEn': 'Loud Applause',
            'titleRu': 'Громкие аплодисменты',
            'instruction': 'Alqış səsini tap.',
            'instructionEn': 'Find applause sound.',
            'instructionRu': 'Найди звук аплодисментов.',
            'type': 'select',
            'question': 'Uşaqlar şeir oxuyub bitirdikdə hamı necə səs çıxarır?',
            'questionEn': 'What sound does everyone make after reciting poem?',
            'questionRu': 'Какие звуки издают все после прочтения стихотворения?',
            'options': [
                {'id': 'opt-aud-clp-corr', 'text': 'Gur alqışlar: Şaq-şaq!', 'textEn': 'Loud applause: Clap clap!', 'textRu': 'Громкие аплодисменты: Хлоп-хлоп!', 'emoji': '👏', 'isCorrect': True},
                {'id': 'opt-aud-clp-silent', 'text': 'Tam sükut', 'textEn': 'Complete silence', 'textRu': 'Полная тишина', 'emoji': '🤫', 'isCorrect': False},
                {'id': 'opt-aud-clp-snore', 'text': 'Xoruldamaq', 'textEn': 'Snoring', 'textRu': 'Храп', 'emoji': '😴', 'isCorrect': False},
            ],
        },
    ],

    # ── 31. fine-motor (+7 -> 10) ── All with VisualScene tracing!
    'fine-motor': [
        {
            'id': 'mot-trace-circle-sun-1',
            'title': 'Günəşin Dairəvi Xətti',
            'titleEn': 'Sun Circle Tracing',
            'titleRu': 'Круг вокруг солнца',
            'lesson': {
                'id': 'mot-lesson-curves',
                'conceptTitleAz': 'Əyri və Dairəvi Cizgiləri Çəkək!',
                'conceptTitleEn': "Let's Trace Curves and Circles!",
                'conceptTitleRu': 'Рисуем кривые и круговые линии!',
                'explanationAz': 'Barmağımızla xətləri izləyirik! Dairəvi fırlanırıq, dalğalarla üzürük, ziqzaqla qalxırıq!',
                'explanationEn': 'We trace lines with our fingers! Circles, waves, and zigzags help our handwriting!',
                'explanationRu': 'Пальчиком ведем по линиям! Круги, волны и зигзаги готовят руку к письму!',
                'bigEmojis': ['🌀', '⭕', '〰️', '✍️'],
                'audioTextAz': 'Barmağımızla xətləri diqqətlə izləyirik.',
                'audioTextEn': 'We trace lines carefully with our finger.',
                'audioTextRu': 'Пальчиком аккуратно ведем по линиям.',
            },
            'visualScene': {
                'type': 'tracing',
                'startEmoji': '☀️',
                'targetEmoji': '🌻',
                'pathType': 'loop',
                'captionAz': 'Barmaq hərəkəti: Günəşdən günəbaxana doğru dairəvi cizgi',
                'captionEn': 'Finger tracing: Circular loop from sun to sunflower',
                'captionRu': 'Движение пальца: Круговая линия от солнца к подсолнуху',
            },
            'instruction': 'Barmağınla dairəvi cizgini izlə.',
            'instructionEn': 'Trace circular line with finger.',
            'instructionRu': 'Проведи пальчиком по круговой линии.',
            'type': 'select',
            'question': 'Şəklə bax: Günəşin ətrafında hansı xətt var?',
            'questionEn': 'Look at scene: What path leads from sun to sunflower?',
            'questionRu': 'Какая линия ведет от солнца к подсолнуху?',
            'options': [
                {'id': 'opt-mot-cr-loop', 'text': 'Dairəvi Halqa Xətti', 'textEn': 'Circular Loop', 'textRu': 'Круговая линия', 'emoji': '⭕', 'isCorrect': True},
                {'id': 'opt-mot-cr-zig', 'text': 'Ziqzaq Xətt', 'textEn': 'Zigzag', 'textRu': 'Зигзаг', 'emoji': '⚡', 'isCorrect': False},
                {'id': 'opt-mot-cr-dot', 'text': 'Nöqtə', 'textEn': 'Dot', 'textRu': 'Точка', 'emoji': '▪️', 'isCorrect': False},
            ],
        },
        {
            'id': 'mot-trace-spiral-snail-2',
            'title': 'İlbizin Spiral Evi',
            'titleEn': 'Snail Spiral',
            'titleRu': 'Спираль улитки',
            'visualScene': {
                'type': 'tracing',
                'startEmoji': '🐌',
                'targetEmoji': '🌿',
                'pathType': 'loop',
                'captionAz': 'Barmaq hərəkəti: İlbizin çanağı üzrə spiral cizgi',
                'captionEn': 'Finger tracing: Spiral path along snail shell',
                'captionRu': 'Движение пальца: Спиральная линия по панцирю улитки',
            },
            'instruction': 'Spiral xətti barmağınla tamamla.',
            'instructionEn': 'Trace spiral path with finger.',
            'instructionRu': 'Проведи по спирали пальчиком.',
            'type': 'select',
            'question': 'İlbizin çanağı hansı formadadır?',
            'questionEn': 'What shape is the snail shell?',
            'questionRu': 'Какая форма у панциря улитки?',
            'options': [
                {'id': 'opt-mot-snl-spiral', 'text': 'Qıvrım Spiral', 'textEn': 'Spiral', 'textRu': 'Спираль', 'emoji': '🌀', 'isCorrect': True},
                {'id': 'opt-mot-snl-str', 'text': 'Düz Xətt', 'textEn': 'Straight line', 'textRu': 'Прямая', 'emoji': '➖', 'isCorrect': False},
                {'id': 'opt-mot-snl-sq', 'text': 'Kvadrat', 'textEn': 'Square', 'textRu': 'Квадрат', 'emoji': '🔲', 'isCorrect': False},
            ],
        },
        {
            'id': 'mot-trace-lightning-3',
            'title': 'İldırım Ziqzaqı',
            'titleEn': 'Lightning Zigzag',
            'titleRu': 'Зигзаг молнии',
            'visualScene': {
                'type': 'tracing',
                'startEmoji': '☁️',
                'targetEmoji': '🌲',
                'pathType': 'zigzag',
                'captionAz': 'Barmaq hərəkəti: Buluddan meşəyə doğru ziqzaq cizgi',
                'captionEn': 'Finger tracing: Zigzag path from cloud to forest',
                'captionRu': 'Движение пальца: Зигзаг от тучи к лесу',
            },
            'instruction': 'Ziqzaq xətti barmaqla çək.',
            'instructionEn': 'Trace zigzag path with finger.',
            'instructionRu': 'Проведи пальчиком зигзаг.',
            'type': 'select',
            'question': 'Şəklə bax: Buluddan meşəyə hansı xətt enir?',
            'questionEn': 'Which path descends from cloud to forest?',
            'questionRu': 'Какая линия спускается от тучи к лесу?',
            'options': [
                {'id': 'opt-mot-lgt-zig', 'text': 'İti Ziqzaq Xətt', 'textEn': 'Sharp Zigzag', 'textRu': 'Острый зигзаг', 'emoji': '⚡', 'isCorrect': True},
                {'id': 'opt-mot-lgt-circ', 'text': 'Dairəvi Xətt', 'textEn': 'Circle', 'textRu': 'Круг', 'emoji': '⭕', 'isCorrect': False},
                {'id': 'opt-mot-lgt-sq', 'text': 'Kvadrat Xətt', 'textEn': 'Square', 'textRu': 'Квадратная', 'emoji': '⬛', 'isCorrect': False},
            ],
        },
        {
            'id': 'mot-trace-fish-wave-4',
            'title': 'Dəniz Dalğası',
            'titleEn': 'Sea Wave',
            'titleRu': 'Морская волна',
            'visualScene': {
                'type': 'tracing',
                'startEmoji': '🐟',
                'targetEmoji': '🏝️',
                'pathType': 'wave',
                'captionAz': 'Barmaq hərəkəti: Balığın adaya doğru dalğalı üzüşü',
                'captionEn': 'Finger tracing: Wavy path from fish to island',
                'captionRu': 'Движение пальца: Волнистая линия от рыбки к острову',
            },
            'instruction': 'Dalğalı xətti barmaqla çək.',
            'instructionEn': 'Trace wavy path.',
            'instructionRu': 'Проведи волнистую линию.',
            'type': 'select',
            'question': 'Dənizdə balıq hansı xətlə üzür?',
            'questionEn': 'What line does the fish swim along in sea?',
            'questionRu': 'По какой линии плывет рыбка в море?',
            'options': [
                {'id': 'opt-mot-fsh-wave', 'text': 'Dalğalı Xətt', 'textEn': 'Wavy Line', 'textRu': 'Волнистая линия', 'emoji': '🌊', 'isCorrect': True},
                {'id': 'opt-mot-fsh-str', 'text': 'Düz Xətt', 'textEn': 'Straight line', 'textRu': 'Прямая', 'emoji': '➖', 'isCorrect': False},
                {'id': 'opt-mot-fsh-box', 'text': 'Qutu Xətt', 'textEn': 'Box line', 'textRu': 'Коробка', 'emoji': '📦', 'isCorrect': False},
            ],
        },
        {
            'id': 'mot-trace-mountain-5',
            'title': 'Dağ Zirvələri',
            'titleEn': 'Mountain Peaks',
            'titleRu': 'Горные вершины',
            'visualScene': {
                'type': 'tracing',
                'startEmoji': '🏕️',
                'targetEmoji': '🏔️',
                'pathType': 'zigzag',
                'captionAz': 'Barmaq hərəkəti: Düşərgədən dağ zirvəsinə ziqzaq dırmaşmaq',
                'captionEn': 'Finger tracing: Climbing zigzag to mountain peak',
                'captionRu': 'Движение пальца: Подъем зигзагом к вершине горы',
            },
            'instruction': 'Dağa doğru xətti izlə.',
            'instructionEn': 'Trace path to mountain.',
            'instructionRu': 'Проведи линию к горе.',
            'type': 'select',
            'question': 'Dağın zirvəsinə qalxan künclü cizgi hansıdır?',
            'questionEn': 'Which pointed line climbs to mountain peak?',
            'questionRu': 'Какая линия поднимается к вершине горы?',
            'options': [
                {'id': 'opt-mot-mnt-zig', 'text': 'Ziqzaq Xətt', 'textEn': 'Zigzag Line', 'textRu': 'Зигзагообразная линия', 'emoji': '⛰️', 'isCorrect': True},
                {'id': 'opt-mot-mnt-loop', 'text': 'Halqa Xətti', 'textEn': 'Loop', 'textRu': 'Петля', 'emoji': '⭕', 'isCorrect': False},
                {'id': 'opt-mot-mnt-dot', 'text': 'Nöqtə', 'textEn': 'Dot', 'textRu': 'Точка', 'emoji': '▪️', 'isCorrect': False},
            ],
        },
        {
            'id': 'mot-trace-butterfly-6',
            'title': 'Kəpənəyin Qıvrım Yolu',
            'titleEn': 'Butterfly Swirl',
            'titleRu': 'Полет бабочки',
            'visualScene': {
                'type': 'tracing',
                'startEmoji': '🦋',
                'targetEmoji': '🌺',
                'pathType': 'wave',
                'captionAz': 'Barmaq hərəkəti: Kəpənəkdən çiçəyə dalğalı uçuş',
                'captionEn': 'Finger tracing: Wavy flutter from butterfly to flower',
                'captionRu': 'Движение пальца: Волнистый полет бабочки к цветку',
            },
            'instruction': 'Kəpənəyin yolunu barmaqla çək.',
            'instructionEn': 'Trace butterfly path with finger.',
            'instructionRu': 'Проведи пальчиком путь бабочки.',
            'type': 'select',
            'question': 'Kəpənək çiçəyə doğru necə uçur?',
            'questionEn': 'How does butterfly fly to the flower?',
            'questionRu': 'Как бабочка летит к цветку?',
            'options': [
                {'id': 'opt-mot-btf-wave', 'text': 'Dalğalı və şən xətlə', 'textEn': 'Wavy playful line', 'textRu': 'Волнистой веселой линией', 'emoji': '〰️', 'isCorrect': True},
                {'id': 'opt-mot-btf-stop', 'text': 'Hərəkətsiz', 'textEn': 'Motionless', 'textRu': 'Неподвижно', 'emoji': '🛑', 'isCorrect': False},
                {'id': 'opt-mot-btf-down', 'text': 'Aşağı düz', 'textEn': 'Straight down', 'textRu': 'Прямо вниз', 'emoji': '⬇️', 'isCorrect': False},
            ],
        },
        {
            'id': 'mot-trace-plane-loop-7',
            'title': 'Təyyarə Halqası',
            'titleEn': 'Airplane Loop',
            'titleRu': 'Петля самолета',
            'visualScene': {
                'type': 'tracing',
                'startEmoji': '✈️',
                'targetEmoji': '🛬',
                'pathType': 'loop',
                'captionAz': 'Barmaq hərəkəti: Təyyarənin göydə çəkdiyi halqavari xətt',
                'captionEn': 'Finger tracing: Loop path in the sky to landing',
                'captionRu': 'Движение пальца: Петля самолета в небе к посадке',
            },
            'instruction': 'Halqavari xətti barmaqla çək.',
            'instructionEn': 'Trace loop path.',
            'instructionRu': 'Проведи петлю пальчиком.',
            'type': 'select',
            'question': 'Təyyarə enişdən əvvəl göydə hansı fiquru cızır?',
            'questionEn': 'What shape does the plane draw before landing?',
            'questionRu': 'Какую фигуру описывает самолет перед посадкой?',
            'options': [
                {'id': 'opt-mot-pln-loop', 'text': 'Gözəl Halqa Xətti', 'textEn': 'Loop line', 'textRu': 'Красивую петлю', 'emoji': '➰', 'isCorrect': True},
                {'id': 'opt-mot-pln-cube', 'text': 'Kub', 'textEn': 'Cube', 'textRu': 'Куб', 'emoji': '🧊', 'isCorrect': False},
                {'id': 'opt-mot-pln-cross', 'text': 'Xaç', 'textEn': 'Cross', 'textRu': 'Крест', 'emoji': '✖️', 'isCorrect': False},
            ],
        },
    ],

    # ── 32. movements (+7 -> 10) ──
    'movements': [
        {
            'id': 'mov-run-place-1',
            'title': 'Yerində Qaçış',
            'titleEn': 'Run in Place',
            'titleRu': 'Бег на месте',
            'lesson': {
                'id': 'mov-lesson-energy',
                'conceptTitleAz': 'Sağlam və Çevik Hərəkətlər!',
                'conceptTitleEn': 'Healthy and Agile Movements!',
                'conceptTitleRu': 'Здоровые и ловкие движения!',
                'explanationAz': 'İdman hərəkətləri ürəyimizi sevindirir və əzələlərimizi gücləndirir! Hərəkətdə sağlamlıq var!',
                'explanationEn': 'Exercises bring joy to our heart and strengthen muscles! Movement is health!',
                'explanationRu': 'Упражнения радуют сердце и укрепляют мышцы! Движение — это здоровье!',
                'bigEmojis': ['🤸', '🏃', '🧘', '🕺'],
                'audioTextAz': 'Hərəkət edirik, güclü və sağlam oluruq.',
                'audioTextEn': 'We move, get strong and stay healthy.',
                'audioTextRu': 'Мы двигаемся, становимся сильными и здоровыми.',
            },
            'instruction': 'Yerində qaçış hərəkətini et.',
            'instructionEn': 'Run in place.',
            'instructionRu': 'Беги на месте.',
            'type': 'command',
            'question': 'Olduğun yerdə 5 saniyə sürətlə qaç!',
            'questionEn': 'Run in place fast for 5 seconds!',
            'questionRu': 'Беги быстро на месте 5 секунд!',
            'options': [
                {'id': 'opt-mov-run-corr', 'text': 'Qaçmaq', 'textEn': 'Running', 'textRu': 'Бежать', 'emoji': '🏃', 'isCorrect': True},
                {'id': 'opt-mov-run-lie', 'text': 'Uzanmaq', 'textEn': 'Lying down', 'textRu': 'Лежать', 'emoji': '🛌', 'isCorrect': False},
                {'id': 'opt-mov-run-freeze', 'text': 'Donub qalmaq', 'textEn': 'Freezing', 'textRu': 'Замереть', 'emoji': '🛑', 'isCorrect': False},
            ],
        },
        {
            'id': 'mov-touch-toes-2',
            'title': 'Əyil və Toxun',
            'titleEn': 'Bend and Touch Toes',
            'titleRu': 'Наклонись к носочкам',
            'instruction': 'Əyilmək hərəkətini yerinə yetir.',
            'instructionEn': 'Perform bending.',
            'instructionRu': 'Выполни наклон.',
            'type': 'command',
            'question': 'Dizlərini bükmədən əyil və ayaq barmaqlarına toxun!',
            'questionEn': 'Bend down without bending knees and touch toes!',
            'questionRu': 'Наклонись не сгибая колени и коснись пальцев ног!',
            'options': [
                {'id': 'opt-mov-toe-bend', 'text': 'Əyilmək', 'textEn': 'Bending', 'textRu': 'Наклониться', 'emoji': '🙇', 'isCorrect': True},
                {'id': 'opt-mov-toe-jump', 'text': 'Tullanmaq', 'textEn': 'Jumping', 'textRu': 'Прыгать', 'emoji': '🦘', 'isCorrect': False},
                {'id': 'opt-mov-toe-spin', 'text': 'Fırlanmaq', 'textEn': 'Spinning', 'textRu': 'Кружиться', 'emoji': '🌀', 'isCorrect': False},
            ],
        },
        {
            'id': 'mov-star-jump-3',
            'title': 'Ulduz Tullanışı',
            'titleEn': 'Star Jump',
            'titleRu': 'Прыжок звездочка',
            'instruction': 'Ulduz hərəkətini et.',
            'instructionEn': 'Do star jump.',
            'instructionRu': 'Сделай прыжок-звездочку.',
            'type': 'command',
            'question': 'Qollarını və ayaqlarını geniş açıb ulduz kimi tullan!',
            'questionEn': 'Spread arms and legs wide and jump like a star!',
            'questionRu': 'Широко расставь руки и ноги и подпрыгни как звездочка!',
            'options': [
                {'id': 'opt-mov-str-corr', 'text': 'Ulduz tullanışı', 'textEn': 'Star jump', 'textRu': 'Прыжок звездочкой', 'emoji': '⭐', 'isCorrect': True},
                {'id': 'opt-mov-str-sleep', 'text': 'Yuxuya getmək', 'textEn': 'Sleep', 'textRu': 'Спать', 'emoji': '😴', 'isCorrect': False},
                {'id': 'opt-mov-str-sit', 'text': 'Oturmaq', 'textEn': 'Sit', 'textRu': 'Сидеть', 'emoji': '🪑', 'isCorrect': False},
            ],
        },
        {
            'id': 'mov-spin-circle-4',
            'title': 'Yerində Fırlan',
            'titleEn': 'Spin Around',
            'titleRu': 'Покружись',
            'instruction': 'Fırlanmaq komandası.',
            'instructionEn': 'Spin command.',
            'instructionRu': 'Команда покружиться.',
            'type': 'command',
            'question': 'Yerində yavaşca bir tam dairə vuraraq fırlan!',
            'questionEn': 'Spin around slowly one full circle on the spot!',
            'questionRu': 'Медленно покружись один раз вокруг себя!',
            'options': [
                {'id': 'opt-mov-spn-corr', 'text': 'Fırlanmaq', 'textEn': 'Spinning', 'textRu': 'Кружиться', 'emoji': '🌀', 'isCorrect': True},
                {'id': 'opt-mov-spn-str', 'text': 'Düz getmək', 'textEn': 'Walk straight', 'textRu': 'Идти прямо', 'emoji': '🚶', 'isCorrect': False},
                {'id': 'opt-mov-spn-shut', 'text': 'Gözü yummaq', 'textEn': 'Close eyes', 'textRu': 'Закрыть глаза', 'emoji': '🙈', 'isCorrect': False},
            ],
        },
        {
            'id': 'mov-balance-stork-5',
            'title': 'Bir Ayaqda Leylək',
            'titleEn': 'Stork on One Foot',
            'titleRu': 'Аист на одной ноге',
            'instruction': 'Müvazinət saxla.',
            'instructionEn': 'Keep balance.',
            'instructionRu': 'Держи равновесие.',
            'type': 'command',
            'question': 'Bir ayağın üstündə leylək kimi 5 saniyə dayan!',
            'questionEn': 'Stand on one foot like a stork for 5 seconds!',
            'questionRu': 'Постой на одной ноге как аист 5 секунд!',
            'options': [
                {'id': 'opt-mov-stk-corr', 'text': 'Bir ayaqda durmaq', 'textEn': 'Stand on one foot', 'textRu': 'Стоять на одной ноге', 'emoji': '🦩', 'isCorrect': True},
                {'id': 'opt-mov-stk-run', 'text': 'Qaçmaq', 'textEn': 'Run', 'textRu': 'Бежать', 'emoji': '🏃', 'isCorrect': False},
                {'id': 'opt-mov-stk-sit', 'text': 'Oturmaq', 'textEn': 'Sit', 'textRu': 'Сесть', 'emoji': '🪑', 'isCorrect': False},
            ],
        },
        {
            'id': 'mov-march-soldier-6',
            'title': 'Cəsur Addımla',
            'titleEn': 'Marching Steps',
            'titleRu': 'Маршируй',
            'instruction': 'Dizləri qaldıraraq addımla.',
            'instructionEn': 'March lifting knees.',
            'instructionRu': 'Маршируй поднимая колени.',
            'type': 'command',
            'question': 'Dizlərini hündürə qaldıraraq yerində addımla!',
            'questionEn': 'March on the spot lifting your knees high!',
            'questionRu': 'Маршируй на месте, высоко поднимая колени!',
            'options': [
                {'id': 'opt-mov-mch-corr', 'text': 'Cəsur addımlamaq', 'textEn': 'Brave marching', 'textRu': 'Маршировать', 'emoji': '💂', 'isCorrect': True},
                {'id': 'opt-mov-mch-crw', 'text': 'Sürünmək', 'textEn': 'Crawl', 'textRu': 'Ползать', 'emoji': '🐛', 'isCorrect': False},
                {'id': 'opt-mov-mch-swg', 'text': 'Yellənmək', 'textEn': 'Swing', 'textRu': 'Качаться', 'emoji': '🪑', 'isCorrect': False},
            ],
        },
        {
            'id': 'mov-happy-dance-7',
            'title': 'Şən Rəqs',
            'titleEn': 'Happy Dance',
            'titleRu': 'Веселый танец',
            'instruction': 'Rəqs etmək komandası.',
            'instructionEn': 'Dance command.',
            'instructionRu': 'Команда танцевать.',
            'type': 'command',
            'question': 'Şən musiqi sədaları altında sevinclə rəqs et!',
            'questionEn': 'Joyfully dance to the happy music!',
            'questionRu': 'Весело потанцуй под музыку!',
            'options': [
                {'id': 'opt-mov-dnc-corr', 'text': 'Şən rəqs etmək', 'textEn': 'Happy dance', 'textRu': 'Весело танцевать', 'emoji': '🕺', 'isCorrect': True},
                {'id': 'opt-mov-dnc-sit', 'text': 'Susub oturmaq', 'textEn': 'Sit quietly', 'textRu': 'Сидеть тихо', 'emoji': '🤫', 'isCorrect': False},
                {'id': 'opt-mov-dnc-frz', 'text': 'Donub qalmaq', 'textEn': 'Freeze', 'textRu': 'Замереть', 'emoji': '🧊', 'isCorrect': False},
            ],
        },
    ],

    # ── 34. logic (+6 -> 10) ──
    'logic': [
        {
            'id': 'log-cow-milk-1',
            'title': 'Süd Haradan Gəlir?',
            'titleEn': 'Where Milk Comes From?',
            'titleRu': 'Откуда берется молоко?',
            'lesson': {
                'id': 'log-lesson-connections',
                'conceptTitleAz': 'Məntiqi Fikirləşək və Əlaqələri Tapaq!',
                'conceptTitleEn': "Let's Think Logically and Find Connections!",
                'conceptTitleRu': 'Думаем логически и находим связи!',
                'explanationAz': 'Hər əşyanın öz yeri, hər hadisənin öz səbəbi var! Nə nədən hazırlanır? Kim harada yaşayır?',
                'explanationEn': 'Everything has its place and cause! What is made from what? Who lives where?',
                'explanationRu': 'У каждой вещи свое место и причина! Что из чего сделано? Кто где живет?',
                'bigEmojis': ['🧠', '💡', '🧩', '🎯'],
                'audioTextAz': 'Məntiqi əlaqələri tapırıq və fikirləşirik.',
                'audioTextEn': 'We find logical connections and think.',
                'audioTextRu': 'Находим логические связи и размышляем.',
            },
            'instruction': 'Məntiqi əlaqəni tap.',
            'instructionEn': 'Find logical connection.',
            'instructionRu': 'Найди логическую связь.',
            'type': 'select',
            'question': 'Dadlı və ağ süd bizə hansı heyvandan gəlir?',
            'questionEn': 'Which animal gives us tasty white milk?',
            'questionRu': 'Какое животное дает нам вкусное белое молоко?',
            'options': [
                {'id': 'opt-log-mlk-cow', 'text': 'İnəkdən', 'textEn': 'From cow', 'textRu': 'От коровы', 'emoji': '🐮', 'isCorrect': True},
                {'id': 'opt-log-mlk-hen', 'text': 'Toyuqdan', 'textEn': 'From hen', 'textRu': 'От курицы', 'emoji': '🐔', 'isCorrect': False},
                {'id': 'opt-log-mlk-cat', 'text': 'Pişikdən', 'textEn': 'From cat', 'textRu': 'От кошки', 'emoji': '🐱', 'isCorrect': False},
            ],
        },
        {
            'id': 'log-wool-sweater-2',
            'title': 'İsti Yun Sviter',
            'titleEn': 'Warm Wool Sweater',
            'titleRu': 'Теплый шерстяной свитер',
            'instruction': 'Yun ilə əlaqəli əşyanı tap.',
            'instructionEn': 'Find item made of wool.',
            'instructionRu': 'Найди вещь из шерсти.',
            'type': 'select',
            'question': 'Qoyunun yumşaq yunundan nə toxuyurlar?',
            'questionEn': 'What is knitted from sheep soft wool?',
            'questionRu': 'Что вяжут из мягкой овечьей шерсти?',
            'options': [
                {'id': 'opt-log-wol-swt', 'text': 'İsti sviter və corab', 'textEn': 'Warm sweater & socks', 'textRu': 'Теплый свитер и носки', 'emoji': '🧶', 'isCorrect': True},
                {'id': 'opt-log-wol-gls', 'text': 'Şüşə stəkan', 'textEn': 'Glass cup', 'textRu': 'Стеклянный стакан', 'emoji': '🥛', 'isCorrect': False},
                {'id': 'opt-log-wol-door', 'text': 'Dəmir qapı', 'textEn': 'Iron door', 'textRu': 'Железную дверь', 'emoji': '🚪', 'isCorrect': False},
            ],
        },
        {
            'id': 'log-bird-nest-3',
            'title': 'Quşun Evi',
            'titleEn': 'Bird Home',
            'titleRu': 'Дом птицы',
            'instruction': 'Quşun yumurtasını qoruduğu yeri seç.',
            'instructionEn': 'Select where bird protects eggs.',
            'instructionRu': 'Выбери, где птица хранит яйца.',
            'type': 'select',
            'question': 'Quş öz yumurtalarını və balalarını harada qoruyur?',
            'questionEn': 'Where does the bird protect its eggs and chicks?',
            'questionRu': 'Где птица оберегает яйца и птенцов?',
            'options': [
                {'id': 'opt-log-nst-corr', 'text': 'Ağacdakı yuvada', 'textEn': 'In tree nest', 'textRu': 'В гнезде на дереве', 'emoji': '🪹', 'isCorrect': True},
                {'id': 'opt-log-nst-well', 'text': 'Su quyusunda', 'textEn': 'In water well', 'textRu': 'В колодце', 'emoji': '🪣', 'isCorrect': False},
                {'id': 'opt-log-nst-car', 'text': 'Avtomobilin içində', 'textEn': 'Inside car', 'textRu': 'В машине', 'emoji': '🚗', 'isCorrect': False},
            ],
        },
        {
            'id': 'log-odd-out-car-4',
            'title': 'Sırada Artıq Əşya',
            'titleEn': 'Odd One in Group',
            'titleRu': 'Лишний предмет в группе',
            'instruction': 'Artıq olanı tap.',
            'instructionEn': 'Find odd item.',
            'instructionRu': 'Найди лишнее.',
            'type': 'select',
            'question': 'Bu sırada artıq olan hansıdır? (Alma, Armud, Banan, Avtomobil)',
            'questionEn': 'Which one is odd in this list? (Apple, Pear, Banana, Car)',
            'questionRu': 'Что лишнее в этом ряду? (Яблоко, Груша, Банан, Машина)',
            'options': [
                {'id': 'opt-log-odd-car', 'text': 'Avtomobil (çünki nəqliyyatdır)', 'textEn': 'Car (it is transport)', 'textRu': 'Машина (так как это транспорт)', 'emoji': '🚗', 'isCorrect': True},
                {'id': 'opt-log-odd-apple', 'text': 'Alma', 'textEn': 'Apple', 'textRu': 'Яблоко', 'emoji': '🍎', 'isCorrect': False},
                {'id': 'opt-log-odd-banana', 'text': 'Banan', 'textEn': 'Banana', 'textRu': 'Банан', 'emoji': '🍌', 'isCorrect': False},
            ],
        },
        {
            'id': 'log-sunglasses-5',
            'title': 'Günəşdən Qorunmaq',
            'titleEn': 'Sun Protection',
            'titleRu': 'Защита от солнца',
            'instruction': 'Günəş əşyasını tap.',
            'instructionEn': 'Find sun protection item.',
            'instructionRu': 'Найди предмет защиты от солнца.',
            'type': 'select',
            'question': 'Parlaq yay günəşindən gözlərimizi qorumaq üçün nə taxırıq?',
            'questionEn': 'What do we wear to protect eyes from bright sun?',
            'questionRu': 'Что мы надеваем для защиты глаз от яркого солнца?',
            'options': [
                {'id': 'opt-log-sng-corr', 'text': 'Gün eynəyi', 'textEn': 'Sunglasses', 'textRu': 'Солнцезащитные очки', 'emoji': '🕶️', 'isCorrect': True},
                {'id': 'opt-log-sng-glove', 'text': 'Əlcək', 'textEn': 'Gloves', 'textRu': 'Перчатки', 'emoji': '🧤', 'isCorrect': False},
                {'id': 'opt-log-sng-scarf', 'text': 'Qalın şərf', 'textEn': 'Scarf', 'textRu': 'Шарф', 'emoji': '🧣', 'isCorrect': False},
            ],
        },
        {
            'id': 'log-key-lock-6',
            'title': 'Qıfıl və Açar',
            'titleEn': 'Key and Lock',
            'titleRu': 'Замок и ключ',
            'instruction': 'Qıfılı açan əşyanı seç.',
            'instructionEn': 'Select item that opens lock.',
            'instructionRu': 'Выбери предмет, открывающий замок.',
            'type': 'select',
            'question': 'Qapıdakı qıfılı açmaq üçün bizə nə lazımdır?',
            'questionEn': 'What do we need to unlock a door lock?',
            'questionRu': 'Что нужно, чтобы открыть замок на двери?',
            'options': [
                {'id': 'opt-log-key-corr', 'text': 'Açar', 'textEn': 'Key', 'textRu': 'Ключ', 'emoji': '🔑', 'isCorrect': True},
                {'id': 'opt-log-key-pen', 'text': 'Qələm', 'textEn': 'Pen', 'textRu': 'Карандаш', 'emoji': '✏️', 'isCorrect': False},
                {'id': 'opt-log-key-spn', 'text': 'Qaşıq', 'textEn': 'Spoon', 'textRu': 'Ложка', 'emoji': '🥄', 'isCorrect': False},
            ],
        },
    ],
}

print(f"Loaded {len(EXT_COGNITIVE)} cognitive extension sets.")

# ── Assemble Master Extensions ─────────────────────────────────────────
ALL_EXTENSIONS = {}
ALL_EXTENSIONS.update(EXT_FOUNDATIONS_COMMANDS)
ALL_EXTENSIONS.update(EXT_SPEECH_SOCIAL)
ALL_EXTENSIONS.update(EXT_COGNITIVE)

print(f"Total modules with extensions defined: {len(ALL_EXTENSIONS)}")

# Load base JSONs
with open(os.path.join(SCRATCH, 'current_modules.json'), 'r', encoding='utf-8') as f:
    modules = json.load(f)

with open(os.path.join(SCRATCH, 'current_translations.json'), 'r', encoding='utf-8') as f:
    translations = json.load(f)

def sanitize_az(text):
    if not isinstance(text, str):
        return text
    res = re.sub(r'svetofor', 'işıqfor', text, flags=re.IGNORECASE)
    res = re.sub(r'svetafor', 'işıqfor', res, flags=re.IGNORECASE)
    res = re.sub(r'Svetofor', 'İşıqfor', res)
    res = re.sub(r'Svetafor', 'İşıqfor', res)
    return res

def deep_clean(obj):
    if isinstance(obj, dict):
        new_d = {}
        for k, v in obj.items():
            if 'az' in k.lower() or k in ('title', 'instruction', 'question', 'text', 'explanation', 'conceptTitle', 'captionAz'):
                new_d[k] = sanitize_az(v) if isinstance(v, str) else deep_clean(v)
            else:
                new_d[k] = deep_clean(v)
        return new_d
    elif isinstance(obj, list):
        return [deep_clean(item) for item in obj]
    else:
        return obj

modules = deep_clean(modules)
translations = deep_clean(translations)

# Apply extensions
total_added = 0
for mod in modules:
    mod_id = mod['id']
    if mod_id in ALL_EXTENSIONS:
        exts = deep_clean(ALL_EXTENSIONS[mod_id])
        # Append only unique ids
        existing_ids = {a['id'] for a in mod['activities']}
        for act in exts:
            if act['id'] not in existing_ids:
                mod['activities'].append(act)
                existing_ids.add(act['id'])
                total_added += 1

                # Register translations
                opt_map = {}
                if 'options' in act and act['options']:
                    for opt in act['options']:
                        opt_map[opt['text']] = {
                            'en': opt.get('textEn', opt['text']),
                            'ru': opt.get('textRu', opt['text']),
                        }
                translations[act['id']] = {
                    'question': {
                        'az': act.get('question', act.get('instruction', '')),
                        'en': act.get('questionEn', act.get('instructionEn', '')),
                        'ru': act.get('questionRu', act.get('instructionRu', '')),
                    },
                    'instruction': {
                        'az': act.get('instruction', ''),
                        'en': act.get('instructionEn', ''),
                        'ru': act.get('instructionRu', ''),
                    },
                    'options': opt_map,
                    'explanation': {
                        'az': 'Afərin! Düzgün cavab! 🌟',
                        'en': 'Well done! Correct answer! 🌟',
                        'ru': 'Молодец! Правильный ответ! 🌟',
                    },
                }

print(f"Total new activities added: {total_added}")

# Validate all modules
print("\n=== Validation of Module Activity Counts ===")
all_pass = True
for idx, m in enumerate(modules):
    count = len(m['activities'])
    status = "OK" if count >= 10 else "FAIL (< 10)"
    if count < 10:
        all_pass = False
    print(f"{idx + 1:2d}. [{m['id']:22s}] Activities: {count:2d} -> {status}")

if not all_pass:
    print("ERROR: Some modules have < 10 activities!")
    exit(1)

print("\nAll 34 modules successfully verified with >= 10 activities!")

# Write updated JSONs to scratch
with open(os.path.join(SCRATCH, 'expanded_modules.json'), 'w', encoding='utf-8') as f:
    json.dump(modules, f, ensure_ascii=False, indent=2)

with open(os.path.join(SCRATCH, 'expanded_translations.json'), 'w', encoding='utf-8') as f:
    json.dump(translations, f, ensure_ascii=False, indent=2)

print("Saved scratch JSONs.")
