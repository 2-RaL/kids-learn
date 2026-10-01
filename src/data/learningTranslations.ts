// src/data/learningTranslations.ts
// Comprehensive trilingual translation map (AZ, EN, RU) for all learning activities and UI.

export interface LocalizedActivityData {
  question: { az: string; en: string; ru: string };
  instruction?: { az: string; en: string; ru: string };
  options?: Record<string, { en: string; ru: string }>;
  explanation?: { az: string; en: string; ru: string };
}

export const ACTIVITY_TRANSLATIONS: Record<string, LocalizedActivityData> = {
  "color-red-1": {
    "question": {
      "az": "Hansı alma qırmızı rəngdədir?",
      "en": "Which apple is red?",
      "ru": "Какое яблоко красного цвета?"
    },
    "instruction": {
      "az": "Qırmızı olan almanı seç.",
      "en": "Select the red apple.",
      "ru": "Выбери красное яблоко."
    },
    "options": {
      "Qırmızı Alma": {
        "en": "Red Apple",
        "ru": "Красное яблоко"
      },
      "Yaşıl Alma": {
        "en": "Green Apple",
        "ru": "Зеленое яблоко"
      },
      "Sarı Banan": {
        "en": "Yellow Banana",
        "ru": "Желтый банан"
      }
    },
    "explanation": {
      "az": "Afərin! Qırmızı alma məhz budur! 🍎",
      "en": "Well done! That is the red apple! 🍎",
      "ru": "Молодец! Это красное яблоко! 🍎"
    }
  },
  "color-red-2": {
    "question": {
      "az": "Hansı ləzzətli giləmeyvə qırmızıdır?",
      "en": "Which delicious berry is red?",
      "ru": "Какая вкусная ягода красная?"
    },
    "instruction": {
      "az": "Qırmızı rəngli çiyələyi tap.",
      "en": "Find the red strawberry.",
      "ru": "Найди красную клубнику."
    },
    "options": {
      "Qırmızı Çiyələk": {
        "en": "Red Strawberry",
        "ru": "Красная клубника"
      },
      "Mavi Qaragilə": {
        "en": "Blue Blueberry",
        "ru": "Синяя черника"
      },
      "Bənövşəyi Üzüm": {
        "en": "Purple Grape",
        "ru": "Фиолетовый виноград"
      }
    },
    "explanation": {
      "az": "Əla! Çiyələk şirin və qırmızıdır! 🍓",
      "en": "Great! Strawberries are sweet and red! 🍓",
      "ru": "Отлично! Клубника сладкая и красная! 🍓"
    }
  },
  "color-red-3": {
    "question": {
      "az": "Hansı avtomobil qırmızı rəngdədir?",
      "en": "Which car is red?",
      "ru": "Какая машина красного цвета?"
    },
    "instruction": {
      "az": "Qırmızı rəngli maşını göstər.",
      "en": "Point to the red car.",
      "ru": "Покажи красную машину."
    },
    "options": {
      "Qırmızı Maşın": {
        "en": "Red Car",
        "ru": "Красная машина"
      },
      "Mavi Maşın": {
        "en": "Blue Car",
        "ru": "Синяя машина"
      },
      "Sarı Taksi": {
        "en": "Yellow Taxi",
        "ru": "Желтое такси"
      }
    },
    "explanation": {
      "az": "Super! Qırmızı maşın sürətlə gedir! 🚗",
      "en": "Super! The red car zooms ahead! 🚗",
      "ru": "Супер! Красная машина едет быстро! 🚗"
    }
  },
  "color-blue-1": {
    "question": {
      "az": "Mavi top hansıdır?",
      "en": "Which one is the blue ball?",
      "ru": "Какой мяч синий?"
    },
    "instruction": {
      "az": "Mavi rəngli topu göstər.",
      "en": "Find the blue ball.",
      "ru": "Найди синий мяч."
    },
    "options": {
      "Mavi Top": {
        "en": "Blue Ball",
        "ru": "Синий мяч"
      },
      "Sarı Top": {
        "en": "Yellow Ball",
        "ru": "Желтый мяч"
      },
      "Qara Top": {
        "en": "Black Ball",
        "ru": "Черный мяч"
      }
    },
    "explanation": {
      "az": "Əla! Mavi topu tapdın! 🔵",
      "en": "Great! You found the blue ball! 🔵",
      "ru": "Отлично! Ты нашел синий мяч! 🔵"
    }
  },
  "color-blue-2": {
    "question": {
      "az": "Hansı quş mavi rəngdədir?",
      "en": "Which bird is blue?",
      "ru": "Какая птица синего цвета?"
    },
    "instruction": {
      "az": "Göydə uçan mavi quşu seç.",
      "en": "Select the blue bird flying in the sky.",
      "ru": "Выбери синюю птичку, летящую в небе."
    },
    "options": {
      "Mavi Quş": {
        "en": "Blue Bird",
        "ru": "Синяя птица"
      },
      "Sarı Cücə": {
        "en": "Yellow Chick",
        "ru": "Желтый цыпленок"
      },
      "Çəhrayı Flaqinqo": {
        "en": "Pink Flamingo",
        "ru": "Розовый фламинго"
      }
    },
    "explanation": {
      "az": "Afərin! Mavi quş gözəl nəğmə oxuyur! 🐦",
      "en": "Well done! The blue bird sings a sweet song! 🐦",
      "ru": "Молодец! Синяя птичка красиво поет! 🐦"
    }
  },
  "color-blue-3": {
    "question": {
      "az": "Dəniz dalğası hansı rəngdədir?",
      "en": "What color is the sea wave?",
      "ru": "Какого цвета морская волна?"
    },
    "instruction": {
      "az": "Mavi dəniz dalğasını seç.",
      "en": "Select the blue sea wave.",
      "ru": "Выбери синюю морскую волну."
    },
    "options": {
      "Mavi Dalğa": {
        "en": "Blue Wave",
        "ru": "Синяя волна"
      },
      "Qəhvəyi Torpaq": {
        "en": "Brown Earth",
        "ru": "Коричневая земля"
      },
      "Ağ Qar": {
        "en": "White Snow",
        "ru": "Белый снег"
      }
    },
    "explanation": {
      "az": "Düzdür! Dəniz suyu mavidir! 🌊",
      "en": "Correct! Sea water is blue! 🌊",
      "ru": "Правильно! Морская вода синяя! 🌊"
    }
  },
  "color-green-1": {
    "question": {
      "az": "Yaşıl yarpaq hansıdır?",
      "en": "Which one is the green leaf?",
      "ru": "Какой листок зеленый?"
    },
    "instruction": {
      "az": "Təbiətdə yaşıl olan yarpağı tap.",
      "en": "Find the green leaf in nature.",
      "ru": "Найди зеленый листок в природе."
    },
    "options": {
      "Yaşıl Yarpaq": {
        "en": "Green Leaf",
        "ru": "Зеленый лист"
      },
      "Sarı Yarpaq": {
        "en": "Yellow Leaf",
        "ru": "Желтый лист"
      },
      "Qırmızı Yarpaq": {
        "en": "Red Leaf",
        "ru": "Красный лист"
      }
    },
    "explanation": {
      "az": "Düzdür! Yarpaq təbiətdə yaşıldır! 🍃",
      "en": "Correct! Leaves are green in nature! 🍃",
      "ru": "Правильно! Листья в природе зеленые! 🍃"
    }
  },
  "color-green-2": {
    "question": {
      "az": "Hansı sevimli heyvan yaşıldır?",
      "en": "Which cute animal is green?",
      "ru": "Какое милое животное зеленого цвета?"
    },
    "instruction": {
      "az": "Yaşıl rəngli qurbağanı seç.",
      "en": "Select the green frog.",
      "ru": "Выбери зеленую лягушку."
    },
    "options": {
      "Yaşıl Qurbağa": {
        "en": "Green Frog",
        "ru": "Зеленая лягушка"
      },
      "Narıncı Tülkü": {
        "en": "Orange Fox",
        "ru": "Рыжая лиса"
      },
      "Boz Dovşan": {
        "en": "Gray Bunny",
        "ru": "Серый кролик"
      }
    },
    "explanation": {
      "az": "Əla! Qurbağa yaşıl rəngdədir və tullanır! 🐸",
      "en": "Great! The frog is green and leaps high! 🐸",
      "ru": "Отлично! Лягушка зеленая и прыгает! 🐸"
    }
  },
  "color-green-3": {
    "question": {
      "az": "Hansı meyvə yaşıl almadır?",
      "en": "Which fruit is the green apple?",
      "ru": "Какой фрукт — зеленое яблоко?"
    },
    "instruction": {
      "az": "Şirəli yaşıl almanı seç.",
      "en": "Select the juicy green apple.",
      "ru": "Выбери сочное зеленое яблоко."
    },
    "options": {
      "Yaşıl Alma": {
        "en": "Green Apple",
        "ru": "Зеленое яблоко"
      },
      "Qırmızı Alma": {
        "en": "Red Apple",
        "ru": "Красное яблоко"
      },
      "Bənövşəyi Gavalı": {
        "en": "Purple Plum",
        "ru": "Фиолетовая слива"
      }
    },
    "explanation": {
      "az": "Möhtəşəm! Yaşıl alma vitaminlərlə zəngindir! 🍏",
      "en": "Awesome! Green apples are packed with vitamins! 🍏",
      "ru": "Замечательно! Зеленое яблоко богато витаминами! 🍏"
    }
  },
  "color-yellow-1": {
    "question": {
      "az": "Hansı parlaq günəş sarı rəngdədir?",
      "en": "Which bright sun is yellow?",
      "ru": "Какое яркое солнце желтого цвета?"
    },
    "instruction": {
      "az": "İşıq saçan sarı günəşi seç.",
      "en": "Select the shining yellow sun.",
      "ru": "Выбери сияющее желтое солнце."
    },
    "options": {
      "Sarı Günəş": {
        "en": "Yellow Sun",
        "ru": "Желтое солнце"
      },
      "Ağ Bulud": {
        "en": "White Cloud",
        "ru": "Белое облако"
      },
      "Mavi Yağış": {
        "en": "Blue Rain",
        "ru": "Синий дождь"
      }
    },
    "explanation": {
      "az": "Bəli! Sarı günəş dünyamızı qızdırır! ☀️",
      "en": "Yes! The yellow sun warms our world! ☀️",
      "ru": "Да! Желтое солнце согревает наш мир! ☀️"
    }
  },
  "color-yellow-2": {
    "question": {
      "az": "Sarı rəngli ləzzətli banan hansıdır?",
      "en": "Which one is the delicious yellow banana?",
      "ru": "Какой вкусный банан желтого цвета?"
    },
    "instruction": {
      "az": "Şirin sarı bananı seç.",
      "en": "Select the sweet yellow banana.",
      "ru": "Выбери сладкий желтый банан."
    },
    "options": {
      "Sarı Banan": {
        "en": "Yellow Banana",
        "ru": "Желтый банан"
      },
      "Qırmızı Alma": {
        "en": "Red Apple",
        "ru": "Красное яблоко"
      },
      "Bənövşəyi Badımcan": {
        "en": "Purple Eggplant",
        "ru": "Фиолетовый баклажан"
      }
    },
    "explanation": {
      "az": "Düzdür! Bananın qabığı sarı rəngdə olur! 🍌",
      "en": "Correct! Banana peel is yellow! 🍌",
      "ru": "Правильно! Кожура банана желтая! 🍌"
    }
  },
  "color-yellow-3": {
    "question": {
      "az": "Hansı balaca quş sarı rəngdədir?",
      "en": "Which little chick is yellow?",
      "ru": "Какой маленький цыпленок желтый?"
    },
    "instruction": {
      "az": "Sevimli sarı cücəni seç.",
      "en": "Select the cute yellow chick.",
      "ru": "Выбери милого желтого цыпленка."
    },
    "options": {
      "Sarı Cücə": {
        "en": "Yellow Chick",
        "ru": "Желтый цыпленок"
      },
      "Qara Qarğa": {
        "en": "Black Crow",
        "ru": "Черная ворона"
      },
      "Mavi Tutuquşu": {
        "en": "Blue Parrot",
        "ru": "Синий попугай"
      }
    },
    "explanation": {
      "az": "Afərin! Sarı cücə çox şirindir! 🐥",
      "en": "Well done! The yellow chick is so sweet! 🐥",
      "ru": "Молодец! Желтый цыпленок очень милый! 🐥"
    }
  },
  "shape-circle-1": {
    "question": {
      "az": "Hansı fiqur dairədir (yumrudur)?",
      "en": "Which shape is a circle (round)?",
      "ru": "Какая фигура круг?"
    },
    "instruction": {
      "az": "Yumru olan dairə fiqurunu seç.",
      "en": "Select the round circle shape.",
      "ru": "Выбери круглую форму — круг."
    },
    "options": {
      "Dairə": {
        "en": "Circle",
        "ru": "Круг"
      },
      "Kvadrat": {
        "en": "Square",
        "ru": "Квадрат"
      },
      "Üçbucaq": {
        "en": "Triangle",
        "ru": "Треугольник"
      }
    },
    "explanation": {
      "az": "Afərin! Dairə tam yumrudur və küncü yoxdur! ⭕",
      "en": "Well done! A circle is perfectly round with no corners! ⭕",
      "ru": "Молодец! Круг круглый и без углов! ⭕"
    }
  },
  "shape-circle-2": {
    "question": {
      "az": "Hansı sevimli oyuncaq dairə formasındadır?",
      "en": "Which fun toy is shaped like a circle?",
      "ru": "Какая любимая игрушка имеет форму круга?"
    },
    "instruction": {
      "az": "Dairə formasında olan oyuncağı tap.",
      "en": "Find the toy in the shape of a circle.",
      "ru": "Найди игрушку круглой формы."
    },
    "options": {
      "Futbol Topu": {
        "en": "Soccer Ball",
        "ru": "Футбольный мяч"
      },
      "Qutu": {
        "en": "Box",
        "ru": "Коробка"
      },
      "Kitab": {
        "en": "Book",
        "ru": "Книга"
      }
    },
    "explanation": {
      "az": "Əla! Futbol topu tam dairə formasındadır! ⚽",
      "en": "Great! The soccer ball is perfectly round! ⚽",
      "ru": "Отлично! Футбольный мяч имеет форму круга! ⚽"
    }
  },
  "shape-square-3": {
    "question": {
      "az": "Kvadrat fiquru hansıdır?",
      "en": "Which shape is a square?",
      "ru": "Какая фигура квадрат?"
    },
    "instruction": {
      "az": "Dörd bərabər tərəfi olan kvadratı seç.",
      "en": "Select the square with four equal sides.",
      "ru": "Выбери квадрат с четырьмя равными сторонами."
    },
    "options": {
      "Kvadrat": {
        "en": "Square",
        "ru": "Квадрат"
      },
      "Dairə": {
        "en": "Circle",
        "ru": "Круг"
      },
      "Ulduz": {
        "en": "Star",
        "ru": "Звезда"
      }
    },
    "explanation": {
      "az": "Düzdür! Kvadratın dörd düzbucaqlı bərabər tərəfi var! ⬛",
      "en": "Correct! A square has four equal straight sides! ⬛",
      "ru": "Правильно! У квадрата четыре равные стороны! ⬛"
    }
  },
  "shape-triangle-4": {
    "question": {
      "az": "Üçbucaq fiquru hansıdır?",
      "en": "Which shape is a triangle?",
      "ru": "Какая фигура треугольник?"
    },
    "instruction": {
      "az": "Üç iti küncü olan üçbucağı seç.",
      "en": "Select the triangle with three corners.",
      "ru": "Выбери треугольник с тремя углами."
    },
    "options": {
      "Üçbucaq": {
        "en": "Triangle",
        "ru": "Треугольник"
      },
      "Dairə": {
        "en": "Circle",
        "ru": "Круг"
      },
      "Kvadrat": {
        "en": "Square",
        "ru": "Квадрат"
      }
    },
    "explanation": {
      "az": "Super! Üçbucaq 3 küncə malikdir! 🔺",
      "en": "Super! A triangle has 3 corners! 🔺",
      "ru": "Супер! У треугольника 3 уголка! 🔺"
    }
  },
  "shape-star-5": {
    "question": {
      "az": "Parlaq ulduz fiquru hansıdır?",
      "en": "Which shape is the bright star?",
      "ru": "Какая фигура яркая звезда?"
    },
    "instruction": {
      "az": "Göydə parıldayan ulduz fiqurunu göstər.",
      "en": "Point to the shining star shape.",
      "ru": "Покажи сияющую звездочку."
    },
    "options": {
      "Ulduz": {
        "en": "Star",
        "ru": "Звезда"
      },
      "Ürək": {
        "en": "Heart",
        "ru": "Сердце"
      },
      "Kvadrat": {
        "en": "Square",
        "ru": "Квадрат"
      }
    },
    "explanation": {
      "az": "Çox gözəl! Bu parlaq bir ulduzdur! ⭐",
      "en": "Wonderful! That is a bright star! ⭐",
      "ru": "Замечательно! Это яркая звезда! ⭐"
    }
  },
  "shape-pizza-6": {
    "question": {
      "az": "Hansı dadlı yemək üçbucaq formadadır?",
      "en": "Which tasty food is shaped like a triangle?",
      "ru": "Какая вкусная еда имеет форму треугольника?"
    },
    "instruction": {
      "az": "Üçbucağa bənzəyən ləzzətli yeməyi tap.",
      "en": "Find the tasty food shaped like a triangle.",
      "ru": "Найди вкусную еду в форме треугольника."
    },
    "options": {
      "Pizza Dilimi": {
        "en": "Pizza Slice",
        "ru": "Кусочек пиццы"
      },
      "Yumru Portağal": {
        "en": "Round Orange",
        "ru": "Круглый апельсин"
      },
      "Yumurtavari Qarpız": {
        "en": "Oval Watermelon",
        "ru": "Овальный арбуз"
      }
    },
    "explanation": {
      "az": "Afərin! Pizza dilimi məhz üçbucaq şəklində kəsilir! 🍕",
      "en": "Well done! A pizza slice is shaped like a triangle! 🍕",
      "ru": "Молодец! Кусочек пиццы нарезан треугольником! 🍕"
    }
  },
  "obj-spoon-1": {
    "question": {
      "az": "Şorbanı nə ilə yeyirik?",
      "en": "What do we eat soup with?",
      "ru": "Чем мы едим суп?"
    },
    "instruction": {
      "az": "Şorbanı yemək üçün nə istifadə edirik?",
      "en": "What do we use to eat soup?",
      "ru": "Чем мы едим суп?"
    },
    "options": {
      "Qaşıq": {
        "en": "Spoon",
        "ru": "Ложка"
      },
      "Stul": {
        "en": "Chair",
        "ru": "Стул"
      },
      "Qapı": {
        "en": "Door",
        "ru": "Дверь"
      }
    },
    "explanation": {
      "az": "Bəli, dadlı şorbanı qaşıqla yeyirik! 🥄",
      "en": "Yes, we eat delicious soup with a spoon! 🥄",
      "ru": "Да, вкусный суп мы едим ложкой! 🥄"
    }
  },
  "obj-cup-2": {
    "question": {
      "az": "Çay və ya süd nə ilə içilir?",
      "en": "What do we drink tea or milk with?",
      "ru": "Из чего пьют чай или молоко?"
    },
    "instruction": {
      "az": "Su və ya süd içdiyimiz qabı tap.",
      "en": "Find the vessel we drink water or milk from.",
      "ru": "Найди посуду, из которой пьем воду или молоко."
    },
    "options": {
      "Fincan": {
        "en": "Cup",
        "ru": "Чашка"
      },
      "Kitab": {
        "en": "Book",
        "ru": "Книга"
      },
      "Yataq": {
        "en": "Bed",
        "ru": "Кровать"
      }
    },
    "explanation": {
      "az": "Əla! Fincanla ilıq çay və ya süd içmək olar! ☕",
      "en": "Great! We can drink warm tea or milk from a cup! ☕",
      "ru": "Отлично! Из чашки можно пить теплый чай или молоко! ☕"
    }
  },
  "obj-fork-3": {
    "question": {
      "az": "Makaronu rahat yemək üçün hansı əşyanı seçirik?",
      "en": "Which item do we use to comfortably eat pasta?",
      "ru": "Чем удобно кушать макароны?"
    },
    "instruction": {
      "az": "Yeməkləri tutub yemək üçün çəngəli tap.",
      "en": "Find the fork to hold and eat food.",
      "ru": "Найди вилку для еды."
    },
    "options": {
      "Çəngəl": {
        "en": "Fork",
        "ru": "Вилка"
      },
      "Qələm": {
        "en": "Pencil",
        "ru": "Карандаш"
      },
      "Açar": {
        "en": "Key",
        "ru": "Ключ"
      }
    },
    "explanation": {
      "az": "Afərin! Çəngəl yeməkləri rahat götürməyə kömək edir! 🍴",
      "en": "Well done! A fork helps to pick up food! 🍴",
      "ru": "Молодец! Вилка помогает удобно кушать еду! 🍴"
    }
  },
  "obj-chair-4": {
    "question": {
      "az": "Dərs oxuyarkən və ya yemək yeyərkən nəyin üstündə otururuq?",
      "en": "What do we sit on when studying or eating?",
      "ru": "На чем мы сидим во время учебы или еды?"
    },
    "instruction": {
      "az": "Oturmaq üçün istifadə etdiyimiz stulu tap.",
      "en": "Find the chair we use to sit on.",
      "ru": "Найди стул, на котором мы сидим."
    },
    "options": {
      "Stul": {
        "en": "Chair",
        "ru": "Стул"
      },
      "Vanna": {
        "en": "Bathtub",
        "ru": "Ванна"
      },
      "Soyuducu": {
        "en": "Fridge",
        "ru": "Холодильник"
      }
    },
    "explanation": {
      "az": "Doğrudur! Biz stulun üstündə rahat əyləşirik! 🪑",
      "en": "Correct! We sit comfortably on a chair! 🪑",
      "ru": "Правильно! Мы удобно сидим на стуле! 🪑"
    }
  },
  "obj-bed-5": {
    "question": {
      "az": "Gecə yuxuya getmək üçün hara uzanırıq?",
      "en": "Where do we lie down to sleep at night?",
      "ru": "Куда мы ложимся спать ночью?"
    },
    "instruction": {
      "az": "Gecələr yatıb dincəldiyimiz çarpayını seç.",
      "en": "Select the bed we sleep and rest in at night.",
      "ru": "Выбери кровать, в которой мы спим ночью."
    },
    "options": {
      "Çarpayı": {
        "en": "Bed",
        "ru": "Кровать"
      },
      "Qapı": {
        "en": "Door",
        "ru": "Дверь"
      },
      "Pəncərə": {
        "en": "Window",
        "ru": "Окно"
      }
    },
    "explanation": {
      "az": "Şirin yuxular! Çarpayıda yatıb qüvvət toplayırıq! 🛏️",
      "en": "Sweet dreams! We sleep in bed to regain energy! 🛏️",
      "ru": "Сладких снов! В кровати мы спим и набираемся сил! 🛏️"
    }
  },
  "body-eye-1": {
    "question": {
      "az": "Biz ətrafımızdakı gözəllikləri nə ilə görürük?",
      "en": "What do we see the beauty around us with?",
      "ru": "Чем мы видим красоту вокруг нас?"
    },
    "instruction": {
      "az": "Dünyanı və rəngləri görmək üçün istifadə etdiyimiz gözü seç.",
      "en": "Select the eye we use to see the world and colors.",
      "ru": "Выбери глаз, которым мы видим мир и цвета."
    },
    "options": {
      "Göz": {
        "en": "Eye",
        "ru": "Глаз"
      },
      "Qulaq": {
        "en": "Ear",
        "ru": "Ухо"
      },
      "Ayaq": {
        "en": "Foot",
        "ru": "Нога"
      }
    },
    "explanation": {
      "az": "Afərin! Gözlərimizlə hər şeyi aydın görürük! 👁️",
      "en": "Well done! With our eyes we see everything clearly! 👁️",
      "ru": "Молодец! Глазами мы всё четко видим! 👁️"
    }
  },
  "body-ear-2": {
    "question": {
      "az": "Quşların nəğməsini və musiqini nə ilə eşidirik?",
      "en": "What do we hear birds singing and music with?",
      "ru": "Чем мы слышим пение птиц и музыку?"
    },
    "instruction": {
      "az": "Musiqini və səsləri eşitmək üçün qulağı seç.",
      "en": "Select the ear to hear music and sounds.",
      "ru": "Выбери ухо, чтобы слушать музыку и звуки."
    },
    "options": {
      "Qulaq": {
        "en": "Ear",
        "ru": "Ухо"
      },
      "Burun": {
        "en": "Nose",
        "ru": "Нос"
      },
      "Əl": {
        "en": "Hand",
        "ru": "Рука"
      }
    },
    "explanation": {
      "az": "Əla! Qulaqlarımız sayəsində bütün gözəl səsləri eşidirik! 👂",
      "en": "Great! Thanks to our ears we hear all sweet sounds! 👂",
      "ru": "Отлично! Благодаря ушам мы слышим прекрасные звуки! 👂"
    }
  },
  "body-nose-3": {
    "question": {
      "az": "Çiçəklərin və yeməklərin ətrini nə ilə duyuruq?",
      "en": "What do we smell flowers and food with?",
      "ru": "Чем мы чувствуем запах цветов и вкусной еды?"
    },
    "instruction": {
      "az": "Güllərin ətrini duyduğumuz burnu tap.",
      "en": "Find the nose we use to smell flowers.",
      "ru": "Найди нос, которым мы чувствуем аромат цветов."
    },
    "options": {
      "Burun": {
        "en": "Nose",
        "ru": "Нос"
      },
      "Ağız": {
        "en": "Mouth",
        "ru": "Рот"
      },
      "Göz": {
        "en": "Eye",
        "ru": "Глаз"
      }
    },
    "explanation": {
      "az": "Düzdür! Burnumuzla təmiz hava alırıq və ətirləri duyuruq! 👃",
      "en": "Correct! With our nose we breathe fresh air and smell fragrances! 👃",
      "ru": "Правильно! Носом мы дышим и чувствуем ароматы! 👃"
    }
  },
  "body-hand-4": {
    "question": {
      "az": "Oyuncaqları tutmaq və salam vermək üçün hansı üzvümüz kömək edir?",
      "en": "Which body part helps us hold toys and wave hello?",
      "ru": "Какая часть тела помогает держать игрушки и махать «привет»?"
    },
    "instruction": {
      "az": "Oyuncaqları tutmaq üçün istifadə etdiyimiz əli seç.",
      "en": "Select the hand we use to hold toys.",
      "ru": "Выбери руку, которой мы держим игрушки."
    },
    "options": {
      "Əl": {
        "en": "Hand",
        "ru": "Рука"
      },
      "Ayaq": {
        "en": "Foot",
        "ru": "Нога"
      },
      "Qulaq": {
        "en": "Ear",
        "ru": "Ухо"
      }
    },
    "explanation": {
      "az": "Bəli! Əllərimizlə rəsm çəkirik və oyuncaqlarla oynayırıq! ✋",
      "en": "Yes! With our hands we draw and play with toys! ✋",
      "ru": "Да! Руками мы рисуем и играем в игрушки! ✋"
    }
  },
  "body-foot-5": {
    "question": {
      "az": "Parkda qaçmaq, addımlamaq və tullanmaq üçün nə lazımdır?",
      "en": "What do we need to run, walk, and jump in the park?",
      "ru": "Что нужно, чтобы бегать, шагать и прыгать в парке?"
    },
    "instruction": {
      "az": "Qaçmaq və tullanmaq üçün kömək edən ayağı tap.",
      "en": "Find the foot that helps us run and jump.",
      "ru": "Найди ногу, которая помогает бегать и прыгать."
    },
    "options": {
      "Ayaq": {
        "en": "Foot",
        "ru": "Нога"
      },
      "Burun": {
        "en": "Nose",
        "ru": "Нос"
      },
      "Göz": {
        "en": "Eye",
        "ru": "Глаз"
      }
    },
    "explanation": {
      "az": "Möhtəşəm! Ayaqlarımız bizi hər yerə cəld aparır! 🦶",
      "en": "Awesome! Our feet carry us swiftly everywhere! 🦶",
      "ru": "Замечательно! Ноги быстро переносят нас повсюду! 🦶"
    }
  },
  "anim-cat-1": {
    "question": {
      "az": "Hansı heyvan 'Miyau-miyau' səsi çıxarır?",
      "en": "Which animal makes a 'Meow-meow' sound?",
      "ru": "Какое животное издает звук «Мяу-мяу»?"
    },
    "instruction": {
      "az": "'Miyau' deyən sevimli pişiyi seç.",
      "en": "Select the cute cat that says 'Meow'.",
      "ru": "Выбери милую кошку, которая говорит «Мяу»."
    },
    "options": {
      "Pişik": {
        "en": "Cat",
        "ru": "Кошка"
      },
      "İt": {
        "en": "Dog",
        "ru": "Собака"
      },
      "İnək": {
        "en": "Cow",
        "ru": "Корова"
      }
    },
    "explanation": {
      "az": "Afərin! Pişik 'Miyau' edərək süd istəyir! 🐱",
      "en": "Well done! The cat meows asking for milk! 🐱",
      "ru": "Молодец! Кошка мяукает и просит молочка! 🐱"
    }
  },
  "anim-dog-2": {
    "question": {
      "az": "Evimizi qoruyan və 'Hav-hav' deyə hürən heyvan hansıdır?",
      "en": "Which animal protects our home and barks 'Woof-woof'?",
      "ru": "Какое животное охраняет дом и лает «Гав-гав»?"
    },
    "instruction": {
      "az": "'Hav-hav' deyən sadiq dostumuzu tap.",
      "en": "Find our loyal friend who says 'Woof-woof'.",
      "ru": "Найди верного друга, который говорит «Гав-гав»."
    },
    "options": {
      "İt": {
        "en": "Dog",
        "ru": "Собака"
      },
      "Pişik": {
        "en": "Cat",
        "ru": "Кошка"
      },
      "Ördək": {
        "en": "Duck",
        "ru": "Утка"
      }
    },
    "explanation": {
      "az": "Doğrudur! İt insanın ən sadiq dostudur! 🐶",
      "en": "Correct! The dog is man's best friend! 🐶",
      "ru": "Правильно! Собака — самый верный друг человека! 🐶"
    }
  },
  "anim-cow-3": {
    "question": {
      "az": "Bizə dadlı və faydalı süd verən heyvan hansıdır?",
      "en": "Which animal gives us sweet and healthy milk?",
      "ru": "Какое животное дает нам вкусное и полезное молоко?"
    },
    "instruction": {
      "az": "'Mööö' deyən və süd verən inəyi tap.",
      "en": "Find the cow that says 'Moo' and gives milk.",
      "ru": "Найди корову, которая мычит «Му» и дает молоко."
    },
    "options": {
      "İnək": {
        "en": "Cow",
        "ru": "Корова"
      },
      "At": {
        "en": "Horse",
        "ru": "Лошадь"
      },
      "Qoyun": {
        "en": "Sheep",
        "ru": "Овечка"
      }
    },
    "explanation": {
      "az": "Əla! İnək ot yeyir və bizə ağ süd verir! 🐮🥛",
      "en": "Great! The cow eats grass and gives us white milk! 🐮🥛",
      "ru": "Отлично! Корова ест травку и дает белое молочко! 🐮🥛"
    }
  },
  "anim-rooster-4": {
    "question": {
      "az": "Səhərlər tezdən banlayaraq hamını yuxudan oyadan kimdir?",
      "en": "Who crows early in the morning waking everyone up?",
      "ru": "Кто кукарекает рано утром и будит всех ото сна?"
    },
    "instruction": {
      "az": "Səhər 'Quqquluquu' deyib bizi oyadan xoruzu tap.",
      "en": "Find the rooster that wakes us up with 'Cock-a-doodle-doo'.",
      "ru": "Найди петушка, который будит нас «Ку-ка-ре-ку»."
    },
    "options": {
      "Xoruz": {
        "en": "Rooster",
        "ru": "Петух"
      },
      "Ördək": {
        "en": "Duck",
        "ru": "Утка"
      },
      "Bayquş": {
        "en": "Owl",
        "ru": "Сова"
      }
    },
    "explanation": {
      "az": "Super! Xoruz uca səslə banlayır və səhəri salamlayır! 🐓",
      "en": "Super! The rooster crows loudly welcoming the morning! 🐓",
      "ru": "Супер! Петушок громко кукарекает и встречает утро! 🐓"
    }
  },
  "anim-bear-5": {
    "question": {
      "az": "Balı çox sevən qəhvəyi nəhəng meşə heyvanı hansıdır?",
      "en": "Which huge brown forest animal loves honey?",
      "ru": "Какое огромное бурое лесное животное любит мед?"
    },
    "instruction": {
      "az": "Şirin balı çox sevən qəhvəyi ayını seç.",
      "en": "Select the brown bear that loves sweet honey.",
      "ru": "Выбери бурого медведя, который любит сладкий мед."
    },
    "options": {
      "Ayı": {
        "en": "Bear",
        "ru": "Медведь"
      },
      "Dovşan": {
        "en": "Bunny",
        "ru": "Заяц"
      },
      "Tülkü": {
        "en": "Fox",
        "ru": "Лиса"
      }
    },
    "explanation": {
      "az": "Afərin! Ayı meşədə gəzir və şirin bal yeyir! 🐻🍯",
      "en": "Well done! The bear roams the forest eating sweet honey! 🐻🍯",
      "ru": "Молодец! Медведь гуляет по лесу и ест сладкий медок! 🐻🍯"
    }
  },
  "anim-rabbit-6": {
    "question": {
      "az": "Yerkökü sevən və uzun qulaqları olan cəld heyvan hansıdır?",
      "en": "Which swift animal loves carrots and has long ears?",
      "ru": "Какое быстрое животное любит морковку и имеет длинные ушки?"
    },
    "instruction": {
      "az": "Uzun qulaqları olan cəld dovşanı tap.",
      "en": "Find the swift bunny with long ears.",
      "ru": "Найди шустрого зайчика с длинными ушками."
    },
    "options": {
      "Dovşan": {
        "en": "Bunny",
        "ru": "Заяц"
      },
      "Tısbağa": {
        "en": "Turtle",
        "ru": "Черепаха"
      },
      "Tülkü": {
        "en": "Fox",
        "ru": "Лиса"
      }
    },
    "explanation": {
      "az": "Əla! Ağ dovşan qulaqlarını şəkləyib tullanır! 🐰🥕",
      "en": "Great! The bunny wiggles its ears and hops! 🐰🥕",
      "ru": "Отлично! Белый зайчик шевелит ушками и прыгает! 🐰🥕"
    }
  },
  "fruit-banana-1": {
    "question": {
      "az": "Sarı rəngli, qabığı soyulan ləzzətli meyvə hansıdır?",
      "en": "Which delicious yellow fruit can be peeled?",
      "ru": "Какой вкусный желтый фрукт легко чистится?"
    },
    "instruction": {
      "az": "Meymunların çox sevdiyi sarı bananı seç.",
      "en": "Select the yellow banana that monkeys love so much.",
      "ru": "Выбери желтый банан, который так любят обезьянки."
    },
    "options": {
      "Banan": {
        "en": "Banana",
        "ru": "Банан"
      },
      "Kartof": {
        "en": "Potato",
        "ru": "Картошка"
      },
      "Xiyar": {
        "en": "Cucumber",
        "ru": "Огурец"
      }
    },
    "explanation": {
      "az": "Afərin! Banan şirin və çox faydalı meyvədir! 🍌",
      "en": "Well done! Banana is sweet and full of vitamins! 🍌",
      "ru": "Молодец! Банан сладкий и очень полезный фрукт! 🍌"
    }
  },
  "fruit-apple-2": {
    "question": {
      "az": "Ağacda yetişən şirin qırmızı meyvə hansıdır?",
      "en": "Which sweet red fruit grows on a tree?",
      "ru": "Какой сладкий красный фрукт растет на дереве?"
    },
    "instruction": {
      "az": "Ağacda bitən qırmızı almanı tap.",
      "en": "Find the red apple growing on the tree.",
      "ru": "Найди красное яблоко, растущее на дереве."
    },
    "options": {
      "Alma": {
        "en": "Apple",
        "ru": "Яблоко"
      },
      "Soğan": {
        "en": "Onion",
        "ru": "Лук"
      },
      "Badımcan": {
        "en": "Eggplant",
        "ru": "Баклажан"
      }
    },
    "explanation": {
      "az": "Düzdür! Alma hər gün yeyiləndə sağlamlıq gətirir! 🍎",
      "en": "Correct! An apple a day brings health! 🍎",
      "ru": "Правильно! Яблоко в день приносит здоровье! 🍎"
    }
  },
  "veg-carrot-3": {
    "question": {
      "az": "Torpaqda bitən və gözlərimizə çox faydalı olan narıncı tərəvəz hansıdır?",
      "en": "Which orange vegetable grows underground and is great for eyesight?",
      "ru": "Какой оранжевый овощ растет в земле и очень полезен для зрения?"
    },
    "instruction": {
      "az": "Dovşanların sevdiyi narıncı yerkökünü tap.",
      "en": "Find the orange carrot that bunnies love.",
      "ru": "Найди оранжевую морковку, которую любят зайчики."
    },
    "options": {
      "Yerkökü": {
        "en": "Carrot",
        "ru": "Морковь"
      },
      "Limon": {
        "en": "Lemon",
        "ru": "Лимон"
      },
      "Üzüm": {
        "en": "Grape",
        "ru": "Виноград"
      }
    },
    "explanation": {
      "az": "Əla! Yerkökü xırt-xırt səs edir və gözlərimizi qüvvətləndirir! 🥕",
      "en": "Great! Carrots are crunchy and strengthen our eyes! 🥕",
      "ru": "Отлично! Морковка приятно хрустит и укрепляет зрение! 🥕"
    }
  },
  "veg-tomato-4": {
    "question": {
      "az": "Salat etdiyimiz qırmızı və dadlı tərəvəz hansıdır?",
      "en": "Which red and tasty vegetable do we make salad with?",
      "ru": "Какой красный и вкусный овощ мы добавляем в салат?"
    },
    "instruction": {
      "az": "Salat üçün qırmızı pomidoru seç.",
      "en": "Select the red tomato for salad.",
      "ru": "Выбери красный помидор для салата."
    },
    "options": {
      "Pomidor": {
        "en": "Tomato",
        "ru": "Помидор"
      },
      "Alma": {
        "en": "Apple",
        "ru": "Яблоко"
      },
      "Portağal": {
        "en": "Orange",
        "ru": "Апельсин"
      }
    },
    "explanation": {
      "az": "Afərin! Pomidor salatın ən dadlı tərəvəzidir! 🍅",
      "en": "Well done! Tomatoes make the best salads! 🍅",
      "ru": "Молодец! Помидор — самый вкусный овощ в салате! 🍅"
    }
  },
  "veg-cucumber-5": {
    "question": {
      "az": "Yaşıl rəngli, xırtıldayan təzə tərəvəz hansıdır?",
      "en": "Which fresh crunchy vegetable is green?",
      "ru": "Какой свежий хрустящий овощ зеленого цвета?"
    },
    "instruction": {
      "az": "Təravətli yaşıl xiyarı göstər.",
      "en": "Point to the fresh green cucumber.",
      "ru": "Покажи свежий зеленый огурец."
    },
    "options": {
      "Xiyar": {
        "en": "Cucumber",
        "ru": "Огурец"
      },
      "Banan": {
        "en": "Banana",
        "ru": "Банан"
      },
      "Çiyələk": {
        "en": "Strawberry",
        "ru": "Клубника"
      }
    },
    "explanation": {
      "az": "Super! Yaşıl xiyar çox təravətlidir! 🥒",
      "en": "Super! Green cucumbers are so refreshing! 🥒",
      "ru": "Супер! Зеленый огурец очень освежает! 🥒"
    }
  },
  "trans-airplane-1": {
    "question": {
      "az": "Göy üzündə ən yüksəkdə uçan nəqliyyat vasitəsi hansıdır?",
      "en": "Which transport vehicle flies highest in the sky?",
      "ru": "Какой транспорт летает выше всех в небе?"
    },
    "instruction": {
      "az": "Göydə buludların arasında uçan təyyarəni seç.",
      "en": "Select the airplane flying among the clouds.",
      "ru": "Выбери самолет, летящий среди облаков."
    },
    "options": {
      "Təyyarə": {
        "en": "Airplane",
        "ru": "Самолет"
      },
      "Avtomobil": {
        "en": "Car",
        "ru": "Автомобиль"
      },
      "Gəmi": {
        "en": "Ship",
        "ru": "Корабль"
      }
    },
    "explanation": {
      "az": "Afərin! Təyyarə bizi uzaq ölkələrə tez çatdırır! ✈️",
      "en": "Well done! Airplanes take us to distant lands quickly! ✈️",
      "ru": "Молодец! Самолет быстро доставляет нас в далекие страны! ✈️"
    }
  },
  "trans-train-2": {
    "question": {
      "az": "Relslər üzərində gedən və 'Çu-çu' səsi çıxaran nəqliyyat hansıdır?",
      "en": "Which transport runs on tracks and makes a 'Choo-choo' sound?",
      "ru": "Какой транспорт едет по рельсам и говорит «Чу-чу»?"
    },
    "instruction": {
      "az": "Relslər üzərində gedən qatarı tap.",
      "en": "Find the train running on railway tracks.",
      "ru": "Найди поезд, который едет по рельсам."
    },
    "options": {
      "Qatar": {
        "en": "Train",
        "ru": "Поезд"
      },
      "Velosiped": {
        "en": "Bicycle",
        "ru": "Велосипед"
      },
      "Qayıq": {
        "en": "Boat",
        "ru": "Лодка"
      }
    },
    "explanation": {
      "az": "Düzdür! Qatar vaqonları arxasınca çəkib aparır! 🚂",
      "en": "Correct! The train pulls many wagons behind it! 🚂",
      "ru": "Правильно! Поезд тянет за собой много вагонов! 🚂"
    }
  },
  "trans-bus-3": {
    "question": {
      "az": "Şəhərdə məktəbə və bağçaya çoxlu insan aparan böyük nəqliyyat hansıdır?",
      "en": "Which large vehicle takes many people to school and kindergarten?",
      "ru": "Какой большой транспорт везет много людей в школу и садик?"
    },
    "instruction": {
      "az": "Çoxlu sərnişin daşıyan avtobusu seç.",
      "en": "Select the bus carrying many passengers.",
      "ru": "Выбери автобус, везущий много пассажиров."
    },
    "options": {
      "Avtobus": {
        "en": "Bus",
        "ru": "Автобус"
      },
      "Skuter": {
        "en": "Scooter",
        "ru": "Самокат"
      },
      "Taksi": {
        "en": "Taxi",
        "ru": "Такси"
      }
    },
    "explanation": {
      "az": "Əla! Avtobusda çoxlu oturacaqlar var və o hamını aparır! 🚌",
      "en": "Great! The bus has lots of seats and carries everyone! 🚌",
      "ru": "Отлично! В автобусе много мест, и он везет всех вместе! 🚌"
    }
  },
  "trans-ship-4": {
    "question": {
      "az": "Dənizlərdə və okeanlarda üzən nəhəng nəqliyyat hansıdır?",
      "en": "Which huge transport sails on seas and oceans?",
      "ru": "Какой огромный транспорт плывет по морям и океанам?"
    },
    "instruction": {
      "az": "Dənizdə üzən nəhəng gəmini tap.",
      "en": "Find the giant ship sailing in the sea.",
      "ru": "Найди огромный корабль, плывущий по морю."
    },
    "options": {
      "Gəmi": {
        "en": "Ship",
        "ru": "Корабль"
      },
      "Təyyarə": {
        "en": "Airplane",
        "ru": "Самолет"
      },
      "Maşın": {
        "en": "Car",
        "ru": "Машина"
      }
    },
    "explanation": {
      "az": "Super! Gəmi böyük dalğaları yararaq suda üzür! 🚢🌊",
      "en": "Super! The ship glides smoothly over ocean waves! 🚢🌊",
      "ru": "Супер! Корабль рассекает волны и плывет по воде! 🚢🌊"
    }
  },
  "trans-bike-5": {
    "question": {
      "az": "Parkda pedallarını fırladaraq gəzdiyimiz iki təkərli nəqliyyat hansıdır?",
      "en": "Which two-wheeled vehicle do we pedal around the park?",
      "ru": "На каком двухколесном транспорте мы крутим педали в парке?"
    },
    "instruction": {
      "az": "Pedallarını fırladaraq sürdüyümüz velosipedi tap.",
      "en": "Find the bicycle we pedal to ride.",
      "ru": "Найди велосипед, педали которого мы крутим."
    },
    "options": {
      "Velosiped": {
        "en": "Bicycle",
        "ru": "Велосипед"
      },
      "Qayıq": {
        "en": "Boat",
        "ru": "Лодка"
      },
      "Avtomobil": {
        "en": "Car",
        "ru": "Машина"
      }
    },
    "explanation": {
      "az": "Bəli! Velosiped sürmək həm əyləncəli, həm də çox faydalıdır! 🚲",
      "en": "Yes! Riding a bicycle is both fun and very healthy! 🚲",
      "ru": "Да! Кататься на велосипеде весело и очень полезно! 🚲"
    }
  },
  "prof-doctor-1": {
    "question": {
      "az": "Qızdırmamız qalxanda bizi müalicə edib sağaldan kimdir?",
      "en": "Who treats and heals us when we have a fever?",
      "ru": "Кто лечит нас и помогает выздороветь при температуре?"
    },
    "instruction": {
      "az": "Xəstələndikdə bizi müalicə edən həkimi seç.",
      "en": "Select the doctor who heals us when we are sick.",
      "ru": "Выбери врача, который лечит нас, когда мы болеем."
    },
    "options": {
      "Həkim": {
        "en": "Doctor",
        "ru": "Врач"
      },
      "Aşpaz": {
        "en": "Chef",
        "ru": "Повар"
      },
      "Rəssam": {
        "en": "Artist",
        "ru": "Художник"
      }
    },
    "explanation": {
      "az": "Afərin! Həkim bizə şəfa verir və vitaminlər yazır! 👨‍⚕️",
      "en": "Well done! Doctors heal us and prescribe vitamins! 👨‍⚕️",
      "ru": "Молодец! Врач лечит нас и выписывает витамины! 👨‍⚕️"
    }
  },
  "prof-fire-2": {
    "question": {
      "az": "Qırmızı maşınla gəlib yanğını su ilə söndürən kimdir?",
      "en": "Who arrives in a red truck and puts out fires with water?",
      "ru": "Кто приезжает на красной машине и тушит огонь водой?"
    },
    "instruction": {
      "az": "Yanğını söndürən qəhrəmanı tap.",
      "en": "Find the hero who puts out fires.",
      "ru": "Найди героя, который тушит пожары."
    },
    "options": {
      "Yanğınsöndürən": {
        "en": "Firefighter",
        "ru": "Пожарный"
      },
      "Müəllim": {
        "en": "Teacher",
        "ru": "Учитель"
      },
      "Pilot": {
        "en": "Pilot",
        "ru": "Пилот"
      }
    },
    "explanation": {
      "az": "Düzdür! Yanğınsöndürən böyük cəsarətlə insanları qoruyur! 👩‍🚒",
      "en": "Correct! Firefighters bravely protect people! 👩‍🚒",
      "ru": "Правильно! Пожарные смело защищают людей! 👩‍🚒"
    }
  },
  "prof-police-3": {
    "question": {
      "az": "Yollarda və küçələrdə qayda-qanunu kim qoruyur?",
      "en": "Who maintains law and order on streets and roads?",
      "ru": "Кто следит за порядком на улицах и дорогах?"
    },
    "instruction": {
      "az": "Təhlükəsizliyimizi təmin edən polisi seç.",
      "en": "Select the police officer who keeps us safe.",
      "ru": "Выбери полицейского, который защищает порядок."
    },
    "options": {
      "Polis": {
        "en": "Police Officer",
        "ru": "Полицейский"
      },
      "Fermer": {
        "en": "Farmer",
        "ru": "Фермер"
      },
      "Kosmonavt": {
        "en": "Astronaut",
        "ru": "Космонавт"
      }
    },
    "explanation": {
      "az": "Əla! Polis gecə-gündüz bizim rahatlığımızı qoruyur! 👮‍♂️",
      "en": "Great! Police protect our peace day and night! 👮‍♂️",
      "ru": "Отлично! Полиция бережет наш покой днем и ночью! 👮‍♂️"
    }
  },
  "prof-teacher-4": {
    "question": {
      "az": "Məktəbdə kitab oxumağı və yazmağı bizə kim öyrədir?",
      "en": "Who teaches us reading and writing at school?",
      "ru": "Кто учит нас читать и писать в школе?"
    },
    "instruction": {
      "az": "Məktəbdə uşaqlara bilik öyrədən müəllimi tap.",
      "en": "Find the teacher who imparts knowledge in school.",
      "ru": "Найди учительницу, которая учит детей в школе."
    },
    "options": {
      "Müəllim": {
        "en": "Teacher",
        "ru": "Учитель"
      },
      "Kosmonavt": {
        "en": "Astronaut",
        "ru": "Космонавт"
      },
      "Sürücü": {
        "en": "Driver",
        "ru": "Водитель"
      }
    },
    "explanation": {
      "az": "Bəli! Müəllim hər kəsə bilik və tərbiyə aşılayır! 👩‍🏫",
      "en": "Yes! Teachers inspire knowledge and kindness! 👩‍🏫",
      "ru": "Да! Учитель дарит знания и воспитывает доброту! 👩‍🏫"
    }
  },
  "prof-chef-5": {
    "question": {
      "az": "Ağ papaq qoyub mətbəxdə dadlı şorba bişirən kimdir?",
      "en": "Who wears a white hat and cooks tasty soup in the kitchen?",
      "ru": "Кто носит белый колпак и варит вкусный суп на кухне?"
    },
    "instruction": {
      "az": "Dadlı yeməklər bişirən aşpazı seç.",
      "en": "Select the chef who cooks delicious meals.",
      "ru": "Выбери повара, который готовит вкусные блюда."
    },
    "options": {
      "Aşpaz": {
        "en": "Chef",
        "ru": "Повар"
      },
      "Dərzi": {
        "en": "Tailor",
        "ru": "Портной"
      },
      "Rəssam": {
        "en": "Painter",
        "ru": "Художник"
      }
    },
    "explanation": {
      "az": "Super! Aşpaz ən ləzzətli yeməkləri sevgi ilə bişirir! 👨‍🍳🍲",
      "en": "Super! Chefs cook the most delicious food with love! 👨‍🍳🍲",
      "ru": "Супер! Повар с любовью готовит самые вкусные блюда! 👨‍🍳🍲"
    }
  },
  "fam-mom-1": {
    "question": {
      "az": "Bizi sevgi ilə böyüdən və qucaqlayan ən əziz insan kimdir?",
      "en": "Who is the dearest person that raises us with love and warmth?",
      "ru": "Кто самый дорогой человек, который растит нас с любовью?"
    },
    "instruction": {
      "az": "Bizi sonsuz sevgi ilə qucaqlayan əziz anamızı seç.",
      "en": "Select our beloved mother who hugs us with endless love.",
      "ru": "Выбери дорогую маму, которая обнимает нас с любовью."
    },
    "options": {
      "Ana": {
        "en": "Mother",
        "ru": "Мама"
      },
      "Qardaş": {
        "en": "Brother",
        "ru": "Брат"
      },
      "Qonşu": {
        "en": "Neighbor",
        "ru": "Сосед"
      }
    },
    "explanation": {
      "az": "Afərin! Analar dünyanın ən fədakar və şəfqətli insanlarıdır! 👩❤️",
      "en": "Well done! Mothers are the most caring and devoted people! 👩❤️",
      "ru": "Молодец! Мама — самый добрый и любящий человек! 👩❤️"
    }
  },
  "fam-dad-2": {
    "question": {
      "az": "Ailəmizi qoruyan və qayğımıza qalan güclü şəxs kimdir?",
      "en": "Who is the strong protector who cares for our family?",
      "ru": "Кто защищает семью и заботится о нас?"
    },
    "instruction": {
      "az": "Ailəmizin dayağı olan atanı tap.",
      "en": "Find father, the pillar of our family.",
      "ru": "Найди папу, опору нашей семьи."
    },
    "options": {
      "Ata": {
        "en": "Father",
        "ru": "Папа"
      },
      "Bacı": {
        "en": "Sister",
        "ru": "Сестра"
      },
      "Körpə": {
        "en": "Baby",
        "ru": "Малыш"
      }
    },
    "explanation": {
      "az": "Düzdür! Ata bizim ən böyük qəhrəmanımızdır! 👨💪",
      "en": "Correct! Father is our greatest hero! 👨💪",
      "ru": "Правильно! Папа — наш главный герой! 👨💪"
    }
  },
  "fam-grandma-3": {
    "question": {
      "az": "Bizə maraqlı nağıllar söyləyən sevimli ağsaçlı nənəmiz hansıdır?",
      "en": "Which one is our beloved grandmother who narrates fairy tales?",
      "ru": "Какая из них любимая седовласая бабушка, читающая сказки?"
    },
    "instruction": {
      "az": "Bizə şirin nağıllar söyləyən nənəni tap.",
      "en": "Find grandma who tells wonderful stories.",
      "ru": "Найди бабушку, которая рассказывает сказки."
    },
    "options": {
      "Nənə": {
        "en": "Grandmother",
        "ru": "Бабушка"
      },
      "Körpə": {
        "en": "Baby",
        "ru": "Малыш"
      },
      "Qardaş": {
        "en": "Brother",
        "ru": "Брат"
      }
    },
    "explanation": {
      "az": "Əla! Nənəmizin nağılları çox şirindir! 👵📖",
      "en": "Great! Grandmother's fairy tales are delightful! 👵📖",
      "ru": "Отлично! Бабушкины сказки самые сладкие! 👵📖"
    }
  },
  "fam-grandpa-4": {
    "question": {
      "az": "Bizi gəzintiyə aparan və öyüd verən ağsaqqal babamız hansıdır?",
      "en": "Which one is our wise grandfather who takes us on walks?",
      "ru": "Кто наш мудрый дедушка, который гуляет с нами в саду?"
    },
    "instruction": {
      "az": "Ağsaqqal mehriban babamızı tap.",
      "en": "Find our kind wise grandfather.",
      "ru": "Найди нашего доброго мудрого дедушку."
    },
    "options": {
      "Baba": {
        "en": "Grandfather",
        "ru": "Дедушка"
      },
      "Bacı": {
        "en": "Sister",
        "ru": "Сестра"
      },
      "Ana": {
        "en": "Mother",
        "ru": "Мама"
      }
    },
    "explanation": {
      "az": "Super! Babamız həmişə bizə xeyirxahlıq öyrədir! 👴❤️",
      "en": "Super! Grandfather always inspires kindness! 👴❤️",
      "ru": "Супер! Дедушка всегда учит доброте и заботе! 👴❤️"
    }
  },
  "cmd-clap-1": {
    "question": {
      "az": "Musiqi çalınanda ritmlə nə edirik?",
      "en": "What do we do to the rhythm when music plays?",
      "ru": "Что мы делаем в такт под музыку?"
    },
    "instruction": {
      "az": "Şən musiqi çalınanda nə edirik?",
      "en": "What do we do when cheerful music plays?",
      "ru": "Что мы делаем, когда играет веселая музыка?"
    },
    "options": {
      "Əl çalırıq": {
        "en": "Clap hands",
        "ru": "Хлопаем в ладоши"
      },
      "Yatırıq": {
        "en": "Sleep",
        "ru": "Спим"
      },
      "Ağlayırıq": {
        "en": "Cry",
        "ru": "Плачем"
      }
    },
    "explanation": {
      "az": "Afərin! Şən musiqi ilə əl çalırıq! 👏🎉",
      "en": "Well done! We clap happily to music! 👏🎉",
      "ru": "Молодец! Под музыку мы весело хлопаем! 👏🎉"
    }
  },
  "cmd-stand-2": {
    "question": {
      "az": "Müəllim 'Ayağa qalx!' deyəndə nə edirik?",
      "en": "What do we do when teacher says 'Stand up!'?",
      "ru": "Что мы делаем, когда говорят «Встань прямо!»?"
    },
    "instruction": {
      "az": "İdman başlayanda ayağa qalxmağı seç.",
      "en": "Select standing up when exercise starts.",
      "ru": "Выбери «встать», когда начинается зарядка."
    },
    "options": {
      "Ayağa qalxırıq": {
        "en": "Stand up",
        "ru": "Встаем"
      },
      "Uzanırıq": {
        "en": "Lie down",
        "ru": "Ложимся"
      },
      "Qaçırıq": {
        "en": "Run",
        "ru": "Бежим"
      }
    },
    "explanation": {
      "az": "Düzdür! İdman üçün qamətimizi düz tutub ayağa qalxırıq! 🧍",
      "en": "Correct! We stand tall and straight for gymnastics! 🧍",
      "ru": "Правильно! Для разминки мы встаем прямо! 🧍"
    }
  },
  "cmd-sit-3": {
    "question": {
      "az": "Yorulduqda və ya dərs yazarkən nə edirik?",
      "en": "What do we do when tired or writing homework?",
      "ru": "Что мы делаем, когда устали или пишем уроки?"
    },
    "instruction": {
      "az": "Dərs oxumaq üçün stulda oturmağı tap.",
      "en": "Find sitting on the chair to study.",
      "ru": "Найди действие «сесть на стул» для учебы."
    },
    "options": {
      "Stulda otururuq": {
        "en": "Sit on chair",
        "ru": "Садимся на стул"
      },
      "Tullanırıq": {
        "en": "Jump",
        "ru": "Прыгаем"
      },
      "Üzürük": {
        "en": "Swim",
        "ru": "Плаваем"
      }
    },
    "explanation": {
      "az": "Əla! Masanın arxasında rahat otururuq! 🪑",
      "en": "Great! We sit comfortably at the table! 🪑",
      "ru": "Отлично! Мы удобно садимся за стол! 🪑"
    }
  },
  "cmd-wave-4": {
    "question": {
      "az": "Dostumuza salam verərkən və ya sağollaşarkən nə edirik?",
      "en": "What do we do when greeting or saying goodbye to a friend?",
      "ru": "Что мы делаем, здороваясь или прощаясь с другом?"
    },
    "instruction": {
      "az": "Dostlara salam vermək üçün əl sallamağı seç.",
      "en": "Select waving hand to greet friends.",
      "ru": "Выбери «помаши рукой», чтобы поздороваться."
    },
    "options": {
      "Əl sallayırıq": {
        "en": "Wave hand",
        "ru": "Машем рукой"
      },
      "Yatırıq": {
        "en": "Sleep",
        "ru": "Засыпаем"
      },
      "Gizlənirik": {
        "en": "Hide",
        "ru": "Прячемся"
      }
    },
    "explanation": {
      "az": "Möhtəşəm! Əl sallayaraq dostlarımıza mehribanlıq göstəririk! 👋❤️",
      "en": "Awesome! Waving our hand shows warmth to friends! 👋❤️",
      "ru": "Замечательно! Взмахом руки мы приветствуем друзей! 👋❤️"
    }
  },
  "cmd2-toy-box-1": {
    "question": {
      "az": "Topu yerdən götürdükdən sonra səliqə üçün onu hara qoymalıyıq?",
      "en": "After picking up the ball, where should we tidy it away?",
      "ru": "Куда нужно положить мяч после того, как подняли его?"
    },
    "instruction": {
      "az": "Əvvəl topu götür, sonra nə etməlisən?",
      "en": "First pick up the ball, what should you do next?",
      "ru": "Сначала возьми мяч, что нужно сделать потом?"
    },
    "options": {
      "Qutuya qoyuruq": {
        "en": "Put into box",
        "ru": "Кладем в коробку"
      },
      "Pəncərədən atırıq": {
        "en": "Throw out window",
        "ru": "Бросаем в окно"
      },
      "Yatırıq": {
        "en": "Go to sleep",
        "ru": "Засыпаем"
      }
    },
    "explanation": {
      "az": "Afərin! Oyuncaqları qutuya yığmaq otağı təmiz saxlayır! ⚽📦",
      "en": "Well done! Storing toys in boxes keeps the room tidy! ⚽📦",
      "ru": "Молодец! Складывание игрушек в коробку сохраняет чистоту! ⚽📦"
    }
  },
  "cmd2-wash-hands-2": {
    "question": {
      "az": "Əllərimizi sabunla köpükləndirdikdən sonra nə etməliyik?",
      "en": "What do we do after soaping our hands?",
      "ru": "Что нужно сделать после того, как намылили руки?"
    },
    "instruction": {
      "az": "Əlləri sabunladıqdan sonra növbəti addımı tap.",
      "en": "Find the next step after soaping hands.",
      "ru": "Найди следующий шаг после намыливания рук."
    },
    "options": {
      "Təmiz su ilə yaxalayırıq": {
        "en": "Rinse with water",
        "ru": "Смываем чистой водой"
      },
      "Şokolad yeyirik": {
        "en": "Eat chocolate",
        "ru": "Едим шоколад"
      },
      "Torpağa toxunuruq": {
        "en": "Touch soil",
        "ru": "Трогаем землю"
      }
    },
    "explanation": {
      "az": "Düzdür! Su ilə köpüyü yuyub əlləri təmiz edirik! 🧼💧",
      "en": "Correct! Rinsing away soap foam leaves hands clean! 🧼💧",
      "ru": "Правильно! Смываем мыльную пену водой, и ручки чистые! 🧼💧"
    }
  },
  "cmd2-shoes-walk-3": {
    "question": {
      "az": "Parka gəzməyə çıxmazdan əvvəl ayağımıza nə geyinirik?",
      "en": "What do we put on our feet before strolling in the park?",
      "ru": "Что мы надеваем на ноги перед прогулкой в парке?"
    },
    "instruction": {
      "az": "Həyətə çıxmazdan əvvəl ayaqqabını nə etməliyik?",
      "en": "What should we do with shoes before going outside?",
      "ru": "Что нужно сделать с обувью перед выходом на улицу?"
    },
    "options": {
      "Ayaqqabını geyinirik": {
        "en": "Put on shoes",
        "ru": "Надеваем обувь"
      },
      "Əlcək geyinirik": {
        "en": "Put on gloves",
        "ru": "Надеваем перчатки"
      },
      "Papaq yeməyə başlayırıq": {
        "en": "Eat a hat",
        "ru": "Едим шапку"
      }
    },
    "explanation": {
      "az": "Super! Ayaqqabını geyinirik, sonra qapıdan çölə çıxırıq! 👟🌳",
      "en": "Super! We put on shoes, then step outside! 👟🌳",
      "ru": "Супер! Надеваем обувь, а потом идем на улицу! 👟🌳"
    }
  },
  "cmd2-book-close-4": {
    "question": {
      "az": "Kitabı oxuduqdan sonra onu səliqə ilə hara qoyuruq?",
      "en": "After reading the book, where do we neatly place it?",
      "ru": "Куда аккуратно ставим книгу после чтения?"
    },
    "instruction": {
      "az": "Nağıl kitabını oxuduqdan sonra nə edirik?",
      "en": "What do we do after reading the story book?",
      "ru": "Что делаем после чтения книги со сказками?"
    },
    "options": {
      "Kitab rəfinə qoyuruq": {
        "en": "Put on bookshelf",
        "ru": "Ставим на полку"
      },
      "Yerdə qoyub gedirik": {
        "en": "Leave on floor",
        "ru": "Бросаем на пол"
      },
      "Cırırıq": {
        "en": "Tear it",
        "ru": "Рвем книгу"
      }
    },
    "explanation": {
      "az": "Afərin! Kitabları həmişə rəfdə səliqəli saxlayırıq! 📖📚",
      "en": "Well done! We always keep books tidy on shelves! 📖📚",
      "ru": "Молодец! Книги всегда аккуратно хранятся на полках! 📖📚"
    }
  },
  "space-on-1": {
    "question": {
      "az": "Kitab masanın harasındadır?",
      "en": "Where is the book on the table?",
      "ru": "Где лежит книга на столе?"
    },
    "instruction": {
      "az": "Şəklə bax və kitabın yerini de.",
      "en": "Look at the picture and find where the book is.",
      "ru": "Посмотри на картинку и скажи, где книга."
    },
    "options": {
      "Üstündə": {
        "en": "On top",
        "ru": "На столе"
      },
      "Altında": {
        "en": "Underneath",
        "ru": "Под столом"
      },
      "İçində": {
        "en": "Inside",
        "ru": "Внутри"
      }
    },
    "explanation": {
      "az": "Bəli! Kitab masanın tam üstündə qoyulub! 📖🪑",
      "en": "Yes! The book is right on top of the table! 📖🪑",
      "ru": "Да! Книга лежит прямо на столе! 📖🪑"
    }
  },
  "space-under-2": {
    "question": {
      "az": "Pişik masanın harasındadır?",
      "en": "Where is the cat under the table?",
      "ru": "Где сидит кошка под столом?"
    },
    "instruction": {
      "az": "Şəklə bax: Pişik harada əyləşib?",
      "en": "Look at the picture: Where is the cat sitting?",
      "ru": "Посмотри на картинку: Где сидит кошка?"
    },
    "options": {
      "Altında": {
        "en": "Underneath",
        "ru": "Под столом"
      },
      "Üstündə": {
        "en": "On top",
        "ru": "На столе"
      },
      "Yanında": {
        "en": "Beside",
        "ru": "Рядом"
      }
    },
    "explanation": {
      "az": "Düzdür! Pişik masanın altında daldalanıb! 🐱⬇️🪑",
      "en": "Correct! The cat is resting under the table! 🐱⬇️🪑",
      "ru": "Правильно! Кошка спряталась под столом! 🐱⬇️🪑"
    }
  },
  "space-in-3": {
    "question": {
      "az": "Alma qutunun harasındadır?",
      "en": "Where is the apple in the box?",
      "ru": "Где яблоко в коробке?"
    },
    "instruction": {
      "az": "Şəklə bax: Alma haradadır?",
      "en": "Look at the picture: Where is the apple?",
      "ru": "Посмотри на картинку: Где яблоко?"
    },
    "options": {
      "İçində": {
        "en": "Inside",
        "ru": "Внутри"
      },
      "Üstündə": {
        "en": "On top",
        "ru": "Сверху"
      },
      "Altında": {
        "en": "Underneath",
        "ru": "Снизу"
      }
    },
    "explanation": {
      "az": "Əla! Qırmızı alma qutunun içindədir! 🍎📦",
      "en": "Great! The red apple is inside the box! 🍎📦",
      "ru": "Отлично! Красное яблоко лежит внутри коробки! 🍎📦"
    }
  },
  "space-beside-4": {
    "question": {
      "az": "Ayıcıq qutunun harasındadır?",
      "en": "Where is the teddy bear beside the box?",
      "ru": "Где мишка рядом с коробкой?"
    },
    "instruction": {
      "az": "Şəklə bax: Ayıcıq harada dayanıb?",
      "en": "Look at the picture: Where is the teddy bear?",
      "ru": "Посмотри на картинку: Где стоит мишка?"
    },
    "options": {
      "Yanında": {
        "en": "Beside",
        "ru": "Рядом"
      },
      "Üstündə": {
        "en": "On top",
        "ru": "Сверху"
      },
      "Altında": {
        "en": "Underneath",
        "ru": "Снизу"
      }
    },
    "explanation": {
      "az": "Möhtəşəm! Ayıcıq qutunun yanında əyləşib! 🧸👉📦",
      "en": "Awesome! The teddy bear is sitting beside the box! 🧸👉📦",
      "ru": "Замечательно! Мишка сидит рядом с коробкой! 🧸👉📦"
    }
  },
  "size-big-small-1": {
    "question": {
      "az": "Hansı heyvan daha böyük və nəhəngdir?",
      "en": "Which animal is bigger and huge?",
      "ru": "Какое животное больше и огромнее?"
    },
    "instruction": {
      "az": "Şəklə bax: Hansı heyvan daha böyükdür?",
      "en": "Look at the picture: Which animal is bigger?",
      "ru": "Посмотри на картинку: Какое животное больше?"
    },
    "options": {
      "Böyük Fil": {
        "en": "Big Elephant",
        "ru": "Большой слон"
      },
      "Kiçik Siçan": {
        "en": "Small Mouse",
        "ru": "Маленькая мышь"
      }
    },
    "explanation": {
      "az": "Afərin! Fil siçandan qat-qat böyükdür! 🐘",
      "en": "Well done! The elephant is much bigger than a mouse! 🐘",
      "ru": "Молодец! Слон намного больше мышки! 🐘"
    }
  },
  "size-fruit-small-2": {
    "question": {
      "az": "Qarpız və çiyələk arasında hansı daha kiçikdir?",
      "en": "Between watermelon and strawberry, which is smaller?",
      "ru": "Что меньше: арбуз или клубничка?"
    },
    "instruction": {
      "az": "Şəklə bax: Daha kiçik olan meyvəni tap.",
      "en": "Look at the picture: Find the smaller fruit.",
      "ru": "Посмотри на картинку: Найди меньшую ягоду."
    },
    "options": {
      "Kiçik Çiyələk": {
        "en": "Small Strawberry",
        "ru": "Маленькая клубника"
      },
      "Böyük Qarpız": {
        "en": "Big Watermelon",
        "ru": "Большой арбуз"
      }
    },
    "explanation": {
      "az": "Düzdür! Çiyələk ovucumuza sığır, qarpız isə böyükdür! 🍓",
      "en": "Correct! A strawberry fits in our palm, while watermelon is huge! 🍓",
      "ru": "Правильно! Клубника помещается в ладошке, а арбуз огромный! 🍓"
    }
  },
  "size-tall-short-3": {
    "question": {
      "az": "Hansı heyvan daha hündür boya malikdir?",
      "en": "Which animal stands taller?",
      "ru": "Какое животное выше ростом?"
    },
    "instruction": {
      "az": "Şəklə bax: Hansı heyvan daha hündürdür?",
      "en": "Look at the picture: Which animal is taller?",
      "ru": "Посмотри на картинку: Какое животное выше?"
    },
    "options": {
      "Hündür Zürafə": {
        "en": "Tall Giraffe",
        "ru": "Высокий жираф"
      },
      "Alçaq İt": {
        "en": "Short Dog",
        "ru": "Низкая собака"
      }
    },
    "explanation": {
      "az": "Əla! Zürafə meşənin ən hündür heyvanıdır! 🦒",
      "en": "Great! The giraffe is the tallest animal in the woods! 🦒",
      "ru": "Отлично! Жираф — самое высокое животное! 🦒"
    }
  },
  "size-tree-short-4": {
    "question": {
      "az": "Şam ağacı və göbələk arasında hansı daha alçaqdır?",
      "en": "Between the pine tree and mushroom, which is shorter?",
      "ru": "Что ниже: елка или маленький грибок?"
    },
    "instruction": {
      "az": "Şəklə bax: Daha alçaq olanı seç.",
      "en": "Look at the picture: Select the shorter one.",
      "ru": "Посмотри на картинку: Выбери то, что ниже."
    },
    "options": {
      "Alçaq Göbələk": {
        "en": "Short Mushroom",
        "ru": "Низкий грибок"
      },
      "Hündür Ağac": {
        "en": "Tall Tree",
        "ru": "Высокое дерево"
      }
    },
    "explanation": {
      "az": "Super! Göbələk yerdə bitir və çox alçaqdır! 🍄",
      "en": "Super! The mushroom grows close to the ground and is short! 🍄",
      "ru": "Супер! Грибок растет у самой земли и он низенький! 🍄"
    }
  },
  "opp-hot-cold-1": {
    "question": {
      "az": "'İsti' sözünün əksi hansıdır?",
      "en": "What is the opposite of the word 'Hot'?",
      "ru": "Какая противоположность слову «Горячий»?"
    },
    "instruction": {
      "az": "İsti çayın əksi olan soyuq buzu tap.",
      "en": "Find cold ice, the opposite of hot tea.",
      "ru": "Найди холодный лед, противоположность горячему чаю."
    },
    "options": {
      "Soyuq Buz": {
        "en": "Cold Ice",
        "ru": "Холодный лед"
      },
      "İsti Alov": {
        "en": "Hot Fire",
        "ru": "Горячий огонь"
      },
      "Qaynar Çay": {
        "en": "Boiling Tea",
        "ru": "Кипящий чай"
      }
    },
    "explanation": {
      "az": "Düzdür! İsti sözünün əksi soyuq buzdur! 🧊",
      "en": "Correct! The opposite of hot is cold ice! 🧊",
      "ru": "Правильно! Противоположность горячему — холодный лед! 🧊"
    }
  },
  "opp-day-night-2": {
    "question": {
      "az": "'Gündüz' sözünün əksi hansıdır?",
      "en": "What is the opposite of the word 'Day'?",
      "ru": "Какая противоположность слову «День»?"
    },
    "instruction": {
      "az": "İşıqlı gündüzün əksi olan qaranlıq gecəni seç.",
      "en": "Select dark night, the opposite of bright day.",
      "ru": "Выбери темную ночь, противоположность светлому дню."
    },
    "options": {
      "Qaranlıq Gecə": {
        "en": "Dark Night",
        "ru": "Темная ночь"
      },
      "Parlaq Günəş": {
        "en": "Bright Sun",
        "ru": "Яркое солнце"
      },
      "Göyqurşağı": {
        "en": "Rainbow",
        "ru": "Радуга"
      }
    },
    "explanation": {
      "az": "Afərin! Gündüzün əksi qaranlıq və sakit gecədir! 🌙⭐",
      "en": "Well done! The opposite of day is quiet night! 🌙⭐",
      "ru": "Молодец! Противоположность дню — тихая ночь! 🌙⭐"
    }
  },
  "opp-fast-slow-3": {
    "question": {
      "az": "'Sürətli' sözünün əksi hansıdır?",
      "en": "What is the opposite of the word 'Fast'?",
      "ru": "Какая противоположность слову «Быстрый»?"
    },
    "instruction": {
      "az": "Sürətli qaçan heyvanın əksi olan yavaş tısbağanı tap.",
      "en": "Find the slow turtle, the opposite of the fast runner.",
      "ru": "Найди медленную черепаху, противоположность быстрому бегуну."
    },
    "options": {
      "Yavaş Tısbağa": {
        "en": "Slow Turtle",
        "ru": "Медленная черепаха"
      },
      "Sürətli Bəbir": {
        "en": "Fast Leopard",
        "ru": "Быстрый леопард"
      },
      "Cəld Dovşan": {
        "en": "Quick Bunny",
        "ru": "Шустрый кролик"
      }
    },
    "explanation": {
      "az": "Əla! Tısbağa aramla və çox yavaş addımlayır! 🐢",
      "en": "Great! The turtle walks very slowly and calmly! 🐢",
      "ru": "Отлично! Черепашка шагает не спеша и очень медленно! 🐢"
    }
  },
  "opp-clean-dirty-4": {
    "question": {
      "az": "Çirkli sözünün əksi hansıdır?",
      "en": "What is the opposite of the word 'Dirty'?",
      "ru": "Какая противоположность слову «Грязный»?"
    },
    "instruction": {
      "az": "Çirkli əllərin əksi nədir? Təmiz əlləri tap.",
      "en": "What is the opposite of dirty hands? Find clean hands.",
      "ru": "Какая противоположность грязным рукам? Найди чистые руки."
    },
    "options": {
      "Təmiz Sabunlu Əl": {
        "en": "Clean Soapy Hand",
        "ru": "Чистые мыльные руки"
      },
      "Palçıqlı Çəkmə": {
        "en": "Muddy Boot",
        "ru": "Грязный сапог"
      },
      "Tozlu Parça": {
        "en": "Dusty Cloth",
        "ru": "Пыльная тряпка"
      }
    },
    "explanation": {
      "az": "Super! Sabunla yuyulmuş əllər tərtəmizdir! 🧼✨",
      "en": "Super! Hands washed with soap are squeaky clean! 🧼✨",
      "ru": "Супер! Вымытые с мылом ручки сияют чистотой! 🧼✨"
    }
  },
  "num-count-3-apples-1": {
    "question": {
      "az": "Ekranda neçə dənə dadlı alma görürsən?",
      "en": "How many delicious apples do you see on the screen?",
      "ru": "Сколько вкусных яблок ты видишь на экране?"
    },
    "instruction": {
      "az": "Şəklə bax və almaları say: Neçə alma var?",
      "en": "Look at the picture and count: How many apples are there?",
      "ru": "Посмотри на картинку и посчитай: Сколько яблок?"
    },
    "options": {
      "3 Alma": {
        "en": "3 Apples",
        "ru": "3 Яблока"
      },
      "1 Alma": {
        "en": "1 Apple",
        "ru": "1 Яблоко"
      },
      "5 Alma": {
        "en": "5 Apples",
        "ru": "5 Яблок"
      }
    },
    "explanation": {
      "az": "Afərin! Birlikdə saydıq: 1, 2, 3 alma! 🍎🍎🍎",
      "en": "Well done! We counted together: 1, 2, 3 apples! 🍎🍎🍎",
      "ru": "Молодец! Посчитали вместе: 1, 2, 3 яблока! 🍎🍎🍎"
    }
  },
  "num-fingers-5-2": {
    "question": {
      "az": "Bir əlimizi açdıqda neçə dənə barmağımız olur?",
      "en": "When we open one hand, how many fingers are there?",
      "ru": "Сколько пальчиков на одной руке, если ее раскрыть?"
    },
    "instruction": {
      "az": "Bir əlimizdə neçə barmaq olduğunu seç.",
      "en": "Select how many fingers are on one hand.",
      "ru": "Выбери, сколько пальцев на одной руке."
    },
    "options": {
      "5 Barmaq": {
        "en": "5 Fingers",
        "ru": "5 Пальцев"
      },
      "2 Barmaq": {
        "en": "2 Fingers",
        "ru": "2 Пальца"
      },
      "10 Barmaq": {
        "en": "10 Fingers",
        "ru": "10 Пальцев"
      }
    },
    "explanation": {
      "az": "Əla! Bir əlimizdə düz 5 dənə barmaq var! ✋✨",
      "en": "Great! Exactly 5 fingers on one hand! ✋✨",
      "ru": "Отлично! На одной руке ровно 5 пальцев! ✋✨"
    }
  },
  "num-sun-1-3": {
    "question": {
      "az": "Göydə gündüzlər işıq saçan neçə dənə günəş var?",
      "en": "How many suns shine bright in the sky during the day?",
      "ru": "Сколько солнышек сияет на небе днем?"
    },
    "instruction": {
      "az": "Səmada neçə parlaq günəş olduğunu seç.",
      "en": "Select how many shining suns are in the sky.",
      "ru": "Выбери, сколько ярких солнышек светит на небе."
    },
    "options": {
      "1 Günəş": {
        "en": "1 Sun",
        "ru": "1 Солнце"
      },
      "4 Günəş": {
        "en": "4 Suns",
        "ru": "4 Солнца"
      },
      "8 Günəş": {
        "en": "8 Suns",
        "ru": "8 Солнц"
      }
    },
    "explanation": {
      "az": "Düzdür! Dünyamızı bir dənə parlaq günəş isidir! ☀️",
      "en": "Correct! One bright sun warms our world! ☀️",
      "ru": "Правильно! Одно яркое солнце греет наш мир! ☀️"
    }
  },
  "num-after-5-4": {
    "question": {
      "az": "Sayarkən 5 rəqəmindən dərhal sonra hansı rəqəm gəlir?",
      "en": "Which number comes immediately after 5 when counting?",
      "ru": "Какое число идет сразу за числом 5 при счете?"
    },
    "instruction": {
      "az": "5-dən sonra hansı rəqəmin gəldiyini tap.",
      "en": "Find which number comes after 5.",
      "ru": "Найди, какое число идет после 5."
    },
    "options": {
      "6 Rəqəmi": {
        "en": "Number 6",
        "ru": "Число 6"
      },
      "4 Rəqəmi": {
        "en": "Number 4",
        "ru": "Число 4"
      },
      "2 Rəqəmi": {
        "en": "Number 2",
        "ru": "Число 2"
      }
    },
    "explanation": {
      "az": "Bəli! 5-dən sonra məhz 6 rəqəmi gəlir! 6️⃣",
      "en": "Yes! Number 6 comes right after 5! 6️⃣",
      "ru": "Да! Сразу за числом 5 идет число 6! 6️⃣"
    }
  },
  "num-ten-10-5": {
    "question": {
      "az": "Sayarkən 9-dan sonra hansı böyük rəqəm gəlir?",
      "en": "Which big number comes after 9 when counting?",
      "ru": "Какое круглое число идет после 9 при счете?"
    },
    "instruction": {
      "az": "9-dan sonra gələn 10 rəqəmini seç.",
      "en": "Select number 10, which follows 9.",
      "ru": "Выбери число 10, следующее за 9."
    },
    "options": {
      "10 Rəqəmi": {
        "en": "Number 10",
        "ru": "Число 10"
      },
      "7 Rəqəmi": {
        "en": "Number 7",
        "ru": "Число 7"
      },
      "3 Rəqəmi": {
        "en": "Number 3",
        "ru": "Число 3"
      }
    },
    "explanation": {
      "az": "Möhtəşəm! 10 tam bir onluqdur! 🔟🎉",
      "en": "Awesome! 10 is a full ten! 🔟🎉",
      "ru": "Замечательно! 10 — это целый десяток! 🔟🎉"
    }
  },
  "let-a-apple-1": {
    "question": {
      "az": "'Alma' sözü hansı gözəl hərflə başlayır?",
      "en": "Which letter does the word 'Alma' (Apple) start with?",
      "ru": "С какой буквы начинается слово «Алма» (Яблоко)?"
    },
    "instruction": {
      "az": "'Alma' sözünün ilk hərfini tap.",
      "en": "Find the first letter of the word 'Apple'.",
      "ru": "Найди первую букву слова «Яблоко» / «Алма»."
    },
    "options": {
      "'A' hərfi": {
        "en": "Letter 'A'",
        "ru": "Буква «А»"
      },
      "'B' hərfi": {
        "en": "Letter 'B'",
        "ru": "Буква «Б»"
      },
      "'O' hərfi": {
        "en": "Letter 'O'",
        "ru": "Буква «О»"
      }
    },
    "explanation": {
      "az": "Afərin! 'Alma' sözü məhz 'A' hərfi ilə başlayır! 🍎🅰️",
      "en": "Well done! The word 'Alma' begins with letter 'A'! 🍎🅰️",
      "ru": "Молодец! Слово «Алма» начинается с буквы «А»! 🍎🅰️"
    }
  },
  "let-b-fish-2": {
    "question": {
      "az": "'Balıq' və 'Banan' sözləri hansı hərflə başlayır?",
      "en": "Which letter do 'Balıq' and 'Banan' start with?",
      "ru": "С какой буквы начинаются слова «Балык» и «Банан»?"
    },
    "instruction": {
      "az": "'Balıq' sözünün ilk hərfini seç.",
      "en": "Select the first letter of 'Balıq' (Fish).",
      "ru": "Выбери первую букву слова «Балык» (Рыба)."
    },
    "options": {
      "'B' hərfi": {
        "en": "Letter 'B'",
        "ru": "Буква «Б»"
      },
      "'A' hərfi": {
        "en": "Letter 'A'",
        "ru": "Буква «А»"
      },
      "'C' hərfi": {
        "en": "Letter 'C'",
        "ru": "Буква «В»"
      }
    },
    "explanation": {
      "az": "Əla! 'Balıq' sözü 'B' hərfi ilə başlayır! 🐟🅱️",
      "en": "Great! 'Balıq' begins with letter 'B'! 🐟🅱️",
      "ru": "Отлично! Слово «Балык» начинается с буквы «Б»! 🐟🅱️"
    }
  },
  "let-c-chick-3": {
    "question": {
      "az": "'Cücə' sözü hansı sevimli hərflə başlayır?",
      "en": "Which letter does the word 'Cücə' begin with?",
      "ru": "С какой буквы начинается слово «Цыпленок» / «Джуджа»?"
    },
    "instruction": {
      "az": "'Cücə' sözünün ilk hərfini tap.",
      "en": "Find the first letter of 'Cücə' (Chick).",
      "ru": "Найди первую букву слова «Джуджа» (Цыпленок)."
    },
    "options": {
      "'C' hərfi": {
        "en": "Letter 'C'",
        "ru": "Буква «C»"
      },
      "'A' hərfi": {
        "en": "Letter 'A'",
        "ru": "Буква «А»"
      },
      "'M' hərfi": {
        "en": "Letter 'M'",
        "ru": "Буква «М»"
      }
    },
    "explanation": {
      "az": "Düzdür! 'C' hərfi ilə sarı cücə oxuyur! 🐥🅲",
      "en": "Correct! Letter 'C' starts the chick word! 🐥🅲",
      "ru": "Правильно! Буква «C» начинает слово цыпленка! 🐥🅲"
    }
  },
  "let-d-rabbit-4": {
    "question": {
      "az": "'Dovşan' və 'Dəniz' sözləri hansı hərflə başlayır?",
      "en": "Which letter do 'Dovşan' and 'Dəniz' start with?",
      "ru": "С какой буквы начинаются слова «Довшан» и «Дениз»?"
    },
    "instruction": {
      "az": "'Dovşan' sözünün ilk hərfini tap.",
      "en": "Find the first letter of 'Dovşan' (Bunny).",
      "ru": "Найди первую букву слова «Довшан» (Заяц)."
    },
    "options": {
      "'D' hərfi": {
        "en": "Letter 'D'",
        "ru": "Буква «Д»"
      },
      "'B' hərfi": {
        "en": "Letter 'B'",
        "ru": "Буква «Б»"
      },
      "'K' hərfi": {
        "en": "Letter 'K'",
        "ru": "Буква «К»"
      }
    },
    "explanation": {
      "az": "Super! 'Dovşan' sözü 'D' hərfi ilə başlayır! 🐰🅳",
      "en": "Super! 'Dovşan' starts with letter 'D'! 🐰🅳",
      "ru": "Супер! Слово «Довшан» начинается с буквы «Д»! 🐰🅳"
    }
  },
  "snd-wind-1": {
    "question": {
      "az": "Güclü külək yarpaqları tərpədərkən hansı səsi çıxarır?",
      "en": "Which sound does strong wind make rustling leaves?",
      "ru": "Какой звук издает сильный ветер, качая листву?"
    },
    "instruction": {
      "az": "Külək əsəndə çıxan səsi seç.",
      "en": "Select the sound the wind makes when blowing.",
      "ru": "Выбери звук, который издает дующий ветер."
    },
    "options": {
      "💨 'Şşş-şşş'": {
        "en": "💨 'Shhh-shhh'",
        "ru": "💨 «Ш-ш-ш»"
      },
      "🐝 'Vzz-vzz'": {
        "en": "🐝 'Bzzz-bzzz'",
        "ru": "🐝 «Ж-ж-ж»"
      },
      "🚂 'Çu-çu'": {
        "en": "🚂 'Choo-choo'",
        "ru": "🚂 «Чу-чу»"
      }
    },
    "explanation": {
      "az": "Afərin! Külək yarpaqları yellədərək 'Şşş' edir! 💨🍃",
      "en": "Well done! The wind rustles leaves with 'Shhh'! 💨🍃",
      "ru": "Молодец! Ветер колышет листья со звуком «Ш-ш-ш»! 💨🍃"
    }
  },
  "snd-bee-2": {
    "question": {
      "az": "Bal arısı güllərdən şirə toplayanda hansı səslə vızıldayır?",
      "en": "Which buzzing sound does a bee make collecting nectar?",
      "ru": "С каким жужжанием пчелка собирает нектар с цветов?"
    },
    "instruction": {
      "az": "Güllərin üstündə uçan arının səsini seç.",
      "en": "Select the sound of the bee flying over flowers.",
      "ru": "Выбери звук пчелки, летающей над цветами."
    },
    "options": {
      "🐝 'Vzzz-vzzz'": {
        "en": "🐝 'Bzzz-bzzz'",
        "ru": "🐝 «Ж-ж-ж»"
      },
      "🐱 'Miyau'": {
        "en": "🐱 'Meow'",
        "ru": "🐱 «Мяу»"
      },
      "🐶 'Hav-hav'": {
        "en": "🐶 'Woof-woof'",
        "ru": "🐶 «Гав-гав»"
      }
    },
    "explanation": {
      "az": "Əla! Zəhmətkeş arı 'Vzzz' edərək bal hazırlayır! 🐝🍯",
      "en": "Great! The busy bee buzzes 'Bzzz' making honey! 🐝🍯",
      "ru": "Отлично! Трудолюбивая пчелка жужжит «Ж-ж-ж» и делает мед! 🐝🍯"
    }
  },
  "snd-train-3": {
    "question": {
      "az": "Dəmiryolunda gedən qatar fit verərkən hansı səsi çıxarır?",
      "en": "Which sound does a whistling train make on railway tracks?",
      "ru": "Какой звук издает поезд, свистя на рельсах?"
    },
    "instruction": {
      "az": "Relslərdə şütüyən qatarın səsini tap.",
      "en": "Find the sound of the train speeding on rails.",
      "ru": "Найди звук поезда, мчащегося по рельсам."
    },
    "options": {
      "🚂 'Çu-çu, çu-çu'": {
        "en": "🚂 'Choo-choo'",
        "ru": "🚂 «Чу-чу, чу-чу»"
      },
      "🔔 'Cin-cin'": {
        "en": "🔔 'Ding-dong'",
        "ru": "🔔 «Динь-динь»"
      },
      "💧 'Tıp-tıp'": {
        "en": "💧 'Drip-drop'",
        "ru": "💧 «Кап-кап»"
      }
    },
    "explanation": {
      "az": "Super! Qatar 'Çu-çu' edərək vaqonları aparır! 🚂✨",
      "en": "Super! The train goes 'Choo-choo' pulling wagons! 🚂✨",
      "ru": "Супер! Поезд со звуком «Чу-чу» мчит вперед! 🚂✨"
    }
  },
  "snd-water-4": {
    "question": {
      "az": "Yağış damlaları yarpaqlara və pəncərəyə dəyəndə hansı səs çıxır?",
      "en": "What sound do raindrops make falling on leaves and windows?",
      "ru": "Какой звук издают капли дождя, стуча по стеклу?"
    },
    "instruction": {
      "az": "Pəncərəyə düşən yağış damlasının səsini seç.",
      "en": "Select the sound of raindrops falling on the window.",
      "ru": "Выбери звук капель дождя, падающих на окно."
    },
    "options": {
      "💧 'Tıp-tıp, tıp-tıp'": {
        "en": "💧 'Drip-drop'",
        "ru": "💧 «Кап-кап, кап-кап»"
      },
      "🚗 'Bi-bi'": {
        "en": "🚗 'Beep-beep'",
        "ru": "🚗 «Би-би»"
      },
      "🥁 'Bum-bum'": {
        "en": "🥁 'Boom-boom'",
        "ru": "🥁 «Бум-бум»"
      }
    },
    "explanation": {
      "az": "Bəli! Yağış damcıları 'Tıp-tıp' edib təbiəti sulayır! 💧🌱",
      "en": "Yes! Raindrops go 'Drip-drop' watering nature! 💧🌱",
      "ru": "Да! Дождевые капли стучат «Кап-кап», поливая природу! 💧🌱"
    }
  },
  "voc-snow-1": {
    "question": {
      "az": "Qış fəslində səmada ağappaq lopa-lopa yağan nədir?",
      "en": "What falls softly from the sky as white flakes in winter?",
      "ru": "Что падает с неба белыми пушистыми хлопьями зимой?"
    },
    "instruction": {
      "az": "Qışda göydən yağan ağ dənəcikləri seç.",
      "en": "Select the white flakes falling from the sky in winter.",
      "ru": "Выбери белые хлопья, падающие с неба зимой."
    },
    "options": {
      "Qar dənələri": {
        "en": "Snowflakes",
        "ru": "Снежинки"
      },
      "İsti Günəş": {
        "en": "Warm Sun",
        "ru": "Теплое солнце"
      },
      "Külək": {
        "en": "Wind",
        "ru": "Ветер"
      }
    },
    "explanation": {
      "az": "Afərin! Qışda qar yağır və uşaqlar qardan adam düzəldirlər! ❄️☃️",
      "en": "Well done! Snow falls in winter and kids build snowmen! ❄️☃️",
      "ru": "Молодец! Зимой идет снег, и дети лепят снеговиков! ❄️☃️"
    }
  },
  "voc-rainbow-2": {
    "question": {
      "az": "Yağış kəsdikdən və günəş çıxdıqdan sonra səmada parlayan əlvan körpü nədir?",
      "en": "What colorful bridge shines in the sky after rain when sun emerges?",
      "ru": "Какой цветной мостик сияет в небе после дождя при солнце?"
    },
    "instruction": {
      "az": "Yağışdan sonra səmada görünən göyqurşağını tap.",
      "en": "Find the rainbow appearing in the sky after rain.",
      "ru": "Найди радугу, появляющуюся на небе после дождя."
    },
    "options": {
      "Göyqurşağı": {
        "en": "Rainbow",
        "ru": "Радуга"
      },
      "Qara Bulud": {
        "en": "Dark Cloud",
        "ru": "Темная туча"
      },
      "Şimşək": {
        "en": "Lightning",
        "ru": "Молния"
      }
    },
    "explanation": {
      "az": "Möhtəşəm! Göyqurşağında yeddi gözəl rəng var! 🌈✨",
      "en": "Awesome! The rainbow has seven glorious colors! 🌈✨",
      "ru": "Замечательно! В радуге семь прекрасных цветов! 🌈✨"
    }
  },
  "voc-sun-3": {
    "question": {
      "az": "Hər səhər doğan, bitkiləri və bizi isidən göy cismi hansıdır?",
      "en": "Which celestial body rises each morning warming plants and us?",
      "ru": "Какое небесное светило встает каждое утро и греет нас?"
    },
    "instruction": {
      "az": "Yer üzünü qızdıran parlaq günəşi seç.",
      "en": "Select the bright sun that warms the earth.",
      "ru": "Выбери яркое солнце, согревающее землю."
    },
    "options": {
      "Parlaq Günəş": {
        "en": "Bright Sun",
        "ru": "Яркое солнце"
      },
      "Soyuq Buz": {
        "en": "Cold Ice",
        "ru": "Холодный лед"
      },
      "Qaranlıq Gecə": {
        "en": "Dark Night",
        "ru": "Темная ночь"
      }
    },
    "explanation": {
      "az": "Düzdür! Günəş həyat mənbəyidir və hər kəsə enerji verir! ☀️🌻",
      "en": "Correct! The sun is the source of life and warmth! ☀️🌻",
      "ru": "Правильно! Солнце — источник жизни и тепла! ☀️🌻"
    }
  },
  "voc-autumn-leaf-4": {
    "question": {
      "az": "Payız gələndə ağaclardan saralıb yerə tökülən nədir?",
      "en": "What turns golden and falls to the ground in autumn?",
      "ru": "Что желтеет и падает на землю осенью?"
    },
    "instruction": {
      "az": "Payızda ağaclardan tökülən sarı-qızılı yarpağı tap.",
      "en": "Find the golden autumn leaf falling from trees.",
      "ru": "Найди золотой осенний лист, падающий с деревьев."
    },
    "options": {
      "Payız Yarpağı": {
        "en": "Autumn Leaf",
        "ru": "Осенний лист"
      },
      "Yaşıl Ot": {
        "en": "Green Grass",
        "ru": "Зеленая трава"
      },
      "Çiçək Qönçəsi": {
        "en": "Flower Bud",
        "ru": "Бутон цветка"
      }
    },
    "explanation": {
      "az": "Əla! Payızda yarpaqlar qızılı xalça kimi yerə səpələnir! 🍂🍁",
      "en": "Great! In autumn leaves scatter like a golden carpet! 🍂🍁",
      "ru": "Отлично! Осенью листья устилают землю золотым ковром! 🍂🍁"
    }
  },
  "sent-child-eats-apple-1": {
    "question": {
      "az": "Aşağıdakı sözlərdən 'Uşaq alma yeyir' cümləsini düzəlt:",
      "en": "Build the sentence 'Child eats apple' from the words below:",
      "ru": "Составь предложение «Ребенок ест яблоко» из слов ниже:"
    },
    "instruction": {
      "az": "Sözləri sırası ilə seçərək 'Uşaq alma yeyir' cümləsini qur.",
      "en": "Select the words in order to build 'Child eats apple'.",
      "ru": "Выбери слова по порядку: «Ребенок ест яблоко»."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! 'Uşaq alma yeyir' tam düzgün cümlədir! 🧒🍎",
      "en": "Well done! 'Child eats apple' is completely correct! 🧒🍎",
      "ru": "Молодец! «Ребенок ест яблоко» — отличное предложение! 🧒🍎"
    }
  },
  "sent-cat-drinks-milk-2": {
    "question": {
      "az": "Sözləri düzgün ardıcıllıqla toplayaraq cümlə qur:",
      "en": "Order words to make a clear sentence:",
      "ru": "Расставь слова в правильном порядке:"
    },
    "instruction": {
      "az": "'Pişik süd içir' cümləsini qur.",
      "en": "Build the sentence 'Cat drinks milk'.",
      "ru": "Составь предложение «Кошка пьет молоко»."
    },
    "options": {},
    "explanation": {
      "az": "Əla! 'Pişik süd içir' cümləsini çox gözəl qurdun! 🐱🥛",
      "en": "Great! You built 'Cat drinks milk' wonderfully! 🐱🥛",
      "ru": "Отлично! «Кошка пьет молоко» составлено верно! 🐱🥛"
    }
  },
  "sent-sun-shines-3": {
    "question": {
      "az": "Gözəl səhər üçün cümləni qur:",
      "en": "Build the sentence for a sunny morning:",
      "ru": "Составь предложение про солнечное утро:"
    },
    "instruction": {
      "az": "'Günəş işıq saçır' cümləsini düzəlt.",
      "en": "Build 'Sun shines bright'.",
      "ru": "Составь предложение «Солнце ярко светит»."
    },
    "options": {},
    "explanation": {
      "az": "Super! Parlaq günəş dünyamızı işıqlandırır! ☀️✨",
      "en": "Super! The bright sun illuminates our world! ☀️✨",
      "ru": "Супер! Яркое солнце освещает весь мир! ☀️✨"
    }
  },
  "qa-fish-swim-1": {
    "question": {
      "az": "Qızıl balıqlar harada yaşayır və üzür?",
      "en": "Where do goldfish live and swim?",
      "ru": "Где живут и плавают золотые рыбки?"
    },
    "instruction": {
      "az": "Balığın harada üzdüyünü tap.",
      "en": "Find where the fish swims.",
      "ru": "Найди, где плавает рыбка."
    },
    "options": {
      "Suda və dənizdə": {
        "en": "In water and sea",
        "ru": "В воде и море"
      },
      "Ağacın budağında": {
        "en": "On a tree branch",
        "ru": "На ветке дерева"
      },
      "Buludun üstündə": {
        "en": "On a cloud",
        "ru": "На облаке"
      }
    },
    "explanation": {
      "az": "Afərin! Balıqlar təmiz suda quyruqlarını yelləyərək üzürlər! 🐟🌊",
      "en": "Well done! Fish swim wagging their tails in clear water! 🐟🌊",
      "ru": "Молодец! Рыбки плавают в чистой воде, шевеля хвостом! 🐟🌊"
    }
  },
  "qa-birds-fly-2": {
    "question": {
      "az": "Quşlar qanad çalıb harada sərbəst uçurlar?",
      "en": "Where do birds flap their wings and fly freely?",
      "ru": "Где птицы свободно летают, взмахивая крыльями?"
    },
    "instruction": {
      "az": "Quşların uçduğu yeri seç.",
      "en": "Select where birds fly.",
      "ru": "Выбери место, где летают птицы."
    },
    "options": {
      "Mavi səmada": {
        "en": "In the blue sky",
        "ru": "В синем небе"
      },
      "Qutunun içində": {
        "en": "Inside a box",
        "ru": "В коробке"
      },
      "Torpağın altında": {
        "en": "Underground",
        "ru": "Под землей"
      }
    },
    "explanation": {
      "az": "Əla! Quşlar uca mavi səmada uçurlar! 🐦🌤️",
      "en": "Great! Birds soar across the high blue sky! 🐦🌤️",
      "ru": "Отлично! Птицы парят высоко в синем небе! 🐦🌤️"
    }
  },
  "qa-sleep-night-3": {
    "question": {
      "az": "Göy üzündə ay və ulduzlar görünəndə nə vaxt olur və biz nə edirik?",
      "en": "When the moon and stars appear in the sky, what do we do?",
      "ru": "Когда на небе появляются луна и звезды, что наступает?"
    },
    "instruction": {
      "az": "Yuxuya getdiyimiz vaxtı seç.",
      "en": "Select the time we go to sleep.",
      "ru": "Выбери время, когда мы ложимся спать."
    },
    "options": {
      "Gecə yatıb dincəlirik": {
        "en": "Sleep at night",
        "ru": "Ночью спим и отдыхаем"
      },
      "Günorta nahar edirik": {
        "en": "Eat lunch",
        "ru": "Обедаем"
      },
      "Səhər qaçırıq": {
        "en": "Run in morning",
        "ru": "Бегаем утром"
      }
    },
    "explanation": {
      "az": "Düzdür! Gecə sakitlik düşəndə yatıb enerji toplayırıq! 🌙🛌",
      "en": "Correct! At peaceful night we sleep to restore our energy! 🌙🛌",
      "ru": "Правильно! Ночью в тишине мы спим и набираемся сил! 🌙🛌"
    }
  },
  "seq-plant-flower-1": {
    "question": {
      "az": "Toxumdan gülün böyümə ardıcıllığı necədir?",
      "en": "What is the sequence of a flower blooming from seed?",
      "ru": "Какова последовательность роста цветка из семени?"
    },
    "instruction": {
      "az": "Düzgün ardıcıllığı təkrarlayaq və təsdiq edək.",
      "en": "Let's review the steps in order and complete.",
      "ru": "Повторим правильный порядок шагов и завершим."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Toxum su və günəşlə böyüyüb gözəl gül oldu! 🌸🌱",
      "en": "Well done! The seed grew into a lovely flower with water and sun! 🌸🌱",
      "ru": "Молодец! Семечко с водой и солнцем выросло в прекрасный цветок! 🌸🌱"
    }
  },
  "seq-wash-apple-2": {
    "question": {
      "az": "Ağacdan dərildikdən sonra almanı yeməzdən qabaq ilk növbədə nə etməliyik?",
      "en": "Before eating an apple picked from the tree, what do we do first?",
      "ru": "Что нужно сделать с сорванным яблоком перед едой?"
    },
    "instruction": {
      "az": "Alma yeməzdən əvvəl nə etməliyik?",
      "en": "What must we do before eating an apple?",
      "ru": "Что нужно сделать перед тем, как съесть яблоко?"
    },
    "options": {
      "Əvvəl təmiz su ilə yuyuruq": {
        "en": "Wash thoroughly with water",
        "ru": "Сначала моем чистой водой"
      },
      "Yuyulmamış yeyirik": {
        "en": "Eat without washing",
        "ru": "Едим немытым"
      },
      "Torpağa basdırırıq": {
        "en": "Bury in soil",
        "ru": "Закапываем в землю"
      }
    },
    "explanation": {
      "az": "Düzdür! Meyvələri mütləq yuyub sonra təmiz-təmiz yeməliyik! 🍎🧼",
      "en": "Correct! Always wash fruits clean before enjoying them! 🍎🧼",
      "ru": "Правильно! Фрукты всегда нужно тщательно мыть перед едой! 🍎🧼"
    }
  },
  "seq-morning-routine-3": {
    "question": {
      "az": "Səhər oyananda ardıcıllıq necə olmalıdır?",
      "en": "What is the proper sequence upon waking up in the morning?",
      "ru": "Каков правильный порядок действий утром?"
    },
    "instruction": {
      "az": "Səhər addımlarının düzgün ardıcıllığını təsdiq et.",
      "en": "Confirm the correct order of morning steps.",
      "ru": "Подтверди правильный порядок утренних шагов."
    },
    "options": {},
    "explanation": {
      "az": "Super! Səhər təmizliyi və yeməyi günümüzü gümrah edir! ☀️🍳",
      "en": "Super! Fresh hygiene and breakfast power our whole day! ☀️🍳",
      "ru": "Супер! Утренняя гигиена и завтрак заряжают бодростью на весь день! ☀️🍳"
    }
  },
  "st-bear-honey-1": {
    "question": {
      "az": "Balaca ayı meşədə ağacın koğuşunda nə tapdı?",
      "en": "What did the little bear find in the hollow tree in the forest?",
      "ru": "Что нашел маленький мишка в дупле дерева?"
    },
    "instruction": {
      "az": "Hekayəni davam etdir: Ayı meşədə nə tapdı?",
      "en": "Continue the story: What did the bear find in the forest?",
      "ru": "Продолжи историю: Что нашел медведь в лесу?"
    },
    "options": {
      "Ləzzətli şirin bal": {
        "en": "Delicious sweet honey",
        "ru": "Сладкий вкусный мед"
      },
      "Ağır qaya daşı": {
        "en": "Heavy rock stone",
        "ru": "Тяжелый камень"
      },
      "Köhnə ayaqqabı": {
        "en": "Old shoe",
        "ru": "Старый ботинок"
      }
    },
    "explanation": {
      "az": "Afərin! Ayı ən sevdiyi şirin balı tapdı! 🐻🍯",
      "en": "Well done! The bear found his favorite sweet honey! 🐻🍯",
      "ru": "Молодец! Медведь нашел свой любимый сладкий медок! 🐻🍯"
    }
  },
  "st-bear-happy-2": {
    "question": {
      "az": "Balı yedikdən sonra ayı meşədə sevinclə nə etdi?",
      "en": "What did the bear do joyfully in the forest after eating?",
      "ru": "Что радостно сделал мишка в лесу после меда?"
    },
    "instruction": {
      "az": "Balı yedikdən sonra ayı nə etdi?",
      "en": "What did the bear do after eating honey?",
      "ru": "Что сделал медведь после того, как полакомился?"
    },
    "options": {
      "Şadlanıb dostları ilə rəqs etdi": {
        "en": "Danced happily with friends",
        "ru": "Весело плясал с друзьями"
      },
      "Ağlayıb kədərləndi": {
        "en": "Cried sadly",
        "ru": "Горько заплакал"
      },
      "Meşədən qaçdı": {
        "en": "Ran away from woods",
        "ru": "Убежал из леса"
      }
    },
    "explanation": {
      "az": "Əla! Dostlarla şadlanmaq nağılın ən gözəl sonluğudur! 🐻🎉",
      "en": "Great! Celebrating with friends is the best story ending! 🐻🎉",
      "ru": "Отлично! Праздновать с друзьями — лучший конец сказки! 🐻🎉"
    }
  },
  "st-magic-box-3": {
    "question": {
      "az": "Uşaqlar sehrli sandığı açanda oradan nə çıxdı?",
      "en": "What appeared when the children opened the magic box?",
      "ru": "Что появилось, когда дети открыли волшебный сундук?"
    },
    "instruction": {
      "az": "Sehrli sandıqçadan nə çıxdı?",
      "en": "What came out of the magic box?",
      "ru": "Что появилось из волшебного сундучка?"
    },
    "options": {
      "Parlaq ulduzlar və şarlar": {
        "en": "Bright stars and balloons",
        "ru": "Яркие звезды и шарики"
      },
      "Qara palçıq": {
        "en": "Black mud",
        "ru": "Черная грязь"
      },
      "Köhnə süpürgə": {
        "en": "Old broom",
        "ru": "Старая метла"
      }
    },
    "explanation": {
      "az": "Super! Sehrli ulduzlar hər tərəfə sevinc saçdı! ✨🎈",
      "en": "Super! Magic stars filled the room with joy! ✨🎈",
      "ru": "Супер! Волшебные звездочки озарили всё вокруг радостью! ✨🎈"
    }
  },
  "emo-happy-1": {
    "question": {
      "az": "Ad günümüzdə şad hədiyyə alanda hansı hissi keçiririk?",
      "en": "How do we feel when receiving a wonderful birthday present?",
      "ru": "Какое чувство мы испытываем, получая подарок на день рождения?"
    },
    "instruction": {
      "az": "Sevincli və xoşbəxt olan simanı tap.",
      "en": "Find the happy and joyful face.",
      "ru": "Найди радостное и счастливое личико."
    },
    "options": {
      "Sevinc və Təbəssüm": {
        "en": "Joy and Smile",
        "ru": "Радость и улыбка"
      },
      "Kədər və Ağlamaq": {
        "en": "Sadness and Tears",
        "ru": "Грусть и слезы"
      },
      "Qəzəbli Siman": {
        "en": "Angry Face",
        "ru": "Злое лицо"
      }
    },
    "explanation": {
      "az": "Afərin! Təbəssüm üzümüzə gözəllik və sevinc gətirir! 😊🎉",
      "en": "Well done! A smile brings joy and warmth to everyone! 😊🎉",
      "ru": "Молодец! Улыбка приносит радость и тепло всем вокруг! 😊🎉"
    }
  },
  "emo-sad-2": {
    "question": {
      "az": "Dizi əzilən və ya sevimli oyuncağı sınan uşaq hansı hissi keçirir?",
      "en": "How does a child feel when they scrape a knee or break a toy?",
      "ru": "Что чувствует малыш, если ушиб коленку или сломал игрушку?"
    },
    "instruction": {
      "az": "Kədərlənmiş simanı tap.",
      "en": "Find the sad face.",
      "ru": "Найди грустное личико."
    },
    "options": {
      "Kədərli Siman": {
        "en": "Sad Face",
        "ru": "Грустное лицо"
      },
      "Şən Gülüş": {
        "en": "Joyful Laugh",
        "ru": "Веселый смех"
      },
      "Yuxulu Siman": {
        "en": "Sleepy Face",
        "ru": "Сонное лицо"
      }
    },
    "explanation": {
      "az": "Doğrudur. Kədərlənəndə dostumuzu qucaqlayıb təsəlli veririk! 😢❤️",
      "en": "Correct. When someone is sad, we comfort them with a warm hug! 😢❤️",
      "ru": "Правильно. Когда другу грустно, мы обнимаем и утешаем его! 😢❤️"
    }
  },
  "emo-surprised-3": {
    "question": {
      "az": "Gözlənilmədən sehrli bir fişəng görəndə simamız necə olur?",
      "en": "How does our face look when suddenly seeing magic fireworks?",
      "ru": "Какое у нас лицо, когда мы внезапно видим волшебный салют?"
    },
    "instruction": {
      "az": "Təəccüblənmiş simanı seç.",
      "en": "Select the surprised face.",
      "ru": "Выбери удивленное личико."
    },
    "options": {
      "Təəccüb": {
        "en": "Surprise",
        "ru": "Удивление"
      },
      "Yorğunluq": {
        "en": "Tiredness",
        "ru": "Усталость"
      },
      "Qəzəb": {
        "en": "Anger",
        "ru": "Злость"
      }
    },
    "explanation": {
      "az": "Əla! 'Ooo!' deyərək heyrətlə təəccüblənirik! 😲✨",
      "en": "Great! We go 'Wow!' with wide eyes when surprised! 😲✨",
      "ru": "Отлично! Мы говорим «О-го!» с широко открытыми глазами! 😲✨"
    }
  },
  "emo-calm-4": {
    "question": {
      "az": "Gözəl nağıla qulaq asarkən necə rahat və sakit oluruq?",
      "en": "How calm and peaceful do we feel listening to a gentle story?",
      "ru": "Какое у нас чувство, когда мы спокойно слушаем добрую сказку?"
    },
    "instruction": {
      "az": "Sakit və dinc simanı tap.",
      "en": "Find the calm and peaceful face.",
      "ru": "Найди спокойное и умиротворенное личико."
    },
    "options": {
      "Dinc və Sakit": {
        "en": "Peaceful and Calm",
        "ru": "Спокойное и доброе"
      },
      "Qışqıran": {
        "en": "Screaming",
        "ru": "Кричащее"
      },
      "Hirslənən": {
        "en": "Furious",
        "ru": "Разгневанное"
      }
    },
    "explanation": {
      "az": "Super! Sakit olmaq qəlbimizə rahatlıq verir! 😌💖",
      "en": "Super! Feeling calm brings sweet harmony! 😌💖",
      "ru": "Супер! Спокойствие приносит умиротворение и тепло! 😌💖"
    }
  },
  "soc-hello-1": {
    "question": {
      "az": "Səhər bağçada və ya məktəbdə dostumuzu görəndə hansı mehriban sözü deyirik?",
      "en": "Which friendly word do we say when meeting a friend in the morning?",
      "ru": "Какое доброе слово мы говорим утром другу?"
    },
    "instruction": {
      "az": "Səhər dostumuzla qarşılaşanda nə deyirik?",
      "en": "What do we say when meeting a friend in the morning?",
      "ru": "Что мы говорим утром при встрече с другом?"
    },
    "options": {
      "👋 'Salam!'": {
        "en": "👋 'Hello!'",
        "ru": "👋 «Привет!»"
      },
      "🚪 'Uzaqlaş'": {
        "en": "🚪 'Go away'",
        "ru": "🚪 «Уходи»"
      },
      "😴 'Gecən xeyrə'": {
        "en": "😴 'Good night'",
        "ru": "😴 «Спокойной ночи»"
      }
    },
    "explanation": {
      "az": "Afərin! 'Salam!' sözü dostluğu və mehribanlığı möhkəmləndirir! 👋❤️",
      "en": "Well done! 'Hello!' opens the door to friendship! 👋❤️",
      "ru": "Молодец! «Привет!» открывает путь к дружбе! 👋❤️"
    }
  },
  "soc-thanks-2": {
    "question": {
      "az": "Dostumuz bizə oyuncaq verəndə və ya kömək edəndə nə deyirik?",
      "en": "What do we say when a friend shares a toy or helps us?",
      "ru": "Что мы говорим, когда друг делится игрушкой или помогает нам?"
    },
    "instruction": {
      "az": "Kimsə bizə kömək edəndə nə deyirik?",
      "en": "What do we say when someone helps us?",
      "ru": "Что мы говорим, когда нам помогают?"
    },
    "options": {
      "🙏 'Çox sağ ol!'": {
        "en": "🙏 'Thank you!'",
        "ru": "🙏 «Спасибо большое!»"
      },
      "😠 'İstəmirəm'": {
        "en": "😠 'I don't want'",
        "ru": "😠 «Не хочу»"
      },
      "🏃 'Qaçıram'": {
        "en": "🏃 'Running'",
        "ru": "🏃 «Убегаю»"
      }
    },
    "explanation": {
      "az": "Düzdür! 'Çox sağ ol!' demək ən gözəl nəzakət qaydasıdır! 🙏✨",
      "en": "Correct! Saying 'Thank you!' is wonderful etiquette! 🙏✨",
      "ru": "Правильно! Говорить «Спасибо!» — прекрасное правило вежливости! 🙏✨"
    }
  },
  "soc-please-3": {
    "question": {
      "az": "Qələm və ya su istəyəndə hansı sehrli sözdən istifadə edirik?",
      "en": "Which magic word do we say when politely asking for a pencil or water?",
      "ru": "Какое волшебное слово мы произносим при вежливой просьбе?"
    },
    "instruction": {
      "az": "Bir şey xahiş edərkən deyilən sehrli sözü tap.",
      "en": "Find the magic word used when asking politely.",
      "ru": "Найди волшебное слово вежливой просьбы."
    },
    "options": {
      "💖 'Zəhmət olmasa'": {
        "en": "💖 'Please'",
        "ru": "💖 «Пожалуйста»"
      },
      "😡 'Tez ver mənə!'": {
        "en": "😡 'Give it fast!'",
        "ru": "😡 «Быстро дай!»"
      },
      "😭 'Ağlayıram'": {
        "en": "😭 'Crying'",
        "ru": "😭 «Плачу»"
      }
    },
    "explanation": {
      "az": "Möhtəşəm! 'Zəhmət olmasa' hər qapını açan sehrli kəlmədir! 💖✨",
      "en": "Awesome! 'Please' is a magic key that opens every door! 💖✨",
      "ru": "Замечательно! «Пожалуйста» — волшебный ключ к добрым сердцам! 💖✨"
    }
  },
  "trn-slide-1": {
    "question": {
      "az": "Sürüşkəndə başqa bir uşaq olanda biz nə etməliyik?",
      "en": "What should we do when another child is sliding?",
      "ru": "Что нужно делать, когда на горке катается другой малыш?"
    },
    "instruction": {
      "az": "Meydançada sürüşkəndə növbə gözləmə qaydasını seç.",
      "en": "Select the turn-taking rule on the playground slide.",
      "ru": "Выбери правило очередности на детской горке."
    },
    "options": {
      "⏳ Səbirlə növbəmizi gözləyirik": {
        "en": "⏳ Wait patiently for turn",
        "ru": "⏳ Терпеливо ждем очереди"
      },
      "😡 Uşağı itələyirik": {
        "en": "😡 Push the child",
        "ru": "😡 Толкаем ребенка"
      },
      "😭 Qışqırırıq": {
        "en": "😭 Scream loudly",
        "ru": "😭 Кричим и плачем"
      }
    },
    "explanation": {
      "az": "Afərin! Səbirlə növbə gözləmək təhlükəsiz və çox mədənidir! 🛝✨",
      "en": "Well done! Waiting your turn is safe and polite! 🛝✨",
      "ru": "Молодец! Ждать очереди безопасно и вежливо! 🛝✨"
    }
  },
  "trn-share-toy-2": {
    "question": {
      "az": "Bir sevimli oyuncaqla dostumuzla necə oynamalıyıq?",
      "en": "How should we play with a friend when there is one toy?",
      "ru": "Как играть с другом, если машинка или кукла одна?"
    },
    "instruction": {
      "az": "Bir oyuncaq olanda necə oynamalıyıq?",
      "en": "How should we play when there is one toy?",
      "ru": "Как играть дружно, если игрушка одна?"
    },
    "options": {
      "👫 Növbə ilə birgə oynayırıq": {
        "en": "👫 Take turns playing together",
        "ru": "👫 Играем вместе по очереди"
      },
      "❌ Tək mən oynamalıyam": {
        "en": "❌ Only I should play",
        "ru": "❌ Только я играю"
      },
      "🗑️ Oyuncağı sındırırıq": {
        "en": "🗑️ Break the toy",
        "ru": "🗑️ Ломаем игрушку"
      }
    },
    "explanation": {
      "az": "Əla! Bölüşmək dostluğu daha da şirin edir! 👫❤️",
      "en": "Great! Sharing makes friendship even sweeter! 👫❤️",
      "ru": "Отлично! Умение делиться делает дружбу крепче! 👫❤️"
    }
  },
  "trn-board-game-3": {
    "question": {
      "az": "Masaüstü oyunda hər kəs zəri necə atmalıdır?",
      "en": "How should everyone roll the dice in a board game?",
      "ru": "Как нужно бросать кубик в настольной игре?"
    },
    "instruction": {
      "az": "Oyunda zəri kimin atdığını tap.",
      "en": "Find who rolls the dice in a game.",
      "ru": "Определи, кто бросает кубик в игре."
    },
    "options": {
      "🎯 Hər kəs öz növbəsində atır": {
        "en": "🎯 Everyone rolls on their turn",
        "ru": "🎯 Каждый бросает в свою очередь"
      },
      "🎲 Hamı eyni vaxtda atır": {
        "en": "🎲 Everyone grabs at once",
        "ru": "🎲 Все хватают сразу"
      },
      "❌ Zəri gizlədirik": {
        "en": "❌ Hide the dice",
        "ru": "❌ Прячем кубик"
      }
    },
    "explanation": {
      "az": "Super! Qaydalara əməl edəndə oyun hamıya zövq verir! 🎯🎉",
      "en": "Super! Following rules makes games fun for everyone! 🎯🎉",
      "ru": "Супер! Игра по правилам приносит радость всем! 🎯🎉"
    }
  },
  "rt-morning-wash-1": {
    "question": {
      "az": "Səhər yataqdan qalxan kimi ilk növbədə nə edirik?",
      "en": "As soon as we get out of bed in the morning, what do we do?",
      "ru": "Как только встаем с кровати утром, что мы делаем первым?"
    },
    "instruction": {
      "az": "Səhər yuxudan durduqda ilk növbədə nə etməliyik?",
      "en": "What should we do first upon waking up in the morning?",
      "ru": "Что первым делом нужно сделать, проснувшись утром?"
    },
    "options": {
      "🪥 Əl-üzümüzü və dişlərimizi yuyuruq": {
        "en": "🪥 Wash face and brush teeth",
        "ru": "🪥 Умываемся и чистим зубки"
      },
      "⚽ Futbol oynayırıq": {
        "en": "⚽ Play football",
        "ru": "⚽ Играем в мяч"
      },
      "📺 Cizgi filminə baxırıq": {
        "en": "📺 Watch cartoons",
        "ru": "📺 Смотрим мультики"
      }
    },
    "explanation": {
      "az": "Afərin! Səhər dişləri fırçalamaq mikrobları yox edir! 🪥✨",
      "en": "Well done! Brushing teeth morning eliminates bacteria! 🪥✨",
      "ru": "Молодец! Утренняя чистка зубов прогоняет микробов! 🪥✨"
    }
  },
  "rt-night-sleep-2": {
    "question": {
      "az": "Gecə saatı çatanda yatıb qüvvət toplamaq üçün hara gedirik?",
      "en": "When bedtime arrives, where do we go to sleep and restore energy?",
      "ru": "Когда наступает вечер, куда мы идем отдыхать и спать?"
    },
    "instruction": {
      "az": "Axşam yatmazdan əvvəl nə etməliyik?",
      "en": "What should we do before going to bed at night?",
      "ru": "Что нужно сделать перед сном вечером?"
    },
    "options": {
      "🛏️ Pijamanı geyinib yatağa uzanırıq": {
        "en": "🛏️ Put on pajamas and lie in bed",
        "ru": "🛏️ Надеваем пижаму и ложимся спать"
      },
      "🍫 Çoxlu şokolad yeyirik": {
        "en": "🍫 Eat lots of chocolate",
        "ru": "🍫 Едим много шоколада"
      },
      "🏃 Otaqda qaçırıq": {
        "en": "🏃 Run around the room",
        "ru": "🏃 Бегаем по комнате"
      }
    },
    "explanation": {
      "az": "Düzdür! Pijamanı geyinib rahat yuxuya gedirik! 🛏️🌙",
      "en": "Correct! We slip into pajamas and fall asleep soundly! 🛏️🌙",
      "ru": "Правильно! Надеваем пижамку и сладко засыпаем! 🛏️🌙"
    }
  },
  "rt-tidy-toys-3": {
    "question": {
      "az": "Oyuncaqlarla oynayıb qurtardıqdan sonra nə etmək lazımdır?",
      "en": "After playing with toys, what must we do?",
      "ru": "Что нужно сделать после того, как поиграли с игрушками?"
    },
    "instruction": {
      "az": "Oyun bitdikdən sonra nə etməliyik?",
      "en": "What should we do when playtime ends?",
      "ru": "Что нужно сделать после окончания игры?"
    },
    "options": {
      "📦 Oyuncaqları qutuya səliqə ilə yığırıq": {
        "en": "📦 Pack toys tidily into box",
        "ru": "📦 Аккуратно убираем игрушки в коробку"
      },
      "🗑️ Hər yerə dağıdırıq": {
        "en": "🗑️ Scatter everywhere",
        "ru": "🗑️ Раскидываем повсюду"
      },
      "🚪 Qapının arxasında gizlədirik": {
        "en": "🚪 Hide behind door",
        "ru": "🚪 Прячем за дверь"
      }
    },
    "explanation": {
      "az": "Əla! Otağımız həmişə təmiz və səliqəli olmalıdır! 📦✨",
      "en": "Great! Our room must always stay tidy and neat! 📦✨",
      "ru": "Отлично! Наша комната всегда должна быть чистой и аккуратной! 📦✨"
    }
  },
  "slf-wash-hands-1": {
    "question": {
      "az": "Çöldən evə gələndə və yeməkdən qabaq əllərimizi nə ilə yuyuruq?",
      "en": "What do we wash our hands with when returning home and before meals?",
      "ru": "Чем мы моем руки перед едой и после прогулки?"
    },
    "instruction": {
      "az": "Əllərimizi mikroblardan təmizləmək üçün nə lazımdır?",
      "en": "What do we need to clean our hands from germs?",
      "ru": "Что нужно, чтобы отмыть ручки от микробов?"
    },
    "options": {
      "🧼 Su və Sabunla": {
        "en": "🧼 Soap and Water",
        "ru": "🧼 Мыло и вода"
      },
      "🧃 Meyvə şirəsi ilə": {
        "en": "🧃 Fruit juice",
        "ru": "🧃 Фруктовый сок"
      },
      "🍞 Çörəklə": {
        "en": "🍞 Bread",
        "ru": "🍞 Хлеб"
      }
    },
    "explanation": {
      "az": "Afərin! Sabun köpüyü bütün mikrobları yox edir! 🧼✨",
      "en": "Well done! Soapy suds wash away all germs! 🧼✨",
      "ru": "Молодец! Мыльная пена смывает всех микробов! 🧼✨"
    }
  },
  "slf-comb-hair-2": {
    "question": {
      "az": "Səhər güzgüyə baxanda saçlarımızı səliqəli etmək üçün nə götürürük?",
      "en": "When looking in the mirror, what do we take to neaten our hair?",
      "ru": "Что мы берем, чтобы аккуратно причесаться перед зеркалом?"
    },
    "instruction": {
      "az": "Saçlarımızı səliqəyə salmaq üçün nə istifadə edirik?",
      "en": "What do we use to tidy our hair?",
      "ru": "Чем мы причесываем волосы?"
    },
    "options": {
      "🪮 Səliqəli Daraq": {
        "en": "🪮 Neat Comb",
        "ru": "🪮 Расческа"
      },
      "🥄 Şorba qaşığı": {
        "en": "🥄 Soup spoon",
        "ru": "🥄 Суповая ложка"
      },
      "✏️ Rəngli karandaş": {
        "en": "✏️ Colored pencil",
        "ru": "✏️ Цветной карандаш"
      }
    },
    "explanation": {
      "az": "Düzdür! Daraq saçlarımızı parıldadır və səliqəli edir! 🪮💇",
      "en": "Correct! A comb makes our hair neat and shiny! 🪮💇",
      "ru": "Правильно! Расческа делает волосы красивыми и опрятными! 🪮💇"
    }
  },
  "slf-brush-teeth-3": {
    "question": {
      "az": "Dişlərimizin sağlam və ağappaq olması üçün gündə iki dəfə nə ilə təmizləyirik?",
      "en": "To keep teeth healthy and white, what do we brush them with twice a day?",
      "ru": "Чем мы чистим зубки два раза в день для здоровья и белизны?"
    },
    "instruction": {
      "az": "Dişlərimizi təmizləmək üçün nə lazımdır?",
      "en": "What do we need to clean our teeth?",
      "ru": "Что нужно, чтобы почистить зубки?"
    },
    "options": {
      "🪥 Diş fırçası və dadlı məcun": {
        "en": "🪥 Toothbrush and toothpaste",
        "ru": "🪥 Зубная щетка и паста"
      },
      "🍴 Şorba çəngəli": {
        "en": "🍴 Soup fork",
        "ru": "🍴 Вилка"
      },
      "🔑 Dəmir açar": {
        "en": "🔑 Metal key",
        "ru": "🔑 Ключ"
      }
    },
    "explanation": {
      "az": "Super! Fırçalanmış dişlər parlaq və tam sağlamdır! 🪥🦷✨",
      "en": "Super! Brushed teeth shine white and stay healthy! 🪥🦷✨",
      "ru": "Супер! Почищенные зубки сияют белизной и здоровьем! 🪥🦷✨"
    }
  },
  "saf-traffic-red-1": {
    "question": {
      "az": "Şəklə bax: İşıqforun qırmızı işığı yananda piyadalar nə etməlidir?",
      "en": "Look at picture: What should pedestrians do when red light is on?",
      "ru": "Посмотри на картинку: Что делать пешеходам на красный свет?"
    },
    "instruction": {
      "az": "İşıqforda qırmızı işıq yananda nə etməliyik?",
      "en": "What must we do when traffic light turns red?",
      "ru": "Что нужно делать, когда на светофоре горит красный свет?"
    },
    "options": {
      "🛑 Dayanmalı və gözləməliyik": {
        "en": "🛑 Must stop and wait",
        "ru": "🛑 Стоять и ждать"
      },
      "🏃 Yola qaçmalıyıq": {
        "en": "🏃 Run into street",
        "ru": "🏃 Бежать на дорогу"
      },
      "🚗 Maşınların arasına girməliyik": {
        "en": "🚗 Step between cars",
        "ru": "🚗 Идти между машин"
      }
    },
    "explanation": {
      "az": "Afərin! Qırmızı işıq 'Dayan, təhlükəlidir!' deməkdir! 🛑🚦",
      "en": "Well done! Red light strictly means 'Stop, danger!' 🛑🚦",
      "ru": "Молодец! Красный свет означает «Стой, опасно!» 🛑🚦"
    }
  },
  "saf-traffic-green-2": {
    "question": {
      "az": "İşıqforun yaşıl işığı yananda yolu necə keçirik?",
      "en": "How do we cross the road when the green light is on?",
      "ru": "Как мы переходим дорогу на зеленый свет?"
    },
    "instruction": {
      "az": "İşıqforda yaşıl işıq yananda nə edirik?",
      "en": "What do we do when green light shines?",
      "ru": "Что мы делаем на зеленый свет светофора?"
    },
    "options": {
      "🚶 Yolu təhlükəsiz və ehtiyatla keçirik": {
        "en": "🚶 Cross safely and carefully",
        "ru": "🚶 Переходим дорогу спокойно"
      },
      "🛑 Dayanıb ağlayırıq": {
        "en": "🛑 Stop and cry",
        "ru": "🛑 Стоим и плачем"
      },
      "🙈 Gözlərimizi yumuruq": {
        "en": "🙈 Close our eyes",
        "ru": "🙈 Закрываем глаза"
      }
    },
    "explanation": {
      "az": "Düzdür! Yaşıl işıqda yolu zebra zolağı ilə rahat keçirik! 🚶🚦",
      "en": "Correct! On green light we cross the pedestrian zebra crossing! 🚶🚦",
      "ru": "Правильно! На зеленый свет спокойно идем по пешеходному переходу! 🚶🚦"
    }
  },
  "saf-hot-iron-3": {
    "question": {
      "az": "Qaynar ütüyə və ya yanan qaza əl vurmaq olarmı?",
      "en": "Can we touch a boiling hot iron or lit gas stove?",
      "ru": "Можно ли дотрагиваться до горячего утюга или плиты?"
    },
    "instruction": {
      "az": "İsti ütüyə toxunmaq olarmı?",
      "en": "Can we touch a hot iron?",
      "ru": "Можно ли трогать горячий утюг?"
    },
    "options": {
      "❌ Xeyr, əlimiz yana bilər!": {
        "en": "❌ No, it burns hands!",
        "ru": "❌ Нет, можно сильно обжечься!"
      },
      "✅ Bəli, toxunmaq olar": {
        "en": "✅ Yes, you can touch",
        "ru": "✅ Да, можно трогать"
      }
    },
    "explanation": {
      "az": "Əla! İsti əşyalara yalnız böyüklər nəzarət etməlidir! 🔥⚠️",
      "en": "Great! Only adults handle hot appliances! 🔥⚠️",
      "ru": "Отлично! Горячими приборами пользуются только взрослые! 🔥⚠️"
    }
  },
  "saf-sharp-objects-4": {
    "question": {
      "az": "İti bıçaq və ya qayçı ilə oyun oynamaq düzgündürmü?",
      "en": "Is it safe to play games with sharp knives or scissors?",
      "ru": "Правильно ли играть с острым ножом или ножницами?"
    },
    "instruction": {
      "az": "İti bıçaqla oynamaq olarmı?",
      "en": "Is it safe to play with sharp knives?",
      "ru": "Можно ли играть с острым ножом?"
    },
    "options": {
      "❌ Xeyr, çox təhlükəlidir!": {
        "en": "❌ No, very dangerous!",
        "ru": "❌ Нет, это очень опасно!"
      },
      "✅ Bəli, olar": {
        "en": "✅ Yes, it's fine",
        "ru": "✅ Да, можно"
      }
    },
    "explanation": {
      "az": "Super! İti alətlər oyuncaq deyil və ehtiyat tələb edir! ✂️🛡️",
      "en": "Super! Sharp tools are not toys and require caution! ✂️🛡️",
      "ru": "Супер! Острые инструменты не игрушка и требуют осторожности! ✂️🛡️"
    }
  },
  "att-odd-banana-1": {
    "question": {
      "az": "Meyvələr sırasına bax: Hansı meyvə digərlərindən fərqlidir? 🍎 🍎 🍎 🍌",
      "en": "Look at the row: Which fruit is different from the others? 🍎 🍎 🍎 🍌",
      "ru": "Посмотри на ряд: Какой фрукт отличается от остальных? 🍎 🍎 🍎 🍌"
    },
    "instruction": {
      "az": "Üç alma və bir banan arasında fərqli olanı tap.",
      "en": "Among three apples and one banana, find the odd one.",
      "ru": "Среди трех яблок и одного банана найди лишнее."
    },
    "options": {
      "🍌 Sarı Banan": {
        "en": "🍌 Yellow Banana",
        "ru": "🍌 Желтый банан"
      },
      "🍎 Qırmızı Alma": {
        "en": "🍎 Red Apple",
        "ru": "🍎 Красное яблоко"
      }
    },
    "explanation": {
      "az": "Afərin! Üç alma arasında sarı banan fərqlidir! 🍌🔍",
      "en": "Well done! The yellow banana is the odd one among apples! 🍌🔍",
      "ru": "Молодец! Желтый банан выделяется среди яблок! 🍌🔍"
    }
  },
  "att-winter-clothes-2": {
    "question": {
      "az": "Qarda və şaxtada əllərimiz üşüməsin deyə nə geyinirik?",
      "en": "What do we wear so hands don't freeze in snow and frost?",
      "ru": "Что мы надеваем на руки в мороз и снег?"
    },
    "instruction": {
      "az": "Soyuq qışda əllərimizi isidən əlcəyi seç.",
      "en": "Select gloves that keep hands warm in cold winter.",
      "ru": "Выбери теплые перчатки, согревающие руки зимой."
    },
    "options": {
      "🧤 İsti Qış Əlcəyi": {
        "en": "🧤 Warm Winter Gloves",
        "ru": "🧤 Теплые зимние перчатки"
      },
      "🩳 Qısa Yay Şortiki": {
        "en": "🩳 Short Summer Shorts",
        "ru": "🩳 Летние шорты"
      },
      "🩴 Çimərlik Başmağı": {
        "en": "🩴 Beach Slippers",
        "ru": "🩴 Пляжные шлепанцы"
      }
    },
    "explanation": {
      "az": "Düzdür! İsti əlcəklər qışda əllərimizi şaxtadan qoruyur! 🧤❄️",
      "en": "Correct! Warm gloves protect hands from frost! 🧤❄️",
      "ru": "Правильно! Теплые перчатки защищают ручки от мороза! 🧤❄️"
    }
  },
  "att-shadow-match-3": {
    "question": {
      "az": "Parlaq qızılı ulduzun eynisi hansıdır? ⭐",
      "en": "Which one is identical to the shining golden star? ⭐",
      "ru": "Какая фигура точь-в-точь как золотая звездочка? ⭐"
    },
    "instruction": {
      "az": "Eyni ulduz fiqurunu seç.",
      "en": "Select the matching star shape.",
      "ru": "Выбери такую же звездочку."
    },
    "options": {
      "⭐ Qızılı Ulduz": {
        "en": "⭐ Golden Star",
        "ru": "⭐ Золотая звезда"
      },
      "❤️ Qırmızı Ürək": {
        "en": "❤️ Red Heart",
        "ru": "❤️ Красное сердце"
      },
      "🔷 Mavi Romb": {
        "en": "🔷 Blue Diamond",
        "ru": "🔷 Синий ромб"
      }
    },
    "explanation": {
      "az": "Super! Dəqiq baxdın və eyni ulduzu tapdın! ⭐✨",
      "en": "Super! Your sharp eyes found the matching star! ⭐✨",
      "ru": "Супер! Твой зоркий взгляд нашел точно такую же звезду! ⭐✨"
    }
  },
  "aud-bell-1": {
    "question": {
      "az": "'Cin-cin, cin-cin' edərək zəng vuran musiqi aləti hansıdır?",
      "en": "Which musical instrument chimes 'Ding-dong, ding-dong'?",
      "ru": "Какой инструмент звенит «Динь-динь, динь-динь»?"
    },
    "instruction": {
      "az": "İncə 'Cin-cin' səsi çıxaran zəngi tap.",
      "en": "Find the bell that makes a gentle 'Ding-dong' chime.",
      "ru": "Найди колокольчик, который звенит «Динь-динь»."
    },
    "options": {
      "🔔 Zəng": {
        "en": "🔔 Bell",
        "ru": "🔔 Колокольчик"
      },
      "🥁 Baraban": {
        "en": "🥁 Drum",
        "ru": "🥁 Барабан"
      },
      "🚗 Maşın": {
        "en": "🚗 Car",
        "ru": "🚗 Машина"
      }
    },
    "explanation": {
      "az": "Afərin! Zəng incə və xoş səslə 'Cin-cin' çalır! 🔔✨",
      "en": "Well done! The bell rings with a sweet chime! 🔔✨",
      "ru": "Молодец! Колокольчик нежно звенит «Динь-динь»! 🔔✨"
    }
  },
  "aud-drum-2": {
    "question": {
      "az": "Çubuqlarla vurulduqda gur 'Bum-bum' səsi verən nədir?",
      "en": "What makes a loud 'Boom-boom' beat when struck with sticks?",
      "ru": "Какой инструмент громко бьет «Бум-бум», когда стучат палочками?"
    },
    "instruction": {
      "az": "'Bum-bum-bum' deyə döyülən barabanı tap.",
      "en": "Find the drum that beats 'Boom-boom-boom'.",
      "ru": "Найди барабан, который бьет «Бум-бум-бум»."
    },
    "options": {
      "🥁 Gur Baraban": {
        "en": "🥁 Loud Drum",
        "ru": "🥁 Громкий барабан"
      },
      "🔔 Balaca Zəng": {
        "en": "🔔 Little Bell",
        "ru": "🔔 Колокольчик"
      },
      "💧 Su Damlası": {
        "en": "💧 Waterdrop",
        "ru": "💧 Капля воды"
      }
    },
    "explanation": {
      "az": "Düzdür! Baraban ritmlə 'Bum-bum-bum' səs salır! 🥁🎶",
      "en": "Correct! The drum beats with powerful rhythm! 🥁🎶",
      "ru": "Правильно! Барабан задает ритм «Бум-бум-бум»! 🥁🎶"
    }
  },
  "aud-trumpet-3": {
    "question": {
      "az": "Nəfəslə çalınan və şən 'Tu-tuuu' səsi çıxaran alət hansıdır?",
      "en": "Which wind instrument plays a cheerful 'Tu-tuu' melody?",
      "ru": "Какой духовой инструмент играет мелодию «Ту-ту-у»?"
    },
    "instruction": {
      "az": "'Tu-tuu' səslənən şeypuru seç.",
      "en": "Select the trumpet that goes 'Tu-tuu'.",
      "ru": "Выбери трубу, которая играет «Ту-ту-у»."
    },
    "options": {
      "🎺 Şən Şeypur": {
        "en": "🎺 Merry Trumpet",
        "ru": "🎺 Веселая труба"
      },
      "🎻 Skripka": {
        "en": "🎻 Violin",
        "ru": "🎻 Скрипка"
      },
      "🎹 Piano": {
        "en": "🎹 Piano",
        "ru": "🎹 Пианино"
      }
    },
    "explanation": {
      "az": "Super! Şeypur bayramlarda uca səslə ifa edir! 🎺🎉",
      "en": "Super! The trumpet blares joyfully at celebrations! 🎺🎉",
      "ru": "Супер! Труба празднично звучит на парадах! 🎺🎉"
    }
  },
  "mot-trace-star-moon-1": {
    "question": {
      "az": "Yuxarıdakı şəklə bax: Ulduz düz xətt boyunca hansı göy cisminə doğru gedir?",
      "en": "Looking at the picture above: Which celestial object does the star head towards?",
      "ru": "Глядя на картинку выше: К какому светилу движется звездочка по дорожке?"
    },
    "instruction": {
      "az": "Şəklə diqqətlə bax: Parlaq ulduz xətt boyunca hansı hədəfə doğru gedir?",
      "en": "Look closely at the picture: Which target does the bright star head towards along the line?",
      "ru": "Посмотри на картинку: К какой цели движется звездочка вдоль линии?"
    },
    "options": {
      "🌙 Ay": {
        "en": "🌙 Moon",
        "ru": "🌙 Луна"
      },
      "☀️ Günəş": {
        "en": "☀️ Sun",
        "ru": "☀️ Солнце"
      },
      "☁️ Bulud": {
        "en": "☁️ Cloud",
        "ru": "☁️ Облако"
      }
    },
    "explanation": {
      "az": "Afərin! Ulduz düz xətlə hərəkət edərək nurlu Aya çatır! ⭐➔🌙",
      "en": "Well done! The star traces the straight line straight to the Moon! ⭐➔🌙",
      "ru": "Молодец! Звездочка по прямой дорожке пришла прямо к Луне! ⭐➔🌙"
    }
  },
  "mot-trace-rocket-planet-2": {
    "question": {
      "az": "Yuxarıdakı xəttə bax: Raket hansı sehirli planetə doğru uçur?",
      "en": "Look at the track above: Which magical planet is the rocket flying towards?",
      "ru": "Взгляни на траекторию: К какой планете устремлена ракета?"
    },
    "instruction": {
      "az": "Şəklə bax: Kosmik raket ziqzaq xətt boyunca hansı hədəfə uçur?",
      "en": "Look at picture: Which target does the space rocket fly towards along the zigzag?",
      "ru": "Посмотри на картинку: К какой планете летит ракета по зигзагу?"
    },
    "options": {
      "🪐 Halqalı Planet": {
        "en": "🪐 Ringed Planet",
        "ru": "🪐 Планета с кольцами"
      },
      "🌊 Dəniz dalğası": {
        "en": "🌊 Ocean wave",
        "ru": "🌊 Морская волна"
      },
      "🌳 Yaşıl ağac": {
        "en": "🌳 Green tree",
        "ru": "🌳 Зеленое дерево"
      }
    },
    "explanation": {
      "az": "Düzdür! Raket ziqzaq xətlərlə uzaq planetə uğurla çatdı! 🚀🪐",
      "en": "Correct! The rocket successfully navigated the zigzag path to the planet! 🚀🪐",
      "ru": "Правильно! Ракета по зигзагу успешно добралась до далекой планеты! 🚀🪐"
    }
  },
  "mot-trace-bee-flower-3": {
    "question": {
      "az": "Arının getdiyi yolun sonunda hansı gözəl çiçək gözləyir?",
      "en": "Which beautiful flower is waiting at the end of the bee's path?",
      "ru": "Какой красивый цветок ждет пчелку в конце пути?"
    },
    "instruction": {
      "az": "Şəklə bax: Bal arısı dalğalı xətt boyunca nəyə tərəf uçur?",
      "en": "Look at picture: Where does the honeybee fly along the wavy line?",
      "ru": "Посмотри на картинку: К чему летит пчелка по волнистой линии?"
    },
    "options": {
      "🌸 Gözəl Gül": {
        "en": "🌸 Lovely Flower",
        "ru": "🌸 Красивый цветок"
      },
      "🍄 Göbələk": {
        "en": "🍄 Mushroom",
        "ru": "🍄 Грибок"
      },
      "🪨 Daş": {
        "en": "🪨 Stone",
        "ru": "🪨 Камень"
      }
    },
    "explanation": {
      "az": "Əla! Arı dalğalı xətlə gülün üstünə qondu və nektar topladı! 🐝🌸🍯",
      "en": "Great! The bee followed the wave to the flower and collected nectar! 🐝🌸🍯",
      "ru": "Отлично! Пчелка по волне прилетела прямо к цветку за нектаром! 🐝🌸🍯"
    }
  },
  "mov-jump-frog-1": {
    "question": {
      "az": "Qurbağa kimi cəld hündürə tullanmaq üçün hansı hərəkəti seçirik?",
      "en": "Which movement do we select to jump high like a frog?",
      "ru": "Какое движение выбираем, чтобы прыгать высоко как лягушка?"
    },
    "instruction": {
      "az": "Qurbağa və dovşan kimi hündürə nə edirik?",
      "en": "What do we do high like frogs and bunnies?",
      "ru": "Что мы делаем высоко как лягушата и зайчата?"
    },
    "options": {
      "🦘 Şadlanıb tullanırıq": {
        "en": "🦘 Jump joyfully",
        "ru": "🦘 Весело прыгаем"
      },
      "😴 Yataqda yatırıq": {
        "en": "😴 Sleep in bed",
        "ru": "😴 Спим в постели"
      },
      "🪑 Stulda donub qalırıq": {
        "en": "🪑 Freeze on chair",
        "ru": "🪑 Замираем на стуле"
      }
    },
    "explanation": {
      "az": "Afərin! Tullanmaq ayaq əzələlərimizi çox güclü edir! 🦘✨",
      "en": "Well done! Jumping strengthens leg muscles and energy! 🦘✨",
      "ru": "Молодец! Прыжки делают ножки сильными и крепкими! 🦘✨"
    }
  },
  "mov-flap-arms-2": {
    "question": {
      "az": "Göy üzündə quş kimi süzmək üçün qollarımızla nə edirik?",
      "en": "How do we flap our arms to glide like a bird in the sky?",
      "ru": "Как мы машем руками, чтобы парить как птица в небе?"
    },
    "instruction": {
      "az": "Quş kimi qollarımızı yana açıb nə edirik?",
      "en": "What do we do spreading arms like a bird?",
      "ru": "Что мы делаем, раскинув руки как птица крылья?"
    },
    "options": {
      "🦅 Qanad çalırıq": {
        "en": "🦅 Flap wings",
        "ru": "🦅 Машем крыльями"
      },
      "🤿 Suyun altına giririk": {
        "en": "🤿 Dive underwater",
        "ru": "🤿 Ныряем под воду"
      },
      "🙈 Gözləri örtürük": {
        "en": "🙈 Cover eyes",
        "ru": "🙈 Закрываем глаза"
      }
    },
    "explanation": {
      "az": "Düzdür! Qollarımızı yellədikcə nəfəsimiz açılır və gümrah oluruq! 🦅💨",
      "en": "Correct! Flapping arms expands our chest and brings energy! 🦅💨",
      "ru": "Правильно! Взмахи руками разминают плечи и дарят бодрость! 🦅💨"
    }
  },
  "mov-stretch-sky-3": {
    "question": {
      "az": "Boyumuzun uca olması üçün qollarımızı hara doğru qaldırıb dartınırıq?",
      "en": "Where do we stretch our arms high to grow tall?",
      "ru": "Куда мы тянемся ручками вверх, чтобы подрасти?"
    },
    "instruction": {
      "az": "Barmaq uclarında günəşə doğru dartın.",
      "en": "Stretch on tiptoes up towards the sun.",
      "ru": "Тянись на цыпочках вверх к солнышку."
    },
    "options": {
      "☀️ Günəşə və göyə doğru dartınırıq": {
        "en": "☀️ Stretch up to the sun and sky",
        "ru": "☀️ Тянемся вверх к солнышку"
      },
      "🕳️ Quyunun içinə əyilirik": {
        "en": "🕳️ Bend into well",
        "ru": "🕳️ Наклоняемся в яму"
      },
      "🛏️ Yatağa girib bükülürük": {
        "en": "🛏️ Curl in bed",
        "ru": "🛏️ Сворачиваемся в постели"
      }
    },
    "explanation": {
      "az": "Super! Göylərə dartındıqca boyumuz hündür və qamətimiz düz olur! ☀️🧍✨",
      "en": "Super! Stretching tall helps us grow upright and healthy! ☀️🧍✨",
      "ru": "Супер! Потягивания вверх делают осанку ровной и помогают расти! ☀️🧍✨"
    }
  },
  "math-1": {
    "question": {
      "az": "1 alma + 1 alma cəmi neçə alma edir?",
      "en": "What is 1 apple + 1 apple?",
      "ru": "Сколько будет 1 яблоко + 1 яблоко?"
    },
    "instruction": {
      "az": "Formulaya bax: 1 alma üstəgəl 1 alma neçə edər?",
      "en": "Look at the formula: What is 1 apple plus 1 apple?",
      "ru": "Посмотри на формулу: Сколько будет 1 яблоко плюс 1 яблоко?"
    },
    "options": {
      "2 Alma": {
        "en": "2 Apples",
        "ru": "2 Яблока"
      },
      "1 Alma": {
        "en": "1 Apple",
        "ru": "1 Яблоко"
      },
      "3 Alma": {
        "en": "3 Apples",
        "ru": "3 Яблока"
      }
    },
    "explanation": {
      "az": "Afərin! 1 + 1 = 2 alma edir! 🍎🍎",
      "en": "Well done! 1 + 1 = 2 apples! 🍎🍎",
      "ru": "Молодец! 1 + 1 = 2 яблока! 🍎🍎"
    }
  },
  "math-2": {
    "question": {
      "az": "2 alma + 1 alma cəmi neçə alma edər?",
      "en": "What is 2 apples + 1 apple?",
      "ru": "Сколько будет 2 яблока + 1 яблоко?"
    },
    "instruction": {
      "az": "2 almanın üstünə 1 alma da gəlsək neçə olar?",
      "en": "What is 2 apples plus 1 apple?",
      "ru": "Сколько будет 2 яблока плюс 1 яблоко?"
    },
    "options": {
      "3 Alma": {
        "en": "3 Apples",
        "ru": "3 Яблока"
      },
      "4 Alma": {
        "en": "4 Apples",
        "ru": "4 Яблока"
      },
      "2 Alma": {
        "en": "2 Apples",
        "ru": "2 Яблока"
      }
    },
    "explanation": {
      "az": "Əla! 2 + 1 = 3 alma! 🍎🍎🍎",
      "en": "Great! 2 + 1 = 3 apples! 🍎🍎🍎",
      "ru": "Отлично! 2 + 1 = 3 яблока! 🍎🍎🍎"
    }
  },
  "math-3": {
    "question": {
      "az": "5 + 2 cəmi neçəyə bərabərdir?",
      "en": "What does 5 + 2 equal?",
      "ru": "Чему равна сумма 5 + 2?"
    },
    "instruction": {
      "az": "5 alma ilə 2 almanı toplasaq neçə edər?",
      "en": "If we add 5 apples and 2 apples, what do we get?",
      "ru": "Если сложить 5 яблок и 2 яблока, сколько получится?"
    },
    "options": {
      "7 Alma": {
        "en": "7 Apples",
        "ru": "7 Яблок"
      },
      "6 Alma": {
        "en": "6 Apples",
        "ru": "6 Яблок"
      },
      "8 Alma": {
        "en": "8 Apples",
        "ru": "8 Яблок"
      }
    },
    "explanation": {
      "az": "Düzdür! 5 alma + 2 alma = 7 alma! 🍎✨",
      "en": "Correct! 5 apples + 2 apples = 7 apples! 🍎✨",
      "ru": "Правильно! 5 яблок + 2 яблока = 7 яблок! 🍎✨"
    }
  },
  "math-4": {
    "question": {
      "az": "10 + 1 cəmi neçə edir?",
      "en": "What is 10 + 1?",
      "ru": "Сколько будет 10 + 1?"
    },
    "instruction": {
      "az": "10 almanın üstünə 1 alma gəlsək neçə edər?",
      "en": "What is 10 apples plus 1 apple?",
      "ru": "Сколько будет 10 яблок плюс 1 яблоко?"
    },
    "options": {
      "11 Alma": {
        "en": "11 Apples",
        "ru": "11 Яблок"
      },
      "10 Alma": {
        "en": "10 Apples",
        "ru": "10 Яблок"
      },
      "12 Alma": {
        "en": "12 Apples",
        "ru": "12 Яблок"
      }
    },
    "explanation": {
      "az": "Afərin! 10 + 1 = 11 alma! 🔟🍎",
      "en": "Well done! 10 + 1 = 11 apples! 🔟🍎",
      "ru": "Молодец! 10 + 1 = 11 яблок! 🔟🍎"
    }
  },
  "math-5": {
    "question": {
      "az": "10 + 2 cəmi neçəyə bərabərdir?",
      "en": "What does 10 + 2 equal?",
      "ru": "Чему равна сумма 10 + 2?"
    },
    "instruction": {
      "az": "10 almanın üstünə 2 alma əlavə etdikdə nəticə neçə olar?",
      "en": "What is 10 apples plus 2 apples?",
      "ru": "Сколько будет 10 яблок плюс 2 яблока?"
    },
    "options": {
      "12 Alma": {
        "en": "12 Apples",
        "ru": "12 Яблок"
      },
      "13 Alma": {
        "en": "13 Apples",
        "ru": "13 Яблок"
      },
      "11 Alma": {
        "en": "11 Apples",
        "ru": "11 Яблок"
      }
    },
    "explanation": {
      "az": "Möhtəşəm! 10 + 2 = 12 alma edir! ✨",
      "en": "Awesome! 10 + 2 = 12 apples! ✨",
      "ru": "Замечательно! 10 + 2 = 12 яблок! ✨"
    }
  },
  "math-6": {
    "question": {
      "az": "10 + 5 cəmi neçədir?",
      "en": "What is 10 + 5?",
      "ru": "Сколько будет 10 + 5?"
    },
    "instruction": {
      "az": "10 almanın üstünə 5 alma gəlsək neçə edər?",
      "en": "What is 10 apples plus 5 apples?",
      "ru": "Сколько будет 10 яблок плюс 5 яблок?"
    },
    "options": {
      "15 Alma": {
        "en": "15 Apples",
        "ru": "15 Яблок"
      },
      "14 Alma": {
        "en": "14 Apples",
        "ru": "14 Яблок"
      },
      "20 Alma": {
        "en": "20 Apples",
        "ru": "20 Яблок"
      }
    },
    "explanation": {
      "az": "Super! 10 + 5 = 15 alma! 🌟",
      "en": "Super! 10 + 5 = 15 apples! 🌟",
      "ru": "Супер! 10 + 5 = 15 яблок! 🌟"
    }
  },
  "math-7": {
    "question": {
      "az": "10 + 10 cəmi neçəyə bərabərdir?",
      "en": "What is 10 + 10?",
      "ru": "Сколько будет 10 + 10?"
    },
    "instruction": {
      "az": "10 alma üstəgəl 10 alma cəmi neçə edər?",
      "en": "What is 10 apples plus 10 apples?",
      "ru": "Сколько будет 10 яблок плюс 10 яблок?"
    },
    "options": {
      "20 Alma": {
        "en": "20 Apples",
        "ru": "20 Яблок"
      },
      "15 Alma": {
        "en": "15 Apples",
        "ru": "15 Яблок"
      },
      "30 Alma": {
        "en": "30 Apples",
        "ru": "30 Яблок"
      }
    },
    "explanation": {
      "az": "Afərin! İki dənə 10 tam 20 alma edir! 🍎🎉",
      "en": "Well done! Two tens make exactly 20 apples! 🍎🎉",
      "ru": "Молодец! Два десятка — это ровно 20 яблок! 🍎🎉"
    }
  },
  "math-8": {
    "question": {
      "az": "20 + 10 cəmi neçə edir?",
      "en": "What is 20 + 10?",
      "ru": "Сколько будет 20 + 10?"
    },
    "instruction": {
      "az": "20 almanın üstünə 10 alma gəlsək neçə edər?",
      "en": "What is 20 apples plus 10 apples?",
      "ru": "Сколько будет 20 яблок плюс 10 яблок?"
    },
    "options": {
      "30 Alma": {
        "en": "30 Apples",
        "ru": "30 Яблок"
      },
      "25 Alma": {
        "en": "25 Apples",
        "ru": "25 Яблок"
      },
      "40 Alma": {
        "en": "40 Apples",
        "ru": "40 Яблок"
      }
    },
    "explanation": {
      "az": "Əla! 20 + 10 = 30 alma! 🍎✨",
      "en": "Great! 20 + 10 = 30 apples! 🍎✨",
      "ru": "Отлично! 20 + 10 = 30 яблок! 🍎✨"
    }
  },
  "math-9": {
    "question": {
      "az": "50 + 50 cəmi neçəyə bərabərdir?",
      "en": "What does 50 + 50 equal?",
      "ru": "Чему равна сумма 50 + 50?"
    },
    "instruction": {
      "az": "50 alma üstəgəl 50 alma cəmi neçə edər?",
      "en": "What is 50 apples plus 50 apples?",
      "ru": "Сколько будет 50 яблок плюс 50 яблок?"
    },
    "options": {
      "100 Alma": {
        "en": "100 Apples",
        "ru": "100 Яблок"
      },
      "80 Alma": {
        "en": "80 Apples",
        "ru": "80 Яблок"
      },
      "90 Alma": {
        "en": "90 Apples",
        "ru": "90 Яблок"
      }
    },
    "explanation": {
      "az": "Möhtəşəm riyaziyyat! 50 + 50 = 100 tam yüzlük edir! 💯🍎",
      "en": "Awesome math! 50 + 50 = 100 full hundred! 💯🍎",
      "ru": "Потрясающая математика! 50 + 50 = 100 ровно сотня! 💯🍎"
    }
  },
  "math-10": {
    "question": {
      "az": "20 alma + 5 alma cəmi neçə edir?",
      "en": "What is 20 apples + 5 apples?",
      "ru": "Сколько будет 20 яблок + 5 яблок?"
    },
    "instruction": {
      "az": "20 almanın üstünə 5 alma əlavə etsək neçə olar?",
      "en": "What is 20 apples plus 5 apples?",
      "ru": "Сколько будет 20 яблок плюс 5 яблок?"
    },
    "options": {
      "25 Alma": {
        "en": "25 Apples",
        "ru": "25 Яблок"
      },
      "24 Alma": {
        "en": "24 Apples",
        "ru": "24 Яблока"
      },
      "30 Alma": {
        "en": "30 Apples",
        "ru": "30 Яблок"
      }
    },
    "explanation": {
      "az": "Bəli! 20 alma + 5 alma elədi 25 alma! 🍎2️⃣5️⃣",
      "en": "Yes! 20 apples + 5 apples = 25 apples! 🍎2️⃣5️⃣",
      "ru": "Да! 20 яблок + 5 яблок получилось 25 яблок! 🍎2️⃣5️⃣"
    }
  },
  "math-11": {
    "question": {
      "az": "30 + 4 cəmi neçəyə bərabərdir?",
      "en": "What does 30 + 4 equal?",
      "ru": "Чему равна сумма 30 + 4?"
    },
    "instruction": {
      "az": "30 almanın üstünə 4 alma gəlsək neçə edər?",
      "en": "What is 30 apples plus 4 apples?",
      "ru": "Сколько будет 30 яблок плюс 4 яблока?"
    },
    "options": {
      "34 Alma": {
        "en": "34 Apples",
        "ru": "34 Яблока"
      },
      "32 Alma": {
        "en": "32 Apples",
        "ru": "32 Яблока"
      },
      "36 Alma": {
        "en": "36 Apples",
        "ru": "36 Яблок"
      }
    },
    "explanation": {
      "az": "Düzdür! 30 + 4 = 34 alma! 3️⃣4️⃣🍎",
      "en": "Correct! 30 + 4 = 34 apples! 3️⃣4️⃣🍎",
      "ru": "Правильно! 30 + 4 = 34 яблока! 3️⃣4️⃣🍎"
    }
  },
  "math-12": {
    "question": {
      "az": "40 alma + 5 alma cəmi neçə edir?",
      "en": "What is 40 apples + 5 apples?",
      "ru": "Сколько будет 40 яблок + 5 яблок?"
    },
    "instruction": {
      "az": "40 almanın üstünə 5 alma gəldikdə nəticə neçə edər?",
      "en": "What is 40 apples plus 5 apples?",
      "ru": "Сколько будет 40 яблок плюс 5 яблок?"
    },
    "options": {
      "45 Alma": {
        "en": "45 Apples",
        "ru": "45 Яблок"
      },
      "50 Alma": {
        "en": "50 Apples",
        "ru": "50 Яблок"
      },
      "42 Alma": {
        "en": "42 Apples",
        "ru": "42 Яблока"
      }
    },
    "explanation": {
      "az": "Möhtəşəm riyazi bacarıq! 40 + 5 = 45 alma! 4️⃣5️⃣🍎",
      "en": "Awesome math skill! 40 + 5 = 45 apples! 4️⃣5️⃣🍎",
      "ru": "Великолепный результат! 40 + 5 = 45 яблок! 4️⃣5️⃣🍎"
    }
  },
  "log-habitat-1": {
    "question": {
      "az": "Quş yuvada və səmada yaşayır, bəs qızıl balıq harada yaşayır?",
      "en": "Birds live in nests and skies, where do fish live?",
      "ru": "Птица живет в гнезде и небе, а где живет рыбка?"
    },
    "instruction": {
      "az": "Məntiqi əlaqəni tap: Balıq harada yaşayır?",
      "en": "Find the logical connection: Where does a fish live?",
      "ru": "Найди логическую связь: Где живет рыбка?"
    },
    "options": {
      "🌊 Suda və dənizdə": {
        "en": "🌊 In water and sea",
        "ru": "🌊 В воде и море"
      },
      "🌳 Ağac budağında": {
        "en": "🌳 On tree branch",
        "ru": "🌳 На ветке дерева"
      },
      "🚗 Avtomobilin içində": {
        "en": "🚗 Inside a car",
        "ru": "🚗 Внутри машины"
      }
    },
    "explanation": {
      "az": "Afərin! Balıqlar yalnız təmiz suda nəfəs alıb üzürlər! 🐟🌊",
      "en": "Well done! Fish breathe and swim in clear water! 🐟🌊",
      "ru": "Молодец! Рыбки дышат и плавают только в чистой воде! 🐟🌊"
    }
  },
  "log-rain-umbrella-2": {
    "question": {
      "az": "Göydən güclü yağış yağanda islanmamaq üçün başımızın üstündə nə açırıq?",
      "en": "What do we open over our head in heavy rain to stay dry?",
      "ru": "Что мы открываем над головой в сильный дождь?"
    },
    "instruction": {
      "az": "Yağış yağanda islanmamaq üçün nə götürürük?",
      "en": "What do we use to stay dry in rain?",
      "ru": "Что мы берем в дождь, чтобы не промокнуть?"
    },
    "options": {
      "☂️ Əlvan Çətir": {
        "en": "☂️ Colorful Umbrella",
        "ru": "☂️ Разноцветный зонтик"
      },
      "🎒 Məktəb Çantası": {
        "en": "🎒 School Bag",
        "ru": "🎒 Школьный портфель"
      },
      "⚽ Futbol Topu": {
        "en": "⚽ Soccer Ball",
        "ru": "⚽ Футбольный мяч"
      }
    },
    "explanation": {
      "az": "Düzdür! Çətir yağış damcılarından bizi etibarlı qoruyur! ☂️🌧️",
      "en": "Correct! An umbrella reliably protects us from rain! ☂️🌧️",
      "ru": "Правильно! Зонтик надежно укрывает нас от дождя! ☂️🌧️"
    }
  },
  "log-pattern-apple-3": {
    "question": {
      "az": "Məntiqi sıranı tamamla: 🍎 Qırmızı alma, 🍏 Yaşıl alma, 🍎 Qırmızı alma, növbəti hansıdır?",
      "en": "Complete the pattern: 🍎 Red apple, 🍏 Green apple, 🍎 Red apple, what comes next?",
      "ru": "Продолжи ряд: 🍎 Красное яблоко, 🍏 Зеленое яблоко, 🍎 Красное яблоко, что дальше?"
    },
    "instruction": {
      "az": "Növbəti meyvəni tap: Qırmızı alma, Yaşıl alma, Qırmızı alma, ... ?",
      "en": "Find the next fruit: Red apple, Green apple, Red apple, ... ?",
      "ru": "Определи следующий фрукт: Красное яблоко, Зеленое яблоко, Красное яблоко, ... ?"
    },
    "options": {
      "🍏 Yaşıl Alma": {
        "en": "🍏 Green Apple",
        "ru": "🍏 Зеленое яблоко"
      },
      "🍌 Sarı Banan": {
        "en": "🍌 Yellow Banana",
        "ru": "🍌 Желтый банан"
      },
      "🍇 Bənövşəyi Üzüm": {
        "en": "🍇 Purple Grape",
        "ru": "🍇 Фиолетовый виноград"
      }
    },
    "explanation": {
      "az": "Möhtəşəm məntiq! Sıra belə gedir: Qırmızı, Yaşıl, Qırmızı, Yaşıl alma! 🍎🍏🍎🍏",
      "en": "Awesome logic! Pattern goes: Red, Green, Red, Green apple! 🍎🍏🍎🍏",
      "ru": "Отличная логика! Ряд продолжается: Красное, Зеленое, Красное, Зеленое! 🍎🍏🍎🍏"
    }
  },
  "log-winter-summer-4": {
    "question": {
      "az": "Qışda həyətdə çoxlu qar yağanda uşaqlar şadlanaraq nə düzəldirlər?",
      "en": "What do children happily build when lots of snow falls in winter?",
      "ru": "Что дети весело лепят зимой, когда выпало много снега?"
    },
    "instruction": {
      "az": "Qışda qardan nə düzəldirik?",
      "en": "What do we build with snow in winter?",
      "ru": "Что мы лепим из снега зимой?"
    },
    "options": {
      "☃️ Qardan Adam": {
        "en": "☃️ Snowman",
        "ru": "☃️ Снеговик"
      },
      "🏖️ Qum Qəsri": {
        "en": "🏖️ Sandcastle",
        "ru": "🏖️ Замок из песка"
      },
      "⛵ Yelkənli Qayıq": {
        "en": "⛵ Sailing Boat",
        "ru": "⛵ Парусная лодка"
      }
    },
    "explanation": {
      "az": "Super! Qardan adam düzəldib yerkökündən burun qoyuruq! ☃️🥕❄️",
      "en": "Super! We build a snowman and give him a carrot nose! ☃️🥕❄️",
      "ru": "Супер! Мы лепим снеговика с носом-морковкой! ☃️🥕❄️"
    }
  }
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
