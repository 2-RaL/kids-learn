import type { Language } from '../types';

export interface MultilingualStory {
  id: number;
  min_age: number;
  max_age: number;
  is_bedtime: boolean;
  category: 'bedtime' | 'daytime';
  reading_duration_minutes: number;
  cover_emoji: string;
  translations: Record<
    Language,
    {
      title: string;
      short_description: string;
      paragraphs: string[];
    }
  >;
}

export const MULTILINGUAL_STORIES: MultilingualStory[] = [
  // ── 1. Age 3-4 Bedtime: Kiçik Dovşanın Ulduzlu Yuxusu ────────────────
  {
    id: 1,
    min_age: 3,
    max_age: 4,
    is_bedtime: true,
    category: 'bedtime',
    reading_duration_minutes: 5,
    cover_emoji: '🐰🌙',
    translations: {
      az: {
        title: 'Kiçik Dovşanın Ulduzlu Yuxusu',
        short_description: 'Balaca dovşan Pambığın meşədə sakit gecə və ulduzlarla keçən şirin yuxu nağılı.',
        paragraphs: [
          'Gecə meşəyə sakitlik gətirmişdi. Ağacların yaşıl yarpaqları yavaş-yavaş yellənirdi. Göy üzündə minlərlə parlaq ulduz sayrışmağa başladı. Balaca dovşan Pambıq yuvasında rahatca oturmuşdu. O, anasının gətirdiyi ilıq südü içdi. Anası onun uzun qulaqlarını mehribanlıqla sığalladı.',
          'Pambıq pəncərədən baxıb parlaq Ay babaya gülümsədi. Meşənin bütün quşları artıq öz yuvalarında şirin yuxuya getmişdilər. Şən dələ balaları da analarının qucağına sığınıb gözlərini yummuşdular. Balaca çayın səsi meşədə gözəl bir layla kimi axırdı. Mehriban külək dovşanın yatağına təzə çiçək qoxusu gətirirdi. Pambıq yumşaq yastığına başını qoydu.',
          'Birdən göydən parlaq bir ulduz dovşana tərəf göz vurdu. Ulduz ona pıçıldadı ki, vaxtında yatan uşaqlar ən sehirli xəyalları görürlər. Pambıq təbəssümlə gözlərini yumdu. O, yuxusunda rəngarəng kəpənəklərlə yaşıl çəmənlikdə tullandığını gördü. Hər tullanışda ətraf daha da işıqlı və şən olurdu. Bütün meşə dostları onunla birlikdə əl-ələ verib sevinirdilər.',
          'Gecənin sakitliyi bütün otağı bürüdü. Pambıq dərindən nəfəs alaraq rahat yuxuya daldı. Sabah onu yeni və əyləncəli macəralar gözləyirdi. Mehriban Ay baba səhərə qədər onun şirin yuxusunu qorudu.',
        ],
      },
      en: {
        title: "The Little Rabbit's Starry Dream",
        short_description: 'A peaceful bedtime tale about little bunny Fluffy drifting into a sweet starry dream.',
        paragraphs: [
          'The night brought quiet peace to the green forest. The soft leaves of the trees swayed gently in the breeze. Thousands of twinkling stars began to shine in the deep blue sky. Little bunny Fluffy sat comfortably in his cozy bed. He drank warm milk lovingly brought by his mother. His mother gently stroked his long ears.',
          'Fluffy looked out the round window and smiled at the glowing Moon. All the little birds were already fast asleep in their warm nests. The playful squirrels were curled up safely beside their mother. The babbling brook whispered a soothing lullaby through the trees. A friendly night breeze brought the sweet scent of flowers into the room. Fluffy rested his head on his soft pillow.',
          'Suddenly, a bright little star winked at the bunny from above. The star whispered that children who sleep on time see the sweetest dreams. Fluffy closed his eyes with a happy smile. In his dream, he hopped across a sunny meadow filled with bright butterflies. With every little jump, the world around him became more magical. All his forest friends held hands and danced together in joy.',
          'A quiet peace wrapped around the whole world. Fluffy took a deep breath and fell into a calm, gentle sleep. Tomorrow was waiting with wonderful new adventures. The kind Moon watched over his sweet sleep all night long.',
        ],
      },
      ru: {
        title: 'Звёздный сон маленького зайчонка',
        short_description: 'Успокаивающая вечерняя сказка о зайчонке Пушке и волшебных звёздах.',
        paragraphs: [
          'Ночь принесла тишину и покой в зелёный лес. Мягкие листья деревьев плавно качались на ветру. На тёмном небе зажглись тысячи ярких звёздочек. Маленький зайчонок Пушок уютно сидел в своей кроватке. Он с удовольствием выпил тёплое молоко, которое принесла мама. Мама ласково погладила его длинные мягкие ушки.',
          'Пушок посмотрел в круглое окошко и улыбнулся доброму месяцу. Все птицы в лесу уже спали в своих тёплых гнёздышках. Маленькие бельчата сладко сопели рядом с мамой. Лесной ручеёк тихо журчал, словно напевал колыбельную песню. Ночной ветерок принёс в домик аромат лесных цветов. Пушок опустил голову на мягкую подушку.',
          'Вдруг с неба зайчонку весело подмигнула маленькая звёздочка. Она прошептала, что вовремя засыпающие малыши видят самые добрые сны. Пушок закрыл глазки с радостной улыбкой. Во сне он прыгал по зелёной полянке с яркими бабочками. С каждым прыжком мир становился всё светлее и радостнее. Все лесные друзья весело водили хоровод вокруг него.',
          'Ночная тишина ласково укутала весь сказочный лес. Пушок глубоко вздохнул и сладко уснул. Завтра его ждал новый счастливый день. А добрый месяц охранял его покой до самого рассвета.',
        ],
      },
    },
  },

  // ── 2. Age 3-4 Daytime: Günəşli Meşədə Əyləncəli Səhər ───────────────
  {
    id: 2,
    min_age: 3,
    max_age: 4,
    is_bedtime: false,
    category: 'daytime',
    reading_duration_minutes: 6,
    cover_emoji: '☀️🐻',
    translations: {
      az: {
        title: 'Günəşli Meşədə Əyləncəli Səhər',
        short_description: 'Balaca ayı balası Mişkanın meşə dostları ilə birgə keçirdiyi sevincli səhər gəzintisi.',
        paragraphs: [
          'Parlaq günəş şüaları meşənin üzərinə yayıldı. Səhər şehləri otların üzərində mirvari kimi parıldayırdı. Balaca ayı balası Mişka yuxudan oyandı və qollarını yuxarı qaldırıb gərnəşdi. O, pəncərəni açıb təmiz havanı içinə çəkdi. Quşlar budaqlarda səhər mahnılarını oxumağa başlamışdılar. Mişka əl-üzünü yudu və dadlı səhər yeməyini yedi.',
          'Mişka həyətə çıxdı və sevimli dostu tülkü quyruğu Alini gördü. Onlar bir-birinə salam verib möhkəm qucaqlaşdılar. İki dost çəmənlikdə qaçmağa və rəngli toplarla oynamağa başladılar. Yol kənarında balaca bir kirpi ilə qarşılaşdılar. Kirpi onlara yetişmiş qırmızı almalar göstərdi. Dostlar birlikdə almaları səbətə yığdılar.',
          'Sonra onlar təmiz çayın kənarına getdilər. Çayda kiçik balıqlar sevinclə tullanırdı. Mişka və dostları suda daşların üzərindən ehtiyatla adladılar. Hər kəs bir-birinə kömək edir və gülürdü. Mehriban ayı anası dostları dadlı giləmeyvəli piroqa qonaq etdi. Hər kəs paylaşıb yeməyin nə qədər gözəl olduğunu anladı.',
          'Günəş səmada ən yüksək nöqtəyə çatmışdı. Bütün dostlar yorulsalar da, çox xoşbəxt idilər. Mişka dostlarına təşəkkür etdi və onlara əl yellədi. Birlikdə oynamaq tək oynamaqdan qat-qat maraqlı idi.',
        ],
      },
      en: {
        title: 'A Fun Morning in the Sunny Forest',
        short_description: 'A joyful morning walk where little bear cub Mishka explores the forest with his friends.',
        paragraphs: [
          'Bright sun rays spread across the green forest. Morning dew sparkled like pearls on the fresh grass. Little bear cub Mishka woke up and stretched his arms high into the air. He opened his wooden window and breathed in the cool forest air. Birds on the branches had already begun their morning songs. Mishka washed his face and enjoyed a delicious breakfast.',
          'Mishka stepped outside and saw his good friend Ali the little fox. They greeted each other cheerfully with warm hugs. The two friends began running through the meadow and kicking colorful balls. Along the forest path, they met a tiny hedgehog carrying berries. The hedgehog showed them juicy red apples hanging from a tree. Together, the happy friends collected the apples into a basket.',
          'Next, they walked down to the clear forest stream. Small silvery fish were jumping joyfully in the water. Mishka and his friends carefully hopped across the round stones. Everyone helped each other and giggled along the way. Mishka’s kind mother invited the friends for fresh berry pie. Everyone learned how wonderful it feels to share tasty treats.',
          'The bright sun climbed high into the blue sky. Although the little animals were tired, their hearts were full of joy. Mishka smiled and waved goodbye to his wonderful friends. Playing together was so much more fun than playing alone.',
        ],
      },
      ru: {
        title: 'Весёлое утро в солнечном лесу',
        short_description: 'Радостная утренняя история о медвежонке Мишке и его верных лесных друзьях.',
        paragraphs: [
          'Яркие солнечные лучи осветили зелёный лес. Утренняя роса блестела на траве, как драгоценные жемчужины. Маленький медвежонок Мишка проснулся и сладко потянулся. Он распахнул окно и вдохнул свежий прохладный воздух. Птички на ветках уже распевали звонкие утренние песни. Мишка умылся чистой водой и вкусно позавтракал.',
          'Выйдя на улицу, Мишка встретил своего друга лисёнка Али. Они радостно поздоровались и крепко обнялись. Друзья побежали на полянку и стали весело играть с мячом. На тропинке они увидели маленького колючего ёжика. Ёжик показал им дерево со спелыми красными яблоками. Друзья дружно собрали упавшие яблоки в плетёную корзину.',
          'Затем они отправились к прозрачному лесному ручью. В чистой воде весело плескались маленькие золотые рыбки. Мишка и его друзья аккуратно перепрыгивали по круглым камушкам. Все помогали друг другу и радостно смеялись. Добрая мама медведица угостила малышей пирогом со свежей черникой. Все поняли, как приятно делиться угощением с друзьями.',
          'Солнце поднялось высоко в чистое синее небо. Малыши немного устали, но были очень счастливы. Мишка тепло поблагодарил друзей и помахал им лапкой. Играть вместе всегда намного веселее, чем одному.',
        ],
      },
    },
  },

  // ── 3. Age 5-6 Bedtime: Ağıllı Ayı Balası və Ay İşığı ────────────────
  {
    id: 3,
    min_age: 5,
    max_age: 6,
    is_bedtime: true,
    category: 'bedtime',
    reading_duration_minutes: 7,
    cover_emoji: '🌙🐻',
    translations: {
      az: {
        title: 'Ağıllı Ayı Balası və Ay İşığı',
        short_description: 'Gecə göyündəki ayı seyr edən balaca ayının təbiətin harmoniyasını kəşf etməsi haqqında nağıl.',
        paragraphs: [
          'Böyük dağların arxasında qaranlıq tədricən düşürdü. Meşənin bütün heyvanları yavaş-yavaş yuxuya hazırlaşırdı. Balaca ayı balası Tomi eyvanda oturub səmaya baxırdı. Göydə böyük və parlaq Ay peyda olmuşdu. Tomi anasından Ayın niyə bəzən yumru, bəzən isə oraq kimi olduğunu soruşdu. Anası gülümsəyərək bunun təbiətin sehirli qaydası olduğunu söylədi.',
          'Gümüşü ay işığı ağacların təpələrini işıqlandırırdı. Gecə kəpənəkləri Ay işığında rəqs edərək dövrə vururdular. Uzaqda bayquş müdrik səslə meşəyə gecə salamı verirdi. Tomi anası ilə birlikdə ulduz bürclərini saymağa başladı. O, böyük çömçə şəkilli ulduzları tapanda çox sevindi. Hər bir ulduz meşəyə təhlükəsizlik və sevgi bəxş edirdi.',
          'Anası Tomiyə isti adyal gətirdi və onu qucaqladı. O, balaca ayısına hər canlının dincəlməyə ehtiyacı olduğunu başa saldı. Yuxu zamanı bədənimiz böyüyür və güclənir. Tomi gözlərini bağlayıb Ay işığının yumşaq toxunuşunu hiss etdi. Külək meşənin yarpaqları ilə layla çalırdı. Bütün narahatlıqlar uzaqlara çəkilib getdi.',
          'Tomi anasının yanında özünü çox təhlükəsiz hiss etdi. O, təbiətin bu sakitliyinə təşəkkür edərək yuxuya daldı. Səhər açılana qədər ulduzlar onun yuxusunu bəzədi. Gözəl yuxular hər zaman sevgi dolu qəlblərə gəlir.',
        ],
      },
      en: {
        title: 'The Clever Bear Cub and the Moonlight',
        short_description: 'A cozy evening story about little Tommy exploring the wonders of the Moon before falling asleep.',
        paragraphs: [
          'Dusk was falling softly behind the great blue mountains. All the animals of the forest were quietly preparing for bed. Little bear cub Tommy sat on the wooden porch gazing at the evening sky. A large, bright Moon appeared among the soft clouds. Tommy asked his mother why the Moon sometimes looks round and sometimes curved like a silver crescent. His mother smiled and explained that this was nature’s gentle rhythm.',
          'The silvery moonlight cast a peaceful glow over the treetops. Little night moths fluttered gracefully in the soft silver beam. In the distance, a wise old owl hooted a gentle goodnight to the woods. Tommy and his mother began counting the glowing constellations together. He was thrilled when he recognized the shape of the Big Dipper in the sky. Each star seemed to offer safety, warmth, and peace.',
          'His mother brought a cozy blanket and wrapped it around Tommy’s shoulders. She explained that every living creature needs restful sleep to grow strong and healthy. During our sleep, our minds rest and our bodies regain their energy. Tommy closed his eyes and felt the tender warmth of the moonlight. The gentle breeze played a soothing melody through the pine needles. All the day’s worries vanished into the quiet night.',
          'Tommy felt completely safe and loved beside his caring mother. He whispered a quiet thank you to the peaceful night and drifted to sleep. Until the bright sunrise, the stars decorated his pleasant dreams. Beautiful dreams always visit hearts filled with kindness and gratitude.',
        ],
      },
      ru: {
        title: 'Умный медвежонок и лунный свет',
        short_description: 'Уютная сказка перед сном о медвежонке Томми, который наблюдал за луной и звёздами.',
        paragraphs: [
          'Сумерки мягко опускались за вершины высоких синих гор. Все лесные жители неторопливо готовились ко сну. Маленький медвежонок Томми сидел на крылечке и смотрел на вечернее небо. Большая и светлая Луна появилась среди лёгких облаков. Томми спросил маму, почему Луна бывает круглой, а иногда похожа на серебряный серп. Мама улыбнулась и объяснила, что это удивительный закон природы.',
          'Серебристый лунный свет озарял верхушки могучих зелёных сосен. Ночные бабочки плавно кружились в мерцающем луче света. Вдали мудрая сова тихо пожелала лесу спокойной ночи. Томми вместе с мамой стал считать далёкие мерцающие созвездия. Он очень обрадовался, когда сам нашёл на небе форму Большой Медведицы. Каждая звёздочка словно дарила лесу спокойствие и тепло.',
          'Мама принесла мягкое тёплое одеяло и заботливо укрыла сыночка. Она рассказала, что сон нужен каждому живому существу, чтобы расти крепким и умным. Во время сна наше тело отдыхает, а силы полностью восстанавливаются. Томми закрыл глазки и почувствовал нежное прикосновение лунного света. Ветерок тихо напевал колыбельную песню сквозь иголки сосен. Все дневные заботы улетучились далеко-далеко.',
          'Рядом с любимой мамой Томми чувствовал себя совершенно спокойно и защищённо. Он мысленно поблагодарил ночной лес и сладко уснул. До самого утра звёзды бережно украшали его добрые сны. Самые прекрасные сны всегда приходят к тем, чьё сердце полно добра.',
        ],
      },
    },
  },

  // ── 4. Age 5-6 Daytime: Rəngli Kəpənəyin Böyük Səyahəti ─────────────
  {
    id: 4,
    min_age: 5,
    max_age: 6,
    is_bedtime: false,
    category: 'daytime',
    reading_duration_minutes: 7,
    cover_emoji: '🦋🌸',
    translations: {
      az: {
        title: 'Rəngli Kəpənəyin Böyük Səyahəti',
        short_description: 'Mavi qanadlı balaca kəpənəyin meşədə yeni dostlar tapması və yardımlaşmanın önəmi haqqında hekayə.',
        paragraphs: [
          'Yaz səhəri güllər çiçək açmış, çəmənlik rəngbərəng xalçaya bənzəyirdi. Mavi qanadlı kiçik kəpənək Maya ilk dəfə təkbaşına uçmaq qərarına gəldi. Onun qanadları günəş altında göy qurşağı kimi bərq vururdu. Anası ona çox uzağa getməməyi və dostlara qarşı diqqətli olmağı tapşırmışdı. Maya sevinclə qanad çalıb havalandı. O, güllərin üzərində rəqs edərək çiçək şirəsi topladı.',
          'Uçarkən o, kolların arasında kömək istəyən balaca bir qarışqa gördü. Qarışqa böyük bir buğda dənəsini yuvasına aparmaqda çətinlik çəkirdi. Maya dərhal onun yanına endi və kömək etməyi təklif etdi. Kəpənək yarpağı çəkərək qarışqaya yol açdı. Qarışqa sevinclə təşəkkür etdi və onlar dost oldular. Maya başa düşdü ki, başqalarına kömək etmək insana böyük xoşbəxtlik gətirir.',
          'Bir az sonra Maya göldə üzən ördək balalarını seyr etdi. Ördəklər suda sıra ilə üzür, bir-birlərini diqqətlə izləyirdilər. Maya havadan onlara salam verdi və qanadlarını yellədi. Birdən külək gücləndi və kəpənəyin uçması çətinləşdi. Yeni dostu qarışqa və onun ailəsi Mayaya böyük bir yarpağın altında sığınacaq göstərdilər. Külək sakitləşənə qədər onlar birgə şən söhbətlər etdilər.',
          'Günün sonunda Maya anasının yanına fərəhlə qayıtdı. O, gün ərzində yaşadığı bütün macəraları anasına həyəcanla danışdı. Anası onunla fəxr etdi və onu bağrına basdı. Əsl güc təkcə uçmaqda yox, yaxşı dost olmaqda idi.',
        ],
      },
      en: {
        title: 'The Big Journey of the Colorful Butterfly',
        short_description: 'A heartwarming adventure of blue butterfly Maya learning the true power of kindness and helping friends.',
        paragraphs: [
          'On a bright spring morning, colorful wildflowers bloomed across the meadow like a bright carpet. A little blue-winged butterfly named Maya decided to take her first flight across the meadow. Her wings sparkled like a delicate rainbow in the morning sunlight. Her mother reminded her to stay safe and always be kind to others. Maya fluttered her wings joyfully and lifted into the warm air. She danced above sweet blossoms and tasted fresh nectar.',
          'While gliding past green shrubs, she noticed a tiny ant calling for help. The little ant was struggling to carry a heavy grain of wheat back to its anthill. Maya immediately flew down and offered her friendly assistance. The butterfly helped clear a smooth path by gently lifting a fallen twig. The little ant cheered with gratitude, and the two became instant friends. Maya realized that helping someone in need brings the greatest happiness.',
          'Later in the afternoon, Maya watched fluffy ducklings swimming across the crystal pond. The ducklings swam in a neat little row, watching out for one another. Maya fluttered above the water and greeted them with cheerful wing flaps. Suddenly, a strong gust of wind blew across the open meadow. Her new ant friends quickly showed Maya a safe shelter beneath a large lotus leaf. They shared happy stories until the breezy storm passed completely.',
          'At sunset, Maya returned home to her mother with a joyful heart. She excitedly told her mother all about her wonderful new adventures. Her mother smiled proudly and gave her a warm butterfly embrace. True strength is not just having wings, but having a caring and generous heart.',
        ],
      },
      ru: {
        title: 'Большое путешествие разноцветной бабочки',
        short_description: 'Добрая история о бабочке Майе, которая узнала, как важна дружба и взаимная помощь.',
        paragraphs: [
          'Ясным весенним утром луговые цветы распустились, превратив поляну в яркий цветущий ковёр. Маленькая бабочка с синими крылышками по имени Майя решила впервые полететь через весь луг. Её крылья переливались на солнце всеми цветами радуги. Мама попросила её быть внимательной и всегда помогать тем, кто в этом нуждается. Майя радостно взмахнула крылышками и взмыла в тёплый воздух. Она кружилась над сладкими цветами и пила душистый нектар.',
          'Пролетая над кустиками, она заметила маленького муравья, попавшего в беду. Муравьишка изо всех сил пытался дотащить до своего дома тяжёлое пшеничное зёрнышко. Майя тут же опустилась рядом и предложила свою помощь. Бабочка осторожно отодвинула сухую веточку и помогла расчистить дорогу. Муравей от души поблагодарил её, и они стали верными друзьями. Майя поняла, что помощь другому дарит самую искреннюю радость.',
          'Чуть позже Майя любовалась пушистыми утятами, плававшими в прозрачном пруду. Малыши-утята плыли ровной цепочкой и заботились друг о друге. Майя помахала им крылышками прямо из воздуха. Внезапно поднялся сильный порывистый ветер, и бабочке стало трудно лететь. Её новый друг муравей вместе с семьёй быстро позвали Майю укрыться под широким зелёным лопухом. Они весело беседовали, пока ветер не стих.',
          'На закате Майя с сияющими глазами вернулась домой к маме. Она вдохновенно рассказала обо всех удивительных событиях этого дня. Мама нежно обняла дочку и сказала, что очень гордится ею. Настоящая сила кроется не в красивых крыльях, а в добром и верном сердце.',
        ],
      },
    },
  },

  // ── 5. Age 7-8 Bedtime: Dəniz Mayakının Sakit Nağılı ─────────────────
  {
    id: 5,
    min_age: 7,
    max_age: 8,
    is_bedtime: true,
    category: 'bedtime',
    reading_duration_minutes: 8,
    cover_emoji: '🌊🏮',
    translations: {
      az: {
        title: 'Dəniz Mayakının Sakit Nağılı',
        short_description: 'Sahildəki qədim mayakın və dəniz dalğalarının gecə səyahətçilərinə yol göstərən sakitləşdirici hekayəsi.',
        paragraphs: [
          'Geniş mavi dənizin sahilində, sıldırım qayalıqlar üzərində hündür bir mayak ucalırdı. Bu mayak uzun illər boyu gecə dənizdə üzən gəmilərə etibarlı yol göstərmişdi. Axşam qürub çağı günəş qızılı rəngə boyanaraq üfüqdə batdı. Sahildəki kiçik balıqçı qəsəbəsində bir-bir işıqlar yanmağa başladı. Mayakın baxıcısı İlyas baba pilləkənləri qalxıb böyük fənəri yandırdı. Fənərin parlaq və isti işığı dənizin qaranlıq sularını işıqlandırdı.',
          'Dəniz dalğaları sahilə çırpılaraq sakit və ahəngdar bir ritm yaradırdı. Qağayılar artıq qayalıqlardakı yuvalarına çəkilmiş, səssizlik hökm sürürdü. Uzaqda, dənizin ortasında kiçik bir yelkənli qayıq görünürdü. Qayıqdakı balıqçılar mayakın işığını görəndə rahat nəfəs aldılar. Bu işıq onlara evlərinin yaxın olduğunu və hər şeyin qaydasında olduğunu xatırladırdı. Gəmiçilər mayakın göstərdiyi istiqamətdə təhlükəsiz limana doğru üzdülər.',
          'Gecənin sərin mehi dəniz duzunun təravətini sahilə gətirirdi. Səmadakı bədirlənmiş Ay mayakın fənəri ilə sanki mehriban söhbət edirdi. İlyas baba isti çayını içərək dənizin sonsuz dincliyini seyr etdi. Dünyanın hər yerində hər kəsə yol göstərən, qaranlıqda ümid verən bir işıq mütləq vardır. Ən vacib olan isə çətin anlarda dözümlü olmaq və ümidi itirməməkdir. Sakitlik bütün sahili və dənizi öz qanadları altına aldı.',
          'Yelkənli qayıq limana yan aldı və balıqçılar ailələrinə qovuşdular. Mayak isə səhərə qədər ayıq-sayıq keşik çəkməyə davam etdi. Dalğaların zərif pıçıltısı sahil boyu ən gözəl gecə nağılını oxuyurdu. İndi hər kəs üçün şirin və dinc yuxuya getmək vaxtı idi.',
        ],
      },
      en: {
        title: 'The Quiet Tale of the Sea Lighthouse',
        short_description: 'A serene nighttime story about an old lighthouse guiding ships home with calm and reassurance.',
        paragraphs: [
          'High upon the rugged cliffs overlooking the deep blue sea stood a tall, sturdy lighthouse. For many years, this trusty beacon had guided sailors safely through the darkest nights. At sunset, the golden sun melted softly into the distant horizon. One by one, cozy amber lights began to flicker in the sleepy seaside village below. Old lighthouse keeper Ilyas climbed the spiral stairs and lit the grand lantern. The warm, radiant beam swept gently across the tranquil ocean waters.',
          'Rhythmic ocean waves lapped against the rocky shore, creating a soothing natural lullaby. Sea gulls had already tucked their heads under their wings inside their cliffside nests. Far in the distance, a small sailboat was making its way back from a long voyage. Seeing the bright, reliable beam of the lighthouse, the sailors exhaled with deep relief. This steady glow reminded them that home was near and safety was assured. The sailboat steered smoothly toward the calm harbor waters.',
          'A cool sea breeze carried the refreshing scent of salt water across the quiet coastline. The glowing full moon in the sky seemed to smile warmly at the rotating lighthouse beam. Keeper Ilyas sipped his warm chamomile tea, admiring the boundless tranquility of the ocean. In every corner of the world, there is always a guiding light that shines through the darkness. The most important lesson is to stay patient and keep hope burning bright in your heart. Deep peace enveloped the vast ocean and the quiet town.',
          'The small sailboat docked safely at the harbor, and the fishermen reunited with their families. The faithful lighthouse continued its quiet, steadfast vigil until dawn arrived. The gentle whisper of the tide sang the sweetest goodnight song to the world. Now was the perfect time to close your eyes and drift into peaceful, restful sleep.',
        ],
      },
      ru: {
        title: 'Тихая сказка морского маяка',
        short_description: 'Умиротворяющая история о старом маяке, который светит ночным кораблям и дарит покой.',
        paragraphs: [
          'На высоких скалистых утёсах у самого синего моря гордо возвышался белый маяк. На протяжении многих долгих лет этот верный ориентир помогал кораблям находить дорогу домой. На закате солнце плавно опустилось за далёкую линию морского горизонта. В маленьком рыбацком посёлке на берегу один за другим зажигались тёплые огоньки. Старый смотритель Ильяс поднялся по винтовой лестнице и зажёг большой стеклянный фонарь. Тёплый луч света мягко протянулся через тёмную гладь океана.',
          'Морские волны мерно накатывали на песчаный берег, создавая спокойную успокаивающую мелодию. Белые чайки уже устроились на ночлег в своих уютных гнёздах на скалах. Вдали, посреди бескрайнего моря, показался небольшой деревянный парусник. Заметив далёкий приветливый огонёк маяка, моряки вздохнули с огромным облегчением. Этот свет напоминал им о домашнем тепле и скорой долгожданной встрече с родными. Корабль уверенно взял курс на тихую безопасную гавань.',
          'Свежий ночной ветерок принёс с моря прохладу и чистый солёный аромат. Полная луна на чистом ночном небе ласково смотрела на верный маяк. Смотритель Ильяс пил горячий травяной чай и наслаждался величественным спокойствием ночи. В жизни каждого человека всегда есть огонёк надежды, который указывает верный путь даже в темноте. Самое главное — сохранять терпение, доброту и веру в лучшее. Безмятежная тишина укрыла весь морской берег.',
          'Парусник благополучно причалил к деревянной пристани, и моряки вернулись в свои уютные дома. А маяк продолжал нести свою верную и тихую службу до самых первых лучей солнца. Шёпот ласковых волн звучал как самая нежная колыбельная сказка на свете. Пришло время закрыть глазки и погрузиться в самый сладкий и безмятежный сон.',
        ],
      },
    },
  },

  // ── 6. Age 7-8 Daytime: Sehrli Ağac və Dörd Dost ─────────────────────
  {
    id: 6,
    min_age: 7,
    max_age: 8,
    is_bedtime: false,
    category: 'daytime',
    reading_duration_minutes: 8,
    cover_emoji: '🌳🤝',
    translations: {
      az: {
        title: 'Sehrli Ağac və Dörd Dost',
        short_description: 'Dörd fərqli istedada malik dostun birgə çalışaraq meşədəki qədim ağacı qoruması haqqında hekayə.',
        paragraphs: [
          'Meşənin ən qədim hissəsində yüzillik nəhəng bir palıd ağacı ucalırdı. Bu ağacın budaqları yüzlərlə quşa və heyvana sığınacaq bəxş edirdi. Dörd məktəbli dost — Murad, Leyla, Kənan və Nigar hər yay tətilində bu ağacın altında toplaşırdılar. Murad rəsm çəkməyi, Leyla kitab oxumağı, Kənan texnikanı, Nigar isə bitkiləri çox sevirdi. Bir gün onlar ağacın yarpaqlarının saraldığını və budaqlarının quruya başladığını müşahidə etdilər. Dostlar başa düşdülər ki, sevimli ağaclarının təcili yardıma ehtiyacı var.',
          'Nigar torpağı diqqətlə araşdırdı və ağacın köklərinə su çatmadığını müəyyən etdi. Yaxınlıqdakı bulağın qarşısını böyük daşlar və quru budaqlar kəsmişdi. Murad dərhal vəziyyətin xəritəsini çəkdi və plan hazırladı. Kənan kiçik ling və iplər düzəldərək daşları necə təhlükəsiz qaldırmağı hesabladı. Leyla isə meşəbəyiyə xəbər vermək üçün məlumat qeydləri apardı. Hər bir dost öz bacarığından istifadə edərək komanda kimi hərəkətə keçdi.',
          'Uşaqlar əl-ələ verərək böyük həvəslə bulağın önünü təmizləməyə başladılar. Birlikdə işləmək işi həm asanlaşdırır, həm də əyləncəli edirdi. Nəhayət, sonuncu böyük daş yerindən tərpəndi və şirin dağ suyu şırıldayaraq qədim palıd ağacının köklərinə tərəf axdı. Ağacın ətrafındakı torpaq yenidən nəm və canlandırıcı oldu. Bir neçə gün ərzində qədim ağacın yarpaqları yenidən yamyaşıl rəngə boyandı. Quşlar budaqlara qayıdıb sevinclə ən gözəl mahnılarını oxudular.',
          'Dostlar birgə qələbələrini ağacın kölgəsində sevinclə qeyd etdilər. Onlar anladılar ki, fərqli bacarıqlar birləşəndə heç bir problem həll olunmaz qalmır. Birlik və təbiətə qayğı dünyanı daha gözəl və yaşıl edir. Həmin gündən etibarən onlar ağacı hər həftə ziyarət edib qorudular.',
        ],
      },
      en: {
        title: 'The Magic Tree and the Four Friends',
        short_description: 'An inspiring adventure about four diverse friends uniting their unique talents to save an ancient oak tree.',
        paragraphs: [
          'In the oldest clearing of the great green forest stood a magnificent hundred-year-old oak tree. Its sprawling branches gave sheltered homes to hundreds of birds, squirrels, and woodland creatures. Four school friends — Murad, Leyla, Kenan, and Nigar — gathered beneath its gentle shade every summer afternoon. Murad loved drawing, Leyla adored reading history, Kenan enjoyed building gadgets, and Nigar knew all about plants. One bright afternoon, they noticed that the tree’s leaves were turning pale and its branches looked thirsty. The friends realized that their beloved ancient oak desperately needed their help.',
          'Nigar examined the surrounding soil closely and discovered that water was no longer reaching the deep roots. Heavy fallen rocks and tangled dry logs had completely blocked the nearby mountain spring. Murad immediately drew a clear map of the stream and sketched out an organized rescue plan. Kenan crafted a clever lever and pulley system using sturdy ropes to lift the heavy stones safely. Leyla kept clear notes to update the park ranger about their progress. Each friend used their special strengths and acted as a unified team.',
          'Working side by side with great enthusiasm, the four children began clearing the rocky blockage. Teamwork turned what seemed like an impossible chore into an exciting, joyful mission. Finally, with one coordinated push, the last stubborn boulder rolled away from the spring. Fresh, sparkling mountain water surged forward, flowing directly toward the roots of the ancient oak. The dry earth soaked up the life-giving moisture eagerly. Within a few days, the magnificent tree burst back into rich, emerald-green leaves. Colorful birds returned to the leafy branches, singing songs of gratitude.',
          'The proud friends celebrated their victory together under the tree’s cool, welcoming canopy. They discovered that when different talents join hands, no challenge is too great to overcome. Unity and caring for nature make our world a greener, happier place for all. From that day on, the four protectors watched over their favorite tree with pride and joy.',
        ],
      },
      ru: {
        title: 'Волшебное дерево и четверо друзей',
        short_description: 'Вдохновляющая история о том, как четыре верных друга спасли вековой дуб благодаря дружбе и командной работе.',
        paragraphs: [
          'В самой старой части тенистого леса рос величественный столетний дуб. Его раскидистые ветви служили надёжным домом для сотен птиц, белок и лесных зверят. Четверо школьных друзей — Мурад, Лейла, Кенан и Нигяр — каждое лето собирались под его густой кроной. Мурад прекрасно рисовал, Лейла любила читать книги, Кенан мастерил полезные приборы, а Нигяр знала всё о растениях. В один прекрасный день ребята заметили, что листья дуба пожелтели, а ветви поникли. Друзья поняли, что их любимому дереву срочно требуется помощь.',
          'Нигяр внимательно исследовала землю вокруг и поняла, что к корням дуба перестала поступать вода. Оказалось, что тяжёлые камни и упавшие сухие брёвна перекрыли русло лесного ручья. Мурад сразу же нарисовал понятную карту местности и разработал план действий. Кенан с помощью верёвок и палок соорудил простой подъёмный рычаг для безопасного перемещения камней. Лейла вела аккуратные записи, чтобы при необходимости позвать лесника. Каждый ребёнок применил свой уникальный талант ради общей благородной цели.',
          'Дружно взявшись за руки, ребята с большим воодушевлением принялись расчищать русло ручья. Совместная работа спорилась легко и весело, превратившись в настоящее приключение. Наконец, после общих дружных усилий, последний большой камень сдвинулся с места. Чистая прохладная вода с радостным журчанием устремилась прямо к корням векового дуба. Сухая земля с жадностью впитала живительную влагу. Уже через несколько дней дуб ожил, а его крона вновь засияла изумрудной зеленью. Птицы вернулись на ветви и запели свои самые звонкие песни.',
          'Друзья с гордостью отпраздновали свою победу в прохладной тени ожившего великана. Они поняли важную истину: когда разные способности соединяются вместе, любая трудность отступает. Дружба, сплочённость и забота о природе делают наш мир добрее и прекраснее. С тех пор ребята стали настоящими и заботливыми хранителями родного леса.',
        ],
      },
    },
  },

  // ── 7. Age 9-10 Bedtime: Ulduzlar Arasında Səyahət Edən Gəmi ────────
  {
    id: 7,
    min_age: 9,
    max_age: 10,
    is_bedtime: true,
    category: 'bedtime',
    reading_duration_minutes: 9,
    cover_emoji: '🚀✨',
    translations: {
      az: {
        title: 'Ulduzlar Arasında Səyahət Edən Gəmi',
        short_description: 'Gecə göyünün sirlərini və planetlərin harmoniyasını tədqiq edən xəyali kosmik səyahət nağılı.',
        paragraphs: [
          'Gecənin sakit saatlarında şəhər yuxuya getmiş, səma parlaq ulduz örtüyünə bürünmüşdü. Gənc astronom Emin otağındakı teleskopla uzaq qalaktikaları həvəslə müşahidə edirdi. O, hər axşam ulduzların sirli dünyasını öyrənməyi və yeni planetlər xəyal etməyi çox sevirdi. Bu gecə göy üzü xüsusilə aydın və büllur kimi şəffaf idi. Emin yatağına uzananda pəncərədən otağa gümüşü bir ulduz işığı süzüldü. Həmin işıq xəyalında onu ulduzlar arasında üzən sehirli bir kosmik gəminin kapitanına çevirdi.',
          'Gəmi sakitcə və səssizcə göyün dərinliklərində, parlaq kometlərin yanından keçərək irəliləyirdi. Pəncərədən nəhəng halqaları olan Saturn və qızılı zolaqlı Yupiter aydın görünürdü. Planetlər öz orbitlərində mükəmməl bir nizam və ahəngdarlıqla hərəkət edirdilər. Kainatın bu möhtəşəm nizamı Eminin qəlbinə dərin bir rahatlıq və heyranlıq bəxş etdi. O, hər bir planetin təbiətin böyük bir musiqi əsərinin notu olduğunu düşündü. Kosmik gəmi ulduz tozlarından toxunmuş zərif yollarla irəliləməyə davam edirdi.',
          'Uzaqda yerləşən Andromeda dumanlığı rəngarəng mavi və bənövşəyi işıqlarla parıldayırdı. Həmin işıqlar sanki yuxuya gedən dünyamıza xeyirxahlıq və sakitlik diləyirdi. Emin anladı ki, ən böyük kəşflər sakit düşüncələrdən və təmiz xəyallardan doğur. Hər bir insan öz daxilində ulduzlar qədər geniş və zəngin bir xəyal dünyası daşıyır. Yavaş-yavaş kosmik gəminin sürəti azaldı və o, yumşaq bir buludun üzərinə endi. Bütün kainat sanki nəfəsini dərib dərin bir gecə sükunətinə daldı.',
          'Emin təbəssümlə yuxuya getdi və ulduzların nəğməsini dinlədi. Sabah onu məktəbdə yeni biliklər və maraqlı elmi dərslər gözləyirdi. Kainatın sonsuz gözəlliyi onun şirin yuxularına bələdçi oldu. Hər bir gecə yeni biliklərə və parlaq sabahlara açılan sehirli bir qapıdır.',
        ],
      },
      en: {
        title: 'The Ship Sailing Among the Stars',
        short_description: 'An imaginative cosmic voyage exploring the serene wonders of planets and distant galaxies before sleep.',
        paragraphs: [
          'During the quiet late hours, the bustling city fell asleep beneath a blanket of sparkling stars. Young astronomy enthusiast Emin looked through his bedroom telescope, admiring distant spiral galaxies. Every evening, he loved learning the mysteries of the cosmos and dreaming about uncharted planets. Tonight, the atmosphere was exceptionally clear, crisp, and filled with celestial radiance. When Emin lay down in his cozy bed, a silver starlight beam beamed through his window. In his peaceful imagination, that beam transformed into a gentle spacecraft sailing among the constellations.',
          'The dream vessel drifted quietly and effortlessly through deep space, passing softly glowing comets. Through the observation deck, ringed Saturn and majestic striped Jupiter came into clear view. The magnificent planets orbited in flawless mathematical harmony and balanced grace. This cosmic order filled Emin’s heart with profound serenity, reverence, and wonder. He reflected on how every celestial body played its part in nature’s grand, silent symphony. The gentle ship glided smoothly across quiet pathways woven from stardust.',
          'In the far distance, the spiral Andromeda galaxy glowed with breathtaking hues of violet, indigo, and azure. Those gentle cosmic lights seemed to whisper peace and protection over our resting planet Earth. Emin realized that humanity’s greatest discoveries are born from quiet curiosity and thoughtful dreams. Every person carries an inner world as vast, deep, and luminous as the universe itself. Gradually, the spacecraft softened its speed and rested gently upon a cushion of starlight. The entire cosmos seemed to pause in serene, tranquil slumber.',
          'Emin smiled softly and fell into a deep, restorative sleep listening to the quiet music of the stars. Tomorrow promised exciting new scientific lessons and joyful learning with his classmates. The endless beauty of the cosmos guided his peaceful dreams through the night. Every quiet night is a wondrous doorway opening to brighter, wiser tomorrows.',
        ],
      },
      ru: {
        title: 'Корабль, плывущий среди звёзд',
        short_description: 'Увлекательное космическое путешествие перед сном, открывающее гармонию планет и созвездий.',
        paragraphs: [
          'В тихие вечерние часы шумный город заснул, укрывшись тёмным покрывалом сверкающих звёзд. Юный любитель астрономии Эмин увлечённо смотрел в свой телескоп на далёкие спиральные галактики. Каждый вечер он с радостью изучал тайны космоса и размышлял о далёких неизведанных мирах. Сегодня ночное небо было кристально чистым, глубоким и бездонным. Когда Эмин лёг в тёплую постель, серебристый луч звезды заглянул в его окно. В его воображении этот луч превратился в прекрасный корабль, плывущий среди созвездий.',
          'Космический корабль беззвучно и плавно скользил сквозь просторы вселенной, минуя хвосты ярких комет. Через панорамное окно открывался величественный вид на кольца Сатурна и полосатый Юпитер. Планеты двигались по своим орбитам в идеальном порядке, гармонии и спокойствии. Этот космический порядок наполнил душу Эмина глубоким миром и восхищением. Он подумал о том, что каждая звезда — это часть огромной и прекрасной симфонии природы. Корабль мягко скользил по тропинкам из мерцающей звёздной пыли.',
          'Вдали таинственно сияла туманность Андромеды, переливаясь мягкими фиолетовыми и сапфировыми оттенками. Это неземное сияние словно убаюкивало спящую Землю, желая всем людям добра и покоя. Эмин понял, что самые великие открытия начинаются с искренней любознательности и добрых мечтаний. Внутри каждого человека живёт свой собственный удивительный мир, не менее глубокий, чем вселенная. Корабль плавно замедлил свой ход и мягко опустился на пушистое звёздное облако. Весь бескрайний космос погрузился в безмятежную тишину.',
          'Эмин безмятежно улыбнулся и погрузился в глубокий, целительный сон под шёпот далёких звёзд. Завтра в школе его ждали новые интересные уроки и радостные встречи с друзьями. Бескрайняя красота вселенной бережно вела его сквозь мир чудесных сновидений. Каждая спокойная ночь — это волшебный мост, ведущий к новому счастливому дню.',
        ],
      },
    },
  },

  // ── 8. Age 9-10 Daytime: Gizli Qalan Kitabxana və Komanda İşi ──────
  {
    id: 8,
    min_age: 9,
    max_age: 12,
    is_bedtime: false,
    category: 'daytime',
    reading_duration_minutes: 9,
    cover_emoji: '📚🔍',
    translations: {
      az: {
        title: 'Gizli Qalan Kitabxana və Komanda İşi',
        short_description: 'Məktəb şagirdlərinin qədim kitabxana sirrini birlikdə çözərək bilik və əməkdaşlığı kəşf etməsi haqqında nağıl.',
        paragraphs: [
          'Şəhərin mərkəzindəki tarixi məktəb binasının zirzəmisində qədim bir qapı aşkar edilmişdi. Üç çalışqan dost — Rəşad, Zeynəb və Tural bu qapının arxasındakı sirri araşdırmaq qərarına gəldilər. Məktəb direktoru onlara yalnız birlikdə işləmək və diqqətli olmaq şərti ilə icazə vermişdi. Qapını ehtiyatla açdıqda onlar tozlu, lakin çox möhtəşəm bir qədim kitabxana ilə qarşılaşdılar. Rəflərdə dəri cildli minlərlə kitab, qədim xəritələr və astronomik qlobuslar düzülmüşdü. Otağın mərkəzində isə sirli bir taxta sandıq və üzərində riyazi tapmaca var idi.',
          'Rəşad dərhal tapmacanın şifrəsini diqqətlə oxudu və simvolların ardıcıllığını təhlil etdi. Zeynəb qədim riyazi düsturları xatırlayaraq şifrənin həndəsi fiqurlara əsaslandığını müəyyənləşdirdi. Tural isə qədim kitabların səhifələrindən həmin simvollara uyğun olan açar sözləri tapdı. Hər kəs öz bilik sahəsi üzrə məsuliyyəti üzərinə götürərək bir-birinə dəstək oldu. Birgə müzakirələr nəticəsində onlar tapmacanın sonuncu mərhələsinə çatdılar. Hər kəsin fikri bu çətin tapşırığın həllində böyük rol oynadı.',
          'Şifrə düzgün daxil edildikdə sandıq zərif bir musiqi səsi ilə açıldı. Sandığın içində qızıl və ya ləl-cəvahirat yox, məktəbin ilk qurucularının yazdığı nadir elm gündəlikləri var idi. Bu gündəliklərdə təbiət hadisələri, ixtiralar və uşaqlar üçün elmi təcrübələr qeyd olunmuşdu. Dostlar başa düşdülər ki, dünyada ən böyük sərvət qızıl deyil, nəsildən-nəslə ötürülən bilik və təcrübədir. Onlar tapdıqları qiymətli kitabları məktəb muzeyinə təqdim etmək üçün səliqə ilə qeydiyyata aldılar. Müəllimlər və şagirdlər onların bu böyük uğurunu alqışladılar.',
          'Günün sonunda dostlar məktəbin həyətində əyləşib fərəh hissi ilə söhbət etdilər. Onlar təkbaşına heç birinin bu sirri aça bilməyəcəyini, yalnız komanda işi sayəsində qalib gəldiklərini anladılar. Birlik, elmə sevgi və dostluq insanı ən çətin yollardan belə uğurla keçirir. Bu unudulmaz gün onların həyatında elmə olan sevgini daha da gücləndirdi.',
        ],
      },
      en: {
        title: 'The Secret Library and Teamwork',
        short_description: 'An engaging mystery where three determined students unlock a hidden historical library through knowledge and teamwork.',
        paragraphs: [
          'In the basement of the town’s historic school building, an ancient arched door had remained locked for decades. Three dedicated students — Rashad, Zeynab, and Tural — decided to investigate the story behind this forgotten room. The school principal granted them permission under the strict condition that they work carefully and safely as a team. When they slowly pushed the wooden door open, they were stunned by an incredible, majestic library. Tall mahogany shelves held thousands of leather-bound volumes, hand-drawn maps, and brass astronomical globes. In the center of the hall rested a carved wooden chest bearing a complex mathematical riddle.',
          'Rashad carefully analyzed the encrypted symbols and recognized a repeating numerical sequence. Zeynab recalled advanced geometric principles and deduced that the lock was governed by symmetry and prime numbers. Meanwhile, Tural researched old archival indexes to find the matching historical passwords referenced in the riddle. Each student took full ownership of their task while communicating respectfully with one another. Through passionate brainstorming and mutual trust, they pieced together the missing clues. Every single perspective proved essential to unlocking the final code.',
          'When the final sequence was entered, the ancient lock released with a soft, melodic chime. Inside the chest lay not gold or jewels, but the invaluable scientific journals of the school’s first founding scholars. These journals contained detailed meteorological records, botanical sketches, and brilliant invention blueprints. The students realized that true wealth is not precious metal, but shared knowledge passed down through generations. They meticulously documented and cataloged each treasure to preserve it for the school museum. The teachers and fellow students celebrated their historic discovery with great applause.',
          'At the end of the day, the three friends sat under the courtyard trees, reflecting on their remarkable achievement. They acknowledged that no single person could have solved the puzzle alone without the support of the team. Unity, respect for science, and genuine friendship empower people to conquer the most challenging puzzles. This unforgettable adventure deepened their lifelong passion for discovery and mutual collaboration.',
        ],
      },
      ru: {
        title: 'Тайная библиотека и сила команды',
        short_description: 'Увлекательная детективная история о трёх друзьях, которые разгадали тайну старинной библиотеки благодаря знаниям и сплочённости.',
        paragraphs: [
          'В подвальном этаже старинного школьного здания рабочие обнаружили загадочную массивную дверь, закрытую на кодовый замок. Трое любознательных друзей — Рашад, Зейнаб и Турал — решили выяснить, что скрывается за этой вековой дверью. Директор школы с радостью разрешил им исследование при условии, что они будут действовать дружно и осторожно. Когда ребята аккуратно приоткрыли дубовую дверь, перед ними предстала потрясающая старинная библиотека. На высоких стеллажах стояли тысячи книг в кожаных переплётах, старинные карты и латунные глобусы. В центре зала стоял резной сундук со сложной математической головоломкой.',
          'Рашад внимательно переписал зашифрованные символы и начал анализировать скрытую закономерность. Зейнаб вспомнила законы геометрии и доказала, что шифр основан на симметрии и простых числах. Турал тем временем отыскал в каталогах пояснения к древним терминам, указанным в загадке. Каждый друг отвечал за свою часть работы, внимательно прислушиваясь к советам товарищей. Благодаря взаимной поддержке и общему вдохновению они подобрали ключ к сложнейшему замку. Вклад каждого участника оказался решающим для общего успеха.',
          'Когда последний символ встал на место, замок щёлкнул, и крышка сундука плавно открылась под звуки старинного механизма. В сундуке лежало не золото и не драгоценности, а бесценные научные дневники основателей школы. В этих рукописях были записаны уникальные физические эксперименты, чертежи изобретений и наблюдения за природой. Друзья осознали, что самое великое сокровище человечества — это накопленные знания и мудрость веков. Они бережно составили опись каждой книги для открытия нового школьного музея. Учителя и одноклассники искренне восхищались их достижением.',
          'Вечером друзья сидели в школьном сквере, с улыбкой вспоминая все трудности прошедшего дня. Они поняли, что ни один из них в одиночку не смог бы разгадать эту сложную вековую тайну. Настоящая дружба, взаимное доверие и любовь к знаниям помогают справиться с любыми преградами. Этот незабываемый день навсегда зажёг в их сердцах искру исследователей и первооткрывателей.',
        ],
      },
    },
  },
];
