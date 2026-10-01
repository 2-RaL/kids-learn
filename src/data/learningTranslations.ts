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
  },
  "shp-square-1": {
    "question": {
      "az": "Hansı əşya kvadrat formasındadır?",
      "en": "Which item has a square shape?",
      "ru": "Какой предмет имеет форму квадрата?"
    },
    "instruction": {
      "az": "Kvadrat formasında olan əşyanı tap.",
      "en": "Find the square shaped item.",
      "ru": "Найди предмет квадратной формы."
    },
    "options": {
      "Hədiyyə Qutusu": {
        "en": "Gift Box",
        "ru": "Подарочная коробка"
      },
      "Top": {
        "en": "Ball",
        "ru": "Мяч"
      },
      "Yumurta": {
        "en": "Egg",
        "ru": "Яйцо"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "shp-square-window-2": {
    "question": {
      "az": "Dörd bərabər tərəfi olan pəncərə hansı fiqurdur?",
      "en": "What shape is a window with four equal sides?",
      "ru": "Какая фигура у окна с четырьмя равными сторонами?"
    },
    "instruction": {
      "az": "Otaqdakı pəncərənin formasını seç.",
      "en": "Select the shape of the room window.",
      "ru": "Выбери форму комнатного окна."
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
      "Üçbucaq": {
        "en": "Triangle",
        "ru": "Треугольник"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "shp-star-1": {
    "question": {
      "az": "Hansı parlaq fiqur ulduzdur?",
      "en": "Which shining shape is a star?",
      "ru": "Какая сияющая фигура — звезда?"
    },
    "instruction": {
      "az": "Parıldayan ulduz fiqurunu seç.",
      "en": "Select the shining star shape.",
      "ru": "Выбери сияющую фигуру звезды."
    },
    "options": {
      "Sarı Ulduz": {
        "en": "Yellow Star",
        "ru": "Желтая звезда"
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
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "shp-star-sea-2": {
    "question": {
      "az": "Dəniz ulduzu hansı həndəsi formaya bənzəyir?",
      "en": "What shape does a starfish resemble?",
      "ru": "На какую форму похожа морская звезда?"
    },
    "instruction": {
      "az": "Dəniz canlısının formasını tap.",
      "en": "Find the shape of the sea creature.",
      "ru": "Найди форму морского обитателя."
    },
    "options": {
      "Ulduz": {
        "en": "Star",
        "ru": "Звезда"
      },
      "Üçbucaq": {
        "en": "Triangle",
        "ru": "Треугольник"
      },
      "Kvadrat": {
        "en": "Square",
        "ru": "Квадрат"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "obj-school-1": {
    "question": {
      "az": "Dəftərə rəsm çəkmək və yazmaq üçün nə işlədirik?",
      "en": "What do we use to draw and write in a notebook?",
      "ru": "Что мы используем, чтобы рисовать и писать в тетради?"
    },
    "instruction": {
      "az": "Yazı yazmaq üçün lazım olan əşyanı tap.",
      "en": "Find the item used for writing.",
      "ru": "Найди предмет для письма."
    },
    "options": {
      "Rəngli Qələm": {
        "en": "Color Pencil",
        "ru": "Цветной карандаш"
      },
      "Qaşıq": {
        "en": "Spoon",
        "ru": "Ложка"
      },
      "Yastıq": {
        "en": "Pillow",
        "ru": "Подушка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "obj-school-bag-2": {
    "question": {
      "az": "Dəftər və kitablarımızı hara yığırıq?",
      "en": "Where do we pack our notebooks and books?",
      "ru": "Куда мы складываем тетради и книги?"
    },
    "instruction": {
      "az": "Kitabları daşımaq üçün əşyanı seç.",
      "en": "Select the item for carrying books.",
      "ru": "Выбери предмет для ношения книг."
    },
    "options": {
      "Məktəb Çantası": {
        "en": "School Backpack",
        "ru": "Школьный рюкзак"
      },
      "Boşqab": {
        "en": "Plate",
        "ru": "Тарелка"
      },
      "Stul": {
        "en": "Chair",
        "ru": "Стул"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "obj-school-book-3": {
    "question": {
      "az": "Hansı əşyadan gözəl nağıllar oxuyuruq?",
      "en": "From which item do we read wonderful stories?",
      "ru": "Из какого предмета мы читаем чудесные сказки?"
    },
    "instruction": {
      "az": "Nağıl oxunan əşyanı seç.",
      "en": "Select the item used to read stories.",
      "ru": "Выбери предмет, из которого читают сказки."
    },
    "options": {
      "Kitab": {
        "en": "Book",
        "ru": "Книга"
      },
      "Çəngəl": {
        "en": "Fork",
        "ru": "Вилка"
      },
      "Saat": {
        "en": "Clock",
        "ru": "Часы"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "obj-toys-1": {
    "question": {
      "az": "Yatağa aparıb qucaqladığımız yumşaq oyuncaq hansıdır?",
      "en": "Which soft toy do we take to bed to hug?",
      "ru": "Какую мягкую игрушку мы берем в кровать, чтобы обнять?"
    },
    "instruction": {
      "az": "Yumşaq oyuncağı seç.",
      "en": "Select the soft plush toy.",
      "ru": "Выбери мягкую плюшевую игрушку."
    },
    "options": {
      "Yumşaq Ayı": {
        "en": "Teddy Bear",
        "ru": "Плюшевый мишка"
      },
      "Dəftər": {
        "en": "Notebook",
        "ru": "Тетрадь"
      },
      "Fincan": {
        "en": "Cup",
        "ru": "Чашка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "obj-toys-ball-2": {
    "question": {
      "az": "Hansı oyuncağı yerə vuranda yuxarı tullanır?",
      "en": "Which toy bounces up when hit on the ground?",
      "ru": "Какая игрушка подскакивает, когда ударяется о землю?"
    },
    "instruction": {
      "az": "Tullanan oyuncağı tap.",
      "en": "Find the bouncing toy.",
      "ru": "Найди прыгучую игрушку."
    },
    "options": {
      "Rəngli Top": {
        "en": "Colorful Ball",
        "ru": "Цветной мяч"
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
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "bod-legs-1": {
    "question": {
      "az": "Qaçmaq və tullanmaq üçün bədənimizin hansı hissəsi lazımdır?",
      "en": "Which part of our body do we need to run and jump?",
      "ru": "Какая часть тела нужна, чтобы бегать и прыгать?"
    },
    "instruction": {
      "az": "Qaçmaq üçün lazım olan bədən üzvünü seç.",
      "en": "Select the body part needed for running.",
      "ru": "Выбери часть тела, необходимую для бега."
    },
    "options": {
      "Ayaqlar": {
        "en": "Legs",
        "ru": "Ноги"
      },
      "Qulaqlar": {
        "en": "Ears",
        "ru": "Уши"
      },
      "Burun": {
        "en": "Nose",
        "ru": "Нос"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "bod-feet-shoes-2": {
    "question": {
      "az": "Ayaqqabını bədənimizin harasına geyinirik?",
      "en": "Where on our body do we put shoes on?",
      "ru": "Куда на теле мы надеваем обувь?"
    },
    "instruction": {
      "az": "Ayaqqabının geyinildiyi yeri tap.",
      "en": "Find where shoes are worn.",
      "ru": "Найди, куда надевают обувь."
    },
    "options": {
      "Ayağa": {
        "en": "Feet",
        "ru": "На ноги"
      },
      "Başa": {
        "en": "Head",
        "ru": "На голову"
      },
      "Ələ": {
        "en": "Hands",
        "ru": "На руки"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "bod-toes-3": {
    "question": {
      "az": "Bir ayağımızda neçə barmaq var?",
      "en": "How many toes are on one foot?",
      "ru": "Сколько пальцев на одной ноге?"
    },
    "instruction": {
      "az": "Ayaqdakı barmaqların sayını tap.",
      "en": "Find the number of toes on one foot.",
      "ru": "Найди количество пальцев на одной ноге."
    },
    "options": {
      "5 Barmaq": {
        "en": "5 Toes",
        "ru": "5 пальцев"
      },
      "2 Barmaq": {
        "en": "2 Toes",
        "ru": "2 пальца"
      },
      "10 Barmaq": {
        "en": "10 Toes",
        "ru": "10 пальцев"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "bod-mouth-1": {
    "question": {
      "az": "Şad olanda nəyimizlə şirin gülümsəyirik?",
      "en": "What do we sweetly smile with when happy?",
      "ru": "Чем мы радостно улыбаемся, когда счастливы?"
    },
    "instruction": {
      "az": "Gülümsədiyimiz üz üzvünü seç.",
      "en": "Select the face part we smile with.",
      "ru": "Выбери часть лица, которой мы улыбаемся."
    },
    "options": {
      "Ağzımızla": {
        "en": "Mouth",
        "ru": "Ртом"
      },
      "Qulağımızla": {
        "en": "Ear",
        "ru": "Ухом"
      },
      "Qolumuzla": {
        "en": "Arm",
        "ru": "Рукой"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "bod-teeth-2": {
    "question": {
      "az": "Yeməyi çeynəmək üçün bizə nə kömək edir?",
      "en": "What helps us chew our food?",
      "ru": "Что помогает нам пережевывать пищу?"
    },
    "instruction": {
      "az": "Yeməyi çeynəyən orqanı tap.",
      "en": "Find what chews food.",
      "ru": "Найди, чем пережевывают пищу."
    },
    "options": {
      "Ağappaq Dişlərimiz": {
        "en": "White Teeth",
        "ru": "Белые зубки"
      },
      "Gözümüz": {
        "en": "Eye",
        "ru": "Глаз"
      },
      "Saçımız": {
        "en": "Hair",
        "ru": "Волосы"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "ani-birds-1": {
    "question": {
      "az": "Göydə qanad çalıb uçan canlı hansıdır?",
      "en": "Which creature flaps wings and flies in the sky?",
      "ru": "Кто машет крыльями и летает в небе?"
    },
    "instruction": {
      "az": "Göydə uçan quşu tap.",
      "en": "Find the bird flying in the sky.",
      "ru": "Найди птицу, летающую в небе."
    },
    "options": {
      "Balaca Quş": {
        "en": "Little Bird",
        "ru": "Маленькая птичка"
      },
      "Tısbağa": {
        "en": "Turtle",
        "ru": "Черепаха"
      },
      "Pişik": {
        "en": "Cat",
        "ru": "Кошка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "ani-birds-duck-2": {
    "question": {
      "az": "Suda üzən və \"vak-vak\" edən quş hansıdır?",
      "en": "Which bird swims in water and says quack quack?",
      "ru": "Какая птица плавает в воде и говорит кря-кря?"
    },
    "instruction": {
      "az": "Suda üzən quşu tap.",
      "en": "Find the swimming bird.",
      "ru": "Найди водоплавающую птицу."
    },
    "options": {
      "Ördək": {
        "en": "Duck",
        "ru": "Утка"
      },
      "İt": {
        "en": "Dog",
        "ru": "Собака"
      },
      "At": {
        "en": "Horse",
        "ru": "Лошадь"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "ani-sea-fish-1": {
    "question": {
      "az": "Suda üzgəcləri ilə üzən sevimli canlı hansıdır?",
      "en": "Which lovely creature swims in water with fins?",
      "ru": "Кто плавает в воде с плавниками?"
    },
    "instruction": {
      "az": "Suda üzən balığı seç.",
      "en": "Select the fish swimming in water.",
      "ru": "Выбери рыбу, плавающую в воде."
    },
    "options": {
      "Qızıl Balıq": {
        "en": "Goldfish",
        "ru": "Золотая рыбка"
      },
      "Dovşan": {
        "en": "Rabbit",
        "ru": "Кролик"
      },
      "Toyuq": {
        "en": "Hen",
        "ru": "Курица"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "ani-sea-dolphin-2": {
    "question": {
      "az": "Dənizdə şən tullanan və üzən dostumuz hansıdır?",
      "en": "Which friend joyfully jumps and swims in the sea?",
      "ru": "Какой друг весело прыгает и плавает в море?"
    },
    "instruction": {
      "az": "Dəniz dostumuzu tap.",
      "en": "Find our sea friend.",
      "ru": "Найди нашего морского друга."
    },
    "options": {
      "Delfin": {
        "en": "Dolphin",
        "ru": "Дельфин"
      },
      "Ayı": {
        "en": "Bear",
        "ru": "Медведь"
      },
      "Şir": {
        "en": "Lion",
        "ru": "Лев"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fav-strawberry-1": {
    "question": {
      "az": "Qırmızı rəngdə, nöqtəli və şirin giləmeyvə hansıdır?",
      "en": "Which red, spotted, and sweet berry is this?",
      "ru": "Какая ягода красная, в крапинку и сладкая?"
    },
    "instruction": {
      "az": "Şirin qırmızı giləmeyvəni seç.",
      "en": "Select the sweet red berry.",
      "ru": "Выбери сладкую красную ягоду."
    },
    "options": {
      "Çiyələk": {
        "en": "Strawberry",
        "ru": "Клубника"
      },
      "Xiyar": {
        "en": "Cucumber",
        "ru": "Огурец"
      },
      "Kartof": {
        "en": "Potato",
        "ru": "Картофель"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fav-banana-2": {
    "question": {
      "az": "Meymunların çox sevdiyi sarı meyvə hansıdır?",
      "en": "Which yellow fruit do monkeys love?",
      "ru": "Какой желтый фрукт очень любят обезьянки?"
    },
    "instruction": {
      "az": "Sarı və şirin meyvəni tap.",
      "en": "Find the yellow sweet fruit.",
      "ru": "Найди желтый сладкий фрукт."
    },
    "options": {
      "Banan": {
        "en": "Banana",
        "ru": "Банан"
      },
      "Kök": {
        "en": "Carrot",
        "ru": "Морковь"
      },
      "Pomidor": {
        "en": "Tomato",
        "ru": "Помидор"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fav-grapes-3": {
    "question": {
      "az": "Salxım şəklində böyüyən şirin giləmeyvə hansıdır?",
      "en": "Which sweet berry grows in bunches?",
      "ru": "Какая сладкая ягода растет гроздьями?"
    },
    "instruction": {
      "az": "Salxımlı meyvəni seç.",
      "en": "Select the cluster fruit.",
      "ru": "Выбери ягоды гроздьями."
    },
    "options": {
      "Üzüm": {
        "en": "Grapes",
        "ru": "Виноград"
      },
      "Soğan": {
        "en": "Onion",
        "ru": "Лук"
      },
      "Kələm": {
        "en": "Cabbage",
        "ru": "Капуста"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fav-potato-1": {
    "question": {
      "az": "Torpağın altında böyüyən, dadlı püresi olan tərəvəz hansıdır?",
      "en": "Which vegetable grows underground and makes tasty puree?",
      "ru": "Какой овощ растет под землей и из него делают пюре?"
    },
    "instruction": {
      "az": "Torpaq altında yetişən tərəvəzi tap.",
      "en": "Find the vegetable grown underground.",
      "ru": "Найди овощ, растущий под землей."
    },
    "options": {
      "Kartof": {
        "en": "Potato",
        "ru": "Картофель"
      },
      "Alma": {
        "en": "Apple",
        "ru": "Яблоко"
      },
      "Albalı": {
        "en": "Cherry",
        "ru": "Вишня"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fav-cucumber-2": {
    "question": {
      "az": "Yaşıl, xırçıltılı və təravətli tərəvəz hansıdır?",
      "en": "Which vegetable is green, crunchy, and fresh?",
      "ru": "Какой овощ зеленый, хрустящий и свежий?"
    },
    "instruction": {
      "az": "Təravətli yaşıl tərəvəzi tap.",
      "en": "Find the fresh green vegetable.",
      "ru": "Найди свежий зеленый овощ."
    },
    "options": {
      "Xiyar": {
        "en": "Cucumber",
        "ru": "Огурец"
      },
      "Limon": {
        "en": "Lemon",
        "ru": "Лимон"
      },
      "Şaftalı": {
        "en": "Peach",
        "ru": "Персик"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "tra-ship-1": {
    "question": {
      "az": "Dənizdə və okeanda üzən böyük nəqliyyat vasitəsi hansıdır?",
      "en": "Which large transport vehicle sails in seas and oceans?",
      "ru": "Какой большой транспорт плавает по морям и океанам?"
    },
    "instruction": {
      "az": "Dənizdə üzən nəqliyyatı tap.",
      "en": "Find the transport sailing in the sea.",
      "ru": "Найди транспорт, плавающий в море."
    },
    "options": {
      "Böyük Gəmi": {
        "en": "Big Ship",
        "ru": "Большой корабль"
      },
      "Avtomobil": {
        "en": "Car",
        "ru": "Автомобиль"
      },
      "Velosiped": {
        "en": "Bicycle",
        "ru": "Велосипед"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "tra-boat-2": {
    "question": {
      "az": "Avar çəkərək çayda üzdüyümüz nəqliyyat hansıdır?",
      "en": "Which transport do we row in the river?",
      "ru": "На каком транспорте мы гребем веслами по реке?"
    },
    "instruction": {
      "az": "Çayda üzən qayığı seç.",
      "en": "Select the boat sailing in river.",
      "ru": "Выбери лодку, плывущую по реке."
    },
    "options": {
      "Qayıq": {
        "en": "Boat",
        "ru": "Лодка"
      },
      "Təyyarə": {
        "en": "Airplane",
        "ru": "Самолет"
      },
      "Avtobus": {
        "en": "Bus",
        "ru": "Автобус"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "tra-sail-3": {
    "question": {
      "az": "Küləyin köməyi ilə üzən yelkənli nəqliyyat hansıdır?",
      "en": "Which sailing transport moves with the help of wind?",
      "ru": "Какой парусный транспорт движется с помощью ветра?"
    },
    "instruction": {
      "az": "Küləklə üzən yelkənli vasitəni tap.",
      "en": "Find the wind-powered sailing vessel.",
      "ru": "Найди судно, плывущее от ветра."
    },
    "options": {
      "Yelkənli Gəmi": {
        "en": "Sailboat",
        "ru": "Парусник"
      },
      "Qatar": {
        "en": "Train",
        "ru": "Поезд"
      },
      "Tramvay": {
        "en": "Tram",
        "ru": "Трамвай"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "tra-rescue-fire-1": {
    "question": {
      "az": "Qırmızı rəngdə olan və yanğını söndürməyə tələsən maşın hansıdır?",
      "en": "Which red vehicle rushes to extinguish fires?",
      "ru": "Какая красная машина спешит тушить пожар?"
    },
    "instruction": {
      "az": "Yanğını söndürməyə gedən maşını seç.",
      "en": "Select the fire fighting truck.",
      "ru": "Выбери пожарную машину."
    },
    "options": {
      "Yanğınsöndürən Maşın": {
        "en": "Fire Truck",
        "ru": "Пожарная машина"
      },
      "Taksi": {
        "en": "Taxi",
        "ru": "Такси"
      },
      "Traktor": {
        "en": "Tractor",
        "ru": "Трактор"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "tra-rescue-ambulance-2": {
    "question": {
      "az": "Həkimləri xəstələrin köməyinə tələsdirən maşın hansıdır?",
      "en": "Which vehicle rushes doctors to help patients?",
      "ru": "Какая машина везет врачей на помощь больным?"
    },
    "instruction": {
      "az": "Xəstələrə kömək edən avtomobili tap.",
      "en": "Find the vehicle that helps sick people.",
      "ru": "Найди автомобиль, помогающий больным."
    },
    "options": {
      "Təcili Yardım": {
        "en": "Ambulance",
        "ru": "Скорая помощь"
      },
      "Yük Maşını": {
        "en": "Cargo Truck",
        "ru": "Грузовик"
      },
      "Motosiklet": {
        "en": "Motorcycle",
        "ru": "Мотоцикл"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "prf-firefighter-1": {
    "question": {
      "az": "Yanğını söndürən cəsur peşə sahibi kimdir?",
      "en": "Who is the brave professional who puts out fires?",
      "ru": "Кто этот смелый человек, который тушит огонь?"
    },
    "instruction": {
      "az": "Yanğını söndürən peşə sahibini seç.",
      "en": "Select the professional who puts out fire.",
      "ru": "Выбери профессию человека, тушащего пожары."
    },
    "options": {
      "Yanğınsöndürən": {
        "en": "Firefighter",
        "ru": "Пожарный"
      },
      "Dərzi": {
        "en": "Tailor",
        "ru": "Портной"
      },
      "Bərbər": {
        "en": "Barber",
        "ru": "Парикмахер"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "prf-police-2": {
    "question": {
      "az": "Yol qaydalarına və asayişə nəzarət edən kimdir?",
      "en": "Who oversees traffic rules and safety?",
      "ru": "Кто следит за правилами дороги и порядком?"
    },
    "instruction": {
      "az": "Qaydaları qoruyan peşə sahibini tap.",
      "en": "Find the professional who protects rules.",
      "ru": "Найди профессию человека, охраняющего порядок."
    },
    "options": {
      "Polis": {
        "en": "Police Officer",
        "ru": "Полицейский"
      },
      "Rəssam": {
        "en": "Painter",
        "ru": "Художник"
      },
      "Musiqiçi": {
        "en": "Musician",
        "ru": "Музыкант"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "prf-fire-tool-3": {
    "question": {
      "az": "Yanğınsöndürən alovu söndürmək üçün nə istifadə edir?",
      "en": "What does a firefighter use to extinguish fire?",
      "ru": "Что использует пожарный для тушения огня?"
    },
    "instruction": {
      "az": "Yanğını söndürən aləti seç.",
      "en": "Select the tool for extinguishing fire.",
      "ru": "Выбери инструмент для тушения огня."
    },
    "options": {
      "Su Şlanqı": {
        "en": "Water Hose",
        "ru": "Водяной шланг"
      },
      "Qələm": {
        "en": "Pen",
        "ru": "Ручка"
      },
      "Qaşıq": {
        "en": "Spoon",
        "ru": "Ложка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "prf-chef-1": {
    "question": {
      "az": "Restoranda dadlı şorba və yeməklər bişirən kimdir?",
      "en": "Who cooks delicious soup and meals in a restaurant?",
      "ru": "Кто готовит вкусный суп и еду в ресторане?"
    },
    "instruction": {
      "az": "Dadlı yeməklər bişirən peşə sahibini seç.",
      "en": "Select the professional who cooks tasty meals.",
      "ru": "Выбери профессию человека, готовящего вкусную еду."
    },
    "options": {
      "Aşpaz": {
        "en": "Chef",
        "ru": "Повар"
      },
      "Həkim": {
        "en": "Doctor",
        "ru": "Врач"
      },
      "Kosmonavt": {
        "en": "Astronaut",
        "ru": "Космонавт"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "prf-builder-2": {
    "question": {
      "az": "Kərpiclərlə hündür və gözəl binalar tikən kimdir?",
      "en": "Who builds tall and beautiful buildings with bricks?",
      "ru": "Кто строит высокие красивые здания из кирпича?"
    },
    "instruction": {
      "az": "Ev tikən peşə sahibini tap.",
      "en": "Find the professional who builds houses.",
      "ru": "Найди профессию человека, строящего дома."
    },
    "options": {
      "İnşaatçı Bənna": {
        "en": "Builder",
        "ru": "Строитель"
      },
      "Müəllim": {
        "en": "Teacher",
        "ru": "Учитель"
      },
      "Dənizçi": {
        "en": "Sailor",
        "ru": "Моряк"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fam-brother-1": {
    "question": {
      "az": "Bizim sevimli oğlan ailə üzvümüz kimdir?",
      "en": "Who is our beloved boy family member?",
      "ru": "Кто наш любимый член семьи мальчик?"
    },
    "instruction": {
      "az": "Qardaş ailə üzvünü seç.",
      "en": "Select the brother family member.",
      "ru": "Выбери члена семьи — брата."
    },
    "options": {
      "Qardaş": {
        "en": "Brother",
        "ru": "Брат"
      },
      "Qonşu": {
        "en": "Neighbor",
        "ru": "Сосед"
      },
      "Yad Adam": {
        "en": "Stranger",
        "ru": "Незнакомец"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fam-sister-2": {
    "question": {
      "az": "Bizim mehriban qız ailə üzvümüz kimdir?",
      "en": "Who is our kind girl family member?",
      "ru": "Кто наш добрый член семьи девочка?"
    },
    "instruction": {
      "az": "Bacı ailə üzvünü tap.",
      "en": "Find the sister family member.",
      "ru": "Найди члена семьи — сестру."
    },
    "options": {
      "Bacı": {
        "en": "Sister",
        "ru": "Сестра"
      },
      "Qəhrəman": {
        "en": "Hero",
        "ru": "Герой"
      },
      "Satıcı": {
        "en": "Shopkeeper",
        "ru": "Продавец"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fam-share-3": {
    "question": {
      "az": "Qardaş və bacı ilə necə rəftar etməliyik?",
      "en": "How should we behave with brother and sister?",
      "ru": "Как мы должны обращаться с братом и сестрой?"
    },
    "instruction": {
      "az": "Ailədə düzgün davranışı seç.",
      "en": "Select the right behavior in family.",
      "ru": "Выбери правильное поведение в семье."
    },
    "options": {
      "Mehriban olmalı və bölüşməliyik": {
        "en": "Be kind and share",
        "ru": "Быть дружными и делиться"
      },
      "Oyuncaqları gizlətməliyik": {
        "en": "Hide toys",
        "ru": "Прятать игрушки"
      },
      "Küsüşməliyik": {
        "en": "Quarrel",
        "ru": "Ссориться"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fam-hug-1": {
    "question": {
      "az": "Ailə üzvlərimizi sevdiyimizi necə göstəririk?",
      "en": "How do we show that we love our family members?",
      "ru": "Как мы показываем любовь к членам семьи?"
    },
    "instruction": {
      "az": "Sevgi göstərmək yolunu seç.",
      "en": "Select the way to show love.",
      "ru": "Выбери способ проявить любовь."
    },
    "options": {
      "Mehribanlıqla qucaqlayaraq": {
        "en": "With a warm hug",
        "ru": "Теплыми объятиями"
      },
      "Qışqıraraq": {
        "en": "By shouting",
        "ru": "Криками"
      },
      "Qapını çırparaq": {
        "en": "Slamming door",
        "ru": "Хлопая дверью"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fam-help-mom-2": {
    "question": {
      "az": "Anamıza evdə necə kömək edə bilərik?",
      "en": "How can we help our mother at home?",
      "ru": "Как мы можем помочь маме дома?"
    },
    "instruction": {
      "az": "Evdə kömək etməyi tap.",
      "en": "Find how to help at home.",
      "ru": "Найди, как помочь дома."
    },
    "options": {
      "Oyuncaqları səliqəyə yığaraq": {
        "en": "By tidying up toys",
        "ru": "Убирая игрушки"
      },
      "Otağı dağıdaraq": {
        "en": "Making a mess",
        "ru": "Разбрасывая вещи"
      },
      "Tənbəllik edərək": {
        "en": "Being lazy",
        "ru": "Ленясь"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "fam-dinner-together-3": {
    "question": {
      "az": "Bütün ailə birlikdə nə edəndə çox sevinir?",
      "en": "When does the whole family feel happy together?",
      "ru": "Когда вся семья радуется вместе?"
    },
    "instruction": {
      "az": "Birlikdə vaxt keçirməyi seç.",
      "en": "Select spending time together.",
      "ru": "Выбери проведение времени вместе."
    },
    "options": {
      "Birlikdə süfrə arxasında oturanda": {
        "en": "Sitting together at dinner",
        "ru": "Сидя вместе за ужином"
      },
      "Hamı tək qalanda": {
        "en": "When everyone is alone",
        "ru": "Когда все поодиночке"
      },
      "Qaranlıqda oturanda": {
        "en": "Sitting in the dark",
        "ru": "Сидя в темноте"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd-jump-1": {
    "question": {
      "az": "Yerində 3 dəfə yuxarı tullan!",
      "en": "Jump up 3 times on the spot!",
      "ru": "Подпрыгни 3 раза на месте!"
    },
    "instruction": {
      "az": "Tullanmaq komandasını tap.",
      "en": "Find the jumping command.",
      "ru": "Найди команду прыжка."
    },
    "options": {
      "Tullanmaq": {
        "en": "Jumping",
        "ru": "Прыгать"
      },
      "Yatmaq": {
        "en": "Sleeping",
        "ru": "Спать"
      },
      "Oturmaq": {
        "en": "Sitting",
        "ru": "Сидеть"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd-smile-2": {
    "question": {
      "az": "Gözəl təbəssümlə gülümsə!",
      "en": "Smile with a lovely smile!",
      "ru": "Улыбнись красивой улыбкой!"
    },
    "instruction": {
      "az": "Gülümsəmək komandasını yerinə yetir.",
      "en": "Perform the smiling command.",
      "ru": "Выполни команду улыбки."
    },
    "options": {
      "Gülümsəmək": {
        "en": "Smiling",
        "ru": "Улыбаться"
      },
      "Ağlamaq": {
        "en": "Crying",
        "ru": "Плакать"
      },
      "Qaşqabaq tökmək": {
        "en": "Frowning",
        "ru": "Хмуриться"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd-stop-3": {
    "question": {
      "az": "Olduğun yerdə hərəkətsiz dayan!",
      "en": "Freeze and stop on the spot!",
      "ru": "Замри и остановись на месте!"
    },
    "instruction": {
      "az": "Dayanmaq komandasını seç.",
      "en": "Select the stop command.",
      "ru": "Выбери команду остановки."
    },
    "options": {
      "Dayanmaq": {
        "en": "Stopping",
        "ru": "Остановиться"
      },
      "Qaçmaq": {
        "en": "Running",
        "ru": "Бежать"
      },
      "Fırlanmaq": {
        "en": "Spinning",
        "ru": "Кружиться"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd-touch-nose-4": {
    "question": {
      "az": "Barmağınla ehmalca burnuna toxun!",
      "en": "Gently touch your nose with your finger!",
      "ru": "Осторожно дотронься пальчиком до носика!"
    },
    "instruction": {
      "az": "Burnuna toxunmaq komandasını tap.",
      "en": "Find touch nose command.",
      "ru": "Найди команду дотронуться до носа."
    },
    "options": {
      "Burnuna toxunmaq": {
        "en": "Touching nose",
        "ru": "Трогать нос"
      },
      "Gözü yummaq": {
        "en": "Closing eyes",
        "ru": "Закрывать глаза"
      },
      "Qaçmaq": {
        "en": "Running",
        "ru": "Убегать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd-march-7": {
    "question": {
      "az": "Əsgər kimi yerində şən addımla!",
      "en": "March happily on the spot like a soldier!",
      "ru": "Шагай весело на месте как солдатик!"
    },
    "instruction": {
      "az": "Yerində addımlamaq komandasını tap.",
      "en": "Find march on spot command.",
      "ru": "Найди команду шагать на месте."
    },
    "options": {
      "Yerində addımlamaq": {
        "en": "Marching on spot",
        "ru": "Шагать на месте"
      },
      "Oturmaq": {
        "en": "Sitting",
        "ru": "Сидеть"
      },
      "Yatmaq": {
        "en": "Sleeping",
        "ru": "Спать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd-look-up-5": {
    "question": {
      "az": "Başını yuxarı qaldır və səmaya bax!",
      "en": "Raise your head and look up at the sky!",
      "ru": "Подними голову и посмотри вверх на небо!"
    },
    "instruction": {
      "az": "Yuxarı baxmaq komandasını seç.",
      "en": "Select look up command.",
      "ru": "Выбери команду посмотреть вверх."
    },
    "options": {
      "Yuxarı baxmaq": {
        "en": "Looking up",
        "ru": "Смотреть вверх"
      },
      "Aşağı baxmaq": {
        "en": "Looking down",
        "ru": "Смотреть вниз"
      },
      "Gözü bağlamaq": {
        "en": "Shutting eyes",
        "ru": "Закрывать глаза"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd-listen-6": {
    "question": {
      "az": "Əlini qulağına apar və diqqətlə dinlə!",
      "en": "Put hand to ear and listen carefully!",
      "ru": "Поднеси руку к уху и внимательно слушай!"
    },
    "instruction": {
      "az": "Qulaq asmaq komandasını tap.",
      "en": "Find listen command.",
      "ru": "Найди команду слушать."
    },
    "options": {
      "Qulaq asmaq": {
        "en": "Listening",
        "ru": "Слушать"
      },
      "Ağzı açmaq": {
        "en": "Opening mouth",
        "ru": "Открывать рот"
      },
      "Tullanmaq": {
        "en": "Jumping",
        "ru": "Прыгать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd2-clap-sit-1": {
    "question": {
      "az": "Əvvəlcə əl çal, sonra stulda otur!",
      "en": "First clap your hands, then sit on the chair!",
      "ru": "Сначала хлопни в ладоши, потом сядь на стул!"
    },
    "instruction": {
      "az": "Ardıcıl iki hərəkəti seç.",
      "en": "Select two consecutive movements.",
      "ru": "Выбери два последовательных движения."
    },
    "options": {
      "Əl çalmaq və oturmaq": {
        "en": "Clap and sit",
        "ru": "Хлопнуть и сесть"
      },
      "Yalnız oturmaq": {
        "en": "Only sit",
        "ru": "Только сесть"
      },
      "Yalnız yatmaq": {
        "en": "Only sleep",
        "ru": "Только спать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd2-stand-turn-2": {
    "question": {
      "az": "Ayağa dur və yerində bir dəfə fırlan!",
      "en": "Stand up and spin once on the spot!",
      "ru": "Встань и один раз повернись вокруг себя!"
    },
    "instruction": {
      "az": "Ayağa qalxıb fırlanmaq komandasını tap.",
      "en": "Find stand up and spin command.",
      "ru": "Найди команду встать и повернуться."
    },
    "options": {
      "Durmaq və fırlanmaq": {
        "en": "Stand and spin",
        "ru": "Встать и повернуться"
      },
      "Qaçmaq və tullanmaq": {
        "en": "Run and jump",
        "ru": "Бежать и прыгать"
      },
      "Oturmaq və susmaq": {
        "en": "Sit and be quiet",
        "ru": "Сесть и молчать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd2-draw-color-3": {
    "question": {
      "az": "Vərəqdə günəş çək və sarı rənglə!",
      "en": "Draw a sun on paper and color it yellow!",
      "ru": "Нарисуй солнце на бумаге и раскрась желтым!"
    },
    "instruction": {
      "az": "Şəkil çəkib rəngləmək komandasını seç.",
      "en": "Select draw and color command.",
      "ru": "Выбери команду нарисовать и раскрасить."
    },
    "options": {
      "Çəkmək və boyamaq": {
        "en": "Draw and color",
        "ru": "Нарисовать и раскрасить"
      },
      "Yalnız kəsmək": {
        "en": "Only cut",
        "ru": "Только резать"
      },
      "Kağızı cırmaq": {
        "en": "Tear paper",
        "ru": "Рвать бумагу"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd2-open-close-4": {
    "question": {
      "az": "Qapını aç və yavaşca bağla!",
      "en": "Open the door and close it gently!",
      "ru": "Открой дверь и аккуратно закрой!"
    },
    "instruction": {
      "az": "Qapı komandasını yerinə yetir.",
      "en": "Perform door command.",
      "ru": "Выполни команду с дверью."
    },
    "options": {
      "Açmaq və bağlamaq": {
        "en": "Open and close",
        "ru": "Открыть и закрыть"
      },
      "Yalnız qaçmaq": {
        "en": "Only run",
        "ru": "Только бежать"
      },
      "Qapını döymək": {
        "en": "Knock door",
        "ru": "Стучать в дверь"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd2-wash-dry-5": {
    "question": {
      "az": "Əllərini sabunla yu və dəsmalla qurula!",
      "en": "Wash your hands with soap and dry with towel!",
      "ru": "Помой руки с мылом и вытри полотенцем!"
    },
    "instruction": {
      "az": "Əllərin təmizlik komandasını tap.",
      "en": "Find hands washing command.",
      "ru": "Найди команду мытья рук."
    },
    "options": {
      "Yumaq və qurulamaq": {
        "en": "Wash and dry",
        "ru": "Помыть и вытереть"
      },
      "Yalnız su tökmək": {
        "en": "Only pour water",
        "ru": "Только лить воду"
      },
      "Çirkli saxlamaq": {
        "en": "Keep dirty",
        "ru": "Оставить грязными"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "cmd2-ball-catch-6": {
    "question": {
      "az": "Topu yuxarı at və iki əlinlə tut!",
      "en": "Throw the ball up and catch with both hands!",
      "ru": "Брось мяч вверх и поймай двумя руками!"
    },
    "instruction": {
      "az": "Top oyunu komandasını seç.",
      "en": "Select ball game command.",
      "ru": "Выбери команду игры с мячом."
    },
    "options": {
      "Atmaq və tutmaq": {
        "en": "Throw and catch",
        "ru": "Бросить и поймать"
      },
      "Təpiklə vurmaq": {
        "en": "Kick away",
        "ru": "Пнуть ногой"
      },
      "Topu gizlətmək": {
        "en": "Hide ball",
        "ru": "Спрятать мяч"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "space-front-car-1": {
    "question": {
      "az": "Şəklə bax: Uşaq avtomobilin harasındadır?",
      "en": "Look at the picture: Where is the child relative to the car?",
      "ru": "Посмотри на картинку: Где ребенок по отношению к машине?"
    },
    "instruction": {
      "az": "Şəklə baxıb mövqeyi tap.",
      "en": "Look at the picture and find position.",
      "ru": "Посмотри на картинку и найди положение."
    },
    "options": {
      "Qabağında": {
        "en": "In front of",
        "ru": "Впереди / Спереди"
      },
      "Arxasında": {
        "en": "Behind",
        "ru": "Сзади"
      },
      "Altında": {
        "en": "Under",
        "ru": "Внизу / Под"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "space-behind-tree-2": {
    "question": {
      "az": "Şəklə bax: Dovşan ağacın harasında gizlənib?",
      "en": "Look at the scene: Where is the rabbit hiding relative to tree?",
      "ru": "Посмотри на картинку: Где кролик прячется за деревом?"
    },
    "instruction": {
      "az": "Dovşanın gizləndiyi yeri seç.",
      "en": "Select where the rabbit is hidden.",
      "ru": "Выбери, где спрятался кролик."
    },
    "options": {
      "Arxasında": {
        "en": "Behind",
        "ru": "Сзади / За ним"
      },
      "Üstündə": {
        "en": "On top",
        "ru": "Наверху"
      },
      "İçində": {
        "en": "Inside",
        "ru": "Внутри"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "space-front-house-3": {
    "question": {
      "az": "Şəklə bax: Gözəl çiçək evin harasındadır?",
      "en": "Look at picture: Where is the flower relative to the house?",
      "ru": "Где цветок по отношению к дому?"
    },
    "instruction": {
      "az": "Gülün yerini müəyyən et.",
      "en": "Identify the flower location.",
      "ru": "Определи место цветка."
    },
    "options": {
      "Qabağında": {
        "en": "In front of",
        "ru": "Перед домом"
      },
      "Altında": {
        "en": "Underneath",
        "ru": "Под домом"
      },
      "İçində": {
        "en": "Inside",
        "ru": "Внутри"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "space-above-cloud-4": {
    "question": {
      "az": "Şəklə bax: Təyyarə buludların harasındadır?",
      "en": "Where is the airplane relative to the clouds?",
      "ru": "Где самолет по отношению к облакам?"
    },
    "instruction": {
      "az": "Təyyarənin mövqeyini tap.",
      "en": "Find airplane position.",
      "ru": "Найди положение самолета."
    },
    "options": {
      "Yuxarıda": {
        "en": "Above / Up",
        "ru": "Вверху / Над"
      },
      "Aşağıda": {
        "en": "Below / Down",
        "ru": "Внизу / Под"
      },
      "İçində": {
        "en": "Inside",
        "ru": "Внутри"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "space-below-ground-5": {
    "question": {
      "az": "Şəklə bax: Balaca qarışqa haradadır?",
      "en": "Where is the little ant located?",
      "ru": "Где находится маленький муравей?"
    },
    "instruction": {
      "az": "Qarışqanın yerini seç.",
      "en": "Select ant location.",
      "ru": "Выбери место муравья."
    },
    "options": {
      "Aşağıda": {
        "en": "Below / Down",
        "ru": "Внизу"
      },
      "Yuxarıda göydə": {
        "en": "Up in sky",
        "ru": "Вверху в небе"
      },
      "Ulduzlarda": {
        "en": "In stars",
        "ru": "В звездах"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "space-lamp-table-6": {
    "question": {
      "az": "Şəklə bax: İşıq saçan lampa masanın harasındadır?",
      "en": "Where is the lamp relative to the table?",
      "ru": "Где лампа по отношению к столу?"
    },
    "instruction": {
      "az": "Lampanın mövqeyini tap.",
      "en": "Find lamp position.",
      "ru": "Найди положение лампы."
    },
    "options": {
      "Yuxarıda": {
        "en": "Above",
        "ru": "Вверху / Сверху"
      },
      "Altında": {
        "en": "Underneath",
        "ru": "Снизу / Под"
      },
      "Yanında": {
        "en": "Beside",
        "ru": "Сбоку"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "size-train-car-1": {
    "question": {
      "az": "Şəklə bax: Qatar və avtomobili müqayisə et: Hansı daha uzundur?",
      "en": "Look at scene: Compare train and car: Which one is longer?",
      "ru": "Посмотри на картинку: Какой транспорт длиннее?"
    },
    "instruction": {
      "az": "Daha uzun olan nəqliyyatı seç.",
      "en": "Select the longer transport.",
      "ru": "Выбери более длинный транспорт."
    },
    "options": {
      "Uzun Qatar": {
        "en": "Long Train",
        "ru": "Длинный поезд"
      },
      "Qısa Avtomobil": {
        "en": "Short Car",
        "ru": "Короткая машина"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "size-pencil-short-2": {
    "question": {
      "az": "Xətkeş və qələmə bax: Hansı daha qısadır?",
      "en": "Look at ruler and pencil: Which one is shorter?",
      "ru": "Посмотри на линейку и карандаш: Какой предмет короче?"
    },
    "instruction": {
      "az": "Qısa olan əşyanı tap.",
      "en": "Find the shorter item.",
      "ru": "Найди более короткий предмет."
    },
    "options": {
      "Qısa Qələm": {
        "en": "Short Pencil",
        "ru": "Короткий карандаш"
      },
      "Uzun Xətkeş": {
        "en": "Long Ruler",
        "ru": "Длинная линейка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "size-snake-worm-3": {
    "question": {
      "az": "İlan və soxulcana bax: Hansı daha uzundur?",
      "en": "Look at snake and worm: Which is longer?",
      "ru": "Посмотри на змею и червяка: Кто длиннее?"
    },
    "instruction": {
      "az": "Uzun olan canlı seç.",
      "en": "Select the longer animal.",
      "ru": "Выбери более длинное животное."
    },
    "options": {
      "Uzun İlan": {
        "en": "Long Snake",
        "ru": "Длинная змея"
      },
      "Qısa Soxulcan": {
        "en": "Short Worm",
        "ru": "Короткий червяк"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "size-elephant-feather-4": {
    "question": {
      "az": "Fil və quş tükünə bax: Hansı daha ağırdır?",
      "en": "Look at elephant and feather: Which is heavier?",
      "ru": "Посмотри на слона и перо: Кто тяжелее?"
    },
    "instruction": {
      "az": "Ağır olan heyvanı seç.",
      "en": "Select the heavy animal.",
      "ru": "Выбери тяжелое животное."
    },
    "options": {
      "Ağır Fil": {
        "en": "Heavy Elephant",
        "ru": "Тяжелый слон"
      },
      "Yüngül Tük": {
        "en": "Light Feather",
        "ru": "Легкое перо"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "size-balloon-stone-5": {
    "question": {
      "az": "Şar və daşa bax: Hansı havada uçacaq qədər yüngüldür?",
      "en": "Look at balloon and stone: Which is light enough to fly in the air?",
      "ru": "Посмотри на шарик и камень: Что настолько легкое, чтобы летать в воздухе?"
    },
    "instruction": {
      "az": "Havada uçan yüngül əşyanı tap.",
      "en": "Find the light flying item.",
      "ru": "Найди легкий летающий предмет."
    },
    "options": {
      "Yüngül Şar": {
        "en": "Light Balloon",
        "ru": "Легкий шарик"
      },
      "Ağır Daş": {
        "en": "Heavy Stone",
        "ru": "Тяжелый камень"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "size-watermelon-apple-6": {
    "question": {
      "az": "Qarpız və almanı müqayisə et: Hansı daha ağırdır?",
      "en": "Compare watermelon and apple: Which one is heavier?",
      "ru": "Сравни арбуз и яблоко: Что тяжелее?"
    },
    "instruction": {
      "az": "Daha ağır olan meyvəni seç.",
      "en": "Select the heavier fruit.",
      "ru": "Выбери более тяжелый плод."
    },
    "options": {
      "Ağır Qarpız": {
        "en": "Heavy Watermelon",
        "ru": "Тяжелый арбуз"
      },
      "Yüngül Alma": {
        "en": "Light Apple",
        "ru": "Легкое яблоко"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "opp-door-open-1": {
    "question": {
      "az": "Evə girmək üçün qapı necə olmalıdır?",
      "en": "How should the door be to enter the house?",
      "ru": "Какой должна быть дверь, чтобы войти в дом?"
    },
    "instruction": {
      "az": "Açıq vəziyyəti tap.",
      "en": "Find open state.",
      "ru": "Найди открытое состояние."
    },
    "options": {
      "Açıq": {
        "en": "Open",
        "ru": "Открытой"
      },
      "Bağlı": {
        "en": "Closed",
        "ru": "Закрытой"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "opp-book-closed-2": {
    "question": {
      "az": "Dərsi bitirdikdən sonra kitabı necə edirik?",
      "en": "What do we do with the book after finishing our study?",
      "ru": "Что мы делаем с книгой после окончания урока?"
    },
    "instruction": {
      "az": "Dərsi bitirdikdən sonrakı halı tap.",
      "en": "Find state after finishing lesson.",
      "ru": "Найди состояние после окончания урока."
    },
    "options": {
      "Bağlayırıq": {
        "en": "Close it",
        "ru": "Закрываем"
      },
      "Açıq qoyuruq": {
        "en": "Leave open",
        "ru": "Оставляем открытой"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "opp-box-open-3": {
    "question": {
      "az": "İçindəki hədiyyəni görmək üçün qutunun qapağı necə olmalıdır?",
      "en": "How should the box lid be to see the gift inside?",
      "ru": "Какой должна быть крышка коробки, чтобы увидеть подарок?"
    },
    "instruction": {
      "az": "Qutunun vəziyyətini seç.",
      "en": "Select box state.",
      "ru": "Выбери состояние коробки."
    },
    "options": {
      "Açıq": {
        "en": "Open",
        "ru": "Открытой"
      },
      "Bağlı": {
        "en": "Closed",
        "ru": "Закрытой"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "opp-sweet-honey-4": {
    "question": {
      "az": "Limon turşdur, bəs balın dadı necədir?",
      "en": "Lemon is sour, but how does honey taste?",
      "ru": "Лимон кислый, а какой на вкус мед?"
    },
    "instruction": {
      "az": "Şirin dadı tap.",
      "en": "Find the sweet taste.",
      "ru": "Найди сладкий вкус."
    },
    "options": {
      "Şirindir": {
        "en": "Sweet",
        "ru": "Сладкий"
      },
      "Acıdır": {
        "en": "Bitter",
        "ru": "Горький"
      },
      "Duzludur": {
        "en": "Salty",
        "ru": "Соленый"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "opp-full-glass-5": {
    "question": {
      "az": "Ləzzətli şirə ilə dolu olan stəkan hansıdır?",
      "en": "Which glass is full of delicious juice?",
      "ru": "Какой стакан полон вкусного сока?"
    },
    "instruction": {
      "az": "Dolu olan stəkanı tap.",
      "en": "Find the full glass.",
      "ru": "Найди полный стакан."
    },
    "options": {
      "Dolu Stəkan": {
        "en": "Full Glass",
        "ru": "Полный стакан"
      },
      "Boş Stəkan": {
        "en": "Empty Glass",
        "ru": "Пустой стакан"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "opp-up-down-6": {
    "question": {
      "az": "\"Yuxarı\" sözünün əksi hansıdır?",
      "en": "What is the opposite of \"Up\"?",
      "ru": "Что противоположно слову «Вверх»?"
    },
    "instruction": {
      "az": "Əks istiqaməti seç.",
      "en": "Select opposite direction.",
      "ru": "Выбери противоположное направление."
    },
    "options": {
      "Aşağı": {
        "en": "Down",
        "ru": "Вниз"
      },
      "İsti": {
        "en": "Hot",
        "ru": "Горячий"
      },
      "Gecə": {
        "en": "Night",
        "ru": "Ночь"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "num-stars-6": {
    "question": {
      "az": "Göydəki 6 ulduzu say və düzgün rəqəmi seç: ⭐⭐⭐⭐⭐⭐",
      "en": "Count the 6 stars and choose the right number: ⭐⭐⭐⭐⭐⭐",
      "ru": "Посчитай 6 звезд и выбери правильную цифру: ⭐⭐⭐⭐⭐⭐"
    },
    "instruction": {
      "az": "Göydəki 6 ulduzu say.",
      "en": "Count the 6 stars in the sky.",
      "ru": "Посчитай 6 звезд в небе."
    },
    "options": {
      "6 Ulduz": {
        "en": "6 Stars",
        "ru": "6 звезд"
      },
      "4 Ulduz": {
        "en": "4 Stars",
        "ru": "4 звезды"
      },
      "2 Ulduz": {
        "en": "2 Stars",
        "ru": "2 звезды"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "num-flowers-7": {
    "question": {
      "az": "Çiçəkləri say: 🌸🌸🌸🌸🌸🌸🌸 — Neçə dənədir?",
      "en": "Count flowers: 🌸🌸🌸🌸🌸🌸🌸 — How many are there?",
      "ru": "Посчитай цветы: 🌸🌸🌸🌸🌸🌸🌸 — Сколько их?"
    },
    "instruction": {
      "az": "Bağdakı 7 çiçəyi say.",
      "en": "Count 7 flowers in garden.",
      "ru": "Посчитай 7 цветков в саду."
    },
    "options": {
      "7 Çiçək": {
        "en": "7 Flowers",
        "ru": "7 цветков"
      },
      "5 Çiçək": {
        "en": "5 Flowers",
        "ru": "5 цветков"
      },
      "3 Çiçək": {
        "en": "3 Flowers",
        "ru": "3 цветка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "num-pencils-8": {
    "question": {
      "az": "Qutuda 8 qələm var: ✏️✏️✏️✏️✏️✏️✏️✏️ — Hansı rəqəmdir?",
      "en": "There are 8 pencils: ✏️✏️✏️✏️✏️✏️✏️✏️ — What number?",
      "ru": "В коробке 8 карандашей: ✏️✏️✏️✏️✏️✏️✏️✏️ — Какая цифра?"
    },
    "instruction": {
      "az": "Qələmləri say.",
      "en": "Count the pencils.",
      "ru": "Посчитай карандаши."
    },
    "options": {
      "8 Qələm": {
        "en": "8 Pencils",
        "ru": "8 карандашей"
      },
      "6 Qələm": {
        "en": "6 Pencils",
        "ru": "6 карандашей"
      },
      "9 Qələm": {
        "en": "9 Pencils",
        "ru": "9 карандашей"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "num-balloons-9": {
    "question": {
      "az": "Uşağın əlində 9 şar var: 🎈🎈🎈🎈🎈🎈🎈🎈🎈 — Hansı rəqəmdir?",
      "en": "Child holds 9 balloons: 🎈🎈🎈🎈🎈🎈🎈🎈🎈 — What number?",
      "ru": "У ребенка 9 шаров: 🎈🎈🎈🎈🎈🎈🎈🎈🎈 — Какая цифра?"
    },
    "instruction": {
      "az": "Şarları say.",
      "en": "Count the balloons.",
      "ru": "Посчитай шарики."
    },
    "options": {
      "9 Şar": {
        "en": "9 Balloons",
        "ru": "9 шаров"
      },
      "7 Şar": {
        "en": "7 Balloons",
        "ru": "7 шаров"
      },
      "4 Şar": {
        "en": "4 Balloons",
        "ru": "4 шара"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "num-fingers-10": {
    "question": {
      "az": "İki əlimizdə cəmi neçə barmaq var? 🖐️ + 🖐️ = ?",
      "en": "How many fingers in total on both hands? 🖐️ + 🖐️ = ?",
      "ru": "Сколько пальцев на двух руках всего? 🖐️ + 🖐️ = ?"
    },
    "instruction": {
      "az": "İki əlin barmaqlarını say.",
      "en": "Count fingers on both hands.",
      "ru": "Посчитай пальцы на обеих руках."
    },
    "options": {
      "10 Barmaq": {
        "en": "10 Fingers",
        "ru": "10 пальцев"
      },
      "5 Barmaq": {
        "en": "5 Fingers",
        "ru": "5 пальцев"
      },
      "8 Barmaq": {
        "en": "8 Fingers",
        "ru": "8 пальцев"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "let-e-house-1": {
    "question": {
      "az": "'E' hərfi ilə başlayan hansı sözdür?",
      "en": "Which word starts with letter 'E'?",
      "ru": "Какое слово начинается на букву 'E'?"
    },
    "instruction": {
      "az": "'E' hərfi ilə başlayan sözü seç.",
      "en": "Select the word starting with 'E'.",
      "ru": "Выбери слово на букву 'E'."
    },
    "options": {
      "Ev": {
        "en": "House (Ev)",
        "ru": "Дом (Ev)"
      },
      "Top": {
        "en": "Ball",
        "ru": "Мяч"
      },
      "Alma": {
        "en": "Apple",
        "ru": "Яблоко"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "let-ae-glove-2": {
    "question": {
      "az": "'Ə' hərfi ilə başlayan hansı sözdür?",
      "en": "Which word starts with letter 'Ə'?",
      "ru": "Какое слово начинается на букву 'Ə'?"
    },
    "instruction": {
      "az": "'Ə' hərfi ilə başlayan əşyanı tap.",
      "en": "Find the item starting with 'Ə'.",
      "ru": "Найди предмет на букву 'Ə'."
    },
    "options": {
      "Əlcək": {
        "en": "Glove (Əlcək)",
        "ru": "Перчатка (Əlcək)"
      },
      "Balıq": {
        "en": "Fish",
        "ru": "Рыба"
      },
      "Qələm": {
        "en": "Pen",
        "ru": "Карандаш"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "let-ae-hand-3": {
    "question": {
      "az": "Bədənimizin hansı hissəsi 'Ə' hərfi ilə başlayır?",
      "en": "Which body part starts with letter 'Ə'?",
      "ru": "Какая часть тела начинается на букву 'Ə'?"
    },
    "instruction": {
      "az": "'Ə' ilə başlayan bədən üzvünü tap.",
      "en": "Find the body part starting with 'Ə'.",
      "ru": "Найди часть тела на букву 'Ə'."
    },
    "options": {
      "Əl": {
        "en": "Hand (Əl)",
        "ru": "Рука (Əl)"
      },
      "Göz": {
        "en": "Eye",
        "ru": "Глаз"
      },
      "Qulaq": {
        "en": "Ear",
        "ru": "Ухо"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "let-m-car-4": {
    "question": {
      "az": "'M' hərfi ilə hansı nəqliyyat başlayır?",
      "en": "Which transport starts with letter 'M'?",
      "ru": "Какой транспорт начинается на букву 'M'?"
    },
    "instruction": {
      "az": "'M' hərfi ilə başlayan nəqliyyatı seç.",
      "en": "Select transport starting with 'M'.",
      "ru": "Выбери транспорт на букву 'M'."
    },
    "options": {
      "Maşın": {
        "en": "Car (Maşın)",
        "ru": "Машина (Maşın)"
      },
      "Təyyarə": {
        "en": "Plane",
        "ru": "Самолет"
      },
      "Gəmi": {
        "en": "Ship",
        "ru": "Корабль"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "let-s-clock-5": {
    "question": {
      "az": "Vaxtı göstərən və 'S' ilə başlayan əşya hansıdır?",
      "en": "Which item shows time and starts with 'S'?",
      "ru": "Какой предмет показывает время и начинается на 'S'?"
    },
    "instruction": {
      "az": "'S' hərfi ilə başlayan əşyanı tap.",
      "en": "Find the item starting with 'S'.",
      "ru": "Найди предмет на букву 'S'."
    },
    "options": {
      "Saat": {
        "en": "Clock (Saat)",
        "ru": "Часы (Saat)"
      },
      "Kitab": {
        "en": "Book",
        "ru": "Книга"
      },
      "Stul": {
        "en": "Chair",
        "ru": "Стул"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "let-t-ball-6": {
    "question": {
      "az": "'T' hərfi ilə hansı sevimli oyuncaq başlayır?",
      "en": "Which favorite toy starts with letter 'T'?",
      "ru": "Какая любимая игрушка начинается на букву 'T'?"
    },
    "instruction": {
      "az": "'T' hərfi ilə başlayan oyuncağı seç.",
      "en": "Select toy starting with 'T'.",
      "ru": "Выбери игрушку на букву 'T'."
    },
    "options": {
      "Top": {
        "en": "Ball (Top)",
        "ru": "Мяч (Top)"
      },
      "Kukla": {
        "en": "Doll",
        "ru": "Кукла"
      },
      "Ayı": {
        "en": "Bear",
        "ru": "Мишка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "snd-cat-meow-1": {
    "question": {
      "az": "Hansı sevimli heyvan \"Miyau-miyau\" deyir?",
      "en": "Which cute animal says \"Meow meow\"?",
      "ru": "Какое милое животное говорит «Мяу-мяу»?"
    },
    "instruction": {
      "az": "Miyau səsini çıxaran heyvanı tap.",
      "en": "Find animal making meow sound.",
      "ru": "Найди животное, издающее звук мяу."
    },
    "options": {
      "Pişik": {
        "en": "Cat",
        "ru": "Кошка"
      },
      "İnək": {
        "en": "Cow",
        "ru": "Корова"
      },
      "İt": {
        "en": "Dog",
        "ru": "Собака"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "snd-dog-bark-2": {
    "question": {
      "az": "Evi qoruyan və \"Hav-hav\" edən dostumuz kimdir?",
      "en": "Who guards the house and says \"Woof woof\"?",
      "ru": "Кто охраняет дом и говорит «Гав-гав»?"
    },
    "instruction": {
      "az": "Hürən heyvanı tap.",
      "en": "Find barking animal.",
      "ru": "Найди лающее животное."
    },
    "options": {
      "İt": {
        "en": "Dog",
        "ru": "Собака"
      },
      "Toyuq": {
        "en": "Hen",
        "ru": "Курица"
      },
      "Quzu": {
        "en": "Lamb",
        "ru": "Ягненок"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "snd-rooster-crow-3": {
    "question": {
      "az": "Səhər tezdən \"Qu-qulu-qu\" deyib bizi oyadan kimdir?",
      "en": "Who wakes us up in the morning saying \"Cock-a-doodle-doo\"?",
      "ru": "Кто будит нас рано утром, крича «Ку-ка-ре-ку»?"
    },
    "instruction": {
      "az": "Səhər banlayan quşu seç.",
      "en": "Select the morning crowing bird.",
      "ru": "Выбери утреннего петушка."
    },
    "options": {
      "Xoruz": {
        "en": "Rooster",
        "ru": "Петушок"
      },
      "Ördək": {
        "en": "Duck",
        "ru": "Утка"
      },
      "Qurbağa": {
        "en": "Frog",
        "ru": "Лягушка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "snd-cow-moo-4": {
    "question": {
      "az": "Bizə dadlı süd verən və \"Mooo\" deyən heyvan hansıdır?",
      "en": "Which animal gives us tasty milk and says \"Mooo\"?",
      "ru": "Какое животное дает вкусное молоко и мычит «Мууу»?"
    },
    "instruction": {
      "az": "Möhkəm moo deyən heyvanı tap.",
      "en": "Find the animal that moos.",
      "ru": "Найди животное, которое мычит."
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
      "Pişik": {
        "en": "Cat",
        "ru": "Кошка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "snd-frog-croak-5": {
    "question": {
      "az": "Göldə tullanan və \"Qur-qur\" edən canlı hansıdır?",
      "en": "Which creature jumps in the pond and croaks?",
      "ru": "Кто прыгает в пруду и квакает?"
    },
    "instruction": {
      "az": "Quruldama səsini çıxaran canlı tap.",
      "en": "Find croaking creature.",
      "ru": "Найди квакающее существо."
    },
    "options": {
      "Qurbağa": {
        "en": "Frog",
        "ru": "Лягушка"
      },
      "Balıq": {
        "en": "Fish",
        "ru": "Рыба"
      },
      "İlan": {
        "en": "Snake",
        "ru": "Змея"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "snd-sheep-baa-6": {
    "question": {
      "az": "Çəmənlikdə \"Məə-məə\" edən sevimli canlı hansıdır?",
      "en": "Which cute animal says \"Baa baa\" on the meadow?",
      "ru": "Какое милое животное блеет «Бее-бее» на лугу?"
    },
    "instruction": {
      "az": "Məə deyən quzunu tap.",
      "en": "Find the lamb saying baa.",
      "ru": "Найди овечку, которая блеет."
    },
    "options": {
      "Quzu və Qoyun": {
        "en": "Lamb & Sheep",
        "ru": "Овечка"
      },
      "Şir": {
        "en": "Lion",
        "ru": "Лев"
      },
      "Fil": {
        "en": "Elephant",
        "ru": "Слон"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "voc-sweet-candy-1": {
    "question": {
      "az": "Konfetin dadı necədir?",
      "en": "How does candy taste?",
      "ru": "Какой вкус у конфеты?"
    },
    "instruction": {
      "az": "Konfetin dadını bildirən sözü seç.",
      "en": "Select word describing candy taste.",
      "ru": "Выбери слово, описывающее вкус конфеты."
    },
    "options": {
      "Şirindir": {
        "en": "Sweet",
        "ru": "Сладкий"
      },
      "Acıdır": {
        "en": "Bitter",
        "ru": "Горький"
      },
      "Duzludur": {
        "en": "Salty",
        "ru": "Соленый"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "voc-soft-pillow-2": {
    "question": {
      "az": "Yastıq toxunanda necə hiss olunur?",
      "en": "How does a pillow feel when touched?",
      "ru": "Какая подушка на ощупь?"
    },
    "instruction": {
      "az": "Yastığın xüsusiyyətini tap.",
      "en": "Find pillow quality.",
      "ru": "Найди свойство подушки."
    },
    "options": {
      "Yumşaqdır": {
        "en": "Soft",
        "ru": "Мягкая"
      },
      "Daş kimidir": {
        "en": "Hard as stone",
        "ru": "Каменная"
      },
      "İtidir": {
        "en": "Sharp",
        "ru": "Острая"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "voc-fast-cheetah-3": {
    "question": {
      "az": "Çita meşədə necə qaçır?",
      "en": "How does a cheetah run?",
      "ru": "Как бегает гепард?"
    },
    "instruction": {
      "az": "Sürət sözünü tap.",
      "en": "Find speed word.",
      "ru": "Найди слово скорости."
    },
    "options": {
      "Çox sürətlidir": {
        "en": "Very fast",
        "ru": "Очень быстро"
      },
      "Yavaşdır": {
        "en": "Slow",
        "ru": "Медленно"
      },
      "Tərpənmir": {
        "en": "Still",
        "ru": "Неподвижно"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "voc-bright-star-4": {
    "question": {
      "az": "Gecə səmada ulduz necə görünür?",
      "en": "How does a star look in the night sky?",
      "ru": "Как выглядит звезда в ночном небе?"
    },
    "instruction": {
      "az": "Ulduzun əlamətini tap.",
      "en": "Find star quality.",
      "ru": "Найди свойство звезды."
    },
    "options": {
      "Parlaqdır": {
        "en": "Bright",
        "ru": "Яркая"
      },
      "Qaranlıqdır": {
        "en": "Dark",
        "ru": "Темная"
      },
      "Görünməzdir": {
        "en": "Invisible",
        "ru": "Невидимая"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "voc-fragrant-rose-5": {
    "question": {
      "az": "Bağdakı qızılgülün xüsusiyyəti nədir?",
      "en": "What is the quality of a garden rose?",
      "ru": "Какое свойство у садовой розы?"
    },
    "instruction": {
      "az": "Gülün xüsusiyyətini tap.",
      "en": "Find rose quality.",
      "ru": "Найди свойство розы."
    },
    "options": {
      "Gözəl ətirlidir": {
        "en": "Fragrant",
        "ru": "Ароматная"
      },
      "Turşdur": {
        "en": "Sour",
        "ru": "Кислая"
      },
      "Duzludur": {
        "en": "Salty",
        "ru": "Соленая"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "voc-cold-ice-6": {
    "question": {
      "az": "Buz və dondurma toxunanda necə hiss olunur?",
      "en": "How do ice and ice-cream feel when touched?",
      "ru": "Какой на ощупь лед и мороженое?"
    },
    "instruction": {
      "az": "Buzun temperaturunu seç.",
      "en": "Select ice temperature.",
      "ru": "Выбери температуру льда."
    },
    "options": {
      "Soyuqdur": {
        "en": "Cold",
        "ru": "Холодный"
      },
      "Qaynardır": {
        "en": "Boiling hot",
        "ru": "Горячий"
      },
      "İlıqdır": {
        "en": "Lukewarm",
        "ru": "Теплый"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "sent-dog-barks-1": {
    "question": {
      "az": "Cümləni düzəlt: İt həyətdə hürür",
      "en": "Build sentence: Dog barks in yard",
      "ru": "Составь предложение: Собака лает во дворе"
    },
    "instruction": {
      "az": "Sözləri ardıcıl düzərək cümlə qur.",
      "en": "Arrange words to build sentence.",
      "ru": "Сложи слова по порядку, чтобы составить предложение."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "sent-girl-paints-2": {
    "question": {
      "az": "Cümləni düzəlt: Qız şəkil çəkir",
      "en": "Build sentence: Girl draws picture",
      "ru": "Составь предложение: Девочка рисует картину"
    },
    "instruction": {
      "az": "Sözləri seçərək cümlə qur.",
      "en": "Select words to build sentence.",
      "ru": "Выбери слова и составь предложение."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "sent-birds-fly-3": {
    "question": {
      "az": "Cümləni düzəlt: Quşlar göydə uçur",
      "en": "Build sentence: Birds fly in the sky",
      "ru": "Составь предложение: Птицы летят в небе"
    },
    "instruction": {
      "az": "Cümləni tamamla.",
      "en": "Complete the sentence.",
      "ru": "Заверши предложение."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "sent-mom-cooks-4": {
    "question": {
      "az": "Cümləni düzəlt: Ana yemək bişirir",
      "en": "Build sentence: Mom cooks food",
      "ru": "Составь предложение: Мама готовит еду"
    },
    "instruction": {
      "az": "Sözləri ardıcıllıqla qoy.",
      "en": "Put words in sequence.",
      "ru": "Поставь слова по порядку."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "sent-boy-ball-5": {
    "question": {
      "az": "Cümləni düzəlt: Əli top oynayır",
      "en": "Build sentence: Ali plays with ball",
      "ru": "Составь предложение: Али играет в мяч"
    },
    "instruction": {
      "az": "Sözləri düz.",
      "en": "Arrange words.",
      "ru": "Расставь слова."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "sent-fish-swim-6": {
    "question": {
      "az": "Cümləni düzəlt: Balıq suda üzür",
      "en": "Build sentence: Fish swims in water",
      "ru": "Составь предложение: Рыба плавает в воде"
    },
    "instruction": {
      "az": "Cümləni qur.",
      "en": "Build sentence.",
      "ru": "Составь предложение."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "sent-sun-warm-7": {
    "question": {
      "az": "Cümləni düzəlt: Günəş yeri isidir",
      "en": "Build sentence: Sun warms the earth",
      "ru": "Составь предложение: Солнце греет землю"
    },
    "instruction": {
      "az": "Cümləni birləşdir.",
      "en": "Join the sentence.",
      "ru": "Соедини предложение."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "qa-who-treats-1": {
    "question": {
      "az": "Xəstələnəndə bizi kim müalicə edir?",
      "en": "Who treats us when we get sick?",
      "ru": "Кто лечит нас, когда мы болеем?"
    },
    "instruction": {
      "az": "Sualın cavabını tap.",
      "en": "Find answer to question.",
      "ru": "Найди ответ на вопрос."
    },
    "options": {
      "Həkim": {
        "en": "Doctor",
        "ru": "Врач"
      },
      "Sürücü": {
        "en": "Driver",
        "ru": "Водитель"
      },
      "Dülgər": {
        "en": "Carpenter",
        "ru": "Плотник"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "qa-what-spoon-2": {
    "question": {
      "az": "Dadlı şorbanı nə ilə içirik?",
      "en": "What do we eat delicious soup with?",
      "ru": "Чем мы едим вкусный суп?"
    },
    "instruction": {
      "az": "Aləti tap.",
      "en": "Find the tool.",
      "ru": "Найди прибор."
    },
    "options": {
      "Qaşıqla": {
        "en": "With spoon",
        "ru": "Ложкой"
      },
      "Çəngəllə": {
        "en": "With fork",
        "ru": "Вилкой"
      },
      "Qələmlə": {
        "en": "With pen",
        "ru": "Карандашом"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "qa-where-books-3": {
    "question": {
      "az": "Kitabları oxuduqdan sonra hara qoyuruq?",
      "en": "Where do we place books after reading?",
      "ru": "Куда мы кладем книги после чтения?"
    },
    "instruction": {
      "az": "Yeri seç.",
      "en": "Select place.",
      "ru": "Выбери место."
    },
    "options": {
      "Kitab rəfinə": {
        "en": "On bookshelf",
        "ru": "На книжную полку"
      },
      "Çarpayının altına": {
        "en": "Under bed",
        "ru": "Под кровать"
      },
      "Döşəməyə": {
        "en": "On the floor",
        "ru": "На пол"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "qa-why-wash-4": {
    "question": {
      "az": "Yeməkdən əvvəl əllərimizi niyə yuyuruq?",
      "en": "Why do we wash our hands before eating?",
      "ru": "Зачем мы моем руки перед едой?"
    },
    "instruction": {
      "az": "Səbəbi tap.",
      "en": "Find reason.",
      "ru": "Найди причину."
    },
    "options": {
      "Təmiz və sağlam olmaq üçün": {
        "en": "To be clean & healthy",
        "ru": "Чтобы быть чистыми и здоровыми"
      },
      "Su ilə oynamaq üçün": {
        "en": "To play with water",
        "ru": "Играть с водой"
      },
      "Vaxt keçirmək üçün": {
        "en": "To spend time",
        "ru": "Тратить время"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "qa-when-stars-5": {
    "question": {
      "az": "Ulduzları və ayı nə vaxt görürük?",
      "en": "When do we see stars and moon?",
      "ru": "Когда мы видим звезды и луну?"
    },
    "instruction": {
      "az": "Zamanı tap.",
      "en": "Find time.",
      "ru": "Найди время."
    },
    "options": {
      "Gecə vaxtı": {
        "en": "At night",
        "ru": "Ночью"
      },
      "Günorta": {
        "en": "At noon",
        "ru": "В полдень"
      },
      "Səhər tezdən": {
        "en": "Early morning",
        "ru": "Ранним утром"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "qa-who-teaches-6": {
    "question": {
      "az": "Məktəbdə bizə bilik verən və öyrədən kimdir?",
      "en": "Who gives us knowledge and teaches in school?",
      "ru": "Кто дает нам знания и учит в школе?"
    },
    "instruction": {
      "az": "Müəllimi tap.",
      "en": "Find teacher.",
      "ru": "Найди учителя."
    },
    "options": {
      "Müəllim": {
        "en": "Teacher",
        "ru": "Учитель"
      },
      "İnşaatçı": {
        "en": "Builder",
        "ru": "Строитель"
      },
      "Polis": {
        "en": "Police",
        "ru": "Полицейский"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "qa-what-umbrella-7": {
    "question": {
      "az": "Yağış yağanda islanmamaq üçün nə açırıq?",
      "en": "What do we open to stay dry in rain?",
      "ru": "Что мы открываем в дождь, чтобы не промокнуть?"
    },
    "instruction": {
      "az": "Çətiri tap.",
      "en": "Find umbrella.",
      "ru": "Найди зонт."
    },
    "options": {
      "Çətir": {
        "en": "Umbrella",
        "ru": "Зонт"
      },
      "Kitab": {
        "en": "Book",
        "ru": "Книгу"
      },
      "Çanta": {
        "en": "Bag",
        "ru": "Сумку"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "seq-brush-teeth-1": {
    "question": {
      "az": "Diş fırçalamaq addımlarını düzgün sıraya qoy:",
      "en": "Put the teeth brushing steps in order:",
      "ru": "Расставь этапы чистки зубов по порядку:"
    },
    "instruction": {
      "az": "Diş təmizliyi addımlarını ardıcıl düz.",
      "en": "Order teeth brushing steps.",
      "ru": "Расставь шаги чистки зубов по порядку."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "seq-eat-banana-2": {
    "question": {
      "az": "Banan yemək addımlarını ardıcıllıqla qoy:",
      "en": "Put banana eating steps in order:",
      "ru": "Поставь шаги поедания банана по порядку:"
    },
    "instruction": {
      "az": "Addımları ardıcıl düz.",
      "en": "Order steps.",
      "ru": "Упорядочи шаги."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "seq-paint-pic-3": {
    "question": {
      "az": "Rəsm çəkmək addımlarını düzgün sıraya qoy:",
      "en": "Order painting steps:",
      "ru": "Поставь шаги рисования по порядку:"
    },
    "instruction": {
      "az": "Rəsm çəkmək ardıcıllığını qur.",
      "en": "Order painting steps.",
      "ru": "Упорядочи шаги рисования."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "seq-make-bed-4": {
    "question": {
      "az": "Səhər oyanmaq addımlarını düz:",
      "en": "Order morning wake-up steps:",
      "ru": "Упорядочи шаги утреннего подъема:"
    },
    "instruction": {
      "az": "Addımları ardıcıl düz.",
      "en": "Order steps.",
      "ru": "Упорядочи шаги."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "seq-wear-shoes-5": {
    "question": {
      "az": "Ayaqqabı geyinmək ardıcıllığı:",
      "en": "Shoes wearing order:",
      "ru": "Порядок обувания:"
    },
    "instruction": {
      "az": "Sıranı qur.",
      "en": "Order steps.",
      "ru": "Построй порядок."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "seq-build-tower-6": {
    "question": {
      "az": "Kubiklərlə qala qurmaq sırası:",
      "en": "Order for building a tower:",
      "ru": "Порядок постройки башни:"
    },
    "instruction": {
      "az": "Kubikləri ardıcıl düz.",
      "en": "Order blocks.",
      "ru": "Расставь кубики."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "seq-wash-hands-full-7": {
    "question": {
      "az": "Əlləri yumaq addımlarını düzgün sıraya qoy:",
      "en": "Order handwashing steps:",
      "ru": "Поставь шаги мытья рук по порядку:"
    },
    "instruction": {
      "az": "Təmizlik addımlarını sırala.",
      "en": "Sequence hygiene steps.",
      "ru": "Расставь шаги гигиены."
    },
    "options": {},
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "st-cat-fish-1": {
    "question": {
      "az": "Pişik akvariuma maraqla baxır. O nə etmək istəyir?",
      "en": "The cat watches aquarium with interest. What does it want?",
      "ru": "Кошка с интересом смотрит в аквариум. Что она хочет?"
    },
    "instruction": {
      "az": "Hekayənin davamını tap.",
      "en": "Find story continuation.",
      "ru": "Найди продолжение истории."
    },
    "options": {
      "Rəngli balığı seyr etmək": {
        "en": "Watch colorful fish",
        "ru": "Наблюдать за рыбкой"
      },
      "Çölə qaçmaq": {
        "en": "Run outside",
        "ru": "Убежать на улицу"
      },
      "Yuxuya getmək": {
        "en": "Go to sleep",
        "ru": "Уснуть"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "st-puppy-joy-2": {
    "question": {
      "az": "Küçüyün anası gələndə küçük nə etdi?",
      "en": "What did the puppy do when mother arrived?",
      "ru": "Что сделал щенок, когда пришла мама?"
    },
    "instruction": {
      "az": "Hekayənin sonunu seç.",
      "en": "Select story ending.",
      "ru": "Выбери конец рассказа."
    },
    "options": {
      "Sevindi və quyruğunu buladı": {
        "en": "Wagged tail with joy",
        "ru": "Обрадовался и завилял хвостом"
      },
      "Ağladı və qaçdı": {
        "en": "Cried and ran",
        "ru": "Заплакал и убежал"
      },
      "Hirsli baxdı": {
        "en": "Looked angry",
        "ru": "Разозлился"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "st-bird-nest-3": {
    "question": {
      "az": "Quş ağacın budağında balaları üçün nə qurdu?",
      "en": "What did the bird build on tree for its chicks?",
      "ru": "Что птица построила на ветке для птенцов?"
    },
    "instruction": {
      "az": "Quşun nə qurduğunu tap.",
      "en": "Find what bird built.",
      "ru": "Найди, что построила птица."
    },
    "options": {
      "İsti və rahat yuva": {
        "en": "Warm cozy nest",
        "ru": "Теплое уютное гнездо"
      },
      "Maşın": {
        "en": "Car",
        "ru": "Машину"
      },
      "Çadır": {
        "en": "Tent",
        "ru": "Палатку"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "st-boy-kite-4": {
    "question": {
      "az": "Külək əsəndə Əli göyə nə uçurdu?",
      "en": "What did Ali fly in the sky when wind blew?",
      "ru": "Что запустил Али в небо, когда подул ветер?"
    },
    "instruction": {
      "az": "Küləkdə uçan əşyanı tap.",
      "en": "Find object flying in wind.",
      "ru": "Найди предмет в ветре."
    },
    "options": {
      "Rəngarəng çərpələng": {
        "en": "Colorful kite",
        "ru": "Разноцветного змея"
      },
      "Ağır daş": {
        "en": "Heavy stone",
        "ru": "Тяжелый камень"
      },
      "Dəftər": {
        "en": "Notebook",
        "ru": "Тетрадь"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "st-ant-leaf-5": {
    "question": {
      "az": "Yağış yağanda balaca qarışqa harada gizləndi?",
      "en": "Where did the little ant hide when it rained?",
      "ru": "Где спрятался муравей, когда пошел дождь?"
    },
    "instruction": {
      "az": "Qarışqanın sığınacağını seç.",
      "en": "Select ant shelter.",
      "ru": "Выбери укрытие муравья."
    },
    "options": {
      "Geniş yaşıl yarpağın altında": {
        "en": "Under a big green leaf",
        "ru": "Под большим зеленым листом"
      },
      "Dərin gölün içində": {
        "en": "Inside deep pond",
        "ru": "В глубоком пруду"
      },
      "Buludun üstündə": {
        "en": "On the cloud",
        "ru": "На облаке"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "st-frog-pond-6": {
    "question": {
      "az": "Qurbağa yarpağın üstündən hara tullandı?",
      "en": "Where did the frog jump from the leaf?",
      "ru": "Куда прыгнула лягушка с кувшинки?"
    },
    "instruction": {
      "az": "Qurbağanın hərəkətini tap.",
      "en": "Find frog action.",
      "ru": "Найди действие лягушки."
    },
    "options": {
      "Suya şappıltı ilə tullandı": {
        "en": "Splashed into water",
        "ru": "Плюхнулась в воду"
      },
      "Aya doğru uçdu": {
        "en": "Flew to moon",
        "ru": "Полетела на луну"
      },
      "Ağacın zirvəsinə çıxdı": {
        "en": "Climbed tree",
        "ru": "Залезла на дерево"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "st-friends-picnic-7": {
    "question": {
      "az": "Uşaqlar meşə kənarında nə təşkil etdilər?",
      "en": "What did the children organize by the forest?",
      "ru": "Что устроили дети на опушке леса?"
    },
    "instruction": {
      "az": "Hekayənin sonunu tap.",
      "en": "Find story ending.",
      "ru": "Найди финал рассказа."
    },
    "options": {
      "Şən piknik və çay süfrəsi": {
        "en": "Fun picnic & tea party",
        "ru": "Веселый пикник и чаепитие"
      },
      "Qış yuxusu": {
        "en": "Winter sleep",
        "ru": "Зимнюю спячку"
      },
      "Mübahisə": {
        "en": "Argument",
        "ru": "Ссору"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "emo-gift-happy-1": {
    "question": {
      "az": "Sənə gözəl hədiyyə verəndə hansı hissi keçirirsən?",
      "en": "What feeling do you have when receiving a nice gift?",
      "ru": "Что ты чувствуешь, когда тебе дарят подарок?"
    },
    "instruction": {
      "az": "Emosiyanı seç.",
      "en": "Select emotion.",
      "ru": "Выбери эмоцию."
    },
    "options": {
      "Sevinc və xoşbəxtlik": {
        "en": "Joy and happiness",
        "ru": "Радость и счастье"
      },
      "Qorxu": {
        "en": "Fear",
        "ru": "Страх"
      },
      "Qəzəb": {
        "en": "Anger",
        "ru": "Злость"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "emo-broken-toy-2": {
    "question": {
      "az": "Sevimli oyuncaq qırılanda uşaq necə hiss edir?",
      "en": "How does a child feel when a favorite toy breaks?",
      "ru": "Что чувствует ребенок, когда ломается любимая игрушка?"
    },
    "instruction": {
      "az": "Hissi tap.",
      "en": "Find feeling.",
      "ru": "Найди чувство."
    },
    "options": {
      "Kədərli və məyus": {
        "en": "Sad and upset",
        "ru": "Грустно и печально"
      },
      "Çox şad": {
        "en": "Very happy",
        "ru": "Очень весело"
      },
      "Qürurlu": {
        "en": "Proud",
        "ru": "Гордо"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "emo-firework-surprise-3": {
    "question": {
      "az": "Gözlənilmədən atəşfəşanlıq görəndə hansı sima yaranır?",
      "en": "What expression appears when seeing unexpected fireworks?",
      "ru": "Какое лицо бывает при неожиданном салюте?"
    },
    "instruction": {
      "az": "Simanı seç.",
      "en": "Select facial expression.",
      "ru": "Выбери выражение лица."
    },
    "options": {
      "Təəccüb və heyranlıq": {
        "en": "Surprise & wonder",
        "ru": "Удивление и восторг"
      },
      "Yuxulu": {
        "en": "Sleepy",
        "ru": "Сонное"
      },
      "Qəzəbli": {
        "en": "Angry",
        "ru": "Сердитое"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "emo-calm-sleep-4": {
    "question": {
      "az": "Ananın laylasını dinləyərkən uşaq necə hiss edir?",
      "en": "How does a child feel listening to mothers lullaby?",
      "ru": "Что чувствует ребенок под мамину колыбельную?"
    },
    "instruction": {
      "az": "Hissi tap.",
      "en": "Find feeling.",
      "ru": "Найди чувство."
    },
    "options": {
      "Sakit və dinc": {
        "en": "Calm and peaceful",
        "ru": "Спокойно и мирно"
      },
      "Qorxmuş": {
        "en": "Scared",
        "ru": "Испуганно"
      },
      "Hirsli": {
        "en": "Angry",
        "ru": "Сердито"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "emo-fear-dark-5": {
    "question": {
      "az": "Qaranlıq otaqda tək qalanda bəzən nə hiss edə bilərik?",
      "en": "What can we sometimes feel alone in the dark?",
      "ru": "Что мы иногда чувствуем в темноте?"
    },
    "instruction": {
      "az": "Emosiyanı müəyyən et.",
      "en": "Identify emotion.",
      "ru": "Определи эмоцию."
    },
    "options": {
      "Qorxu": {
        "en": "Fear",
        "ru": "Страх"
      },
      "Sevinc": {
        "en": "Joy",
        "ru": "Радость"
      },
      "Qürur": {
        "en": "Pride",
        "ru": "Гордость"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "emo-brave-help-6": {
    "question": {
      "az": "Dostumuza kömək edəndə və çətinliyi keçəndə necə hiss edirik?",
      "en": "How do we feel when helping a friend and overcoming challenge?",
      "ru": "Что мы чувствуем, помогая другу и преодолевая трудности?"
    },
    "instruction": {
      "az": "Müsbət hissi tap.",
      "en": "Find positive feeling.",
      "ru": "Найди положительное чувство."
    },
    "options": {
      "Cəsur və qürurlu": {
        "en": "Brave and proud",
        "ru": "Смело и гордо"
      },
      "Qorxaq": {
        "en": "Cowardly",
        "ru": "Трусливо"
      },
      "Tənbəl": {
        "en": "Lazy",
        "ru": "Лениво"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "soc-sorry-1": {
    "question": {
      "az": "Səhvən dostumuza toxunanda nə deməliyik?",
      "en": "What should we say if we accidentally bump into a friend?",
      "ru": "Что сказать, если случайно задели друга?"
    },
    "instruction": {
      "az": "Düzgün nəzakətli sözü seç.",
      "en": "Select polite word.",
      "ru": "Выбери вежливое слово."
    },
    "options": {
      "Bağışlayın, üzr istəyirəm": {
        "en": "Sorry, excuse me",
        "ru": "Извините, простите"
      },
      "Qışqırmaq": {
        "en": "Shout",
        "ru": "Кричать"
      },
      "Qaçıb getmək": {
        "en": "Run away",
        "ru": "Убежать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "soc-goodbye-2": {
    "question": {
      "az": "Dostumuzla görüşüb ayrılanda nə deyirik?",
      "en": "What do we say when parting with a friend?",
      "ru": "Что мы говорим при расставании с другом?"
    },
    "instruction": {
      "az": "Ayrılanda deyilən sözü tap.",
      "en": "Find parting word.",
      "ru": "Найди слово прощания."
    },
    "options": {
      "Sağ ol, hələlik!": {
        "en": "Goodbye, see you!",
        "ru": "До свидания, пока!"
      },
      "Gəl bura!": {
        "en": "Come here!",
        "ru": "Иди сюда!"
      },
      "Otur!": {
        "en": "Sit!",
        "ru": "Сиди!"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "soc-listen-3": {
    "question": {
      "az": "Başqası danışanda biz nə etməliyik?",
      "en": "What should we do when someone else is talking?",
      "ru": "Что нужно делать, когда говорит другой?"
    },
    "instruction": {
      "az": "Düzgün davranışı seç.",
      "en": "Select right behavior.",
      "ru": "Выбери правильное поведение."
    },
    "options": {
      "Səbirlə qulaq asmalıyıq": {
        "en": "Listen patiently",
        "ru": "Терпеливо слушать"
      },
      "Sözünü kəsməliyik": {
        "en": "Interrupt",
        "ru": "Перебивать"
      },
      "Qışqırmalıyıq": {
        "en": "Shout",
        "ru": "Кричать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "soc-help-elder-4": {
    "question": {
      "az": "Nənəyə ağır çantanı daşımaqda necə davranmalıyıq?",
      "en": "How should we act when grandma carries a heavy bag?",
      "ru": "Как поступить, когда бабушка несет тяжелую сумку?"
    },
    "instruction": {
      "az": "Xeyirxah hərəkəti seç.",
      "en": "Select kind action.",
      "ru": "Выбери доброе действие."
    },
    "options": {
      "Kömək təklif etməliyik": {
        "en": "Offer help",
        "ru": "Предложить помощь"
      },
      "Baxıb keçməliyik": {
        "en": "Pass by",
        "ru": "Пройти мимо"
      },
      "Gülməliyik": {
        "en": "Laugh",
        "ru": "Смеяться"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "soc-share-snack-5": {
    "question": {
      "az": "Yoldaşımızın peçenyesi olmayanda nə edirik?",
      "en": "What do we do when our friend has no cookie?",
      "ru": "Что сделать, если у друга нет печенья?"
    },
    "instruction": {
      "az": "Bölüşməyi seç.",
      "en": "Select sharing.",
      "ru": "Выбери делиться."
    },
    "options": {
      "Paylaşırıq və təklif edirik": {
        "en": "Share and offer",
        "ru": "Поделиться и предложить"
      },
      "Tək yeyirik": {
        "en": "Eat alone",
        "ru": "Съесть в одиночку"
      },
      "Gizlədirik": {
        "en": "Hide it",
        "ru": "Спрятать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "soc-congratulate-6": {
    "question": {
      "az": "Dostumuz oyunda qalib gələndə nə edirik?",
      "en": "What do we do when a friend wins the game?",
      "ru": "Что сделать, когда друг победил в игре?"
    },
    "instruction": {
      "az": "Dostcasına reaksiyanı tap.",
      "en": "Find friendly reaction.",
      "ru": "Найди дружелюбную реакцию."
    },
    "options": {
      "\"Təbrik edirəm!\" deyib əl çalırıq": {
        "en": "Say congrats and clap",
        "ru": "Поздравить и похлопать"
      },
      "Küsürük": {
        "en": "Pout",
        "ru": "Обидеться"
      },
      "Ağlayırıq": {
        "en": "Cry",
        "ru": "Заплакать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "soc-ask-politely-7": {
    "question": {
      "az": "Qələmi götürmək üçün necə icazə alırıq?",
      "en": "How do we ask for permission to take a pencil?",
      "ru": "Как вежливо попросить карандаш?"
    },
    "instruction": {
      "az": "Nəzakətli müraciəti seç.",
      "en": "Select polite request.",
      "ru": "Выбери вежливую просьбу."
    },
    "options": {
      "\"Zəhmət olmasa, qələmi verə bilərsən?\"": {
        "en": "\"Please, may I have pencil?\"",
        "ru": "«Пожалуйста, можно взять?»"
      },
      "Əlindən dartıb alırıq": {
        "en": "Snatch from hand",
        "ru": "Вырвать из рук"
      },
      "Qışqırırıq": {
        "en": "Shout",
        "ru": "Кричать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "trn-swing-1": {
    "question": {
      "az": "Yelləncəkdə başqa uşaq yellənir. Sən nə etməlisən?",
      "en": "Another child is on the swing. What should you do?",
      "ru": "На качелях качается другой ребенок. Что ты сделаешь?"
    },
    "instruction": {
      "az": "Düzgün davranışı seç.",
      "en": "Select right action.",
      "ru": "Выбери правильное действие."
    },
    "options": {
      "Növbəni səbirlə gözləməlisən": {
        "en": "Wait patiently",
        "ru": "Терпеливо ждать очереди"
      },
      "Onu itələməlisən": {
        "en": "Push them",
        "ru": "Толкнуть его"
      },
      "Ağlamalısan": {
        "en": "Cry",
        "ru": "Плакать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "trn-water-cooler-2": {
    "question": {
      "az": "Su içmək üçün növbəyə duranda necə davranırıq?",
      "en": "How do we behave in line for water?",
      "ru": "Как вести себя в очереди за водой?"
    },
    "instruction": {
      "az": "Növbə qaydasını tap.",
      "en": "Find queue rule.",
      "ru": "Найди правило очереди."
    },
    "options": {
      "Növbədə arxada sakit dururuq": {
        "en": "Stand quietly in line",
        "ru": "Спокойно стоять в очереди"
      },
      "Hamını itələyirik": {
        "en": "Push everyone",
        "ru": "Всех толкать"
      },
      "Qabağa qaçırıq": {
        "en": "Cut the line",
        "ru": "Лезть вперед"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "trn-hand-class-3": {
    "question": {
      "az": "Dərsdə cavab vermək istəyəndə nə edirik?",
      "en": "What do we do to answer in class?",
      "ru": "Что сделать, чтобы ответить на уроке?"
    },
    "instruction": {
      "az": "Dərsdə qaydanı seç.",
      "en": "Select classroom rule.",
      "ru": "Выбери правило на уроке."
    },
    "options": {
      "Əlimizi qaldırıb gözləyirik": {
        "en": "Raise hand & wait",
        "ru": "Поднять руку и ждать"
      },
      "Yerdən qışqırırıq": {
        "en": "Shout from seat",
        "ru": "Выкрикивать с места"
      },
      "Ayağa tullanırıq": {
        "en": "Jump up",
        "ru": "Вскакивать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "trn-dice-turn-4": {
    "question": {
      "az": "Masaüstü oyunda zəri kim atmalıdır?",
      "en": "Who rolls the dice in a board game?",
      "ru": "Кто бросает кубик в настольной игре?"
    },
    "instruction": {
      "az": "Oyun qaydasını tap.",
      "en": "Find game rule.",
      "ru": "Найди правило игры."
    },
    "options": {
      "Növbəsi çatan oyunçu": {
        "en": "Whose turn it is",
        "ru": "Игрок, чья очередь"
      },
      "Hamı eyni anda": {
        "en": "Everyone at once",
        "ru": "Все одновременно"
      },
      "Yalnız bir nəfər": {
        "en": "Only one person",
        "ru": "Только один человек"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "trn-bus-enter-5": {
    "question": {
      "az": "Avtobusa minərkən necə hərəkət edirik?",
      "en": "How do we enter the bus?",
      "ru": "Как заходить в автобус?"
    },
    "instruction": {
      "az": "Nəqliyyata minmə qaydası.",
      "en": "Bus boarding rule.",
      "ru": "Правило посадки в автобус."
    },
    "options": {
      "Bir-bir, növbə ilə minirik": {
        "en": "One by one in turn",
        "ru": "По одному, по очереди"
      },
      "İtələşirik": {
        "en": "Pushing",
        "ru": "Толкаясь"
      },
      "Qapıda sıxışırıq": {
        "en": "Crowding door",
        "ru": "Сбиваясь в дверях"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "trn-toy-pass-6": {
    "question": {
      "az": "Oyuncaqla oynayıb qurtardıqdan sonra nə edirik?",
      "en": "What to do after playing with a toy?",
      "ru": "Что делать, закончив играть с игрушкой?"
    },
    "instruction": {
      "az": "Oyun bitəndə nə edirik.",
      "en": "What to do when done playing.",
      "ru": "Что делать, когда поиграл."
    },
    "options": {
      "Növbəti dostumuza veririk": {
        "en": "Pass to next friend",
        "ru": "Передать следующему другу"
      },
      "Evə aparırıq": {
        "en": "Take home",
        "ru": "Унести домой"
      },
      "Qırırıq": {
        "en": "Break it",
        "ru": "Сломать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "trn-fair-play-7": {
    "question": {
      "az": "Növbə gözləmək nəyə kömək edir?",
      "en": "What does waiting for turns help with?",
      "ru": "Чему помогает соблюдение очереди?"
    },
    "instruction": {
      "az": "Növbənin faydasını tap.",
      "en": "Benefit of turn-taking.",
      "ru": "Польза соблюдения очереди."
    },
    "options": {
      "Oyunun ədalətli və dostcasına olmasına": {
        "en": "Fair and friendly game",
        "ru": "Честной и дружной игре"
      },
      "Vaxtın itməsinə": {
        "en": "Wasting time",
        "ru": "Потере времени"
      },
      "Hamının küsməsinə": {
        "en": "Everyone being upset",
        "ru": "Всеобщей обиде"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "rt-exercise-1": {
    "question": {
      "az": "Səhər yuxudan durduqdan sonra bədənimizi oyatmaq üçün nə edirik?",
      "en": "What do we do in the morning to wake up our body?",
      "ru": "Что мы делаем утром, чтобы взбодриться?"
    },
    "instruction": {
      "az": "Səhər hərəkətini seç.",
      "en": "Select morning action.",
      "ru": "Выбери утреннее действие."
    },
    "options": {
      "Şən səhər gimnastikası": {
        "en": "Morning exercise",
        "ru": "Утреннюю зарядку"
      },
      "Yenidən yatırıq": {
        "en": "Sleep again",
        "ru": "Спим дальше"
      },
      "Televizora baxırıq": {
        "en": "Watch TV",
        "ru": "Смотрим телевизор"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "rt-breakfast-2": {
    "question": {
      "az": "Günə enerjili başlamaq üçün səhər nə etməliyik?",
      "en": "What should we do to start the day with energy?",
      "ru": "Что нужно сделать, чтобы начать день с энергией?"
    },
    "instruction": {
      "az": "Səhər enerjisini seç.",
      "en": "Select morning energy.",
      "ru": "Выбери утреннюю энергию."
    },
    "options": {
      "Dadlı və faydalı səhər yeməyi": {
        "en": "Healthy breakfast",
        "ru": "Вкусный полезный завтрак"
      },
      "Heç nə yeməmək": {
        "en": "Skip food",
        "ru": "Ничего не есть"
      },
      "Yalnız şirniyyat yemək": {
        "en": "Only sweets",
        "ru": "Есть только сладости"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "rt-school-prep-3": {
    "question": {
      "az": "Məktəbə və ya bağçaya getməzdən əvvəl nəyi yoxlayırıq?",
      "en": "What do we check before going to school or kindergarten?",
      "ru": "Что мы проверяем перед уходом в школу или садик?"
    },
    "instruction": {
      "az": "Dərsə hazırlığı tap.",
      "en": "Find school prep.",
      "ru": "Найди сборы на учебу."
    },
    "options": {
      "Çantamızı və dəftərlərimizi": {
        "en": "Backpack and notebooks",
        "ru": "Рюкзак и тетради"
      },
      "Oyuncaq qutusunu": {
        "en": "Toy box",
        "ru": "Коробку с игрушками"
      },
      "Yastığımızı": {
        "en": "Pillow",
        "ru": "Подушку"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "rt-lunch-time-4": {
    "question": {
      "az": "Günorta dərsdən qayıdanda nə edirik?",
      "en": "What do we do returning from school at noon?",
      "ru": "Что мы делаем, возвращаясь со школы днем?"
    },
    "instruction": {
      "az": "Nahar qaydasını seç.",
      "en": "Select lunch rule.",
      "ru": "Выбери правило обеда."
    },
    "options": {
      "Əlləri yuyub dadlı nahar edirik": {
        "en": "Wash hands and eat lunch",
        "ru": "Моем руки и обедаем"
      },
      "Çirkli əllərlə gəzirik": {
        "en": "Walk with dirty hands",
        "ru": "Ходим с грязными руками"
      },
      "Dərhal küçəyə qaçırıq": {
        "en": "Run outside immediately",
        "ru": "Сразу бежим на улицу"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "rt-homework-5": {
    "question": {
      "az": "Dərslərimizi necə hazırlayırıq?",
      "en": "How do we do our homework?",
      "ru": "Как мы делаем уроки?"
    },
    "instruction": {
      "az": "Dərs oxumağı tap.",
      "en": "Find studying.",
      "ru": "Найди выполнение уроков."
    },
    "options": {
      "Səliqəli və diqqətlə": {
        "en": "Neatly and carefully",
        "ru": "Аккуратно и внимательно"
      },
      "Tələsik və yarımçıq": {
        "en": "Hastily and half-done",
        "ru": "В спешке и кое-как"
      },
      "Heç etmirik": {
        "en": "Do not do it",
        "ru": "Вообще не делаем"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "rt-evening-bath-6": {
    "question": {
      "az": "Yatmazdan əvvəl təmizlənmək üçün nə edirik?",
      "en": "What do we do to freshen up before bedtime?",
      "ru": "Что мы делаем перед сном для чистоты?"
    },
    "instruction": {
      "az": "Təmizlik vaxtını tap.",
      "en": "Find bath time.",
      "ru": "Найди время купания."
    },
    "options": {
      "İlıq duş qəbul edirik": {
        "en": "Take warm shower",
        "ru": "Принимаем теплый душ"
      },
      "Qumda oynayırıq": {
        "en": "Play in sand",
        "ru": "Играем в песке"
      },
      "Çarpayıda tullanırıq": {
        "en": "Jump on bed",
        "ru": "Прыгаем на кровати"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "rt-bedtime-story-7": {
    "question": {
      "az": "Yatağa uzananda ana bizə nə oxuyur?",
      "en": "What does mother read when we go to bed?",
      "ru": "Что мама читает нам в кровати перед сном?"
    },
    "instruction": {
      "az": "Yuxudan əvvəlki vaxtı tap.",
      "en": "Find bedtime activity.",
      "ru": "Найди занятие перед сном."
    },
    "options": {
      "Sehrli və dinc nağıl": {
        "en": "Magical bedtime story",
        "ru": "Волшебную сказку на ночь"
      },
      "Yüksək səsli mahnı": {
        "en": "Loud music",
        "ru": "Громкую музыку"
      },
      "Qorxulu hekayə": {
        "en": "Scary story",
        "ru": "Страшилку"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "slf-buttons-1": {
    "question": {
      "az": "Səhər geyinərkən köynəyin düymələrini necə edirik?",
      "en": "How do we handle shirt buttons in the morning?",
      "ru": "Что мы делаем с пуговицами на рубашке утром?"
    },
    "instruction": {
      "az": "Geyinmə vərdişini tap.",
      "en": "Find dressing habit.",
      "ru": "Найди навык одевания."
    },
    "options": {
      "Özümüz səliqə ilə bağlayırıq": {
        "en": "Button up neatly ourselves",
        "ru": "Аккуратно застегиваем сами"
      },
      "Qoparıb atırıq": {
        "en": "Tear off",
        "ru": "Отрываем"
      },
      "Həmişə açıq qoyuruq": {
        "en": "Leave open",
        "ru": "Оставляем расстегнутыми"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "slf-wash-face-2": {
    "question": {
      "az": "Səhər yuxudan oyananda üzümüzü nə ilə yuyuruq?",
      "en": "What do we wash our face with in the morning?",
      "ru": "Чем мы умываем лицо утром?"
    },
    "instruction": {
      "az": "Təmizlik vasitəsini seç.",
      "en": "Select hygiene item.",
      "ru": "Выбери предмет гигиены."
    },
    "options": {
      "Təmiz su və sabunla": {
        "en": "Clean water & soap",
        "ru": "Чистой водой и мылом"
      },
      "Çirkli bezlə": {
        "en": "Dirty cloth",
        "ru": "Грязной тряпкой"
      },
      "Meyvə şirəsi ilə": {
        "en": "Fruit juice",
        "ru": "Соком"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "slf-hanky-3": {
    "question": {
      "az": "Asqıranda və ya burnumuz axanda nə işlədirik?",
      "en": "What do we use when sneezing or blowing nose?",
      "ru": "Что использовать при чихании или насморке?"
    },
    "instruction": {
      "az": "Dəsmalı seç.",
      "en": "Select handkerchief.",
      "ru": "Выбери платок."
    },
    "options": {
      "Təmiz cib dəsmalı": {
        "en": "Clean handkerchief",
        "ru": "Чистый платок / салфетку"
      },
      "Köynəyin qolu": {
        "en": "Shirt sleeve",
        "ru": "Рукав рубашки"
      },
      "Əlin arxası": {
        "en": "Back of hand",
        "ru": "Ладонь"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "slf-clean-shoes-4": {
    "question": {
      "az": "Küçədən evə gələndə ayaqqabılarımızı nə edirik?",
      "en": "What do we do with shoes coming home from street?",
      "ru": "Что делать с обувью, придя с улицы домой?"
    },
    "instruction": {
      "az": "Ayaqqabıya qulluğu seç.",
      "en": "Select shoe care.",
      "ru": "Выбери уход за обувью."
    },
    "options": {
      "Silirik və yerinə qoyuruq": {
        "en": "Wipe and place in spot",
        "ru": "Протираем и ставим на место"
      },
      "Çarpayıya atırıq": {
        "en": "Throw on bed",
        "ru": "Бросаем на кровать"
      },
      "Xalçanın ortasına qoyuruq": {
        "en": "Leave on carpet",
        "ru": "Оставляем посреди ковра"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "slf-cut-nails-5": {
    "question": {
      "az": "Dırnaqların təmiz qalması üçün nə edilməlidir?",
      "en": "What should be done to keep nails clean?",
      "ru": "Что делать, чтобы ногти оставались чистыми?"
    },
    "instruction": {
      "az": "Dırnaq qaydasını tap.",
      "en": "Find nail rule.",
      "ru": "Найди правило для ногтей."
    },
    "options": {
      "Dırnaqlar vaxtında kəsilməlidir": {
        "en": "Cut nails on time",
        "ru": "Вовремя стричь ногти"
      },
      "Dırnaqlar çeynənməlidir": {
        "en": "Bite nails",
        "ru": "Грызть ногти"
      },
      "Çirkli saxlanmalıdır": {
        "en": "Keep dirty",
        "ru": "Оставлять грязными"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "slf-drink-water-6": {
    "question": {
      "az": "Sağlam və gümrah olmaq üçün gün ərzində nə içirik?",
      "en": "What do we drink during the day to stay healthy?",
      "ru": "Что нужно пить в течение дня для здоровья?"
    },
    "instruction": {
      "az": "Sağlam içkini seç.",
      "en": "Select healthy drink.",
      "ru": "Выбери полезный напиток."
    },
    "options": {
      "Bol təmiz su": {
        "en": "Plenty of clean water",
        "ru": "Много чистой воды"
      },
      "Yalnız qazlı şirin sular": {
        "en": "Only sweet soda",
        "ru": "Только сладкую газировку"
      },
      "Buz parçaları": {
        "en": "Ice chunks",
        "ru": "Кусочки льда"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "slf-tidy-room-7": {
    "question": {
      "az": "Oyun bitdikdən sonra otağımızı necə qoyuruq?",
      "en": "How do we leave our room after playing?",
      "ru": "Как оставить комнату после игры?"
    },
    "instruction": {
      "az": "Səliqəli vərdişi tap.",
      "en": "Find neat habit.",
      "ru": "Найди аккуратную привычку."
    },
    "options": {
      "Oyuncaqları səliqə ilə yığırıq": {
        "en": "Tidy toys neatly",
        "ru": "Аккуратно убираем игрушки"
      },
      "Yerdə dağınıq qoyuruq": {
        "en": "Leave mess on floor",
        "ru": "Оставляем разбросанными"
      },
      "Çarpayının altına atırıq": {
        "en": "Shove under bed",
        "ru": "Запихиваем под кровать"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "saf-traffic-yellow-1": {
    "question": {
      "az": "Şəklə bax: İşıqforun sarı işığı yananda nə etməliyik?",
      "en": "Look at scene: What must we do when yellow traffic light turns on?",
      "ru": "Посмотри на картинку: Что делать при желтом сигнале светофора?"
    },
    "instruction": {
      "az": "İşıqforun sarı işığının qaydasını tap.",
      "en": "Find yellow light rule.",
      "ru": "Найди правило желтого сигнала светофора."
    },
    "options": {
      "Hazırlaşmalıyıq (⚠️)": {
        "en": "Get ready (⚠️)",
        "ru": "Приготовиться (⚠️)"
      },
      "Qaçmalıyıq": {
        "en": "Run fast",
        "ru": "Бежать"
      },
      "Gözümüzü yummalıyıq": {
        "en": "Close eyes",
        "ru": "Закрыть глаза"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "saf-crosswalk-zebra-2": {
    "question": {
      "az": "Küçədə yolu hansı xətlərin üstü ilə təhlükəsiz keçirik?",
      "en": "Where do we safely cross the street?",
      "ru": "По каким полосам безопасно переходить дорогу?"
    },
    "instruction": {
      "az": "Təhlükəsiz keçid yolunu seç.",
      "en": "Select safe crossing path.",
      "ru": "Выбери безопасный путь перехода."
    },
    "options": {
      "Piyada keçidi (Zebra) ilə": {
        "en": "Crosswalk (Zebra)",
        "ru": "По пешеходному переходу"
      },
      "Maşınların arasından": {
        "en": "Between cars",
        "ru": "Между машинами"
      },
      "Yolun istənilən yerindən": {
        "en": "Anywhere on road",
        "ru": "В любом месте"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "saf-socket-plug-3": {
    "question": {
      "az": "Elektrik rozetkasına nə etmək qəti qadağandır?",
      "en": "What is strictly forbidden with an electric socket?",
      "ru": "Что строго запрещено делать с розеткой?"
    },
    "instruction": {
      "az": "Təhlükəsizlik qaydasını tap.",
      "en": "Find safety rule.",
      "ru": "Найди правило безопасности."
    },
    "options": {
      "Barmaq və əşya soxmaq": {
        "en": "Inserting fingers or objects",
        "ru": "Вставлять пальцы и предметы"
      },
      "Şəkil çəkmək": {
        "en": "Drawing picture",
        "ru": "Рисовать"
      },
      "Uzaqdan baxmaq": {
        "en": "Looking from afar",
        "ru": "Смотреть издалека"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "saf-window-balcony-4": {
    "question": {
      "az": "Açıq pəncərə və ya balkonda necə davranmalıyıq?",
      "en": "How should we behave near an open window or balcony?",
      "ru": "Как вести себя у открытого окна или балкона?"
    },
    "instruction": {
      "az": "Pəncərə qaydasını seç.",
      "en": "Select window rule.",
      "ru": "Выбери правило у окна."
    },
    "options": {
      "Pəncərədən heç vaxt sallanmamalıyıq": {
        "en": "Never lean out the window",
        "ru": "Никогда не высовываться из окна"
      },
      "Pəncərəyə dırmaşmalıyıq": {
        "en": "Climb on sill",
        "ru": "Залезать на подоконник"
      },
      "Aşağı baxıb tullanmalıyıq": {
        "en": "Jump down",
        "ru": "Прыгать вниз"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "saf-stranger-danger-5": {
    "question": {
      "az": "Küçədə tanımadığımız adam bizi çağırsa və konfet versə nə edirik?",
      "en": "What do we do if a stranger calls us and offers candy?",
      "ru": "Что делать, если незнакомец зовет с собой и предлагает конфету?"
    },
    "instruction": {
      "az": "Küçədə yad adam qaydasını seç.",
      "en": "Select stranger safety rule.",
      "ru": "Выбери правило общения с незнакомцами."
    },
    "options": {
      "Qətiyyən getmirik, böyüklərə deyirik": {
        "en": "Never go, tell adults",
        "ru": "Ни за что не идти, сказать взрослым"
      },
      "Onunla gedirik": {
        "en": "Go with him",
        "ru": "Пойти с ним"
      },
      "Konfeti alıb yeyirik": {
        "en": "Take candy and eat",
        "ru": "Взять конфету"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "saf-medicine-warning-6": {
    "question": {
      "az": "Evdəki dərmanları kimin icazəsi olmadan qəbul etmək olmaz?",
      "en": "Without whose permission must medicines never be taken?",
      "ru": "Без чьего разрешения нельзя принимать лекарства?"
    },
    "instruction": {
      "az": "Dərman qaydasını tap.",
      "en": "Find medicine rule.",
      "ru": "Найди правило обращения с лекарствами."
    },
    "options": {
      "Valideynlərin və həkimin": {
        "en": "Parents and doctor",
        "ru": "Родителей и врача"
      },
      "İstədiyimiz vaxt içərik": {
        "en": "Take whenever",
        "ru": "Можно пить когда угодно"
      },
      "Konfet kimi yeyərik": {
        "en": "Eat like candy",
        "ru": "Кушать как конфеты"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "att-find-cat-1": {
    "question": {
      "az": "Bu heyvanların içində hansı ev heyvanıdır?",
      "en": "Which one of these animals is a domestic pet?",
      "ru": "Какое из этих животных домашнее?"
    },
    "instruction": {
      "az": "Şəkildə ev heyvanını tap.",
      "en": "Find the domestic pet.",
      "ru": "Найди домашнего питомца."
    },
    "options": {
      "Ev Pişiyi": {
        "en": "Cat",
        "ru": "Кошка"
      },
      "Vəhşi Pələng": {
        "en": "Tiger",
        "ru": "Тигр"
      },
      "Timsah": {
        "en": "Crocodile",
        "ru": "Крокодил"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "att-fruit-basket-2": {
    "question": {
      "az": "Səbətdə alma, armud və banan var. Hansı tərəvəz bura səhv düşüb?",
      "en": "In the fruit basket with apples and bananas, which vegetable is mistakenly there?",
      "ru": "В корзине яблоки и бананы. Какой овощ попал туда по ошибке?"
    },
    "instruction": {
      "az": "Meyvələrin içində tərəvəzi tap.",
      "en": "Find vegetable among fruits.",
      "ru": "Найди овощ среди фруктов."
    },
    "options": {
      "Kök": {
        "en": "Carrot",
        "ru": "Морковь"
      },
      "Alma": {
        "en": "Apple",
        "ru": "Яблоко"
      },
      "Banan": {
        "en": "Banana",
        "ru": "Банан"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "att-find-pair-3": {
    "question": {
      "az": "Qırmızı çəkmənin tayını tap: 👢",
      "en": "Find the matching red boot: 👢",
      "ru": "Найди пару красному сапогу: 👢"
    },
    "instruction": {
      "az": "Eyni olan cütü seç.",
      "en": "Select matching pair.",
      "ru": "Выбери подходящую пару."
    },
    "options": {
      "Qırmızı Çəkmə": {
        "en": "Red Boot",
        "ru": "Красный сапог"
      },
      "Mavi Əlcək": {
        "en": "Blue Glove",
        "ru": "Синяя перчатка"
      },
      "Yaşıl Papaq": {
        "en": "Green Hat",
        "ru": "Зеленая шляпа"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "att-missing-wheel-4": {
    "question": {
      "az": "Avtomobilin getməsi üçün mütləq nəyi olmalıdır?",
      "en": "What must a car have to drive?",
      "ru": "Что обязательно должно быть у машины, чтобы ехать?"
    },
    "instruction": {
      "az": "Çatışmayan vacib hissəni tap.",
      "en": "Find essential missing part.",
      "ru": "Найди недостающую часть."
    },
    "options": {
      "Təkərləri": {
        "en": "Wheels",
        "ru": "Колеса"
      },
      "Qanadları": {
        "en": "Wings",
        "ru": "Крылья"
      },
      "Yelkəni": {
        "en": "Sail",
        "ru": "Парус"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "att-size-order-5": {
    "question": {
      "az": "Bu əşyaların içində ən kiçiyi hansıdır?",
      "en": "Which item among these is the smallest?",
      "ru": "Какой предмет из этих самый маленький?"
    },
    "instruction": {
      "az": "Ən kiçik əşyanı seç.",
      "en": "Select the smallest item.",
      "ru": "Выбери самый маленький предмет."
    },
    "options": {
      "Balaca yaşıl noxud": {
        "en": "Tiny green pea",
        "ru": "Маленькая горошина"
      },
      "Böyük qarpız": {
        "en": "Big watermelon",
        "ru": "Большой арбуз"
      },
      "Orta alma": {
        "en": "Medium apple",
        "ru": "Среднее яблоко"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "att-color-difference-6": {
    "question": {
      "az": "Sarı topların içində fərqli olan hansıdır? 🟡🟡🔵🟡",
      "en": "Which ball is different among yellow ones? 🟡🟡🔵🟡",
      "ru": "Какой мяч отличается среди желтых? 🟡🟡🔵🟡"
    },
    "instruction": {
      "az": "Fərqli topu tap.",
      "en": "Find odd ball.",
      "ru": "Найди мяч другого цвета."
    },
    "options": {
      "Göy Top": {
        "en": "Blue Ball",
        "ru": "Синий мяч"
      },
      "Sarı Top": {
        "en": "Yellow Ball",
        "ru": "Желтый мяч"
      },
      "Ulduz": {
        "en": "Star",
        "ru": "Звезда"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "att-shadow-rabbit-7": {
    "question": {
      "az": "Uzun qulaqlı şən kölgə hansı heyvana məxsusdur?",
      "en": "Whose shadow has long ears?",
      "ru": "Чья это тень с длинными ушками?"
    },
    "instruction": {
      "az": "Kölgənin sahibini tap.",
      "en": "Find shadow owner.",
      "ru": "Найди хозяина тени."
    },
    "options": {
      "Dovşan": {
        "en": "Rabbit",
        "ru": "Кролик"
      },
      "Tısbağa": {
        "en": "Turtle",
        "ru": "Черепаха"
      },
      "Balıq": {
        "en": "Fish",
        "ru": "Рыбка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "aud-thunder-1": {
    "question": {
      "az": "Göydə şimşək çaxanda hansı gur səs eşidilir?",
      "en": "What loud sound is heard when lightning strikes?",
      "ru": "Какой громкий звук слышен при грозе?"
    },
    "instruction": {
      "az": "Gur səsi tap.",
      "en": "Find loud sound.",
      "ru": "Найди громкий звук."
    },
    "options": {
      "Bərk gurultu: Qum-qum!": {
        "en": "Loud rumble: Boom!",
        "ru": "Громкий грохот: Бабах!"
      },
      "Asta pıçıltı": {
        "en": "Soft whisper",
        "ru": "Тихий шепот"
      },
      "Cik-cik": {
        "en": "Chirp chirp",
        "ru": "Чик-чирик"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "aud-whisper-2": {
    "question": {
      "az": "Biri gizli söz deyəndə necə danışır?",
      "en": "How does someone speak when sharing a secret?",
      "ru": "Как говорят, когда делятся секретом?"
    },
    "instruction": {
      "az": "Asta səsi seç.",
      "en": "Select quiet sound.",
      "ru": "Выбери тихий звук."
    },
    "options": {
      "Asta pıçıltı ilə": {
        "en": "Quiet whisper",
        "ru": "Тихим шепотом"
      },
      "Şeypur kimi bərk": {
        "en": "Loud like horn",
        "ru": "Громко как труба"
      },
      "Baraban kimi": {
        "en": "Like drum",
        "ru": "Как барабан"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "aud-door-knock-3": {
    "question": {
      "az": "Qapı döyüləndə hansı səs çıxır?",
      "en": "What sound comes when someone knocks on the door?",
      "ru": "Какой звук, когда стучат в дверь?"
    },
    "instruction": {
      "az": "Qapının səsini tap.",
      "en": "Find door sound.",
      "ru": "Найди звук двери."
    },
    "options": {
      "Taq-taq-taq!": {
        "en": "Knock knock!",
        "ru": "Тук-тук-тук!"
      },
      "Vııı-vııı": {
        "en": "Vroom vroom",
        "ru": "Вжж-вжж"
      },
      "Şır-şır": {
        "en": "Drip drop",
        "ru": "Кап-кап"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "aud-guitar-strum-4": {
    "question": {
      "az": "Barmaqla simlərinə toxunduqda gözəl musiqi çalan alət hansıdır?",
      "en": "Which instrument plays music when fingers strum strings?",
      "ru": "Какой инструмент играет красивую музыку, когда перебирают струны?"
    },
    "instruction": {
      "az": "Simli musiqi alətini tap.",
      "en": "Find string instrument.",
      "ru": "Найди струнный инструмент."
    },
    "options": {
      "Gitara": {
        "en": "Guitar",
        "ru": "Гитара"
      },
      "Baraban": {
        "en": "Drum",
        "ru": "Барабан"
      },
      "Şeypur": {
        "en": "Horn",
        "ru": "Труба"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "aud-car-horn-5": {
    "question": {
      "az": "Yolda xəbərdarlıq edən avtomobil siqnalı necə səslənir?",
      "en": "How does a car horn sound on the road?",
      "ru": "Как звучит автомобильный клаксон на дороге?"
    },
    "instruction": {
      "az": "Maşın siqnalını tap.",
      "en": "Find car horn.",
      "ru": "Найди автомобильный сигнал."
    },
    "options": {
      "Bip-biiip!": {
        "en": "Beep beep!",
        "ru": "Бип-бииип!"
      },
      "Qu-qu": {
        "en": "Coo-coo",
        "ru": "Ку-ку"
      },
      "Tıp-tıp": {
        "en": "Tip-tip",
        "ru": "Кап-кап"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "aud-water-splash-6": {
    "question": {
      "az": "Suya daş atanda hansı səs eşidilir?",
      "en": "What sound is heard when throwing stone in water?",
      "ru": "Какой звук, когда бросаешь камень в воду?"
    },
    "instruction": {
      "az": "Suyun səsini tap.",
      "en": "Find splash sound.",
      "ru": "Найди звук всплеска."
    },
    "options": {
      "Şappıltı: Şapp!": {
        "en": "Splash: Plop!",
        "ru": "Всплеск: Бульк!"
      },
      "Cik-cik": {
        "en": "Chirp",
        "ru": "Чик-чирик"
      },
      "Vzzz-vzzz": {
        "en": "Buzz",
        "ru": "Жжжж"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "aud-applause-clap-7": {
    "question": {
      "az": "Uşaqlar şeir oxuyub bitirdikdə hamı necə səs çıxarır?",
      "en": "What sound does everyone make after reciting poem?",
      "ru": "Какие звуки издают все после прочтения стихотворения?"
    },
    "instruction": {
      "az": "Alqış səsini tap.",
      "en": "Find applause sound.",
      "ru": "Найди звук аплодисментов."
    },
    "options": {
      "Gur alqışlar: Şaq-şaq!": {
        "en": "Loud applause: Clap clap!",
        "ru": "Громкие аплодисменты: Хлоп-хлоп!"
      },
      "Tam sükut": {
        "en": "Complete silence",
        "ru": "Полная тишина"
      },
      "Xoruldamaq": {
        "en": "Snoring",
        "ru": "Храп"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mot-trace-circle-sun-1": {
    "question": {
      "az": "Şəklə bax: Günəşin ətrafında hansı xətt var?",
      "en": "Look at scene: What path leads from sun to sunflower?",
      "ru": "Какая линия ведет от солнца к подсолнуху?"
    },
    "instruction": {
      "az": "Barmağınla dairəvi cizgini izlə.",
      "en": "Trace circular line with finger.",
      "ru": "Проведи пальчиком по круговой линии."
    },
    "options": {
      "Dairəvi Halqa Xətti": {
        "en": "Circular Loop",
        "ru": "Круговая линия"
      },
      "Ziqzaq Xətt": {
        "en": "Zigzag",
        "ru": "Зигзаг"
      },
      "Nöqtə": {
        "en": "Dot",
        "ru": "Точка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mot-trace-spiral-snail-2": {
    "question": {
      "az": "İlbizin çanağı hansı formadadır?",
      "en": "What shape is the snail shell?",
      "ru": "Какая форма у панциря улитки?"
    },
    "instruction": {
      "az": "Spiral xətti barmağınla tamamla.",
      "en": "Trace spiral path with finger.",
      "ru": "Проведи по спирали пальчиком."
    },
    "options": {
      "Qıvrım Spiral": {
        "en": "Spiral",
        "ru": "Спираль"
      },
      "Düz Xətt": {
        "en": "Straight line",
        "ru": "Прямая"
      },
      "Kvadrat": {
        "en": "Square",
        "ru": "Квадрат"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mot-trace-lightning-3": {
    "question": {
      "az": "Şəklə bax: Buluddan meşəyə hansı xətt enir?",
      "en": "Which path descends from cloud to forest?",
      "ru": "Какая линия спускается от тучи к лесу?"
    },
    "instruction": {
      "az": "Ziqzaq xətti barmaqla çək.",
      "en": "Trace zigzag path with finger.",
      "ru": "Проведи пальчиком зигзаг."
    },
    "options": {
      "İti Ziqzaq Xətt": {
        "en": "Sharp Zigzag",
        "ru": "Острый зигзаг"
      },
      "Dairəvi Xətt": {
        "en": "Circle",
        "ru": "Круг"
      },
      "Kvadrat Xətt": {
        "en": "Square",
        "ru": "Квадратная"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mot-trace-fish-wave-4": {
    "question": {
      "az": "Dənizdə balıq hansı xətlə üzür?",
      "en": "What line does the fish swim along in sea?",
      "ru": "По какой линии плывет рыбка в море?"
    },
    "instruction": {
      "az": "Dalğalı xətti barmaqla çək.",
      "en": "Trace wavy path.",
      "ru": "Проведи волнистую линию."
    },
    "options": {
      "Dalğalı Xətt": {
        "en": "Wavy Line",
        "ru": "Волнистая линия"
      },
      "Düz Xətt": {
        "en": "Straight line",
        "ru": "Прямая"
      },
      "Qutu Xətt": {
        "en": "Box line",
        "ru": "Коробка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mot-trace-mountain-5": {
    "question": {
      "az": "Dağın zirvəsinə qalxan künclü cizgi hansıdır?",
      "en": "Which pointed line climbs to mountain peak?",
      "ru": "Какая линия поднимается к вершине горы?"
    },
    "instruction": {
      "az": "Dağa doğru xətti izlə.",
      "en": "Trace path to mountain.",
      "ru": "Проведи линию к горе."
    },
    "options": {
      "Ziqzaq Xətt": {
        "en": "Zigzag Line",
        "ru": "Зигзагообразная линия"
      },
      "Halqa Xətti": {
        "en": "Loop",
        "ru": "Петля"
      },
      "Nöqtə": {
        "en": "Dot",
        "ru": "Точка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mot-trace-butterfly-6": {
    "question": {
      "az": "Kəpənək çiçəyə doğru necə uçur?",
      "en": "How does butterfly fly to the flower?",
      "ru": "Как бабочка летит к цветку?"
    },
    "instruction": {
      "az": "Kəpənəyin yolunu barmaqla çək.",
      "en": "Trace butterfly path with finger.",
      "ru": "Проведи пальчиком путь бабочки."
    },
    "options": {
      "Dalğalı və şən xətlə": {
        "en": "Wavy playful line",
        "ru": "Волнистой веселой линией"
      },
      "Hərəkətsiz": {
        "en": "Motionless",
        "ru": "Неподвижно"
      },
      "Aşağı düz": {
        "en": "Straight down",
        "ru": "Прямо вниз"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mot-trace-plane-loop-7": {
    "question": {
      "az": "Təyyarə enişdən əvvəl göydə hansı fiquru cızır?",
      "en": "What shape does the plane draw before landing?",
      "ru": "Какую фигуру описывает самолет перед посадкой?"
    },
    "instruction": {
      "az": "Halqavari xətti barmaqla çək.",
      "en": "Trace loop path.",
      "ru": "Проведи петлю пальчиком."
    },
    "options": {
      "Gözəl Halqa Xətti": {
        "en": "Loop line",
        "ru": "Красивую петлю"
      },
      "Kub": {
        "en": "Cube",
        "ru": "Куб"
      },
      "Xaç": {
        "en": "Cross",
        "ru": "Крест"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mov-run-place-1": {
    "question": {
      "az": "Olduğun yerdə 5 saniyə sürətlə qaç!",
      "en": "Run in place fast for 5 seconds!",
      "ru": "Беги быстро на месте 5 секунд!"
    },
    "instruction": {
      "az": "Yerində qaçış hərəkətini et.",
      "en": "Run in place.",
      "ru": "Беги на месте."
    },
    "options": {
      "Qaçmaq": {
        "en": "Running",
        "ru": "Бежать"
      },
      "Uzanmaq": {
        "en": "Lying down",
        "ru": "Лежать"
      },
      "Donub qalmaq": {
        "en": "Freezing",
        "ru": "Замереть"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mov-touch-toes-2": {
    "question": {
      "az": "Dizlərini bükmədən əyil və ayaq barmaqlarına toxun!",
      "en": "Bend down without bending knees and touch toes!",
      "ru": "Наклонись не сгибая колени и коснись пальцев ног!"
    },
    "instruction": {
      "az": "Əyilmək hərəkətini yerinə yetir.",
      "en": "Perform bending.",
      "ru": "Выполни наклон."
    },
    "options": {
      "Əyilmək": {
        "en": "Bending",
        "ru": "Наклониться"
      },
      "Tullanmaq": {
        "en": "Jumping",
        "ru": "Прыгать"
      },
      "Fırlanmaq": {
        "en": "Spinning",
        "ru": "Кружиться"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mov-star-jump-3": {
    "question": {
      "az": "Qollarını və ayaqlarını geniş açıb ulduz kimi tullan!",
      "en": "Spread arms and legs wide and jump like a star!",
      "ru": "Широко расставь руки и ноги и подпрыгни как звездочка!"
    },
    "instruction": {
      "az": "Ulduz hərəkətini et.",
      "en": "Do star jump.",
      "ru": "Сделай прыжок-звездочку."
    },
    "options": {
      "Ulduz tullanışı": {
        "en": "Star jump",
        "ru": "Прыжок звездочкой"
      },
      "Yuxuya getmək": {
        "en": "Sleep",
        "ru": "Спать"
      },
      "Oturmaq": {
        "en": "Sit",
        "ru": "Сидеть"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mov-spin-circle-4": {
    "question": {
      "az": "Yerində yavaşca bir tam dairə vuraraq fırlan!",
      "en": "Spin around slowly one full circle on the spot!",
      "ru": "Медленно покружись один раз вокруг себя!"
    },
    "instruction": {
      "az": "Fırlanmaq komandası.",
      "en": "Spin command.",
      "ru": "Команда покружиться."
    },
    "options": {
      "Fırlanmaq": {
        "en": "Spinning",
        "ru": "Кружиться"
      },
      "Düz getmək": {
        "en": "Walk straight",
        "ru": "Идти прямо"
      },
      "Gözü yummaq": {
        "en": "Close eyes",
        "ru": "Закрыть глаза"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mov-balance-stork-5": {
    "question": {
      "az": "Bir ayağın üstündə leylək kimi 5 saniyə dayan!",
      "en": "Stand on one foot like a stork for 5 seconds!",
      "ru": "Постой на одной ноге как аист 5 секунд!"
    },
    "instruction": {
      "az": "Müvazinət saxla.",
      "en": "Keep balance.",
      "ru": "Держи равновесие."
    },
    "options": {
      "Bir ayaqda durmaq": {
        "en": "Stand on one foot",
        "ru": "Стоять на одной ноге"
      },
      "Qaçmaq": {
        "en": "Run",
        "ru": "Бежать"
      },
      "Oturmaq": {
        "en": "Sit",
        "ru": "Сесть"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mov-march-soldier-6": {
    "question": {
      "az": "Dizlərini hündürə qaldıraraq yerində addımla!",
      "en": "March on the spot lifting your knees high!",
      "ru": "Маршируй на месте, высоко поднимая колени!"
    },
    "instruction": {
      "az": "Dizləri qaldıraraq addımla.",
      "en": "March lifting knees.",
      "ru": "Маршируй поднимая колени."
    },
    "options": {
      "Cəsur addımlamaq": {
        "en": "Brave marching",
        "ru": "Маршировать"
      },
      "Sürünmək": {
        "en": "Crawl",
        "ru": "Ползать"
      },
      "Yellənmək": {
        "en": "Swing",
        "ru": "Качаться"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "mov-happy-dance-7": {
    "question": {
      "az": "Şən musiqi sədaları altında sevinclə rəqs et!",
      "en": "Joyfully dance to the happy music!",
      "ru": "Весело потанцуй под музыку!"
    },
    "instruction": {
      "az": "Rəqs etmək komandası.",
      "en": "Dance command.",
      "ru": "Команда танцевать."
    },
    "options": {
      "Şən rəqs etmək": {
        "en": "Happy dance",
        "ru": "Весело танцевать"
      },
      "Susub oturmaq": {
        "en": "Sit quietly",
        "ru": "Сидеть тихо"
      },
      "Donub qalmaq": {
        "en": "Freeze",
        "ru": "Замереть"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "log-cow-milk-1": {
    "question": {
      "az": "Dadlı və ağ süd bizə hansı heyvandan gəlir?",
      "en": "Which animal gives us tasty white milk?",
      "ru": "Какое животное дает нам вкусное белое молоко?"
    },
    "instruction": {
      "az": "Məntiqi əlaqəni tap.",
      "en": "Find logical connection.",
      "ru": "Найди логическую связь."
    },
    "options": {
      "İnəkdən": {
        "en": "From cow",
        "ru": "От коровы"
      },
      "Toyuqdan": {
        "en": "From hen",
        "ru": "От курицы"
      },
      "Pişikdən": {
        "en": "From cat",
        "ru": "От кошки"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "log-wool-sweater-2": {
    "question": {
      "az": "Qoyunun yumşaq yunundan nə toxuyurlar?",
      "en": "What is knitted from sheep soft wool?",
      "ru": "Что вяжут из мягкой овечьей шерсти?"
    },
    "instruction": {
      "az": "Yun ilə əlaqəli əşyanı tap.",
      "en": "Find item made of wool.",
      "ru": "Найди вещь из шерсти."
    },
    "options": {
      "İsti sviter və corab": {
        "en": "Warm sweater & socks",
        "ru": "Теплый свитер и носки"
      },
      "Şüşə stəkan": {
        "en": "Glass cup",
        "ru": "Стеклянный стакан"
      },
      "Dəmir qapı": {
        "en": "Iron door",
        "ru": "Железную дверь"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "log-bird-nest-3": {
    "question": {
      "az": "Quş öz yumurtalarını və balalarını harada qoruyur?",
      "en": "Where does the bird protect its eggs and chicks?",
      "ru": "Где птица оберегает яйца и птенцов?"
    },
    "instruction": {
      "az": "Quşun yumurtasını qoruduğu yeri seç.",
      "en": "Select where bird protects eggs.",
      "ru": "Выбери, где птица хранит яйца."
    },
    "options": {
      "Ağacdakı yuvada": {
        "en": "In tree nest",
        "ru": "В гнезде на дереве"
      },
      "Su quyusunda": {
        "en": "In water well",
        "ru": "В колодце"
      },
      "Avtomobilin içində": {
        "en": "Inside car",
        "ru": "В машине"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "log-odd-out-car-4": {
    "question": {
      "az": "Bu sırada artıq olan hansıdır? (Alma, Armud, Banan, Avtomobil)",
      "en": "Which one is odd in this list? (Apple, Pear, Banana, Car)",
      "ru": "Что лишнее в этом ряду? (Яблоко, Груша, Банан, Машина)"
    },
    "instruction": {
      "az": "Artıq olanı tap.",
      "en": "Find odd item.",
      "ru": "Найди лишнее."
    },
    "options": {
      "Avtomobil (çünki nəqliyyatdır)": {
        "en": "Car (it is transport)",
        "ru": "Машина (так как это транспорт)"
      },
      "Alma": {
        "en": "Apple",
        "ru": "Яблоко"
      },
      "Banan": {
        "en": "Banana",
        "ru": "Банан"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "log-sunglasses-5": {
    "question": {
      "az": "Parlaq yay günəşindən gözlərimizi qorumaq üçün nə taxırıq?",
      "en": "What do we wear to protect eyes from bright sun?",
      "ru": "Что мы надеваем для защиты глаз от яркого солнца?"
    },
    "instruction": {
      "az": "Günəş əşyasını tap.",
      "en": "Find sun protection item.",
      "ru": "Найди предмет защиты от солнца."
    },
    "options": {
      "Gün eynəyi": {
        "en": "Sunglasses",
        "ru": "Солнцезащитные очки"
      },
      "Əlcək": {
        "en": "Gloves",
        "ru": "Перчатки"
      },
      "Qalın şərf": {
        "en": "Scarf",
        "ru": "Шарф"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
    }
  },
  "log-key-lock-6": {
    "question": {
      "az": "Qapıdakı qıfılı açmaq üçün bizə nə lazımdır?",
      "en": "What do we need to unlock a door lock?",
      "ru": "Что нужно, чтобы открыть замок на двери?"
    },
    "instruction": {
      "az": "Qıfılı açan əşyanı seç.",
      "en": "Select item that opens lock.",
      "ru": "Выбери предмет, открывающий замок."
    },
    "options": {
      "Açar": {
        "en": "Key",
        "ru": "Ключ"
      },
      "Qələm": {
        "en": "Pen",
        "ru": "Карандаш"
      },
      "Qaşıq": {
        "en": "Spoon",
        "ru": "Ложка"
      }
    },
    "explanation": {
      "az": "Afərin! Düzgün cavab! 🌟",
      "en": "Well done! Correct answer! 🌟",
      "ru": "Молодец! Правильный ответ! 🌟"
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
