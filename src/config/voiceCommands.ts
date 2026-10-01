import type { CharacterCommand } from '../types';

export interface VoiceCommandMap {
  az: string[];
  en: string[];
  ru: string[];
}

export const VOICE_COMMANDS: Record<CharacterCommand, VoiceCommandMap> = {
  idle: {
    az: [],
    en: [],
    ru: [],
  },
  sit: {
    az: ['otur', 'otur aşağı', 'əyləş', 'oturmaq'],
    en: ['sit', 'sit down', 'take a seat', 'have a seat'],
    ru: ['сядь', 'садись', 'сесть', 'присядь'],
  },
  stand: {
    az: ['qalx', 'ayağa qalx', 'dur', 'ayaq üstə dur', 'qalxmaq'],
    en: ['stand', 'stand up', 'get up', 'rise', 'stand please'],
    ru: ['встань', 'вставай', 'поднимись', 'встать', 'подняться'],
  },
  walkForward: {
    az: ['irəli', 'irəli get', 'qabağa get', 'önə get', 'qabağa'],
    en: ['forward', 'go forward', 'move forward', 'come forward', 'walk forward', 'march forward'],
    ru: ['вперёд', 'иди вперёд', 'двигайся вперёд', 'шагай вперёд', 'марш вперёд'],
  },
  walkBackward: {
    az: ['geri', 'geriyə get', 'arxaya get', 'geri get', 'arxaya'],
    en: ['back', 'go back', 'move backward', 'step back', 'walk back', 'backwards'],
    ru: ['назад', 'иди назад', 'двигайся назад', 'шагай назад', 'отступи'],
  },
  moveLeft: {
    az: ['sola', 'sola get', 'sola hərəkət et', 'sola doğru'],
    en: ['left', 'go left', 'move left', 'step left', 'walk left'],
    ru: ['налево', 'иди налево', 'двигайся налево', 'шагай налево', 'влево'],
  },
  moveRight: {
    az: ['sağa', 'sağa get', 'sağa hərəkət et', 'sağa doğru'],
    en: ['right', 'go right', 'move right', 'step right', 'walk right'],
    ru: ['направо', 'иди направо', 'двигайся направо', 'шагай направо', 'вправо'],
  },
  jump: {
    az: ['tullan', 'hoppa', 'tullan yuxarı', 'zıpla', 'sıçra'],
    en: ['jump', 'jump up', 'leap', 'hop', 'bounce'],
    ru: ['прыгай', 'прыгни', 'подпрыгни', 'прыжок', 'скачи'],
  },
  wave: {
    az: ['əl salla', 'əlini salla', 'əl elə', 'əlini yellə', 'salam ver', 'əl ver'],
    en: ['wave', 'wave your hand', 'say hello', 'wave hello', 'wave hi'],
    ru: ['помаши', 'помаши рукой', 'помахай рукой', 'помахай', 'привет рукой'],
  },
  nod: {
    az: ['başını salla', 'başınla hə de', 'başını tərpət', 'hə de'],
    en: ['nod', 'nod your head', 'nod yes', 'shake your head yes'],
    ru: ['кивни', 'кивни головой', 'кивни да', 'кивай'],
  },
  shakeHead: {
    az: ['başını silk', 'yox de', 'xeyr de', 'başını sil'],
    en: ['shake head', 'shake your head', 'shake head no', 'no'],
    ru: ['покачай головой', 'покачай', 'нет', 'помотай головой'],
  },
  spin: {
    az: ['dön', 'yerində dön', 'fırlan', 'dövrə vur', 'fır vur'],
    en: ['turn', 'turn around', 'spin', 'spin around', 'rotate', 'twirl'],
    ru: ['повернись', 'крутись', 'обернись', 'покрутись', 'покружись'],
  },
  run: {
    az: ['qaç', 'qaçmağa başla', 'qaçış', 'sürətlə get'],
    en: ['run', 'start running', 'sprint', 'jog', 'run fast'],
    ru: ['беги', 'начни бежать', 'бегом', 'побеги', 'беги быстро'],
  },
  stop: {
    az: ['dayan', 'saxla', 'dur yerində', 'dayanmaq', 'hərəkət etmə'],
    en: ['stop', 'freeze', 'halt', 'stand still', 'dont move', "don't move"],
    ru: ['стой', 'остановись', 'стоп', 'замри', 'не двигайся'],
  },
  clap: {
    az: ['əl çal', 'alqışla', 'çap et'],
    en: ['clap', 'clap your hands', 'applaud'],
    ru: ['хлопай', 'похлопай', 'аплодируй'],
  },
  dance: {
    az: ['rəqs et', 'oyna', 'dans et'],
    en: ['dance', 'start dancing', 'boogie'],
    ru: ['танцуй', 'потанцуй', 'пляши'],
  },
  // Yeni komutlar
  read: {
    az: ['oxu', 'kitab oxu', 'oxumaq', 'kitab aç'],
    en: ['read', 'read a book', 'start reading', 'open a book'],
    ru: ['читай', 'читай книгу', 'открой книгу', 'почитай'],
  },
  write: {
    az: ['yaz', 'yazmaq', 'yazı yaz', 'qələm al'],
    en: ['write', 'start writing', 'write something', 'pick up pen'],
    ru: ['пиши', 'пиши что-нибудь', 'начни писать', 'возьми ручку'],
  },
  drink: {
    az: ['su iç', 'iç', 'içmək', 'su'],
    en: ['drink', 'drink water', 'have a drink', 'take a sip'],
    ru: ['пей', 'пей воду', 'попей', 'выпей воды'],
  },
  eat: {
    az: ['ye', 'yemək ye', 'yemək', 'aç'],
    en: ['eat', 'eat food', 'have a bite', 'start eating'],
    ru: ['ешь', 'кушай', 'поешь', 'начни есть'],
  },
  sleep: {
    az: ['yat', 'uzan', 'yatmaq', 'yuxula'],
    en: ['sleep', 'go to sleep', 'take a nap', 'lie down'],
    ru: ['спи', 'ложись спать', 'засыпай', 'ляг'],
  },
  think: {
    az: ['fikirləş', 'düşün', 'fikirləşmək', 'fikir'],
    en: ['think', 'start thinking', 'wonder', 'ponder'],
    ru: ['думай', 'подумай', 'размышляй', 'задумайся'],
  },
  cry: {
    az: ['ağla', 'ağlamaq', 'göz yaşı tök'],
    en: ['cry', 'start crying', 'be sad', 'weep'],
    ru: ['плачь', 'заплачь', 'поплачь', 'грусти'],
  },
  laugh: {
    az: ['gül', 'gülmək', 'gül hahaha', 'xoşhal ol'],
    en: ['laugh', 'start laughing', 'giggle', 'be happy'],
    ru: ['смейся', 'засмейся', 'хохочи', 'веселись'],
  },
  draw: {
    az: ['şəkil çək', 'çək', 'rəsm çək', 'rəsm et'],
    en: ['draw', 'start drawing', 'draw a picture', 'paint'],
    ru: ['рисуй', 'нарисуй', 'начни рисовать', 'порисуй'],
  },
  sing: {
    az: ['mahnı oxu', 'oxu mahnı', 'mahnı söylə', 'mahnı'],
    en: ['sing', 'start singing', 'sing a song', 'hum'],
    ru: ['пой', 'спой', 'запой', 'начни петь'],
  },
  stretch: {
    az: ['gərin', 'gərinmək', 'uzanış et', 'əzələləri gər'],
    en: ['stretch', 'do stretching', 'stretch out', 'limber up'],
    ru: ['потянись', 'растянись', 'сделай растяжку', 'разомнись'],
  },
  count: {
    az: ['say', 'saymaq', 'rəqəm say', 'bir iki üç'],
    en: ['count', 'start counting', 'count numbers', 'one two three'],
    ru: ['считай', 'посчитай', 'начни считать', 'раз два три'],
  },
  point: {
    az: ['göstər', 'barmağınla göstər', 'işarə et', 'göstərmək'],
    en: ['point', 'point at', 'point your finger', 'show me'],
    ru: ['покажи', 'укажи', 'покажи пальцем', 'укажи пальцем'],
  },
  walk: {
    az: ['yol ilə get', 'get', 'addımla', 'getmək', 'yol ilə'],
    en: ['walk along', 'walk', 'go', 'stroll'],
    ru: ['иди по дороге', 'иди', 'шагай', 'прогуляйся'],
  },
  slide: {
    az: ['sürüş', 'sürüşmək', 'sürüşkəndən sürüş'],
    en: ['slide', 'go down slide', 'sliding'],
    ru: ['катайся с горки', 'скользи', 'съезжай'],
  },
  rideBike: {
    az: ['sür', 'velosiped sür', 'velosiped', 'sürmək'],
    en: ['ride bike', 'ride a bicycle', 'cycling'],
    ru: ['катайся на велосипеде', 'едь на велике', 'крути педали'],
  },
  surprised: {
    az: ['təəccüblən', 'təəccüb et', 'təəccüblənmək', 'vay'],
    en: ['be surprised', 'surprised', 'wow', 'gasp'],
    ru: ['удивись', 'удивление', 'ого', 'ничего себе'],
  },
  playInstrument: {
    az: ['çal', 'musiqi çal', 'alət çal', 'çalmaq', 'musiqi aləti çal'],
    en: ['play instrument', 'play music', 'strum', 'play guitar'],
    ru: ['играй на инструменте', 'сыграй музыку', 'играй музыку'],
  },
  playToy: {
    az: ['oyuncaqla oyna', 'oyuncaq', 'oyna oyuncaq', 'oyuncaqlar'],
    en: ['play with toy', 'play toy', 'play with teddy'],
    ru: ['играй с игрушкой', 'играй в игрушки', 'возьми игрушку'],
  },
  wakeUp: {
    az: ['oyan', 'yuxudan oyan', 'dur yuxudan', 'yuxudan dur', 'oyanmaq'],
    en: ['wake up', 'get up', 'rise and shine'],
    ru: ['просыпайся', 'проснись', 'подъем', 'вставай с постели'],
  },
  bathe: {
    az: ['çim', 'duş al', 'çimmək', 'vanna qəbul et', 'yuyun'],
    en: ['take a bath', 'take a shower', 'bathe', 'wash up'],
    ru: ['принимай душ', 'купайся', 'в душ', 'прими ванну'],
  },
  wash: {
    az: ['yu', 'yumaq', 'əlini yu', 'əl-üzünü yu', 'əlləri yu'],
    en: ['wash hands', 'wash up', 'clean hands'],
    ru: ['мой руки', 'помой руки', 'умойся', 'мой'],
  },
  comb: {
    az: ['dara', 'daramaq', 'saçını dara', 'daraqla dara'],
    en: ['comb hair', 'brush hair', 'comb'],
    ru: ['причешись', 'расчеши волосы', 'расчешись'],
  },
  dress: {
    az: ['geyin', 'geyinmək', 'paltarını geyin', 'geyinməyə başla'],
    en: ['get dressed', 'dress up', 'put on clothes'],
    ru: ['одевайся', 'оденься', 'надень одежду'],
  },
  paint: {
    az: ['rənglə', 'rəngləmək', 'boya', 'rəngbərəng et'],
    en: ['color and paint', 'paint', 'color it', 'coloring'],
    ru: ['раскрашивай', 'покрась', 'рисуй красками', 'раскрась'],
  },
  cut: {
    az: ['kəs', 'kəsmək', 'qayçı ilə kəs', 'kağızı kəs'],
    en: ['cut with scissors', 'cut', 'snip snip'],
    ru: ['режь ножницами', 'отрежь', 'порежь ножницами', 'режь'],
  },
  talk: {
    az: ['danış', 'danışmaq', 'söz de', 'söylə'],
    en: ['speak', 'talk', 'say something'],
    ru: ['говори', 'скажи', 'поговори', 'разговаривай'],
  },
  build: {
    az: ['düzəlt', 'düzəltmək', 'qur', 'təmir et', 'yarat'],
    en: ['build and fix', 'build', 'construct', 'fix it'],
    ru: ['мастери', 'строй', 'построй', 'почини'],
  },
  hug: {
    az: ['qucaqla', 'qucaqlamaq', 'sarıl', 'qucaqla məni'],
    en: ['give a hug', 'hug', 'cuddle'],
    ru: ['обними', 'крепко обними', 'обнимашки'],
  },
  holdHands: {
    az: ['əl-ələ tut', 'əl-ələ ver', 'əlimdən tut', 'əlindən tut'],
    en: ['hold hands', 'take hands', 'hold my hand'],
    ru: ['держись за руки', 'возьмись за руки', 'держи руку'],
  },
  help: {
    az: ['kömək et', 'köməkləş', 'kömək elə', 'kömək'],
    en: ['help someone', 'help', 'lend a hand'],
    ru: ['помоги', 'помощь', 'выручай', 'помогай'],
  },
  openDoor: {
    az: ['aç', 'qapını aç', 'açmaq', 'qapı aç'],
    en: ['open door', 'open the door', 'open'],
    ru: ['открой дверь', 'открой', 'открывай'],
  },
  closeDoor: {
    az: ['bağla', 'qapını bağla', 'bağlamaq', 'qapı ört'],
    en: ['close door', 'shut door', 'close'],
    ru: ['закрой дверь', 'закрой', 'закрывай'],
  },
  putAway: {
    az: ['qoy', 'yerinə qoy', 'yerinə yığ', 'əşyanı qoy'],
    en: ['put away', 'put back', 'place in spot'],
    ru: ['положи на место', 'положи', 'убери на место'],
  },
  collect: {
    az: ['topla', 'yığ', 'toplamaq', 'əşyaları topla', 'oyuncaqları topla'],
    en: ['collect items', 'collect', 'gather up', 'pick up'],
    ru: ['собери вещи', 'собери', 'собирай', 'сложи'],
  },
  clean: {
    az: ['təmizlə', 'təmizləmək', 'sil', 'yığışdır'],
    en: ['clean up', 'clean', 'tidy up', 'wipe'],
    ru: ['убирай', 'наведи порядок', 'вытри', 'очисти'],
  },
  bring: {
    az: ['gətir', 'gətirmək', 'bura gətir', 'yanıma gətir'],
    en: ['bring here', 'bring', 'bring it over'],
    ru: ['принеси', 'неси сюда', 'подай', 'принеси мне'],
  },
  takeAway: {
    az: ['apar', 'aparmaq', 'uzağa apar', 'oraya apar'],
    en: ['take away', 'carry away', 'remove'],
    ru: ['унеси', 'забери', 'отнеси', 'убери подальше'],
  },
  carry: {
    az: ['daşı', 'daşımaq', 'yük daşı', 'əlində daşı'],
    en: ['carry', 'carry it', 'bear weight'],
    ru: ['неси', 'тащи', 'перенеси', 'неси в руках'],
  },
  pull: {
    az: ['dart', 'dartmaq', 'özünə çək', 'dartışdır'],
    en: ['pull', 'tug', 'pull it'],
    ru: ['тяни', 'потяни', 'дергай', 'тяни к себе'],
  },
  scatter: {
    az: ['dağıt', 'dağıtmaq', 'tök', 'hər yana dağıt'],
    en: ['scatter', 'mess up', 'spill around'],
    ru: ['разбросай', 'рассыпь', 'мусори', 'разбросай вещи'],
  },
  waterPlant: {
    az: ['sula', 'sulamaq', 'bitkini sula', 'gülü sula'],
    en: ['water plant', 'water flowers', 'water'],
    ru: ['полей цветок', 'полей растение', 'поливай'],
  },
  lightMatch: {
    az: ['yandır', 'kibrit yandır', 'yandırmaq', 'kibriti yandır'],
    en: ['light match', 'strike a match', 'light fire'],
    ru: ['зажги спичку', 'зажги', 'зажигай спичку'],
  },
};
